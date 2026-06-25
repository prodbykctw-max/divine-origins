# UI applications

The actual front-end of The Source Map / Divine Origins. Three artifacts built
across the original chat sessions, migrated here for version control. Earlier
audit notes in this repo stated "no UI code exists" — that was wrong; it existed
in the uploads and is now committed here.

## Runnable app & build pipeline (added from the full chat export)

- **`vite/`** — the **maintained, runnable** React + Vite build (`npm install &&
  npm run dev`). This is the canonical app going forward; the loose `.tsx` and the
  standalone HTML below are earlier artifacts kept for provenance. It embeds the
  v0.1.0 seed but its upload button loads any dataset — point it at
  `../data/source_map_seed_data_v080.json`.
- **`build-v050/`** — the Python pipeline (`build_v050.py`, `build_html.py`,
  `v050_data_a.py`, `v050_data_b.py`) that generates `parallels-of-the-gods-v050.html`
  from source. This is the source-of-truth for the v0.5.0 standalone build.

## Artifacts

| File | What it is | Embedded data | State |
|---|---|---|---|
| `parallels-of-the-gods.tsx` | React component (single file). Four-tier bands, click→detail sheet (Essence / Parallels / Sources / Tags), scholarly-mode toggle, tradition filters, full-text search, **JSON dataset upload**. | v0.1.0 seed (16 deities) inline | Cleanest/most maintainable; needs a React host to run. |
| `parallels-of-the-gods-v050.html` | Standalone single-file build of the same app. | v0.5.0-era inline | Opens directly in a browser. |
| `divine-origins-library-v050.html` | The larger "Divine Origins — Comparative Theology Library" (~200+ deities). Canvas rendering, drag-to-connect, filters, scholarly mode. | v0.5.0-complete inline | Opens directly in a browser; heaviest (≈0.9 MB). |

## How to run

- **HTML builds:** open the `.html` file in any modern browser. Self-contained
  (fonts via CDN; data embedded). No build step.
- **React component:** drop `parallels-of-the-gods.tsx` into a Vite/Next app with
  `react` + `lucide-react` + Tailwind, render `<App/>`. Or use the standalone
  HTML build instead.

## Assessment (good / bad)

**Good**
- The React app reads the **same deity/facet/parallel schema** the data pipeline
  produces, and has a working **upload** — so it can load the clean
  `data/source_map_seed_data_v080.json` directly, no code change.
- Real, usable features already exist: tier layout, parallel reasoning view,
  scholarly-mode caveats, search, tradition filters.

**Bad / gaps**
- **Embedded data is stale.** All three ship a pre-clean dataset (v0.1.0 in the
  tsx, v0.5.0 in the HTML builds) — i.e. the snapshots with the structural
  defects catalogued in `../reports/`. They predate the clean v0.8.0.
- **Three divergent copies.** The `.tsx`, the v0.5.0 HTML, and the Library app
  have drifted; there is no single source of truth or build that regenerates the
  HTML from the component + a chosen dataset.
- **Only a subset of the spec UI is implemented.** Per `../docs/00 §4`, the spec
  calls for four view modes (Structural / Network / Constellation / Timeline), a
  Compare-Two-Nodes panel, and the personal "My Map" overlay with drag-to-connect
  persistence (`../docs/05`). The HTML Library has drag wiring; none of the three
  implement the full personal-overlay / evidence-typed connections from
  `../docs/06`.

## Recommended next step

Point the React app at the canonical seed: replace its inline v0.1.0 `SEED_DATA`
with `data/source_map_seed_data_v080.json` (or load it via the existing upload),
and make that the single maintained build. Then close the spec gaps
(view modes, My Map) against `../docs/00`–`06`. Tracked in `../ASSESSMENT.md` P3.
