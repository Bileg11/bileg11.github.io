'use strict';
// ── FIREBASE SINGLETON — LFS SHANGHAI ────────────────────────────
// Зөвхөн lfs-shanghai Firebase ашиглана
// analytics, profiles, chatHistory, marketing, bookings, revenue

const admin = require('firebase-admin');

function getOrInit(name, envKey) {
  const found = admin.apps.find(a => a.name === name);
  if (found) return found;
  const json = process.env[envKey];
  if (!json) throw new Error(`[Firebase] ${envKey} env var тохируулаагүй`);
  return admin.initializeApp(
    { credential: admin.credential.cert(JSON.parse(json)) },
    name
  );
}

// ── LFS бизнес (lfs-shanghai) ─────────────────────────────────────
const lfsApp = getOrInit('lfs', 'FIREBASE_SERVICE_ACCOUNT');
const dbLFS  = lfsApp.firestore();

module.exports = { admin, dbLFS };
