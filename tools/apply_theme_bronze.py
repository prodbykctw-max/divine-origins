#!/usr/bin/env python3
"""One-shot restyle: Chola Bronze theme.

Remaps the old black-and-gold palette, fonts and decorative effects across the
library (CSS + JS) and the Source Map (JSX inline styles) to the Chola Bronze
tokens. Idempotent enough to re-run; prints a per-file change count.
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'app'
FILES = (sorted((ROOT / 'library' / 'css').glob('*.css'))
         + sorted((ROOT / 'library' / 'js').rglob('*.js'))
         + sorted((ROOT / 'library' / 'js').rglob('*.jsx'))
         + [ROOT / 'vite' / 'ParallelsOfTheGods.jsx', ROOT / 'vite' / 'CosmosView.jsx', ROOT / 'vite' / 'src' / 'index.css'])

HEX = {
    # gold accent family -> verdigris
    'c9a84c': '86bba6', 'f0d080': 'b5d6c8', '7a6330': '4f6e62', 'd9b25e': 'a19a63', 'e8c066': 'a8cfbf',
    # cream text family -> pale bronze text
    'e8dfc0': 'e6e4d6', 'ede3c4': 'e6e4d6', 'f6ecd0': 'eceadc', 'fff4d4': 'f1efe3', 'fff1c4': 'f1efe3',
    'e8d8b0': 'e2dfcd', 'cdc2a3': 'cfccb8', 'd4c49c': 'cfccb8',
    # secondary / dim text
    'ada390': 'b3b19d', 'a3957a': 'aaa894', 'a8925c': 'aaa894', '8f8263': '939179', '8a8070': '939179', '7d7563': '939179',
    # surfaces: violet-black -> patina darks
    '050408': '141713', '0a0812': '191c18', '0e0c19': '1b1e1a', '110f1e': '1d201c', '1c1830': '272b26', '261f3d': '30352f',
    # brand data colours
    '8840c4': '7f8aa6', 'c44040': 'c98f6b', '40a8a0': '6fae98', 'a8b8c8': 'b7bfc9',
}
RGB = {
    (201, 168, 76): (134, 187, 166),
    (240, 208, 128): (181, 214, 200),
    (5, 4, 8): (20, 23, 19),
    (22, 18, 38): (29, 32, 28),
    (10, 8, 18): (25, 28, 24),
    (136, 64, 196): (127, 138, 166),
    (196, 64, 64): (201, 143, 107),
}
FONTS = [
    (r"'?Cinzel'?(\s*,\s*'?Trajan Pro'?)?", "'Tiro Devanagari Sanskrit'"),
    (r"'?Cormorant Garamond'?", "'Hind'"),
    (r"'?Space Mono'?|'?JetBrains Mono'?", "'Hind'"),
    (r"'Inter'", "'Hind'"),
    (r"ui-monospace,\s*monospace|'Courier New',\s*monospace", "system-ui, sans-serif"),
]


def remap(s):
    n = 0
    def hx(m):
        nonlocal n
        v = m.group(1).lower()
        if v in HEX:
            n += 1
            return '#' + HEX[v]
        return m.group(0)
    s = re.sub(r'#([0-9a-fA-F]{6})\b', hx, s)

    def rg(m):
        nonlocal n
        r, g, b = (int(x) for x in m.group(2, 3, 4))
        if (r, g, b) in RGB:
            n += 1
            R, G, B = RGB[(r, g, b)]
            return f'{m.group(1)}({R},{G},{B}{m.group(5)}'
        return m.group(0)
    s = re.sub(r'(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*([,)])', rg, s)

    for pat, rep in FONTS:
        s, k = re.subn(pat, rep, s); n += k

    # Decoration the anti-slop rules ban
    s, k = re.subn(r'\s*(-webkit-)?backdrop-filter\s*:[^;}{]*;?', '', s); n += k
    s, k = re.subn(r"\s*(WebkitBackdropFilter|backdropFilter)\s*:\s*('[^']*'|\"[^\"]*\"|`[^`]*`)\s*,?", '', s); n += k
    s, k = re.subn(r'text-shadow\s*:[^;}{]*', 'text-shadow: none', s); n += k
    s, k = re.subn(r"textShadow\s*:\s*('[^']*'|\"[^\"]*\"|`[^`]*`)", "textShadow: 'none'", s); n += k
    s, k = re.subn(r'text-transform\s*:\s*uppercase', 'text-transform: none', s); n += k
    s, k = re.subn(r"textTransform\s*:\s*'uppercase'", "textTransform: 'none'", s); n += k
    # wide tracking only made sense with caps
    s, k = re.subn(r'letter-spacing\s*:\s*0?\.(0[4-9]|[1-9])\d*em', 'letter-spacing: 0', s); n += k
    s, k = re.subn(r"letterSpacing\s*:\s*'0?\.(0[4-9]|[1-9])\d*em'", "letterSpacing: 0", s); n += k
    # weights: max 600
    s, k = re.subn(r'font-weight\s*:\s*(700|800|900|bold)\b', 'font-weight: 600', s); n += k
    s, k = re.subn(r'fontWeight\s*:\s*(700|800|900|\'bold\'|\'700\')', 'fontWeight: 600', s); n += k
    s, k = re.subn(r'(wght@[0-9;]*)', lambda m: m.group(1), s)

    # minimum 12px text
    def fs_css(m):
        nonlocal n
        val, unit = float(m.group(1)), m.group(2)
        px = val * 16 if unit == 'rem' else val
        if px < 12:
            n += 1
            return 'font-size: 0.75rem'
        return m.group(0)
    s = re.sub(r'font-size\s*:\s*([0-9.]+)(rem|px)\b', fs_css, s)

    def fs_js(m):
        nonlocal n
        if int(m.group(1)) < 12:
            n += 1
            return 'fontSize: 12'
        return m.group(0)
    s = re.sub(r'fontSize\s*:\s*(\d+)\b(?!\s*[.\w])', fs_js, s)
    s = re.sub(r"fontSize\s*:\s*'(\d+)px'", lambda m: "fontSize: '12px'" if int(m.group(1)) < 12 else m.group(0), s)
    return s, n


for f in FILES:
    if not f.exists():
        continue
    src = f.read_text(encoding='utf-8')
    out, n = remap(src)
    if out != src:
        f.write_text(out, encoding='utf-8')
    print(f'{n:4d}  {f.relative_to(ROOT)}')
