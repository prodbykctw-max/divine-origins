/* =============================================================
   sections/traditions.js — 15 Tradition Groups
   Rail (horizontal) → Split panel (vertical cycle)
   ============================================================= */

import { TRADITION_GROUPS }  from '../../data/traditions/groups.js';
import { artifactPanel }     from '../ui/artifact.js';
import { state, setState }   from '../state.js';
import { cyclePanel, scrollRailToItem, initScrollReveals } from '../animations.js';

let currentIdx = 0;

export function renderTraditions() {
  const section = document.getElementById('section-traditions');
  if (!section) return;

  section.innerHTML = `
    <div class="section">
      <div class="container">
        <header class="section__header">
          <span class="section__eyeline">Every Tradition · Equal Depth</span>
          <h2 class="section__title">15 Tradition Groups</h2>
          <p class="section__desc">
            Scroll the rail to browse. Select a tradition — the full account
            cycles in below. Each entry includes scholarly context,
            the tradition's own account of itself, and its canonical texts.
          </p>
        </header>
      </div>

      <!-- Horizontal rail -->
      <div class="rail-wrap">
        <div class="rail" id="trad-rail" role="listbox" aria-label="Select a tradition">
          ${TRADITION_GROUPS.map((g, i) => `
            <button class="rail__item reveal-card"
                    role="option"
                    aria-selected="${i === 0}"
                    data-idx="${i}"
                    style="--item-color:${g.color};animation-delay:${i * 0.04}s"
                    tabindex="${i === 0 ? '0' : '-1'}">
              <span class="rail__tradition">${g.region.split('/')[0].trim()}</span>
              <span class="rail__name">${g.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Info stage -->
      <div class="container">
        <div class="info-stage" id="trad-stage" style="min-height:580px;margin-top:1.5rem">
          <!-- First tradition panel injected below -->
        </div>
      </div>
    </div>
  `;

  // Render first tradition
  injectPanel(0, 1);

  // Bind rail
  const rail = document.getElementById('trad-rail');
  rail?.querySelectorAll('.rail__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      selectTradition(idx);
    });
    btn.addEventListener('keydown', (e) => {
      const items = [...rail.querySelectorAll('.rail__item')];
      const cur   = parseInt(btn.dataset.idx);
      if (e.key === 'ArrowRight' && cur < items.length - 1) { e.preventDefault(); selectTradition(cur + 1); items[cur + 1].focus(); }
      if (e.key === 'ArrowLeft'  && cur > 0)                { e.preventDefault(); selectTradition(cur - 1); items[cur - 1].focus(); }
    });
  });

  setTimeout(initScrollReveals, 100);
}

function selectTradition(idx) {
  if (idx === currentIdx || state.transitioning) return;
  const dir = idx > currentIdx ? 1 : -1;
  currentIdx = idx;

  // Update rail
  const rail = document.getElementById('trad-rail');
  rail?.querySelectorAll('.rail__item').forEach((btn, i) => {
    const active = i === idx;
    btn.setAttribute('aria-selected', String(active));
    btn.setAttribute('tabindex', active ? '0' : '-1');
  });

  const activeBtn = rail?.querySelector(`[data-idx="${idx}"]`);
  if (activeBtn && rail) scrollRailToItem(rail, activeBtn);

  injectPanel(idx, dir);
}

function injectPanel(idx, dir) {
  const g     = TRADITION_GROUPS[idx];
  const stage = document.getElementById('trad-stage');
  if (!g || !stage) return;

  cyclePanel(stage, buildTradPanel(g), dir);
}

function buildTradPanel(g) {

  return `
    <div class="split-panel glass-subtle" style="border:1px solid ${g.color}22;border-radius:4px;overflow:hidden">

      <!-- LEFT: Artifact image -->
      <div class="split-panel__img">${artifactPanel('traditions', g.id, g.label, g.color)}
      </div>

      <!-- RIGHT: Scrollable content -->
      <div class="split-panel__content">
        <div style="height:3px;background:linear-gradient(90deg,${g.color},transparent)"></div>
        <div class="split-panel__content-inner">

          <div class="t-caption" style="color:${g.color};margin-bottom:0.3rem">${g.era}</div>
          <h2 class="t-title" style="font-size:1.8rem;color:var(--text-primary);margin-bottom:0.3rem">${g.label}</h2>
          <p class="t-italic" style="margin-bottom:1.2rem;font-size:0.9rem">${g.sub} · ${g.region}</p>

          <div class="info-block info-block--scholarly">
            <span class="info-block__label">Overview</span>
            <p>${g.summary}</p>
          </div>

          ${g.offshootOf ? `
          <div style="padding:0.6rem 0.8rem;margin-top:0.8rem;background:rgba(136,64,196,0.06);border:1px solid rgba(136,64,196,0.2);border-radius:2px">
            <span class="t-label" style="color:var(--violet)">◈ Offshoot / Variant of: ${g.offshootOf}</span>
          </div>` : ''}

          <!-- Deities quick list -->
          ${g.deityIds?.length ? `
          <div style="margin-top:1.2rem">
            <div class="t-label" style="color:var(--text-dim);margin-bottom:0.5rem">KEY FIGURES</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.3rem">
              ${g.deityIds.map(id => `<span class="tag">${id.replace(/_/g,' ').toUpperCase()}</span>`).join('')}
            </div>
          </div>` : ''}

          <!-- Canon links -->
          <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border);display:flex;gap:0.6rem;flex-wrap:wrap">
            <button onclick="navigateTo('texts')"
                    style="font-family:var(--font-mono);font-size:0.69rem;letter-spacing:0.25em;text-transform:uppercase;padding:0.4rem 0.8rem;border:1px solid ${g.color}66;color:${g.color};background:${g.color}0a;cursor:pointer;transition:all 0.2s;border-radius:2px">
              VIEW SACRED TEXTS →
            </button>
            ${g.calendarId ? `
            <button onclick="navigateTo('calendars')"
                    style="font-family:var(--font-mono);font-size:0.69rem;letter-spacing:0.25em;text-transform:uppercase;padding:0.4rem 0.8rem;border:1px solid var(--border);color:var(--text-dim);background:transparent;cursor:pointer;transition:all 0.2s;border-radius:2px">
              CALENDAR SYSTEM →
            </button>` : ''}
          </div>

          <!-- Prev / Next -->
          <div class="panel-nav">
            <button class="panel-nav__btn" onclick="tradNav(-1)">← PREV</button>
            <span class="panel-nav__counter" id="trad-counter">${currentIdx + 1} / ${TRADITION_GROUPS.length}</span>
            <button class="panel-nav__btn" onclick="tradNav(1)">NEXT →</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Expose to window for inline onclick
window.tradNav = (dir) => {
  const next = Math.max(0, Math.min(TRADITION_GROUPS.length - 1, currentIdx + dir));
  selectTradition(next);
};
