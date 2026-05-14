"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"
import { FilterPill } from "@/components/ui/tag"
import { cn } from "@/lib/utils"
import { TAB_CONFIG, type Event, type Section } from "./data"

// ─── Material Symbols loader ──────────────────────────────────────────────────
// HTML 版也依賴 Material Symbols 作為 icon 來源，這裡動態載入保持一致
function useMaterialSymbols() {
  useEffect(() => {
    if (document.getElementById("material-symbols-link")) return
    const link = document.createElement("link")
    link.id = "material-symbols-link"
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,200..700,0..1,-50..200&display=swap"
    document.head.appendChild(link)
  }, [])
}

// MatIcon — 用 Material Symbols 渲染（AsiaYo iconfont 不存在的 icon 改用這個）
// AsiaYo LINE iconfont 只有 96 個 icon，不足的部分靠 Material Symbols 補齊
function MatIcon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  return (
    <span
      className={cn("material-symbols-outlined leading-none select-none", className)}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  )
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Banner {
  bg: string
  href?: string | null
  title?: string
  subtitle?: string
}

interface MainTab {
  key: string
  label: string
  icon: string
}

interface FaqItem {
  cat: string
  q: string
  a: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

// Material Symbols names（與 HTML 一致）
const MAIN_TABS: MainTab[] = [
  { key: "hot",      label: "熱銷中賽事",  icon: "local_fire_department" },
  { key: "jp_mar",   label: "日本馬拉松",  icon: "directions_run" },
  { key: "intl_mar", label: "國際馬拉松",  icon: "public" },
  { key: "hiking",   label: "登山",        icon: "landscape" },
  { key: "intl_cyc", label: "國際單車",    icon: "directions_bike" },
  { key: "tw_mar",   label: "台灣馬拉松",  icon: "flag" },
  { key: "golf",     label: "高爾夫旅遊",  icon: "sports_golf" },
  { key: "baseball", label: "棒球賽事",    icon: "sports_baseball" },
]

const CHIP_LABELS: Record<string, string> = {
  all: "全部", hot: "熱銷", beginner: "新手友善", challenge: "挑戰極限",
  pb: "追求 PB", spring: "春季", summer: "夏季", autumn: "秋季", winter: "冬季",
  marathon: "全馬", half: "半馬", jp: "日本", intl: "國際",
}

const chipLabel = (k: string) => CHIP_LABELS[k] ?? k

const BANNERS: Banner[] = [
  {
    bg: "https://gsimg.asiayo.com/ay-image-upload/1767858153850_2026_河口湖湖上祭及登山行程_Resize_PP2.0_1920x600.jpg",
    href: "https://asiayo.com/zh-tw/activity/119370/",
  },
  {
    bg: "https://gsimg.asiayo.com/ay-image-upload/1700407452134_高爾夫-1.png",
    href: "https://asiayo.com/zh-tw/journey/golf-thailand-a/",
    title: "AsiaYo 高爾夫旅遊",
    subtitle: "精選東南亞頂級球場，結合旅遊與競技的完美假期",
  },
  {
    bg: "https://gsimg.asiayo.com/ay-image-upload/1696326984232_seb-general1.png",
    title: "全球運動旅遊首選",
    subtitle: "馬拉松、單車、登山、滑雪，AsiaYo 帶你挑戰世界",
  },
]

const FAQ_CATS = [
  { key: "signup",  label: "報名與資格" },
  { key: "refund",  label: "退改規則" },
  { key: "travel",  label: "行程與住宿" },
  { key: "service", label: "客服與領隊" },
]

const FAQ_ITEMS: FaqItem[] = [
  { cat: "signup",  q: "報名流程是什麼？需要準備什麼資料？", a: "選定賽事後，於頁面填寫個人資料（中英文姓名、護照號碼、預估完賽時間），並完成付款，AsiaYo 會於 3 個工作天內確認名額並寄出報名確認信。" },
  { cat: "signup",  q: "名額是否有限？如何確認我已成功報名？", a: "各賽事名額有限，付款完成後即確認報名。系統將寄出確認信至您的電子郵件，並可在「我的訂單」查詢狀態。" },
  { cat: "refund",  q: "可以退費嗎？退改規則是什麼？", a: "報名 30 天前取消可退 80%，14 天前可退 50%，14 天內恕無法退費。詳情請參閱各賽事頁面的取消政策。" },
  { cat: "travel",  q: "住宿包含哪些？可以升級嗎？", a: "套裝行程的住宿皆為與賽事合作的官方推薦飯店，可加價升級至五星酒店或單人房，請聯繫客服諮詢。" },
  { cat: "service", q: "有中文領隊或客服嗎？", a: "所有國際賽事皆配有中文領隊全程隨行，從 EXPO 領物到完賽接駁全程服務，不用擔心語言問題。" },
]

// ─── SiteHeader ──────────────────────────────────────────────────────────────

function SiteHeader() {
  const navItems = ["郵輪", "跟團旅遊", "住宿", "景點行程", "台灣高鐵", "運動旅遊"]
  return (
    <header className="bg-white border-b border-neutral-4 sticky top-0 z-[1020]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-[120px] flex items-center gap-8 h-[56px]">
        {/* Logo placeholder */}
        <span className="text-primary-6 font-bold text-xl tracking-tight shrink-0">AsiaYo</span>

        {/* Nav */}
        <nav className="hidden lg:flex gap-7">
          {navItems.map(label => (
            <button key={label} className="text-sm font-medium text-neutral-8 hover:text-primary-6 transition-colors bg-transparent border-none cursor-pointer">
              {label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Right actions */}
        <div className="hidden sm:flex items-center gap-5 text-sm text-neutral-8">
          <button className="flex items-center gap-1 hover:text-primary-6 transition-colors bg-transparent border-none cursor-pointer">
            <Icon name="mobile" type="line" size={18} />
            下載 App
          </button>
          <button className="flex items-center gap-1 hover:text-primary-6 transition-colors bg-transparent border-none cursor-pointer">
            TWD
            <Icon name="chevron-down" type="line" size={16} />
          </button>
          <button className="flex items-center gap-1.5 hover:text-primary-6 transition-colors bg-transparent border-none cursor-pointer">
            <img src="https://hatscripts.github.io/circle-flags/flags/tw.svg" alt="" width={24} height={24} className="size-6 shrink-0 rounded-full" />
            繁體中文（台灣）
            <Icon name="chevron-down" type="line" size={16} />
          </button>
        </div>
        <Button variant="neutral" appearance="flat" size="sm">登入</Button>
        <Button variant="primary" appearance="outline" size="sm">註冊</Button>
      </div>
    </header>
  )
}

// ─── Banner ───────────────────────────────────────────────────────────────────

function BannerSection() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setIdx(i => (i + 1) % BANNERS.length), 5500)
    return () => clearTimeout(t)
  }, [idx, paused])

  const go = (n: number) => setIdx((n + BANNERS.length) % BANNERS.length)

  return (
    <section
      className="bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full overflow-hidden h-[200px] sm:h-[260px] lg:h-[320px]">
        {BANNERS.map((b, i) => {
          const Wrap = b.href ? "a" : "div"
          const wrapProps = b.href ? { href: b.href, target: "_blank", rel: "noopener" } : {}
          return (
            <Wrap
              key={i}
              {...(wrapProps as Record<string, string>)}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${b.bg})`,
                opacity: i === idx ? 1 : 0,
                transition: "opacity 600ms ease",
                pointerEvents: i === idx ? "auto" : "none",
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,33,56,0.78)] via-[rgba(0,33,56,0.45)] to-[rgba(0,33,56,0.05)]" />
              {/* Text */}
              {b.title && (
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-[120px] text-white">
                  <div className="max-w-[560px]">
                    <h2 className="text-2xl sm:text-4xl font-bold leading-tight mb-3 [text-shadow:0_2px_8px_rgba(0,0,0,0.2)]">
                      {b.title}
                    </h2>
                    {b.subtitle && (
                      <p className="text-sm sm:text-lg opacity-95 max-w-[480px]">{b.subtitle}</p>
                    )}
                  </div>
                </div>
              )}
            </Wrap>
          )
        })}

        {/* Arrows */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <IconButton variant="neutral" appearance="flat" shape="rounded" size="md" aria-label="上一張" onClick={() => go(idx - 1)}>
            <Icon name="chevron-left" type="line" />
          </IconButton>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <IconButton variant="neutral" appearance="flat" shape="rounded" size="md" aria-label="下一張" onClick={() => go(idx + 1)}>
            <Icon name="chevron-right" type="line" />
          </IconButton>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNERS.map((_, i) => (
            <span
              key={i}
              onClick={() => go(i)}
              className="h-2 rounded-full cursor-pointer transition-all"
              style={{
                width: i === idx ? 28 : 8,
                background: i === idx ? "#fff" : "rgba(255,255,255,.5)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Heading + TrustStats ─────────────────────────────────────────────────────

// TrustStats — 藍底卡片（與 HTML 一致：3 欄, primary-6 背景）
function TrustStats() {
  const stats = [
    { num: "50+",     label: "亞洲熱門賽事", icon: "event_available" },
    { num: "12,000+", label: "跑者已參賽",   icon: "groups" },
    { num: "24/7",    label: "中文客服",     icon: "support_agent" },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 bg-primary-6 rounded-xl overflow-hidden mt-6">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            "flex items-center gap-3.5 px-7 py-5",
            i < stats.length - 1 && "sm:border-r border-white/20"
          )}
        >
          {/* Icon circle */}
          <div className="size-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
          </div>
          <div>
            <div className="text-4xl font-bold text-white leading-[1.1] tracking-tight">{s.num}</div>
            <div className="text-[17px] text-white/95 mt-1.5 font-medium">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SebHeading() {
  return (
    // ⚠️ HTML 版的 TrustStats 放在 WhyAsiaYo，不在這裡
    <section className="bg-white px-4 sm:px-8 lg:px-[120px] pt-10 pb-6">
      <h2 className="text-[28px] font-bold tracking-tight text-neutral-9 leading-[1.3] m-0">
        全球運動賽事｜<span>報名＋住宿一站搞定</span>
      </h2>
      <p className="text-base text-neutral-8 mt-3.5 leading-[1.65] m-0">
        AsiaYo 提供全球 50+ 運動賽事報名與旅遊規劃，包含馬拉松、單車、登山、高爾夫、鐵人三項等，官方授權名額、中文客服、住宿接駁一次搞定。
      </p>
    </section>
  )
}

// ─── FilterBar ────────────────────────────────────────────────────────────────

function FilterBar({
  mainTab,
  setMainTab,
  activeSection,
  sections,
  secondTabs,
  onSectionClick,
}: {
  mainTab: string
  setMainTab: (k: string) => void
  activeSection: string | null
  sections: Section[]
  secondTabs: string[]
  onSectionClick: (id: string) => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const secondScrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollL, setCanScrollL] = useState(false)
  const [canScrollR, setCanScrollR] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollL(el.scrollLeft > 4)
    setCanScrollR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener("scroll", updateArrows, { passive: true })
    window.addEventListener("resize", updateArrows)
    return () => { el.removeEventListener("scroll", updateArrows); window.removeEventListener("resize", updateArrows) }
  }, [updateArrows])

  // Auto-scroll active second tab into view
  useEffect(() => {
    if (!activeSection || !secondScrollerRef.current) return
    const tabEl = secondScrollerRef.current.querySelector(`[data-stab="${activeSection}"]`) as HTMLElement | null
    if (!tabEl) return
    const scroller = secondScrollerRef.current
    const offset = tabEl.getBoundingClientRect().left - scroller.getBoundingClientRect().left
      - scroller.clientWidth / 2 + tabEl.clientWidth / 2
    scroller.scrollBy({ left: offset, behavior: "smooth" })
  }, [activeSection])

  const scrollMain = (dir: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.7), behavior: "smooth" })
  }

  return (
    <>
      {/* ── Tier 1: 卡片式 mainTab（與 HTML 一致：icon 上 + 文字下，選中藍底）── */}
      <section className="bg-neutral-2 border-b border-neutral-4 py-4">
        <div className="relative mx-4 sm:mx-8 lg:mx-[120px]">
          {/* 左捲動箭頭 */}
          <div className={cn("absolute -left-4 top-1/2 -translate-y-1/2 z-10 transition-opacity", canScrollL ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <IconButton variant="neutral" appearance="outline" shape="rounded" size="sm" aria-label="向左" onClick={() => scrollMain(-1)}>
              <Icon name="chevron-left" type="line" />
            </IconButton>
          </div>

          {/* 卡片列 */}
          <div
            ref={scrollerRef}
            className="flex gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {MAIN_TABS.map(tab => {
              const active = tab.key === mainTab
              return (
                <button
                  key={tab.key}
                  onClick={() => setMainTab(tab.key)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5",
                    "px-5 py-3.5 rounded-lg border cursor-pointer transition-all shrink-0 min-w-[130px]",
                    "font-[inherit]",
                    active
                      ? "bg-primary-6 border-primary-6 text-white shadow-[0_4px_12px_rgba(30,159,210,0.28)]"
                      : "bg-white border-neutral-4 text-neutral-9 shadow-sm hover:text-primary-6"
                  )}
                >
                  {/* Material Symbols icon — 30px，與 HTML 一致 */}
                  <span
                    className="material-symbols-outlined text-[30px] leading-none"
                    style={{ color: active ? "#fff" : "#1e9fd2" }}
                  >
                    {tab.icon}
                  </span>
                  <span className={cn("text-[15px] whitespace-nowrap", active ? "font-bold" : "font-medium")}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* 右捲動箭頭 */}
          <div className={cn("absolute -right-4 top-1/2 -translate-y-1/2 z-10 transition-opacity", canScrollR ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <IconButton variant="neutral" appearance="outline" shape="rounded" size="sm" aria-label="向右" onClick={() => scrollMain(1)}>
              <Icon name="chevron-right" type="line" />
            </IconButton>
          </div>
        </div>
      </section>

      {/* ── Tier 2: 下劃線錨點導覽（sticky）── */}
      {secondTabs.length > 0 && sections.length > 0 && (
        <div className="sticky top-[56px] z-[1010] bg-white border-b border-neutral-4 shadow-sm">
          <div
            ref={secondScrollerRef}
            className="flex gap-0 px-4 sm:px-8 lg:px-[120px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sections.map(s => {
              const active = s.id === activeSection
              return (
                <button
                  key={s.id}
                  data-stab={s.id}
                  onClick={() => onSectionClick(s.id)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer bg-transparent whitespace-nowrap",
                    active
                      ? "border-primary-6 text-primary-6 font-semibold"
                      : "border-transparent text-neutral-7 hover:text-primary-6"
                  )}
                >
                  {s.title}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

// ─── EventCard ───────────────────────────────────────────────────────────────

function EventCard({ e }: { e: Event }) {
  return (
    <a
      href={e.url ?? "#"}
      target="_blank"
      rel="noopener"
      className={cn(
        "group flex flex-col bg-white rounded-lg border border-neutral-4 overflow-hidden cursor-pointer no-underline",
        "hover:shadow-[0_8px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200",
        e.soldOut && "opacity-60 saturate-50"
      )}
    >
      {/* Image */}
      <div
        className="relative h-[200px] bg-cover bg-center"
        style={{ backgroundImage: `url(${e.img}), linear-gradient(135deg, #055885, #43b7de)` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.35)]" />

        {/* Location chip */}
        {e.location && !e.soldOut && (
          <div className="absolute top-3 left-3 bg-primary-8 text-white text-sm font-semibold px-2.5 py-1 rounded-[3px] border border-primary-8 shadow-sm">
            {e.location}
          </div>
        )}

        {/* Badge */}
        {e.badge && !e.soldOut && (
          <div className="absolute top-3 right-3 bg-danger-6 text-white text-xs font-bold px-2.5 py-1.5 rounded-[4px] flex items-center gap-1">
            <MatIcon name="local_fire_department" size={14} />
            {e.badge}
          </div>
        )}

        {/* Sold out overlay */}
        {e.soldOut && (
          <div className="absolute inset-0 bg-neutral-9/55 flex items-center justify-center">
            <div className="px-7 py-2 bg-white rounded text-neutral-9 text-lg font-bold tracking-wider rotate-[-4deg] shadow-lg">
              SOLD OUT 完售
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-[18px] flex flex-col gap-2.5 flex-1">
        {/* Chips */}
        {e.chips.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {e.chips.slice(0, 2).map(c => (
              <span key={c} className="text-sm px-2 py-0.5 bg-primary-1 text-primary-8 rounded-[3px] border border-primary-2 font-medium">
                {chipLabel(c)}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-neutral-9 leading-[1.4] m-0">{e.title}</h3>

        {/* Headline */}
        {e.headline && (
          <div className="text-sm text-neutral-8 leading-[1.55]">
            {e.headline.split(" · ").map((line, i) => (
              <div key={i}>{line.replace(/^★/, "★ ")}</div>
            ))}
          </div>
        )}

        {/* Info block */}
        <div className="mt-1.5 bg-neutral-2 rounded p-3 flex flex-col gap-2">
          {e.distance && (
            <div className="flex items-center gap-1.5 text-sm text-neutral-8">
              <MatIcon name="straighten" size={20} />
              {e.distance}
            </div>
          )}
          {e.includes && (
            <div className="flex items-start gap-1.5 text-sm text-neutral-8 leading-[1.55]">
              <Icon name="check-circle" type="line" size={18} className="text-success-6 mt-0.5 shrink-0" />
              <span>{e.includes}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-sm text-neutral-8">
            <Icon name="tag" type="line" size={20} className="text-danger-6" />
            {e.soldOut ? (
              <span className="text-neutral-7 font-medium">已完售</span>
            ) : e.price ? (
              <span className="flex items-baseline gap-1">
                <span>每人最低</span>
                <span className="text-danger-6 font-semibold">NT$</span>
                <span className="text-danger-6 font-bold tracking-tight">{e.price.toLocaleString()}</span>
              </span>
            ) : e.priceText ? (
              <span className="text-danger-6 font-semibold">{e.priceText}</span>
            ) : (
              <span>價格洽詢</span>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

// ─── SectionGrid ─────────────────────────────────────────────────────────────

function SectionGrid({ section }: { section: Section }) {
  const [activeChip, setActiveChip] = useState(section.chips[0] ?? "all")
  const [showMore, setShowMore] = useState(false)

  const filtered = activeChip === "all"
    ? section.events
    : section.events.filter(e => e.chips.includes(activeChip))

  const PAGE = 8
  const visible = showMore ? filtered : filtered.slice(0, PAGE)
  const hasMore = filtered.length > PAGE && !showMore

  return (
    <section
      id={section.id}
      data-section-id={section.id}
      className="px-4 sm:px-8 lg:px-[120px] py-10 bg-white"
    >
      {/* Section heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="h3-tw text-2xl m-0 tracking-tight">{section.title}</h2>
        </div>
        {section.viewAllUrl && (
          <a href={section.viewAllUrl} className="text-sm text-primary-6 font-medium hover:underline flex items-center gap-1 no-underline">
            看全部
            <Icon name="chevron-right" type="line" size={16} />
          </a>
        )}
      </div>

      {/* Chip filter — 使用 FilterPill 元件 */}
      {section.chips.length > 1 && (
        <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
          {section.chips.map(chip => (
            <FilterPill
              key={chip}
              label={chipLabel(chip)}
              active={chip === activeChip}
              onClick={() => { setActiveChip(chip); setShowMore(false) }}
            />
          ))}
        </div>
      )}

      {/* Cards grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map(e => <EventCard key={e.id} e={e} />)}
        </div>
      ) : (
        <div className="py-16 text-center text-neutral-7">此篩選條件下暫無賽事</div>
      )}

      {/* Show more */}
      {hasMore && (
        <div className="mt-8 text-center">
          <Button variant="neutral" appearance="outline" size="md" onClick={() => setShowMore(true)}>
            顯示更多（{filtered.length - PAGE} 場）
          </Button>
        </div>
      )}
    </section>
  )
}

// ─── WhyAsiaYo ───────────────────────────────────────────────────────────────

function WhyAsiaYo() {
  // icon 使用 Material Symbols 名稱（AsiaYo iconfont 無這些圖示）
  const items = [
    { icon: "verified_user",  title: "官方授權",    desc: "所有賽事皆與主辦單位官方合作，名額真實有效，杜絕黃牛。" },
    { icon: "confirmation_number", title: "獨家保障名額", desc: "六大馬等抽籤型賽事，AsiaYo 保留獨家配額，免抽籤直接報名。" },
    { icon: "support_agent", title: "中文領隊客服", desc: "海外賽事中文領隊全程隨行，從 EXPO 領物到完賽接駁無語言障礙。" },
    { icon: "view_carousel",  title: "多元賽事選擇", desc: "從新手友善到一生必跑，馬拉松、單車、登山、滑雪一站搞定。" },
  ]

  return (
    <section className="bg-neutral-2 px-4 sm:px-8 lg:px-[120px] py-16">
      <div className="text-center mb-8">
        <h2 className="h2-tw text-2xl sm:text-[32px] m-0">為什麼選 AsiaYo 運動旅遊</h2>
        <p className="p2-tw mt-2 text-neutral-7">把報名與旅程整合在一起，讓你只需要專注比賽</p>
      </div>

      {/* TrustStats 在 HTML 也放在這裡（WhyAsiaYo 的 embedded 版本） */}
      <div className="mb-8"><TrustStats /></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(it => (
          <div key={it.title} className="bg-white rounded-lg p-6 border border-neutral-4">
            <div className="size-12 rounded-lg bg-primary-1 flex items-center justify-center text-primary-6 mb-4">
              <MatIcon name={it.icon} size={26} />
            </div>
            <h3 className="text-[19px] font-bold text-neutral-9 mb-2.5">{it.title}</h3>
            <p className="text-[15px] text-neutral-8 leading-[1.65] m-0">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={cn("rounded-[4px] transition-colors", open ? "bg-primary-1" : "bg-neutral-2 hover:bg-neutral-3")}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-transparent border-none cursor-pointer text-left"
      >
        <span className={cn("text-[17px] leading-[1.5] text-neutral-9", open ? "font-bold" : "font-medium")}>
          {q}
        </span>
        <Icon
          name="chevron-down"
          type="line"
          size={24}
          className={cn("text-neutral-9 shrink-0 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-[15px] text-neutral-8 leading-[1.75]">{a}</div>
      )}
    </div>
  )
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0)
  const [cat, setCat] = useState(FAQ_CATS[0].key)
  const filtered = FAQ_ITEMS.filter(f => f.cat === cat)

  return (
    <section className="bg-white px-4 sm:px-8 lg:px-[120px] py-16">
      <h2 className="text-[28px] font-bold text-neutral-9 m-0 tracking-tight">
        AsiaYo 全球運動賽事常見問題
      </h2>

      {/* Category tabs */}
      <div className="flex gap-0 border-b border-neutral-4 mt-7 mb-7 overflow-x-auto">
        {FAQ_CATS.map(c => {
          const active = c.key === cat
          return (
            <button
              key={c.key}
              onClick={() => { setCat(c.key); setOpenIdx(0) }}
              className={cn(
                "px-5 py-3 bg-transparent border-none border-b-2 -mb-px text-[15px] cursor-pointer transition-colors font-medium whitespace-nowrap",
                active
                  ? "border-primary-6 text-neutral-9 font-bold"
                  : "border-transparent text-neutral-8 hover:text-neutral-9"
              )}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        {filtered.map((f, i) => (
          <FaqItem
            key={`${cat}-${i}`}
            q={f.q}
            a={f.a}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}

// ─── ContactSection ───────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section className="bg-gradient-to-r from-primary-8 to-primary-6 px-4 sm:px-8 lg:px-[120px] py-12 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl sm:text-[26px] font-bold m-0">還有疑問？運動旅遊專員為你服務</h3>
          <p className="text-[15px] m-0 mt-2 opacity-95">09:00–22:00 中文服務 · 國際賽事預訂諮詢 · 客製化團體行程</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="success" appearance="solid" size="md">
            <MatIcon name="chat" size={18} />
            LINE 諮詢 @asiayo
          </Button>
          <Button variant="neutral" appearance="outline" size="md" className="border-white text-white hover:bg-white/10">
            <Icon name="phone" type="solid" size={18} />
            02 7741-2567
          </Button>
        </div>
      </div>
    </section>
  )
}

// ─── SiteFooter ───────────────────────────────────────────────────────────────

function SiteFooter() {
  const cols = [
    { t: "關於我們", items: ["公司簡介", "加入我們", "部落格", "新聞中心"] },
    { t: "服務",     items: ["訂單查詢", "常見問題", "取消政策", "聯絡客服"] },
    { t: "運動旅遊", items: ["馬拉松行程", "單車環島", "滑雪假期", "高爾夫旅遊"] },
  ]

  return (
    <footer className="bg-neutral-9 text-neutral-6 px-4 sm:px-8 lg:px-[120px] pt-10 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
        <div>
          <span className="text-white font-bold text-xl tracking-tight">AsiaYo</span>
          <p className="text-[13px] leading-[1.7] mt-4">透明價格，無隱藏費用<br />玩美家股份有限公司</p>
          <div className="mt-4 flex gap-2.5">
            {["f", "📷", "▶"].map((icon, i) => (
              <span
                key={i}
                className="size-9 rounded-full bg-neutral-7 flex items-center justify-center text-white text-sm cursor-pointer hover:bg-neutral-6 transition-colors"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
        {cols.map(c => (
          <div key={c.t}>
            <div className="text-white font-bold text-sm mb-3">{c.t}</div>
            {c.items.map(item => (
              <div key={item} className="py-1 text-[13px] cursor-pointer hover:text-white transition-colors">{item}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-5 border-t border-neutral-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-neutral-7">
        <div>© 2026 AsiaYo.com · All rights reserved.</div>
        <div className="flex gap-5">
          {["隱私權政策", "服務條款", "Cookie 設定"].map(t => (
            <span key={t} className="cursor-pointer hover:text-neutral-6 transition-colors">{t}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── BackToTop ────────────────────────────────────────────────────────────────

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed right-6 bottom-8 z-[100] transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <IconButton
        variant="neutral"
        appearance="solid"
        shape="rounded"
        size="md"
        aria-label="回到頂端"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon name="chevron-up" type="line" />
      </IconButton>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PackagePage() {
  useMaterialSymbols()
  const [mainTab, setMainTab] = useState(MAIN_TABS[0].key)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const suppressSpyRef = useRef(0)

  const tabConfig = TAB_CONFIG[mainTab]
  const sections = tabConfig?.sections ?? []

  useEffect(() => {
    setActiveSection(sections[0]?.id ?? null)
  }, [mainTab])

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < suppressSpyRef.current) return
      const scrollLine = 170
      const els = document.querySelectorAll("[data-section-id]")
      let best: string | null = null
      let bestDist = Infinity
      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top - scrollLine)
        if (rect.bottom > scrollLine && dist < bestDist) {
          bestDist = dist
          best = (el as HTMLElement).dataset.sectionId ?? null
        }
      })
      if (best && best !== activeSection) setActiveSection(best)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [activeSection, mainTab])

  const handleSectionClick = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    setActiveSection(sectionId)
    suppressSpyRef.current = Date.now() + 700
    const top = el.getBoundingClientRect().top + window.scrollY - 170
    window.scrollTo({ top, behavior: "smooth" })
  }, [])

  return (
    <div>
      <SiteHeader />
      <BannerSection />
      <SebHeading />

      <FilterBar
        mainTab={mainTab}
        setMainTab={k => { setMainTab(k); setActiveSection(null) }}
        activeSection={activeSection}
        sections={sections}
        secondTabs={tabConfig?.secondTabs ?? []}
        onSectionClick={handleSectionClick}
      />

      {sections.length > 0 ? (
        <div className="bg-white divide-y divide-neutral-4">
          {sections.map(s => (
            <SectionGrid key={`${mainTab}-${s.id}`} section={s} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-neutral-7 bg-white">
          此分類下暫無賽事，敬請期待
        </div>
      )}

      <WhyAsiaYo />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
      <BackToTop />
    </div>
  )
}
