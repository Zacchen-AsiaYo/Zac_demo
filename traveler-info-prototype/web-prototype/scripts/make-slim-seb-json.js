#!/usr/bin/env node
/**
 * Produce slim editor-friendly SEB JSON for each locale.
 *
 * Input:  public/data/seb-{locale}.json   (full, with images / URLs / prices / chips / etc.)
 * Output: public/data/seb-{locale}.slim.json
 *
 * Slim only keeps the 5 categories the user wants to edit:
 *   1. 8 個 tab          → tabs[].label
 *   2. section 標題/副標 → tabConfig.{tab}.sections[].{title, subtitle}
 *   3. section 內 tab    → tabConfig.{tab}.secondTabs[].label
 *   4. chip 標籤文字      → chipLabels
 *   5. 105 張卡的全部文字 → events[].{title, location, headline, distance, includes, priceText}
 *
 * Run:  node scripts/make-slim-seb-json.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = ['zh-tw', 'zh-cn', 'en-us'];

function slim(full) {
  return {
    tabs: full.tabs.map((t) => ({ key: t.key, label: t.label })),
    chipLabels: full.chipLabels,
    tabConfig: Object.fromEntries(
      Object.entries(full.tabConfig).map(([key, tab]) => [
        key,
        {
          secondTabs: (tab.secondTabs || []).map((s) => ({ key: s.key, label: s.label })),
          sections: (tab.sections || []).map((sec) => ({
            id: sec.id,
            title: sec.title,
            subtitle: sec.subtitle || '',
          })),
        },
      ]),
    ),
    events: full.events.map((e) => ({
      id: e.id,
      title: e.title,
      location: e.location,
      headline: e.headline,
      distance: e.distance,
      includes: e.includes,
      priceText: e.priceText,
    })),
  };
}

for (const loc of LOCALES) {
  const fullPath = path.join(ROOT, 'public', 'data', `seb-${loc}.json`);
  const slimPath = path.join(ROOT, 'public', 'data', `seb-${loc}.slim.json`);
  const full = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const out = slim(full);
  fs.writeFileSync(slimPath, JSON.stringify(out, null, 2) + '\n');
  const sectionCount = Object.values(out.tabConfig).reduce((n, t) => n + t.sections.length, 0);
  console.log(
    `✓ ${path.relative(ROOT, slimPath)}  ` +
      `(tabs=${out.tabs.length}, sections=${sectionCount}, chipLabels=${Object.keys(out.chipLabels).length}, events=${out.events.length})`,
  );
}
