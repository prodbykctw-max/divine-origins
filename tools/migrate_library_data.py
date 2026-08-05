#!/usr/bin/env python3
"""
Migrate the Walter Russell cross-references and tradition-claim prose from the
standalone `app/divine-origins-library-v050.html` build into the canonical seed.

That build's embedded `DEITIES` array (23 entries) carries two fields that don't
exist anywhere in the canonical deity/facet/parallel schema:
  - `traditionClaim`   -> canonical `tradition_claim`    (extended proponent-voice
                          prose, longer than the existing `summary` field)
  - `russelConnection` -> canonical `russell_connection`  (cross-reference to
                          Walter Russell's cosmology — a distinct enrichment
                          layer, separate from the structural-parallel method)

Source data lives in `data/library_v050_enrichment.json` — a one-time extraction
of all 23 entries (nothing dropped), checked in so this migration doesn't depend
on re-parsing the HTML file. Extracted via Node (`require()` on the isolated
`DEITIES = [...]` array literal — no code execution risk; it's a pure data
literal with no function calls) then hand-matched against canonical deity ids,
because automated name-matching is unreliable here: several sources are
ambiguous under fuzzy matching (e.g. "AN / ANU" superficially matches both
`anu-deity` and the unrelated `danu-irish`; "THE ONE (TO HEN)" is Plotinus's
Neoplatonic The One — a distinct concept from the Gnostic Monad despite the
Monad's own alt-name list including "The One").

5 of the 23 have no canonical match and are intentionally left unmigrated
(reported, not silently dropped) — see UNMATCHED below.

    python3 tools/migrate_library_data.py data/source_map_seed_data_v080.json
"""
import argparse
import json

ENRICHMENT_FILE = "data/library_v050_enrichment.json"

# source_id (from the library build) -> canonical deity id.
# Resolved by hand against data/source_map_seed_data_v080.json; see the
# docstring above for why fuzzy name-matching wasn't trustworthy here.
MAPPING = {
    "an": "anu-deity",              # not danu-irish (unrelated Irish goddess)
    "enki": "enki-deity",
    "inanna": "inanna",             # not ishtar (separate Akkadian deity entry)
    "marduk": "marduk",
    "ra": "ra-deity",               # not amun-ra (separate Ptolemaic syncretism entry)
    "osiris": "osiris-detail",
    "thoth": "thoth-deity",         # not hermes-trismegistus (separate hermetic entry)
    "el_canaanite": "el-canaanite", # not el-elyon (separate Hebrew entry)
    "el_elyon": "el-elyon",
    "yahweh": "yahweh",
    "ain_soph": "ain-soph",         # "Ain Soph Aur", not the separate ein-sof-detail
    "monad": "monad",
    "yaldabaoth": "yaldabaoth-detail",
    "zeus": "zeus-detail",          # not jupiter-roman (separate Roman entry)
    "the_one": "plotinus-the-one",  # Plotinus's To Hen -- NOT the Gnostic Monad
    "ahura_mazda": "ahura-mazda-deity",
    "odin": "odin-detail",
    "olodumare": "olodumare-deity",
    "wakan_tanka": "wakan-tanka",
}

# Genuinely absent from the canonical dataset -- not a matching failure, the
# concept itself was never built out as a deity record. (Brahman/Tao were in
# the *original spec's* Tier-1 node list per docs/00-01 but never got expanded
# into full deity entries during the data lineage -- a separate, pre-existing
# gap this migration surfaces rather than papers over.)
UNMATCHED = {
    "tammuz": "no canonical Tammuz/Dumuzi deity entry",
    "brahman": "no standalone Brahman entry (only the compound 'Atman = Brahman')",
    "tao": "no standalone 'The Tao' entry (only individual Taoist pantheon figures)",
    "dreamtime": "no canonical entry for the Dreaming/Tjukurpa as a deity concept",
}


def annotate(data, enrichment_path=ENRICHMENT_FILE):
    """Add tradition_claim / russell_connection to matched deities, in place.
    Returns a summary dict. Idempotent -- safe to re-run."""
    with open(enrichment_path, encoding="utf-8") as fh:
        enrichment = {e["source_id"]: e for e in json.load(fh)}

    deity_by_id = {d["id"]: d for d in data.get("deities", [])}
    applied, missing_target = [], []

    for source_id, canonical_id in MAPPING.items():
        entry = enrichment.get(source_id)
        deity = deity_by_id.get(canonical_id)
        if entry is None or deity is None:
            missing_target.append((source_id, canonical_id))
            continue
        if entry.get("tradition_claim"):
            deity["tradition_claim"] = entry["tradition_claim"]
        if entry.get("russell_connection"):
            deity["russell_connection"] = entry["russell_connection"]
        applied.append(canonical_id)

    return {
        "applied": applied,
        "applied_count": len(applied),
        "unmatched": UNMATCHED,
        "unmatched_count": len(UNMATCHED),
        "missing_target": missing_target,  # mapping entries whose canonical id
                                            # or source entry vanished -- should
                                            # be empty; non-empty means drift
                                            # between this script and the data.
    }


def write_report(summary, path="reports/LIBRARY_MIGRATION_v080.md"):
    L = []
    w = L.append
    w("# Library-Data Migration Report — v0.8.0")
    w("")
    w("Generated by `tools/migrate_library_data.py`. Migrates `tradition_claim` and")
    w("`russell_connection` from `app/divine-origins-library-v050.html`'s embedded")
    w("23-deity dataset into the canonical seed's deity records.")
    w("")
    w(f"**Matched and applied: {summary['applied_count']} / 23**")
    w("")
    w("| Canonical deity id |")
    w("|---|")
    for did in summary["applied"]:
        w(f"| `{did}` |")
    w("")
    w(f"**Unmatched (no canonical deity exists yet): {summary['unmatched_count']} / 23**")
    w("")
    w("| Source id | Why |")
    w("|---|---|")
    for sid, reason in summary["unmatched"].items():
        w(f"| `{sid}` | {reason} |")
    w("")
    w("These 4 entries' `tradition_claim` / `russell_connection` content is preserved")
    w("in `data/library_v050_enrichment.json` and can be attached once (if) their")
    w("deities are added to the canonical dataset.")
    if summary["missing_target"]:
        w("")
        w("## ⚠ Drift detected")
        w("The following mapping entries could not be resolved against the current")
        w("data -- the script and the seed have drifted apart:")
        for sid, cid in summary["missing_target"]:
            w(f"- `{sid}` -> `{cid}`")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L))


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file")
    ap.add_argument("--no-write", action="store_true")
    args = ap.parse_args(argv)
    with open(args.file, encoding="utf-8") as fh:
        data = json.load(fh)
    summary = annotate(data)
    write_report(summary)
    if not args.no_write:
        with open(args.file, "w", encoding="utf-8") as fh:
            json.dump(data, fh, indent=2, ensure_ascii=False)
    print(f"applied {summary['applied_count']}/23, unmatched {summary['unmatched_count']}/23")
    if summary["missing_target"]:
        print("WARNING: drift detected, see report")


if __name__ == "__main__":
    main()
