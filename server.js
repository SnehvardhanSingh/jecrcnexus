// Local development server — proxies Gemini API calls so the key never reaches the browser.
// Run with: node server.js  (then run Vite separately; Vite proxies /api → this server)

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {
  PRIMARY_MODEL,
  STUDY_ASSISTANT_SYSTEM,
  CHATBOT_SYSTEM,
  generateGeminiReply,
  formatGeminiError,
} from './api/_gemini.js';

const app = express();
const PORT = 3001;

app.use(cors({ origin: true }));
app.use(express.json());

// ── Validate API Key ─────────────────────────────────────────────────
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌  GEMINI_API_KEY is missing – add it to .env');
  process.exit(1);
}

// ── Shared chat handler ──────────────────────────────────────────────
async function handleChat(systemPrompt, history, userMessage, res) {
  try {
    const { text, model } = await generateGeminiReply({
      apiKey,
      systemPrompt,
      history,
      message: userMessage,
    });
    res.json({ success: true, reply: text, model });
  } catch (error) {
    console.error('Gemini API error:', error);
    const { status, message } = formatGeminiError(error);
    res.status(status).json({ success: false, error: message });
  }
}

// ── Routes ───────────────────────────────────────────────────────────
app.post('/api/ai-study-assistant', async (req, res) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'message is required' });
  }
  await handleChat(STUDY_ASSISTANT_SYSTEM, history, message, res);
});

app.post('/api/ai-chatbot', async (req, res) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'message is required' });
  }
  await handleChat(CHATBOT_SYSTEM, history, message, res);
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', model: PRIMARY_MODEL });
});

app.listen(PORT, () => {
  console.log(`\n🚀  JECRC Nexus API server running at http://localhost:${PORT}`);
  console.log(`   Model: ${PRIMARY_MODEL}`);
  console.log(`   POST /api/ai-study-assistant`);
  console.log(`   POST /api/ai-chatbot`);
  console.log(`   GET  /api/health\n`);
});
