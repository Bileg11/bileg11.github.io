/**
 * LFS Shanghai — Firebase Cloud Functions
 * Triggers on every new booking document in Firestore:
 *   1. Sends Telegram notifications to all admin chat IDs
 *   2. Sends a confirmation e-mail to the customer
 *
 * Required secrets (set once via Firebase CLI):
 *   firebase functions:secrets:set TELEGRAM_TOKEN
 *   firebase functions:secrets:set TELEGRAM_CHAT_IDS   ← comma-separated, e.g. "111111,222222"
 *   firebase functions:secrets:set GMAIL_USER           ← sender Gmail address
 *   firebase functions:secrets:set GMAIL_PASS           ← Gmail App Password (16 chars)
 *
 * Deploy:
 *   cd functions && npm install
 *   cd .. && firebase deploy --only functions
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions }  = require("firebase-functions/v2");
const { defineSecret }      = require("firebase-functions/params");
const admin                 = require("firebase-admin");
const nodemailer            = require("nodemailer");

// ── Region (Tokyo is closest to Mongolia) ────────────────────────────────────
setGlobalOptions({ region: "asia-northeast1" });

admin.initializeApp();

// ── Secrets ───────────────────────────────────────────────────────────────────
const TELEGRAM_TOKEN    = defineSecret("TELEGRAM_TOKEN");
const TELEGRAM_CHAT_IDS = defineSecret("TELEGRAM_CHAT_IDS");
const GMAIL_USER        = defineSecret("GMAIL_USER");
const GMAIL_PASS        = defineSecret("GMAIL_PASS");

// ── Helper: send one Telegram message ────────────────────────────────────────
async function sendTelegramMsg(token, chatId, html) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ chat_id: chatId, text: html, parse_mode: "HTML" })
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram error for ${chatId}: ${body}`);
  }
}

// ── Helper: age from "YYYY-MM-DD" ────────────────────────────────────────────
function calcAge(birthday) {
  if (!birthday) return "—";
  const bd  = new Date(birthday);
  const now = new Date();
  let a = now.getFullYear() - bd.getFullYear();
  if (now < new Date(now.getFullYear(), bd.getMonth(), bd.getDate())) a--;
  return (a > 0 && a < 120) ? `${a} нас` : "—";
}

// ── Main trigger ─────────────────────────────────────────────────────────────
exports.onNewBooking = onDocumentCreated(
  {
    document: "bookings/{bookingId}",
    secrets:  [TELEGRAM_TOKEN, TELEGRAM_CHAT_IDS, GMAIL_USER, GMAIL_PASS]
  },
  async (event) => {
    const booking   = event.data.data();
    const bookingId = event.params.bookingId;

    console.log("New booking:", bookingId, booking.name);

    // ── 1. Fetch user profile ─────────────────────────────────────────────
    let profile = {};
    if (booking.userId) {
      try {
        const snap = await admin.firestore().doc(`users/${booking.userId}`).get();
        if (snap.exists) profile = snap.data();
      } catch (e) {
        console.error("Could not fetch user profile:", e.message);
      }
    }

    const fullName     = [profile.lastName, profile.firstName].filter(Boolean).join(" ") || "—";
    const profilePhone = profile.phone  || "—";
    const profileEmail = profile.email  || booking.email || "—";
    const age          = calcAge(profile.birthday);
    const gender       = profile.gender || "—";

    // ── 2. Telegram notifications ─────────────────────────────────────────
    const telegramMsg =
`📋 <b>Шинэ захиалга!</b>

👤 <b>Нэр:</b> ${booking.name}
📞 <b>Утас:</b> ${booking.phone}
🛎 <b>Үйлчилгээ:</b> ${booking.service}
👥 <b>Хүн:</b> ${booking.people || "—"}
🗓 <b>Эхлэх:</b> ${booking.start} · ${booking.days}
👨‍👩‍👧 <b>Бүлэг:</b> ${booking.group || "—"}
💬 <b>Нэмэлт:</b> ${booking.note || "—"}
📱 <b>Social:</b> ${booking.social || "—"}

👤 <b>Хэрэглэгчийн мэдээлэл</b>
🪪 <b>Нэр:</b> ${fullName}
📞 <b>Утас:</b> ${profilePhone}
📧 <b>И-мэйл:</b> ${profileEmail}
🎂 <b>Нас:</b> ${age}
⚥ <b>Хүйс:</b> ${gender}`;

    try {
      const token   = TELEGRAM_TOKEN.value();
      const chatIds = TELEGRAM_CHAT_IDS.value()
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      await Promise.all(
        chatIds.map(id => sendTelegramMsg(token, id, telegramMsg))
      );
      console.log(`Telegram sent to ${chatIds.length} chats`);
    } catch (e) {
      console.error("Telegram error:", e.message);
    }

    // ── 3. Confirmation e-mail to customer ────────────────────────────────
    const toEmail = booking.email;
    if (!toEmail) {
      console.log("No email in booking — skipping confirmation email");
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER.value(),
          pass: GMAIL_PASS.value()
        }
      });

      const emailHtml = `
<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0071e3;padding:28px 32px;text-align:center;">
              <div style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-.02em;">LFS Shanghai</div>
              <div style="font-size:13px;color:rgba(255,255,255,.8);margin-top:4px;">Шанхай аялалын үйлчилгээ</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <div style="font-size:20px;font-weight:700;color:#1d1d1f;margin-bottom:6px;">Захиалга хүлээн авлаа ✓</div>
              <div style="font-size:14px;color:#6e6e73;margin-bottom:28px;">
                Таны захиалгыг амжилттай хүлээн авлаа. Бид 24 цагийн дотор тантай холбогдоно.
              </div>

              <!-- Booking summary table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f5f5f7;border-radius:12px;overflow:hidden;">
                <tr>
                  <td colspan="2" style="padding:14px 16px 10px;font-size:12px;font-weight:600;color:#86868b;letter-spacing:.04em;text-transform:uppercase;">
                    Захиалгын дэлгэрэнгүй
                  </td>
                </tr>
                ${row("Нэр",        booking.name)}
                ${row("Утас",       booking.phone)}
                ${row("Үйлчилгээ",  booking.service)}
                ${row("Хүний тоо",  booking.people   || "—")}
                ${row("Эхлэх огноо",booking.start    || "—")}
                ${row("Хоног",      booking.days      || "—")}
                ${booking.group ? row("Бүлгийн нэр", booking.group) : ""}
                ${booking.note  ? row("Нэмэлт мэдээлэл", booking.note) : ""}
              </table>

              <div style="margin-top:24px;padding:16px;background:#fff8e6;border-radius:12px;border:1px solid #f5c842;">
                <div style="font-size:13px;color:#1d1d1f;font-weight:600;margin-bottom:4px;">📞 Холбогдох утас</div>
                <div style="font-size:13px;color:#6e6e73;">Асуулт байвал бидэнтэй холбогдоорой. Бид тантай удахгүй холбогдоно.</div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid rgba(0,0,0,.06);text-align:center;">
              <div style="font-size:12px;color:#86868b;">
                © 2025 LFS Shanghai · Та энэ захиалгыг хийснийх тань баталгаа юм.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      await transporter.sendMail({
        from:    `"LFS Shanghai" <${GMAIL_USER.value()}>`,
        to:      toEmail,
        subject: "Захиалга амжилттай хүлээн авлаа — LFS Shanghai ✓",
        html:    emailHtml
      });
      console.log("Confirmation email sent to:", toEmail);
    } catch (e) {
      console.error("Email error:", e.message);
    }
  }
);

// ── Small helper for email rows ───────────────────────────────────────────────
function row(label, value) {
  return `
  <tr>
    <td style="padding:8px 16px;font-size:13px;color:#6e6e73;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:8px 16px;font-size:13px;color:#1d1d1f;font-weight:500;vertical-align:top;">${value}</td>
  </tr>`;
}
