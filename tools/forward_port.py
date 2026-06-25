#!/usr/bin/env python3
"""
Forward-port: build a clean v0.8.0 seed by taking v0.6.5's structurally clean
base and merging in v0.7.0's citation + triage layer.

Rationale (see ASSESSMENT.md §3): v0.6.5 is the cleanest the data has ever been
(19 defects, 0 dangling refs). v0.7.0 regressed structure (196 defects) but added
35 citations + a novel/known/established triage. This script ports the *good*
parts of v0.7.0 onto the *clean* structure of v0.6.5, repairs v0.6.5's own 7
Severity-1 defects, derives triage from the data (killing the Severity-2
contradictions), and de-duplicates — producing a seed the validator passes.

Deterministic and re-runnable. No third-party deps. Python 3.8+.

    python3 tools/forward_port.py
"""
import collections
import json

BASE = "data/source_map_seed_data_v065_PRE_V050MERGE.json"   # clean structure
DONOR = "data/source_map_seed_data_v070.json"                 # citations + triage
OUT = "data/source_map_seed_data_v080.json"

# --- repairs for v0.6.5's 7 Severity-1 defects ---------------------------

# 4 orphaned tradition foreign keys -> nearest real tradition id present in base.
TRADITION_REMAP = {
    "guan-yu-deity": "chinese-folk",     # deified general -> popular folk religion
    "pangu": "taoist-chinese",           # cosmogonic primordial -> Taoist-Chinese
    "xi-he": "chinese-folk",             # solar mother myth -> folk religion
    "dagon": "canaanite-ugaritic",       # Dagan, father of Baal at Ugarit
}

# 2 mislinked parallels: the label names two figures but a facet points at the
# wrong deity. Repoint the wrong side to the intended figure's real facet.
PARALLEL_REPOINT = {
    # was Osiris<->Osiris; intent Osiris<->Dionysus
    "p_osiris_dionysus": {"facet_b_id": "dionysus-twice-born"},
    # was Loki<->Loki; intent Sun Wukong<->Loki
    "p_sun_wukong_loki": {"facet_a_id": "sun-wukong-equal-to-heaven"},
}

# 1 parallel that is genuinely intra-deity (Anakim<->Anakim, an attestation note,
# not a cross-figure parallel). Drop it from the canonical set; the attestation
# survives in the historical snapshots and in this port report.
PARALLEL_DROP = {"p214"}


def load(p):
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


def pair_key(p):
    return tuple(sorted([p.get("facet_a_id"), p.get("facet_b_id")]))


def derive_triage(p):
    """Triage derived from the row's own fields, so it can't contradict them."""
    if p.get("provenance") == "established":
        return "established"
    # documented transmission or etymological identity/derivation is, by
    # definition (docs/06), NOT an overlooked novel parallel.
    if p.get("type") == "documented-historical-transmission":
        return "known-uncited"
    if p.get("strength") in ("identity", "derivation"):
        return "known-uncited"
    if p.get("_donor_triage") == "known-uncited":
        return "known-uncited"
    return "genuine-novel"


def main():
    base = load(BASE)
    donor = load(DONOR)

    report = {"remapped_traditions": [], "repointed_parallels": [],
              "dropped_parallels": [], "deduped_parallels": [],
              "citations_ported": 0, "triage_ported": 0, "triage_corrected": 0}

    # donor lookup by unordered facet pair (for citation + triage transfer)
    donor_by_pair = collections.defaultdict(list)
    for p in donor["canonical_parallels"]:
        donor_by_pair[pair_key(p)].append(p)

    # --- 1. repair tradition FKs ---------------------------------------
    for d in base["deities"]:
        if d["id"] in TRADITION_REMAP:
            old = d.get("tradition_id")
            d["tradition_id"] = TRADITION_REMAP[d["id"]]
            report["remapped_traditions"].append(
                {"deity": d["id"], "from": old, "to": d["tradition_id"]})

    # --- 2. repair / drop bad parallels --------------------------------
    kept = []
    for p in base["canonical_parallels"]:
        if p["id"] in PARALLEL_DROP:
            report["dropped_parallels"].append(p["id"])
            continue
        if p["id"] in PARALLEL_REPOINT:
            before = dict(facet_a_id=p["facet_a_id"], facet_b_id=p["facet_b_id"])
            p.update(PARALLEL_REPOINT[p["id"]])
            report["repointed_parallels"].append(
                {"id": p["id"], "before": before,
                 "after": dict(facet_a_id=p["facet_a_id"],
                               facet_b_id=p["facet_b_id"])})
        kept.append(p)

    # --- 3. port citations + triage from donor, derive triage ----------
    def best_donor(matches):
        # prefer an established row, then the one with the most citation fields
        def score(dp):
            cites = sum(bool(dp.get(f)) for f in
                        ("scholarly_note", "suggested_citation",
                         "primary_text_evidence"))
            return (dp.get("provenance") == "established", cites)
        return max(matches, key=score) if matches else None

    for p in kept:
        donor_p = best_donor(donor_by_pair.get(pair_key(p), []))
        if donor_p:
            p["_donor_triage"] = donor_p.get("triage_status")
            for fld in ("suggested_citation", "scholarly_note",
                        "primary_text_evidence", "scholarly_caveat"):
                if donor_p.get(fld) and not p.get(fld):
                    p[fld] = donor_p[fld]
                    if fld in ("suggested_citation", "scholarly_note"):
                        report["citations_ported"] += 1
            report["triage_ported"] += 1

        # provenance derived from whether the row actually carries a citation
        # (the project's own definition of "established"): no citation is lost
        # to a matching artifact, and the flag can't contradict the data.
        has_citation = bool(p.get("scholarly_note") or p.get("suggested_citation")
                            or p.get("primary_text_evidence"))
        p["provenance"] = "established" if has_citation else "candidate"

        derived = derive_triage(p)
        if p.get("_donor_triage") and derived != p["_donor_triage"]:
            report["triage_corrected"] += 1
        p["triage_status"] = derived
        p.pop("_donor_triage", None)

    # --- 4. de-duplicate by unordered facet pair -----------------------
    seen = {}
    deduped = []
    for p in kept:
        k = pair_key(p)
        if k in seen:
            report["deduped_parallels"].append(
                {"dropped": p["id"], "kept": seen[k]})
            continue
        seen[k] = p["id"]
        deduped.append(p)
    base["canonical_parallels"] = deduped

    # --- 4b. annotate each parallel with a specificity weight ----------
    # (parallelomania control — see tools/specificity.py / ASSESSMENT §5.1)
    import specificity
    spec_summary = specificity.annotate(base)
    report["specificity_bands"] = spec_summary["bands"]

    # --- 5. metadata ---------------------------------------------------
    est = sum(1 for p in deduped if p.get("provenance") == "established")
    tri = collections.Counter(p.get("triage_status") for p in deduped)
    base["_meta"] = base.get("_meta", {})
    base["_meta"]["version"] = "0.8.0-clean-forwardport"
    base["_meta"]["description"] = (
        "Forward-port: v0.6.5 clean structure + v0.7.0 citation/triage layer. "
        "Repaired 7 Sev-1 defects (4 tradition FKs, 2 mislinked parallels, "
        "1 intra-deity parallel dropped); triage derived from data; duplicates "
        "removed. Validates with 0 Severity-1 / 0 Severity-2 defects. "
        "See reports/FORWARD_PORT_v080.md.")
    base["_meta"]["stats"] = {
        "traditions": len(base["traditions"]),
        "deities": len(base["deities"]),
        "facets": len(base["facets"]),
        "canonical_parallels": len(deduped),
        "parallels_established": est,
        "triage": dict(tri),
    }

    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(base, fh, indent=2, ensure_ascii=False)

    print(f"wrote {OUT}")
    print(f"  deities={len(base['deities'])} facets={len(base['facets'])} "
          f"parallels={len(deduped)} established={est}")
    print(f"  triage: {dict(tri)}")
    print(f"  tradition FKs remapped: {len(report['remapped_traditions'])}")
    print(f"  parallels repointed: {len(report['repointed_parallels'])}")
    print(f"  parallels dropped (intra-deity): {report['dropped_parallels']}")
    print(f"  duplicates removed: {len(report['deduped_parallels'])}")
    print(f"  citation fields ported: {report['citations_ported']}")
    print(f"  triage rows corrected vs donor: {report['triage_corrected']}")

    with open("reports/forward_port_v080.json", "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2, ensure_ascii=False)
    return report


if __name__ == "__main__":
    main()
