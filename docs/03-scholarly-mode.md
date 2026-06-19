# Scholarly Mode — Caveat Layer Spec

**Purpose:** When the user toggles Scholarly Mode ON, every node displays an additional "Academic Context" panel alongside the proponent-voice essence text. This document defines what goes in that panel, how to write it, and which sources to cite. It implements the "scholarly mode" toggle referenced in `docs/01` section 8.

---

## Design principle

Caveats appear as a **separate panel or expandable section** within each node, labeled clearly so the user always knows which voice they're reading. Proponent text on the left, scholarly text on the right (or top/bottom on mobile). Never interleave the two — the user chose to see both layers; show them as parallel readings, not as proponent-text-with-corrections-bolted-on.

Each scholarly caveat carries the same fields:

- **Academic framing** — how the figure is described in religious studies
- **Source criticism** — what's known about the texts and their dating
- **Interpretive moves** — where the comparative reading is a modern synthesis vs. an ancient one
- **Scholarly references** — actual citations the user can pursue
- **Contested points** — where specialists disagree

---

## Tone

- Neutral, descriptive, source-critical
- No tone of debunking or condescension toward proponent claims
- No tone of endorsement either
- The voice of a religious studies professor: "here is what is known, here is what is contested, here is the methodological lineage of the comparative move"
- Cite actual scholars and texts. Vagueness undermines the mode.

---

## Required caveat types (apply where relevant — not every node needs every type)

### 1. Source-critical caveat

For figures whose textual transmission is contested, late, fragmentary, or reconstructed.

**Template:**

> The primary sources for [figure] are [list]. Of these, [text X] dates to [period] and is preserved in [language/medium]. [Issues: fragmentary state, late redaction, polemical context, single-manuscript witness, etc.]. The figure as we know them is partly a reconstruction; [name a key scholar] argues [position]; [name another] argues [counter-position].

**Example for Yaldabaoth:**

> Yaldabaoth is known almost entirely from the Nag Hammadi codices (discovered 1945), particularly the *Apocryphon of John*. These Coptic texts are 4th-century translations of earlier Greek originals, themselves likely 2nd-century. We have no pre-Christian Gnostic sources. Karen King (*What Is Gnosticism?*, 2003) has argued that "Gnosticism" as a unified category is largely a modern scholarly construct; Bentley Layton and Michael Williams (*Rethinking "Gnosticism,"* 1996) have made similar cases. The figure of Yaldabaoth is real in the texts; the coherent system we map him into is partly a 20th-century synthesis.

### 2. Interpretive-move caveat

For parallels that are modern comparative claims, not ancient ones.

**Template:**

> The identification of [figure A] with [figure B] is an interpretive move, not a claim made by the original tradition. This equation appears in [name the modern lineage: Theosophy, Traditionalism, Jungian comparative work, etc.]. The ancient [tradition] did not equate these figures; [tradition] sources describe [figure A] in [their own terms].

**Example for Yahweh = Yaldabaoth:**

> The equation Yahweh = Yaldabaoth is a Gnostic interpretive move, made by specific 2nd-century Christian sects (Sethians, Ophites, some Valentinians). It is not a consensus historical claim and is rejected by mainstream Jewish, Christian, and academic biblical scholarship. Within Hebrew tradition, Yahweh and El Elyon were originally distinct deities in the Canaanite pantheon (Mark Smith, *The Early History of God*, 2002; *The Origins of Biblical Monotheism*, 2001) — Yahweh emerged from the southern Levantine milieu and was later identified with El, the head of the Canaanite divine council. The Gnostic move splits these back apart and places Yahweh below El Elyon. Whether one finds this compelling is a theological question, not a historical one.

### 3. Tradition-internal caveat

For figures whose role within their own tradition is more nuanced than the four-tier framework captures.

**Template:**

> Within [tradition], [figure] is not understood primarily as [the function we've tagged them with]. Their fuller role includes [other functions, contexts, ritual settings]. The four-tier mapping foregrounds [function X] because it enables structural comparison, but readers should know that [tradition] practitioners would also emphasize [Y and Z].

**Example for Brahma:**

> The Source Map places Brahma in Tier 3 (Demiurge) in his "egoic aspect," drawing on Puranic myths where Brahma is humbled by Vishnu and Shiva (e.g., the *Linga Purana*'s pillar-of-fire story). Within living Hindu traditions, however, Brahma is one of the Trimurti and is rarely worshipped as a demiurge-villain. The "egoic Brahma" reading is a selective use of specific mythological episodes to enable the Gnostic-comparative mapping. A Vaishnava or Shaiva practitioner would describe Brahma quite differently. See Wendy Doniger, *The Hindus: An Alternative History* (2009), for the spread of Brahma's roles across the Sanskrit corpus.

### 4. Methodological-lineage caveat

For each major comparative claim, name the lineage of thought it descends from. This is the most important scholarly-mode addition.

**Template:**

> The comparative reading applied here descends from [lineage]. Key figures in this lineage include [scholars/practitioners]. The lineage's strengths: [what it sees clearly]. Its known limitations in academic religious studies: [where specialists push back].

**Example for the perennialist move generally:**

> The Source Map operates within the "perennial philosophy" tradition — the claim that all religions point to a common esoteric truth. This lineage runs through Marsilio Ficino's *prisca theologia*, Pico della Mirandola, the Cambridge Platonists, Madame Blavatsky's Theosophy, René Guénon and Frithjof Schuon's Traditionalism, Aldous Huxley's *The Perennial Philosophy* (1945), Huston Smith, and Manly P. Hall. Academic religious studies has been critical of perennialism since at least Steven Katz's "Language, Epistemology, and Mysticism" (1978), which argued that mystical experiences are shaped by their religious contexts rather than pointing to a single underlying truth. Wouter Hanegraaff (*Esotericism and the Academy*, 2012) provides the standard scholarly genealogy. Readers should know they are working within a contested but historically deep interpretive tradition.

### 5. Contested-identification caveat

For specific parallel claims that scholars actively dispute.

**Template:**

> The identification of [A] with [B] is contested. Proponents: [who and where]. Critics: [who and where]. Key issues: [what's at stake].

**Example for Enki = Prometheus:**

> The Enki–Prometheus parallel is widely cited in comparative mythology (from Frazer through Joseph Campbell to contemporary writers like David Leeming, *The Oxford Companion to World Mythology*, 2005). The structural similarity is strong: both are craftsman-gods who side with humanity against the senior council. However, there is no demonstrated historical transmission line; the parallel is typological, not genealogical. Stephanie Dalley (*Myths from Mesopotamia*, 1989) treats Enki within his own Sumerian-Akkadian context without recourse to Greek parallels.

### 6. Modern-syncretic-layer caveat

For content drawn from modern channeled or syncretic sources (Theosophy, Law of One, Urantia, Sitchin, etc.).

**Template:**

> This claim derives from [modern source], a [date] [type: channeled / synthesized / reconstructed] work. It is not attested in any pre-modern source from the tradition it claims to describe. Mainstream academic treatment of [source]: [brief characterization].

**Example for the Sitchin–Anunnaki layer:**

> The interpretation of the Anunnaki as extraterrestrial genetic engineers is the work of Zecharia Sitchin (*The 12th Planet*, 1976, and subsequent volumes). It is not present in Sumerian or Akkadian sources; Sitchin's translations have been rejected by every working Assyriologist who has examined them (see, e.g., Michael S. Heiser's detailed linguistic critiques at sitchiniswrong.com). The structural reading of Enki as craftsman-and-liberator stands independently of the Sitchin material; the Source Map's Enki node uses the structural reading. Users encountering Sitchin's interpretation elsewhere should know it is a 20th-century synthesis, not a translation of Sumerian belief.

---

## Standing caveats (always available, linked from About page)

These four caveats apply to the framework as a whole. Surface them in scholarly mode as a permanent header on every node panel, and as an entry in the About menu.

### Standing caveat 1 — The framework is one lens

> The four-tier framework (Source / Council / Demiurge / Archons + Cross-Tier) is derived from Sethian and Valentinian Gnostic texts. It is one interpretive lens, not an objective claim about the structure of reality. Many figures in the database would be described differently by practitioners of their own traditions. The framework's value is comparative, not dogmatic.

### Standing caveat 2 — Structural vs. historical claims

> Two figures sharing a structural function (e.g., "craftsman who fashions humans from clay") is a typological observation. It does **not** entail that the two traditions share a historical origin, that one borrowed from the other, or that they refer to the same being. Most parallels in the Source Map are typological. Where genealogical transmission is documented (e.g., the spread of the Flood narrative from Mesopotamia to Hebrew tradition), the node will say so explicitly.

### Standing caveat 3 — Proponent voice is the default

> The default-mode essence text presents claims as their proponents would state them, without disclaimers. This is an editorial choice to let traditions speak in their own voice. It does not imply the project endorses every claim. Scholarly mode (this panel) provides academic context.

### Standing caveat 4 — Living traditions

> Many traditions represented in the Source Map are living traditions with practitioners alive today. Hindu, Jewish, Buddhist, Taoist, Yoruba, Sufi, Christian, and Indigenous traditions in particular have practitioners who may disagree sharply with the comparative-esoteric readings used here. The project respects these disagreements. The framework is offered as a tool for synthesis, not as a replacement for tradition-internal understanding.

---

## Scholarly reference library (build into the app as a clickable bibliography)

### Foundational comparative-esotericism scholarship

- Wouter Hanegraaff, *Esotericism and the Academy* (Cambridge, 2012)
- Wouter Hanegraaff, *New Age Religion and Western Culture* (Brill, 1996)
- Antoine Faivre, *Access to Western Esotericism* (SUNY, 1994)
- Kocku von Stuckrad, *Western Esotericism: A Brief History* (Equinox, 2005)

### Gnostic studies

- Karen King, *What Is Gnosticism?* (Harvard, 2003)
- Michael Williams, *Rethinking "Gnosticism"* (Princeton, 1996)
- Bentley Layton, *The Gnostic Scriptures* (Doubleday, 1987)
- Elaine Pagels, *The Gnostic Gospels* (Random House, 1979)
- Birger Pearson, *Ancient Gnosticism* (Fortress, 2007)

### Hebrew Bible / divine council

- Mark S. Smith, *The Early History of God* (2nd ed., Eerdmans, 2002)
- Mark S. Smith, *The Origins of Biblical Monotheism* (Oxford, 2001)
- Michael S. Heiser, *The Unseen Realm* (Lexham, 2015)
- Frank Moore Cross, *Canaanite Myth and Hebrew Epic* (Harvard, 1973)

### Mesopotamian

- Stephanie Dalley, *Myths from Mesopotamia* (Oxford, 1989, rev. 2000)
- Thorkild Jacobsen, *The Treasures of Darkness* (Yale, 1976)
- Jean Bottéro, *Religion in Ancient Mesopotamia* (Chicago, 2001)

### Egyptian

- Erik Hornung, *Conceptions of God in Ancient Egypt* (Cornell, 1982)
- Jan Assmann, *The Search for God in Ancient Egypt* (Cornell, 2001)
- Garth Fowden, *The Egyptian Hermes* (Cambridge, 1986)

### Hermetic / Neoplatonic

- Brian Copenhaver, *Hermetica* (Cambridge, 1992)
- Pierre Hadot, *Plotinus, or the Simplicity of Vision* (Chicago, 1993)
- Algis Uždavinys, *Philosophy as a Rite of Rebirth* (Prometheus Trust, 2008)

### Kabbalah

- Gershom Scholem, *Major Trends in Jewish Mysticism* (Schocken, 1941)
- Moshe Idel, *Kabbalah: New Perspectives* (Yale, 1988)
- Daniel Matt (trans.), *The Zohar: Pritzker Edition* (Stanford, ongoing)

### Hindu

- Wendy Doniger, *The Hindus: An Alternative History* (Penguin, 2009)
- Gavin Flood, *An Introduction to Hinduism* (Cambridge, 1996)
- Patrick Olivelle (trans.), *The Early Upanishads* (Oxford, 1998)

### Comparative mythology (use critically)

- Mircea Eliade, *Patterns in Comparative Religion* (Sheed & Ward, 1958)
- Georges Dumézil, *Mitra-Varuna* (Zone, 1988)
- Joseph Campbell, *The Masks of God* (Viking, 1959–1968) — note: Campbell's monomyth has been heavily critiqued; cite cautiously
- David Leeming, *The Oxford Companion to World Mythology* (Oxford, 2005)

### Critiques of perennialism (essential balance)

- Steven Katz (ed.), *Mysticism and Philosophical Analysis* (Oxford, 1978)
- Robert Sharf, "Buddhist Modernism and the Rhetoric of Meditative Experience" (*Numen*, 1995)
- J.Z. Smith, *Drudgery Divine* (Chicago, 1990)

---

## When generating a scholarly-mode caveat

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

## Do not

- Use scholarly mode to refute proponent voice; use it to contextualize
- Hedge proponent voice with academic disclaimers in default mode
- Cite scholars vaguely ("some scholars argue...") — name them
- Treat religious studies consensus as final truth; it has its own interpretive commitments
- Mock or condescend to modern syncretic traditions; describe them accurately and let the reader judge

## Always

- Name actual scholars and works
- Distinguish source-critical issues from interpretive disagreements
- Acknowledge living traditions and their internal voices
- Surface the methodological lineage of every comparative claim
- Keep proponent voice and scholarly voice as parallel readings, not adversaries

---

## The goal

A serious user can flip between proponent voice and scholarly context with full knowledge of which layer they're in, who's making which claim, and what the methodological stakes are. The Source Map becomes a tool for honest inquiry — not a proselytizing instrument, not a debunking instrument, but a navigable atlas where every claim is sourced and every interpretive move is named.
