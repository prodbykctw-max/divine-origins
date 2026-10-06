/* =============================================================
   sections/calendars.js — Religious Calendar Comparison
   ============================================================= */

import { CALENDAR_SYSTEMS }  from '../../data/calendars/systems.js';
import { artifact, captionHTML } from '../ui/artifact.js';
import { cyclePanel, initScrollReveals } from '../animations.js';

let currentIdx = 0;

export function renderCalendars() {
  const section = document.getElementById('section-calendars');
  if (!section) return;

  section.innerHTML = `
    <div class="section">
      <div class="container">
        <header class="section__header">
          <span class="section__eyeline">Time as Theology</span>
          <h2 class="section__title">Sacred Calendar Systems</h2>
          <p class="section__desc">
            Every religious tradition encodes its theology in how it counts time.
            The Enochian 364-day calendar conflicts with the Hebrew lunar calendar —
            and that conflict may explain why the Book of Enoch was excluded.
            The Maya calculated Venus to within 14 seconds of modern values.
            Compare them all here.
          </p>
        </header>

        <!-- Comparison strip -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:var(--border);margin-bottom:3rem">
          ${CALENDAR_SYSTEMS.map((c, i) => `
            <button onclick="selectCal(${i})"
                    class="cal-card reveal-card"
                    style="background:var(--layer);padding:1.2rem;text-align:left;cursor:pointer;
                           transition:background 0.2s;border:none;animation-delay:${i * 0.05}s"
                    onmouseover="this.style.background='var(--surface)'"
                    onmouseout="this.style.background='var(--layer)'">
              <div class="t-caption" style="color:var(--gold-dim);margin-bottom:0.3rem">${sentence(c.type)}</div>
              <div class="t-title" style="font-size:0.82rem;color:var(--text-primary);margin-bottom:0.2rem;line-height:1.3">${c.name}</div>
              <div class="t-caption" style="color:var(--text-dim)">${c.yearLength} day yr</div>
            </button>`).join('')}
        </div>
      </div>

      <!-- Detail stage -->
      <div class="container">
        <div class="info-stage" id="cal-stage" style="min-height:500px"></div>
      </div>
    </div>
  `;

  injectCalPanel(0, 1);
  setTimeout(initScrollReveals, 100);
}

function injectCalPanel(idx, dir) {
  currentIdx = idx;
  const c     = CALENDAR_SYSTEMS[idx];
  const stage = document.getElementById('cal-stage');
  if (!c || !stage) return;
  cyclePanel(stage, buildCalPanel(c, idx), dir);
}

function buildCalPanel(c, idx) {
  const art = artifact('calendars', c.id);

  const structureRows = Object.entries(c.structure ?? {}).map(([k, v]) =>
    `<tr>
      <td style="font-family:var(--font-mono);font-size: 0.75rem;letter-spacing: 0;color:var(--gold-dim);padding:0.4rem 0.8rem 0.4rem 0;text-transform: none;white-space:nowrap">${k.replace(/_/g,' ')}</td>
      <td style="font-size:0.85rem;color:var(--text-secondary);padding:0.4rem 0">${v}</td>
    </tr>`
  ).join('');

  const conflictsHTML = c.conflicts?.length ? `
    <div class="info-block info-block--tradition">
      <span class="info-block__label">⚡ Conflicts with Other Systems</span>
      <ul style="padding-left:1rem;display:grid;gap:0.35rem">
        ${c.conflicts.map(x => `<li style="font-size:0.85rem;color:var(--text-secondary)">${x}</li>`).join('')}
      </ul>
    </div>` : '';

  const feastsHTML = c.majorFeasts?.length ? `
    <div class="info-block info-block--parallels">
      <span class="info-block__label">Major Feast Days</span>
      <ul style="padding-left:1rem;display:grid;gap:0.3rem">
        ${c.majorFeasts.map(f => `<li style="font-size:0.85rem;color:var(--text-secondary)">${f}</li>`).join('')}
      </ul>
    </div>` : '';

  const keyHTML = c.keyFeature ? `
    <div class="info-block info-block--scholarly">
      <span class="info-block__label">Key Feature</span>
      <p>${c.keyFeature}</p>
    </div>` : '';

  const noteHTML = c.note ? `
    <div class="info-block" style="border-color:var(--gold-dim)">
      <span class="info-block__label" style="color:var(--gold-dim)">~ Scholarly Note</span>
      <p>${c.note}</p>
    </div>` : '';

  const specialHTML = (() => {
    // Show any special detail fields (calendarNote, samhainDetail, etc.)
    const specialKeys = ['calendarNote','epagomenalDays','samhainDetail','nowruzDetail','tzolkinDetail','yugaDetail','ramadanDetail'];
    return specialKeys.filter(k => c[k]).map(k => `
      <div class="info-block info-block--texts">
        <span class="info-block__label">${sentence(k.replace(/([A-Z])/g,' $1'))}</span>
        <p>${c[k]}</p>
      </div>`).join('');
  })();

  return `
    <div class="glass-mid" style="border:1px solid var(--border-gold);border-radius:4px;overflow:hidden">
      <div style="height:3px;background:linear-gradient(90deg,var(--gold),transparent)"></div>
      <div class="cal-detail-grid" style="display:grid;grid-template-columns:1fr 2fr">

        <!-- Left summary -->
        <div style="padding:2rem;background:rgb(var(--wash-rgb) / 0.2);border-right:1px solid var(--border)">
          ${art ? `<figure class="cal-artifact">
            <img src="${art.large}" srcset="${art.srcset}" sizes="(max-width: 720px) 90vw, 360px" alt="${art.title.replace(/"/g, '&quot;')}" loading="lazy" decoding="async">
            <figcaption class="art-cap">${captionHTML(art)}</figcaption>
          </figure>` : ''}
          <div class="t-caption" style="color:var(--gold-dim);margin-bottom:0.4rem">${sentence(c.type)} calendar</div>
          <h2 class="t-title" style="font-size:1.2rem;color:var(--text-primary);margin-bottom:0.4rem;line-height:1.2">${c.name}</h2>
          ${c.altNames?.length ? `<p class="t-italic" style="font-size:0.8rem;margin-bottom:1rem">${c.altNames.join(' · ')}</p>` : ''}

          <div class="t-caption" style="margin-bottom:0.3rem">Origin</div>
          <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:1rem">${c.origin}</p>

          <div class="t-caption" style="margin-bottom:0.5rem">Structure</div>
          <table style="width:100%;border-collapse:collapse">${structureRows}</table>
        </div>

        <!-- Right detail -->
        <div style="overflow-y:auto;max-height:500px;padding:2rem;scrollbar-width:thin;scrollbar-color:var(--gold-dim) transparent">
          ${keyHTML}
          ${conflictsHTML}
          ${specialHTML}
          ${feastsHTML}
          ${noteHTML}

          ${c.textSources?.length ? `
          <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)">
            <div class="t-label" style="color:var(--teal);margin-bottom:0.5rem">Text sources</div>
            <ul style="list-style:none;display:grid;gap:0.25rem">
              ${c.textSources.map(s => `<li style="font-family:var(--font-mono);font-size: 0.75rem;letter-spacing: 0;color:var(--teal)">${s}</li>`).join('')}
            </ul>
          </div>` : ''}

          <div class="panel-nav">
            <button class="panel-nav__btn" onclick="calNav(-1)">← PREV</button>
            <span class="panel-nav__counter">${idx + 1} / ${CALENDAR_SYSTEMS.length}</span>
            <button class="panel-nav__btn" onclick="calNav(1)">NEXT →</button>
          </div>
        </div>
      </div>
    </div>`;
}

window.selectCal = (idx) => injectCalPanel(idx, idx > currentIdx ? 1 : -1);
window.calNav    = (dir) => {
  const next = Math.max(0, Math.min(CALENDAR_SYSTEMS.length - 1, currentIdx + dir));
  injectCalPanel(next, dir);
};

function sentence(v) {
  const t = String(v).replace(/[_-]+/g, ' ').trim().toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
