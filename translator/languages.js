// Full language + dialect/variant registry.
//
// Each variant carries:
//   - label   : shown in the "variant" dropdown
//   - bcp47   : BCP-47 tag for Web Speech (SpeechRecognition + SpeechSynthesis)
//   - rtl     : right-to-left text direction
//   - latin   : true when the target uses Latin script (=> romanization line is empty)
//   - roman   : the romanization system to request when latin === false (else null)
//   - prompt  : a precise description of the variety, injected into the translation prompt
//
// The `prompt` strings never leave the server. The client only receives the
// display/speech metadata via GET /api/config.

const LANGUAGES = [
  {
    id: 'english',
    name: 'English',
    variants: [
      {
        id: 'american', label: 'American', bcp47: 'en-US', rtl: false, latin: true, roman: null,
        prompt: 'American English (General American). Everyday US vocabulary and spelling (color, apartment, truck, gas, elevator, "gonna", "wanna").',
      },
      {
        id: 'british', label: 'British', bcp47: 'en-GB', rtl: false, latin: true, roman: null,
        prompt: 'British English (Standard Southern British). British spelling and vocabulary (colour, flat, lorry, petrol, lift, "mate", "cheers", "reckon", "quid").',
      },
      {
        id: 'aave', label: 'AAVE — Southern US', bcp47: 'en-US', rtl: false, latin: true, roman: null,
        prompt: 'African American Vernacular English with Southern US features. Use authentic AAVE grammar and vocabulary: habitual "be" (she be working), copula deletion (he working, they good), "finna", "ain\'t", "y\'all", double negatives (don\'t nobody know), "on God/on gang", "deadass", "talkin\' bout". Do NOT sanitize into standard English.',
      },
      {
        id: 'caribbean', label: 'Caribbean', bcp47: 'en-JM', rtl: false, latin: true, roman: null,
        prompt: 'Caribbean English / Jamaican Patois-influenced. Use Caribbean vocabulary and rhythm: "wah gwaan", "mi deh yah", "irie", "pickney", "vex", "nyam", "bredren/sistren", "big up", "small up yuhself", "wagwan", "ova deh so". Reflect Patois grammar where natural.',
      },
    ],
  },
  {
    id: 'spanish',
    name: 'Spanish',
    variants: [
      {
        id: 'puerto_rican', label: 'Puerto Rican', bcp47: 'es-PR', rtl: false, latin: true, roman: null,
        prompt: 'Puerto Rican Spanish (boricua). Must actually sound boricua: aspirate or drop final -s (ehtá, loh nene), use "pa\'" for "para", R/L shifting (Puelto Rico, veidá), Spanglish loanwords, and real PR vocabulary: guagua (bus), chavos (money), janguear (hang out), bregar (to deal with), wepa, brutal (awesome), nene/nena, mano, boricua, al garete, revolú, chévere, ¿qué es la que hay?. Do NOT sanitize it into neutral Spanish.',
      },
      {
        id: 'mexican', label: 'Mexican', bcp47: 'es-MX', rtl: false, latin: true, roman: null,
        prompt: 'Mexican Spanish (central norm). Use Mexican idiom: órale, güey/wey, no manches, ¿qué onda?, ahorita, chido, padre (cool), neta, mande, chamba, la neta, sale, ándale, chingón (where register allows).',
      },
      {
        id: 'dominican', label: 'Dominican', bcp47: 'es-DO', rtl: false, latin: true, roman: null,
        prompt: 'Dominican Spanish. Aspirate/drop -s, Cibaeño "i" for syllable-final r/l where natural (poi favoi). Vocabulary: "qué lo que"/"klk", tíguere, chin (a little), vaina, jeva, concho, dique, manín, allofa, en olla (broke).',
      },
      {
        id: 'cuban', label: 'Cuban', bcp47: 'es-CU', rtl: false, latin: true, roman: null,
        prompt: 'Cuban Spanish (Havana norm). Aspirate -s, drop intervocalic -d- (cansao). Vocabulary: asere, ¿qué bolá?, jamar (to eat), guagua, pinchar (to work), yuma (foreigner/USA), chévere, acere qué volá, monina, la pincha.',
      },
      {
        id: 'castilian', label: 'Castilian (Spain)', bcp47: 'es-ES', rtl: false, latin: true, roman: null,
        prompt: 'Peninsular Castilian Spanish (Spain). Use vosotros, and peninsular vocabulary: vale, tío/tía, guay, mola, currar (to work), coche, ordenador, móvil, flipar, hostia (interjection), majo, en plan.',
      },
      {
        id: 'rioplatense', label: 'Rioplatense (ARG/URU)', bcp47: 'es-AR', rtl: false, latin: true, roman: null,
        prompt: 'Rioplatense Spanish (Buenos Aires / Montevideo). Voseo (vos tenés, vos sos, vení, mirá). Lunfardo: che, boludo/a, quilombo, laburo/laburar, pibe/mina, copado, posta, bondi, guita, chabón, re (intensifier).',
      },
      {
        id: 'colombian', label: 'Colombian', bcp47: 'es-CO', rtl: false, latin: true, roman: null,
        prompt: 'Colombian Spanish (Bogotá/Andean norm). Frequent "usted" even among friends. Vocabulary: parcero/parce, chévere, bacano, ¿quiubo/qué más?, berraco, guaro, chino/a (kid), listo, dar papaya, ¡qué nota!, hágale.',
      },
      {
        id: 'venezuelan', label: 'Venezuelan', bcp47: 'es-VE', rtl: false, latin: true, roman: null,
        prompt: 'Venezuelan Spanish (Caracas). Aspirate -s. Vocabulary: chamo/chama, pana, chévere, ¿qué más pana?, arrecho, burda (de) (a lot), coroto, guachimán, ladilla, na\' guará, épale.',
      },
      {
        id: 'chilean', label: 'Chilean', bcp47: 'es-CL', rtl: false, latin: true, roman: null,
        prompt: 'Chilean Spanish. Aspirate -s, Chilean voseo verb forms (cachái, querís, soi, estái), the particle "po" (sí po, ya po). Vocabulary: weón/weona, cachái, bacán, la raja, fome, pololo/polola, cuático, al tiro, caleta, luca (1000 pesos), la wea, ¿cómo estái?.',
      },
      {
        id: 'peruvian', label: 'Peruvian', bcp47: 'es-PE', rtl: false, latin: true, roman: null,
        prompt: 'Peruvian Spanish (Lima). Vocabulary: pata/causa (friend), bacán, chévere, jato (house), palta (avocado; "qué palta" = embarrassment), asu, habla causa, "pe" (filler: ya pe), chamba, misio (broke), pituco, jama (food).',
      },
      {
        id: 'us_spanglish', label: 'US Spanglish', bcp47: 'es-US', rtl: false, latin: true, roman: null,
        prompt: 'US Spanglish (Latino English/Spanish code-switching). Freely mix English and Spanish mid-sentence the way US Latinos actually do, and use adapted loanwords: parquear, textear, la troca, el rufo (roof), wachar, lonche, chequear, la carpeta (carpet), llamar pa\'trás. Natural bilingual code-switching, not merely calqued Spanish.',
      },
    ],
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    variants: [
      {
        id: 'brazilian_sp', label: 'Brazilian — São Paulo', bcp47: 'pt-BR', rtl: false, latin: true, roman: null,
        prompt: 'Brazilian Portuguese (São Paulo / paulistano). "você", gerund progressive (tô fazendo). Gíria: mano, tipo assim, da hora, meu, cara, então, beleza, mó (muito), véi.',
      },
      {
        id: 'carioca', label: 'Carioca (Rio)', bcp47: 'pt-BR', rtl: false, latin: true, roman: null,
        prompt: 'Carioca Portuguese (Rio de Janeiro). Gíria carioca: mermão, caraca, sinistro, maneiro, valeu, molecada, sangue bom, partiu, dahora, pô, é nóis, caô, bolado.',
      },
      {
        id: 'nordestino', label: 'Nordestino', bcp47: 'pt-BR', rtl: false, latin: true, roman: null,
        prompt: 'Northeastern Brazilian Portuguese (Nordestino). Idiom: oxe/oxente, vixe/vixe Maria, arretado, massa (cool), bicho, mainha/painho, avexado, cabra (guy), visse?, arre égua, danado.',
      },
      {
        id: 'european', label: 'European (Portugal)', bcp47: 'pt-PT', rtl: false, latin: true, roman: null,
        prompt: 'European Portuguese (Portugal). "tu" with EP conjugation, clitic placement, and EP vocabulary: fixe (cool), giro, pá, bué (a lot), gajo/gaja, malta, telemóvel, autocarro, se calhar, tá-se, ganda, foleiro.',
      },
      {
        id: 'angolan', label: 'Angolan', bcp47: 'pt-AO', rtl: false, latin: true, roman: null,
        prompt: 'Angolan Portuguese (Luanda). Kimbundu-influenced idiom: bué (a lot), maka (problem/argument), bazar (to leave), kota (elder/respected one), mboa (girl), camba (friend), fixe, garina, tá bar, bumbar (to work).',
      },
      {
        id: 'mozambican', label: 'Mozambican', bcp47: 'pt-MZ', rtl: false, latin: true, roman: null,
        prompt: 'Mozambican Portuguese (Maputo). Bantu (Changana/Ronga)-influenced idiom: maningue (very/a lot), bazar, xiladas, timba, gudza, machamba (farm plot), estás nice?, epá. Natural Mozambican phrasing.',
      },
      {
        id: 'cape_verdean_creole', label: 'Cape Verdean Creole', bcp47: 'pt-CV', rtl: false, latin: true, roman: null,
        prompt: 'Cape Verdean Creole (Kriolu, Sotavento / Santiago variety). This is a DISTINCT CREOLE, not Portuguese — do not write Portuguese. Examples of the target: "N ta fla-u" (I tell you), "bu sta dretu?" (are you ok?), "obrigadu", "nhos" (you all), "txiga" (enough/arrive), "undi ki bu sta?" (where are you?), "kre" (want), "ka ten" (there isn\'t). Use authentic Kriolu grammar and orthography (ALUPEC-style).',
      },
    ],
  },
  {
    id: 'french',
    name: 'French',
    variants: [
      {
        id: 'metropolitan', label: 'Metropolitan', bcp47: 'fr-FR', rtl: false, latin: true, roman: null,
        prompt: 'Metropolitan French (France). Standard Parisian norm with everyday argot/verlan where natural: mec, meuf, ouf, kiffer, bagnole, boulot, truc, ça marche, grave, chelou, relou, wesh.',
      },
      {
        id: 'quebecois', label: 'Québécois', bcp47: 'fr-CA', rtl: false, latin: true, roman: null,
        prompt: 'Québécois French. Joual features and Québec vocabulary: tsé, pantoute, char (car), blonde/chum, magasiner, dispendieux, c\'est le fun, pogner, jaser, icitte, ben là, correct, sacres (tabarnak, câlisse) where the register fits.',
      },
      {
        id: 'west_african', label: 'West African', bcp47: 'fr-CI', rtl: false, latin: true, roman: null,
        prompt: 'West African French (Abidjan-leaning, français populaire ivoirien / nouchi). Idiom: c\'est comment?, ça va aller, gclass, enjaillé, deuxième bureau, y\'a pas drap, gnaka, faroter, djô, môgô. Regional West African phrasing.',
      },
      {
        id: 'haitian_creole', label: 'Haitian Creole', bcp47: 'ht-HT', rtl: false, latin: true, roman: null,
        prompt: 'Haitian Creole (Kreyòl Ayisyen). A DISTINCT CREOLE, not French. Examples: "Kijan ou ye?" (how are you?), "M ap boule" (I\'m getting by), "sak pase / nap boule", "mwen/ou/li/nou/yo", "tanpri", "kounye a", "anpil", "gen". Use authentic Kreyòl grammar and standard IPN orthography.',
      },
    ],
  },
  {
    id: 'german',
    name: 'German',
    variants: [
      {
        id: 'hochdeutsch', label: 'Standard Hochdeutsch', bcp47: 'de-DE', rtl: false, latin: true, roman: null,
        prompt: 'Standard German (Hochdeutsch). Neutral standard German vocabulary and grammar as used in Germany.',
      },
      {
        id: 'austrian', label: 'Austrian', bcp47: 'de-AT', rtl: false, latin: true, roman: null,
        prompt: 'Austrian German (Österreichisches Deutsch). Austrian vocabulary and greetings: Grüß Gott, Servus, Sackerl, Paradeiser (tomato), Erdäpfel (potatoes), Jänner (January), leiwand, passt, oida, Semmerl, heuer.',
      },
      {
        id: 'swiss', label: 'Swiss', bcp47: 'de-CH', rtl: false, latin: true, roman: null,
        prompt: 'Swiss High German (Schweizerhochdeutsch — the written standard used in Switzerland). Use "ss" and never "ß". Helvetisms: Grüezi, Velo (bike), Natel (mobile), parkieren, Znüni, Zvieri, härzlich, Trottoir, allfällig, es hät.',
      },
    ],
  },
  {
    id: 'chinese',
    name: 'Chinese',
    variants: [
      {
        id: 'mandarin_simp_cn', label: 'Mandarin Simplified (Mainland)', bcp47: 'zh-CN', rtl: false, latin: false, roman: 'Hanyu Pinyin (with tone marks)',
        prompt: 'Mandarin Chinese, Simplified characters, Mainland China norm (普通话). Mainland vocabulary: 软件, 视频, 出租车, 土豆, 信息, 网络.',
      },
      {
        id: 'mandarin_trad_tw', label: 'Mandarin Traditional (Taiwan)', bcp47: 'zh-TW', rtl: false, latin: false, roman: 'Hanyu Pinyin (with tone marks)',
        prompt: 'Mandarin Chinese, Traditional characters, Taiwan norm (國語). Taiwanese vocabulary: 軟體, 影片, 計程車, 馬鈴薯, 資訊, 網路, and Taiwan Mandarin sentence particles (啦, 喔, 欸, 齁).',
      },
      {
        id: 'mandarin_trad_hk', label: 'Mandarin Traditional (Hong Kong)', bcp47: 'zh-TW', rtl: false, latin: false, roman: 'Hanyu Pinyin (with tone marks)',
        prompt: 'Standard written Chinese (Mandarin grammar) in Traditional characters, Hong Kong norm (書面語). Formal written Chinese as used in Hong Kong print — NOT colloquial Cantonese.',
      },
      {
        id: 'cantonese_trad', label: 'Cantonese Traditional', bcp47: 'zh-HK', rtl: false, latin: false, roman: 'Jyutping (with tone numbers)',
        prompt: 'Cantonese (廣東話 / 粵語), Traditional characters, Hong Kong. Use REAL spoken Cantonese grammar and vocabulary — NOT Mandarin written in traditional characters. Use Cantonese words and particles: 係/唔係, 喺, 嘅, 咗, 佢, 乜嘢, 點解, 而家, 嘢, 冇, 睇, 食飯, 唔該/多謝, 嘞, and sentence-final particles 啦/喇/㗎/囉/㗎啦/添/喎. Cantonese syntax throughout (e.g. 我食咗飯, 你去邊度).',
      },
    ],
  },
  {
    id: 'urdu',
    name: 'Urdu',
    variants: [
      {
        id: 'pakistani', label: 'Pakistani', bcp47: 'ur-PK', rtl: true, latin: false, roman: 'Urdu (Roman Urdu) transliteration',
        prompt: 'Urdu (Pakistan), Nastaʿlīq / Perso-Arabic script, right-to-left. Standard Pakistani Urdu vocabulary and Perso-Arabic register.',
      },
      {
        id: 'dakhini', label: 'Indian — Dakhini', bcp47: 'ur-IN', rtl: true, latin: false, roman: 'Roman transliteration',
        prompt: 'Dakhini Urdu (Hyderabad / Deccan, India), Urdu script, right-to-left. Dakhini features and vocabulary: "nakko" (no/don\'t), "hau" (yes), "kaiku" (why), "mereku/tereku" (to me/you), "potti/potta" (girl/boy), "hallu" (slowly), emphatic "ich", "kaiku ki". Reflect Deccani idiom, not standard Urdu.',
      },
    ],
  },
  {
    id: 'hindi',
    name: 'Hindi',
    variants: [
      {
        id: 'standard_devanagari', label: 'Standard Devanagari', bcp47: 'hi-IN', rtl: false, latin: false, roman: 'IAST/ITRANS transliteration',
        prompt: 'Standard Hindi in Devanagari script. Clear standard Hindi vocabulary and grammar.',
      },
      {
        id: 'hinglish', label: 'Hinglish (street code-mix)', bcp47: 'hi-IN', rtl: false, latin: true, roman: null,
        prompt: 'Hinglish — Hindi–English street code-mixing as spoken by urban Indian youth, WRITTEN IN ROMAN SCRIPT (Romanagari). Freely mix English and Hindi: "yaar", "matlab", "scene kya hai", "chill kar", "timepass", "ekdum", "bindaas", "full on", "bhai", "kya scene hai", "solid". Natural code-switching, not pure Hindi transliterated.',
      },
    ],
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    variants: [
      {
        id: 'standard', label: 'Standard', bcp47: 'gu-IN', rtl: false, latin: false, roman: 'Roman transliteration',
        prompt: 'Standard Gujarati in Gujarati script. Everyday Gujarati vocabulary and idiom (kem cho, majama, etc. where natural).',
      },
    ],
  },
  {
    id: 'punjabi',
    name: 'Punjabi',
    variants: [
      {
        id: 'indian_gurmukhi', label: 'Indian — Gurmukhi script', bcp47: 'pa-IN', rtl: false, latin: false, roman: 'Roman transliteration',
        prompt: 'Punjabi (India) in Gurmukhi script (left-to-right). East Punjabi (Majhi) vocabulary and idiom: ਕੀ ਹਾਲ, ਸੋਹਣਾ, ਯਾਰ, ਬਾਈ, ਚੱਕ ਦੇ.',
      },
      {
        id: 'pakistani_shahmukhi', label: 'Pakistani — Shahmukhi script', bcp47: 'pa-PK', rtl: true, latin: false, roman: 'Roman transliteration',
        prompt: 'Punjabi (Pakistan) in Shahmukhi (Perso-Arabic) script, right-to-left. Lahore/West Punjabi vocabulary and idiom written in Shahmukhi (کی حال اے، یار، بائی، سوہنا).',
      },
    ],
  },
  {
    id: 'hebrew',
    name: 'Hebrew',
    variants: [
      {
        id: 'modern', label: 'Modern Israeli', bcp47: 'he-IL', rtl: true, latin: false, roman: 'Latin transliteration',
        prompt: 'Modern Israeli Hebrew, right-to-left. Everyday spoken register with common slang where natural: סבבה, אחלה, וואלה, יאללה, חבל על הזמן, כאילו, פשוט, אח שלי, תכלס.',
      },
      {
        id: 'biblical', label: 'Biblical (Tanakh register)', bcp47: 'he-IL', rtl: true, latin: false, roman: 'Academic (SBL-style) transliteration',
        prompt: 'Biblical Hebrew (Tanakh register), right-to-left. Classical Biblical grammar and vocabulary: waw-consecutive narrative forms (וַיֹּאמֶר, וַיְהִי), elevated diction, classical syntax in the style of the Hebrew Bible. Consonantal text with standard vocalization.',
      },
    ],
  },
  {
    id: 'arabic',
    name: 'Arabic',
    variants: [
      {
        id: 'msa', label: 'MSA', bcp47: 'ar-SA', rtl: true, latin: false, roman: 'Academic transliteration',
        prompt: 'Modern Standard Arabic (الفصحى), right-to-left. Formal standard Arabic used in writing and news; correct iʿrāb-consistent phrasing.',
      },
      {
        id: 'egyptian', label: 'Egyptian', bcp47: 'ar-EG', rtl: true, latin: false, roman: 'Latin transliteration',
        prompt: 'Egyptian Arabic (مصري, Cairene), right-to-left. Real Egyptian dialect: إزيك, عامل إيه, إزاي, كده, عايز/عايزة, مش, خالص, أوي, يعني, حاجة, دلوقتي, عشان, معلش. Egyptian grammar and vocabulary, not MSA.',
      },
      {
        id: 'levantine', label: 'Levantine', bcp47: 'ar-LB', rtl: true, latin: false, roman: 'Latin transliteration',
        prompt: 'Levantine Arabic (شامي, Damascus/Beirut-leaning), right-to-left. Real Levantine: كيفك, شو, هلق, بدي, منيح, كتير, هيك, ليش, عنجد, شلونك, لسا, تمام. Levantine grammar/vocabulary, not MSA.',
      },
      {
        id: 'gulf', label: 'Gulf — Khaleeji', bcp47: 'ar-AE', rtl: true, latin: false, roman: 'Latin transliteration',
        prompt: 'Gulf Arabic (خليجي), right-to-left. Real Khaleeji: شلونك, وش/شنو, چذي/كذا, أبي/أبغى, وايد, زين, يبه, عساك, تراك, يالله, مب. Gulf grammar/vocabulary, not MSA.',
      },
      {
        id: 'darija', label: 'Moroccan Darija', bcp47: 'ar-MA', rtl: true, latin: false, roman: 'Latin transliteration',
        prompt: 'Moroccan Arabic (الدارجة), right-to-left. Real Darija: كيداير/كيدايرة, لاباس, بزاف, دابا, بغيت, واخا, شنو/آش, دْيال, ماشي, مزيان, صافي, بصح, ياك. Amazigh and French loanwords where natural. Not MSA.',
      },
    ],
  },
  {
    id: 'yoruba',
    name: 'Yoruba',
    variants: [
      {
        id: 'standard', label: 'Standard (tone marks)', bcp47: 'yo-NG', rtl: false, latin: true, roman: null,
        prompt: 'Standard Yoruba with FULL and correct tone marks and orthography: subdots (ẹ, ọ, ṣ) and tonal diacritics (à/á, è/é, ì/í, ò/ó, ù/ú, and combined subdot+tone like ẹ̀/ọ́). Natural Yoruba idiom (Báwo ni, ẹ jọ̀wọ́, o ṣé, etc.). The diacritics are mandatory, not optional.',
      },
    ],
  },
  {
    id: 'igbo',
    name: 'Igbo',
    variants: [
      {
        id: 'standard', label: 'Standard (diacritics)', bcp47: 'ig-NG', rtl: false, latin: true, roman: null,
        prompt: 'Standard Igbo (Igbo izugbe) with proper diacritics: dot-below vowels/consonant (ị, ọ, ụ, ṅ) and tonal/vowel marks where standard. Natural Igbo idiom (Kèdú, biko, daalụ, ọ dị mma). Include the diacritics correctly.',
      },
    ],
  },
  {
    id: 'hausa',
    name: 'Hausa',
    variants: [
      {
        id: 'standard_boko', label: 'Standard (Boko script)', bcp47: 'ha-NG', rtl: false, latin: true, roman: null,
        prompt: 'Standard Hausa in Boko (Latin) script with the hooked letters ɓ, ɗ, ƙ and glottalized ʼy where required. Natural Hausa idiom (Sannu, yaya kake/kike, na gode, madalla). Use the special characters correctly.',
      },
    ],
  },
  {
    id: 'swahili',
    name: 'Swahili',
    variants: [
      {
        id: 'kenyan', label: 'Kenyan', bcp47: 'sw-KE', rtl: false, latin: true, roman: null,
        prompt: 'Kenyan Swahili (coastal/national standard as used in Kenya). Standard Kiswahili with everyday Kenyan usage (habari, mambo, poa, sawa, karibu).',
      },
      {
        id: 'tanzanian', label: 'Tanzanian Standard', bcp47: 'sw-TZ', rtl: false, latin: true, roman: null,
        prompt: 'Tanzanian Standard Swahili (Kiswahili sanifu) — the purest/most standard register, as promoted in Tanzania. Prefer Swahili-origin vocabulary over English loanwords.',
      },
      {
        id: 'sheng', label: 'Sheng (Nairobi street)', bcp47: 'sw-KE', rtl: false, latin: true, roman: null,
        prompt: 'Sheng — Nairobi street slang mixing Swahili and English with coined vocabulary and shifting grammar. Use: mambo vipi, poa, buda/msee, manze, form ni gani, doo/chapaa (money), mbogi (crew), fiti, niaje, sasa, ndull, maze, githaa. Youth urban register, not standard Swahili.',
      },
    ],
  },
];

// Register options — these change the ACTUAL translation, not just a label.
const REGISTERS = {
  everyday: 'casual everyday speech, the way real people talk day-to-day',
  formal: 'a formal, polite, respectful register (address people courteously)',
  street: 'heavy street slang / very informal register, as used among close friends on the street',
};

function findVariant(langId, variantId) {
  const lang = LANGUAGES.find((l) => l.id === langId);
  if (!lang) return null;
  const variant = lang.variants.find((v) => v.id === variantId);
  if (!variant) return null;
  return { lang, variant };
}

// Client-safe config: everything except the server-only `prompt` strings.
function clientConfig() {
  return {
    languages: LANGUAGES.map((l) => ({
      id: l.id,
      name: l.name,
      variants: l.variants.map((v) => ({
        id: v.id,
        label: v.label,
        bcp47: v.bcp47,
        rtl: v.rtl,
        latin: v.latin,
      })),
    })),
    registers: Object.keys(REGISTERS),
  };
}

module.exports = { LANGUAGES, REGISTERS, findVariant, clientConfig };
