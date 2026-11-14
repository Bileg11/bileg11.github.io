/* LFS Shanghai — Google Analytics 4
 *
 * Яагаад тусдаа файл вэ:
 * Өмнө нь хуудас бүр <script async src=".../gtag/js?id=..."> гэж шууд
 * ачаалдаг байв. `async` нь HTML задлахыг блоклохгүй ч window-ийн `load`
 * event-ийг ХҮЛЭЭЛГЭДЭГ. Хэмжихэд энэ нэг хүсэлт load-ийг 3.7 секунд
 * барьж байсан.
 *
 * Шийдэл: gtag() функцийг синхроноор тодорхойлж (дуудлага бүр dataLayer-т
 * хуримтлагдана), номын санг нь load дууссаны дараа сул зуур нь татна.
 * Ингэснээр нэг ч event алдагдахгүй, load хурдан дуусна.
 *
 * Хэрэглэх: <script src="/js/analytics.js" defer></script>
 */
(function () {
  'use strict';

  var ID = 'G-81DTJ80VLR';

  window.dataLayer = window.dataLayer || [];
  // Номын сан ачаалагдахаас өмнөх дуудлагууд энд хуримтлагдана
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ID);

  var requested = false;
  function loadGtag() {
    if (requested) return;
    requested = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  }

  function schedule() {
    var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 800); };
    idle(loadGtag, { timeout: 3000 });
  }

  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
