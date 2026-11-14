/* LFS Shanghai — Төрсөн огнооны сонгогч (Apple маягийн гүйлгэдэг дугуй)
 *
 * Яагаад: өмнө нь calendar.js-ийн сарын хуанли ашигладаг байсан нь
 * төрсөн огноонд тохиромжгүй — 1998 он руу очихын тулд сараар 300 гаруй
 * удаа дарах шаардлагатай болдог.
 *
 * Энд он / сар / өдөр гурван баганыг гүйлгэж сонгоно.
 *
 * Хэрэглэх:
 *   <script src="/js/birthday-picker.js" defer></script>
 *   initBirthdayPicker('edit-birthday');
 *
 * Жинхэнэ <input> нуугдаж, утга нь YYYY-MM-DD хэвээр үлдэнэ — формын
 * бусад код өөрчлөх шаардлагагүй.
 */
(function () {
  'use strict';

  var ITEM_H  = 40;   // нэг мөрийн өндөр
  var VISIBLE = 5;    // харагдах мөрийн тоо (сонгогдсон нь голд)
  var PAD     = ITEM_H * ((VISIBLE - 1) / 2);

  var MONTHS = ['1-р сар','2-р сар','3-р сар','4-р сар','5-р сар','6-р сар',
                '7-р сар','8-р сар','9-р сар','10-р сар','11-р сар','12-р сар'];

  var stylesDone = false;
  function injectStyles() {
    if (stylesDone) return;
    stylesDone = true;
    var css = [
      '.bdp-field{width:100%;padding:11px 14px;border:1px solid var(--border,#d2d2d7);',
      '  border-radius:10px;font-size:15px;font-family:inherit;background:var(--card,#fff);',
      '  color:var(--dark,#1d1d1f);cursor:pointer;text-align:left;min-height:44px;',
      '  display:flex;align-items:center;transition:border-color .15s}',
      '.bdp-field:hover{border-color:#86868b}',
      '.bdp-field.empty{color:#86868b}',
      '.bdp-field.invalid{border-color:#e53935}',

      '.bdp-overlay{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,.4);',
      '  display:none;align-items:flex-end;justify-content:center}',
      '.bdp-overlay.open{display:flex}',
      '@media(min-width:721px){.bdp-overlay{align-items:center}}',

      '.bdp-sheet{background:var(--card,#fff);width:100%;max-width:420px;',
      '  border-radius:18px 18px 0 0;padding:0 0 env(safe-area-inset-bottom,0);',
      '  box-shadow:0 -8px 40px rgba(0,0,0,.2);animation:bdpUp .22s cubic-bezier(.4,0,.2,1)}',
      '@media(min-width:721px){.bdp-sheet{border-radius:18px;margin:16px}}',
      '@keyframes bdpUp{from{transform:translateY(100%)}to{transform:none}}',
      '@media(min-width:721px){@keyframes bdpUp{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}}',

      '.bdp-head{display:flex;align-items:center;justify-content:space-between;',
      '  padding:12px 16px;border-bottom:1px solid var(--border,#e8e8ed)}',
      '.bdp-head button{background:none;border:none;font-family:inherit;font-size:15px;',
      '  cursor:pointer;padding:8px 6px;min-height:44px;color:#0071e3}',
      '.bdp-head .bdp-done{font-weight:600}',
      '.bdp-head .bdp-cancel{color:#86868b}',
      '.bdp-title{font-size:15px;font-weight:600;color:var(--dark,#1d1d1f)}',

      '.bdp-wheels{position:relative;display:flex;gap:4px;padding:8px 16px 16px}',
      // Голын сонгогдсон мөрийг тэмдэглэх зурвас
      '.bdp-band{position:absolute;left:16px;right:16px;top:' + (8 + PAD) + 'px;height:' + ITEM_H + 'px;',
      '  background:rgba(0,113,227,.09);border-radius:9px;pointer-events:none}',
      '.bdp-col{flex:1;height:' + (ITEM_H * VISIBLE) + 'px;overflow-y:scroll;',
      '  scroll-snap-type:y mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;',
      '  position:relative;z-index:1}',
      '.bdp-col::-webkit-scrollbar{display:none}',
      '.bdp-col ul{list-style:none;margin:0;padding:' + PAD + 'px 0}',
      '.bdp-col li{height:' + ITEM_H + 'px;display:flex;align-items:center;justify-content:center;',
      '  scroll-snap-align:center;font-size:17px;color:#86868b;transition:color .15s,font-weight .15s;',
      '  cursor:pointer;user-select:none}',
      '.bdp-col li.sel{color:var(--dark,#1d1d1f);font-weight:600}'
    ].join('');
    var el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function daysIn(y, m) { return new Date(y, m + 1, 0).getDate(); }  // m: 0-11

  function initBirthdayPicker(id, opts) {
    opts = opts || {};
    var input = typeof id === 'string' ? document.getElementById(id) : id;
    if (!input || input.dataset.bdpReady) return;
    input.dataset.bdpReady = '1';
    injectStyles();

    input.style.display = 'none';

    var field = document.createElement('button');
    field.type = 'button';
    field.className = 'bdp-field';
    input.parentNode.insertBefore(field, input);

    var now = new Date();
    var maxYear = now.getFullYear();
    var minYear = maxYear - 100;
    var years = [];
    for (var y = maxYear; y >= minYear; y--) years.push(y);

    // Эхний утга
    var cur = { y: maxYear - 20, m: 0, d: 1 };
    if (input.value && /^\d{4}-\d{2}-\d{2}$/.test(input.value)) {
      var p = input.value.split('-');
      cur = { y: +p[0], m: +p[1] - 1, d: +p[2] };
    }

    function label() {
      return cur.y + ' оны ' + (cur.m + 1) + '-р сарын ' + cur.d;
    }
    function paintField() {
      if (input.value) {
        field.textContent = label();
        field.classList.remove('empty');
      } else {
        field.textContent = opts.placeholder || 'Огноо сонгох';
        field.classList.add('empty');
      }
    }
    paintField();

    // ── Хуудас ──
    var overlay = document.createElement('div');
    overlay.className = 'bdp-overlay';
    overlay.innerHTML =
      '<div class="bdp-sheet" role="dialog" aria-modal="true" aria-label="Төрсөн огноо">' +
        '<div class="bdp-head">' +
          '<button type="button" class="bdp-cancel">Цуцлах</button>' +
          '<span class="bdp-title">Төрсөн огноо</span>' +
          '<button type="button" class="bdp-done">Болсон</button>' +
        '</div>' +
        '<div class="bdp-wheels">' +
          '<div class="bdp-band"></div>' +
          '<div class="bdp-col" data-k="y"><ul></ul></div>' +
          '<div class="bdp-col" data-k="m"><ul></ul></div>' +
          '<div class="bdp-col" data-k="d"><ul></ul></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var colY = overlay.querySelector('[data-k="y"]');
    var colM = overlay.querySelector('[data-k="m"]');
    var colD = overlay.querySelector('[data-k="d"]');

    function fill(col, items) {
      var ul = col.querySelector('ul');
      ul.innerHTML = items.map(function (t) { return '<li>' + t + '</li>'; }).join('');
    }
    function markSel(col, idx) {
      var lis = col.querySelectorAll('li');
      for (var i = 0; i < lis.length; i++) lis[i].classList.toggle('sel', i === idx);
    }
    function scrollTo(col, idx, smooth) {
      col.scrollTo({ top: idx * ITEM_H, behavior: smooth ? 'smooth' : 'auto' });
      markSel(col, idx);
    }

    fill(colY, years);
    fill(colM, MONTHS);

    function refreshDays(keepDay) {
      var n = daysIn(cur.y, cur.m);
      if (cur.d > n) cur.d = n;
      var arr = [];
      for (var i = 1; i <= n; i++) arr.push(i);
      fill(colD, arr);
      scrollTo(colD, cur.d - 1, false);
      if (keepDay === false) cur.d = 1;
    }

    // ── Гүйлгэх үед сонголтыг шинэчлэх ──
    function onScroll(col, key) {
      var t;
      col.addEventListener('scroll', function () {
        clearTimeout(t);
        var idx = Math.round(col.scrollTop / ITEM_H);
        markSel(col, idx);
        t = setTimeout(function () {
          idx = Math.round(col.scrollTop / ITEM_H);
          if (key === 'y') { cur.y = years[idx]; refreshDays(true); }
          else if (key === 'm') { cur.m = idx; refreshDays(true); }
          else { cur.d = idx + 1; }
          markSel(col, idx);
        }, 110);
      }, { passive: true });

      // Мөр дээр дарахад тэр рүү очно
      col.addEventListener('click', function (e) {
        var li = e.target.closest('li');
        if (!li) return;
        var lis = Array.prototype.slice.call(col.querySelectorAll('li'));
        scrollTo(col, lis.indexOf(li), true);
      });
    }
    onScroll(colY, 'y');
    onScroll(colM, 'm');
    onScroll(colD, 'd');

    function open() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Нээх бүрт одоогийн утга руу байрлуулна
      var yi = years.indexOf(cur.y); if (yi < 0) yi = 20;
      refreshDays(true);
      scrollTo(colY, yi, false);
      scrollTo(colM, cur.m, false);
      scrollTo(colD, cur.d - 1, false);
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    field.addEventListener('click', open);
    overlay.querySelector('.bdp-cancel').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    overlay.querySelector('.bdp-done').addEventListener('click', function () {
      input.value = cur.y + '-' + pad2(cur.m + 1) + '-' + pad2(cur.d);
      input.dispatchEvent(new Event('change', { bubbles: true }));
      field.classList.remove('invalid');
      paintField();
      close();
    });

    // Формын бусад код input.value-г шууд өөрчилж болно
    input.addEventListener('change', paintField);
    // profileSetInvalid() жинхэнэ input дээр класс тавьдаг тул толинд нь буулгана
    var obs = new MutationObserver(function () {
      field.classList.toggle('invalid', input.classList.contains('invalid'));
    });
    obs.observe(input, { attributes: true, attributeFilter: ['class'] });
  }

  window.initBirthdayPicker = initBirthdayPicker;
})();
