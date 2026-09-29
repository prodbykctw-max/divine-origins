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
      <div class="hero-symbol" style="width:150px;height:150px;margin:0 auto 3rem;flex-shrink:0">
        ${heroCipherSVG()}
      </div>

      <p class="t-caption" style="color:var(--gold-dim);margin-bottom:1.2rem;letter-spacing:0.65em">A Comprehensive Comparative Theology Library</p>

      <h1 class="t-display" style="font-size:clamp(3rem,9vw,7.5rem);color:var(--gold);text-shadow:0 0 80px rgba(201,168,76,0.25);margin-bottom:1rem;line-height:0.88">
        DIVINE<br>ORIGINS
      </h1>

      <p style="font-size:clamp(1rem,2vw,1.3rem);font-style:italic;color:var(--text-secondary);max-width:620px;margin:0 auto 3.5rem;line-height:1.7">
        Every tradition. Every sacred text. Every calendar. Every parallel.
        Not to tell you what to believe — to show you what has been believed,
        documented, buried, and rediscovered across all of human history.
      </p>

      <!-- Stats -->
      <div style="display:flex;gap:2.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:3.5rem">
        ${stat(TRADITION_GROUPS.length, 'Traditions')}
        ${stat(SACRED_TEXTS.length + '+', 'Sacred Texts')}
        ${stat(CALENDAR_SYSTEMS.length, 'Calendar Systems')}
        ${stat('60,000+', 'Years of Record')}
        ${stat('3', 'Evidence Tiers')}
      </div>

      <!-- CTA buttons -->
      <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-bottom:4rem">
        ${ctaBtn('Explore Traditions', 'traditions', true)}
        ${ctaBtn('Sacred Texts Library', 'texts', false)}
        ${ctaBtn('Compare Calendars', 'calendars', false)}
        ${ctaBtn('The Pattern', 'patterns', false)}
      </div>

      <!-- Evidence tier legend -->
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center">
        <span class="badge badge--documented">✓ Documented</span>
        <span class="badge badge--debated">~ Debated</span>
        <span class="badge badge--tradition">◈ Tradition's Own Account</span>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator" style="position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.4rem">
        <span class="t-caption" style="color:var(--gold-dim)">DESCEND</span>
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
      <span style="font-family:var(--font-display);font-size:2rem;color:var(--gold);display:block;font-weight:600">${num}</span>
      <span class="t-caption" style="color:var(--text-dim)">${label}</span>
    </div>`;
}

function ctaBtn(label, section, primary) {
  const style = primary
    ? 'background:var(--gold);color:var(--void);border:1px solid var(--gold);font-weight:700'
    : 'background:rgba(201,168,76,0.06);color:var(--gold);border:1px solid var(--border-gold)';
  return `<button class="cta-btn${primary ? ' cta-btn--primary' : ''}" onclick="navigateTo('${section}')"
    style="${style};font-family:var(--font-mono);font-size:0.713rem;letter-spacing:0.3em;text-transform:uppercase;padding:0.7rem 1.6rem;cursor:pointer;transition:all 0.2s;border-radius:999px">
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
  return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" fill="none">
    <circle cx="80" cy="80" r="78" stroke="#c9a84c" stroke-width="0.4" opacity="0.25"/>
    <circle cx="80" cy="80" r="60" stroke="#c9a84c" stroke-width="0.5" opacity="0.35"/>
    <circle cx="80" cy="80" r="40" stroke="#c9a84c" stroke-width="0.8" opacity="0.5"/>
    <line x1="80" y1="2"   x2="80"  y2="158" stroke="#c9a84c" stroke-width="0.35" opacity="0.25"/>
    <line x1="2"  y1="80"  x2="158" y2="80"  stroke="#c9a84c" stroke-width="0.35" opacity="0.25"/>
    <line x1="23" y1="23"  x2="137" y2="137" stroke="#c9a84c" stroke-width="0.35" opacity="0.25"/>
    <line x1="137" y1="23" x2="23"  y2="137" stroke="#c9a84c" stroke-width="0.35" opacity="0.25"/>
    <ellipse cx="80" cy="80" rx="34" ry="17" stroke="#c9a84c" stroke-width="1" opacity="0.75"/>
    <circle cx="80" cy="80" r="11" stroke="#c9a84c" stroke-width="1.2" opacity="0.9"/>
    <circle cx="80" cy="80" r="5"  fill="#c9a84c" opacity="0.9"/>
    <polygon points="80,46 110,112 50,112" stroke="#c9a84c" stroke-width="0.6" opacity="0.45"/>
    <circle cx="80" cy="46"  r="3" fill="#c9a84c" opacity="0.5"/>
    <circle cx="110" cy="112" r="3" fill="#c9a84c" opacity="0.5"/>
    <circle cx="50" cy="112" r="3" fill="#c9a84c" opacity="0.5"/>
  </svg>`;
}
