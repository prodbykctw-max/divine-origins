/* =============================================================
   ui/modal.js — Reusable Modal System
   ============================================================= */

let isOpen = false;

export function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  if (!overlay) return;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

export function openModal({ accentColor = 'var(--accent)', html = '' } = {}) {
  const overlay = document.getElementById('modal-overlay');
  const accent  = document.getElementById('modal-accent');
  const content = document.getElementById('modal-content');

  if (!overlay || !content) return;

  if (accent) accent.style.cssText = `height:3px;background:linear-gradient(90deg,${accentColor},transparent)`;
  content.innerHTML = html;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  isOpen = true;

  // Focus first focusable element
  requestAnimationFrame(() => {
    const focusable = content.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
    focusable?.focus();
  });
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  isOpen = false;
}

export { isOpen };
