'use strict';

/* ------------------------------------------------------------------ *
 * Dialect Translator — client logic
 * ------------------------------------------------------------------ */

const els = {
  fromLang: document.getElementById('fromLang'),
  fromVariant: document.getElementById('fromVariant'),
  toLang: document.getElementById('toLang'),
  toVariant: document.getElementById('toVariant'),
  swapBtn: document.getElementById('swapBtn'),
  registerBtns: Array.from(document.querySelectorAll('.register__btn')),
  inputText: document.getElementById('inputText'),
  micBtn: document.getElementById('micBtn'),
  speakInputBtn: document.getElementById('speakInputBtn'),
  translateBtn: document.getElementById('translateBtn'),
  errorBar: document.getElementById('errorBar'),
  outputSection: document.getElementById('outputSection'),
  outputText: document.getElementById('outputText'),
  romanization: document.getElementById('romanization'),
  dialectNote: document.getElementById('dialectNote'),
  speakOutputBtn: document.getElementById('speakOutputBtn'),
  copyBtn: document.getElementById('copyBtn'),
  outputPairLabel: document.getElementById('outputPairLabel'),
  historySection: document.getElementById('historySection'),
  historyList: document.getElementById('historyList'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),
};

const state = {
  config: null,
  register: 'everyday',
  lastResult: null, // { translation, romanization, target }
};

const HISTORY_KEY = 'dialect-translator-history-v1';
const HISTORY_MAX = 8;

/* ------------------------------ helpers ------------------------------ */

function langById(id) {
  return state.config.languages.find((l) => l.id === id);
}
function variantById(langId, variantId) {
  const lang = langById(langId);
  return lang && lang.variants.find((v) => v.id === variantId);
}
function currentSide(side) {
  const langSel = side === 'from' ? els.fromLang : els.toLang;
  const varSel = side === 'from' ? els.fromVariant : els.toVariant;
  const lang = langById(langSel.value);
  const variant = variantById(langSel.value, varSel.value);
  return { lang, variant };
}
function variantLabel(langId, variantId) {
  const lang = langById(langId);
  const variant = variantById(langId, variantId);
  if (!lang || !variant) return '';
  return `${lang.name} · ${variant.label}`;
}

function showError(message) {
  els.errorBar.textContent = message;
  els.errorBar.hidden = false;
}
function clearError() {
  els.errorBar.hidden = true;
  els.errorBar.textContent = '';
}

/* ------------------------------ dropdowns ------------------------------ */

function fillLangSelect(select) {
  select.innerHTML = '';
  for (const lang of state.config.languages) {
    const opt = document.createElement('option');
    opt.value = lang.id;
    opt.textContent = lang.name;
    select.appendChild(opt);
  }
}

function fillVariantSelect(langSelect, variantSelect, preferredVariantId) {
  const lang = langById(langSelect.value);
  variantSelect.innerHTML = '';
  if (!lang) return;
  for (const v of lang.variants) {
    const opt = document.createElement('option');
    opt.value = v.id;
    opt.textContent = v.label;
    variantSelect.appendChild(opt);
  }
  if (preferredVariantId && lang.variants.some((v) => v.id === preferredVariantId)) {
    variantSelect.value = preferredVariantId;
  }
}

function setSide(side, langId, variantId) {
  const langSel = side === 'from' ? els.fromLang : els.toLang;
  const varSel = side === 'from' ? els.fromVariant : els.toVariant;
  langSel.value = langId;
  fillVariantSelect(langSel, varSel, variantId);
}

/* ------------------------------ swap ------------------------------ */

function swap() {
  const from = { lang: els.fromLang.value, variant: els.fromVariant.value };
  const to = { lang: els.toLang.value, variant: els.toVariant.value };

  setSide('from', to.lang, to.variant);
  setSide('to', from.lang, from.variant);

  // Move the output text into the input (per spec).
  if (state.lastResult && state.lastResult.translation) {
    els.inputText.value = state.lastResult.translation;
  }
  // The old output no longer matches the new "to" side; clear it.
  hideOutput();
}

/* ------------------------------ output ------------------------------ */

function hideOutput() {
  els.outputSection.hidden = true;
  state.lastResult = null;
}

function renderOutput(result, fromSel, toSel) {
  state.lastResult = result;

  const rtl = result.target && result.target.rtl;
  els.outputText.textContent = result.translation;
  els.outputText.setAttribute('dir', rtl ? 'rtl' : 'ltr');

  if (result.romanization && result.romanization.trim()) {
    els.romanization.textContent = result.romanization;
    els.romanization.hidden = false;
  } else {
    els.romanization.hidden = true;
  }

  if (result.note && result.note.trim()) {
    els.dialectNote.textContent = result.note;
    els.dialectNote.hidden = false;
  } else {
    els.dialectNote.hidden = true;
  }

  els.outputPairLabel.textContent =
    `${variantById(fromSel.lang, fromSel.variant).label} → ${variantById(toSel.lang, toSel.variant).label}`;

  els.outputSection.hidden = false;
}

/* ------------------------------ translate ------------------------------ */

let inflight = false;

async function translate() {
  const text = els.inputText.value.trim();
  clearError();

  if (!text) {
    showError('Type or speak something to translate first.');
    return;
  }
  if (inflight) return;

  const fromSel = { lang: els.fromLang.value, variant: els.fromVariant.value };
  const toSel = { lang: els.toLang.value, variant: els.toVariant.value };

  inflight = true;
  els.translateBtn.disabled = true;
  els.translateBtn.textContent = 'Translating…';

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, from: fromSel, to: toSel, register: state.register }),
    });

    let data;
    try {
      data = await res.json();
    } catch (_) {
      throw new Error(`Unexpected non-JSON response from the server (HTTP ${res.status}).`);
    }

    if (!res.ok) {
      throw new Error(data && data.error ? data.error : `Translation failed (HTTP ${res.status}).`);
    }

    renderOutput(data, fromSel, toSel);
    addHistory({ text, result: data, fromSel, toSel });
  } catch (err) {
    showError(err && err.message ? err.message : 'Translation failed for an unknown reason.');
  } finally {
    inflight = false;
    els.translateBtn.disabled = false;
    els.translateBtn.textContent = 'Translate';
  }
}

/* ------------------------------ speech synthesis ------------------------------ */

function pickVoice(bcp47) {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return null;
  const lower = bcp47.toLowerCase();
  const base = lower.split('-')[0];
  return (
    voices.find((v) => v.lang && v.lang.toLowerCase() === lower) ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(base)) ||
    null
  );
}

function speak(textEl, bcp47, btn) {
  if (!('speechSynthesis' in window)) {
    showError('Speech playback is not supported in this browser.');
    return;
  }
  const text = textEl.value !== undefined ? textEl.value : textEl.textContent;
  if (!text || !text.trim()) {
    showError('Nothing to read out yet.');
    return;
  }
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = bcp47;
  const voice = pickVoice(bcp47);
  if (voice) utter.voice = voice;

  utter.onstart = () => btn.classList.add('is-speaking');
  const done = () => btn.classList.remove('is-speaking');
  utter.onend = done;
  utter.onerror = (e) => {
    done();
    if (e.error && e.error !== 'interrupted' && e.error !== 'canceled') {
      showError(`Could not read this out (${e.error}). A voice for this language may not be installed.`);
    }
  };
  window.speechSynthesis.speak(utter);
}

/* ------------------------------ speech recognition ------------------------------ */

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let recognizing = false;

function startRecognition() {
  if (!SpeechRecognition) {
    showError('Voice input is not supported in this browser. Try Chrome, Edge, or Safari.');
    return;
  }
  if (recognizing) {
    recognition.stop();
    return;
  }

  const { variant } = currentSide('from');
  clearError();

  recognition = new SpeechRecognition();
  recognition.lang = variant.bcp47; // BCP-47 tag of the selected "From" variant
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    recognizing = true;
    els.micBtn.classList.add('is-recording');
  };
  recognition.onend = () => {
    recognizing = false;
    els.micBtn.classList.remove('is-recording');
  };
  recognition.onerror = (e) => {
    recognizing = false;
    els.micBtn.classList.remove('is-recording');
    const map = {
      'no-speech': 'No speech detected — try again and speak clearly.',
      'audio-capture': 'No microphone found. Check that a mic is connected.',
      'not-allowed': 'Microphone permission was denied. Allow mic access in your browser settings.',
      'service-not-allowed': 'The speech service is blocked in this browser or context.',
      network: 'Network error during speech recognition. Check your connection.',
      'language-not-supported': `Voice input for ${variant.bcp47} is not supported by this browser.`,
    };
    showError(map[e.error] || `Voice input error: ${e.error}.`);
  };
  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    els.inputText.value = transcript;
    // Speaking auto-triggers translation.
    translate();
  };

  try {
    recognition.start();
  } catch (err) {
    showError(`Could not start voice input: ${err.message}`);
  }
}

/* ------------------------------ copy ------------------------------ */

async function copyOutput() {
  const text = els.outputText.textContent;
  if (!text || !text.trim()) {
    showError('Nothing to copy yet.');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    flashButton(els.copyBtn, '✅');
  } catch (_) {
    // Fallback for older/insecure contexts.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      flashButton(els.copyBtn, '✅');
    } catch (e) {
      showError('Could not copy to clipboard in this browser.');
    }
  }
}

function flashButton(btn, glyph) {
  const original = btn.innerHTML;
  btn.innerHTML = `<span aria-hidden="true">${glyph}</span>`;
  setTimeout(() => { btn.innerHTML = original; }, 900);
}

/* ------------------------------ history ------------------------------ */

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}
function saveHistory(items) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch (_) { /* storage may be unavailable */ }
}

function addHistory({ text, result, fromSel, toSel }) {
  const items = loadHistory();
  items.unshift({
    text,
    translation: result.translation,
    romanization: result.romanization || '',
    note: result.note || '',
    target: result.target,
    fromSel,
    toSel,
    register: state.register,
  });
  saveHistory(items.slice(0, HISTORY_MAX));
  renderHistory();
}

function renderHistory() {
  const items = loadHistory();
  if (!items.length) {
    els.historySection.hidden = true;
    return;
  }
  els.historySection.hidden = false;
  els.historyList.innerHTML = '';

  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'history__item';
    li.tabIndex = 0;
    li.setAttribute('role', 'button');

    const fromLabel = variantLabel(item.fromSel.lang, item.fromSel.variant);
    const toLabel = variantLabel(item.toSel.lang, item.toSel.variant);

    const pair = document.createElement('div');
    pair.className = 'history__pair';
    pair.textContent = `${fromLabel}  →  ${toLabel}`;

    const src = document.createElement('div');
    src.className = 'history__src';
    src.textContent = item.text;

    const dst = document.createElement('div');
    dst.className = 'history__dst';
    dst.textContent = item.translation;
    if (item.target && item.target.rtl) dst.setAttribute('dir', 'rtl');

    li.append(pair, src, dst);

    const restore = () => restoreHistory(item);
    li.addEventListener('click', restore);
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); restore(); }
    });

    els.historyList.appendChild(li);
  }
}

function restoreHistory(item) {
  setSide('from', item.fromSel.lang, item.fromSel.variant);
  setSide('to', item.toSel.lang, item.toSel.variant);
  setRegister(item.register || 'everyday');
  els.inputText.value = item.text;
  renderOutput(
    { translation: item.translation, romanization: item.romanization, note: item.note, target: item.target },
    item.fromSel,
    item.toSel,
  );
  clearError();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------ register ------------------------------ */

function setRegister(register) {
  state.register = register;
  for (const btn of els.registerBtns) {
    const active = btn.dataset.register === register;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-checked', active ? 'true' : 'false');
  }
}

/* ------------------------------ wiring ------------------------------ */

function wireEvents() {
  els.fromLang.addEventListener('change', () => fillVariantSelect(els.fromLang, els.fromVariant));
  els.toLang.addEventListener('change', () => fillVariantSelect(els.toLang, els.toVariant));

  els.swapBtn.addEventListener('click', swap);
  els.translateBtn.addEventListener('click', translate);

  els.inputText.addEventListener('keydown', (e) => {
    // Ctrl/Cmd+Enter translates.
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); translate(); }
  });

  els.micBtn.addEventListener('click', startRecognition);
  els.speakInputBtn.addEventListener('click', () => {
    const { variant } = currentSide('from');
    speak(els.inputText, variant.bcp47, els.speakInputBtn);
  });
  els.speakOutputBtn.addEventListener('click', () => {
    const bcp47 = state.lastResult && state.lastResult.target ? state.lastResult.target.bcp47 : currentSide('to').variant.bcp47;
    speak(els.outputText, bcp47, els.speakOutputBtn);
  });
  els.copyBtn.addEventListener('click', copyOutput);

  for (const btn of els.registerBtns) {
    btn.addEventListener('click', () => setRegister(btn.dataset.register));
  }

  els.clearHistoryBtn.addEventListener('click', () => {
    saveHistory([]);
    renderHistory();
  });

  // Voices load asynchronously in some browsers.
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }
  if (!SpeechRecognition) {
    els.micBtn.disabled = true;
    els.micBtn.title = 'Voice input not supported in this browser';
  }
}

/* ------------------------------ init ------------------------------ */

async function init() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) throw new Error(`Could not load languages (HTTP ${res.status}).`);
    state.config = await res.json();
  } catch (err) {
    showError(`Failed to load the app configuration: ${err.message}`);
    return;
  }

  fillLangSelect(els.fromLang);
  fillLangSelect(els.toLang);

  // Sensible defaults: English (American) → Spanish (Puerto Rican).
  setSide('from', 'english', 'american');
  const hasSpanish = langById('spanish');
  if (hasSpanish) setSide('to', 'spanish', 'puerto_rican');
  else setSide('to', state.config.languages[1].id, state.config.languages[1].variants[0].id);

  wireEvents();
  renderHistory();
}

init();
