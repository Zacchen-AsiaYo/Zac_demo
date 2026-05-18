#!/usr/bin/env node
/**
 * Take public/data/seb-{locale}.json (full, deduped) and write its data
 * back into the inline JS constants of public/{locale}/SEB_v4_*.html.
 *
 * For SEB_TAB_CONFIG, sections[i].eventIds are "rehydrated" into
 * sections[i].events (full event objects) so the runtime React code
 * works without changes.
 *
 * Run:  node scripts/apply-seb-json-to-html.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
  { locale: 'zh-tw', html: 'public/zh-tw/SEB_v4_PP1_zh_tw.html', json: 'public/data/seb-zh-tw.json' },
  { locale: 'zh-cn', html: 'public/zh-cn/SEB_v4_PP1_zh_cn.html', json: 'public/data/seb-zh-cn.json' },
  { locale: 'en-us', html: 'public/en-us/SEB_v4_pp1_en_us.html', json: 'public/data/seb-en-us.json' },
];

// Find `const NAME = <literal>;` and return [start, end] indices of the literal.
function findConstBlock(source, name) {
  const marker = `const ${name} = `;
  const startIdx = source.indexOf(marker);
  if (startIdx === -1) return null;
  const valueStart = startIdx + marker.length;
  const firstChar = source[valueStart];
  if (firstChar !== '[' && firstChar !== '{') return null;
  const open = firstChar;
  const close = firstChar === '[' ? ']' : '}';
  let depth = 0, inStr = false, strChar = null, inTpl = false, escaped = false;
  for (let i = valueStart; i < source.length; i++) {
    const c = source[i];
    if (escaped) { escaped = false; continue; }
    if (c === '\\') { escaped = true; continue; }
    if (inStr) { if (c === strChar) inStr = false; continue; }
    if (inTpl) { if (c === '`') inTpl = false; continue; }
    if (c === '"' || c === "'") { inStr = true; strChar = c; continue; }
    if (c === '`') { inTpl = true; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return { start: valueStart, end: i + 1 };
    }
  }
  return null;
}

// Serialize JSON value with a fixed left-indent for non-first lines so the
// resulting literal aligns with the surrounding `    const X = ` declaration.
function indentJsonLiteral(value, leftIndent = 4) {
  const json = JSON.stringify(value, null, 2);
  const pad = ' '.repeat(leftIndent);
  return json.split('\n').map((line, i) => i === 0 ? line : pad + line).join('\n');
}

function rehydrateTabConfig(tabConfig, events) {
  const evMap = Object.fromEntries(events.map((e) => [e.id, e]));
  const out = {};
  for (const [tabKey, tab] of Object.entries(tabConfig)) {
    out[tabKey] = {
      secondTabs: tab.secondTabs || [],
      sections: (tab.sections || []).map((sec) => ({
        id: sec.id,
        title: sec.title,
        subtitle: sec.subtitle || '',
        chips: sec.chips || [],
        events: (sec.eventIds || []).map((id) => evMap[id]).filter(Boolean),
      })),
    };
  }
  return out;
}

function applyConst(html, name, value) {
  const block = findConstBlock(html, name);
  if (!block) {
    console.warn(`    ⚠ ${name}: const block not found, skipped`);
    return html;
  }
  const literal = indentJsonLiteral(value, 4);
  return html.slice(0, block.start) + literal + html.slice(block.end);
}

function main() {
  for (const { locale, html: htmlRel, json: jsonRel } of TARGETS) {
    const htmlPath = path.join(ROOT, htmlRel);
    const jsonPath = path.join(ROOT, jsonRel);
    console.log(`\n• ${locale}`);

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let html = fs.readFileSync(htmlPath, 'utf8');

    const rehydratedTabConfig = rehydrateTabConfig(data.tabConfig, data.events);

    html = applyConst(html, 'SEB_HEADING', data.heading);
    html = applyConst(html, 'SEB_MAIN_TABS', data.tabs);
    html = applyConst(html, 'SEB_EVENTS', data.events);
    html = applyConst(html, 'SEB_CHIP_LABELS', data.chipLabels);
    html = applyConst(html, 'SEB_TAB_CONFIG', rehydratedTabConfig);
    html = applyConst(html, 'SEB_COMING_SOON', data.comingSoon);
    html = applyConst(html, 'SEB_BANNERS', data.banners);

    fs.writeFileSync(htmlPath, html);
    const sections = Object.values(rehydratedTabConfig).reduce((n, t) => n + t.sections.length, 0);
    const refs = Object.values(rehydratedTabConfig).reduce(
      (n, t) => n + t.sections.reduce((m, s) => m + s.events.length, 0), 0);
    console.log(`  ✓ wrote ${htmlRel}`);
    console.log(`    tabs=${data.tabs.length} sections=${sections} sectionEventRefs=${refs} events=${data.events.length}`);
  }
  console.log('\nDone.');
}

main();
