#!/usr/bin/env node
/**
 * Extract SEB v4 prototype data (events, tabs, banners, etc.) from inline
 * JS constants embedded in the HTML files, and emit clean per-locale JSON
 * to `public/data/seb-{locale}.json`.
 *
 * Output shape (方案 A — events deduplicated, sections reference by id):
 * {
 *   heading: { appTitle, pageTitle, description },
 *   tabs: [{ key, label, icon }],
 *   chipLabels: { [key]: label },
 *   events: [{ id, raw_id, title, location, headline, distance, includes,
 *              price, priceText, img, url, chips, ... }],
 *   comingSoon: [...],
 *   banners: [...],
 *   tabConfig: {
 *     [tabKey]: {
 *       secondTabs: [{ key, label }],
 *       sections: [{ id, title, subtitle, chips, eventIds: [string] }]
 *     }
 *   }
 * }
 *
 * Run:  node scripts/extract-seb-json.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SOURCES = [
  { locale: 'zh-tw', file: 'public/zh-tw/SEB_v4_PP1_zh_tw.html' },
  { locale: 'zh-cn', file: 'public/zh-cn/SEB_v4_PP1_zh_cn.html' },
  { locale: 'en-us', file: 'public/en-us/SEB_v4_pp1_en_us.html' },
];

const CONST_NAMES = [
  'SEB_HEADING',
  'SEB_MAIN_TABS',
  'SEB_EVENTS',
  'SEB_CHIP_LABELS',
  'SEB_TAB_CONFIG',
  'SEB_COMING_SOON',
  'SEB_BANNERS',
];

// Extract the literal RHS expression of a top-level `const NAME = ...;`.
// Uses bracket-balanced scanning that's aware of strings to skip braces inside text.
function extractConstExpr(source, name) {
  const marker = `const ${name} = `;
  const startIdx = source.indexOf(marker);
  if (startIdx === -1) return null;
  const valueStart = startIdx + marker.length;
  const firstChar = source[valueStart];
  if (firstChar !== '[' && firstChar !== '{') return null;
  const open = firstChar;
  const close = firstChar === '[' ? ']' : '}';

  let depth = 0;
  let inStr = false;
  let strChar = null;
  let inTpl = false;
  let escaped = false;
  let endIdx = -1;

  for (let i = valueStart; i < source.length; i++) {
    const c = source[i];
    if (escaped) { escaped = false; continue; }
    if (c === '\\') { escaped = true; continue; }

    if (inStr) {
      if (c === strChar) inStr = false;
      continue;
    }
    if (inTpl) {
      if (c === '`') inTpl = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; strChar = c; continue; }
    if (c === '`') { inTpl = true; continue; }

    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) { endIdx = i + 1; break; }
    }
  }
  if (endIdx === -1) return null;
  return source.slice(valueStart, endIdx);
}

function safeEval(expr) {
  // Wrap in parens so an object literal isn't parsed as a block.
  return vm.runInNewContext(`(${expr})`);
}

function dedupeTabConfig(tabConfig, knownEventIds) {
  const out = {};
  const missing = [];
  for (const [tabKey, tab] of Object.entries(tabConfig)) {
    out[tabKey] = {
      secondTabs: tab.secondTabs || [],
      sections: (tab.sections || []).map((sec) => {
        const eventIds = [];
        for (const ev of (sec.events || [])) {
          if (!ev || !ev.id) continue;
          eventIds.push(ev.id);
          if (!knownEventIds.has(ev.id)) {
            missing.push({ tab: tabKey, section: sec.id, id: ev.id });
          }
        }
        return {
          id: sec.id,
          title: sec.title,
          subtitle: sec.subtitle || '',
          chips: sec.chips || [],
          eventIds,
        };
      }),
    };
  }
  return { tabConfig: out, missing };
}

function buildJsonForLocale(htmlPath) {
  const source = fs.readFileSync(htmlPath, 'utf8');
  const raw = {};
  for (const name of CONST_NAMES) {
    const expr = extractConstExpr(source, name);
    if (!expr) {
      console.warn(`  ⚠ ${name}: not found`);
      raw[name] = null;
      continue;
    }
    try {
      raw[name] = safeEval(expr);
    } catch (e) {
      console.warn(`  ⚠ ${name}: eval failed — ${e.message}`);
      raw[name] = null;
    }
  }

  const events = raw.SEB_EVENTS || [];
  const knownEventIds = new Set(events.map((e) => e.id));
  const { tabConfig, missing } = dedupeTabConfig(raw.SEB_TAB_CONFIG || {}, knownEventIds);

  if (missing.length > 0) {
    console.warn(`  ⚠ ${missing.length} events referenced in tabConfig but missing from SEB_EVENTS:`);
    missing.slice(0, 5).forEach((m) => console.warn(`    - ${m.tab}/${m.section} → ${m.id}`));
    if (missing.length > 5) console.warn(`    … and ${missing.length - 5} more`);
  }

  return {
    heading: raw.SEB_HEADING,
    tabs: raw.SEB_MAIN_TABS || [],
    chipLabels: raw.SEB_CHIP_LABELS || {},
    events,
    comingSoon: raw.SEB_COMING_SOON || [],
    banners: raw.SEB_BANNERS || [],
    tabConfig,
  };
}

function main() {
  const outDir = path.join(ROOT, 'public', 'data');
  fs.mkdirSync(outDir, { recursive: true });

  for (const { locale, file } of SOURCES) {
    const htmlPath = path.join(ROOT, file);
    console.log(`\n• ${locale}  ←  ${file}`);
    const data = buildJsonForLocale(htmlPath);

    const outPath = path.join(outDir, `seb-${locale}.json`);
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n');

    const sectionCount = Object.values(data.tabConfig).reduce(
      (n, t) => n + t.sections.length, 0);
    const totalEventRefs = Object.values(data.tabConfig).reduce(
      (n, t) => n + t.sections.reduce((m, s) => m + s.eventIds.length, 0), 0);
    console.log(`  ✓ wrote ${path.relative(ROOT, outPath)}`);
    console.log(`    events=${data.events.length} tabs=${data.tabs.length} sections=${sectionCount} sectionEventRefs=${totalEventRefs} banners=${data.banners.length} comingSoon=${data.comingSoon.length}`);
  }
  console.log('\nDone.');
}

main();
