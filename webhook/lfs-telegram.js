'use strict';
// ── LFS SHANGHAI TELEGRAM BOT v2.0 ───────────────────────────────
// Sprint 4+: AI Marketing Content Intelligence
//   1. LFS Brand Voice — бүх caption-д тусгасан
//   2. Post Memory    — сүүлийн 14 постыг санаж давтахгүй
//   3. /weekplan      — 7 хоногийн 14 пост, тус бүрийг approve
//   4. Format support — single / carousel / reel

const fetch  = require('node-fetch');
const { admin, dbLFS } = require('./firebase');

const TG_TOKEN   = process.env.TELEGRAM_BOT_TOKEN_LFS || process.env.TELEGRAM_TOKEN;
const TG_CHAT    = process.env.TELEGRAM_ID            || process.env.TELEGRAM_CHAT_ID;
const META_TOKEN    = process.env.ACCESS_TOKEN_META;
const IG_ID         = process.env.INSTAGRAM_BUSINESS_ID;
const FB_ID         = process.env.FACEBOOK_PAGE_ID;
const FB_PAGE_TOKEN = process.env.FACEBOOK_PAGE_TOKEN; // permanent page token (never-expiring)
const UID        = process.env.USER_UID;
const GH_TOKEN   = process.env.SYSTEM_USE_TOKEN;
const PEXELS_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// ── LFS BRAND VOICE ───────────────────────────────────────────────
const LFS_BRAND = `
ҮНДСЭН ДҮР: Чи бол LFS Shanghai (lfsshanghai.com)-ийн сошиал контент менежер. LFS бол Шанхай руу аялах бүх зүйлийг (буудал, хөтөч, унаа, Alipay, орчуулга) болон эрүүл мэндийн оношилгоог цогцоор шийддэг платформ. Гэхдээ ЭНЭ БОЛ САЛБАРЫН ХУУДАС, ЗАР БИШ — Шанхай сонирхсон Монгол хүн дагахыг хүсэх АМЬД, ХЭРЭГТЭЙ контент бичнэ.

КОНТЕНТЫН ФИЛОСОФИ (хамгийн чухал — заавал ойлго):
- Хүн дандаа "манайхаар үйлчлүүл" гэсэн зар уншихыг хүсдэггүй. Тиймээс ИХЭНХ пост Шанхайн тухай цэвэр ҮНЭ ЦЭНЭ өгнө — цаг агаар, болж буй event, үзэх газар, хоол, юу өмсөх, практик зөвлөгөө. Уншигч "өө, энэ хэрэгтэй мэдээлэл байна" гэж бодож, хадгалж, дагах ёстой.
- LFS-ийн үйлчилгээг (эмнэлэг, буудал, угтаа, хөтөч) ЗӨВХӨН тухайн постын сэдэвт байгалийн жамаар тохирвол зөөлөн дурд, эсвэл постын доор нэг мөрөөр brand болгож үлдээ. Цэвэр value постыг үйлчилгээний зараар БҮҮ бузарла.
- Доорх ДААЛГАВАР хэсэгт пост бүрд тус тусын СЭДЭВ (pillar) зааж өгсөн байна. Пост бүрийг ЗӨВХӨН өөрийнх нь сэдэвт суурилж бич.

УНШИГЧ: Шанхай руу аялах/бизнес/зугаалахаар сонирхож буй Монгол хүн. Өвчтэй хүн биш. "Та" гэж шууд, найзархуу ханд.

ШАНХАЙ МЭДЛЭГ (контентдоо ашигла):
• Газар (ЗӨВХӨН доорх баталгаатай тайлбарыг ашигла, бусдыг зохиохгүй):
  - The Bund (外滩): Huangpu голын эрэг дэх түүхэн барилгууд, оройн гэрэлт хотын дүр зураг.
  - Yu Garden (豫园): Мин гүрний үеийн ХЯТАДЫН уламжлалт цэцэрлэг (Японы биш).
  - Tianzifang (田子坊): нарийн гудамжтай уран бүтээлчдийн дүүрэг, жижиг дэлгүүр, кафе.
  - French Concession (法租界): мод сүүдэртэй түүхэн гудамж, бутик, кафе, амтат ресторан.
  - Xintiandi (新天地): хуучин shikumen байшинг сэргээсэн загварлаг хоол, зугаа цэнгэлийн дүүрэг.
  - Nanjing Road (南京路): Шанхайн гол явган шоппинг гудамж.
  - Zhujiajiao (朱家角): Шанхайн захын эртний усан тосгон, суваг, чулуун гүүрнүүд.
  - Shanghai Disneyland (上海迪士尼), Oriental Pearl Tower (东方明珠).
  ⚠️ Газрын нэрийг МОНГОЛООР ГАЛИГЛАХ нь ХАТУУ ХОРИОТОЙ. "Тяньззыфан", "Нанжин гудамж", "Вайтань" гэж БИЧИХГҮЙ — зөвхөн англи нэр + ханз: "Tianzifang (田子坊)", "Nanjing Road (南京路)", "The Bund (外滩)".
• Цаг агаар: 2026.06 — Meiyu (梅雨) борооны улирал, чийглэг бүгчим, бороо ойр ойрхон. Шүхэр/нимгэн нөмрөг хэрэгтэй.
• Хоол (нэрийг галиглахгүй, англи/ханзаар): xiaolongbao (小笼包, шөлтэй жижиг бууз), shengjianbao (生煎包, ёроолыг нь шарсан шөлтэй бууз), hairy crab (大闸蟹, НАМРЫН улирлын амттан); Yang's, Jia Jia Tang Bao зэрэг алдартай.
• Практик: Alipay/WeChat Pay-д Монгол карт холбоно, Metro хямд хурдан, DiDi такси, eSIM, орчуулгын апп.

LFS ҮЙЛЧИЛГЭЭ (зөвхөн service сэдэвт ашигла):
• Алтан VIP багц (5ө/4шө): шинжилгээ + хөтөч + хоол + буудлын угтаа/хүргэлт + зочид буудал.
• Мөнгөн багц (2ө): шинжилгээ + товч аялал.
• Guangming TCM-ийн VIP тасаг — очергүй, 2-3 цагт оношилгоо дуусдаг, Монгол орчуулагчтай.
• Эрүүл мэндийн постын далд логик: "аялалын хажуугаар 2-3 цаг гаргаад биеэ оношлуулах нь ухаалаг нэмэлт." Аялал суурь, оношилгоо нэмэлт.
• ⚠️ Үнэ ХЭЗЭЭ Ч дурдахгүй.

БҮТЭЦ (caption бүр, дугаар бичихгүй):
• Хүүк — сэдэвтээ тохирсон, "та" гэж шууд хандсан анхаарал татах 1-2 өгүүлбэр.
• Гол агуулга — сэдвийн бодит, хэрэгтэй мэдээллийг амьд хэлээр 2-4 өгүүлбэр.
• Төгсгөл — value/trust постод зөөлөн дүгнэлт; service постод л шууд CTA. Пост бүрт ӨӨР найруулгаар, давтахгүй.
• CTA: "👉 lfsshanghai.com руу орж үнэгүй зөвлөгөө авна уу"

ХАШТАГ (судалгаагаар — Instagram 2026 нь 5 хязгаартай, ladder арга):
• Яг 3-5 хаштаг. #LFSShanghai заавал орно.
• Ladder: 1 нарийн (жишээ #CheckupShanghai #MongolianTraveler), 1 дунд (#ShanghaiTrip #HealthTourism), 1 өргөн (#Shanghai #MedicalTourism). Сэдэвтээ тохируул.
• Хаштаг бол ангиллын шошго — спам бус, агуулгад үнэхээр тохирсон үг сонго.

MEDICAL TOURISM ЁС ЗҮЙ (судалгаагаар):
• Эрүүл мэндийн постыг "өвчтэй хүн"-д БУС, эрүүл/урьдчилан сэргийлэх эерэг өнгөөр гарга. Айдас бус, амар тайван.
• Хэт амлалт ("100% эдгэрнэ", "баталгаатай") ОГТ өгөхгүй. "ихэвчлэн", "боломжтой" гэх зөөлөн үг.
• Хэн нэгний эрүүл мэндийн мэдээллийг зөвшөөрөлгүй бүү дурд.

ФАКТЫН ҮНЭН ЗӨВ (ХАТУУ): Газар, хоол, үзвэрийн тухай ЗӨВХӨН дээр өгсөн баталгаатай мэдээллийг ашигла. Мэдэхгүй нарийн ширийнийг БҮҮ зохио (hallucinate) — эргэлзвэл ерөнхийлж бич. Жишээ нь Yu Garden-ийг "Японы" гэх мэт буруу тодорхойлолт ОГТ бичихгүй.

ХАТУУ ХОРИГ: дугаарласан БОЛОН цэгчилсэн жагсаалт (1. 2. / 1️⃣ / "- " / •) — бүгд хориотой, зөвхөн урсгал параграфаар бич; "Манай платформд/Манайхаар үйлчлүүлж буй", гуравдагч этгээдийн "таны аялагчдад", үнэ/тоо баримт, техникийн тэмдэглэгээ, хоосон богино параграф, 3 пост дээр давтагдсан өгүүлбэр, газар/хоолны нэрийг монголоор галиглах. Параграф бүр бүтэн, амьд.

CTA-ийн өмнө ЗААВАЛ \\n\\n зай авч, "👉 lfsshanghai.com..." мөрийг тусад нь гарга — өмнөх өгүүлбэртэй нэг мөрөнд бүү наа.

ДААЛГАВАР: Доорх сэдэв/контекстод тааруулж дээрх дүрмээр пост үүсгэ: [INPUT_PROMPT]
`;

// ── CONTENT PILLARS ───────────────────────────────────────────────
// Судалгаагаар (Gemini + ChatGPT): 80/20 дүрэм — 80% value/trust, 20% зар.
// VALUE = цэвэр Шанхай контент (хүн татах). TRUST = бодит түүх/итгэл (хамгийн
// өндөр engagement, Bumrungrad загвар). SERVICE = шууд үйлчилгээ (хамгийн ховор).
const CONTENT_PILLARS = {
  value: [
    '🌆 ШАНХАЙ ГАЙД: алдартай ба нуугдмал газрууд (Bund, Yu Garden, Tianzifang, French Concession, Xintiandi, Zhujiajiao усан тосгон). Хаана юу үзэх, хэзээ очвол гоё, нэг өдрийн маршрут. LFS-ийг бараг дурдахгүй, цэвэр гайд.',
    '🌧️ ЦАГ АГААР & БЭЛТГЭЛ: одоо Meiyu (梅雨) борооны улирал — чийглэг, бүгчим, бороотой. Юу өмсөх, шүхэр заавал авах, ямар гутал тохиромжтой, чийгээс хэрхэн сэргийлэх. Практик зөвлөмж.',
    '🎉 EVENT & УЛИРЛЫН ОНЦЛОХ: зуны Шанхайд болдог үзэсгэлэн, концерт, наадам, шөнийн зах, улирлын онцлог үйл явдлууд. Аялагч юунд анхаарах.',
    '🍜 ХООЛ & АМЬДРАЛ: Шанхайн алдартай хоол (xiaolongbao, shengjianbao, hairy crab), хаана идэх, зах зээл, кофе шоп, шөнийн хоол. Амтлах ёстой зүйлс.',
    '💳 ПРАКТИК ЗӨВЛӨГӨӨ: Alipay/WeChat Pay-д Монгол карт холбох, Metro карт, DiDi такси, eSIM, орчуулгын апп, 240 цагийн визгүй зорчих журам — Шанхайд төвөггүй явах амьд зөвлөмжүүд.',
  ],
  trust: [
    '💬 БОДИТ ТҮҮХ: Шанхайд аялаад оношлуулсан Монгол хүний сэтгэгдэл/туршлага түүх хэлбэрээр ("гацаа хүлээхгүй, орчуулагчтай учир айдасгүй байсан"). Зар биш, хүний бодит яриа.',
    '🤝 ТАЙЛАНГИЙН АРД: нэг өдрийн дүр зураг — буудлаас угтахаас эхлээд хөтөч, орчуулагч аялагчийг алхам тутамд хэрхэн дэмждэг. Дотоод халамжийг ил харуул.',
    '❓ FAQ & АЙДАС ТАЙЛАХ: "Хятадад хэлгүй яаж явах вэ? Төлбөр яаж хийх вэ? Эмнэлэг найдвартай юу?" гэх Монголчуудын хамгийн их асуудаг айдсыг даруухан, тайвнаар хариул.',
  ],
  service: [
    '🏥 ЭРҮҮЛ МЭНД (зөөлөн upsell): аяллынхаа хажуугаар Guangming TCM-ийн VIP тасагт очергүй 2-3 цагт биеэ оношлуулах, Монгол орчуулагчтай. Аялал суурь, оношилгоо ухаалаг нэмэлт. Урьдчилан сэргийлэх эерэг өнгөтэй, "өвчтэй" өнгөгүй.',
    '🧳 LFS ЦОГЦ ҮЙЛЧИЛГЭЭ: онгоцны буудал угтаа, хувийн хөтөч, буудал захиалга, цогц VIP багц — Шанхайд бүх зүйлээ нэг дороос шийдэх тав тух.',
  ],
};

// Slot-д тааруулж pillar сонгоно (Монгол сошиал идэвхжлийн оргил цагт уялдсан):
//   morning → цэвэр мэдээллийн value контент (гид, Alipay, цаг агаар, хоол)
//   evening → итгэлцэл/сэтгэл хөдлөл давамгай (бодит түүх, влог) + 1 зөөлөн зар
//   default → /marketing командын 80/20 тэнцвэр (2 value + 1 trust/service)
function pickPillars(slot = 'default') {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  let picks;
  if (slot === 'morning') {
    picks = shuffle(CONTENT_PILLARS.value).slice(0, 3);
  } else if (slot === 'evening') {
    const t = shuffle(CONTENT_PILLARS.trust).slice(0, 2);
    const s = CONTENT_PILLARS.service[Math.floor(Math.random() * CONTENT_PILLARS.service.length)];
    picks = [...t, s];
  } else {
    const v = shuffle(CONTENT_PILLARS.value).slice(0, 2);
    const pool = Math.random() < 0.6 ? CONTENT_PILLARS.trust : CONTENT_PILLARS.service;
    picks = [...v, pool[Math.floor(Math.random() * pool.length)]];
  }
  return shuffle(picks);
}

// ── FORMAT GUIDE ──────────────────────────────────────────────────
const FORMAT_GUIDE = {
  single:   '1 зурагтай пост — товч, хүчтэй нэг гол санаа, 130–180 тэмдэгт caption',
  carousel: 'Carousel (5–7 слайд) — гарчиг + алхам алхамаар тайлбар, 150–200 тэмдэгт',
  reel:     'Reels видео — анхны 3 секунд анхаарал татах hook, хурдан темп, 100–140 тэмдэгт',
};
const FORMAT_EMOJI = { single: '📸', carousel: '🎠', reel: '🎬' };

// ── HELPERS ───────────────────────────────────────────────────────
async function tgCall(method, body) {
  const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}
const tgSend   = (text, extra = {}) =>
  tgCall('sendMessage', { chat_id: TG_CHAT, text, parse_mode: 'Markdown', ...extra });
const tgAnswer = (id, text = '') =>
  tgCall('answerCallbackQuery', { callback_query_id: id, text });

const todaySH = () => new Date().toLocaleDateString('sv', { timeZone: 'Asia/Shanghai' });

// Firestore refs
const pendingRef = () => dbLFS.doc(`users/${UID}/marketing/pendingPost`);
const manualRef  = () => dbLFS.doc(`users/${UID}/marketing/manualState`);

// ── POST MEMORY ───────────────────────────────────────────────────
// Сүүлийн 14 approve хийсэн постыг санана — давтахаас зайлсхийнэ
async function getPostHistory() {
  try {
    const snap = await dbLFS.doc(`users/${UID}/marketing/postHistory`).get();
    return snap.exists ? (snap.data().posts || []) : [];
  } catch { return []; }
}

async function saveToPostHistory(post) {
  try {
    const history = await getPostHistory();
    history.push({
      title:    post.title || post.topic || '—',
      caption:  (post.caption || '').slice(0, 120),
      format:   post.format || 'single',
      topic:    post.topic || post.angle || post.title || '',
      savedAt:  new Date().toISOString(),
    });
    if (history.length > 14) history.splice(0, history.length - 14);
    await dbLFS.doc(`users/${UID}/marketing/postHistory`).set({
      posts: history,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) { console.error('[PostHistory] Save error:', e.message); }
}

// ── META PUBLISH ──────────────────────────────────────────────────
async function postToIG(imageUrl, caption, hashtags) {
  const cRes  = await fetch(`https://graph.facebook.com/v25.0/${IG_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: imageUrl, caption, access_token: META_TOKEN }),
  });
  const cData = await cRes.json();
  if (!cData.id) return { ok: false, err: cData.error?.message || 'Container алдаа' };

  await new Promise(r => setTimeout(r, 2000));

  const pRes  = await fetch(`https://graph.facebook.com/v25.0/${IG_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: cData.id, access_token: META_TOKEN }),
  });
  const pData = await pRes.json();
  if (pData.error) return { ok: false, err: pData.error.message };

  if (hashtags && pData.id) {
    await new Promise(r => setTimeout(r, 1500));
    await fetch(`https://graph.facebook.com/v25.0/${pData.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: hashtags, access_token: META_TOKEN }),
    });
  }
  dbLFS.doc(`users/${UID}/marketing/lastPost`)
    .set({ postedAt: new Date().toISOString() }).catch(() => {});
  return { ok: true, postId: pData.id };
}

// ── FACEBOOK PAGE PUBLISH ─────────────────────────────────────────
// FB_PAGE_TOKEN = permanent page token (never-expiring)
// Хэрэв байхгүй бол META_TOKEN-оос page token татна (pages_show_list шаардлагатай)
async function postToFB(imageUrl, caption, hashtags) {
  if (!FB_ID) return { ok: false, err: 'FACEBOOK_PAGE_ID тохиргоогүй' };

  let pageToken = FB_PAGE_TOKEN;
  if (!pageToken) {
    try {
      const ptRes  = await fetch(`https://graph.facebook.com/v25.0/${FB_ID}?fields=access_token&access_token=${META_TOKEN}`);
      const ptData = await ptRes.json();
      pageToken    = ptData.access_token;
      if (!pageToken) {
        console.error('[FB] Page token авч чадсангүй:', JSON.stringify(ptData));
        return { ok: false, err: 'Page token авч чадсангүй — FACEBOOK_PAGE_TOKEN нэм эсвэл pages_show_list permission шалга' };
      }
      console.log('[FB] Page token fetched dynamically');
    } catch (e) {
      return { ok: false, err: `Page token fetch алдаа: ${e.message}` };
    }
  }

  const fullMsg = [caption, hashtags].filter(Boolean).join('\n\n');
  try {
    const fbRes  = await fetch(`https://graph.facebook.com/v25.0/${FB_ID}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imageUrl, message: fullMsg, access_token: pageToken }),
    });
    const fbData = await fbRes.json();
    if (fbData.error) {
      console.error('[FB] Post error:', JSON.stringify(fbData.error));
      return { ok: false, err: fbData.error.message };
    }
    return { ok: true, postId: fbData.id || fbData.post_id };
  } catch (e) {
    return { ok: false, err: e.message };
  }
}

async function fetchNewImage(query = 'shanghai') {
  try {
    if (PEXELS_KEY) {
      const r = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10`,
        { headers: { Authorization: PEXELS_KEY } }
      );
      const d = await r.json();
      if (d.photos?.length) {
        // Санамсаргүй сонгох — давхардахгүй байхын тулд
        const idx = Math.floor(Math.random() * d.photos.length);
        return d.photos[idx].src.large2x;
      }
    }
    if (UNSPLASH_KEY) {
      const r = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
      );
      const d = await r.json();
      if (d.results?.length) {
        const idx = Math.floor(Math.random() * Math.min(d.results.length, 5));
        return d.results[idx].urls.regular;
      }
    }
  } catch {}
  return 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570';
}

// ── CAPTION GENERATOR v2.0 ────────────────────────────────────────
// GitHub Models (gpt-4o-mini) — Gemini quota-аас хамааралгүй
async function generateCaption(hint = '', format = 'single') {
  if (!GH_TOKEN) return {
    caption: hint || 'LFS Shanghai 🌆', hashtags: '#LFSShanghai #Shanghai',
    fullCaption: `${hint || 'LFS Shanghai 🌆'}\n\n👉 lfsshanghai.com`, format,
  };

  const fGuide = FORMAT_GUIDE[format] || FORMAT_GUIDE.single;

  const prompt =
    `${LFS_BRAND}\n\n` +
    `Формат: ${fGuide}\n` +
    (hint ? `Сэдэв: "${hint}"\n\n` : 'Өдөр тутмын LFS контент.\n\n') +
    `Дараах зүйлсийг бэлд:\n` +
    `HOOK: (1-2 мөр, 40 тэмдэгтийн дотор — анхаарал татах, асуулт эсвэл bold мэдэгдэл)\n` +
    `CAPTION: (130-180 тэмдэгт, цэгтэй гүйцэд өгүүлбэрүүд, emoji, бодит туршлагаас)\n` +
    `CTA: (нэг мөр, заавал "👉 lfsshanghai.com" оруулах)\n` +
    `HASHTAGS: (15 хамааралтай hashtag: Монгол, Шанхай, эмнэлэг, аялал гэх мэт)\n` +
    (format === 'carousel' ? `SLIDES: (5 слайдын гарчиг, тус бүр товч)\n` : '') +
    (format === 'reel'     ? `SCRIPT: (15 секундын товч script, 3 хэсэг)\n` : '');

  try {
    const r = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GH_TOKEN}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600,
        temperature: 0.85,
      }),
    });
    const d   = await r.json();
    const raw = d.choices?.[0]?.message?.content || '';

    const hook     = raw.match(/HOOK:\s*([\s\S]*?)(?=CAPTION:|$)/i)?.[1]?.trim() || '';
    const caption  = raw.match(/CAPTION:\s*([\s\S]*?)(?=CTA:|$)/i)?.[1]?.trim() || '';
    const cta      = raw.match(/CTA:\s*([\s\S]*?)(?=HASHTAGS:|$)/i)?.[1]?.trim()
                     || '👉 lfsshanghai.com руу орж үнэгүй зөвлөгөө авна уу';
    const hashtags = raw.match(/HASHTAGS:\s*([\s\S]*?)(?=SLIDES:|SCRIPT:|$)/i)?.[1]?.trim()
                     || '#LFSShanghai #Шанхай #МонголАялал';
    const extra    = raw.match(/(?:SLIDES|SCRIPT):\s*([\s\S]*?)$/i)?.[1]?.trim() || '';

    // Нийтлэх caption = hook + caption + cta нэгтгэсэн
    const fullCaption = [hook, caption, cta].filter(Boolean).join('\n\n');

    return { hook, caption: fullCaption, hashtags, fullCaption, extra, format };
  } catch (e) {
    console.error('[Caption] Error:', e.message);
    return {
      hook: '', caption: hint || 'LFS Shanghai 🌆',
      hashtags: '#LFSShanghai #Шанхай', fullCaption: `${hint || 'LFS Shanghai'}\n\n👉 lfsshanghai.com`,
      extra: '', format,
    };
  }
}

// ── WEEK PLAN GENERATOR ───────────────────────────────────────────
async function generateWeekPlan() {
  if (!GH_TOKEN) { await tgSend('⚠️ GH_TOKEN тохиргоогүй.'); return; }

  await tgSend('📅 *7 хоногийн 14 пост бэлдэж байна...*\nЗахиалга болгоно уу 30 секунд.');

  const history    = await getPostHistory();
  const usedTopics = history.length
    ? history.map(p => p.title).filter(Boolean).join(', ')
    : '';

  const today = todaySH();
  const DAYS  = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];

  const prompt =
    `${LFS_BRAND}\n\n` +
    `Өнөөдөр: ${today}\n` +
    (usedTopics ? `Сүүлд хийсэн постуудын сэдэв (ЯАГААД ЧИ ДАВТАХГҮЙ): ${usedTopics}\n\n` : '\n') +
    `7 хоногийн 14 постын контент план үүсгэ.\n` +
    `Өдөр бүр 2 пост: өглөө (single/carousel) + орой (reel/single).\n\n` +
    `Агуулгын өнцгүүдийг БҮГДИЙГ хамруулах (давтахгүйгээр):\n` +
    `- Шанхайн нуугдмал газрууд, хоол, амьдрал\n` +
    `- Эмнэлгийн туршлага (орчуулга, эмчтэй яриа, яаралтай тусламж)\n` +
    `- Аялалын практик зөвлөгөө (виз, нисэх онгоц, хотоор явах)\n` +
    `- LFS үйлчилгээний бодит кейс (нэр дурдахгүй)\n` +
    `- Монгол аялагчдын нийтлэг асуулт, буруу ойлголт\n` +
    `- Шанхайн соёл, хэл, ёс заншил\n` +
    `- Хямд vs үнэтэй аялал: ямар ялгаа байдаг\n\n` +
    `Форматын тараалт: single 6ш, carousel 5ш, reel 3ш.\n\n` +
    `Хариу: JSON array ЗӨВХӨН (тайлбар текст огт хэрэггүй):\n` +
    `[\n` +
    `  {\n` +
    `    "day": 1,\n` +
    `    "slot": "morning",\n` +
    `    "format": "single|carousel|reel",\n` +
    `    "title": "Постын нэр",\n` +
    `    "hook": "Анхны 1-2 мөр (40 тэмдэгт, маш хүчтэй)",\n` +
    `    "caption": "130-180 тэмдэгт, цэгтэй өгүүлбэр, emoji бүхий",\n` +
    `    "cta": "👉 lfsshanghai.com ... (нэг мөр)",\n` +
    `    "hashtags": "#LFSShanghai #tag1 #tag2 ...(15 hashtag)",\n` +
    `    "imageSearch": "pexels/unsplash-д хайх keyword (English, тодорхой)",\n` +
    `    "extra": "carousel слайдуудын гарчиг эсвэл reel script (format=single бол хоосон)"\n` +
    `  }\n` +
    `]`;

  try {
    const r = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GH_TOKEN}` },
      body: JSON.stringify({
        model:       'gpt-4o-mini',
        messages:    [{ role: 'user', content: prompt }],
        max_tokens:  4000,
        temperature: 0.9,
      }),
    });
    const d   = await r.json();
    const raw = d.choices?.[0]?.message?.content?.trim() || '';
    console.log('[WeekPlan] Raw length:', raw.length);

    const arrMatch = raw.match(/\[[\s\S]*\]/);
    if (!arrMatch) {
      console.error('[WeekPlan] JSON array гарсангүй. Raw:', raw.slice(0, 200));
      await tgSend('❌ Контент план гарсангүй. Дахин `/weekplan` оруулна уу.');
      return;
    }

    const posts = JSON.parse(arrMatch[0]);

    // Dates for 7 days
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const dt = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
      dt.setDate(dt.getDate() + i);
      dates.push(dt.toLocaleDateString('sv'));
    }

    // Save to Firestore
    const planRef  = dbLFS.doc(`users/${UID}/marketing/weekPlan`);
    const planData = { createdAt: new Date().toISOString() };

    for (const post of posts) {
      const dayIdx = Math.min(Math.max((post.day || 1) - 1, 0), 6);
      const date   = dates[dayIdx];
      const slot   = post.slot === 'evening' ? 'evening' : 'morning';
      const postId = `wp_d${dayIdx}_${slot}`;
      planData[postId] = { ...post, postId, date, status: 'pending', createdAt: new Date().toISOString() };
    }
    await planRef.set(planData);

    // Send to Telegram — 14 individual post cards
    let sentCount = 0;
    for (const post of posts.slice(0, 14)) {
      const dayIdx  = Math.min(Math.max((post.day || 1) - 1, 0), 6);
      const date    = dates[dayIdx];
      const dayName = DAYS[new Date(date + 'T12:00:00').getDay()];
      const slot    = post.slot === 'evening' ? '🌆 Орой' : '🌅 Өглөө';
      const fEmoji  = FORMAT_EMOJI[post.format] || '📸';
      const postId  = `wp_d${dayIdx}_${(post.slot === 'evening' ? 'evening' : 'morning')}`;

      const fullText =
        `${fEmoji} *${dayName} ${slot}* — \`${post.format}\`\n` +
        `📌 *${post.title}*\n\n` +
        `🪝 _${post.hook}_\n\n` +
        `${post.caption}\n\n` +
        `${post.cta}\n` +
        `${post.hashtags}` +
        (post.extra ? `\n\n📋 _${post.extra.slice(0, 200)}_` : '');

      const trimmed = fullText.length > 3800 ? fullText.slice(0, 3800) + '...' : fullText;

      await tgCall('sendMessage', {
        chat_id:      TG_CHAT,
        text:         trimmed,
        parse_mode:   'Markdown',
        reply_markup: { inline_keyboard: [[
          { text: '✅ Approve', callback_data: `wkp_ok_${postId}` },
          { text: '⏭ Skip',    callback_data: `wkp_no_${postId}` },
        ]]},
      });

      sentCount++;
      await new Promise(res => setTimeout(res, 500));
    }

    await tgSend(
      `✅ *7 хоногийн план бэлэн!*\n\n` +
      `📊 Нийт ${sentCount} пост\n` +
      `📸 Single · 🎠 Carousel · 🎬 Reel\n\n` +
      `Тус бүрийг ✅ Approve эсвэл ⏭ Skip хийнэ үү.`
    );

  } catch (e) {
    console.error('[WeekPlan] Error:', e.message);
    await tgSend(`❌ Week plan алдаа: ${e.message.slice(0, 100)}`);
  }
}

// ── CALLBACK HANDLER ──────────────────────────────────────────────
async function handleCallback(cb) {
  const { data: cmd, message, id: cbId } = cb;
  const msgId = message.message_id;
  await tgAnswer(cbId);

  // ── Booking confirm/cancel ─────────────────────────────────────
  if (cmd.startsWith('bkc_') || cmd.startsWith('bkx_')) {
    const isConfirm = cmd.startsWith('bkc_');
    const bookingId = cmd.slice(4);
    const bkRef     = dbLFS.collection(`users/${UID}/bookings`).doc(bookingId);
    const bkSnap    = await bkRef.get();

    if (!bkSnap.exists) {
      await tgCall('sendMessage', { chat_id: TG_CHAT, text: '⚠️ Захиалга олдсонгүй.' });
      return;
    }
    const bk  = bkSnap.data();
    const now = new Date().toISOString();

    if (isConfirm) {
      await bkRef.update({ status: 'confirmed', confirmedAt: now });
      await tgCall('editMessageReplyMarkup', { chat_id: TG_CHAT, message_id: msgId, reply_markup: { inline_keyboard: [] } });
      await tgCall('sendMessage', {
        chat_id: TG_CHAT,
        text: `✅ Баталгаажлаа.\n\nНэр: ${bk.name}\nУтас: ${bk.phone}\nҮйлчилгээ: ${bk.service || '—'}\nОгноо: ${bk.start || '—'}`,
      });
    } else {
      await bkRef.update({ status: 'cancelled', cancelledAt: now });
      await tgCall('editMessageReplyMarkup', { chat_id: TG_CHAT, message_id: msgId, reply_markup: { inline_keyboard: [] } });
      await tgCall('sendMessage', { chat_id: TG_CHAT, text: `❌ Цуцлагдлаа.\n\nНэр: ${bk.name} · ${bk.phone}` });
    }
    return;
  }

  // ── Week Plan approve/skip ─────────────────────────────────────
  if (cmd.startsWith('wkp_ok_') || cmd.startsWith('wkp_no_')) {
    const isApprove = cmd.startsWith('wkp_ok_');
    const postId    = cmd.slice(7);

    try {
      const planRef  = dbLFS.doc(`users/${UID}/marketing/weekPlan`);
      const planSnap = await planRef.get();
      const planData = planSnap.exists ? planSnap.data() : {};
      const post     = planData[postId];

      if (!post) { await tgAnswer(cbId, 'Пост олдсонгүй'); return; }

      if (isApprove) {
        await planRef.update({ [`${postId}.status`]: 'approved' });
        await saveToPostHistory(post);
        await tgCall('editMessageReplyMarkup', {
          chat_id: TG_CHAT, message_id: msgId,
          reply_markup: { inline_keyboard: [[{ text: '✅ Approved', callback_data: 'noop' }]] },
        });
        await tgAnswer(cbId, '✅ Approve хийлаа');
      } else {
        await planRef.update({ [`${postId}.status`]: 'skipped' });
        await tgCall('editMessageReplyMarkup', {
          chat_id: TG_CHAT, message_id: msgId,
          reply_markup: { inline_keyboard: [[{ text: '⏭ Skipped', callback_data: 'noop' }]] },
        });
        await tgAnswer(cbId, '⏭ Skip хийлаа');
      }
    } catch (e) {
      console.error('[WeekPlan CB] Error:', e.message);
      await tgAnswer(cbId, 'Алдаа гарлаа');
    }
    return;
  }

  // ── Marketing content queue approve → fire-and-forget publish ───────
  if (cmd.startsWith('mkq_')) {
    const ideaId = cmd.slice(4);
    try {
      const qRef        = dbLFS.doc(`users/${UID}/marketing/weeklyQueue`);
      const qSnap       = await qRef.get();
      const qData       = qSnap.exists ? qSnap.data() : {};
      const pendingKey  = `pending_${ideaId}`;
      const approvedKey = `approved_${ideaId}`;
      const ideaData    = qData[pendingKey] || {};

      // Firestore-д approved болгож, publish queue-д нэм
      await qRef.set({
        [approvedKey]: { ...ideaData, status: 'approved', approvedAt: new Date().toISOString() },
        [pendingKey]:  admin.firestore.FieldValue.delete(),
      }, { merge: true });

      await dbLFS.doc(`users/${UID}/marketing/publishQueue`).set({
        [`job_${ideaId}`]: { ...ideaData, status: 'queued', queuedAt: new Date().toISOString() },
      }, { merge: true });
    } catch (e) {
      console.error('[Marketing] Approve save error:', e.message);
    }

    await tgCall('editMessageReplyMarkup', {
      chat_id: TG_CHAT, message_id: msgId,
      reply_markup: { inline_keyboard: [[{ text: '✅ Approved', callback_data: 'noop' }]] },
    });
    await tgAnswer(cbId, '⏳ Нийтэлж байна...');
    await tgSend('⏳ Зураг хайж, нийтэлж байна...');

    // Inline publish — IG + FB зэрэг (~5-6 секунд, Vercel 10s дотор багтана)
    try {
      const qRef2   = dbLFS.doc(`users/${UID}/marketing/weeklyQueue`);
      const qSnap2  = await qRef2.get();
      const idea    = (qSnap2.exists ? qSnap2.data() : {})[`approved_${ideaId}`] || {};

      const searchQuery = idea.imageSearch || idea.title || idea.topic || 'shanghai china';
      const imageUrl    = await fetchNewImage(searchQuery);
      const parts       = [idea.hook, idea.caption, idea.cta].filter(Boolean);
      const fullCaption = parts.length ? parts.join('\n\n') : (idea.title || 'LFS Shanghai');
      const hashtags    = idea.hashtags || '';

      const [igResult, fbResult] = await Promise.all([
        postToIG(imageUrl, fullCaption, hashtags),
        postToFB(imageUrl, fullCaption, hashtags),
      ]);

      if (igResult.ok) await saveToPostHistory(idea);

      const igLine = igResult.ok
        ? `📱 IG: ✅ нийтлэгдлээ`
        : `📱 IG: ❌ ${igResult.err}`;
      const fbLine = fbResult.ok
        ? `📘 FB: ✅ нийтлэгдлээ`
        : `📘 FB: ❌ ${fbResult.err}`;

      await tgSend(
        `${igResult.ok || fbResult.ok ? '✅' : '❌'} *Нийтлэлт дууслаа*\n\n` +
        `📸 ${idea.title || '—'}\n${igLine}\n${fbLine}`,
      );
    } catch (e) {
      console.error('[Marketing] Publish error:', e.message);
      await tgSend(`❌ Алдаа: ${e.message}`);
    }
    return;
  }

  if (cmd.startsWith('mkx_')) {
    await tgCall('editMessageReplyMarkup', {
      chat_id: TG_CHAT, message_id: msgId,
      reply_markup: { inline_keyboard: [[{ text: '❌ Skipped', callback_data: 'noop' }]] },
    });
    return;
  }

  if (cmd === 'noop') return;

  // ── Ghost post approval ────────────────────────────────────────
  const pSnap = await pendingRef().get();
  if (pSnap.exists) {
    const post = pSnap.data();
    if (msgId == post.telegramMsgId) {
      if (cmd === 'approve') {
        await tgSend('⏳ Нийтэлж байна...');
        const igResult = await postToIG(post.imageUrl, post.caption, post.hashtags);
        if (igResult.ok) {
          await tgCall('editMessageCaption', {
            chat_id: TG_CHAT, message_id: msgId,
            caption: `✅ *Нийтлэгдлээ!*\n\n${post.caption}`, parse_mode: 'Markdown',
          });
          await saveToPostHistory({ title: 'Manual post', caption: post.caption, format: 'single' });
          await pendingRef().delete();
        } else {
          await tgSend(`❌ IG алдаа: ${igResult.err}`);
        }
        return;
      }
      if (cmd === 'reject') {
        await tgCall('editMessageCaption', {
          chat_id: TG_CHAT, message_id: msgId,
          caption: '❌ *Цуцлагдлаа.*', parse_mode: 'Markdown',
        });
        await pendingRef().delete();
        return;
      }
      if (cmd === 'new_image') {
        const newImg = await fetchNewImage(post.topic || 'shanghai china');
        const r = await tgCall('sendPhoto', {
          chat_id: TG_CHAT, photo: newImg,
          caption: `🤖 *Шинэ зураг:*\n\n${post.caption}`, parse_mode: 'Markdown',
          reply_markup: { inline_keyboard: [
            [{ text: '✅ Approve', callback_data: 'approve' }, { text: '❌ Reject', callback_data: 'reject' }],
            [{ text: '🖼 New Image', callback_data: 'new_image' }, { text: '✏️ Edit Text', callback_data: 'edit_text' }],
          ]},
        });
        await pendingRef().update({ imageUrl: newImg, telegramMsgId: r.result?.message_id });
        return;
      }
      if (cmd === 'edit_text') {
        await tgSend('✏️ Шинэ текстаа бичнэ үү:');
        await pendingRef().update({ waitingForText: true });
        return;
      }
    }
  }

  // ── Manual poster ──────────────────────────────────────────────
  const mSnap = await manualRef().get();
  if (!mSnap.exists) return;
  const ms = mSnap.data();

  if (ms.status === 'waiting_choice') {
    if (cmd === 'ai_caption') {
      await tgSend('🤖 Caption үүсгэж байна...');
      const gen      = await generateCaption('', 'single');
      const caption  = gen.fullCaption || 'LFS Shanghai 🌆\n\n👉 lfsshanghai.com';
      const hashtags = gen.hashtags   || '#LFSShanghai #Шанхай';
      const draft = await tgCall('sendPhoto', {
        chat_id: TG_CHAT, photo: ms.fileId || ms.photoUrl,
        caption: `📋 *Draft:*\n\n${caption}`, parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: [[
          { text: '✅ Post хийх', callback_data: 'manual_post' },
          { text: '❌ Цуцлах',   callback_data: 'manual_cancel' },
        ]]},
      });
      await manualRef().set({
        status: 'waiting_final',
        photoUrl: ms.photoUrl, fileId: ms.fileId,
        caption, hashtags,
        draftMsgId: draft.result?.message_id,
      });
      return;
    }
    if (cmd === 'manual_cap') {
      await tgSend('✏️ Caption бичнэ үү:');
      await manualRef().update({ status: 'waiting_text' });
      return;
    }
    if (cmd === 'cancel') {
      await tgSend('❌ Цуцлагдлаа.'); await manualRef().delete(); return;
    }
  }

  if (ms.status === 'waiting_final') {
    if (cmd === 'manual_post') {
      await tgSend('⏳ IG + FB-д нийтэлж байна...');
      const igResult = await postToIG(ms.photoUrl, ms.caption, ms.hashtags);

      let fbMsg = '';
      try {
        const ptRes   = await fetch(`https://graph.facebook.com/v25.0/${FB_ID}?fields=access_token&access_token=${META_TOKEN}`);
        const ptData  = await ptRes.json();
        const pageTok = ptData.access_token || META_TOKEN;
        const fbRes   = await fetch(`https://graph.facebook.com/v25.0/${FB_ID}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: ms.photoUrl, message: ms.caption, access_token: pageTok }),
        });
        const fbData = await fbRes.json();
        fbMsg = !fbData.error ? '✅ FB нийтлэгдлээ!' : `❌ FB: ${fbData.error?.message}`;
      } catch (e) { fbMsg = `❌ FB алдаа: ${e.message}`; }

      if (igResult.ok) {
        await saveToPostHistory({ title: 'Manual post', caption: ms.caption, format: 'single' });
      }
      await tgSend(igResult.ok
        ? `✅ *IG нийтлэгдлээ!*\n${fbMsg}`
        : `❌ IG алдаа: ${igResult.err}\n${fbMsg}`);
      await manualRef().delete();
      return;
    }
    if (cmd === 'manual_cancel') {
      await tgSend('❌ Цуцлагдлаа.'); await manualRef().delete(); return;
    }
  }
}

// ── PHOTO HANDLER ─────────────────────────────────────────────────
async function handlePhoto(msg) {
  const fileId = msg.photo[msg.photo.length - 1].file_id;
  const fRes   = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/getFile?file_id=${fileId}`);
  const fData  = await fRes.json();
  const photoUrl    = `https://api.telegram.org/file/bot${TG_TOKEN}/${fData.result?.file_path}`;
  const userCaption = msg.caption || '';

  if (userCaption) {
    await tgSend('🤖 Caption бэлдэж байна...');
    const gen      = await generateCaption(userCaption, 'single');
    const caption  = gen.fullCaption || userCaption;
    const hashtags = gen.hashtags   || '#LFSShanghai #Шанхай';
    const draft = await tgCall('sendPhoto', {
      chat_id: TG_CHAT, photo: fileId,
      caption: `📋 *Draft:*\n\n${caption}`, parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[
        { text: '✅ Post хийх', callback_data: 'manual_post' },
        { text: '❌ Цуцлах',   callback_data: 'manual_cancel' },
      ]]},
    });
    await manualRef().set({
      status: 'waiting_final', photoUrl, fileId,
      caption, hashtags,
      draftMsgId: draft.result?.message_id,
    });
  } else {
    await tgCall('sendMessage', {
      chat_id: TG_CHAT,
      text: '📸 Зураг хүлээн авлаа! Caption яаж хийх вэ?',
      reply_markup: { inline_keyboard: [[
        { text: '🤖 AI үүсгэх',   callback_data: 'ai_caption' },
        { text: '✏️ Өөрөө бичих', callback_data: 'manual_cap' },
        { text: '❌ Цуцлах',       callback_data: 'cancel'     },
      ]]},
    });
    await manualRef().set({ status: 'waiting_choice', photoUrl, fileId });
  }
}

// ── TEXT HANDLER ──────────────────────────────────────────────────
async function handleText(msg) {
  const raw  = msg.text || '';
  const text = raw.toLowerCase().trim();

  // Pending post: edit_text state
  const pSnap = await pendingRef().get();
  if (pSnap.exists && pSnap.data().waitingForText && !raw.startsWith('/')) {
    const post = pSnap.data();
    const r    = await tgCall('sendPhoto', {
      chat_id: TG_CHAT, photo: post.imageUrl,
      caption: `🤖 *Draft:*\n\n${raw}`, parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [
        [{ text: '✅ Approve', callback_data: 'approve' }, { text: '❌ Reject', callback_data: 'reject' }],
        [{ text: '🖼 New Image', callback_data: 'new_image' }, { text: '✏️ Edit Text', callback_data: 'edit_text' }],
      ]},
    });
    await pendingRef().update({ caption: raw, telegramMsgId: r.result?.message_id, waitingForText: false });
    return;
  }

  // Manual: waiting_text state
  const mSnap = await manualRef().get();
  if (mSnap.exists && mSnap.data().status === 'waiting_text' && !raw.startsWith('/')) {
    const ms       = mSnap.data();
    const gen      = await generateCaption(raw, 'single');
    const caption  = gen.fullCaption || raw;
    const hashtags = gen.hashtags   || '#LFSShanghai #Шанхай';
    const draft = await tgCall('sendPhoto', {
      chat_id: TG_CHAT, photo: ms.photoUrl,
      caption: `📋 *Draft:*\n\n${caption}`, parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[
        { text: '✅ Post хийх', callback_data: 'manual_post' },
        { text: '❌ Цуцлах',   callback_data: 'manual_cancel' },
      ]]},
    });
    await manualRef().set({
      status: 'waiting_final', photoUrl: ms.photoUrl,
      caption, hashtags,
      draftMsgId: draft.result?.message_id,
    });
    return;
  }

  // ── /weekplan ────────────────────────────────────────────────────
  if (text === '/weekplan') {
    await generateWeekPlan();
    return;
  }

  // ── /bookings ────────────────────────────────────────────────────
  if (text === '/bookings') {
    const snap = await dbLFS.collection(`users/${UID}/bookings`)
      .where('status', '==', 'pending').get().catch(() => ({ docs: [] }));

    const bookings = snap.docs
      .map(d => d.data())
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
      .slice(0, 8);

    if (!bookings.length) {
      await tgCall('sendMessage', { chat_id: TG_CHAT, text: '📋 Хүлээгдэж буй захиалга байхгүй байна.' });
      return;
    }
    for (const bk of bookings) {
      const lines = [
        `📋 ${bk.name}`,
        `📞 ${bk.phone}`,
        bk.service ? `🏥 ${bk.service}` : null,
        bk.start   ? `📅 ${bk.start} · ${bk.days || '—'}` : null,
        bk.people  ? `👥 ${bk.people} хүн` : null,
        bk.note    ? `📝 ${bk.note}` : null,
        `\n🕐 ${new Date(bk.createdAt).toLocaleDateString('mn-MN', { timeZone: 'Asia/Shanghai' })}`,
      ].filter(Boolean).join('\n');
      await tgCall('sendMessage', {
        chat_id: TG_CHAT, text: lines,
        reply_markup: { inline_keyboard: [[
          { text: '✅ Баталгаажуулах', callback_data: `bkc_${bk.id}` },
          { text: '❌ Цуцлах',         callback_data: `bkx_${bk.id}` },
        ]]},
      });
    }
    return;
  }

  // ── /income ──────────────────────────────────────────────────────
  const incomeMatch = raw.match(/^\/income\s+(\d+)\s*(.*)?$/i);
  if (incomeMatch) {
    const amount  = parseInt(incomeMatch[1]);
    const note    = (incomeMatch[2] || '').trim() || 'Тодорхойгүй';
    const d       = todaySH();
    const ref     = dbLFS.doc(`users/${UID}/revenue/${d}`);
    const snap    = await ref.get();
    const cur     = snap.exists ? snap.data() : { total: 0, entries: [] };
    const entries = [...(cur.entries || []), { amount, note, time: new Date().toISOString() }];
    const total   = (cur.total || 0) + amount;
    await ref.set({ total, entries, updatedAt: new Date().toISOString() }, { merge: true });
    await tgCall('sendMessage', {
      chat_id: TG_CHAT,
      text: `💰 Орлого бүртгэгдлээ.\n\n+${amount.toLocaleString()}₮ — ${note}\nӨнөөдрийн нийт: ${total.toLocaleString()}₮`,
    });
    return;
  }

  // ── /revenue ─────────────────────────────────────────────────────
  if (text === '/revenue') {
    const d          = todaySH();
    const todaySnap  = await dbLFS.doc(`users/${UID}/revenue/${d}`).get();
    const todayData  = todaySnap.exists ? todaySnap.data() : { total: 0, entries: [] };
    const monthPfx   = d.slice(0, 7);
    const allRevSnap = await dbLFS.collection(`users/${UID}/revenue`).get().catch(() => ({ docs: [] }));
    const monthTotal = allRevSnap.docs
      .filter(doc => doc.id.startsWith(monthPfx))
      .reduce((sum, doc) => sum + (doc.data().total || 0), 0);
    const analyticsSnap = await dbLFS.doc(`users/${UID}/analytics/${d}`).get();
    const leads = analyticsSnap.exists ? (analyticsSnap.data().booking_lead || 0) : 0;
    const entries = (todayData.entries || []).slice(-5).reverse();
    let msg = `💰 *LFS Орлогын тайлан*\n\n`;
    msg += `Өнөөдөр: *${(todayData.total || 0).toLocaleString()}₮*\n`;
    msg += `${d.slice(0, 7)}-р сар: *${monthTotal.toLocaleString()}₮*\n`;
    msg += `Захиалгын lead: *${leads}*\n`;
    if (entries.length) {
      msg += `\nСүүлийн орлогууд:\n`;
      entries.forEach(e => { msg += `• +${Number(e.amount).toLocaleString()}₮ — ${e.note}\n`; });
    }
    msg += `\n_/income [дүн] [тэмдэглэл]_`;
    await tgCall('sendMessage', { chat_id: TG_CHAT, text: msg, parse_mode: 'Markdown' });
    return;
  }

  // ── /week ─────────────────────────────────────────────────────────
  if (text === '/week') {
    const planSnap = await dbLFS.doc(`users/${UID}/marketing/weekPlan`).get();
    if (!planSnap.exists) {
      await tgSend('📅 Долоо хоногийн план байхгүй байна.\n\n`/weekplan` командаар шинэ план үүсгэнэ үү.');
      return;
    }
    const plan = planSnap.data();
    const DAYS = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
    let msg = '📅 *7 Хоногийн Post Хуваарь*\n\n';
    const posts = Object.values(plan)
      .filter(p => p && p.date && p.title)
      .sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));

    for (const p of posts) {
      const day  = DAYS[new Date(p.date + 'T12:00:00').getDay()];
      const icon = FORMAT_EMOJI[p.format] || '📸';
      const stat = p.status === 'approved' ? '✅' : p.status === 'skipped' ? '⏭' : '⏳';
      const slot = p.slot === 'evening' ? '🌆' : '🌅';
      msg += `${stat} *${day}* ${slot} ${icon} ${(p.title || '').slice(0, 40)}\n`;
    }
    await tgSend(msg);
    return;
  }

  // ── /history — post memory ────────────────────────────────────────
  if (text === '/history') {
    const history = await getPostHistory();
    if (!history.length) {
      await tgSend('📝 Пост түүх хоосон байна.');
      return;
    }
    let msg = `📝 *Сүүлийн ${history.length} пост:*\n\n`;
    history.slice().reverse().forEach((p, i) => {
      const fIcon = FORMAT_EMOJI[p.format] || '📸';
      msg += `${i + 1}. ${fIcon} *${p.title}*\n`;
      msg += `   _${(p.caption || '').slice(0, 60)}..._\n`;
      msg += `   ${new Date(p.savedAt).toLocaleDateString('mn-MN', { timeZone: 'Asia/Shanghai' })}\n\n`;
    });
    await tgSend(msg.length > 3800 ? msg.slice(0, 3800) + '...' : msg);
    return;
  }

  // ── /help ────────────────────────────────────────────────────────
  if (text === '/help') {
    await tgSend(
      `🏢 *LFS Shanghai Bot v2.0*\n\n` +
      `*📋 Захиалга*\n` +
      `/bookings — хүлээгдэж буй захиалгууд\n\n` +
      `*💰 Орлого*\n` +
      `/income [дүн] [тэмдэглэл] — орлого бүртгэх\n` +
      `/revenue — орлогын тайлан\n\n` +
      `*📸 IG/FB Post*\n` +
      `/marketing — 3 пост санаа үүсгэх → approve → auto-post\n` +
      `/weekplan — 7 хоногийн 14 пост үүсгэх\n` +
      `/week — одоогийн пост хуваарь\n` +
      `/history — approve хийсэн постын түүх\n` +
      `_Зураг явуулахад → AI caption + нийтлэх_\n\n` +
      `*🤖 AI features*\n` +
      `• LFS brand voice caption\n` +
      `• Single / Carousel / Reel формат\n` +
      `• Post memory — давтахгүй`
    );
    return;
  }

  // ── /marketing ───────────────────────────────────────────────────
  if (text === '/marketing' || text === '/idea') {
    await tgSend('⏳ 3 пост санаа бэлдэж байна...');
    await generateMarketingIdeas();
    return;
  }
}

// ── SPRINT 4: AI MARKETING CONTENT INTELLIGENCE ───────────────────
// server.js-ийн cron-оор дуудагдана (13:00 Шанхай / 05:00 UTC)
async function generateMarketingIdeas(slot = 'default') {
  if (!GEMINI_KEY) { console.warn('[Marketing] GEMINI_API_KEY тохиргоогүй'); return; }

  // Өдөр бүр ЯГ 1 пост, ээлжээр: тэгш өдөр → morning (12:30, value),
  // сондгой өдөр → evening (19:00, trust). Хоёр cron өдөр бүр дуудагдсан ч
  // тохирохгүй ээлж нь алгасна. /marketing команд (default) үргэлж ажиллана.
  if (slot === 'morning' || slot === 'evening') {
    const epochDay  = Math.floor(new Date(todaySH()).getTime() / 86400000);
    const isEvenDay = epochDay % 2 === 0;
    const shouldRun = slot === 'morning' ? isEvenDay : !isEvenDay;
    if (!shouldRun) {
      console.log(`[Marketing] ${slot} slot — өнөөдөр ээлж биш, алгаслаа`);
      return;
    }
  }

  const today   = todaySH();
  const history = await getPostHistory();
  const usedTopics = history.length
    ? history.map(p => p.title).filter(Boolean).join(', ')
    : '';

  const pillars = pickPillars(slot);

  const task =
    `Өнөөдөр: ${today}\n` +
    (usedTopics ? `Сүүлд хийсэн постуудын сэдэв (ДАВТАХГҮЙ): ${usedTopics}\n\n` : '\n') +
    `Facebook/Instagram-д шууд хуулж тавихад бэлэн 3 пост бич.\n` +
    `Пост бүрийг ЗӨВХӨН дараах өөр өөр сэдвээр (нэг сэдэв = нэг пост) бич:\n` +
    `  • Пост 1 сэдэв: ${pillars[0]}\n` +
    `  • Пост 2 сэдэв: ${pillars[1]}\n` +
    `  • Пост 3 сэдэв: ${pillars[2]}\n` +
    `Value/Trust сэдэвт пост = цэвэр хэрэгтэй контент эсвэл бодит түүх, LFS-ийг зөвхөн доор зөөлөн дурд. Service сэдэвт пост = үйлчилгээгээ гол болго.\n` +
    `Форматыг заавал ялгаатай болго: 1x single, 1x carousel, 1x reel.\n\n` +
    `Хариу: JSON array ЗӨВХӨН:\n` +
    `[\n` +
    `  {\n` +
    `    "title": "Постын нэр (Монголоор)",\n` +
    `    "format": "single|carousel|reel",\n` +
    `    "caption": "Догол мөр бүр \\n\\n-ээр тусгаарлагдсан бэлэн пост текст",\n` +
    `    "hashtags": "#LFSShanghai + ladder аргаар сонгосон 2-4 хаштаг (1 нарийн + 1 дунд + 1 өргөн), сэдэвт тохирсон",\n` +
    `    "imageSearch": "Pexels keyword (English, 2-3 үг)"\n` +
    `  }\n` +
    `]`;

  // [INPUT_PROMPT] placeholder-г task-аар солино
  const systemPrompt = LFS_BRAND.replace('[INPUT_PROMPT]', task);

  try {
    // GitHub Models (GPT-4o-mini) — үнэгүй, SYSTEM_USE_TOKEN ашиглана
    const r = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${GH_TOKEN}`,
      },
      body: JSON.stringify({
        model:    'gpt-4o-mini',
        messages: [
          { role: 'user', content: systemPrompt },
        ],
        max_tokens:  2500,
        temperature: 0.85,
      }),
    });
    const data = await r.json();
    if (data.error) { console.error('[Marketing] GitHub Models error:', data.error.message); return; }

    const rawText  = data.choices?.[0]?.message?.content?.trim();
    const arrMatch = rawText?.match(/\[[\s\S]*\]/);
    if (!arrMatch) { console.error('[Marketing] JSON array гарсангүй'); return; }

    const ideas = JSON.parse(arrMatch[0]);

    const batchIds = [];
    for (let i = 0; i < Math.min(ideas.length, 3); i++) {
      const idea   = ideas[i];
      const ideaId = `mk_${Date.now()}_${i}`;
      batchIds.push(ideaId);
      const fEmoji = FORMAT_EMOJI[idea.format] || '📸';

      await dbLFS.doc(`users/${UID}/marketing/weeklyQueue`).set({
        [`pending_${ideaId}`]: {
          ...idea,
          ideaId,
          status:    'pending',
          createdAt: new Date().toISOString(),
        },
      }, { merge: true });

      const hashtagLine = idea.hashtags && !idea.caption.includes('#LFSShanghai')
        ? `\n\n${idea.hashtags}` : '';
      const msg =
        `💡 *Постын санаа ${i + 1}/3* — ${fEmoji} \`${idea.format}\`\n\n` +
        `${idea.caption}${hashtagLine}`;

      await tgCall('sendMessage', {
        chat_id:      TG_CHAT,
        text:         msg.length > 3800 ? msg.slice(0, 3800) : msg,
        parse_mode:   'Markdown',
        reply_markup: {
          inline_keyboard: [[
            { text: '✅ Зөвшөөрөх', callback_data: `mkq_${ideaId}` },
            { text: '❌ Орхих',      callback_data: `mkx_${ideaId}` },
          ]],
        },
      });

      await new Promise(res => setTimeout(res, 800));
    }

    // Approve reminder-ийн төлөвийг хадгална. Vercel serverless дээр setTimeout
    // ажиллахгүй тул сануулгыг /api/cron/remind cron шалгаж илгээнэ.
    await dbLFS.doc(`users/${UID}/marketing/reminderState`).set({
      ideaIds:     batchIds,
      sentAt:      new Date().toISOString(),
      remindStage: 0,
    });
  } catch (e) {
    console.error('[Marketing] generateMarketingIdeas error:', e.message);
  }
}

// /api/cron/remind cron-оор дуудагдана (cron-job.org, ~10 мин тутам).
// Batch илгээснээс хойш нэгийг ч approve/skip хийгээгүй бол:
//   ~30 мин дараа 1-р сануулга, ~45 мин дараа 2-р сануулга.
// Аль нэгэнд нь хүрсэн эсвэл 2 сануулга дууссан бол зогсоно. (Vercel-найдвартай)
async function checkApproveReminders() {
  const ref  = dbLFS.doc(`users/${UID}/marketing/reminderState`);
  const snap = await ref.get();
  if (!snap.exists) return;

  const st = snap.data();
  if (!st.ideaIds || !st.ideaIds.length || st.remindStage >= 2) return;

  const qSnap = await dbLFS.doc(`users/${UID}/marketing/weeklyQueue`).get();
  const qData = qSnap.exists ? qSnap.data() : {};
  const allPending = st.ideaIds.every(id => qData[`pending_${id}`]);

  // Аль нэгэнд нь хүрсэн (approve/skip) → идэвхтэй гэж үзээд зогсооно
  if (!allPending) { await ref.set({ remindStage: 2 }, { merge: true }); return; }

  const mins = (Date.now() - new Date(st.sentAt).getTime()) / 60000;

  if (st.remindStage < 1 && mins >= 30) {
    await tgSend(`⏰ *Сануулга* — ${st.ideaIds.length} постын санаа approve хүлээсээр байна. Аль нэгийг нь Зөвшөөрөх/Орхих дараарай.`);
    await ref.set({ remindStage: 1 }, { merge: true });
  } else if (st.remindStage < 2 && mins >= 45) {
    await tgSend(`🔔 *Дахин сануулга* — постын санаанууд хариу хүлээж байна. Оргил цаг өнгөрөхөөс өмнө шийдээрэй 👆`);
    await ref.set({ remindStage: 2 }, { merge: true });
  }
}

// ── WEBHOOK HANDLER ───────────────────────────────────────────────
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(200).send('LFS Bot OK');

  try {
    const upd = req.body;
    if (!upd || !UID) return res.status(200).json({ ok: true });

    if (upd.callback_query) {
      await handleCallback(upd.callback_query);
    } else if (upd.message?.photo && String(upd.message.chat.id) === String(TG_CHAT)) {
      await handlePhoto(upd.message);
    } else if (upd.message?.text && String(upd.message.chat.id) === String(TG_CHAT)) {
      await handleText(upd.message);
    }
  } catch (e) {
    console.error('[LFS Bot] Error:', e.message);
  }

  res.status(200).json({ ok: true });
};

// ── BACKGROUND PUBLISH (called from /api/publish-post) ───────────────
async function publishMarketingPost(ideaId) {
  const jobKey  = `job_${ideaId}`;
  const queueRef = dbLFS.doc(`users/${UID}/marketing/publishQueue`);

  let ideaData = {};
  try {
    const snap = await queueRef.get();
    ideaData = snap.exists ? (snap.data()[jobKey] || {}) : {};
  } catch (e) { console.error('[Publish] Firestore read error:', e.message); }

  const searchQuery = ideaData.imageSearch || ideaData.title || ideaData.topic || 'shanghai china';
  const imageUrl    = await fetchNewImage(searchQuery);

  const fullCaption = ideaData.caption || ideaData.title || 'LFS Shanghai';
  const hashtags    = ideaData.hashtags || '';

  const [igResult, fbResult] = await Promise.all([
    postToIG(imageUrl, fullCaption, hashtags),
    postToFB(imageUrl, fullCaption, hashtags),
  ]);

  if (igResult.ok) await saveToPostHistory(ideaData);

  // Queue-с устга
  queueRef.set({ [jobKey]: admin.firestore.FieldValue.delete() }, { merge: true }).catch(() => {});

  const igLine = igResult.ok
    ? `📱 IG: ✅ нийтлэгдлээ (ID: \`${igResult.postId}\`)`
    : `📱 IG: ❌ ${igResult.err}`;
  const fbLine = fbResult.ok
    ? `📘 FB: ✅ нийтлэгдлээ`
    : `📘 FB: ❌ ${fbResult.err}`;

  await tgSend(
    `${igResult.ok || fbResult.ok ? '✅' : '❌'} *Нийтлэлт дууслаа*\n\n` +
    `📸 Сэдэв: ${ideaData.title || '—'}\n${igLine}\n${fbLine}`,
  );
}

module.exports.tgCall                 = tgCall;
module.exports.tgSend                 = (text) => tgCall('sendMessage', { chat_id: TG_CHAT, text, parse_mode: 'Markdown' });
module.exports.generateMarketingIdeas = generateMarketingIdeas;
module.exports.checkApproveReminders  = checkApproveReminders;
module.exports.publishMarketingPost   = publishMarketingPost;
