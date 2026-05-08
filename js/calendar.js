/**
 * LFS Shanghai — Custom Datepicker
 * Usage:
 *   initDatepicker('input-id', { minToday: true })
 *   initDatepicker('input-id', { minDate: new Date(...) })
 */

(function () {
  const CSS = `
    .dp-wrap { position: relative; display: block; }
    .dp-input-fake {
      width: 100%; background: var(--bg2, #f5f5f7);
      border: 1px solid var(--border, rgba(0,0,0,.08));
      border-radius: 12px; padding: 12px 16px;
      color: var(--dark2, #1d1d1f); font-size: 14px;
      font-family: inherit; outline: none; cursor: pointer;
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px; transition: .2s; user-select: none;
      -webkit-user-select: none;
    }
    .dp-input-fake:hover { background: #ebebed; }
    .dp-input-fake.open,
    .dp-input-fake:focus { border-color: var(--blue, #0071e3); background: #fff; box-shadow: 0 0 0 3px rgba(0,113,227,.1); }
    .dp-input-fake.invalid { border-color: #e53935 !important; background: #fff5f5; box-shadow: 0 0 0 3px rgba(229,57,53,.1) !important; }
    .dp-placeholder { color: var(--muted2, #86868b); }
    .dp-icon { color: var(--muted, #6e6e73); flex-shrink: 0; transition: transform .2s; }
    .dp-input-fake.open .dp-icon { transform: rotate(180deg); }

    .dp-panel {
      position: absolute; top: calc(100% + 6px); left: 0;
      background: #fff; border: 1px solid rgba(0,0,0,.1);
      border-radius: 18px; padding: 20px;
      box-shadow: 0 12px 48px rgba(0,0,0,.14);
      z-index: 9000; width: 300px;
      opacity: 0; transform: translateY(-6px) scale(.98);
      pointer-events: none;
      transition: opacity .18s ease, transform .18s ease;
    }
    @media(max-width:400px) { .dp-panel { width: calc(100vw - 32px); left: 0; } }
    .dp-panel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

    /* Header */
    .dp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .dp-nav { background: var(--bg2, #f5f5f7); border: none; border-radius: 8px; width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background .15s; font-size: 14px; }
    .dp-nav:hover { background: rgba(0,0,0,.08); }
    .dp-month-year { font-size: 14px; font-weight: 700; color: var(--dark2,#1d1d1f);
      letter-spacing: -.02em; cursor: pointer; padding: 4px 8px; border-radius: 8px; transition: background .15s; }
    .dp-month-year:hover { background: var(--bg2,#f5f5f7); }

    /* Day names */
    .dp-daynames { display: grid; grid-template-columns: repeat(7,1fr); margin-bottom: 6px; }
    .dp-dayname { text-align: center; font-size: 11px; font-weight: 600;
      color: var(--muted2,#86868b); padding: 4px 0; letter-spacing: .02em; }

    /* Days grid */
    .dp-days { display: grid; grid-template-columns: repeat(7,1fr); gap: 2px; }
    .dp-day {
      aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 400; border-radius: 50%;
      cursor: pointer; transition: background .12s, color .12s;
      border: none; background: none; font-family: inherit; color: var(--dark2,#1d1d1f);
    }
    .dp-day:hover:not(.disabled):not(.selected) { background: var(--bg2,#f5f5f7); }
    .dp-day.other-month { color: var(--muted2,#86868b); }
    .dp-day.today:not(.selected) { font-weight: 700; color: var(--blue,#0071e3); }
    .dp-day.today:not(.selected)::after { content:''; display:block; width:4px; height:4px;
      background: var(--blue,#0071e3); border-radius:50%; position:absolute; bottom:3px; }
    .dp-day.today { position: relative; }
    .dp-day.selected { background: var(--blue,#0071e3) !important; color: #fff !important; font-weight: 600; }
    .dp-day.disabled { color: #c7c7cc !important; cursor: default; pointer-events: none; }

    /* Month picker overlay */
    .dp-month-picker {
      display: none; grid-template-columns: repeat(3,1fr); gap: 6px; margin-top: 4px;
    }
    .dp-month-picker.show { display: grid; }
    .dp-mpick {
      padding: 8px 4px; text-align: center; border-radius: 10px;
      font-size: 13px; font-weight: 500; cursor: pointer; border: none;
      background: var(--bg2,#f5f5f7); color: var(--dark2,#1d1d1f);
      font-family: inherit; transition: background .15s;
    }
    .dp-mpick:hover { background: rgba(0,113,227,.1); color: var(--blue,#0071e3); }
    .dp-mpick.active { background: var(--blue,#0071e3); color: #fff; }

    /* Footer */
    .dp-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border,rgba(0,0,0,.06)); }
    .dp-today-btn { font-size: 12px; font-weight: 500; color: var(--blue,#0071e3);
      background: none; border: none; cursor: pointer; font-family: inherit; padding: 4px 8px; border-radius: 8px; }
    .dp-today-btn:hover { background: rgba(0,113,227,.08); }
    .dp-clear-btn { font-size: 12px; color: var(--muted,#6e6e73); background: none; border: none;
      cursor: pointer; font-family: inherit; padding: 4px 8px; border-radius: 8px; }
    .dp-clear-btn:hover { background: var(--bg2,#f5f5f7); color: var(--dark2,#1d1d1f); }
  `;

  const MN_MONTHS = ['1-р сар','2-р сар','3-р сар','4-р сар','5-р сар','6-р сар',
                     '7-р сар','8-р сар','9-р сар','10-р сар','11-р сар','12-р сар'];
  const MN_DAYS   = ['Да','Мя','Лх','Пү','Ба','Бя','Ня'];

  function pad(n) { return String(n).padStart(2,'0'); }
  function toYMD(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
  function fromYMD(s) {
    if (!s) return null;
    const [y,m,d] = s.split('-').map(Number);
    return new Date(y, m-1, d);
  }

  function injectStyles() {
    if (document.getElementById('dp-style')) return;
    const s = document.createElement('style');
    s.id = 'dp-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function initDatepicker(elOrId, opts = {}) {
    injectStyles();

    const realInput = typeof elOrId === 'string'
      ? document.getElementById(elOrId) : elOrId;
    if (!realInput) return;

    // Hide the real input but keep it for form value
    realInput.style.display = 'none';

    const today    = new Date(); today.setHours(0,0,0,0);
    const minDate  = opts.minToday ? today
                   : opts.minDate  ? opts.minDate
                   : null;

    // State
    let selectedDate = realInput.value ? fromYMD(realInput.value) : null;
    let viewYear     = (selectedDate || today).getFullYear();
    let viewMonth    = (selectedDate || today).getMonth();
    let showMonthPicker = false;

    // ── DOM ──────────────────────────────────────────
    const wrap = document.createElement('div');
    wrap.className = 'dp-wrap';
    realInput.parentNode.insertBefore(wrap, realInput);
    wrap.appendChild(realInput);

    const trigger = document.createElement('div');
    trigger.className = 'dp-input-fake';
    trigger.tabIndex = 0;
    trigger.setAttribute('role','button');
    trigger.innerHTML = `<span class="dp-placeholder" id="${realInput.id}-dp-label">${opts.placeholder || 'Огноо сонгох'}</span>
      <svg class="dp-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>`;
    wrap.insertBefore(trigger, realInput);

    const panel = document.createElement('div');
    panel.className = 'dp-panel';
    panel.innerHTML = `
      <div class="dp-header">
        <button class="dp-nav" id="${realInput.id}-dp-prev">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="dp-month-year" id="${realInput.id}-dp-my"></span>
        <button class="dp-nav" id="${realInput.id}-dp-next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="dp-month-picker" id="${realInput.id}-dp-mpick"></div>
      <div class="dp-daynames" id="${realInput.id}-dp-dn"></div>
      <div class="dp-days" id="${realInput.id}-dp-grid"></div>
      <div class="dp-footer">
        <button class="dp-today-btn" id="${realInput.id}-dp-today">Өнөөдөр</button>
        <button class="dp-clear-btn" id="${realInput.id}-dp-clear">Цэвэрлэх</button>
      </div>
    `;
    wrap.appendChild(panel);

    // ── Refs ──────────────────────────────────────────
    const labelEl  = wrap.querySelector(`#${realInput.id}-dp-label`);
    const myEl     = wrap.querySelector(`#${realInput.id}-dp-my`);
    const prevBtn  = wrap.querySelector(`#${realInput.id}-dp-prev`);
    const nextBtn  = wrap.querySelector(`#${realInput.id}-dp-next`);
    const gridEl   = wrap.querySelector(`#${realInput.id}-dp-grid`);
    const dnEl     = wrap.querySelector(`#${realInput.id}-dp-dn`);
    const mpickEl  = wrap.querySelector(`#${realInput.id}-dp-mpick`);
    const todayBtn = wrap.querySelector(`#${realInput.id}-dp-today`);
    const clearBtn = wrap.querySelector(`#${realInput.id}-dp-clear`);

    // ── Render ──────────────────────────────────────────
    function render() {
      // Day names (Mon-first)
      if (!dnEl.children.length) {
        MN_DAYS.forEach(d => {
          const el = document.createElement('div');
          el.className = 'dp-dayname'; el.textContent = d;
          dnEl.appendChild(el);
        });
      }

      myEl.textContent = `${viewYear} · ${MN_MONTHS[viewMonth]}`;

      // Month picker
      if (showMonthPicker) {
        mpickEl.innerHTML = '';
        mpickEl.classList.add('show');
        gridEl.style.display = 'none';
        dnEl.style.display = 'none';
        MN_MONTHS.forEach((m,i) => {
          const btn = document.createElement('button');
          btn.className = 'dp-mpick' + (i === viewMonth ? ' active' : '');
          btn.textContent = m.replace('-р сар','');
          btn.onclick = () => { viewMonth = i; showMonthPicker = false; render(); };
          mpickEl.appendChild(btn);
        });
        return;
      }

      mpickEl.classList.remove('show');
      gridEl.style.display = '';
      dnEl.style.display = '';

      const firstDay = new Date(viewYear, viewMonth, 1);
      const lastDay  = new Date(viewYear, viewMonth+1, 0);
      // Monday = 0
      let startDow = firstDay.getDay() - 1;
      if (startDow < 0) startDow = 6;

      gridEl.innerHTML = '';

      // Prev month filler
      for (let i = 0; i < startDow; i++) {
        const d = new Date(viewYear, viewMonth, -startDow + i + 1);
        addDayCell(d, true);
      }
      // Current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        addDayCell(new Date(viewYear, viewMonth, i), false);
      }
      // Next month filler
      const total = startDow + lastDay.getDate();
      const remaining = (7 - (total % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        addDayCell(new Date(viewYear, viewMonth+1, i), true);
      }
    }

    function addDayCell(date, otherMonth) {
      const btn = document.createElement('button');
      btn.className = 'dp-day';
      btn.textContent = date.getDate();
      btn.type = 'button';

      const ymd = toYMD(date);
      if (otherMonth)                          btn.classList.add('other-month');
      if (toYMD(date) === toYMD(today))        btn.classList.add('today');
      if (selectedDate && toYMD(selectedDate) === ymd) btn.classList.add('selected');
      if (minDate && date < minDate)           btn.classList.add('disabled');

      btn.onclick = () => selectDate(date);
      gridEl.appendChild(btn);
    }

    function selectDate(date) {
      selectedDate = date;
      realInput.value = toYMD(date);
      realInput.dispatchEvent(new Event('change', { bubbles: true }));
      realInput.dispatchEvent(new Event('input',  { bubbles: true }));
      // Remove invalid styling
      trigger.classList.remove('invalid');
      updateLabel();
      close();
    }

    function updateLabel() {
      if (selectedDate) {
        const d = selectedDate;
        labelEl.textContent = `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())}`;
        labelEl.classList.remove('dp-placeholder');
        labelEl.style.color = 'var(--dark2,#1d1d1f)';
      } else {
        labelEl.textContent = opts.placeholder || 'Огноо сонгох';
        labelEl.classList.add('dp-placeholder');
        labelEl.style.color = '';
      }
    }

    function open() {
      panel.classList.add('open');
      trigger.classList.add('open');
      render();
    }
    function close() {
      panel.classList.remove('open');
      trigger.classList.remove('open');
      showMonthPicker = false;
    }
    function toggle() {
      panel.classList.contains('open') ? close() : open();
    }

    // ── Events ──────────────────────────────────────────
    trigger.addEventListener('click', toggle);
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    prevBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (showMonthPicker) { viewYear--; }
      else { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } }
      render();
    });
    nextBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (showMonthPicker) { viewYear++; }
      else { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } }
      render();
    });

    myEl.addEventListener('click', e => {
      e.stopPropagation();
      showMonthPicker = !showMonthPicker;
      render();
    });

    todayBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (!minDate || today >= minDate) {
        viewYear = today.getFullYear();
        viewMonth = today.getMonth();
        selectDate(today);
      } else {
        viewYear = minDate.getFullYear();
        viewMonth = minDate.getMonth();
        render();
      }
    });

    clearBtn.addEventListener('click', e => {
      e.stopPropagation();
      selectedDate = null;
      realInput.value = '';
      realInput.dispatchEvent(new Event('change', { bubbles: true }));
      updateLabel();
      close();
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) close();
    }, { capture: true });

    // Observe invalid class on realInput → mirror to trigger
    const obs = new MutationObserver(() => {
      if (realInput.classList.contains('invalid')) trigger.classList.add('invalid');
      else trigger.classList.remove('invalid');
    });
    obs.observe(realInput, { attributes: true, attributeFilter: ['class'] });

    // Init label
    updateLabel();

    return { open, close, getValue: () => realInput.value, setValue: (v) => { selectedDate = fromYMD(v); realInput.value = v; updateLabel(); } };
  }

  window.initDatepicker = initDatepicker;
})();
