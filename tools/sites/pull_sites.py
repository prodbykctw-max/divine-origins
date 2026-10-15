#!/usr/bin/env python3
"""Pull every documented place of worship / sacred site from Wikidata.

Source: Wikidata, via the QLever SPARQL endpoint (https://qlever.dev/api/wikidata),
which returns the full result set in one request. Wikidata content is CC0.

What counts as a site (see places_of_worship.rq):
  * anything that is an instance of "structure of worship" (Q1370598) or a subclass
    (temples, shrines, churches, mosques, synagogues, monasteries, stupas, ...)
  * megaliths (Q164240) and subclasses (dolmens, menhirs, stone circles, ...)
  * pilgrimage sites, sacred mountains, sacred groves, sacred trees
  * anything recorded as "dedicated to" (P825) a deity
and it must have coordinates (P625).

Writes (into --out, default tools/sites/raw/, which is gitignored):
  all.tsv          one row per site
  labels.json      English (else any) labels for every type, religion, country, dedicatee
  dedicatees.json  for every "dedicated to" target: English aliases + whether it is a deity

Usage:  python3 tools/sites/pull_sites.py [--out DIR]
Then:   python3 tools/sites/build_sites.py
"""
import argparse, json, os, re, sys, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from ql import run  # noqa: E402

ENDPOINT = 'https://qlever.dev/api/wikidata'


def pull_all(out):
    query = open(os.path.join(HERE, 'places_of_worship.rq'), encoding='utf8').read()
    req = urllib.request.Request(
        ENDPOINT,
        data=urllib.parse.urlencode({'query': query}).encode(),
        headers={'Accept': 'text/tab-separated-values',
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'User-Agent': 'DivineOriginsBot/1.0'})
    path = os.path.join(out, 'all.tsv')
    with urllib.request.urlopen(req, timeout=1800) as r, open(path, 'wb') as f:
        while True:
            chunk = r.read(1 << 20)
            if not chunk:
                break
            f.write(chunk)
    rows = sum(1 for _ in open(path, encoding='utf8')) - 1
    if rows < 100000:
        raise SystemExit(f'all.tsv has only {rows} rows; refusing to continue')
    print(f'all.tsv: {rows:,} rows')
    return path


def qids(s):
    return re.findall(r'Q\d+', s)


def label_and_alias(out, tsv):
    ids, ded = set(), set()
    with open(tsv, encoding='utf8') as f:
        next(f)
        for line in f:
            c = line.rstrip('\n').split('\t')
            for i in (4, 5, 6, 7):
                ids.update(qids(c[i]))
            ded.update(qids(c[7]))
    ids = sorted(ids)
    labels = {}
    for i in range(0, len(ids), 800):
        v = ' '.join('wd:' + x for x in ids[i:i + 800])
        for r in run('SELECT ?x (SAMPLE(?en) AS ?l) (SAMPLE(?any) AS ?a) WHERE { VALUES ?x { ' + v +
                     ' } OPTIONAL { ?x rdfs:label ?en FILTER(LANG(?en)="en") } OPTIONAL { ?x rdfs:label ?any } } GROUP BY ?x'):
            q = r['x']['value'].rsplit('/', 1)[1]
            labels[q] = (r.get('l') or r.get('a') or {}).get('value', q)
    json.dump(labels, open(os.path.join(out, 'labels.json'), 'w', encoding='utf8'), ensure_ascii=False)
    ded = sorted(ded)
    info = {}
    for i in range(0, len(ded), 500):
        v = ' '.join('wd:' + x for x in ded[i:i + 500])
        for r in run('SELECT ?x (GROUP_CONCAT(DISTINCT ?al; SEPARATOR="|") AS ?als) (SAMPLE(?isd) AS ?deity) WHERE { VALUES ?x { ' + v +
                     ' } OPTIONAL { ?x skos:altLabel ?al FILTER(LANG(?al)="en") } OPTIONAL { ?x wdt:P31/wdt:P279* wd:Q178885 . BIND(1 AS ?isd) } } GROUP BY ?x'):
            q = r['x']['value'].rsplit('/', 1)[1]
            info[q] = {'aliases': [a for a in r.get('als', {}).get('value', '').split('|') if a],
                       'deity': bool(r.get('deity'))}
    json.dump(info, open(os.path.join(out, 'dedicatees.json'), 'w', encoding='utf8'), ensure_ascii=False)
    print(f'labels: {len(labels):,}  dedicatees: {len(info):,}')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default=os.path.join(HERE, 'raw'))
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    label_and_alias(a.out, pull_all(a.out))
