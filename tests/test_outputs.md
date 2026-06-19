# Self-Test Results

This file is the canonical record of the most recent self-test run against the spec package. Re-run with:

```
python3 scripts/self_test.py
```

## Last run output

```

╭─────────────────────────────────────────────╮
│  The Source Map — spec package self-test    │
╰─────────────────────────────────────────────╯

── File existence ──
  ✓ repo root exists
  ✓ docs/ exists
  ✓ methodology/ exists
  ✓ README.md exists
  ✓ docs/01-comparative-cosmology-spec.md exists
  ✓ docs/02-structural-cross-comparison.md exists
  ✓ docs/03-scholarly-mode.md exists
  ✓ docs/04-practices-layer.md exists
  ✓ docs/05-personal-layer-and-my-map.md exists
  ✓ docs/06-connection-evidence-schema.md exists
  ✓ methodology/master-prompt.md exists

── Cross-references between docs ──
  ✓ 02-structural-cross-comparison.md references docs/01
  ✓ 03-scholarly-mode.md references docs/01
  ✓ 04-practices-layer.md references docs/01
  ✓ 05-personal-layer-and-my-map.md references docs/01
  ✓ 06-connection-evidence-schema.md references docs/01
  ✓ docs/01 references docs/03
  ✓ docs/01 references docs/04

── Master prompt completeness ──
  ✓ master-prompt references 01-comparative-cosmology-spec.md
  ✓ master-prompt references 02-structural-cross-comparison.md
  ✓ master-prompt references 03-scholarly-mode.md
  ✓ master-prompt references 04-practices-layer.md
  ✓ master-prompt references 05-personal-layer-and-my-map.md
  ✓ master-prompt references 06-connection-evidence-schema.md

── README completeness ──
  ✓ README references 01-comparative-cosmology-spec.md
  ✓ README references 02-structural-cross-comparison.md
  ✓ README references 03-scholarly-mode.md
  ✓ README references 04-practices-layer.md
  ✓ README references 05-personal-layer-and-my-map.md
  ✓ README references 06-connection-evidence-schema.md

── Required-term coverage per doc ──
  ✓ 01-comparative-cosmology-spec.md contains all 20 required terms
  ✓ 02-structural-cross-comparison.md contains all 14 required terms
  ✓ 03-scholarly-mode.md contains all 14 required terms
  ✓ 04-practices-layer.md contains all 15 required terms
  ✓ 05-personal-layer-and-my-map.md contains all 9 required terms
  ✓ 06-connection-evidence-schema.md contains all 12 required terms

── JSON code blocks parse ──
  ✓ 01-comparative-cosmology-spec.md JSON block #1 parses
  ✓ 04-practices-layer.md JSON block #1 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #1 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #2 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #3 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #4 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #5 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #6 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #7 parses
  ✓ 05-personal-layer-and-my-map.md JSON block #8 parses
  ✓ 06-connection-evidence-schema.md JSON block #1 parses
  ✓ 06-connection-evidence-schema.md JSON block #2 parses

── Practice families consistency (docs/04) ──
  ✓ practice family 'contemplative-quieting' is referenced
  ✓ practice family 'devotional-union' is referenced
  ✓ practice family 'theurgy' is referenced
  ✓ practice family 'gnosis-through-knowledge' is referenced
  ✓ practice family 'embodied-energetic' is referenced
  ✓ practice family 'ethical-service' is referenced
  ✓ practice family 'direct-transmission' is referenced

── Evidence types consistency (docs/06) ──
  ✓ evidence type 'structural-function-match' appears at least twice (got 6)
  ✓ evidence type 'narrative-pattern-match' appears at least twice (got 3)
  ✓ evidence type 'documented-historical-transmission' appears at least twice (got 4)
  ✓ evidence type 'etymological-link' appears at least twice (got 2)
  ✓ evidence type 'iconographic-parallel' appears at least twice (got 2)
  ✓ evidence type 'ritual-practice-parallel' appears at least twice (got 2)
  ✓ evidence type 'modern-syncretic-identification' appears at least twice (got 3)
  ✓ evidence type 'personal-resonance' appears at least twice (got 6)

── Tier definitions in docs/01 ──
  ✓ TIER 1 has exactly one section header
  ✓ TIER 2 has exactly one section header
  ✓ TIER 3 has exactly one section header
  ✓ TIER 4 has exactly one section header

── Node example presence (docs/01 section 6) ──
  ✓ sample node write-up 'Node: The Monad' present
  ✓ sample node write-up 'Node: Yaldabaoth' present
  ✓ sample node write-up 'Node: Sophia' present

── Node schema completeness ──
  ✓ node schema example contains all required fields

── Function categories in docs/02 ──
  ✓ function category 'Unmanifest ground' present
  ✓ function category 'Head of the divine council' present
  ✓ function category 'Craftsman of the material world' present
  ✓ function category 'Usurper' present
  ✓ function category 'Subordinate ruler' present
  ✓ function category 'Wisdom-bringer' present
  ✓ function category 'Mother / wisdom' present
  ✓ function category 'Dying-rising god' present
  ✓ function category 'Trickster' present
  ✓ function category 'Judge' present
  ✓ function category 'Psychopomp' present

── Internal markdown link integrity ──

── docs/02 methodology has all 7 steps ──
  ✓ Step 1 present
  ✓ Step 2 present
  ✓ Step 3 present
  ✓ Step 4 present
  ✓ Step 5 present
  ✓ Step 6 present
  ✓ Step 7 present

── docs/03 has all 6 caveat types ──
  ✓ caveat type 1 present
  ✓ caveat type 2 present
  ✓ caveat type 3 present
  ✓ caveat type 4 present
  ✓ caveat type 5 present
  ✓ caveat type 6 present

── docs/04 has all 7 practice families ──
  ✓ Family 1 present
  ✓ Family 2 present
  ✓ Family 3 present
  ✓ Family 4 present
  ✓ Family 5 present
  ✓ Family 6 present
  ✓ Family 7 present

── Summary ──

  102/102 tests passed.
  ALL GREEN.

```
