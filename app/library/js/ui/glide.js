/* =============================================================
   ui/glide.js — nothing just appears
   Motion only. A card that opens a detail view grows into it and the
   view shrinks back into the same card; a menu or panel opened by a
   button grows out of that button and closes back into it.

   - morph():  card <-> view, with the View Transitions API
   - grow():   panel from/to a button (or a point), with Web Animations
   - fade():   backdrop opacity

   Everything here is a no-op when the browser cannot do it or when
   reduced motion is on, so callers always keep their old instant path.
   ============================================================= */

export const EASE_OUT  = 'cubic-bezier(.2,.8,.2,1)';
export const EASE_BACK = 'cubic-bezier(.4,0,.2,1)';
export const T_PAGE = { open: 340, close: 300 };
export const T_MENU = { open: 240, close: 190 };

export function motionOff() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

export function canMorph() {
  return typeof document !== 'undefined' && typeof document.startViewTransition === 'function' && !motionOff();
}

/** An element that is attached, has a box, and is at least partly on screen. */
export function usable(el) {
  if (!el || !el.isConnected) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
}

/* ── card <-> view (View Transitions) ─────────────────────── */
let token = 0;
let named = [];

function setName(el, name) { el.style.viewTransitionName = name; named.push(el); }
function clearNames() { for (const el of named) el.style.viewTransitionName = ''; named = []; }

/**
 * Run `update()` inside a view transition. Each pair morphs `from` (an element that
 * exists now) into `to()` (looked up after `update()` ran) under one shared name.
 * Resolves once the transition is over (true when no newer transition replaced it).
 */
export function morph({ pairs, update, dir = 'open' }) {
  const my = ++token;
  clearNames();
  for (const p of pairs) setName(p.from, p.name);
  const ms = T_PAGE[dir];
  let vt;
  try {
    vt = document.startViewTransition(() => {
      if (my === token) {
        clearNames();
        update();
        for (const p of pairs) { const t = p.to(); if (t) setName(t, p.name); }
      } else {
        update();
      }
    });
  } catch (e) {
    clearNames();
    update();
    return Promise.resolve(true);
  }
  vt.ready.then(() => {
    if (my !== token) return;
    for (const a of document.getAnimations()) {
      const pe = a.effect && a.effect.pseudoElement;
      if (!pe || pe.indexOf('::view-transition') !== 0) continue;
      const timing = { duration: ms };
      if (pe.indexOf('::view-transition-group') === 0) timing.easing = dir === 'open' ? EASE_OUT : EASE_BACK;
      try { a.effect.updateTiming(timing); } catch (e) { /* leave the browser default */ }
    }
  }).catch(() => {});
  return vt.finished.then(() => my === token, () => my === token).then((latest) => {
    if (latest) clearNames();
    return latest;
  });
}

/* ── menus / panels from a button (Web Animations) ────────── */
/** Centre of a button, or a {x, y} point, in viewport coordinates. */
function pointOf(origin) {
  if (!origin) return null;
  if (typeof origin.x === 'number' && typeof origin.y === 'number') return origin;
  if (origin.getBoundingClientRect) {
    const r = origin.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  return null;
}

/**
 * Open a panel out of its button (or tap point) as a circular reveal that starts at that
 * point, and close it back into the same point. dir is 'open' or 'close'.
 * A reveal (clip-path) is used rather than scale/opacity because animating a panel's
 * transform or opacity leaves its text rasterised half a pixel off from a panel that was
 * never animated; clip-path leaves the finished panel exactly as it was.
 * Returns the Animation (close keeps its last frame until the caller removes the panel),
 * or null when there is nothing to animate.
 */
export function grow(el, origin, dir) {
  if (!el || !el.animate || motionOff()) return null;
  const p = pointOf(origin);
  if (!p) return null;
  const r = el.getBoundingClientRect();
  const px = p.x - r.left, py = p.y - r.top;
  const far = Math.ceil(Math.hypot(Math.max(Math.abs(px), Math.abs(px - r.width)), Math.max(Math.abs(py), Math.abs(py - r.height)))) + 2;
  const small = { clipPath: `circle(4px at ${px}px ${py}px)` };
  const full = { clipPath: `circle(${far}px at ${px}px ${py}px)` };
  const open = dir === 'open';
  return el.animate(open ? [small, full] : [full, small], {
    duration: T_MENU[dir],
    easing: open ? EASE_OUT : EASE_BACK,
    fill: open ? 'none' : 'forwards',
  });
}

export function fade(el, dir) {
  if (!el || !el.animate || motionOff()) return null;
  const open = dir === 'open';
  return el.animate(open ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }], {
    duration: T_MENU[dir],
    easing: open ? EASE_OUT : EASE_BACK,
    fill: open ? 'none' : 'forwards',
  });
}
