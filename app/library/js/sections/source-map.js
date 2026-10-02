/* =============================================================
   js/sections/source-map.js — The Source Map
   Mounts "Parallels of the Gods" (app/vite) directly into this page,
   inside a shadow root so its Tailwind styles and the library's styles
   never collide. One shared copy of React / three.js for the whole site.
   ============================================================= */

import { mountSourceMap } from '../sourcemap-embed.jsx';

let mounted = false;

export function renderSourceMap() {
  const section = document.getElementById('section-source-map');
  if (!section || mounted) return;
  mounted = true;
  mountSourceMap(section);
}
