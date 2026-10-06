#!/usr/bin/env python3
"""Blue Qur'an Night theme.

Library (CSS + section JS + index.html): hard-coded colours become CSS
variables, so theme.css can define a dark and a light palette and the page
follows the device setting.
Source Map (shadow root, JSX inline styles): stays dark; bronze literals are
remapped to the indigo palette.
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'app'
LIB = (sorted((ROOT / 'library' / 'css').glob('*.css'))
       + sorted((ROOT / 'library' / 'js' / 'sections').glob('*.js'))
       + [ROOT / 'library' / 'js' / 'ui' / 'modal.js', ROOT / 'library' / 'js' / 'ui' / 'artifact.js', ROOT / 'library' / 'index.html'])
SM = [ROOT / 'vite' / 'ParallelsOfTheGods.jsx', ROOT / 'vite' / 'CosmosView.jsx']

# library: literal -> variable
LIB_HEX = {
    '86bba6': 'var(--accent)', 'b5d6c8': 'var(--accent-hover)', '4f6e62': 'var(--accent-dim)',
    '141713': 'var(--void)', '191c18': 'var(--deep)', '1b1e1a': 'var(--deep)', '1d201c': 'var(--layer)',
    '272b26': 'var(--surface)', '30352f': 'var(--raised)',
    'e6e4d6': 'var(--text-primary)', 'eceadc': 'var(--text-primary)', 'f1efe3': 'var(--text-primary)',
    'e2dfcd': 'var(--text-primary)', 'cfccb8': 'var(--text-secondary)', 'b3b19d': 'var(--text-secondary)',
    'aaa894': 'var(--text-secondary)', '939179': 'var(--text-dim)',
}
LIB_RGB = {
    (134, 187, 166): '--accent-rgb', (181, 214, 200): '--accent-rgb',
    (20, 23, 19): '--void-rgb', (25, 28, 24): '--void-rgb', (10, 12, 10): '--void-rgb',
    (29, 32, 28): '--layer-rgb', (39, 43, 38): '--surface-rgb',
}
# Source Map: bronze literal -> indigo literal (dark only)
SM_HEX = {
    '86bba6': 'a9c4e4', 'b5d6c8': 'c9dbf0', '4f6e62': '5b7396',
    '141713': '18233a', '191c18': '1b2840', '1b1e1a': '1d2a42', '1d201c': '1f2c3f', '272b26': '283952', '30352f': '31435f',
    'e6e4d6': 'e8eae7', 'eceadc': 'eef0ec', 'f1efe3': 'f3f4f1', 'e2dfcd': 'e3e6e4', 'cfccb8': 'cfd5dc',
    'b3b19d': 'b6bfca', 'aaa894': 'aab4c0', '939179': '95a1b0', 'a19a63': '9fb3c8', 'd9d4b0': 'd8dde4',
}
SM_RGB = {
    (134, 187, 166): (169, 196, 228), (181, 214, 200): (201, 219, 240),
    (20, 23, 19): (24, 35, 58), (29, 32, 28): (31, 44, 63), (39, 43, 38): (40, 57, 82), (10, 12, 10): (12, 18, 32),
    (230, 228, 214): (232, 234, 231),
}
FONTS = [("'Tiro Devanagari Sanskrit'", "'Amiri'"), ('"Tiro Devanagari Sanskrit"', '"Amiri"'), ("'Hind'", "'Noto Sans'"), ('"Hind"', '"Noto Sans"')]
GF_OLD = 'https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit:ital@0;1&family=Hind:wght@400;500;600&display=swap'
GF_NEW = 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap'


def lib_pass(s, is_css):
    n = 0
    def hx(m):
        nonlocal n
        v = m.group(1).lower()
        if v in LIB_HEX:
            n += 1
            return LIB_HEX[v]
        return m.group(0)
    s = re.sub(r'#([0-9a-fA-F]{6})\b', hx, s)
    def rg(m):
        nonlocal n
        key = tuple(int(x) for x in m.group(1, 2, 3))
        if key in LIB_RGB:
            n += 1
            return f'rgb(var({LIB_RGB[key]}) / {m.group(4).strip()})'
        return m.group(0)
    s = re.sub(r'rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)', rg, s)
    return s, n


def sm_pass(s):
    n = 0
    def hx(m):
        nonlocal n
        v = m.group(1).lower()
        if v in SM_HEX:
            n += 1
            return '#' + SM_HEX[v]
        return m.group(0)
    s = re.sub(r'#([0-9a-fA-F]{6})\b', hx, s)
    def rg(m):
        nonlocal n
        key = tuple(int(x) for x in m.group(2, 3, 4))
        if key in SM_RGB:
            n += 1
            R, G, B = SM_RGB[key]
            return f'{m.group(1)}({R},{G},{B}{m.group(5)}'
        return m.group(0)
    s = re.sub(r'(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*([,)])', rg, s)
    return s, n


for f in LIB + SM:
    src = f.read_text(encoding='utf-8')
    if f in SM:
        out, n = sm_pass(src)
    else:
        out, n = lib_pass(src, f.suffix == '.css')
    for a, b in FONTS:
        k = out.count(a); out = out.replace(a, b); n += k
    out = out.replace(GF_OLD, GF_NEW)
    if out != src:
        f.write_text(out, encoding='utf-8')
    print(f'{n:4d}  {f.relative_to(ROOT)}')
