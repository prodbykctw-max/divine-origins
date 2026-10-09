#!/usr/bin/env python3
"""Coverage audit: which checklist traditions/figures are missing from a seed file.
Usage: python3 tools/audit_coverage.py data/source_map_seed_data_vXXX.json [--md out.md]"""
import json, sys, unicodedata, re
def norm(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r"[^a-z0-9 ]+", " ", s)
seed = json.load(open(sys.argv[1]))
chk = json.load(open('tools/coverage_checklist.json'))
hay = [(norm(' | '.join([d['primary_name']] + d.get('alternate_names', []))), d) for d in seed['deities']]
def present(fig):
    for alt in fig.split('|'):
        f = norm(alt).strip()
        pat = re.compile(r'(^|[^a-z0-9])' + re.escape(f) + r'($|[^a-z0-9])')
        hits = [d for h, d in hay if pat.search(h)]
        if hits: return hits
    return []
rows, tot, miss = [], 0, 0
for grp, trads in chk['groups'].items():
    for trad, figs in trads.items():
        m = [f.split('|')[0] for f in figs if not present(f)]
        tot += len(figs); miss += len(m)
        rows.append((grp, trad, len(figs), m))
out = ['# Coverage audit', '', f'Seed: `{sys.argv[1]}` — {len(seed["traditions"])} traditions, {len(seed["deities"])} deities.', '',
       f'Checklist figures present: {tot-miss} of {tot} ({100*(tot-miss)//tot}%). Missing: {miss}.', '']
cur = None
for grp, trad, n, m in rows:
    if grp != cur: out += ['', f'## {grp}', '']; cur = grp
    out.append(f'- **{trad}** — {n-len(m)}/{n}' + (f'; missing: {", ".join(m)}' if m else ' ✓'))
T = {t['id'] for t in seed['traditions']}
used = {d['tradition_id'] for d in seed['deities']}
out += ['', '## Data hygiene', '', f'- Traditions with no deities: {", ".join(sorted(T - used)) or "none"}',
        f'- Deities flagged needs_facets: {sum(1 for d in seed["deities"] if d.get("needs_facets"))}']
md = '\n'.join(out) + '\n'
if '--md' in sys.argv: open(sys.argv[sys.argv.index('--md') + 1], 'w').write(md)
print(md)
