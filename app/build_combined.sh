#!/usr/bin/env bash
# Builds app/divine-origins-combined.html: the Divine Origins library (app/library)
# with the Source Map section running the Vite "Parallels of the Gods" app.
# Usage: bash app/build_combined.sh   (from anywhere; needs node + python3)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/app/vite"
npm install --no-audit --no-fund >/dev/null
npx vite build >/dev/null
TMP="$(mktemp -d)"
base64 -w0 dist/index.html > "$TMP/app.b64"
cd "$ROOT/app/library"
npm install --no-audit --no-fund >/dev/null
npx -y esbuild@0.24.0 js/main.js --bundle --format=iife --minify --jsx=automatic --loader:.js=jsx \
  --define:process.env.NODE_ENV='"production"' --outfile="$TMP/bundle.js" --log-level=warning
cat css/base.css css/layout.css css/animations.css css/polish.css css/glass.css > "$TMP/bundle.css"
TMP="$TMP" OUT="$ROOT/app/divine-origins-combined.html" python3 - <<'PY'
import os, re
t = os.environ['TMP']
html = open('index.html').read()
css = open(f'{t}/bundle.css').read()
js = open(f'{t}/bundle.js').read().replace('</script', '<\\/script')
b64 = open(f'{t}/app.b64').read()
html = re.sub(r'\s*<!-- Stylesheets.*?animations\.css">', lambda m: '\n  <style>\n' + css + '\n  </style>', html, flags=re.S)
html = html.replace('<script type="module" src="js/main.js"></script>',
    '<script type="text/plain" id="source-map-app">' + b64 + '</script>\n  <script>\n' + js + '\n  </script>')
assert 'href="css/' not in html and 'src="js/main.js"' not in html
open(os.environ['OUT'], 'w').write(html)
print('wrote', os.environ['OUT'], len(html), 'bytes')
PY
