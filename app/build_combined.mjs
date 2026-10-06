#!/usr/bin/env node
// Builds app/divine-origins-combined.html — one self-contained file:
// the Divine Origins library (app/library) with the Source Map app
// (app/vite) mounted inside it, sharing a single copy of React / three.js.
//
// Usage (any OS with Node 20+):   node app/build_combined.mjs
// Steps stop on the first failure; nothing is written unless every step passes.
import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, statSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLibrary, staticIndexHTML, llmsTxt, sitemapXml } from './static_index.mjs';

const APP = dirname(fileURLToPath(import.meta.url));
const VITE = join(APP, 'vite');
const LIB = join(APP, 'library');
const OUT = join(APP, 'divine-origins-combined.html');
const SITE = join(APP, 'site');            // deploy folder (gitignored; built by CI)
const LIVE = 'https://prodbykctw-max.github.io/divine-origins/';
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' });

// 1. Exact, locked dependencies (one node_modules for the whole site)
run('npm ci --no-audit --no-fund', VITE);

// 2. Standalone Source Map build must still succeed
run('npx vite build', VITE);

// 3. Compile the Source Map's Tailwind CSS for its shadow root
const tmp = mkdtempSync(join(tmpdir(), 'do-build-'));
const css = join(tmp, 'sourcemap.css');
run(`npx tailwindcss -c tailwind.config.cjs -i src/index.css -o "${css}" --minify`, VITE);

// 4. Bundle the library + embedded Source Map (production React, minified)
const esbuild = (await import(join(VITE, 'node_modules', 'esbuild', 'lib', 'main.js'))).default;
const result = await esbuild.build({
  entryPoints: [join(LIB, 'js', 'main.js')],
  bundle: true,
  format: 'iife',
  minify: true,
  write: false,
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.css': 'text', '.json': 'json' },
  alias: { 'sourcemap-css': css },
  nodePaths: [join(VITE, 'node_modules')],
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

// 5. Inline everything into index.html
const styles = ['base', 'layout', 'animations', 'polish', 'glass', 'theme']
  .map((n) => readFileSync(join(LIB, 'css', `${n}.css`), 'utf8')).join('\n');
let html = readFileSync(join(LIB, 'index.html'), 'utf8');
const before = html;
html = html.replace(/\s*<!-- Stylesheets[\s\S]*?animations\.css">/, () => `\n  <style>\n${styles}\n  </style>`);
html = html.replace('<script type="module" src="js/main.js"></script>', () => `<script>\n${js}\n  </script>`);
if (html === before || html.includes('href="css/') || html.includes('src="js/main.js"')) {
  throw new Error('index.html markers not found — nothing written');
}
// 5b. Crawlable contents for search engines and AI crawlers that skip JavaScript
const lib = await loadLibrary(LIB);
const seed = JSON.parse(readFileSync(join(APP, '..', 'data', 'source_map_seed_data_v080.json'), 'utf8'));
const seedCounts = { deities: seed.deities.length, traditions: seed.traditions.length };
const HOME_MARK = '<!-- Injected by render.js renderHome() -->';
if (!html.includes(HOME_MARK)) throw new Error('home section marker not found — nothing written');
html = html.replace(HOME_MARK, () => staticIndexHTML(lib, seedCounts));
html = html.replace('<head>', () => "<head>\n  <script>document.documentElement.classList.add('js')</script>");
// Structured data: the site plus the Source Map dataset, with publish/update dates
const today = new Date().toISOString().slice(0, 10);
const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': LIVE + '#website', name: 'Divine Origins', url: LIVE, inLanguage: 'en',
      description: "Compare creator gods, sacred texts and calendars across the world's religious traditions, with real photos of the manuscripts and a 3D map of " + seedCounts.deities + ' deities.',
      creator: { '@type': 'Person', name: 'KCTW', url: 'https://github.com/prodbykctw-max' },
      datePublished: '2026-09-29', dateModified: today },
    { '@type': 'Dataset', '@id': LIVE + '#source-map', name: 'The Source Map: Parallels of the Gods',
      description: 'Deities and divine figures from ' + seedCounts.traditions + ' religious traditions (' + seedCounts.deities + ' deities, ' + seed.facets.length + ' facets, ' + seed.canonical_parallels.length + ' canonical parallels), each placed on a four-tier map: Source, Council, Demiurge, Archons, plus cross-tier figures.',
      url: LIVE + '#source-map', isAccessibleForFree: true, inLanguage: 'en',
      keywords: ['comparative religion', 'mythology', 'deities', 'sacred texts', 'cosmology'],
      creator: { '@type': 'Person', name: 'KCTW', url: 'https://github.com/prodbykctw-max' },
      dateModified: today,
      distribution: { '@type': 'DataDownload', encodingFormat: 'application/json',
        contentUrl: 'https://github.com/prodbykctw-max/divine-origins/blob/main/data/source_map_seed_data_v080.json' } },
  ],
};
const ldRe = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
if (!ldRe.test(html)) throw new Error('JSON-LD block not found — nothing written');
html = html.replace(ldRe, () => '<script type="application/ld+json">' + JSON.stringify(LD) + '</script>');
// A Markdown copy of the site summary for AI agents
html = html.replace('<link rel="canonical"', () => '<link rel="alternate" type="text/markdown" href="index.md" title="Divine Origins (Markdown)">\n  <link rel="canonical"');
// 6a. Deployable site (GitHub Pages): index.html + img/ (photos load lazily, sized per device)
rmSync(SITE, { recursive: true, force: true });
mkdirSync(SITE, { recursive: true });
writeFileSync(join(SITE, 'index.html'), html);
cpSync(join(LIB, 'img'), join(SITE, 'img'), { recursive: true });
// Icons, web manifest and the social sharing image
mkdirSync(join(SITE, 'icons'), { recursive: true });
cpSync(join(LIB, 'icons', 'divine-origins', 'web'), join(SITE, 'icons'), { recursive: true });
rmSync(join(SITE, 'icons', 'head.html'), { force: true });
cpSync(join(LIB, 'icons', 'og-image.jpg'), join(SITE, 'icons', 'og-image.jpg'));
// AI and search discovery files
writeFileSync(join(SITE, 'llms.txt'), llmsTxt(lib, seedCounts, LIVE));
writeFileSync(join(SITE, 'index.md'), llmsTxt(lib, seedCounts, LIVE));
writeFileSync(join(SITE, 'sitemap.xml'), sitemapXml(LIVE, new Date().toISOString().slice(0, 10)));
// robots.txt only counts at the domain root (prodbykctw-max.github.io/robots.txt), which this repo doesn't serve.
writeFileSync(join(SITE, '.nojekyll'), '');

// 6b. Single portable file: same page, photos loaded from the live site
const single = html.replaceAll('href="icons/', `href="${LIVE}icons/`).replace('<head>', `<head>\n  <script>window.__IMG_BASE__ = ${JSON.stringify(LIVE + 'img/')};</script>`);
writeFileSync(OUT, single);
console.log(`wrote ${SITE}/ (index.html + img/) and ${OUT} (${(statSync(OUT).size / 1048576).toFixed(2)} MB)`);
