/* =============================================================
   sections/deities.js — Deity Library
   Horizontal rail (filter by tradition) → vertical info panel
   ============================================================= */

import { DEITIES }          from '../../data/deities.js';
import { TRADITION_GROUPS } from '../../data/traditions/groups.js';
import { ARTIFACT_IMAGES }  from '../../data/images.js';
import { SACRED_TEXTS }     from '../../data/texts/sacred-texts.js';
import { state, setState }  from '../state.js';
import { cyclePanel, scrollRailToItem, initScrollReveals } from '../animations.js';
import { openModal }        from '../ui/modal.js';

let filteredDeities = [];
let currentIdx      = 0;
let activeTrad      = 'all';

export function renderDeities() {
  const section = document.getElementById('section-deities');
  if (!section) return;

  filteredDeities = DEITIES;
  currentIdx      = 0;

  section.innerHTML = `
    <div class="section">
      <div class="container">
        <header class="section__header">
          <span class="section__eyeline">${DEITIES.length} Entries · All Traditions</span>
          <h2 class="section__title">Creator Beings & Divine Archetypes</h2>
          <p class="section__desc">
            Every documented creator, supreme being, demiurge, and divine council
            across all known human traditions. Three evidence tiers clearly labeled.
          </p>
        </header>

        <!-- Search -->
        <div style="max-width:560px;margin:0 auto 2rem;position:relative">
          <input id="deity-search" type="text" placeholder="Search by name, tradition, attribute…"
                 style="width:100%;background:var(--layer);border:1px solid var(--border);
                        color:var(--text-primary);font-family:var(--font-body);font-size:1rem;
                        padding:0.75rem 3rem 0.75rem 1.2rem;outline:none;
                        transition:border-color 0.2s;border-radius:2px"
                 aria-label="Search deities">
          <span style="position:absolute;right:1rem;top:50%;transform:translateY(-50%);color:var(--text-dim)">⊕</span>
        </div>

        <!-- Tradition filter -->
        <div style="display:flex;gap:0.4rem;flex-wrap:wrap;justify-content:center;margin-bottom:1.5rem">
          ${buildDeityFilters()}
        </div>
      </div>

      <!-- Horizontal deity rail -->
      <div class="rail-wrap">
        <div class="rail" id="deity-rail" role="listbox" aria-label="Browse deities">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- Info stage -->
      <div class="container">
        <div class="info-stage" id="deity-stage" style="min-height:580px;margin-top:1.5rem"></div>
      </div>
    </div>
  `;

  renderDeityRail();
  injectDeityPanel(0, 1);
  bindDeityEvents();
  setTimeout(initScrollReveals, 100);
}

function buildDeityFilters() {
  const pills = [{ id: 'all', label: 'ALL', color: '#c9a84c' }, ...TRADITION_GROUPS.map(g => ({ id: g.id, label: g.label, color: g.color }))];
  return pills.map(p => `
    <button class="deity-filter-pill ${p.id === 'all' ? 'deity-filter-pill--active' : ''}"
            data-trad="${p.id}"
            style="font-family:var(--font-mono);font-size:0.676rem;letter-spacing:0.22em;text-transform:uppercase;
                   padding:0.28rem 0.65rem;border-radius:2px;cursor:pointer;transition:all 0.2s;
                   border:1px solid ${p.id === 'all' ? p.color : 'rgba(255,255,255,0.07)'};
                   color:${p.id === 'all' ? p.color : 'var(--text-dim)'};
                   background:${p.id === 'all' ? p.color + '12' : 'transparent'}">
      ${p.label.split('/')[0].trim().toUpperCase()}
    </button>`).join('');
}

function renderDeityRail() {
  const rail = document.getElementById('deity-rail');
  if (!rail) return;

  rail.innerHTML = filteredDeities.map((d, i) => {
    const group = TRADITION_GROUPS.find(g => g.id === d.tradition);
    const color = group?.color ?? '#c9a84c';
    return `
      <button class="rail__item reveal-card"
              role="option"
              aria-selected="${i === currentIdx}"
              data-deity-idx="${i}"
              style="--item-color:${color};animation-delay:${Math.min(i, 20) * 0.035}s"
              tabindex="${i === currentIdx ? '0' : '-1'}">
        <span class="rail__tradition">${(group?.label ?? d.tradition).split('/')[0].trim()}</span>
        <span class="rail__name">${d.name.split('/')[0].trim()}</span>
      </button>`;
  }).join('');

  rail.querySelectorAll('.rail__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.deityIdx);
      selectDeity(idx);
    });
  });
}

function selectDeity(idx) {
  if (idx === currentIdx && document.querySelector('#deity-stage .split-panel')) return;
  const dir  = idx >= currentIdx ? 1 : -1;
  currentIdx = idx;

  const rail = document.getElementById('deity-rail');
  rail?.querySelectorAll('.rail__item').forEach((btn, i) => {
    const active = i === idx;
    btn.setAttribute('aria-selected', String(active));
    btn.setAttribute('tabindex', active ? '0' : '-1');
  });

  const activeBtn = rail?.querySelector(`[data-deity-idx="${idx}"]`);
  if (activeBtn && rail) scrollRailToItem(rail, activeBtn);

  injectDeityPanel(idx, dir);
}

function injectDeityPanel(idx, dir) {
  const d     = filteredDeities[idx];
  const stage = document.getElementById('deity-stage');
  if (!d || !stage) return;
  cyclePanel(stage, buildDeityPanel(d, idx), dir);
}

function buildDeityPanel(d, idx) {
  const group   = TRADITION_GROUPS.find(g => g.id === d.tradition);
  const color   = group?.color ?? '#c9a84c';
  const imgKey  = d.imgKey ?? group?.imgKey ?? 'sumerian';
  const imgData = ARTIFACT_IMAGES[imgKey] ?? ARTIFACT_IMAGES.sumerian;

  const badgeClass = d.confidence === 'documented' ? 'badge--documented'
                   : d.confidence === 'debated'    ? 'badge--debated'
                   :                                 'badge--tradition';
  const badgeLabel = d.confidence === 'documented' ? '✓ DOCUMENTED'
                   : d.confidence === 'debated'    ? '~ DEBATED'
                   :                                 '◈ TRADITION';

  return `
    <div class="split-panel glass-subtle" style="border:1px solid ${color}22;border-radius:4px;overflow:hidden">

      <!-- LEFT: Artifact -->
      <div class="split-panel__img">
        <img src="${imgData.url}" alt="${d.name}" loading="lazy"
             style="width:100%;height:100%;object-fit:cover;object-position:center top;opacity:0;
                    filter:saturate(0.8) brightness(0.68) contrast(1.04);
                    transition:opacity 0.5s ease,transform 1.2s cubic-bezier(0.16,1,0.3,1)"
             onload="this.style.opacity='1';this.style.transform='scale(1.03)'"
             onerror="this.style.display='none'">
        <div class="split-panel__img-overlay"></div>
        <div class="split-panel__img-trad" style="--item-color:${color}">${group?.label ?? d.tradition}</div>
        <div class="split-panel__img-caption">${imgData.caption}</div>
      </div>

      <!-- RIGHT: Info -->
      <div class="split-panel__content">
        <div style="height:3px;background:linear-gradient(90deg,${color},transparent)"></div>
        <div class="split-panel__content-inner">

          <div class="t-caption" style="color:${color};margin-bottom:0.3rem">Earliest record: ${d.date}</div>
          <h2 class="t-title" style="font-size:1.7rem;color:var(--text-primary);margin-bottom:0.25rem">${d.name}</h2>
          <p class="t-italic" style="margin-bottom:0.8rem;font-size:0.88rem">${d.aliases}</p>

          <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:1rem">
            <span class="badge ${badgeClass}">${badgeLabel}</span>
            <span class="tag">${d.tier}</span>
            ${d.tags?.slice(0,4).map(t => `<span class="tag">${t}</span>`).join('') ?? ''}
          </div>

          <p class="t-body" style="margin-bottom:1rem">${d.shortDesc}</p>

          <div class="info-block info-block--scholarly">
            <span class="info-block__label">✓ Scholarly Account</span>
            <p>${d.scholarly}</p>
          </div>

          <div class="info-block info-block--tradition">
            <span class="info-block__label">◈ Tradition's Own Account</span>
            <p>${d.traditionClaim}</p>
          </div>

          <div class="info-block info-block--parallels">
            <span class="info-block__label">⟷ Cross-Tradition Parallels</span>
            <p>${d.parallels}</p>
          </div>

          ${d.russelConnection ? `
          <div class="info-block info-block--russell">
            <span class="info-block__label">◎ Walter Russell Connection</span>
            <p>${d.russelConnection}</p>
          </div>` : ''}

          <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)">
            <button onclick="openDeityModal('${d.id}')"
                    style="font-family:var(--font-mono);font-size:0.69rem;letter-spacing:0.25em;text-transform:uppercase;padding:0.4rem 0.8rem;border:1px solid ${color}66;color:${color};background:${color}0a;cursor:pointer;border-radius:2px">
              PRIMARY SOURCES + FULL ENTRY →
            </button>
          </div>

          <div class="panel-nav">
            <button class="panel-nav__btn" onclick="deityNav(-1)">← PREV</button>
            <span class="panel-nav__counter">${idx + 1} / ${filteredDeities.length}</span>
            <button class="panel-nav__btn" onclick="deityNav(1)">NEXT →</button>
          </div>
        </div>
      </div>
    </div>`;
}

function bindDeityEvents() {
  // Tradition filter pills
  document.querySelectorAll('.deity-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeTrad = pill.dataset.trad;
      filteredDeities = activeTrad === 'all' ? DEITIES : DEITIES.filter(d => d.tradition === activeTrad);
      currentIdx = 0;

      document.querySelectorAll('.deity-filter-pill').forEach(p => {
        const active = p.dataset.trad === activeTrad;
        const color  = active ? '#c9a84c' : 'rgba(255,255,255,0.07)';
        p.style.borderColor  = color;
        p.style.color        = active ? '#c9a84c' : 'var(--text-dim)';
        p.style.background   = active ? '#c9a84c12' : 'transparent';
      });

      renderDeityRail();
      if (filteredDeities.length > 0) injectDeityPanel(0, 1);
    });
  });

  // Search
  const search = document.getElementById('deity-search');
  if (search) {
    let timer;
    search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = search.value.toLowerCase().trim();
        filteredDeities = !q ? DEITIES : DEITIES.filter(d =>
          d.name.toLowerCase().includes(q) ||
          d.aliases?.toLowerCase().includes(q) ||
          d.tradition?.toLowerCase().includes(q) ||
          d.tier?.toLowerCase().includes(q) ||
          d.tags?.some(t => t.toLowerCase().includes(q))
        );
        currentIdx = 0;
        renderDeityRail();
        if (filteredDeities.length > 0) injectDeityPanel(0, 1);
      }, 220);
    });
  }
}

// Window-scope helpers
window.deityNav = (dir) => {
  const next = Math.max(0, Math.min(filteredDeities.length - 1, currentIdx + dir));
  selectDeity(next);
};

window.openDeityModal = (id) => {
  const d = DEITIES.find(x => x.id === id);
  if (!d) return;
  const group = TRADITION_GROUPS.find(g => g.id === d.tradition);
  const color = group?.color ?? '#c9a84c';

  const sources = d.primarySources?.map(s =>
    `<li style="font-family:var(--font-mono);font-size:0.69rem;letter-spacing:0.12em;color:var(--teal);padding:0.25rem 0;border-bottom:1px solid rgba(64,168,160,0.1)">${s}</li>`
  ).join('') ?? '';

  openModal({
    accentColor: color,
    html: `
      <div style="padding:2.5rem">
        <div class="t-caption" style="color:${color};margin-bottom:0.5rem">${group?.label ?? d.tradition} · ${d.tier} · ${d.region}</div>
        <h2 class="t-title" style="font-size:2rem;color:var(--text-primary);margin-bottom:0.3rem">${d.name}</h2>
        <p class="t-italic" style="margin-bottom:0.5rem">${d.aliases}</p>
        <p class="t-caption" style="margin-bottom:2rem">Earliest documented: ${d.date}</p>

        <div class="info-block info-block--scholarly">
          <span class="info-block__label">✓ Scholarly / Documented Account</span>
          <p>${d.scholarly}</p>
          ${sources ? `<div style="margin-top:1rem"><div class="t-label" style="color:var(--teal);margin-bottom:0.4rem">PRIMARY SOURCES</div><ul style="list-style:none">${sources}</ul></div>` : ''}
        </div>

        <div class="info-block info-block--tradition">
          <span class="info-block__label">◈ Tradition's Own Account</span>
          <p>${d.traditionClaim}</p>
        </div>

        <div class="info-block" style="border-color:var(--gold-dim)">
          <span class="info-block__label" style="color:var(--gold-dim)">~ Genuine Uncertainty / Scholarly Debate</span>
          <p>${d.uncertainty ?? 'No specific uncertainty noted.'}</p>
        </div>

        <div class="info-block info-block--parallels">
          <span class="info-block__label">⟷ Cross-Tradition Parallels</span>
          <p>${d.parallels}</p>
        </div>

        ${d.russelConnection ? `
        <div class="info-block info-block--russell">
          <span class="info-block__label">◎ Walter Russell Connection</span>
          <p>${d.russelConnection}</p>
        </div>` : ''}
      </div>
    `
  });
};
