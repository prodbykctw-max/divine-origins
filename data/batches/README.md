# Expansion batches

Each file adds to the canonical seed. Shape:

```
{ "traditions": [...], "deities": [...], "facets": [...], "parallels": [...],
  "deity_updates": [ {"deity_id": "...", "add_alternate_names": [...]} ] }
```

Facets may belong to an existing deity (they are appended to its `facets`).
Rebuild the canonical seed with:

```
python3 tools/merge_batches.py data/source_map_seed_data_v080.json data/source_map_seed_data_v090.json \
  data/batches/v090_abr.json data/batches/v090_sas.json data/batches/v090_eas.json \
  data/batches/v090_eur.json data/batches/v090_afa.json data/batches/v090_xlink.json data/batches/v090_spelling.json
python3 tools/validate_seed_data.py data/source_map_seed_data_v090.json --manifest reports/defect_manifest_v090.json
cp data/source_map_seed_data_v090.json app/vite/seed-data.json
```

Order matters: when two batches add the same id, the earlier one wins (see `reports/MERGE_v090.txt`).
