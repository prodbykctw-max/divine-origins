#!/usr/bin/env python3
"""Turn the raw Wikidata pull (pull_sites.py) into the app's lazy-loaded site files.

Reads   tools/sites/raw/{all.tsv,labels.json,dedicatees.json}
        tools/sites/deity_map_overrides.json
        data/source_map_seed_data_v091.json      (deity ids + names to link to)
Writes  app/library/sites/index.json             countries, types, religions, dedicatees, counts
        app/library/sites/c/<country>.json       every site in one country (loaded when opened)
        app/library/sites/t/<Q-id>.json          every site dedicated to one figure
        app/vite/src/site-counts.json            { deityId: [siteCount, [Q-ids]] } for the deity sheet

Row format in c/ and t/ files:  [qid, name, typeIdx, lat, lon, religionIdx, [dedicateeIdx...], countryIdx]
(indexes point into index.json; -1 = unknown). Coordinates are rounded to 4 decimals (~11 m).
"""
import collections, json, os, re, shutil, unicodedata

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
RAW = os.path.join(ROOT, 'tools', 'sites', 'raw')
OUT = os.path.join(ROOT, 'app', 'library', 'sites')
SEED = os.path.join(ROOT, 'data', 'source_map_seed_data_v091.json')
COUNTS = os.path.join(ROOT, 'app', 'vite', 'src', 'site-counts.json')

QRE = re.compile(r'Q\d+')
LIT = re.compile(r'^"(.*)"(?:@[\w-]+)?$', re.S)
PT = re.compile(r'POINT\(\s*(-?[\d.eE+-]+)\s+(-?[\d.eE+-]+)\s*\)')


def lit(s):
    m = LIT.match(s)
    if not m:
        return ''
    return m.group(1).replace('\\"', '"').replace('\\\\', '\\').replace('\\n', ' ').replace('\\t', ' ').strip()


def norm(s):
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r'\(.*?\)', '', s.lower())
    s = re.sub(r'^(the|lord|saint|st\.?) ', '', s.strip())
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


def main():
    labels = json.load(open(os.path.join(RAW, 'labels.json'), encoding='utf8'))
    ded_info = json.load(open(os.path.join(RAW, 'dedicatees.json'), encoding='utf8'))
    ov = json.load(open(os.path.join(ROOT, 'tools', 'sites', 'deity_map_overrides.json'), encoding='utf8'))
    seed = json.load(open(SEED, encoding='utf8'))
    deity_ids = {d['id'] for d in seed['deities']}

    # --- 1. read every site -------------------------------------------------
    sites = []
    type_freq = collections.Counter()
    with open(os.path.join(RAW, 'all.tsv'), encoding='utf8') as f:
        next(f)
        for line in f:
            c = line.rstrip('\n').split('\t')
            if len(c) < 9:
                continue
            q = QRE.search(c[0]).group(0)
            name = lit(c[1]) or lit(c[2])
            m = PT.search(c[3])
            if not name or not m:
                continue
            lon, lat = float(m.group(1)), float(m.group(2))
            if not (-90 <= lat <= 90 and -180 <= lon <= 180):
                continue
            types = QRE.findall(c[5])
            type_freq.update(types)
            sites.append({'q': q, 'name': name, 'lat': round(lat, 4), 'lon': round(lon, 4),
                          'country': (QRE.findall(c[4]) or [''])[0], 'types': types,
                          'rels': QRE.findall(c[6]), 'ded': sorted(set(QRE.findall(c[7])))})

    # --- 2. lookup tables (most-used first, so common indexes are short) -----
    for s in sites:
        s['type'] = max(s['types'], key=lambda t: type_freq[t]) if s['types'] else ''
    tcount = collections.Counter(s['type'] for s in sites if s['type'])
    rcount = collections.Counter(r for s in sites for r in s['rels'][:1])
    ccount = collections.Counter(s['country'] for s in sites if s['country'])
    dcount = collections.Counter(d for s in sites for d in s['ded'])
    types = [t for t, _ in tcount.most_common()]
    rels = [r for r, _ in rcount.most_common()]
    countries = [c for c, _ in ccount.most_common()]
    deds = [d for d, _ in dcount.most_common()]
    ti, ri, ci, di = ({v: i for i, v in enumerate(x)} for x in (types, rels, countries, deds))

    # --- 3. link dedicatees to Source Map deities ----------------------------
    prim, alt = collections.defaultdict(set), collections.defaultdict(set)
    for d in seed['deities']:
        prim[norm(d['primary_name'])].add(d['id'])
        for n in d.get('alternate_names') or []:
            if len(norm(n)) >= 3:
                alt[norm(n)].add(d['id'])
    link = {}
    for q in deds:
        if q in ov['exclude']:
            continue
        if q in ov['map']:
            link[q] = ov['map'][q]
            continue
        info = ded_info.get(q, {'aliases': []})
        L = norm(labels.get(q, q))
        A = [norm(a) for a in info['aliases']]
        hit = prim.get(L) or set().union(*[prim.get(a, set()) for a in A]) or alt.get(L) or set()
        if hit:
            link[q] = sorted(hit)
    bad = [i for v in ov['map'].values() for i in v if i not in deity_ids]
    if bad:
        raise SystemExit(f'override ids not in the seed: {bad}')

    # --- 4. write files ------------------------------------------------------
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, 'c'))
    os.makedirs(os.path.join(OUT, 't'))

    def row(s):
        return [int(s['q'][1:]), s['name'], ti.get(s['type'], -1), s['lat'], s['lon'],
                ri.get(s['rels'][0], -1) if s['rels'] else -1,
                [di[d] for d in s['ded']], ci.get(s['country'], -1)]

    by_country = collections.defaultdict(list)
    by_ded = collections.defaultdict(list)
    for s in sites:
        r = row(s)
        by_country[s['country'] or 'none'].append(r)
        for d in s['ded']:
            by_ded[d].append(r)
    dump = lambda p, o: json.dump(o, open(p, 'w', encoding='utf8'), ensure_ascii=False, separators=(',', ':'))
    for c, rows in by_country.items():
        rows.sort(key=lambda r: r[1].lower())
        dump(os.path.join(OUT, 'c', c + '.json'), rows)
    for d, rows in by_ded.items():
        rows.sort(key=lambda r: r[1].lower())
        dump(os.path.join(OUT, 't', d + '.json'), rows)

    deity_sites = collections.defaultdict(set)
    deity_targets = collections.defaultdict(set)
    for q, ids in link.items():
        for i in ids:
            deity_targets[i].add(q)
    for s in sites:
        for d in s['ded']:
            for i in link.get(d, []):
                deity_sites[i].add(s['q'])
    counts = {i: [len(deity_sites[i]), sorted(deity_targets[i])] for i in sorted(deity_targets)}
    dump(COUNTS, counts)

    index = {
        'source': 'Wikidata (CC0), pulled through QLever',
        'generated': __import__('datetime').date.today().isoformat(),
        'total': len(sites),
        'countries': [[c, labels.get(c, c), ccount[c]] for c in countries] + [['none', 'No country recorded', len(by_country.get('none', []))]],
        'types': [labels.get(t, t) for t in types],
        'religions': [labels.get(r, r) for r in rels],
        'dedicatees': [[q, labels.get(q, q), dcount[q], link.get(q, []), bool(ded_info.get(q, {}).get('deity'))] for q in deds],
    }
    dump(os.path.join(OUT, 'index.json'), index)

    size = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs)
    print(f'sites {len(sites):,} | countries {len(countries)} | types {len(types)} | dedicatees {len(deds)} '
          f'| linked to app deities {len(link)} targets -> {len(counts)} deities | {size/1048576:.1f} MB')
    biggest = sorted(by_country.items(), key=lambda kv: -len(kv[1]))[:5]
    print('largest country files:', [(labels.get(c, c), len(r)) for c, r in biggest])


if __name__ == '__main__':
    main()
