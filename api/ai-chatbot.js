// Vercel Serverless Function — /api/ai-chatbot
import { CHATBOT_SYSTEM, handleAiHttpRequest } from './_gemini.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  await handleAiHttpRequest(req, res, CHATBOT_SYSTEM);
}
