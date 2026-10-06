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
writeFileSync(join(SITE, '.nojekyll'), '');

// 6b. Single portable file: same page, photos loaded from the live site
const single = html.replaceAll('href="icons/', `href="${LIVE}icons/`).replace('<head>', `<head>\n  <script>window.__IMG_BASE__ = ${JSON.stringify(LIVE + 'img/')};</script>`);
writeFileSync(OUT, single);
console.log(`wrote ${SITE}/ (index.html + img/) and ${OUT} (${(statSync(OUT).size / 1048576).toFixed(2)} MB)`);
