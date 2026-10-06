import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, X, Filter, BookOpen, Eye, EyeOff, Info, ChevronUp, ChevronDown, Sparkles, ArrowUpRight, FileText, Upload, Layers } from 'lucide-react';
import SEED_DATA from './seed-data.json';
import CosmosView from './CosmosView.jsx';

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
const EMPTY_SET = new Set();

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

const DEFAULT_TRADITION_COLOR = { bg: '#666666', ink: '#333333', label: 'Unset' };

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

// Dark-theme text colours derived from each tradition's pigment: `fg` is a
// lifted tone for captions, `ink` a light tone for names — both readable on the
// void background while keeping the tradition's hue.
function toHsl(c) {
  const m = /^hsl\((\d+)\s+(\d+)%\s+(\d+)%\)$/.exec(c);
  if (m) return [+m[1], +m[2], +m[3]];
  const n = parseInt(c.replace('#', '').padEnd(6, '0'), 16);
  const r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  let h = 0, sat = 0;
  if (mx !== mn) {
    const d = mx - mn;
    sat = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return [Math.round(h), Math.round(sat * 100), Math.round(l * 100)];
}
// Light mode (device setting) gets deeper tones of the same hue so names and
// captions stay readable on pale paper.
const _lightMQ = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
const isLightScheme = () => !!(_lightMQ && _lightMQ.matches);
const _toneCache = {};
function darkTone(base) {
  const light = isLightScheme();
  const key = base.bg + (light ? ':l' : ':d');
  if (_toneCache[key]) return _toneCache[key];
  const [h, sat] = toHsl(base.bg);
  const S = Math.min(Math.max(sat, 30), 60);
  return (_toneCache[key] = light ? {
    ...base,
    fg: `hsl(${h} ${S}% 30%)`,
    ink: `hsl(${h} ${Math.min(S, 45)}% 18%)`,
    edge: `hsl(${h} ${S}% 42%)`,
  } : {
    ...base,
    fg: `hsl(${h} ${S}% 76%)`,
    ink: `hsl(${h} ${Math.min(S, 45)}% 86%)`,
    edge: `hsl(${h} ${S}% 52%)`,
  });
}
// Canvas drawing can't read CSS variables, so it asks for the palette directly.
const PAL = () => isLightScheme()
  ? { canvas: '#f3f4f7', ring: 'rgba(43,79,134,0.18)', accent: '#2b4f86', dim: '#5d677c', label: '#17213a',
      band: { specific: '#2f7a5f', moderate: '#5b6f8c', 'universal-motif': '#a24a35', 'tag-divergent': '#6b6f6d' } }
  : { canvas: '#1f2c3f', ring: 'rgba(169,196,228,0.15)', accent: '#a9c4e4', dim: '#95a1b0', label: '#e8eae7',
      band: { specific: '#5fb39a', moderate: '#9fb3c8', 'universal-motif': '#d0715c', 'tag-divergent': '#8d918f' } };

function colorFor(traditionId) {
  if (TRADITION_COLORS[traditionId]) return darkTone(TRADITION_COLORS[traditionId]);
  if (traditionId) return darkTone(hashColor(traditionId));
  return darkTone(DEFAULT_TRADITION_COLOR);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // Re-render when the device switches between light and dark, so canvas and
  // 3D colours (which can't use CSS variables) follow along.
  const [, setScheme] = useState(() => isLightScheme());
  useEffect(() => {
    if (!_lightMQ) return undefined;
    const on = () => { Object.keys(_toneCache).forEach((k) => delete _toneCache[k]); setScheme(isLightScheme()); };
    _lightMQ.addEventListener('change', on);
    return () => _lightMQ.removeEventListener('change', on);
  }, []);
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
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--sm-void)', color: 'var(--sm-text)', fontFamily: '"Noto Sans", system-ui, sans-serif' }}>
      <div className="text-center">
        <div className="text-2xl italic">Loading the Source Map…</div>
      </div>
    </div>
  );
}

function ErrorScreen({ msg }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--sm-void)' }}>
      <div className="max-w-md text-center" style={{ color: '#e8705f' }}>
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
  const [compareOpen, setCompareOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'tiers' : 'cosmos'
  )); // 'cosmos' | 'tiers' | 'network'

  // When the host site navigates to another section, close open panels so
  // coming back never lands on a stale sheet or modal covering the view.
  useEffect(() => {
    const closeAll = () => { setSheetOpen(false); setAboutOpen(false); setCompareOpen(false); };
    window.addEventListener('divine:navigate', closeAll);
    return () => window.removeEventListener('divine:navigate', closeAll);
  }, []);

  // Reset selection if data reloaded
  useEffect(() => {
    setSelectedFacetId(null);
    setSheetOpen(false);
    setActiveTraditions(new Set(traditions.map(t => t.id)));
  }, [data]);

  const selectedFacet = selectedFacetId ? facetById[selectedFacetId] : null;
  const selectedDeity = selectedFacet ? deityById[selectedFacet.parent_deity_id] : null;
  const selectedRelated = (selectedFacet && parallelsForFacet[selectedFacet.id]) || EMPTY_SET;

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
      background: 'var(--sm-canvas)',
      color: 'var(--sm-text)',
      fontFamily: '"Noto Sans", system-ui, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        :root, :host {
          color-scheme: dark;
          --sm-void: #18233a; --sm-deep: #1b2840; --sm-canvas: #1f2c3f; --sm-surface: #283952; --sm-raised: #31435f;
          --sm-text: #e8eae7; --sm-text2: #cfd5dc; --sm-muted: #aab4c0; --sm-dim: #95a1b0;
          --sm-accent: #a9c4e4; --sm-accent-hi: #c9dbf0; --sm-on-accent: #14213a;
          --sm-accent-rgb: 169 196 228; --sm-ink-rgb: 232 234 231; --sm-void-rgb: 24 35 58; --sm-scrim-rgb: 12 18 32;
        }
        @media (prefers-color-scheme: light) {
          :root, :host {
            color-scheme: light;
            --sm-void: #e6e9ef; --sm-deep: #eceef3; --sm-canvas: #f3f4f7; --sm-surface: #ffffff; --sm-raised: #ffffff;
            --sm-text: #17213a; --sm-text2: #2b3650; --sm-muted: #46526a; --sm-dim: #5d677c;
            --sm-accent: #2b4f86; --sm-accent-hi: #1f3d6b; --sm-on-accent: #ffffff;
            --sm-accent-rgb: 43 79 134; --sm-ink-rgb: 23 33 58; --sm-void-rgb: 230 233 239; --sm-scrim-rgb: 12 18 32;
          }
        }
        /* The 3D Cosmos is a night-sky star map in both modes: its panel and overlays keep the dark palette. */
        .cosmos {
          color-scheme: dark;
          --sm-void: #18233a; --sm-deep: #1b2840; --sm-canvas: #1f2c3f; --sm-surface: #283952; --sm-raised: #31435f;
          --sm-text: #e8eae7; --sm-text2: #cfd5dc; --sm-muted: #aab4c0; --sm-dim: #95a1b0;
          --sm-accent: #a9c4e4; --sm-accent-hi: #c9dbf0; --sm-on-accent: #14213a;
          --sm-accent-rgb: 169 196 228; --sm-ink-rgb: 232 234 231; --sm-void-rgb: 24 35 58; --sm-scrim-rgb: 12 18 32;
          background: #18233a;
        }
        
        .smallcaps {
          font-variant: normal;
          letter-spacing: 0;
        }
        .marginalia {
          font-variant: normal;
          letter-spacing: 0;
          font-size: 12px;
          color: var(--sm-muted);
        }
        .codex-rule {
          background: linear-gradient(90deg, transparent 0%, var(--sm-accent) 20%, var(--sm-accent) 80%, transparent 100%);
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
          background: rgb(var(--sm-ink-rgb) / 0.12);
        }
        .deity-chip {
          transition: transform 120ms ease, opacity 200ms ease, box-shadow 200ms ease;
          cursor: pointer;
        }
        .deity-chip:hover {
          box-shadow: 0 0 0 1px rgb(var(--sm-accent-rgb) / 0.6);
        }
        .deity-chip:focus-visible { outline: 2px solid var(--sm-accent-hi); outline-offset: 2px; }
        input[type=search]::placeholder { color: var(--sm-dim); }
        input[type=search]:focus { border-color: var(--sm-accent) !important; box-shadow: 0 0 0 3px rgb(var(--sm-accent-rgb) / 0.15); }
        select { color-scheme: dark; }
        .deity-chip.selected {
          box-shadow: 0 0 0 2px var(--sm-accent);
        }
        .deity-chip.related {
          box-shadow: 0 0 0 1.5px var(--sm-accent-hi);
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
          background: rgba(0,0,0, 0.45);
        }
        .sheet {
          background: rgb(var(--sm-void-rgb) / 0.62);
          box-shadow: 0 -8px 30px rgba(0,0,0,0.25);
          border-top: 1px solid var(--sm-accent);
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgb(var(--sm-accent-rgb) / 0.35);
          border-radius: 999px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .paper-texture {
          background-image:
            radial-gradient(circle at 30% 20%, rgb(var(--sm-accent-rgb) / 0.04) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgb(var(--sm-accent-rgb) / 0.03) 0%, transparent 50%);
        }
        /* ── Cosmos (3D) ── */
        .cosmos { border-radius: 24px; overflow: hidden; border: 1px solid rgb(var(--sm-ink-rgb) / 0.1); box-shadow: inset 0 1px 0 rgb(var(--sm-ink-rgb) / 0.08), 0 30px 80px -30px rgba(0,0,0,0.9); }
        .cosmos-legend { position: absolute; left: 14px; top: 14px; padding: 10px 14px; border-radius: 18px; pointer-events: none; max-width: 70%; }
        .cosmos-legend__row { font-size: 13px; color: var(--sm-text2); line-height: 1.35; }
        .cosmos-tiers { position: absolute; right: 14px; top: 14px; padding: 10px 14px; border-radius: 18px; pointer-events: none; }
        .cosmos-tiers__item { font-variant: normal; letter-spacing: 0; font-size: 12px; color: var(--sm-accent); line-height: 1.6; }
        .cosmos-reset { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); padding: 0 18px; min-height: 44px; color: var(--sm-text); font-family: inherit; font-size: 14px; cursor: pointer; }
.cosmos-list-btn { pointer-events: auto; margin-top: 8px; min-height: 36px; padding: 0 14px; border-radius: 999px; border: 1px solid rgb(var(--sm-accent-rgb) / 0.45); background: rgb(var(--sm-accent-rgb) / 0.14); color: var(--sm-text); font-family: inherit; font-size: 13px; cursor: pointer; }
        @media (pointer: coarse) { .cosmos-list-btn { min-height: 44px; } }
        .cosmos-tip { max-width: min(300px, calc(100% - 16px)); white-space: normal !important; background: rgb(var(--sm-void-rgb) / 0.86); border: 1px solid rgb(var(--sm-accent-rgb) / 0.4); border-radius: 14px; padding: 6px 12px; white-space: nowrap; box-shadow: 0 10px 30px -10px rgba(0,0,0,.9); }
        .cosmos-tip__name { font-size: 15px; font-weight: 600; color: var(--sm-text); font-family: 'Noto Sans', Georgia, serif; }
        .cosmos-tip__meta { font-size: 0.75rem; color: var(--sm-accent); font-variant: normal; letter-spacing: 0; font-family: 'Noto Sans', Georgia, serif; }
        @media (max-width: 600px) { .cosmos.has-sel .cosmos-legend { display: none; } .cosmos-tiers { display: none; } .cosmos-legend { max-width: calc(100% - 28px); } }
        /* ── Apple Liquid Glass + HIG layer (black & gold) ── */
        .glass, .glass-modal, .sheet {
          background: var(--sm-surface);
          border: 1px solid rgb(var(--sm-ink-rgb) / 0.12);
          box-shadow: inset 0 1px 0 rgb(var(--sm-ink-rgb) / 0.05);
        }
        .sheet { border-bottom: 0; }
        .sheet, .glass-modal { background: var(--sm-raised); }
        .segmented {
          display: inline-flex; gap: 0; padding: 0; border-radius: 6px; border: 1px solid rgb(var(--sm-ink-rgb) / 0.2); overflow: hidden;
        }
        .seg-btn {
          min-height: 40px; padding: 0 16px; border-radius: 0; border: 0;
          background: transparent; color: var(--sm-text); font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit;
          transition: background .25s, color .25s, box-shadow .25s;
        }
        .seg-btn:hover { background: rgb(var(--sm-ink-rgb) / 0.06); }
        .seg-btn.is-on {
          color: var(--sm-text);
          background: var(--sm-raised);
          box-shadow: inset 0 -2px 0 var(--sm-accent);
        }
        header { box-shadow: inset 0 -1px 0 rgb(var(--sm-ink-rgb) / 0.1); }
        button:not(.deity-chip):not(.seg-btn) { border-radius: 6px !important; }
        button:not(.deity-chip) { transition: transform .15s ease, background .2s, color .2s; }
        button:not(.deity-chip):active { transform: scale(0.96); }
        input[type=search] { border-radius: 6px !important; min-height: 44px; font-size: 16px; }
        select { border-radius: 6px !important; min-height: 40px; }
        .deity-chip { border-radius: 8px !important; }
        .deity-chip.selected { box-shadow: 0 0 0 2px var(--sm-accent) !important; }
        .card { border-radius: 12px; border: 1px solid rgb(var(--sm-ink-rgb) / 0.1); background: var(--sm-surface) !important; box-shadow: inset 0 1px 0 rgb(var(--sm-ink-rgb) / 0.04); }
        .sheet-backdrop { background: rgb(var(--sm-scrim-rgb) / 0.5) !important; }
        @media (pointer: coarse) {
          .seg-btn { min-height: 44px; }
          header button { min-width: 44px; min-height: 44px; }
        }
        @media (max-width: 600px) { .deity-chip { max-width: none !important; flex: 1 1 100%; } }
        @media (prefers-reduced-transparency: reduce) {
          .glass, .glass-modal, .sheet, header { background: var(--sm-surface) !important; }
        }
        @media (prefers-contrast: more) {
          .glass, .glass-modal, .sheet, .deity-chip { border-color: rgb(var(--sm-ink-rgb) / 0.45) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
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
        onCompareClick={() => setCompareOpen(true)}
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

      <div style={{ padding: '12px 16px 0' }}>
       <div className="glass segmented" role="tablist" aria-label="View">
        {[['cosmos', 'Cosmos'], ['tiers', 'Tiers'], ['network', 'Network']].map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={viewMode === id}
            onClick={() => setViewMode(id)}
            className={'marginalia seg-btn' + (viewMode === id ? ' is-on' : '')}
          >
            {label}
          </button>
        ))}
       </div>
      </div>

      <main className="paper-texture" style={{ paddingBottom: sheetOpen ? '60vh' : '24px' }}>
        {viewMode === 'tiers' && TIER_ORDER.map((tier, idx) => (
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

        {viewMode === 'cosmos' && (
          <div style={{ padding: '10px 16px' }}>
            <CosmosView
              facets={facets}
              deityById={deityById}
              traditionById={traditionById}
              parallels={parallels}
              isFacetVisible={isFacetVisible}
              selectedFacetId={selectedFacetId}
              selectedRelated={selectedRelated}
              onSelect={selectFacet}
              onClear={clearSelection}
              colorFor={colorFor}
              onUnavailable={() => setViewMode('tiers')}
              onBrowseList={() => setViewMode('tiers')}
            />
          </div>
        )}

        {viewMode === 'network' && (
          <div className="px-4" style={{ padding: '10px 16px' }}>
            <NetworkView
              facets={facets}
              deityById={deityById}
              traditionById={traditionById}
              parallels={parallels}
              isFacetVisible={isFacetVisible}
              selectedFacetId={selectedFacetId}
              selectedRelated={selectedRelated}
              onSelect={selectFacet}
            />
          </div>
        )}

        <Footer meta={meta} totalDeities={totalDeities} totalFacets={facets.length} totalParallels={parallels.length} />
      </main>

      {sheetOpen && selectedFacet && (
        <DetailSheet
          compact={viewMode === 'cosmos'}
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

      {aboutOpen && <AboutModal meta={meta} parallels={parallels} onClose={() => setAboutOpen(false)} />}

      {compareOpen && (
        <CompareModal
          facets={facets}
          deityById={deityById}
          traditionById={traditionById}
          parallels={parallels}
          initialFacetId={selectedFacetId}
          onClose={() => setCompareOpen(false)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────
function Header({ meta, onAboutClick, onCompareClick, searchQuery, setSearchQuery, scholarlyMode, setScholarlyMode, filtersOpen, setFiltersOpen, visibleCount, totalCount, onFileUpload }) {
  const fileRef = useRef(null);

  return (
    <header style={{
      borderBottom: '1px solid rgb(var(--sm-accent-rgb) / 0.35)',
      background: 'rgb(var(--sm-void-rgb) / 0.86)',
      position: 'sticky',
      top: 'var(--nav-h, 0px)',
      zIndex: 30,
    }}>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h1 style={{ fontFamily: '"Amiri", serif', fontWeight: 400, fontSize: 'clamp(24px, 3.2vw, 32px)', lineHeight: 1.15, color: 'var(--sm-text)', letterSpacing: 0 }}>
              Parallels of the Gods
            </h1>
            <div className="marginalia mt-0.5" style={{ color: 'var(--sm-muted)' }}>
              {visibleCount} of {totalCount} facets shown
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={onCompareClick}
              className="smallcaps"
              style={{
                fontSize: '12px',
                padding: '6px 10px',
                border: '1px solid var(--sm-accent)',
                borderRadius: '2px',
                color: 'var(--sm-accent)',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Compare
            </button>
            <button
              onClick={onAboutClick}
              className="smallcaps"
              style={{
                fontSize: '12px',
                padding: '6px 10px',
                border: '1px solid var(--sm-accent)',
                borderRadius: '2px',
                color: 'var(--sm-accent)',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              About
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 relative">
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--sm-muted)' }} />
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
                background: 'var(--sm-deep)',
                border: '1px solid rgb(var(--sm-accent-rgb) / 0.4)',
                borderRadius: '2px',
                color: 'var(--sm-text)',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--sm-muted)', cursor: 'pointer' }}
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
              border: '1px solid rgb(var(--sm-accent-rgb) / 0.4)',
              borderRadius: '2px',
              background: filtersOpen ? 'var(--sm-accent)' : 'transparent',
              color: filtersOpen ? 'var(--sm-on-accent)' : 'var(--sm-accent)',
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
              border: '1px solid rgb(var(--sm-accent-rgb) / 0.4)',
              borderRadius: '2px',
              background: scholarlyMode ? 'var(--sm-accent)' : 'transparent',
              color: scholarlyMode ? 'var(--sm-on-accent)' : 'var(--sm-accent)',
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
              border: '1px solid rgb(var(--sm-accent-rgb) / 0.4)',
              borderRadius: '2px',
              background: 'transparent',
              color: 'var(--sm-accent)',
              cursor: 'pointer',
            }}
          >
            <Upload size={14} />
          </button>
          <input ref={fileRef} type="file" accept=".json,application/json" onChange={onFileUpload} style={{ display: 'none' }} />
        </div>
        {scholarlyMode && (
          <div className="mt-2 marginalia" style={{ color: 'var(--sm-accent)' }}>
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
      borderBottom: '1px solid rgb(var(--sm-accent-rgb) / 0.25)',
      background: 'var(--sm-deep)',
    }}>
      <div className="flex items-center justify-between mb-2">
        <div className="marginalia">Traditions</div>
        <div className="flex gap-2">
          <button onClick={onAll} className="marginalia" style={{ color: 'var(--sm-accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
            All
          </button>
          <span style={{ color: 'var(--sm-accent)' }}>·</span>
          <button onClick={onNone} className="marginalia" style={{ color: 'var(--sm-accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
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
                border: `1px solid ${active ? c.bg : 'rgb(var(--sm-ink-rgb) / 0.14)'}`,
                background: active ? c.bg : 'transparent',
                color: active ? 'var(--sm-text)' : 'var(--sm-muted)',
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
        ? 'linear-gradient(90deg, rgb(var(--sm-accent-rgb) / 0.07) 0%, rgb(var(--sm-accent-rgb) / 0.12) 50%, rgb(var(--sm-accent-rgb) / 0.07) 100%)'
        : 'transparent',
    }}>
      <div className="px-4 mb-3 flex items-baseline gap-3">
        <div style={{
          fontFamily: '"Amiri", serif',
          fontSize: '28px',
          fontWeight: 600,
          color: 'var(--sm-accent)',
          textShadow: 'none',
          lineHeight: 1,
          minWidth: '32px',
        }}>
          {meta.label}
        </div>
        <div className="flex-1">
          <div className="smallcaps" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sm-text)' }}>
            {meta.name}
          </div>
          <div className="marginalia" style={{ marginTop: '1px' }}>
            {meta.subtitle}
          </div>
        </div>
        <div className="marginalia" style={{ color: 'var(--sm-dim)' }}>
          {facets.length} {facets.length === 1 ? 'figure' : 'figures'}
        </div>
      </div>

      <div className="px-4 flex flex-wrap gap-2">
        {facets.length === 0 && (
          <div className="marginalia italic" style={{ color: 'var(--sm-dim)', fontStyle: 'italic', padding: '4px 8px' }}>
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
                padding: '9px 13px 10px 14px',
                background: 'var(--sm-surface)',
                border: '1px solid rgb(var(--sm-ink-rgb) / 0.1)',
                borderLeft: `3px solid ${c.edge}`,
                borderRadius: '3px',
                fontFamily: 'inherit',
                textAlign: 'left',
                maxWidth: '230px',
                position: 'relative',
              }}
            >
              <div style={{
                fontSize: '16px',
                fontWeight: 600,
                color: c.ink,
                lineHeight: 1.15,
                marginBottom: '2px',
              }}>
                {deity.primary_name}
              </div>
              <div className="marginalia" style={{
                color: c.fg,
                fontSize: '12px',
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
function DetailSheet({ facet, deity, tradition, facetById, deityById, traditionById, parallelsForFacet, parallelRecords, scholarlyMode, onClose, onClear, onSelectFacet, compact }) {
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
      {!compact && <div className="sheet-backdrop fade-in" style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={onClose} />}
      <div className="sheet fade-in" style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        maxHeight: compact ? '55vh' : '78vh',
        zIndex: 95,
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: '28px',
        borderTopRightRadius: '28px',
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
            <div style={{ width: 40, height: 4, background: 'rgb(var(--sm-accent-rgb) / 0.5)', borderRadius: 2 }} />
          </button>
        </div>

        {/* Header */}
        <div style={{ padding: '0 18px 12px', flexShrink: 0, borderBottom: '1px solid rgb(var(--sm-accent-rgb) / 0.25)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="marginalia" style={{
              padding: '2px 6px',
              background: c.bg,
              color: '#ffffff',
              borderRadius: '2px',
            }}>
              {tradition?.name || deity.tradition_id}
            </span>
            <button onClick={onClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sm-muted)' }} aria-label="Clear selection">
              <X size={16} />
            </button>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.1, color: 'var(--sm-text)', marginBottom: '3px' }}>
            {deity.primary_name}
          </h2>
          <div className="marginalia" style={{ color: c.fg, fontStyle: 'italic', fontVariant: 'normal' }}>
            {facet.facet_name} · Tier {String(facet.tier_assignment).toUpperCase()}
          </div>
          {deity.alternate_names && deity.alternate_names.length > 0 && (
            <div className="mt-1" style={{ fontSize: '12px', color: 'var(--sm-muted)', fontStyle: 'italic' }}>
              also: {deity.alternate_names.slice(0, 4).join(' · ')}
              {deity.alternate_names.length > 4 && ' …'}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, padding: '0 18px', borderBottom: '1px solid rgb(var(--sm-accent-rgb) / 0.2)', flexShrink: 0 }}>
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
                borderBottom: tab === t.id ? '2px solid var(--sm-accent)' : '2px solid transparent',
                color: tab === t.id ? 'var(--sm-text)' : 'var(--sm-muted)',
                fontWeight: tab === t.id ? 600 : 400,
                fontSize: '12px',
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
        <p style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--sm-text)' }}>
          {deity.summary || <em style={{ color: 'var(--sm-muted)' }}>No summary available.</em>}
        </p>
      </div>

      {facet.core_claim && (
        <div style={{ marginBottom: 14, padding: '12px 14px', background: 'var(--sm-deep)', borderLeft: '3px solid var(--sm-accent)' }}>
          <div className="marginalia mb-1">Core claim · {facet.facet_name}</div>
          <p style={{ fontSize: '15px', lineHeight: 1.5, fontStyle: 'italic', color: 'var(--sm-text2)' }}>
            {facet.core_claim}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
        {deity.etymology && (
          <div style={{ flex: 1 }}>
            <div className="marginalia mb-1">Etymology</div>
            <div style={{ fontSize: '13px', color: 'var(--sm-text2)' }}>{deity.etymology}</div>
          </div>
        )}
        {deity.earliest_attestation && (
          <div style={{ flex: 1 }}>
            <div className="marginalia mb-1">Earliest attestation</div>
            <div style={{ fontSize: '13px', color: 'var(--sm-text2)' }}>{deity.earliest_attestation}</div>
          </div>
        )}
      </div>

      {facet.valence && (
        <div style={{ marginBottom: 12 }}>
          <div className="marginalia mb-1">Valence</div>
          <div style={{ fontSize: '13px', color: 'var(--sm-text2)', textTransform: 'capitalize' }}>{facet.valence}</div>
        </div>
      )}
    </div>
  );
}

function ParallelsTab({ relatedFacetIds, explicitParallels, facetById, deityById, traditionById, scholarlyMode, onSelectFacet, c }) {
  const [specFilter, setSpecFilter] = useState('all'); // all | significant | specific
  const [typeFilter, setTypeFilter] = useState(() => new Set()); // empty = all evidence types
  if (relatedFacetIds.length === 0) {
    return (
      <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--sm-muted)', fontStyle: 'italic' }}>
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
  // Evidence types present among this facet's explicit parallels (docs/06 taxonomy).
  const evidenceTypes = Array.from(
    new Set(items.map(it => it.explicit?.type).filter(Boolean))
  ).sort();

  const shown = items.filter(it => {
    // specificity dimension
    if (specFilter !== 'all') {
      if (!it.explicit) return false;
      if (specFilter === 'significant' && it.explicit.specificity_significant !== true) return false;
      if (specFilter === 'specific' && it.explicit.specificity_band !== 'specific') return false;
    }
    // evidence-type dimension (empty set = all)
    if (typeFilter.size > 0) {
      if (!it.explicit?.type || !typeFilter.has(it.explicit.type)) return false;
    }
    return true;
  });

  function toggleType(t) {
    setTypeFilter(prev => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t); else next.add(t);
      return next;
    });
  }

  const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'significant', label: 'Significant (p<.05)' },
    { id: 'specific', label: 'Specific only' },
  ];

  const filterActive = specFilter !== 'all' || typeFilter.size > 0;

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
              fontSize: '12px',
              borderRadius: '2px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              border: `1px solid ${specFilter === f.id ? '#3f6e5e' : 'rgb(var(--sm-accent-rgb) / 0.4)'}`,
              background: specFilter === f.id ? '#3f6e5e' : 'transparent',
              color: specFilter === f.id ? '#ffffff' : 'var(--sm-accent)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      {evidenceTypes.length > 1 && (
        <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
          {evidenceTypes.map(t => {
            const on = typeFilter.has(t);
            return (
              <button
                key={t}
                onClick={() => toggleType(t)}
                title={`Filter by evidence type: ${t}`}
                className="marginalia"
                style={{
                  padding: '2px 7px',
                  fontSize: '12px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  border: `1px solid ${on ? 'var(--sm-accent)' : 'rgb(var(--sm-accent-rgb) / 0.4)'}`,
                  background: on ? 'var(--sm-accent)' : 'transparent',
                  color: on ? 'var(--sm-on-accent)' : 'var(--sm-accent)',
                }}
              >
                {t.replace(/-/g, ' ')}
              </button>
            );
          })}
        </div>
      )}
      <div className="marginalia mb-2" style={{ marginBottom: 10 }}>
        {shown.length} of {items.length} parallel{items.length === 1 ? '' : 's'}
        {filterActive ? ' (filtered)' : ' across traditions'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.length === 0 && (
          <div style={{ padding: '14px 0', textAlign: 'center', color: 'var(--sm-muted)', fontStyle: 'italic', fontSize: 13 }}>
            No parallels match this filter.
          </div>
        )}
        {shown.map(({ facet, deity, tradition, explicit }) => {
          const tc = colorFor(deity.tradition_id);
          return (
            <div key={facet.id} style={{
              border: '1px solid rgb(var(--sm-accent-rgb) / 0.3)',
              borderRadius: 2,
              padding: '10px 12px',
              background: 'var(--sm-canvas)',
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
                      color: 'var(--sm-text)',
                      borderRadius: '2px',
                      fontSize: '12px',
                    }}>
                      {tradition?.name || deity.tradition_id}
                    </span>
                    {explicit && (
                      <span className="marginalia" style={{
                        padding: '1px 5px',
                        background: 'var(--sm-accent)',
                        color: 'var(--sm-on-accent)',
                        borderRadius: '2px',
                        fontSize: '12px',
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
                          background: SPECIFICITY_COLORS[explicit.specificity_band] || 'var(--sm-muted)',
                          color: 'var(--sm-text)',
                          borderRadius: '2px',
                          fontSize: '12px',
                        }}
                      >
                        {explicit.specificity_band}
                      </span>
                    )}
                    {explicit?.specificity_significant === false && (
                      <span
                        className="marginalia"
                        title="Not statistically significant vs. the randomized null model (p ≥ 0.05)"
                        style={{
                          padding: '1px 5px',
                          background: 'transparent',
                          border: '1px solid #9c4a3a',
                          color: '#9c4a3a',
                          borderRadius: '2px',
                          fontSize: '12px',
                        }}
                      >
                        n.s.
                      </span>
                    )}
                    {explicit?.type && (
                      <span className="marginalia" title={explicit.descriptor || explicit.type} style={{
                        padding: '1px 5px',
                        background: 'rgb(var(--sm-accent-rgb) / 0.18)',
                        color: 'var(--sm-accent)',
                        borderRadius: '2px',
                        fontSize: '12px',
                      }}>
                        {explicit.type.replace(/-/g, ' ')}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: tc.ink, lineHeight: 1.2 }}>
                    {deity.primary_name}
                  </div>
                  <div className="marginalia" style={{ color: tc.fg, marginTop: 1 }}>
                    {facet.facet_name} · Tier {String(facet.tier_assignment).toUpperCase()}
                  </div>
                </button>
                <ArrowUpRight size={14} style={{ color: 'var(--sm-muted)', flexShrink: 0, marginTop: 4 }} />
              </div>

              {explicit?.basis && explicit.basis.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dotted rgb(var(--sm-accent-rgb) / 0.4)' }}>
                  <div className="marginalia mb-1">Why parallel</div>
                  <ul style={{ fontSize: '12.5px', color: 'var(--sm-text2)', lineHeight: 1.45, paddingLeft: 16, margin: 0 }}>
                    {explicit.basis.map((b, i) => (
                      <li key={i} style={{ marginBottom: 3 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {scholarlyMode && explicit?.scholarly_caveat && (
                <div style={{ marginTop: 8, padding: '8px 10px', background: 'var(--sm-surface)', borderLeft: '2px solid var(--sm-accent)' }}>
                  <div className="marginalia mb-1" style={{ color: 'var(--sm-accent)' }}>Scholarly note</div>
                  <div style={{ fontSize: '12px', color: 'var(--sm-text2)', lineHeight: 1.45, fontStyle: 'italic' }}>
                    {explicit.scholarly_caveat}
                  </div>
                </div>
              )}

              {scholarlyMode && explicit?.primary_text_evidence && (
                <div style={{ marginTop: 6 }}>
                  <div className="marginalia mb-1">Primary text evidence</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--sm-muted)', fontStyle: 'italic' }}>
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
        <div style={{ color: 'var(--sm-muted)', fontStyle: 'italic' }}>No primary sources listed.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sources.map((s, i) => (
            <li key={i} style={{
              padding: '8px 0',
              borderBottom: i < sources.length - 1 ? '1px dotted rgb(var(--sm-accent-rgb) / 0.3)' : 'none',
              fontSize: '14px',
              color: 'var(--sm-text)',
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
            background: 'rgb(var(--sm-accent-rgb) / 0.12)',
            border: '1px solid rgb(var(--sm-accent-rgb) / 0.3)',
            borderRadius: '2px',
            color: 'var(--sm-text2)',
            fontFamily: '"Noto Sans", system-ui, sans-serif',
          }}>
            {tag}
          </span>
        ))}
      </div>
      {facet.tier_assignment && (
        <div style={{ marginTop: 14 }}>
          <div className="marginalia mb-1">Tier assignment</div>
          <div style={{ fontSize: '14px', color: 'var(--sm-text)' }}>
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
function AboutModal({ meta, parallels = [], onClose }) {
  const stats = useMemo(() => {
    const total = parallels.length;
    const sig = parallels.filter(p => p.specificity_significant === true).length;
    const cited = parallels.filter(p => p.provenance === 'established').length;
    return { total, sig, cited };
  }, [parallels]);
  return (
    <>
      <div className="sheet-backdrop fade-in" style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={onClose} />
      <div className="fade-in glass-modal" style={{
        position: 'fixed',
        top: 'calc(50% + var(--nav-h, 0px) / 2)', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(560px, calc(100vw - 32px))',
        maxHeight: 'calc(100vh - 48px - var(--nav-h, 0px))',
        zIndex: 96,
        borderRadius: '26px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid rgb(var(--sm-accent-rgb) / 0.3)' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="marginalia">The framework</div>
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--sm-text)', lineHeight: 1.1 }}>
                Parallels of the Gods
              </h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sm-muted)' }}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="scrollbar-thin" style={{ overflowY: 'auto', padding: '16px 20px 20px' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: 14, color: 'var(--sm-text)' }}>
            Every culture has named the divine differently — but the structures repeat. The unknowable Source. The Most High and the divine council. The craftsman-god who shaped this world. The rulers who govern it. The light-bringers who descend to wake us up.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: 14, color: 'var(--sm-text)' }}>
            This atlas lays every documented deity onto a four-tier framework derived from Gnostic cosmology and verified against Hermetic, Kabbalistic, Vedantic, Platonic, Egyptian, Norse, and Mesopotamian sources.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.5, marginBottom: 18, color: 'var(--sm-text)', fontStyle: 'italic' }}>
            The names change. The structure does not.
          </p>

          <div className="codex-rule" style={{ margin: '14px 0' }} />

          <div className="marginalia mb-2">The five layers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TIER_ORDER.map(t => {
              const m = TIER_META[t];
              return (
                <div key={t} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ minWidth: 28, fontSize: '20px', fontStyle: 'italic', color: 'var(--sm-accent)', fontWeight: 600, lineHeight: 1 }}>
                    {m.label}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="smallcaps" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sm-text)' }}>
                      {m.name}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--sm-text2)', marginTop: 1, lineHeight: 1.4 }}>
                      {m.subtitle} — {(meta.tier_definitions && meta.tier_definitions[t]) || ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="codex-rule" style={{ margin: '18px 0' }} />

          <div className="marginalia mb-2">How to read this map</div>
          <ol style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'var(--sm-text)', paddingLeft: 18, margin: 0 }}>
            <li style={{ marginBottom: 6 }}>Tap any figure to open its detail panel.</li>
            <li style={{ marginBottom: 6 }}>Selected figures glow gold. Their parallels across traditions glow softer — others dim.</li>
            <li style={{ marginBottom: 6 }}>Switch to the <em>Parallels</em> tab to see why each match holds.</li>
            <li style={{ marginBottom: 6 }}>Toggle <em>Scholarly mode</em> ✶ to surface academic caveats on each parallel.</li>
            <li style={{ marginBottom: 6 }}>Filter traditions on or off with the funnel icon.</li>
            <li>Upload a larger JSON dataset with the ⬆ icon — the schema is documented in the spec package.</li>
          </ol>

          <div className="codex-rule" style={{ margin: '18px 0' }} />

          <div className="marginalia mb-2">Reading the badges</div>
          <div style={{ fontSize: '13px', color: 'var(--sm-text2)', lineHeight: 1.5, marginBottom: 8 }}>
            Each parallel is weighted by how <em>rare</em> the structural function it
            shares is across the whole dataset — the guard against "everything
            resembles everything". A badge shows the band:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
            {[
              ['specific', 'Shares rare structural tags — the strongest match'],
              ['moderate', 'Shares mid-frequency tags'],
              ['universal-motif', 'Shares only common tags (e.g. “dying-rising god”) — weak'],
              ['tag-divergent', 'Shares no function-tag — rests on its written basis'],
            ].map(([band, desc]) => (
              <div key={band} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span className="marginalia" style={{
                  padding: '1px 5px', fontSize: '12px', borderRadius: '2px',
                  background: SPECIFICITY_COLORS[band] || 'var(--sm-muted)', color: 'var(--sm-text)', whiteSpace: 'nowrap',
                }}>{band}</span>
                <span style={{ fontSize: '12.5px', color: 'var(--sm-text2)' }}>{desc}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--sm-text2)', lineHeight: 1.5, marginBottom: 4 }}>
            <span className="marginalia" style={{
              padding: '1px 5px', fontSize: '12px', borderRadius: '2px',
              border: '1px solid #9c4a3a', color: '#9c4a3a',
            }}>n.s.</span> marks a parallel that a randomized null model can't
            distinguish from two random figures (p ≥ 0.05). Use the
            <em> Significant</em> / <em>Specific</em> filters on the Parallels tab to
            hide the weak ones.
          </div>

          <div className="codex-rule" style={{ margin: '18px 0' }} />

          <div className="marginalia">Data</div>
          <div style={{ fontSize: '12px', color: 'var(--sm-muted)', marginTop: 4 }}>
            Schema v{meta.schema_version || '—'} · Dataset v{meta.version || '—'}
          </div>
          {stats.total > 0 && (
            <div style={{ fontSize: '12px', color: 'var(--sm-muted)', marginTop: 4 }}>
              {stats.total} parallels · <strong>{stats.sig} statistically significant</strong> (p&lt;.05
              vs a randomized null model) · {stats.cited} citation-backed
            </div>
          )}
          {meta.description && (
            <p style={{ fontSize: '12px', color: 'var(--sm-muted)', marginTop: 4, fontStyle: 'italic', lineHeight: 1.4 }}>
              {meta.description}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CompareModal — side-by-side comparison of any two facets (docs/00 §4)
// ─────────────────────────────────────────────────────────────────────────────
function CompareModal({ facets, deityById, traditionById, parallels, initialFacetId, onClose }) {
  // facet options sorted by deity name for the two pickers
  const options = useMemo(() => {
    return facets
      .map(f => {
        const d = deityById[f.parent_deity_id];
        if (!d) return null;
        const t = traditionById[d.tradition_id];
        return { id: f.id, label: `${d.primary_name} · ${f.facet_name} (${t?.name || d.tradition_id})` };
      })
      .filter(Boolean)
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [facets, deityById, traditionById]);

  const facetById = useMemo(() => Object.fromEntries(facets.map(f => [f.id, f])), [facets]);
  const [aId, setAId] = useState(initialFacetId || (options[0] && options[0].id) || '');
  const [bId, setBId] = useState((options[1] && options[1].id) || '');

  const a = facetById[aId];
  const b = facetById[bId];
  const da = a && deityById[a.parent_deity_id];
  const db = b && deityById[b.parent_deity_id];

  // shared function-tags (the raw material of the specificity weight)
  const sharedTags = (a && b)
    ? (a.function_tags || []).filter(t => (b.function_tags || []).includes(t))
    : [];

  // is there a canonical parallel between these two facets?
  const link = (a && b) ? parallels.find(p =>
    (p.facet_a_id === aId && p.facet_b_id === bId) ||
    (p.facet_a_id === bId && p.facet_b_id === aId)) : null;

  const Picker = ({ value, onChange }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', padding: '6px 8px', fontFamily: 'inherit', fontSize: '13px',
        background: 'var(--sm-deep)', border: '1px solid rgb(var(--sm-accent-rgb) / 0.5)', borderRadius: '2px',
        color: 'var(--sm-text)',
      }}
    >
      {options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
    </select>
  );

  const Column = ({ facet, deity }) => {
    if (!facet || !deity) return <div style={{ flex: 1, color: 'var(--sm-muted)', fontStyle: 'italic' }}>—</div>;
    const tc = colorFor(deity.tradition_id);
    const t = traditionById[deity.tradition_id];
    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="marginalia" style={{ padding: '2px 6px', background: tc.bg, color: '#ffffff', borderRadius: '2px', display: 'inline-block' }}>
          {t?.name || deity.tradition_id}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--sm-text)', marginTop: 4 }}>{deity.primary_name}</div>
        <div className="marginalia" style={{ color: tc.fg }}>{facet.facet_name} · Tier {String(facet.tier_assignment).toUpperCase()}</div>
        {facet.valence && <div style={{ fontSize: 12, color: 'var(--sm-text2)', marginTop: 4, textTransform: 'capitalize' }}>{facet.valence}</div>}
        <div className="marginalia" style={{ marginTop: 8, marginBottom: 2 }}>Function tags</div>
        <div className="flex flex-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {(facet.function_tags || []).map(tag => (
            <span key={tag} style={{
              padding: '2px 6px', fontSize: 12, borderRadius: 2,
              background: sharedTags.includes(tag) ? '#3f6e5e' : 'rgb(var(--sm-accent-rgb) / 0.12)',
              color: sharedTags.includes(tag) ? '#ffffff' : 'var(--sm-text2)',
              fontFamily: '"Noto Sans", system-ui, sans-serif',
            }}>{tag}</span>
          ))}
        </div>
        {facet.core_claim && (
          <>
            <div className="marginalia" style={{ marginTop: 8, marginBottom: 2 }}>Core claim</div>
            <div style={{ fontSize: 13, color: 'var(--sm-text2)', fontStyle: 'italic', lineHeight: 1.45 }}>{facet.core_claim}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="sheet-backdrop fade-in" style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={onClose} />
      <div className="fade-in glass-modal" style={{
        position: 'fixed', top: 'calc(50% + var(--nav-h, 0px) / 2)', left: '50%', transform: 'translate(-50%, -50%)',
        width: 'min(720px, calc(100vw - 32px))', maxHeight: 'calc(100vh - 48px - var(--nav-h, 0px))', zIndex: 96,
        borderRadius: '26px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgb(var(--sm-accent-rgb) / 0.3)' }}>
          <div className="flex items-start justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="marginalia">Compare two figures</div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--sm-text)', lineHeight: 1.1 }}>Side by side</h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sm-muted)' }}><X size={18} /></button>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <div style={{ flex: 1 }}><Picker value={aId} onChange={setAId} /></div>
            <div style={{ flex: 1 }}><Picker value={bId} onChange={setBId} /></div>
          </div>
        </div>
        <div className="scrollbar-thin" style={{ overflowY: 'auto', padding: '16px 20px 20px' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <Column facet={a} deity={da} />
            <Column facet={b} deity={db} />
          </div>

          <div className="codex-rule" style={{ margin: '16px 0' }} />

          <div className="marginalia mb-1">Shared structural tags</div>
          {sharedTags.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {sharedTags.map(t => (
                <span key={t} style={{ padding: '2px 6px', fontSize: 12, borderRadius: 2, background: '#3f6e5e', color: '#ffffff', fontFamily: '"Noto Sans", system-ui, sans-serif' }}>{t}</span>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--sm-muted)', fontStyle: 'italic' }}>
              No shared function-tags — any parallel between these two rests on its written basis, not tag overlap.
            </div>
          )}

          <div className="marginalia mb-1" style={{ marginTop: 12 }}>Canonical parallel</div>
          {link ? (
            <div style={{ border: '1px solid rgb(var(--sm-accent-rgb) / 0.3)', borderRadius: 2, padding: '10px 12px', background: 'var(--sm-deep)' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                {link.strength && <span className="marginalia" style={{ padding: '1px 5px', background: 'var(--sm-accent)', color: 'var(--sm-on-accent)', borderRadius: 2, fontSize: 12 }}>{link.strength}</span>}
                {link.specificity_band && <span className="marginalia" style={{ padding: '1px 5px', background: SPECIFICITY_COLORS[link.specificity_band] || 'var(--sm-muted)', color: 'var(--sm-text)', borderRadius: 2, fontSize: 12 }}>{link.specificity_band}</span>}
                {link.specificity_significant === false && <span className="marginalia" style={{ padding: '1px 5px', border: '1px solid #9c4a3a', color: '#9c4a3a', borderRadius: 2, fontSize: 12 }}>n.s.</span>}
                {link.type && <span className="marginalia" style={{ padding: '1px 5px', background: 'rgb(var(--sm-accent-rgb) / 0.18)', color: 'var(--sm-accent)', borderRadius: 2, fontSize: 12 }}>{link.type.replace(/-/g, ' ')}</span>}
              </div>
              {Array.isArray(link.basis) && (
                <ul style={{ fontSize: 12.5, color: 'var(--sm-text2)', lineHeight: 1.45, paddingLeft: 16, margin: 0 }}>
                  {link.basis.map((bb, i) => <li key={i} style={{ marginBottom: 3 }}>{bb}</li>)}
                </ul>
              )}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--sm-muted)', fontStyle: 'italic' }}>
              No canonical parallel is recorded between these two facets.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Network layout — pure function, no DOM/canvas dependency.
//
// Deliberately separated from NetworkView's canvas drawing below so it can be
// unit-tested directly in plain Node (no browser, no happy-dom — which does not
// implement canvas.getContext at all). This is the part most likely to hide a
// bug (angle math, tier-ring assignment); the drawing code is comparatively
// mechanical. Exported as a named export for exactly that purpose.
//
// Deterministic: no Math.random(), no Date.now() — same input always produces
// the same layout, so it's reproducible and testable.
//
// Radial "constellation" layout (docs/00 §4 names this view mode explicitly):
// Tier 1 at the center, then Tier 2, Cross-Tier, Tier 3, Tier 4 outward, one
// ring per tier. Within a ring, nodes start evenly spaced by angle (sorted by
// id for a stable order), then a few cheap relaxation passes (a) pull each
// node's angle toward the circular mean of its edge-neighbors' angles, so
// connected nodes cluster together, and (b) push apart any same-ring nodes
// that end up closer than a minimum angular gap, so labels/dots don't stack.
// ─────────────────────────────────────────────────────────────────────────────
export function computeNetworkLayout(nodes, edges, opts = {}) {
  const ringGap = opts.ringGap ?? 100;
  const baseRadius = opts.baseRadius ?? 70;
  const passes = opts.passes ?? 4;
  const pull = opts.pull ?? 0.25;
  const minSpacingPx = opts.minSpacingPx ?? 14;

  const ringIndex = {};
  TIER_ORDER.forEach((t, i) => { ringIndex[t] = i; });

  const rings = {}; // ringIdx -> [nodeId,...]
  const tierOf = {};
  nodes.forEach((n) => {
    const idx = ringIndex[n.tier] ?? TIER_ORDER.length - 1;
    tierOf[n.id] = idx;
    (rings[idx] = rings[idx] || []).push(n.id);
  });
  Object.values(rings).forEach((ids) => ids.sort()); // stable, deterministic order

  const angle = {};
  Object.entries(rings).forEach(([idx, ids]) => {
    const n = ids.length;
    ids.forEach((id, i) => { angle[id] = (2 * Math.PI * i) / Math.max(1, n); });
  });

  // adjacency, restricted to nodes actually present (edges to off-screen /
  // filtered-out nodes are simply not present in `nodes`, so they drop out)
  const present = new Set(nodes.map((n) => n.id));
  const neighbors = {};
  edges.forEach(([a, b]) => {
    if (!present.has(a) || !present.has(b)) return;
    (neighbors[a] = neighbors[a] || []).push(b);
    (neighbors[b] = neighbors[b] || []).push(a);
  });

  for (let p = 0; p < passes; p++) {
    // (a) pull toward circular mean of neighbor angles
    const next = { ...angle };
    for (const id of present) {
      const nbrs = neighbors[id];
      if (!nbrs || !nbrs.length) continue;
      let sx = 0, sy = 0;
      for (const nb of nbrs) { sx += Math.cos(angle[nb]); sy += Math.sin(angle[nb]); }
      const meanAngle = Math.atan2(sy, sx);
      // shortest angular distance, then damped step toward it
      let d = meanAngle - angle[id];
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      next[id] = angle[id] + d * pull;
    }
    Object.assign(angle, next);

    // (b) same-ring declutter: sort by angle, push apart neighbors closer
    // than the minimum gap for that ring's radius
    Object.entries(rings).forEach(([idx, ids]) => {
      if (ids.length < 2) return;
      const radius = baseRadius + Number(idx) * ringGap;
      const minGap = Math.min(Math.PI / 3, minSpacingPx / radius);
      const sorted = [...ids].sort((a, b) => angle[a] - angle[b]);
      for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1], cur = sorted[i];
        const gap = angle[cur] - angle[prev];
        if (gap < minGap) angle[cur] = angle[prev] + minGap;
      }
      // wrap-around pair (last -> first)
      const first = sorted[0], last = sorted[sorted.length - 1];
      const wrapGap = angle[first] + 2 * Math.PI - angle[last];
      if (wrapGap < minGap) angle[first] = angle[last] + minGap - 2 * Math.PI;
    });
  }

  const degree = {};
  edges.forEach(([a, b]) => {
    if (!present.has(a) || !present.has(b)) return;
    degree[a] = (degree[a] || 0) + 1;
    degree[b] = (degree[b] || 0) + 1;
  });

  const positions = {};
  nodes.forEach((n) => {
    const idx = tierOf[n.id];
    const radius = baseRadius + idx * ringGap;
    const a = angle[n.id] || 0;
    positions[n.id] = {
      x: radius * Math.cos(a),
      y: radius * Math.sin(a),
      ring: idx,
      angle: a,
      degree: degree[n.id] || 0,
    };
  });
  return positions;
}

// ─────────────────────────────────────────────────────────────────────────────
// NetworkView — the radial "constellation" graph (docs/00 §4). Renders visible
// facets as nodes on <canvas>, canonical parallels as edges colored/weighted by
// the specificity work (band color; faint + thin when not statistically
// significant). Click selects a facet through the same onSelect callback the
// tier-band view uses, so the detail sheet behaves identically either way.
// ─────────────────────────────────────────────────────────────────────────────
function NetworkView({ facets, deityById, traditionById, parallels, isFacetVisible, selectedFacetId, selectedRelated, onSelect }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const dragRef = useRef(null);
  const posRef = useRef({});

  const visibleFacets = useMemo(() => facets.filter(isFacetVisible), [facets, isFacetVisible]);
  const nodeList = useMemo(
    () => visibleFacets.map((f) => ({ id: f.id, tier: f.tier_assignment })),
    [visibleFacets]
  );
  const visibleIds = useMemo(() => new Set(nodeList.map((n) => n.id)), [nodeList]);
  const edgeList = useMemo(
    () =>
      parallels
        .filter((p) => visibleIds.has(p.facet_a_id) && visibleIds.has(p.facet_b_id))
        .map((p) => [p.facet_a_id, p.facet_b_id, p]),
    [parallels, visibleIds]
  );

  const positions = useMemo(
    () => computeNetworkLayout(nodeList, edgeList.map(([a, b]) => [a, b])),
    [nodeList, edgeList]
  );
  posRef.current = positions;

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Guard rather than assume: real browsers always implement getContext,
    // but a headless/exotic environment might not (verified happy-dom does
    // not, during development of this view) — fail quiet, not crash.
    let ctx = null;
    try { ctx = typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null; }
    catch { ctx = null; }
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 600;
    const h = canvas.clientHeight || 520;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = PAL().canvas;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w / 2 + transform.x, h / 2 + transform.y);
    ctx.scale(transform.scale, transform.scale);

    // tier rings (faint)
    const ringRadii = new Set(Object.values(positions).map((p) => p.ring));
    ctx.strokeStyle = PAL().ring;
    ctx.lineWidth = 1 / transform.scale;
    ringRadii.forEach((idx) => {
      const r = 70 + idx * 100;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // edges
    edgeList.forEach(([a, b, p]) => {
      const pa = positions[a], pb = positions[b];
      if (!pa || !pb) return;
      const isSelectedEdge = selectedFacetId && (a === selectedFacetId || b === selectedFacetId);
      const band = p.specificity_band;
      const sig = p.specificity_significant;
      let color = PAL().band[band] || PAL().dim;
      let alpha = sig ? 0.6 : 0.18;
      let width = sig ? 1.4 : 0.7;
      if (isSelectedEdge) { alpha = 0.95; width = 2.2; }
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width / transform.scale;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // nodes
    nodeList.forEach((n) => {
      const pos = positions[n.id];
      if (!pos) return;
      const facet = facets.find((f) => f.id === n.id); // small visible set; fine
      const deity = facet && deityById[facet.parent_deity_id];
      const c = colorFor(deity ? deity.tradition_id : null);
      const isSelected = n.id === selectedFacetId;
      const isRelated = selectedFacetId && selectedRelated.has(n.id);
      const isDimmed = selectedFacetId && !isSelected && !isRelated;
      const r = (2.5 + Math.min(6, pos.degree * 0.7)) / Math.sqrt(transform.scale);

      ctx.globalAlpha = isDimmed ? 0.25 : 1;
      ctx.fillStyle = c.edge;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      ctx.fill();
      if (isSelected || isRelated) {
        ctx.strokeStyle = PAL().accent;
        ctx.lineWidth = (isSelected ? 2.5 : 1.5) / transform.scale;
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  useEffect(() => { draw(); });

  useEffect(() => {
    function onResize() { draw(); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function screenToWorld(clientX, clientY) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    const x = (clientX - rect.left - w / 2 - transform.x) / transform.scale;
    const y = (clientY - rect.top - h / 2 - transform.y) / transform.scale;
    return { x, y };
  }

  function hitTest(clientX, clientY) {
    const { x, y } = screenToWorld(clientX, clientY);
    let best = null, bestDist = 14 / transform.scale; // px hit radius in world units
    nodeList.forEach((n) => {
      const pos = positions[n.id];
      if (!pos) return;
      const d = Math.hypot(pos.x - x, pos.y - y);
      if (d < bestDist) { bestDist = d; best = n.id; }
    });
    return best;
  }

  function onPointerDown(e) {
    dragRef.current = { startX: e.clientX, startY: e.clientY, moved: false, tx: transform.x, ty: transform.y };
  }
  function onPointerMove(e) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
    if (Math.hypot(dx, dy) > 3) drag.moved = true;
    if (drag.moved) setTransform((t) => ({ ...t, x: drag.tx + dx, y: drag.ty + dy }));
  }
  function onPointerUp(e) {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag && !drag.moved) {
      const hit = hitTest(e.clientX, e.clientY);
      if (hit) onSelect(hit);
    }
  }
  function onWheel(e) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    setTransform((t) => ({ ...t, scale: Math.min(3, Math.max(0.35, t.scale * factor)) }));
  }

  return (
    <div ref={wrapRef} className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="marginalia" style={{ padding: '10px 12px 0' }}>
        {nodeList.length} figures · {edgeList.length} parallels shown · scroll to zoom, drag to pan, tap a node to open it
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '70vh', minHeight: 420, display: 'block', cursor: 'grab', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer({ meta, totalDeities, totalFacets, totalParallels }) {
  return (
    <footer style={{
      borderTop: '1px solid rgb(var(--sm-accent-rgb) / 0.3)',
      marginTop: 16,
      padding: '14px 18px 22px',
      background: 'transparent',
    }}>
      <div className="codex-rule mb-3" />
      <div className="marginalia" style={{ textAlign: 'center', color: 'var(--sm-muted)' }}>
        {totalDeities} figures · {totalFacets} facets · {totalParallels} canonical parallels
      </div>
      <div className="marginalia" style={{ textAlign: 'center', color: 'var(--sm-muted)', marginTop: 6, fontSize: '12px' }}>
        Schema v{meta.schema_version || '—'} · Data v{meta.version || '—'}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: '12px', color: 'var(--sm-dim)', fontStyle: 'italic' }}>
        The names change. The structure does not.
      </div>
    </footer>
  );
}
