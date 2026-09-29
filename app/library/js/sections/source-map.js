/* =============================================================
   js/sections/source-map.js — The Source Map
   Mounts "Parallels of the Gods" (repo main @ 720e7a4, Aug 4 2026,
   canonical v0.8.0 dataset) inside an isolated frame so its styles
   never collide with the library's design system.
   ============================================================= */

let frameUrl = null;

function getFrameUrl() {
  if (frameUrl) return frameUrl;
  const b64 = document.getElementById('source-map-app').textContent.trim();
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  frameUrl = URL.createObjectURL(new Blob([bytes], { type: 'text/html' }));
  return frameUrl;
}

export function renderSourceMap() {
  const section = document.getElementById('section-source-map');
  if (!section || section.querySelector('iframe')) return;
  section.innerHTML = `<iframe class="source-map-frame" title="The Source Map — Parallels of the Gods"
    src="${getFrameUrl()}" loading="eager"></iframe>`;
}
