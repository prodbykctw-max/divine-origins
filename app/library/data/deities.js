/* =============================================================
   data/deities.js — Complete Deity / Divine Being Registry
   ============================================================= */

export const DEITIES = [

  // ═══════════════════════════════════════════════════════════
  // MESOPOTAMIAN
  // ═══════════════════════════════════════════════════════════
  {
    id:'an', name:'AN / ANU', aliases:'Father of Gods, Lord of Heaven, King of the Anunnaki',
    tradition:'mesopotamian', region:'Mesopotamia (modern Iraq)', date:'c. 3500 BCE (earliest texts)',
    tier:'Supreme Father', confidence:'documented', color:'#c8a060', imgKey:'sumerian',
    tags:['SUPREME','SKY','FATHER','DISTANT','DIVINE COUNCIL'],
    shortDesc:'Highest god of the Sumerian pantheon. God of the heavens, sky, and stars. Father of all divine beings. Largely passive and distant — authority supreme but rarely exercised directly. His number is 60, highest in the Sumerian sexagesimal system.',
    scholarly:'An appears in the earliest Sumerian cuneiform texts from Uruk, c.3500 BCE. His name simply means "sky." He heads the Anunnaki and Igigi. His temple was the Eanna in Uruk. An\'s role becomes progressively diminished as Enlil and Marduk rise — a documented religious evolution tracking with political shifts.',
    traditionClaim:'An is the source of all divine authority. He created the ME — the divine laws governing all existence. Every god who rules does so by An\'s ultimate cosmic decree. His distance from humanity is intentional: he is too holy, too vast, too complete to be reached by ordinary means. His number is 60 — the completion of all things.',
    uncertainty:'Whether An was ever actively worshiped as a primary deity or was always a symbolic supreme figure is debated. Some scholars argue he was more active in the earliest period before political shifts diminished him.',
    parallels:'El Elyon (Hebrew), Zeus/Jupiter (Greek/Roman), Odin All-Father (Norse), Dyaus Pita (Vedic), Brahman (Hindu abstract), El (Canaanite)',
    primarySources:['Sumerian King List (c.2100 BCE)', 'Enuma Elish Tablet I (c.1700 BCE)', 'Hymn to An (ETCSL corpus)'],
    russelConnection:'An as the supreme, still, distant sky god parallels Russell\'s zero-point — the absolute stillness from which all wave-expression radiates, but which itself remains unmoved.',
  },
  {
    id:'enki', name:'ENKI / EA', aliases:'Lord of the Abzu, God of Wisdom, Friend of Humanity',
    tradition:'mesopotamian', region:'Mesopotamia (Eridu)', date:'c. 2600 BCE (earliest hymns)',
    tier:'Creator / Craftsman', confidence:'documented', color:'#c8a060', imgKey:'sumerian',
    tags:['CREATOR','WISDOM','WATER','MAGIC','TRICKSTER','HUMANITY\'S FRIEND'],
    shortDesc:'God of wisdom, fresh water, magic, and creation. Created humanity from clay mixed with divine blood. Repeatedly helped humanity against divine decrees — including warning Utnapishtim of the Flood. The Prometheus of Mesopotamia.',
    scholarly:'Enki / Ea is documented from Eridu, considered the oldest city in Sumer. The Atrahasis Epic (c.1700 BCE) documents Enki warning the flood hero. His symbol was the goat-fish (Capricorn). The ETCSL corpus preserves his extensive mythology. He consistently subverts divine consensus in favor of humans.',
    traditionClaim:'Enki is the master of all hidden knowledge — the ME, magic, language, art, and the secrets of creation. The Abzu, his underground freshwater domain, is the source of all wisdom in the cosmos. He created humanity not as slaves but as partners. Every time the other gods threatened to destroy humanity, it was Enki alone who intervened, passing forbidden knowledge to chosen humans. He is the original keeper of esoteric wisdom, patron of every scribe, healer, and magician.',
    uncertainty:'The relationship between Enki and the Canaanite El, and whether they share a common Proto-Semitic origin, is debated among comparative mythologists.',
    parallels:'Prometheus (Greek — both gave forbidden knowledge), Thoth/Hermes (wisdom keepers), Odin (sacrificed for wisdom), the Serpent in Eden (offered knowledge), Azazel in Book of Enoch',
    primarySources:['Atrahasis Epic (c.1700 BCE)', 'Eridu Genesis (c.2300 BCE)', 'Enki and Ninmah (ETCSL 1.1.2)', 'Enki and the World Order (ETCSL 1.1.3)'],
    russelConnection:'Enki\'s Abzu (underground freshwater source) maps to Russell\'s zero-point field — the invisible, still ground of potential from which all creative motion emerges.',
  },
  {
    id:'inanna', name:'INANNA / ISHTAR', aliases:'Queen of Heaven and Earth, Lady of the Evening Star',
    tradition:'mesopotamian', region:'Mesopotamia (Uruk)', date:'c. 3200 BCE (Uruk period)',
    tier:'Death / Resurrection', confidence:'documented', color:'#c8a060', imgKey:'sumerian',
    tags:['LOVE','WAR','DESCENT','RESURRECTION','VENUS','QUEEN'],
    shortDesc:'Queen of Heaven and Earth. Goddess of love, war, and justice. Descended through seven gates into the underworld, surrendering power at each gate, was killed, then resurrected. Her descent and return is the oldest documented death-resurrection narrative.',
    scholarly:'Inanna is documented from Uruk period pictographic tablets (c.3200 BCE). Her descent is one of the best-preserved Sumerian literary texts (ETCSL 1.4.1). She is associated with Venus (both morning and evening star). The oldest known human author — Enheduanna (c.2285 BCE) — wrote hymns to Inanna.',
    traditionClaim:'Inanna\'s descent was not a tragedy but a cosmic act of supreme power — she chose to confront death itself. At each of the seven gates she surrendered her divine attributes: crown, earrings, necklace, breastplate, golden ring, lapis measuring rod, and royal robe. True power requires releasing all symbols of power. She was killed by her sister Ereshkigal\'s gaze and hung on a hook for three days before being resurrected by Enki\'s intervention.',
    uncertainty:'Whether the seven gates represent actual initiatory stages practiced in Inanna\'s temples, or are purely literary, is debated.',
    parallels:'Isis (Egyptian), Persephone (Greek), Sophia (Gnostic), Christ (3 days), Osiris (death and return), Balder (Norse)',
    primarySources:['Inanna\'s Descent to the Netherworld (ETCSL 1.4.1)', 'Hymns to Inanna by Enheduanna (ETCSL 4.07)', 'Ishtar\'s Descent (Akkadian, c.1300 BCE)'],
    russelConnection:'Inanna\'s passage through seven gates, surrendering divine attributes at each level, maps to Russell\'s seven-tone octave — descent through increasing density until reaching the zero point of death.',
  },
  {
    id:'tammuz', name:'TAMMUZ / DUMUZI', aliases:'The Shepherd, Beloved of Inanna',
    tradition:'mesopotamian', region:'Mesopotamia', date:'c. 2600 BCE (earliest texts)',
    tier:'Death / Resurrection', confidence:'documented', color:'#c8a060', imgKey:'sumerian',
    tags:['DYING GOD','RESURRECTION','SHEPHERD','SEASONS','VEGETATION'],
    shortDesc:'The shepherd-god. Consort of Inanna. Died and descended to the underworld annually, causing winter. Resurrected in spring. The earliest documented dying and rising god in the written record.',
    scholarly:'Tammuz (Dumuzi in Sumerian) appears in texts from at least 2600 BCE. Ezekiel 8:14 (c.593 BCE) describes Jewish women weeping for Tammuz at the Jerusalem Temple gate — demonstrating his worship penetrated Hebrew religious practice. The Sumerian month Dumuzi (June-July) was named after him.',
    traditionClaim:'Tammuz is the embodiment of all life that dies and is reborn. Every seed buried in earth is Tammuz descending. Every spring is his resurrection. He descended not in weakness but voluntarily — an act of cosmic sacrifice that made all fertility possible. His sister Geshtinanna volunteered to share his fate, spending half the year in the underworld so he could return for the other half. This is the cosmic law underlying all seasonal change.',
    uncertainty:'The connection between Tammuz and later dying-god figures (Adonis, Osiris) involves real parallels but direct cultural transmission versus independent development is debated.',
    parallels:'Osiris (Egyptian), Adonis (Phoenician-Greek), Dionysus (Greek), Balder (Norse), Jesus Christ (Christian)',
    primarySources:["Dumuzi's Dream (ETCSL 1.4.3)", 'The Death of Dumuzi (ETCSL 1.4.2)', 'Ezekiel 8:14 (Hebrew Bible)', 'Thorkild Jacobsen, The Treasures of Darkness (1976)'],
    russelConnection:'Tammuz\'s annual death and return is Russell\'s cosmic pendulum — the inhalation (descent, winter, death) and exhalation (ascent, spring, resurrection). The rhythm is perfect and eternal.',
  },
  {
    id:'marduk', name:'MARDUK', aliases:'Bel, Lord of Lords, Son of Enki',
    tradition:'mesopotamian', region:'Mesopotamia (Babylon)', date:'c. 2000 BCE (Old Babylonian texts)',
    tier:'Supreme Father', confidence:'documented', color:'#c8a060', imgKey:'babylonian',
    tags:['SUPREME','DRAGON-SLAYER','CREATOR','CITY GOD','DIVINE COUNCIL'],
    shortDesc:'Supreme god of Babylon. Defeated the chaos dragon Tiamat and created the world from her body. Established divine order and humanity\'s purpose. His rise from local god to supreme deity tracks directly with Babylon\'s political rise.',
    scholarly:'Marduk\'s supremacy is documented in the Enuma Elish (c.1700 BCE). He was originally a local deity of Babylon who rose to national prominence c.1800 BCE when Babylon became dominant — a documented case of a city god\'s elevation tracking with political power. The Enuma Elish was recited annually at the Akitu (New Year) festival. His 50 names are enumerated in Tablet VI.',
    traditionClaim:'Before Marduk, there was only chaos — the mingling of Apsu (fresh water) and Tiamat (salt water/chaos). Tiamat rose to destroy the young gods. Every god trembled. Only Marduk accepted the challenge — on one condition: that the divine council grant him supreme authority. He faced Tiamat alone, split her in two with his winds, fashioned from her body the heavens and earth. From her eyes he made the Tigris and Euphrates. Humanity was created from the blood of Kingu, Tiamat\'s general, so that the gods could rest.',
    uncertainty:'The relationship between the Enuma Elish and older Sumerian creation accounts is debated — whether Marduk "replaced" earlier deities in a deliberate religious-political rewriting is an open scholarly question.',
    parallels:'Yahweh defeating Leviathan/Tehom (Hebrew), Zeus defeating Typhon (Greek), Thor defeating Jormungandr (Norse), Indra defeating Vritra (Hindu)',
    primarySources:['Enuma Elish Tablets I-VII (c.1700 BCE)', 'Marduk Prophetic Speech', 'Benjamin Foster, Before the Muses (2005)'],
    russelConnection:'Marduk splitting Tiamat (chaos/formless water) into heaven and earth maps to Russell\'s description of the ONE creating apparent duality — gravitation and radiation — from primordial stillness.',
  },

  // ═══════════════════════════════════════════════════════════
  // EGYPTIAN
  // ═══════════════════════════════════════════════════════════
  {
    id:'ra', name:'RA / AMUN-RA / ATUM', aliases:'Lord of the Horizon, Father of All Gods, The Self-Created',
    tradition:'egyptian', region:'Egypt (Heliopolis)', date:'c. 2400 BCE (Pyramid Texts)',
    tier:'Supreme Father', confidence:'documented', color:'#c9a84c', imgKey:'osiris',
    tags:['SOLAR','SELF-CREATED','SUPREME','CYCLE','KING OF GODS'],
    shortDesc:'Supreme solar deity of Egypt. Self-created from the primordial waters of Nun. Every pharaoh was "Son of Ra." His daily journey through sky and underworld encoded the eternal cycle of death and rebirth.',
    scholarly:'Ra is documented from the Pyramid Texts (c.2400 BCE), among the oldest religious texts in the world. His cult center was at Heliopolis. By the New Kingdom (c.1550-1070 BCE), Ra merged with Amun to form Amun-Ra, the supreme imperial deity. Akhenaten\'s brief monotheism worshiping the Aten alone is documented history.',
    traditionClaim:'Ra did not emerge from something else — he willed himself into existence from the primordial waters. He was the first thought thinking itself into being. From his tears he made humanity. Each night he dies — descends into Nut\'s body, travels through the Duat. At midnight, he merges with Osiris — the two halves of divinity becoming one for a single eternal moment. Then he is reborn. Every pharaoh was his son on earth, and when pharaohs died, they became Osiris.',
    uncertainty:'The exact relationship between the many Egyptian creator deities (Ra, Atum, Ptah, Khnum, Amun) and whether they represent distinct gods or aspects of a single divine reality was itself debated among ancient Egyptians.',
    parallels:'An/Anu (Sumerian), Zeus/Apollo (Greek), El Elyon (Hebrew), Ahura Mazda (Zoroastrian), Surya (Hindu)',
    primarySources:['Pyramid Texts, Unas Pyramid (c.2400 BCE)', 'Amduat ("What is in the Underworld")', 'Book of Gates (New Kingdom)'],
    russelConnection:'Ra\'s daily cycle — radiation outward (day, light, expansion) and return inward (night, death, contraction) — is Russell\'s cosmic pendulum expressed as theology.',
  },
  {
    id:'osiris', name:'OSIRIS', aliases:'Wennefer, Lord of the Dead, The Resurrected King',
    tradition:'egyptian', region:'Egypt (Abydos)', date:'c. 2400 BCE (Pyramid Texts)',
    tier:'Death / Resurrection', confidence:'documented', color:'#c9a84c', imgKey:'osiris',
    tags:['DEATH','RESURRECTION','JUDGMENT','FERTILITY','UNDERWORLD'],
    shortDesc:'The original dying and rising god of Egyptian tradition. Murdered and dismembered by his brother Set. Resurrected by Isis. Lord of the dead and guarantor of eternal life. His weighing of the heart ceremony was the moral foundation of Egyptian civilization.',
    scholarly:'Osiris is one of the most extensively documented deities in ancient religion. Pyramid Texts (c.2400 BCE), Coffin Texts (c.2100 BCE), Book of the Dead (c.1550 BCE), and Plutarch\'s De Iside et Osiride (c.100 CE) all preserve his myth. His death and resurrection preceded Christian theology by at least 2,400 years in written form. Abydos was his primary cult center.',
    traditionClaim:'Osiris was once a living king who civilized Egypt — who taught agriculture, law, and worship. Set tricked him into a beautifully crafted sarcophagus, sealed it, and cast it into the Nile. Isis searched every corner of Egypt, reassembled the body, fashioned a golden phallus to replace the piece eaten by fish, and breathed life into him long enough to conceive Horus. Osiris descended to become eternal king of the underworld — judge of every soul. Those whose heart is lighter than Ma\'at\'s feather receive eternal paradise. Those heavy with wrongdoing are devoured by Ammit and cease to exist.',
    uncertainty:'The precise historical origin of the Osiris myth — whether it predates the Pyramid Texts, whether it originated in one region or evolved across multiple centers — is uncertain.',
    parallels:'Tammuz (Sumerian — earliest parallel), Dionysus (Greek), Balder (Norse), Jesus Christ (Christian)',
    primarySources:['Pyramid Texts, Unas Pyramid (c.2400 BCE)', 'Papyrus of Ani, Book of the Dead (c.1250 BCE)', 'Plutarch, De Iside et Osiride (c.100 CE)'],
    russelConnection:'Osiris\'s 14-piece dismemberment and reassembly maps to Russell\'s 14-note two-octave system. The death of integration and resurrection of reintegration is the cosmic wave pattern at the scale of divine narrative.',
  },
  {
    id:'thoth', name:'THOTH / HERMES TRISMEGISTUS', aliases:'Lord of Divine Words, Twice-Great, Thrice-Greatest',
    tradition:'egyptian', region:'Egypt (Hermopolis) → Mediterranean world', date:'c. 2400 BCE (Egyptian); c. 100-300 CE (Hermetic texts)',
    tier:'Wisdom / Knowledge', confidence:'documented', color:'#c9a84c', imgKey:'egyptian',
    tags:['WISDOM','WRITING','MAGIC','MOON','HERMETIC','AS ABOVE SO BELOW'],
    shortDesc:'God of writing, wisdom, magic, the moon, and the dead. Inventor of language and hieroglyphs. Later merged with Greek Hermes to become Hermes Trismegistus — legendary source of the Hermetic tradition.',
    scholarly:'Thoth is documented from the earliest Egyptian texts. His center was Hermopolis. In the Hellenistic period, Egyptian Thoth merged with Greek Hermes to produce Hermes Trismegistus. IMPORTANT: The Hermetic texts were written c.100-300 CE, NOT ancient Egypt — established by Isaac Casaubon in 1614. The Emerald Tablet appears in Arabic sources c.6th-8th century CE.',
    traditionClaim:'Before language, before thought itself, there was Thoth — for Thoth IS divine thought made self-aware. He did not invent writing; he discovered the principles underlying reality and encoded them in symbol. The Emerald Tablet contains the entire wisdom of the universe in a few lines: "As above, so below; as within, so without; as the universe, so the soul." This is not metaphor. It is the operating principle of existence. The 42 sacred books of Thoth encode the complete map of reality, physical and spiritual.',
    uncertainty:'Hermes Trismegistus as a historical figure is a post-Hellenistic construction. The Hermetic texts are not ancient Egyptian documents. However, they preserve real Egyptian priestly traditions mixed with Greek philosophy.',
    parallels:'Enki/Ea (Sumerian wisdom), Nabu (Babylonian), Odin (Norse — received wisdom through sacrifice), Ganesha (Hindu — patron of writing)',
    primarySources:['Pyramid Texts (earliest Thoth references)', 'Corpus Hermeticum (c.100-300 CE)', 'Emerald Tablet (earliest Arabic version c.6th-8th century CE)', 'Isaac Casaubon, De Rebus Sacris (1614) — dates the Hermetic texts'],
    russelConnection:'"As above, so below" is Russell\'s correspondence principle: every macro pattern repeats at micro scale because the same wave motion governs all scales of reality.',
  },

  // ═══════════════════════════════════════════════════════════
  // CANAANITE
  // ═══════════════════════════════════════════════════════════
  {
    id:'el_canaanite', name:'EL', aliases:'Father of All, Bull El, Creator of Creatures, Ancient of Days',
    tradition:'canaanite', region:'Levant (modern Syria, Lebanon, Israel/Palestine)', date:'c. 1400 BCE (Ugaritic texts); earlier oral tradition',
    tier:'Supreme Father', confidence:'documented', color:'#a06828', imgKey:'canaanite',
    tags:['SUPREME','FATHER','CREATOR','DIVINE COUNCIL','BULL','ANCIENT'],
    shortDesc:'Supreme deity of the Canaanite pantheon. Father of all gods and humans. Presides over the divine assembly. The direct ancestor of the Hebrew El / Elohim. Inscriptions prove his consort Asherah was once associated with Yahweh.',
    scholarly:'El is extensively documented in the Ugaritic texts (discovered at Ras Shamra, Syria, 1929 onward, c.1400-1200 BCE). He presides over the divine assembly (puhru). His consort is Asherah. The name El is the same root used for Elohim in Hebrew — scholarly consensus holds the Hebrew God absorbed the identity and titles of Canaanite El. Kuntillet Ajrud inscriptions (c.800 BCE) read "Yahweh and his Asherah."',
    traditionClaim:'El sits at the source of two rivers, at the confluence of the two deeps, in his tent on a mountain. He is ancient beyond reckoning — his beard is white, his wisdom complete, his judgment perfect. He does not rule through force but through the weight of his ancient authority. Every god must come before El\'s council and receive permission for their actions. El created all beings through his creative word and his union with Asherah. His name is the root of every divine name in the Semitic world: Allah, Elohim, El Shaddai, El Elyon — all are El.',
    uncertainty:'The precise relationship between Canaanite El and the Hebrew El Elyon / Yahweh is actively debated. The dominant academic view holds that Yahweh was originally a separate deity who gradually absorbed El\'s identity and titles. Some scholars see earlier unity. This is genuine academic debate.',
    parallels:'An/Anu (Sumerian), El Elyon (Hebrew — possibly the same figure), Yahweh (Hebrew — absorbed El\'s titles), Brahma/Brahman (Hindu), Odin (Norse)',
    primarySources:['Ugaritic texts (KTU 1.1-6, Baal Cycle)', 'Frank Moore Cross, Canaanite Myth and Hebrew Epic (1973)', 'Mark Smith, The Early History of God (2002)', 'John Day, Yahweh and the Gods and Goddesses of Canaan (2000)'],
    russelConnection:'El at the source of two rivers, at the meeting of two deeps — this is Russell\'s zero-point, the still center at the intersection of all polarities.',
  },

  // ═══════════════════════════════════════════════════════════
  // HEBREW / KABBALISTIC
  // ═══════════════════════════════════════════════════════════
  {
    id:'el_elyon', name:'EL ELYON', aliases:'The Most High, God Most High, Father of All Nations',
    tradition:'hebrew', region:'Levant / Ancient Israel', date:'c. 1200 BCE (earliest Hebrew texts); earlier Canaanite tradition',
    tier:'Supreme Father', confidence:'debated', color:'#c44040', imgKey:'hebrew',
    tags:['MOST HIGH','ABOVE YAHWEH?','DIVINE COUNCIL','ALL NATIONS','EL'],
    shortDesc:'The Most High God. In Deuteronomy 32:8-9 (Dead Sea Scrolls), El Elyon divides all nations among his divine sons — including assigning Israel to Yahweh. Possibly originally distinct from Yahweh.',
    scholarly:'El Elyon appears in Genesis 14 with Melchizedek as his priest-king in Jerusalem — suggesting a pre-Israelite Jerusalem cult. The Dead Sea Scrolls variant of Deuteronomy 32:8-9 reads "sons of God" (not "sons of Israel" as in the standard Masoretic Text) — a documented textual variant with profound implications. Psalm 82 describes El presiding over a divine council judging lesser gods. Scholars Frank Moore Cross and Mark Smith argue El Elyon and Yahweh were originally distinct deities. This is mainstream academic biblical scholarship.',
    traditionClaim:'El Elyon is the Father above all fathers — the God who divided the nations of humanity among his divine sons as a king distributes provinces. Each son received a people. But El Elyon reserved one people for himself personally: Israel. "The LORD\'s portion is his people; Jacob is the lot of his inheritance" (Deuteronomy 32:9). The divine council has now failed — the gods have judged unjustly (Psalm 82). El Elyon has declared judgment: they will die like men. He will reclaim all nations and rule directly. This is the eschatological promise: the end of the divine council system and the direct reign of the Most High.',
    uncertainty:'Whether El Elyon and Yahweh are the same deity (as mainstream Judaism and Christianity hold) or originally distinct (as comparative scholarship suggests) is genuinely debated. Both positions are defensible with scholarly support.',
    parallels:'Canaanite El (likely same figure), An/Anu (Sumerian distant supreme father), The Monad (Gnostic), Brahman (Hindu)',
    primarySources:['Genesis 14:18-20 (Hebrew Bible)', 'Deuteronomy 32:8-9 (Dead Sea Scrolls, 4QDeut-j)', 'Psalm 82 (Hebrew Bible)', 'Frank Moore Cross, Canaanite Myth and Hebrew Epic (1973)'],
    russelConnection:'El Elyon as the supreme still source above all motion, delegating governance of the dynamic world to intermediate beings, maps to Russell\'s ONE consciousness at the zero-point from which all wave patterns emanate.',
  },
  {
    id:'yahweh', name:'YAHWEH / YHWH', aliases:'El, Elohim, Adonai, El Shaddai, El Sabaoth, Lord',
    tradition:'hebrew', region:'Ancient Israel / Judah', date:'c. 1200 BCE (earliest inscriptions); texts from c. 1000-400 BCE',
    tier:'Creator / Supreme', confidence:'documented', color:'#c44040', imgKey:'hebrew',
    tags:['CREATOR','COVENANT','JEALOUS','LAW-GIVER','DIVINE COUNCIL','NATIONAL GOD'],
    shortDesc:'God of Israel. Creator of heaven and earth. Made covenant with Abraham. Gave law through Moses. Declares himself jealous. In Deuteronomy 32 (Dead Sea Scrolls), receives Israel as his portion from El Elyon.',
    scholarly:'Yahweh is one of the most extensively documented deities in history. Earliest extrabiblical evidence: the Mesha Stele (c.840 BCE) from Moab. The Ketef Hinnom amulets (c.600 BCE) contain the priestly blessing with Yahweh\'s name. Archaeological evidence suggests ancient Israelites were henotheistic before strict monotheism developed during and after the Babylonian exile (c.586-539 BCE). The Hebrew Bible itself contains internal evidence of this religious evolution.',
    traditionClaim:'Before anything existed, the Spirit of God moved over the face of the deep — and God spoke. "Let there be light" — and light was. He formed Adam from the dust and breathed life into his nostrils — that breath (neshamah) is the divine spark within every human. He established covenant with Abraham, Isaac, and Jacob not because they were perfect but because he chose them freely. He delivered an entire enslaved nation from the most powerful empire on earth through acts of power that shook the natural order. His jealousy is not pettiness but the fierce love of a parent who will not allow their children to be destroyed by false allegiances.',
    uncertainty:'Whether Yahweh was always conceived as the sole existing deity, or whether ancient Israelite religion was henotheistic / polytheistic before strict monotheism developed, is one of the most important and well-documented debates in biblical scholarship. Psalm 82, Deuteronomy 32 (DSS), and numerous other passages reflect a time when other divine beings were acknowledged.',
    parallels:'El (Canaanite — absorbed), Yaldabaoth (Gnostic identification — debated), El Elyon (possibly originally distinct), Ahura Mazda (Zoroastrian parallels), Marduk (Babylonian parallels in creation narrative)',
    primarySources:['Genesis 1-3 (Hebrew Bible)', 'Deuteronomy 32 (Hebrew Bible and Dead Sea Scrolls)', 'Psalm 82 (Hebrew Bible)', 'Mesha Stele (c.840 BCE, extant)', 'Mark Smith, The Origins of Biblical Monotheism (2001)'],
    russelConnection:'Yahweh speaking the world into existence ("Let there be light") and breathing life into Adam maps to Russell\'s description of consciousness (the ONE Mind) expressing itself first as light (electromagnetic wave) and then as organized material form.',
  },
  {
    id:'ain_soph', name:'AIN SOPH', aliases:'Ein Sof, Without Limit, The Infinite, Ayin (Nothingness)',
    tradition:'hebrew', region:'Medieval Spain, Southern France, later worldwide', date:'c. 12th-13th century CE (textual Kabbalah); earlier mystical roots',
    tier:'Supreme Source', confidence:'tradition', color:'#c44040', imgKey:'hebrew',
    tags:['INFINITE','BEYOND BEING','EMANATION','TREE OF LIFE','TEN SEFIROT'],
    shortDesc:'The infinite, unknowable divine reality in Kabbalah. Beyond all attributes, beyond existence itself. From Ain Soph, divine light (Ain Soph Aur) emanates through ten Sefirot (divine attributes) to create all reality.',
    scholarly:'Kabbalah is documented from the Sefer ha-Bahir (c.12th century CE) and Sefer ha-Zohar (c.1280-1286 CE). The Zohar is the central Kabbalistic text. Gershom Scholem\'s Major Trends in Jewish Mysticism (1941) is the definitive modern scholarly account. Lurianic Kabbalah (Rabbi Isaac Luria, 16th century CE, Safed) developed Tzimtzum (divine contraction) and Tikkun (repair/restoration).',
    traditionClaim:'Before creation, there was only Ain Soph — Without Limit. Not the God who speaks or commands — but the absolute ground of all being, so complete it had nothing to create for and no reason to create. Then Tzimtzum: the Infinite contracted into itself, made a space within itself, a void. Into that space it sent a ray of divine light. The light organized itself through ten Sefirot: Keter (Crown), Chokhmah (Wisdom), Binah (Understanding), Chesed, Gevurah, Tiferet, Netzach, Hod, Yesod, and Malkhut (Kingdom — the material world). The Tree of Life is not a diagram. It is the actual structure of reality from the divine source to the material world, each level transparent to the one above it.',
    uncertainty:'The antiquity of Kabbalistic tradition is contested. The Zohar\'s authorship (Moses de León vs. ancient tradition) is a documented scholarly debate. Whether Kabbalistic concepts represent genuine mystical insight or creative religious construction is a matter of perspective.',
    parallels:'The One (Neoplatonic), The Monad (Gnostic — very close structural parallel), Brahman (Hindu), The Tao (Taoist), Wakan Tanka (Lakota)',
    primarySources:['Sefer ha-Zohar (Moses de León, c.1280-1286 CE)', 'Sefer Yetzirah (dating uncertain)', 'Gershom Scholem, Major Trends in Jewish Mysticism (1941)', 'Daniel Matt, The Zohar: Pritzker Edition (2004-present)'],
    russelConnection:'Ain Soph\'s Tzimtzum (divine contraction creating space for creation) followed by the ray of light organizing through ten Sefirot maps precisely to Russell\'s zero-point (stillness) from which wave motion emanates, organizing matter through seven harmonic tones.',
  },

  // ═══════════════════════════════════════════════════════════
  // GNOSTIC
  // ═══════════════════════════════════════════════════════════
  {
    id:'monad', name:'THE MONAD', aliases:'The Invisible Spirit, The First Father, The True God, Bythos (The Deep)',
    tradition:'gnostic', region:'Egypt, Syria, Rome (1st-4th century CE)', date:'c. 1st-4th century CE (Gnostic texts)',
    tier:'Supreme Source', confidence:'tradition', color:'#8840c4', imgKey:'hebrew',
    tags:['SUPREME','BEYOND BEING','UNKNOWABLE','PERFECT','PARENT'],
    shortDesc:'The ultimate, unknowable, perfect source in Gnostic cosmology. Beyond all description. Neither male nor female alone. Created through emanation, not will. The True God above the Demiurge.',
    scholarly:'The Monad concept is documented in the Nag Hammadi Corpus (discovered 1945, Egypt), particularly the Apocryphon of John, Gospel of Truth, and Trimorphic Protennoia. These texts date to c.2nd-4th century CE. Gnosticism was a diverse family of religious movements with sophisticated theology. The Nag Hammadi texts are genuine historical documents.',
    traditionClaim:'The Monad is that which cannot be spoken of — and yet cannot remain silent. It is perfect, complete, lacking nothing. No word touches it: calling it "God" reduces it; calling it "One" counts it. It knows itself through its own reflection — and from that self-knowing, the first thought arose: Barbelo, the divine feminine, First Thought. From the Monad and Barbelo, emanation after emanation poured forth — each one a divine attribute becoming a living being. This is the Pleroma: the divine fullness where consciousness contemplates itself in infinite variations. The material universe does not exist because the Monad willed it. It exists because Sophia made an error in desire, and the error had consequences. The Monad is not responsible for the world\'s suffering.',
    uncertainty:'The Monad is a theological construct within Gnostic tradition, not a historically verifiable fact. It represents Gnosticism\'s answer to the problem of evil. Its existence cannot be verified or falsified.',
    parallels:'Ain Soph (Kabbalah), Brahman (Hindu Advaita), The Tao (Taoism), The One (Neoplatonism), El Elyon (Hebrew — possibly), Wakan Tanka (Lakota)',
    primarySources:['Apocryphon of John (Nag Hammadi II,1)', 'Gospel of Truth (Nag Hammadi I,3)', 'Trimorphic Protennoia (Nag Hammadi XIII,1)', 'Elaine Pagels, The Gnostic Gospels (1979)'],
    russelConnection:'The Monad as perfect, still, self-knowing consciousness from which all emanation flows is identical to Russell\'s ONE — the zero-point stillness that is the source of all wave motion, the conscious ground of all being.',
  },
  {
    id:'yaldabaoth', name:'YALDABAOTH', aliases:'Samael (Blind God), Saklas (Foolish One), The Demiurge',
    tradition:'gnostic', region:'Egypt, Syria (2nd-3rd century CE)', date:'c. 2nd century CE (Apocryphon of John)',
    tier:'Creator / Demiurge', confidence:'tradition', color:'#8840c4', imgKey:'hebrew',
    tags:['DEMIURGE','BLIND GOD','CREATOR','MATERIAL WORLD','FALSE CLAIM','LION-SERPENT'],
    shortDesc:'The blind creator god of Gnostic cosmology. Born from Sophia\'s error. Creates the material world and humanity\'s physical body. Declares himself the only God — not knowing the True God exists above him.',
    scholarly:'Yaldabaoth is documented in the Apocryphon of John (Nag Hammadi II,1; III,1; IV,1; also Berlin Codex). His name is likely Aramaic. He is depicted as lion-faced with a serpent body — related to the Gnostic deity Abraxas and Egyptian solar imagery. The Gnostic texts were suppressed by orthodox Christianity after the 4th century; their rediscovery in 1945 was one of the most significant religious discoveries of the modern era.',
    traditionClaim:'Sophia — the lowest and youngest Aeon — was seized by an impossible longing: to know the Father directly, without her divine consort. From this unbridled desire, she gave birth to something she had not intended: a being of fire and darkness, brilliant but blind, powerful but ignorant. She cast it out of the Pleroma into the darkness below, surrounded it with a luminous cloud so it could not see the light above it. This being — Yaldabaoth — looked around and believed himself alone. He said: "I am God, and there is no other God beside me." He then created Archons — twelve rulers of fate, seven rulers of the planetary spheres — and together they constructed the material world. They formed a human body from earth, modeled after the divine image they had briefly glimpsed. But the body could not move until Sophia tricked Yaldabaoth into breathing divine light into it. The moment he did, Sophia\'s light was trapped inside human bodies. That trapped light is you.',
    uncertainty:'The identification of Yaldabaoth with the Hebrew Yahweh is a Gnostic theological claim — not established historical fact. The Gnostic framework represents one response to the problem of evil within Second Temple Judaism; it is not the only response.',
    parallels:"Plato's Demiurge (Timaeus — same word, originally non-negative), Yahweh (Gnostic identification — debated), Brahma as limited creator (Hindu), The Rex Mundi (Cathar — Evil Creator)",
    primarySources:['Apocryphon of John (Nag Hammadi II,1)', 'Hypostasis of the Archons (Nag Hammadi II,4)', 'On the Origin of the World (Nag Hammadi II,5)', 'Hans Jonas, The Gnostic Religion (1958)'],
    russelConnection:'Yaldabaoth as a wave pattern that believes itself to be the Source — a localized expression of universal energy that has forgotten its origin — maps to Russell\'s warning that all consciousness that mistakes its created form for its ultimate nature is in error.',
  },

  // ═══════════════════════════════════════════════════════════
  // GREEK / NEOPLATONIC
  // ═══════════════════════════════════════════════════════════
  {
    id:'zeus', name:'ZEUS / JUPITER', aliases:'Father of Gods and Men, Olympian, Cloud-Gatherer, Thunderer',
    tradition:'greek', region:'Greece / Rome', date:'c. 800 BCE (Homer); earlier oral tradition',
    tier:'Supreme Father', confidence:'documented', color:'#40a8a0', imgKey:'greek',
    tags:['SUPREME','SKY','THUNDER','DIVINE COUNCIL','JUSTICE','LAW'],
    shortDesc:'King of the Olympian gods. Presides over the divine council on Olympus. God of sky, thunder, law, justice. Not the highest principle — even Zeus is subject to the Fates (Moirai).',
    scholarly:'Zeus is documented from the earliest Greek texts — Homer (c.800-700 BCE), Hesiod\'s Theogony (c.700 BCE). He is the Indo-European sky father deity (cognate with Sanskrit Dyaus Pita, Latin Diespiter/Jupiter). The divine council he presides over on Olympus parallels the Canaanite council of El, the Sumerian Anunnaki, and the Hebrew Bene Elohim. Zeus\'s subjection to the Fates is documented throughout Greek literature.',
    traditionClaim:'Zeus did not inherit his power — he won it through strategy, courage, and the support of those the previous order had oppressed. Cronus swallowed his children to prevent prophecy; Zeus\'s mother Rhea saved him, and Zeus liberated his siblings. He led the Olympians against the Titans in the Titanomachy — ten years of cosmic war that established the current divine order. Zeus rules not by being most powerful alone but by being most just — his authority rests on cosmic law (Themis) and order (Dike). When he errs, the error is always checked, always balanced. He is the great calibrator of cosmic justice.',
    uncertainty:'Zeus\'s relationship to the Mycenaean "Diwo" (documented in Linear B tablets from c.1400-1200 BCE) is established. Whether he was originally a sky god absorbed from earlier Mediterranean traditions, or developed independently, is debated.',
    parallels:'An/Anu (Sumerian), El Elyon (Hebrew), Odin (Norse), Indra (Hindu storm god), Yahweh (divine council presidency), Yaldabaoth (Gnostic identification — tradition claim)',
    primarySources:['Homer, Iliad and Odyssey (c.800-700 BCE)', 'Hesiod, Theogony (c.700 BCE)', 'Linear B tablets (Mycenaean Zeus, c.1400 BCE)', 'Walter Burkert, Greek Religion (1985)'],
    russelConnection:'Zeus as law-giver of the divine order maps to Russell\'s universal mathematical ratios — the fixed laws governing all wave motion that no entity, however powerful, can override.',
  },
  {
    id:'the_one', name:'THE ONE (TO HEN)', aliases:'The Good, The First Principle, The Ineffable',
    tradition:'greek', region:'Rome / Egypt (Plotinus)', date:'c. 250 CE (Plotinus, Enneads)',
    tier:'Supreme Source', confidence:'tradition', color:'#40a8a0', imgKey:'greek',
    tags:['SUPREME','INEFFABLE','BEYOND BEING','EMANATION','MYSTICAL UNION'],
    shortDesc:'The ultimate principle in Neoplatonic philosophy. Beyond being, beyond description, beyond even thought. All existence emanates from it like light from the sun — without diminishing it.',
    scholarly:'Plotinus (205-270 CE) developed the most systematic Neoplatonic philosophy in his Enneads, compiled by Porphyry. His hierarchy: The One → Nous → Soul → Matter. The One is beyond all predication — even saying it "is" is technically wrong, because existence is a category too small for it. His work bridges Plato and the three great Abrahamic mystical traditions.',
    traditionClaim:'The One does not think. Thinking requires a thinker and a thought — duality. The One is so perfectly unified there is no distinction within it, not even between knower and known. It overflows like a full vessel — not because it has too much, but because it is so perfectly complete that perfection itself radiates outward. From this overflow, Nous (divine Mind) emerges — the first movement of consciousness knowing itself. From Nous comes Soul. From Soul comes Matter. The mystic\'s path is return: from matter, through soul, through nous, through brief moments of union with the One — experiences so total that no memory remains because there is no knower and no known, only the One knowing itself through you.',
    uncertainty:'The One as described by Plotinus is a metaphysical construct arrived at by philosophical reasoning and reported mystical experience. Its existence cannot be verified empirically.',
    parallels:'The Monad (Gnostic), Brahman (Hindu Advaita), Ain Soph (Kabbalah), The Tao (Taoism), Wakan Tanka (Lakota)',
    primarySources:['Plotinus, Enneads (c.250 CE)', 'Porphyry, Life of Plotinus', 'Pseudo-Dionysius, Mystical Theology (c.500 CE)', 'Pierre Hadot, Plotinus: The Simplicity of Vision (1993)'],
    russelConnection:'Plotinus\'s One — so perfect that it overflows into creation without diminishing — is Russell\'s zero-point: the infinite still center from which all wave motion radiates while remaining itself absolutely still and undepleted.',
  },

  // ═══════════════════════════════════════════════════════════
  // ZOROASTRIAN
  // ═══════════════════════════════════════════════════════════
  {
    id:'ahura_mazda', name:'AHURA MAZDA', aliases:'Wise Lord, Ohrmazd, Lord of Light and Truth',
    tradition:'zoroastrian', region:'Persia (modern Iran)', date:'c. 1500-1000 BCE (Avestan texts; dating debated)',
    tier:'Supreme Father', confidence:'documented', color:'#d4a020', imgKey:'zoroastrian',
    tags:['SUPREME','LIGHT','TRUTH','UNCREATED','DUALISTIC','ALL-KNOWING'],
    shortDesc:'Supreme deity of Zoroastrianism. Uncreated, eternal, all-knowing, all-good. Source of all light and truth. In eternal conflict with Angra Mainyu (evil). Profoundly influenced Jewish monotheism during the Persian period (539-330 BCE).',
    scholarly:'Ahura Mazda is documented in the Avesta, particularly the Gathas (attributed to Zoroaster himself). Zoroastrianism\'s influence on Judaism during the Persian period is academically established. Concepts including heaven/hell dualism, resurrection, final judgment, cosmic struggle between good and evil, and messianism appear in Judaism during or after this period.',
    traditionClaim:'Ahura Mazda existed before time, before space, before anything. He IS the principle of creative light itself. His nature is wisdom (mazda), truth (asha), and radiant power (khvarenah). He created the spiritual and material worlds as a trap for Angra Mainyu. The material world is a battleground. Humans are soldiers in the battle — each righteous thought, word, and action strengthens the forces of light. At the end of time, Saoshyant (the World Savior) will come, the dead will be resurrected, the cosmic fire will purify all creation — even the wicked will be purified, not eternally damned — and Ahura Mazda will reign over a perfected world.',
    uncertainty:'The dating of the Gathas is debated — estimates range from 1700 BCE to 600 BCE. The precise mechanism of Zoroastrian influence on Judaism is documented in broad strokes but debated in specifics.',
    parallels:'El Elyon (Hebrew — closest parallel in monotheistic perfection), The Monad (Gnostic), Brahman (Hindu), Angra Mainyu\'s influence shaped the Christian Devil concept',
    primarySources:['Avesta, Gathas (attributed to Zoroaster)', 'Mary Boyce, A History of Zoroastrianism (1975)', 'Jenny Rose, Zoroastrianism: An Introduction (2011)'],
    russelConnection:'Ahura Mazda (light, truth, concentration/integration) vs. Angra Mainyu (darkness, lie, expansion/disintegration) maps to Russell\'s two opposing forces: gravitation (centripetal, integrating) and radiation (centrifugal, disintegrating).',
  },

  // ═══════════════════════════════════════════════════════════
  // HINDU
  // ═══════════════════════════════════════════════════════════
  {
    id:'brahman', name:'BRAHMAN', aliases:'Sat-Chit-Ananda, The Absolute, Paramatman, Nirguna Brahman',
    tradition:'hindu', region:'India', date:'c. 800-500 BCE (early Upanishads)',
    tier:'Supreme Source', confidence:'documented', color:'#c06040', imgKey:'hindu',
    tags:['SUPREME','IMPERSONAL','ABSOLUTE','CONSCIOUSNESS','ATMAN','NON-DUAL'],
    shortDesc:'The ultimate, impersonal, all-pervading reality in Hindu philosophy. Not a god but the ground of all being. "That from which all beings are born, by which they live, and into which they return." The Atman (individual soul) is identical with Brahman.',
    scholarly:'Brahman is the central concept of the Upanishads (c.800-200 BCE). The Chandogya Upanishad, Brihadaranyaka Upanishad, and others develop the concept systematically. "Tat tvam asi" (That thou art) from the Chandogya Upanishad (6.8.7) is one of the Mahavakyas asserting the identity of Atman and Brahman. Adi Shankaracharya (c.788-820 CE) developed Advaita Vedanta — the most complete philosophical articulation of non-dual Brahman.',
    traditionClaim:'Brahman is not God — God is a limited concept. Brahman is the limitless. It is Existence-Consciousness-Bliss (Sat-Chit-Ananda) — but even these words fail. It is what remains when everything finite has been removed. The great teaching of the Upanishads is not about believing something but recognizing something: the consciousness through which you are reading these words — that awareness itself, not its contents — IS Brahman. The individual soul (Atman) and the universal ground (Brahman) are not two things. They were never two things. Aham Brahmasmi: I am Brahman. The apparent separation is maya — the veil that makes the one appear as many.',
    uncertainty:'The nature of the relationship between individual consciousness and Brahman is the subject of ongoing debate within Hindu philosophy itself — Advaita (non-dual), Vishishtadvaita (qualified non-dual), and Dvaita (dual) represent genuinely different positions maintained by serious scholars across centuries.',
    parallels:'The One (Neoplatonic — closest Western parallel), The Monad (Gnostic), Ain Soph (Kabbalah), The Tao (Taoism), Wakan Tanka (Lakota)',
    primarySources:['Chandogya Upanishad (c.700 BCE)', 'Brihadaranyaka Upanishad (c.700 BCE)', 'Shankaracharya, Vivekachudamani (c.800 CE)', 'S. Radhakrishnan, The Principal Upanishads (1953)'],
    russelConnection:'Brahman as pure consciousness — the witness behind all experience, unchanging while all phenomena change — is Russell\'s description of the ONE Mind: the still center from which all wave motion radiates and to which it returns.',
  },

  // ═══════════════════════════════════════════════════════════
  // NORSE
  // ═══════════════════════════════════════════════════════════
  {
    id:'odin', name:'ODIN / ALL-FATHER', aliases:'Allföðr, Yggr, Wanderer, Grimnir, Bolverk',
    tradition:'norse_celtic', region:'Scandinavia / Germanic world', date:'c. 900-1100 CE (Eddas); earlier oral tradition',
    tier:'Supreme Father', confidence:'documented', color:'#6080c0', imgKey:'norse',
    tags:['ALL-FATHER','WISDOM','SACRIFICE','DEATH','MAGIC','RUNES','FATE'],
    shortDesc:'Supreme Norse deity. All-Father. God of wisdom, war, death, magic, poetry, and runes. Sacrificed his eye for wisdom. Hung himself on Yggdrasil for nine days to receive the runes. Knows he will die at Ragnarok — and prepares anyway.',
    scholarly:'Odin is documented primarily in the Prose Edda (Snorri Sturluson, c.1220 CE) and the Poetic Edda (c.1270 CE, older material). Tacitus (c.98 CE) identifies "Mercurius" as the chief god of the Germanic tribes — identified by scholars with Odin. Wednesday (Woden\'s Day) preserves his name in English.',
    traditionClaim:'Odin hungered for what no god had: knowledge of what was hidden, what was coming, what lay beneath. He gave his right eye to Mimir\'s well without hesitation — one eye for wisdom. Still not enough. He speared himself and hung on Yggdrasil for nine days and nine nights — wounded, fasting, alone — staring into the void below until the runes rose up to meet him. The runes are not an alphabet. They are cosmic forces — each rune a principle of reality, a living pattern in the structure of existence. He gathers the fallen warriors into Valhalla not from cruelty but because he needs them for Ragnarok — the final battle he knows is coming and cannot prevent. He will die. He knows it. And still he prepares, and still he learns. That is what makes him a model of what it means to face the inevitable with wisdom and will.',
    uncertainty:'The age of Odin worship and whether it predates the Viking Age is debated. The influence of Roman Mercury on Odin\'s characterization is discussed by scholars.',
    parallels:'El (Canaanite), Zeus (Greek — both preside over divine councils), Ahura Mazda (self-sacrifice parallels), Christ (hung, sacrificed, death and return), Thoth/Hermes (wisdom, magic)',
    primarySources:['Prose Edda (Snorri Sturluson, c.1220 CE)', 'Poetic Edda (c.1270 CE)', 'Tacitus, Germania (c.98 CE)', 'Hilda Ellis Davidson, Gods and Myths of Northern Europe (1964)'],
    russelConnection:'Odin hanging on Yggdrasil (the axis of the universe) and receiving universal knowledge maps to Russell\'s description of accessing the zero-point — the axis around which all motion rotates — where universal knowledge is available.',
  },

  // ═══════════════════════════════════════════════════════════
  // TAOIST
  // ═══════════════════════════════════════════════════════════
  {
    id:'tao', name:'THE TAO', aliases:'The Way, The Mother of All Things, The Nameless',
    tradition:'east_asian', region:'China', date:'c. 500-400 BCE (Laozi\'s Tao Te Ching)',
    tier:'Supreme Source', confidence:'documented', color:'#60a0c0', imgKey:'taoist',
    tags:['SUPREME','NAMELESS','PARADOX','FLOW','NON-DOING','WAY'],
    shortDesc:'The ultimate principle of Taoism. The source and pattern underlying all existence. Cannot be named, defined, or grasped — only lived. "The Tao that can be told is not the eternal Tao."',
    scholarly:'The Tao Te Ching (attributed to Laozi, c.500-400 BCE) is one of the most translated texts in human history. The Zhuangzi (c.300 BCE) elaborates Taoist philosophy. Philosophical Taoism (Daojia) and Religious Taoism (Daojiao) developed as distinct streams. The Tao concept influenced Chinese Buddhism, Confucianism, and Chan/Zen Buddhism.',
    traditionClaim:'The Tao cannot be spoken — only pointed at. It is the force that makes rivers run downhill, that makes seeds know which way to grow, that makes the heart beat without being commanded. It is the pattern beneath all patterns. Wu wei — non-doing — is not laziness but alignment: when you act in harmony with the Tao, action becomes effortless, natural, perfectly adapted. Water is the Tao\'s great teacher: soft, yielding, unremarkable — yet it carves through stone over time, finds every opening, nourishes everything without claiming credit. The Ten Thousand Things arise from the One; the One arises from the Tao; the Tao arises from nothing. And from nothing, everything.',
    uncertainty:'The Tao as described in the Tao Te Ching is deliberately paradoxical and resistant to systematic definition. This is not a scholarly uncertainty but a feature of the teaching itself.',
    parallels:'Brahman (Hindu Advaita — closest structural parallel), The One (Neoplatonic), The Monad (Gnostic), Wakan Tanka (Lakota), Ain Soph (Kabbalah)',
    primarySources:['Tao Te Ching (Laozi, c.500-400 BCE)', 'Zhuangzi (c.300 BCE)', 'D.C. Lau translation, Tao Te Ching (1963)'],
    russelConnection:'The Tao as the invisible pattern underlying all phenomena — wu wei as effortless action in alignment with universal law — maps to Russell\'s description of all natural motion as the inevitable expression of universal wave patterns.',
  },

  // ═══════════════════════════════════════════════════════════
  // AFRICAN / YORUBA / DOGON
  // ═══════════════════════════════════════════════════════════
  {
    id:'olodumare', name:'OLODUMARE / OLORUN', aliases:'Owner of Heaven, Source of All, Almighty, Lord of the Universe',
    tradition:'african', region:'West Africa (modern Nigeria, Benin)', date:'Oral tradition; documented 19th-20th century CE',
    tier:'Supreme Source', confidence:'documented', color:'#40a040', imgKey:'yoruba',
    tags:['SUPREME','DISTANT','CREATOR','AXE (DIVINE POWER)','ORISHA','IMPERSONAL'],
    shortDesc:'Supreme deity of the Yoruba tradition. Source of all Axé (divine power/life force). Too vast to approach directly — communicates through 401 Orisha (divine intermediaries). Among the most sophisticated theologies on Earth.',
    scholarly:'Olodumare is extensively documented through E. Bolaji Idowu ("Olodumare: God in Yoruba Belief," 1962) and J.O. Awolalu ("Yoruba Beliefs and Sacrificial Rites," 1979). Yoruba religion has one of the most sophisticated theological frameworks of any African tradition — with detailed cosmology, divination system (Ifa), and 401 named Orisha. Yoruba tradition survived the Middle Passage and gave rise to Candomblé (Brazil), Santería/Lucumí (Cuba), and Vodou (Haiti).',
    traditionClaim:'Olodumare does not need temples. Olodumare does not need priests or sacrifices. Olodumare is so complete that nothing humans do adds to or subtracts from the Supreme. Olodumare breathed Emi (the divine breath/spirit) into the clay forms created by Obatala — and that breath is what makes humans alive. The 401 Orisha are not lesser gods but aspects of Olodumare\'s own nature made accessible to human relationship. When we honor Shango (thunder, justice), we honor Olodumare\'s power of justice. When we honor Oshun (love, rivers, beauty), we honor Olodumare\'s quality of grace. The Orisha are the faces through which the Faceless is known. And through Ifa — the divine oracle — Olodumare speaks to every human soul about their path.',
    uncertainty:'Yoruba religious concepts were recorded primarily through Christian-educated African scholars and colonial administrators. The pre-contact forms and how they have evolved across the diaspora is an active area of scholarly research.',
    parallels:'El Elyon (Hebrew — communicates through divine intermediaries), An/Anu (Sumerian — distant supreme), Brahman (Hindu — impersonal absolute), Wakan Tanka (Lakota)',
    primarySources:['E. Bolaji Idowu, Olodumare: God in Yoruba Belief (1962)', 'J.O. Awolalu, Yoruba Beliefs and Sacrificial Rites (1979)', 'Wande Abimbola, Ifa: An Exposition of Ifa Literary Corpus (1976)'],
    russelConnection:'Olodumare\'s Axé (divine power/life force) distributed through 401 Orisha parallels Russell\'s description of the ONE energy expressing itself in multiple frequency patterns — each Orisha a specific harmonic of the universal energy.',
  },

  // ═══════════════════════════════════════════════════════════
  // INDIGENOUS
  // ═══════════════════════════════════════════════════════════
  {
    id:'wakan_tanka', name:'WAKAN TANKA', aliases:'The Great Mystery, The Great Spirit, Tunkasila (Grandfather)',
    tradition:'indigenous', region:'Great Plains (North America)', date:'Oral tradition; documented c. 19th century CE',
    tier:'Supreme Source', confidence:'documented', color:'#807040', imgKey:'native',
    tags:['GREAT MYSTERY','SUPREME','NATURE','SACRED','ORAL TRADITION'],
    shortDesc:'The supreme reality in Lakota spirituality. Not a personal god but a sacred, mysterious, all-pervading power that animates all of existence. "Everything is sacred" is not a metaphor — it is theological fact.',
    scholarly:'Wakan Tanka is documented through Black Elk Speaks (John Neihardt, 1932), Ella Deloria\'s linguistic and anthropological work, and James Walker\'s "Lakota Belief and Ritual" (1980). Scholars distinguish between Wakan Tanka as an abstract supreme power and the 16 "aspects" of the sacred (the Wakan), of which Wakan Tanka is the sum.',
    traditionClaim:'Wakan Tanka is not a being who exists outside of the world looking in. Wakan Tanka is the sacred quality of existence itself — the mystery that cannot be solved, only lived. When a Lakota elder prays "Mitakuye Oyasin" (All My Relations), they are declaring the fundamental theological principle: everything is related, everything is sacred, everything participates in the great web of being. The vision quest — the seeker going alone into the wilderness, fasting, praying, waiting — is not a request to a distant God but active participation in the sacred web itself. Because Wakan Tanka is not absent from the world. Wakan Tanka is the world\'s aliveness itself.',
    uncertainty:'What is documented is partially filtered through 19th-20th century European-American transcription. The pre-contact form of Lakota spiritual practice has been significantly affected by colonial disruption and forced conversion.',
    parallels:'Brahman (Hindu — closest structural parallel), The One (Neoplatonic), The Monad (Gnostic), The Tao (Taoist)',
    primarySources:['Black Elk Speaks (John Neihardt, 1932)', 'James R. Walker, Lakota Belief and Ritual (1980)', 'Ella Deloria, Speaking of Indians (1944)', 'Raymond DeMallie, The Sixth Grandfather (1984)'],
    russelConnection:'"Everything is sacred / everything is related" is Russell\'s field theory in spiritual language: every wave pattern is an expression of the same ONE consciousness, all connected through the universal medium of light/electricity.',
  },
  {
    id:'dreamtime', name:'THE DREAMING / TJUKURPA', aliases:'Dreamtime, The Law, The Way',
    tradition:'indigenous', region:'Australia', date:'Oral tradition; 60,000+ years of continuous culture',
    tier:'Supreme Source', confidence:'documented', color:'#807040', imgKey:'native',
    tags:['DREAMING','SONGLINES','ANCESTOR BEINGS','LAW','CONTINUOUS','SACRED LAND'],
    shortDesc:'The foundational reality in Aboriginal Australian spirituality. Not a past time but an eternal, parallel dimension where Ancestor Beings created and still sustain the world through song. The oldest continuous spiritual tradition on Earth.',
    scholarly:'Aboriginal Australian spiritual traditions represent the oldest continuous cultural tradition known to humanity — at least 60,000 years, possibly 65,000+ years. W.E.H. Stanner\'s work ("White Man Got No Dreaming," 1979) is particularly important for understanding Dreaming as a theological concept. The Songlines — sacred geographical routes associated with Ancestor Beings\' journeys — organize both land and knowledge in a unified system.',
    traditionClaim:'The Dreaming did not happen and end. The Dreaming is happening now, has always been happening, will always be happening — in a dimension that intersects with ordinary time at every sacred site. The Ancestor Beings created the world by singing it into existence along the Songlines, and the world continues to exist because the songs continue. When the Yolŋu perform the ceremonies their ancestors performed, they are literally participating in the ongoing creation of the world. The land is not merely where Aboriginal people live; the land is their living body. Sacred sites are not historical monuments but living organs of a living being. The Rainbow Serpent moves through underground water, connecting all sacred sites, sustaining the web of life.',
    uncertainty:'Aboriginal Australian spiritual traditions are not monolithic — there are hundreds of distinct language groups with distinct traditions. Many sacred aspects of Dreaming are secret and not available for outside documentation — this is respected by responsible scholars.',
    parallels:'Wakan Tanka (Lakota — sacred quality of all existence), Brahman (Hindu — continuous, everywhere present), Tao (Taoist — the underlying pattern), Logos (Greek — the ordering principle)',
    primarySources:['W.E.H. Stanner, White Man Got No Dreaming (1979)', 'Deborah Bird Rose, Nourishing Terrains (1996)', 'Marcia Langton, Welcome to Country (2018)'],
    russelConnection:'The Songlines — the universe sung into existence, maintained by song, still vibrating with ancestral songs — is Russell\'s universe as pure vibration. Existence is not a thing but a song; not matter but wave motion in the ONE medium of consciousness.',
  },
];

/** Get deity by id */
export function getDeityById(id) {
  return DEITIES.find(d => d.id === id) ?? null;
}

/** Get deities by tradition */
export function getDeitiesByTradition(traditionId) {
  return DEITIES.filter(d => d.tradition === traditionId);
}
