import { getClientIpFromRequest, processContactSubmission, readJsonBody } from '../server/contact-handler.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const result = await processContactSubmission({
      body,
      env: process.env,
      clientIp: getClientIpFromRequest(req)
    });

    res.status(result.status).json(result.body);
  } catch (error) {
    console.error('Contact API error', error);
    res.status(500).json({
      ok: false,
      error: 'Internal server error.'
    });
  }
}
