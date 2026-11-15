/* =============================================================
   router.js — Hash-Based Section Router
   Routes: #home #traditions #deities #texts #calendars #patterns
   ============================================================= */

import { state, setState } from './state.js';
import { canMorph, usable, EASE_OUT, EASE_BACK, T_PAGE } from './ui/glide.js';

const SECTIONS = [
  'home',
  'traditions',
  'deities',
  'texts',
  'calendars',
  'patterns',
  'timeline',
  'sites',
  'source-map',
];

const DEFAULT_SECTION = 'home';

/** Map section id → render function. Set by main.js */
const renderers = {};

export function registerRenderer(sectionId, fn) {
  renderers[sectionId] = fn;
}

/** Navigate to a section. With `fromEl` (the card or button that was tapped) the new
 *  section grows out of it, and Back shrinks it into the same element again. */
export function navigate(sectionId, fromEl) {
  if (!SECTIONS.includes(sectionId)) sectionId = DEFAULT_SECTION;
  const here = currentSection();
  if (fromEl && sectionId !== here && canMorph() && usable(fromEl)) {
    const home = document.getElementById(`section-${here}`);
    const tag = fromEl.tagName;
    const idx = home ? [...home.querySelectorAll(tag)].indexOf(fromEl) : -1;
    const box = fromEl.getBoundingClientRect();
    opened = idx >= 0 ? { from: here, to: sectionId, tag, idx, scrollY: window.scrollY } : null;
    pageGlide(() => { history.pushState(null, '', `#${sectionId}`); activate(); }, () => box, false);
    return;
  }
  window.location.hash = sectionId;
}

/* ── nothing just appears ──
   A section opened from a card or button grows out of that element (the new page is revealed
   from the element's box), and Back shrinks the page back into the same element. Motion only:
   the same activate() runs; reduced motion or no View Transitions = the instant switch. */
let opened = null;   // { from, to, tag, idx, scrollY } for the last section opened from an element
let running = null;

function currentSection() {
  const raw = window.location.hash.replace('#', '') || DEFAULT_SECTION;
  return SECTIONS.includes(raw) ? raw : DEFAULT_SECTION;
}

function pageGlide(update, rectFn, back) {
  try { running?.skipTransition(); } catch (e) { /* nothing running */ }
  let vt;
  try { vt = document.startViewTransition(update); } catch (e) { update(); return; }
  running = vt;
  // html.page-glide (animations.css): plain stacking, no cross-fade blend; on Back the old page sits on top
  const root = document.documentElement;
  root.classList.add('page-glide');
  root.classList.toggle('page-glide-back', back);
  const made = [];   // fill:'both' animations on the root's pseudo-elements outlive the transition unless cancelled
  vt.finished.finally(() => {
    made.forEach((a) => a.cancel());
    if (running !== vt) return;
    running = null;
    root.classList.remove('page-glide', 'page-glide-back');
  });
  vt.ready.then(() => {
    const r = rectFn();
    if (!r) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const box = `inset(${Math.max(0, r.top)}px ${Math.max(0, vw - r.right)}px ${Math.max(0, vh - r.bottom)}px ${Math.max(0, r.left)}px round 14px)`;
    const full = 'inset(0px 0px 0px 0px round 0px)';
    const origin = `${(r.left + r.right) / 2}px ${(r.top + r.bottom) / 2}px`;
    const k = (o) => ({ transformOrigin: origin, ...o });
    const opts = { duration: back ? T_PAGE.close : T_PAGE.open, easing: back ? EASE_BACK : EASE_OUT, fill: 'both' };
    if (back) {
      made.push(document.documentElement.animate(
        [k({ clipPath: full, transform: 'scale(1)', opacity: 1 }), k({ offset: 0.7, opacity: 1 }), k({ clipPath: box, transform: 'scale(.92)', opacity: 0 })],
        { ...opts, pseudoElement: '::view-transition-old(root)' }));
    } else {
      made.push(document.documentElement.animate(
        [k({ clipPath: box, transform: 'scale(.92)', opacity: 0 }), k({ offset: 0.3, opacity: 1 }), k({ clipPath: full, transform: 'scale(1)', opacity: 1 })],
        { ...opts, pseudoElement: '::view-transition-new(root)' }));
    }
  }).catch(() => {});
}

/** Browser Back from a section that was opened from an element: shrink it into that element. */
function onHashChange() {
  const next = currentSection(), o = opened;
  const shownId = state.activeSection;
  if (o && next === o.from && shownId === o.to && canMorph()) {
    opened = null;
    pageGlide(() => { activate(); window.scrollTo({ top: o.scrollY, behavior: 'instant' }); }, () => {
      const home = document.getElementById(`section-${o.from}`);
      const el = home && home.querySelectorAll(o.tag)[o.idx];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 ? r : null;
    }, true);
    return;
  }
  if (next !== (o && o.to)) opened = null;
  activate();
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
  window.addEventListener('hashchange', onHashChange);
  activate(); // run on page load
}
