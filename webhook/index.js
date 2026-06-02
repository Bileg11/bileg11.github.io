'use strict';
const express  = require('express');
const cron     = require('node-cron');
const lfsBot   = require('./lfs-telegram');
const metaHook = require('./meta-webhook');
const alerts   = require('./alerts');

const app = express();
app.use(express.json());

const TOKEN   = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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

// ── LFS МАРКЕТИНГ BOT ─────────────────────────────────────────────
app.post('/api/lfs-telegram', lfsBot);

// ── META (IG DM + FB Messenger) ───────────────────────────────────
app.get('/api/meta-webhook', metaHook.verify);
app.post('/api/meta-webhook', metaHook.handle);

app.get('/', (req, res) => res.send('LFS Shanghai webhook running ✅'));

app.listen(process.env.PORT || 3000, () => console.log('[LFS] Server running'));

// ── MARKETING CONTENT — 13:00 Шанхай (05:00 UTC) ─────────────────
cron.schedule('0 5 * * *', () => {
  lfsBot.generateMarketingIdeas().catch(e => console.error('[Marketing]', e.message));
});

// ── MORNING BRIEF — 07:30 Шанхай (23:30 UTC өмнөх өдөр) ──────────
cron.schedule('30 23 * * *', () => {
  metaHook.sendMorningBrief().catch(e => console.error('[MorningBrief]', e.message));
});

// ── DAILY REPORT — 22:00 Шанхай (14:00 UTC) ──────────────────────
cron.schedule('0 14 * * *', () => {
  metaHook.sendDailyReport().catch(e => console.error('[DailyReport]', e.message));
});

// ── LFS ACTIVITY CHECK — 12:00 Шанхай (04:00 UTC) ────────────────
cron.schedule('0 4 * * *', () => {
  alerts.checkLFSActivity().catch(e => console.error('[LFSAlert]', e.message));
});

// ── POST FREQUENCY CHECK — 10:00 Шанхай (02:00 UTC) ──────────────
cron.schedule('0 2 * * *', () => {
  alerts.checkPostFrequency().catch(e => console.error('[PostFreq]', e.message));
});
