#!/usr/bin/env python3
"""
Referential-integrity and consistency validator for the Parallels-of-the-Gods
seed data (source_map_seed_data_v*.json).

Usage:
    python3 tools/validate_seed_data.py data/source_map_seed_data_v070.json
    python3 tools/validate_seed_data.py <file> --manifest reports/defect_manifest.json

Exit code is non-zero when any SEVERITY-1 defect is present, so this can gate CI.
SEVERITY-1 = data is internally broken (dangling refs, self/mislinked parallels,
orphaned foreign keys). SEVERITY-2/3 = consistency / quality problems that do not
corrupt the graph but invalidate downstream counts and reports.

No third-party dependencies. Python 3.8+.
"""
import argparse
import collections
import json
import re
import sys
import unicodedata


# --- severity ranking ------------------------------------------------------
SEV1 = "SEVERITY-1"  # breaks the graph; must fail CI
SEV2 = "SEVERITY-2"  # contradicts itself; corrupts counts/reports
SEV3 = "SEVERITY-3"  # quality / non-discriminating measures


def _fold(text):
    """Lower-case, strip diacritics, collapse non-alphanumerics to single spaces."""
    nfd = unicodedata.normalize("NFD", str(text).lower())
    bare = "".join(c for c in nfd if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", " ", bare).strip()


def load(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def validate(data):
    """Return (defects, summary, warnings). `defects` and `warnings` are lists of
    dict records; warnings are advisory and never affect the exit code."""
    deities = data.get("deities", [])
    facets = data.get("facets", [])
    parallels = data.get("canonical_parallels", [])
    traditions = data.get("traditions", [])

    deity_by_id = {d["id"]: d for d in deities}
    facet_by_id = {f["id"]: f for f in facets}
    tradition_ids = {t["id"] for t in traditions}
    facet_ids = set(facet_by_id)
    deity_ids = set(deity_by_id)

    defects = []
    warnings = []  # advisory only: reported with counts, never fail the build

    def warn(code, ref, detail):
        warnings.append({"severity": "WARNING", "code": code, "ref": ref,
                         "detail": detail})

    def add(severity, code, ref, detail):
        defects.append(
            {"severity": severity, "code": code, "ref": ref, "detail": detail}
        )

    def parent_of(facet_id):
        f = facet_by_id.get(facet_id)
        return f.get("parent_deity_id") if f else None

    def label(facet_id):
        f = facet_by_id.get(facet_id)
        if not f:
            return f"<missing facet {facet_id}>"
        d = deity_by_id.get(f.get("parent_deity_id"))
        dn = d["primary_name"] if d else f"<orphan {f.get('parent_deity_id')}>"
        return f"{dn} :: {f.get('facet_name')}"

    # --- duplicate IDs (SEV1) ---------------------------------------------
    for kind, items in (("deity", deities), ("facet", facets),
                        ("parallel", parallels), ("tradition", traditions)):
        counts = collections.Counter(x.get("id") for x in items)
        for _id, n in counts.items():
            if n > 1:
                add(SEV1, "duplicate_id", _id, f"{kind} id appears {n} times")

    # --- foreign keys (SEV1) ----------------------------------------------
    for d in deities:
        if d.get("tradition_id") not in tradition_ids:
            add(SEV1, "deity_bad_tradition_fk", d["id"],
                f"tradition_id '{d.get('tradition_id')}' not in traditions")
        for fref in d.get("facets", []):
            if fref not in facet_ids:
                add(SEV1, "deity_facet_missing", d["id"],
                    f"deity.facets references missing facet '{fref}'")

    for f in facets:
        if f.get("parent_deity_id") not in deity_ids:
            add(SEV1, "facet_bad_parent_fk", f["id"],
                f"parent_deity_id '{f.get('parent_deity_id')}' not in deities")
        for r in f.get("parallel_facets", []):
            if r not in facet_ids:
                add(SEV1, "parallel_facets_dangling", f["id"],
                    f"parallel_facets references missing facet '{r}'")

    for p in parallels:
        for side in ("facet_a_id", "facet_b_id"):
            if p.get(side) not in facet_ids:
                add(SEV1, "parallel_facet_missing", p["id"],
                    f"{side} '{p.get(side)}' not in facets")

    # --- self / mislinked parallels (SEV1) --------------------------------
    for p in parallels:
        a, b = p.get("facet_a_id"), p.get("facet_b_id")
        if a == b:
            add(SEV1, "parallel_self_facet", p["id"],
                f"both sides are the same facet '{a}' ({label(a)})")
            continue
        pa, pb = parent_of(a), parent_of(b)
        if pa and pb and pa == pb:
            # a parallel between two facets of the SAME deity. Either an
            # intra-pantheon note mis-filed as cross-tradition, or — when the
            # id slug names two different deities — a mislink where one side
            # points at the wrong deity entirely.
            add(SEV1, "parallel_same_deity", p["id"],
                f"both facets belong to deity '{pa}': "
                f"{a} + {b}. id slug='{p['id']}'")

    # --- duplicate parallels by unordered facet pair (SEV2) ---------------
    pair_seen = collections.defaultdict(list)
    for p in parallels:
        key = tuple(sorted([p.get("facet_a_id"), p.get("facet_b_id")]))
        pair_seen[key].append(p["id"])
    for key, ids in pair_seen.items():
        if len(ids) > 1:
            add(SEV2, "duplicate_parallel_pair", ",".join(ids),
                f"same facet pair {key} appears {len(ids)}x")

    # --- triage flags that contradict the row's own data (SEV2) -----------
    for p in parallels:
        triage = p.get("triage_status")
        if triage == "genuine-novel":
            if p.get("type") == "documented-historical-transmission":
                add(SEV2, "novel_but_documented_transmission", p["id"],
                    "triage_status=genuine-novel but "
                    "type=documented-historical-transmission")
            if p.get("strength") in ("identity", "derivation"):
                add(SEV2, "novel_but_identity_derivation", p["id"],
                    f"triage_status=genuine-novel but "
                    f"strength={p.get('strength')}")
        # provenance vs triage coherence
        prov = p.get("provenance")
        if prov == "established" and triage != "established":
            add(SEV2, "provenance_triage_mismatch", p["id"],
                f"provenance=established but triage_status={triage}")
        if prov == "established" and not (
            p.get("scholarly_note") or p.get("suggested_citation")
            or p.get("primary_text_evidence")
        ):
            add(SEV2, "established_without_citation", p["id"],
                "provenance=established but no scholarly_note / citation / "
                "primary_text_evidence")

    # --- quality / non-discriminating measures (SEV3) ---------------------
    strengths = collections.Counter(p.get("strength") for p in parallels)
    if parallels:
        top, n = strengths.most_common(1)[0]
        if n / len(parallels) > 0.6:
            add(SEV3, "strength_not_discriminating", top,
                f"'{top}' is {n}/{len(parallels)} "
                f"({n/len(parallels):.0%}) of all parallels")

    types = collections.Counter(p.get("type") for p in parallels)
    if len(types) > len(parallels) / 3:
        add(SEV3, "type_vocabulary_uncontrolled", str(len(types)),
            f"{len(types)} distinct 'type' values across {len(parallels)} "
            f"parallels (free text, not a controlled taxonomy)")

    facets_with_note = sum(1 for f in facets if f.get("scholarly_note"))
    if facets and facets_with_note / len(facets) < 0.5:
        add(SEV3, "facets_mostly_unsourced", f"{facets_with_note}/{len(facets)}",
            f"only {facets_with_note}/{len(facets)} "
            f"({facets_with_note/len(facets):.1%}) facets carry a scholarly_note")

    # --- WARNINGS (advisory; do not affect exit code) ---------------------
    # (a) parallel id "p_<a>_<b>" whose linked figures do not match the slugs.
    # Only two-slug ids are checked (longer ids are ambiguous to split).
    def slug_matches(slug, facet_id):
        f = facet_by_id.get(facet_id)
        d = deity_by_id.get(f.get("parent_deity_id")) if f else None
        if not f or not d:
            return False
        names = [facet_id, d.get("id", ""), d.get("primary_name", ""),
                 f.get("facet_name", "")] + list(d.get("alternate_names") or [])
        s = _fold(slug)
        return bool(s) and any(s in _fold(n) for n in names)

    for p in parallels:
        pid = p.get("id", "")
        if not pid.startswith("p_"):
            continue
        parts = pid[2:].split("_")
        if len(parts) != 2:
            continue
        a, b = p.get("facet_a_id"), p.get("facet_b_id")
        if a not in facet_by_id or b not in facet_by_id:
            continue
        ok = (slug_matches(parts[0], a) and slug_matches(parts[1], b)) or \
             (slug_matches(parts[0], b) and slug_matches(parts[1], a))
        if not ok:
            warn("parallel_slug_figure_mismatch", pid,
                 f"id names '{parts[0]}' + '{parts[1]}' but links "
                 f"{a} ({label(a)}) + {b} ({label(b)})")

    # (b) tier values outside the schema's tier_definitions.
    tier_defs = (data.get("_meta") or {}).get("tier_definitions") or {}
    valid_tiers = {str(k) for k in tier_defs} or {"1", "2", "3", "4", "cross-tier"}
    for f in facets:
        t = f.get("tier_assignment")
        if str(t) not in valid_tiers:
            warn("facet_tier_not_in_schema", f["id"],
                 f"tier_assignment={t!r} not one of {sorted(valid_tiers)}")

    # (c) documented-historical-transmission rows with no evidence
    # (docs/06 requires transmission_evidence for this type).
    evidence_fields = ("transmission_evidence", "primary_text_evidence",
                       "suggested_citation", "scholarly_note")
    for p in parallels:
        if p.get("type") == "documented-historical-transmission" and not any(
                p.get(k) for k in evidence_fields):
            warn("documented_transmission_without_evidence", p["id"],
                 "type=documented-historical-transmission but none of "
                 + " / ".join(evidence_fields) + " is set")

    summary = {
        "counts": {
            "traditions": len(traditions),
            "deities": len(deities),
            "facets": len(facets),
            "parallels": len(parallels),
        },
        "defects_total": len(defects),
        "by_severity": dict(collections.Counter(d["severity"] for d in defects)),
        "by_code": dict(collections.Counter(d["code"] for d in defects)),
        "warnings_total": len(warnings),
        "warnings_by_code": dict(collections.Counter(w["code"] for w in warnings)),
        "strength_distribution": dict(strengths),
        "facets_with_scholarly_note": facets_with_note,
    }
    return defects, summary, warnings


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file", help="path to source_map_seed_data_v*.json")
    ap.add_argument("--manifest", help="write full defect list as JSON to this path")
    args = ap.parse_args(argv)

    data = load(args.file)
    defects, summary, warnings = validate(data)

    print(f"# Validation of {args.file}")
    print(f"  counts: {summary['counts']}")
    print(f"  defects: {summary['defects_total']}  "
          f"by severity: {summary['by_severity']}")
    print()
    print("  by code:")
    for code, n in sorted(summary["by_code"].items(),
                          key=lambda kv: -kv[1]):
        print(f"    {n:>4}  {code}")

    if warnings:
        print(f"\n  warnings (advisory, do not fail the build): {len(warnings)}")
        for code, n in sorted(summary["warnings_by_code"].items(),
                              key=lambda kv: -kv[1]):
            print(f"    {n:>4}  {code}")
        for w in warnings:
            # list in full only the small classes; the big ones are in the manifest
            if summary["warnings_by_code"][w["code"]] <= 20:
                print(f"    [{w['code']}] {w['ref']}: {w['detail']}")
        print("    (full list of every warning is in the manifest)")

    # show every SEV1 (these must be fixed); sample the rest
    sev1 = [d for d in defects if d["severity"] == SEV1]
    if sev1:
        print(f"\n  {SEV1} detail ({len(sev1)}):")
        for d in sev1[:60]:
            print(f"    [{d['code']}] {d['ref']}: {d['detail']}")
        if len(sev1) > 60:
            print(f"    ... and {len(sev1) - 60} more (see manifest)")

    if args.manifest:
        with open(args.manifest, "w", encoding="utf-8") as fh:
            json.dump({"summary": summary, "defects": defects,
                       "warnings": warnings}, fh,
                      indent=2, ensure_ascii=False)
        print(f"\n  full manifest written to {args.manifest}")

    has_sev1 = any(d["severity"] == SEV1 for d in defects)
    return 1 if has_sev1 else 0


if __name__ == "__main__":
    sys.exit(main())
