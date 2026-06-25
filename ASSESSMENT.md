# The Source Map — Full Project Assessment

*An exhaustive assessment of every artifact migrated into this repository from
the original multi-session project. This document is the single place to
understand what the project is, what state each piece is in, what is broken,
and what to do next. Everything below is grounded in the actual files committed
here and in `tools/validate_seed_data.py` output — not impressions.*

**Status date:** 2026-06-19 · **Branch:** `claude/app-audit-mjurwx`

---

## 0. Why this document exists

This project was built across roughly half a dozen chat sessions that had **no
access to GitHub**. The artifacts those sessions produced — specification
documents, a master prompt, self-tests, and four generations of seed data —
were never under version control. This repository is the migration target.
This file is the assessment of the whole corpus, assembled in the structure the
spec documents themselves call for.

The single most important structural fact, established the moment the work was
committed: **before this, none of it existed in any repository.** That risk is
now closed. What follows is the quality assessment of what was migrated.

---

## 1. What the project is (in one page)

**The Source Map** (alt: *Pleromic Atlas*, *Convergence Engine*) is a
comparative-cosmology application. It maps every documented deity, divine
concept, and cosmological figure across world traditions onto a **four-tier
hierarchy** derived from Gnostic cosmology, and lets a user explore, compare,
and draw their own connections.

**The four tiers** (`docs/01` §2):

| Tier | Name | Function | Exemplars |
|---|---|---|---|
| 1 | Unmanifest Source | Ineffable ground of being | Monad, Ein Sof, Brahman-Nirguna, Tao, Nun |
| 2 | True Most High / Council | First manifestation, head of council | El Elyon, Anu, Ahura Mazda, Barbelo |
| 3 | Demiurge | Flawed craftsman of matter | Yaldabaoth, Yahweh (Gnostic reading), Marduk |
| 4 | Archons / Rulers | Planetary powers, enforcers | Seven Archons, Watchers, Olympians-as-rulers |
| Cross-tier | Light-Bringers | Bridge tiers, wake humanity | Sophia, Christ, Prometheus, Hermes, Loki |

**The data model** has three entity types:
- **Deities** — a named figure in a tradition (id, names, sources, etymology, summary).
- **Facets** — one structural *function* of a deity (tier, function-tags, valence, core-claim, `parallel_facets`). A deity has 2–5 facets. **Parallels are drawn between facets, not whole deities** — this is the project's key methodological move.
- **Parallels** — a typed, strength-rated link between two facets, with `basis`, evidence, provenance, and triage status.

**Five layers wrap the data** (`docs/02`–`06`):
- **Methodology** (`02`): map by structural function, never by name/icon/domain; note splits and inversions; proponent voice.
- **Scholarly mode** (`03`): six caveat types, a real bibliography, explicit perennialism critique (Katz, Hanegraaff). Distinguish structural from genealogical.
- **Practices** (`04`): seven ascent-practice families, making the atlas actionable.
- **Personal layer** (`05`): user overlays, forking, sharing — "My Map."
- **Evidence schema** (`06`): eight evidence types + strength rating on every connection, so the map can't degrade into free association.

---

## 2. Complete artifact inventory

Everything migrated, where it now lives, and its role.

### Specification (authored — "the chat side")
| File | Role | State |
|---|---|---|
| `docs/00-original-feature-spec.md` | Original standalone feature spec (richer UI section) | Preserved; diverges from `01` — see §6 |
| `docs/01-comparative-cosmology-spec.md` | Maintained feature spec (framework, schema, UI, node list) | Complete |
| `docs/02-structural-cross-comparison.md` | Methodology for adding nodes / answering parallels | Complete |
| `docs/03-scholarly-mode.md` | Academic caveat layer + bibliography | Complete |
| `docs/04-practices-layer.md` | Seven practice families | Complete |
| `docs/05-personal-layer-and-my-map.md` | Overlays, forking, sharing | Complete |
| `docs/06-connection-evidence-schema.md` | Eight evidence types + strength | Complete |
| `methodology/master-prompt.md` | Binding prompt for a building chat | Complete |
| `scripts/self_test.py` | Validates the **docs** (102/102 green) | Passing — but docs-only (see §4) |
| `scripts/build_pdfs.sh` | Renders docs to PDF | Present |
| `tests/test_outputs.md` | Recorded self-test run | Present |
| `SOURCE-MAP-SPEC-COMPLETE.md` / `.pdf` | Single-file edition of the package | Present |
| `pdfs/*.pdf` | Rendered docs | Present |

### Data (generated — "the build side")
| File | Snapshot | State |
|---|---|---|
| `data/source_map_seed_data_v010.json` | Original 16-deity / 8-tradition seed | 142 defects (mostly by-design fwd-refs) |
| `data/source_map_seed_data_v060_PREMERGE.json` | 800-deity expansion, pre-merge | **1975 defects** — badly broken |
| `data/source_map_seed_data_v065_PRE_V050MERGE.json` | Quality-passed, slimmed | **19 defects — the cleanest state** |
| `data/source_map_seed_data_v070.json` | Current; v0.5.0 merged back in | 196 defects — regressed (see §3) |

### Audit tooling (new, added during this migration)
| File | Role |
|---|---|
| `tools/validate_seed_data.py` | Referential-integrity + consistency validator; CI-gating |
| `reports/defect_manifest_v0*.json` | Machine-readable defect list per version |
| `reports/AUDIT_v070.md` | Human-readable defect report + hand-fix lists |
| `data/README.md` | How to validate; current-state summary |

### Also received in chat (folded into reports, not separate files)
- **MANUAL WORK BACKLOG** (P0–P4 task list) — reconciled against the data in §7.
- **CITATION TRIAGE REPORT** (329 parallels sorted novel/known/established) — assessed in §7.

---

## 3. Data version history & health — the central finding

The validator run across all four snapshots tells a story that is **not** "the
data steadily improved." It is a story of one excellent cleanup followed by a
regression:

| Version | Traditions | Deities | Facets | Parallels | Cited | **Total defects** | Sev-1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| v0.1.0 | 8 | 16 | 48 | 8 | 0 | 142 | 139 |
| v0.3.0 | 14 | 63 | 146 | 60 | 0 | 158 | 156 |
| v0.4.0 | 17 | 104 | 214 | 99 | 0 | 166 | 164 |
| v0.5.0 | 24 | 193 | 392 | 160 | 0 | 153 | 150 |
| v0.6.0-PREMERGE | 152 | 800 | 3637 | 289 | 0 | **1975** | 1963 |
| v0.6.5-PRE_V050 | 152 | 643 | 934 | 270 | 0 | **19** | 7 |
| v0.7.0 | 152 | 673 | 1326 | 329 | 35 | **196** | 147 |
| **v0.8.0 (canonical)** | 152 | 643 | 934 | 259 | 56 | **2** | **0** |

(The v0.3.0–v0.5.0 rows were added when the original chats' full export arrived;
they fill the lineage gap. All carry the same by-design dangling-`parallel_facets`
forward-references. v0.8.0 is the clean canonical seed produced by the
forward-port — see `reports/FORWARD_PORT_v080.md`.)

**Read the v0.6.5 → v0.7.0 transition carefully. It is the headline.**

- **v0.6.5 is the cleanest the data has ever been: 19 defects, only 7 Severity-1.**
  Its 7 Sev-1 are just 4 orphaned tradition FKs (`chinese`×3, `levantine`) and 3
  self-/mislinked parallels (`p214`, `p_osiris_dionysus`, `p_sun_wukong_loki`).
  Crucially, **it has zero dangling `parallel_facets`** — the quality pass that
  produced it stripped the forward-references out.
- **v0.7.0 — the "latest" — is 10× more broken (196 defects).** The v0.5.0
  merge that produced it **re-introduced the 136 dangling `parallel_facets`**
  that v0.6.5 had cleaned out, **added 3 more orphan FKs** (`taoist`×3), and
  **added 37 new Severity-2 triage contradictions** (the merge brought in the
  novel/known/established triage but applied it inconsistently).

### What v0.7.0 has that v0.6.5 doesn't
v0.7.0 is not strictly worse — it added genuine value the cleaner version lacks:
- **35 citation-backed ("established") parallels** — v0.6.5 had 0.
- The **provenance / triage_status** layer (novel vs known vs established).
- ~50 more parallels and ~390 more facets of content.

### The implication for how to move forward
You are choosing between two imperfect bases:
- **v0.6.5**: structurally clean, but no citation/triage layer and fewer facets.
- **v0.7.0**: richer + cited, but structurally regressed.

**Recommended path: forward-port v0.7.0's citation/triage layer onto v0.6.5's
clean structure** — i.e., redo the v0.5.0 merge properly, running the validator
as a gate so the 136 danglers and 3 orphan FKs can never come back. Do not keep
building on v0.7.0 as-is; you'd be compounding a known regression.

---

## 4. The false-green problem (read before trusting any "passing" status)

There are **two** test harnesses in this repo and they measure different things:

| Harness | Scope | Result |
|---|---|---|
| `scripts/self_test.py` (authored) | **Documentation only** | 102/102 — ALL GREEN |
| `tools/validate_seed_data.py` (new) | **The seed data** | 196 defects — exit 1 |

`self_test.py` never opens a seed-data file. It checks that the markdown docs
exist, contain required terms, and that JSON *snippets inside the markdown*
parse. That is useful, but it means the reassuring "102/102 ALL GREEN" says
**nothing** about whether the data the app would load is valid. Both harnesses
are correct; they just answer different questions. Keep both, and never read the
docs-green as data-green.

---

## 5. Specification assessment

**Verdict: the spec is the strongest part of the project. It is unusually
self-aware and largely pre-empts the standard criticisms of comparative
mythology.** Specifically:

- It **separates structural (typological) parallels from documented
  (genealogical) transmission** (`docs/03` Standing Caveat 2; `docs/06`
  evidence types 1 vs 3). This is the exact distinction Frazerian/Jungian
  "parallelomania" collapses, and the spec gets it right on paper.
- It **bans surface-matching** — name, iconography, domain, "chief god" (`docs/02`
  Step 3) — and requires matching by function.
- It **names the perennialism critique** and cites the critics (Steven Katz,
  Wouter Hanegraaff, J.Z. Smith) rather than hiding them (`docs/03`).
- It **forbids invented citations** and supplies a real bibliography.
- It treats the four-tier frame as "one interpretive lens, not objective truth."

**Where the spec is still exposed (conceptual, not bugs):**
1. **Specificity weighting — NOW IMPLEMENTED (was the single biggest gap).**
   The spec asserted structural matches are meaningful but never showed how a
   match exceeds chance given how loosely a "function" can be drawn. Universal
   motifs (dying-rising-god, culture-hero, sky-father) will always produce
   matches. `tools/specificity.py` now weights every canonical parallel by the
   **IDF (rarity) of the function-tags its two facets share**, and bands each as
   `specific` / `moderate` / `universal-motif` / `tag-divergent`. The
   parallelomania-risk parallels are auto-flagged: e.g. Enki↔Prometheus,
   Osiris↔Dionysus, Mithras↔Indra land in `universal-motif`; PIE cognates and
   rare shared roles (Danu↔Diti, Kali↔Zurvan) score highest. Scores are baked
   into the canonical seed (by `forward_port.py`), surfaced in the app, and
   reported in `reports/SPECIFICITY_v080.md`. A **randomized null model** (seeded
   Monte-Carlo over ~20k random facet pairs) now also gives each parallel a
   p-value: **136/259 are significant at p<0.05**; the other 123 (every
   `tag-divergent` parallel plus 11 `universal-motif`, including Osiris↔Dionysus
   at p≈0.14) are **not statistically distinguishable from two random figures** —
   the precise list a reviewer would attack. This is now a significance test, not
   just a ranking.
2. **The four-tier frame is Gnostic-normative.** Mapping Yahweh→Demiurge,
   Brahma→"egoic," etc., is a specific theological reading. The spec
   acknowledges this, but every node inherits the stance; the "scholarly mode"
   caveats must actually be populated or the framing reads as assertion.
3. **`strength` and `type` vocabularies** are defined loosely; the data shows
   the cost (see §6: 76% "strong", 147 `type` values).

---

## 6. Data-conformance assessment (v0.7.0 — current)

The data **violates the spec it ships with.** 196 defects, by the validator's
severity model:

### Severity-1 (147) — breaks the graph; must fail CI
- **136 dangling `parallel_facets`** — facets point at sibling facets that don't
  exist. **Correction to an earlier claim:** these are *not* a v0.5.0-merge
  invention. v0.1.0 already had 98 such forward-references; 74 persist into
  v0.7.0. They are original to the seed design and were never reconciled — and
  v0.6.5 proved they *can* be cleaned out, then v0.7.0 put them back.
- **7 orphaned `tradition_id` FKs** — `guan-yu-deity`, `pangu`, `xi-he` →
  `chinese`; `dagon` → `levantine`; `tao-unnamable`, `three-pure-ones`,
  `celestial-bureaucracy` → `taoist`. None of those tradition ids exist (the
  real ones are `taoist-chinese`, `chinese-folk`, `taoism-philosophical`).
- **3 self-/mislinked parallels** + **1 facet-to-itself**, the most dangerous
  class because the human-readable label *lies*:
  - `p_osiris_dionysus` — labeled Osiris↔Dionysus; **both facets are
    `osiris-dying-rising`.** Dionysus is absent. It is Osiris↔Osiris.
  - `p_sun_wukong_loki` — labeled Sun Wukong↔Loki; **both facets are Loki**
    (`loki-trickster-liberator` + `loki-bound`). Sun Wukong is absent.
  - `p214` — Anakim↔Anakim (a deity compared to itself).

### Severity-2 (46) — contradicts the spec's own categories
- **9 `documented-historical-transmission` parallels tagged `genuine-novel`.**
  Per `docs/06`, transmission and typology are *different evidence types*; a
  documented transmission is the **opposite** of an overlooked discovery. The
  basis text says so itself: "Guanyin **IS** the feminized Avalokitesvara,"
  "Hermes Trismegistus **IS** Thoth," Erzulie↔Oshun "direct diaspora
  transmission."
- **28 `identity`/`derivation` parallels tagged `genuine-novel`** — etymological
  identities (\*Dyḗus/Zeus class) are the most established facts in the field,
  not discoveries.
- **9 duplicate parallel pairs** — e.g., Inanna↔Persephone appears 3×.

### Severity-3 (3) — non-discriminating measures
- **`strength` is 76% "strong"** (251/329) — a scale whose mode is its top value
  carries little information.
- **147 distinct `type` values** for 329 parallels — free text, not a controlled
  taxonomy (135 are the generic `structural-function-match`; the rest a
  long singleton tail).
- **47 / 1326 facets carry a `scholarly_note`** (3.6%). The parallels are built
  on facets that are 96% unsourced.

---

## 7. The "discovery" claim & the triage/backlog assessment

The project's emotional payoff is the **47 no-contact cross-hemisphere
candidates** (and 271 "genuine-novel" in the fuller triage). Assessed honestly:

- **The triage's three buckets are not a partition.** The same pair appears in
  multiple mutually-exclusive categories (Māui↔Prometheus is both "genuine-novel
  contribution" and "already established anchor"; Inanna↔Persephone is both
  "known-uncited" and "established"). Every headline count is therefore inflated.
- **"Novel" is defined as "my 8-cluster keyword filter didn't catch it"** — the
  triage report says so. That is absence-of-evidence, not a literature check.
  The filter misses textbook material: \*Dyḗus↔Zeus (Bopp 1816), Eos↔Ushas,
  the deva/daeva inversion — all sitting in the "contribution space."
- **Several flagged "discoveries" are Comparative-Religion 101**: Māui/Raven/
  Quetzalcoatl ↔ Prometheus (culture-hero), Pele↔Kali, Papatūānuku↔Gaia,
  Xipe-Totec↔Osiris (dying-and-rising vegetation god). These are expected
  outputs of shared material conditions + universal cognition, i.e. the null
  hypothesis — not overlooked connections.
- **`established` is a mechanical flag**: per the backlog, `established` ==
  "has a `scholarly_note` field." So the established/novel split is an
  `IS NOT NULL` test, not a scholarly judgment.

**The MANUAL WORK BACKLOG (P0–P4) is sound as a task list**, and its counts now
reconcile against the data (120 deities genuinely have empty facet arrays, etc.).
But P0 ("validate the 47") should be **re-sequenced behind data repair** — there
is no point lit-checking parallels whose facet links are mislabeled or dangling.

---

## 8. Consolidated, prioritized roadmap

In dependency order. Each step has a concrete, checkable exit condition.

**P0 — Stop the regression (days).**
1. Adopt **v0.6.5 as the structural base** OR re-run the v0.5.0 merge with the
   validator as a gate. Exit: `validate_seed_data.py` exits 0.
2. Forward-port v0.7.0's **35 citations + triage layer** onto that clean base.
3. Wire `validate_seed_data.py` into **CI** (GitHub Action) so docs-green can
   never again mask data-red.

**P1 — Make the data conform to the spec (1–2 weeks).**
4. Auto-derive `triage_status` from `type`/`strength` (kills the 37 Sev-2
   contradictions). Exit: 0 `novel_but_*` defects.
5. Fix the 7 tradition FKs; delete/remap the 3 mislinked parallels.
6. Reconcile or delete the 136 dangling `parallel_facets`.
7. Collapse the 147 `type` values onto the controlled taxonomy the spec already
   implies (`docs/06`'s 8 evidence types) + a free-text `descriptor`.

**P2 — Earn the rigor the spec promises (ongoing).**
8. ~~Add a **specificity/frequency weight** so universal motifs are down-ranked.~~
   **DONE** — `tools/specificity.py` (§5.1), including a seeded randomized null
   model giving each parallel a p-value (136/259 significant at p<0.05).
9. Build the **120 missing facet sets**; backfill `scholarly_note` on facets.
10. Only then run **P0 of the backlog** (validate the 47), with a real
    literature check and a *discard* path, not just promote.

**P3 — Build the app the spec describes.**
11. The canvas UI (`docs/00` §4 is the fuller reference; `docs/01` §4 the
    maintained one — reconcile the four vs three view modes). **A working UI
    already exists** in `app/` (a React component + two standalone HTML builds,
    "Parallels of the Gods" and the "Divine Origins" library) — but it ships
    stale embedded data (v0.1.0 / v0.5.0) and implements only part of the spec.
    The next step is wiring the React app to the canonical `v0.8.0` seed and
    closing the spec gaps (view modes, My Map). See `app/README.md`.

---

## 9. How this repo compiles into GitHub

The repository is already in the shape the spec calls for, plus the data/audit
layer:

```
divine-origins/
├── README.md                     # spec-package overview (authored)
├── ASSESSMENT.md                 # this document
├── SOURCE-MAP-SPEC-COMPLETE.md   # single-file edition
├── docs/                         # 00 (original) + 01–06 (maintained spec)
├── methodology/master-prompt.md
├── scripts/                      # self_test.py (docs), build_pdfs.sh
├── tests/test_outputs.md
├── pdfs/
├── data/                         # v0.1.0, v0.6.0, v0.6.5, v0.7.0 seeds + README
├── tools/validate_seed_data.py   # data validator (CI-gating)
└── reports/                      # defect manifests + AUDIT_v070.md
```

Everything is committed on `claude/app-audit-mjurwx`. To compile: open a PR from
that branch (the work is already pushed), or merge it into your default branch.

---

## 10. The one-paragraph bottom line

The **specification is genuinely good** — self-aware, well-cited, and it already
forbids the mistakes the data went on to make. The **data does not yet live up
to it**, and the "latest" snapshot (v0.7.0) is a measurable regression from the
cleanest one (v0.6.5): a careful cleanup that got the data to 19 defects was
undone by a merge that put it back to 196. The fix is not a rethink — it's
**discipline**: rebuild forward from the clean base, gate every change with the
validator that now exists, derive the triage flags from the data instead of
asserting them, and add the one missing methodological piece (a specificity
weight) before claiming any "discovery." Do that, and the project's central
promise — *the names change, the structure does not* — becomes something a
skeptical reader can actually check, one validated line at a time.
