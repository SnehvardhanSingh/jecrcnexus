import { GoogleGenerativeAI } from '@google/generative-ai';

export const PRIMARY_MODEL = 'gemini-3.8-flash';
export const FALLBACK_MODEL = 'gemini-flash-latest';

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      message: 'Gemini AI is currently experiencing high demand. Please try again in a few seconds.',
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
    message: 'Something went wrong while contacting Gemini AI. Please try again.',
  };
}

/**
 * Generates a Gemini response using PRIMARY_MODEL (gemini-3.8-flash),
 * retrying briefly or falling back to FALLBACK_MODEL (gemini-flash-latest) on transient 503/429 spikes.
 */
export async function generateGeminiReply({ apiKey, systemPrompt, history, message }) {
  const genAI = new GoogleGenerativeAI(apiKey);

  const contents = [];
  if (Array.isArray(history)) {
    for (const msg of history) {
      if (msg && typeof msg.text === 'string' && msg.text.trim()) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }
  }
  contents.push({ role: 'user', parts: [{ text: message }] });

  const attempts = [
    { model: PRIMARY_MODEL, delayMs: 0 },
    { model: PRIMARY_MODEL, delayMs: 800 },
    { model: FALLBACK_MODEL, delayMs: 0 },
  ];

  let lastError;
  for (const attempt of attempts) {
    if (attempt.delayMs > 0) await sleep(attempt.delayMs);
    try {
      const model = genAI.getGenerativeModel({
        model: attempt.model,
        systemInstruction: systemPrompt,
      });
      const result = await model.generateContent({ contents });
      return { text: result.response.text(), model: attempt.model };
    } catch (error) {
      lastError = error;
      const status = error?.status;
      const isTransient = status === 503 || status === 429;
      if (!isTransient) {
        throw error;
      }
      console.warn(`⚠️  ${attempt.model} returned ${status}; trying next fallback...`);
    }
  }

  throw lastError;
}
