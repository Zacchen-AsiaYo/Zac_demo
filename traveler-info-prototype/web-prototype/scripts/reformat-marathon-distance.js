#!/usr/bin/env node
/**
 * Reformat marathon events' `distance` (additionalText1) per user spec:
 *
 *   1) e1 (first marathon, 富士山馬拉松) — hardcoded value per locale.
 *   2) Other marathon events — current `distance` string is split by
 *      ｜ / | / / , distance tokens (e.g. "10K", "12.1K") move into a
 *      trailing parenthesis "(NK, NK)" while category tokens stay
 *      joined by half-width "|".
 *
 * Marathon detection: event.title contains 馬 / 马 / "Marathon" /
 * "marathon" (case-insensitive).
 *
 * Run:  node scripts/reformat-marathon-distance.js
 *       node scripts/apply-seb-json-to-html.js
 *       node scripts/make-slim-seb-json.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Hardcoded distance for e1 (富士山馬拉松), per locale, as supplied by user
const E1_OVERRIDE = {
  'zh-tw': '全程馬拉松 | 半程馬拉松｜環湖｜( 12.1 K , 10K )',
  'zh-cn': '全程马拉松 | 半程马拉松｜环湖｜( 12.1 K , 10K )',
  'en-us': 'Full Marathon | Half Marathon | Lake Loop | (12.1K, 10K)',
};

const LOCALES = ['zh-tw', 'zh-cn', 'en-us'];

// Distance token regex: pure "<number>K" optionally with decimal, allow whitespace
const DISTANCE_TOKEN = /^[\d.]+\s*K$/i;
// Category with embedded distance like "歡樂跑(12.1K)" or "歡樂跑(10.6K)"
const CATEGORY_WITH_DIST = /^(.+?)\s*[（(]\s*([\d.]+\s*K)\s*[）)]\s*$/i;

function isMarathonTitle(title) {
  if (!title) return false;
  // Strict: require "馬拉松" / "马拉松" / word "marathon" — avoid
  // false positives like 馬來西亞 (Malaysia) on hiking events.
  return /馬拉松|马拉松|marathon/i.test(title);
}

function reformatDistance(s) {
  if (!s || typeof s !== 'string') return s;
  // Normalize separators: ｜ , / → |
  const parts = s.split(/[｜|/]/).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return s;

  const categories = [];
  const distances = [];

  for (const p of parts) {
    if (DISTANCE_TOKEN.test(p)) {
      distances.push(p.replace(/\s+/g, ''));
      continue;
    }
    const m = p.match(CATEGORY_WITH_DIST);
    if (m) {
      categories.push(m[1].trim());
      distances.push(m[2].replace(/\s+/g, ''));
      continue;
    }
    categories.push(p);
  }

  if (distances.length === 0) return categories.join('|');
  if (categories.length === 0) return `(${distances.join(', ')})`;
  return `${categories.join('|')} (${distances.join(', ')})`;
}

function processLocale(locale) {
  const p = path.join(ROOT, 'public', 'data', `seb-${locale}.json`);
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));

  const changes = [];
  let touched = 0;
  let skipped = 0;

  for (const ev of d.events) {
    if (!isMarathonTitle(ev.title)) continue;

    let newDist;
    if (ev.id === 'e1') {
      newDist = E1_OVERRIDE[locale];
    } else {
      newDist = reformatDistance(ev.distance);
    }

    if (newDist !== ev.distance) {
      changes.push({ id: ev.id, title: ev.title, before: ev.distance, after: newDist });
      ev.distance = newDist;
      touched++;
    } else {
      skipped++;
    }
  }

  fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');

  console.log(`\n=== ${locale} ===  touched=${touched}  unchanged=${skipped}`);
  changes.slice(0, 60).forEach((c) =>
    console.log(`  ${c.id.padEnd(5)}  ${c.before.padEnd(34)} → ${c.after}`),
  );
  if (changes.length > 60) console.log(`  … and ${changes.length - 60} more`);
}

for (const loc of LOCALES) processLocale(loc);
