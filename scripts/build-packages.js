#!/usr/bin/env node
/*!
 * LFS Shanghai — Багцын хуудас үүсгэгч
 * ═══════════════════════════════════════════════════════════════
 * js/packages.js  →  /packages/<slug>/index.html
 *                    /en/packages/<slug>/index.html
 *                    sitemap.xml (багцын мөрүүд)
 *
 * Ажиллуулах:  node scripts/build-packages.js
 *
 * Гараар засаж болохгүй — үүсгэсэн файлууд дарагдана.
 * Контент солих бол js/packages.js-ийг зас.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = require(path.join(ROOT, 'js', 'packages.js'));
const RV   = require(path.join(ROOT, 'js', 'reviews.js'));
const SITE = 'https://lfsshanghai.com';

const T = {
  mn: {
    lang: 'mn', locale: 'mn_MN', base: '/packages', booking: '/booking', home: '/', hub: '/health/',
    brandAlt: '🇬🇧 English', altBase: '/en/packages',
    included: 'Үнэд багтсан зүйлс', highlights: 'Үйлчилгээний онцлог',
    itinerary: 'Аяллын хөтөлбөр', day: '-р өдөр',
    testsTitle: 'Эмнэлгийн шинжилгээний задаргаа', testsCount: 'төрлийн шинжилгээ',
    testsSub: 'Энэ багцад багтсан бүх шинжилгээ. MRI, CT зэрэг өндөр өртөгтэй дүрс оношилгоо ч үнэд бүрэн орсон.',
    addonsTitle: 'Нэмэлтээр сонгох боломжтой нарийн шинжилгээнүүд',
    addonsSub: 'Багцад ороогүй. Хэрэгтэй бол урьдчилан захиалж болно — үнийг эмнэлгийн мэргэжилтэнтэй тохиролцоно.',
    photos: 'Зургууд', book: 'Одоо захиалах →', allPkgs: 'Бүх багц харах',
    reviewsLabel: 'Үйлчлүүлэгчид', reviewsTitle: 'Үнэлгээ', ofFive: '5-аас', reviewWord: 'үнэлгээ',
    perPerson: '/ хүн', groupNote: '👥 2-оос дээш хүн ирвэл үнийг тохиролцоно',
    ctaTitle: 'Захиалахад бэлэн үү?', ctaSub: 'Мэдээллээ илгээхэд 24 цагийн дотор холбоо барина.',
    notIncluded: 'Энэ багцад ОРООГҮЙ', crumbHome: 'Нүүр', crumbPkgs: 'Багцууд',
    footerLinks: [['/', 'Нүүр'], ['/routes/', 'Маршрут'], ['/health/', 'Эрүүл мэнд'], ['/tips/', 'Зөвлөмж'], ['/booking/', 'Захиалга']],
    rights: '© 2026 LFS Shanghai. Бүх эрх хуулиар хамгаалагдсан.',
    navBook: 'Захиалах'
  },
  en: {
    lang: 'en', locale: 'en_US', base: '/en/packages', booking: '/en/booking', home: '/en/', hub: '/en/health/',
    brandAlt: '🇲🇳 Монгол', altBase: '/packages',
    included: 'What’s included', highlights: 'Service highlights',
    itinerary: 'Day-by-day itinerary', day: 'Day ',
    testsTitle: 'Full medical test breakdown', testsCount: 'medical tests',
    testsSub: 'Every test included in this package. MRI and CT — normally costly imaging — are part of the price.',
    addonsTitle: 'Optional add-on tests',
    addonsSub: 'Not included in the package. Available on request — price agreed in advance with the hospital.',
    photos: 'Photos', book: 'Book now →', allPkgs: 'See all packages',
    reviewsLabel: 'Customers', reviewsTitle: 'Reviews', ofFive: 'out of 5', reviewWord: 'reviews',
    perPerson: 'per person', groupNote: '👥 Group price available for 2+ people',
    ctaTitle: 'Ready to book?', ctaSub: 'Send us your details and we reply within 24 hours.',
    notIncluded: 'NOT included in this package', crumbHome: 'Home', crumbPkgs: 'Packages',
    footerLinks: [['/en/', 'Home'], ['/en/routes/', 'Routes'], ['/en/health/', 'Healthcare'], ['/en/tips/', 'Tips'], ['/en/booking/', 'Book Now']],
    rights: '© 2026 LFS Shanghai — Trusted Guide for Mongolian Travelers',
    navBook: 'Book Now'
  }
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = n => '₮' + n.toLocaleString('en-US');

// ── CSS (бүх багцын хуудсанд ижил) ────────────────────────────
const CSS = `*{margin:0;padding:0;box-sizing:border-box}
:root{--blue:#0071e3;--blue-hover:#0077ed;--blue-light:#e8f0fc;--text:#1d1d1f;--muted:#6e6e73;--muted2:#86868b;--bg:#fff;--bg2:#f5f5f7;--border:rgba(0,0,0,.08);--shadow:0 2px 20px rgba(0,0,0,.08);--shadow2:0 8px 40px rgba(0,0,0,.12);--radius:18px}
html{scroll-behavior:smooth}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}

.nav{position:sticky;top:0;z-index:100;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;background:rgba(255,255,255,.88);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid var(--border)}
.nav-logo{font-size:17px;font-weight:800;letter-spacing:-.02em;text-decoration:none}
.nav-logo span{color:var(--blue)}
.nav-right{display:flex;align-items:center;gap:14px}
.nav-lang{font-size:12.5px;color:var(--muted);text-decoration:none;font-weight:500}
.nav-lang:hover{color:var(--text)}
.nav-btn{background:var(--blue);color:#fff;padding:8px 18px;border-radius:20px;font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap}
.nav-btn:hover{background:var(--blue-hover)}

.crumb{font-size:12.5px;color:var(--muted2);padding:20px 0 0}
.crumb a{color:var(--muted);text-decoration:none}
.crumb a:hover{color:var(--blue)}
.crumb span{margin:0 6px;opacity:.5}

.hero{padding:22px 0 52px}
.hero-badge{display:inline-block;padding:5px 15px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-bottom:16px}
.b-gold{background:linear-gradient(135deg,#d4a017,#f0c040);color:#fff}
.b-blue{background:var(--blue);color:#fff}
.b-green{background:#34c759;color:#fff}
.hero-title{font-size:clamp(30px,5.5vw,46px);font-weight:800;letter-spacing:-.035em;line-height:1.1;margin-bottom:12px}
.hero-sub{font-size:16px;color:var(--muted);max-width:620px;margin-bottom:26px}
.hero-price{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:6px}
.hero-price b{font-size:clamp(34px,7vw,52px);font-weight:800;letter-spacing:-.04em;line-height:1}
.hero-price i{font-style:normal;font-size:14px;color:var(--muted)}
.hero-usd{font-size:13px;color:var(--muted2);margin-bottom:22px}
.allin{display:inline-flex;align-items:flex-start;gap:9px;background:rgba(52,199,89,.1);border:1px solid rgba(52,199,89,.3);border-radius:12px;padding:12px 16px;font-size:14px;font-weight:600;color:#1c7a3a;margin-bottom:26px;max-width:620px}
.notinc{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:13px 16px;font-size:13.5px;color:var(--muted);margin-bottom:26px;max-width:620px}
.notinc b{color:var(--text);display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:5px}
.cta-row{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-block;padding:14px 30px;border-radius:30px;font-size:15px;font-weight:600;text-decoration:none;transition:.2s;border:none;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--blue);color:#fff}
.btn-primary:hover{background:var(--blue-hover);transform:translateY(-1px)}
.btn-ghost{background:transparent;color:var(--blue);border:1.5px solid var(--blue)}
.btn-ghost:hover{background:var(--blue-light)}
.btn-white{background:#fff;color:var(--text)}
.btn-white:hover{transform:translateY(-1px)}

.sec{padding:56px 0;border-top:1px solid var(--border)}
.sec-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
.sec-title{font-size:clamp(22px,3.6vw,32px);font-weight:700;letter-spacing:-.03em;margin-bottom:8px}
.sec-sub{font-size:15px;color:var(--muted);max-width:660px;margin-bottom:30px}

.inc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}
.inc{display:flex;gap:12px;align-items:flex-start;background:var(--bg2);border-radius:13px;padding:15px 17px;font-size:14.5px;line-height:1.5}
.inc-check{flex-shrink:0;width:20px;height:20px;border-radius:50%;background:var(--blue);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;margin-top:1px}
.hl-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2px 26px}
.hl{display:flex;gap:11px;align-items:flex-start;font-size:14.5px;color:#3a3a3a;padding:10px 0;border-bottom:1px solid var(--border);line-height:1.5}
.hl span{color:var(--blue);flex-shrink:0;font-weight:700}

.photo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px}
.ph{position:relative;aspect-ratio:4/3;border-radius:13px;overflow:hidden;cursor:pointer;display:flex;align-items:center;justify-content:center}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ph-ic{font-size:26px;position:relative;z-index:1}
.ph:not(.noimg) .ph-ic{display:none}
.ph-lb{position:absolute;left:0;right:0;bottom:0;padding:20px 10px 7px;background:linear-gradient(to top,rgba(0,0,0,.72),transparent);color:#fff;font-size:11px;font-weight:600;z-index:2;line-height:1.3}
.ph:hover img{transform:scale(1.04)}
.ph img{transition:transform .35s ease}

.ph-more{margin-top:16px}
.ph-more>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border:1px solid var(--border);border-radius:12px;background:var(--bg2);font-size:13.5px;font-weight:600;color:var(--blue);-webkit-tap-highlight-color:transparent;user-select:none}
.ph-more>summary::-webkit-details-marker{display:none}
.ph-more>summary::marker{content:''}
.ph-more>summary::after{content:'';width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .2s}
.ph-more[open]>summary::after{transform:translateY(1px) rotate(-135deg)}
.ph-more>summary:hover{background:var(--blue-light)}
.tl{display:flex;flex-direction:column;gap:14px}
.tl-row{display:grid;grid-template-columns:auto 1fr;gap:18px;background:var(--bg2);border-radius:15px;padding:20px 22px}
.tl-num{width:44px;height:44px;border-radius:50%;background:var(--blue);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:15px;font-weight:800;flex-shrink:0;line-height:1}
.tl-num small{font-size:8px;font-weight:600;opacity:.8;letter-spacing:.04em;margin-top:1px}
.tl-t{font-size:16px;font-weight:700;letter-spacing:-.01em;margin-bottom:5px}
.tl-d{font-size:14px;color:var(--muted);line-height:1.65}

.tcount{display:inline-flex;align-items:baseline;gap:8px;background:var(--blue);color:#fff;border-radius:22px;padding:6px 18px;margin-bottom:10px}
.tcount b{font-size:20px;font-weight:800;letter-spacing:-.02em}
.tcount i{font-style:normal;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;opacity:.85}
.t-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;align-items:start}
.t-card{background:#fff;border:1.5px solid var(--border);border-radius:17px;padding:24px 22px;box-shadow:var(--shadow)}
.t-head{display:flex;align-items:center;gap:11px;margin-bottom:4px}
.t-ic{width:38px;height:38px;border-radius:11px;background:var(--blue-light);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
.t-t{font-size:15px;font-weight:700;letter-spacing:-.01em}
.t-n{font-size:12px;color:var(--muted2)}
.t-list{list-style:none;margin:14px 0 0;padding:0;counter-reset:t}
.t-list li{display:flex;gap:11px;align-items:flex-start;font-size:13.5px;color:#3a3a3a;line-height:1.55;padding:9px 0;border-bottom:1px solid var(--border)}
.t-list li:last-child{border-bottom:none;padding-bottom:0}
.t-list li::before{counter-increment:t;content:counter(t);flex-shrink:0;width:20px;height:20px;border-radius:50%;background:var(--blue-light);color:var(--blue);font-size:10.5px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px}
.t-list b{color:var(--text);font-weight:600}
.t-list em{font-style:normal;color:var(--muted)}
.addons{margin-top:26px;border:1.5px dashed rgba(0,113,227,.35);border-radius:17px;padding:24px 22px}
.addons-t{font-size:14px;font-weight:700;margin-bottom:4px}
.addons-s{font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.6}
.addons-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.addon{display:flex;gap:10px;align-items:flex-start;background:var(--bg2);border-radius:11px;padding:12px 14px;font-size:13px;line-height:1.5}
.addon em{display:block;font-style:normal;font-size:11px;color:var(--muted2);margin-top:2px}

.rv-head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:24px}
.rv-score{font-size:38px;font-weight:800;letter-spacing:-.03em;line-height:1}
.rv-stars{color:#f59e0b;font-size:18px;letter-spacing:2px}
.rv-count{font-size:13.5px;color:var(--muted)}
.rv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.rv{background:var(--bg2);border-radius:16px;padding:22px 20px;display:flex;flex-direction:column;gap:12px}
.rv-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.rv-s{color:#f59e0b;font-size:14px;letter-spacing:1px}
.rv-d{font-size:11.5px;color:var(--muted2)}
.rv-t{font-size:14px;line-height:1.65;color:#3a3a3a;flex:1}
.rv-n{font-size:13px;font-weight:600}
.band{background:#000;color:#fff;border-radius:24px;padding:48px 40px;margin:56px 0;text-align:center}
.band h2{font-size:clamp(24px,4vw,34px);font-weight:800;letter-spacing:-.03em;margin-bottom:10px}
.band p{font-size:15px;color:rgba(255,255,255,.6);margin-bottom:8px}
.band .price{font-size:clamp(30px,6vw,44px);font-weight:800;letter-spacing:-.03em;margin:18px 0 4px}
.band .note{font-size:12px;color:rgba(255,255,255,.35);margin-bottom:26px}
.band .cta-row{justify-content:center}

footer{background:var(--bg2);padding:44px 24px;text-align:center;font-size:13px;color:var(--muted)}
.f-logo{font-size:16px;font-weight:800;letter-spacing:-.02em;color:var(--text);margin-bottom:14px}
.f-logo span{color:var(--blue)}
.f-links{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-bottom:14px}
.f-links a{color:var(--muted);text-decoration:none}
.f-links a:hover{color:var(--blue)}

.lb{position:fixed;inset:0;background:rgba(0,0,0,.92);display:none;align-items:center;justify-content:center;z-index:1000;padding:20px}
.lb.open{display:flex}
.lb img{max-width:100%;max-height:90vh;border-radius:10px}
.lb-x{position:fixed;top:18px;right:18px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.15);color:#fff;border:none;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center}

@media(max-width:640px){
  .wrap{padding:0 18px}
  .sec{padding:42px 0}
  .band{padding:36px 24px;border-radius:20px;margin:42px 0}
  .tl-row{grid-template-columns:1fr;gap:12px;padding:18px}
  .cta-row .btn{width:100%;text-align:center}
}`;

// ── Хэсэг үүсгэгчид ───────────────────────────────────────────
function navHtml(t, altHref) {
  return `<nav class="nav">
  <a href="${t.home}" class="nav-logo">LFS <span>Shanghai</span></a>
  <div class="nav-right">
    <a href="${altHref}" class="nav-lang">${t.brandAlt}</a>
    <a href="${t.booking}/" class="nav-btn">${t.navBook}</a>
  </div>
</nav>`;
}

function heroHtml(p, L, t) {
  const badgeCls = { 'gold-badge': 'b-gold', 'blue-badge': 'b-blue', 'green-badge': 'b-green' }[p.badgeClass] || 'b-blue';
  const allin = p.allIn ? `  <div class="allin"><span>✅</span><div>${esc(p.allIn[L])}</div></div>\n` : '';
  const notinc = p.notIncluded ? `  <div class="notinc"><b>${t.notIncluded}</b>${esc(p.notIncluded[L])}</div>\n` : '';
  return `<header class="hero wrap">
  <div class="hero-badge ${badgeCls}">${p.emoji} ${esc(p.badge[L])}</div>
  <h1 class="hero-title">${esc(p.name[L])}</h1>
  <p class="hero-sub">${esc(p.tagline[L])}</p>
  <div class="hero-price"><b>${money(p.price.mnt)}</b><i>${t.perPerson}</i></div>
  <div class="hero-usd">${L === 'en' ? '≈ $' + p.price.usd.toLocaleString('en-US') + ' USD · ' : ''}${esc(p.duration[L])}</div>
${allin}${notinc}  <div class="cta-row">
    <a href="${t.booking}/?package=${p.id}" class="btn btn-primary">${t.book}</a>
    <a href="${t.hub}" class="btn btn-ghost">${t.allPkgs}</a>
  </div>
</header>`;
}

function includesHtml(p, L, t) {
  const rows = p.includes[L].map(x =>
    `    <div class="inc"><span class="inc-check">✓</span><div>${esc(x)}</div></div>`).join('\n');
  return `<section class="sec"><div class="wrap">
  <div class="sec-label">${t.included}</div>
  <h2 class="sec-title">${esc(p.name[L])}</h2>
  <p class="sec-sub">${esc(p.desc[L])}</p>
  <div class="inc-grid">
${rows}
  </div>
</div></section>`;
}

function highlightsHtml(p, L, t) {
  if (!p.highlights) return '';
  const rows = p.highlights[L].map(x => `    <div class="hl"><span>✓</span><div>${esc(x)}</div></div>`).join('\n');
  return `<section class="sec"><div class="wrap">
  <div class="sec-label">${t.highlights}</div>
  <h2 class="sec-title">${L === 'mn' ? 'Юу орох вэ' : 'What you get'}</h2>
  <div class="hl-list">
${rows}
  </div>
</div></section>`;
}

const PHOTOS_VISIBLE = 8;   // үлдсэнийг нь "цааш үзэх" дотор хураана

function photoCell(ph, L) {
  return `    <div class="ph noimg" style="background:${ph.bg}" onclick="lb('${ph.src}')">
      <img src="${ph.src}" alt="${esc(ph[L])}" loading="lazy" decoding="async"
           onload="this.closest('.ph').classList.remove('noimg')"
           onerror="this.style.display='none'">
      <div class="ph-ic">${ph.icon}</div>
      <div class="ph-lb">${esc(ph[L])}</div>
    </div>`;
}

function photosHtml(p, L, t) {
  const list = p.photoSets.reduce((a, k) => a.concat(DATA.PHOTOS[k]), []);
  const head = list.slice(0, PHOTOS_VISIBLE).map(ph => photoCell(ph, L)).join('\n');
  const rest = list.slice(PHOTOS_VISIBLE);
  const more = rest.length ? `
  <details class="ph-more">
    <summary>${L === 'mn' ? 'Үлдсэн ' + rest.length + ' зургийг үзэх' : 'Show ' + rest.length + ' more photos'}</summary>
    <div class="photo-grid" style="margin-top:12px">
${rest.map(ph => photoCell(ph, L)).join('\n')}
    </div>
  </details>` : '';
  return `<section class="sec"><div class="wrap">
  <div class="sec-label">${t.photos}</div>
  <h2 class="sec-title">${L === 'mn' ? 'Зургаар харах' : 'See it for yourself'}</h2>
  <p class="sec-sub">${list.length} ${L === 'mn' ? 'зураг' : 'photos'}</p>
  <div class="photo-grid">
${head}
  </div>${more}
</div></section>`;
}

function itineraryHtml(p, L, t) {
  const rows = p.itinerary.map(d =>
    `    <div class="tl-row">
      <div class="tl-num">${d.day}<small>${L === 'mn' ? 'ӨДӨР' : 'DAY'}</small></div>
      <div>
        <div class="tl-t">${esc(d.title[L])}</div>
        <div class="tl-d">${esc(d.desc[L])}</div>
      </div>
    </div>`).join('\n');
  return `<section class="sec"><div class="wrap">
  <div class="sec-label">${t.itinerary}</div>
  <h2 class="sec-title">${esc(p.duration[L])}</h2>
  <div class="tl">
${rows}
  </div>
</div></section>`;
}

function testsHtml(p, L, t) {
  if (!p.hasTests) return '';
  const cards = DATA.TEST_GROUPS.map(g => {
    const items = g.items.map(it => {
      const [name, sub] = it[L];
      return `      <li><div><b>${esc(name)}</b>${sub ? ` — <em>${esc(sub)}</em>` : ''}</div></li>`;
    }).join('\n');
    const n = g.items.length;
    const nLabel = L === 'mn' ? `${n} шинжилгээ` : `${n} test${n > 1 ? 's' : ''}`;
    return `  <div class="t-card">
    <div class="t-head">
      <div class="t-ic">${g.icon}</div>
      <div><div class="t-t">${esc(g.title[L])}</div><div class="t-n">${nLabel}</div></div>
    </div>
    <ul class="t-list">
${items}
    </ul>
  </div>`;
  }).join('\n');

  const addons = DATA.ADDON_TESTS.map(a =>
    `    <div class="addon"><span>${a.icon}</span><div>${esc(a[L][0])}<em>${esc(a[L][1])}</em></div></div>`).join('\n');

  return `<section class="sec" id="tests"><div class="wrap">
  <div class="tcount"><b>${DATA.testCount()}</b><i>${t.testsCount}</i></div>
  <h2 class="sec-title">${t.testsTitle}</h2>
  <p class="sec-sub">${t.testsSub}</p>
  <div class="t-grid">
${cards}
  </div>
  <div class="addons">
    <div class="addons-t">➕ ${t.addonsTitle}</div>
    <div class="addons-s">${t.addonsSub}</div>
    <div class="addons-g">
${addons}
    </div>
  </div>
</div></section>`;
}

function stars(n) { return '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n)); }

// Үнэлгээний хэсэг — БОДИТ үнэлгээ байхгүй бол огт гарахгүй.
function reviewsHtml(p, L, t) {
  const list = RV.forPackage(p.id);
  const agg  = RV.aggregate(p.id);
  if (!agg || !list.length) return '';
  const cards = list.slice(0, 9).map(r => `    <div class="rv">
      <div class="rv-top"><div class="rv-s">${stars(r.rating)}</div><div class="rv-d">${esc(r.date)}</div></div>
      <div class="rv-t">${esc((r.text[L] || r.text.mn))}</div>
      <div class="rv-n">${esc(r.name)}</div>
    </div>`).join('\n');
  return `<section class="sec"><div class="wrap">
  <div class="sec-label">${t.reviewsLabel}</div>
  <h2 class="sec-title">${t.reviewsTitle}</h2>
  <div class="rv-head">
    <div class="rv-score">${agg.value}</div>
    <div class="rv-stars">${stars(agg.value)}</div>
    <div class="rv-count">${agg.value} ${t.ofFive} · ${agg.count} ${t.reviewWord}</div>
  </div>
  <div class="rv-grid">
${cards}
  </div>
</div></section>`;
}

function bandHtml(p, L, t) {
  return `<div class="wrap"><section class="band">
  <h2>${t.ctaTitle}</h2>
  <p>${t.ctaSub}</p>
  <div class="price">${money(p.price.mnt)}</div>
  <div class="note">${esc(p.duration[L])} · ${t.perPerson} · ${t.groupNote}</div>
  <div class="cta-row">
    <a href="${t.booking}/?package=${p.id}" class="btn btn-white">${t.book}</a>
    <a href="${t.hub}" class="btn btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.4)">${t.allPkgs}</a>
  </div>
</section></div>`;
}

function footerHtml(t) {
  return `<footer>
  <div class="f-logo">LFS <span>Shanghai</span></div>
  <div class="f-links">${t.footerLinks.map(([h, n]) => `<a href="${h}">${n}</a>`).join('')}</div>
  <div>${t.rights}</div>
</footer>`;
}

function jsonLd(p, L, t, url, altUrl) {
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name[L],
    description: p.meta.desc[L],
    image: SITE + p.meta.image,
    brand: { '@type': 'Brand', name: 'LFS Shanghai' },
    sku: p.sku,
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'MNT',
      price: p.price.mnt,
      priceValidUntil: DATA.PRICE_VALID_UNTIL,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'LFS Shanghai', url: SITE }
    }
  };
  const agg = RV.aggregate(p.id);
  const rvList = RV.forPackage(p.id);
  if (agg && rvList.length) {
    product.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: agg.value,
      reviewCount: agg.count,
      bestRating: 5,
      worstRating: 1
    };
    product.review = rvList.slice(0, 9).map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewBody: r.text[L] || r.text.mn,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 }
    }));
  }

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.crumbHome, item: SITE + t.home },
      { '@type': 'ListItem', position: 2, name: t.crumbPkgs, item: SITE + t.hub },
      { '@type': 'ListItem', position: 3, name: p.name[L], item: url }
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(product)}</script>\n<script type="application/ld+json">${JSON.stringify(crumbs)}</script>`;
}

function page(p, L) {
  const t = T[L];
  const url = `${SITE}${t.base}/${p.slug}/`;
  const altUrl = `${SITE}${t.altBase}/${p.slug}/`;
  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.meta.title[L])}</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="description" content="${esc(p.meta.desc[L])}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${L === 'mn' ? 'en' : 'mn'}" href="${altUrl}">
<link rel="alternate" hreflang="${t.lang}" href="${url}">
<meta property="og:type" content="product">
<meta property="og:title" content="${esc(p.meta.title[L])}">
<meta property="og:description" content="${esc(p.meta.desc[L])}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}${p.meta.image}">
<meta property="og:locale" content="${t.locale}">
<meta name="twitter:card" content="summary_large_image">
${jsonLd(p, L, t, url, altUrl)}
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
${CSS}
</style>
</head>
<body>
${navHtml(t, t.altBase + '/' + p.slug + '/')}
<div class="wrap"><div class="crumb"><a href="${t.home}">${t.crumbHome}</a><span>›</span><a href="${t.hub}">${t.crumbPkgs}</a><span>›</span>${esc(p.name[L])}</div></div>
${heroHtml(p, L, t)}
${includesHtml(p, L, t)}
${highlightsHtml(p, L, t)}
${itineraryHtml(p, L, t)}
${testsHtml(p, L, t)}
${photosHtml(p, L, t)}
${reviewsHtml(p, L, t)}
${bandHtml(p, L, t)}
${footerHtml(t)}

<div class="lb" id="lb" onclick="closeLb()"><button class="lb-x" onclick="closeLb()">✕</button><img id="lbImg" src="" alt=""></div>
<script>
function lb(src){var b=document.getElementById('lb');document.getElementById('lbImg').src=src;b.classList.add('open');document.body.style.overflow='hidden';}
function closeLb(){document.getElementById('lb').classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb();});
</script>
<script src="/js/pixel.js"></script>
</body>
</html>
`;
}

// ── Redirect index (/packages/ → hub) ─────────────────────────
function redirectPage(t) {
  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${SITE}${t.hub}">
<meta http-equiv="refresh" content="0;url=${t.hub}">
<script>window.location.replace('${t.hub}');</script>
</head>
<body><a href="${t.hub}">${t.allPkgs}</a></body>
</html>
`;
}

// ── Sitemap ───────────────────────────────────────────────────
function updateSitemap(urls) {
  const file = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(file)) { console.log('  ⚠ sitemap.xml олдсонгүй — алгасав'); return; }
  let xml = fs.readFileSync(file, 'utf8');
  // өмнө нэмсэн багцын мөрүүдийг цэвэрлээд дахин бичнэ
  xml = xml.replace(/\s*<!-- packages:start -->[\s\S]*?<!-- packages:end -->/g, '');
  const today = new Date().toISOString().slice(0, 10);
  const block = '\n  <!-- packages:start -->\n' + urls.map(u =>
    `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`
  ).join('\n') + '\n  <!-- packages:end -->';
  xml = xml.replace('</urlset>', block + '\n</urlset>');
  fs.writeFileSync(file, xml);
  console.log(`  sitemap.xml → ${urls.length} URL нэмэв`);
}

// ── Ажиллуулах ────────────────────────────────────────────────
function write(rel, html) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, html);
  console.log(`  ✓ ${rel}  (${(html.length / 1024).toFixed(1)} KB)`);
}

console.log('LFS багцын хуудас үүсгэж байна…\n');

// ── priceValidUntil хугацаа дуусах гэж байна уу? ──
(function checkPriceDate() {
  const until = new Date(DATA.PRICE_VALID_UNTIL + 'T00:00:00Z');
  const days = Math.round((until - new Date()) / 86400000);
  if (isNaN(days)) {
    console.error(`  ✗ PRICE_VALID_UNTIL буруу форматтай: "${DATA.PRICE_VALID_UNTIL}" (YYYY-MM-DD байх ёстой)`);
    process.exit(1);
  }
  if (days < 0) {
    console.error(`  ✗ PRICE_VALID_UNTIL ӨНГӨРСӨН (${DATA.PRICE_VALID_UNTIL}, ${-days} хоногийн өмнө).`);
    console.error('    Google хайлтын үр дүнд үнэ харуулахаа болино. js/packages.js дээр шинэчил.\n');
  } else if (days < 60) {
    console.warn(`  ⚠ PRICE_VALID_UNTIL-д ${days} хоног үлдлээ (${DATA.PRICE_VALID_UNTIL}).`);
    console.warn('    js/packages.js дээр шинэчлэхээ мартуузай.\n');
  }
})();
const active = DATA.PACKAGES.filter(p => p.active).sort((a, b) => a.order - b.order);
if (!active.length) { console.error('АЛДАА: идэвхтэй багц алга'); process.exit(1); }

const urls = [];
for (const L of ['mn', 'en']) {
  const t = T[L];
  for (const p of active) {
    const rel = `${t.base.replace(/^\//, '')}/${p.slug}/index.html`;
    write(rel, page(p, L));
    urls.push(`${SITE}${t.base}/${p.slug}/`);
  }
  write(`${t.base.replace(/^\//, '')}/index.html`, redirectPage(t));
}
updateSitemap(urls);
console.log(`\nДууслаа — ${active.length} багц × 2 хэл = ${active.length * 2} хуудас.`);
