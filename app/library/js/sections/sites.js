/* =============================================================
   sections/sites.js — Holy Sites
   1. Deep dives: the famous sites, relics and mysteries, each with
      what it is / what the lost-history side claims / the evidence.
   2. Every recorded site: all places of worship and sacred sites on
      Wikidata (temples, shrines, churches, mosques, synagogues,
      megaliths, sacred mountains...), loaded one country or one
      dedicated god or saint at a time from sites/.
   ============================================================= */

import { DEEP_DIVES, SITE_REGIONS, SITE_KINDS } from '../../data/sites/deep-dives.js';
import { siteArtifact }                        from '../../data/sites/deep-dive-images.js';
import { captionHTML }                          from '../ui/artifact.js';
import { TRADITION_GROUPS }                     from '../../data/traditions/groups.js';
import { SACRED_TEXTS }                         from '../../data/texts/sacred-texts.js';
import SEED_DATA                                from '../../../vite/seed-data.json';
import { openModal }                            from '../ui/modal.js';

const PAGE = 60;
const BASE = (typeof window !== 'undefined' && window.__IMG_BASE__)
  ? window.__IMG_BASE__.replace(/img\/$/, 'sites/')
  : 'sites/';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Number(n).toLocaleString('en-US');
const deityById = Object.fromEntries((SEED_DATA.deities || []).map((d) => [d.id, d]));
const textById  = Object.fromEntries(SACRED_TEXTS.map((t) => [t.id, t]));

let regionFilter = 'all';
let index = null;            // sites/index.json
let indexPromise = null;
const fileCache = new Map(); // url -> rows
let current = null;          // { kind:'country'|'ded', key, label, rows, linked:[deityIds] }
let shown = PAGE;
let textFilter = '';
let typeFilter = -1;

/* ── data ─────────────────────────────────────────────────── */
function loadIndex() {
  if (!indexPromise) {
    indexPromise = fetch(BASE + 'index.json')
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((j) => (index = j));
  }
  return indexPromise;
}
function loadRows(path) {
  if (!fileCache.has(path)) {
    fileCache.set(path, fetch(BASE + path).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }));
  }
  return fileCache.get(path);
}
const countryName = (i) => (i >= 0 && index?.countries[i]) ? index.countries[i][1] : '';

/* ── render ───────────────────────────────────────────────── */
export function renderSites() {
  const section = document.getElementById('section-sites');
  if (!section) return;
  section.innerHTML = `
    <div class="section">
      <div class="container">
        <header class="section__header">
          <span class="section__eyeline">Temples · Shrines · Megaliths · Relics</span>
          <h1 class="section__title">Holy Sites</h1>
          <p class="section__desc">
            The famous sites and relics, with what each one is, what the lost-history side claims,
            and what the evidence shows. Below them, every place of worship and sacred site on record,
            searchable by country or by the god or saint it is dedicated to.
          </p>
          <p class="sites-stats" id="sites-stats" aria-live="polite"></p>
        </header>

        <h2 class="sites-h2">Deep dives</h2>
        <div class="texts-filter sites-regions" role="tablist" aria-label="Filter by region">
          ${[{ id: 'all', label: 'All regions' }, ...SITE_REGIONS].map((r) => `
            <button class="filter-pill${r.id === regionFilter ? ' filter-pill--active' : ''}" role="tab"
                    aria-selected="${r.id === regionFilter}" data-region="${r.id}">${esc(r.label)}</button>`).join('')}
        </div>
        <div class="sites-grid" id="sites-grid">${buildCards()}</div>

        <h2 class="sites-h2" id="sites-all">Every recorded site</h2>
        <div class="sites-browse">
          <div class="sites-modes" role="tablist" aria-label="Browse by">
            <button class="filter-pill filter-pill--active" role="tab" aria-selected="true" data-mode="country">By country</button>
            <button class="filter-pill" role="tab" aria-selected="false" data-mode="ded">By god or saint</button>
          </div>
          <div class="sites-picker">
            <input id="sites-pick" type="search" autocomplete="off" spellcheck="false"
                   placeholder="Type a country…" aria-label="Choose a country" aria-controls="sites-suggest">
            <ul id="sites-suggest" class="sites-suggest" role="listbox" hidden></ul>
          </div>
          <div id="sites-result" class="sites-result"></div>
        </div>
        <p class="sites-source">Site records: Wikidata (CC0). Each name links to its record, where photos and sources are kept. Only sites with a recorded dedication are listed under a god or saint.</p>
      </div>
    </div>`;

  bindSites(section);
  loadIndex().then(() => {
    const el = document.getElementById('sites-stats');
    if (el) el.textContent = `${fmt(index.total)} sites on record · ${fmt(index.countries.length - 1)} countries and territories · ${fmt(index.dedicatees.length)} gods, saints and holy figures with dedicated sites · updated ${index.generated}`;
    consumeFocus();
  }).catch(() => {
    const el = document.getElementById('sites-result');
    if (el) el.innerHTML = '<p class="sites-empty">The site list could not be loaded. Check your connection and open this page again.</p>';
  });
}

function buildCards() {
  const list = regionFilter === 'all' ? DEEP_DIVES : DEEP_DIVES.filter((d) => d.region === regionFilter);
  return list.map((d) => {
    const art = siteArtifact(d.id);
    const color = TRADITION_GROUPS.find((g) => g.id === d.group)?.color ?? 'var(--accent)';
    return `
      <button class="site-card" data-site="${d.id}" style="--item-color:${color}">
        <span class="site-card__img"${art ? ` style="background-image:url('${art.small}')"` : ''}>${art ? '' : `<span class="site-card__glyph" aria-hidden="true">${esc(d.name.charAt(0))}</span>`}</span>
        <span class="site-card__body">
          <span class="site-card__kind">${esc(SITE_KINDS[d.kind])} · ${esc(SITE_REGIONS.find((r) => r.id === d.region)?.label)}</span>
          <span class="site-card__name">${esc(d.name)}</span>
          <span class="site-card__date">${esc(d.date)}</span>
        </span>
      </button>`;
  }).join('');
}

function openDeepDive(id) {
  const d = DEEP_DIVES.find((x) => x.id === id);
  if (!d) return;
  const art = siteArtifact(d.id);
  const color = TRADITION_GROUPS.find((g) => g.id === d.group)?.color ?? 'var(--accent)';
  const deities = (d.deities || []).filter((x) => deityById[x]);
  const texts = (d.texts || []).filter((x) => textById[x]);
  const map = d.lat != null ? `https://www.openstreetmap.org/?mlat=${d.lat}&mlon=${d.lon}#map=15/${d.lat}/${d.lon}` : '';
  openModal({
    accentColor: color,
    html: `
      <article class="site-dive">
        ${art ? `<figure class="site-dive__fig" id="site-dive-photo"><figcaption class="art-cap">${captionHTML(art)}</figcaption></figure>` : ''}
        <p class="t-label" style="color:${color}">${esc(SITE_KINDS[d.kind])} · ${esc(d.place)}</p>
        <h2 class="site-dive__title">${esc(d.name)}</h2>
        <p class="t-caption">${esc(d.date)}</p>
        <h3 class="site-dive__h">What it is</h3><p>${esc(d.what)}</p>
        <h3 class="site-dive__h">What the lost-history side claims</h3><p>${esc(d.claim)}</p>
        <h3 class="site-dive__h">What the evidence shows</h3><p>${esc(d.evidence)}</p>
        ${deities.length ? `<h3 class="site-dive__h">Linked figures</h3><p class="site-dive__chips">${deities.map((x) => `<button class="filter-pill" data-open-deity="${x}">${esc(deityById[x].primary_name)}</button>`).join('')}</p>` : ''}
        ${texts.length ? `<h3 class="site-dive__h">Linked texts</h3><p class="site-dive__chips">${texts.map((x) => `<a class="filter-pill" href="#texts">${esc(textById[x].title)}</a>`).join('')}</p>` : ''}
        <p class="site-dive__links">
          <a href="${esc(d.wiki)}" target="_blank" rel="noopener">Source article</a>
          ${map ? `<a href="${map}" target="_blank" rel="noopener">Map</a>` : ''}
        </p>
      </article>`,
  });
  // The photo is added as a DOM node, not as tag text: an <img> tag written inside the inlined
  // bundle is read by the browser's preload scanner, which then requests the template text as a URL.
  const fig = document.getElementById('site-dive-photo');
  if (fig && art) {
    const img = document.createElement('img');
    img.src = art.large; img.srcset = art.srcset; img.sizes = '(max-width: 720px) 92vw, 640px';
    img.alt = art.title; img.decoding = 'async';
    fig.prepend(img);
  }
  document.querySelectorAll('#modal-content [data-open-deity]').forEach((b) =>
    b.addEventListener('click', () => openInSourceMap(b.dataset.openDeity)));
}

/** Open a deity's sheet in the Source Map (handled in ParallelsOfTheGods.jsx). */
export function openInSourceMap(deityId) {
  window.__pendingDeity = deityId;
  window.location.hash = 'source-map';
  setTimeout(() => window.dispatchEvent(new CustomEvent('divine:open-deity', { detail: { deityId } })), 120);
}

/* ── browse ───────────────────────────────────────────────── */
let mode = 'country';

function suggestions(q) {
  if (!index) return [];
  const n = q.trim().toLowerCase();
  if (mode === 'country') {
    const all = index.countries.map((c, i) => ({ key: c[0], label: c[1], count: c[2], i }));
    return (n ? all.filter((c) => c.label.toLowerCase().includes(n)) : all).slice(0, 14);
  }
  const all = index.dedicatees;
  const hits = [];
  for (let i = 0; i < all.length && hits.length < 14; i++) {
    const [q2, label, count, linked] = all[i];
    const names = [label, ...linked.map((id) => deityById[id]?.primary_name || '')].join(' ').toLowerCase();
    if (!n || names.includes(n)) hits.push({ key: q2, label, count, linked });
  }
  return hits;
}

function renderSuggest(list) {
  const ul = document.getElementById('sites-suggest');
  if (!ul) return;
  if (!list.length) { ul.hidden = true; ul.innerHTML = ''; return; }
  ul.innerHTML = list.map((s) => `
    <li role="option"><button type="button" data-key="${esc(s.key)}">
      <span>${esc(s.label)}</span><span class="sites-suggest__n">${fmt(s.count)}</span>
    </button></li>`).join('');
  ul.hidden = false;
}

function choose(key) {
  if (!index) return;
  const box = document.getElementById('sites-suggest');
  if (box) box.hidden = true;
  if (mode === 'country') {
    const c = index.countries.find((x) => x[0] === key);
    if (!c) return;
    document.getElementById('sites-pick').value = c[1];
    showFile(`c/${key}.json`, { kind: 'country', key, label: c[1], linked: [] });
  } else {
    const d = index.dedicatees.find((x) => x[0] === key);
    if (!d) return;
    document.getElementById('sites-pick').value = d[1];
    showFile(`t/${key}.json`, { kind: 'ded', key, label: d[1], linked: d[3] });
  }
}

function showFile(path, meta) {
  const el = document.getElementById('sites-result');
  if (!el) return;
  el.innerHTML = '<p class="sites-empty">Loading…</p>';
  loadRows(path).then((rows) => {
    current = { ...meta, rows };
    shown = PAGE; textFilter = ''; typeFilter = -1;
    drawResult();
  }).catch(() => { el.innerHTML = '<p class="sites-empty">That list could not be loaded. Try again.</p>'; });
}

function filtered() {
  const n = textFilter.trim().toLowerCase();
  return current.rows.filter((r) => (typeFilter < 0 || r[2] === typeFilter) && (!n || r[1].toLowerCase().includes(n)));
}

function drawResult() {
  const el = document.getElementById('sites-result');
  if (!el || !current) return;
  const types = new Map();
  current.rows.forEach((r) => { if (r[2] >= 0) types.set(r[2], (types.get(r[2]) || 0) + 1); });
  const typeOpts = [...types.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40);
  const linked = (current.linked || []).filter((id) => deityById[id]);
  el.innerHTML = `
    <div class="sites-result__head">
      <h3 class="sites-result__title">${esc(current.label)} · ${fmt(current.rows.length)} sites</h3>
      ${linked.length ? `<p class="site-dive__chips">${linked.map((id) => `<button class="filter-pill" data-open-deity="${id}">Open ${esc(deityById[id].primary_name)} in the Source Map</button>`).join('')}</p>` : ''}
      <div class="sites-tools">
        <input id="sites-filter" type="search" placeholder="Filter by name…" aria-label="Filter these sites by name" value="${esc(textFilter)}">
        <select id="sites-type" aria-label="Filter by kind of site">
          <option value="-1">Every kind</option>
          ${typeOpts.map(([t, c]) => `<option value="${t}"${t === typeFilter ? ' selected' : ''}>${esc(index.types[t])} (${fmt(c)})</option>`).join('')}
        </select>
      </div>
    </div>
    <ol class="sites-list" id="sites-list"></ol>
    <div class="sites-more" id="sites-more"></div>`;
  drawList();
  el.querySelectorAll('[data-open-deity]').forEach((b) => b.addEventListener('click', () => openInSourceMap(b.dataset.openDeity)));
  let t;
  document.getElementById('sites-filter').addEventListener('input', (e) => {
    clearTimeout(t);
    t = setTimeout(() => { textFilter = e.target.value; shown = PAGE; drawList(); }, 160);
  });
  document.getElementById('sites-type').addEventListener('change', (e) => { typeFilter = Number(e.target.value); shown = PAGE; drawList(); });
}

function drawList() {
  const ol = document.getElementById('sites-list');
  const more = document.getElementById('sites-more');
  if (!ol || !current) return;
  const rows = filtered();
  ol.innerHTML = rows.slice(0, shown).map((r) => {
    const [q, name, t, lat, lon, rel, ded, c] = r;
    const bits = [index.types[t], index.religions[rel], current.kind === 'ded' ? countryName(c) : ''].filter(Boolean);
    const dedNames = (ded || []).map((i) => index.dedicatees[i]?.[1]).filter(Boolean);
    return `
      <li class="sites-row">
        <a class="sites-row__name" href="https://www.wikidata.org/wiki/Q${q}" target="_blank" rel="noopener">${esc(name.replace(/^["'\s]+|["'\s]+$/g, '') || name)}</a>
        <span class="sites-row__meta">${esc(bits.join(' · '))}${dedNames.length ? ` · dedicated to ${esc(dedNames.slice(0, 3).join(', '))}` : ''}</span>
        <a class="sites-row__map" href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}" target="_blank" rel="noopener" aria-label="Map of ${esc(name)}">Map</a>
      </li>`;
  }).join('') || '<li class="sites-empty">No sites match.</li>';
  more.innerHTML = rows.length > shown
    ? `<button class="filter-pill" id="sites-more-btn">Show ${fmt(Math.min(PAGE, rows.length - shown))} more of ${fmt(rows.length - shown)}</button>`
    : (rows.length ? `<p class="t-caption">${fmt(rows.length)} shown</p>` : '');
  document.getElementById('sites-more-btn')?.addEventListener('click', () => { shown += PAGE; drawList(); });
}

/** Another section (the Source Map) asked to show the sites of a deity. */
function consumeFocus() {
  const f = window.__sitesFocus;
  if (!f || !index) return;
  window.__sitesFocus = null;
  setMode('ded');
  const keys = f.targets || [];
  if (keys.length === 1) { choose(keys[0]); }
  else if (keys.length > 1) {
    Promise.all(keys.map((k) => loadRows(`t/${k}.json`).catch(() => []))).then((parts) => {
      const seen = new Set(); const rows = [];
      parts.flat().forEach((r) => { if (!seen.has(r[0])) { seen.add(r[0]); rows.push(r); } });
      rows.sort((a, b) => a[1].localeCompare(b[1]));
      document.getElementById('sites-pick').value = f.label || '';
      current = { kind: 'ded', key: keys.join(','), label: f.label || '', rows, linked: f.deityId ? [f.deityId] : [] };
      shown = PAGE; textFilter = ''; typeFilter = -1;
      drawResult();
    });
  }
  document.getElementById('sites-all')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setMode(m) {
  mode = m;
  document.querySelectorAll('.sites-modes [data-mode]').forEach((b) => {
    const on = b.dataset.mode === m;
    b.classList.toggle('filter-pill--active', on);
    b.setAttribute('aria-selected', String(on));
  });
  const input = document.getElementById('sites-pick');
  if (input) {
    input.value = '';
    input.placeholder = m === 'country' ? 'Type a country…' : 'Type a god, goddess or saint…';
    input.setAttribute('aria-label', m === 'country' ? 'Choose a country' : 'Choose a god or saint');
  }
  renderSuggest([]);
}

function bindSites(section) {
  section.querySelectorAll('[data-region]').forEach((b) => b.addEventListener('click', () => {
    regionFilter = b.dataset.region;
    section.querySelectorAll('[data-region]').forEach((x) => {
      const on = x.dataset.region === regionFilter;
      x.classList.toggle('filter-pill--active', on); x.setAttribute('aria-selected', String(on));
    });
    document.getElementById('sites-grid').innerHTML = buildCards();
  }));
  section.querySelector('#sites-grid').addEventListener('click', (e) => {
    const card = e.target.closest('[data-site]');
    if (card) openDeepDive(card.dataset.site);
  });
  section.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
  const input = section.querySelector('#sites-pick');
  input.addEventListener('focus', () => loadIndex().then(() => renderSuggest(suggestions(input.value))));
  input.addEventListener('input', () => loadIndex().then(() => renderSuggest(suggestions(input.value))));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const s = suggestions(input.value)[0]; if (s) { e.preventDefault(); choose(s.key); } }
    if (e.key === 'Escape') renderSuggest([]);
  });
  section.querySelector('#sites-suggest').addEventListener('click', (e) => {
    const b = e.target.closest('[data-key]');
    if (b) choose(b.dataset.key);
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sites-picker')) renderSuggest([]);
  });
}

window.addEventListener('divine:show-sites', () => { if (index) consumeFocus(); });
