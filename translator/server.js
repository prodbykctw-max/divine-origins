'use strict';

const path = require('path');
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const { REGISTERS, findVariant, clientConfig } = require('./languages');

const app = express();
app.use(express.json({ limit: '256kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const MODEL = 'claude-opus-4-8';

// One client; it reads ANTHROPIC_API_KEY from the environment.
const client = new Anthropic();

// Structured-output schema for the translation call.
const TRANSLATION_SCHEMA = {
  type: 'object',
  properties: {
    translation: { type: 'string' },
    romanization: { type: 'string' },
    note: { type: 'string' },
  },
  required: ['translation', 'romanization', 'note'],
  additionalProperties: false,
};

const SYSTEM_PROMPT = [
  'You are an elite translator and a native speaker of every regional language variety on earth.',
  'You translate MEANING and IDIOM, never word-for-word.',
  'You make the output sound authentically like the exact variety requested — you never flatten or sanitize a dialect into a neutral standard.',
  'You honor the target script exactly, with correct diacritics, tone marks, and letters.',
  'You always return the requested structured JSON.',
].join(' ');

function buildUserPrompt({ text, from, to, register }) {
  const registerInstruction = REGISTERS[register] || REGISTERS.everyday;

  const romanizationRule = to.variant.latin
    ? 'The target uses Latin script, so leave "romanization" as an empty string.'
    : `The target is non-Latin script. In "romanization", give a ${to.variant.roman} of the FULL translation.`;

  return [
    'Translate the text at the bottom.',
    '',
    `FROM — ${from.lang.name} / ${from.variant.label}:`,
    from.variant.prompt,
    '',
    `TO — ${to.lang.name} / ${to.variant.label}:`,
    to.variant.prompt,
    '',
    `REGISTER: ${register} — write in ${registerInstruction}. The register must change the actual wording, not just the tone label.`,
    '',
    'Rules:',
    '- Translate meaning and idiom, not word-for-word.',
    '- Make the output genuinely sound like the target variety described above. Use its real vocabulary, grammar, and slang. Do NOT sanitize into neutral/standard language.',
    '- Honor the target script exactly, with correct diacritics and tone marks.',
    `- ${romanizationRule}`,
    '- In "note", give ONE short sentence (the "dialect note") explaining any notable regional word choice you made. If nothing is especially notable, give a brief neutral note.',
    '',
    'TEXT:',
    '"""',
    text,
    '"""',
  ].join('\n');
}

// Parse the model output defensively: prefer structured JSON, but if prose
// comes back, fall back to using the raw text as the translation.
function parseModelText(raw) {
  const fallback = { translation: raw.trim(), romanization: '', note: '' };
  if (!raw) return fallback;

  const tryParse = (s) => {
    try {
      const obj = JSON.parse(s);
      if (obj && typeof obj === 'object' && typeof obj.translation === 'string') {
        return {
          translation: obj.translation,
          romanization: typeof obj.romanization === 'string' ? obj.romanization : '',
          note: typeof obj.note === 'string' ? obj.note : '',
        };
      }
    } catch (_) { /* not JSON */ }
    return null;
  };

  // Direct parse, then a best-effort extraction of the first {...} block.
  const direct = tryParse(raw.trim());
  if (direct) return direct;

  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    const extracted = tryParse(match[0]);
    if (extracted) return extracted;
  }

  return fallback;
}

app.get('/api/config', (_req, res) => {
  res.json(clientConfig());
});

app.post('/api/translate', async (req, res) => {
  const body = req.body || {};
  const text = typeof body.text === 'string' ? body.text.trim() : '';
  const register = typeof body.register === 'string' ? body.register : 'everyday';

  if (!text) {
    return res.status(400).json({ error: 'Nothing to translate — the input is empty.' });
  }
  if (!REGISTERS[register]) {
    return res.status(400).json({ error: `Unknown register "${register}".` });
  }

  const from = body.from && findVariant(body.from.lang, body.from.variant);
  const to = body.to && findVariant(body.to.lang, body.to.variant);
  if (!from) {
    return res.status(400).json({ error: 'The "from" language/variant was not recognized.' });
  }
  if (!to) {
    return res.status(400).json({ error: 'The "to" language/variant was not recognized.' });
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      output_config: {
        format: { type: 'json_schema', schema: TRANSLATION_SCHEMA },
      },
      messages: [
        { role: 'user', content: buildUserPrompt({ text, from, to, register }) },
      ],
    });

    if (response.stop_reason === 'refusal') {
      const detail = response.stop_details && response.stop_details.explanation;
      return res.status(422).json({
        error: detail
          ? `The model declined this translation: ${detail}`
          : 'The model declined to translate this text.',
      });
    }

    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock ? textBlock.text : '';
    const parsed = parseModelText(raw);

    if (!parsed.translation) {
      return res.status(502).json({ error: 'The model returned an empty translation. Please try again.' });
    }

    return res.json({
      translation: parsed.translation,
      // Never show a romanization line for Latin-script targets, even if the model added one.
      romanization: to.variant.latin ? '' : parsed.romanization,
      note: parsed.note,
      target: { rtl: to.variant.rtl, bcp47: to.variant.bcp47 },
    });
  } catch (err) {
    // Surface real, specific error messages — never a generic "failed".
    let status = 502;
    let message = err && err.message ? err.message : 'Unknown error contacting the translation service.';

    const noCreds = /authentication method|apiKey|authToken/i.test(message);
    if (err instanceof Anthropic.AuthenticationError || noCreds) {
      status = 500;
      message = 'The translation service is not authenticated. Set ANTHROPIC_API_KEY on the server and restart.';
    } else if (err instanceof Anthropic.RateLimitError) {
      status = 429;
      const retry = err.headers && err.headers.get && err.headers.get('retry-after');
      message = `Rate limited by the translation service.${retry ? ` Retry in ${retry}s.` : ' Please wait a moment and retry.'}`;
    } else if (err instanceof Anthropic.APIConnectionError) {
      status = 503;
      message = 'Could not reach the translation service (network error). Check your connection and retry.';
    } else if (err instanceof Anthropic.APIError) {
      status = err.status || 502;
      message = `Translation service error${err.status ? ` (${err.status})` : ''}: ${err.message}`;
    }

    return res.status(status).json({ error: message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Multilingual translator running on http://localhost:${PORT}`);
});
