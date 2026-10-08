# The Source Map — Specification Package

> *Every culture has named the divine differently — but the structures repeat. The unknowable Source. The Most High and the divine council. The craftsman-god who shaped this world. The rulers who govern it. The light-bringers who descend to wake us up.*

This repository contains the complete specification for **The Source Map** — a comparative cosmology feature that maps every documented deity, divine concept, and cosmological figure across world traditions onto a single four-tier hierarchy derived from Gnostic cosmology.

The methodology label for users: **Comparative Esotericism / Perennial Cosmology** — mapping the Source across traditions using the Gnostic four-tier framework as the interpretive key.

---

## What this branch holds

This branch (`claude/app-audit-mjurwx`, the repository's default branch) holds the **specification package, the seed data and the validation tooling** as of the v0.8.0 forward-port (2026-06-19). **It does not contain the app or the website.** For those, see [Where the app and site live](#where-the-app-and-site-live) below.

```
divine-origins/  (this branch)
├── README.md                          ← you are here
├── ASSESSMENT.md                      ← full project assessment + roadmap (status date 2026-06-19)
├── SOURCE-MAP-SPEC-COMPLETE.md / .pdf ← every spec doc + scripts + test record in one file
├── docs/
│   ├── 00-original-feature-spec.md         ← the original standalone feature spec (four view modes)
│   ├── 01-comparative-cosmology-spec.md    ← the maintained feature spec
│   ├── 02-structural-cross-comparison.md   ← methodology for parallels
│   ├── 03-scholarly-mode.md                ← academic caveat layer
│   ├── 04-practices-layer.md               ← ascent practices per tradition
│   ├── 05-personal-layer-and-my-map.md     ← user-saved layers, forking, sharing
│   └── 06-connection-evidence-schema.md    ← evidence types for user-drawn lines
├── methodology/
│   └── master-prompt.md               ← combined prompt for a building chat
├── data/
│   ├── README.md                      ← data layer notes
│   ├── source_map_seed_data_v080.json ← CANONICAL seed (CI-gated)
│   └── source_map_seed_data_v010 / v060_PREMERGE / v065_PRE_V050MERGE / v070.json  ← provenance snapshots
├── tools/
│   ├── validate_seed_data.py          ← referential-integrity validator (exits non-zero on Severity-1)
│   └── forward_port.py                ← rebuilds v0.8.0 from v0.6.5 structure + v0.7.0 citations
├── reports/                           ← defect manifests (v0.1.0–v0.8.0), AUDIT_v070.md, FORWARD_PORT_v080.md
├── scripts/
│   ├── self_test.py                   ← validates the docs are internally consistent
│   └── build_pdfs.sh                  ← rebuilds pdfs/ (needs pandoc + weasyprint)
├── pdfs/                              ← PDF renders of each doc + README + master prompt
├── tests/
│   └── test_outputs.md                ← recorded self-test run
└── .github/workflows/ci.yml           ← runs the docs self-test + canonical seed validation
```

### Canonical seed (v0.8.0)

`data/source_map_seed_data_v080.json` holds 152 traditions, 643 deities, 934 facets and 259 canonical parallels. `tools/validate_seed_data.py` reports 0 Severity-1 and 0 Severity-2 defects and 2 Severity-3 (quality) defects, and exits 0. The older snapshots are kept for provenance only and are not validated by CI.

### Run the checks

```bash
python3 scripts/self_test.py                                   # docs: 102/102
python3 tools/validate_seed_data.py data/source_map_seed_data_v080.json \
    --manifest reports/defect_manifest_v080.json               # seed: exits 0
python3 tools/forward_port.py                                  # regenerate v0.8.0
bash scripts/build_pdfs.sh                                     # rebuild pdfs/
```

CI (`.github/workflows/ci.yml`) runs the first two on every push and pull request. No third-party Python packages are needed.

---

## Where the app and site live

The app and the public website are on **`main`**, not on this branch.

| Branch | What it contains |
|---|---|
| `main` | Everything on this branch plus `app/`, `CLAUDE.md` and `QUICKSTART.md`, more seed generations (v0.3.0, v0.4.0, v0.5.0, `data/history/`) and a `deploy.yml` workflow. `app/library/` is the **Divine Origins** comparative theology library: Home, Traditions, Deities, Sacred texts, Calendars, The pattern, Timeline and Source map sections, with a WebGL galaxy behind it. `app/vite/` is the **Source Map** app (React 19, React Three Fiber, GSAP) on the v0.8.0 seed, with the 3D Cosmos view. `node app/build_combined.mjs` builds both into `app/site/` (the deployable site) and `app/divine-origins-combined.html` (a single-file copy). Current theme: Blue Qur'an Night (`app/library/css/theme.css`). |
| `gh-pages` | Only `index.html` and `.nojekyll`: a built copy of the site, last updated 2026-10-02 ("Deploy Divine Origins site from main 9935dce"). |
| `theme-blue-quran` | The Blue Qur'an Night theme (dark and light mode). Its own `app/library/css/theme.css` differs from main's current file. |
| `theme-chola-bronze` | An alternative Chola Bronze theme (patina darks, verdigris accent). It was merged and then reverted (`revert-bronze`). |
| `claude/*`, `about-pages`, `aeo-fixes`, `finish-aeo`, `seo-aeo`, `icon-and-metadata`, `cosmos-keep`, `sm-light`, `revert-bronze` | Feature and fix branches, each with its own app or docs change. |

### Live site

**https://prodbykctw-max.github.io/divine-origins/**, page title "Divine Origins: a comparative theology library".

`main`'s `.github/workflows/deploy.yml` builds `app/site/` with `node app/build_combined.mjs` on every push to `main` and publishes it with `actions/deploy-pages`. On 2026-10-08 the live page's title matched `main`'s `app/library/index.html`, not the older `index.html` on `gh-pages` ("Divine Origins — Comparative Theology Library").

To run the app locally, check out `main` and follow its `QUICKSTART.md` and `CLAUDE.md` (`cd app/vite && npm install && npm run dev` for the Source Map alone; `node app/build_combined.mjs` for the full site).

---

## How to use this package

### For the building chat (Claude or another assistant)

Paste **`methodology/master-prompt.md`** into the chat alongside `docs/00-original-feature-spec.md` (the original `Comparative_Cosmology_Feature.pdf`) or `docs/01-comparative-cosmology-spec.md`. The master prompt references every document in `docs/` and gives the assistant binding instructions for applying them consistently.

### For a future developer

The data schema, UI spec and database seed are all in `docs/01`. The methodology that governs how new nodes are added is in `docs/02`. The scholarly caveat layer is in `docs/03`. The actionable user-facing layer (practices, personal maps, evidence types) is in `docs/04`–`docs/06`. `docs/00` is the original spec, with four view modes (Structural / Network / Constellation / Timeline); `docs/01` trimmed these to three.

---

## The four-tier framework at a glance

| Tier | Name | Function | Example figures |
|---|---|---|---|
| **1** | Unmanifest Source | The ineffable ground of being | Monad, Ein Sof, Brahman, Tao, Nun, Ginnungagap |
| **2** | True Most High / Divine Council | First manifestation, head of council | El Elyon, the Aeons, Anu, Ahura Mazda, Atum, Keter |
| **3** | Demiurge | Flawed craftsman who shaped matter | Yaldabaoth, Yahweh (Gnostic reading), Marduk, Brahma-egoic |
| **4** | Archons / Rulers | Planetary powers, principalities | Seven Archons, Watchers, Olympians, Igigi, Daevas |
| **Cross-Tier** | Light-Bringers / Liberators | Bridge tiers; wake humanity | Sophia, Christ-Aeon, Prometheus, Hermes, Thoth, Enki, Loki |

---

## Editorial principles

1. **Proponent voice by default.** Each tradition speaks in its own voice without disclaimers in default mode.
2. **Scholarly mode as a toggle.** Academic context, source criticism, and contested identifications appear in a parallel panel when the user opts in.
3. **Structural function over surface similarity.** Two figures are parallel if they perform the same cosmic role — not because they share a name, animal, or planet.
4. **Living traditions respected.** Practitioners of the traditions mapped here may disagree with comparative readings. The framework offers synthesis, not replacement.
5. **Genealogical vs. typological distinguished.** Documented historical transmission is flagged. Pattern-based parallels are flagged differently.

---

## Intellectual lineage

The framework draws on:

- Pico della Mirandola, *Oratio de hominis dignitate* (1486)
- Marsilio Ficino, *Prisca Theologia*
- Manly P. Hall, *The Secret Teachings of All Ages* (1928)
- H.P. Blavatsky, *The Secret Doctrine* (1888)
- René Guénon and Traditionalist comparative work
- Wouter Hanegraaff's academic comparative esotericism

Critical balance is provided through Hanegraaff, Karen King, Michael Williams, Mark S. Smith, Steven Katz, and the working scholars cited in `docs/03`.

---

## Status

On this branch: the spec package (self-test 102/102), the canonical v0.8.0 seed (validator exit 0) and CI. The app has been built since this branch was cut. It lives on `main` and is deployed to the live site above. See `ASSESSMENT.md` §8 for the roadmap as of 2026-06-19.

---

## License & attribution

Content authored by the project team. Scholarly citations are listed within `docs/03` and remain the intellectual property of their respective authors. The four-tier interpretive framework is derived from Sethian and Valentinian Gnostic primary texts (Nag Hammadi Codices) and is in the public domain.
