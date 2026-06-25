import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, X, Filter, BookOpen, Eye, EyeOff, Info, ChevronUp, ChevronDown, Sparkles, ArrowUpRight, FileText, Upload, Layers } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// EMBEDDED SEED DATA
// Replace via the upload button to swap in larger datasets (e.g. v0.5.0)
// ─────────────────────────────────────────────────────────────────────────────
const SEED_DATA_RAW = `{"_meta": {"version": "0.1.0-seed", "description": "Seed data for The Source Map comparative cosmology feature. Demonstrates the deity/facet/parallel schema with worked examples across 8 traditions. The next chat should expand this to 100+ deities using these as templates.", "schema_version": 2, "tier_definitions": {"1": "Unmanifest Source (Monad, Ein Sof, Brahman-Nirguna, Tao, The One)", "2": "True Most High / Divine Council (El Elyon, Pleroma, Aeons)", "3": "Demiurge / Flawed Creator (Yaldabaoth, Yahweh-OT-Gnostic, Marduk)", "4": "Archons / Planetary Rulers (Seven Archons, Watchers, Olympians-as-rulers)", "cross-tier": "Mediators / Light-Bringers / Sacrificed Gods (Christ, Sophia, Prometheus, Hermes, Quetzalcoatl)"}}, "traditions": [{"id": "gnostic", "name": "Gnostic", "earliest_attestation": "1st\\u20132nd c. CE", "regions": ["Egypt", "Syria", "Mesopotamia"]}, {"id": "hebrew-ot", "name": "Hebrew / Old Testament", "earliest_attestation": "c. 10th c. BCE (oral roots earlier)", "regions": ["Canaan", "Israel"]}, {"id": "egyptian", "name": "Egyptian", "earliest_attestation": "c. 3200 BCE", "regions": ["Nile valley"]}, {"id": "mesopotamian", "name": "Mesopotamian (Sumerian/Akkadian/Babylonian)", "earliest_attestation": "c. 3500 BCE", "regions": ["Mesopotamia"]}, {"id": "greek", "name": "Greek", "earliest_attestation": "c. 1200 BCE (Mycenaean)", "regions": ["Greece", "Aegean"]}, {"id": "norse", "name": "Norse / Germanic", "earliest_attestation": "Roman era; Eddic material 13th c. CE", "regions": ["Scandinavia", "Germania"]}, {"id": "hindu", "name": "Hindu (Vedic / Puranic / Tantric)", "earliest_attestation": "c. 1500 BCE", "regions": ["Indian subcontinent"]}, {"id": "aztec", "name": "Aztec / Mesoamerican", "earliest_attestation": "c. 13th c. CE (earlier in Toltec, Teotihuacan)", "regions": ["Central Mexico"]}], "deities": [{"id": "monad", "primary_name": "The Monad", "alternate_names": ["Bythos", "The Invisible Spirit", "The One", "The Father of All", "The Pleroma (as totality)"], "tradition_id": "gnostic", "earliest_attestation": "1st\\u20132nd c. CE Gnostic texts", "primary_sources": ["Apocryphon of John", "Allogenes", "Trimorphic Protennoia", "Eugnostos the Blessed"], "etymology": "Greek 'monas' \\u2014 unity, oneness", "summary": "The unknowable, ineffable Source beyond all categories. Not a creator-being but the ground of being itself, from which all emanation proceeds.", "facets": ["monad-unmanifest"]}, {"id": "yaldabaoth", "primary_name": "Yaldabaoth", "alternate_names": ["Ialdabaoth", "Saklas", "Samael", "The Demiurge", "The Chief Archon"], "tradition_id": "gnostic", "earliest_attestation": "2nd c. CE", "primary_sources": ["Apocryphon of John (NHC II,1)", "Hypostasis of the Archons (NHC II,4)", "On the Origin of the World (NHC II,5)"], "etymology": "Possibly 'child of chaos' or 'begetter of Sabaoth'", "iconography": ["lion-faced serpent", "throne", "seven Archons surrounding"], "summary": "Abortive offspring of Sophia, the Demiurge who fashioned the material cosmos in ignorance of the Pleroma above him. Declares himself the only God; rebuked by the voice from above as 'Samael, blind god.'", "facets": ["yaldabaoth-demiurge", "yaldabaoth-usurper"]}, {"id": "yahweh", "primary_name": "Yahweh", "alternate_names": ["YHWH", "Adonai", "Elohim (in some contexts)", "the Lord of Hosts"], "tradition_id": "hebrew-ot", "earliest_attestation": "c. 13th\\u201310th c. BCE", "primary_sources": ["Torah", "Prophets", "Psalms"], "etymology": "From Hebrew root H-W-H, 'to be'; 'He causes to be' or 'I AM'", "summary": "The covenantal God of Israel. In orthodox reading: the one true God, creator and lawgiver. In Gnostic reading: the Demiurge mistaken for the Most High.", "facets": ["yahweh-creator", "yahweh-jealous-god", "yahweh-covenantal"]}, {"id": "el-elyon", "primary_name": "El Elyon", "alternate_names": ["El", "El Shaddai", "God Most High"], "tradition_id": "hebrew-ot", "earliest_attestation": "Older Canaanite layer; pre-1200 BCE", "primary_sources": ["Genesis 14:18-20", "Deuteronomy 32:8-9 (older textual tradition)", "Psalm 82", "Ugaritic Baal Cycle"], "etymology": "Hebrew/Canaanite: 'God Most High'", "summary": "In the older Canaanite-Hebrew layer, El Elyon is the head of the divine council who divides the nations among his sons. Yahweh is one of those sons, assigned to Israel. Later orthodoxy collapses El Elyon and Yahweh into one being; Gnostics keep them distinct, mapping El Elyon to the true Father and Yahweh to the Demiurge.", "facets": ["el-elyon-council-head"]}, {"id": "set", "primary_name": "Set", "alternate_names": ["Seth", "Sutekh", "Suty"], "tradition_id": "egyptian", "earliest_attestation": "c. 3200 BCE", "primary_sources": ["Pyramid Texts", "Coffin Texts", "Book of the Dead", "Contendings of Horus and Seth", "Plutarch's On Isis and Osiris"], "etymology": "Possibly 'pillar' or 'instigator'", "iconography": ["Set-animal (composite creature)", "red color", "was-scepter"], "summary": "Morally ambivalent Egyptian god. Early periods: protector of Ra against Apophis. Later periods: murderer of Osiris, emblem of chaos.", "facets": ["set-protector-of-ra", "set-usurper-murderer", "set-storm-desert"]}, {"id": "marduk", "primary_name": "Marduk", "alternate_names": ["Bel", "Merodach"], "tradition_id": "mesopotamian", "earliest_attestation": "c. 2000 BCE (Babylonian)", "primary_sources": ["Enuma Elish", "Code of Hammurabi prologue"], "etymology": "Sumerian AMAR.UTU \\u2014 'calf of the sun'", "iconography": ["spade", "dragon Mu\\u0161\\u1e2bu\\u0161\\u0161u", "fifty names"], "summary": "Chief god of Babylon. Slays Tiamat, the primordial chaos-mother, and fashions the world from her dismembered body. Establishes cosmic order and is exalted above all other gods.", "facets": ["marduk-cosmic-orderer", "marduk-warrior"]}, {"id": "inanna", "primary_name": "Inanna", "alternate_names": ["Ishtar (Akkadian)", "Astarte (Phoenician)", "Queen of Heaven"], "tradition_id": "mesopotamian", "earliest_attestation": "c. 4th millennium BCE", "primary_sources": ["Inanna's Descent to the Netherworld", "Inanna and Enki", "Epic of Gilgamesh", "Hymns of Enheduanna"], "etymology": "Sumerian Nin-an-ak, 'Lady of Heaven'", "iconography": ["eight-pointed star", "lions", "reed-bundle"], "summary": "Goddess of love and war, of fertility and destruction. Crosses every boundary including life/death; descends to the underworld and returns transformed.", "facets": ["inanna-love-fertility", "inanna-war", "inanna-descended-goddess", "inanna-queen-of-heaven"]}, {"id": "zeus", "primary_name": "Zeus", "alternate_names": ["Jupiter (Roman)", "Dyaus Pita (Vedic cognate)", "Zeus Pater"], "tradition_id": "greek", "earliest_attestation": "Mycenaean Linear B, c. 1400 BCE", "primary_sources": ["Iliad", "Odyssey", "Hesiod's Theogony", "Orphic Hymns"], "etymology": "From PIE *dy\\u1e17ws \\u2014 'sky', 'shining heaven'", "iconography": ["thunderbolt", "eagle", "oak", "throne"], "summary": "King of the Olympian gods. Sky-father, storm-god, lawgiver, oath-keeper, philanderer. Carries the contradictions of cosmic kingship.", "facets": ["zeus-sky-father", "zeus-tyrant", "zeus-oath-keeper", "zeus-storm-god"]}, {"id": "prometheus", "primary_name": "Prometheus", "alternate_names": ["The Forethinker"], "tradition_id": "greek", "earliest_attestation": "Hesiod, c. 700 BCE", "primary_sources": ["Hesiod's Theogony", "Hesiod's Works and Days", "Aeschylus's Prometheus Bound"], "etymology": "Greek 'forethought'", "iconography": ["fennel-stalk torch", "chains", "eagle at liver"], "summary": "Titan who steals fire from the gods to give to humanity, against Zeus's will. Punished by being chained to a rock where an eagle eats his liver daily.", "facets": ["prometheus-fire-bringer"]}, {"id": "odin", "primary_name": "Odin", "alternate_names": ["\\u00d3\\u00f0inn", "Woden", "Wodan", "Wotan", "Gangleri", "H\\u00e1rr"], "tradition_id": "norse", "earliest_attestation": "Roman-era Germanic; Eddic material 13th c. CE", "primary_sources": ["Poetic Edda (V\\u00f6lusp\\u00e1, H\\u00e1vam\\u00e1l, Gr\\u00edmnism\\u00e1l)", "Prose Edda", "Gesta Danorum"], "etymology": "Proto-Germanic *W\\u014d\\u00f0anaz, 'fury / inspiration / poetic frenzy'", "iconography": ["one eye", "wide-brimmed hat", "spear Gungnir", "ravens Huginn and Muninn", "Sleipnir"], "summary": "All-Father of the Norse pantheon. Restless wisdom-seeker who sacrifices himself to himself on Yggdrasil. Wanderer in disguise. Carries knowledge of his own doom at Ragnar\\u00f6k.", "facets": ["odin-all-father", "odin-wanderer", "odin-wisdom-seeker", "odin-sacrificed-on-yggdrasil", "odin-psychopomp"]}, {"id": "loki", "primary_name": "Loki", "alternate_names": ["Loptr", "Hve\\u00f0rungr"], "tradition_id": "norse", "earliest_attestation": "Eddic material; possibly older", "primary_sources": ["Poetic Edda (Lokasenna, \\u00derymskvi\\u00f0a)", "Prose Edda", "Loka T\\u00e1ttur"], "iconography": ["bound serpent above him", "shape-shifter"], "summary": "Trickster of the Norse pantheon. Helper and adversary of the gods. Father of Hel, Fenrir, and J\\u00f6rmungandr. Eventually bound for the killing of Baldr; will break free at Ragnar\\u00f6k.", "facets": ["loki-trickster-liberator", "loki-betrayer", "loki-bound"]}, {"id": "shiva", "primary_name": "Shiva", "alternate_names": ["\\u015aiva", "Mahadeva", "Rudra (Vedic precursor)", "Hara", "Shankara"], "tradition_id": "hindu", "earliest_attestation": "Rudra in Rigveda, c. 1500\\u20131200 BCE", "primary_sources": ["Rigveda (as Rudra)", "Shvetashvatara Upanishad", "Shiva Purana", "Linga Purana"], "etymology": "Sanskrit 'auspicious'", "iconography": ["third eye", "crescent moon", "trident", "serpent around neck", "tiger skin", "blue throat", "ashes"], "summary": "Destroyer-transformer of the Hindu trimurti. Encompasses contradictions: ascetic and erotic, creator and destroyer, terrible and benevolent.", "facets": ["shiva-destroyer", "shiva-ascetic", "shiva-teacher", "shiva-erotic", "shiva-bhairava"]}, {"id": "krishna", "primary_name": "Krishna", "alternate_names": ["K\\u1e5b\\u1e63\\u1e47a", "Govinda", "Vasudeva"], "tradition_id": "hindu", "earliest_attestation": "Mahabharata; full theological development by c. 1st millennium CE", "primary_sources": ["Mahabharata (esp. Bhagavad Gita)", "Bhagavata Purana", "Harivamsa"], "etymology": "Sanskrit 'dark', 'black'", "iconography": ["blue skin", "flute", "peacock feather", "cows"], "summary": "Eighth avatar of Vishnu. Cosmic teacher (Bhagavad Gita), divine lover (Vrindavan), warrior-counselor (Mahabharata). Reveals himself as the supreme Source.", "facets": ["krishna-teacher", "krishna-cosmic-form", "krishna-divine-lover", "krishna-trickster-child"]}, {"id": "quetzalcoatl", "primary_name": "Quetzalcoatl", "alternate_names": ["Kukulkan (Maya)", "Gukumatz (K'iche')", "Ehecatl"], "tradition_id": "aztec", "earliest_attestation": "c. 1st c. CE (Teotihuacan)", "primary_sources": ["Florentine Codex", "Codex Chimalpopoca", "Popol Vuh"], "etymology": "'Feathered serpent' \\u2014 quetzal feathers + coatl", "iconography": ["feathered serpent", "conch shell", "wind-jewel"], "summary": "Feathered serpent. Union of sky and earth. Civilizing teacher who gave humans corn, calendar, writing. Opposes blood sacrifice. Exiled by Tezcatlipoca; prophesies his return.", "facets": ["quetzalcoatl-culture-hero", "quetzalcoatl-wind", "quetzalcoatl-creator", "quetzalcoatl-prophet-returning"]}, {"id": "tezcatlipoca", "primary_name": "Tezcatlipoca", "alternate_names": ["Black Tezcatlipoca", "Smoking Mirror"], "tradition_id": "aztec", "earliest_attestation": "c. 13th\\u201314th c. CE", "primary_sources": ["Florentine Codex", "Codex Borgia", "Codex Telleriano-Remensis"], "etymology": "'Smoking Mirror'", "iconography": ["obsidian mirror foot", "black face-paint", "jaguar"], "summary": "Most complex god of the Aztec pantheon. Night sky, sorcery, memory, fate, war, rulership. Quetzalcoatl's shadow-twin and adversary.", "facets": ["tezcatlipoca-night-sky", "tezcatlipoca-fate-sorcery", "tezcatlipoca-adversary", "tezcatlipoca-king-maker"]}, {"id": "sophia", "primary_name": "Sophia", "alternate_names": ["Hokhmah", "Wisdom"], "tradition_id": "gnostic", "earliest_attestation": "1st\\u20132nd c. CE", "primary_sources": ["Apocryphon of John", "Pistis Sophia", "Hypostasis of the Archons", "Valentinian Exposition"], "etymology": "Greek 'wisdom'", "summary": "Wisdom \\u2014 the last and youngest of the Aeons. Acts without her consort and produces Yaldabaoth. Descends into matter to recover the divine sparks. Both the cause of the fall and the means of return.", "facets": ["sophia-fallen-aeon", "sophia-redemptive"]}], "facets": [{"id": "monad-unmanifest", "parent_deity_id": "monad", "facet_name": "The Unmanifest Source", "tier_assignment": 1, "function_tags": ["unmanifest-source", "ineffable", "ground-of-being", "pre-creation", "beyond-being", "self-generated"], "valence": "transcendent", "core_claim": "The Monad is beyond name, form, gender, and category. It does not create directly; it self-contemplates, and from that contemplation the Aeons emerge. It is the silence before the first word.", "parallel_facets": ["ein-sof", "brahman-nirguna", "tao-unnamed", "the-one-plotinus", "nun-primordial", "ginnungagap", "sunyata", "al-haqq"]}, {"id": "yaldabaoth-demiurge", "parent_deity_id": "yaldabaoth", "facet_name": "The Demiurge (craftsman of matter)", "tier_assignment": 3, "function_tags": ["demiurge", "craftsman-creator", "ignorant-of-source", "born-of-emanation", "created-by-error", "false-most-high"], "valence": "negative", "core_claim": "Yaldabaoth, hidden away in a cloud by Sophia, fashions the material cosmos in imitation of the Pleroma he has never seen. He populates it with seven Archons and rules as if he were alone.", "parallel_facets": ["yahweh-creator", "marduk-cosmic-orderer", "brahma-egoic", "tezcatlipoca-adversary"]}, {"id": "yaldabaoth-usurper", "parent_deity_id": "yaldabaoth", "facet_name": "The False Most High (Lucifer-as-usurper)", "tier_assignment": 3, "function_tags": ["usurper", "false-most-high", "jealous", "ignorant-of-source", "lawgiver", "punitive"], "valence": "negative", "core_claim": "Declares 'I am God and there is no other.' Rebuked from above: 'You are wrong, Samael \\u2014 blind god.' This is the figure mainstream religion has mistaken for the Most High.", "parallel_facets": ["yahweh-jealous-god", "set-usurper-murderer", "lucifer-usurper", "zeus-tyrant", "tezcatlipoca-adversary"]}, {"id": "yahweh-creator", "parent_deity_id": "yahweh", "facet_name": "Creator of the heavens and the earth", "tier_assignment": 3, "function_tags": ["craftsman-creator", "lawgiver", "covenantal", "demiurge", "sky"], "valence": "ambivalent-positive-in-orthodox-reading-negative-in-gnostic", "core_claim": "In Genesis 1, Yahweh-Elohim fashions the cosmos from formless void. In orthodox reading, this is the ultimate God creating from nothing. In Gnostic reading, it is the Demiurge ordering pre-existing chaos in ignorance of the Pleroma.", "parallel_facets": ["yaldabaoth-demiurge", "marduk-cosmic-orderer", "brahma-egoic"]}, {"id": "yahweh-jealous-god", "parent_deity_id": "yahweh", "facet_name": "The Jealous God of Sinai", "tier_assignment": 3, "function_tags": ["jealous", "lawgiver", "punitive", "demanding-exclusive-worship", "covenantal", "blood-sacrifice"], "valence": "ambivalent", "core_claim": "'I am the Lord thy God; thou shalt have no other gods before me. For I the Lord thy God am a jealous God.' (Exodus 20). Demands exclusive worship, blood sacrifice, and unflinching obedience.", "parallel_facets": ["yaldabaoth-usurper", "marduk-cosmic-orderer", "zeus-tyrant"]}, {"id": "yahweh-covenantal", "parent_deity_id": "yahweh", "facet_name": "The Covenantal Lord", "tier_assignment": 3, "function_tags": ["covenantal", "oath-keeper", "father-of-nation", "lawgiver"], "valence": "positive", "core_claim": "Yahweh enters into covenant with Abraham, Isaac, Jacob; gives Torah to Moses; binds himself to Israel as their God.", "parallel_facets": ["zeus-oath-keeper", "mithra-oath-keeper"]}, {"id": "el-elyon-council-head", "parent_deity_id": "el-elyon", "facet_name": "Head of the Divine Council", "tier_assignment": 2, "function_tags": ["divine-council-head", "sky", "father", "first-emanation", "first-among-gods"], "valence": "positive", "core_claim": "El Elyon presides over the divine council and apportions the nations among the sons of God (Deut 32:8-9 in the older textual tradition). He is the true Most High in the Gnostic and older-Canaanite reading.", "parallel_facets": ["anu-sky-council", "zeus-sky-father", "odin-all-father", "brahma-saguna", "barbelo-first-aeon"]}, {"id": "set-protector-of-ra", "parent_deity_id": "set", "facet_name": "Protector of Ra's solar barque", "tier_assignment": 4, "function_tags": ["guardian", "warrior", "storm", "chaos-against-greater-chaos", "night-defender"], "valence": "positive", "core_claim": "Each night Set stands at the prow of Ra's barque and spears Apophis, the chaos-serpent. He is necessary chaos in service of cosmic order.", "parallel_facets": ["marduk-warrior", "thor-mjolnir", "indra-vajra", "michael-archangel"]}, {"id": "set-usurper-murderer", "parent_deity_id": "set", "facet_name": "Murderer of Osiris, usurper of the throne", "tier_assignment": 3, "function_tags": ["usurper", "fratricide", "chaos-against-order", "desert-sterility", "betrayer", "false-king"], "valence": "negative", "core_claim": "Set murders his brother Osiris out of jealousy, dismembers him, claims the throne. Embodies disorder and the violation of ma'at.", "parallel_facets": ["yaldabaoth-usurper", "loki-betrayer", "tezcatlipoca-adversary", "lucifer-usurper", "cain-genesis"]}, {"id": "set-storm-desert", "parent_deity_id": "set", "facet_name": "Lord of storms and the red desert", "tier_assignment": 4, "function_tags": ["storm", "desert", "foreign-lands", "wild"], "valence": "ambivalent", "core_claim": "Set rules the red lands beyond the cultivated Nile valley \\u2014 the desert, foreign nations, the wild places.", "parallel_facets": ["baal-hadad-storm", "thor-storm", "indra-storm-king"]}, {"id": "marduk-cosmic-orderer", "parent_deity_id": "marduk", "facet_name": "Cosmic orderer (slayer of Tiamat)", "tier_assignment": 3, "function_tags": ["craftsman-creator", "demiurge", "warrior", "cosmic-orderer", "father-of-gods", "born-of-emanation"], "valence": "ambivalent-positive", "core_claim": "Marduk slays Tiamat, the primordial chaos-mother, splits her body to form heaven and earth, and is exalted by the gods with fifty names.", "parallel_facets": ["yaldabaoth-demiurge", "yahweh-creator", "brahma-egoic"]}, {"id": "marduk-warrior", "parent_deity_id": "marduk", "facet_name": "Champion against chaos", "tier_assignment": 4, "function_tags": ["warrior", "guardian", "chaos-against-greater-chaos"], "valence": "positive", "core_claim": "Marduk takes up arms when no other god will face Tiamat. Armed with thunderbolt and the four winds, he defeats her.", "parallel_facets": ["set-protector-of-ra", "thor-mjolnir", "indra-vajra", "michael-archangel"]}, {"id": "inanna-love-fertility", "parent_deity_id": "inanna", "facet_name": "Goddess of love and fertility", "tier_assignment": "cross-tier", "function_tags": ["love", "fertility", "erotic", "great-mother"], "valence": "positive", "core_claim": "Inanna is the bride of Dumuzi, the principle of erotic and fertile love that drives the renewal of the world.", "parallel_facets": ["aphrodite-love", "venus-love", "freya-love", "hathor-love", "parvati-erotic"]}, {"id": "inanna-war", "parent_deity_id": "inanna", "facet_name": "Goddess of war", "tier_assignment": 4, "function_tags": ["war", "warrior-maiden", "terrible"], "valence": "ambivalent", "core_claim": "Inanna rides into battle on lions; her hymns celebrate her as the destroyer of cities and the breaker of armies.", "parallel_facets": ["athena-war", "morrigan-war", "kali-destroyer", "anat-war", "sekhmet-war"]}, {"id": "inanna-descended-goddess", "parent_deity_id": "inanna", "facet_name": "The Descended One", "tier_assignment": "cross-tier", "function_tags": ["descended-god", "dying-rising-god", "underworld-journey", "sacrificed-and-returned", "boundary-crosser", "wisdom-through-suffering"], "valence": "ambivalent-positive", "core_claim": "Inanna descends through seven gates of the underworld, stripped at each gate of a divine attribute, until she stands naked before Ereshkigal. Killed and hung on a hook; revived by Enki's intervention; returns transformed.", "parallel_facets": ["persephone-descent", "dionysus-zagreus-descent", "christ-harrowing-of-hell", "osiris-dismembered", "sophia-fallen-aeon", "quetzalcoatl-creator", "odin-sacrificed-on-yggdrasil"]}, {"id": "inanna-queen-of-heaven", "parent_deity_id": "inanna", "facet_name": "Queen of Heaven", "tier_assignment": 2, "function_tags": ["sky", "divine-queen", "first-among-gods", "great-mother"], "valence": "positive", "core_claim": "Inanna is the Queen of Heaven, ruler over the morning and evening star, present at the divine council.", "parallel_facets": ["mary-queen-of-heaven", "hera-queen", "isis-queen", "frigg-queen"]}, {"id": "zeus-sky-father", "parent_deity_id": "zeus", "facet_name": "Sky-Father", "tier_assignment": 2, "function_tags": ["sky", "father", "divine-council-head", "first-among-gods", "storm"], "valence": "positive", "core_claim": "Zeus is the bright sky personified \\u2014 the Indo-European Dyaus, the shining father. He presides over the council of the gods on Olympus.", "parallel_facets": ["el-elyon-council-head", "anu-sky-council", "odin-all-father", "dyaus-pita", "jupiter-sky"]}, {"id": "zeus-tyrant", "parent_deity_id": "zeus", "facet_name": "Zeus the Tyrant (Prometheus Bound)", "tier_assignment": 3, "function_tags": ["tyrant", "punitive", "jealous", "lawgiver", "false-most-high"], "valence": "negative", "core_claim": "In Aeschylus's Prometheus Bound, Zeus is depicted as a recent tyrant who seized the throne from Kronos and punishes Prometheus for giving fire to humans. This is the Demiurge-aspect of Zeus.", "parallel_facets": ["yaldabaoth-usurper", "yahweh-jealous-god", "set-usurper-murderer"]}, {"id": "zeus-oath-keeper", "parent_deity_id": "zeus", "facet_name": "Zeus Horkios (Keeper of Oaths)", "tier_assignment": 4, "function_tags": ["oath-keeper", "justice", "truth"], "valence": "positive", "core_claim": "Zeus enforces oaths. Those who swear falsely by Zeus are struck by his thunderbolt or pursued by the Furies.", "parallel_facets": ["yahweh-covenantal", "mithra-oath-keeper", "varuna-oath-keeper"]}, {"id": "zeus-storm-god", "parent_deity_id": "zeus", "facet_name": "Storm-bringer", "tier_assignment": 4, "function_tags": ["storm", "thunder", "rain", "warrior"], "valence": "ambivalent", "core_claim": "Zeus wields the thunderbolt forged by the Cyclopes. Storm and rain are his domain.", "parallel_facets": ["thor-storm", "indra-storm-king", "baal-hadad-storm", "perun-storm", "set-storm-desert"]}, {"id": "prometheus-fire-bringer", "parent_deity_id": "prometheus", "facet_name": "Fire-bringer / Light-bringer", "tier_assignment": "cross-tier", "function_tags": ["light-bringer", "culture-hero", "trickster", "punished-for-helping-humans", "bound-god", "sacrificed-god", "wisdom-teacher"], "valence": "positive", "core_claim": "Prometheus steals fire from the gods in a fennel-stalk and gives it to humanity. For this he is chained to a rock in the Caucasus, where an eagle eats his liver each day \\u2014 and it regrows each night.", "parallel_facets": ["loki-trickster-liberator", "enki-wisdom", "quetzalcoatl-culture-hero", "hermes-trismegistus", "lucifer-light-bringer", "ophite-serpent-of-eden"]}, {"id": "odin-all-father", "parent_deity_id": "odin", "facet_name": "All-Father", "tier_assignment": 2, "function_tags": ["sky", "father", "divine-council-head", "first-among-gods"], "valence": "positive", "core_claim": "Odin is All-Father, head of the Aesir, ruler from Hli\\u00f0skj\\u00e1lf where he sees all the worlds.", "parallel_facets": ["zeus-sky-father", "el-elyon-council-head", "anu-sky-council", "dyaus-pita"]}, {"id": "odin-wanderer", "parent_deity_id": "odin", "facet_name": "The Wanderer", "tier_assignment": "cross-tier", "function_tags": ["wanderer", "disguised-god", "wisdom-seeker", "tester-of-mortals"], "valence": "ambivalent", "core_claim": "Odin walks the worlds in disguise \\u2014 wide-brimmed hat, blue cloak, single eye \\u2014 testing kings, learning wisdom, gathering knowledge.", "parallel_facets": ["hermes-trismegistus", "khidr-green-guide", "christ-disguised-stranger"]}, {"id": "odin-wisdom-seeker", "parent_deity_id": "odin", "facet_name": "Seeker of Wisdom", "tier_assignment": "cross-tier", "function_tags": ["wisdom-seeker", "self-sacrifice-for-knowledge", "magician"], "valence": "positive", "core_claim": "Odin sacrifices an eye at Mimir's well to drink and gain wisdom. He learns the nine songs and seizes the mead of poetry.", "parallel_facets": ["enki-wisdom", "thoth-wisdom", "shiva-teacher", "krishna-teacher"]}, {"id": "odin-sacrificed-on-yggdrasil", "parent_deity_id": "odin", "facet_name": "The Self-Sacrificed (Hung on the World Tree)", "tier_assignment": "cross-tier", "function_tags": ["sacrificed-god", "dying-rising-god", "wisdom-through-suffering", "self-offering", "knowledge-by-sacrifice"], "valence": "positive", "core_claim": "'I know that I hung on a windswept tree nine long nights, wounded by spear, given to Odin, myself to myself.' (H\\u00e1vam\\u00e1l 138). He seizes the runes.", "parallel_facets": ["christ-crucifixion", "prometheus-fire-bringer", "inanna-descended-goddess", "dionysus-zagreus-descent", "osiris-dismembered", "krishna-cosmic-form"]}, {"id": "odin-psychopomp", "parent_deity_id": "odin", "facet_name": "Lord of the Slain / Psychopomp", "tier_assignment": 4, "function_tags": ["psychopomp", "war", "death", "host-of-valhalla"], "valence": "ambivalent", "core_claim": "Odin gathers half the slain warriors to Valhalla, where they feast and fight and prepare for Ragnar\\u00f6k.", "parallel_facets": ["hermes-psychopomp", "anubis-judge", "yama-death"]}, {"id": "loki-trickster-liberator", "parent_deity_id": "loki", "facet_name": "Trickster / Liberator", "tier_assignment": "cross-tier", "function_tags": ["trickster", "boundary-crosser", "wisdom-thief", "shape-shifter", "culture-hero-ambivalent"], "valence": "ambivalent", "core_claim": "Loki repeatedly extracts the Aesir from disasters of their own making \\u2014 and sometimes creates them. He brings them Mj\\u00f6lnir, Sleipnir, Gungnir, and other treasures, often through cunning theft.", "parallel_facets": ["prometheus-fire-bringer", "hermes-trismegistus", "enki-wisdom", "coyote-trickster", "anansi-spider", "sun-wukong"]}, {"id": "loki-betrayer", "parent_deity_id": "loki", "facet_name": "The Betrayer (Killer of Baldr)", "tier_assignment": 3, "function_tags": ["betrayer", "fratricide-by-proxy", "adversary", "false-friend"], "valence": "negative", "core_claim": "Loki contrives Baldr's death by tricking blind H\\u00f6\\u00f0r into throwing the mistletoe-dart. For this he is bound beneath a venom-dripping serpent.", "parallel_facets": ["set-usurper-murderer", "tezcatlipoca-adversary", "judas-betrayer", "mara-buddha-tempter"]}, {"id": "loki-bound", "parent_deity_id": "loki", "facet_name": "The Bound One", "tier_assignment": 4, "function_tags": ["bound-god", "imprisoned-titan", "awaiting-release"], "valence": "negative-pending-eschaton", "core_claim": "Bound beneath a serpent whose venom drips on his face. At Ragnar\\u00f6k he breaks free and leads the forces of chaos against the gods.", "parallel_facets": ["prometheus-fire-bringer", "fenrir-bound", "azazel-bound", "satan-chained-revelation"]}, {"id": "shiva-destroyer", "parent_deity_id": "shiva", "facet_name": "The Destroyer (Cosmic Dissolver)", "tier_assignment": 2, "function_tags": ["destroyer", "transformer", "cosmic-cycle", "dissolver", "end-of-aeon"], "valence": "ambivalent-positive", "core_claim": "Shiva dissolves the manifest universe at the end of each cosmic cycle. Destruction is the precondition for renewal.", "parallel_facets": ["kali-destroyer", "yama-death", "thanatos-death", "hel-underworld"]}, {"id": "shiva-ascetic", "parent_deity_id": "shiva", "facet_name": "The Great Ascetic (Mahayogi)", "tier_assignment": "cross-tier", "function_tags": ["ascetic", "renunciate", "meditation-master", "wisdom-through-stillness"], "valence": "positive", "core_claim": "Shiva sits in eternal meditation on Mount Kailash, ash-smeared, withdrawn from the world, the prototype of all yogis.", "parallel_facets": ["buddha-meditation", "christ-desert-fast"]}, {"id": "shiva-teacher", "parent_deity_id": "shiva", "facet_name": "Dakshinamurti (The Silent Teacher)", "tier_assignment": "cross-tier", "function_tags": ["teacher", "silent-transmission", "wisdom-bringer", "guru", "south-facing"], "valence": "positive", "core_claim": "Shiva as Dakshinamurti faces south, sits beneath a banyan tree, and transmits the highest knowledge through silence to aged sages.", "parallel_facets": ["hermes-trismegistus", "thoth-wisdom", "manjushri-wisdom", "khidr-green-guide", "odin-wisdom-seeker", "enki-wisdom"]}, {"id": "shiva-erotic", "parent_deity_id": "shiva", "facet_name": "The Erotic Principle (Linga / Nataraja)", "tier_assignment": 2, "function_tags": ["erotic", "fertility", "cosmic-dance", "creator-destroyer-united"], "valence": "positive", "core_claim": "Shiva as Linga is the generative principle of the cosmos. As Nataraja, he dances the universe into being and out of being simultaneously.", "parallel_facets": ["dionysus-fertility", "krishna-divine-lover", "inanna-love-fertility"]}, {"id": "shiva-bhairava", "parent_deity_id": "shiva", "facet_name": "Bhairava (The Terrible)", "tier_assignment": 4, "function_tags": ["terrible", "wrathful", "protector-fierce", "cremation-ground"], "valence": "ambivalent", "core_claim": "Shiva in his terrible aspect, haunting cremation grounds, attended by dogs, embodying the fearsome necessity of dissolution.", "parallel_facets": ["kali-destroyer", "yamantaka", "hekate-night"]}, {"id": "krishna-teacher", "parent_deity_id": "krishna", "facet_name": "Cosmic Teacher (Bhagavad Gita)", "tier_assignment": "cross-tier", "function_tags": ["teacher", "wisdom-bringer", "revealer-of-self-as-source", "descended-god"], "valence": "positive", "core_claim": "On the battlefield of Kurukshetra, Krishna reveals to Arjuna that he is the supreme Self, the source of all gods and worlds. He teaches the paths of action, devotion, and knowledge.", "parallel_facets": ["christ-logos-descended", "shiva-teacher", "hermes-trismegistus", "quetzalcoatl-culture-hero"]}, {"id": "krishna-cosmic-form", "parent_deity_id": "krishna", "facet_name": "The Cosmic Form (Vishvarupa)", "tier_assignment": 1, "function_tags": ["unmanifest-source", "all-encompassing", "cosmic-totality", "time-as-destroyer"], "valence": "transcendent", "core_claim": "Krishna reveals to Arjuna his Vishvarupa \\u2014 the cosmic form containing all beings, all worlds, all time. 'I am become Time, the destroyer of worlds.'", "parallel_facets": ["monad-unmanifest", "brahman-saguna-as-cosmos", "christ-cosmic"]}, {"id": "krishna-divine-lover", "parent_deity_id": "krishna", "facet_name": "The Divine Lover (of Vrindavan)", "tier_assignment": "cross-tier", "function_tags": ["erotic", "divine-lover", "fertility", "playful"], "valence": "positive", "core_claim": "Krishna of Vrindavan plays his flute and the gopis come; Radha is his eternal beloved. The lila of divine love is the deepest theology.", "parallel_facets": ["shiva-erotic", "inanna-love-fertility", "dionysus-fertility"]}, {"id": "krishna-trickster-child", "parent_deity_id": "krishna", "facet_name": "The Trickster Child (Butter-Thief)", "tier_assignment": "cross-tier", "function_tags": ["trickster", "child-god", "playful", "boundary-crosser"], "valence": "positive", "core_claim": "Baby Krishna steals butter, mounts the hood of Kaliya the serpent, plays pranks on his mother. The trickster aspect of the supreme.", "parallel_facets": ["hermes-trismegistus", "loki-trickster-liberator", "coyote-trickster"]}, {"id": "quetzalcoatl-culture-hero", "parent_deity_id": "quetzalcoatl", "facet_name": "Bringer of Civilization", "tier_assignment": "cross-tier", "function_tags": ["light-bringer", "culture-hero", "wisdom-teacher", "civilizing-god", "corn-giver", "calendar-giver", "opposes-sacrifice", "exiled-god"], "valence": "positive", "core_claim": "Quetzalcoatl descended to give humans corn, calendar, writing, the arts. He opposed blood sacrifice and was exiled by Tezcatlipoca.", "parallel_facets": ["prometheus-fire-bringer", "enki-wisdom", "hermes-trismegistus", "thoth-wisdom", "osiris-civilizer", "krishna-teacher", "christ-logos-descended", "viracocha"]}, {"id": "quetzalcoatl-wind", "parent_deity_id": "quetzalcoatl", "facet_name": "Ehecatl (The Wind)", "tier_assignment": 4, "function_tags": ["wind", "breath", "spirit", "sky"], "valence": "positive", "core_claim": "Quetzalcoatl as Ehecatl is the wind that precedes the rains, the breath of the divine in the world.", "parallel_facets": ["ruach-elohim", "pneuma-spirit", "vayu-wind"]}, {"id": "quetzalcoatl-creator", "parent_deity_id": "quetzalcoatl", "facet_name": "Co-Creator (with Tezcatlipoca)", "tier_assignment": 2, "function_tags": ["creator", "co-creator", "descended-into-underworld-for-bones"], "valence": "positive", "core_claim": "Quetzalcoatl descends to Mictlan to retrieve the bones of past humanity and restores them to life with his own blood.", "parallel_facets": ["christ-harrowing-of-hell", "inanna-descended-goddess", "orpheus-underworld"]}, {"id": "quetzalcoatl-prophet-returning", "parent_deity_id": "quetzalcoatl", "facet_name": "The Returning Prophet", "tier_assignment": "cross-tier", "function_tags": ["returning-god", "eschatological", "exiled-and-promised-return"], "valence": "positive", "core_claim": "Sailing east on his raft of serpents, Quetzalcoatl prophesied his return in a One Reed year.", "parallel_facets": ["maitreya-returning", "saoshyant", "christ-second-coming", "mahdi", "kalki-avatar"]}, {"id": "tezcatlipoca-night-sky", "parent_deity_id": "tezcatlipoca", "facet_name": "Lord of the Night Sky", "tier_assignment": 2, "function_tags": ["night", "sky", "stars", "fate"], "valence": "ambivalent", "core_claim": "Tezcatlipoca rules the night sky and the stars. From this vantage he sees all and judges kings.", "parallel_facets": ["nyx-night", "ratri-night", "nut-sky"]}, {"id": "tezcatlipoca-fate-sorcery", "parent_deity_id": "tezcatlipoca", "facet_name": "Sorcerer and Fate-Knower", "tier_assignment": 4, "function_tags": ["magic", "fate", "memory", "obsidian-mirror"], "valence": "ambivalent", "core_claim": "Through his smoking obsidian mirror, Tezcatlipoca sees the inner thoughts of all beings and the unfolding of fate.", "parallel_facets": ["odin-magician", "hecate-magic", "loki-trickster-liberator"]}, {"id": "tezcatlipoca-adversary", "parent_deity_id": "tezcatlipoca", "facet_name": "The Adversary / Shadow-Twin", "tier_assignment": 3, "function_tags": ["adversary", "shadow-twin", "tempter", "testing-power", "chaos-against-order", "usurper-of-civilizing-god"], "valence": "ambivalent-negative", "core_claim": "Tezcatlipoca exiled Quetzalcoatl from Tula through trickery \\u2014 sending him away with a mirror in which Quetzalcoatl saw his own face and was shamed.", "parallel_facets": ["set-usurper-murderer", "loki-betrayer", "yaldabaoth-usurper", "mara-buddha-tempter", "satan-job"]}, {"id": "tezcatlipoca-king-maker", "parent_deity_id": "tezcatlipoca", "facet_name": "King-Maker", "tier_assignment": 4, "function_tags": ["king-maker", "lord-of-rulership", "tester-of-rulers"], "valence": "ambivalent", "core_claim": "Tezcatlipoca grants and revokes the right to rule. Tezcatlipoca-priests examined and tested new kings.", "parallel_facets": ["odin-king-maker", "el-elyon-council-head"]}, {"id": "sophia-fallen-aeon", "parent_deity_id": "sophia", "facet_name": "The Fallen Aeon (Mother of the Demiurge)", "tier_assignment": "cross-tier", "function_tags": ["wisdom", "fallen-emanation", "mother-of-demiurge", "descended-goddess"], "valence": "ambivalent", "core_claim": "Sophia, last of the Aeons, attempts to create without her consort. Her error produces Yaldabaoth. She falls into the lower regions and must be recovered.", "parallel_facets": ["inanna-descended-goddess", "persephone-descent", "shekhinah-exile", "izanami-yomi"]}, {"id": "sophia-redemptive", "parent_deity_id": "sophia", "facet_name": "The Redeemer (Wisdom Returning)", "tier_assignment": "cross-tier", "function_tags": ["redeemer", "wisdom-teacher", "intercessor", "great-mother-returning"], "valence": "positive", "core_claim": "Sophia descends to recover the divine sparks trapped in humanity. With the Christ-Aeon, she effects the return of the lost light to the Pleroma.", "parallel_facets": ["shekhinah-redemptive", "shakti-redemptive", "isis-recovering-osiris", "demeter-recovering-persephone", "mary-mediatrix"]}], "canonical_parallels": [{"id": "p001", "facet_a_id": "yaldabaoth-usurper", "facet_b_id": "yahweh-jealous-god", "strength": "identity", "type": "gnostic-canonical-identification", "basis": ["Both declare 'I am God and there is no other' (Isaiah 45:5, Apocryphon of John II,1)", "Both demand exclusive worship and blood sacrifice", "Both are jealous, punitive, lawgiving", "Gnostic primary texts explicitly identify them"], "source_tradition": "Gnostic (Sethian, Valentinian, Marcionite)", "primary_text_evidence": ["Apocryphon of John II,1", "Hypostasis of the Archons II,4", "Marcion's Antitheses (lost; preserved in Tertullian Adv. Marc.)"], "scholarly_caveat": "The identification is a Gnostic interpretive move; mainstream Jewish and Christian theology rejects it.", "canonical": true, "user_drawn": false}, {"id": "p002", "facet_a_id": "inanna-descended-goddess", "facet_b_id": "persephone-descent", "strength": "strong-parallel", "type": "archetypal-and-structural", "basis": ["Both descend into the underworld", "Both are connected to fertility cycles", "Both involve a substitution-and-return arrangement"], "canonical": true, "user_drawn": false}, {"id": "p003", "facet_a_id": "odin-sacrificed-on-yggdrasil", "facet_b_id": "christ-crucifixion", "strength": "strong-parallel", "type": "archetypal", "basis": ["Both are self-sacrifice on a tree/cross", "Both are pierced by a spear", "Both involve sacrifice 'of myself to myself' (H\\u00e1vam\\u00e1l) / 'God offering God' (Trinitarian theology)", "Both result in acquisition of cosmic knowledge or redemption"], "canonical": true, "user_drawn": false}, {"id": "p004", "facet_a_id": "prometheus-fire-bringer", "facet_b_id": "loki-trickster-liberator", "strength": "strong-parallel", "type": "archetypal-trickster-liberator", "basis": ["Both are trickster figures who benefit humanity", "Both are punished by being bound", "Both will be released at the cosmic crisis", "Both bring fire/transformation"], "canonical": true, "user_drawn": false}, {"id": "p005", "facet_a_id": "quetzalcoatl-culture-hero", "facet_b_id": "prometheus-fire-bringer", "strength": "strong-parallel", "type": "archetypal-civilizing-teacher", "basis": ["Both descend/come to humanity with civilizing gifts", "Both oppose the dominant divine order", "Both are exiled or bound for their action"], "canonical": true, "user_drawn": false}, {"id": "p006", "facet_a_id": "shiva-destroyer", "facet_b_id": "kali-destroyer", "strength": "identity", "type": "same-tradition-paired-aspects", "basis": ["Within Hindu cosmology, Shiva and Kali are consorts embodying the same destroyer-principle", "Both dance the cosmic dance of dissolution", "Both are paradoxically generative through destruction"], "canonical": true, "user_drawn": false}, {"id": "p007", "facet_a_id": "set-usurper-murderer", "facet_b_id": "loki-betrayer", "strength": "strong-parallel", "type": "archetypal-betrayer", "basis": ["Both betray and kill a brother-figure (Osiris, Baldr)", "Both are subsequently bound/imprisoned", "Both represent disorder against cosmic order"], "canonical": true, "user_drawn": false}, {"id": "p008", "facet_a_id": "shiva-teacher", "facet_b_id": "hermes-trismegistus", "strength": "strong-parallel", "type": "archetypal-silent-wisdom-teacher", "basis": ["Both transmit highest wisdom", "Both are associated with silence and direct understanding", "Both are gurus to aged sages", "Both bridge tiers (cross-tier teachers)"], "canonical": true, "user_drawn": false}]}`;

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — Hermetic codex
// ─────────────────────────────────────────────────────────────────────────────
const TIER_META = {
  1: { label: 'I', name: 'Unmanifest Source', subtitle: 'The Ineffable Ground' },
  2: { label: 'II', name: 'True Most High', subtitle: 'Divine Council / Pleroma' },
  'cross-tier': { label: '✶', name: 'Light-Bringers', subtitle: 'Mediators / Liberators' },
  3: { label: 'III', name: 'Demiurge', subtitle: 'Flawed Craftsman' },
  4: { label: 'IV', name: 'Archons', subtitle: 'Planetary Rulers' },
};

const TIER_ORDER = [1, 2, 'cross-tier', 3, 4];

// Pigment-inspired tradition palette (muted, manuscript-friendly)
const TRADITION_COLORS = {
  gnostic: { bg: '#5d3b6d', ink: '#3a2545', label: 'Violet' },
  'hebrew-ot': { bg: '#2c3e6b', ink: '#1c2845', label: 'Indigo' },
  egyptian: { bg: '#a67c2f', ink: '#6e5018', label: 'Papyrus' },
  mesopotamian: { bg: '#2e5184', ink: '#1c3454', label: 'Lapis' },
  greek: { bg: '#9c4a3a', ink: '#6a2e22', label: 'Terracotta' },
  norse: { bg: '#5a5d5c', ink: '#363838', label: 'Pewter' },
  hindu: { bg: '#c97323', ink: '#8a4b13', label: 'Saffron' },
  aztec: { bg: '#3f6e5e', ink: '#264437', label: 'Jade' },
  // Fallbacks for v0.5.0 additions:
  buddhist: { bg: '#a06c4c', ink: '#6a4426', label: 'Sandalwood' },
  zoroastrian: { bg: '#7a4a2f', ink: '#4f2e1a', label: 'Ember' },
  taoist: { bg: '#3f6680', ink: '#243f53', label: 'Slate-Blue' },
  yoruba: { bg: '#4a3a6d', ink: '#2b2243', label: 'Royal-Purple' },
  andean: { bg: '#8a5d3a', ink: '#5a3a22', label: 'Earth' },
  polynesian: { bg: '#356b6b', ink: '#1e4444', label: 'Ocean' },
  slavic: { bg: '#6b4a35', ink: '#43301f', label: 'Birch' },
  celtic: { bg: '#4a6b3a', ink: '#2e4423', label: 'Moss' },
  finnish: { bg: '#5a6b7a', ink: '#384450', label: 'Mist' },
  japanese: { bg: '#8a3a4a', ink: '#5a212c', label: 'Cinnabar' },
  chinese: { bg: '#9c3a2a', ink: '#6a221a', label: 'Vermilion' },
};

const DEFAULT_TRADITION_COLOR = { bg: '#666', ink: '#333', label: 'Unset' };

function colorFor(traditionId) {
  return TRADITION_COLORS[traditionId] || DEFAULT_TRADITION_COLOR;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [rawData, setRawData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    try {
      setRawData(JSON.parse(SEED_DATA_RAW));
    } catch (e) {
      setLoadError('Failed to parse embedded data: ' + e.message);
    }
  }, []);

  if (loadError) return <ErrorScreen msg={loadError} />;
  if (!rawData) return <LoadingScreen />;

  return <SourceMapApp data={rawData} onReload={(d) => setRawData(d)} />;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f1ecdf', color: '#1d2030', fontFamily: 'EB Garamond, Georgia, serif' }}>
      <div className="text-center">
        <div className="text-2xl italic">Loading the Source Map…</div>
      </div>
    </div>
  );
}

function ErrorScreen({ msg }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#f1ecdf' }}>
      <div className="max-w-md text-center" style={{ color: '#7a3325' }}>
        <div className="text-xl mb-2 font-semibold">Cannot render</div>
        <div className="text-sm font-mono">{msg}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SourceMapApp — the main view, takes parsed data
// ─────────────────────────────────────────────────────────────────────────────
function SourceMapApp({ data, onReload }) {
  // Indexes built from data
  const traditions = data.traditions || [];
  const deities = data.deities || [];
  const facets = data.facets || [];
  const parallels = data.canonical_parallels || [];
  const meta = data._meta || {};

  const facetById = useMemo(() => Object.fromEntries(facets.map(f => [f.id, f])), [facets]);
  const deityById = useMemo(() => Object.fromEntries(deities.map(d => [d.id, d])), [deities]);
  const traditionById = useMemo(() => Object.fromEntries(traditions.map(t => [t.id, t])), [traditions]);

  // Parallel lookup: which facets does this facet match?
  const parallelsForFacet = useMemo(() => {
    const idx = {};
    facets.forEach(f => { idx[f.id] = new Set(f.parallel_facets || []); });
    // Add reverse links from canonical_parallels
    parallels.forEach(p => {
      if (!idx[p.facet_a_id]) idx[p.facet_a_id] = new Set();
      if (!idx[p.facet_b_id]) idx[p.facet_b_id] = new Set();
      idx[p.facet_a_id].add(p.facet_b_id);
      idx[p.facet_b_id].add(p.facet_a_id);
    });
    return idx;
  }, [facets, parallels]);

  // Facets grouped by tier
  const facetsByTier = useMemo(() => {
    const groups = { 1: [], 2: [], 'cross-tier': [], 3: [], 4: [] };
    facets.forEach(f => {
      const t = f.tier_assignment;
      if (groups[t]) groups[t].push(f);
    });
    return groups;
  }, [facets]);

  // UI state
  const [selectedFacetId, setSelectedFacetId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTraditions, setActiveTraditions] = useState(() => new Set(traditions.map(t => t.id)));
  const [searchQuery, setSearchQuery] = useState('');
  const [scholarlyMode, setScholarlyMode] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Reset selection if data reloaded
  useEffect(() => {
    setSelectedFacetId(null);
    setSheetOpen(false);
    setActiveTraditions(new Set(traditions.map(t => t.id)));
  }, [data]);

  const selectedFacet = selectedFacetId ? facetById[selectedFacetId] : null;
  const selectedDeity = selectedFacet ? deityById[selectedFacet.parent_deity_id] : null;
  const selectedRelated = selectedFacet ? parallelsForFacet[selectedFacet.id] || new Set() : new Set();

  // Search match
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const matches = new Set();
    facets.forEach(f => {
      const d = deityById[f.parent_deity_id];
      if (!d) return;
      const hay = [
        d.primary_name,
        ...(d.alternate_names || []),
        f.facet_name,
        ...(f.function_tags || []),
        f.core_claim || '',
      ].join(' ').toLowerCase();
      if (hay.includes(q)) matches.add(f.id);
    });
    return matches;
  }, [searchQuery, facets, deityById]);

  // Visible facets after filters + search
  const isFacetVisible = useCallback((facet) => {
    const d = deityById[facet.parent_deity_id];
    if (!d) return false;
    if (!activeTraditions.has(d.tradition_id)) return false;
    if (searchMatches && !searchMatches.has(facet.id)) return false;
    return true;
  }, [activeTraditions, searchMatches, deityById]);

  function selectFacet(id) {
    setSelectedFacetId(id);
    setSheetOpen(true);
  }

  function closeSheet() {
    setSheetOpen(false);
    // Keep selectedFacetId so the highlight persists; clear on a second close gesture
  }

  function clearSelection() {
    setSelectedFacetId(null);
    setSheetOpen(false);
  }

  function toggleTradition(id) {
    setActiveTraditions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.traditions || !parsed.deities || !parsed.facets) {
          alert('Invalid file: needs traditions, deities, and facets arrays.');
          return;
        }
        onReload(parsed);
      } catch (err) {
        alert('Could not parse file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // Counts for UI
  const visibleCount = facets.filter(isFacetVisible).length;
  const totalDeities = deities.length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f5efe1 0%, #ede4cf 100%)',
      color: '#1d2030',
      fontFamily: 'EB Garamond, Georgia, "Times New Roman", serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');

        .smallcaps {
          font-variant: small-caps;
          letter-spacing: 0.08em;
        }
        .marginalia {
          font-variant: small-caps;
          letter-spacing: 0.12em;
          font-size: 11px;
          color: #6b5e3c;
        }
        .codex-rule {
          background: linear-gradient(90deg, transparent 0%, #b08648 20%, #b08648 80%, transparent 100%);
          height: 1px;
        }
        .tier-band {
          position: relative;
        }
        .tier-band::before {
          content: '';
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(176,134,72,0.4) 20%, rgba(176,134,72,0.4) 80%, transparent 100%);
        }
        .deity-chip {
          transition: transform 120ms ease, opacity 200ms ease, box-shadow 200ms ease;
          cursor: pointer;
        }
        .deity-chip:hover {
          transform: translateY(-1px);
        }
        .deity-chip.selected {
          transform: translateY(-1px);
          box-shadow: 0 0 0 2px #b08648, 0 4px 14px rgba(176,134,72,0.35);
        }
        .deity-chip.related {
          box-shadow: 0 0 0 1.5px #d4a85f, 0 0 12px rgba(212,168,95,0.4);
        }
        .deity-chip.dim {
          opacity: 0.28;
        }
        .deity-chip.search-miss {
          opacity: 0.12;
          pointer-events: none;
        }
        .tradition-chip {
          transition: all 150ms ease;
        }
        .sheet-backdrop {
          background: rgba(29, 32, 48, 0.45);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }
        .sheet {
          background: #faf5e7;
          box-shadow: 0 -8px 30px rgba(29,32,48,0.25);
          border-top: 1px solid #b08648;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(176,134,72,0.35);
          border-radius: 999px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .paper-texture {
          background-image:
            radial-gradient(circle at 30% 20%, rgba(176,134,72,0.04) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(176,134,72,0.03) 0%, transparent 50%);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 200ms ease-out;
        }
      `}</style>

      <Header
        meta={meta}
        onAboutClick={() => setAboutOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scholarlyMode={scholarlyMode}
        setScholarlyMode={setScholarlyMode}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        visibleCount={visibleCount}
        totalCount={facets.length}
        onFileUpload={handleFileUpload}
      />

      {filtersOpen && (
        <FilterBar
          traditions={traditions}
          activeTraditions={activeTraditions}
          onToggle={toggleTradition}
          onAll={() => setActiveTraditions(new Set(traditions.map(t => t.id)))}
          onNone={() => setActiveTraditions(new Set())}
        />
      )}

      <main className="paper-texture" style={{ paddingBottom: sheetOpen ? '60vh' : '24px' }}>
        {TIER_ORDER.map((tier, idx) => (
          <TierBand
            key={tier}
            tier={tier}
            meta={TIER_META[tier]}
            facets={facetsByTier[tier] || []}
            deityById={deityById}
            traditionById={traditionById}
            selectedFacetId={selectedFacetId}
            selectedRelated={selectedRelated}
            isFacetVisible={isFacetVisible}
            searchActive={!!searchMatches}
            onSelect={selectFacet}
            isFirst={idx === 0}
            isLast={idx === TIER_ORDER.length - 1}
          />
        ))}

        <Footer meta={meta} totalDeities={totalDeities} totalFacets={facets.length} totalParallels={parallels.length} />
      </main>

      {sheetOpen && selectedFacet && (
        <DetailSheet
          facet={selectedFacet}
          deity={selectedDeity}
          tradition={traditionById[selectedDeity.tradition_id]}
          facetById={facetById}
          deityById={deityById}
          traditionById={traditionById}
          parallelsForFacet={parallelsForFacet}
          parallelRecords={parallels}
          scholarlyMode={scholarlyMode}
          onClose={closeSheet}
          onClear={clearSelection}
          onSelectFacet={selectFacet}
        />
      )}

      {aboutOpen && <AboutModal meta={meta} onClose={() => setAboutOpen(false)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────
function Header({ meta, onAboutClick, searchQuery, setSearchQuery, scholarlyMode, setScholarlyMode, filtersOpen, setFiltersOpen, visibleCount, totalCount, onFileUpload }) {
  const fileRef = useRef(null);

  return (
    <header style={{
      borderBottom: '1px solid rgba(176,134,72,0.35)',
      background: 'linear-gradient(180deg, #faf5e7 0%, #f5efe1 100%)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className="marginalia">Comparative Cosmology</div>
            <h1 className="font-semibold" style={{ fontSize: '22px', lineHeight: 1.1, color: '#1d2030', letterSpacing: '-0.01em' }}>
              Parallels of the Gods
            </h1>
            <div className="marginalia mt-0.5" style={{ color: '#8a7340' }}>
              {visibleCount} of {totalCount} facets shown
            </div>
          </div>
          <button
            onClick={onAboutClick}
            className="smallcaps"
            style={{
              fontSize: '10px',
              padding: '6px 10px',
              border: '1px solid #b08648',
              borderRadius: '2px',
              color: '#6b5223',
              background: 'transparent',
            }}
          >
            About
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 relative">
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8a7340' }} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search names, functions, claims…"
              style={{
                width: '100%',
                padding: '8px 30px 8px 32px',
                fontSize: '14px',
                fontFamily: 'inherit',
                background: '#fbf7ea',
                border: '1px solid rgba(176,134,72,0.4)',
                borderRadius: '2px',
                color: '#1d2030',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#8a7340', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(o => !o)}
            title="Filter traditions"
            style={{
              padding: '8px',
              border: '1px solid rgba(176,134,72,0.4)',
              borderRadius: '2px',
              background: filtersOpen ? '#b08648' : 'transparent',
              color: filtersOpen ? '#faf5e7' : '#6b5223',
              cursor: 'pointer',
            }}
          >
            <Filter size={14} />
          </button>
          <button
            onClick={() => setScholarlyMode(s => !s)}
            title="Scholarly mode"
            style={{
              padding: '8px',
              border: '1px solid rgba(176,134,72,0.4)',
              borderRadius: '2px',
              background: scholarlyMode ? '#b08648' : 'transparent',
              color: scholarlyMode ? '#faf5e7' : '#6b5223',
              cursor: 'pointer',
            }}
          >
            <BookOpen size={14} />
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            title="Upload dataset"
            style={{
              padding: '8px',
              border: '1px solid rgba(176,134,72,0.4)',
              borderRadius: '2px',
              background: 'transparent',
              color: '#6b5223',
              cursor: 'pointer',
            }}
          >
            <Upload size={14} />
          </button>
          <input ref={fileRef} type="file" accept=".json,application/json" onChange={onFileUpload} style={{ display: 'none' }} />
        </div>
        {scholarlyMode && (
          <div className="mt-2 marginalia" style={{ color: '#6b5223' }}>
            ✶ Scholarly mode active — academic caveats shown on each parallel.
          </div>
        )}
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FilterBar — tradition chips
// ─────────────────────────────────────────────────────────────────────────────
function FilterBar({ traditions, activeTraditions, onToggle, onAll, onNone }) {
  return (
    <div style={{
      padding: '10px 16px',
      borderBottom: '1px solid rgba(176,134,72,0.25)',
      background: '#f5efe1',
    }}>
      <div className="flex items-center justify-between mb-2">
        <div className="marginalia">Traditions</div>
        <div className="flex gap-2">
          <button onClick={onAll} className="marginalia" style={{ color: '#6b5223', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' }}>
            All
          </button>
          <span style={{ color: '#b08648' }}>·</span>
          <button onClick={onNone} className="marginalia" style={{ color: '#6b5223', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' }}>
            None
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {traditions.map(t => {
          const c = colorFor(t.id);
          const active = activeTraditions.has(t.id);
          return (
            <button
              key={t.id}
              onClick={() => onToggle(t.id)}
              className="tradition-chip"
              style={{
                padding: '4px 9px',
                fontSize: '12px',
                fontFamily: 'inherit',
                borderRadius: '2px',
                border: `1px solid ${active ? c.bg : 'rgba(0,0,0,0.15)'}`,
                background: active ? c.bg : 'transparent',
                color: active ? '#faf5e7' : '#6b5e3c',
                opacity: active ? 1 : 0.6,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TierBand — one of the four horizontal tiers (plus cross-tier)
// ─────────────────────────────────────────────────────────────────────────────
function TierBand({ tier, meta, facets, deityById, traditionById, selectedFacetId, selectedRelated, isFacetVisible, searchActive, onSelect, isFirst, isLast }) {
  const isCrossTier = tier === 'cross-tier';

  return (
    <section className="tier-band" style={{
      padding: '20px 0 22px',
      background: isCrossTier
        ? 'linear-gradient(90deg, rgba(176,134,72,0.07) 0%, rgba(176,134,72,0.12) 50%, rgba(176,134,72,0.07) 100%)'
        : 'transparent',
    }}>
      <div className="px-4 mb-3 flex items-baseline gap-3">
        <div style={{
          fontFamily: 'EB Garamond, serif',
          fontSize: '28px',
          fontWeight: 600,
          color: '#b08648',
          fontStyle: 'italic',
          lineHeight: 1,
          minWidth: '32px',
        }}>
          {meta.label}
        </div>
        <div className="flex-1">
          <div className="smallcaps" style={{ fontSize: '13px', fontWeight: 600, color: '#1d2030' }}>
            {meta.name}
          </div>
          <div className="marginalia" style={{ marginTop: '1px' }}>
            {meta.subtitle}
          </div>
        </div>
        <div className="marginalia" style={{ color: '#a08960' }}>
          {facets.length} {facets.length === 1 ? 'figure' : 'figures'}
        </div>
      </div>

      <div className="px-4 flex flex-wrap gap-2">
        {facets.length === 0 && (
          <div className="marginalia italic" style={{ color: '#a08960', fontStyle: 'italic', padding: '4px 8px' }}>
            no figures in this tier
          </div>
        )}
        {facets.map(facet => {
          const deity = deityById[facet.parent_deity_id];
          if (!deity) return null;
          const tradition = traditionById[deity.tradition_id];
          const visible = isFacetVisible(facet);
          const isSelected = facet.id === selectedFacetId;
          const isRelated = selectedFacetId && selectedRelated.has(facet.id);
          const isDimmed = selectedFacetId && !isSelected && !isRelated;
          const c = colorFor(deity.tradition_id);

          let cls = 'deity-chip';
          if (isSelected) cls += ' selected';
          else if (isRelated) cls += ' related';
          else if (isDimmed) cls += ' dim';
          if (!visible) cls += ' search-miss';

          return (
            <button
              key={facet.id}
              className={cls}
              onClick={() => onSelect(facet.id)}
              style={{
                padding: '8px 12px 9px',
                background: '#faf5e7',
                border: `1.5px solid ${c.bg}`,
                borderRadius: '2px',
                fontFamily: 'inherit',
                textAlign: 'left',
                maxWidth: '230px',
                position: 'relative',
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: c.ink,
                lineHeight: 1.15,
                marginBottom: '2px',
              }}>
                {deity.primary_name}
              </div>
              <div className="marginalia" style={{
                color: c.bg,
                fontSize: '10px',
                fontWeight: 500,
              }}>
                {tradition?.name || deity.tradition_id} · {facet.facet_name}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DetailSheet — bottom sheet with the node's full data
// ─────────────────────────────────────────────────────────────────────────────
function DetailSheet({ facet, deity, tradition, facetById, deityById, traditionById, parallelsForFacet, parallelRecords, scholarlyMode, onClose, onClear, onSelectFacet }) {
  const [tab, setTab] = useState('essence');
  const c = colorFor(deity?.tradition_id);
  const relatedFacetIds = Array.from(parallelsForFacet[facet.id] || []);

  // Build per-parallel records (the explanation, scholarly caveat, etc.)
  const explicitParallels = useMemo(() => {
    const list = [];
    parallelRecords.forEach(p => {
      if (p.facet_a_id === facet.id || p.facet_b_id === facet.id) {
        const otherId = p.facet_a_id === facet.id ? p.facet_b_id : p.facet_a_id;
        list.push({ ...p, otherFacetId: otherId });
      }
    });
    return list;
  }, [facet, parallelRecords]);

  // Reset tab when switching nodes
  useEffect(() => { setTab('essence'); }, [facet.id]);

  return (
    <>
      <div className="sheet-backdrop fade-in" style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={onClose} />
      <div className="sheet fade-in" style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        maxHeight: '78vh',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
      }}>
        {/* Drag handle + close */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '8px 0 4px',
          flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            aria-label="Close"
          >
            <div style={{ width: 40, height: 4, background: 'rgba(176,134,72,0.5)', borderRadius: 2 }} />
          </button>
        </div>

        {/* Header */}
        <div style={{ padding: '0 18px 12px', flexShrink: 0, borderBottom: '1px solid rgba(176,134,72,0.25)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="marginalia" style={{
              padding: '2px 6px',
              background: c.bg,
              color: '#faf5e7',
              borderRadius: '2px',
            }}>
              {tradition?.name || deity.tradition_id}
            </span>
            <button onClick={onClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a7340' }} aria-label="Clear selection">
              <X size={16} />
            </button>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.1, color: '#1d2030', marginBottom: '3px' }}>
            {deity.primary_name}
          </h2>
          <div className="marginalia" style={{ color: c.bg, fontStyle: 'italic', fontVariant: 'small-caps' }}>
            {facet.facet_name} · Tier {String(facet.tier_assignment).toUpperCase()}
          </div>
          {deity.alternate_names && deity.alternate_names.length > 0 && (
            <div className="mt-1" style={{ fontSize: '12px', color: '#6b5e3c', fontStyle: 'italic' }}>
              also: {deity.alternate_names.slice(0, 4).join(' · ')}
              {deity.alternate_names.length > 4 && ' …'}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, padding: '0 18px', borderBottom: '1px solid rgba(176,134,72,0.2)', flexShrink: 0 }}>
          {[
            { id: 'essence', label: 'Essence', icon: <Sparkles size={12} /> },
            { id: 'parallels', label: `Parallels (${relatedFacetIds.length})`, icon: <ArrowUpRight size={12} /> },
            { id: 'sources', label: 'Sources', icon: <FileText size={12} /> },
            { id: 'tags', label: 'Tags', icon: <Layers size={12} /> },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="smallcaps"
              style={{
                padding: '8px 8px',
                background: 'none',
                border: 'none',
                borderBottom: tab === t.id ? '2px solid #b08648' : '2px solid transparent',
                color: tab === t.id ? '#1d2030' : '#8a7340',
                fontWeight: tab === t.id ? 600 : 400,
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginRight: 6,
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="scrollbar-thin" style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 22px' }}>
          {tab === 'essence' && (
            <EssenceTab facet={facet} deity={deity} />
          )}
          {tab === 'parallels' && (
            <ParallelsTab
              relatedFacetIds={relatedFacetIds}
              explicitParallels={explicitParallels}
              facetById={facetById}
              deityById={deityById}
              traditionById={traditionById}
              scholarlyMode={scholarlyMode}
              onSelectFacet={onSelectFacet}
              c={c}
            />
          )}
          {tab === 'sources' && (
            <SourcesTab facet={facet} deity={deity} />
          )}
          {tab === 'tags' && (
            <TagsTab facet={facet} />
          )}
        </div>
      </div>
    </>
  );
}

function EssenceTab({ facet, deity }) {
  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div className="marginalia mb-1">Summary</div>
        <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#1d2030' }}>
          {deity.summary || <em style={{ color: '#8a7340' }}>No summary available.</em>}
        </p>
      </div>

      {facet.core_claim && (
        <div style={{ marginBottom: 14, padding: '12px 14px', background: '#f5efe1', borderLeft: '3px solid #b08648' }}>
          <div className="marginalia mb-1">Core claim · {facet.facet_name}</div>
          <p style={{ fontSize: '15px', lineHeight: 1.5, fontStyle: 'italic', color: '#3a322a' }}>
            {facet.core_claim}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
        {deity.etymology && (
          <div style={{ flex: 1 }}>
            <div className="marginalia mb-1">Etymology</div>
            <div style={{ fontSize: '13px', color: '#3a322a' }}>{deity.etymology}</div>
          </div>
        )}
        {deity.earliest_attestation && (
          <div style={{ flex: 1 }}>
            <div className="marginalia mb-1">Earliest attestation</div>
            <div style={{ fontSize: '13px', color: '#3a322a' }}>{deity.earliest_attestation}</div>
          </div>
        )}
      </div>

      {facet.valence && (
        <div style={{ marginBottom: 12 }}>
          <div className="marginalia mb-1">Valence</div>
          <div style={{ fontSize: '13px', color: '#3a322a', textTransform: 'capitalize' }}>{facet.valence}</div>
        </div>
      )}
    </div>
  );
}

function ParallelsTab({ relatedFacetIds, explicitParallels, facetById, deityById, traditionById, scholarlyMode, onSelectFacet, c }) {
  if (relatedFacetIds.length === 0) {
    return (
      <div style={{ padding: '24px 0', textAlign: 'center', color: '#8a7340', fontStyle: 'italic' }}>
        No parallels recorded for this facet yet.
      </div>
    );
  }

  // Build a unified list: explicit parallels (with reasoning) + structural parallels (declared in facet)
  const explicitMap = Object.fromEntries(explicitParallels.map(p => [p.otherFacetId, p]));

  const items = relatedFacetIds
    .map(fid => {
      const f = facetById[fid];
      if (!f) return null;
      const d = deityById[f.parent_deity_id];
      if (!d) return null;
      const t = traditionById[d.tradition_id];
      const explicit = explicitMap[fid];
      return { facet: f, deity: d, tradition: t, explicit };
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Explicit first, then by tier, then alphabetical
      if (!!a.explicit !== !!b.explicit) return a.explicit ? -1 : 1;
      if (a.facet.tier_assignment !== b.facet.tier_assignment) {
        return String(a.facet.tier_assignment).localeCompare(String(b.facet.tier_assignment));
      }
      return a.deity.primary_name.localeCompare(b.deity.primary_name);
    });

  return (
    <div>
      <div className="marginalia mb-2" style={{ marginBottom: 10 }}>
        {items.length} structural parallel{items.length === 1 ? '' : 's'} across traditions
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(({ facet, deity, tradition, explicit }) => {
          const tc = colorFor(deity.tradition_id);
          return (
            <div key={facet.id} style={{
              border: '1px solid rgba(176,134,72,0.3)',
              borderRadius: 2,
              padding: '10px 12px',
              background: '#faf5e7',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <button
                  onClick={() => onSelectFacet(facet.id)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', flex: 1, fontFamily: 'inherit' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span className="marginalia" style={{
                      padding: '1px 5px',
                      background: tc.bg,
                      color: '#faf5e7',
                      borderRadius: '2px',
                      fontSize: '9px',
                    }}>
                      {tradition?.name || deity.tradition_id}
                    </span>
                    {explicit && (
                      <span className="marginalia" style={{
                        padding: '1px 5px',
                        background: '#b08648',
                        color: '#faf5e7',
                        borderRadius: '2px',
                        fontSize: '9px',
                      }}>
                        {explicit.strength}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: tc.ink, lineHeight: 1.2 }}>
                    {deity.primary_name}
                  </div>
                  <div className="marginalia" style={{ color: tc.bg, marginTop: 1 }}>
                    {facet.facet_name} · Tier {String(facet.tier_assignment).toUpperCase()}
                  </div>
                </button>
                <ArrowUpRight size={14} style={{ color: '#8a7340', flexShrink: 0, marginTop: 4 }} />
              </div>

              {explicit?.basis && explicit.basis.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dotted rgba(176,134,72,0.4)' }}>
                  <div className="marginalia mb-1">Why parallel</div>
                  <ul style={{ fontSize: '12.5px', color: '#3a322a', lineHeight: 1.45, paddingLeft: 16, margin: 0 }}>
                    {explicit.basis.map((b, i) => (
                      <li key={i} style={{ marginBottom: 3 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {scholarlyMode && explicit?.scholarly_caveat && (
                <div style={{ marginTop: 8, padding: '8px 10px', background: '#ede4cf', borderLeft: '2px solid #6b5223' }}>
                  <div className="marginalia mb-1" style={{ color: '#6b5223' }}>Scholarly note</div>
                  <div style={{ fontSize: '12px', color: '#3a322a', lineHeight: 1.45, fontStyle: 'italic' }}>
                    {explicit.scholarly_caveat}
                  </div>
                </div>
              )}

              {scholarlyMode && explicit?.primary_text_evidence && (
                <div style={{ marginTop: 6 }}>
                  <div className="marginalia mb-1">Primary text evidence</div>
                  <div style={{ fontSize: '11.5px', color: '#6b5e3c', fontStyle: 'italic' }}>
                    {explicit.primary_text_evidence.join(' · ')}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SourcesTab({ facet, deity }) {
  const sources = deity.primary_sources || [];
  return (
    <div>
      <div className="marginalia mb-2">Primary sources</div>
      {sources.length === 0 ? (
        <div style={{ color: '#8a7340', fontStyle: 'italic' }}>No primary sources listed.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sources.map((s, i) => (
            <li key={i} style={{
              padding: '8px 0',
              borderBottom: i < sources.length - 1 ? '1px dotted rgba(176,134,72,0.3)' : 'none',
              fontSize: '14px',
              color: '#1d2030',
              fontStyle: 'italic',
            }}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TagsTab({ facet }) {
  const tags = facet.function_tags || [];
  return (
    <div>
      <div className="marginalia mb-2">Function tags</div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} style={{
            padding: '3px 8px',
            fontSize: '12px',
            background: 'rgba(176,134,72,0.12)',
            border: '1px solid rgba(176,134,72,0.3)',
            borderRadius: '2px',
            color: '#3a322a',
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          }}>
            {tag}
          </span>
        ))}
      </div>
      {facet.tier_assignment && (
        <div style={{ marginTop: 14 }}>
          <div className="marginalia mb-1">Tier assignment</div>
          <div style={{ fontSize: '14px', color: '#1d2030' }}>
            Tier {facet.tier_assignment} — {TIER_META[facet.tier_assignment]?.name}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AboutModal — explanation of the framework
// ─────────────────────────────────────────────────────────────────────────────
function AboutModal({ meta, onClose }) {
  return (
    <>
      <div className="sheet-backdrop fade-in" style={{ position: 'fixed', inset: 0, zIndex: 60 }} onClick={onClose} />
      <div className="fade-in" style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(560px, calc(100vw - 32px))',
        maxHeight: 'calc(100vh - 48px)',
        zIndex: 70,
        background: '#faf5e7',
        borderRadius: '4px',
        boxShadow: '0 12px 40px rgba(29,32,48,0.3)',
        border: '1px solid #b08648',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(176,134,72,0.3)' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="marginalia">The framework</div>
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#1d2030', lineHeight: 1.1 }}>
                Parallels of the Gods
              </h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a7340' }}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="scrollbar-thin" style={{ overflowY: 'auto', padding: '16px 20px 20px' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: 14, color: '#1d2030' }}>
            Every culture has named the divine differently — but the structures repeat. The unknowable Source. The Most High and the divine council. The craftsman-god who shaped this world. The rulers who govern it. The light-bringers who descend to wake us up.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: 14, color: '#1d2030' }}>
            This atlas lays every documented deity onto a four-tier framework derived from Gnostic cosmology and verified against Hermetic, Kabbalistic, Vedantic, Platonic, Egyptian, Norse, and Mesopotamian sources.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: 18, color: '#1d2030', fontStyle: 'italic' }}>
            The names change. The structure does not.
          </p>

          <div className="codex-rule" style={{ margin: '14px 0' }} />

          <div className="marginalia mb-2">The five layers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TIER_ORDER.map(t => {
              const m = TIER_META[t];
              return (
                <div key={t} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ minWidth: 28, fontSize: '20px', fontStyle: 'italic', color: '#b08648', fontWeight: 600, lineHeight: 1 }}>
                    {m.label}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="smallcaps" style={{ fontSize: '12px', fontWeight: 600, color: '#1d2030' }}>
                      {m.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#3a322a', marginTop: 1, lineHeight: 1.4 }}>
                      {m.subtitle} — {(meta.tier_definitions && meta.tier_definitions[t]) || ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="codex-rule" style={{ margin: '18px 0' }} />

          <div className="marginalia mb-2">How to read this map</div>
          <ol style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#1d2030', paddingLeft: 18, margin: 0 }}>
            <li style={{ marginBottom: 6 }}>Tap any figure to open its detail panel.</li>
            <li style={{ marginBottom: 6 }}>Selected figures glow gold. Their parallels across traditions glow softer — others dim.</li>
            <li style={{ marginBottom: 6 }}>Switch to the <em>Parallels</em> tab to see why each match holds.</li>
            <li style={{ marginBottom: 6 }}>Toggle <em>Scholarly mode</em> ✶ to surface academic caveats on each parallel.</li>
            <li style={{ marginBottom: 6 }}>Filter traditions on or off with the funnel icon.</li>
            <li>Upload a larger JSON dataset with the ⬆ icon — the schema is documented in the spec package.</li>
          </ol>

          <div className="codex-rule" style={{ margin: '18px 0' }} />

          <div className="marginalia">Data</div>
          <div style={{ fontSize: '12px', color: '#6b5e3c', marginTop: 4 }}>
            Schema v{meta.schema_version || '—'} · Dataset v{meta.version || '—'}
          </div>
          {meta.description && (
            <p style={{ fontSize: '12px', color: '#6b5e3c', marginTop: 4, fontStyle: 'italic', lineHeight: 1.4 }}>
              {meta.description}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer({ meta, totalDeities, totalFacets, totalParallels }) {
  return (
    <footer style={{
      borderTop: '1px solid rgba(176,134,72,0.3)',
      marginTop: 16,
      padding: '14px 18px 22px',
      background: 'transparent',
    }}>
      <div className="codex-rule mb-3" />
      <div className="marginalia" style={{ textAlign: 'center', color: '#8a7340' }}>
        {totalDeities} figures · {totalFacets} facets · {totalParallels} canonical parallels
      </div>
      <div className="marginalia" style={{ textAlign: 'center', color: '#8a7340', marginTop: 6, fontSize: '10px' }}>
        Schema v{meta.schema_version || '—'} · Data v{meta.version || '—'}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: '11px', color: '#a08960', fontStyle: 'italic' }}>
        The names change. The structure does not.
      </div>
    </footer>
  );
}
