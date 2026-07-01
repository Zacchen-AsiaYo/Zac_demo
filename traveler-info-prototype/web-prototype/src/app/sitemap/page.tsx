import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prototype Sitemap · AsiaYo",
  description: "所有 prototype 頁面的導覽入口",
}

// ─── 頁面資料 ────────────────────────────────────────────────────────────────
// 一個 prototype 群組 = 一張表；rows 為該群組底下的各語系 / 各頁面。
// 連結分兩種：
//   • public 靜態 HTML（/zh-tw/…、SEB_v4_*.html）→ 直接由 Next public 目錄 serve
//   • React route（/template/…、/showcase）→ App Router 頁面
// 兩者皆用原生 <a>（靜態 HTML 不走 Next client 導航）。

type Locale = "zh-tw" | "zh-cn" | "en-us" | null

interface Row {
  href: string
  name: string
  locale: Locale
  note: string
}

interface Group {
  title: string
  caption: string
  rows: Row[]
}

const GROUPS: Group[] = [
  {
    title: "SEB v4 PP1.0 — 運動賽事旅遊",
    caption: "運動賽事旅遊的產品介紹頁（Product Page 1.0），本次改版的主力 prototype。",
    rows: [
      { href: "/zh-tw/SEB_v4_PP1_zh_tw.html", name: "SEB v4 PP1.0", locale: "zh-tw", note: "運動旅遊 v4 產品頁，繁體中文版" },
      { href: "/zh-cn/SEB_v4_PP1_zh_cn.html", name: "SEB v4 PP1.0", locale: "zh-cn", note: "运动旅游 v4 产品页，简体中文版" },
      { href: "/en-us/SEB_v4_pp1_en_us.html", name: "SEB v4 PP1.0", locale: "en-us", note: "Sports Travel v4 product page, English" },
    ],
  },
  {
    title: "旅客資料搜集 — Passenger Info",
    caption: "報名流程中填寫旅客／護照／聯絡資料的表單頁（React template）。",
    rows: [
      { href: "/template/passenger-info", name: "旅客資料搜集", locale: "zh-tw", note: "填寫姓名、護照、國碼電話等報名表單" },
      { href: "/template/passenger-info-zh-cn", name: "旅客資料搜集", locale: "zh-cn", note: "同上，简体中文版" },
      { href: "/template/passenger-info-en-us", name: "旅客資料搜集", locale: "en-us", note: "Passenger info form, English" },
    ],
  },
  {
    title: "AsiaYo 首頁 — Locale / Currency Demo",
    caption: "語言與幣別自動偵測 demo 的入口首頁，右下角會顯示偵測結果 badge。",
    rows: [
      { href: "/zh-tw/", name: "AsiaYo 首頁", locale: "zh-tw", note: "語言／幣別偵測 demo，繁中入口" },
      { href: "/zh-cn/", name: "AsiaYo 首頁", locale: "zh-cn", note: "语言／货币侦测 demo，简中入口" },
      { href: "/en-us/", name: "AsiaYo 首頁", locale: "en-us", note: "Locale / currency detection demo, English" },
    ],
  },
  {
    title: "套裝行程 — Package",
    caption: "套裝商品介紹頁（banner、分類 tab、活動、FAQ），React template。",
    rows: [
      { href: "/template/package", name: "套裝行程頁", locale: null, note: "banner／分類 tab／活動 event／FAQ 商品介紹頁" },
    ],
  },
  {
    title: "活動後台 — Activity Admin（Figma Make）",
    caption: "活動編輯與旅客資料搜集設定的後台頁面，JS 驅動的自包含 prototype（Figma Make 匯出）。",
    rows: [
      { href: "/admin/edit-activity-basic-information.html", name: "編輯活動 — 基本資訊", locale: null, note: "Edit Activity - Basic Information，活動基本資料設定頁" },
      { href: "/admin/edit-activity-dynamic-content.html", name: "編輯活動 — 動態內容", locale: null, note: "Edit Activity - Dynamic Content，活動動態內容編輯頁" },
      { href: "/admin/customer-info-collection-setting.html", name: "旅客資料搜集設定", locale: null, note: "Customer Info Collection Setting，設定要向旅客搜集哪些欄位" },
      { href: "/admin/customer-info-setting-for-check-page.html", name: "旅客資料設定 — Check 頁", locale: null, note: "Customer Info Setting for Check Page，確認頁的旅客資料顯示設定" },
    ],
  },
  {
    title: "設計系統元件展示 — Showcase（內部）",
    caption: "UI 元件庫展示頁，標示已對齊／待對齊，供設計師與 RD 檢視，非消費者頁。",
    rows: [
      { href: "/showcase", name: "元件 Showcase", locale: null, note: "AsiaYo design system 元件展示（22 個區塊）" },
    ],
  },
]

const LOCALE_LABEL: Record<Exclude<Locale, null>, string> = {
  "zh-tw": "繁中",
  "zh-cn": "简中",
  "en-us": "EN",
}

function LocaleChip({ locale }: { locale: Locale }) {
  if (!locale) return null
  return (
    <span className="inline-flex items-center rounded bg-primary-1 px-1.5 py-0.5 text-xs font-medium text-primary-8">
      {LOCALE_LABEL[locale]}
    </span>
  )
}

// 外部連結箭頭（開新分頁）
function ExternalArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 opacity-60"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export default function Page() {
  const total = GROUPS.reduce((n, g) => n + g.rows.length, 0)

  return (
    <main className="min-h-screen bg-neutral-2 py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-neutral-10">Prototype Sitemap</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-7">
            所有 prototype 頁面的導覽入口，共 {total} 個頁面。點擊連結即可在新分頁開啟對應的 prototype。
          </p>
        </header>

        {/* ── Groups ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="text-base font-semibold text-neutral-9">{group.title}</h2>
              <p className="mt-1 mb-3 text-sm leading-6 text-neutral-7">{group.caption}</p>

              <div className="overflow-x-auto rounded-lg border border-neutral-4 bg-white">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-neutral-4 bg-neutral-2 text-xs font-medium text-neutral-7">
                      <th className="px-4 py-2.5 font-medium">連結</th>
                      <th className="px-4 py-2.5 font-medium">頁面名稱</th>
                      <th className="px-4 py-2.5 font-medium">頁面說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr
                        key={row.href}
                        className="border-b border-neutral-3 last:border-0 align-top hover:bg-neutral-2"
                      >
                        <td className="px-4 py-3">
                          <a
                            href={row.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 font-mono text-sm text-primary-7 hover:text-primary-8 hover:underline"
                          >
                            <span className="break-all">{row.href}</span>
                            <ExternalArrow />
                          </a>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-9">
                            <LocaleChip locale={row.locale} />
                            {row.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm leading-6 text-neutral-7">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* ── Footer note ────────────────────────────────────────── */}
        <p className="mt-10 text-xs leading-5 text-neutral-6">
          備註：public 目錄下的備份／退役檔案（如 <code>*.bak.html</code>、<code>*_retired.html</code>、
          <code>zh_cn_loding.html</code> 等）未列入本表。
        </p>
      </div>
    </main>
  )
}
