#!/usr/bin/env node
/**
 * One-off restructure:
 * 1) Move tw_mar > s-tw-marathon (精選賽事) — its 9 events — to
 *    intl_mar as a new "台灣" sub-section, placed at the front.
 * 2) Remove tw_mar > s-oneday-tour (一日遊) entirely (hide).
 * 3) Remove tw_mar tab itself from tabs nav and tabConfig.
 * 4) Prune events flat list to drop any now-orphan ids.
 *
 * Run:  node scripts/move-tw-marathon-to-intl.js
 *       node scripts/apply-seb-json-to-html.js
 *       node scripts/make-slim-seb-json.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = ['zh-tw', 'zh-cn', 'en-us'];

// Per-locale label for the new "台灣" section under intl_mar
const TW_LABEL = {
  'zh-tw': '台灣',
  'zh-cn': '台湾',
  'en-us': 'Taiwan',
};

for (const loc of LOCALES) {
  const p = path.join(ROOT, 'public', 'data', `seb-${loc}.json`);
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));

  const twMarTab = d.tabConfig.tw_mar;
  if (!twMarTab) {
    console.warn(`⚠ ${loc}: tw_mar not found, skipped`);
    continue;
  }
  const twMarathonSec = (twMarTab.sections || []).find((s) => s.id === 's-tw-marathon');
  if (!twMarathonSec) {
    console.warn(`⚠ ${loc}: s-tw-marathon section not found, skipped`);
    continue;
  }

  const movedIds = [...(twMarathonSec.eventIds || [])];
  const movedChips = twMarathonSec.chips || [];

  // 1) Add new "台灣" section + secondTab at the front of intl_mar
  const intlMar = d.tabConfig.intl_mar;
  if (!intlMar) {
    console.warn(`⚠ ${loc}: intl_mar not found, skipped`);
    continue;
  }
  // Avoid duplicate insert on re-run
  intlMar.secondTabs = (intlMar.secondTabs || []).filter((t) => t.key !== 's-tw-marathon');
  intlMar.sections = (intlMar.sections || []).filter((s) => s.id !== 's-tw-marathon');

  intlMar.secondTabs.unshift({ key: 's-tw-marathon', label: TW_LABEL[loc] });
  intlMar.sections.unshift({
    id: 's-tw-marathon',
    title: TW_LABEL[loc],
    subtitle: '',
    chips: movedChips,
    eventIds: movedIds,
  });

  // 2 + 3) Remove tw_mar tab from main tabs nav and tabConfig
  d.tabs = d.tabs.filter((t) => t.key !== 'tw_mar');
  delete d.tabConfig.tw_mar;

  // 4) Prune orphan events
  const referenced = new Set();
  Object.values(d.tabConfig).forEach((t) =>
    t.sections.forEach((s) => (s.eventIds || []).forEach((id) => referenced.add(id))),
  );
  const beforeEv = d.events.length;
  d.events = d.events.filter((e) => referenced.has(e.id));

  fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
  console.log(
    `✓ ${loc}: moved ${movedIds.length} events to intl_mar > ${TW_LABEL[loc]}; ` +
      `removed tw_mar tab; events ${beforeEv}→${d.events.length}`,
  );
}
