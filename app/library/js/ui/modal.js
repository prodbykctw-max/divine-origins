/* =============================================================
   ui/modal.js — Reusable Modal System
   A modal opened from a card grows out of that card and closes back
   into it (see glide.js). Without a usable card, or with reduced
   motion, it behaves exactly as before.
   ============================================================= */

import { canMorph, usable, morph } from './glide.js';

let isOpen = false;
let opening = false;      // open transition started, content not applied yet
let closing = false;      // close transition started, state not applied yet
let queuedClose = false;  // close asked for while opening
let src = null;           // the card that opened the modal
let srcImg = null;        // that card's image
let destImg = '';         // selector of the matching image inside the modal

export function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  if (!overlay) return;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', () => closeModal());
}

/**
 * source:      the card/button that opened this (optional; enables the grow-from-card motion)
 * sourceImage: the image inside that card (optional)
 * destImage:   selector of the matching image inside `html` (optional)
 * onOpen:      runs right after the content is in the DOM
 */
export function openModal({ accentColor = 'var(--accent)', html = '', source = null, sourceImage = null, destImage = '', onOpen = null } = {}) {
  const overlay = document.getElementById('modal-overlay');
  const accent  = document.getElementById('modal-accent');
  const content = document.getElementById('modal-content');

  if (!overlay || !content) return;

  const apply = () => {
    if (accent) accent.style.cssText = `height:3px;background:linear-gradient(90deg,${accentColor},transparent)`;
    content.innerHTML = html;

    // Name the dialog after the entry's own heading
    const heading = content.querySelector('h1, h2');
    if (heading) {
      if (!heading.id) heading.id = 'modal-heading';
      overlay.setAttribute('aria-labelledby', heading.id);
    } else {
      overlay.removeAttribute('aria-labelledby');
    }
    // Keep Tab (and screen readers) inside the dialog while it is open
    document.querySelector('.page')?.setAttribute('inert', '');

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    src = source; srcImg = sourceImage; destImg = destImage;

    if (onOpen) onOpen();

    // Focus first focusable element
    requestAnimationFrame(() => {
      const focusable = content.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
      focusable?.focus();
    });
  };

  if (source && !opening && canMorph() && usable(source)) {
    const pairs = [{ from: source, to: () => document.getElementById('modal'), name: 'glide-card' }];
    if (sourceImage && destImage && usable(sourceImage)) {
      pairs.push({ from: sourceImage, to: () => document.querySelector(destImage), name: 'glide-img' });
    }
    overlay.classList.add('glide-vt');
    opening = true;
    queuedClose = false;
    morph({
      pairs,
      dir: 'open',
      update: () => {
        apply();
        opening = false;
        if (queuedClose) { queuedClose = false; finishClose(); }
      },
    }).then((latest) => { if (latest) overlay.classList.remove('glide-vt'); });
    return;
  }

  apply();
}

function finishClose() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  overlay.removeAttribute('aria-labelledby');
  document.querySelector('.page')?.removeAttribute('inert');
  // Hand focus back to the card or button that opened the dialog
  if (src && src.isConnected) src.focus({ preventScroll: true });
  isOpen = false;
  src = null; srcImg = null; destImg = '';
}

/** closeModal({ instant: true }) skips the shrink-back (used when the page itself changes). */
export function closeModal(opts) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  const instant = !!(opts && opts.instant === true);

  if (opening) { queuedClose = true; return; }
  if (closing) return;

  const modal = document.getElementById('modal');
  if (isOpen && !instant && src && modal && canMorph() && usable(src) && usable(modal)) {
    const card = src, cardImg = srcImg;
    const pairs = [{ from: modal, to: () => card, name: 'glide-card' }];
    const inner = destImg && document.querySelector(destImg);
    if (inner && cardImg && usable(inner) && cardImg.isConnected) {
      pairs.push({ from: inner, to: () => cardImg, name: 'glide-img' });
    }
    overlay.classList.add('glide-vt');
    closing = true;
    morph({
      pairs,
      dir: 'close',
      update: () => { finishClose(); closing = false; },
    }).then((latest) => { if (latest) overlay.classList.remove('glide-vt'); });
    return;
  }

  overlay.classList.remove('glide-vt');
  finishClose();
}

export { isOpen };
