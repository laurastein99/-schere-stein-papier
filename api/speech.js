export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const upstream = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  if (!upstream.ok) return res.status(upstream.status).json({ error: 'TTS failed' });
  const buffer = await upstream.arrayBuffer();
  res.setHeader('Content-Type', 'audio/mpeg');
  res.status(200).send(Buffer.from(buffer));
}
