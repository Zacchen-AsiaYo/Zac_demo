#!/usr/bin/env node
/**
 * Replace SiteFooter component in 3 SEB v4 HTML files with content
 * mirrored from each locale's source-of-truth footer:
 *
 *   zh-tw : public/zh-tw/index.html footer (full)
 *   zh-cn : public/zh-cn/footer_zh_my.html (minus 发布房源 / 工作机会)
 *   en-us : public/en-us/index.html footer (minus List your property / Careers)
 *
 * Dark background (#262626) preserved across all three.
 *
 * Run:  node scripts/replace-seb-footer.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Shared shell: opens the JSX const, sets up dark <footer>, 4-col grid.
const SHELL_HEAD = `    const SiteFooter = () => (
      <footer style={{ background: '#262626', color: '#bfbfbf', marginTop: 0, padding: '40px var(--seb-pad) 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
`;
const SHELL_TAIL_CLOSE = `        </div>
`;

function colTitle(text) {
  return `            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>${text}</div>
`;
}

function colLinkList(items, clickable) {
  return items.map((i) =>
    `            <div style={{ padding: '4px 0', ` +
    (clickable ? `cursor: 'pointer', ` : ``) +
    `fontSize: 13 }}>${i}</div>
`).join('');
}

function colDescription(text) {
  return `            <div style={{ padding: '4px 0', fontSize: 13, lineHeight: 1.6 }}>${text}</div>
`;
}

function appBadges() {
  return `            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <a href="#" style={{ display: 'inline-block' }}><img src="https://img.asiayo.com/static/images/appStore_footer_banner@2x.webp" alt="App Store" style={{ height: 36 }} /></a>
              <a href="#" style={{ display: 'inline-block' }}><img src="https://img.asiayo.com/static/images/googlePlay_footer_banner@2x.webp" alt="Google Play" style={{ height: 36 }} /></a>
            </div>
`;
}

function socialIcons(names) {
  // Build using string concat (no inner template literals so this template literal stays clean)
  return `            <div style={{ display: 'flex', gap: 8 }}>
              {[` + names.map((n) => `'${n}'`).join(', ') + `].map(name =>
                <a key={name} href="#" style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={'https://img.asiayo.com/static/images/footer/logo/' + name + '.png'} alt={name} style={{ width: 32, height: 32 }} />
                </a>
              )}
            </div>
`;
}

function bottomBar(terms, privacy, copyright) {
  return `        <div style={{ maxWidth: 1280, margin: '32px auto 0', paddingTop: 20, borderTop: '1px solid #595959', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#8c8c8c', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ cursor: 'pointer' }}>${terms}</span>
            <span style={{ cursor: 'pointer' }}>${privacy}</span>
            <span>${copyright}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {['applepay', 'visa', 'master', 'jcb', 'linepay', 'jkopay'].map(name =>
                <img key={name} src={'https://img.asiayo.com/static/images/footer/logo/' + name + '.svg'} alt={name} style={{ height: 18 }} />
              )}
            </div>
            <div style={{ width: 1, height: 18, background: '#595959' }} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {['motc', 'tata', 'tqaa'].map(name =>
                <img key={name} src={'https://img.asiayo.com/static/images/footer/logo/' + name + '.svg'} alt={name} style={{ height: 24 }} />
              )}
            </div>
          </div>
        </div>
      </footer>
    );`;
}

function col(content) {
  return `          <div>
${content}          </div>
`;
}

// ===================== zh-tw =====================

const FOOTER_ZH_TW =
  SHELL_HEAD +
  col(
    colTitle('關於我們') +
    colLinkList(['發布房源', '工作機會', '合作提案', '認識 AsiaYo', '常見問題', '聯繫我們'], true)
  ) +
  col(
    colTitle('客戶服務') +
    colLinkList([
      '週一 ~ 週五 09:00 ~ 22:00 (UTC+8)',
      '週六 / 日及連續假日 12:00 ~ 18:00 (UTC+8)',
      '電話：+886-2-7755-0575',
      '傳真：+886-2-2784-5272',
      '信箱：customer_tw@asiayo.com',
    ], false)
  ) +
  col(
    colTitle('AsiaYo') +
    colLinkList([
      '亞揪遊旅行社股份有限公司',
      '台北市大安區敦化南路二段77號18樓之三',
      '代表人：鄭兆剛',
      '統一編號：82883867',
      '交觀甲830400號',
      '品保協會 北2478',
    ], false)
  ) +
  col(
    colTitle('下載 App') +
    appBadges() +
    colTitle('社群媒體') +
    socialIcons(['wordpress', 'facebook', 'instagram', 'line'])
  ) +
  SHELL_TAIL_CLOSE +
  bottomBar('服務條款', '隱私聲明', '© 2014-2026 AsiaYo Co., Ltd. All Rights Reserved. Version 3.98.0');

// ===================== zh-cn (basis: footer_zh_my.html, minus 发布房源 / 工作机会) =====================

const FOOTER_ZH_CN =
  SHELL_HEAD +
  col(
    colTitle('关于我們') +
    colLinkList(['认识 AsiaYo', '常见问题', '联系我们'], true)
  ) +
  col(
    colTitle('客戶服務') +
    colLinkList([
      '週一 ~ 週五 09:00 ~ 22:00 (UTC+8)',
      '週六 / 日及连续假日 12:00 ~ 18:00 (UTC+8)',
      '电话：+886-2-7755-0575',
      '传真：+886-2-2784-5272',
      '信箱：customer_my@asiayo.com',
    ], false)
  ) +
  col(
    colTitle('AsiaYo') +
    colDescription('AsiaYo 精选全球邮轮、跟团旅游、交通通票、特色住宿（高铁套票、豪华露营、包栋住宿），以及马拉松、登山、高尔夫等标志性运动赛事，一站式平台全方位涵盖。')
  ) +
  col(
    colTitle('社交媒体') +
    socialIcons(['wordpress', 'facebook', 'instagram'])
  ) +
  SHELL_TAIL_CLOSE +
  bottomBar('服务条款', '隐私声明', '© 2014-2026 AsiaYo Co., Ltd. All Rights Reserved.');

// ===================== en-us (basis: en-us/index.html footer, minus List your property / Careers) =====================

const FOOTER_EN_US =
  SHELL_HEAD +
  col(
    colTitle('About') +
    colLinkList(['About AsiaYo', 'FAQ', 'Contact us'], true)
  ) +
  col(
    colTitle('Customer Service') +
    colLinkList([
      'Mon – Fri 09:00 – 22:00 (UTC+8)',
      'Sat / Sun & Holidays 12:00 – 18:00 (UTC+8)',
      'Phone: +886-2-7755-0575',
      'Fax: +886-2-2784-5272',
      'Email: customer@asiayo.com',
    ], false)
  ) +
  col(
    colTitle('AsiaYo') +
    colDescription('AsiaYo curates global cruises, group tours, transport passes, unique stays (HSR packages, glamping, whole-house rentals), and signature sports events like marathons, hiking, and golf—all in one platform.')
  ) +
  col(
    colTitle('Follow Us') +
    socialIcons(['wordpress', 'facebook', 'instagram'])
  ) +
  SHELL_TAIL_CLOSE +
  bottomBar('Terms of Service', 'Privacy Policy', '© 2014-2026 AsiaYo Co., Ltd. All Rights Reserved. Version 3.97.0');

// =================================================================

const FILES = [
  { loc: 'zh-tw', path: 'public/zh-tw/SEB_v4_PP1_zh_tw.html', footer: FOOTER_ZH_TW },
  { loc: 'zh-cn', path: 'public/zh-cn/SEB_v4_PP1_zh_cn.html', footer: FOOTER_ZH_CN },
  { loc: 'en-us', path: 'public/en-us/SEB_v4_pp1_en_us.html', footer: FOOTER_EN_US },
];

const START_MARKER = '    const SiteFooter = () => (';
const END_MARKER = '\n\n    Object.assign(window, { SiteHeader, SiteFooter });';

for (const { loc, path: rel, footer } of FILES) {
  const file = path.join(ROOT, rel);
  let html = fs.readFileSync(file, 'utf8');
  const startIdx = html.indexOf(START_MARKER);
  const endIdx = html.indexOf(END_MARKER, startIdx);
  if (startIdx === -1 || endIdx === -1) {
    console.warn(`⚠ ${loc}: SiteFooter markers not found, skipped`);
    continue;
  }
  html = html.slice(0, startIdx) + footer + html.slice(endIdx);
  fs.writeFileSync(file, html);
  console.log(`✓ ${loc}: SiteFooter replaced (${endIdx - startIdx} → ${footer.length} chars)`);
}
