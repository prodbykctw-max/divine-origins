/* =============================================================
   data/source-map/parallels.js
   
   PARALLEL DETECTION ENGINE
   
   Algorithm from COMPARATIVE COSMOLOGY FULL DEITY ARCHITECTURE:
   
   For each pair of facets (A, B) across different traditions:
   1. Compute tag overlap: |tags(A) ∩ tags(B)| / |tags(A) ∪ tags(B)|  (Jaccard)
   2. Weight by tag rarity (rare tags count more)
   3. Weight by tier alignment (same-tier matches score higher)
   4. Weight by archetypal-role match
   5. Surface results above threshold (>0.3) as candidate parallels
   6. Mark canonical if a primary source explicitly identifies them
   ============================================================= */

import { FACETS_V2, CANONICAL_PARALLELS, TRADITIONS_V2 } from './deities-v2.js';

// ── TAG RARITY WEIGHTS ────────────────────────────────────────
// Common tags count less; rare/specific tags count more.
// The more specific the tag, the stronger the structural match.
const TAG_WEIGHTS = {
  // High weight — very specific structural roles
  'unmanifest-source':          3.0,
  'ignorant-of-source':         3.0,
  'false-most-high':            3.0,
  'sacrificed-god':             2.8,
  'dying-rising-god':           2.8,
  'forbidden-knowledge-giver':  2.8,
  'bound-god':                  2.5,
  'mother-of-demiurge':         2.5,
  'fallen-emanation':           2.5,
  'harrowing-of-underworld':    2.5,
  'self-offering':              2.5,
  'wisdom-through-suffering':   2.5,
  'civilizing-god':             2.3,
  'exiled-god':                 2.3,
  'returning-god':              2.3,
  'silent-transmission':        2.3,
  'usurper':                    2.0,
  'trickster':                  2.0,
  'shape-shifter':              2.0,
  'culture-hero':               1.8,
  'light-bringer':              1.8,
  'psychopomp':                 1.8,
  'mediator':                   1.8,
  'wisdom-bringer':             1.6,
  'descended-god':              1.6,
  'cross-tier':                 1.5,
  'fratricide':                 1.5,
  'betrayer':                   1.5,

  // Medium weight — functional roles
  'destroyer':       1.3,
  'transformer':     1.3,
  'fate-governor':   1.2,
  'divine-council-head': 1.2,
  'first-emanation': 1.2,
  'craftsman-creator': 1.2,
  'cosmic-order':    1.1,
  'redeemer':        1.1,
  'ascetic':         1.1,
  'erotic':          1.0,

  // Lower weight — common attributes
  'sky':      0.6,
  'storm':    0.7,
  'war':      0.7,
  'father':   0.6,
  'mother':   0.6,
  'death':    0.7,
  'fire':     0.8,
  'wisdom':   0.8,
  'law':      0.7,
};

const DEFAULT_TAG_WEIGHT = 1.0;

function tagWeight(tag) {
  return TAG_WEIGHTS[tag] ?? DEFAULT_TAG_WEIGHT;
}

// ── WEIGHTED JACCARD SIMILARITY ──────────────────────────────
function weightedJaccard(tagsA, tagsB) {
  if (!tagsA?.length || !tagsB?.length) return 0;

  const setA = new Set(tagsA);
  const setB = new Set(tagsB);

  const allTags = new Set([...tagsA, ...tagsB]);
  let intersection = 0;
  let union = 0;

  for (const tag of allTags) {
    const w = tagWeight(tag);
    if (setA.has(tag) && setB.has(tag)) {
      intersection += w;
    }
    union += w;
  }

  return union === 0 ? 0 : intersection / union;
}

// ── TIER ALIGNMENT BONUS ──────────────────────────────────────
function tierBonus(tierA, tierB) {
  if (tierA === tierB) return 0.15;
  // Adjacent tiers get a smaller bonus
  const diff = Math.abs(
    (tierA === 'cross-tier' ? 0 : tierA) -
    (tierB === 'cross-tier' ? 0 : tierB)
  );
  if (diff === 1) return 0.05;
  return 0;
}

// ── CROSS-TRADITION CHECK ─────────────────────────────────────
// We only surface cross-tradition parallels (same tradition = less interesting)
function differentTraditions(facetA, facetB) {
  const deityA = FACETS_V2.find(f => f.id === facetA.id);
  const deityB = FACETS_V2.find(f => f.id === facetB.id);
  // For now, check if parent_deity_ids are different
  return facetA.parent_deity_id !== facetB.parent_deity_id;
}

// ── CANONICAL PARALLEL LOOKUP ─────────────────────────────────
const canonicalSet = new Set(
  CANONICAL_PARALLELS.flatMap(p => [
    `${p.facet_a}|${p.facet_b}`,
    `${p.facet_b}|${p.facet_a}`,
  ])
);

export function isCanonicalParallel(facetIdA, facetIdB) {
  return canonicalSet.has(`${facetIdA}|${facetIdB}`);
}

export function getCanonicalParallel(facetIdA, facetIdB) {
  return CANONICAL_PARALLELS.find(p =>
    (p.facet_a === facetIdA && p.facet_b === facetIdB) ||
    (p.facet_a === facetIdB && p.facet_b === facetIdA)
  ) ?? null;
}

// ── MAIN: COMPUTE PARALLELS FOR A FACET ──────────────────────
export function computeParallels(facetId, options = {}) {
  const {
    threshold = 0.28,
    maxResults = 12,
    includeSameTradition = false,
  } = options;

  const facet = FACETS_V2.find(f => f.id === facetId);
  if (!facet) return [];

  const results = [];

  for (const other of FACETS_V2) {
    if (other.id === facetId) continue;
    if (!includeSameTradition && other.parent_deity_id === facet.parent_deity_id) continue;

    let score = weightedJaccard(facet.function_tags, other.function_tags);
    score += tierBonus(facet.tier_assignment, other.tier_assignment);

    const canonical = isCanonicalParallel(facetId, other.id);
    if (canonical) score = Math.max(score, 0.65); // canonical parallels always surface

    if (score >= threshold) {
      results.push({
        facet: other,
        score: Math.round(score * 100) / 100,
        canonical,
        canonicalData: canonical ? getCanonicalParallel(facetId, other.id) : null,
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// ── CLUSTER: GROUP FACETS BY STRUCTURAL FUNCTION ──────────────
// Surface all facets that belong to the same "cluster" of function tags.
// e.g., clicking "trickster" shows all trickster-facets across all traditions.
export function getFacetsByTag(tag) {
  return FACETS_V2.filter(f => f.function_tags?.includes(tag));
}

export function getTopParallelClusters(topN = 20) {
  // Find the tags that appear most often and have high weight
  const tagCounts = {};
  for (const facet of FACETS_V2) {
    for (const tag of (facet.function_tags || [])) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  return Object.entries(tagCounts)
    .filter(([tag, count]) => count >= 3)
    .sort((a, b) => {
      // Sort by weighted occurrence (count × weight)
      const wa = a[1] * (TAG_WEIGHTS[a[0]] ?? 1);
      const wb = b[1] * (TAG_WEIGHTS[b[0]] ?? 1);
      return wb - wa;
    })
    .slice(0, topN)
    .map(([tag, count]) => ({
      tag,
      count,
      weight: TAG_WEIGHTS[tag] ?? 1.0,
      facets: getFacetsByTag(tag),
    }));
}

// ── COMPARISON: DIFF TWO FACETS ───────────────────────────────
export function compareFacets(facetIdA, facetIdB) {
  const a = FACETS_V2.find(f => f.id === facetIdA);
  const b = FACETS_V2.find(f => f.id === facetIdB);
  if (!a || !b) return null;

  const setA = new Set(a.function_tags || []);
  const setB = new Set(b.function_tags || []);

  const shared    = [...setA].filter(t => setB.has(t));
  const onlyInA   = [...setA].filter(t => !setB.has(t));
  const onlyInB   = [...setB].filter(t => !setA.has(t));

  const score = weightedJaccard(a.function_tags, b.function_tags);
  const canonical = isCanonicalParallel(facetIdA, facetIdB);

  return {
    facetA: a,
    facetB: b,
    sharedTags: shared,
    uniqueToA: onlyInA,
    uniqueToB: onlyInB,
    similarityScore: Math.round(score * 100) / 100,
    tierMatch: a.tier_assignment === b.tier_assignment,
    canonical,
    canonicalData: canonical ? getCanonicalParallel(facetIdA, facetIdB) : null,
    interpretationNotes: canonical ? getCanonicalParallel(facetIdA, facetIdB)?.scholarly_note : null,
  };
}
