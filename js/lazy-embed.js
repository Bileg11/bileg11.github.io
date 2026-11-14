/* LFS Shanghai — гуравдагч талын embed-ийг гүйлгэж хүрэх хүртэл хойшлуулах
 *
 * loading="lazy" нь хангалтгүй: Chrome тийм iframe-ийг эхлүүлсэн тохиолдолд
 * window-ийн `load` event-ийг ХҮЛЭЭЛГЭСЭН хэвээр байдаг. Хэмжихэд Trip.com-ийн
 * хайлтын цонх lazy байсаар атлаа health хуудасны load-ийг ~1.1 секунд
 * барьж байв.
 *
 * Шийдэл: src-г огт тавихгүй (data-src-д хадгална), хэрэглэгч ойртож
 * ирэхэд л тавина. Ингэснээр load event-д огт хүрэхгүй.
 *
 * Хэрэглэх:
 *   <iframe data-src="https://..." ...></iframe>
 *   <script src="/js/lazy-embed.js" defer></script>
 */
(function () {
  'use strict';

  function init() {
    var frames = document.querySelectorAll('iframe[data-src]');
    if (!frames.length) return;

    function load(f) {
      if (!f.dataset.src) return;
      f.src = f.dataset.src;
      delete f.dataset.src;
    }

    // БАТАЛГААТ FALLBACK — load дууссанаас хойш бүгдийг заавал тавина.
    // IntersectionObserver ямар нэг шалтгаанаар ажиллаагүй ч (хуучин
    // браузер, рендер хийгдээгүй контекст) embed ЗААВАЛ гарч ирнэ.
    // Load аль хэдийн дууссан тул хурдад нөлөөлөхгүй.
    function loadAll() { Array.prototype.forEach.call(frames, load); }
    function armFallback() { setTimeout(loadAll, 2500); }
    if (document.readyState === 'complete') armFallback();
    else window.addEventListener('load', armFallback, { once: true });

    // Хэрэглэгч эрт гүйлгэж ирвэл fallback-ийг хүлээлгүй шууд тавина
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          load(e.target);
          io.unobserve(e.target);
        });
      }, { rootMargin: '400px' });
      Array.prototype.forEach.call(frames, function (f) { io.observe(f); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
