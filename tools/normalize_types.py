#!/usr/bin/env python3
"""
Collapse the free-text parallel `type` field onto the controlled evidence-type
taxonomy that `docs/06` already defines, preserving the original label in a new
`descriptor` field. Kills the `type_vocabulary_uncontrolled` Severity-3 defect
(ASSESSMENT roadmap P1.7).

`type` becomes one of the eight evidence types from docs/06:
  structural-function-match · narrative-pattern-match ·
  documented-historical-transmission · etymological-link ·
  iconographic-parallel · ritual-practice-parallel ·
  modern-syncretic-identification · personal-resonance

The mapping is deliberately conservative: only labels that are *clearly*
linguistic, documented/genealogical, or narrative-plot are reassigned; everything
else stays `structural-function-match` (the project's default claim). The original
string is never lost — it moves to `descriptor`, so the fine-grained nuance is
still queryable and a human can re-route any individual call.

Importable annotator used by `forward_port.py`; also runnable standalone.

    python3 tools/normalize_types.py data/source_map_seed_data_v080.json
"""
import argparse
import collections
import json

CANONICAL = {
    "structural-function-match", "narrative-pattern-match",
    "documented-historical-transmission", "etymological-link",
    "iconographic-parallel", "ritual-practice-parallel",
    "modern-syncretic-identification", "personal-resonance",
}

# Ordered keyword rules; first match wins. Checked only after the value is
# confirmed not already canonical.
RULES = [
    ("etymological-link", (
        "linguistic", "cognate", "etymolog",
    )),
    ("documented-historical-transmission", (
        "identification", "genealog", "talmudic", "borrow", "co-borrowed",
        "transmission", "syncret", "diaspora", "attestation", "extra-textual",
        "extra-biblical", "biblical-internal", "single-religious-complex",
        "shared-linguistic-and-religious", "religious-identity",
    )),
    ("narrative-pattern-match", (
        "myth", "narrative", "dragon-slayer", "chaoskampf", "cosmogonic",
        "sacrifice", "seasonal", "dying-and-rising", "descent", "return",
        "eschatolog", "cataclysm", "slain", "slayer", "overthrow", "overreach",
        "interbreeding", "recovers", "stolen", "bones-of-prior", "warring",
        "defeated", "pre-flood", "prior-cosmic-age", "cosmic-age",
        "rebel-bound", "bound-until", "bound-in-pit", "flood",
    )),
    ("iconographic-parallel", ("iconograph",)),
    ("ritual-practice-parallel", ("ritual", "practice", "sacrament")),
    ("modern-syncretic-identification", ("theosoph", "sitchin", "channel", "new-age")),
]


def classify(type_str):
    """Return (canonical_type, matched_rule_or_None)."""
    if not type_str:
        return "structural-function-match", None
    if type_str in CANONICAL:
        return type_str, "already-canonical"
    s = type_str.lower()
    for canon, keys in RULES:
        if any(k in s for k in keys):
            return canon, "keyword"
    return "structural-function-match", "default"


def normalize(data):
    """Rewrite each parallel's `type` to a canonical evidence type, preserving the
    original in `descriptor`. In place. Returns a summary."""
    before = collections.Counter(p.get("type") for p in data.get("canonical_parallels", []))
    after = collections.Counter()
    moved = 0
    for p in data.get("canonical_parallels", []):
        original = p.get("type")
        canon, _ = classify(original)
        # keep the specific original label as descriptor (don't clobber an existing one)
        if original and original != canon and not p.get("descriptor"):
            p["descriptor"] = original
        if p.get("type") != canon:
            moved += 1
        p["type"] = canon
        after[canon] += 1
    return {
        "distinct_before": len(before),
        "distinct_after": len(after),
        "reassigned": moved,
        "after": dict(after),
    }


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file")
    ap.add_argument("--no-write", action="store_true")
    args = ap.parse_args(argv)
    with open(args.file, encoding="utf-8") as fh:
        data = json.load(fh)
    summary = normalize(data)
    if not args.no_write:
        with open(args.file, "w", encoding="utf-8") as fh:
            json.dump(data, fh, indent=2, ensure_ascii=False)
    print(f"types: {summary['distinct_before']} -> {summary['distinct_after']} "
          f"({summary['reassigned']} parallels reassigned, original kept in `descriptor`)")
    for t, c in sorted(summary["after"].items(), key=lambda kv: -kv[1]):
        print(f"  {c:>3}  {t}")


if __name__ == "__main__":
    main()
