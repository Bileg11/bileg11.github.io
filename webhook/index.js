'use strict';
const express  = require('express');
const lfsBot   = require('./lfs-telegram');
const metaHook = require('./meta-webhook');
const alerts   = require('./alerts');

const app = express();
app.use(express.json());

const TOKEN   = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// ── BOOKING ───────────────────────────────────────────────────────────
app.post('/api/booking', async (req, res) => {
  const d = req.body;
  const p = d.profile || {};

  const msg = `📋 <b>Шинэ захиалга — LFS Shanghai</b>

——— ЗАХИАЛГА ———
🛎 <b>Үйлчилгээ:</b> ${d.service || '—'}
📅 <b>Эхлэх огноо:</b> ${d.start || '—'}
🌙 <b>Хоног:</b> ${d.days || '—'}
👥 <b>Хүний тоо:</b> ${d.people || '—'}
📝 <b>Нэмэлт:</b> ${d.note || '—'}
📣 <b>Хаанаас мэдсэн:</b> ${d.source || '—'}

——— ХОЛБОО БАРИХ ———
👤 <b>Нэр:</b> ${d.name || '—'}
📞 <b>Утас:</b> ${d.phone || '—'}
📧 <b>И-мэйл:</b> ${d.email || '—'}
🔗 <b>Social:</b> ${d.social || '—'}

——— БҮРТГЭЛ ———
${p.isLoggedIn ? '✅ Бүртгэлтэй хэрэглэгч' : '❌ Бүртгэлгүй'}
👤 <b>Нэр:</b> ${p.lastName || '—'} ${p.firstName || '—'}
📞 <b>Утас:</b> ${p.phone || '—'}
📧 <b>И-мэйл:</b> ${p.email || '—'}
⚧ <b>Хүйс:</b> ${p.gender || '—'}
🎂 <b>Төрсөн:</b> ${p.birthday || '—'}`;

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'HTML' })
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ── LFS МАРКЕТИНГ BOT ─────────────────────────────────────────────────
app.post('/api/lfs-telegram', lfsBot);

// ── META (IG DM + FB Messenger) ───────────────────────────────────────
app.get('/api/meta-webhook', metaHook.verify);
app.post('/api/meta-webhook', metaHook.handle);

// ── CRON TRIGGER ENDPOINTS (cron-job.org дуудна) ─────────────────────
// Нууц токен шалгана — CRON_SECRET env var тохируулаагүй бол нээлттэй
function cronAuth(req, res, next) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers['x-cron-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/cron/marketing', cronAuth, async (req, res) => {
  await lfsBot.generateMarketingIdeas().catch(e => console.error('[Marketing]', e.message));
  res.json({ ok: true });
});

app.get('/api/cron/morning', cronAuth, async (req, res) => {
  await metaHook.sendMorningBrief().catch(e => console.error('[MorningBrief]', e.message));
  res.json({ ok: true });
});

app.get('/api/cron/report', cronAuth, async (req, res) => {
  await metaHook.sendDailyReport().catch(e => console.error('[DailyReport]', e.message));
  res.json({ ok: true });
});

app.get('/api/cron/activity', cronAuth, async (req, res) => {
  await alerts.checkLFSActivity().catch(e => console.error('[LFSAlert]', e.message));
  res.json({ ok: true });
});

app.get('/api/cron/postfreq', cronAuth, async (req, res) => {
  await alerts.checkPostFrequency().catch(e => console.error('[PostFreq]', e.message));
  res.json({ ok: true });
});

// ── BACKGROUND PUBLISH ENDPOINT (fire-and-forget from lfs-telegram) ──
app.post('/api/publish-post', async (req, res) => {
  const { ideaId } = req.body || {};
  if (!ideaId) return res.status(400).json({ error: 'ideaId missing' });
  // Heavy work (IG+FB post with sleeps) — respond AFTER done
  await lfsBot.publishMarketingPost(ideaId).catch(e => console.error('[Publish]', e.message));
  res.json({ ok: true });
});

app.get('/', (req, res) => res.send('LFS Shanghai webhook running ✅'));

// Vercel → module.exports, локал → app.listen
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(process.env.PORT || 3000, () => console.log('[LFS] Server running'));
}
