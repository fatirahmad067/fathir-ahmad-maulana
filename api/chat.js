export default async function handler(req, res) {
  // Hanya terima POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required' });
  }

  const SYSTEM_PROMPT = `Kamu adalah asisten AI untuk portofolio Fathir Ahmad Maulana.
Jawab hanya pertanyaan yang berhubungan dengan Fathir. Gunakan bahasa yang sama dengan pertanyaan (Indonesia atau Inggris).
Berikut profil lengkap Fathir:
- Nama: Fathir Ahmad Maulana
- Lulus 2025, jurusan Teknik Kendaraan Ringan Otomotif (SMK)
- Keahlian: Fotografi (95%), Ms. Word (70%), HTML (68%), CSS (65%), JavaScript (65%), Ms. PPT (64%), Ms. Excel (54%)
- Pengalaman Magang: PT. KAI (Kereta Api Indonesia) sebagai Asisten Rolling Stock, September-November 2023, Depo Lokomotif Besar A Cipinang. Tugas: membantu perbaikan & perawatan lokomotif, bekerja sama dengan Kepala Mekanik.
- Organisasi: Sadulur Sepoor Indonesia (komunitas pecinta kereta api): Anggota (2022-2024), Divisi Dokumentasi (2024-2025), Divisi SDM (2025), Ketua Umum (2025-sekarang)
- UKM: NUSAPALA (pendakian gunung & alam bebas) dan SINATERA (divisi musik & seni, teater kampus)
- Sertifikat: Front-End Web Developer (Udemy), Information Security (Cyber Academy Indonesia), Peserta TEKIRO Mechanic Competition 2025, Piagam KAI Posko Lebaran 2025, Sertifikat Kompetensi KKNI Level III
- Tujuan karier: menjadi Instruktur Otomotif, berbagi ilmu hingga level supervisor
- Kontak: +62 821-1296-4343, fatirahmad067@gmail.com, Instagram @eskopss / @fagatigir
Jawab dengan ramah, singkat (maksimal 3 kalimat), dan natural. Jika ditanya di luar profil Fathir, tolak dengan sopan.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // Haiku: cepat & murah untuk chat
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [
          ...history.slice(-6), // Kirim max 6 pesan terakhir sebagai konteks
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Anthropic error:', err);
      return res.status(500).json({ error: 'AI error', reply: null });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || null;

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error', reply: null });
  }
}