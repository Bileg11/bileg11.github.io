const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_TOKEN;
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

app.get('/', (req, res) => res.send('LFS Webhook OK'));

app.listen(process.env.PORT || 3000);
