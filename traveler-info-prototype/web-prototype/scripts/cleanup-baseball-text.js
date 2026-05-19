#!/usr/bin/env node
/**
 * One-off cleanup: rewrite all text fields of the 4 baseball events
 * (e90–e93) so that:
 *
 *  - zh-cn version uses uniform simplified characters
 *    (existing data mixed 觀/赛/場/萬/過 with simplified text).
 *  - en-us version uses uniform English (existing data was a
 *    half-finished translation with Chinese chars sprinkled throughout).
 *
 * zh-tw is left alone — its data is already clean traditional.
 *
 * Affected fields: title, headline, distance, includes, priceText
 *
 * Run:  node scripts/cleanup-baseball-text.js
 *       node scripts/apply-seb-json-to-html.js
 *       node scripts/make-slim-seb-json.js
 */

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const FIXES = {
  'zh-cn': {
    e90: {
      title: '2026 世界经典棒球赛 观赛＋住宿5晚自由行方案',
      headline:
        '★安排VIP观战票(保证席位)＋门票专属特典＋精选住宿 · ★住宿地点：东京巨蛋酒店，与东京巨蛋仅一步之遥。 · ★五场精彩赛事，千万不能错过！',
      distance: '入住日期：2026/03/04(三)~03/09(一)',
      includes: '观赛日期：2026/03/05(四)~03/08(日)',
      priceText: '限量贩售！每人最低 USD$ 5,700起',
    },
    e91: {
      title: '2026 世界经典棒球赛 4场观赛＋东京庭之酒店5晚自由行',
      headline:
        '★安排一般席位(保证席位)＋精选住宿 · ★住宿地点：东京庭之酒店。 · ★五场精彩赛事，千万不能错过！',
      distance: '入住日期：2026/03/04(三)~03/09(一)',
      includes: '观赛日期：2026/03/05(四)~03/08(日)',
      priceText: '限量贩售！每人最低 USD$ 2,556起',
    },
    e92: {
      title: '2026 世界经典棒球赛 4场观赛＋住宿5晚自由行方案',
      headline:
        '★安排一般席位(保证席位)＋精选住宿 · ★住宿地点：品川王子大酒店、东京湾拉维斯塔酒店、京王广场酒店、东京庭之酒店。(依您选择而定) · ★五场精彩赛事，千万不能错过！',
      distance: '入住日期：2026/03/04(三)~03/09(一)',
      includes: '观赛日期：2026/03/05(四)~03/08(日)',
      priceText: '限量贩售！每人最低 USD$ 1,680起',
    },
    e93: {
      title: '2026 世界经典棒球赛 台日大赛＋超值精选2晚住宿',
      headline:
        '★安排外野席＋精选住宿 · ★住宿地点：Villa Fontaine酒店 东京茅场町。 · ★精彩台日大赛，千万不能错过！',
      distance: '入住日期：2026/03/06(五)~03/08(日)',
      includes: '观赛日期：2026/03/06(五)',
      priceText: '限量贩售！每人最低 USD$ 850起',
    },
  },
  'en-us': {
    e90: {
      title: '2026 World Baseball Classic — Match Pass + 5-Night Hotel Free & Easy',
      headline:
        "★VIP Match Tickets (Guaranteed Seats) + Exclusive Ticket Perks + Premium Hotel · ★Hotel: Tokyo Dome Hotel, steps from the Tokyo Dome. · ★5 thrilling matches you can't miss!",
      distance: 'Check-in: 2026/03/04 (Wed) ~ 03/09 (Mon)',
      includes: 'Match Dates: 2026/03/05 (Thu) ~ 03/08 (Sun)',
      priceText: 'Limited offer — From USD$ 5,700 / person',
    },
    e91: {
      title: '2026 World Baseball Classic — 4 Matches + Niwa Tokyo Hotel 5-Night Free & Easy',
      headline:
        "★Standard Seats (Guaranteed) + Premium Hotel · ★Hotel: Niwa Tokyo Hotel. · ★5 thrilling matches you can't miss!",
      distance: 'Check-in: 2026/03/04 (Wed) ~ 03/09 (Mon)',
      includes: 'Match Dates: 2026/03/05 (Thu) ~ 03/08 (Sun)',
      priceText: 'Limited offer — From USD$ 2,556 / person',
    },
    e92: {
      title: '2026 World Baseball Classic — 4 Matches + 5-Night Hotel Free & Easy',
      headline:
        "★Standard Seats (Guaranteed) + Premium Hotel · ★Hotels: Shinagawa Prince Hotel, Tokyo Bay Lavista Hotel, Keio Plaza Hotel, Niwa Tokyo Hotel (your choice). · ★5 thrilling matches you can't miss!",
      distance: 'Check-in: 2026/03/04 (Wed) ~ 03/09 (Mon)',
      includes: 'Match Dates: 2026/03/05 (Thu) ~ 03/08 (Sun)',
      priceText: 'Limited offer — From USD$ 1,680 / person',
    },
    e93: {
      title: '2026 World Baseball Classic — Taiwan vs Japan Game + 2-Night Premium Hotel',
      headline:
        "★Outfield Seats + Premium Hotel · ★Hotel: Villa Fontaine Tokyo Kayabacho. · ★Don't miss the thrilling Taiwan vs Japan game!",
      distance: 'Check-in: 2026/03/06 (Fri) ~ 03/08 (Sun)',
      includes: 'Match Date: 2026/03/06 (Fri)',
      priceText: 'Limited offer — From USD$ 850 / person',
    },
  },
};

for (const [loc, byId] of Object.entries(FIXES)) {
  const p = path.join(ROOT, 'public', 'data', `seb-${loc}.json`);
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  let touched = 0;
  for (const [id, fields] of Object.entries(byId)) {
    const e = d.events.find((x) => x.id === id);
    if (!e) {
      console.warn(`⚠ ${loc}/${id}: not found`);
      continue;
    }
    for (const [f, v] of Object.entries(fields)) {
      e[f] = v;
    }
    touched++;
  }
  fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
  console.log(`✓ ${loc}: cleaned ${touched} events`);
}
