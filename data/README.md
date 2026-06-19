# Data layer & validation

This directory holds the generated seed data that the spec in `../docs/`
describes. It is **separate** from the spec self-test: `scripts/self_test.py`
validates the *documentation* (files exist, contain required terms, JSON blocks
parse). It does **not** load the seed data. Use the validator below for that.

## Files

| Path | What |
|---|---|
| `source_map_seed_data_v070.json` | Current seed: 152 traditions, 673 deities, 1326 facets, 329 parallels. |
| `../tools/validate_seed_data.py` | Referential-integrity + consistency validator. Exits non-zero on any Severity-1 defect. |
| `../reports/defect_manifest_v070.json` | Every defect (id + detail) found in the current data. |
| `../reports/AUDIT_v070.md` | Human-readable summary + hand-fix lists. |

## Run the data validator

```bash
python3 tools/validate_seed_data.py data/source_map_seed_data_v070.json \
    --manifest reports/defect_manifest_v070.json
```

## Current state (v0.7.0): 196 defects

- **147 Severity-1** (break the graph) — 136 dangling `parallel_facets` refs from
  an unreconciled v0.5.0 merge, 7 orphaned `tradition_id` foreign keys
  (`chinese`/`taoist`/`levantine` are not real tradition ids), 3 self-/mislinked
  parallels, 1 facet-to-itself parallel.
- **46 Severity-2** (contradict the spec) — 9 `documented-historical-transmission`
  rows mislabeled `genuine-novel`; 28 `identity`/`derivation` rows mislabeled
  `genuine-novel`; 9 duplicate parallel pairs. Per `docs/06`, transmission and
  typology are distinct evidence types — the data conflates them.
- **3 Severity-3** (quality) — `strength` is 76% "strong" (non-discriminating),
  147 free-text `type` values, 47/1326 facets carry a `scholarly_note`.

The spec is sound; the seed data does not yet conform to it. See
`../reports/AUDIT_v070.md` for the prioritized fix list.
