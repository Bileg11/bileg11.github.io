/*!
 * LFS Shanghai — Үйлчлүүлэгчийн үнэлгээ (single source of truth)
 * ═══════════════════════════════════════════════════════════════
 *
 * ⚠️ ЗӨВХӨН БОДИТ ҮНЭЛГЭЭ. Зохиосон, өөрөө бичсэн, найзаараа бичүүлсэн
 *    үнэлгээ энд ОРУУЛАХГҮЙ.
 *
 *    Google-ийн Review snippet бодлого: үнэлгээ нь бодит үйлчлүүлэгчээс
 *    ирсэн, хуудсан дээр харагдаж байх ёстой. Зөрчвөл rich result
 *    хасагдаж, manual action авах эрсдэлтэй — тэгвэл багцын үнэ ч
 *    хайлтад харагдахаа болино.
 *
 *    Түүнээс ч чухал нь: хуурамч үнэлгээ бол үйлчлүүлэгчээ хуурч
 *    байгаа хэрэг. Эрүүл мэндийн үйлчилгээнд бүр ч ноцтой.
 *
 * ── Хэрхэн нэмэх вэ ──
 *   1. Хэрэглэгч /review/ хуудсаар үнэлгээ илгээнэ (эсвэл Messenger-ээр
 *      талархсаныг нь ЗӨВШӨӨРӨЛ АВААД оруулна)
 *   2. Admin → ⭐ Үнэлгээ таб дээр хараад "Хуулах" дарна
 *   3. Хуулсан объектоо доорх REVIEWS массивт нааж, хадгална
 *   4. node scripts/build-packages.js  → хуудсууд + од шинэчлэгдэнэ
 *   5. git commit && git push
 *
 * consent:false бол хаана ч харагдахгүй, тоололд ч орохгүй.
 */
(function (root, factory) {
  var data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.LFS_REVIEWS = data;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* Талбарууд:
       id      — давхардахгүй ID
       name    — хэрэглэгчийн зөвшөөрсөн нэр ("Б. Мөнхбаяр" эсвэл "Мөнхбаяр Б.")
       pkg     — 'full' | 'basic' | 'travel'  (аль багцад өгсөн үнэлгээ)
       rating  — 1–5 бүхэл тоо
       date    — 'YYYY-MM-DD' (аялсан эсвэл үнэлгээ өгсөн огноо)
       text    — { mn: '...', en: '...' }  en байхгүй бол mn-ийг ашиглана
       source  — 'form' | 'messenger' | 'facebook'
       consent — зөвшөөрөл авсан эсэх. false бол ОГТ харагдахгүй.
  */
  var REVIEWS = [
    // Бодит үнэлгээ энд орно. Одоогоор хоосон —
    // хоосон үед сайт дээр үнэлгээний хэсэг ба од харагдахгүй.
  ];

  function visible() {
    return REVIEWS.filter(function (r) {
      return r.consent === true && r.rating >= 1 && r.rating <= 5 && r.text && r.text.mn;
    });
  }

  function forPackage(pkgId) {
    return visible().filter(function (r) { return r.pkg === pkgId; });
  }

  // Багцын дундаж — Google Offer.aggregateRating-д ашиглана.
  // Үнэлгээ байхгүй бол null буцаана (schema-д огт нэмэхгүй).
  function aggregate(pkgId) {
    var list = pkgId ? forPackage(pkgId) : visible();
    if (!list.length) return null;
    var sum = list.reduce(function (n, r) { return n + r.rating; }, 0);
    return {
      value: Math.round((sum / list.length) * 10) / 10,
      count: list.length
    };
  }

  return {
    REVIEWS: REVIEWS,
    visible: visible,
    forPackage: forPackage,
    aggregate: aggregate
  };
});
