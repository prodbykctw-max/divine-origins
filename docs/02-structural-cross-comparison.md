# Structural Cross-Comparison Methodology

**Purpose:** This document defines the binding methodology for performing structural cross-comparison whenever a new figure is added to the Source Map, when a user asks a parallel question, or when generating new node content. The original spec (`docs/01`) defines *what* the framework is. This document defines *how to apply it consistently*.

Treat this as a binding guideline. Apply it every time the assistant or developer reasons about a deity, divine concept, or cosmological figure.

---

## The core principle

Figures are mapped by **structural function**, not by name, iconography, culture, or surface attributes. Two figures are parallel if they occupy the same cosmological role in their respective systems — not if they sound alike, look alike, or share a domain.

Position on the canvas = cosmological function. Same function = parallel, regardless of tradition.

---

## The methodology (apply in this order)

### Step 1 — Identify the figure's primary function(s)

Ask: what does this being *do* in the cosmic drama? Use these function categories:

- Unmanifest ground / pre-creation substrate
- Head of the divine council / first manifestation
- Craftsman of the material world
- Usurper who claims to be the only god
- Subordinate ruler / planetary power / enforcer
- Wisdom-bringer / liberator / mediator
- Mother / wisdom / fallen-and-redemptive figure
- Dying-rising god / descending savior
- Trickster / boundary-crosser / fire-thief
- Judge / weigher of souls
- Psychopomp / guide between realms

A figure can carry more than one function. Note all of them.

### Step 2 — Assign tier(s)

Map each function to one of the four tiers (or Cross-Tier):

- **Tier 1:** Unmanifest Source
- **Tier 2:** True Most High / Divine Council
- **Tier 3:** Demiurge / flawed creator
- **Tier 4:** Archons / planetary rulers
- **Cross-Tier:** figures who bridge tiers (most light-bringers, most mothers, most dying-rising gods)

If a figure has multiple functions across tiers, it is Cross-Tier by definition. Do not force a single-tier assignment.

### Step 3 — Find parallels by matching function, not surface

For each function the figure carries, find the figure in every other tradition that carries the same function. Use the parallel table in the spec as the starting matrix; extend it for traditions not yet in the table.

Two figures match if:

- They perform the same cosmic act (creating, liberating, ruling, judging, descending, mediating)
- They stand in the same relational position to the council and to humanity
- They generate the same downstream consequences in their mythos

Two figures do **not** match merely because they:

- Share a domain (e.g. both "sky gods")
- Share an animal (e.g. both serpents)
- Share a planet
- Sound phonetically similar
- Are the "chief god" of their pantheon (chief-of-pantheon is not a function; ask which chief function they perform)

### Step 4 — Note split functions

Some functions are carried by one figure in tradition A but split across multiple figures in tradition B. Always note this explicitly.

**Example:** Enki (Mesopotamian) carries both craftsman-of-humanity and liberator-against-council. In Egyptian mythology this splits into Khnum (craftsman/potter) + Thoth (wisdom-bringer). In Greek it mostly consolidates again as Prometheus, but Hermes carries part of the wisdom-mediator function.

When writing a node, list both the consolidated parallel and the split parallels.

### Step 5 — Note inverted readings

The same figure can be read benevolently or malevolently depending on the tradition's stance toward the demiurge. Always flag this.

Examples:

- The Serpent of Eden: villain (orthodox) / liberator (Ophite Gnostic)
- Yahweh: Most High (orthodox Hebrew) / Yaldabaoth (Gnostic)
- Lucifer: usurper-demiurge (Christian) / light-bringer-liberator (some esoteric readings)
- Prometheus: hero (Greek) / parallel to fallen-angel (some Christian readings)

When a figure carries an inverted reading, record both, tagged with the tradition that holds each view.

### Step 6 — Write the node in proponent voice

Per the project's editorial direction: present claims as their proponents would state them, without disclaimers or bias labels in the default mode. The "scholarly mode" toggle (per `docs/03`) surfaces academic caveats; default mode does not.

Each node must include:

- `primary_name`, `alternate_names`, `tradition`, `tier(s)`, `tier_label`
- `function_tags` (using the function categories from Step 1)
- `etymology`
- `primary_sources` (cite actual texts: Nag Hammadi, Enuma Elish, Rig Veda, Edda, Pyramid Texts, etc.)
- `key_claims` (3–6 bullets in proponent voice)
- `parallel_node_ids` (full list across all traditions, by function match — not just the obvious ones)
- `split_parallels` (where the function is divided across multiple figures in another tradition)
- `inverted_readings` (where applicable)
- `cross_tier_relationships`

### Step 7 — When the user asks a comparison question, always:

1. Name the figure's function(s) explicitly
2. State the tier assignment and justify it
3. Walk the parallels tradition by tradition
4. Note splits and inversions
5. Distinguish structural parallels (airtight) from literal/historical claims (contested) — the user should always know which layer you're working in
6. Close with the consolidated picture: "the figure who does X in tradition Y is the same structural role as the figure who does X in traditions A, B, C..."

---

## Traditions to cover (extend the parallel table to all of these)

Already in the spec: Gnostic, Hebrew/OT, Greek/Platonic, Egyptian, Hindu, Norse, Mesopotamian, Hermetic, Kabbalah, Zoroastrian, Buddhist, Taoist.

Add: Canaanite/Ugaritic, Phoenician, Sumerian (distinct from later Babylonian), Yoruba, Vodou, Yoruba-derived diaspora traditions, Aztec/Mexica, Mayan, Inca, Celtic (Irish + Welsh + Gaulish), Slavic, Finnish, Japanese (Shinto + Buddhist), Chinese (Taoist + folk), Korean, Polynesian (Maori, Hawaiian), Aboriginal Australian (where sources permit respectful treatment), Indigenous North American (where sources permit respectful treatment), Tibetan Bon, Jain, Sikh, Bahá'í, Manichaean, Mandaean, Yazidi, Druze, Ismaili esoteric, Sufi (distinct from mainstream Islam), Theosophical synthesis, Anthroposophical, Spiritism, modern channeled material (Law of One, Urantia, etc. — flagged as modern syncretic layer).

---

## Worked example — Enki / Ea

**Function(s):** craftsman-of-humanity + liberator-against-council + wisdom-bringer + flood-warner

**Tier:** Cross-Tier (bridges Tier 2 council and Tier-3-trapped humanity)

**Parallels by function:**

- *Craftsman-of-humanity:* Prometheus (Greek), Khnum (Egyptian), Ptah (Egyptian), Vishvakarma (Hindu), Tvastar (Hindu), Nüwa (Chinese), Obatala (Yoruba), Odin-Vili-Vé (Norse), the Elohim-plural (Hebrew, council reading)
- *Liberator-against-council:* Prometheus (Greek), the Ophite Serpent (Gnostic), Sophia in descent (Gnostic), Christ-Aeon (Gnostic), Loki-as-firebringer (Norse), Thoth (Egyptian), Hermes (Greek), Krishna-as-teacher (Hindu), Khidr (Sufi)

**Splits:** In Egyptian, Enki's combined function splits across Khnum (craftsman) + Thoth (wisdom-bringer). In Hebrew, it splits across the Elohim-plural (council that fashions) + the Nachash/Serpent (wisdom-revealer).

**Inversions:** Enki is uniformly benevolent in Sumerian sources. His structural counterpart Enlil maps to the demiurgic/jealous figure (Yaldabaoth in Gnostic terms, Zeus-tyrant in Greek). The Enki-vs-Enlil dynamic is the same pattern as Prometheus-vs-Zeus and Serpent-vs-Yaldabaoth.

---

## Do not

- Force every figure into a single tier
- Treat the four-tier framework as the only valid lens (it is one interpretive key; the user can disagree, per spec section 8)
- Conflate structural parallels with historical/literal claims
- Add disclaimers in default mode; reserve caveats for scholarly mode
- Skip traditions because they're "minor" — the framework's value is its breadth
- Match figures by name, iconography, or domain alone

## Always

- Lead with function
- Justify tier assignment
- Walk every tradition
- Flag splits and inversions
- Distinguish structural from historical
- Write in proponent voice (default mode)

---

## The goal

Every node in the Source Map is structurally consistent with every other node, so the user can trust that lines drawn on the canvas reflect real functional parallels — not loose associations.

When you receive a request to add a new figure, answer a parallel question, or expand a node, apply this methodology end to end.
