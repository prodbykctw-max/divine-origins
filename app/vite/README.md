# Parallels of the Gods — The App

This is the working application built from the spec package. It's a **single-file React artifact** (`ParallelsOfTheGods.jsx`) that renders the four-tier comparative cosmology canvas, with the seed dataset embedded inline.

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

### Option A — render as a Claude artifact

Open `ParallelsOfTheGods.jsx` in claude.ai with the artifact renderer; it renders immediately. The seed dataset is embedded so it works with no wiring.

### Option B — run locally with Vite

```bash
cd app
npm install
npm run dev
```

Opens at http://localhost:5173. Tailwind is loaded via CDN in `index.html` for instant prototyping — swap to a proper Tailwind build pipeline before production.

### Option C — Claude Code

From `source-map-spec/` root:

```bash
claude
```

Claude Code reads `CLAUDE.md` and orients itself. Ask it to add drag-to-connect (`docs/06`), the personal-overlay layer (`docs/05`), or the practices view-mode (`docs/04`).

## Visual / design notes

The design draws from 17th-century Hermetic engravings (Robert Fludd's *Utriusque Cosmi*, Athanasius Kircher's *Oedipus Aegyptiacus*) where the cosmos was diagrammed in concentric horizontal layers with the divine correspondences drawn as threads between them.

- **Palette**: aged-vellum background (#f5efe1 → #ede4cf gradient), deep-ink text (#1d2030), single gold accent (#b08648) used only for tier dividers and selected state
- **Type**: EB Garamond throughout (display + body in the same humanist serif family); small caps used for marginalia labels and tradition badges
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
├── index.html                   ← Vite entry, loads Tailwind via CDN
├── package.json                 ← React + Vite + lucide-react
├── vite.config.js
├── ParallelsOfTheGods.jsx       ← the component (single-file artifact, ready to render)
├── seed-data.json               ← the dataset (also embedded in the JSX)
└── src/
    ├── main.jsx                 ← mounts the App into #root
    └── index.css                ← minimal reset
```
