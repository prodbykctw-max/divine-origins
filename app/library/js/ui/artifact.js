/* =============================================================
   ui/artifact.js — real artifact photos (see data/artifact-images.js)
   The whole object is shown (contain) over a soft blurred fill of the
   same photo, with what-it-is / where-it-is / photo credit underneath.
   ============================================================= */
import { artifact, captionHTML, escapeHTML } from '../../data/artifact-images.js';

export { artifact, captionHTML };

/** Inner HTML for a .split-panel__img block. */
export function artifactPanel(kind, id, label, color) {
  const a = artifact(kind, id);
  if (!a) return `<div class="split-panel__img-trad" style="--item-color:${color}">${escapeHTML(label)}</div>`;
  return `
    <div class="art-fill" style="background-image:url('${a.small}')"></div>
    <img class="art-img" src="${a.large}" srcset="${a.srcset}" sizes="(max-width: 720px) 100vw, 45vw"
         alt="${escapeHTML(a.title)}" loading="lazy" decoding="async"
         onload="this.classList.add('loaded')" onerror="this.style.display='none'">
    <div class="split-panel__img-overlay art-overlay"></div>
    <div class="split-panel__img-trad" style="--item-color:${color}">${escapeHTML(label)}</div>
    <div class="split-panel__img-caption art-cap">${captionHTML(a)}</div>`;
}
