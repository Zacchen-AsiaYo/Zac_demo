#!/usr/bin/env node
/**
 * One-off content reduction for the prototype: cut each tab down to a
 * single section with 3 cards (matching the "每個 tab 僅保留前三個商品"
 * request).
 *
 * - Keeps all 8 tabs.
 * - For each tab in tabConfig:
 *     secondTabs → first 1 entry
 *     sections   → first 1 entry, eventIds → first 3
 * - Prunes events flat list to only those referenced after reduction.
 *
 * Reads + writes public/data/seb-{locale}.json (full).
 * Run apply-seb-json-to-html.js afterwards to push back to HTML inline.
 *
 * Run:  node scripts/reduce-seb-content.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = ['zh-tw', 'zh-cn', 'en-us'];
const CARDS_PER_TAB = 3;

for (const loc of LOCALES) {
  const p = path.join(ROOT, 'public', 'data', `seb-${loc}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  const beforeEvents = data.events.length;
  const beforeSections = Object.values(data.tabConfig).reduce((n, t) => n + t.sections.length, 0);

  for (const tab of Object.values(data.tabConfig)) {
    tab.secondTabs = (tab.secondTabs || []).slice(0, 1);
    tab.sections = (tab.sections || []).slice(0, 1).map((s) => ({
      ...s,
      eventIds: (s.eventIds || []).slice(0, CARDS_PER_TAB),
    }));
  }

  // Prune events to only those still referenced
  const referenced = new Set();
  Object.values(data.tabConfig).forEach((t) =>
    t.sections.forEach((s) => (s.eventIds || []).forEach((id) => referenced.add(id))),
  );
  data.events = data.events.filter((e) => referenced.has(e.id));

  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');

  const afterSections = Object.values(data.tabConfig).reduce((n, t) => n + t.sections.length, 0);
  console.log(
    `✓ ${loc}: tabs=${data.tabs.length} (kept) ` +
      `sections ${beforeSections}→${afterSections} ` +
      `events ${beforeEvents}→${data.events.length}`,
  );
}
