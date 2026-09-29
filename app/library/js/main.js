/* =============================================================
   main.js — Application Entry Point
   Bootstraps: canvas, router, renders, event delegation
   ============================================================= */

import { initCanvas, initScrollReveals, initBookTilt } from './animations.js';
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
  // 1. Starfield canvas
  initCanvas();

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
