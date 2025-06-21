// pages/api/generate-summary.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBSYhPR2dNZBL33h0wIUm3I1d3Ln7XamjQ'!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { notes } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    const result = await model.generateContent([`Summarize the following learning notes:\n${notes}`]);
    const response = result.response.text();

    res.status(200).json({ summary: response });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
}
