import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, X, Filter, BookOpen, Eye, EyeOff, Info, ChevronUp, ChevronDown, Sparkles, ArrowUpRight, FileText, Upload, Layers } from 'lucide-react';
import SEED_DATA from './seed-data.json';

// ─────────────────────────────────────────────────────────────────────────────
// EMBEDDED SEED DATA
// Replace via the upload button to swap in larger datasets (e.g. v0.5.0)
// ─────────────────────────────────────────────────────────────────────────────
// Seed data is imported from ./seed-data.json above.
// Swap that file (or use the in-app upload) to change datasets.

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

// Specificity band → badge color (parallelomania control, see tools/specificity.py).
// Green = rare shared structure (strong); red = common-motif (weak); gray = no shared tag.
const SPECIFICITY_COLORS = {
  specific: '#3f6e5e',
  moderate: '#a67c2f',
  'universal-motif': '#9c4a3a',
  'tag-divergent': '#5a5d5c',
};

// Stable, manuscript-muted color derived from the tradition id, so the 150+
// traditions in v0.8.0 that aren't in the hand-picked palette above still read
// as visually distinct instead of all collapsing to one gray.
function hashColor(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffffffff;
  const hue = Math.abs(h) % 360;
  return { bg: `hsl(${hue} 38% 38%)`, ink: `hsl(${hue} 42% 24%)`, label: id };
}

function colorFor(traditionId) {
  if (TRADITION_COLORS[traditionId]) return TRADITION_COLORS[traditionId];
  if (traditionId) return hashColor(traditionId);
  return DEFAULT_TRADITION_COLOR;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [rawData, setRawData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    try {
      setRawData(SEED_DATA);
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
  const [specFilter, setSpecFilter] = useState('all'); // all | significant | specific
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

  // Specificity filter — surfaces the parallelomania control from the data layer.
  // `significant` = beats the randomized null model (p<0.05); `specific` = shares
  // rare structural tags. Items with no explicit canonical record are hidden when
  // a filter is active (they carry no specificity signal).
  const shown = items.filter(it => {
    if (specFilter === 'all') return true;
    if (!it.explicit) return false;
    if (specFilter === 'significant') return it.explicit.specificity_significant === true;
    if (specFilter === 'specific') return it.explicit.specificity_band === 'specific';
    return true;
  });

  const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'significant', label: 'Significant (p<.05)' },
    { id: 'specific', label: 'Specific only' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setSpecFilter(f.id)}
            className="marginalia"
            style={{
              padding: '2px 7px',
              fontSize: '10px',
              borderRadius: '2px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              border: `1px solid ${specFilter === f.id ? '#3f6e5e' : 'rgba(176,134,72,0.4)'}`,
              background: specFilter === f.id ? '#3f6e5e' : 'transparent',
              color: specFilter === f.id ? '#faf5e7' : '#6b5223',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="marginalia mb-2" style={{ marginBottom: 10 }}>
        {shown.length} of {items.length} parallel{items.length === 1 ? '' : 's'}
        {specFilter !== 'all' ? ' (filtered)' : ' across traditions'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.length === 0 && (
          <div style={{ padding: '14px 0', textAlign: 'center', color: '#8a7340', fontStyle: 'italic', fontSize: 13 }}>
            No parallels match this filter.
          </div>
        )}
        {shown.map(({ facet, deity, tradition, explicit }) => {
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
                    {explicit?.specificity_band && (
                      <span
                        className="marginalia"
                        title={`Specificity ${explicit.specificity_score ?? ''} — ${
                          explicit.specificity_shared_tags?.length
                            ? 'shared: ' + explicit.specificity_shared_tags.join(', ')
                            : 'no shared function-tags'
                        }`}
                        style={{
                          padding: '1px 5px',
                          background: SPECIFICITY_COLORS[explicit.specificity_band] || '#8a7340',
                          color: '#faf5e7',
                          borderRadius: '2px',
                          fontSize: '9px',
                        }}
                      >
                        {explicit.specificity_band}
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
