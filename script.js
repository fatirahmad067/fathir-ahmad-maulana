// ===== CUSTOM CURSOR =====
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
function onHoverIn()  { cursorRing.classList.add('hovered'); }
function onHoverOut() { cursorRing.classList.remove('hovered'); }
function attachCursorHover() {
  document.querySelectorAll('a,button,.photo-clickable,.cert-card,.org-card,.glass-card,.react-btn').forEach(el => {
    el.removeEventListener('mouseenter', onHoverIn);
    el.removeEventListener('mouseleave', onHoverOut);
    el.addEventListener('mouseenter', onHoverIn);
    el.addEventListener('mouseleave', onHoverOut);
  });
}
attachCursorHover();

// ===== NAV SCROLL =====
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

// ===== HAMBURGER =====
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.innerHTML = '<i class="fas fa-bars"></i>';
}));

// ===== THEME TOGGLE =====
const themeBtn  = document.getElementById('theme-toggle');
const htmlTag   = document.documentElement;
const themeIcon = themeBtn.querySelector('i');

function applyTheme(dark) {
  if (dark) {
    htmlTag.classList.add('dark'); document.body.classList.add('dark');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme','dark');
  } else {
    htmlTag.classList.remove('dark'); document.body.classList.remove('dark');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme','light');
  }
}
const saved = localStorage.getItem('theme');
applyTheme(saved === 'light' ? false : saved === 'dark' ? true : window.matchMedia('(prefers-color-scheme:dark)').matches);

themeBtn.addEventListener('click', () => {
  const goingDark = !htmlTag.classList.contains('dark');
  const overlay = document.createElement('div');
  overlay.className = 'theme-transition-overlay ' + (goingDark ? 'to-dark' : 'to-light');
  const r = themeBtn.getBoundingClientRect();
  overlay.style.left = (r.left + r.width/2) + 'px';
  overlay.style.top  = (r.top  + r.height/2) + 'px';
  document.body.appendChild(overlay);
  setTimeout(() => applyTheme(goingDark), 100);
  setTimeout(() => overlay.remove(), 800);
});

// ===== LIVE CLOCK (WIB) =====
function updateClock() {
  const el = document.getElementById('nav-clock');
  if (!el) return;
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  el.textContent = 'WIB ' + h + ':' + m + ':' + s;
}
updateClock();
setInterval(updateClock, 1000);

// ===== BILINGUAL =====
const langBtn = document.getElementById('lang-toggle');
let currentLang = 'id';

const T = {
  id: {
    // Nav desktop
    "nav-home":"Beranda","nav-profile":"Profil","nav-org":"Organisasi",
    "nav-intern":"Magang","nav-cert":"Sertifikat","nav-contact":"Kontak",
    // Nav mobile
    "mnav-home":"Beranda","mnav-profile":"Profil","mnav-org":"Organisasi",
    "mnav-intern":"Magang","mnav-cert":"Sertifikat","mnav-contact":"Kontak",
    // Hero
    "hero-tag":"&lt; Insinyur Otomotif &gt;",
    "hero-quote":'"Jadilah Lebih Dari Sekedar Impian, Wujudkan Dengan Tindakan"',
    "btn-profile":"Tentang Saya","btn-contact-hero":"Hubungi Saya",
    // Profile
    "title-about":"Tentang Saya",
    "about-desc":"<p>Saya lulusan 2025 dari jurusan Teknik Kendaraan Ringan Otomotif dengan minat khusus pada mesin dan kelistrikan.</p><p>Ketertarikan saya tumbuh sejak kecil karena ayah saya seorang mekanik. Pengalaman PKL di PT. KAI mengasah kemampuan teknis dan kerja tim saya. Saya terbiasa bekerja dengan prinsip keamanan, ketelitian, dan dokumentasi.</p><p>Tujuan saya adalah menjadi Instruktur Otomotif agar bisa berbagi ilmu hingga ke jenjang supervisor.</p>",
    "title-skills":"Keahlian","skill-1":"Fotografi",
    "react-label-profile":"Berikan reaksi:",
    "desc-contact":"Mari berdiskusi dan berkolaborasi!",
    // Org
    "title-org":"Organisasi","org-about-title":"Sadulur Sepoor Indonesia",
    "org-about-subtitle":"Komunitas Pecinta Kereta Api",
    "org-about-desc":"Wadah berkumpulnya para pecinta kereta api (railfans) untuk berbagi informasi, melakukan dokumentasi, dan mempererat silaturahmi. Berawal dari hobi, saya berkontribusi dan berkembang bersama komunitas ini dari anggota biasa hingga dipercaya menjadi Ketua Umum.",
    "org-track-title":"Riwayat Jabatan Sadulur Sepoor",
    "org-1-title":"Anggota","org-1-desc":"<li>Mengikuti kegiatan komunitas.</li><li>Menambah wawasan perkeretaapian.</li>",
    "org-2-title":"Divisi Dokumentasi","org-2-desc":"<li>Mengabadikan momen kegiatan.</li><li>Membuat film dokumenter.</li>",
    "org-3-title":"Divisi SDM","org-3-desc":"<li>Mengelola data anggota.</li><li>Rekrutmen &amp; seleksi anggota baru.</li>",
    "org-4-title":"Ketua Umum","org-4-desc":"<li>Memimpin seluruh kegiatan operasional.</li><li>Mengintegrasikan sistem teknologi website.</li>",
    "org-now":"sekarang","react-label-org":"Berikan reaksi:",
    "ukm-title":"Unit Kegiatan Mahasiswa (UKM)",
    "ukm-1-title":"NUSAPALA","ukm-1-sub":"Mahasiswa Pecinta Alam",
    "ukm-1-desc":"Aktif dalam kegiatan pendakian gunung, eksplorasi alam, serta melatih daya juang (grit) dan ketahanan fisik maupun mental di alam bebas.",
    "ukm-2-title":"SINATERA","ukm-2-sub":"Divisi Musik &amp; Seni",
    "ukm-2-desc":"Menyalurkan kreativitas seni melalui divisi musik. Terlibat dalam berbagai pementasan dan kolaborasi karya teater serta pertunjukan kampus.",
    // Internship
    "title-intern":"Magang",
    "intern-role":"Asisten Rolling Stock (September - November 2023)<br>Depo Lokomotif Besar A Cipinang",
    "intern-desc":"<li><span class=\"arrow-blue\">→</span>Membantu melakukan perbaikan dan perawatan pada seluruh bagian lokomotif.</li><li><span class=\"arrow-yellow\">→</span>Bekerja sama dalam mengerjakan instruksi Kepala Mekanik atau Ketua Tim.</li><li><span class=\"arrow-blue\">→</span>Menyiapkan peralatan untuk perbaikan dan perawatan yang akan digunakan.</li>",
    "react-label-intern":"Berikan reaksi:",
    // Certificates
    "title-cert":"Sertifikat",
    "cert-fe-title":"Pengembang Web Front-End","cert-fe-desc":"Bootcamp Front-End Web Developer: HTML, CSS, JS &amp; React oleh Meta Brains (Udemy).",
    "cert-cyber-title":"Keamanan Informasi","cert-cyber-desc":"Kursus Pengantar Keamanan Informasi dari Cyber Academy Indonesia.",
    "cert-1-title":"Sertifikat TEKIRO","cert-1-desc":"Peserta Tekiro Mechanic Competition SMK Se-Pulau Jawa di Jakarta Tahun 2025.",
    "cert-2-title":"Piagam Penghargaan KAI","cert-2-desc":"Melaksanakan kegiatan Posko Lebaran tahun 2025 di Stasiun Gambir bersama Humas PT KAI Daop 1 Jakarta.",
    "cert-3-title":"Sertifikat Kompetensi","cert-3-desc":"Dinyatakan kompeten untuk Bidang Keahlian Teknik Kendaraan Ringan Jenjang III KKNI.",
    // Guestbook
    "title-guestbook":"Buku Tamu","guestbook-sub":"Tinggalkan pesan untuk Fathir — pesanmu akan terlihat di sini!",
    "gb-btn-text":"Kirim Pesan","visitor-label":"Pengunjung hari ini","total-label":"Total pengunjung",
    // Contact
    "title-contact":"Hubungi Saya",
    "modal-title":"Eits, Tunggu Dulu!",
    "modal-desc":"Untuk menjaga kenyamanan dan privasi, mari berkenalan via <strong>Gmail</strong> terlebih dahulu.<br><br>Berikan <strong>Nama Lengkap</strong> &amp; <strong>Tujuan</strong> kamu. Jika sudah sesuai, kita bisa langsung ngobrol santai di WhatsApp! ✨"
  },
  en: {
    "nav-home":"Home","nav-profile":"Profile","nav-org":"Organization",
    "nav-intern":"Internship","nav-cert":"Certificate","nav-contact":"Contact",
    "mnav-home":"Home","mnav-profile":"Profile","mnav-org":"Organization",
    "mnav-intern":"Internship","mnav-cert":"Certificate","mnav-contact":"Contact",
    "hero-tag":"&lt; Automotive Engineer &gt;",
    "hero-quote":'"Be More Than Just a Dream, Make It Happen With Action"',
    "btn-profile":"About Me","btn-contact-hero":"Contact Me",
    "title-about":"About Me",
    "about-desc":"<p>I am a 2025 graduate of Light Vehicle Automotive Engineering with a special interest in engines and electrical systems.</p><p>My interest grew from childhood as my father is a mechanic. My internship at PT KAI sharpened my technical and teamwork skills. I am accustomed to working with principles of safety, precision, and thorough documentation.</p><p>My goal is to become an Automotive Instructor to share knowledge and advance to a supervisory level.</p>",
    "title-skills":"Skills","skill-1":"Photography",
    "react-label-profile":"Leave a reaction:",
    "desc-contact":"Let's discuss and collaborate!",
    "title-org":"Organization","org-about-title":"Sadulur Sepoor Indonesia",
    "org-about-subtitle":"Train Enthusiast Community",
    "org-about-desc":"A gathering place for train enthusiasts (railfans) to share information, document activities, and strengthen bonds. Starting from a hobby, I contributed and grew with this community from a regular member to being entrusted as the Chairman.",
    "org-track-title":"Position Track Record",
    "org-1-title":"Member","org-1-desc":"<li>Participated in community activities.</li><li>Expanded railway knowledge.</li>",
    "org-2-title":"Documentation Division","org-2-desc":"<li>Captured moments during events.</li><li>Created documentary films.</li>",
    "org-3-title":"HR Division","org-3-desc":"<li>Managed member data.</li><li>Recruited and selected new members.</li>",
    "org-4-title":"Chairman","org-4-desc":"<li>Leading all operational activities.</li><li>Integrating website technology systems.</li>",
    "org-now":"present","react-label-org":"Leave a reaction:",
    "ukm-title":"Student Activity Units (UKM)",
    "ukm-1-title":"NUSAPALA","ukm-1-sub":"Nature Enthusiast Students",
    "ukm-1-desc":"Active in mountaineering, nature exploration, and training grit, physical, and mental resilience in the great outdoors.",
    "ukm-2-title":"SINATERA","ukm-2-sub":"Music &amp; Arts Division",
    "ukm-2-desc":"Channeling artistic creativity through the music division. Involved in various performances, theatrical collaborations, and campus shows.",
    "title-intern":"Internship",
    "intern-role":"Rolling Stock Assistant (September - November 2023)<br>Depo Lokomotif Besar A Cipinang",
    "intern-desc":"<li><span class=\"arrow-blue\">→</span>Assisted in the repair and maintenance of all locomotive parts.</li><li><span class=\"arrow-yellow\">→</span>Collaborated to execute instructions from the Chief Mechanic or Team Leader.</li><li><span class=\"arrow-blue\">→</span>Prepared tools required for repair and maintenance tasks.</li>",
    "react-label-intern":"Leave a reaction:",
    "title-cert":"Certificates",
    "cert-fe-title":"Front-End Web Developer","cert-fe-desc":"The Front-End Web Developer Bootcamp: HTML, CSS, JS &amp; React by Meta Brains (Udemy).",
    "cert-cyber-title":"Information Security","cert-cyber-desc":"Introduction to Information Security Course from Cyber Academy Indonesia.",
    "cert-1-title":"TEKIRO Certificate","cert-1-desc":"Participant in the TEKIRO Mechanic Competition for Vocational Schools across Java, Jakarta 2025.",
    "cert-2-title":"KAI Award Certificate","cert-2-desc":"Carried out Posko Lebaran 2025 activities at Gambir Station with the Sadulur Sepoor Community.",
    "cert-3-title":"Certificate of Competence","cert-3-desc":"Declared competent for the Light Vehicle Engineering Expertise Area, Level III KKNI.",
    "title-guestbook":"Guest Book","guestbook-sub":"Leave a message for Fathir — your message will appear here!",
    "gb-btn-text":"Send Message","visitor-label":"Visitors today","total-label":"Total visitors",
    "title-contact":"Contact Me",
    "modal-title":"Wait a Second!",
    "modal-desc":"To maintain comfort and privacy, let's connect via <strong>Gmail</strong> first.<br><br>Please provide your <strong>Full Name</strong> &amp; <strong>Purpose</strong>. Once aligned, we can chat comfortably on WhatsApp! ✨"
  }
};

// ===== DATA-NUM LABELS (section title prefix) =====
const DATANUM = {
  id: {
    "title-about":    "01 — TENTANG",
    "title-skills":   "02 — KEAHLIAN",
    "title-org":      "03 — ORGANISASI",
    "title-intern":   "04 — MAGANG",
    "title-cert":     "05 — SERTIFIKAT",
    "title-guestbook":"06 — BUKU TAMU",
    "title-contact":  "07 — KONTAK"
  },
  en: {
    "title-about":    "01 — ABOUT",
    "title-skills":   "02 — SKILLS",
    "title-org":      "03 — ORG",
    "title-intern":   "04 — INTERNSHIP",
    "title-cert":     "05 — CERT",
    "title-guestbook":"06 — GUESTBOOK",
    "title-contact":  "07 — CONTACT"
  }
};

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'id' ? 'en' : 'id';
  langBtn.textContent = currentLang === 'id' ? 'EN / ID' : 'ID / EN';
  document.documentElement.lang = currentLang;
  langBtn.classList.add('lang-flip');
  setTimeout(() => langBtn.classList.remove('lang-flip'), 400);

  const t = T[currentLang];
  for (const key in t) {
    const el = document.getElementById(key);
    if (!el) continue;
    el.classList.add('lang-changing');
    const val = t[key];
    setTimeout(() => {
      el.innerHTML = val;
      el.classList.remove('lang-changing');
    }, 175);
  }
  // Update data-num attributes on section titles (for CSS ::before label)
  setTimeout(() => {
    const dataNums = DATANUM[currentLang];
    for (const key in dataNums) {
      const el = document.getElementById(key);
      if (el) el.setAttribute('data-num', dataNums[key]);
    }
  }, 175);
  setTimeout(() => {
    const nameInput = document.getElementById('gb-name');
    const msgInput  = document.getElementById('gb-msg');
    if (nameInput) nameInput.placeholder = currentLang === 'id' ? 'Nama kamu...' : 'Your name...';
    if (msgInput)  msgInput.placeholder  = currentLang === 'id' ? 'Pesan singkat...' : 'Short message...';
    renderEntries();
  }, 200);
});

// ===== PROFILE SLIDESHOW =====
let slideIdx = 0;
const slides    = document.querySelectorAll('.slide');
const slideDots = document.querySelectorAll('.slide-dot');

function goToSlide(idx) {
  slides[slideIdx].classList.remove('active');
  slideDots[slideIdx].classList.remove('active');
  slideIdx = (idx + slides.length) % slides.length;
  slides[slideIdx].classList.add('active');
  slideDots[slideIdx].classList.add('active');
}
slideDots.forEach(dot => dot.addEventListener('click', () => {
  goToSlide(+dot.dataset.idx);
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(slideIdx + 1), 4000);
}));
let slideTimer = setInterval(() => goToSlide(slideIdx + 1), 4000);

// ===== LIGHTBOX =====
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxBg  = document.getElementById('lightbox-bg');
const lbClose     = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  lightboxImg.src = src; lightboxImg.alt = alt || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 400);
}
lbClose.addEventListener('click', closeLightbox);
lightboxBg.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function attachLightbox() {
  document.querySelectorAll('.photo-clickable').forEach(wrap => {
    if (wrap.dataset.lb) return;
    wrap.dataset.lb = '1';
    const img = wrap.querySelector('img');
    if (img) wrap.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
  document.querySelectorAll('.cert-card').forEach(card => {
    if (card.dataset.lb) return;
    card.dataset.lb = '1';
    const img = card.querySelector('img');
    if (img) card.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
}
attachLightbox();

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  document.querySelectorAll('.reveal-item, .reveal-stagger').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('active');
  });
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight - 40 && !bar.classList.contains('animated'))
      bar.classList.add('animated');
  });
}
window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll();

// ===== VISITOR COUNTER =====
function initVisitor() {
  const today    = new Date().toISOString().slice(0, 10);
  const lastDay  = localStorage.getItem('fam_lastday') || '';
  let dailyCnt   = parseInt(localStorage.getItem('fam_daily') || '0');
  let totalCnt   = parseInt(localStorage.getItem('fam_total') || '0');
  if (lastDay !== today) { dailyCnt = 0; localStorage.setItem('fam_lastday', today); }
  dailyCnt++; totalCnt++;
  localStorage.setItem('fam_daily', dailyCnt);
  localStorage.setItem('fam_total', totalCnt);

  function animCount(el, target) {
    let cur = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur.toLocaleString();
      if (cur >= target) clearInterval(iv);
    }, 30);
  }
  animCount(document.getElementById('visitor-count'), dailyCnt);
  animCount(document.getElementById('total-count'),   totalCnt);
}
initVisitor();

// ===== REACTIONS =====
function initReactions() {
  document.querySelectorAll('.react-btn').forEach(btn => {
    const sec   = btn.dataset.section;
    const emoji = btn.dataset.emoji;
    const key   = 'fam_react_' + sec + '_' + emoji;
    const myKey = 'fam_reacted_' + sec + '_' + emoji;
    let count   = parseInt(localStorage.getItem(key) || '0');
    btn.querySelector('.react-num').textContent = count;
    if (localStorage.getItem(myKey)) btn.classList.add('reacted');

    btn.addEventListener('click', () => {
      if (localStorage.getItem(myKey)) {
        count = Math.max(0, count - 1);
        localStorage.removeItem(myKey);
        btn.classList.remove('reacted');
      } else {
        count++;
        localStorage.setItem(myKey, '1');
        btn.classList.add('reacted');
        const emojiSpan = btn.querySelector('span');
        emojiSpan.classList.remove('burst');
        void emojiSpan.offsetWidth;
        emojiSpan.classList.add('burst');
      }
      localStorage.setItem(key, count);
      btn.querySelector('.react-num').textContent = count;
    });
  });
}
initReactions();

// ===== GUESTBOOK =====
const GB_KEY = 'fam_guestbook';
function loadEntries() { try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; } catch { return []; } }
function saveEntries(arr) { localStorage.setItem(GB_KEY, JSON.stringify(arr.slice(-50))); }
function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function renderEntries() {
  const container = document.getElementById('guestbook-entries');
  const entries   = loadEntries();
  const emptyMsg  = currentLang === 'id' ? 'Belum ada pesan. Jadilah yang pertama! 🎉' : 'No messages yet. Be the first! 🎉';
  if (!entries.length) {
    container.innerHTML = '<p class="gb-empty">' + emptyMsg + '</p>';
    return;
  }
  container.innerHTML = [...entries].reverse().map(e =>
    '<div class="gb-entry">' +
      '<div class="gb-entry-name">' + escapeHtml(e.name) + '</div>' +
      '<div class="gb-entry-msg">'  + escapeHtml(e.msg)  + '</div>' +
      '<div class="gb-entry-time">' + e.time + '</div>' +
    '</div>'
  ).join('');
}

document.getElementById('gb-submit').addEventListener('click', () => {
  const nameEl = document.getElementById('gb-name');
  const msgEl  = document.getElementById('gb-msg');
  const name   = nameEl.value.trim();
  const msg    = msgEl.value.trim();
  if (!name || !msg) {
    [nameEl, msgEl].forEach(el => {
      if (!el.value.trim()) { el.style.borderColor = '#ef4444'; setTimeout(() => el.style.borderColor = '', 1500); }
    });
    return;
  }
  const now  = new Date();
  const time = now.toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
  const arr  = loadEntries();
  arr.push({ name, msg, time });
  saveEntries(arr);
  nameEl.value = ''; msgEl.value = '';
  renderEntries();
  attachCursorHover();
});
renderEntries();

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ===== AI CHAT =====
const aiBtn      = document.getElementById('ai-chat-btn');
const aiPanel    = document.getElementById('ai-chat-panel');
const aiClose    = document.getElementById('ai-chat-close');
const aiInput    = document.getElementById('ai-input');
const aiSend     = document.getElementById('ai-send');
const aiMessages = document.getElementById('ai-messages');
const aiSuggestions = document.getElementById('ai-suggestions');

// Context about Fathir for the AI
const FATHIR_CONTEXT = `Kamu adalah asisten AI untuk portofolio Fathir Ahmad Maulana. 
Jawab hanya pertanyaan yang berhubungan dengan Fathir. Gunakan bahasa yang sama dengan pertanyaan (Indonesia atau Inggris).
Berikut profil Fathir:
- Nama: Fathir Ahmad Maulana
- Lulus 2025, jurusan Teknik Kendaraan Ringan Otomotif (SMK)
- Keahlian: Fotografi (95%), Ms. Word (70%), HTML (68%), CSS (65%), JavaScript (65%), Ms. PPT (64%), Ms. Excel (54%)
- Pengalaman: PKL/Magang di PT. KAI (Kereta Api Indonesia) sebagai Asisten Rolling Stock, Sep-Nov 2023, Depo Lokomotif Besar A Cipinang. Tugas: perbaikan & perawatan lokomotif, bekerja sama dengan Kepala Mekanik.
- Organisasi: Sadulur Sepoor Indonesia (komunitas pecinta kereta api) — pernah menjadi Anggota (2022-2024), Divisi Dokumentasi (2024-2025), Divisi SDM (2025), dan kini Ketua Umum (2025-sekarang)
- UKM: NUSAPALA (pendakian gunung, alam bebas) dan SINATERA (divisi musik & seni, teater)
- Sertifikat: Front-End Web Developer (Udemy), Information Security (Cyber Academy Indonesia), Peserta TEKIRO Mechanic Competition 2025, Piagam KAI Posko Lebaran 2025, Sertifikat Kompetensi KKNI Level III
- Tujuan karier: menjadi Instruktur Otomotif, ingin berbagi ilmu hingga level supervisor
- Kontak: +62 821-1296-4343, fatirahmad067@gmail.com, Instagram @eskopss / @fagatigir
Jawab dengan ramah, singkat (max 3 kalimat), dan natural.`;

let aiOpen = false;
let aiChatHistory = [];

function toggleAI() {
  aiOpen = !aiOpen;
  aiPanel.classList.toggle('open', aiOpen);
  if (aiOpen) { setTimeout(() => aiInput.focus(), 400); }
}

aiBtn.addEventListener('click', toggleAI);
aiClose.addEventListener('click', () => { aiOpen = false; aiPanel.classList.remove('open'); });

// Suggestion buttons
document.querySelectorAll('.ai-suggest-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset.q;
    aiInput.value = q;
    sendAIMessage();
    aiSuggestions.style.display = 'none';
  });
});

function addAIMessage(text, role) {
  const div = document.createElement('div');
  div.className = 'ai-msg ' + (role === 'user' ? 'ai-msg-user' : 'ai-msg-bot');
  div.innerHTML = '<div class="ai-msg-bubble">' + text + '</div>';
  aiMessages.appendChild(div);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  return div;
}

async function sendAIMessage() {
  const q = aiInput.value.trim();
  if (!q) return;
  aiInput.value = '';
  aiSuggestions.style.display = 'none';

  addAIMessage(q, 'user');
  aiChatHistory.push({ role: 'user', content: q });

  // Typing indicator
  const typingEl = addAIMessage('', 'bot');
  typingEl.classList.add('ai-typing');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: q, history: aiChatHistory.slice(-6) })
    });
    const data = await res.json();
    const reply = data.reply || (currentLang === 'id'
      ? 'Maaf, tidak bisa terhubung. Coba lagi ya!'
      : 'Sorry, could not connect. Please try again!');

    typingEl.classList.remove('ai-typing');
    typingEl.querySelector('.ai-msg-bubble').textContent = reply;
    aiChatHistory.push({ role: 'assistant', content: reply });
  } catch {
    typingEl.classList.remove('ai-typing');
    typingEl.querySelector('.ai-msg-bubble').textContent = currentLang === 'id'
      ? 'Maaf, terjadi kesalahan. Coba lagi!' : 'Sorry, an error occurred. Try again!';
  }
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

aiSend.addEventListener('click', sendAIMessage);
aiInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendAIMessage(); });

// Update AI welcome message on lang change (hook into existing langBtn)
const origLangClick = langBtn.onclick;
langBtn.addEventListener('click', () => {
  setTimeout(() => {
    const welcomeEl = document.getElementById('ai-welcome-msg');
    if (welcomeEl) {
      welcomeEl.textContent = currentLang === 'id'
        ? 'Halo! 👋 Saya AI asisten Fathir. Tanya apa saja tentang profil, pengalaman, atau keahlian saya!'
        : 'Hi! 👋 I\'m Fathir\'s AI assistant. Ask me anything about his profile, experience, or skills!';
    }
    const panelTitle = document.getElementById('ai-panel-title-text');
    if (panelTitle) panelTitle.textContent = currentLang === 'id' ? 'Tanya tentang Fathir' : 'Ask about Fathir';
    // Update suggestion buttons
    const suggests = document.querySelectorAll('.ai-suggest-btn');
    if (currentLang === 'en') {
      const enQ = ["What are Fathir's main skills?","Tell me about his internship","What position suits Fathir?"];
      const enL = ["Main skills?","Internship experience","Best position?"];
      suggests.forEach((btn, i) => { btn.dataset.q = enQ[i]; btn.textContent = enL[i]; });
    } else {
      const idQ = ["Apa keahlian utama Fathir?","Ceritakan pengalaman magang Fathir","Fathir cocok untuk posisi apa?"];
      const idL = ["Apa keahliannya?","Pengalaman magang","Cocok posisi apa?"];
      suggests.forEach((btn, i) => { btn.dataset.q = idQ[i]; btn.textContent = idL[i]; });
    }
    // Update share modal texts
    const shareTitle = document.getElementById('share-title-text');
    const shareDesc  = document.getElementById('share-desc-text');
    const shareCopy  = document.getElementById('share-copy-text');
    if (shareTitle) shareTitle.textContent = currentLang === 'id' ? 'Bagikan Profil' : 'Share Profile';
    if (shareDesc)  shareDesc.textContent  = currentLang === 'id'
      ? 'Salin link atau bagikan profil Fathir ke orang lain:'
      : 'Copy link or share Fathir\'s profile with others:';
    if (shareCopy)  shareCopy.textContent  = currentLang === 'id' ? 'Salin' : 'Copy';
  }, 200);
});

// ===== SHARE BUTTON =====
const shareBtn     = document.getElementById('share-btn');
const shareOverlay = document.getElementById('share-overlay');
const shareClose   = document.getElementById('share-close');
const shareCopyBtn = document.getElementById('share-copy');
const shareWaBtn   = document.getElementById('share-wa');
const shareUrl     = window.location.href;

document.getElementById('share-url-display').textContent = shareUrl;

shareWaBtn.href = 'https://wa.me/?text=' + encodeURIComponent(
  (currentLang === 'id' ? 'Lihat portofolio Fathir Ahmad Maulana: ' : 'Check out Fathir Ahmad Maulana\'s portfolio: ')
  + shareUrl
);

shareBtn.addEventListener('click', () => {
  shareOverlay.classList.add('open');
  // Update WA link with current lang
  shareWaBtn.href = 'https://wa.me/?text=' + encodeURIComponent(
    (currentLang === 'id' ? 'Lihat portofolio Fathir Ahmad Maulana: ' : "Check out Fathir Ahmad Maulana's portfolio: ")
    + shareUrl
  );
});
shareClose.addEventListener('click',  () => shareOverlay.classList.remove('open'));
shareOverlay.addEventListener('click', e => { if (e.target === shareOverlay) shareOverlay.classList.remove('open'); });

shareCopyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(shareUrl).then(() => {
    const txt = document.getElementById('share-copy-text');
    txt.textContent = currentLang === 'id' ? '✓ Disalin!' : '✓ Copied!';
    setTimeout(() => { txt.textContent = currentLang === 'id' ? 'Salin' : 'Copy'; }, 2000);
  });
});

// ===== UPDATE BILINGUAL for new elements in translations =====
// Patch the existing langBtn listener to also handle AI & Share UI
// (already handled above via the second langBtn event listener)
// ===== WA TRAP POPUP =====
const waTrapOverlay = document.getElementById('wa-trap-overlay');
const waTrapClose   = document.getElementById('wa-trap-close');
const ccardWa       = document.getElementById('ccard-wa');

const WA_MESSAGE = 'Eits, tunggu dulu! 🤚\n\nDemi menjaga privasi Fathir, nomor WhatsApp-nya tidak dibagikan langsung ke publik.\n\nKamu bisa berkenalan terlebih dahulu — cukup perkenalkan dirimu dan sampaikan tujuanmu. Kalau sudah cocok, Fathir akan dengan senang hati memberimu nomor WA-nya. 😊';

function openWaTrap() {
  waTrapOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const typingWrap = document.getElementById('wa-typing-wrap');
  const bubbleMain = document.getElementById('wa-bubble-main');
  const bubbleText = document.getElementById('wa-bubble-text');
  const actions    = document.getElementById('wa-trap-actions');

  // Reset state
  typingWrap.style.display = 'flex';
  bubbleMain.style.display  = 'none';
  actions.style.display     = 'none';
  bubbleText.textContent    = '';

  // After "typing"... show message
  setTimeout(() => {
    typingWrap.style.display = 'none';
    bubbleMain.style.display  = 'flex';
    // Typewriter effect
    let i = 0;
    bubbleText.innerHTML = '';
    const chars = WA_MESSAGE.split('');
    function typeChar() {
      if (i < chars.length) {
        if (chars[i] === '\n') {
          bubbleText.innerHTML += '<br>';
        } else {
          bubbleText.innerHTML += chars[i];
        }
        i++;
        setTimeout(typeChar, 18);
      } else {
        // Show action buttons after typing done
        setTimeout(() => {
          actions.style.display = 'block';
          actions.style.animation = 'msgPop 0.4s cubic-bezier(0.34,1.56,0.64,1)';
        }, 300);
      }
    }
    typeChar();
  }, 1600);
}

function closeWaTrap() {
  waTrapOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (ccardWa) {
  ccardWa.addEventListener('click', openWaTrap);
}
if (waTrapClose) {
  waTrapClose.addEventListener('click', closeWaTrap);
}
if (waTrapOverlay) {
  waTrapOverlay.addEventListener('click', e => {
    if (e.target === waTrapOverlay) closeWaTrap();
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && waTrapOverlay && waTrapOverlay.classList.contains('open')) {
    closeWaTrap();
  }
});

// ===== CONTACT NAV LINK FIX =====
// Update nav Contact link to point to #contact section
document.querySelectorAll('[id^="nav-contact"], [id^="mnav-contact"]').forEach(el => {
  el.setAttribute('href', '#contact');
});