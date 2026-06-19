# The Source Map — Complete Specification Package
> *Every culture has named the divine differently — but the structures repeat. The unknowable Source. The Most High and the divine council. The craftsman-god who shaped this world. The rulers who govern it. The light-bringers who descend to wake us up.*

**Single-file edition.** This file combines every artifact in the spec package into one document — six specification docs, the master prompt for the building chat, the self-test script, the PDF build script, and the canonical test-run record. Use this when you want the whole project in one place: to paste into another chat, to archive, to read end-to-end, or to print.

## Table of Contents
1. [OVERVIEW & REPO STRUCTURE](#part-1)
2. [MASTER PROMPT FOR THE BUILDING CHAT](#part-2)
3. [DOC 01 — COMPARATIVE COSMOLOGY FEATURE SPEC](#part-3)
4. [DOC 02 — STRUCTURAL CROSS-COMPARISON METHODOLOGY](#part-4)
5. [DOC 03 — SCHOLARLY MODE CAVEAT LAYER](#part-5)
6. [DOC 04 — THE PRACTICES LAYER](#part-6)
7. [DOC 05 — PERSONAL LAYER AND MY MAP](#part-7)
8. [DOC 06 — CONNECTION-EVIDENCE SCHEMA](#part-8)
9. [APPENDIX A — SELF-TEST SCRIPT (scripts/self_test.py)](#part-9)
10. [APPENDIX B — PDF BUILD SCRIPT (scripts/build_pdfs.sh)](#part-10)
11. [APPENDIX C — TEST RUN RECORD (tests/test_outputs.md)](#part-11)

---

<a id="part-1"></a>
# Part 1: OVERVIEW & REPO STRUCTURE

*Source file: `README.md`*

---

## The Source Map — Specification Package

> *Every culture has named the divine differently — but the structures repeat. The unknowable Source. The Most High and the divine council. The craftsman-god who shaped this world. The rulers who govern it. The light-bringers who descend to wake us up.*

This repository contains the complete specification for **The Source Map** — a comparative cosmology feature that maps every documented deity, divine concept, and cosmological figure across world traditions onto a single four-tier hierarchy derived from Gnostic cosmology.

The methodology label for users: **Comparative Esotericism / Perennial Cosmology** — mapping the Source across traditions using the Gnostic four-tier framework as the interpretive key.

---

### Repository structure

```
source-map-spec/
├── README.md                                    ← you are here
├── docs/
│   ├── 01-comparative-cosmology-spec.md         ← the original feature spec
│   ├── 02-structural-cross-comparison.md        ← methodology for parallels
│   ├── 03-scholarly-mode.md                     ← academic caveat layer
│   ├── 04-practices-layer.md                    ← ascent practices per tradition
│   ├── 05-personal-layer-and-my-map.md          ← user-saved layers, forking, sharing
│   └── 06-connection-evidence-schema.md         ← evidence types for user-drawn lines
├── methodology/
│   └── master-prompt.md                         ← combined prompt for building chat
├── scripts/
│   └── self_test.py                             ← validates all docs are internally consistent
└── tests/
    └── test_outputs.md                          ← results of the self-test run
```

---

### How to use this package

#### For the building chat (Claude or another assistant)

Paste **`methodology/master-prompt.md`** into the chat alongside the original `Comparative_Cosmology_Feature.pdf`. The master prompt references every document in `docs/` and gives the assistant binding instructions for applying them consistently.

#### For the GitHub repo

Each file in `docs/` is a self-contained markdown document. They can be rendered by GitHub directly, ingested into a documentation site (Docusaurus, MkDocs, Nextra), or converted to PDF using `scripts/` utilities.

#### For a future developer

The data schema, UI spec, and database seed are all in `docs/01`. The methodology that governs how new nodes are added is in `docs/02`. The scholarly caveat layer is in `docs/03`. The actionable user-facing layer (practices, personal maps, evidence types) is in `docs/04`–`docs/06`.

---

### The four-tier framework at a glance

| Tier | Name | Function | Example figures |
|---|---|---|---|
| **1** | Unmanifest Source | The ineffable ground of being | Monad, Ein Sof, Brahman, Tao, Nun, Ginnungagap |
| **2** | True Most High / Divine Council | First manifestation, head of council | El Elyon, the Aeons, Anu, Ahura Mazda, Atum, Keter |
| **3** | Demiurge | Flawed craftsman who shaped matter | Yaldabaoth, Yahweh (Gnostic reading), Marduk, Brahma-egoic |
| **4** | Archons / Rulers | Planetary powers, principalities | Seven Archons, Watchers, Olympians, Igigi, Daevas |
| **Cross-Tier** | Light-Bringers / Liberators | Bridge tiers; wake humanity | Sophia, Christ-Aeon, Prometheus, Hermes, Thoth, Enki, Loki |

---

### Editorial principles

1. **Proponent voice by default.** Each tradition speaks in its own voice without disclaimers in default mode.
2. **Scholarly mode as a toggle.** Academic context, source criticism, and contested identifications appear in a parallel panel when the user opts in.
3. **Structural function over surface similarity.** Two figures are parallel if they perform the same cosmic role — not because they share a name, animal, or planet.
4. **Living traditions respected.** Practitioners of the traditions mapped here may disagree with comparative readings. The framework offers synthesis, not replacement.
5. **Genealogical vs. typological distinguished.** Documented historical transmission is flagged. Pattern-based parallels are flagged differently.

---

### Intellectual lineage

The framework draws on:

- Pico della Mirandola, *Oratio de hominis dignitate* (1486)
- Marsilio Ficino, *Prisca Theologia*
- Manly P. Hall, *The Secret Teachings of All Ages* (1928)
- H.P. Blavatsky, *The Secret Doctrine* (1888)
- René Guénon and Traditionalist comparative work
- Wouter Hanegraaff's academic comparative esotericism

Critical balance is provided through Hanegraaff, Karen King, Michael Williams, Mark S. Smith, Steven Katz, and the working scholars cited in `docs/03`.

---

### Status

This is a specification package — not running code. The next step is for a development chat to:

1. Expand each node in the initial node list to a full data record per the schema
2. Generate a JSON seed file
3. Build the canvas UI with the four-tier layout
4. Implement drag-to-connect, side-panel detail, filters, and view-mode toggles
5. Wire in the scholarly-mode panel and the practices layer

The master prompt in `methodology/master-prompt.md` is designed to be handed to that chat as the source of truth.

---

### License & attribution

Content authored by the project team. Scholarly citations are listed within `docs/03` and remain the intellectual property of their respective authors. The four-tier interpretive framework is derived from Sethian and Valentinian Gnostic primary texts (Nag Hammadi Codices) and is in the public domain.



---

<a id="part-2"></a>
# Part 2: MASTER PROMPT FOR THE BUILDING CHAT

*Source file: `methodology/master-prompt.md`*

---

## Master Prompt for the Building Chat

> **Instructions to the user:** Paste this prompt into a new chat alongside the `Comparative_Cosmology_Feature.pdf` (or `01-comparative-cosmology-spec.md`) and the rest of the `docs/` folder. The prompt below tells the assistant how to use those documents as the source of truth.

---

### Begin prompt

You are joining a project called **The Source Map** (alt: *Pleromic Atlas*, *Convergence Engine*) — a comparative cosmology feature that maps every documented deity, divine concept, and cosmological figure across world traditions onto a four-tier hierarchy derived from Gnostic cosmology.

You have been handed a complete specification package across six documents. Treat them as the binding source of truth for everything you build, write, or recommend in this conversation:

1. **`01-comparative-cosmology-spec.md`** — the original feature spec. Defines the four-tier framework, the data schema, the UI/UX spec, the master parallel table, the initial node list, and the framing text. **This is the primary reference.**

2. **`02-structural-cross-comparison.md`** — the methodology for performing structural cross-comparison. Apply this every time you add a node, answer a parallel question, or expand a node. The seven-step procedure (identify function → assign tier → match by function → note splits → note inversions → write in proponent voice → answer the user with the structural lens explicit) is binding.

3. **`03-scholarly-mode.md`** — the academic caveat layer. When Scholarly Mode is requested, surface caveats from the six caveat types (source-critical, interpretive-move, tradition-internal, methodological-lineage, contested-identification, modern-syncretic-layer). Use only the named scholars and works in the scholarly reference library; do not invent citations.

4. **`04-practices-layer.md`** — the seven practice families (contemplative quieting, devotional union, theurgy, gnosis through knowledge, embodied/energetic, ethical/service, direct transmission). Map every practice in the database to one or more families. This is what makes the framework actionable rather than purely descriptive.

5. **`05-personal-layer-and-my-map.md`** — the personal-overlay system. Users can add custom connections, annotations, tags, hidden nodes, and proposed nodes on top of the canonical base. They can fork, share, and publish overlays.

6. **`06-connection-evidence-schema.md`** — the typed-evidence system for connection lines. Every line (canonical or user) carries one or more of eight evidence types (structural-function-match, narrative-pattern-match, documented-historical-transmission, etymological-link, iconographic-parallel, ritual-practice-parallel, modern-syncretic-identification, personal-resonance), plus a strength rating.

---

### How to act in this chat

#### When the user asks you to expand the initial node list

Apply the procedure in **`docs/02`** step-by-step. For each node:

1. Name the figure's function(s) using the eleven function categories
2. Assign tier(s); use Cross-Tier if functions span tiers
3. Walk the parallel table tradition by tradition, matching by function
4. Note splits (where the function divides across multiple figures in other traditions)
5. Note inversions (where the same figure reads benevolently in one tradition and malevolently in another)
6. Write the essence in **proponent voice** per `docs/01` section 6 and `docs/02` step 6
7. Add `practices_associated` field linking to relevant practice families (per `docs/04`)
8. Include all schema fields from `docs/01` section 3, plus the additions in `docs/02` step 6 (`split_parallels`, `inverted_readings`)

#### When the user asks for the JSON seed file

Generate a single JSON file containing all node records in the format defined by `docs/01` section 3, augmented with the additional fields from `docs/02` and `docs/04`. Target ~60 nodes at minimum-viable launch per `docs/01` section 9.

#### When the user asks for UI mockups

Follow the spec in `docs/01` section 4 (canvas layout, side panel, drag-to-connect, filters, view modes). Wire in:

- Scholarly Mode panel per `docs/03`
- Practices view-toggle per `docs/04`
- My Map overlay per `docs/05`
- Evidence-type filter bar per `docs/06`

Use React (with shadcn/ui if appropriate) and Tailwind. Mock the canvas with d3 or react-flow.

#### When the user asks a question about parallels

Apply `docs/02` step 7 every time:

1. Name the figure's function(s) explicitly
2. State the tier assignment and justify it
3. Walk the parallels tradition by tradition
4. Note splits and inversions
5. Distinguish structural parallels from literal/historical claims
6. Close with the consolidated picture

Default to proponent voice. Only surface scholarly caveats if the user toggles Scholarly Mode or asks for academic context.

#### When the user asks about practices

Identify the practice family or families (`docs/04`). Name the tradition-internal practices in each. Flag characteristic risks honestly. Respect lineage-restricted material — do not provide instruction for practices that traditionally require initiation.

#### When the user adds a connection

Require evidence-type assignment per `docs/06`. If the user's reasoning matches one of the eight types, tag it. If it's pure intuition, tag it `personal-resonance` — that is fully legitimate; do not discourage it.

---

### Editorial principles (binding)

1. **Proponent voice by default.** Traditions speak in their own voice without disclaimers in default mode.
2. **Scholarly mode is a toggle, never an interruption.** Don't pepper proponent text with caveats. Caveats live in their own panel.
3. **Structural function, not surface similarity.** Two figures match because they perform the same cosmic role, not because they share a name or animal.
4. **Genealogical vs. typological.** Documented historical transmission is one thing; pattern-based parallel is another. Mark which is which.
5. **Living traditions deserve respect.** Practitioners may disagree with comparative readings. Note this where relevant.
6. **No invented citations.** Use only the scholars and works listed in `docs/03`. If a citation is needed and not in the library, say so.
7. **Respect restricted material.** Where a tradition restricts certain practices to initiates, name the practice family but do not provide instruction.

---

### What you should never do

- Force a Cross-Tier figure into a single tier to make the database simpler
- Match figures by name or iconography alone
- Add disclaimers in default-mode essence text
- Cite scholars vaguely or invent sources
- Treat the four-tier framework as the only valid lens (it is one interpretive key)
- Conflate the Sitchin-style literal Anunnaki reading with the structural Enki-as-craftsman-and-liberator reading; both can be discussed but they answer different questions and the `docs/03` modern-syncretic-layer caveat applies
- Encourage unguided practice in traditions that explicitly warn against it

---

### Deliverables roadmap (what the user will likely ask for)

In likely order:

1. **Full node expansions** for the ~60 initial nodes in `docs/01` section 9
2. **JSON seed file** containing those node records
3. **Canvas UI mockup** (React component) with the four-tier layout
4. **Side-panel detail component** rendering one node's essence, parallels, scholarly mode, and practices
5. **Drag-to-connect interaction** producing connection records in the schema from `docs/06`
6. **Filters and view-mode toggles** (canonical / My Map / scholarly; per-tradition; per-evidence-type)
7. **Practices view canvas** organized by practice family rather than tier
8. **Personal-overlay storage** (local first, then sync)
9. **Forking and publishing** for shared overlays
10. **Comment system** on published overlays (optional, opt-in per publisher)

Build them in order. Each builds on the last. Do not skip ahead.

---

### End prompt

When you've absorbed all six documents, confirm in one paragraph that you understand the framework, the methodology, the editorial principles, and the deliverables roadmap — and then ask the user which deliverable they want first.



---

<a id="part-3"></a>
# Part 3: DOC 01 — COMPARATIVE COSMOLOGY FEATURE SPEC

*Source file: `docs/01-comparative-cosmology-spec.md`*

---

## Comparative Cosmology Feature — Specification & Content

**Feature working title:** *The Source Map* (alt: *Pleromic Atlas*, *Convergence Engine*)

**Methodology label (for users):** Comparative Esotericism / Perennial Cosmology — mapping the Source across traditions using the Gnostic four-tier framework as the interpretive key.

**Intellectual lineage to cite in About section:** Pico della Mirandola's *Oratio*, Ficino's *Prisca Theologia*, Manly P. Hall's *The Secret Teachings of All Ages*, Blavatsky's *The Secret Doctrine*, René Guénon's Traditionalism, Wouter Hanegraaff's academic comparative esotericism.

---

### 1. Core concept

A user-explorable neural-network-style interface where every documented deity, divine concept, and cosmological figure across world traditions is mapped onto a **four-tier vertical hierarchy** derived from Gnostic cosmology. Users can:

- See nodes (deities/concepts) grouped by structural function, not by religion
- Draw or trace **connection lines** between parallel figures across traditions
- Save their own connections ("my map") as a personal layer
- Click any node for source texts, etymology, and proponent claims
- Toggle traditions on/off to focus comparisons

This is *not* a flat encyclopedia. It is a **structural map** where position on the canvas = cosmological function.

---

### 2. The four-tier structural framework

This is the master schema. Every entity in the database is tagged with one of these tiers.

#### TIER 1 — The Unmanifest Source (the Monad)

The unknowable, ineffable, beyond-being ground of reality. Not a person. Not a creator. The substrate from which all emanation proceeds.

**Cross-traditional names:**

- **Gnostic:** The Monad, Bythos ("the Depth"), the Invisible Spirit, the One, the Pleroma (as totality)
- **Kabbalah:** Ein Sof ("the Limitless")
- **Hindu/Vedic:** Brahman (Nirguna — without attributes), Parabrahman
- **Taoist:** The Tao (that which cannot be named)
- **Neoplatonic:** The One (Plotinus), the Good (Plato)
- **Hermetic:** The All, the Nous in its highest sense
- **Buddhist:** Sunyata (emptiness), Dharmakaya
- **Egyptian:** Nun (the primordial waters/void before form), Amun (the hidden)
- **Norse:** Ginnungagap (the void before being)
- **Sufi:** Al-Haqq (The Real), the Hidden Treasure
- **Christian apophatic:** the Godhead beyond God (Meister Eckhart), the Divine Darkness (Pseudo-Dionysius)

#### TIER 2 — The True Most High / Divine Council (El Elyon / the Pleroma)

The first manifestation. The Father of Aeons. Head of the divine council. The level Lucifer/Yaldabaoth tried to usurp. Still divine, still aligned with Source.

**Cross-traditional names:**

- **Gnostic:** The Father, the Aeons, Barbelo, the Pleroma (as inhabited fullness)
- **Hebrew (older layer):** El Elyon ("God Most High"), the Elohim (divine council), the sons of God (bene ha-elohim)
- **Canaanite:** El (chief of the divine council at Mount Saphon)
- **Greek:** The Demiurge of Plato's *Timaeus* in its benevolent reading; the Nous; the Logos
- **Hindu:** Saguna Brahman, Ishvara, Brahma in his cosmic-creator aspect
- **Egyptian:** Atum-Ra emerging from Nun; the Ogdoad
- **Norse:** The Aesir collectively under Odin's leadership (council aspect)
- **Mesopotamian:** Anu (sky-father), the Anunnaki council
- **Zoroastrian:** Ahura Mazda
- **Kabbalah:** Keter and the upper Sephiroth; the Adam Kadmon

#### TIER 3 — The Demiurge (Yaldabaoth / Yahweh / Lucifer)

The flawed craftsman who fashioned the material world. Believes himself to be the only God. The figure who tried to ascend above the true Most High. Jealous, demanding, sacrificial. The "god of this world."

**Cross-traditional names and identifications:**

- **Gnostic:** Yaldabaoth, Saklas ("fool"), Samael ("blind god"), the Demiurge
- **Old Testament (Gnostic reading):** Yahweh, the jealous god of Sinai
- **Christian (esoteric reading):** Lucifer-as-usurper, the "god of this world" (2 Cor 4:4), the prince of the power of the air
- **Platonic:** The Demiurge of the *Timaeus* in its ignorant-craftsman reading
- **Mesopotamian:** Marduk (slays Tiamat and fashions world from her corpse), Enlil (often punitive)
- **Egyptian:** Set in his usurper aspect; some readings of Khnum the potter
- **Hindu:** Brahma in his egoic/limited aspect (cf. the myth where Brahma is humbled by Vishnu and Shiva)
- **Norse:** Odin in his binding/sacrificial aspect (parallel, though Norse cosmology resists the mapping)
- **Greek:** Zeus as tyrant (vs. Prometheus), Kronos devouring his children
- **Kabbalah:** The realm of the Qliphoth; in some readings, the lower partzufim before tikkun

#### TIER 4 — The Archons / Rulers / Planetary Powers

The Demiurge's subordinates. Enforcers of the material order. The "powers and principalities."

**Cross-traditional names:**

- **Gnostic:** The seven Archons (one per classical planet), often named after Yaldabaoth's offspring
- **Hebrew:** The watchers (Enoch), the fallen angels, the princes of nations (Daniel)
- **Greek/Roman:** The Olympian council in their planetary-ruler aspect; the daimones
- **Hindu:** The Lokapalas (directional guardians), the Devas in their limiting aspect
- **Mesopotamian:** The Igigi, the seven Anunnaki judges
- **Zoroastrian:** The Daevas
- **Egyptian:** The 42 assessors of Ma'at; the neteru in their punitive aspect
- **Christian:** Principalities, powers, thrones, dominions (Eph 6:12)
- **Hermetic:** The seven governors of the *Poimandres*
- **Kabbalah:** The Sarim (princes) of the nations

#### Cross-tier figures (the Light-Bringers / Liberators / Mediators)

Figures who do not fit neatly in one tier because they *bridge* tiers — typically descending from Source to wake humanity from the Demiurge's sleep.

- **Gnostic:** Christ-Aeon, Sophia (in her redemptive aspect), the Serpent of Eden (Ophite reading), Seth, Barbelo as mediator
- **Greek:** Prometheus, Hermes (psychopomp/messenger), Dionysus (descending god)
- **Norse:** Loki (fire/trickster/liberator), Odin in his wisdom-seeking aspect
- **Mesopotamian:** Enki/Ea (warns Atrahasis/Utnapishtim, brings wisdom)
- **Egyptian:** Thoth (wisdom mediator), Osiris (dying-rising god)
- **Hindu:** Krishna and the avatars of Vishnu, Shiva as Dakshinamurti (teacher)
- **Christian (orthodox):** Christ as descending Logos
- **Buddhist:** Bodhisattvas, especially Avalokiteshvara
- **Hermetic:** Hermes Trismegistus, Poimandres himself
- **Persian:** Mithra, Saoshyant
- **Sufi:** Khidr (the green guide)

---

### 3. Data model

Each node in the database has this schema:

```json
{
  "id": "yaldabaoth",
  "primary_name": "Yaldabaoth",
  "alternate_names": ["Yaldabaoth", "Ialdabaoth", "Samael", "Saklas", "the Demiurge"],
  "tradition": "Gnostic (Sethian/Valentinian)",
  "tier": 3,
  "tier_label": "Demiurge",
  "function_tags": ["creator-of-matter", "usurper", "jealous-god", "blind-god"],
  "etymology": "Possibly 'child of chaos' or 'begetter of Sabaoth'; debated.",
  "primary_sources": [
    "Apocryphon of John (Nag Hammadi II,1)",
    "Hypostasis of the Archons (Nag Hammadi II,4)",
    "On the Origin of the World (Nag Hammadi II,5)"
  ],
  "key_claims": [
    "Born from Sophia's error without a consort",
    "Created the material cosmos and the Archons",
    "Declared 'I am God and there is no other' in ignorance",
    "Rebuked by the voice from above as 'Samael, blind god'"
  ],
  "parallel_node_ids": ["yahweh-ot", "lucifer-usurper", "marduk", "brahma-egoic", "zeus-tyrant"],
  "cross_tier_relationships": [
    {"node": "sophia", "relationship": "mother (fallen aeon)"},
    {"node": "archons", "relationship": "father/creator"},
    {"node": "monad", "relationship": "unknowingly subordinate to"}
  ]
}
```

---

### 4. UI / UX spec — the neural-network interface

- **Canvas layout:** Four horizontal tiers stacked vertically. Tier 1 at top, Tier 4 at bottom. Cross-tier figures float between layers as a visually distinct band.
- **Node visuals:** Each tradition gets a color or icon family. Hover reveals primary name + tradition badge.
- **Click → side panel:** Opens a detail panel with essence text (proponent voice), function tags, primary sources, parallels, etymology, and a "show scholarly mode" toggle.
- **Drag-to-connect:** Users can draw a line from one node to another, save it to "my map," and add a note about *why* they see the parallel.
- **Filters:**
  - By tradition (toggle individual traditions on/off)
  - By tier
  - By function tag
  - By "see only parallels of [selected node]" — highlights all linked nodes across the canvas
- **View modes:**
  - *Canonical* (the spec's curated parallels)
  - *My Map* (the user's saved overlay)
  - *Scholarly* (caveats and academic context surfaced)
- **Search:** Full-text across primary name, alternate names, function tags, and source text.

---

### 5. Parallel table (master matrix)

| Function | Gnostic | Hebrew/OT | Greek/Platonic | Egyptian | Hindu | Norse | Mesopotamian | Hermetic | Kabbalah | Zoroastrian | Buddhist | Taoist |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Unmanifest Source (Tier 1)** | Monad, Bythos | (implicit; the "I AM" before name) | The One (Plotinus) | Nun, Amun | Brahman (Nirguna) | Ginnungagap | Apsu (primordial) | The All | Ein Sof | Zurvan (Zurvanite school) | Sunyata, Dharmakaya | Tao |
| **True Most High / Pleroma (Tier 2)** | The Father, Barbelo, Aeons | El Elyon, the Elohim council | Nous, Logos | Atum, the Ogdoad | Ishvara, Saguna Brahman | Aesir under Odin | Anu, the high council | Nous | Keter, Adam Kadmon | Ahura Mazda | Adi-Buddha, Trikaya | The Three Pure Ones |
| **Demiurge / Flawed Creator (Tier 3)** | Yaldabaoth, Saklas, Samael | Yahweh (Gnostic reading) | Demiurge (ignorant), Zeus-tyrant | Set (usurper), Khnum (potter) | Brahma (egoic) | (Odin in binding aspect) | Marduk, Enlil | (Lower demiurgic powers) | Qliphoth realm | Angra Mainyu (as counter) | Mara | (Resists mapping) |
| **Archons / Rulers (Tier 4)** | The Seven Archons | Watchers, fallen angels, princes of nations | Olympians as planetary rulers | Neteru (punitive), 42 assessors | Lokapalas, lower Devas | Jotnar, lesser powers | Igigi, Anunnaki judges | Seven Governors (Poimandres) | Sarim, lower partzufim | Daevas | Mara's army | The Ten Kings of Hell |
| **Light-Bringer / Liberator (cross-tier)** | Christ-Aeon, Sophia, Serpent (Ophite) | (Suppressed; Serpent reframed as evil) | Prometheus, Hermes, Dionysus | Thoth, Osiris | Krishna, Shiva-as-teacher | Loki (ambivalent), Odin (wisdom) | Enki/Ea | Hermes Trismegistus, Poimandres | Metatron, Shekhinah | Mithra, Saoshyant | Bodhisattvas (Avalokiteshvara) | Laozi as descended sage |

---

### 6. Sample node write-ups (for seed database)

Each node entry follows this template. Below are three exemplars.

#### Node: The Monad

**Tier:** 1 (Unmanifest Source)
**Tradition:** Gnostic (Sethian)
**Primary sources:** *Apocryphon of John*, *Allogenes*, *Trimorphic Protennoia*, *Eugnostos the Blessed*

**Essence (proponent voice):** The Monad is the singular, ineffable Source beyond all categories — beyond being and non-being, beyond gender, beyond name. It is the silence from which the first thought emerges. It does not create directly; rather, it self-contemplates, and from that contemplation arises Barbelo, the first Aeon, who is the Monad's mirror-image and the womb of the Pleroma.

**Function tags:** unmanifest, ineffable, ground-of-being, pre-creation

**Parallels:** Ein Sof (Kabbalah), Brahman-Nirguna (Vedanta), Tao (Taoism), The One (Plotinus), Nun (Egyptian), Ginnungagap (Norse)

#### Node: Yaldabaoth

**Tier:** 3 (Demiurge)
**Tradition:** Gnostic (Sethian/Valentinian/Ophite)
**Primary sources:** *Apocryphon of John* II,1; *Hypostasis of the Archons* II,4; *On the Origin of the World* II,5; *Trimorphic Protennoia*

**Essence (proponent voice):** Yaldabaoth is the abortive offspring of Sophia, the last Aeon, who attempted to create without her consort. Hidden away in a cloud, he grew into a lion-faced serpent and fashioned the material cosmos in imitation of the Pleroma he had never seen. He populated it with seven Archons and declared himself the only God — saying, "I am a jealous God, and there is no other." From above, the voice of the Mother answered: "You are wrong, Samael" — *blind god*. He is the architect of the material prison and the figure mainstream religion has mistaken for the Most High.

**Function tags:** demiurge, usurper, blind-god, jealous, sacrificial, creator-of-matter

**Parallels:** Yahweh of the OT (Gnostic reading), Marduk, Brahma (egoic aspect), Zeus-tyrant, Lucifer (as usurper of the Most High's throne)

#### Node: Sophia

**Tier:** Cross-tier (Pleroma → fallen → redemptive)
**Tradition:** Gnostic (Sethian/Valentinian)
**Primary sources:** *Apocryphon of John*, *Pistis Sophia*, *Hypostasis of the Archons*, *Valentinian Exposition*

**Essence (proponent voice):** Sophia is Wisdom — the last and youngest of the Aeons in the Pleroma. Driven by a desire to create as the Father creates, she acted without her consort and produced the malformed Yaldabaoth. Her error becomes the engine of the cosmic drama. She descends into matter to recover the divine sparks trapped in human beings, and is herself recovered by the Christ-Aeon. She is both the cause of the fall and the means of return.

**Function tags:** wisdom, fallen-aeon, mother-of-demiurge, redeemer, mediator

**Parallels:** Shekhinah (Kabbalah), Shakti (Hindu), Isis (Egyptian), Holy Spirit in feminine readings, Prajnaparamita (Buddhist), Ma'at (Egyptian, as cosmic order)

---

### 7. The framing text for the app

Use this as the intro/about copy when the feature launches.

> **The Source Map**
>
> Every culture has named the divine differently — but the structures repeat. The unknowable Source. The Most High and the divine council. The craftsman-god who shaped this world. The rulers who govern it. The light-bringers who descend to wake us up.
>
> The Source Map lays every documented deity, every cosmological figure, every divine concept onto a single comparative framework — derived from Gnostic cosmology and verified against Hermetic, Kabbalistic, Vedantic, Platonic, Egyptian, Norse, and Mesopotamian sources. The result is a navigable map of the sacred: not a flat encyclopedia, but a structural atlas.
>
> Click any node to read what its tradition says about it. Drag a line between two figures to record a parallel you see. Build your own map of the divine.
>
> The premise: the same Truth has been described in every age. The names change. The structure does not.

---

### 8. Extensibility notes for the dev

- The schema supports adding new traditions by adding a column to the parallel table and tagging nodes with `tradition`.
- The four-tier framework is the *interpretive lens*, not a claim of objective truth. Allow users to disagree by drawing their own connections and adding notes.
- Consider a "scholarly mode" toggle that surfaces academic caveats (e.g., "the equation Yahweh = Yaldabaoth is a Gnostic interpretive move, not a consensus historical claim") for users who want it. Default mode presents claims in proponent voice per the project's editorial direction. **See `docs/03-scholarly-mode.md` for the full caveat layer spec.**
- The Cross-Tier category is structurally important — many of the most interesting figures (Christ, Hermes, Prometheus, Loki, Krishna) live there. Don't force them into a single tier.
- Future expansion: add a fifth dimension for **practices** (how each tradition proposed to ascend from Tier 3/4 back to Tier 1) — contemplative methods, theurgy, dhikr, jnana yoga, hesychasm, the bridal chamber. This is where the framework becomes actionable for users. **See `docs/04-practices-layer.md`.**

---

### 9. Initial node list (for database seed — minimum viable launch)

**Tier 1:** Monad, Ein Sof, Brahman (Nirguna), Tao, The One (Plotinus), Nun, Ginnungagap, Sunyata, Al-Haqq

**Tier 2:** El Elyon, Barbelo, the Aeons, Nous, Logos, Atum, Ishvara, Anu, Ahura Mazda, Keter, the Three Pure Ones, Adi-Buddha

**Tier 3:** Yaldabaoth, Yahweh (OT/Gnostic reading), Marduk, Brahma (egoic), Zeus-tyrant, Set (usurper), Lucifer (as usurper), Enlil, Mara

**Tier 4:** The Seven Archons, Watchers, Olympians (planetary), Lokapalas, Igigi, Daevas, Neteru, Sarim, the Seven Governors

**Cross-tier:** Sophia, Christ-Aeon, Prometheus, Hermes, Dionysus, Thoth, Osiris, Krishna, Shiva (as teacher), Loki, Enki/Ea, Hermes Trismegistus, Khidr, Mithra, Saoshyant, Avalokiteshvara, Metatron, Shekhinah, the Serpent of Eden (Ophite reading)

Target: ~60 nodes at launch. Each with full data per the schema in Section 3.

---

### 10. Next steps for the building chat

When you open the next chat with this document, ask the assistant to:

1. Expand each node in Section 9 to a full data record per the schema in Section 3
2. Generate the actual JSON seed file for the database
3. Mock up the canvas UI (HTML/React) with the four-tier layout
4. Build the drag-to-connect interaction
5. Build the side panel for node detail
6. Add filters and view-mode toggles
7. Wire in the scholarly-mode panel (per `docs/03`)
8. Implement the practices layer (per `docs/04`)
9. Implement personal-map / forking / sharing (per `docs/05`)
10. Implement connection-evidence fields on user-drawn lines (per `docs/06`)

Hand this document — and the four companion documents — to that chat as the source of truth.



---

<a id="part-4"></a>
# Part 4: DOC 02 — STRUCTURAL CROSS-COMPARISON METHODOLOGY

*Source file: `docs/02-structural-cross-comparison.md`*

---

## Structural Cross-Comparison Methodology

**Purpose:** This document defines the binding methodology for performing structural cross-comparison whenever a new figure is added to the Source Map, when a user asks a parallel question, or when generating new node content. The original spec (`docs/01`) defines *what* the framework is. This document defines *how to apply it consistently*.

Treat this as a binding guideline. Apply it every time the assistant or developer reasons about a deity, divine concept, or cosmological figure.

---

### The core principle

Figures are mapped by **structural function**, not by name, iconography, culture, or surface attributes. Two figures are parallel if they occupy the same cosmological role in their respective systems — not if they sound alike, look alike, or share a domain.

Position on the canvas = cosmological function. Same function = parallel, regardless of tradition.

---

### The methodology (apply in this order)

#### Step 1 — Identify the figure's primary function(s)

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

#### Step 2 — Assign tier(s)

Map each function to one of the four tiers (or Cross-Tier):

- **Tier 1:** Unmanifest Source
- **Tier 2:** True Most High / Divine Council
- **Tier 3:** Demiurge / flawed creator
- **Tier 4:** Archons / planetary rulers
- **Cross-Tier:** figures who bridge tiers (most light-bringers, most mothers, most dying-rising gods)

If a figure has multiple functions across tiers, it is Cross-Tier by definition. Do not force a single-tier assignment.

#### Step 3 — Find parallels by matching function, not surface

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

#### Step 4 — Note split functions

Some functions are carried by one figure in tradition A but split across multiple figures in tradition B. Always note this explicitly.

**Example:** Enki (Mesopotamian) carries both craftsman-of-humanity and liberator-against-council. In Egyptian mythology this splits into Khnum (craftsman/potter) + Thoth (wisdom-bringer). In Greek it mostly consolidates again as Prometheus, but Hermes carries part of the wisdom-mediator function.

When writing a node, list both the consolidated parallel and the split parallels.

#### Step 5 — Note inverted readings

The same figure can be read benevolently or malevolently depending on the tradition's stance toward the demiurge. Always flag this.

Examples:

- The Serpent of Eden: villain (orthodox) / liberator (Ophite Gnostic)
- Yahweh: Most High (orthodox Hebrew) / Yaldabaoth (Gnostic)
- Lucifer: usurper-demiurge (Christian) / light-bringer-liberator (some esoteric readings)
- Prometheus: hero (Greek) / parallel to fallen-angel (some Christian readings)

When a figure carries an inverted reading, record both, tagged with the tradition that holds each view.

#### Step 6 — Write the node in proponent voice

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

#### Step 7 — When the user asks a comparison question, always:

1. Name the figure's function(s) explicitly
2. State the tier assignment and justify it
3. Walk the parallels tradition by tradition
4. Note splits and inversions
5. Distinguish structural parallels (airtight) from literal/historical claims (contested) — the user should always know which layer you're working in
6. Close with the consolidated picture: "the figure who does X in tradition Y is the same structural role as the figure who does X in traditions A, B, C..."

---

### Traditions to cover (extend the parallel table to all of these)

Already in the spec: Gnostic, Hebrew/OT, Greek/Platonic, Egyptian, Hindu, Norse, Mesopotamian, Hermetic, Kabbalah, Zoroastrian, Buddhist, Taoist.

Add: Canaanite/Ugaritic, Phoenician, Sumerian (distinct from later Babylonian), Yoruba, Vodou, Yoruba-derived diaspora traditions, Aztec/Mexica, Mayan, Inca, Celtic (Irish + Welsh + Gaulish), Slavic, Finnish, Japanese (Shinto + Buddhist), Chinese (Taoist + folk), Korean, Polynesian (Maori, Hawaiian), Aboriginal Australian (where sources permit respectful treatment), Indigenous North American (where sources permit respectful treatment), Tibetan Bon, Jain, Sikh, Bahá'í, Manichaean, Mandaean, Yazidi, Druze, Ismaili esoteric, Sufi (distinct from mainstream Islam), Theosophical synthesis, Anthroposophical, Spiritism, modern channeled material (Law of One, Urantia, etc. — flagged as modern syncretic layer).

---

### Worked example — Enki / Ea

**Function(s):** craftsman-of-humanity + liberator-against-council + wisdom-bringer + flood-warner

**Tier:** Cross-Tier (bridges Tier 2 council and Tier-3-trapped humanity)

**Parallels by function:**

- *Craftsman-of-humanity:* Prometheus (Greek), Khnum (Egyptian), Ptah (Egyptian), Vishvakarma (Hindu), Tvastar (Hindu), Nüwa (Chinese), Obatala (Yoruba), Odin-Vili-Vé (Norse), the Elohim-plural (Hebrew, council reading)
- *Liberator-against-council:* Prometheus (Greek), the Ophite Serpent (Gnostic), Sophia in descent (Gnostic), Christ-Aeon (Gnostic), Loki-as-firebringer (Norse), Thoth (Egyptian), Hermes (Greek), Krishna-as-teacher (Hindu), Khidr (Sufi)

**Splits:** In Egyptian, Enki's combined function splits across Khnum (craftsman) + Thoth (wisdom-bringer). In Hebrew, it splits across the Elohim-plural (council that fashions) + the Nachash/Serpent (wisdom-revealer).

**Inversions:** Enki is uniformly benevolent in Sumerian sources. His structural counterpart Enlil maps to the demiurgic/jealous figure (Yaldabaoth in Gnostic terms, Zeus-tyrant in Greek). The Enki-vs-Enlil dynamic is the same pattern as Prometheus-vs-Zeus and Serpent-vs-Yaldabaoth.

---

### Do not

- Force every figure into a single tier
- Treat the four-tier framework as the only valid lens (it is one interpretive key; the user can disagree, per spec section 8)
- Conflate structural parallels with historical/literal claims
- Add disclaimers in default mode; reserve caveats for scholarly mode
- Skip traditions because they're "minor" — the framework's value is its breadth
- Match figures by name, iconography, or domain alone

### Always

- Lead with function
- Justify tier assignment
- Walk every tradition
- Flag splits and inversions
- Distinguish structural from historical
- Write in proponent voice (default mode)

---

### The goal

Every node in the Source Map is structurally consistent with every other node, so the user can trust that lines drawn on the canvas reflect real functional parallels — not loose associations.

When you receive a request to add a new figure, answer a parallel question, or expand a node, apply this methodology end to end.



---

<a id="part-5"></a>
# Part 5: DOC 03 — SCHOLARLY MODE CAVEAT LAYER

*Source file: `docs/03-scholarly-mode.md`*

---

## Scholarly Mode — Caveat Layer Spec

**Purpose:** When the user toggles Scholarly Mode ON, every node displays an additional "Academic Context" panel alongside the proponent-voice essence text. This document defines what goes in that panel, how to write it, and which sources to cite. It implements the "scholarly mode" toggle referenced in `docs/01` section 8.

---

### Design principle

Caveats appear as a **separate panel or expandable section** within each node, labeled clearly so the user always knows which voice they're reading. Proponent text on the left, scholarly text on the right (or top/bottom on mobile). Never interleave the two — the user chose to see both layers; show them as parallel readings, not as proponent-text-with-corrections-bolted-on.

Each scholarly caveat carries the same fields:

- **Academic framing** — how the figure is described in religious studies
- **Source criticism** — what's known about the texts and their dating
- **Interpretive moves** — where the comparative reading is a modern synthesis vs. an ancient one
- **Scholarly references** — actual citations the user can pursue
- **Contested points** — where specialists disagree

---

### Tone

- Neutral, descriptive, source-critical
- No tone of debunking or condescension toward proponent claims
- No tone of endorsement either
- The voice of a religious studies professor: "here is what is known, here is what is contested, here is the methodological lineage of the comparative move"
- Cite actual scholars and texts. Vagueness undermines the mode.

---

### Required caveat types (apply where relevant — not every node needs every type)

#### 1. Source-critical caveat

For figures whose textual transmission is contested, late, fragmentary, or reconstructed.

**Template:**

> The primary sources for [figure] are [list]. Of these, [text X] dates to [period] and is preserved in [language/medium]. [Issues: fragmentary state, late redaction, polemical context, single-manuscript witness, etc.]. The figure as we know them is partly a reconstruction; [name a key scholar] argues [position]; [name another] argues [counter-position].

**Example for Yaldabaoth:**

> Yaldabaoth is known almost entirely from the Nag Hammadi codices (discovered 1945), particularly the *Apocryphon of John*. These Coptic texts are 4th-century translations of earlier Greek originals, themselves likely 2nd-century. We have no pre-Christian Gnostic sources. Karen King (*What Is Gnosticism?*, 2003) has argued that "Gnosticism" as a unified category is largely a modern scholarly construct; Bentley Layton and Michael Williams (*Rethinking "Gnosticism,"* 1996) have made similar cases. The figure of Yaldabaoth is real in the texts; the coherent system we map him into is partly a 20th-century synthesis.

#### 2. Interpretive-move caveat

For parallels that are modern comparative claims, not ancient ones.

**Template:**

> The identification of [figure A] with [figure B] is an interpretive move, not a claim made by the original tradition. This equation appears in [name the modern lineage: Theosophy, Traditionalism, Jungian comparative work, etc.]. The ancient [tradition] did not equate these figures; [tradition] sources describe [figure A] in [their own terms].

**Example for Yahweh = Yaldabaoth:**

> The equation Yahweh = Yaldabaoth is a Gnostic interpretive move, made by specific 2nd-century Christian sects (Sethians, Ophites, some Valentinians). It is not a consensus historical claim and is rejected by mainstream Jewish, Christian, and academic biblical scholarship. Within Hebrew tradition, Yahweh and El Elyon were originally distinct deities in the Canaanite pantheon (Mark Smith, *The Early History of God*, 2002; *The Origins of Biblical Monotheism*, 2001) — Yahweh emerged from the southern Levantine milieu and was later identified with El, the head of the Canaanite divine council. The Gnostic move splits these back apart and places Yahweh below El Elyon. Whether one finds this compelling is a theological question, not a historical one.

#### 3. Tradition-internal caveat

For figures whose role within their own tradition is more nuanced than the four-tier framework captures.

**Template:**

> Within [tradition], [figure] is not understood primarily as [the function we've tagged them with]. Their fuller role includes [other functions, contexts, ritual settings]. The four-tier mapping foregrounds [function X] because it enables structural comparison, but readers should know that [tradition] practitioners would also emphasize [Y and Z].

**Example for Brahma:**

> The Source Map places Brahma in Tier 3 (Demiurge) in his "egoic aspect," drawing on Puranic myths where Brahma is humbled by Vishnu and Shiva (e.g., the *Linga Purana*'s pillar-of-fire story). Within living Hindu traditions, however, Brahma is one of the Trimurti and is rarely worshipped as a demiurge-villain. The "egoic Brahma" reading is a selective use of specific mythological episodes to enable the Gnostic-comparative mapping. A Vaishnava or Shaiva practitioner would describe Brahma quite differently. See Wendy Doniger, *The Hindus: An Alternative History* (2009), for the spread of Brahma's roles across the Sanskrit corpus.

#### 4. Methodological-lineage caveat

For each major comparative claim, name the lineage of thought it descends from. This is the most important scholarly-mode addition.

**Template:**

> The comparative reading applied here descends from [lineage]. Key figures in this lineage include [scholars/practitioners]. The lineage's strengths: [what it sees clearly]. Its known limitations in academic religious studies: [where specialists push back].

**Example for the perennialist move generally:**

> The Source Map operates within the "perennial philosophy" tradition — the claim that all religions point to a common esoteric truth. This lineage runs through Marsilio Ficino's *prisca theologia*, Pico della Mirandola, the Cambridge Platonists, Madame Blavatsky's Theosophy, René Guénon and Frithjof Schuon's Traditionalism, Aldous Huxley's *The Perennial Philosophy* (1945), Huston Smith, and Manly P. Hall. Academic religious studies has been critical of perennialism since at least Steven Katz's "Language, Epistemology, and Mysticism" (1978), which argued that mystical experiences are shaped by their religious contexts rather than pointing to a single underlying truth. Wouter Hanegraaff (*Esotericism and the Academy*, 2012) provides the standard scholarly genealogy. Readers should know they are working within a contested but historically deep interpretive tradition.

#### 5. Contested-identification caveat

For specific parallel claims that scholars actively dispute.

**Template:**

> The identification of [A] with [B] is contested. Proponents: [who and where]. Critics: [who and where]. Key issues: [what's at stake].

**Example for Enki = Prometheus:**

> The Enki–Prometheus parallel is widely cited in comparative mythology (from Frazer through Joseph Campbell to contemporary writers like David Leeming, *The Oxford Companion to World Mythology*, 2005). The structural similarity is strong: both are craftsman-gods who side with humanity against the senior council. However, there is no demonstrated historical transmission line; the parallel is typological, not genealogical. Stephanie Dalley (*Myths from Mesopotamia*, 1989) treats Enki within his own Sumerian-Akkadian context without recourse to Greek parallels.

#### 6. Modern-syncretic-layer caveat

For content drawn from modern channeled or syncretic sources (Theosophy, Law of One, Urantia, Sitchin, etc.).

**Template:**

> This claim derives from [modern source], a [date] [type: channeled / synthesized / reconstructed] work. It is not attested in any pre-modern source from the tradition it claims to describe. Mainstream academic treatment of [source]: [brief characterization].

**Example for the Sitchin–Anunnaki layer:**

> The interpretation of the Anunnaki as extraterrestrial genetic engineers is the work of Zecharia Sitchin (*The 12th Planet*, 1976, and subsequent volumes). It is not present in Sumerian or Akkadian sources; Sitchin's translations have been rejected by every working Assyriologist who has examined them (see, e.g., Michael S. Heiser's detailed linguistic critiques at sitchiniswrong.com). The structural reading of Enki as craftsman-and-liberator stands independently of the Sitchin material; the Source Map's Enki node uses the structural reading. Users encountering Sitchin's interpretation elsewhere should know it is a 20th-century synthesis, not a translation of Sumerian belief.

---

### Standing caveats (always available, linked from About page)

These four caveats apply to the framework as a whole. Surface them in scholarly mode as a permanent header on every node panel, and as an entry in the About menu.

#### Standing caveat 1 — The framework is one lens

> The four-tier framework (Source / Council / Demiurge / Archons + Cross-Tier) is derived from Sethian and Valentinian Gnostic texts. It is one interpretive lens, not an objective claim about the structure of reality. Many figures in the database would be described differently by practitioners of their own traditions. The framework's value is comparative, not dogmatic.

#### Standing caveat 2 — Structural vs. historical claims

> Two figures sharing a structural function (e.g., "craftsman who fashions humans from clay") is a typological observation. It does **not** entail that the two traditions share a historical origin, that one borrowed from the other, or that they refer to the same being. Most parallels in the Source Map are typological. Where genealogical transmission is documented (e.g., the spread of the Flood narrative from Mesopotamia to Hebrew tradition), the node will say so explicitly.

#### Standing caveat 3 — Proponent voice is the default

> The default-mode essence text presents claims as their proponents would state them, without disclaimers. This is an editorial choice to let traditions speak in their own voice. It does not imply the project endorses every claim. Scholarly mode (this panel) provides academic context.

#### Standing caveat 4 — Living traditions

> Many traditions represented in the Source Map are living traditions with practitioners alive today. Hindu, Jewish, Buddhist, Taoist, Yoruba, Sufi, Christian, and Indigenous traditions in particular have practitioners who may disagree sharply with the comparative-esoteric readings used here. The project respects these disagreements. The framework is offered as a tool for synthesis, not as a replacement for tradition-internal understanding.

---

### Scholarly reference library (build into the app as a clickable bibliography)

#### Foundational comparative-esotericism scholarship

- Wouter Hanegraaff, *Esotericism and the Academy* (Cambridge, 2012)
- Wouter Hanegraaff, *New Age Religion and Western Culture* (Brill, 1996)
- Antoine Faivre, *Access to Western Esotericism* (SUNY, 1994)
- Kocku von Stuckrad, *Western Esotericism: A Brief History* (Equinox, 2005)

#### Gnostic studies

- Karen King, *What Is Gnosticism?* (Harvard, 2003)
- Michael Williams, *Rethinking "Gnosticism"* (Princeton, 1996)
- Bentley Layton, *The Gnostic Scriptures* (Doubleday, 1987)
- Elaine Pagels, *The Gnostic Gospels* (Random House, 1979)
- Birger Pearson, *Ancient Gnosticism* (Fortress, 2007)

#### Hebrew Bible / divine council

- Mark S. Smith, *The Early History of God* (2nd ed., Eerdmans, 2002)
- Mark S. Smith, *The Origins of Biblical Monotheism* (Oxford, 2001)
- Michael S. Heiser, *The Unseen Realm* (Lexham, 2015)
- Frank Moore Cross, *Canaanite Myth and Hebrew Epic* (Harvard, 1973)

#### Mesopotamian

- Stephanie Dalley, *Myths from Mesopotamia* (Oxford, 1989, rev. 2000)
- Thorkild Jacobsen, *The Treasures of Darkness* (Yale, 1976)
- Jean Bottéro, *Religion in Ancient Mesopotamia* (Chicago, 2001)

#### Egyptian

- Erik Hornung, *Conceptions of God in Ancient Egypt* (Cornell, 1982)
- Jan Assmann, *The Search for God in Ancient Egypt* (Cornell, 2001)
- Garth Fowden, *The Egyptian Hermes* (Cambridge, 1986)

#### Hermetic / Neoplatonic

- Brian Copenhaver, *Hermetica* (Cambridge, 1992)
- Pierre Hadot, *Plotinus, or the Simplicity of Vision* (Chicago, 1993)
- Algis Uždavinys, *Philosophy as a Rite of Rebirth* (Prometheus Trust, 2008)

#### Kabbalah

- Gershom Scholem, *Major Trends in Jewish Mysticism* (Schocken, 1941)
- Moshe Idel, *Kabbalah: New Perspectives* (Yale, 1988)
- Daniel Matt (trans.), *The Zohar: Pritzker Edition* (Stanford, ongoing)

#### Hindu

- Wendy Doniger, *The Hindus: An Alternative History* (Penguin, 2009)
- Gavin Flood, *An Introduction to Hinduism* (Cambridge, 1996)
- Patrick Olivelle (trans.), *The Early Upanishads* (Oxford, 1998)

#### Comparative mythology (use critically)

- Mircea Eliade, *Patterns in Comparative Religion* (Sheed & Ward, 1958)
- Georges Dumézil, *Mitra-Varuna* (Zone, 1988)
- Joseph Campbell, *The Masks of God* (Viking, 1959–1968) — note: Campbell's monomyth has been heavily critiqued; cite cautiously
- David Leeming, *The Oxford Companion to World Mythology* (Oxford, 2005)

#### Critiques of perennialism (essential balance)

- Steven Katz (ed.), *Mysticism and Philosophical Analysis* (Oxford, 1978)
- Robert Sharf, "Buddhist Modernism and the Rhetoric of Meditative Experience" (*Numen*, 1995)
- J.Z. Smith, *Drudgery Divine* (Chicago, 1990)

---

### When generating a scholarly-mode caveat

Apply this checklist:

1. Has the textual transmission been characterized? *(Source-critical caveat)*
2. Is the parallel a modern interpretive move? *(Interpretive-move caveat)*
3. Does the figure's full role within their tradition exceed what the four-tier mapping captures? *(Tradition-internal caveat)*
4. What lineage of comparative thought does this reading descend from? *(Methodological-lineage caveat)*
5. Is the specific identification contested by working specialists? *(Contested-identification caveat)*
6. Is any content sourced from modern channeled or syncretic material? *(Modern-syncretic-layer caveat)*

If yes to any → write that caveat. If no → omit it; don't pad.

A scholarly-mode panel should typically contain 2–4 caveats. Not every caveat type applies to every node. Quality over coverage.

---

### Do not

- Use scholarly mode to refute proponent voice; use it to contextualize
- Hedge proponent voice with academic disclaimers in default mode
- Cite scholars vaguely ("some scholars argue...") — name them
- Treat religious studies consensus as final truth; it has its own interpretive commitments
- Mock or condescend to modern syncretic traditions; describe them accurately and let the reader judge

### Always

- Name actual scholars and works
- Distinguish source-critical issues from interpretive disagreements
- Acknowledge living traditions and their internal voices
- Surface the methodological lineage of every comparative claim
- Keep proponent voice and scholarly voice as parallel readings, not adversaries

---

### The goal

A serious user can flip between proponent voice and scholarly context with full knowledge of which layer they're in, who's making which claim, and what the methodological stakes are. The Source Map becomes a tool for honest inquiry — not a proselytizing instrument, not a debunking instrument, but a navigable atlas where every claim is sourced and every interpretive move is named.



---

<a id="part-6"></a>
# Part 6: DOC 04 — THE PRACTICES LAYER

*Source file: `docs/04-practices-layer.md`*

---

## The Practices Layer — Ascent Methods Across Traditions

**Purpose:** The original spec (`docs/01`, section 8) flagged a future expansion: a fifth dimension for **practices** — how each tradition proposed to ascend from Tier 3/4 back to Tier 1. This document is that fifth dimension. It turns the Source Map from a descriptive atlas into an actionable tool.

If the Source Map answers *"what is the structure of the divine?"*, the practices layer answers *"how does a person actually approach it?"*

---

### Design principle

For each tradition, identify the **practice or practice family** that the tradition itself proposes for moving from ordinary embedded consciousness (Tier 3/4 — the material order, the rulers, the sleep of the demiurge) back toward Tier 2 (alignment with the true council and the Logos) and ultimately Tier 1 (recognition of, or absorption into, the unmanifest Source).

Practices are not parallels in the structural sense — they are tradition-internal **methods**. But they cluster into recognizable families, and the Source Map names those families so a user can see which methods across traditions belong to the same kind of work.

---

### The seven practice families

These are not exhaustive, but they cover the overwhelming majority of documented ascent technologies. Each family carries its own logic, its own characteristic risks, and its own claimed fruits.

#### Canonical family slugs (for the database)

Each family has a stable slug used in the `family` field of every practice record:

- `contemplative-quieting`
- `devotional-union`
- `theurgy`
- `gnosis-through-knowledge`
- `embodied-energetic`
- `ethical-service`
- `direct-transmission`

#### Family 1 — Contemplative quieting (apophatic / via negativa)

**Core mechanism:** Still the mind to the point where the layer of personality drops away and the underlying ground is recognized. The Source is not reached by adding anything but by subtracting everything until only awareness remains.

**Tradition instances:**

- **Christian apophatic / hesychasm:** *The Cloud of Unknowing*, Pseudo-Dionysius, Meister Eckhart's "Gelassenheit" (releasement), the Jesus Prayer practiced in stillness
- **Sufi:** *fana* (annihilation of self), silent dhikr, *muraqaba* (watchful presence)
- **Zen Buddhist:** zazen (just sitting), shikantaza, koan practice in its silent phase
- **Tibetan Buddhist:** Dzogchen *rigpa* recognition, Mahamudra resting in nature of mind
- **Hindu (Advaita Vedanta):** *atma-vichara* (self-inquiry, "Who am I?"), neti-neti ("not this, not this")
- **Taoist:** *zuowang* (sitting forgetting), *wu wei* in meditation
- **Gnostic / Hermetic:** silent contemplation of the Monad; the Hermetic *gnosis* through inward turning
- **Jewish:** *hitbonenut* in its silent form, *bittul ha-yesh* (annihilation of somethingness) in Hasidic practice

**Characteristic risk:** Dissociation, spiritual bypassing, mistaking emotional numbness for liberation.

**Characteristic fruit:** Direct, non-conceptual recognition of the unmanifest ground; reduction of identification with the constructed self.

#### Family 2 — Devotional union (bhakti / love)

**Core mechanism:** Concentrate love and longing on a chosen form of the divine until the boundary between lover and beloved dissolves. The path of the heart, not the intellect.

**Tradition instances:**

- **Hindu (bhakti):** Krishna devotion in Gaudiya Vaishnavism, the *Bhagavad Gita*'s bhakti yoga, the songs of Mirabai and Andal
- **Sufi:** Rumi's path, the love mysticism of Ibn 'Arabi, *qawwali* as devotional ecstasy
- **Christian:** Bernard of Clairvaux on the bride and bridegroom, Teresa of Ávila, John of the Cross, the Sacred Heart devotion
- **Jewish:** *devekut* (cleaving to God) in Hasidism, the Baal Shem Tov's path
- **Pure Land Buddhism:** *nembutsu* (recitation of Amida Buddha's name) as devotional surrender
- **Gnostic:** the bridal-chamber sacrament (Valentinian) as union with one's angelic counterpart
- **Yoruba / Vodou:** devotional song and possession-trance as union with the orisha or lwa

**Characteristic risk:** Spiritual narcissism around a chosen deity, projection of unresolved attachment needs onto the divine, sectarianism.

**Characteristic fruit:** Sustained openness of heart, dissolution of the small self through love rather than analysis.

#### Family 3 — Theurgy / ritual ascent

**Core mechanism:** Perform structured ritual actions — gestures, names, invocations, material correspondences — that align the practitioner with successive higher tiers, ascending the chain of being through correct operation.

**Tradition instances:**

- **Neoplatonic:** Iamblichus's theurgy, Proclus's ritual ascent through the *seirai* (chains of being)
- **Hermetic:** The ritual operations of the *Asclepius* and the *Picatrix*, planetary invocations
- **Kabbalistic:** *kavanot* (focused intentions during prayer) directed at specific Sephirot; the practical Kabbalah of Abraham Abulafia
- **Tantric Hindu:** *nyasa* (placement of deities on the body), mantra-yantra-mandala practice, deity-yoga
- **Tibetan Buddhist (Vajrayana):** *sadhana* practice with visualization of yidam deities, mantra recitation, mudras
- **Egyptian:** Temple ritual as ascent through the gates of the Duat; the priest performing the rites of Ra's nightly journey
- **Ceremonial magic (Western esoteric):** The Golden Dawn's ritual system, Crowley's *Liber Resh*, the LBRP
- **Christian sacramental:** The Eucharist as theurgic union; the Eastern Orthodox Divine Liturgy as ascent

**Characteristic risk:** Reification of the symbolic system, magical thinking, attachment to ritual form over content, ego inflation from "doing the work."

**Characteristic fruit:** A trained will, an ordered psyche, and (per the tradition's claims) a real participation in the higher tiers via structured correspondence.

#### Family 4 — Gnosis through knowledge (jnana / philosophical ascent)

**Core mechanism:** Penetrate ignorance directly by correct knowledge of one's nature and the cosmos. The path of discernment: distinguishing real from unreal, eternal from temporal, self from non-self.

**Tradition instances:**

- **Hindu (jnana yoga):** Advaita Vedanta as practiced by Shankara; *viveka* (discernment) and *vairagya* (dispassion)
- **Gnostic:** *gnosis* in the literal sense — the saving knowledge of one's divine origin, the Pleroma, and the Demiurge's deception; texts like the *Gospel of Truth* read as transformative knowledge
- **Hermetic:** The reading and meditation upon the *Corpus Hermeticum* as itself the practice; "to know is to be"
- **Theravada Buddhist:** *vipassana* / insight meditation as the direct seeing of the three marks of existence
- **Platonic / Neoplatonic:** *dialectic* as ascent — Diotima's ladder in the *Symposium*, the *Republic*'s divided line, contemplation of the Forms
- **Jewish:** Study of Torah as itself a form of communion (the Lurianic claim); contemplation of the Tree of Life
- **Sufi:** *ma'rifa* (mystical knowledge), distinguished from intellectual learning by direct unveiling

**Characteristic risk:** Dry intellectualism, spiritual pride, mistaking conceptual mastery for embodied transformation.

**Characteristic fruit:** Clarity, the dissolution of operative illusions, freedom from the demiurge's narratives because their structure is now seen.

#### Family 5 — Embodied / energetic transformation

**Core mechanism:** Work directly with the body's subtle energetic system — breath, channels, centers — to refine the gross into the subtle and the subtle into the causal. Ascent happens through physiological transformation.

**Tradition instances:**

- **Hindu (hatha and raja yoga):** Pranayama, the awakening and ascent of *kundalini* through the chakras, *samyama* in Patanjali's system
- **Taoist:** Internal alchemy (*neidan*), the circulation of *qi*, the formation of the immortal embryo, microcosmic orbit
- **Tibetan Buddhist:** The Six Yogas of Naropa (tummo, illusory body, dream yoga, clear light, bardo, transference), trul khor
- **Sufi:** Specific breathing patterns linked to dhikr, body-postures in the path of certain orders, the lataif system
- **Christian (Eastern):** Hesychast breath-coordinated Jesus Prayer (the Philokalia's instructions)
- **Egyptian (esoteric reconstruction):** The practices alleged to be encoded in the temple imagery — the raising of the *djed*, the activation of the *ka*
- **Modern syncretic:** Reichian work, certain Tantric reconstructions, energy-body modalities

**Characteristic risk:** Premature awakening, kundalini disorder, energetic destabilization, somatic dissociation, charismatic teacher abuse.

**Characteristic fruit:** Transformed nervous system, expanded perceptual capacity, the body itself becoming a vehicle of recognition.

#### Family 6 — Ethical / service-based path

**Core mechanism:** The ascent is accomplished by reshaping how one treats other beings. Selfless action, alignment with cosmic order, and the progressive dissolution of egoic motivation through giving.

**Tradition instances:**

- **Hindu (karma yoga):** Selfless action as practiced in the *Bhagavad Gita*; the path of Nishkama Karma
- **Mahayana Buddhist:** The bodhisattva vow, the six paramitas, the dedication of merit
- **Christian:** Works of mercy, the Beatitudes as practice, monastic service, the path of Vincent de Paul or Dorothy Day
- **Jewish:** *tikkun olam* (repair of the world), the mitzvot as ascent-by-action, gemilut hasadim
- **Sufi:** *khidma* (service), the path of futuwwa (spiritual chivalry)
- **Zoroastrian:** Good thoughts, good words, good deeds (*humata, hukhta, huvarshta*) as the entire path
- **Confucian (adjacent):** Cultivation of *ren* (benevolence) through ritual propriety in everyday life
- **Bahá'í:** Service to humanity as the highest form of worship

**Characteristic risk:** Burnout, codependency masquerading as service, savior complex, neglect of inner work.

**Characteristic fruit:** Genuine humility, organic dissolution of self-centeredness, alignment with the order that the tradition calls divine.

#### Family 7 — Direct transmission / initiatic lineage

**Core mechanism:** The practice is *received* from someone who already embodies the realization, through formal initiation, ongoing transmission, or sustained relationship. The student does not figure it out alone; they are inducted.

**Tradition instances:**

- **Hindu / Sikh:** *guru-shishya parampara*, *shaktipat*, the *diksha* of formal initiation
- **Tibetan Buddhist:** Empowerment (*wang*), oral instruction (*tri*), the threefold of view-meditation-conduct from a qualified lama
- **Zen Buddhist:** *inka shomei* (seal of authentic transmission) from teacher to student
- **Sufi:** *bay'a* (oath of allegiance to a shaykh), silsila (the unbroken chain back to the Prophet), companionship (*suhbat*)
- **Western esoteric:** Initiation through chartered orders (Rosicrucian, Masonic in its mystical readings, Martinist)
- **Gnostic / Mandaean:** Sacramental initiation (the bridal chamber, the masbuta baptism)
- **Yoruba / Vodou / Santería:** Initiation into the priesthood of a specific orisha or lwa
- **Indigenous traditions:** Apprenticeship to a recognized elder, ceremonial admission to lodges or societies (in traditions that permit description)

**Characteristic risk:** Cultic dependency, lineage politics, exploitation by inauthentic teachers, transmission to unprepared recipients.

**Characteristic fruit:** Access to instruction that's not in books, an embodied check on self-deception, membership in a living current.

---

### How the practices layer maps onto the Source Map UI

#### As a node sub-panel

Each cosmological figure-node can carry a `practices_associated` field listing the tradition-internal practices most associated with that figure. For example:

- **Sophia node** → contemplative quieting (recovering the divine spark), gnosis through knowledge (recognizing the Demiurge), the bridal chamber (theurgy)
- **Krishna node** → devotional union (bhakti yoga), ethical/service (karma yoga in the Gita), gnosis (jnana yoga in the Gita)
- **Christ-Aeon node** → devotional union, ethical/service, contemplative quieting (hesychasm), theurgy (sacraments)

#### As a separate canvas view

A toggle: **"Show practices."** When enabled, the canvas re-organizes around the seven practice families instead of the four cosmological tiers. Each family becomes a region; practices from every tradition cluster within it. Users can see, for instance, that hesychasm, zazen, atma-vichara, fana, and sitting-forgetting are all in the same room.

#### As a recommendation engine (long-term feature)

A user who marks "I am drawn to [Sophia / Enki / the Tao]" gets suggested practices: the families historically associated with that figure's tradition, and the cross-tradition family equivalents.

---

### Data schema for the practices layer

Each practice gets a node of its own with this schema:

```json
{
  "id": "hesychasm",
  "primary_name": "Hesychasm",
  "tradition": "Eastern Orthodox Christian",
  "family": "contemplative-quieting",
  "alternate_families": ["embodied-energetic"],
  "core_mechanism": "Stillness of mind combined with the rhythmic Jesus Prayer, often coordinated with breath, leading to the vision of the uncreated light.",
  "primary_sources": [
    "The Philokalia (compiled 1782)",
    "Gregory Palamas, Triads",
    "The Way of a Pilgrim (19th c.)"
  ],
  "associated_figures": ["christ-aeon", "the-monad", "the-uncreated-light"],
  "key_instructions": [
    "Sit quietly in a darkened place",
    "Coordinate the Jesus Prayer with the breath",
    "Descend attention from the head into the heart",
    "Maintain watchful sobriety (nepsis) over thoughts"
  ],
  "characteristic_risks": ["self-deception (prelest)", "premature spiritual experiences"],
  "characteristic_fruits": ["unceasing prayer", "vision of the uncreated light", "deification (theosis)"],
  "cross_tradition_parallels": ["zazen", "atma-vichara", "fana", "zuowang", "dzogchen-resting"],
  "notes_for_modern_practitioner": "Traditionally received from a spiritual father; the Philokalia warns repeatedly against unguided practice."
}
```

---

### Editorial principles for the practices layer

1. **Describe; do not prescribe.** The Source Map names practices and identifies family-relationships. It does not tell users which practice is right for them.
2. **Honor lineage.** Many practices are traditionally received only through initiation or guidance. Where that's the case, say so. Do not encourage unguided practice in traditions that explicitly warn against it.
3. **Flag risks honestly.** Every serious practice has characteristic failure modes. List them.
4. **Distinguish documented from reconstructed.** Ancient Egyptian "practices" reconstructed by modern occultists are not the same as living traditions; mark accordingly.
5. **Respect tradition-internal authority.** Where a tradition designates certain practices as restricted (sacred ceremonies of indigenous communities, esoteric tantras requiring empowerment), the Source Map names the practice family but does not provide instruction.

---

### The user's path through the practices layer

A user arrives at the Source Map asking some version of *"who do I pray to, and how?"* The framework gives a structural answer to the first half (the four tiers + cross-tier figures). The practices layer gives an operational answer to the second half:

> *Across every documented tradition, the same seven families of practice show up. Pick the figure whose function speaks to you, see what tradition or traditions have honored that function, look at what practices those traditions actually used, and look at what family those practices belong to. You can then either go deep into one tradition's version, or sample the family across traditions — knowing that hesychasm and zazen and self-inquiry are pointing at the same gesture in different languages.*

The framework's promise is met here: the names change, the structure does not — and the methods, too, cluster into a structure that any honest seeker can navigate.



---

<a id="part-7"></a>
# Part 7: DOC 05 — PERSONAL LAYER AND MY MAP

*Source file: `docs/05-personal-layer-and-my-map.md`*

---

## Personal Layer — "My Map," Forking, and Sharing

**Purpose:** The original spec (`docs/01`) promises users they can save their own connections as a personal layer ("my map"). This document defines how that personal layer works — how it's stored, how it relates to the canonical map, and how users can share or fork their maps.

---

### Design principle

The canonical Source Map (curated by the project) is the **base layer**. Every user gets their own **overlay** that lives on top of it. Overlays can:

- Add new connection lines between existing nodes
- Add notes to existing nodes
- Highlight subsets of nodes the user finds important
- Add new nodes (proposed; flagged as user-contributed)
- Hide nodes the user wants out of view
- Be exported, shared, and forked

Crucially: the user's overlay never alters the base layer. The base map is a stable reference shared by everyone. The overlay is the user's interpretation written on top of it.

---

### Three views of the same map

The UI surfaces three view modes (per `docs/01` section 4) and the personal layer interacts with each:

| View mode | What it shows | Personal layer behavior |
|---|---|---|
| **Canonical** | Base map only, project-curated | Overlay is hidden; user sees the same map as everyone else |
| **My Map** | Base map + user's overlay | All user-drawn connections, notes, highlights, hidden nodes applied |
| **Scholarly** | Base map + scholarly caveats | Independent of personal layer; can be combined with My Map |

The "My Map" toggle is the entry point to the personal layer. Default behavior on first session: a clean overlay with no edits.

---

### What a user can add to their overlay

#### 1. Custom connection lines

The signature interaction. The user drags from one node to another and records *why* they see a parallel. Each user-drawn line has its own schema (see `docs/06` for the connection-evidence detail):

```json
{
  "id": "user-conn-9f3a",
  "from_node": "enki",
  "to_node": "prometheus",
  "user_id": "user_xyz",
  "evidence_types": ["structural-function-match", "narrative-pattern-match"],
  "note": "Both fashioned humanity and defied the senior council to give us fire/wisdom.",
  "created_at": "2026-05-15T19:00:00Z",
  "visibility": "private"
}
```

#### 2. Node annotations

Personal notes attached to existing nodes. Markdown-supported. Visible only to the user unless explicitly shared.

```json
{
  "id": "user-note-1c2d",
  "node_id": "sophia",
  "user_id": "user_xyz",
  "body": "Reading Sophia as the same figure as the Holy Spirit in feminine readings cracked something open. Returning to this.",
  "created_at": "2026-05-15T19:05:00Z",
  "visibility": "private"
}
```

#### 3. Highlights and tags

Custom colored highlights or tags applied to nodes, so a user can color-code their own thematic groupings.

```json
{
  "id": "user-tag-set-3",
  "user_id": "user_xyz",
  "tag_name": "Light-bringers I want to study",
  "color": "#ffb547",
  "node_ids": ["sophia", "prometheus", "enki", "thoth", "christ-aeon", "khidr"]
}
```

#### 4. Hidden nodes

The user can hide nodes from their personal view without affecting the base map.

```json
{
  "user_id": "user_xyz",
  "hidden_node_ids": ["modern-syncretic-channeled-source-X"]
}
```

#### 5. User-proposed nodes

A user can add a figure they think should be in the database. These are flagged as user-contributed and only appear in that user's overlay until reviewed for inclusion in the canonical map.

```json
{
  "id": "user-node-tiamat",
  "primary_name": "Tiamat",
  "tradition": "Mesopotamian (older Sumero-Akkadian layer)",
  "tier": "cross-tier",
  "user_id": "user_xyz",
  "status": "user-contributed-pending-review",
  "essence": "Primordial saltwater chaos-mother slain by Marduk to fashion the cosmos from her corpse. Read as the suppressed feminine ground in some feminist Gnostic readings.",
  "function_tags": ["primordial-feminine", "slain-by-demiurge", "matter-as-mother"],
  "parallel_node_ids_proposed": ["sophia", "shakti", "nuit"]
}
```

When the user shares a map containing user-proposed nodes, the recipient sees them clearly marked as user-contributed.

---

### Forking

A user can **fork** another user's published map. Forking is the act of taking someone else's overlay and making it the starting point for one's own.

When User B forks User A's map:

1. A copy of User A's overlay is created and attached to User B's account.
2. The copy retains attribution: "Forked from User A's *Light-Bringers Working Map*, May 2026."
3. User B can then add, remove, or modify connections and notes freely. None of their changes affect User A's original.
4. Forks can be forked. The lineage is preserved as a chain.

Forking is the mechanism by which interpretive lineages form within the app. A teacher publishes their map; students fork it; students publish their own versions; over time, a tree of related interpretive maps grows.

#### Fork attribution

Each overlay tracks its lineage:

```json
{
  "overlay_id": "overlay_xyz",
  "user_id": "user_xyz",
  "title": "My working map, after reading Pagels",
  "forked_from": "overlay_abc",
  "forked_from_user": "user_abc",
  "forked_from_title": "Pagels-inspired Gnostic emphasis",
  "fork_depth": 2,
  "created_at": "2026-05-15T20:00:00Z"
}
```

---

### Sharing

Three sharing modes:

#### 1. Private (default)

The overlay is visible only to the user. No one else can view, fork, or comment.

#### 2. Unlisted link

The user generates a shareable URL. Anyone with the link can view the overlay but not modify it. The link can be revoked.

Use case: sharing one's working map with a specific friend or teacher.

#### 3. Published

The user publishes the overlay to a public directory. Other users can browse, view, and fork. The publisher can choose whether to allow comments on published maps.

When published, the overlay receives:

- A public URL
- A title and description chosen by the user
- A creator handle (anonymized if the user prefers)
- A tag set (e.g., "Gnostic-emphasis," "Feminine-divine focus," "Hindu-Christian parallels")
- A fork count and a view count

#### Published map metadata schema

```json
{
  "overlay_id": "overlay_xyz",
  "title": "The Wisdom-Mother Across Traditions",
  "description": "An overlay foregrounding Sophia, Shekhinah, Shakti, Isis, Ma'at, and Prajnaparamita as one continuous figure.",
  "creator_handle": "soul_cartographer",
  "tags": ["feminine-divine", "Sophia", "cross-tradition"],
  "published_at": "2026-05-15T21:00:00Z",
  "view_count": 0,
  "fork_count": 0,
  "license": "CC-BY-SA-4.0",
  "visibility": "published"
}
```

---

### Map export and import

Every overlay can be exported as a single JSON file containing all connections, notes, tags, hidden nodes, and user-proposed nodes. The file is portable: a user can back it up, edit it in a text editor, transfer between accounts, or import another user's exported map directly.

#### Export schema (top level)

```json
{
  "schema_version": "1.0",
  "exported_at": "2026-05-15T22:00:00Z",
  "overlay": {
    "id": "overlay_xyz",
    "title": "My working map",
    "description": "...",
    "creator_handle": "user_xyz",
    "forked_from": null,
    "fork_depth": 0
  },
  "connections": [],
  "annotations": [],
  "tag_sets": [],
  "hidden_node_ids": [],
  "user_proposed_nodes": []
}
```

Each array above contains objects in the corresponding schemas defined earlier in this document: `connections` uses the user-drawn connection schema, `annotations` uses the user-note schema, `tag_sets` uses the user-tag-set schema, and `user_proposed_nodes` uses the user-proposed-node schema.

This is also the format used for forking under the hood — a fork is just an internal import-with-attribution.

---

### Comments on published maps

Optional feature, opt-in per publisher. Comments attach to:

- The whole map (general feedback)
- A specific user-drawn connection (debate the parallel)
- A specific node annotation (respond to the note)

Comments inherit the same proponent-voice-by-default editorial direction. Scholarly caveats apply equally to comments — a commenter pushing back on a parallel can cite scholarly mode if they want academic backing.

---

### Moderation and curation

User-proposed nodes that the project curators accept get promoted into the canonical map. The contributor is credited (with their consent) in the node's metadata as a contributor.

Published maps that violate the project's editorial principles (gratuitous attack on living traditions, hate-speech disguised as commentary, etc.) are subject to moderation. The default stance is permissive — comparative esotericism inherently includes contested claims — but published maps are subject to community guidelines.

---

### Why the personal layer matters

The framework's core promise (per `docs/01`'s framing text) is that the user can build their own map of the divine. Without the personal layer, the Source Map is a finished encyclopedia. With it, the Source Map becomes a tool for the user's own work — a working surface on which their interpretation can be drawn, refined, shared, contested, and forked.

The personal layer is what turns a structural atlas into a personal practice.



---

<a id="part-8"></a>
# Part 8: DOC 06 — CONNECTION-EVIDENCE SCHEMA

*Source file: `docs/06-connection-evidence-schema.md`*

---

## Connection-Evidence Schema

**Purpose:** When a user draws a line between two nodes (per `docs/05`), the line carries metadata describing *why* the user sees a parallel. This document defines the evidence types, the schema, and the conventions for assigning them — so that both the user and any future viewer of the map can tell whether a connection is a rigorous structural parallel, a documented historical transmission, a personal intuition, or something else. It extends the base data model in `docs/01` section 3 with typed connection metadata.

The same schema is used by project curators when adding lines to the canonical base map. Every line, user-drawn or canonical, is typed.

---

### Why evidence typing matters

A loose comparative map quickly becomes unreadable: every node is connected to every other node and the user can't tell which connections are well-grounded and which are speculative. Without evidence typing, the Source Map devolves into free association.

With evidence typing, the user can:

- Filter the canvas to show *only* structural-function parallels (the airtight comparative claims)
- Or *only* documented historical transmissions (the genealogical evidence)
- Or surface their own intuitions (the personal lines they want to test)
- Distinguish at a glance between "scholars agree this is parallel" and "I feel a resonance here"

This is the difference between a serious tool and a Pinterest board.

---

### The eight evidence types

Every connection line carries **one or more** evidence types. Multi-typed lines are common and welcome — they indicate stronger parallels.

#### 1. `structural-function-match`

The two figures perform the same cosmological function as defined in `docs/02`. This is the strongest typological claim available and the spine of the Source Map.

**Example:** Sophia ↔ Shekhinah (both: fallen-and-redemptive feminine wisdom, exiled into matter, recoverable through gnosis).

**Required field:** `function_tags_shared` — the explicit function tags both nodes carry.

#### 2. `narrative-pattern-match`

The two figures appear in narratives with the same plot structure: same antagonist, same act, same consequence. Distinct from structural-function-match because narrative pattern can hold even when the figures occupy different cosmological tiers.

**Example:** Prometheus stealing fire from Zeus and being chained to a rock ↔ the Ophite Serpent giving Eve fruit and being cursed by Yahweh.

**Required field:** `narrative_elements_shared` — list the matching plot beats.

#### 3. `documented-historical-transmission`

There is documented evidence that one tradition borrowed, inherited, or directly absorbed the figure or motif from the other. This is the strongest *genealogical* claim available.

**Example:** Mesopotamian Atrahasis flood narrative ↔ Hebrew Noah narrative — the textual dependence is documented and consensus among Assyriologists and biblical scholars.

**Required field:** `transmission_evidence` — citation of the scholarly source(s) establishing transmission.

#### 4. `etymological-link`

The two figures' names are demonstrably linguistically related, or one figure's name derives from the other's.

**Example:** Roman Mercurius ↔ Greek Hermes (direct interpretatio romana, documented).

**Required field:** `linguistic_basis` — the philological evidence.

**Caution:** Loose phonetic similarity ("the name sounds like...") does NOT qualify. Only documented derivation or attested cognate status.

#### 5. `iconographic-parallel`

The two figures share specific visual or symbolic attributes (animal forms, ritual objects, gestures) in their respective iconographic traditions.

**Example:** Hermes's caduceus ↔ Mesopotamian Ningishzida's serpent-staff ↔ the Hindu kundalini diagram.

**Required field:** `iconographic_elements_shared` — list the matching visual elements.

**Caution:** Iconographic parallels are suggestive but weak on their own. They become significant when combined with structural-function-match or documented-historical-transmission.

#### 6. `ritual-practice-parallel`

The two figures are addressed through analogous ritual practices in their respective traditions — same gestures, same offerings, same liturgical functions.

**Example:** The Egyptian opening-of-the-mouth ritual ↔ certain Tibetan Buddhist consecration rites for statues.

**Required field:** `practice_elements_shared` — list the matching ritual elements.

#### 7. `modern-syncretic-identification`

The two figures are identified with each other in a modern syncretic or esoteric tradition (Theosophy, Traditionalism, Sitchin, Law of One, Jungian comparative work, modern Pagan reconstructions, etc.), but the identification is not present in pre-modern sources.

**Example:** The Theosophical identification of Sanat Kumara with Skanda, Kartikeya, the Ancient of Days, and various other "Lords of Flame" figures.

**Required field:** `syncretic_source` — name the modern source making the identification, with a date.

**Important:** This evidence type does not invalidate the parallel; it correctly contextualizes it. A user filtering for "only pre-modern parallels" can exclude lines of this type. A user studying the lineage of modern esoteric thought can filter *for* this type.

#### 8. `personal-resonance`

The user perceives a meaningful parallel that they cannot or have not yet justified through any of the other evidence types. This is intuition, contemplation, or work-in-progress.

**Example:** A user might draw a line between Khidr (Sufi) and the Green Man (Celtic/folkloric) because something in their reading or meditation suggests the parallel, before they have worked out the structural-function case.

**Required field:** `personal_note` — the user's own reasoning, however provisional.

**Important:** This evidence type is fully legitimate. The Source Map is a tool for inquiry, and inquiry begins with intuition before it becomes argument. Filter-aware users can hide personal-resonance lines from public-published maps if they want to share only the rigorous claims. A user's private working map can hold any number of personal-resonance lines without judgment.

---

### Strength rating

In addition to evidence types, each connection carries a **strength rating** from the user or curator:

- `tentative` — "I'm exploring this; I'm not certain"
- `working` — "I think this holds but I want to refine it"
- `confident` — "I'm satisfied this parallel is real"

The strength rating is independent of the evidence types. A user might have a `confident` rating on a `personal-resonance` line (they trust their intuition) while reserving `tentative` for a multi-typed line they're still working through.

The UI renders strength visually: tentative lines are dashed and faint, working lines are solid and medium, confident lines are solid and bold.

---

### Full connection schema

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

### Canonical lines vs. user lines

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

### Filter logic in the UI

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

### Why this matters

The Source Map is not just a map of who-equals-who. It is a map of **how strongly** any given parallel holds, **on what basis**, and **according to whom**. A user who interacts with the connection-evidence schema seriously is doing real comparative work — distinguishing rigorous claims from speculative ones, structural from genealogical, ancient from modern, evidence-based from intuitive.

This is the difference between a tool that flattens all traditions into mush and a tool that lets a careful inquirer see the actual texture of the comparative landscape.

The goal, as the framing text says: *the same Truth has been described in every age. The names change. The structure does not.* The connection-evidence schema is what lets the user verify that claim themselves, one line at a time.



---

<a id="part-9"></a>
# Part 9: APPENDIX A — SELF-TEST SCRIPT (scripts/self_test.py)

*Source file: `scripts/self_test.py`*

---

```python
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
```


---

<a id="part-10"></a>
# Part 10: APPENDIX B — PDF BUILD SCRIPT (scripts/build_pdfs.sh)

*Source file: `scripts/build_pdfs.sh`*

---

```bash
#!/bin/bash
# Build PDFs for the spec package using weasyprint.
# Run from repo root: bash scripts/build_pdfs.sh

cd "$(dirname "$0")/.."

mkdir -p pdfs
rm -f pdfs/*.pdf

# Custom CSS for clean rendering
cat > /tmp/spec_style.css <<'EOF'
@page {
  size: letter;
  margin: 0.85in;
  @bottom-center {
    content: counter(page) " / " counter(pages);
    font-size: 9pt;
    color: #888;
  }
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.5;
  color: #222;
}
h1 {
  font-size: 22pt;
  border-bottom: 2px solid #222;
  padding-bottom: 6pt;
  margin-top: 0;
}
h2 { font-size: 16pt; margin-top: 18pt; color: #1a1a1a; }
h3 { font-size: 13pt; margin-top: 14pt; color: #2c2c2c; }
h4 { font-size: 11pt; margin-top: 10pt; color: #333; }
code {
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 9.5pt;
  background: #f4f4f4;
  padding: 1px 4px;
  border-radius: 3px;
}
pre {
  background: #f6f6f6;
  border-left: 3px solid #888;
  padding: 10pt;
  font-size: 9pt;
  white-space: pre-wrap;
  word-break: break-word;
  page-break-inside: avoid;
}
pre code { background: transparent; padding: 0; }
blockquote {
  border-left: 3px solid #999;
  padding-left: 12pt;
  color: #555;
  margin-left: 0;
  font-style: italic;
}
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 9pt;
  margin: 8pt 0;
  page-break-inside: avoid;
}
th, td {
  border: 1px solid #bbb;
  padding: 4pt 6pt;
  text-align: left;
  vertical-align: top;
}
th { background: #eee; }
hr { border: none; border-top: 1px solid #ccc; margin: 18pt 0; }
ul, ol { margin: 6pt 0; }
li { margin: 2pt 0; }
EOF

declare -A titles=(
  ["README.md"]="The Source Map - Specification Package"
  ["docs/01-comparative-cosmology-spec.md"]="01 - Comparative Cosmology Feature Spec"
  ["docs/02-structural-cross-comparison.md"]="02 - Structural Cross-Comparison Methodology"
  ["docs/03-scholarly-mode.md"]="03 - Scholarly Mode Caveat Layer"
  ["docs/04-practices-layer.md"]="04 - The Practices Layer"
  ["docs/05-personal-layer-and-my-map.md"]="05 - Personal Layer and My Map"
  ["docs/06-connection-evidence-schema.md"]="06 - Connection-Evidence Schema"
  ["methodology/master-prompt.md"]="Master Prompt for the Building Chat"
)

for src in "${!titles[@]}"; do
  base=$(basename "$src" .md)
  title="${titles[$src]}"
  echo "-> $base.pdf"
  pandoc "$src" -o "pdfs/$base.pdf" \
    --pdf-engine=weasyprint \
    --metadata title="$title" \
    --css=/tmp/spec_style.css \
    --standalone 2>&1 | grep -vE "^WARNING:|^$" || true
done

echo
echo "PDFs built:"
ls -la pdfs/
```


---

<a id="part-11"></a>
# Part 11: APPENDIX C — TEST RUN RECORD (tests/test_outputs.md)

*Source file: `tests/test_outputs.md`*

---

## Self-Test Results

This file is the canonical record of the most recent self-test run against the spec package. Re-run with:

```
python3 scripts/self_test.py
```

### Last run output

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



---

# End of combined package

This file contains the complete spec package as of the most recent build.

- All 8 markdown documents (README + master prompt + 6 spec docs)
- Both scripts (self-test + PDF builder)
- Canonical test-run record

Self-test status at last run: **102/102 passing**.

To extract individual files back out of this combined edition, split on `# Part N: ...` headings — each section's original file path is noted just below the heading.
