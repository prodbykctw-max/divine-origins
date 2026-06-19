# Connection-Evidence Schema

**Purpose:** When a user draws a line between two nodes (per `docs/05`), the line carries metadata describing *why* the user sees a parallel. This document defines the evidence types, the schema, and the conventions for assigning them — so that both the user and any future viewer of the map can tell whether a connection is a rigorous structural parallel, a documented historical transmission, a personal intuition, or something else. It extends the base data model in `docs/01` section 3 with typed connection metadata.

The same schema is used by project curators when adding lines to the canonical base map. Every line, user-drawn or canonical, is typed.

---

## Why evidence typing matters

A loose comparative map quickly becomes unreadable: every node is connected to every other node and the user can't tell which connections are well-grounded and which are speculative. Without evidence typing, the Source Map devolves into free association.

With evidence typing, the user can:

- Filter the canvas to show *only* structural-function parallels (the airtight comparative claims)
- Or *only* documented historical transmissions (the genealogical evidence)
- Or surface their own intuitions (the personal lines they want to test)
- Distinguish at a glance between "scholars agree this is parallel" and "I feel a resonance here"

This is the difference between a serious tool and a Pinterest board.

---

## The eight evidence types

Every connection line carries **one or more** evidence types. Multi-typed lines are common and welcome — they indicate stronger parallels.

### 1. `structural-function-match`

The two figures perform the same cosmological function as defined in `docs/02`. This is the strongest typological claim available and the spine of the Source Map.

**Example:** Sophia ↔ Shekhinah (both: fallen-and-redemptive feminine wisdom, exiled into matter, recoverable through gnosis).

**Required field:** `function_tags_shared` — the explicit function tags both nodes carry.

### 2. `narrative-pattern-match`

The two figures appear in narratives with the same plot structure: same antagonist, same act, same consequence. Distinct from structural-function-match because narrative pattern can hold even when the figures occupy different cosmological tiers.

**Example:** Prometheus stealing fire from Zeus and being chained to a rock ↔ the Ophite Serpent giving Eve fruit and being cursed by Yahweh.

**Required field:** `narrative_elements_shared` — list the matching plot beats.

### 3. `documented-historical-transmission`

There is documented evidence that one tradition borrowed, inherited, or directly absorbed the figure or motif from the other. This is the strongest *genealogical* claim available.

**Example:** Mesopotamian Atrahasis flood narrative ↔ Hebrew Noah narrative — the textual dependence is documented and consensus among Assyriologists and biblical scholars.

**Required field:** `transmission_evidence` — citation of the scholarly source(s) establishing transmission.

### 4. `etymological-link`

The two figures' names are demonstrably linguistically related, or one figure's name derives from the other's.

**Example:** Roman Mercurius ↔ Greek Hermes (direct interpretatio romana, documented).

**Required field:** `linguistic_basis` — the philological evidence.

**Caution:** Loose phonetic similarity ("the name sounds like...") does NOT qualify. Only documented derivation or attested cognate status.

### 5. `iconographic-parallel`

The two figures share specific visual or symbolic attributes (animal forms, ritual objects, gestures) in their respective iconographic traditions.

**Example:** Hermes's caduceus ↔ Mesopotamian Ningishzida's serpent-staff ↔ the Hindu kundalini diagram.

**Required field:** `iconographic_elements_shared` — list the matching visual elements.

**Caution:** Iconographic parallels are suggestive but weak on their own. They become significant when combined with structural-function-match or documented-historical-transmission.

### 6. `ritual-practice-parallel`

The two figures are addressed through analogous ritual practices in their respective traditions — same gestures, same offerings, same liturgical functions.

**Example:** The Egyptian opening-of-the-mouth ritual ↔ certain Tibetan Buddhist consecration rites for statues.

**Required field:** `practice_elements_shared` — list the matching ritual elements.

### 7. `modern-syncretic-identification`

The two figures are identified with each other in a modern syncretic or esoteric tradition (Theosophy, Traditionalism, Sitchin, Law of One, Jungian comparative work, modern Pagan reconstructions, etc.), but the identification is not present in pre-modern sources.

**Example:** The Theosophical identification of Sanat Kumara with Skanda, Kartikeya, the Ancient of Days, and various other "Lords of Flame" figures.

**Required field:** `syncretic_source` — name the modern source making the identification, with a date.

**Important:** This evidence type does not invalidate the parallel; it correctly contextualizes it. A user filtering for "only pre-modern parallels" can exclude lines of this type. A user studying the lineage of modern esoteric thought can filter *for* this type.

### 8. `personal-resonance`

The user perceives a meaningful parallel that they cannot or have not yet justified through any of the other evidence types. This is intuition, contemplation, or work-in-progress.

**Example:** A user might draw a line between Khidr (Sufi) and the Green Man (Celtic/folkloric) because something in their reading or meditation suggests the parallel, before they have worked out the structural-function case.

**Required field:** `personal_note` — the user's own reasoning, however provisional.

**Important:** This evidence type is fully legitimate. The Source Map is a tool for inquiry, and inquiry begins with intuition before it becomes argument. Filter-aware users can hide personal-resonance lines from public-published maps if they want to share only the rigorous claims. A user's private working map can hold any number of personal-resonance lines without judgment.

---

## Strength rating

In addition to evidence types, each connection carries a **strength rating** from the user or curator:

- `tentative` — "I'm exploring this; I'm not certain"
- `working` — "I think this holds but I want to refine it"
- `confident` — "I'm satisfied this parallel is real"

The strength rating is independent of the evidence types. A user might have a `confident` rating on a `personal-resonance` line (they trust their intuition) while reserving `tentative` for a multi-typed line they're still working through.

The UI renders strength visually: tentative lines are dashed and faint, working lines are solid and medium, confident lines are solid and bold.

---

## Full connection schema

```json
{
  "id": "user-conn-9f3a",
  "from_node": "enki",
  "to_node": "prometheus",
  "user_id": "user_xyz",
  "evidence_types": [
    {
      "type": "structural-function-match",
      "function_tags_shared": ["craftsman-of-humanity", "liberator-against-council", "wisdom-bringer"]
    },
    {
      "type": "narrative-pattern-match",
      "narrative_elements_shared": [
        "Fashions humans from clay",
        "Defies senior council to give humans the means of survival",
        "Is punished or pushed aside by the senior figure for siding with humanity"
      ]
    }
  ],
  "strength": "confident",
  "note": "Both fashioned humanity and defied the senior council to give us fire/wisdom. The Enlil-vs-Enki dynamic is structurally identical to the Zeus-vs-Prometheus dynamic.",
  "created_at": "2026-05-15T19:00:00Z",
  "visibility": "private"
}
```

---

## Canonical lines vs. user lines

The base map ships with a set of **canonical connections** maintained by the project curators. These follow the same schema but with `curator_id` instead of `user_id` and an additional `scholarly_review_status` field:

```json
{
  "id": "canonical-conn-0001",
  "from_node": "sophia",
  "to_node": "shekhinah",
  "curator_id": "project_curator",
  "evidence_types": [
    {
      "type": "structural-function-match",
      "function_tags_shared": ["wisdom", "fallen-aeon", "redeemer", "feminine-divine"]
    },
    {
      "type": "documented-historical-transmission",
      "transmission_evidence": "Idel, Moshe. *Kabbalah: New Perspectives* (Yale, 1988), ch. 4, on Gnostic influences on early Kabbalah."
    }
  ],
  "strength": "confident",
  "scholarly_review_status": "reviewed",
  "note": "The Shekhinah of Kabbalah carries explicit structural and historical inheritance from the Gnostic Sophia tradition, mediated through Hellenistic Jewish thought.",
  "created_at": "2026-01-01T00:00:00Z",
  "visibility": "canonical"
}
```

User overlays can hide canonical lines (the user disagrees with a project-endorsed parallel) and the user can add their own lines that contradict or refine the canonical ones.

---

## Filter logic in the UI

The canvas filter bar lets users toggle visibility by evidence type. The UI label is friendly; the underlying filter key is the canonical slug:

| Filter label (UI) | Filter key (slug) |
|---|---|
| Structural function | `structural-function-match` |
| Narrative pattern | `narrative-pattern-match` |
| Historical | `documented-historical-transmission` |
| Etymological | `etymological-link` |
| Iconographic | `iconographic-parallel` |
| Ritual practice | `ritual-practice-parallel` |
| Modern syncretic | `modern-syncretic-identification` |
| Personal resonance | `personal-resonance` |

```
[✓] Structural function   [✓] Narrative pattern
[✓] Historical            [✓] Etymological
[ ] Iconographic          [ ] Ritual practice
[ ] Modern syncretic      [✓] Personal resonance
```

And by strength:

```
[ ] Tentative   [✓] Working   [✓] Confident
```

A user studying perennialist claims can turn off `modern-syncretic-identification`. A user studying modern esoteric history can turn it *on* and turn the others off, to see exactly which connections only exist in 19th–20th century synthesis. A user in early exploratory mode might turn everything on. The default view shows everything except `personal-resonance` (so the canvas is not flooded with user intuitions by default), and all three strength levels.

---

## Why this matters

The Source Map is not just a map of who-equals-who. It is a map of **how strongly** any given parallel holds, **on what basis**, and **according to whom**. A user who interacts with the connection-evidence schema seriously is doing real comparative work — distinguishing rigorous claims from speculative ones, structural from genealogical, ancient from modern, evidence-based from intuitive.

This is the difference between a tool that flattens all traditions into mush and a tool that lets a careful inquirer see the actual texture of the comparative landscape.

The goal, as the framing text says: *the same Truth has been described in every age. The names change. The structure does not.* The connection-evidence schema is what lets the user verify that claim themselves, one line at a time.
