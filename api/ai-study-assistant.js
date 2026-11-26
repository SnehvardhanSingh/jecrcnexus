// Vercel Serverless Function — /api/ai-study-assistant
import { STUDY_ASSISTANT_SYSTEM, generateGeminiReply, formatGeminiError } from './_gemini.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ success: false, error: 'API key not configured' });

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'message is required' });
  }

  try {
    const { text, model } = await generateGeminiReply({
      apiKey,
      systemPrompt: STUDY_ASSISTANT_SYSTEM,
      history,
      message,
    });
    res.json({ success: true, reply: text, model });
  } catch (error) {
    console.error('Gemini API error:', error);
    const { status, message: errMsg } = formatGeminiError(error);
    res.status(status).json({ success: false, error: errMsg });
  }
}
