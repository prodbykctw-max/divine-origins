/* =============================================================
   data/source-map/deities-v2.js
   
   V2 ARCHITECTURE — Deity + Facet model
   
   Core insight (from COMPARATIVE COSMOLOGY FULL DEITY ARCHITECTURE):
   A single deity is NOT a single node. Most major deities have
   multiple facets that may parallel completely different figures
   in other traditions.
   
   Zeus-as-tyrant     → parallels Yaldabaoth (not Jupiter)
   Zeus-as-sky-father → parallels Dyaus Pita, Tian (not Yaldabaoth)
   Zeus-as-oath-keeper → parallels Mithra, Varuna
   
   All comparative connections are made at the FACET level.
   The system preserves each deity's full identity while surfacing
   structural parallels at the level of specific functions.
   ============================================================= */

// ── FUNCTION TAG ONTOLOGY ──────────────────────────────────────
// Powers the parallel detection engine (Jaccard scoring).
// All facets are tagged from this list.
export const FUNCTION_TAG_ONTOLOGY = {
  // Cosmological position
  cosmological: [
    'unmanifest-source', 'first-emanation', 'divine-council-head',
    'demiurge', 'craftsman-creator', 'usurper', 'false-most-high',
    'archon', 'planetary-ruler', 'fate-governor', 'cross-tier',
    'mediator', 'psychopomp', 'light-bringer', 'wisdom-bringer',
  ],
  // Narrative function
  narrative: [
    'dying-rising-god', 'sacrificed-god', 'descended-god', 'trickster',
    'culture-hero', 'civilizing-god', 'forbidden-knowledge-giver',
    'liberator', 'bound-god', 'returning-god', 'exiled-god',
    'mother-of-demiurge', 'fallen-emanation', 'redeemer',
    'fratricide', 'betrayer', 'destroyer', 'transformer',
  ],
  // Domain
  domain: [
    'sky', 'storm', 'sun', 'moon', 'earth', 'sea', 'underworld',
    'fire', 'wind', 'death', 'dissolution', 'war', 'wisdom',
    'magic', 'writing', 'crafts', 'music', 'fertility', 'love',
    'law', 'justice', 'truth', 'cosmic-order', 'chaos', 'night',
    'time', 'cycles', 'liminality', 'crossroads',
  ],
  // Archetypal role
  archetypal: [
    'father', 'mother', 'son', 'daughter', 'great-mother',
    'terrible-mother', 'divine-king', 'divine-queen', 'hero',
    'trickster', 'wise-old-man', 'shape-shifter', 'threshold-guardian',
  ],
  // Valence
  valence: ['positive', 'negative', 'ambivalent', 'transcendent'],
};

// ── TRADITIONS ────────────────────────────────────────────────
export const TRADITIONS_V2 = [
  { id: 'gnostic',       name: 'Gnostic',              color: '#8840c4', earliest: '1st–2nd c. CE' },
  { id: 'hebrew-ot',     name: 'Hebrew / Old Testament', color: '#c44040', earliest: 'c. 1000 BCE' },
  { id: 'egyptian',      name: 'Egyptian',              color: '#c9a84c', earliest: 'c. 3200 BCE' },
  { id: 'mesopotamian',  name: 'Mesopotamian',          color: '#c8a060', earliest: 'c. 3500 BCE' },
  { id: 'greek',         name: 'Greek',                 color: '#40a8a0', earliest: 'c. 1200 BCE' },
  { id: 'norse',         name: 'Norse / Germanic',      color: '#6080c0', earliest: 'c. 200 CE' },
  { id: 'hindu',         name: 'Hindu',                 color: '#c06040', earliest: 'c. 1500 BCE' },
  { id: 'aztec',         name: 'Aztec / Mesoamerican',  color: '#60a040', earliest: 'c. 1300 CE' },
];

// ── DEITIES ───────────────────────────────────────────────────
// Parent objects — preserve full identity of each deity.
// Comparative connections live at the FACET level below.
export const DEITIES_V2 = [
  {
    id: 'monad',
    primary_name: 'The Monad',
    alternate_names: ['Bythos', 'The Invisible Spirit', 'The One', 'The Father of All'],
    tradition_id: 'gnostic',
    earliest_attestation: '1st–2nd c. CE',
    primary_sources: ['Apocryphon of John', 'Allogenes', 'Trimorphic Protennoia'],
    etymology: "Greek monos — unity, oneness",
    iconography: [],
    summary: 'The unknowable, ineffable Source beyond all categories. Not a creator-being but the ground of being from which all emanation proceeds. Cannot be named, only approached through negation.',
    facets: ['monad-unmanifest'],
  },
  {
    id: 'yaldabaoth',
    primary_name: 'Yaldabaoth',
    alternate_names: ['Ialdabaoth', 'Saklas', 'Samael', 'The Demiurge', 'The Chief Archon'],
    tradition_id: 'gnostic',
    earliest_attestation: '2nd c. CE',
    primary_sources: ['Apocryphon of John (NHC II,1)', 'Hypostasis of the Archons (NHC II,4)', 'On the Origin of the World (NHC II,5)'],
    etymology: "Possibly 'child of chaos' or 'begetter of Sabaoth'",
    iconography: ['lion-faced serpent', 'seven Archons surrounding'],
    summary: "Abortive offspring of Sophia who fashioned the material cosmos in ignorance. Declares himself the only God; rebuked from above as 'Samael, blind god.'",
    facets: ['yaldabaoth-demiurge', 'yaldabaoth-usurper'],
  },
  {
    id: 'yahweh',
    primary_name: 'Yahweh',
    alternate_names: ['YHWH', 'Adonai', 'The Lord of Hosts', 'El Shaddai'],
    tradition_id: 'hebrew-ot',
    earliest_attestation: 'c. 13th–10th c. BCE',
    primary_sources: ['Torah', 'Prophets', 'Psalms', 'Deuteronomy 32:8-9 (DSS variant)'],
    etymology: "From Hebrew H-W-H — 'I AM' or 'He causes to be'",
    iconography: ['cloud of glory', 'burning bush', 'Ark of the Covenant'],
    summary: "The covenantal God of Israel. Orthodox: the one true God, creator and lawgiver. Gnostic reading: the Demiurge mistaken for the Most High. DSS textual evidence distinguishes Yahweh from El Elyon.",
    facets: ['yahweh-creator', 'yahweh-jealous-god', 'yahweh-covenantal'],
  },
  {
    id: 'el-elyon',
    primary_name: 'El Elyon',
    alternate_names: ['El', 'El Shaddai', 'God Most High', 'Father of the Divine Council'],
    tradition_id: 'hebrew-ot',
    earliest_attestation: 'Pre-1200 BCE Canaanite layer',
    primary_sources: ['Genesis 14:18-20', 'Deuteronomy 32:8-9 (DSS)', 'Psalm 82', 'Ugaritic Baal Cycle'],
    etymology: "Hebrew/Canaanite: 'God Most High'",
    iconography: [],
    summary: 'Head of the divine council in the oldest textual layer. DSS Deut 32:8 shows El Elyon dividing nations among his sons — Yahweh received Israel as his portion. Later orthodoxy merges El Elyon and Yahweh. Gnostics keep them distinct.',
    facets: ['el-elyon-council-head'],
  },
  {
    id: 'set',
    primary_name: 'Set',
    alternate_names: ['Seth', 'Sutekh', 'Suty', 'The Red God'],
    tradition_id: 'egyptian',
    earliest_attestation: 'c. 3200 BCE (Predynastic)',
    primary_sources: ['Pyramid Texts', 'Coffin Texts', 'Book of the Dead', 'Contendings of Horus and Seth'],
    etymology: "Possibly 'pillar' or 'instigator'",
    iconography: ['Set-animal (composite creature)', 'red color', 'was-scepter'],
    summary: 'The most ambivalent deity in the Egyptian pantheon. Protector of Ra against Apophis in early periods — indispensable guardian of the solar barque. Murderer and dismemberer of Osiris in later theology. God of the desert, storms, and foreigners.',
    facets: ['set-protector-of-ra', 'set-usurper-murderer', 'set-storm-desert'],
  },
  {
    id: 'marduk',
    primary_name: 'Marduk',
    alternate_names: ['Bel', 'Merodach', 'Bel-Marduk'],
    tradition_id: 'mesopotamian',
    earliest_attestation: 'c. 2000 BCE (Babylonian)',
    primary_sources: ['Enuma Elish', 'Code of Hammurabi prologue', 'Marduk Prophetic Speech'],
    etymology: "Sumerian AMAR.UTU — 'calf of the sun'",
    iconography: ['spade', 'dragon Mušḫuššu', 'fifty names'],
    summary: "Chief god of Babylon. Slays Tiamat, the primordial chaos-mother, and fashions the world from her dismembered body. His supremacy is inseparable from Babylon's political rise — he absorbs 50 divine names and identities.",
    facets: ['marduk-cosmic-orderer', 'marduk-warrior'],
  },
  {
    id: 'inanna',
    primary_name: 'Inanna',
    alternate_names: ['Ishtar (Akkadian)', 'Astarte (Phoenician)', 'Queen of Heaven'],
    tradition_id: 'mesopotamian',
    earliest_attestation: 'c. 4th millennium BCE',
    primary_sources: ["Inanna's Descent to the Netherworld", 'Inanna and Enki', 'Hymns of Enheduanna (c. 2300 BCE — world\'s earliest named author)'],
    etymology: "Sumerian Nin-an-ak — 'Lady of Heaven'",
    iconography: ['eight-pointed star', 'lions', 'reed-bundle'],
    summary: "The most paradoxical goddess of the Mesopotamian pantheon — goddess of love and war, fertility and destruction. Crosses every boundary including life/death. Her descent narrative is the oldest documented death-and-return story.",
    facets: ['inanna-love-fertility', 'inanna-war', 'inanna-descended-goddess', 'inanna-queen-of-heaven'],
  },
  {
    id: 'zeus',
    primary_name: 'Zeus',
    alternate_names: ['Jupiter (Roman)', 'Dyaus Pita (Vedic cognate)', 'Zeus Pater'],
    tradition_id: 'greek',
    earliest_attestation: 'Mycenaean Linear B, c. 1400 BCE',
    primary_sources: ['Iliad', 'Odyssey', "Hesiod's Theogony", 'Orphic Hymns'],
    etymology: "PIE *dyḗws — 'sky', 'shining heaven'",
    iconography: ['thunderbolt', 'eagle', 'oak', 'throne'],
    summary: "King of the Olympian gods. Carries the contradictions of cosmic kingship — sky-father, lawgiver, oath-keeper, tyrant, storm-god. His tyrant facet parallels Yaldabaoth; his sky-father facet parallels Anu and Dyaus Pita; his oath-keeper facet parallels Mithra and Varuna.",
    facets: ['zeus-sky-father', 'zeus-tyrant', 'zeus-oath-keeper', 'zeus-storm-god'],
  },
  {
    id: 'prometheus',
    primary_name: 'Prometheus',
    alternate_names: ['The Forethinker', 'The Fire-Bringer'],
    tradition_id: 'greek',
    earliest_attestation: 'Hesiod, c. 700 BCE',
    primary_sources: ["Hesiod's Theogony", "Hesiod's Works and Days", "Aeschylus's Prometheus Bound"],
    etymology: "Greek — 'forethought'",
    iconography: ['fennel-stalk torch', 'chains', 'eagle eating liver'],
    summary: "Titan who steals fire from the gods and gives it to humanity against Zeus's will. Chained to a rock, liver eaten daily. The fire is not merely warmth — it is divine intelligence, craft, and civilization. The oldest Greek Cross-Tier liberator.",
    facets: ['prometheus-fire-bringer'],
  },
  {
    id: 'odin',
    primary_name: 'Odin',
    alternate_names: ['Wōden (Anglo-Saxon)', 'Wotan (German)', 'Allfather', 'The Wanderer', 'Grimnir'],
    tradition_id: 'norse',
    earliest_attestation: 'Roman era (as Mercurius Germanicus); Eddic texts c. 900–1220 CE',
    primary_sources: ['Völuspá', 'Hávamál', 'Grímnismál', 'Prose Edda (Snorri Sturluson)'],
    etymology: "Proto-Germanic *Wōðanaz — 'lord of frenzy/inspiration'",
    iconography: ['ravens Huginn and Muninn', 'spear Gungnir', 'one eye', 'wide-brimmed hat', 'two wolves'],
    summary: "The most complex deity in the Norse pantheon — simultaneously All-Father of the divine council, wandering disguised seeker, wisdom-seeker who sacrificed himself, war-god, psychopomp, and seiðr magician. Each facet maps to completely different parallels.",
    facets: ['odin-all-father', 'odin-wanderer', 'odin-wisdom-seeker', 'odin-sacrificed-on-yggdrasil', 'odin-psychopomp'],
  },
  {
    id: 'loki',
    primary_name: 'Loki',
    alternate_names: ['Lopt', 'The Trickster', 'The Shape-Shifter', 'Father of Monsters'],
    tradition_id: 'norse',
    earliest_attestation: 'c. 900 CE (Eddic material)',
    primary_sources: ['Prose Edda', 'Poetic Edda — Lokasenna, Völuspá', 'Skáldskaparmál'],
    etymology: "Old Norse — possibly related to fire (logi) or closing/ending (lúka)",
    iconography: ['net (inventor of)', 'fire', 'serpent dripping venom on bound god'],
    summary: "The agent of change the Norse cosmos could not metabolize. Adopted son of Odin who is officially Aesir but always Other. Brings the gods their greatest treasures and their final catastrophe. Three distinct facets — trickster-liberator, betrayer, and the bound god awaiting release at Ragnarök.",
    facets: ['loki-trickster-liberator', 'loki-betrayer', 'loki-bound'],
  },
  {
    id: 'shiva',
    primary_name: 'Shiva',
    alternate_names: ['Śiva', 'Mahadeva', 'Rudra (Vedic precursor)', 'Hara', 'Shankara', 'Nataraja'],
    tradition_id: 'hindu',
    earliest_attestation: 'Rudra in Rigveda, c. 1500–1200 BCE',
    primary_sources: ['Rigveda (as Rudra)', 'Shvetashvatara Upanishad', 'Shiva Purana', 'Linga Purana', 'Mahabharata'],
    etymology: "Sanskrit 'auspicious'; evolved from Vedic Rudra ('howler/roarer')",
    iconography: ['third eye', 'crescent moon', 'trident (trishula)', 'serpent', 'ash-smeared body', 'Nataraja pose'],
    summary: "One of the three great Hindu deities (Trimurti). The destroyer-transformer who dissolves the universe at the end of each cosmic cycle. Simultaneously the Great Ascetic (Mahayogi), the silent teacher (Dakshinamurti), the erotic principle (Nataraja), and the terrible (Bhairava). Each facet parallels completely different figures.",
    facets: ['shiva-destroyer', 'shiva-ascetic', 'shiva-teacher', 'shiva-erotic', 'shiva-bhairava'],
  },
  {
    id: 'krishna',
    primary_name: 'Krishna',
    alternate_names: ['Govinda', 'Hrishikesha', 'Vasudeva', 'The Dark One', 'The All-Attractive'],
    tradition_id: 'hindu',
    earliest_attestation: 'c. 5th–4th c. BCE (Mahabharata)',
    primary_sources: ['Bhagavad Gita', 'Bhagavata Purana', 'Harivamsa', 'Mahabharata'],
    etymology: "Sanskrit 'dark', 'black', or 'all-attractive'",
    iconography: ['blue skin', 'flute', 'peacock feather', 'cows', 'yellow garments'],
    summary: "Eighth avatar of Vishnu. Cosmic teacher on the battlefield of Kurukshetra (Bhagavad Gita), divine lover in the forests of Vrindavan, warrior-counselor in the Mahabharata, trickster child in his youth. Reveals himself as the supreme Source while wearing a human form.",
    facets: ['krishna-teacher', 'krishna-cosmic-form', 'krishna-divine-lover', 'krishna-trickster-child'],
  },
  {
    id: 'quetzalcoatl',
    primary_name: 'Quetzalcoatl',
    alternate_names: ['Kukulkan (Maya)', 'Gukumatz (K\'iche\')', 'Ehecatl (wind aspect)', 'Ce Acatl Topiltzin'],
    tradition_id: 'aztec',
    earliest_attestation: 'c. 1st c. CE (Teotihuacan); Toltec-Aztec tradition from c. 900 CE',
    primary_sources: ['Florentine Codex', 'Codex Chimalpopoca', 'Codex Borgia', 'Popol Vuh (Maya equivalent)'],
    etymology: "Nahuatl: 'feathered serpent' — quetzal feathers + coatl (serpent)",
    iconography: ['feathered serpent', 'conch shell wind-jewel', 'black body paint'],
    summary: "The feathered serpent — union of earth (serpent) and sky (quetzal bird). Civilizing teacher who gave humanity corn, calendar, writing, and the arts. Opposed blood sacrifice. Exiled by Tezcatlipoca. Sailed east prophesying his return in a One Reed year. His descent to retrieve bones from Mictlan parallels Christ's harrowing of hell.",
    facets: ['quetzalcoatl-culture-hero', 'quetzalcoatl-wind', 'quetzalcoatl-creator', 'quetzalcoatl-prophet-returning'],
  },
  {
    id: 'tezcatlipoca',
    primary_name: 'Tezcatlipoca',
    alternate_names: ['Black Tezcatlipoca', 'Smoking Mirror', 'Titlacauan'],
    tradition_id: 'aztec',
    earliest_attestation: 'c. 13th–14th c. CE (Aztec)', 
    primary_sources: ['Florentine Codex', 'Codex Borgia', 'Codex Telleriano-Remensis'],
    etymology: "Nahuatl: 'Smoking Mirror'",
    iconography: ['obsidian mirror replacing one foot', 'black face-paint', 'jaguar', 'stars'],
    summary: "The most complex deity of the Aztec pantheon. Night sky, sorcery, memory, fate, war, and rulership. Quetzalcoatl's shadow-twin and adversary — he expelled the civilizing god through trickery. Sees all things in his smoking obsidian mirror. Tests and destroys rulers.",
    facets: ['tezcatlipoca-night-sky', 'tezcatlipoca-fate-sorcery', 'tezcatlipoca-adversary', 'tezcatlipoca-king-maker'],
  },
  {
    id: 'sophia',
    primary_name: 'Sophia',
    alternate_names: ['Pistis Sophia', 'Hokhmah (Hebrew)', 'Divine Wisdom', 'Achamoth (lower Sophia)'],
    tradition_id: 'gnostic',
    earliest_attestation: '1st–2nd c. CE (Gnostic texts); Proverbs 8 as precursor',
    primary_sources: ['Apocryphon of John', 'Pistis Sophia', 'Hypostasis of the Archons', 'Valentinian Exposition'],
    etymology: "Greek 'wisdom'",
    iconography: ['dove', 'mirror', 'light descending'],
    summary: "Wisdom — the last and youngest of the Aeons in the Pleroma. Acts without her consort, producing Yaldabaoth. Descends into matter to recover the divine sparks trapped in humanity. Both the cause of the cosmic fall and the means of return.",
    facets: ['sophia-fallen-aeon', 'sophia-redemptive'],
  },
];

// ── FACETS ─────────────────────────────────────────────────────
// The actual comparative units. Tier assignments live here.
// Parallels are facet-to-facet, not deity-to-deity.
export const FACETS_V2 = [
  // ── MONAD ──
  {
    id: 'monad-unmanifest',
    parent_deity_id: 'monad',
    facet_name: 'The Unmanifest Source',
    tier_assignment: 1,
    function_tags: ['unmanifest-source', 'ineffable', 'ground-of-being', 'transcendent'],
    valence: 'transcendent',
    core_claim: "The Monad is beyond name, form, gender, and category. It is the silence from which the first thought emerges. It does not create directly — it self-contemplates, and from that arises Barbelo, the first Aeon.",
    parallel_facets: ['ein-sof-limitless', 'brahman-nirguna', 'tao-nameless', 'the-one-plotinus', 'nun-primordial', 'sunyata-emptiness', 'al-haqq-real'],
  },

  // ── YALDABAOTH ──
  {
    id: 'yaldabaoth-demiurge',
    parent_deity_id: 'yaldabaoth',
    facet_name: 'The Craftsman-Creator (Demiurge)',
    tier_assignment: 3,
    function_tags: ['demiurge', 'craftsman-creator', 'ignorant-of-source', 'creator-from-above'],
    valence: 'negative',
    core_claim: "Yaldabaoth fashioned the material cosmos in imitation of the Pleroma he had glimpsed but never understood. His creation is a prison-copy of the divine original.",
    parallel_facets: ['marduk-cosmic-orderer', 'yahweh-creator', 'brahma-creator-egoic'],
  },
  {
    id: 'yaldabaoth-usurper',
    parent_deity_id: 'yaldabaoth',
    facet_name: 'The Usurper (False Most High)',
    tier_assignment: 3,
    function_tags: ['usurper', 'false-most-high', 'jealous-god', 'ignorant-of-source'],
    valence: 'negative',
    core_claim: '"I am God and there is no other beside me." Declares himself the supreme being in complete ignorance of the Pleroma above him. Voice from above: "You are wrong, Samael — blind god."',
    parallel_facets: ['yahweh-jealous-god', 'lucifer-usurper', 'set-usurper-murderer', 'marduk-warrior'],
    scholarly_note: 'The identification Yaldabaoth = Yahweh is a Gnostic interpretive move, not mainstream Jewish or Christian theology.',
  },

  // ── YAHWEH ──
  {
    id: 'yahweh-creator',
    parent_deity_id: 'yahweh',
    facet_name: 'The Creator (Orthodox Reading)',
    tier_assignment: 2,
    function_tags: ['craftsman-creator', 'cosmic-order', 'divine-council-head', 'law'],
    valence: 'positive',
    core_claim: "In the orthodox reading, Yahweh is the one true God who created the cosmos ex nihilo, sustains it by his will, and governs it by his law. He is El Elyon — there is no distinction.",
    parallel_facets: ['el-elyon-council-head', 'ahura-mazda-wise-lord', 'marduk-cosmic-orderer'],
    scholarly_note: 'Orthodox Jewish and Christian theology — the dominant reading throughout history.',
  },
  {
    id: 'yahweh-jealous-god',
    parent_deity_id: 'yahweh',
    facet_name: 'The Jealous God (Gnostic Identification)',
    tier_assignment: 3,
    function_tags: ['jealous-god', 'usurper', 'false-most-high', 'punitive', 'exclusive-worship'],
    valence: 'negative',
    core_claim: '"I, the LORD your God, am a jealous God" (Exodus 20:5). In Gnostic reading, jealousy is the diagnostic: a truly supreme being has nothing to be jealous of. The jealousy reveals blindness to the Father above.',
    parallel_facets: ['yaldabaoth-usurper', 'enlil-punisher', 'zeus-tyrant'],
    scholarly_note: 'This is the Gnostic interpretive move — Marcion, Valentinus, Sethians. Not mainstream Hebrew theology.',
  },
  {
    id: 'yahweh-covenantal',
    parent_deity_id: 'yahweh',
    facet_name: 'The Covenantal God (National Deity)',
    tier_assignment: 4,
    function_tags: ['fate-governor', 'covenant', 'national-deity', 'law-giver'],
    valence: 'ambivalent',
    core_claim: "In the DSS textual layer, Yahweh is the national deity of Israel — one of El Elyon's divine sons assigned to govern Israel as others govern their nations. His role parallels the Sarim (angelic princes of nations) and the Anunnaki judges.",
    parallel_facets: ['el-elyon-council-head', 'sarim-princes', 'anunnaki-judges'],
    scholarly_note: 'Based on DSS Deuteronomy 32:8-9. Supported by Frank Moore Cross, Mark Smith, Michael Heiser.',
  },

  // ── EL ELYON ──
  {
    id: 'el-elyon-council-head',
    parent_deity_id: 'el-elyon',
    facet_name: 'Head of the Divine Council',
    tier_assignment: 2,
    function_tags: ['divine-council-head', 'first-emanation', 'father', 'sky'],
    valence: 'positive',
    core_claim: "El Elyon presides over the divine council and divides the nations among his sons. Psalm 82 shows him judging the lesser gods who have failed their stewardship. He is the Father above Yahweh, not Yahweh himself.",
    parallel_facets: ['anu-sky-father', 'yaldabaoth-demiurge', 'barbelo-first-thought', 'aesir-council'],
  },

  // ── SET ──
  {
    id: 'set-protector-of-ra',
    parent_deity_id: 'set',
    facet_name: 'Protector of Ra Against Apophis',
    tier_assignment: 2,
    function_tags: ['warrior', 'cosmic-order', 'storm', 'guardian'],
    valence: 'positive',
    core_claim: "Set stands at the prow of Ra's solar barque every night and drives back Apophis, the chaos serpent who would devour the sun. Without Set, Ra would not rise. Early Egyptian theology required him.",
    parallel_facets: ['marduk-warrior', 'thor-world-defender', 'indra-dragon-slayer'],
  },
  {
    id: 'set-usurper-murderer',
    parent_deity_id: 'set',
    facet_name: 'The Usurper / Murderer of Osiris',
    tier_assignment: 3,
    function_tags: ['usurper', 'fratricide', 'chaos-against-order', 'betrayer'],
    valence: 'negative',
    core_claim: "Set murders his brother Osiris out of envy, dismembers the body, and claims the throne of Egypt. He represents disorder, the desert, sterility, and the violation of cosmic order (ma'at).",
    parallel_facets: ['yaldabaoth-usurper', 'loki-betrayer', 'lucifer-usurper', 'tezcatlipoca-adversary'],
  },
  {
    id: 'set-storm-desert',
    parent_deity_id: 'set',
    facet_name: 'God of Storm and Desert',
    tier_assignment: 4,
    function_tags: ['storm', 'desert', 'chaos', 'foreigner', 'fate-governor'],
    valence: 'ambivalent',
    core_claim: "Set governs the uncontrollable forces — desert storms, foreign lands, the unpredictable. As a planetary/regional archon, he rules the liminal and untamed territories outside the ordered cosmos.",
    parallel_facets: ['enlil-storm', 'ares-war', 'thor-storm'],
  },

  // ── MARDUK ──
  {
    id: 'marduk-cosmic-orderer',
    parent_deity_id: 'marduk',
    facet_name: 'Cosmic Orderer (Slayer of Tiamat)',
    tier_assignment: 3,
    function_tags: ['demiurge', 'craftsman-creator', 'creation-through-violence', 'cosmic-order'],
    valence: 'ambivalent',
    core_claim: "Marduk defeats the chaos-dragon Tiamat and fashions the world from her dismembered corpse. Creates humanity from the blood of Kingu. His creation is conquest — order imposed through violence on chaos.",
    parallel_facets: ['yaldabaoth-demiurge', 'yahweh-creator', 'indra-dragon-slayer'],
  },
  {
    id: 'marduk-warrior',
    parent_deity_id: 'marduk',
    facet_name: 'The Divine Warrior / Political Supremacist',
    tier_assignment: 3,
    function_tags: ['war', 'usurper', 'political-elevation', 'divine-council-head'],
    valence: 'ambivalent',
    core_claim: "Marduk's supremacy is political — as Babylon rose, he absorbed 50 divine names and identities. His divine council position was manufactured by imperial theology, not inherent.",
    parallel_facets: ['zeus-tyrant', 'yaldabaoth-usurper', 'enlil-punisher'],
  },

  // ── INANNA ──
  {
    id: 'inanna-love-fertility',
    parent_deity_id: 'inanna',
    facet_name: 'Goddess of Love and Fertility',
    tier_assignment: 4,
    function_tags: ['love', 'fertility', 'erotic', 'fate-governor'],
    valence: 'positive',
    core_claim: "Inanna governs the erotic and generative principle. Her sacred marriage (hieros gamos) with the king ensures the fertility of the land. She is the force of desire at the cosmic level.",
    parallel_facets: ['aphrodite-love', 'ishtar-love', 'shakti-erotic', 'venus-love'],
  },
  {
    id: 'inanna-war',
    parent_deity_id: 'inanna',
    facet_name: 'Goddess of War',
    tier_assignment: 4,
    function_tags: ['war', 'fate-governor', 'terrible-mother', 'destroyer'],
    valence: 'ambivalent',
    core_claim: "Inanna is simultaneously goddess of love AND war — a combination that confounds monotheistic theology but is common in ancient Near Eastern religion. She decides the outcome of battles and exults in slaughter.",
    parallel_facets: ['kali-destroyer', 'athena-war', 'durga-war'],
  },
  {
    id: 'inanna-descended-goddess',
    parent_deity_id: 'inanna',
    facet_name: 'The Descended Goddess (Death and Return)',
    tier_assignment: 0,
    function_tags: ['descended-god', 'dying-rising-god', 'cross-tier', 'liminal', 'underworld'],
    valence: 'positive',
    core_claim: "Inanna descends through seven gates to the Great Below, surrendering a divine attribute at each gate, dies, and is restored. The oldest documented death-and-resurrection narrative. The seven gates = the seven planetary spheres of later Hermetic cosmology.",
    parallel_facets: ['persephone-descent', 'osiris-dismembered', 'christ-crucifixion', 'odin-sacrificed-on-yggdrasil', 'sophia-fallen-aeon'],
  },
  {
    id: 'inanna-queen-of-heaven',
    parent_deity_id: 'inanna',
    facet_name: 'Queen of Heaven',
    tier_assignment: 2,
    function_tags: ['divine-council-head', 'cosmic-order', 'sky', 'sovereignty'],
    valence: 'positive',
    core_claim: "As Queen of Heaven, Inanna holds the me (divine attributes of civilization) and governs the cosmic order from above. She is the sovereign feminine principle at the level of the Pleroma.",
    parallel_facets: ['isis-divine-mother', 'mary-queen-of-heaven', 'sophia-fallen-aeon'],
  },

  // ── ZEUS ──
  {
    id: 'zeus-sky-father',
    parent_deity_id: 'zeus',
    facet_name: 'Sky Father (Cosmic King)',
    tier_assignment: 2,
    function_tags: ['divine-council-head', 'sky', 'father', 'cosmic-order'],
    valence: 'positive',
    core_claim: "Zeus as sky-father is the head of the divine council, the principle of cosmic order and law. This facet parallels Anu, Dyaus Pita, Jupiter, Tian, and El — not Yaldabaoth.",
    parallel_facets: ['el-elyon-council-head', 'anu-sky-father', 'dyaus-pita', 'tian-heaven'],
  },
  {
    id: 'zeus-tyrant',
    parent_deity_id: 'zeus',
    facet_name: 'Zeus the Tyrant (Chains Prometheus)',
    tier_assignment: 3,
    function_tags: ['usurper', 'punitive', 'jealous-god', 'chains-liberators', 'false-most-high'],
    valence: 'negative',
    core_claim: "In Aeschylus's Prometheus Bound, Zeus is the tyrant who tortures Prometheus for giving fire (consciousness, civilization) to humanity. He himself usurped Kronos. He chains liberation. This facet parallels Yaldabaoth.",
    parallel_facets: ['yaldabaoth-usurper', 'yahweh-jealous-god', 'enlil-punisher'],
  },
  {
    id: 'zeus-oath-keeper',
    parent_deity_id: 'zeus',
    facet_name: 'Zeus Horkios (Guardian of Oaths)',
    tier_assignment: 2,
    function_tags: ['cosmic-order', 'law', 'justice', 'covenant'],
    valence: 'positive',
    core_claim: "Zeus as guardian of oaths and xenia (guest-right) is the enforcer of the moral order that binds gods and humans. This facet parallels Mithra and Varuna more than any Demiurge figure.",
    parallel_facets: ['mithra-covenant', 'varuna-cosmic-law', 'yahweh-covenantal'],
  },
  {
    id: 'zeus-storm-god',
    parent_deity_id: 'zeus',
    facet_name: 'The Storm God',
    tier_assignment: 4,
    function_tags: ['storm', 'sky', 'thunderbolt', 'fate-governor'],
    valence: 'ambivalent',
    core_claim: "Zeus as the storm-god is the atmospheric archon — the planetary/elemental ruler of the sky. This facet parallels Enlil, Indra, Thor, and the Baal of Ugarit.",
    parallel_facets: ['enlil-storm', 'indra-storm', 'thor-storm', 'baal-storm'],
  },

  // ── PROMETHEUS ──
  {
    id: 'prometheus-fire-bringer',
    parent_deity_id: 'prometheus',
    facet_name: 'The Fire-Bringer / Civilization-Giver',
    tier_assignment: 0,
    function_tags: ['forbidden-knowledge-giver', 'culture-hero', 'light-bringer', 'cross-tier', 'bound-god', 'liberator'],
    valence: 'positive',
    core_claim: "Prometheus steals fire from the realm of the Demiurgic order and gives it to humanity — not merely warmth but divine intelligence, craft, and the means of self-determination. He is punished eternally for a gift that cannot be un-given.",
    parallel_facets: ['loki-trickster-liberator', 'enki-wisdom-giver', 'quetzalcoatl-culture-hero', 'lucifer-lightbearer', 'serpent-ophite'],
  },

  // ── ODIN ──
  {
    id: 'odin-all-father',
    parent_deity_id: 'odin',
    facet_name: 'All-Father (Head of Divine Council)',
    tier_assignment: 2,
    function_tags: ['divine-council-head', 'father', 'sky', 'cosmic-order'],
    valence: 'ambivalent',
    core_claim: "Odin as All-Father presides over Asgard and the nine worlds. He heads the divine council (the Aesir), determines fates, and governs the cosmic order — but knows it is all temporary.",
    parallel_facets: ['el-elyon-council-head', 'zeus-sky-father', 'anu-sky-father'],
  },
  {
    id: 'odin-wanderer',
    parent_deity_id: 'odin',
    facet_name: 'The Disguised Wanderer',
    tier_assignment: 0,
    function_tags: ['cross-tier', 'disguised-god', 'wisdom-seeker', 'liminal'],
    valence: 'ambivalent',
    core_claim: "Odin travels the worlds in disguise — as an old man with a wide-brimmed hat and staff — testing humans, learning, and gathering wisdom. The all-powerful god who chooses disguise to access what power alone cannot give.",
    parallel_facets: ['hermes-messenger', 'elijah-wanderer', 'khidr-guide'],
  },
  {
    id: 'odin-wisdom-seeker',
    parent_deity_id: 'odin',
    facet_name: 'The Wisdom-Seeker (Eye for Mimir)',
    tier_assignment: 0,
    function_tags: ['wisdom-bringer', 'self-sacrifice-for-knowledge', 'cross-tier'],
    valence: 'positive',
    core_claim: "Odin sacrifices his eye to drink from Mimir's well of wisdom. He pays the ultimate price for cosmic knowledge — and gains it. Wisdom requires sacrifice; sacrifice transforms.",
    parallel_facets: ['odin-sacrificed-on-yggdrasil', 'enki-wisdom-giver', 'thoth-wisdom'],
  },
  {
    id: 'odin-sacrificed-on-yggdrasil',
    parent_deity_id: 'odin',
    facet_name: 'The Self-Sacrificed (Hung on Yggdrasil)',
    tier_assignment: 0,
    function_tags: ['sacrificed-god', 'dying-rising-god', 'self-offering', 'wisdom-through-suffering', 'cross-tier'],
    valence: 'positive',
    core_claim: '"I know that I hung on a windswept tree nine long nights, wounded by spear, given to Odin, myself to myself." (Hávamál 138). He seizes the runes. Self-sacrifice to himself — the Norse parallel to Christ\'s offering.',
    parallel_facets: ['christ-crucifixion', 'prometheus-fire-bringer', 'inanna-descended-goddess', 'osiris-dismembered'],
  },
  {
    id: 'odin-psychopomp',
    parent_deity_id: 'odin',
    facet_name: 'The Psychopomp / Lord of the Dead',
    tier_assignment: 4,
    function_tags: ['psychopomp', 'death', 'fate-governor', 'underworld'],
    valence: 'ambivalent',
    core_claim: "Odin receives half of the battle-slain in Valhalla (Freyja receives the other half). He guides the chosen dead, commands the Valkyries, and prepares his army for Ragnarök.",
    parallel_facets: ['hermes-messenger', 'anubis-psychopomp', 'osiris-dismembered', 'yama-judge'],
  },

  // ── LOKI ──
  {
    id: 'loki-trickster-liberator',
    parent_deity_id: 'loki',
    facet_name: 'Trickster / Liberator',
    tier_assignment: 0,
    function_tags: ['trickster', 'boundary-crosser', 'wisdom-thief', 'shape-shifter', 'culture-hero-ambivalent', 'cross-tier'],
    valence: 'ambivalent',
    core_claim: "Loki repeatedly extracts the Aesir from disasters — and sometimes creates them. He brings them Mjölnir, Sleipnir, Gungnir, and other treasures through cunning theft. The agent of necessary change.",
    parallel_facets: ['prometheus-fire-bringer', 'hermes-messenger', 'enki-wisdom-giver', 'coyote-trickster', 'anansi-spider'],
  },
  {
    id: 'loki-betrayer',
    parent_deity_id: 'loki',
    facet_name: 'The Betrayer (Killer of Balder)',
    tier_assignment: 3,
    function_tags: ['betrayer', 'fratricide', 'chaos-against-order', 'trickster'],
    valence: 'negative',
    core_claim: "Loki engineers Balder's death using mistletoe — the one thing that had not sworn to protect him. This act begins the chain that makes Ragnarök inevitable. He is bound until the end.",
    parallel_facets: ['set-usurper-murderer', 'yaldabaoth-usurper', 'tezcatlipoca-adversary'],
  },
  {
    id: 'loki-bound',
    parent_deity_id: 'loki',
    facet_name: 'The Bound God (Awaiting Release)',
    tier_assignment: 0,
    function_tags: ['bound-god', 'returning-god', 'eschatological', 'cross-tier'],
    valence: 'ambivalent',
    core_claim: "Loki is bound beneath the earth, venom dripping on his face, until Ragnarök. His release is the beginning of the end — and potentially the beginning of renewal. The bound liberator who will be unbound.",
    parallel_facets: ['prometheus-fire-bringer', 'satan-bound-revelation', 'azazel-bound', 'fenrir-bound'],
  },

  // ── SHIVA ──
  {
    id: 'shiva-destroyer',
    parent_deity_id: 'shiva',
    facet_name: 'The Destroyer (Cosmic Dissolver)',
    tier_assignment: 2,
    function_tags: ['destroyer', 'transformer', 'cosmic-cycle', 'dissolution', 'time'],
    valence: 'ambivalent',
    core_claim: "Shiva dissolves the manifest universe at the end of each cosmic cycle. Destruction is not evil — it is the necessary precondition for renewal. Without Shiva's dissolution, creation would stagnate.",
    parallel_facets: ['kali-destroyer', 'yama-judge', 'thanatos-death'],
  },
  {
    id: 'shiva-ascetic',
    parent_deity_id: 'shiva',
    facet_name: 'The Great Ascetic (Mahayogi)',
    tier_assignment: 0,
    function_tags: ['ascetic', 'wisdom-through-stillness', 'renunciate', 'cross-tier'],
    valence: 'positive',
    core_claim: "Shiva sits in eternal meditation on Mount Kailash, ash-smeared, withdrawn from the world. He is the prototype of all yogis — the cosmic reality that can be approached through radical interior stillness.",
    parallel_facets: ['buddha-meditation', 'christ-desert-fast', 'odin-wisdom-seeker'],
  },
  {
    id: 'shiva-teacher',
    parent_deity_id: 'shiva',
    facet_name: 'Dakshinamurti (The Silent Teacher)',
    tier_assignment: 0,
    function_tags: ['wisdom-bringer', 'teacher', 'silent-transmission', 'cross-tier', 'mediator'],
    valence: 'positive',
    core_claim: "Shiva as Dakshinamurti faces south, sits beneath a banyan tree, and transmits the highest knowledge through silence to aged sages who ask. The teacher whose teaching is the cessation of noise.",
    parallel_facets: ['hermes-trismegistus', 'thoth-wisdom', 'manjushri-wisdom', 'khidr-guide', 'odin-wisdom-seeker'],
  },
  {
    id: 'shiva-erotic',
    parent_deity_id: 'shiva',
    facet_name: 'The Erotic Principle (Linga / Nataraja)',
    tier_assignment: 2,
    function_tags: ['erotic', 'fertility', 'creator-destroyer-united', 'cosmic-dance'],
    valence: 'positive',
    core_claim: "Shiva as Linga is the generative principle of the cosmos. As Nataraja, he dances the universe into being and out of being simultaneously — creation and destruction are the same motion.",
    parallel_facets: ['dionysus-ecstasy', 'krishna-divine-lover', 'inanna-love-fertility'],
  },
  {
    id: 'shiva-bhairava',
    parent_deity_id: 'shiva',
    facet_name: 'Bhairava (The Terrible)',
    tier_assignment: 4,
    function_tags: ['terrible-mother', 'wrathful', 'protector-fierce', 'death', 'underworld'],
    valence: 'ambivalent',
    core_claim: "Shiva in his terrible aspect, haunting cremation grounds, attended by dogs, embodying the fearsome necessity of dissolution. Bhairava is what faces the soul at death — not to destroy it but to strip away what is not real.",
    parallel_facets: ['kali-destroyer', 'set-storm-desert', 'ares-war'],
  },

  // ── KRISHNA ──
  {
    id: 'krishna-teacher',
    parent_deity_id: 'krishna',
    facet_name: 'The Cosmic Teacher (Bhagavad Gita)',
    tier_assignment: 0,
    function_tags: ['wisdom-bringer', 'descended-god', 'teacher', 'cross-tier', 'mediator'],
    valence: 'positive',
    core_claim: "On the battlefield of Kurukshetra, Krishna reveals the full cosmic picture to Arjuna: the nature of the Self (Atman = Brahman), the three paths of liberation (karma, jnana, bhakti), and the imperishable reality beneath the apparent death. The Gita is gnosis delivered in crisis.",
    parallel_facets: ['christ-logos-teacher', 'hermes-trismegistus', 'shiva-teacher', 'sophia-redemptive'],
  },
  {
    id: 'krishna-cosmic-form',
    parent_deity_id: 'krishna',
    facet_name: 'The Cosmic Form (Vishvarupa)',
    tier_assignment: 1,
    function_tags: ['unmanifest-source', 'all-pervading', 'transcendent', 'beyond-form'],
    valence: 'transcendent',
    core_claim: '"See now the whole universe, with everything moving and non-moving, in this one place, in my body." (Gita 11:7). Krishna reveals himself as the totality of existence — simultaneously the Source and the manifestation.',
    parallel_facets: ['monad-unmanifest', 'brahman-nirguna', 'the-one-plotinus'],
  },
  {
    id: 'krishna-divine-lover',
    parent_deity_id: 'krishna',
    facet_name: 'The Divine Lover (Vrindavan)',
    tier_assignment: 0,
    function_tags: ['erotic', 'divine-love', 'cross-tier', 'mediator', 'theophany-through-love'],
    valence: 'positive',
    core_claim: "Krishna's lila (divine play) with the gopis in Vrindavan is not scandalous — it is the model of the soul's relationship to the divine. The yearning of the gopis for Krishna is the soul's yearning for God. The erotic is the mystical register in disguise.",
    parallel_facets: ['shiva-erotic', 'inanna-love-fertility', 'dionysus-ecstasy', 'song-of-songs'],
  },
  {
    id: 'krishna-trickster-child',
    parent_deity_id: 'krishna',
    facet_name: 'The Trickster Child (Butter-Thief)',
    tier_assignment: 0,
    function_tags: ['trickster', 'cross-tier', 'boundary-crosser', 'culture-hero-ambivalent'],
    valence: 'positive',
    core_claim: "Baby Krishna steals butter, dances on the hood of Kaliya the serpent, plays pranks on his mother. The supreme trickster aspect — the infinite wearing a child's face, stealing from the world to feed it back to itself.",
    parallel_facets: ['loki-trickster-liberator', 'hermes-messenger', 'coyote-trickster'],
  },

  // ── QUETZALCOATL ──
  {
    id: 'quetzalcoatl-culture-hero',
    parent_deity_id: 'quetzalcoatl',
    facet_name: 'Bringer of Civilization / Civilizing Teacher',
    tier_assignment: 0,
    function_tags: ['civilizing-god', 'culture-hero', 'forbidden-knowledge-giver', 'light-bringer', 'cross-tier', 'exiled-god', 'opposes-sacrifice'],
    valence: 'positive',
    core_claim: "Quetzalcoatl descended to give humans corn, calendar, writing, and the arts. He opposed blood sacrifice and was exiled by Tezcatlipoca. The civilizing teacher who stood against the logic of the system and paid for it with exile.",
    parallel_facets: ['prometheus-fire-bringer', 'enki-wisdom-giver', 'hermes-trismegistus', 'thoth-wisdom', 'osiris-civilizer', 'krishna-teacher'],
  },
  {
    id: 'quetzalcoatl-wind',
    parent_deity_id: 'quetzalcoatl',
    facet_name: 'Ehecatl (The Wind / Divine Breath)',
    tier_assignment: 4,
    function_tags: ['wind', 'breath', 'spirit', 'sky', 'fate-governor'],
    valence: 'positive',
    core_claim: "Quetzalcoatl as Ehecatl is the wind that precedes the rains — the breath of the divine in the world, the pneuma that animates creation. He swept the previous world away with wind so this one could begin.",
    parallel_facets: ['ruach-elohim', 'pneuma-spirit', 'vayu-wind', 'shu-air'],
  },
  {
    id: 'quetzalcoatl-creator',
    parent_deity_id: 'quetzalcoatl',
    facet_name: 'Co-Creator (Descent to Mictlan for Bones)',
    tier_assignment: 0,
    function_tags: ['descended-god', 'harrowing-of-underworld', 'cross-tier', 'self-sacrifice'],
    valence: 'positive',
    core_claim: "Quetzalcoatl descends to Mictlan (the underworld) to retrieve the bones of the previous humanity, is tricked and falls, shatters the bones, but reassembles and restores them to life with his own blood. Creation through descent, suffering, and self-offering.",
    parallel_facets: ['christ-harrowing-of-hell', 'inanna-descended-goddess', 'orpheus-descent', 'osiris-dismembered'],
  },
  {
    id: 'quetzalcoatl-prophet-returning',
    parent_deity_id: 'quetzalcoatl',
    facet_name: 'The Returning Prophet',
    tier_assignment: 0,
    function_tags: ['returning-god', 'eschatological', 'exiled-god', 'cross-tier'],
    valence: 'ambivalent',
    core_claim: "Sailing east on his raft of serpents, Quetzalcoatl prophesied his return in a One Reed year. This prophecy contributed to Moctezuma's hesitation when Cortés arrived — the most devastating coincidence of eschatology and history.",
    parallel_facets: ['christ-parousia', 'kalki-avatar', 'saoshyant-savior', 'balder-returning'],
  },

  // ── TEZCATLIPOCA ──
  {
    id: 'tezcatlipoca-night-sky',
    parent_deity_id: 'tezcatlipoca',
    facet_name: 'Lord of the Night Sky',
    tier_assignment: 4,
    function_tags: ['night', 'sky', 'fate-governor', 'cosmic-order'],
    valence: 'ambivalent',
    core_claim: "Tezcatlipoca IS the night sky — the dark void in which stars appear, the obsidian mirror that reflects all things. He governs the unseen forces that determine fate.",
    parallel_facets: ['nuit-night-sky', 'nyx-night', 'varuna-hidden-law'],
  },
  {
    id: 'tezcatlipoca-fate-sorcery',
    parent_deity_id: 'tezcatlipoca',
    facet_name: 'Lord of Fate and Sorcery',
    tier_assignment: 3,
    function_tags: ['fate-governor', 'demiurge', 'magic', 'memory', 'usurper'],
    valence: 'negative',
    core_claim: "Tezcatlipoca's smoking mirror shows all that is, was, and will be. He governs the deterministic web of fate — and uses it to trap and destroy. His mirror is the opposite of the Gnostic gnosis: it shows you what you are, not what you could be.",
    parallel_facets: ['yaldabaoth-demiurge', 'shiva-bhairava', 'set-usurper-murderer'],
  },
  {
    id: 'tezcatlipoca-adversary',
    parent_deity_id: 'tezcatlipoca',
    facet_name: 'The Shadow Adversary (Opponent of Quetzalcoatl)',
    tier_assignment: 3,
    function_tags: ['adversary', 'trickster', 'destroyer', 'usurper'],
    valence: 'negative',
    core_claim: "Tezcatlipoca used trickery to expel Quetzalcoatl from Tula — showing him his aged, imperfect human reflection in the mirror and getting him drunk. The shadow that drives out the light.",
    parallel_facets: ['set-usurper-murderer', 'loki-betrayer', 'angra-mainyu', 'satan-adversary'],
  },
  {
    id: 'tezcatlipoca-king-maker',
    parent_deity_id: 'tezcatlipoca',
    facet_name: 'King-Maker / Tester of Rulers',
    tier_assignment: 4,
    function_tags: ['king-maker', 'fate-governor', 'tester', 'divine-council-head'],
    valence: 'ambivalent',
    core_claim: "Tezcatlipoca grants and revokes the right to rule. Aztec kings were installed and tested through Tezcatlipoca-rites. He is the kingship principle in its raw, amoral form — power without righteousness.",
    parallel_facets: ['odin-all-father', 'el-elyon-council-head', 'zeus-sky-father'],
  },

  // ── SOPHIA ──
  {
    id: 'sophia-fallen-aeon',
    parent_deity_id: 'sophia',
    facet_name: 'The Fallen Aeon (Mother of the Demiurge)',
    tier_assignment: 0,
    function_tags: ['fallen-emanation', 'mother-of-demiurge', 'descended-god', 'cross-tier', 'mediator'],
    valence: 'ambivalent',
    core_claim: "Sophia, last of the Aeons, attempts to create without her consort. Her error produces Yaldabaoth. She falls into the lower regions and must be recovered. She is the cause of the fall AND the means of return — you cannot separate the two.",
    parallel_facets: ['inanna-descended-goddess', 'persephone-descent', 'shekhinah-exile', 'izanami-yomi'],
  },
  {
    id: 'sophia-redemptive',
    parent_deity_id: 'sophia',
    facet_name: 'The Redeemer (Wisdom Returning)',
    tier_assignment: 0,
    function_tags: ['redeemer', 'wisdom-bringer', 'great-mother', 'cross-tier', 'mediator'],
    valence: 'positive',
    core_claim: "Sophia descends to recover the divine sparks trapped in humanity. With the Christ-Aeon, she effects the return of the lost light to the Pleroma. Her 13 repentances in Pistis Sophia are the prayers of scattered light trying to remember itself.",
    parallel_facets: ['shekhinah-redemptive', 'isis-recovering-osiris', 'demeter-recovering-persephone', 'mary-mediatrix', 'prajnaparamita'],
  },
];

// ── CANONICAL PARALLELS ────────────────────────────────────────
// Hand-curated connections with primary source evidence.
// The parallel detection engine (parallels.js) generates candidates;
// these are the confirmed ones.
export const CANONICAL_PARALLELS = [
  {
    id: 'p001',
    facet_a: 'yaldabaoth-usurper',
    facet_b: 'yahweh-jealous-god',
    strength: 'identity',
    type: 'gnostic-canonical-identification',
    basis: [
      "Both declare 'I am God and there is no other' (Isaiah 45:5; Apocryphon of John II,1)",
      'Both demand exclusive worship and respond to defection with punishment',
      'Both are jealous, punitive, covenantal lawgivers',
      'Gnostic primary texts explicitly make this identification',
    ],
    primary_texts: ['Apocryphon of John II,1', 'Hypostasis of the Archons II,4'],
    scholarly_note: 'The identification is a Gnostic interpretive move — Marcion, Valentinus, Sethians. Not mainstream Jewish or Christian theology.',
  },
  {
    id: 'p002',
    facet_a: 'inanna-descended-goddess',
    facet_b: 'persephone-descent',
    strength: 'strong-parallel',
    type: 'archetypal-structural',
    basis: [
      'Both descend into the underworld against divine resistance',
      'Both are connected to the annual fertility cycle',
      'Both involve a substitution arrangement and partial return',
      'Both predate the Greek version (Inanna by ~1700 years in writing)',
    ],
    primary_texts: ["Inanna's Descent (c. 1900 BCE)", 'Homeric Hymn to Demeter (c. 650 BCE)'],
    scholarly_note: 'Most scholars see independent development from a common Indo-European or Near Eastern archetype, not direct borrowing.',
  },
  {
    id: 'p003',
    facet_a: 'odin-sacrificed-on-yggdrasil',
    facet_b: 'christ-crucifixion',
    strength: 'strong-parallel',
    type: 'archetypal-sacrificed-god',
    basis: [
      'Both are self-sacrifice on a tree/cross (Odin: "given to Odin, myself to myself")',
      'Both are pierced by a spear during the sacrifice',
      'Both result in acquisition of cosmic knowledge/redemptive power',
      "Both involve three days (Odin's nine nights; Christ's three days in the tomb)",
    ],
    primary_texts: ['Hávamál 138-139', 'Gospel of John 19:34 (spear piercing)'],
    scholarly_note: 'Independent development from the common dying-god archetype. No evidence of direct borrowing in either direction.',
  },
  {
    id: 'p004',
    facet_a: 'prometheus-fire-bringer',
    facet_b: 'loki-trickster-liberator',
    strength: 'strong-parallel',
    type: 'trickster-liberator-bound',
    basis: [
      'Both cross the boundary between divine realm and human benefit',
      'Both are punished by being bound (Prometheus to rock; Loki beneath the earth)',
      'Both will be released at the cosmic crisis/renewal',
      'Both bring transformation to humanity against the will of the ruling divine order',
    ],
    primary_texts: ["Aeschylus, Prometheus Bound", 'Prose Edda, Gylfaginning'],
    scholarly_note: '',
  },
  {
    id: 'p005',
    facet_a: 'quetzalcoatl-culture-hero',
    facet_b: 'prometheus-fire-bringer',
    strength: 'strong-parallel',
    type: 'civilizing-teacher-exiled',
    basis: [
      'Both descend/come to humanity with civilizing gifts (fire vs. corn, calendar, writing)',
      'Both oppose the dominant divine order (Zeus vs. Tezcatlipoca)',
      'Both are expelled/bound for their gifts to humanity',
    ],
    primary_texts: ['Florentine Codex (Quetzalcoatl)', "Hesiod's Works and Days (Prometheus)"],
    scholarly_note: 'Independent parallel — no historical connection between Mesoamerican and Greek mythology.',
  },
  {
    id: 'p006',
    facet_a: 'set-usurper-murderer',
    facet_b: 'loki-betrayer',
    strength: 'strong-parallel',
    type: 'insider-betrayer',
    basis: [
      'Both betray and kill a brother-figure (Osiris; Balder)',
      'Both are subsequently bound/imprisoned for their action',
      'Both represent the principle of disorder within the divine order',
      "Both are indispensable to the system even as they destroy it (Set fights Apophis; Loki's action leads to renewal)",
    ],
    primary_texts: ['Plutarch, De Iside et Osiride', 'Prose Edda, Gylfaginning'],
    scholarly_note: '',
  },
  {
    id: 'p007',
    facet_a: 'shiva-teacher',
    facet_b: 'hermes-trismegistus',
    strength: 'strong-parallel',
    type: 'silent-wisdom-transmitter',
    basis: [
      'Both transmit the highest wisdom directly, without discursive explanation',
      'Both are associated with the principle of direct understanding over verbal instruction',
      'Both bridge tiers — they operate in the human world while carrying Tier 1/2 knowledge',
    ],
    primary_texts: ['Dakshinamurti Stotra', 'Corpus Hermeticum I (Poimandres)'],
    scholarly_note: '',
  },
  {
    id: 'p008',
    facet_a: 'odin-sacrificed-on-yggdrasil',
    facet_b: 'inanna-descended-goddess',
    strength: 'strong-parallel',
    type: 'divine-descent-for-knowledge',
    basis: [
      'Both voluntarily descend into death/sacrifice to gain what cannot be gained otherwise',
      'Both surrender divine attributes/powers in the descent',
      'Both return transformed — not restored to the prior state but elevated',
    ],
    primary_texts: ['Hávamál 138', "Inanna's Descent to the Netherworld"],
    scholarly_note: '',
  },
];

// ── HELPERS ──────────────────────────────────────────────────
export function getFacetById(id) {
  return FACETS_V2.find(f => f.id === id) ?? null;
}

export function getDeityById(id) {
  return DEITIES_V2.find(d => d.id === id) ?? null;
}

export function getFacetsForDeity(deityId) {
  return FACETS_V2.filter(f => f.parent_deity_id === deityId);
}

export function getParallelFacets(facetId) {
  const facet = getFacetById(facetId);
  if (!facet) return [];
  return facet.parallel_facets
    .map(id => getFacetById(id))
    .filter(Boolean);
}

export function getTraditionById(id) {
  return TRADITIONS_V2.find(t => t.id === id) ?? null;
}
