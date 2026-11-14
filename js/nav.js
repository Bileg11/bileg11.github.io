/* LFS Shanghai — нэгдсэн навигац
 *
 * Асуудал байсан нь: хуудас бүр nav-аа дангаар хуулж бичсэн тул цэсний
 * агуулга зөрүүтэй (зарим хуудсанд "Байр түрээс"/"Үнэ"/хэл солигч байхгүй),
 * booking/pricing/planner/profile/login дээр утасны цэс ОГТ байхгүй байв.
 *
 * Энэ файл дараах зүйлийг хийнэ:
 *   1. Цэсний линкийг НЭГ эх сурвалжаас бүх хуудсанд ижил болгоно
 *   2. Цэсгүй хуудсанд бүрэн цэс + hamburger нэмнэ
 *   3. Утасны nav дээр [хэл] [Нэвтрэх/Профайл] [☰] гурвыг зэрэг гаргана
 *   4. Нэвтэрсэн үед цэсэнд ил "Гарах" товч гаргана
 *   5. Цэс нээгдэх хугацааг 0.6s → 0.25s болгоно
 *
 * Хуудасны одоо байгаа цэсний CSS-ийг хөндөхгүй — элементийг нь хуулж
 * (clone) ашигладаг тул хуудас бүр өөрийн загвараа хадгална.
 */
(function () {
  'use strict';

  // ── Цэсний цорын ганц эх сурвалж ──
  var LINKS = [
    { href: '/',               label: 'Нүүр' },
    { href: '/health/',        label: 'Эрүүл мэнд' },
    { href: '/routes/',        label: 'Маршрут' },
    { href: '/apartment/',     label: 'Байр түрээс' },
    { href: '/tips/',          label: 'Зөвлөмж' },
    { href: '/tips/#guide20k', label: 'Оюутны 20К зөвлөмж' },
    { href: '/metro/',         label: 'Метро' },
    { href: '/planner/',       label: '✦ Аяллын Төлөвлөгч', color: '#e8392a' },
    { href: '/pricing/',       label: 'Үнэ' },
    { href: '/contact/',       label: 'Холбогдох' },
    { href: '/booking/',       label: 'Захиалах →', color: '#0071e3', bold: true }
  ];

  var MENU_SELECTORS = ['#navLinks', '#mobMenu', '#navMenu', '.mob-menu', '.nav-menu'];
  var FB = 'https://www.gstatic.com/firebasejs/11.7.1/';

  var nav, menu, injected = false;

  // ── Нэвтрэлтийн төлөвийг кешлэх ──
  // Firebase SDK-г зөвхөн "Нэвтрэх/Профайл" товч харуулахын тулд ачаалах нь
  // үнэтэй тул эхэлж кешээс шууд зурж, дараа нь Firebase-ээр баталгаажуулна.
  function cachedAuth() {
    try { return JSON.parse(localStorage.getItem('lfs_auth') || 'null'); }
    catch (e) { return null; }
  }
  function cacheAuth(v) {
    try { v ? localStorage.setItem('lfs_auth', JSON.stringify(v)) : localStorage.removeItem('lfs_auth'); }
    catch (e) { /* private mode — зүгээр */ }
  }

  function samePage(href) {
    var p = location.pathname.replace(/\/+$/, '') || '/';
    var h = href.split('#')[0].replace(/\/+$/, '') || '/';
    return p === h;
  }

  // ── Өөрийн CSS (зөвхөн энэ файлын нэмсэн элементэд) ──
  function injectCss() {
    if (injected) return;
    injected = true;
    var css = [
      '[data-lfsnav-item]{text-decoration:none}',
      // Утасны горимыг media query-гээр ТОДОРХОЙЛОХГҮЙ — хуудас бүрийн
      // breakpoint өөр (index 900px, routes 860px, health 720px). Оронд нь
      // hamburger харагдаж байгаа эсэхээр JS шийдээд .lfsnav-mobile класс өгнө.
      '.lfsnav-auth{display:none}',
      '.lfsnav-mobile .lfsnav-auth{display:inline-flex;align-items:center;gap:6px;',
      '  margin-right:10px;padding:5px 12px;border-radius:16px;font-size:12px;font-weight:700;',
      '  color:var(--dark2,#1d1d1f);background:var(--bg2,#f5f5f7);',
      '  border:1px solid var(--border,rgba(0,0,0,.1));text-decoration:none;',
      '  min-height:32px;white-space:nowrap;flex-shrink:0}',
      '.lfsnav-mobile .lfsnav-auth img{width:20px;height:20px;border-radius:50%;object-fit:cover}',
      // "Гарах" ба хэл солигч — зөвхөн утасны хар дэвсгэртэй цэсэнд.
      // routes/tips дээр #navLinks нь desktop nav-аар ч ажилладаг тул
      // тэнд эдгээр гарвал цагаан дэвсгэр дээр цагаан текст болно.
      '.lfsnav-signout,.lfsnav-lang{display:none}',
      '.lfsnav-mobile-menu .lfsnav-signout{display:block;margin-top:18px;padding:11px 22px;',
      '  border-radius:22px;background:none;border:1px solid rgba(255,255,255,.3);',
      '  color:rgba(255,255,255,.85);font-size:15px;font-weight:600;font-family:inherit;',
      '  cursor:pointer;min-height:44px;align-self:flex-start}',
      '.lfsnav-mobile-menu .lfsnav-signout:hover{background:rgba(255,255,255,.1);color:#fff}',
      '.lfsnav-mobile-menu .lfsnav-lang{display:flex;gap:8px;margin-top:20px}',
      '.lfsnav-mobile-menu .lfsnav-lang a{padding:8px 20px;border-radius:20px;font-size:15px;',
      '  font-weight:600;color:rgba(255,255,255,.7);text-decoration:none;',
      '  border:1px solid rgba(255,255,255,.18);min-height:44px;display:flex;align-items:center}',
      '.lfsnav-mobile-menu .lfsnav-lang a.active{background:#fff;color:#111;border-color:#fff}',
      // Цэс нээгдэх хурд — 0.6s хэт удаан, дарангуутаа юу ч болоогүй мэт санагддаг
      '#navLinks,#mobMenu,#navMenu,.mob-menu,.nav-menu{',
      '  transition-duration:.25s!important}',
      // Өөрийн үүсгэсэн цэс (огт цэсгүй байсан хуудсанд)
      '.lfsnav-menu{display:none;position:fixed;top:52px;left:0;right:0;bottom:0;z-index:499;',
      '  background:rgba(8,8,12,.94);backdrop-filter:saturate(160%) blur(28px);',
      '  -webkit-backdrop-filter:saturate(160%) blur(28px);',
      '  flex-direction:column;padding:32px 28px 40px;gap:2px;overflow-y:auto;',
      '  opacity:0;pointer-events:none;transform:translateY(-20px);',
      '  transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1);',
      '  border-top:1px solid rgba(255,255,255,.07)}',
      '.lfsnav-menu.open{opacity:1;transform:none;pointer-events:auto}',
      '.lfsnav-menu a[data-lfsnav-item]{font-size:21px;font-weight:300;color:rgba(255,255,255,.82);',
      '  padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07);',
      '  min-height:48px;display:flex;align-items:center}',
      '.lfsnav-menu a[data-lfsnav-item].active{color:#fff}',
      '@media(max-width:900px){.lfsnav-menu{display:flex}}',
      '.lfsnav-burger{display:none;flex-direction:column;gap:4px;cursor:pointer;',
      '  padding:6px;min-width:44px;min-height:44px;align-items:center;justify-content:center;',
      '  border:none;background:none;flex-shrink:0}',
      '.lfsnav-burger span{display:block;width:18px;height:1px;background:var(--dark2,#1d1d1f);',
      '  transition:.25s;border-radius:1px}',
      '@media(max-width:900px){.lfsnav-burger{display:flex}}'
    ].join('');
    var el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  // ── Цэсний линкүүдийг нэгтгэх ──
  function buildItems(container, tpl) {
    // Байгаа линкүүдийг (хэл солигчоос бусад) устгана
    Array.prototype.slice.call(container.children).forEach(function (el) {
      if ((el.tagName === 'A' || el.tagName === 'BUTTON') &&
          !el.classList.contains('lfsnav-signout')) {
        el.remove();
      }
    });

    var frag = document.createDocumentFragment();
    LINKS.forEach(function (l) {
      var a = document.createElement('a');
      if (tpl && tpl.className) a.className = tpl.className;
      a.classList.remove('active');
      a.href = l.href;
      a.textContent = l.label;
      a.setAttribute('data-lfsnav-item', '');
      if (l.color) a.style.color = l.color;
      if (l.bold)  a.style.fontWeight = '600';
      if (samePage(l.href)) a.classList.add('active');
      frag.appendChild(a);
    });
    container.insertBefore(frag, container.firstChild);
  }

  // ── Хэл солигч ──
  function ensureLangSwitch(container) {
    if (container.querySelector('.mob-lang-switch, .lfsnav-lang')) return;
    var isEn = location.pathname.indexOf('/en/') === 0;
    var wrap = document.createElement('div');
    wrap.className = 'lfsnav-lang';
    wrap.innerHTML =
      '<a href="/" class="' + (isEn ? '' : 'active') + '">МН</a>' +
      '<a href="/en/" class="' + (isEn ? 'active' : '') + '">EN</a>';
    container.appendChild(wrap);
  }

  // ── Цэсгүй хуудсанд бүрэн цэс үүсгэх ──
  function createMenu() {
    var m = document.createElement('div');
    m.className = 'lfsnav-menu';
    m.id = 'lfsnavMenu';
    document.body.appendChild(m);

    // Хуудсанд hamburger БАЙГАА ч цэс байхгүй тохиолдол бий (жишээ: contact —
    // түүний toggleMobileMenu() байхгүй цэс рүү ханддаг тул ажилладаггүй).
    // Тэр тохиолдолд шинийг үүсгэхгүй, байгааг нь авч ажиллуулна.
    var b = nav.querySelector('.hamburger, #hamburger');
    if (b) {
      b.removeAttribute('onclick');   // ажиллахгүй хуучин handler
      b.onclick = null;
    } else {
      b = document.createElement('button');
      b.className = 'lfsnav-burger';
      b.setAttribute('aria-label', 'Цэс');
      b.innerHTML = '<span></span><span></span><span></span>';
      nav.appendChild(b);
    }
    b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', function () {
      var open = m.classList.toggle('open');
      b.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    document.addEventListener('click', function (e) {
      if (!m.classList.contains('open')) return;
      if (m.contains(e.target) || b.contains(e.target)) return;
      m.classList.remove('open');
      b.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
    return m;
  }

  // ── Утасны nav дээрх нэвтрэлтийн товч + цэс дэх "Гарах" ──
  function renderAuth(state) {
    var btn = document.getElementById('lfsnavAuth');
    if (!btn) {
      btn = document.createElement('a');
      btn.id = 'lfsnavAuth';
      btn.className = 'lfsnav-auth';
      // hamburger-ийн ӨМНӨ тавина — [хэл] [Нэвтрэх] [☰]
      var burger = nav.querySelector('.hamburger, .lfsnav-burger, #hamburger');
      if (burger && burger.parentNode) burger.parentNode.insertBefore(btn, burger);
      else nav.appendChild(btn);
    }

    if (state && state.signedIn) {
      btn.href = '/profile/';
      btn.innerHTML = state.photo
        ? '<img src="' + state.photo + '" alt=""> Профайл'
        : '👤 Профайл';
      btn.setAttribute('aria-label', 'Профайл руу очих');
    } else {
      btn.href = '/login/';
      btn.textContent = 'Нэвтрэх';
      btn.setAttribute('aria-label', 'Нэвтрэх');
    }

    // Desktop дээрх товч (index.html-ийн #nav-auth-btn). Өмнө нь тэр хуудас
    // өөрөө Firebase ачаалж шинэчилдэг байсныг энд шилжүүлэв.
    var deskBtn = document.getElementById('nav-auth-btn');
    if (deskBtn) {
      if (state && state.signedIn) {
        deskBtn.href = '/profile/';
        deskBtn.textContent = (state.name ? state.name + ' ' : '') + '👤';
      } else {
        deskBtn.href = '/login/';
        deskBtn.textContent = 'Нэвтрэх 👤';
      }
    }

    // Цэс дэх "Гарах" — нэвтэрсэн үед л
    if (!menu) return;
    var out = menu.querySelector('.lfsnav-signout');
    if (state && state.signedIn) {
      if (!out) {
        out = document.createElement('button');
        out.className = 'lfsnav-signout';
        out.type = 'button';
        out.textContent = 'Гарах';
        out.addEventListener('click', doSignOut);
        menu.appendChild(out);
      }
    } else if (out) {
      out.remove();
    }
  }

  // ── Утасны горим мөн эсэхийг hamburger-ээр тогтооно ──
  // Хуудас бүрийн breakpoint өөр тул өргөнөөр биш, hamburger бодитоор
  // харагдаж байгаа эсэхээр шийднэ.
  function syncMode() {
    var burger = nav.querySelector('.hamburger, .lfsnav-burger, #hamburger');
    var mobile = !!burger && getComputedStyle(burger).display !== 'none';
    nav.classList.toggle('lfsnav-mobile', mobile);
    if (menu) menu.classList.toggle('lfsnav-mobile-menu', mobile);
  }

  // ── Firebase-ийг ЗӨВХӨН хэрэгтэй үед татна ──
  // Хэзээ ч нэвтэрч байгаагүй зочинд auth SDK (~200KB) татах нь дэмий.
  // Firebase нэвтрэлтээ IndexedDB-д хадгалдаг тул тэр сан байгаа эсэхээр
  // шалгаж болно. Гурван шалгуурын аль нэг нь хангагдвал татна:
  //   1. Кеш "нэвтэрсэн" гэж байвал  2. Firebase-ийн IndexedDB байвал
  //   3. Хуудас өөрөө Firebase ачаалдаг бол (модуль аль хэдийн кештэй)
  async function needsFirebase() {
    var c = cachedAuth();
    if (c && c.signedIn) return true;
    var pageLoadsFirebase = Array.prototype.some.call(
      document.querySelectorAll('script'),
      function (s) { return s.textContent && s.textContent.indexOf('firebasejs') !== -1; }
    );
    if (pageLoadsFirebase) return true;
    try {
      if (indexedDB && indexedDB.databases) {
        var dbs = await indexedDB.databases();
        return dbs.some(function (d) { return d.name === 'firebaseLocalStorageDb'; });
      }
    } catch (e) { /* дэмжихгүй браузер */ }
    return false;   // мэдэхгүй бол татахгүй — "Нэвтрэх" хэвээр үлдэнэ
  }

  // ── Firebase auth — load дууссаны дараа сул зуур нь ──
  var signOutFn = null;
  async function syncAuth() {
    if (!(await needsFirebase())) return;
    return loadAuth();
  }

  async function loadAuth() {
    try {
      var mods = await Promise.all([
        import(FB + 'firebase-app.js'),
        import(FB + 'firebase-auth.js'),
        import('/js/firebase-config.js')
      ]);
      var appMod = mods[0], authMod = mods[1], cfg = mods[2].firebaseConfig;
      // Хуудас өөрөө Firebase эхлүүлсэн бол түүнийг нь дахин ашиглана
      var app = appMod.getApps().length ? appMod.getApp() : appMod.initializeApp(cfg);
      var auth = authMod.getAuth(app);
      signOutFn = function () { return authMod.signOut(auth); };
      authMod.onAuthStateChanged(auth, function (u) {
        var state = u ? {
          signedIn: true,
          name: (u.displayName || u.email || '').split('@')[0],
          photo: u.photoURL || ''
        } : null;
        cacheAuth(state);
        renderAuth(state);
      });
    } catch (e) {
      console.warn('nav auth:', e);
    }
  }

  async function doSignOut() {
    try {
      // Гарахад SDK заавал хэрэгтэй — шалгуурыг тойрч шууд ачаална
      if (!signOutFn) await loadAuth();
      if (signOutFn) await signOutFn();
    } catch (e) { console.warn('signOut:', e); }
    cacheAuth(null);
    window.location.href = '/';
  }

  // ── Эхлүүлэх ──
  function init() {
    nav = document.querySelector('nav.nav') || document.querySelector('nav');
    if (!nav) return;
    injectCss();

    for (var i = 0; i < MENU_SELECTORS.length && !menu; i++) {
      menu = document.querySelector(MENU_SELECTORS[i]);
    }

    if (menu) {
      var tpl = menu.querySelector('a, button');
      buildItems(menu, tpl);
      ensureLangSwitch(menu);
    } else {
      menu = createMenu();
      buildItems(menu, null);
      ensureLangSwitch(menu);
    }

    renderAuth(cachedAuth());
    syncMode();
    window.addEventListener('resize', syncMode, { passive: true });

    // Firebase-ийг эхний ачаалалттай өрсөлдүүлэхгүй
    var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 600); };
    if (document.readyState === 'complete') idle(syncAuth, { timeout: 3000 });
    else window.addEventListener('load', function () { idle(syncAuth, { timeout: 3000 }); }, { once: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
