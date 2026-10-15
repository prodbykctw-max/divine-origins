// CI check for the Holy Sites data: every link in the deep dives and every deity id in
// site-counts.json must exist in the canonical seed, and every referenced data file must exist.
// Usage: node tools/sites/check_sites.mjs   (exits 1 on any problem)
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const seed = JSON.parse(readFileSync(join(ROOT, 'data', 'source_map_seed_data_v091.json'), 'utf8'));
const deityIds = new Set(seed.deities.map((d) => d.id));
const { DEEP_DIVES } = await import(join(ROOT, 'app', 'library', 'data', 'sites', 'deep-dives.js'));
const textsSrc = readFileSync(join(ROOT, 'app', 'library', 'data', 'texts', 'sacred-texts.js'), 'utf8');
const textIds = new Set([...textsSrc.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((m) => m[1]));
const counts = JSON.parse(readFileSync(join(ROOT, 'app', 'vite', 'src', 'site-counts.json'), 'utf8'));
const index = JSON.parse(readFileSync(join(ROOT, 'app', 'library', 'sites', 'index.json'), 'utf8'));
const errs = [];
const ids = new Set();
for (const d of DEEP_DIVES) {
  if (ids.has(d.id)) errs.push(`duplicate deep-dive id ${d.id}`);
  ids.add(d.id);
  for (const k of ['name', 'what', 'claim', 'evidence', 'wiki']) if (!d[k]) errs.push(`${d.id}: missing ${k}`);
  for (const x of d.deities || []) if (!deityIds.has(x)) errs.push(`${d.id}: unknown deity ${x}`);
  for (const x of d.texts || []) if (!textIds.has(x)) errs.push(`${d.id}: unknown text ${x}`);
}
for (const [id, [n, targets]] of Object.entries(counts)) {
  if (!deityIds.has(id)) errs.push(`site-counts: unknown deity ${id}`);
  if (!(n > 0)) errs.push(`site-counts: ${id} has no sites`);
  for (const q of targets) if (!existsSync(join(ROOT, 'app', 'library', 'sites', 't', q + '.json'))) errs.push(`missing t/${q}.json`);
}
for (const [c] of index.countries) if (!existsSync(join(ROOT, 'app', 'library', 'sites', 'c', c + '.json'))) errs.push(`missing c/${c}.json`);
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log(`Holy Sites OK: ${DEEP_DIVES.length} deep dives, ${index.total.toLocaleString('en-US')} sites, ${index.countries.length} country files, ${Object.keys(counts).length} deities linked`);
