#!/usr/bin/env python3
"""
Self-test for The Source Map specification package.

Validates:
  1. All six expected docs exist.
  2. Cross-references between docs resolve (docs/0X mentions are real files).
  3. Each doc has the expected top-level structure (heading, purpose section).
  4. Required terms appear in the expected docs (no doc is missing its core content).
  5. JSON code blocks parse cleanly (schemas in markdown are valid JSON).
  6. The master prompt references all six docs.
  7. The README references all six docs.
  8. Bibliography in docs/03 contains the expected scholars.
  9. Practice families in docs/04 match across description and schema.
 10. Evidence types in docs/06 match between the eight-types section and the filter section.

Run from repo root:
  python3 scripts/self_test.py
"""

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DOCS = REPO_ROOT / "docs"
METHODOLOGY = REPO_ROOT / "methodology"
README = REPO_ROOT / "README.md"

EXPECTED_DOCS = [
    "01-comparative-cosmology-spec.md",
    "02-structural-cross-comparison.md",
    "03-scholarly-mode.md",
    "04-practices-layer.md",
    "05-personal-layer-and-my-map.md",
    "06-connection-evidence-schema.md",
]

REQUIRED_TERMS_PER_DOC = {
    "01-comparative-cosmology-spec.md": [
        "Tier 1", "Tier 2", "Tier 3", "Tier 4", "Cross-tier",
        "Monad", "Yaldabaoth", "Sophia",
        "Ein Sof", "Brahman", "Tao",
        "El Elyon", "Anu",
        "Marduk", "Enlil",
        "Seven Archons",
        "Data model", "Parallel table", "Initial node list",
        "Source Map",
    ],
    "02-structural-cross-comparison.md": [
        "structural function", "Cross-Tier",
        "Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7",
        "Enki", "Prometheus",
        "splits", "Inversions",
        "proponent voice",
    ],
    "03-scholarly-mode.md": [
        "Source-critical caveat",
        "Interpretive-move caveat",
        "Tradition-internal caveat",
        "Methodological-lineage caveat",
        "Contested-identification caveat",
        "Modern-syncretic-layer caveat",
        "Hanegraaff", "Karen King", "Mark S. Smith", "Steven Katz",
        "Standing caveat 1", "Standing caveat 2", "Standing caveat 3", "Standing caveat 4",
    ],
    "04-practices-layer.md": [
        "contemplative", "Devotional", "Theurgy",
        "Gnosis", "Embodied", "Ethical", "Direct transmission",
        "hesychasm", "zazen", "fana", "atma-vichara",
        "bhakti", "karma yoga",
        "Data schema", "practice family",
    ],
    "05-personal-layer-and-my-map.md": [
        "overlay", "Forking", "Published",
        "Canonical", "My Map", "Scholarly",
        "user-proposed",
        "export", "import",
    ],
    "06-connection-evidence-schema.md": [
        "structural-function-match",
        "narrative-pattern-match",
        "documented-historical-transmission",
        "etymological-link",
        "iconographic-parallel",
        "ritual-practice-parallel",
        "modern-syncretic-identification",
        "personal-resonance",
        "strength", "tentative", "working", "confident",
    ],
}

PRACTICE_FAMILIES = [
    "contemplative-quieting",
    "devotional-union",
    "theurgy",
    "gnosis-through-knowledge",
    "embodied-energetic",
    "ethical-service",
    "direct-transmission",
]

EVIDENCE_TYPES = [
    "structural-function-match",
    "narrative-pattern-match",
    "documented-historical-transmission",
    "etymological-link",
    "iconographic-parallel",
    "ritual-practice-parallel",
    "modern-syncretic-identification",
    "personal-resonance",
]

# ────────────────────────────────────────────────────────────────────
# Test infrastructure
# ────────────────────────────────────────────────────────────────────

PASS = "\033[92m✓\033[0m"
FAIL = "\033[91m✗\033[0m"
WARN = "\033[93m!\033[0m"

results = []


def t(name, condition, detail=""):
    status = PASS if condition else FAIL
    results.append((name, bool(condition), detail))
    line = f"  {status} {name}"
    if detail and not condition:
        line += f"\n      → {detail}"
    print(line)
    return condition


def section(title):
    print(f"\n── {title} ──")


# ────────────────────────────────────────────────────────────────────
# Tests
# ────────────────────────────────────────────────────────────────────

def test_files_exist():
    section("File existence")
    t("repo root exists", REPO_ROOT.exists(), str(REPO_ROOT))
    t("docs/ exists", DOCS.exists())
    t("methodology/ exists", METHODOLOGY.exists())
    t("README.md exists", README.exists())
    for d in EXPECTED_DOCS:
        t(f"docs/{d} exists", (DOCS / d).exists())
    t("methodology/master-prompt.md exists",
      (METHODOLOGY / "master-prompt.md").exists())


def test_cross_references():
    section("Cross-references between docs")
    # Each doc except 01 should reference at least docs/01.
    for d in EXPECTED_DOCS[1:]:
        body = (DOCS / d).read_text()
        t(f"{d} references docs/01",
          "docs/01" in body or "comparative-cosmology-spec" in body)
    # docs/01 should reference 03 and 04 (per the section 8 notes).
    body01 = (DOCS / "01-comparative-cosmology-spec.md").read_text()
    t("docs/01 references docs/03", "docs/03" in body01)
    t("docs/01 references docs/04", "docs/04" in body01)


def test_master_prompt_references_all_docs():
    section("Master prompt completeness")
    body = (METHODOLOGY / "master-prompt.md").read_text()
    for d in EXPECTED_DOCS:
        t(f"master-prompt references {d}", d in body)


def test_readme_references_all_docs():
    section("README completeness")
    body = README.read_text()
    for d in EXPECTED_DOCS:
        t(f"README references {d}", d in body)


def test_required_terms():
    section("Required-term coverage per doc")
    for d, terms in REQUIRED_TERMS_PER_DOC.items():
        body = (DOCS / d).read_text()
        missing = [term for term in terms if term not in body]
        t(f"{d} contains all {len(terms)} required terms",
          not missing,
          f"missing: {missing}" if missing else "")


def test_json_blocks_parse():
    section("JSON code blocks parse")
    # Pull every ```json ... ``` block from each doc and try to parse it.
    json_pattern = re.compile(r"```json\n(.*?)```", re.DOTALL)
    for d in EXPECTED_DOCS:
        body = (DOCS / d).read_text()
        blocks = json_pattern.findall(body)
        if not blocks:
            continue
        for i, block in enumerate(blocks):
            try:
                json.loads(block)
                t(f"{d} JSON block #{i+1} parses", True)
            except json.JSONDecodeError as e:
                t(f"{d} JSON block #{i+1} parses", False, str(e))


def test_practice_families_consistent():
    section("Practice families consistency (docs/04)")
    body = (DOCS / "04-practices-layer.md").read_text()
    for family in PRACTICE_FAMILIES:
        t(f"practice family '{family}' is referenced", family in body)


def test_evidence_types_consistent():
    section("Evidence types consistency (docs/06)")
    body = (DOCS / "06-connection-evidence-schema.md").read_text()
    for etype in EVIDENCE_TYPES:
        # Each evidence type should appear at least twice:
        # once as a section header, once in the filter logic / schema.
        count = body.count(etype)
        t(f"evidence type '{etype}' appears at least twice (got {count})",
          count >= 2,
          f"only {count} occurrences" if count < 2 else "")


def test_tier_definitions_unique():
    section("Tier definitions in docs/01")
    body = (DOCS / "01-comparative-cosmology-spec.md").read_text()
    # Each tier should be defined exactly once at a heading level.
    for tier in ["TIER 1", "TIER 2", "TIER 3", "TIER 4"]:
        count = body.count(f"### {tier}")
        t(f"{tier} has exactly one section header", count == 1,
          f"got {count}")


def test_node_examples_present():
    section("Node example presence (docs/01 section 6)")
    body = (DOCS / "01-comparative-cosmology-spec.md").read_text()
    for node in ["Node: The Monad", "Node: Yaldabaoth", "Node: Sophia"]:
        t(f"sample node write-up '{node}' present", node in body)


def test_schemas_have_required_fields():
    section("Node schema completeness")
    body = (DOCS / "01-comparative-cosmology-spec.md").read_text()
    json_pattern = re.compile(r"```json\n(.*?)```", re.DOTALL)
    blocks = json_pattern.findall(body)
    found_valid_node = False
    required_fields = {
        "id", "primary_name", "alternate_names", "tradition",
        "tier", "function_tags", "etymology", "primary_sources",
        "key_claims", "parallel_node_ids", "cross_tier_relationships",
    }
    for block in blocks:
        try:
            obj = json.loads(block)
            if isinstance(obj, dict) and "primary_name" in obj:
                missing = required_fields - set(obj.keys())
                t(f"node schema example contains all required fields",
                  not missing,
                  f"missing: {missing}" if missing else "")
                found_valid_node = True
                break
        except json.JSONDecodeError:
            continue
    if not found_valid_node:
        t("at least one node-shaped JSON block found in docs/01", False)


def test_seven_function_categories_in_methodology():
    section("Function categories in docs/02")
    body = (DOCS / "02-structural-cross-comparison.md").read_text()
    function_categories = [
        "Unmanifest ground",
        "Head of the divine council",
        "Craftsman of the material world",
        "Usurper",
        "Subordinate ruler",
        "Wisdom-bringer",
        "Mother / wisdom",
        "Dying-rising god",
        "Trickster",
        "Judge",
        "Psychopomp",
    ]
    for cat in function_categories:
        t(f"function category '{cat}' present", cat in body)


def test_no_broken_internal_markdown_links():
    section("Internal markdown link integrity")
    # Look for [text](path) references and check that paths exist.
    link_pattern = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
    for d in EXPECTED_DOCS + ["README.md"]:
        path = README if d == "README.md" else (DOCS / d)
        body = path.read_text()
        links = link_pattern.findall(body)
        for label, target in links:
            # Skip external links.
            if target.startswith("http") or target.startswith("#") or target.startswith("mailto:"):
                continue
            # Resolve relative paths.
            doc_dir = path.parent
            resolved = (doc_dir / target).resolve()
            t(f"link '{label}' → '{target}' in {d} resolves",
              resolved.exists(),
              f"resolved to {resolved}")


def test_methodology_steps_complete():
    section("docs/02 methodology has all 7 steps")
    body = (DOCS / "02-structural-cross-comparison.md").read_text()
    for i in range(1, 8):
        t(f"Step {i} present", f"### Step {i}" in body)


def test_caveat_types_complete():
    section("docs/03 has all 6 caveat types")
    body = (DOCS / "03-scholarly-mode.md").read_text()
    for i in range(1, 7):
        t(f"caveat type {i} present", f"### {i}." in body)


def test_practice_family_count():
    section("docs/04 has all 7 practice families")
    body = (DOCS / "04-practices-layer.md").read_text()
    for i in range(1, 8):
        t(f"Family {i} present", f"### Family {i}" in body)


def test_summary():
    section("Summary")
    total = len(results)
    passed = sum(1 for _, ok, _ in results if ok)
    failed = total - passed
    print(f"\n  {passed}/{total} tests passed.")
    if failed:
        print(f"  {failed} FAILED:")
        for name, ok, detail in results:
            if not ok:
                print(f"    - {name}")
                if detail:
                    print(f"        {detail}")
        return 1
    print("  ALL GREEN.")
    return 0


def main():
    print("\n╭─────────────────────────────────────────────╮")
    print("│  The Source Map — spec package self-test    │")
    print("╰─────────────────────────────────────────────╯")
    test_files_exist()
    test_cross_references()
    test_master_prompt_references_all_docs()
    test_readme_references_all_docs()
    test_required_terms()
    test_json_blocks_parse()
    test_practice_families_consistent()
    test_evidence_types_consistent()
    test_tier_definitions_unique()
    test_node_examples_present()
    test_schemas_have_required_fields()
    test_seven_function_categories_in_methodology()
    test_no_broken_internal_markdown_links()
    test_methodology_steps_complete()
    test_caveat_types_complete()
    test_practice_family_count()
    return test_summary()


if __name__ == "__main__":
    sys.exit(main())
