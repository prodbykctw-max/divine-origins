#!/usr/bin/env python3
"""
Specificity weighting for canonical parallels — the missing methodological piece
(ASSESSMENT.md §5.1 / roadmap P2.8).

The standard objection to comparative-mythology projects is parallelomania: with a
big corpus, *some* figures will always share a function, so a bare "they both do X"
is not evidence. The defense is to weight a parallel by **how rare the shared
function actually is** across the whole dataset. Two figures that share
`great-mother` (82 facets carry it) are a near-universal motif; two that share
`three-headed-serpent-slain` (appears once or twice) are a specific structural
homology.

This tool computes, for each canonical parallel, the inverse-document-frequency
(IDF) of the function-tags the two facets share, and assigns a `specificity_score`
in [0,1] plus a `specificity_band`:

  - specific       — shared tags are rare (top tertile of mean shared IDF)
  - moderate       — shared tags are mid-frequency
  - universal-motif— the only shared tags are common ones (bottom tertile): the
                     parallelomania-risk bucket; review these hardest
  - tag-divergent  — the two facets share NO function-tag; the parallel rests on
                     its `basis` prose, not on tag overlap — a human must verify it

No scholarship is invented: this is a pure statistic over `function_tags`. Used as
an importable annotator by `forward_port.py`, and runnable standalone to refresh
the report.

    python3 tools/specificity.py data/source_map_seed_data_v080.json
"""
import argparse
import collections
import json
import math
import random


def compute_idf(facets):
    """IDF per function-tag across all facets: ln(N / document-frequency)."""
    n = len(facets)
    df = collections.Counter()
    for f in facets:
        for t in set(f.get("function_tags", [])):
            df[t] += 1
    idf = {t: math.log(n / c) for t, c in df.items()}
    return idf, df, n


def annotate(data, n_samples=20000, seed=0):
    """Add specificity_score / specificity_band / specificity_shared_tags plus a
    Monte-Carlo significance test (specificity_pvalue / _z / _significant) to each
    canonical parallel, in place. Seeded, so the output is reproducible. Returns a
    summary dict."""
    facets = data.get("facets", [])
    facet_by_id = {f["id"]: f for f in facets}
    idf, df, n = compute_idf(facets)
    max_idf = math.log(n)  # a tag appearing once

    pars = data.get("canonical_parallels", [])

    # First pass: mean shared IDF for parallels that share >=1 tag.
    means = []
    rows = []
    for p in pars:
        a = facet_by_id.get(p.get("facet_a_id"))
        b = facet_by_id.get(p.get("facet_b_id"))
        if not a or not b:
            rows.append((p, None, []))
            continue
        shared = sorted(set(a.get("function_tags", [])) & set(b.get("function_tags", [])))
        if shared:
            mean_idf = sum(idf[t] for t in shared) / len(shared)
            means.append(mean_idf)
            rows.append((p, mean_idf, shared))
        else:
            rows.append((p, 0.0, []))  # tag-divergent

    # Tertile thresholds over the shared-tag parallels only.
    means_sorted = sorted(means)
    def pct(q):
        if not means_sorted:
            return 0.0
        idx = min(len(means_sorted) - 1, int(q * len(means_sorted)))
        return means_sorted[idx]
    lo, hi = pct(1 / 3), pct(2 / 3)

    bands = collections.Counter()
    for p, mean_idf, shared in rows:
        if not shared:
            score = 0.0
            band = "tag-divergent"
        else:
            score = round(mean_idf / max_idf, 3)  # 0..1
            if mean_idf >= hi:
                band = "specific"
            elif mean_idf >= lo:
                band = "moderate"
            else:
                band = "universal-motif"
        p["specificity_score"] = score
        p["specificity_band"] = band
        p["specificity_shared_tags"] = shared
        p["_shared_idf_total"] = sum(idf[t] for t in shared)  # test statistic
        bands[band] += 1

    # --- randomized null model (Monte-Carlo significance test) ----------
    # Question per parallel: is the rarity of the function-tags these two facets
    # share greater than two *random* facets would share by chance? We build a
    # null distribution of the test statistic (summed IDF of shared tags) from
    # many random facet pairs, then give each real parallel a one-sided p-value.
    # A `universal-motif` parallel should come out non-significant (its sharing is
    # chance-level); a `specific` one significant. Seeded for reproducibility.
    tag_sets = [set(f.get("function_tags", [])) for f in facets]
    rng = random.Random(seed)
    null = []
    if len(tag_sets) >= 2:
        for _ in range(n_samples):
            i = rng.randrange(len(tag_sets))
            j = rng.randrange(len(tag_sets))
            if i == j:
                continue
            shared_ij = tag_sets[i] & tag_sets[j]
            # sum in sorted order: float addition isn't associative and set
            # iteration order varies per process (hash randomization), which would
            # otherwise make the p-values non-reproducible across runs.
            null.append(sum(idf[t] for t in sorted(shared_ij)))
    null.sort()
    null_n = len(null) or 1
    mean_null = sum(null) / null_n
    var_null = sum((x - mean_null) ** 2 for x in null) / null_n
    std_null = math.sqrt(var_null) or 1.0

    def p_ge(obs):
        # fraction of null >= obs, via binary search on sorted null; add-one smoothed
        lo_i, hi_i = 0, len(null)
        while lo_i < hi_i:
            mid = (lo_i + hi_i) // 2
            if null[mid] < obs:
                lo_i = mid + 1
            else:
                hi_i = mid
        ge = len(null) - lo_i
        return (1 + ge) / (1 + len(null))

    sig = 0
    for p in pars:
        obs = p.pop("_shared_idf_total", 0.0)
        pv = round(p_ge(obs), 4)
        p["specificity_pvalue"] = pv
        p["specificity_z"] = round((obs - mean_null) / std_null, 2)
        p["specificity_significant"] = pv < 0.05
        if p["specificity_significant"]:
            sig += 1

    return {
        "facets": n,
        "parallels": len(pars),
        "bands": dict(bands),
        "tertile_lo_idf": round(lo, 3),
        "tertile_hi_idf": round(hi, 3),
        "null_samples": len(null),
        "null_mean_idf": round(mean_null, 3),
        "significant_p05": sig,
        "idf": idf,
        "df": df,
    }


def write_report(data, summary, path):
    pars = data["canonical_parallels"]
    facet_by_id = {f["id"]: f for f in data["facets"]}
    deity_by_id = {d["id"]: d for d in data["deities"]}

    def label(fid):
        f = facet_by_id.get(fid)
        if not f:
            return fid
        d = deity_by_id.get(f.get("parent_deity_id"))
        return f"{(d or {}).get('primary_name', fid)} ({f.get('facet_name')})"

    ranked = sorted(pars, key=lambda p: p.get("specificity_score", 0), reverse=True)
    universal = [p for p in pars if p.get("specificity_band") == "universal-motif"]
    divergent = [p for p in pars if p.get("specificity_band") == "tag-divergent"]

    L = []
    w = L.append
    w("# Parallel Specificity Report — v0.8.0")
    w("")
    w("Generated by `tools/specificity.py`. Weights each canonical parallel by how")
    w("**rare** the function-tags its two facets share are across the whole corpus")
    w("(IDF). This is the parallelomania control: a shared *common* motif is weak; a")
    w("shared *rare* structure is strong. Pure statistic over `function_tags` — no")
    w("scholarship invented.")
    w("")
    w(f"**Corpus:** {summary['facets']} facets · {summary['parallels']} parallels  ")
    w(f"**Bands:** " + " · ".join(f"{k}: {v}" for k, v in sorted(summary['bands'].items())))
    w("")
    w("## Significance — randomized null model")
    w("")
    w(f"A Monte-Carlo test ({summary.get('null_samples', 0):,} random facet pairs, "
      f"seeded) asks, per parallel: do these two figures share *rarer* function-tags "
      f"than two **random** figures would by chance? Two random facets usually share "
      f"nothing (null mean shared-IDF ≈ {summary.get('null_mean_idf', 0)}), so a real "
      f"shared structure stands out.")
    w("")
    w(f"**{summary.get('significant_p05', 0)} / {summary['parallels']} parallels are "
      f"significant at p < 0.05** (their tag-sharing beats chance). The rest — the "
      f"`tag-divergent` set plus any `universal-motif` parallel whose only shared tag "
      f"is common enough to arise randomly — are **not** statistically distinguishable "
      f"from two random figures, and are exactly the claims a reviewer would attack.")
    w("")
    w("Notable non-significant parallels carry `specificity_significant: false` in the")
    w("seed; see the per-parallel `specificity_pvalue` / `specificity_z` fields and the")
    w("JSON sidecar for the full list.")
    w("")
    w("| Band | Meaning |")
    w("|---|---|")
    w("| `specific` | Shared tags are rare — strongest structural homology |")
    w("| `moderate` | Shared tags are mid-frequency |")
    w("| `universal-motif` | Only common tags shared — **parallelomania risk; review hardest** |")
    w("| `tag-divergent` | No shared tag — rests on `basis` prose; needs human verification |")
    w("")
    w("## Most specific parallels (top 20 — your most defensible)")
    w("")
    w("| Score | Parallel | Shared rare tags |")
    w("|---:|---|---|")
    for p in ranked[:20]:
        w(f"| {p['specificity_score']:.3f} | {label(p['facet_a_id'])} ↔ {label(p['facet_b_id'])} "
          f"| {', '.join(p.get('specificity_shared_tags', [])) or '—'} |")
    w("")
    w(f"## Universal-motif parallels ({len(universal)}) — weakest; review these first")
    w("")
    w("These share only common tags. Each needs either a more specific structural")
    w("claim or honest demotion. This is the list a hostile reviewer would attack.")
    w("")
    w("| Score | Parallel | Shared (common) tags |")
    w("|---:|---|---|")
    for p in sorted(universal, key=lambda p: p.get("specificity_score", 0)):
        w(f"| {p['specificity_score']:.3f} | {label(p['facet_a_id'])} ↔ {label(p['facet_b_id'])} "
          f"| {', '.join(p.get('specificity_shared_tags', [])) or '—'} |")
    w("")
    w(f"## Tag-divergent parallels ({len(divergent)}) — assert structure with no shared tag")
    w("")
    w("Not necessarily wrong (vocabulary differs for the same structure), but each")
    w("is unverified by the tag layer and must be checked against its `basis`.")
    w("")
    w("| Parallel | Type | Strength |")
    w("|---|---|---|")
    for p in divergent[:40]:
        w(f"| {label(p['facet_a_id'])} ↔ {label(p['facet_b_id'])} | {p.get('type','')} | {p.get('strength','')} |")
    if len(divergent) > 40:
        w(f"| … and {len(divergent)-40} more (see JSON) | | |")
    w("")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L))


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file", help="canonical seed JSON to annotate in place")
    ap.add_argument("--report", default="reports/SPECIFICITY_v080.md")
    ap.add_argument("--json", default="reports/specificity_v080.json")
    ap.add_argument("--no-write", action="store_true",
                    help="compute + report but do not write scores back into the seed")
    args = ap.parse_args(argv)

    with open(args.file, encoding="utf-8") as fh:
        data = json.load(fh)
    summary = annotate(data)
    write_report(data, summary, args.report)

    # machine-readable: scores per parallel + the tag IDF table
    out = {
        "summary": {k: summary[k] for k in ("facets", "parallels", "bands",
                                            "tertile_lo_idf", "tertile_hi_idf",
                                            "null_samples", "null_mean_idf",
                                            "significant_p05")},
        "tag_idf": {t: round(v, 3) for t, v in sorted(summary["idf"].items(),
                                                      key=lambda kv: -kv[1])},
        "parallels": [{"id": p["id"], "score": p["specificity_score"],
                       "band": p["specificity_band"],
                       "shared": p["specificity_shared_tags"],
                       "pvalue": p["specificity_pvalue"],
                       "z": p["specificity_z"],
                       "significant": p["specificity_significant"]}
                      for p in data["canonical_parallels"]],
    }
    with open(args.json, "w", encoding="utf-8") as fh:
        json.dump(out, fh, indent=2, ensure_ascii=False)

    if not args.no_write:
        with open(args.file, "w", encoding="utf-8") as fh:
            json.dump(data, fh, indent=2, ensure_ascii=False)

    print(f"specificity: {summary['bands']}")
    print(f"  wrote {args.report} and {args.json}"
          + ("" if args.no_write else f"; annotated {args.file}"))


if __name__ == "__main__":
    main()
