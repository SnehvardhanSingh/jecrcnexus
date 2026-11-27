// Local development API server — proxies Gemini API calls so the key never reaches the browser.
// Started automatically alongside Vite on port 3001 via `npm run dev`.

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {
  PRIMARY_MODEL,
  STUDY_ASSISTANT_SYSTEM,
  CHATBOT_SYSTEM,
  handleAiHttpRequest,
} from './api/_gemini.js';

const app = express();
const PORT = Number(process.env.API_PORT) || 3002;

app.use(cors({ origin: true }));
app.use(express.json());

// ── Validate API Key ─────────────────────────────────────────────────
if (!process.env.GEMINI_API_KEY) {
  console.error('❌  GEMINI_API_KEY is missing – add it to .env');
  process.exit(1);
}

// ── Routes ───────────────────────────────────────────────────────────
app.post('/api/ai-study-assistant', (req, res) => {
  handleAiHttpRequest(req, res, STUDY_ASSISTANT_SYSTEM);
});

app.post('/api/ai-chatbot', (req, res) => {
  handleAiHttpRequest(req, res, CHATBOT_SYSTEM);
});

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
