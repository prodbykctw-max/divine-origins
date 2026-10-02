# Parallels of the Gods — The App

This is the working application built from the spec package. It's a **single-file React artifact** (`ParallelsOfTheGods.jsx`) that renders the four-tier comparative cosmology canvas.

> **Data:** the app now imports `seed-data.json`, which is the **canonical clean
> v0.8.0** dataset (152 traditions, 643 deities, 934 facets, 259 parallels — a
> copy of `../../data/source_map_seed_data_v080.json`). Earlier it embedded the
> 16-deity v0.1.0 stub inline. To change datasets, swap `seed-data.json` or use
> the in-app upload. Traditions outside the hand-picked palette get a stable
> hash-derived color so all 152 stay visually distinct.

## What it does

- Renders all five tiers (I, II, Cross-tier, III, IV) as horizontal bands in a Hermetic-codex visual style
- Shows every deity from the dataset as a chip on its assigned tier, colored by tradition
- Tap any chip → bottom sheet slides up with full detail: essence, parallels, sources, function tags
- When a node is selected, parallel figures glow soft gold and others dim
- Search across primary names, alternate names, function tags, and core claims
- Tradition filter (multi-select) — toggle individual traditions on/off
- **Scholarly mode** — surfaces academic caveats and primary-text evidence on each parallel
- **Upload** — swap in any larger JSON dataset matching the schema (e.g., the v0.5.0 build with ~200 deities)
- **About** — full framework explanation accessible from the header

## How to run

### Run locally with Vite

```bash
cd app/vite
npm ci
npm run dev
```

Opens at http://localhost:5173. Tailwind is compiled at build time (`tailwind.config.cjs` + `postcss.config.cjs`), and `npm run build` emits a single self-contained `dist/index.html` (via `vite-plugin-singlefile`).

### Claude Code

From `source-map-spec/` root:

```bash
claude
```

Claude Code reads `CLAUDE.md` and orients itself. Ask it to add drag-to-connect (`docs/06`), the personal-overlay layer (`docs/05`), or the practices view-mode (`docs/04`).

## Visual / design notes

The design draws from 17th-century Hermetic engravings (Robert Fludd's *Utriusque Cosmi*, Athanasius Kircher's *Oedipus Aegyptiacus*) where the cosmos was diagrammed in concentric horizontal layers with the divine correspondences drawn as threads between them.

- **Palette**: black & gold, matching the Divine Origins library (void #050408 → #15112a, ivory text #ede3c4, gold #c9a84c / #f0d080), with Apple Liquid Glass surfaces
- **Type**: Cinzel for display, Cormorant Garamond for body; small caps for marginalia labels and tradition badges
- **Cosmos (3D)**: `CosmosView.jsx` — React Three Fiber + drei + GSAP; requires a hardware GPU (software rendering opens the Tiers view instead)
- **three.js is pinned to 0.182.0**: r183+ deprecates `THREE.Clock`, which React Three Fiber 9.8.1 (latest stable) still creates for every canvas, so newer three logs a console warning. Unpin once R3F moves to `THREE.Timer`.
- **Tradition colors**: pigment-inspired (lapis, vermilion, ochre, indigo, jade) — muted enough to coexist on the same canvas
- **One signature element**: when a node is selected, parallel nodes across other tiers glow soft gold while everything else dims. The doctrine of correspondences (*as above, so below*) is the interaction model.

## Data

Seed dataset embedded inline:
- 8 traditions: Gnostic, Hebrew/OT, Egyptian, Mesopotamian, Greek, Norse, Hindu, Aztec
- 16 deities, 48 facets, 8 canonical parallels with reasoning + scholarly caveats

The component falls back gracefully on additional traditions in the v0.5.0 dataset — color tokens are pre-defined for Buddhist, Zoroastrian, Taoist, Yoruba, Andean, Polynesian, Slavic, Celtic, Finnish, Japanese, Chinese. Any other tradition_id falls back to a neutral gray.

## What's not in v1 (deliberately)

These are in the spec package (`docs/05`, `docs/06`) and can be added in a follow-up iteration:

- Drag-to-connect — user-drawn parallel lines
- Personal "My Map" overlay (save, fork, share)
- Connection-evidence schema input UI
- Practices view-mode (the seven practice families canvas per `docs/04`)
- Comment system on published overlays
- Persistent storage (the spec specifies a server-side approach; the artifact uses in-memory React state per the artifact platform's constraints)

## File map

```
app/
├── README.md                    ← this file
├── index.html                   ← Vite entry
├── package.json                 ← React + Vite + lucide-react
├── vite.config.js
├── ParallelsOfTheGods.jsx       ← the component (single-file artifact, ready to render)
├── seed-data.json               ← the dataset (also embedded in the JSX)
└── src/
    ├── main.jsx                 ← mounts the App into #root
    └── index.css                ← minimal reset
```
