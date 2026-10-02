/* =============================================================
   animations.js — Canvas Stars, 3D Book Hover, Panel Transitions
   ============================================================= */

import { state, setState } from './state.js';

/* ── CANVAS STARFIELD ── */
export function initCanvas() {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const stars = Array.from({ length: 380 }, () => ({
    x:     Math.random(),
    y:     Math.random(),
    r:     Math.random() * 1.1 + 0.2,
    o:     Math.random() * 0.55 + 0.08,
    speed: (Math.random() - 0.5) * 0.0035,
    hue:   Math.random() > 0.85 ? 200 : 42, // mostly gold, some blue
  }));

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  }

  function tick() {
    resize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(
        s.x * canvas.width,
        s.y * canvas.height,
        s.r, 0, Math.PI * 2
      );
      ctx.fillStyle = `hsla(${s.hue}, 60%, 70%, ${s.o})`;
      ctx.fill();

      // Breathe
      s.o = Math.max(0.04, Math.min(0.72, s.o + s.speed));
      if (Math.random() < 0.0015) s.speed *= -1;
    }

    setState({ animFrameId: requestAnimationFrame(tick) });
  }

  tick();
  window.addEventListener('resize', resize, { passive: true });
}

/* ── INTERSECTION OBSERVER — scroll reveals ── */
export function initScrollReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  // Observe all reveal targets
  const targets = document.querySelectorAll(
    '.reveal-card, .reveal-split, .reveal-up'
  );
  targets.forEach((el) => observer.observe(el));

  return observer;
}

/* ── PANEL VERTICAL CYCLE ── */
export function cyclePanel(stage, newHTML, direction = 1) {
  if (!stage || state.transitioning) return Promise.resolve();

  setState({ transitioning: true });

  return new Promise((resolve) => {
    const prevPanel = stage.querySelector('.panel-active');

    // Build new panel — starts off-screen below (or above)
    const newPanel = document.createElement('div');
    newPanel.innerHTML = newHTML;
    newPanel.style.cssText = `
      position: absolute;
      inset: 0;
      opacity: 0;
      transform: translateY(${direction > 0 ? '60px' : '-60px'});
      transition: opacity 0.45s cubic-bezier(0.16,1,0.3,1),
                  transform 0.45s cubic-bezier(0.16,1,0.3,1);
    `;
    stage.appendChild(newPanel);

    // Exit old panel
    if (prevPanel) {
      prevPanel.style.transition =
        'opacity 0.28s cubic-bezier(0.7,0,0.84,0), transform 0.28s cubic-bezier(0.7,0,0.84,0)';
      prevPanel.style.opacity   = '0';
      prevPanel.style.transform = `translateY(${direction > 0 ? '-40px' : '40px'})`;
    }

    // Enter new panel
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        newPanel.style.opacity   = '1';
        newPanel.style.transform = 'translateY(0)';
      });
    });

    setTimeout(() => {
      prevPanel?.remove();
      newPanel.style.cssText  = ''; // reset inline styles
      newPanel.classList.add('panel-active');
      setState({ transitioning: false });
      resolve();
    }, 480);
  });
}

/* ── 3D BOOK MOUSE TILT ── */
export function initBookTilt() {
  document.addEventListener('mousemove', (e) => {
    const books = document.querySelectorAll('.book:not(.selected)');
    books.forEach((book) => {
      const rect = book.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / window.innerWidth;
      const dy   = (e.clientY - cy) / window.innerHeight;

      // Subtle ambient tilt based on cursor position in viewport
      const baseRotY = -12 + dx * 8;
      const baseRotX =   4 - dy * 4;

      book.style.transform =
        `rotateY(${baseRotY}deg) rotateX(${baseRotX}deg) translateZ(0)`;
    });
  }, { passive: true });
}

/* ── BOOK HOVER — snap to upright ── */
export function bindBookHover(bookEl) {
  bookEl.addEventListener('mouseenter', () => {
    bookEl.style.transition =
      'transform 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease';
  });

  bookEl.addEventListener('mouseleave', () => {
    if (!bookEl.classList.contains('selected')) {
      bookEl.style.transition =
        'transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease';
      bookEl.style.transform =
        'rotateY(-12deg) rotateX(4deg) translateZ(0)';
    }
  });
}

/* ── RAIL KEYBOARD NAV ── */
export function initRailKeyboard(rail, onSelect) {
  rail.addEventListener('keydown', (e) => {
    const items  = [...rail.querySelectorAll('.rail__item')];
    const active = rail.querySelector('.rail__item[aria-selected="true"]');
    const idx    = items.indexOf(active);

    if (e.key === 'ArrowRight' && idx < items.length - 1) {
      e.preventDefault();
      onSelect(idx + 1);
      items[idx + 1].focus();
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      onSelect(idx - 1);
      items[idx - 1].focus();
    }
  });
}

/* ── SCROLL RAIL ITEM INTO VIEW ── */
export function scrollRailToItem(rail, itemEl) {
  if (!rail || !itemEl) return;
  const railRect = rail.getBoundingClientRect();
  const itemRect = itemEl.getBoundingClientRect();
  const offset   = itemRect.left - railRect.left - railRect.width / 2 + itemRect.width / 2;
  rail.scrollBy({ left: offset, behavior: 'smooth' });
}
