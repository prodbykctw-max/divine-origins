/* =============================================================
   sections/texts.js — Sacred Texts Section
   3D floating book shelf → click → detail panel slides up
   ============================================================= */

import { SACRED_TEXTS, getTextsByTradition } from '../../data/texts/sacred-texts.js';
import { TRADITION_GROUPS }                   from '../../data/traditions/groups.js';
import { artifact, captionHTML }              from '../ui/artifact.js';
import { state, setState }                    from '../state.js';
import { bindBookHover, scrollRailToItem }    from '../animations.js';

/* ── TRADITION FILTER STATE ── */
let activeTradFilter = 'all';
let selectedTextId   = null;

/* ── RENDER ENTRY POINT ── */
export function renderTexts() {
  const section = document.getElementById('section-texts');
  if (!section) return;

  section.innerHTML = buildTextsHTML();
  bindEvents();
}

/* ── BUILD SECTION HTML ── */
function buildTextsHTML() {
  return `
    <div class="section">
      <div class="container">
        <header class="section__header">
          <span class="section__eyeline">Every Canon · Every Apocrypha · Every Calendar</span>
          <h1 class="section__title">Sacred Texts Library</h1>
          <p class="section__desc">
            Every sacred book, scroll, and oral corpus across all traditions.
            Where each text is accepted, rejected, and what it says about the
            divine — including the books that were buried, burned, or forgotten.
          </p>
        </header>

        <!-- Tradition filter pills -->
        <div class="texts-filter" role="tablist" aria-label="Filter by tradition">
          <button class="filter-pill filter-pill--active"
                  role="tab" aria-selected="true"
                  data-filter="all">ALL TRADITIONS</button>
          ${buildFilterPills()}
        </div>
      </div>

      <!-- 3D Book Shelf — full width rail -->
      <div class="book-shelf" id="book-shelf" aria-label="Sacred texts book shelf">
        <div class="book-track" id="book-track" role="listbox" aria-label="Browse sacred texts">
          ${buildBookTrack('all')}
        </div>
      </div>

      <!-- Book Detail Panel — slides open below shelf -->
      <div class="container">
        <p class="book-hint">Select a book to open it.</p>
        <div class="book-detail" id="book-detail" role="region" aria-label="Text details" aria-hidden="true">
          <div class="book-detail__accent" id="book-detail-accent"></div>
          <div class="book-detail__inner">
            <div class="book-detail__preview" id="book-preview">
              <!-- Large cover + metadata -->
            </div>
            <div class="book-detail__content" id="book-content" role="article">
              <!-- Scrollable text entry -->
            </div>
          </div>
        </div>

        <!-- Calendar note callout -->
        <div class="calendar-callout" id="calendar-callout" style="display:none">
          <!-- Appears when selected text has a calendar system -->
        </div>
      </div>
    </div>
  `;
}

/* ── FILTER PILLS ── */
function buildFilterPills() {
  // Get traditions that have texts
  const traditionsWithTexts = [
    ...new Set(SACRED_TEXTS.map(t => t.tradition))
  ];

  return traditionsWithTexts.map(tradId => {
    const group = TRADITION_GROUPS.find(g => g.id === tradId);
    const label = group?.label ?? tradId.replace(/_/g, ' / ');
    const color = group?.color ?? '#c9a84c';
    return `
      <button class="filter-pill"
              role="tab"
              aria-selected="false"
              data-filter="${tradId}"
              style="--pill-color:${color}">
        ${label.toUpperCase()}
      </button>`;
  }).join('');
}

/* ── BUILD BOOK TRACK ── */
function buildBookTrack(filter) {
  const texts = filter === 'all'
    ? SACRED_TEXTS
    : SACRED_TEXTS.filter(t => t.tradition === filter);

  return texts.map((text, i) => buildBook(text, i)).join('');
}

/* ── BUILD SINGLE BOOK ── */
function buildBook(text, idx) {
  const group   = TRADITION_GROUPS.find(g => g.id === text.tradition);
  const color   = group?.color ?? '#c9a84c';
  const art     = artifact('texts', text.id);

  // Spine color is darker version of tradition color
  const spineColor = color + '88';

  const typeLabel = text.type.toUpperCase().replace('_', ' ');
  const isSelected = text.id === selectedTextId;

  return `
    <div class="book${isSelected ? ' selected' : ''}"
         role="option"
         aria-selected="${isSelected}"
         tabindex="0"
         data-text-id="${text.id}"
         style="--book-color:${color}22; --book-spine:${spineColor}; animation-delay:${idx * 0.04}s"
         aria-label="${text.title}">

      <!-- Spine -->
      <div class="book__spine">
        <span class="book__spine-text">${text.title}</span>
      </div>

      <!-- Cover -->
      <div class="book__cover">
        <div class="book__cover-face">
          ${art ? `<img class="book__cover-img" src="${art.small}" alt="" loading="lazy" decoding="async">` : ''}
          <div class="book__meta">
            <span class="book__type" style="color:${color}">${typeLabel}</span>
            <span class="book__title">${text.title}</span>
            <span class="book__date">${text.date}</span>
          </div>
        </div>
      </div>

      <!-- Page edges -->
      <div class="book__pages"></div>

    </div>
  `;
}

/* ── BUILD BOOK DETAIL PANEL ── */
function buildBookDetail(text) {
  const group   = TRADITION_GROUPS.find(g => g.id === text.tradition);
  const color   = group?.color ?? '#c9a84c';
  const art     = artifact('texts', text.id);

  const statusColors = {
    canonical:          '#40a8a0',
    deuterocanonical:   '#c9a84c',
    apocryphal:         '#8840c4',
    pseudepigraphical:  '#c44040',
    oral:               '#608050',
    lost:               '#5a5448',
  };
  const statusColor = statusColors[text.status] ?? '#c9a84c';

  const acceptedStr = text.acceptedBy?.length
    ? text.acceptedBy.join(', ')
    : 'No tradition formally canonizes this text';

  const rejectedStr = text.rejectedBy?.length
    ? text.rejectedBy.join(', ')
    : 'No major tradition explicitly rejects it';

  // Preview panel (left)
  const previewHTML = `
    <figure class="book-detail__artifact">
      ${art ? `<img src="${art.large}" srcset="${art.srcset}" sizes="(max-width: 720px) 90vw, 320px" alt="${art.title.replace(/"/g, '&quot;')}" loading="lazy" decoding="async">
      <figcaption class="art-cap">${captionHTML(art)}</figcaption>` : ''}
    </figure>
    <div style="text-align:center;width:100%">
      <div class="t-label" style="color:${color};margin-bottom:0.4rem">
        ${group?.label ?? text.tradition}
      </div>
      <div class="t-caption" style="color:${statusColor}">
        ● ${text.status.toUpperCase()}
      </div>
      <div class="t-caption" style="margin-top:0.6rem">
        ${text.language}
      </div>
    </div>
  `;

  // Content panel (right)
  const calendarSection = text.calendarNote ? `
    <div class="info-block info-block--texts" style="margin-top:1rem">
      <span class="info-block__label">📅 CALENDAR SYSTEM EMBEDDED IN THIS TEXT</span>
      <p>${text.calendarNote}</p>
    </div>
  ` : '';

  const conflictsSection = text.conflicts?.length ? `
    <div class="info-block info-block--tradition" style="margin-top:1rem">
      <span class="info-block__label">⚡ CALENDAR / CANON CONFLICTS</span>
      <ul style="padding-left:1rem;display:grid;gap:0.3rem">
        ${text.conflicts.map(c => `<li style="font-size:0.85rem;color:var(--text-secondary)">${c}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const sourcesSection = text.textSources?.length ? `
    <div class="info-block" style="border-color:var(--teal);margin-top:1rem">
      <span class="info-block__label" style="color:var(--teal)">📚 TEXTUAL SOURCES</span>
      <ul style="list-style:none;display:grid;gap:0.3rem">
        ${text.textSources.map(s => `
          <li style="font-family:var(--font-mono);font-size:0.69rem;letter-spacing:0.15em;
                     color:var(--teal);padding:0.25rem 0;
                     border-bottom:1px solid rgba(64,168,160,0.12)">${s}</li>
        `).join('')}
      </ul>
    </div>
  ` : '';

  const contentHTML = `
    <div class="t-caption" style="margin-bottom:0.4rem">${text.date}</div>
    <h2 class="t-title" style="font-size:1.5rem;margin-bottom:0.3rem;color:var(--text-primary)">${text.title}</h2>
    ${text.altTitles?.length ? `<p class="t-italic" style="margin-bottom:1.2rem;font-size:0.9rem">${text.altTitles.join(' · ')}</p>` : ''}

    <!-- Acceptance status -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-bottom:1.2rem">
      <div style="padding:0.6rem;background:rgba(64,168,160,0.06);border:1px solid rgba(64,168,160,0.2);border-radius:2px">
        <div class="t-label" style="color:var(--teal);margin-bottom:0.3rem">✓ CANONICAL IN</div>
        <p style="font-size:0.78rem;color:var(--text-secondary)">${acceptedStr}</p>
      </div>
      <div style="padding:0.6rem;background:rgba(136,64,196,0.06);border:1px solid rgba(136,64,196,0.2);border-radius:2px">
        <div class="t-label" style="color:var(--violet);margin-bottom:0.3rem">✗ EXCLUDED FROM</div>
        <p style="font-size:0.78rem;color:var(--text-secondary)">${rejectedStr}</p>
      </div>
    </div>

    <!-- Main note -->
    <div class="info-block info-block--scholarly">
      <span class="info-block__label">SCHOLARLY ACCOUNT</span>
      <p>${text.note}</p>
    </div>

    ${calendarSection}
    ${conflictsSection}
    ${sourcesSection}
  `;

  return { previewHTML, contentHTML, color };
}

/* ── EVENT BINDING ── */
function bindEvents() {
  // Filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeTradFilter = pill.dataset.filter;
      selectedTextId   = null;

      document.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.remove('filter-pill--active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('filter-pill--active');
      pill.setAttribute('aria-selected', 'true');

      const track = document.getElementById('book-track');
      if (track) {
        track.innerHTML = buildBookTrack(activeTradFilter);
        bindBookEvents();
      }
      closeBookDetail();
    });
  });

  bindBookEvents();
}

function bindBookEvents() {
  document.querySelectorAll('.book').forEach(bookEl => {
    bindBookHover(bookEl);

    bookEl.addEventListener('click',  () => selectBook(bookEl.dataset.textId));
    bookEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectBook(bookEl.dataset.textId);
      }
    });
  });
}

/* ── SELECT BOOK ── */
function selectBook(textId) {
  if (selectedTextId === textId) {
    closeBookDetail();
    return;
  }

  selectedTextId = textId;
  const text = SACRED_TEXTS.find(t => t.id === textId);
  if (!text) return;

  // Update book selected states
  document.querySelectorAll('.book').forEach(b => {
    const isThis = b.dataset.textId === textId;
    b.classList.toggle('selected', isThis);
    b.setAttribute('aria-selected', String(isThis));
  });

  // Scroll selected book into view
  const selectedEl = document.querySelector(`.book[data-text-id="${textId}"]`);
  const track = document.getElementById('book-track');
  if (selectedEl && track) scrollRailToItem(track, selectedEl);

  // Build and inject detail
  const { previewHTML, contentHTML, color } = buildBookDetail(text);

  const detailEl  = document.getElementById('book-detail');
  const accentEl  = document.getElementById('book-detail-accent');
  const previewEl = document.getElementById('book-preview');
  const contentEl = document.getElementById('book-content');

  if (accentEl)  accentEl.style.background = `linear-gradient(90deg, ${color}, transparent)`;
  if (previewEl) previewEl.innerHTML = previewHTML;
  if (contentEl) contentEl.innerHTML = contentHTML;

  if (detailEl) {
    detailEl.classList.add('open');
    detailEl.setAttribute('aria-hidden', 'false');
    // Scroll into view smoothly
    setTimeout(() => detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
}

/* ── CLOSE DETAIL ── */
function closeBookDetail() {
  selectedTextId = null;
  document.querySelectorAll('.book').forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-selected', 'false');
  });
  const detailEl = document.getElementById('book-detail');
  if (detailEl) {
    detailEl.classList.remove('open');
    detailEl.setAttribute('aria-hidden', 'true');
  }
}
