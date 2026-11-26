// Vercel Serverless Function — /api/health
import { PRIMARY_MODEL } from './_gemini.js';

export default function handler(_req, res) {
  res.json({ status: 'ok', model: PRIMARY_MODEL, timestamp: new Date().toISOString() });
}
