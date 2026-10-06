/* =============================================================
   sections/patterns.js — The Pattern (Cross-Tradition Parallels)
   ============================================================= */


import { initScrollReveals } from '../animations.js';

export function renderPatterns() {
  const section = document.getElementById('section-patterns');
  if (!section) return;

  section.innerHTML = `
    <div class="section">
      <div class="container">
        <header class="section__header">
          <span class="section__eyeline">The Connections Others Overlooked</span>
          <h2 class="section__title">The Pattern</h2>
          <p class="section__desc">
            These parallel chains exist across traditions, across millennia, across continents.
            The evidence is presented as it stands. You decide what it means.
          </p>
        </header>

        <div style="display:grid;gap:2px;background:var(--border);border:1px solid var(--border)">
          ${PATTERNS.map((p, i) => buildPatternBlock(p, i)).join('')}
        </div>

        <!-- 8 Common Truths -->
        <div style="margin-top:4rem">
          <header class="section__header">
            <span class="section__eyeline">What Remains Constant</span>
            <h2 class="section__title">8 Universal Patterns</h2>
            <p class="section__desc">After examining every tradition, these appear so universally they demand engagement.</p>
          </header>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem">
            ${TRUTHS.map((t, i) => `
              <div class="reveal-up glass-subtle" style="padding:2rem;border-radius:3px;animation-delay:${i * 0.08}s">
                <div style="font-family:var(--font-display);font-size:2rem;color:var(--text-dim);line-height:1;margin-bottom:0.75rem">${t.n}</div>
                <div class="t-label" style="color:var(--gold);margin-bottom:0.6rem">${t.title}</div>
                <p class="t-body" style="font-size:0.88rem">${t.body}</p>
                <div style="margin-top:0.8rem;padding-top:0.8rem;border-top:1px solid var(--border)">
                  <div class="t-caption" style="margin-bottom:0.3rem">Across traditions</div>
                  <p style="font-size:0.75rem;font-style:italic;color:var(--text-dim)">${t.examples}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind accordion toggles
  section.querySelectorAll('[data-pattern-toggle]').forEach(header => {
    header.addEventListener('click', () => {
      const id   = header.dataset.patternToggle;
      const body = document.getElementById(`pat-body-${id}`);
      const icon = document.getElementById(`pat-icon-${id}`);
      if (!body) return;
      const open = body.style.display !== 'none';
      body.style.display = open ? 'none' : 'block';
      if (icon) icon.textContent = open ? '+' : '−';
    });
  });

  setTimeout(initScrollReveals, 100);
}

function buildPatternBlock(p, i) {
  const chainHTML = p.chain.map((c, ci) => {
    const badgeClass = c.evidence === 'documented' ? 'badge--documented'
                     : c.evidence === 'debated'    ? 'badge--debated'
                     :                               'badge--tradition';
    const badgeLabel = c.evidence === 'documented' ? '✓ DOCUMENTED'
                     : c.evidence === 'debated'    ? '~ DEBATED'
                     :                               '◈ TRADITION';
    return `
      <div style="background:var(--deep);padding:1.2rem 1.5rem;border-left:2px solid ${
        c.evidence === 'documented' ? 'var(--teal)' : c.evidence === 'debated' ? 'var(--gold)' : 'var(--violet)'
      };position:relative;margin-bottom:1px">
        <div style="display:flex;align-items:center;gap:0.8rem;flex-wrap:wrap;margin-bottom:0.4rem">
          <span class="t-caption" style="color:var(--text-dim)">${c.era}</span>
          <span class="t-title" style="font-size:0.95rem;color:var(--text-primary)">${c.name}</span>
          <span class="t-caption" style="color:var(--gold-dim)">${c.tradition}</span>
          <span class="badge ${badgeClass}" style="margin-left:auto">${badgeLabel}</span>
        </div>
        <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.65">${c.note}</p>
        ${ci < p.chain.length - 1 ? `<div style="position:absolute;bottom:-10px;left:1.5rem;color:${p.color};font-size:0.9rem;z-index:1">↓</div>` : ''}
      </div>`;
  }).join('');

  return `
    <div style="background:var(--layer);border-left:3px solid ${p.color}">
      <div data-pattern-toggle="${i}"
           style="padding:2rem 2.5rem;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:2rem">
        <div>
          <div class="t-caption" style="color:var(--text-secondary);margin-bottom:0.6rem">Pattern ${i + 1} of ${PATTERNS.length}</div>
          <h3 class="t-title" style="font-size:1.2rem;margin-bottom:0.6rem">${p.title}</h3>
          <p class="t-body" style="font-size:0.88rem;max-width:780px">${p.intro}</p>
        </div>
        <span id="pat-icon-${i}" style="font-family:var(--font-mono);font-size:1.2rem;color:${p.color};flex-shrink:0">+</span>
      </div>

      <div id="pat-body-${i}" style="display:none;padding:0 2.5rem 2.5rem">
        <div style="margin-bottom:1.5rem">${chainHTML}</div>
        <div style="padding:1.2rem 1.5rem;background:rgba(0,0,0,0.25);border:1px solid ${p.color}33;border-left:3px solid ${p.color}">
          <div class="t-label" style="color:${p.color};margin-bottom:0.6rem">What this means: you decide</div>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7">${p.conclusion}</p>
        </div>
      </div>
    </div>`;
}

/* ── PATTERNS DATA (inline here to avoid another file) ── */
const PATTERNS = [
  {
    color: '#86bba6',
    title: 'The Dying & Rising God — One Unbroken Chain',
    intro: 'The same story appears in writing across 4,000 years and every inhabited continent. A divine being dies, descends to the underworld, and returns. The progression in the written record is documented.',
    chain: [
      { era:'c.2600 BCE', name:'Tammuz / Dumuzi', tradition:'Sumerian', evidence:'documented', note:'Oldest written dying-god narrative. Shepherd-god. Dies annually, descends, returns with the rains. Women wept for Tammuz at the Jerusalem Temple gate — documented in Ezekiel 8:14.' },
      { era:'c.2400 BCE', name:'Osiris', tradition:'Egyptian', evidence:'documented', note:'Murdered by Set. Dismembered into 14 pieces. Reassembled by Isis. Resurrected. Rules the dead. Every pharaoh becomes Osiris at death. Three-day entombment. Prior in writing to all later parallels.' },
      { era:'c.1400 BCE', name:'Baal', tradition:'Canaanite', evidence:'documented', note:'Storms, rain, fertility. Dies in battle with Mot (Death). Earth withers. Sister Anat battles Mot. Baal returns. The Hebrew prophets condemned Baal worship alongside Yahweh worship in ancient Israel.' },
      { era:'c.600 BCE', name:'Dionysus', tradition:'Greek', evidence:'documented', note:'Son of Zeus and a mortal woman. Dismembered by Titans. Resurrected. God of the vine — all things that die in winter and return in spring. Mystery cult involved death-and-rebirth initiation.' },
      { era:'c.33 CE', name:'The Christos / Jesus', tradition:'Christian / Gnostic', evidence:'debated', note:'Son of God and mortal woman. Executed. Three days in the tomb. Resurrection. Justin Martyr (2nd century CE) ACKNOWLEDGED the parallels to dying-god cults and argued Satan planted them in advance to confuse people — confirming the parallels were recognized from the beginning.' },
    ],
    conclusion: 'Justin Martyr and Tertullian both acknowledged these parallels — and argued they were planted by the devil in advance. That explanation requires accepting the parallels are real. Whether these represent: (A) cultural diffusion of one original story, (B) independent responses to the universal experience of seasons and mortality, or (C) evidence of an actual cosmic reality expressed through multiple traditions — remains genuinely open.',
  },
  {
    color: '#c98f6b',
    title: 'El Elyon, Yahweh, and the Sons of God — What the Text Actually Says',
    intro: 'The Dead Sea Scrolls contain a version of Deuteronomy 32:8-9 that differs dramatically from most Bibles today. The difference has profound implications for who Yahweh is and where he came from.',
    chain: [
      { era:'c.1400 BCE', name:'El — Supreme Father of the Canaanite Pantheon', tradition:'Ugaritic / Canaanite', evidence:'documented', note:'El presides over the divine assembly. His consort is Asherah. Inscriptions from ancient Israel read "Yahweh and his Asherah" — confirming El\'s wife was once associated with Yahweh. The name Elohim (plural of El) is the Hebrew word for God.' },
      { era:'c.1000 BCE', name:'Deuteronomy 32:8-9 — the Dead Sea Scrolls Version', tradition:'Hebrew', evidence:'documented', note:'MASORETIC TEXT: "…according to the number of the sons of ISRAEL." DEAD SEA SCROLLS (4QDeut-j): "…according to the number of the SONS OF GOD." The Septuagint (c.250 BCE) also reads "sons of God." Implication: El Elyon divides the nations among his divine sons — Israel is Yahweh\'s allotted portion. This means Yahweh was originally one of El Elyon\'s sons, not El Elyon himself.' },
      { era:'c.900 BCE', name:'Psalm 82 — God Judges the Divine Council', tradition:'Hebrew', evidence:'documented', note:'"God stands in the divine assembly; he judges among the gods." The lesser gods have judged unjustly. El Elyon declares: "You are gods, children of the Most High, all of you — nevertheless you will die like men." This is in every Bible. It is rarely centered in mainstream theology.' },
      { era:'c.200 CE', name:'Yaldabaoth — the Gnostic Identification', tradition:'Gnostic', evidence:'tradition', note:'Gnostic texts identify the god who says "I am a jealous God and there is no other beside me" (Exodus 20:5) as Yaldabaoth — blind to the True God above him. The Apocryphon of John records Sophia responding from above: "You are wrong, Samael" (Blind God). The Gnostics were reading the same scriptures. They drew different conclusions.' },
    ],
    conclusion: 'The textual evidence is real and academically established. The DSS variant is documented. Psalm 82 is in every Bible. What these texts mean — whether they reveal a genuine theological evolution from henotheism to monotheism, or preserve fragments of a more ancient truth — is yours to determine. Scholars Frank Moore Cross, Mark Smith, Michael Heiser, and John Day have all written on this. None are fringe figures.',
  },
  {
    color: '#7f8aa6',
    title: 'The Forbidden Knowledge Pattern — Who Gives It, Who Punishes the Giving',
    intro: 'Across every tradition: a divine being offers humanity elevated knowledge — of our own nature, our own power, our connection to the divine. The ruling order punishes both giver and receivers.',
    chain: [
      { era:'c.2600 BCE', name:'Enki warns Utnapishtim of the Flood', tradition:'Sumerian', evidence:'documented', note:'Enlil decrees the destruction of all humanity. Enki — humanity\'s greatest friend — speaks the warning through a wall, technically not disobeying the divine council\'s decree. He finds the gap in the law. Humanity survives. Enki consistently subverts divine consensus to protect human life.' },
      { era:'c.700 BCE', name:'Prometheus — Fire and Civilization', tradition:'Greek', evidence:'documented', note:'Prometheus stole fire from the gods and gave it to humans. Chained to a rock for eternity — liver eaten daily by an eagle, regenerated each night, so the punishment could never end. Fire in Greek thought = divine intelligence itself. Prometheus gave humanity the capacity for civilization and self-awareness. He was tortured for it.' },
      { era:'c.300 BCE', name:'Azazel and the Watchers — Book of Enoch', tradition:'Hebrew / Ethiopian', evidence:'documented', note:'The sons of God descended and taught humanity: metallurgy, weaponry, astrology, cosmetics, enchantments. They were condemned. Azazel was bound hand and foot and cast into darkness. On the Day of Judgment he will be cast into fire. His crime: teaching humans what they were not supposed to know. The complete text survives ONLY in the Ethiopian Orthodox canon.' },
      { era:'Narrative time', name:'The Serpent — Garden of Eden', tradition:'Hebrew / Gnostic', evidence:'debated', note:'STANDARD READING: Serpent deceives Eve; Fall is catastrophic. GNOSTIC READING: Yahweh (Yaldabaoth) forbade knowledge because he knew: "on the day you eat of it, you shall be as gods." His fear, not their sin. The Serpent told the truth. They were expelled not as punishment but as containment: "Lest he put out his hand and take also from the tree of life" (Genesis 3:22). The expulsion was prevention. Both readings come from the same text.' },
    ],
    conclusion: 'Every version has the same structure: divine being offers knowledge → ruling power punishes giver and receivers → knowledge cannot be unlearned. Whether this reflects actual cosmic politics (Gnostic view), natural human psychology (Jungian view), or preserved memory of actual historical suppression — the pattern is real across every tradition that has ever existed.',
  },
  {
    color: '#c060a0',
    title: 'The Divine Feminine — Present Everywhere, Removed from One Place',
    intro: 'Every ancient tradition had a divine feminine at or near the top of the cosmic hierarchy. Then one tradition — which became the dominant framework of Western civilization — systematically removed her. The archaeological evidence of her presence was literally buried.',
    chain: [
      { era:'c.3200 BCE', name:'Inanna — Queen of Heaven and Earth', tradition:'Sumerian', evidence:'documented', note:'Co-equal with An. Goddess of love, war, justice, and the underworld. The oldest known human author — Enheduanna (c.2285 BCE), daughter of Sargon of Akkad — wrote hymns to Inanna. The oldest named author. She wrote to a goddess.' },
      { era:'c.1400 BCE', name:'Asherah — Wife of El, then of Yahweh', tradition:'Canaanite / Hebrew', evidence:'documented', note:'Kuntillet Ajrud inscription (c.800 BCE, Sinai desert): "I bless you by Yahweh of Samaria and his Asherah." The Asherah poles condemned throughout the Hebrew Bible were her sacred symbols — present in Israelite worship, including at times in the Jerusalem Temple itself. The prophets\' ferocity in condemning her confirms how widespread it was.' },
      { era:'c.600–500 BCE', name:'The Removal — Deuteronomic Reform', tradition:'Hebrew', evidence:'debated', note:'During and after the Babylonian exile, Deuteronomic reformers systematically removed the divine feminine. Asherah was eliminated. The Shekinah (grammatically feminine in Hebrew) became her surviving trace. In Kabbalah she returned as Shekinah, Shabbat bride, and Malkhut — the lowest Sefirah, exiled from the divine fullness.' },
      { era:'c.367 CE', name:'Nag Hammadi Texts Buried', tradition:'Gnostic', evidence:'documented', note:'Gnostic Christianity placed Sophia at the center of the cosmic drama. The Gospel of Philip presents Mary Magdalene as the disciple Jesus loved most. The Nag Hammadi texts were buried c.367 CE — the same year Athanasius ordered heretical books destroyed. Someone buried them to preserve them. They stayed hidden for 1,578 years.' },
    ],
    conclusion: 'The divine feminine is present in every tradition on earth. Inscriptions, archaeology, and the Hebrew Bible itself contain evidence of her presence in ancient Israelite worship. The systematic removal of the divine feminine from the dominant Western religious tradition is one of the most consequential theological decisions in human history — and the evidence of what was removed is still in the text, in the ground, and in the traditions that preserved what others discarded.',
  },
  {
    color: '#6fae98',
    title: 'The Sacred Numbers — 7, 12, 40, 72 Across All Traditions',
    intro: 'Certain numbers appear across every tradition in contexts that cannot be explained by coincidence or trade contact alone. 7, 12, 40, and 72 appear with identical theological significance across Sumerian, Egyptian, Hebrew, Gnostic, Hindu, Norse, Native American, and Chinese traditions.',
    chain: [
      { era:'Universal', name:'The Number 7', tradition:'All traditions', evidence:'documented', note:'7 planetary archons (Gnostic) · 7 Anunnaki who judge the dead (Sumerian) · 7 Sefirot of construction (Kabbalah) · 7 days of creation (Hebrew) · 7 heavens (Islamic, Jewish mysticism) · 7 chakras (Hindu/Yogic) · 7 musical notes · 7 colors of visible light · 7 tones in Russell\'s periodic system · 7 days named after 7 planets · 7 gates of Inanna\'s descent. Walter Russell\'s 7-tone octave is the fundamental unit of all wave motion in the universe.' },
      { era:'Universal', name:'The Number 12', tradition:'All traditions', evidence:'documented', note:'12 Olympians · 12 Tribes of Israel · 12 Apostles · 12 Anunnaki · 12 signs of the Zodiac · 12 months · 12 hours of day / 12 of night in Ra\'s journey · 12 astrological houses · 12 Knights of the Round Table. The Zodiac and its 12 divisions appears in Babylonian, Egyptian, Greek, Hindu, and Chinese traditions — one of humanity\'s oldest common knowledge systems.' },
      { era:'Universal', name:'The Number 40', tradition:'Semitic / Christian / Islamic', evidence:'documented', note:'40 days and nights of the Flood · 40 years in the wilderness · 40 days of Moses on Sinai · 40 days of Jesus\'s temptation · 40 days of Lent · 40-day mourning period (Islamic) · Origin of the English word "quarantine" (quaranta giorni = 40 days). 40 consistently marks a complete period of trial, transformation, or purification.' },
      { era:'Universal', name:'The Number 72 / 144,000', tradition:'Multiple', evidence:'debated', note:'72 names of God (Kabbalah — from Exodus 14:19-21, each verse 72 letters) · 72 nations (Genesis 10) · 72 disciples of Jesus (Luke 10:1) · 72 demons of the Goetia · 72 conspirators killed Osiris (Plutarch) · 72 years per 1 degree of precession of equinoxes. 144,000 = 72 × 2,000. Appears in Revelation as those sealed for salvation. Russell\'s system also produces these same mathematical constants.' },
    ],
    conclusion: 'These number patterns cannot be dismissed. 7 and 12 are embedded in our calendar, our music, our astronomy, and our theology simultaneously — in every culture. Either the ancients independently discovered the same mathematical structures in nature and encoded them religiously (secular explanation), or these numbers represent genuine universal constants of reality that were known by a common source (esoteric explanation). Walter Russell\'s system — built independently through direct intuitive experience — produces the same numbers: 7 tones, 9 octaves, the mathematical constants of wave motion. That correspondence is worth examining carefully.',
  },
];

const TRUTHS = [
  { n:'I',    title:'The Hierarchy of Being',          body:'Without exception, every documented tradition describes multiple layers of divine reality between the ultimate source and humanity. The supreme principle delegates to intermediate beings who create and govern the material world.', examples:'Anunnaki (Sumerian) · Ennead (Egyptian) · Bene Elohim (Hebrew) · Aeons of the Pleroma (Gnostic) · 12 Olympians (Greek) · Trimurti + Devas (Hindu) · Aesir/Vanir (Norse) · 401 Orisha (Yoruba)' },
  { n:'II',   title:'The Divine Spark within',         body:'Every tradition holds that humans contain something divine — a fragment of the ultimate source trapped in or expressed through material form. The divine spark is not earned; it is inherent to human nature.', examples:'Neshamah (Hebrew) · Divine Spark of Sophia (Gnostic) · Atman = Brahman (Hindu) · Ba/Ka (Egyptian) · Buddha Nature (Buddhist) · Ori (Yoruba) · Tonalli (Aztec) · Odin\'s breath (Norse)' },
  { n:'III',  title:'The Dying & Rising God',          body:'A divine being dies and returns — governing the cycle of life, seasons, and spiritual transformation. This pattern appears independently across cultures separated by thousands of miles and thousands of years.', examples:'Tammuz (Sumerian) · Osiris (Egyptian) · Baal (Canaanite) · Dionysus (Greek) · Balder (Norse) · Quetzalcoatl (Aztec) · The Christos (Christian/Gnostic)' },
  { n:'IV',   title:'The Forbidden Knowledge Pattern', body:'A divine being offers humanity elevated knowledge and is punished for doing so. Enki, Prometheus, Azazel, the Serpent — all offer knowledge the ruling divine order wants kept hidden.', examples:'Enki (Sumerian) · Prometheus (Greek) · Azazel (Book of Enoch) · The Serpent (Hebrew/Gnostic) · Sophia (Gnostic) · Quetzalcoatl (Aztec) · Odin seeking wisdom (Norse)' },
  { n:'V',    title:'Wisdom is Feminine',              body:'Across all traditions, the wisdom principle has a feminine face. The masculine principle creates and destroys; the feminine principle knows, preserves, and redeems.', examples:'Sophia (Gnostic) · Isis (Egyptian) · Athena (Greek) · Saraswati (Hindu) · Shekinah (Kabbalistic) · Inanna (Sumerian) · Oshun (Yoruba) · Prajnaparamita (Buddhist)' },
  { n:'VI',   title:'Creation through Vibration',      body:'Creation universally begins with sound, breath, word, or vibration — not physical action. "Let there be light" (Hebrew); Ptah creates through utterance (Egyptian); Om as primordial vibration (Hindu); Amma creates through vibration (Dogon); Songlines sustain existence (Aboriginal Australian).', examples:'"Let there be light" (Hebrew) · Ptah\'s utterance (Egyptian) · Om/Nada Brahman (Hindu) · Logos/Word (Greek/Christian) · Amma\'s vibration (Dogon) · Songlines (Aboriginal) · Io\'s breath (Māori) · Russell\'s Thinking Mind' },
  { n:'VII',  title:'The Supreme is beyond all Names', body:'The highest principle in every tradition resists naming. The Tao that can be told is not the eternal Tao. Ain Soph: Without Limit. The Monad: beyond all predication. Brahman: Neti Neti. Wakan Tanka: The Great Mystery.', examples:'Ain Soph (Kabbalah) · The Tao (Taoist) · The Monad (Gnostic) · Brahman / Neti Neti (Hindu) · Wakan Tanka: Great Mystery (Lakota) · YHWH unspeakable (Hebrew) · Olodumare: too vast to approach directly (Yoruba)' },
  { n:'VIII', title:'The Path Always Goes Inward',     body:'"The Kingdom of Heaven is within you" (Jesus). "Atman is Brahman" (Hindu). "Look into the nature of mind" (Buddhist). The vision quest goes inward (Lakota). The Dreaming is always accessible within (Aboriginal). Every genuine mystical tradition converges: inward.', examples:'Jesus: "The Kingdom is within you" (Luke 17:21) · Upanishads: cave of the heart · Buddhist: "Look into the nature of mind" · Lakota vision quest · Aboriginal: Dreaming always present · Kabbalistic ascent of the Tree of Life' },
];
