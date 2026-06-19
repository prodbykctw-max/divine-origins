# The Source Map — Specification Package

> *Every culture has named the divine differently — but the structures repeat. The unknowable Source. The Most High and the divine council. The craftsman-god who shaped this world. The rulers who govern it. The light-bringers who descend to wake us up.*

This repository contains the complete specification for **The Source Map** — a comparative cosmology feature that maps every documented deity, divine concept, and cosmological figure across world traditions onto a single four-tier hierarchy derived from Gnostic cosmology.

The methodology label for users: **Comparative Esotericism / Perennial Cosmology** — mapping the Source across traditions using the Gnostic four-tier framework as the interpretive key.

---

## Repository structure

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

## How to use this package

### For the building chat (Claude or another assistant)

Paste **`methodology/master-prompt.md`** into the chat alongside the original `Comparative_Cosmology_Feature.pdf`. The master prompt references every document in `docs/` and gives the assistant binding instructions for applying them consistently.

### For the GitHub repo

Each file in `docs/` is a self-contained markdown document. They can be rendered by GitHub directly, ingested into a documentation site (Docusaurus, MkDocs, Nextra), or converted to PDF using `scripts/` utilities.

### For a future developer

The data schema, UI spec, and database seed are all in `docs/01`. The methodology that governs how new nodes are added is in `docs/02`. The scholarly caveat layer is in `docs/03`. The actionable user-facing layer (practices, personal maps, evidence types) is in `docs/04`–`docs/06`.

---

## The four-tier framework at a glance

| Tier | Name | Function | Example figures |
|---|---|---|---|
| **1** | Unmanifest Source | The ineffable ground of being | Monad, Ein Sof, Brahman, Tao, Nun, Ginnungagap |
| **2** | True Most High / Divine Council | First manifestation, head of council | El Elyon, the Aeons, Anu, Ahura Mazda, Atum, Keter |
| **3** | Demiurge | Flawed craftsman who shaped matter | Yaldabaoth, Yahweh (Gnostic reading), Marduk, Brahma-egoic |
| **4** | Archons / Rulers | Planetary powers, principalities | Seven Archons, Watchers, Olympians, Igigi, Daevas |
| **Cross-Tier** | Light-Bringers / Liberators | Bridge tiers; wake humanity | Sophia, Christ-Aeon, Prometheus, Hermes, Thoth, Enki, Loki |

---

## Editorial principles

1. **Proponent voice by default.** Each tradition speaks in its own voice without disclaimers in default mode.
2. **Scholarly mode as a toggle.** Academic context, source criticism, and contested identifications appear in a parallel panel when the user opts in.
3. **Structural function over surface similarity.** Two figures are parallel if they perform the same cosmic role — not because they share a name, animal, or planet.
4. **Living traditions respected.** Practitioners of the traditions mapped here may disagree with comparative readings. The framework offers synthesis, not replacement.
5. **Genealogical vs. typological distinguished.** Documented historical transmission is flagged. Pattern-based parallels are flagged differently.

---

## Intellectual lineage

The framework draws on:

- Pico della Mirandola, *Oratio de hominis dignitate* (1486)
- Marsilio Ficino, *Prisca Theologia*
- Manly P. Hall, *The Secret Teachings of All Ages* (1928)
- H.P. Blavatsky, *The Secret Doctrine* (1888)
- René Guénon and Traditionalist comparative work
- Wouter Hanegraaff's academic comparative esotericism

Critical balance is provided through Hanegraaff, Karen King, Michael Williams, Mark S. Smith, Steven Katz, and the working scholars cited in `docs/03`.

---

## Status

This is a specification package — not running code. The next step is for a development chat to:

1. Expand each node in the initial node list to a full data record per the schema
2. Generate a JSON seed file
3. Build the canvas UI with the four-tier layout
4. Implement drag-to-connect, side-panel detail, filters, and view-mode toggles
5. Wire in the scholarly-mode panel and the practices layer

The master prompt in `methodology/master-prompt.md` is designed to be handed to that chat as the source of truth.

---

## License & attribution

Content authored by the project team. Scholarly citations are listed within `docs/03` and remain the intellectual property of their respective authors. The four-tier interpretive framework is derived from Sethian and Valentinian Gnostic primary texts (Nag Hammadi Codices) and is in the public domain.
