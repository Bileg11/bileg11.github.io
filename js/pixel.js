/* LFS Shanghai — Хэмжилт (Meta Pixel + Google Analytics 4)
 *
 * Pixel ID зөвхөн доорх PIXEL_ID мөрөнд байна. Өөр хаана ч давхардуулж бичихгүй.
 * Хятадад connect.facebook.net хаалттай тул fbq ачаалагдахгүй байж магадгүй —
 * бүх дуудлага typeof шалгалттай, сайт ямар ч тохиолдолд унтрахгүй.
 *
 * GA4 руу мөн зэрэг илгээнэ. gtag нь хуудсаас хамаараад gtag.js-ээр эсвэл
 * Firebase Analytics-аар үүсдэг тул ачаалах үед биш, ДУУДАХ үед шалгана.
 * gtag байхгүй хуудсанд чимээгүй алгасна.
 *
 * GA4 дээр key event болгож тэмдэглэх ёстой event-ууд:
 *   generate_lead      — захиалга амжилттай илгээгдсэн
 *   contact_messenger  — Messenger / Facebook линк дарсан
 *   contact_phone      — утасны дугаар дарсан
 *   contact_email      — и-мэйл хаяг дарсан
 *
 * Хэрэглэх:
 *   window.lfsPixel.trackLead(serviceName)  — захиалга backend-д хадгалагдсаны ДАРАА
 *   window.lfsPixel.trackContact()          — Messenger/Facebook линк дарахад (автомат)
 *   window.lfsTrack.event(name, params)     — GA4 руу нэмэлт event
 */
(function () {
  'use strict';

  var PIXEL_ID = '976110361690010';

  // ── Meta Pixel base code (async — render блоклохгүй) ──
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  // ── Google Analytics 4 ──
  // gtag хараахан үүсээгүй байж болзошгүй тул дуудагдах бүрд шалгана.
  function ga(event, params) {
    if (typeof window.gtag !== 'function') return;
    try { window.gtag('event', event, params || {}); } catch (err) { /* GA алдаа сайтыг зогсоохгүй */ }
  }

  // Бүх fbq дуудлага энэ функцээр дамжина — өөр хаана ч fbq-г шууд дуудахгүй
  function track(event, params) {
    if (typeof fbq !== 'function') return;
    try {
      params ? fbq('track', event, params) : fbq('track', event);
    } catch (err) { /* pixel алдаа сайтыг зогсоохгүй */ }
  }

  if (typeof fbq === 'function') {
    try { fbq('init', PIXEL_ID); } catch (err) { /* noop */ }
  }

  track('PageView');

  // ── Lead ──
  // Захиалга Firebase/backend-д амжилттай хадгалагдсаны дараа л дуудна.
  //
  // Value — үнэ нь бодитоор мэдэгдэж байгаа үйлчилгээнд ЗӨВХӨН тэр үнээ
  // өөрийн валютаараа илгээнэ. Валют хөрвүүлэлт ХИЙХГҮЙ — ₮ үнэтэйг MNT,
  // юаний үнэтэйг CNY. Meta нь ад аккаунтын валют руу өөрөө хөрвүүлдэг.
  // Нэгж үнэ — өдөр/хүний тоогоор ҮРЖҮҮЛДЭГГҮЙ.
  //
  // Үнэ мэдэгдэхгүй бол value/currency ЕР НЬ ИЛГЭЭХГҮЙ (таамаг тоо оруулахгүй).
  //
  // Дараалал чухал — эхний таарсан дүрэм хүчинтэй
  var LEAD_PRICE_RULES = [
    [/шинжилгээ\s*\+\s*аялал|health\s*\+\s*travel/i,
                                        4600000, 'MNT'],  // Шинжилгээ + Аялал багц
    [/энгийн шинжилгээ|basic checkup/i, 1899000, 'MNT'],  // Энгийн шинжилгээний багц
    [/зөвхөн аялл|travel only/i,        3200000, 'MNT'],  // Зөвхөн аяллын багц
    [/эрүүл мэнд|healthcare|checkup/i,  1899000, 'MNT'],  // багц заагаагүй → Энгийн
    [/оюутны|student/i,                   20000, 'MNT'],  // Оюутны зөвлөмж
    [/угтаа|угтах|airport/i,                200, 'CNY'],  // Нисэх буудал угтах
    [/буудал захиалга|hotel/i,               50, 'CNY'],  // Буудал захиалга
    [/хөтөч|guide|шоппинг|shopping|ресторан|food|хэлмэрч|орчуулагч|interpreter/i,
                                            500, 'CNY']   // 500¥/өдөр
  ];

  // Таарвал { value, currency }, таарахгүй бол null
  function matchLeadPrice(text) {
    var s = String(text || '');
    if (!s) return null;
    for (var i = 0; i < LEAD_PRICE_RULES.length; i++) {
      if (LEAD_PRICE_RULES[i][0].test(s)) {
        return { value: LEAD_PRICE_RULES[i][1], currency: LEAD_PRICE_RULES[i][2] };
      }
    }
    return null;
  }

  // Багцын нэрээс эрэмбэ 1, үйлчилгээний нэрээс эрэмбэ 2
  function leadPriceFor(serviceName, packageLabel) {
    return matchLeadPrice(packageLabel) || matchLeadPrice(serviceName);
  }

  function trackLead(serviceName, packageLabel) {
    var name = serviceName || 'Booking';
    var params = { content_name: name };
    var price = leadPriceFor(name, packageLabel);
    // Meta-д value ба currency хоёр хамт байх ёстой, эсвэл хоёулаа байхгүй
    if (price) {
      params.value = price.value;
      params.currency = price.currency;
    }
    track('Lead', params);

    // GA4 — Meta-тай ижил утгаар
    var gaParams = { content_name: name };
    if (packageLabel) gaParams.package = packageLabel;
    if (price) { gaParams.value = price.value; gaParams.currency = price.currency; }
    ga('generate_lead', gaParams);
  }

  // ── Contact ──
  // href-д m.me эсвэл facebook.com/profile орсон бүх <a>. Document дээр нэг
  // delegated listener — модал дотор динамикаар үүссэн линк ч баригдана.
  var CONTACT_HREF = /m\.me|facebook\.com\/profile/i;

  function trackContact() {
    track('Contact');
    ga('contact_messenger');
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || typeof t.closest !== 'function') return;
    var a = t.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (CONTACT_HREF.test(href)) { trackContact(); return; }
    // Утас, и-мэйл — GA4-д тусад нь. Meta-д Contact гэж нэгтгэнэ.
    if (/^tel:/i.test(href))    { track('Contact'); ga('contact_phone'); return; }
    if (/^mailto:/i.test(href)) { track('Contact'); ga('contact_email'); return; }
  }, true);

  window.lfsPixel = {
    trackLead: trackLead,
    trackContact: trackContact,
    leadPriceFor: leadPriceFor
  };

  // GA4 руу нэмэлт event илгээх нийтийн гарц (жишээ: захиалгын алхмууд)
  window.lfsTrack = { event: ga };
})();
