#!/usr/bin/env python3
"""Merge expansion batches into a new canonical seed.

    python3 tools/merge_batches.py BASE.json OUT.json batch1.json [batch2.json ...]

Each batch: {traditions, deities, facets, parallels, deity_updates} (see
data/batches/README.md). Rules applied:
  - Ids already present (base or an earlier batch) are skipped, along with their
    facets; parallels pointing at a skipped facet are dropped and reported.
  - Facets whose parent is an existing deity are appended to that deity's facets.
  - deity_updates add alternate names (case-insensitive dedupe).
  - Parallels are deduped on the unordered facet pair (base wins, then batch order),
    never link two facets of one deity, and are mirrored into both facets'
    parallel_facets lists.
  - provenance/triage for new parallels: identity, derivation or
    documented-historical-transmission -> candidate / known-uncited; otherwise
    candidate / genuine-novel. Specificity is recomputed for every parallel.
"""
import json, sys, collections, os
sys.path.insert(0, os.path.dirname(__file__))
import specificity

base_path, out_path, *batch_paths = sys.argv[1:]
data = json.load(open(base_path))
T = {t['id'] for t in data['traditions']}
D = {d['id']: d for d in data['deities']}
F = {f['id']: f for f in data['facets']}
pairs = {frozenset((p['facet_a_id'], p['facet_b_id'])) for p in data['canonical_parallels']}
log = collections.defaultdict(list)
added = collections.Counter()

def norm_names(existing, new):
    seen = {n.lower() for n in existing}
    out = list(existing)
    for n in new:
        if n.lower() not in seen:
            out.append(n); seen.add(n.lower())
    return out

for bp in batch_paths:
    tag = os.path.splitext(os.path.basename(bp))[0]
    b = json.load(open(bp))
    for t in b.get('traditions', []):
        if t['id'] in T: log['skip_tradition'].append(f"{tag}:{t['id']}"); continue
        data['traditions'].append(t); T.add(t['id']); added['traditions'] += 1
    skipped_deities = set()
    for d in b.get('deities', []):
        if d['id'] in D:
            skipped_deities.add(d['id']); log['skip_deity'].append(f"{tag}:{d['id']}"); continue
        if d['tradition_id'] not in T:
            skipped_deities.add(d['id']); log['bad_tradition'].append(f"{tag}:{d['id']}->{d['tradition_id']}"); continue
        d = dict(d); d['facets'] = []
        data['deities'].append(d); D[d['id']] = d; added['deities'] += 1
    for f in b.get('facets', []):
        if f['id'] in F or f['parent_deity_id'] in skipped_deities or f['parent_deity_id'] not in D:
            log['skip_facet'].append(f"{tag}:{f['id']}"); continue
        f = dict(f); f['parallel_facets'] = [x for x in f.get('parallel_facets', [])]
        data['facets'].append(f); F[f['id']] = f; added['facets'] += 1
        par = D[f['parent_deity_id']]
        if f['id'] not in par['facets']: par['facets'].append(f['id'])
        par.pop('needs_facets', None)
    for u in b.get('deity_updates', []):
        d = D.get(u['deity_id'])
        if not d: log['bad_update'].append(f"{tag}:{u['deity_id']}"); continue
        if u.get('add_alternate_names'):
            d['alternate_names'] = norm_names(d.get('alternate_names', []), u['add_alternate_names'])
            added['alt_names'] += len(u['add_alternate_names'])
    for p in b.get('parallels', []):
        a, c = p['facet_a_id'], p['facet_b_id']
        if a not in F or c not in F:
            log['drop_parallel_missing_facet'].append(f"{tag}:{p['id']}"); continue
        if F[a]['parent_deity_id'] == F[c]['parent_deity_id'] or a == c:
            log['drop_parallel_same_deity'].append(f"{tag}:{p['id']}"); continue
        key = frozenset((a, c))
        if key in pairs:
            log['drop_parallel_duplicate_pair'].append(f"{tag}:{p['id']}"); continue
        p = dict(p)
        documented = p['strength'] in ('identity', 'derivation') or p['type'] == 'documented-historical-transmission'
        p['provenance'] = 'candidate'
        p['triage_status'] = 'known-uncited' if documented else 'genuine-novel'
        p['canonical'] = True; p['user_drawn'] = False
        data['canonical_parallels'].append(p); pairs.add(key); added['parallels'] += 1

# mirror parallel_facets and drop dangling ones
for p in data['canonical_parallels']:
    a, c = p['facet_a_id'], p['facet_b_id']
    for x, y in ((a, c), (c, a)):
        if y not in F[x]['parallel_facets']: F[x]['parallel_facets'].append(y)
for f in data['facets']:
    f['parallel_facets'] = [x for x in dict.fromkeys(f['parallel_facets'])
                            if x in F and x != f['id'] and F[x]['parent_deity_id'] != f['parent_deity_id']]

specificity.annotate(data)
data['_meta']['version'] = os.path.basename(out_path).replace('source_map_seed_data_v', '').replace('.json', '')
data['_meta']['merged_batches'] = [os.path.basename(p) for p in batch_paths]
json.dump(data, open(out_path, 'w'), ensure_ascii=False, indent=1)
print('added', dict(added))
for k, v in log.items():
    print(f'{k}: {len(v)}', v[:12])
print('totals', {k: len(data[k]) for k in ('traditions', 'deities', 'facets', 'canonical_parallels')})
