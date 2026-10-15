import json,urllib.request,urllib.parse
P='PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> '
def run(qs):
    req=urllib.request.Request('https://qlever.dev/api/wikidata',data=urllib.parse.urlencode({'query':P+qs}).encode(),headers={'Accept':'application/sparql-results+json','Content-Type':'application/x-www-form-urlencoded','User-Agent':'DivineOriginsBot/1.0'})
    return json.load(urllib.request.urlopen(req,timeout=300))['results']['bindings']
