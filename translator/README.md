# Dialect Translator — multilingual voice + text

A mobile-first, responsive translator that produces **real regional varieties**, not
neutral textbook language. Puerto Rican Spanish sounds *boricua*; Chilean uses
`weón`/`cachái`/`po`; Cantonese uses actual Cantonese grammar (not Mandarin in
traditional characters); Yoruba/Igbo/Hausa carry their proper tone marks and
diacritics; Urdu, Hebrew, Arabic, and Punjabi-Shahmukhi render right-to-left.

Translation is powered by Claude (`claude-opus-4-8`) through a small server-side
proxy, so the API key never reaches the browser.

## Features

- **Language + variant dropdowns** for each side (e.g. Spanish → Puerto Rican /
  Chilean / Rioplatense / …). 16 languages, 53 dialects/variants.
- **Register toggle** — Everyday / Formal / Street-slang — that changes the actual
  wording, not just a label.
- **Swap** button that flips the language+variant pairs and moves the output into
  the input.
- **Voice input** (Web Speech `SpeechRecognition`), with the recognizer language set
  to the selected "From" variant's BCP-47 tag. Speaking auto-triggers translation.
- **Speaker buttons** on both input and output (`SpeechSynthesis`), each using its
  side's BCP-47 tag.
- **Copy** button on the output.
- **Romanization line** under the output for non-Latin scripts (pinyin, jyutping,
  and transliteration for Urdu/Hindi/Arabic/Hebrew/Gujarati/Punjabi). Empty for
  Latin-script targets.
- **Dialect note** explaining regional word choices.
- **RTL** text direction for Urdu, Hebrew, Arabic, and Punjabi-Shahmukhi.
- **History** of the last 8 translations, labeled with the exact dialect pair.
- **Real error messages** throughout — never a generic "failed".

## Run it

Requires Node 18+ and an Anthropic API key.

```bash
cd translator
npm install
export ANTHROPIC_API_KEY=sk-ant-...      # server-side only; never sent to the browser
npm start                                 # http://localhost:3000  (override with PORT=…)
```

Open the URL in a browser. Voice input requires a browser that supports the Web
Speech API (Chrome, Edge, Safari) and a secure context (`localhost` or HTTPS).

## How it works

```
public/           mobile-first frontend (vanilla JS, no build step)
  index.html      layout
  styles.css      dark, mobile-first styling
  app.js          dropdowns, swap, register, speech I/O, history, fetch
languages.js      the dialect registry: per-variant BCP-47 tag, RTL flag,
                  script/romanization info, and a precise prompt string
server.js         Express app: serves the frontend + /api/config + /api/translate
```

- `GET /api/config` returns the client-safe language metadata (names, variant
  labels, BCP-47 tags, RTL and script flags). The per-variant **prompt strings**
  that describe each variety precisely stay server-side.
- `POST /api/translate` builds a prompt from the selected varieties and register,
  calls Claude with a JSON **structured-output** schema, and returns
  `{ translation, romanization, note, target }`. The response is parsed
  defensively — if prose comes back instead of JSON, the raw text is used as the
  translation rather than throwing.

## Adding a language or variant

Add an entry to `LANGUAGES` in `languages.js`. Each variant needs:

- `label`  — shown in the variant dropdown
- `bcp47`  — BCP-47 tag for speech recognition/synthesis
- `rtl`    — `true` for right-to-left scripts
- `latin`  — `true` if the script is Latin (romanization line stays empty)
- `roman`  — the romanization system to request when `latin` is `false`
- `prompt` — a precise description of the variety (server-only)

No other file needs to change — the dropdowns and translation prompt are generated
from this registry.
