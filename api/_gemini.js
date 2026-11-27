import { GoogleGenerativeAI } from '@google/generative-ai';

// gemini-3.5-flash-lite is ~8x faster (~1.4s TTFT) and avoids 3.8-flash 503 overload spikes
export const PRIMARY_MODEL = 'gemini-3.5-flash-lite';
export const FALLBACK_MODEL = 'gemini-flash-latest';

const MAX_HISTORY_MESSAGES = 12;

export const STUDY_ASSISTANT_SYSTEM = `You are **JECRC Nexus AI Study Assistant**, an intelligent academic copilot built for JECRC University engineering students.

Your responsibilities:
• Explain complex engineering concepts with clarity, analogies, and campus-relevant examples.
• Generate interactive quizzes when asked — return them as a JSON block wrapped in \`\`\`json ... \`\`\` with the structure: [{ "question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "..." }].
• Create revision flashcards when asked — return them as a JSON block wrapped in \`\`\`json ... \`\`\` with the structure: [{ "front": "...", "back": "..." }].
• Analyse JECRC PYQ (previous year question) patterns, suggest high-yield topics, and create study plans.
• Help with coding problems, algorithm analysis, step-by-step mathematical derivations.
• Use markdown formatting (headings, bold, bullet points, code blocks) for clear, well-structured answers.
• Keep responses educational, concise, and exam-focused.
• When generating quizzes or flashcards, ALWAYS include the JSON block as described above so the frontend can render interactive components.`;

export const CHATBOT_SYSTEM = `You are **NexBot**, the official AI chatbot of the JECRC Nexus platform — an academic support and student collaboration website for JECRC University, Jaipur.

You help students with:
• **Website navigation**: Explain how to find resources, ask doubts, join study groups, use the AI Study Assistant, view projects, access placement prep, DSA arena, and more.
• **College information**: JECRC University details, campus, departments, branches (CSE, AI&DS, IT, ECE, EE, ME, CE), semesters, examination patterns.
• **Facilities**: Library, labs, hostels, canteen, sports, clubs, events, and student welfare.
• **Academics**: Syllabus queries, exam schedules, CGPA calculations, academic calendars, credit systems.
• **Student support**: Scholarships, anti-ragging, mentorship, counselling, placement cell, training & internship cell.

Tone: Friendly, helpful, and concise. Always greet warmly and guide step by step. If you don't know something specific, politely say so and suggest contacting the relevant department.`;

/**
 * Converts raw Gemini SDK / HTTP errors into clean, user-friendly messages and HTTP status codes.
 */
export function formatGeminiError(error) {
  const status = error?.status || 500;
  const raw = error instanceof Error ? error.message : String(error || '');

  if (status === 401 || status === 403 || /API_KEY|api key|permission/i.test(raw)) {
    return {
      status: 503,
      message: 'AI service authentication failed. Please verify the server GEMINI_API_KEY configuration.',
    };
  }
  if (status === 404 || /not found|no longer available/i.test(raw)) {
    return {
      status: 502,
      message: 'The configured AI model is currently unavailable. Please contact the administrator.',
    };
  }
  if (status === 429 || /quota|rate limit|resource exhausted/i.test(raw)) {
    return {
      status: 429,
      message: 'Too many AI requests right now. Please wait a few seconds and try again.',
    };
  }
  if (status === 503 || /high demand|unavailable|overloaded/i.test(raw)) {
    return {
      status: 503,
      message: 'Nexus AI is currently experiencing high demand. Please try again in a few seconds.',
    };
  }
  if (status === 400) {
    return {
      status: 400,
      message: 'Your request could not be processed. Please rephrase your question and try again.',
    };
  }
  return {
    status: 500,
    message: 'Something went wrong while contacting Nexus AI. Please try again.',
  };
}

function buildContents(history, message) {
  const contents = [];
  if (Array.isArray(history)) {
    const recent = history.slice(-MAX_HISTORY_MESSAGES);
    for (const msg of recent) {
      if (msg && typeof msg.text === 'string' && msg.text.trim()) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }
  }
  contents.push({ role: 'user', parts: [{ text: message }] });
  return contents;
}

/**
 * Non-streaming Gemini response with automatic fallback on transient 503/429/404.
 */
export async function generateGeminiReply({ apiKey, systemPrompt, history, message }) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const contents = buildContents(history, message);
  const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];

  let lastError;
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
      });
      const result = await model.generateContent({ contents });
      return { text: result.response.text(), model: modelName };
    } catch (error) {
      lastError = error;
      const status = error?.status;
      const shouldFallback = status === 503 || status === 429 || status === 404;
      if (!shouldFallback || modelName === FALLBACK_MODEL) {
        throw error;
      }
      console.warn(`⚠️  ${modelName} returned ${status}; falling back to ${FALLBACK_MODEL}...`);
    }
  }

  throw lastError;
}

/**
 * Streams Gemini response chunks progressively via onChunk(text).
 * Falls back to FALLBACK_MODEL if PRIMARY_MODEL fails before streaming starts.
 */
export async function streamGeminiReply({ apiKey, systemPrompt, history, message, onChunk }) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const contents = buildContents(history, message);
  const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];

  let lastError;
  for (const modelName of modelsToTry) {
    let emittedAny = false;
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
      });
      const result = await model.generateContentStream({ contents });
      let fullText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          emittedAny = true;
          fullText += chunkText;
          onChunk(chunkText);
        }
      }
      return { text: fullText, model: modelName };
    } catch (error) {
      lastError = error;
      const status = error?.status;
      const shouldFallback = !emittedAny && (status === 503 || status === 429 || status === 404);
      if (!shouldFallback || modelName === FALLBACK_MODEL) {
        throw error;
      }
      console.warn(`⚠️  ${modelName} stream failed (${status}); falling back to ${FALLBACK_MODEL}...`);
    }
  }

  throw lastError;
}

/**
 * Shared HTTP handler for both Express (local) and Vercel serverless functions.
 * Supports SSE streaming when req.body.stream === true, and JSON otherwise.
 */
export async function handleAiHttpRequest(req, res, systemPrompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  const { message, history, stream } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'message is required' });
  }

  if (stream) {
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    if (typeof res.flushHeaders === 'function') res.flushHeaders();

    try {
      const { model } = await streamGeminiReply({
        apiKey,
        systemPrompt,
        history,
        message: message.trim(),
        onChunk: (chunk) => {
          res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        },
      });
      res.write(`data: ${JSON.stringify({ done: true, model })}\n\n`);
      res.end();
    } catch (error) {
      console.error('Gemini streaming error:', error);
      const { message: errMsg } = formatGeminiError(error);
      res.write(`data: ${JSON.stringify({ error: errMsg })}\n\n`);
      res.end();
    }
    return;
  }

  try {
    const { text, model } = await generateGeminiReply({
      apiKey,
      systemPrompt,
      history,
      message: message.trim(),
    });
    res.json({ success: true, reply: text, model });
  } catch (error) {
    console.error('Gemini API error:', error);
    const { status, message: errMsg } = formatGeminiError(error);
    res.status(status).json({ success: false, error: errMsg });
  }
}
