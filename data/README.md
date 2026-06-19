# Data layer & validation

This directory holds the generated seed data that the spec in `../docs/`
describes. It is **separate** from the spec self-test: `scripts/self_test.py`
validates the *documentation* (files exist, contain required terms, JSON blocks
parse). It does **not** load the seed data. Use the validator below for that.

## Canonical seed

**`source_map_seed_data_v080.json` is the canonical, CI-gated seed** — the clean
forward-port of v0.6.5's structure + v0.7.0's citations (643 deities, 934 facets,
259 parallels, 56 citation-backed). It validates with **0 Severity-1 / 0
Severity-2** defects (exit 0). Built by `../tools/forward_port.py`; full change
log in `../reports/FORWARD_PORT_v080.md`. The earlier snapshots below are kept
for provenance only and are intentionally *not* gated.

## Files

| Path | What |
|---|---|
| `source_map_seed_data_v080.json` | **Canonical.** 643 deities, 934 facets, 259 parallels, 56 cited. 2 Sev-3 defects, exit 0. |
| `source_map_seed_data_v070.json` | Snapshot: 673 deities, 1326 facets, 329 parallels (196 defects). |
| `../tools/validate_seed_data.py` | Referential-integrity + consistency validator. Exits non-zero on any Severity-1 defect. |
| `../reports/defect_manifest_v070.json` | Every defect (id + detail) found in the current data. |
| `../reports/AUDIT_v070.md` | Human-readable summary + hand-fix lists. |

## Run the data validator

```bash
python3 tools/validate_seed_data.py data/source_map_seed_data_v070.json \
    --manifest reports/defect_manifest_v070.json
```

## Current state (v0.7.0): 196 defects

- **147 Severity-1** (break the graph) — 136 dangling `parallel_facets` refs
  (original to the seed design: v0.1.0 already had 98 such targets, 74 of which
  persist into v0.7.0 unreconciled — `parallel_facets` were always
  forward-references to facets that were never created), 7 orphaned
  `tradition_id` foreign keys (`chinese`/`taoist`/`levantine` are not real
  tradition ids), 3 self-/mislinked parallels, 1 facet-to-itself parallel.
- **46 Severity-2** (contradict the spec) — 9 `documented-historical-transmission`
  rows mislabeled `genuine-novel`; 28 `identity`/`derivation` rows mislabeled
  `genuine-novel`; 9 duplicate parallel pairs. Per `docs/06`, transmission and
  typology are distinct evidence types — the data conflates them.
- **3 Severity-3** (quality) — `strength` is 76% "strong" (non-discriminating),
  147 free-text `type` values, 47/1326 facets carry a `scholarly_note`.

The spec is sound; the seed data does not yet conform to it. See
`../reports/AUDIT_v070.md` for the prioritized fix list.
