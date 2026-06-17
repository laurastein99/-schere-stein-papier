export default function handler(req, res) {
  res.status(200).json({ configured: !!process.env.OPENAI_KEY });
}
