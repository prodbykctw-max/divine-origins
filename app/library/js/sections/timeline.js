/* =============================================================
   sections/timeline.js — Chronological Record
   ============================================================= */

import { SACRED_TEXTS, getTextsByDate } from '../../data/texts/sacred-texts.js';
import { initScrollReveals }            from '../animations.js';

export function renderTimeline() {
  const section = document.getElementById('section-timeline');
  if (!section) return;

  const sorted = getTextsByDate();

  // Also include tradition milestones not in text list
  const milestones = [
    { dateSortKey: -60000, title: 'Aboriginal Australian Dreaming Tradition Begins', tradition: 'Indigenous', confidence: 'documented', desc: 'The oldest continuous spiritual tradition on Earth. Songlines, Ancestor Beings, sacred land theology. Oral tradition preserved for 60,000+ years before any writing system existed.', source: 'Archaeological evidence for continuous culture; paleoanthropology' },
    { dateSortKey: -3500,  title: 'An / Anu First Referenced in Cuneiform', tradition: 'Mesopotamian', confidence: 'documented', desc: 'Earliest cuneiform tablets from Uruk reference An as supreme sky deity. The divine council (Anunnaki) enters the written record.', source: 'Uruk period tablets; ETCSL corpus' },
    { dateSortKey: -840,   title: 'Mesha Stele — First Extrabiblical Mention of Yahweh', tradition: 'Hebrew', confidence: 'documented', desc: 'A Moabite king\'s victory inscription mentions Yahweh directly — the oldest extrabiblical reference to the Hebrew God. Now in the Louvre.', source: 'Mesha Stele, Jordan (c.840 BCE)' },
    { dateSortKey: 1945,   title: 'Nag Hammadi Library Discovered', tradition: 'Gnostic', confidence: 'documented', desc: 'December 1945: Farmers near Nag Hammadi, Egypt, discover 52 Gnostic texts in a clay jar — buried since c.367 CE. One of the most significant religious discoveries of the modern era.', source: 'Nag Hammadi Library; Elaine Pagels, The Gnostic Gospels (1979)' },
    { dateSortKey: 1947,   title: 'Dead Sea Scrolls Discovered', tradition: 'Hebrew', confidence: 'documented', desc: 'A Bedouin shepherd discovers scrolls in a cave near Qumran. 11 caves yield 981 manuscripts — including the oldest surviving Hebrew Bible texts and the Enochian 364-day calendar community\'s sectarian documents.', source: 'Dead Sea Scrolls, Qumran (1947–1956)' },
  ];

  const allItems = [
    ...milestones.map(m => ({ ...m, isMilestone: true })),
    ...sorted.map(t => ({
      dateSortKey: t.dateSortKey,
      title:       t.title,
      tradition:   t.tradition,
      confidence:  t.status === 'canonical' ? 'documented' : t.status === 'apocryphal' ? 'debated' : 'documented',
      desc:        t.note,
      source:      t.textSources?.[0] ?? '',
      language:    t.language,
      isMilestone: false,
    })),
  ].sort((a, b) => a.dateSortKey - b.dateSortKey);

  section.innerHTML = `
    <div class="section">
      <div class="container--narrow">
        <header class="section__header">
          <span class="section__eyeline">Oldest Known Sources First</span>
          <h2 class="section__title">From the Beginning of the Record</h2>
          <p class="section__desc">
            Ordered by earliest documented evidence. Oral traditions predate all writing —
            the oldest written text is not necessarily the oldest belief.
          </p>
        </header>

        <!-- Timeline -->
        <div style="position:relative;padding-left:2.5rem">
          <!-- Vertical line -->
          <div style="position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,var(--gold-dim),transparent);opacity:0.3"></div>

          ${allItems.map((item, i) => buildTimelineItem(item, i)).join('')}
        </div>
      </div>
    </div>
  `;

  setTimeout(initScrollReveals, 100);
}

function buildTimelineItem(item, i) {
  const dateStr = item.dateSortKey < 0
    ? `c. ${Math.abs(item.dateSortKey).toLocaleString()} BCE`
    : item.dateSortKey <= 100
    ? `c. ${item.dateSortKey} CE`
    : `${item.dateSortKey} CE`;

  const dotColor = item.confidence === 'documented' ? 'var(--teal)'
                 : item.confidence === 'debated'    ? 'var(--gold)'
                 :                                    'var(--violet)';

  const badgeClass = item.confidence === 'documented' ? 'badge--documented'
                   : item.confidence === 'debated'    ? 'badge--debated'
                   :                                    'badge--tradition';

  return `
    <div class="reveal-up" style="position:relative;margin-bottom:2.5rem;animation-delay:${Math.min(i, 30) * 0.06}s">

      <!-- Dot on the line -->
      <div style="position:absolute;left:-2.9rem;top:0.35rem;width:9px;height:9px;border-radius:50%;
                  background:${dotColor};border:2px solid var(--void);
                  box-shadow:0 0 0 1px ${dotColor}44;transition:box-shadow 0.3s">
      </div>

      <div class="t-caption" style="color:var(--gold-dim);margin-bottom:0.25rem">${dateStr}</div>

      <div style="display:flex;align-items:baseline;gap:0.6rem;flex-wrap:wrap;margin-bottom:0.2rem">
        <span class="t-title" style="font-size:1rem;color:var(--text-primary)">${item.title}</span>
        <span class="badge ${badgeClass}" style="font-size:0.631rem">${item.confidence.toUpperCase()}</span>
      </div>

      <div class="t-caption" style="color:var(--text-dim);margin-bottom:0.45rem">
        ${item.tradition}
        ${item.language ? `· ${item.language}` : ''}
      </div>

      <p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.65">${item.desc}</p>

      ${item.source ? `<div class="t-caption" style="color:var(--teal);margin-top:0.4rem">Source: ${item.source}</div>` : ''}
    </div>`;
}
