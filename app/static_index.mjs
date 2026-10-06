// Builds the crawlable, no-JavaScript version of the library's contents.
// Search engines and AI crawlers that do not run JavaScript read this; people
// with JavaScript see the interactive app (the block is hidden as soon as the
// app starts and replaced when the home section renders).
// Also produces llms.txt, sitemap.xml and robots.txt for the deployed site.
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const firstSentence = (s) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  const m = t.match(/^(.{40,260}?[.!?])(\s|$)/);
  return m ? m[1] : t.slice(0, 240);
};
const titleCase = (s) => String(s ?? '').replace(/[_-]+/g, ' ').replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export async function loadLibrary(LIB) {
  const d = (p) => import(pathToFileURL(join(LIB, 'data', p)).href);
  const [{ SACRED_TEXTS }, { TRADITION_GROUPS }, { CALENDAR_SYSTEMS }, { DEITIES }] = await Promise.all([
    d('texts/sacred-texts.js'), d('traditions/groups.js'), d('calendars/systems.js'), d('deities.js'),
  ]);
  return { texts: SACRED_TEXTS, groups: TRADITION_GROUPS, calendars: CALENDAR_SYSTEMS, deities: DEITIES };
}

export function staticIndexHTML({ texts, groups, calendars, deities }, seedCounts) {
  const groupLabel = Object.fromEntries(groups.map((g) => [g.id, g.label]));
  const trad = (id) => groupLabel[id] || titleCase(id);
  const li = (head, meta, body) =>
    `<li><strong>${esc(head)}</strong>${meta ? ` <span>(${esc(meta)})</span>` : ''}${body ? `: ${esc(body)}` : ''}</li>`;
  return `
        <div class="static-index">
          <h1>Divine Origins</h1>
          <p>Divine Origins is a comparative theology library. It compares creator gods, sacred texts and calendar systems across ${groups.length} tradition groups, with photographs of the real manuscripts, tablets and scrolls, and a Source Map that places ${seedCounts.deities} deities from ${seedCounts.traditions} traditions on one four-tier map of the divine (Source, Council, Demiurge, Archons, plus figures that cross tiers). Each tradition is described in its own voice, with scholarly context kept separate, and every claim is labelled as documented, debated or the tradition's own account.</p>
          <h2>Tradition groups (${groups.length})</h2>
          <ul>${groups.map((g) => li(g.label, [g.era, g.region].filter(Boolean).join(', '), firstSentence(g.summary))).join('')}</ul>
          <h2>Sacred texts (${texts.length})</h2>
          <ul>${texts.map((t) => li(t.title, [trad(t.tradition), t.date].filter(Boolean).join(', '), firstSentence(t.note))).join('')}</ul>
          <h2>Creator beings and divine archetypes (${deities.length})</h2>
          <ul>${deities.map((x) => li(x.name, [trad(x.tradition), x.date].filter(Boolean).join(', '), firstSentence(x.shortDesc))).join('')}</ul>
          <h2>Calendar systems (${calendars.length})</h2>
          <ul>${calendars.map((c) => li(c.name, [c.type && titleCase(c.type), c.origin].filter(Boolean).join(', '), firstSentence(c.note))).join('')}</ul>
        </div>`;
}

export function llmsTxt({ texts, groups, calendars, deities }, seedCounts, LIVE) {
  const groupLabel = Object.fromEntries(groups.map((g) => [g.id, g.label]));
  return `# Divine Origins

> A comparative theology library: creator gods, sacred texts and calendar systems across ${groups.length} tradition groups, with photographs of the original manuscripts, and a Source Map of ${seedCounts.deities} deities from ${seedCounts.traditions} traditions placed on one four-tier map (Source, Council, Demiurge, Archons, plus cross-tier figures).

Each tradition is presented in its own voice; scholarly context is kept separate, and claims are labelled documented, debated, or the tradition's own account. Matches between figures are made on the cosmic role they perform, not on shared names or symbols.

## Site
- [Divine Origins](${LIVE}): the full library and the interactive Source Map
- [Source code and data](https://github.com/prodbykctw-max/divine-origins): seed data, validation tools and the specification

## Tradition groups
${groups.map((g) => `- ${g.label} (${[g.era, g.region].filter(Boolean).join(', ')}): ${firstSentence(g.summary)}`).join('\n')}

## Sacred texts
${texts.map((t) => `- ${t.title} (${[groupLabel[t.tradition] || titleCase(t.tradition), t.date].filter(Boolean).join(', ')}): ${firstSentence(t.note)}`).join('\n')}

## Creator beings
${deities.map((x) => `- ${x.name} (${groupLabel[x.tradition] || titleCase(x.tradition)}): ${firstSentence(x.shortDesc)}`).join('\n')}

## Calendar systems
${calendars.map((c) => `- ${c.name} (${[c.type, c.origin].filter(Boolean).join(', ')}): ${firstSentence(c.note)}`).join('\n')}
`;
}

export function sitemapXml(LIVE, isoDate) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${LIVE}</loc><lastmod>${isoDate}</lastmod></url>
  <url><loc>${LIVE}llms.txt</loc><lastmod>${isoDate}</lastmod></url>
</urlset>
`;
}

export function robotsTxt(LIVE) {
  return `# Divine Origins welcomes search engines and AI assistants.
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${LIVE}sitemap.xml
`;
}
