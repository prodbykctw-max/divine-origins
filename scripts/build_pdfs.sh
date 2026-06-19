#!/bin/bash
# Build PDFs for the spec package using weasyprint.
# Run from repo root: bash scripts/build_pdfs.sh

cd "$(dirname "$0")/.."

mkdir -p pdfs
rm -f pdfs/*.pdf

# Custom CSS for clean rendering
cat > /tmp/spec_style.css <<'EOF'
@page {
  size: letter;
  margin: 0.85in;
  @bottom-center {
    content: counter(page) " / " counter(pages);
    font-size: 9pt;
    color: #888;
  }
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.5;
  color: #222;
}
h1 {
  font-size: 22pt;
  border-bottom: 2px solid #222;
  padding-bottom: 6pt;
  margin-top: 0;
}
h2 { font-size: 16pt; margin-top: 18pt; color: #1a1a1a; }
h3 { font-size: 13pt; margin-top: 14pt; color: #2c2c2c; }
h4 { font-size: 11pt; margin-top: 10pt; color: #333; }
code {
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 9.5pt;
  background: #f4f4f4;
  padding: 1px 4px;
  border-radius: 3px;
}
pre {
  background: #f6f6f6;
  border-left: 3px solid #888;
  padding: 10pt;
  font-size: 9pt;
  white-space: pre-wrap;
  word-break: break-word;
  page-break-inside: avoid;
}
pre code { background: transparent; padding: 0; }
blockquote {
  border-left: 3px solid #999;
  padding-left: 12pt;
  color: #555;
  margin-left: 0;
  font-style: italic;
}
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 9pt;
  margin: 8pt 0;
  page-break-inside: avoid;
}
th, td {
  border: 1px solid #bbb;
  padding: 4pt 6pt;
  text-align: left;
  vertical-align: top;
}
th { background: #eee; }
hr { border: none; border-top: 1px solid #ccc; margin: 18pt 0; }
ul, ol { margin: 6pt 0; }
li { margin: 2pt 0; }
EOF

declare -A titles=(
  ["README.md"]="The Source Map - Specification Package"
  ["docs/01-comparative-cosmology-spec.md"]="01 - Comparative Cosmology Feature Spec"
  ["docs/02-structural-cross-comparison.md"]="02 - Structural Cross-Comparison Methodology"
  ["docs/03-scholarly-mode.md"]="03 - Scholarly Mode Caveat Layer"
  ["docs/04-practices-layer.md"]="04 - The Practices Layer"
  ["docs/05-personal-layer-and-my-map.md"]="05 - Personal Layer and My Map"
  ["docs/06-connection-evidence-schema.md"]="06 - Connection-Evidence Schema"
  ["methodology/master-prompt.md"]="Master Prompt for the Building Chat"
)

for src in "${!titles[@]}"; do
  base=$(basename "$src" .md)
  title="${titles[$src]}"
  echo "-> $base.pdf"
  pandoc "$src" -o "pdfs/$base.pdf" \
    --pdf-engine=weasyprint \
    --metadata title="$title" \
    --css=/tmp/spec_style.css \
    --standalone 2>&1 | grep -vE "^WARNING:|^$" || true
done

echo
echo "PDFs built:"
ls -la pdfs/
