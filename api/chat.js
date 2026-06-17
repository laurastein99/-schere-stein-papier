export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  const data = await upstream.json();
  res.status(upstream.status).json(data);
}
