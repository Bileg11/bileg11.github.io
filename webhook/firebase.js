'use strict';
// ── FIREBASE SINGLETON — LAZY INIT ────────────────────────────────
// Сервер эхлэхэд Firebase-г шууд ачаалахгүй — эхний хэрэглээнд л init хийнэ.
// Env var байхгүй бол сервер унахгүй, зөвхөн Firestore дуудлага алдаа өгнө.

const admin = require('firebase-admin');

let _personalApp = null;
let _lfsApp = null;

function getPersonalApp() {
  if (!_personalApp) {
    const found = admin.apps.find(a => a.name === 'personal');
    if (found) { _personalApp = found; }
    else {
      const json = process.env.FIREBASE_SERVICE_ACCOUNT;
      if (!json) throw new Error('[Firebase] FIREBASE_SERVICE_ACCOUNT env var тохируулаагүй');
      _personalApp = admin.initializeApp(
        { credential: admin.credential.cert(JSON.parse(json)) },
        'personal'
      );
    }
  }
  return _personalApp;
}

function getLFSApp() {
  if (!_lfsApp) {
    const found = admin.apps.find(a => a.name === 'lfs');
    if (found) { _lfsApp = found; }
    else {
      const json = process.env.FIREBASE_LFS || process.env.FIREBASE_SERVICE_ACCOUNT;
      if (!json) throw new Error('[Firebase] FIREBASE_LFS эсвэл FIREBASE_SERVICE_ACCOUNT env var тохируулаагүй');
      _lfsApp = admin.initializeApp(
        { credential: admin.credential.cert(JSON.parse(json)) },
        'lfs'
      );
    }
  }
  return _lfsApp;
}

// Proxy objects — property access хийх үедээ л init хийнэ
const dbPersonal = new Proxy({}, {
  get(_, prop) {
    return getPersonalApp().firestore()[prop].bind(getPersonalApp().firestore());
  },
});

const dbLFS = new Proxy({}, {
  get(_, prop) {
    return getLFSApp().firestore()[prop].bind(getLFSApp().firestore());
  },
});

module.exports = { admin, dbPersonal, dbLFS };
