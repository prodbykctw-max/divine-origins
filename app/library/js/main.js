/* =============================================================
   main.js — Application Entry Point
   Bootstraps: canvas, router, renders, event delegation
   ============================================================= */

import { initCanvas, initScrollReveals, initBookTilt } from './animations.js';
import { mountUniverse, flyTo } from './universe.jsx';
import gsap from 'gsap';
import { initRouter, registerRenderer, navigate }      from './router.js';
import { state }                                        from './state.js';
import { renderHome }        from './sections/home.js';
import { renderTraditions }  from './sections/traditions.js';
import { renderTexts }       from './sections/texts.js';
import { renderCalendars }   from './sections/calendars.js';
import { renderDeities }     from './sections/deities.js';
import { renderPatterns }    from './sections/patterns.js';
import { renderTimeline }    from './sections/timeline.js';
import { renderSourceMap }   from './sections/source-map.js';
import { initModal, closeModal } from './ui/modal.js';

/* ── REGISTER ALL SECTION RENDERERS ── */
registerRenderer('home',        renderHome);
registerRenderer('traditions',  renderTraditions);
registerRenderer('deities',     renderDeities);
registerRenderer('texts',       renderTexts);
registerRenderer('calendars',   renderCalendars);
registerRenderer('patterns',    renderPatterns);
registerRenderer('timeline',    renderTimeline);
registerRenderer('source-map',  renderSourceMap);

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Immersive WebGL universe (falls back to the plain void if WebGL is missing)
  const has3D = mountUniverse(document.getElementById('universe'));
  document.documentElement.classList.toggle('has-3d', has3D);
  if (!has3D) {
    // No GPU: keep the original lightweight 2D starfield
    const cv = document.createElement('canvas');
    cv.id = 'canvas-bg';
    cv.setAttribute('aria-hidden', 'true');
    document.body.prepend(cv);
    initCanvas();
  }

  // 2. 3D book tilt (ambient mouse tracking)
  initBookTilt();

  // 3. Modal system
  initModal();

  // 4. Router — reads hash, activates correct section
  //    This triggers the first render
  initRouter();

  // 5. Scroll reveals (runs after first section renders)
  setTimeout(initScrollReveals, 300);

  // 6. Global keyboard handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

/* ── GLOBAL NAVIGATION HELPER (for inline onclick or links) ── */
window.navigateTo = navigate;

/* ── Keep the current section's nav link in view on narrow screens ── */
function revealActiveNavLink() {
  const link = document.querySelector('.topnav__link.active');
  const bar = document.querySelector('.topnav__inner');
  if (!link || !bar) return;
  bar.scrollTo({ left: link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
}
window.addEventListener('hashchange', () => setTimeout(revealActiveNavLink, 0));
document.addEventListener('DOMContentLoaded', () => setTimeout(revealActiveNavLink, 50));

/* ── Liquid Glass nav: uniform bar once content scrolls under it ── */
function syncNavChrome() {
  const nav = document.querySelector('.topnav');
  if (!nav) return;
  nav.classList.toggle('is-scrolled', window.scrollY > 8);
  document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
}
window.addEventListener('scroll', syncNavChrome, { passive: true });
window.addEventListener('resize', syncNavChrome);
document.addEventListener('DOMContentLoaded', syncNavChrome);

/* ── GSAP: camera flight + section entrance on every route change ── */
const REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function currentSection() {
  return (window.location.hash.replace('#', '') || 'home');
}
function enterSection() {
  const id = currentSection();
  flyTo(id);
  if (REDUCE) return;
  const sec = document.getElementById('section-' + id);
  if (!sec) return;
  const heads = sec.querySelectorAll('.section__eyeline, .section__title, .section__desc, .t-display, .hero-symbol');
  if (heads.length) {
    gsap.fromTo(heads, { y: 28, opacity: 0, filter: 'blur(6px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', stagger: 0.08, overwrite: true, clearProps: 'filter,transform' });
  }
}
window.addEventListener('hashchange', () => {
  closeModal(); // a nav tap while a detail modal is open closes it (and restores page scroll)
  window.dispatchEvent(new Event('divine:navigate')); // Source Map closes its sheet / modals
  setTimeout(enterSection, 0);
});
document.addEventListener('DOMContentLoaded', () => setTimeout(enterSection, 60));
