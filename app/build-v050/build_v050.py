"""Merge script for v0.5.0 — finalize, validate, write."""
import json, copy, sys
from pathlib import Path

sys.path.insert(0, "/home/claude")
from v050_data_a import NEW_TRADITIONS, NEW_DEITIES
from v050_data_b import NEW_FACETS

SOURCE = Path("/mnt/user-data/outputs/source_map_seed_data_v040.json")
OUTPUT = Path("/mnt/user-data/outputs/source_map_seed_data_v050.json")

def P(pid, a, b, strength, type_, basis, source_tradition, primary_evidence=None, caveat=None):
    d = {"id":pid,"facet_a_id":a,"facet_b_id":b,"strength":strength,"type":type_,"basis":basis,"source_tradition":source_tradition,"canonical":True,"user_drawn":False}
    if primary_evidence: d["primary_text_evidence"] = primary_evidence
    if caveat: d["scholarly_caveat"] = caveat
    return d

# ============================================================================
# NEW CANONICAL PARALLELS — wiring new traditions to the global comparative graph
# ============================================================================
NEW_PARALLELS = [
    # ===== TIER-1 UNMANIFEST SOURCE CLUSTER =====
    P("p400","tao-unnamable-source","monad-unmanifest","strong-parallel","unmanifest-source-cross-cultural",
      ["Both are unnamable, ineffable, beyond categories","Both are the ground from which manifestation emerges","Both are addressed apophatically — by what they are NOT","Daodejing 1 and the Apocryphon of John open with strikingly similar negations"],
      "Comparative mysticism",
      ["Daodejing 1","Apocryphon of John II,1"]),
    P("p401","adi-buddha-primordial","monad-unmanifest","strong-parallel","unmanifest-source-cross-cultural",
      ["Both occupy the unmanifest pre-creation position","Vajrayana Adi-Buddha and Gnostic Monad are addressed apophatically","Both are identical with their respective ultimate principles (Dharmakaya / Pleroma)"],
      "Comparative mysticism — Vajrayana / Gnostic"),
    P("p402","olodumare-supreme-being","monad-unmanifest","partial-parallel","withdrawn-high-god-cross-cultural",
      ["Both are supreme beings whose access is mediated through emanations","Olodumare reached via Orishas; Monad reached via Aeons","Both are unknowable in their essence"],
      "Comparative religion"),
    P("p403","olodumare-withdrawn","el-elyon-council-head","strong-parallel","withdrawn-high-god-cross-cultural",
      ["Both are withdrawn supreme deities","Olodumare delegates to Orishas; El presides over divine council","Both pattern — withdrawn-high-god + active-emanations — recurs across traditions"],
      "Comparative religion"),
    P("p404","idjair-milky-way-father","olodumare-supreme-being","strong-parallel","withdrawn-high-god-cross-cultural",
      ["Both are supreme beings withdrawn from direct intervention","Both delegate cosmic governance to subordinate beings","Aboriginal Idjair and Yoruba Olodumare share the withdrawn-source structure"],
      "Comparative religion"),
    P("p405","tao-unnamable-source","adi-buddha-primordial","strong-parallel","unmanifest-source-cross-cultural",
      ["Both Chinese and Buddhist Tier-1 sources","Both unnamable, ineffable","Both source of manifestation but unmanifest themselves","Convergent traditions — Mahayana and Daoism deeply influenced each other in China"],
      "Comparative East Asian religion"),

    # ===== ZOROASTRIAN-CHRISTIAN LINEAGE =====
    P("p406","ahriman-hostile-spirit","yaldabaoth-usurper","strong-parallel","cosmic-adversary-historical-influence",
      ["Both are uncreated/usurper sources of cosmic evil","Both oppose the true supreme deity","Zoroastrian dualism profoundly influenced Gnosticism via Manichaean transmission","Norman Cohn, Cosmos, Chaos, and the World to Come (1993), traces this historical influence"],
      "Comparative apocalyptic religion",
      None,
      "The structural parallel is also a historical influence — Zoroastrian dualism shaped Second Temple Judaism, Gnosticism, and Christianity."),
    P("p407","saoshyant-final-savior","christ-second-coming","derivation","eschatological-savior-historical-influence",
      ["Both are eschatological saviors who appear at the end of cosmic time","Both raise the dead","Both inaugurate the renewed creation","Zoroastrian eschatology dates from c. 1500-1000 BCE; Jewish apocalyptic and Christian eschatology develop centuries later, after centuries of contact"],
      "Comparative eschatology",
      ["Yasht 19","Revelation"],
      "Mary Boyce and others have argued for direct Zoroastrian influence on the development of Jewish and Christian eschatology during the Achaemenid and Hellenistic periods."),
    P("p408","amesha-spentas-divine-council","el-divine-council-head","strong-parallel","divine-council-cross-cultural",
      ["Both are councils of high-divine beings around the supreme deity","Both number around six-to-seven","Probable Zoroastrian influence on Jewish angelology (seven archangels) and Gnostic Aeon-counts"],
      "Comparative angelology"),
    P("p409","yima-pie-yemo-iranian","ymir-pie-yemo-reflex","derivation","PIE-linguistic-cognate",
      ["Avestan Yima and Old Norse Ymir descend from PIE *Yemo 'twin'","Direct linguistic cognates","Iranian preserves golden-age-king function; Norse preserves cosmic-body cosmogony function"],
      "Comparative Indo-European mythology"),
    P("p410","daevas-vedic-deva-inversion","indra-storm-king","contrast","indo-iranian-religious-schism",
      ["Vedic devas (gods) and Iranian daevas (demons) are linguistic cognates with INVERTED valence","Indra, chief of Vedic devas, is named as a daeva in Vendidad 10","Same root deity-class — opposite valuation"],
      "Comparative Indo-Iranian religion",
      ["Vendidad 10, 19","Rigveda passim"]),
    P("p411","mithra-iranian-mediator","mitra-solar-mediator","derivation","indo-iranian-shared-deity",
      ["Vedic Mitra and Iranian Mithra descend from common Indo-Iranian *Mitra","Both are contract-deities","Iranian Mithra developed into a major mediator and source of Roman Mithraic mystery cult"],
      "Comparative Indo-Iranian religion"),

    # ===== STORM-GOD CLUSTER =====
    P("p412","shango-thunder-warrior","perkwunos-storm-warrior","strong-parallel","convergent-storm-warrior",
      ["Both wield axe/double-axe as thunder-weapon","Both are warrior-kings of their pantheon","No plausible historical connection — convergent independent development","Yoruba Shango and PIE *Perkwunos cluster preserve same archetype across continents"],
      "Comparative storm-warrior typology"),
    P("p413","perun-storm-god","perkwunos-storm-warrior","derivation","PIE-cognate-slavic",
      ["Slavic Perun is direct phonological reflex of PIE *Perkwunos","Same name, same function — storm-warrior with axe","Slavic preserves the cognate most directly among IE languages"],
      "Comparative Indo-European linguistics"),
    P("p414","thor-storm","perkwunos-storm-warrior","derivation","PIE-cognate-norse",
      ["Thor's mother Fjörgyn(n) preserves the PIE *Perkwunos name","Same storm-warrior function inherited","Norse Thor and Slavic Perun are sibling reflexes"],
      "Comparative Indo-European mythology"),
    P("p415","illapa-thunder-warrior","perkwunos-storm-warrior","strong-parallel","convergent-storm-warrior",
      ["Both are thunder-warriors with stone-projectile weapons (Illapa's sling; *Perkwunos's stone axe)","No historical connection","Convergent storm-warrior archetype in the Andes and Indo-European world"],
      "Comparative storm-warrior typology"),
    P("p416","perun-vs-veles","perkwunos-dragon-slayer","derivation","PIE-storm-vs-serpent-slavic",
      ["Direct Slavic preservation of PIE storm-god vs cosmic-serpent","Perun strikes Veles; storm-god strikes water-serpent","Annual cosmic drama re-enacted in storm season"],
      "Comparative Indo-European mythology"),

    # ===== DRAGON-SLAYER CROSS-TRADITION =====
    P("p417","thor-jormungandr-slayer","perkwunos-dragon-slayer","derivation","PIE-storm-vs-serpent-norse",
      ["Thor vs Jörmungandr preserves PIE storm-god vs water-serpent","Mutual killing at Ragnarök","Direct cognate narrative"],
      "Comparative Indo-European mythology"),
    P("p418","apollo-dragon-slayer-python","perkwunos-dragon-slayer","strong-parallel","PIE-dragon-slayer-greek",
      ["Apollo slays the Python at Delphi","Greek instance of the dragon-slayer cluster","Establishes oracle on the dragon's place — sovereignty-via-monster-killing"],
      "Comparative Indo-European mythology"),
    P("p419","ninurta-warrior-dragon-slayer","marduk-cosmic-orderer","identity","mesopotamian-dragon-slayer-line",
      ["Ninurta is the earlier Sumerian dragon-slayer; Marduk inherits the function","Both defeat cosmic enemies who steal/control fundamental cosmic powers","Same archetype across Sumerian → Akkadian → Babylonian succession"],
      "Mesopotamian religion"),
    P("p420","tiamat-chaos-dragon","vritra-cosmic-serpent","strong-parallel","chaoskampf-cross-cultural",
      ["Both are primordial cosmic serpents defeated by storm-warrior","Marduk vs Tiamat; Indra vs Vritra","Bronze Age Near Eastern / Indo-European shared chaoskampf"],
      "Comparative ancient Near Eastern / IE mythology"),
    P("p421","apep-cosmic-chaos-serpent","jormungandr-world-serpent","strong-parallel","cosmic-serpent-convergent",
      ["Both are cosmic serpents that threaten cosmic order","Apep attacks Ra nightly; Jörmungandr threatens Thor at Ragnarök","Convergent archetype across Egyptian and Norse traditions"],
      "Comparative mythology"),
    P("p422","veles-perun-adversary","vritra-cosmic-serpent","strong-parallel","storm-vs-serpent-cluster",
      ["Both are cosmic-serpent adversaries of storm-gods","Veles is to Perun what Vritra is to Indra","Both steal/withhold cosmic resource (cattle/waters)","PIE cluster preserved with high fidelity"],
      "Comparative Indo-European mythology"),
    P("p423","michael-vs-dragon","perkwunos-dragon-slayer","strong-parallel","dragon-slayer-into-christian",
      ["Revelation 12 preserves the storm-god-vs-cosmic-dragon pattern in Christian eschatology","Michael and the heavenly host defeat the Dragon","Calvert Watkins ('How to Kill a Dragon') traces the inherited formulae"],
      "Comparative IE / Christian apocalyptic"),

    # ===== DYING-AND-RISING-GOD CLUSTER =====
    P("p424","osiris-dismembered","baal-dies-and-rises","strong-parallel","dying-rising-vegetation-god",
      ["Both die and return","Both are vegetation deities — their return is the return of life to the land","Both have grieving sister-consorts (Isis, Anat) who play key roles in restoration","Tryggve Mettinger, The Riddle of Resurrection (2001), defends this category"],
      "Comparative ancient Near Eastern religion",
      ["Ugaritic Baal Cycle","Plutarch's On Isis and Osiris"],
      "James Frazer's 'dying and rising god' category was widely critiqued in the 20th century (especially by Jonathan Z. Smith); Mettinger and Mark S. Smith have rehabilitated a more restricted version of it."),
    P("p425","osiris-dismembered","dionysus-zagreus-dismembered","strong-parallel","dismembered-and-restored-god",
      ["Both are gods who are dismembered","Both are restored — Osiris by Isis's magic; Dionysus by Zeus","Both become mystery-cult centers offering hope of afterlife to initiates"],
      "Comparative mystery-cult religion"),
    P("p426","dionysus-zagreus-dismembered","inanna-descended-goddess","strong-parallel","dying-rising-divine-being",
      ["Both descend into death and return","Both undergo extreme suffering — dismemberment / hanging-as-corpse","Both become objects of mystery-cult devotion"],
      "Comparative ancient religion"),
    P("p427","baldr-dying-beloved-god","osiris-dismembered","strong-parallel","dying-beloved-returning-god",
      ["Both are beloved gods killed through divine trickery","Both reside in the underworld awaiting return","Baldr returns after Ragnarök; Osiris returns each year as vegetation"],
      "Comparative mythology"),
    P("p428","baldr-returns-after-ragnarok","christ-resurrection","strong-parallel","dying-returning-god",
      ["Both are killed and return to rule a renewed world","Both involve mistletoe / wood / cross","Both promise a renewed creation after their return"],
      "Comparative mythology",
      None,
      "Some scholars (e.g., Sophus Bugge) have argued for Christian influence on the late Eddic Baldr material; others see independent development."),
    P("p429","persephone-descent","inanna-descended-goddess","strong-parallel","descent-and-return-goddess",
      ["Both descend to the underworld","Both return — but their absence causes seasonal change","Demeter's grief for Persephone parallels Anat's grief for Baal"],
      "Comparative mythology"),
    P("p430","christ-resurrection","dionysus-twice-born","strong-parallel","mystery-cult-dying-rising",
      ["Both involve second birth / death-and-rebirth","Both become center of mystery-cult initiations","Early Christianity developed amid Hellenistic mystery-cult environment"],
      "Comparative mystery-cult religion"),

    # ===== COSMIC-BODY COSMOGONY (Tiamat / Ymir / Pangu / Puruṣa) =====
    P("p431","pangu-cosmic-body","ymir-primordial-cosmic-body","strong-parallel","convergent-cosmic-body-cosmogony",
      ["Both primordial giants whose bodies become the cosmos","No plausible historical connection","Convergent independent development of dismembered-cosmic-body cosmogony","Strong evidence for the archetype's near-universality"],
      "Comparative cosmogony"),
    P("p432","pangu-cosmic-body","purusha-sacrificed-cosmic-person","strong-parallel","convergent-cosmic-body-cosmogony",
      ["Both are sacrificed/dying primordial beings whose body becomes the cosmos","No plausible direct connection between Vedic and Chinese traditions","Convergent archetype"],
      "Comparative cosmogony"),
    P("p433","tiamat-body-becomes-cosmos","ymir-primordial-cosmic-body","strong-parallel","convergent-cosmic-body-cosmogony",
      ["Marduk splits Tiamat's body to form sky and earth","Odin and brothers split Ymir's body to form the cosmos","Convergent archetype with possible Bronze Age Near Eastern → Germanic transmission"],
      "Comparative ancient mythology"),

    # ===== RETURNING-SAVIOR CLUSTER =====
    P("p434","maitreya-future-buddha-coming","kalki-returning-savior","strong-parallel","returning-savior-cross-cultural",
      ["Both Indic returning-savior traditions","Both appear at the end of a present degraded age","Possible cross-influence between Indian Buddhist and Hindu eschatology"],
      "Comparative Indic eschatology"),
    P("p435","saoshyant-final-savior","kalki-returning-savior","strong-parallel","indo-iranian-eschatological",
      ["Both are Indo-Iranian returning-savior traditions","Both appear at end of a cosmic age","Both inaugurate restored creation","Probable common Indo-Iranian eschatological substrate"],
      "Comparative Indo-Iranian religion"),
    P("p436","viracocha-prophesied-return","quetzalcoatl-prophet-returning","strong-parallel","mesoamerican-andean-returning-god",
      ["Both pre-Columbian American traditions of a withdrawn-creator-god who will return","Both contributed to indigenous interpretations of Spanish conquistadors as returning gods — with catastrophic consequences","Possible common substrate or independent development"],
      "Comparative pre-Columbian religion"),
    P("p437","maitreya-future-buddha-coming","christ-second-coming","strong-parallel","returning-savior-cross-cultural",
      ["Both are awaited returning saviors","Both will appear when present age has run its course","Universal returning-savior archetype"],
      "Comparative eschatology"),

    # ===== TRICKSTER-CULTURE-HERO CLUSTER =====
    P("p438","maui-fire-bringer","prometheus-fire-bringer","strong-parallel","convergent-fire-bringer-trickster",
      ["Both bring fire to humanity by trick","Both are trickster culture-heroes","Polynesian and Greek traditions with no plausible connection","Strong convergent evidence for the archetype"],
      "Comparative mythology"),
    P("p439","eshu-elegua-crossroads-trickster","loki-trickster-liberator","partial-parallel","trickster-cross-cultural",
      ["Both are trickster figures necessary for transformation","Eshu is principle of disturbance without which nothing moves","Loki provokes the events that drive Norse mythology","Both are misidentified by outsiders with adversarial cosmic principles"],
      "Comparative trickster typology"),
    P("p440","enki-trickster-savior","prometheus-fire-bringer","strong-parallel","wisdom-saving-humanity",
      ["Both outwit a higher god to save humanity","Enki warns Atrahasis of the Flood against Enlil's decree","Prometheus brings fire against Zeus's will","Same archetype — wise trickster who acts for humanity against the supreme"],
      "Comparative ancient mythology"),

    # ===== TEACHERS-OF-FORBIDDEN-ARTS (positive vs negative valence) =====
    P("p441","apkallu-seven-sages","watchers-teachers-of-forbidden-arts","contrast","same-archetype-opposite-valence",
      ["Both are seven (or grouped) pre-Flood divine beings who teach humans arts of civilization","Apkallu are SANCTIONED by Ea — positive valence","Watchers are TRANSGRESSIVE — negative valence","Same archetype with opposite moral framing — direct Mesopotamian → Second Temple Jewish transmission with inverted valence"],
      "Comparative ancient Near Eastern religion",
      ["Berossus, Babyloniaca","1 Enoch 6-11"]),
    P("p442","ogun-iron-warrior","azazel-teacher-of-weapons","contrast","smith-god-opposite-valence",
      ["Both are smith-deities — patrons of iron-working","Ogun has POSITIVE valence (sanctioned culture-bringer)","Azazel has NEGATIVE valence (transgressive teacher of weapons)","Same archetype, opposite moral framing"],
      "Comparative typology"),

    # ===== TIER-2 DIVINE COUNCIL =====
    P("p443","orishas-collective-emanations","amesha-spentas-divine-council","strong-parallel","emanations-of-supreme",
      ["Both are emanations through which the supreme reaches the world","Yoruba Orishas and Zoroastrian Amesha Spentas occupy structurally parallel positions","Withdrawn-supreme + active-emanations pattern"],
      "Comparative emanationist theology"),
    P("p444","orishas-collective-emanations","el-divine-council-head","strong-parallel","divine-council-cross-cultural",
      ["Both are councils of divine beings around a supreme","Both number around 70+ to 400+","Both pattern: supreme + delegated emanations"],
      "Comparative religion"),
    P("p445","three-pure-ones-triad","vishnu-cosmic-preserver","strong-parallel","divine-triad-cross-cultural",
      ["Both are highest-tier divine triads in their respective traditions","Three Pure Ones in Taoism; Trimurti (Brahma/Vishnu/Shiva) in Hinduism","Convergent triadic theology"],
      "Comparative East Asian / South Asian religion"),

    # ===== MOTHER-GODDESSES =====
    P("p446","isis-stella-maris","avalokiteshvara-guanyin-feminine","strong-parallel","feminized-compassion-archetype",
      ["Both are universal compassionate mother-figures","Isis's iconography was absorbed by Marian devotion","Avalokiteshvara was feminized as Guanyin","Convergent feminine-compassion archetype across late antique Mediterranean and East Asian traditions"],
      "Comparative mother-goddess studies"),
    P("p447","yemoja-mother-of-orishas","asherah-mother-of-gods","strong-parallel","mother-of-gods-cross-cultural",
      ["Both are mothers of the divine emanations","Both are venerated as great mothers","Convergent archetype"],
      "Comparative mother-goddess typology"),
    P("p448","pachamama-earth-mother","mokosh-earth-mother-spinner","strong-parallel","earth-mother-convergent",
      ["Both are earth-mothers continuously venerated through Christian-era syncretism (Pachamama with Marian devotion; Mokosh with St. Paraskeva)","Both centered on moist earth, fertility, women's work","Convergent archetype"],
      "Comparative earth-mother studies"),

    # ===== UNDERWORLD-LORDS =====
    P("p449","osiris-lord-of-dead","yama-death-judge","strong-parallel","judge-of-the-dead-cross-cultural",
      ["Both judge the dead in the post-mortem realm","Both keep ledgers of deeds","Both became models for the just deceased","Convergent archetype across Egyptian and Indic traditions"],
      "Comparative afterlife religion"),
    P("p450","hel-underworld-queen","persephone-queen-of-underworld","partial-parallel","underworld-queen",
      ["Both feminine rulers of the underworld","Hel is half-alive-half-dead; Persephone is split between worlds","Both keep souls until release"],
      "Comparative mythology"),

    # ===== SKY-FATHER CROSS-FAMILY =====
    P("p451","anu-sky-father","dyeus-sky-father-root","strong-parallel","sky-father-cross-family",
      ["Both are sky-father high gods","Sumerian Anu and PIE *Dyeus are NOT linguistically cognate (Sumerian is a language isolate; PIE is Indo-European)","Structural parallel, not genetic","Sky-father archetype recurs across language families"],
      "Comparative religion",
      None,
      "Important to distinguish structural parallel from genetic descent. Both occupy the sky-father slot; the names are from unrelated language families."),
    P("p452","svarog-sky-father-smith","dyeus-sky-father-root","strong-parallel","sky-father-slavic",
      ["Slavic Svarog likely preserves the sky-father function","Though medieval translators identified him with Hephaestus, his position points to a Dyeus-Phater equivalent","Comparative IE method supports the identification"],
      "Comparative Indo-European religion"),
    P("p453","tyr-pie-dyeus-linguistic","dyeus-sky-father-root","derivation","PIE-direct-linguistic-descent",
      ["Old Norse Týr (Proto-Germanic *Tīwaz) is DIRECT phonological reflex of PIE *Dyeus","But function has shifted — sky-father role transferred to Odin/Thor","Týr preserves the NAME with reduced function"],
      "Comparative Indo-European linguistics"),

    # ===== CONVERGENT COSMOLOGIES =====
    P("p454","tane-separator-of-sky-and-earth","pangu-separator-of-sky-and-earth","strong-parallel","convergent-separator-of-sky-and-earth",
      ["Both force apart primordial sky-father and earth-mother to let light into the world","Polynesian Tāne and Chinese Pangu — no plausible historical connection","Convergent archetype"],
      "Comparative cosmogony"),
    P("p455","rangi-papa-primordial-couple","titans-children-of-sky-and-earth","strong-parallel","sky-and-earth-have-divine-children",
      ["Both Polynesian Rangi/Papa and Greek Uranus/Gaia have children who eventually overthrow the primordial state","Convergent archetype — sky-father + earth-mother + their suppressed children"],
      "Comparative cosmogony"),

    # ===== INVERSIONS AND DEMONIZATIONS =====
    P("p456","supay-conflated-with-devil","veles-underworld-cattle-poetry","partial-parallel","ambivalent-power-demonized",
      ["Both were originally ambivalent underworld/ancestor powers","Both were demonized through Christian missionary contact","Andean and Slavic traditions preserve fragments of the original ambivalence beneath Christian re-framings"],
      "Comparative religious-encounter studies"),
    P("p457","mara-as-archon","ahriman-hostile-spirit","strong-parallel","cosmic-adversary-cross-tradition",
      ["Both are cosmic adversaries who oppose liberation/cosmic order","Buddhist Mara and Zoroastrian Ahriman occupy structurally parallel positions","Both keep beings bound in their respective adversarial realms"],
      "Comparative cosmic-adversary typology"),

    # ===== CONTRACT-DEITIES =====
    P("p458","tyr-law-and-assembly","mitra-contract","strong-parallel","contract-deity-IE",
      ["Both Indo-European contract/oath deities","Týr presides over þing (assembly); Mitra is contract personified","Both have sacrificial / binding aspects (Týr loses hand; Mitra is bound to truth)"],
      "Comparative Indo-European religion"),

    # ===== MARIAN-ABSORPTION CLUSTER =====
    P("p459","isis-stella-maris","inanna-queen-of-heaven","strong-parallel","queen-of-heaven-cross-cultural",
      ["Both 'Queen of Heaven' figures","Both have iconography that influenced later Marian devotion","Inanna → Ishtar → Astarte → continuous Levantine 'Queen of Heaven' tradition","Isis cult spread across Roman empire as universal mother"],
      "Comparative mother-goddess studies"),

    # ===== NIGHTLY-COSMIC-COMBAT =====
    P("p460","apep-attacks-the-sun","jormungandr-kills-thor-at-ragnarok","partial-parallel","cosmic-serpent-vs-defender",
      ["Both involve cosmic serpent threatening cosmic order","Egyptian Apep attacks Ra nightly; Norse Jörmungandr kills Thor at Ragnarök","Daily-cosmic-combat (Egyptian) vs end-of-time-cosmic-combat (Norse) — different temporal scales, same archetype"],
      "Comparative cosmic-serpent typology"),
]

# ============================================================================
# NEW FRAMEWORKS — Dragon-Slayer Formula + Dying-and-Rising God Formula
# ============================================================================
DRAGON_SLAYER_FRAMEWORK = {
    "id": "dragon-slayer-formula",
    "name": "The Dragon-Slayer Formula",
    "tradition_id": "proto-indo-european",
    "type": "cosmological-framework",
    "summary": (
        "Across Indo-European and adjacent Near Eastern traditions, a single inherited narrative formula appears with striking consistency: "
        "the storm-god (or warrior-hero) slays a cosmic serpent who has withheld or stolen a fundamental cosmic resource — usually the waters, "
        "the cattle, or the Tablet of Destinies. Calvert Watkins's How to Kill a Dragon (1995) reconstructed the underlying poetic formula, "
        "showing that even the phrasing of these accounts preserves PIE structural patterns. The pattern extends beyond Indo-European through "
        "Bronze Age Near Eastern transmission and appears convergently in traditions with no plausible historical connection — strong evidence "
        "for both inherited and convergent dimensions of the archetype."
    ),
    "narrative_components": [
        "Storm-god or warrior-hero (the slayer)",
        "Cosmic serpent or dragon (the adversary)",
        "Cosmic resource withheld or stolen (waters, cattle, Tablet of Destinies, sovereignty)",
        "The combat (often with thunder-weapon)",
        "Release of the withheld resource",
        "Restoration of cosmic order"
    ],
    "instances": [
        {"tradition": "Proto-Indo-European", "slayer": "*Perkwunos / *Tritós", "serpent": "the water-serpent", "weapon": "thunder-axe / club", "facet_ids": ["perkwunos-dragon-slayer", "trito-dragon-slayer-hero"]},
        {"tradition": "Vedic", "slayer": "Indra", "serpent": "Vritra", "weapon": "vajra (thunderbolt)", "facet_ids": ["indra-vritra-slayer", "vritra-cosmic-serpent", "vritra-withholder-of-waters"]},
        {"tradition": "Iranian", "slayer": "Thraētaona", "serpent": "Aži Dahāka (three-headed)", "weapon": "club"},
        {"tradition": "Hittite", "slayer": "Tarhunna", "serpent": "Illuyanka", "weapon": "thunder"},
        {"tradition": "Greek (Zeus)", "slayer": "Zeus", "serpent": "Typhon", "weapon": "thunderbolt", "facet_ids": ["zeus-storm-god", "typhon-cosmic-serpent-rival-of-zeus"]},
        {"tradition": "Greek (Apollo)", "slayer": "Apollo", "serpent": "Python", "weapon": "bow", "facet_ids": ["apollo-dragon-slayer-python"]},
        {"tradition": "Norse", "slayer": "Thor", "serpent": "Jörmungandr", "weapon": "Mjölnir", "facet_ids": ["thor-jormungandr-slayer", "jormungandr-world-serpent"]},
        {"tradition": "Slavic", "slayer": "Perun", "serpent": "Veles", "weapon": "axe / lightning", "facet_ids": ["perun-vs-veles", "veles-perun-adversary"]},
        {"tradition": "Celtic-Irish", "slayer": "Lugh", "serpent": "Balor", "weapon": "sling / spear", "facet_ids": ["lugh-dragon-slayer", "balor-evil-eye-tyrant"]},
        {"tradition": "Mesopotamian (Marduk)", "slayer": "Marduk", "serpent": "Tiamat", "weapon": "winds, net", "facet_ids": ["marduk-cosmic-orderer", "tiamat-chaos-dragon"]},
        {"tradition": "Mesopotamian (Ninurta)", "slayer": "Ninurta", "serpent": "Anzu / Asakku", "weapon": "thunder-weapon", "facet_ids": ["ninurta-warrior-dragon-slayer", "anzu-storm-bird-thief"]},
        {"tradition": "Egyptian", "slayer": "Set (older role) or Ra", "serpent": "Apep / Apophis", "weapon": "spear", "facet_ids": ["set-protector-of-ra", "apep-cosmic-chaos-serpent", "apep-attacks-the-sun"]},
        {"tradition": "Canaanite", "slayer": "Baal", "serpent": "Yam (Sea) / Lotan", "weapon": "club", "facet_ids": ["baal-hadad-storm", "yam-sea-chaos"]},
        {"tradition": "Christian apocalyptic", "slayer": "Michael / Christ", "serpent": "the Dragon / Satan", "weapon": "the heavenly host", "facet_ids": ["michael-vs-dragon"]},
        {"tradition": "Greek (Heracles)", "slayer": "Heracles", "serpent": "Hydra, Geryon, Cacus", "weapon": "club, bow", "facet_ids": ["heracles-monster-slayer", "heracles-recoverer-of-cattle"]},
        {"tradition": "Convergent (Andean)", "slayer": "Illapa", "serpent": "—", "weapon": "sling-stones", "facet_ids": ["illapa-thunder-warrior"]},
        {"tradition": "Convergent (Yoruba)", "slayer": "Shango", "serpent": "—", "weapon": "double-axe", "facet_ids": ["shango-thunder-warrior"]}
    ],
    "scholarly_anchors": [
        "Calvert Watkins, How to Kill a Dragon: Aspects of Indo-European Poetics (1995)",
        "Bruce Lincoln, Priests, Warriors, and Cattle (1981)",
        "Joshua Katz, 'How the Mole and Mongoose Got Their Names'",
        "M. L. West, Indo-European Poetry and Myth (2007)"
    ],
    "structural_role": (
        "The dragon-slayer formula encodes the warrior class's foundational claim: that sovereignty is established through victory over chaos. "
        "Every storm-god + serpent pairing in this framework restates the same theology — cosmic order requires active combat against an "
        "encroaching disorder. The formula's extension beyond Indo-European (to Yoruba Shango, Andean Illapa) suggests it is both inherited "
        "where there is genetic relationship AND convergent in human religious imagination at a deeper level."
    )
}

DYING_RISING_FRAMEWORK = {
    "id": "dying-and-rising-god-formula",
    "name": "The Dying-and-Rising God Formula",
    "tradition_id": "comparative",
    "type": "cosmological-framework",
    "summary": (
        "A cluster of deities across ancient Near Eastern and Mediterranean traditions follow a similar pattern: the god dies (often by murder, "
        "dismemberment, or descent), is mourned by a feminine consort or relative, and returns — often seasonally, often as the vegetation that "
        "feeds humanity. James Frazer (The Golden Bough, 1890) proposed this as a near-universal category; Jonathan Z. Smith argued (1987) that "
        "Frazer's category was overextended and obscured significant differences. Mark S. Smith (The Origins of Biblical Monotheism, 2001) and "
        "Tryggve Mettinger (The Riddle of Resurrection, 2001) defended a more restricted version, demonstrating that for several specific deities "
        "the dying-and-rising pattern is genuine and textually well-attested. The cluster here uses the restricted definition: deities for whom "
        "death and return are explicit in the primary sources."
    ),
    "narrative_components": [
        "The death of the god (murder, dismemberment, descent, sacrifice)",
        "Mourning — typically by a feminine consort or relative",
        "Active intervention to recover or restore",
        "The return / restoration / resurrection",
        "Ongoing cyclical or eschatological dimension"
    ],
    "instances": [
        {"tradition": "Egyptian", "deity": "Osiris", "death": "murdered by Set, dismembered into 14 pieces", "mourner": "Isis (with Nephthys)", "return": "reassembled by Isis; rules as king of the dead; returns annually as the Nile's flood and green vegetation", "facet_ids": ["osiris-dismembered", "osiris-rising-vegetation", "isis-magician", "isis-great-mother"]},
        {"tradition": "Canaanite", "deity": "Baal", "death": "killed by Mot (Death)", "mourner": "Anat (sister-consort)", "return": "Anat hunts Mot, grinds him like grain; Baal returns; vegetation revives", "facet_ids": ["baal-dies-and-rises", "anat-warrior-mourner", "mot-death"]},
        {"tradition": "Mesopotamian", "deity": "Inanna / Ishtar", "death": "descends through seven gates of the underworld, hung as corpse", "mourner": "Ninshubur (handmaiden)", "return": "rescued by Enki; returns but must send substitute (her husband Dumuzi)", "facet_ids": ["inanna-descended-goddess"]},
        {"tradition": "Greek", "deity": "Persephone", "death": "abducted by Hades; effectively dead to upper world", "mourner": "Demeter", "return": "returns for part of each year — origin of seasons", "facet_ids": ["persephone-descent", "persephone-queen-of-underworld", "demeter-grieving-mother", "demeter-eleusinian"]},
        {"tradition": "Greek (Orphic)", "deity": "Dionysus-Zagreus", "death": "dismembered by Titans, devoured", "mourner": "the Titans are blasted; humanity made from their ash", "return": "Dionysus reconstituted; becomes mystery-cult center", "facet_ids": ["dionysus-zagreus-dismembered", "dionysus-twice-born"]},
        {"tradition": "Norse", "deity": "Baldr", "death": "killed by mistletoe dart through Loki's trickery", "mourner": "all things weep — except Loki (as Þökk)", "return": "remains in Hel until Ragnarök; returns to rule renewed world", "facet_ids": ["baldr-dying-beloved-god", "baldr-returns-after-ragnarok"]},
        {"tradition": "Christian", "deity": "Christ", "death": "crucifixion", "mourner": "Mary; the disciples", "return": "resurrection on third day; second coming awaited", "facet_ids": ["christ-crucifixion", "christ-resurrection", "christ-second-coming"]}
    ],
    "non_instances_for_clarity": [
        {"deity": "Krishna", "note": "dies but does not return in the death-rebirth pattern — exits cosmically rather than returns"},
        {"deity": "Heracles", "note": "apotheosized at death but does not return to the world — becomes a god rather than rising"},
        {"deity": "Buddha", "note": "parinirvana is final cessation, not death-and-rebirth"}
    ],
    "scholarly_anchors": [
        "James Frazer, The Golden Bough (1890; expanded 1906–15) — original formulation, overextended",
        "Jonathan Z. Smith, 'Dying and Rising Gods' (1987 ER article) — critical narrowing",
        "Tryggve Mettinger, The Riddle of Resurrection: 'Dying and Rising Gods' in the Ancient Near East (2001) — defended restricted version",
        "Mark S. Smith, The Origins of Biblical Monotheism (2001) — Canaanite/Israelite dimension"
    ],
    "structural_role": (
        "The dying-and-rising god formula encodes the human experience of seasonal death and return — agricultural cycles, the death of "
        "vegetation in winter and its return in spring — projected into divine drama. The cluster shows historical influence (e.g., the "
        "Canaanite Baal-Anat cycle influencing aspects of Israelite religion; Egyptian Osiris cult influencing late-antique mystery religion) "
        "alongside convergent independent development. The cluster intersects significantly with the mystery-cult traditions that offered "
        "initiates participation in the deity's death-and-rebirth as a path to personal afterlife or spiritual transformation."
    )
}

# ============================================================================
# BUILD + VALIDATE
# ============================================================================
def load_base():
    with open(SOURCE) as f:
        return json.load(f)

def merge(base):
    out = copy.deepcopy(base)
    out["traditions"].extend(NEW_TRADITIONS)
    out["deities"].extend(NEW_DEITIES)
    out["facets"].extend(NEW_FACETS)
    out["canonical_parallels"].extend(NEW_PARALLELS)
    out.setdefault("cosmological_frameworks", []).append(DRAGON_SLAYER_FRAMEWORK)
    out["cosmological_frameworks"].append(DYING_RISING_FRAMEWORK)
    out["_meta"]["version"] = "0.5.0-parallels-finalize"
    out["_meta"]["description"] = (
        out["_meta"]["description"]
        + " // v0.5.0: adds Buddhist, Zoroastrian, Taoist, Yoruba, Andean, Polynesian, and Slavic traditions. "
          "Expands Egyptian (Atum, Thoth, Ogdoad, Sekhmet, Hathor, Ma'at, Osiris, Isis, Horus, Ra, Apep), "
          "Mesopotamian (Anu, Enlil, Enki, Tiamat, Apsu, Ishtar, Humbaba, Apkallu, Anzu, Ninurta), "
          "Greek (Hermes, Athena, Apollo, Dionysus, Demeter, Hades, Typhon, Gigantes, Hekatonkheires, Heracles), "
          "Norse (Thor, Frigg, Baldr, Týr, Hel, Fenrir, Jörmungandr), and Hebrew (Lucifer, Michael) pantheons. "
          "Adds the dragon-slayer-formula and dying-and-rising-god-formula cosmological frameworks."
    )
    return out

def validate(d):
    errs, warns = [], []
    tids = {t["id"] for t in d["traditions"]}
    dids = {x["id"] for x in d["deities"]}
    fids = {f["id"] for f in d["facets"]}
    for cn, items in [("traditions",d["traditions"]),("deities",d["deities"]),("facets",d["facets"]),("canonical_parallels",d["canonical_parallels"])]:
        seen = set()
        for it in items:
            if it["id"] in seen: errs.append(f"DUPLICATE id in {cn}: {it['id']}")
            seen.add(it["id"])
    for x in d["deities"]:
        if x["tradition_id"] not in tids:
            errs.append(f"deity {x['id']!r} unknown tradition_id {x['tradition_id']!r}")
        for fid in x.get("facets",[]):
            if fid not in fids:
                errs.append(f"deity {x['id']!r} missing facet {fid!r}")
    for f in d["facets"]:
        if f["parent_deity_id"] not in dids:
            errs.append(f"facet {f['id']!r} missing parent_deity_id {f['parent_deity_id']!r}")
        for pf in f.get("parallel_facets",[]):
            if pf not in fids:
                warns.append(f"facet {f['id']!r} -> not-yet-present {pf!r}")
    for p in d["canonical_parallels"]:
        for side in ("facet_a_id","facet_b_id"):
            if p[side] not in fids:
                errs.append(f"parallel {p['id']!r} missing {side}={p[side]!r}")
    return errs, warns

def main():
    base = load_base()
    print(f"v0.4 base: traditions={len(base['traditions'])}, deities={len(base['deities'])}, facets={len(base['facets'])}, parallels={len(base['canonical_parallels'])}, frameworks={len(base.get('cosmological_frameworks',[]))}")
    print(f"v0.5 adds: traditions={len(NEW_TRADITIONS)}, deities={len(NEW_DEITIES)}, facets={len(NEW_FACETS)}, parallels={len(NEW_PARALLELS)}, frameworks=2")
    out = merge(base)
    print(f"\nv0.5 totals: traditions={len(out['traditions'])}, deities={len(out['deities'])}, facets={len(out['facets'])}, parallels={len(out['canonical_parallels'])}, frameworks={len(out['cosmological_frameworks'])}")
    errs, warns = validate(out)
    if errs:
        print(f"\nVALIDATION ERRORS ({len(errs)}):")
        for e in errs:
            print(f"  ✗ {e}")
        raise SystemExit("Refusing to write — fix errors.")
    print("\nVALIDATION: clean ✓")
    if warns:
        print(f"\nForward-reference warnings: {len(warns)} (informational only)")
    with open(OUTPUT,"w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    with open(OUTPUT) as f:
        rt = json.load(f)
    assert rt == out, "round-trip mismatch"
    print(f"\nWrote: {OUTPUT}")
    print("Round-trip JSON: ✓")

if __name__ == "__main__":
    main()
