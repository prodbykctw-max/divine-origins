/* =============================================================
   sections/home.js — Hero Section
   ============================================================= */

import { navigate } from '../router.js';
import { TRADITION_GROUPS } from '../../data/traditions/groups.js';
import { SACRED_TEXTS }     from '../../data/texts/sacred-texts.js';
import { CALENDAR_SYSTEMS } from '../../data/calendars/systems.js';

export function renderHome() {
  const section = document.getElementById('section-home');
  if (!section) return;

  section.innerHTML = `
    <!-- HERO -->
    <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4rem 2rem;position:relative;overflow:hidden">

      <!-- Symbol -->
      <div class="hero-symbol" style="width:88px;height:88px;margin:0 auto 2rem;flex-shrink:0;color:var(--text-primary)">
        ${heroCipherSVG()}
      </div>

      <h1 class="t-display" style="font-size:clamp(3rem,9vw,6.5rem);color:var(--text-primary);margin-bottom:1.25rem;line-height:1.05;letter-spacing:-0.01em">
        Divine Origins
      </h1>

      <p style="font-size:clamp(1.0625rem,2vw,1.25rem);color:var(--text-secondary);max-width:36em;margin:0 auto 3rem;line-height:1.6">
        Every tradition. Every sacred text. Every calendar. Every parallel.
        Not to tell you what to believe — to show you what has been believed,
        documented, buried, and rediscovered across all of human history.
      </p>

      <!-- Stats -->
      <div style="display:flex;gap:2.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:3.5rem">
        ${stat(TRADITION_GROUPS.length, 'Traditions')}
        ${stat(SACRED_TEXTS.length + '+', 'Sacred texts')}
        ${stat(CALENDAR_SYSTEMS.length, 'Calendar systems')}
        ${stat('60,000+', 'Years of record')}
        ${stat('3', 'Evidence tiers')}
      </div>

      <!-- CTA buttons -->
      <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-bottom:4rem">
        ${ctaBtn('Explore traditions', 'traditions', true)}
        ${ctaBtn('Sacred texts library', 'texts', false)}
        ${ctaBtn('Compare calendars', 'calendars', false)}
        ${ctaBtn('The pattern', 'patterns', false)}
      </div>

      <!-- Evidence tier legend -->
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center">
        <span class="badge badge--documented">✓ Documented</span>
        <span class="badge badge--debated">~ Debated</span>
        <span class="badge badge--tradition">◈ Tradition's own account</span>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator" style="position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.4rem">
        <span class="t-caption" style="color:var(--gold-dim)">Descend</span>
        <span style="color:var(--gold-dim);font-size:1rem">↓</span>
      </div>
    </div>

    <hr class="glow-divider">

    <!-- Quick-access tradition grid -->
    <div class="section">
      <div class="container">
        <header class="section__header">
          <span class="section__eyeline">Where To Begin</span>
          <h2 class="section__title">15 Tradition Groups</h2>
          <p class="section__desc">Each tradition is a complete world. Click any to enter.</p>
        </header>
        <div id="home-trad-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1px;background:var(--border)">
          ${TRADITION_GROUPS.map(buildTradCard).join('')}
        </div>
      </div>
    </div>
  `;

  // Bind tradition card clicks
  section.querySelectorAll('[data-trad-nav]').forEach(el => {
    el.addEventListener('click', () => navigate('traditions'));
  });
}

/* ── HELPERS ── */
function stat(num, label) {
  return `
    <div style="text-align:center">
      <span style="font-family:var(--font-display);font-size:2rem;color:var(--text-primary);display:block;line-height:1.2">${num}</span>
      <span class="t-caption" style="color:var(--text-dim)">${label}</span>
    </div>`;
}

function ctaBtn(label, section, primary) {
  const style = primary
    ? 'background:var(--gold);color:var(--void);border:1px solid var(--gold);font-weight: 600'
    : 'background:transparent;color:var(--text-primary);border:1px solid var(--border-strong)';
  return `<button class="cta-btn${primary ? ' cta-btn--primary' : ''}" onclick="navigateTo('${section}')"
    style="${style};font-family:var(--font-ui);font-size:0.9375rem;font-weight:500;padding:0.65rem 1.25rem;min-height:44px;cursor:pointer;transition:background-color .15s,border-color .15s;border-radius:6px">
    ${label}
  </button>`;
}

function buildTradCard(g) {
  return `
    <div data-trad-nav="${g.id}" style="background:var(--layer);padding:1.5rem;cursor:pointer;transition:background 0.2s,transform 0.2s;border-left:3px solid ${g.color}22"
         onmouseover="this.style.background='var(--surface)';this.style.borderLeftColor='${g.color}'"
         onmouseout="this.style.background='var(--layer)';this.style.borderLeftColor='${g.color}22'">
      <div class="t-caption" style="color:${g.color};margin-bottom:0.4rem">${g.era}</div>
      <div class="t-title" style="font-size:0.95rem;color:var(--text-primary);margin-bottom:0.3rem">${g.label}</div>
      <div class="t-caption" style="color:var(--text-dim)">${g.sub}</div>
    </div>`;
}

function heroCipherSVG() {
  return `<svg viewBox="40 40 176 176" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M58 206 V118 A70 70 0 0 1 198 118 V206 H174 V118 A46 46 0 0 0 82 118 V206 Z" fill="currentColor"/>
    <circle cx="128" cy="150" r="20" fill="var(--gold)"/>
  </svg>`;
}
