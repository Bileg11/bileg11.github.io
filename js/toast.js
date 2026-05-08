/**
 * LFS Shanghai — Toast Notification System
 * Usage:
 *   toast('Амжилттай!', 'success')
 *   toast('Алдаа гарлаа', 'error')
 *   toast('Анхааруулга', 'warning')
 *   toast('Мэдээлэл', 'info')
 */
(function() {
  const STYLE = `
    #toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    @media(max-width:500px) {
      #toast-container { bottom: 16px; right: 12px; left: 12px; }
    }
    .toast {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 13px 16px;
      border-radius: 14px;
      background: #1d1d1f;
      color: #fff;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 500;
      line-height: 1.45;
      max-width: 340px;
      min-width: 220px;
      box-shadow: 0 8px 32px rgba(0,0,0,.22);
      pointer-events: all;
      cursor: default;
      transform: translateX(calc(100% + 32px));
      opacity: 0;
      transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .25s ease;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,.08);
    }
    @media(max-width:500px) {
      .toast { max-width: 100%; min-width: 0; transform: translateY(80px); }
    }
    .toast.show {
      transform: translateX(0);
      opacity: 1;
    }
    @media(max-width:500px) {
      .toast.show { transform: translateY(0); }
    }
    .toast.hide {
      transform: translateX(calc(100% + 32px));
      opacity: 0;
    }
    @media(max-width:500px) {
      .toast.hide { transform: translateY(80px); }
    }
    .toast-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
    .toast-body { flex: 1; }
    .toast-title { font-weight: 600; font-size: 13px; }
    .toast-msg   { font-size: 12px; color: rgba(255,255,255,.75); margin-top: 2px; line-height: 1.4; }
    .toast-close {
      background: none; border: none; color: rgba(255,255,255,.5);
      font-size: 15px; cursor: pointer; padding: 0 0 0 4px;
      line-height: 1; flex-shrink: 0; margin-top: -1px;
      font-family: inherit; transition: color .15s;
    }
    .toast-close:hover { color: rgba(255,255,255,.9); }
    .toast-progress {
      position: absolute; bottom: 0; left: 0; height: 2px;
      background: rgba(255,255,255,.25);
      animation: toastProgress linear forwards;
    }
    @keyframes toastProgress { from { width: 100%; } to { width: 0; } }

    /* Types */
    .toast.success { background: #1a3a2a; border-color: rgba(52,199,89,.3); }
    .toast.success .toast-progress { background: #34c759; }
    .toast.error   { background: #3a1a1a; border-color: rgba(255,69,58,.3); }
    .toast.error   .toast-progress { background: #ff453a; }
    .toast.warning { background: #3a2e10; border-color: rgba(255,214,10,.3); }
    .toast.warning .toast-progress { background: #ffd60a; }
    .toast.info    { background: #0f2a3a; border-color: rgba(0,122,255,.3); }
    .toast.info    .toast-progress { background: #007aff; }
  `;

  const icons = {
    success: '✓',
    error:   '✕',
    warning: '⚠',
    info:    'ℹ'
  };

  function getContainer() {
    let c = document.getElementById('toast-container');
    if (!c) {
      // Inject styles
      const s = document.createElement('style');
      s.textContent = STYLE;
      document.head.appendChild(s);
      c = document.createElement('div');
      c.id = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  /**
   * @param {string} message  - Main message (or title if subtitle given)
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {object} [opts]   - { subtitle, duration }
   */
  window.toast = function(message, type = 'info', opts = {}) {
    const container = getContainer();
    const duration  = opts.duration ?? (type === 'error' ? 5000 : 3500);

    const el = document.createElement('div');
    el.className = `toast ${type}`;

    el.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ'}</span>
      <div class="toast-body">
        <div class="toast-title">${message}</div>
        ${opts.subtitle ? `<div class="toast-msg">${opts.subtitle}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Хаах">✕</button>
      <div class="toast-progress" style="animation-duration:${duration}ms"></div>
    `;

    container.appendChild(el);
    // Trigger show
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));

    const dismiss = () => {
      el.classList.remove('show');
      el.classList.add('hide');
      el.addEventListener('transitionend', () => el.remove(), { once: true });
    };

    const timer = setTimeout(dismiss, duration);
    el.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(timer);
      dismiss();
    });

    return dismiss;
  };
})();
