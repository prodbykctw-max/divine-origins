/* =============================================================
   router.js — Hash-Based Section Router
   Routes: #home #traditions #deities #texts #calendars #patterns
   ============================================================= */

import { state, setState } from './state.js';

const SECTIONS = [
  'home',
  'traditions',
  'deities',
  'texts',
  'calendars',
  'patterns',
  'timeline',
  'source-map',
];

const DEFAULT_SECTION = 'home';

/** Map section id → render function. Set by main.js */
const renderers = {};

export function registerRenderer(sectionId, fn) {
  renderers[sectionId] = fn;
}

/** Navigate to a section */
export function navigate(sectionId) {
  if (!SECTIONS.includes(sectionId)) sectionId = DEFAULT_SECTION;
  window.location.hash = sectionId;
}

/** Read hash and activate the correct section */
function activate() {
  const raw     = window.location.hash.replace('#', '') || DEFAULT_SECTION;
  const section = SECTIONS.includes(raw) ? raw : DEFAULT_SECTION;

  setState({ activeSection: section });

  // Update nav links
  document.querySelectorAll('.topnav__link[data-section]').forEach((link) => {
    const active = link.dataset.section === section;
    link.classList.toggle('active', active);
    link.setAttribute('aria-current', active ? 'page' : 'false');
  });

  // Show/hide sections
  SECTIONS.forEach((id) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;
    const isActive = id === section;
    el.hidden = !isActive;
    el.setAttribute('aria-hidden', String(!isActive));
  });

  // Run renderer if registered
  if (typeof renderers[section] === 'function') {
    renderers[section]();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/** Bootstrap router */
export function initRouter() {
  window.addEventListener('hashchange', activate);
  activate(); // run on page load
}
