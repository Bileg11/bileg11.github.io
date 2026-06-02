const express = require('express');
const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/api/booking', async (req, res) => {
  const d = req.body;

  const msg = `📋 <b>Шинэ захиалга — LFS Shanghai</b>

👤 <b>Нэр:</b> ${d.name || '—'}
📞 <b>Утас:</b> ${d.phone || '—'}
📧 <b>Имэйл:</b> ${d.email || '—'}
🛎 <b>Үйлчилгээ:</b> ${d.service || '—'}
📅 <b>Огноо:</b> ${d.start || '—'} (${d.days || '—'} өдөр)
👥 <b>Хүний тоо:</b> ${d.people || '—'}
🔗 <b>Social:</b> ${d.social || '—'}
📝 <b>Нэмэлт:</b> ${d.note || '—'}`;

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
