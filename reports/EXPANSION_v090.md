# Expansion v0.9.0

Built from v0.8.0 plus regional batches in `data/batches/` with `tools/merge_batches.py`.
Validates 0 Severity-1 / 0 Severity-2 (`reports/defect_manifest_v090.json`).

| | v0.8.0 | v0.9.0 |
|---|---:|---:|
| Traditions | 152 | 252 |
| Deities | 643 | 1403 |
| Facets | 934 | 1814 |
| Canonical parallels | 259 | 1196 |

Coverage checklist (`tools/coverage_checklist.json`, audited by `tools/audit_coverage.py`): 297/400 in v0.8.0 → 400/400 in v0.9.0. See `AUDIT_COVERAGE_v080.md` and `AUDIT_COVERAGE_v090.md`.

## Batches
- `v090_abr` — Abrahamic traditions and offshoots, the adversary figure in every tradition, modern Western movements (Satanism, Thelema, Wicca, Spiritism).
- `v090_sas` — South Asia, Himalaya, Central Asia, Siberia.
- `v090_eas` — East and Southeast Asia, Oceania.
- `v090_eur` — Ancient Near East, Mediterranean, Europe, Caucasus.
- `v090_afa` — Africa, African diaspora religions, Indigenous Americas.
- `v090_xlink` — links across batches (e.g. Typhon = Set; missionary identifications of Supay, Ekwensu, Tornarsuk and Yurupari with the Devil; Pan → the Wiccan Horned God).
- `v090_spelling` — plain-keyboard spellings (sh for ś/ṣ) on Indic names so searches find them.

## New links (937)
Strength: {'derivation': 94, 'strong-parallel': 245, 'partial-parallel': 345, 'identity': 204, 'contrast': 49}

Type: {'documented-historical-transmission': 246, 'etymological-link': 87, 'narrative-pattern-match': 143, 'structural-function-match': 355, 'modern-syncretic-identification': 55, 'iconographic-parallel': 31, 'ritual-practice-parallel': 20}

## The same figure under different names
Separate records per tradition, joined by typed links, so one figure can be the villain in one tradition and venerated in another:
HaSatan (Hebrew Bible) → Satan (Christianity) → Iblīs/Shayṭān (Islam); Helel ben Shachar → Lucifer → Satan; Baal Zebub → Beelzebub → Satan; Belial, Mastema, Samael; Satan as symbol (LaVeyan, 1966), as a real being (Theistic Satanism), and Set as the Prince of Darkness identified with Satan (Temple of Set, 1975); Melek Taus (Yazidi), linked as a contrast because the Satan identification is an outsiders' polemic.

## Fact-check
A seeded random sample of 60 new deities and 40 new links was checked: 93 ok, 7 minor, 0 errors. All 7 were fixed in the batch files before the final merge.

## New traditions (100)
Rabbinic Judaism (Talmud / Midrash), Mandaeism (Nasoraean), Yazidism (Êzidî), Druze (al-Muwaḥḥidūn), Bahá'í Faith, Samaritanism, Rastafari, LaVeyan Satanism (Church of Satan), Theistic Satanism, Luciferianism, Temple of Set, The Satanic Temple, Western Occultism (19th-c. ritual magic), Thelema, Wicca / modern Paganism, Spiritism (Kardecism), Christian Science, Jehovah's Witnesses, Unitarian Christianity, Ethiopian Orthodox Tewahedo Christianity, Dravidian village and guardian-deity worship, Ayyavazhi, Lingayat / Virashaiva, Ahom (Tai-Ahom traditional religion), Kalasha traditional religion, Newar religion (Kathmandu Valley), Kazakh and Kyrgyz folk religion, Bactrian / Kushan pantheon, Sakha (Yakut) Aiyy faith, Evenki shamanic religion, Khanty and Mansi (Ob-Ugrian) religion, Nenets religion, Chukchi, Koryak and Itelmen religion, Ancient Chinese state religion (Shang–Zhou), Japanese Buddhism and syncretic folk religion (shinbutsu-shūgō), Tagalog anitism (pre-colonial Philippine religion), Visayan anitism, Balinese Hinduism (Agama Hindu Dharma), Javanese religion (Kejawen and wayang cosmology), Ngaju Dayak religion (Kaharingan), Toba Batak religion (Parmalim and older tradition), Malay folk religion (keramat cult), Burmese nat worship, Tai / Lao spirit religion (satsana phi), Cham religion (Balamon Cham / Hindu Champa), Tahitian / Society Islands religion, Rapa Nui religion, Marquesan religion, Cook Islands religion (Mangaia), Fijian religion, Aboriginal Australian (pan-continental motifs), Aboriginal — Southwest (Noongar), Aboriginal — Tiwi Islands, Torres Strait Islander religion, Sumerian, Elamite, Urartian, Pre-Islamic Arabian (Hejaz / North Arabian), Nabataean, Ancient South Arabian (Sabaean / Minaean / Qatabanian / Hadramite), Ammonite / Moabite (Iron Age Transjordan), Aramaean / Syrian (Hierapolis, Palmyra, Damascus), Thracian, Illyrian, Lusitanian / Hispano-Celtic, Ossetian (Nart epic and folk religion), Circassian / Adyghe (Habze), Albanian folk religion, Romano-British / Brittonic, Edo / Benin Kingdom (Nigeria), Kikuyu / Gikuyu (Kenya), Dinka / Jieng (South Sudan), Nuer / Naath (South Sudan / Ethiopia), Bakongo / Kongo, Shona (Zimbabwe), Xhosa (South Africa), Khoikhoi / Khoekhoe, Bambara / Bamana (Mali), Serer (Senegal / Gambia), Ganda / Baganda (Uganda), Malagasy (Madagascar), Ancient Nubian / Kushite (Napata and Meroë), Amazigh / Berber and Ancient Libyan, Umbanda (Brazil), Quimbanda (Brazil), Palo Mayombe / Reglas de Congo (Cuba), Winti (Suriname), Kumina (Jamaica), Trinidad Orisha / Shango and Spiritual Baptist, Espiritismo (Puerto Rico / Cuba), Hoodoo / Conjure (African American), Mixtec / Ñuu Savi (Oaxaca), Purépecha / Tarascan (Michoacán), Cheyenne / Tsêhéstáno, Muscogee / Creek, Wabanaki (Mi'kmaq / Abenaki / Passamaquoddy / Penobscot / Maliseet), Zuni / A:shiwi (Pueblo), Keresan Pueblo (Acoma / Laguna / Cochiti and others), Plateau (Nez Perce / Sahaptin / Salish), Maidu (California)
