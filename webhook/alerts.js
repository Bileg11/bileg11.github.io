'use strict';
// ── LFS PROACTIVE ALERTS ──────────────────────────────────────────
// LFS бизнесийн автомат мэдэгдлүүд

const fetch  = require('node-fetch');
const { dbLFS } = require('./firebase');
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN_LFS || process.env.TELEGRAM_TOKEN;
const TG_CHAT  = process.env.TELEGRAM_ID            || process.env.TELEGRAM_CHAT_ID;
const UID      = process.env.USER_UID;

async function tg(text) {
  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT, text }),
    });
  } catch {}
}

function todaySH() {
  return new Date().toLocaleDateString('sv', { timeZone: 'Asia/Shanghai' });
}

// ── 1. LFS идэвхгүй байдлын alert (өдрийн 12:00) ─────────────────
// Хэрэв 12 цаг болтол хэн ч LFS-д хандаагүй бол → сануулга
async function checkLFSActivity() {
  try {
    const snap = await dbLFS.doc(`users/${UID}/analytics/${todaySH()}`).get();
    const users = snap.exists ? (snap.data().users || []) : [];
    if (users.length === 0) {
      await tg(
        '⚠️ LFS: Өнөөдөр 12:00 болтол хэн ч хандаагүй байна.\n\n' +
        'Story, post, эсвэл story reply хийж идэвхжүүлэх үү?'
      );
    }
  } catch (e) {
    console.error('[Alert] LFS activity check error:', e.message);
  }
}

// ── 2. Instagram post давтамжийн alert (10:00) ────────────────────
// Хэрэв 2+ хоног post хийгдээгүй бол → сануулга
async function checkPostFrequency() {
  try {
    const snap = await dbLFS.doc(`users/${UID}/marketing/lastPost`).get();
    if (!snap.exists) return;

    const lastPostAt = snap.data().postedAt;
    if (!lastPostAt) return;

    const diffDays = (Date.now() - new Date(lastPostAt).getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays >= 2) {
      const days = Math.floor(diffDays);
      await tg(
        `📸 LFS: ${days} хоног Instagram-д post хийгдээгүй байна.\n\n` +
        `Engagement буурч байж магадгүй. Өнөөдөр нэг post хийх үү?`
      );
    }
  } catch (e) {
    console.error('[Alert] Post frequency check error:', e.message);
  }
}

module.exports = { checkLFSActivity, checkPostFrequency };
