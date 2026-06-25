"""Build the single-file HTML prototype with embedded v0.5.0 JSON."""
import json

with open("/mnt/user-data/outputs/source_map_seed_data_v050.json") as f:
    data = json.load(f)

# Embed as JSON string in script tag (safe — JSON is valid JS)
data_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))

html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Parallels of the Gods — v0.5.0</title>
<style>
  :root {
    --bg: #0b0b14;
    --bg-panel: #131322;
    --bg-elevated: #1c1c30;
    --border: #2a2a42;
    --text: #e8e8ee;
    --text-muted: #9090a8;
    --tier-1: #c9a96e;
    --tier-2: #6fa8dc;
    --tier-3: #d36b6b;
    --tier-4: #b894d6;
    --tier-cross: #7fb074;
    --link: #f0c96b;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 15px;
    line-height: 1.5;
  }
  header {
    padding: 16px 20px 12px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-panel);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  h1 { font-size: 18px; margin: 0 0 4px; font-weight: 600; letter-spacing: 0.3px; }
  .subtitle { font-size: 12px; color: var(--text-muted); margin-bottom: 12px; }
  .stats {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 12px;
  }
  .stats span strong { color: var(--text); font-weight: 600; }
  .controls { display: flex; gap: 8px; flex-wrap: wrap; }
  input, select {
    background: var(--bg-elevated);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 13px;
    font-family: inherit;
  }
  input:focus, select:focus { outline: none; border-color: var(--link); }
  input { flex: 1; min-width: 160px; }
  main { padding: 16px 20px 80px; }
  .view-tabs { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
  .view-tabs button {
    background: var(--bg-elevated); color: var(--text-muted);
    border: 1px solid var(--border); border-radius: 6px;
    padding: 6px 12px; font-size: 13px; font-family: inherit;
    cursor: pointer; transition: all 0.15s;
  }
  .view-tabs button.active { color: var(--text); border-color: var(--link); background: var(--bg-panel); }
  .view-tabs button:hover { color: var(--text); }
  .deity-list { display: grid; gap: 8px; }
  .deity-card {
    background: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 14px;
    cursor: pointer;
    transition: border-color 0.15s, transform 0.15s;
  }
  .deity-card:hover { border-color: var(--link); }
  .deity-card:active { transform: scale(0.99); }
  .deity-name { font-weight: 600; font-size: 15px; margin-bottom: 2px; }
  .deity-meta { font-size: 12px; color: var(--text-muted); display: flex; gap: 10px; flex-wrap: wrap; }
  .tradition-tag {
    display: inline-block;
    padding: 1px 7px;
    font-size: 10px;
    background: var(--bg-elevated);
    border-radius: 10px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .deity-summary { font-size: 13px; color: var(--text-muted); margin-top: 8px; line-height: 1.45; }
  .facet-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
  .facet-chip {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 10px;
    color: #fff;
    opacity: 0.85;
  }
  .tier-1 { background: var(--tier-1); color: #2a1f0a; }
  .tier-2 { background: var(--tier-2); color: #0a1a2a; }
  .tier-3 { background: var(--tier-3); color: #2a0a0a; }
  .tier-4 { background: var(--tier-4); color: #1f0a2a; }
  .tier-cross-tier { background: var(--tier-cross); color: #0a2a0a; }
  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.75);
    display: flex; align-items: flex-start; justify-content: center;
    padding: 20px 12px; z-index: 100;
    overflow-y: auto;
  }
  .modal {
    background: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 10px;
    max-width: 680px; width: 100%;
    padding: 20px;
    margin-top: 20px;
  }
  .modal-close {
    float: right;
    background: var(--bg-elevated);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 10px; font-size: 13px;
    cursor: pointer; font-family: inherit;
  }
  .modal h2 { margin: 0 0 6px; font-size: 20px; }
  .modal-meta { font-size: 12px; color: var(--text-muted); margin-bottom: 14px; }
  .modal-summary { margin: 12px 0; line-height: 1.55; }
  .modal-section { margin-top: 18px; }
  .modal-section h3 {
    font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
    color: var(--text-muted); margin: 0 0 8px; font-weight: 600;
  }
  .facet-block {
    background: var(--bg-elevated);
    border-left: 3px solid var(--border);
    padding: 10px 12px; margin-bottom: 10px;
    border-radius: 4px;
  }
  .facet-block.t-1 { border-left-color: var(--tier-1); }
  .facet-block.t-2 { border-left-color: var(--tier-2); }
  .facet-block.t-3 { border-left-color: var(--tier-3); }
  .facet-block.t-4 { border-left-color: var(--tier-4); }
  .facet-block.t-cross-tier { border-left-color: var(--tier-cross); }
  .facet-name { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
  .facet-claim { font-size: 13px; color: var(--text); margin: 6px 0; }
  .facet-parallels { font-size: 12px; color: var(--text-muted); margin-top: 6px; }
  .facet-parallels a {
    color: var(--link); cursor: pointer; text-decoration: none;
    border-bottom: 1px dotted var(--link);
  }
  .facet-parallels a:hover { color: #fff; }
  .parallel-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 12px;
    margin-bottom: 8px;
    font-size: 13px;
  }
  .parallel-link {
    color: var(--link); cursor: pointer;
    border-bottom: 1px dotted var(--link);
  }
  .parallel-strength {
    display: inline-block;
    font-size: 10px;
    padding: 1px 6px;
    border-radius: 10px;
    background: var(--bg-panel);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-right: 6px;
  }
  .parallel-strength.identity, .parallel-strength.derivation { background: var(--tier-1); color: #2a1f0a; }
  .parallel-strength.strong-parallel { background: var(--tier-cross); color: #0a2a0a; }
  .parallel-strength.partial-parallel { background: var(--tier-2); color: #0a1a2a; }
  .parallel-strength.contrast { background: var(--tier-3); color: #2a0a0a; }
  .parallel-basis { color: var(--text-muted); margin-top: 6px; font-size: 12px; }
  .parallel-basis ul { margin: 4px 0 0; padding-left: 18px; }
  .scholarly-caveat {
    font-size: 12px;
    background: rgba(240,201,107,0.08);
    border-left: 2px solid var(--link);
    padding: 8px 10px;
    margin-top: 6px;
    color: var(--text-muted);
    border-radius: 3px;
  }
  .tradition-summary {
    background: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 12px;
  }
  .tradition-summary h2 { margin: 0 0 4px; font-size: 17px; }
  .tradition-summary .meta { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
  .framework-card {
    background: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 12px;
  }
  .framework-card h2 { margin: 0 0 8px; font-size: 17px; }
  .framework-summary { font-size: 13px; line-height: 1.55; color: var(--text-muted); }
  .framework-instances { margin-top: 10px; }
  .framework-instance {
    font-size: 12px;
    padding: 6px 0;
    border-top: 1px solid var(--border);
  }
  .framework-instance strong { color: var(--text); }
  details { margin: 8px 0; }
  details summary { cursor: pointer; color: var(--text-muted); font-size: 13px; padding: 4px 0; }
  details summary:hover { color: var(--text); }
  .empty { text-align: center; padding: 40px 20px; color: var(--text-muted); font-size: 14px; }
  @media (max-width: 600px) {
    .modal { margin-top: 10px; padding: 16px; }
    h1 { font-size: 16px; }
  }
</style>
</head>
<body>
<header>
  <h1>Parallels of the Gods</h1>
  <div class="subtitle">v0.5.0 prototype · comparative cosmology data layer</div>
  <div class="stats">
    <span><strong id="stat-t">0</strong> traditions</span>
    <span><strong id="stat-d">0</strong> deities</span>
    <span><strong id="stat-f">0</strong> facets</span>
    <span><strong id="stat-p">0</strong> parallels</span>
    <span><strong id="stat-fw">0</strong> frameworks</span>
  </div>
  <div class="controls">
    <input id="search" type="search" placeholder="Search deity, tradition, or function…" autocomplete="off">
    <select id="filter-tradition"><option value="">All traditions</option></select>
    <select id="filter-tier">
      <option value="">All tiers</option>
      <option value="1">Tier 1 — Unmanifest Source</option>
      <option value="2">Tier 2 — Most High / Council</option>
      <option value="3">Tier 3 — Demiurge</option>
      <option value="4">Tier 4 — Archons / Rulers</option>
      <option value="cross-tier">Cross-tier — Light-Bringers</option>
    </select>
  </div>
</header>
<main>
  <div class="view-tabs">
    <button data-view="deities" class="active">Deities</button>
    <button data-view="traditions">Traditions</button>
    <button data-view="parallels">Parallels</button>
    <button data-view="frameworks">Frameworks</button>
  </div>
  <div id="view"></div>
</main>
<script id="data" type="application/json">__DATA__</script>
<script>
const DATA = JSON.parse(document.getElementById('data').textContent);
const $ = (id) => document.getElementById(id);
const facetById = Object.fromEntries(DATA.facets.map(f => [f.id, f]));
const deityById = Object.fromEntries(DATA.deities.map(d => [d.id, d]));
const traditionById = Object.fromEntries(DATA.traditions.map(t => [t.id, t]));
const deityByFacet = {};
DATA.deities.forEach(d => (d.facets||[]).forEach(fid => { deityByFacet[fid] = d; }));

// stats
$('stat-t').textContent = DATA.traditions.length;
$('stat-d').textContent = DATA.deities.length;
$('stat-f').textContent = DATA.facets.length;
$('stat-p').textContent = DATA.canonical_parallels.length;
$('stat-fw').textContent = (DATA.cosmological_frameworks||[]).length;

// tradition filter
const tradSel = $('filter-tradition');
DATA.traditions.map(t => t).sort((a,b)=>a.name.localeCompare(b.name)).forEach(t => {
  const opt = document.createElement('option');
  opt.value = t.id; opt.textContent = t.name; tradSel.appendChild(opt);
});

let currentView = 'deities';
let searchQ = '';
let filterT = '';
let filterTier = '';

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function deityMatches(d) {
  if (filterT && d.tradition_id !== filterT) return false;
  if (filterTier) {
    const facets = (d.facets||[]).map(fid => facetById[fid]).filter(Boolean);
    const hasTier = facets.some(f => String(f.tier_assignment) === filterTier);
    if (!hasTier) return false;
  }
  if (searchQ) {
    const hay = [
      d.primary_name, ...(d.alternate_names||[]),
      d.summary||'', traditionById[d.tradition_id]?.name||'',
      ...((d.facets||[]).map(fid => facetById[fid]).filter(Boolean).flatMap(f => [f.facet_name, ...(f.function_tags||[])]))
    ].join(' ').toLowerCase();
    if (!hay.includes(searchQ)) return false;
  }
  return true;
}

function renderDeities() {
  const list = DATA.deities.filter(deityMatches);
  list.sort((a,b) => a.primary_name.localeCompare(b.primary_name));
  if (!list.length) return '<div class="empty">No deities match your filters.</div>';
  return '<div class="deity-list">' + list.map(d => {
    const trad = traditionById[d.tradition_id];
    const facets = (d.facets||[]).map(fid => facetById[fid]).filter(Boolean);
    const summary = (d.summary||'').length > 200 ? d.summary.slice(0,200)+'…' : (d.summary||'');
    return `
      <div class="deity-card" data-deity="${d.id}">
        <div class="deity-name">${escapeHTML(d.primary_name)}</div>
        <div class="deity-meta">
          <span class="tradition-tag">${escapeHTML(trad?.name || d.tradition_id)}</span>
          ${d.alternate_names && d.alternate_names.length ? `<span>${escapeHTML(d.alternate_names.slice(0,3).join(' · '))}</span>` : ''}
        </div>
        ${summary ? `<div class="deity-summary">${escapeHTML(summary)}</div>` : ''}
        <div class="facet-chips">${facets.map(f => `<span class="facet-chip tier-${f.tier_assignment}">${escapeHTML(f.facet_name)}</span>`).join('')}</div>
      </div>`;
  }).join('') + '</div>';
}

function renderTraditions() {
  return DATA.traditions.map(t => {
    const dCount = DATA.deities.filter(d => d.tradition_id === t.id).length;
    return `
      <div class="tradition-summary">
        <h2>${escapeHTML(t.name)}</h2>
        <div class="meta">${escapeHTML(t.geographic_origin||'')} · ${dCount} deities · ${escapeHTML(t.earliest_attestation||'')}</div>
        <div>${escapeHTML(t.cosmological_structure||'')}</div>
        ${t.scholarly_note ? `<div class="scholarly-caveat">${escapeHTML(t.scholarly_note)}</div>` : ''}
      </div>`;
  }).join('');
}

function renderParallels() {
  // Group by type
  const list = DATA.canonical_parallels;
  return '<div>' + list.map(p => {
    const fa = facetById[p.facet_a_id], fb = facetById[p.facet_b_id];
    if (!fa || !fb) return '';
    const da = deityByFacet[p.facet_a_id], db = deityByFacet[p.facet_b_id];
    const ta = da ? traditionById[da.tradition_id]?.name : '?';
    const tb = db ? traditionById[db.tradition_id]?.name : '?';
    return `
      <div class="parallel-card">
        <span class="parallel-strength ${p.strength}">${escapeHTML(p.strength)}</span>
        <span class="parallel-link" data-deity="${da?.id||''}">${escapeHTML(da?.primary_name||fa.facet_name)}</span>
        <span style="color:var(--text-muted)"> (${escapeHTML(ta)}) </span>
        ↔
        <span class="parallel-link" data-deity="${db?.id||''}">${escapeHTML(db?.primary_name||fb.facet_name)}</span>
        <span style="color:var(--text-muted)"> (${escapeHTML(tb)})</span>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${escapeHTML(fa.facet_name)} ↔ ${escapeHTML(fb.facet_name)}</div>
        ${p.basis && p.basis.length ? `<details><summary>Basis (${p.basis.length})</summary><ul style="margin:4px 0 0;padding-left:18px;font-size:12px;color:var(--text-muted)">${p.basis.map(b => `<li>${escapeHTML(b)}</li>`).join('')}</ul></details>` : ''}
        ${p.scholarly_caveat ? `<div class="scholarly-caveat">${escapeHTML(p.scholarly_caveat)}</div>` : ''}
      </div>`;
  }).join('') + '</div>';
}

function renderFrameworks() {
  return (DATA.cosmological_frameworks||[]).map(f => `
    <div class="framework-card">
      <h2>${escapeHTML(f.name)}</h2>
      <div class="framework-summary">${escapeHTML(f.summary||'')}</div>
      ${f.narrative_components ? `<details style="margin-top:10px"><summary>Narrative components (${f.narrative_components.length})</summary><ul style="font-size:13px;color:var(--text-muted);margin:6px 0 0;padding-left:18px">${f.narrative_components.map(n=>`<li>${escapeHTML(n)}</li>`).join('')}</ul></details>` : ''}
      ${f.instances ? `<details style="margin-top:10px"><summary>Instances (${f.instances.length})</summary><div class="framework-instances">${f.instances.map(i => `<div class="framework-instance"><strong>${escapeHTML(i.tradition)}</strong>: ${escapeHTML(i.slayer||i.deity||'')} ${i.serpent?'vs '+escapeHTML(i.serpent):''} ${i.death?'— '+escapeHTML(i.death):''}</div>`).join('')}</div></details>` : ''}
      ${f.scholarly_anchors ? `<details style="margin-top:10px"><summary>Scholarly anchors (${f.scholarly_anchors.length})</summary><ul style="font-size:12px;color:var(--text-muted);margin:6px 0 0;padding-left:18px">${f.scholarly_anchors.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ul></details>` : ''}
    </div>`).join('');
}

function render() {
  const v = $('view');
  if (currentView === 'deities') v.innerHTML = renderDeities();
  else if (currentView === 'traditions') v.innerHTML = renderTraditions();
  else if (currentView === 'parallels') v.innerHTML = renderParallels();
  else if (currentView === 'frameworks') v.innerHTML = renderFrameworks();
}

function showDeity(id) {
  const d = deityById[id]; if (!d) return;
  const trad = traditionById[d.tradition_id];
  const facets = (d.facets||[]).map(fid => facetById[fid]).filter(Boolean);
  // Find parallels touching this deity
  const facetIds = new Set(d.facets||[]);
  const relatedParallels = DATA.canonical_parallels.filter(p => facetIds.has(p.facet_a_id) || facetIds.has(p.facet_b_id));
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close">Close</button>
      <h2>${escapeHTML(d.primary_name)}</h2>
      <div class="modal-meta">
        ${escapeHTML(trad?.name||d.tradition_id)} ·
        ${escapeHTML(d.earliest_attestation||'')}
      </div>
      ${d.alternate_names && d.alternate_names.length ? `<div class="modal-meta">Also known as: ${escapeHTML(d.alternate_names.join(' · '))}</div>` : ''}
      <div class="modal-summary">${escapeHTML(d.summary||'')}</div>
      ${d.etymology ? `<div class="scholarly-caveat"><strong>Etymology:</strong> ${escapeHTML(d.etymology)}</div>` : ''}
      ${d.iconography && d.iconography.length ? `<div class="modal-section"><h3>Iconography</h3><div style="font-size:13px;color:var(--text-muted)">${escapeHTML(d.iconography.join(' · '))}</div></div>` : ''}
      ${d.primary_sources && d.primary_sources.length ? `<div class="modal-section"><h3>Primary sources</h3><ul style="font-size:13px;color:var(--text-muted);margin:0;padding-left:18px">${d.primary_sources.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ul></div>` : ''}
      <div class="modal-section">
        <h3>Facets (${facets.length})</h3>
        ${facets.map(f => `
          <div class="facet-block t-${f.tier_assignment}">
            <div class="facet-name">${escapeHTML(f.facet_name)}</div>
            <div style="font-size:11px;color:var(--text-muted)">Tier ${escapeHTML(String(f.tier_assignment))} · ${escapeHTML(f.valence||'')} · ${(f.function_tags||[]).slice(0,5).map(escapeHTML).join(' · ')}</div>
            <div class="facet-claim">${escapeHTML(f.core_claim||'')}</div>
            ${f.parallel_facets && f.parallel_facets.length ? `<div class="facet-parallels"><strong>Parallels:</strong> ${f.parallel_facets.map(pid => {
              const pdeity = deityByFacet[pid];
              return pdeity ? `<a data-deity="${pdeity.id}">${escapeHTML(pdeity.primary_name)}</a>` : `<span style="color:var(--text-muted)">${escapeHTML(pid)}</span>`;
            }).join(' · ')}</div>` : ''}
          </div>`).join('')}
      </div>
      ${relatedParallels.length ? `<div class="modal-section">
        <h3>Canonical parallels (${relatedParallels.length})</h3>
        ${relatedParallels.slice(0,20).map(p => {
          const otherFid = facetIds.has(p.facet_a_id) ? p.facet_b_id : p.facet_a_id;
          const otherDeity = deityByFacet[otherFid];
          const otherFacet = facetById[otherFid];
          if (!otherDeity || !otherFacet) return '';
          return `<div class="parallel-card">
            <span class="parallel-strength ${p.strength}">${escapeHTML(p.strength)}</span>
            <span class="parallel-link" data-deity="${otherDeity.id}">${escapeHTML(otherDeity.primary_name)}</span>
            <span style="color:var(--text-muted)"> · ${escapeHTML(otherFacet.facet_name)}</span>
            ${p.basis && p.basis.length ? `<details><summary>Basis</summary><ul style="margin:4px 0 0;padding-left:18px;font-size:12px;color:var(--text-muted)">${p.basis.map(b=>`<li>${escapeHTML(b)}</li>`).join('')}</ul></details>` : ''}
            ${p.scholarly_caveat ? `<div class="scholarly-caveat">${escapeHTML(p.scholarly_caveat)}</div>` : ''}
          </div>`;
        }).join('')}
      </div>` : ''}
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.classList.contains('modal-close')) overlay.remove();
    const dlink = e.target.closest('[data-deity]');
    if (dlink && dlink.dataset.deity) { overlay.remove(); showDeity(dlink.dataset.deity); }
  });
}

// Wire up controls
$('search').addEventListener('input', e => { searchQ = e.target.value.trim().toLowerCase(); render(); });
$('filter-tradition').addEventListener('change', e => { filterT = e.target.value; render(); });
$('filter-tier').addEventListener('change', e => { filterTier = e.target.value; render(); });
document.querySelectorAll('.view-tabs button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.view-tabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    currentView = b.dataset.view; render();
  });
});
document.addEventListener('click', e => {
  const card = e.target.closest('.deity-card[data-deity]');
  if (card) showDeity(card.dataset.deity);
  const plink = e.target.closest('.parallel-link[data-deity]');
  if (plink && plink.dataset.deity) showDeity(plink.dataset.deity);
});

render();
</script>
</body>
</html>"""

html = html.replace("__DATA__", data_json)

with open("/mnt/user-data/outputs/parallels_of_the_gods.html", "w", encoding="utf-8") as f:
    f.write(html)

print(f"HTML written, size: {len(html):,} chars ({len(html)/1024:.1f} KB)")
