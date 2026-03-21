const https = require('https');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history = [] } = req.body || {};

  if (!message) return res.status(400).json({ error: 'Message required' });

  const SYSTEM_PROMPT = `Kamu adalah asisten AI untuk portofolio Fathir Ahmad Maulana.
Jawab hanya pertanyaan yang berhubungan dengan Fathir. Gunakan bahasa yang sama dengan pertanyaan (Indonesia atau Inggris).
Profil Fathir:
- Lulus 2025, jurusan Teknik Kendaraan Ringan Otomotif (SMK)
- Keahlian: Fotografi (95%), Ms. Word (70%), HTML (68%), CSS (65%), JavaScript (65%), Ms. PPT (64%), Ms. Excel (54%)
- Magang: PT. KAI sebagai Asisten Rolling Stock, Sep-Nov 2023, Depo Lokomotif Besar A Cipinang
- Organisasi: Sadulur Sepoor Indonesia — Anggota (2022-2024), Divisi Dokumentasi (2024-2025), Divisi SDM (2025), Ketua Umum (2025-sekarang)
- UKM: NUSAPALA (alam bebas), SINATERA (musik & seni)
- Sertifikat: Front-End Web Developer (Udemy), Information Security (Cyber Academy), TEKIRO Mechanic Competition 2025, Piagam KAI 2025, Sertifikat Kompetensi KKNI Level III
- Tujuan: Instruktur Otomotif
- Kontak: +62 821-1296-4343, fatirahmad067@gmail.com, IG @eskopss / @fagatigir
Jawab ramah, singkat (max 3 kalimat).`;

  const messages = [
    ...history.slice(-6),
    { role: 'user', content: message }
  ];

  const body = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages
  });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ error: 'API key not configured', reply: null });
  }

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    }
  };

  return new Promise((resolve) => {
    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => { data += chunk; });
      apiRes.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            console.error('Anthropic error:', JSON.stringify(parsed.error));
            res.status(500).json({ error: parsed.error.message, reply: null });
          } else {
            const reply = parsed.content?.[0]?.text || null;
            res.status(200).json({ reply });
          }
        } catch (e) {
          console.error('Parse error:', e.message, 'Raw:', data);
          res.status(500).json({ error: 'Parse error', reply: null });
        }
        resolve();
      });
    });

    apiReq.on('error', (e) => {
      console.error('Request error:', e.message);
      res.status(500).json({ error: e.message, reply: null });
      resolve();
    });

    apiReq.write(body);
    apiReq.end();
  });
};