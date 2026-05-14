"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioButton, RadioGroup } from "@/components/ui/radio-button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// ─── Label (對齊線上：16px / neutral-10 #000) ───────────────────────────────
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("mb-1.5 block text-base font-normal leading-6 text-neutral-10", className)}>
      {children}
    </span>
  )
}

// ─── Select wrapper (wp 目前沒有 Select 元件，用原生 + design token) ──────────
function Select({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { className?: string }) {
  return (
    <select
      className={cn(
        "h-10 rounded-[4px] bg-white px-2 pr-8 text-sm leading-5 text-neutral-8 outline-none",
        "ring-1 ring-neutral-7 focus:ring-2 focus:ring-primary-6",
        "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238c8c8c%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center]",
        "disabled:bg-neutral-4 disabled:text-neutral-7 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

const tone7 = "text-neutral-7"
const tone8 = "text-neutral-8"

// ─── 国码数据 ───────────────────────────────────────────────────────────────
const countries = [
  { code: "+886", abbr: "TW", flag: "🇹🇼" },
  { code: "+852", abbr: "HK", flag: "🇭🇰" },
  { code: "+81", abbr: "JP", flag: "🇯🇵" },
  { code: "+82", abbr: "KR", flag: "🇰🇷" },
  { code: "+1", abbr: "US", flag: "🇺🇸" },
  { code: "+60", abbr: "MY", flag: "🇲🇾" },
  { code: "+66", abbr: "TH", flag: "🇹🇭" },
  { code: "+84", abbr: "VN", flag: "🇻🇳" },
  { code: "+65", abbr: "SG", flag: "🇸🇬" },
  { code: "+63", abbr: "PH", flag: "🇵🇭" },
  { code: "+62", abbr: "ID", flag: "🇮🇩" },
  { code: "+86", abbr: "CN", flag: "🇨🇳" },
  { code: "+853", abbr: "MO", flag: "🇲🇴" },
  { code: "+1", abbr: "CA", flag: "🇨🇦" },
  { code: "+61", abbr: "AU", flag: "🇦🇺" },
  { code: "+91", abbr: "IN", flag: "🇮🇳" },
  { code: "+52", abbr: "MX", flag: "🇲🇽" },
  { code: "+55", abbr: "BR", flag: "🇧🇷" },
]

// ─── PhoneInput (含国码下拉) ─────────────────────────────────────────────────
function PhoneInput({ placeholder = "912 345 678" }: { placeholder?: string }) {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState(countries[0])

  return (
    <div className="relative">
      <div className="flex h-10 items-center rounded-[4px] bg-white ring-1 ring-neutral-7 focus-within:ring-2 focus-within:ring-primary-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-full shrink-0 items-center gap-1.5 border-r border-neutral-4 pl-2 pr-1.5 text-sm text-neutral-8"
        >
          <span className="text-lg leading-none">{country.flag}</span>
          <span>{country.code}</span>
          <Icon name="chevron-down" type="line" size={12} />
        </button>
        <input
          type="tel"
          placeholder={placeholder}
          className="h-full flex-1 bg-transparent px-2 text-sm text-neutral-8 placeholder:text-neutral-7 outline-none"
        />
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div
            className="absolute left-0 top-[calc(100%+4px)] z-20 max-h-80 w-44 overflow-y-auto rounded-xl bg-neutral-10/90 py-1 shadow-xl backdrop-blur-sm"
            role="listbox"
          >
            {countries.map((c) => {
              const selected = c.abbr === country.abbr
              return (
                <button
                  key={c.abbr}
                  type="button"
                  onClick={() => { setCountry(c); setOpen(false) }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-white hover:bg-white/10"
                  role="option"
                  aria-selected={selected}
                >
                  <span className="w-4 shrink-0 text-center text-sm">
                    {selected ? "✓" : ""}
                  </span>
                  <span>{c.code} {c.abbr}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ─── SavedTravelerSelect (点 disabled 样式可切换到启用 + 开选单) ─────────────
function SavedTravelerSelect({
  emptyText,
  placeholder,
  options,
}: {
  emptyText: string
  placeholder: string
  options: string[]
}) {
  const [enabled, setEnabled] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const handleClick = () => {
    if (!enabled) {
      setEnabled(true)
      setOpen(true)
    } else {
      setOpen((v) => !v)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-[4px] pl-2 pr-3 text-left text-sm leading-5 outline-none ring-1 transition-colors",
          enabled
            ? cn("bg-white ring-neutral-7", selected ? "text-neutral-8" : "text-neutral-7")
            : "bg-neutral-4 text-neutral-7 ring-neutral-6"
        )}
      >
        <span className="truncate">{!enabled ? emptyText : (selected ?? placeholder)}</span>
        <Icon name={open ? "chevron-up" : "chevron-down"} type="line" size={12} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute left-0 top-[calc(100%+4px)] z-20 w-full rounded-xl bg-neutral-10/70 py-1 shadow-xl backdrop-blur-sm">
            {options.map((opt) => {
              const isSel = opt === selected
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { setSelected(opt); setOpen(false) }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-white hover:bg-white/10"
                >
                  <span className="w-4 shrink-0 text-center text-sm">{isSel ? "✓" : ""}</span>
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ─── 年月日下拉 ─────────────────────────────────────────────────────────────
function YMDSelect() {
  const years = Array.from({ length: 97 }, (_, i) => 1950 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  return (
    <div className="grid grid-cols-3 gap-3">
      <Select defaultValue="">
        <option value="" disabled>年</option>
        {years.map((y) => <option key={y} value={y}>{y}</option>)}
      </Select>
      <Select defaultValue="">
        <option value="" disabled>月</option>
        {months.map((m) => <option key={m} value={m}>{m}</option>)}
      </Select>
      <Select defaultValue="">
        <option value="" disabled>日</option>
        {days.map((d) => <option key={d} value={d}>{d}</option>)}
      </Select>
    </div>
  )
}

// ─── PrototypeButton (?) — 切换国籍 ────────────────────────────────────────
type Nationality = "tw" | "cn" | "sg"
const NATIONALITY_LABELS: Record<Nationality, string> = {
  tw: "台湾",
  cn: "中国",
  sg: "新加坡",
}

function PrototypeButton({
  nationality,
  onChange,
}: {
  nationality: Nationality
  onChange: (n: Nationality) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative inline-flex size-7 items-center justify-center rounded-full border border-neutral-6 text-sm font-medium text-neutral-7 hover:border-primary-6 hover:text-primary-6"
        aria-label="Prototype 设定"
      >
        ?
        <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-neutral-10/90 px-2 py-1 text-xs text-white group-hover:block">
          这是 prototype
        </span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-36 overflow-hidden rounded-lg border border-neutral-4 bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            {(["tw", "cn", "sg"] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => { onChange(n); setOpen(false) }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-base text-neutral-9 hover:bg-neutral-3"
              >
                <span className="w-4 shrink-0 text-center text-sm">{nationality === n ? "✓" : ""}</span>
                <span>{NATIONALITY_LABELS[n]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function PassengerInfoZhCnPage() {
  const [raceGroup, setRaceGroup] = useState("")
  const [shirtSize, setShirtSize] = useState("none")
  const [dietHabit, setDietHabit] = useState("none")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [nationality, setNationality] = useState<Nationality>("cn")
  useEffect(() => {
    const saved = localStorage.getItem("prototype-nationality")
    if (saved === "tw" || saved === "cn" || saved === "sg") setNationality(saved)
    const m = document.cookie.match(/(?:^|;)\s*asiayo_logged_in=([^;]+)/)
    setIsLoggedIn(m ? decodeURIComponent(m[1]) === "true" : false)
  }, [])
  const handleNationalityChange = (n: Nationality) => {
    setNationality(n)
    localStorage.setItem("prototype-nationality", n)
  }
  const writeCookie = (name: string, value: string) => {
    const d = new Date(); d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`
  }
  const expireCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }
  const handleLogin = () => {
    writeCookie("asiayo_logged_in", "true")
    writeCookie("asiayo_member_country", "TW")
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    expireCookie("asiayo_logged_in")
    expireCookie("asiayo_member_country")
    expireCookie("asiayo_currency")
    setIsLoggedIn(false)
  }
  const isTw = nationality === "tw"

  return (
    <div className="min-h-screen bg-neutral-3 font-[family-name:var(--font-noto-sans-tc)] flex flex-col">
      <Script src="/locale-detect.js" strategy="afterInteractive" />
      {/* ── Site Header ─────────────────────────────────────────── */}
      <header className="border-b border-neutral-4 bg-white">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
          <a href="/" className="shrink-0" aria-label="AsiaYo">
            <img
              src="https://img.asiayo.com/static/images/main_logo_v3.svg"
              alt="AsiaYo"
              width={69}
              height={32}
              className="h-18 w-auto"
            />
          </a>
          <nav className="flex items-center gap-6 text-base text-neutral-9">
            <PrototypeButton nationality={nationality} onChange={handleNationalityChange} />
            {/* 语言切换 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 hover:text-primary-6"
              >
                <span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-[22px] leading-none">🇨🇳</span>
                简体中文
                <Icon name={langOpen ? "chevron-up" : "chevron-down"} type="line" size={12} />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} aria-hidden />
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-56 overflow-hidden rounded-lg border border-neutral-4 bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                    <a href="/template/passenger-info" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-[22px] leading-none">🇹🇼</span>繁體中文(台灣)</a>
                    <a href="#" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-[22px] leading-none">🇭🇰</span>繁體中文(香港)</a>
                    <a href="/template/passenger-info-zh-cn" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-[22px] leading-none">🇨🇳</span>简体中文</a>
                    <a href="/template/passenger-info-en-us" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><span className="inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-[22px] leading-none">🇺🇸</span>English</a>
                  </div>
                </>
              )}
            </div>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 hover:opacity-80"
                  aria-label="用户菜单"
                  aria-expanded={userMenuOpen}
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary-4 text-base font-medium text-white">Z</span>
                  <span className="text-base text-neutral-9">Zac</span>
                  <span className="text-neutral-7">
                    <Icon name={userMenuOpen ? "chevron-up" : "chevron-down"} type="line" size={12} />
                  </span>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} aria-hidden />
                    <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-64 overflow-hidden rounded-lg border border-neutral-4 bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                      <a href="/template/passenger-info-zh-cn" className="block whitespace-nowrap px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3">前往 旅客資料搜集 prototype</a>
                      <a href="/zh-cn/SEB_v4_PP1_zh_cn.html" className="block whitespace-nowrap px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3">前往 SEB v4 PP1.0 prototype</a>
                      <div className="my-1 h-px bg-neutral-4" />
                      <button
                        type="button"
                        onClick={() => { setUserMenuOpen(false); handleLogout() }}
                        className="block w-full whitespace-nowrap px-4 py-2.5 text-left text-base text-danger-6 hover:bg-neutral-3"
                      >模擬登出</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleLogin() }}
                  className="hover:text-primary-6"
                >登录</a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleLogin() }}
                  className="hover:text-primary-6"
                >注册</a>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* ── Main Container (線上 max-width: 900px, padding: 16px) ──── */}
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-4 py-10">
          <h1 className="h2-tw mb-6 text-neutral-10">旅客信息与预订需求</h1>

          {/* ── Order Summary Card ──────────────────────────────────────── */}
          <div className="mb-4 flex items-center gap-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <img
              src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              alt="盛冈马拉松"
              className="size-20 shrink-0 rounded object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs text-neutral-6"># T202605040003</div>
              <div className="mt-1 text-base font-normal text-neutral-9">
                简体中文测试 - 【2026岩手盛冈城市马拉松】参赛权＋超值精选2晚住宿
              </div>
              <div className="mt-1 text-xs text-neutral-7">
                Hotel Metropolitan Morioka NEW WING｜单人入住
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary-8">5月5日</div>
                <div className="text-xs text-neutral-6">周二 2026</div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-neutral-6">→</span>
                <span className="text-xs text-neutral-6">3 日</span>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-8">5月7日</div>
                <div className="text-xs text-neutral-6">周四 2026</div>
              </div>
            </div>
          </div>

          {/* ── Passenger Form Card ────────────────────────────────────── */}
          <div className="mb-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <h3 className="mb-2 text-xl font-bold text-neutral-9">旅客信息</h3>
            <p className="mb-6 text-sm text-neutral-7">
              我们将用此资料订房开票，若资料有误可能会有更改费用产生，请务必填写正确。
            </p>

            <div className="mb-3 text-sm font-normal text-neutral-8">旅客 1</div>

            {/* 选择常用旅客 */}
            <div className="mb-5 max-w-[48%]">
              <Label>选择常用旅客</Label>
              <SavedTravelerSelect
                emptyText="此账号尚未储存常用旅客资料"
                placeholder="请选择常用旅客"
                options={["陈芃志"]}
              />
            </div>

            {/* 中文姓名 — Group A (tone7), TW only */}
            {isTw && (
              <div className="mb-5 flex max-w-[48%] gap-4">
                <div className="flex-1">
                  <Label className={tone7}>中文姓</Label>
                  <Input placeholder="请输入中文姓" />
                </div>
                <div className="flex-1">
                  <Label className={tone7}>中文名</Label>
                  <Input placeholder="请输入中文名" />
                </div>
              </div>
            )}

            {/* 护照英文姓名 — Group A (tone7) */}
            <div className="mb-5 flex max-w-[48%] gap-4">
              <div className="flex-1">
                <Label className={tone7}>护照英文姓</Label>
                <span className="block text-base text-neutral-7">Chen</span>
              </div>
              <div className="flex-1">
                <Label className={tone7}>护照英文名</Label>
                <span className="block text-base text-neutral-7">Zac</span>
              </div>
            </div>

            {/* 出生年月日 — 用戶未列入清單，保持原狀 */}
            <div className="mb-5 max-w-[48%]">
              <Label>出生年月日</Label>
              <span className="block text-base text-neutral-8">1985/07/17</span>
            </div>

            {/* 护照国籍 — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>护照国籍</Label>
              <span className="block text-base text-neutral-7">{NATIONALITY_LABELS[nationality]}</span>
            </div>

            {/* 性别 — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>性别</Label>
              <span className="block text-base text-neutral-7">男</span>
            </div>

            {/* 身份证号码 — TW only */}
            {isTw && (
              <div className="mb-5 max-w-[48%]">
                <Label>身份证号码</Label>
                <Input placeholder="请输入身份证号码" />
              </div>
            )}

            {/* 护照号码 — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>护照号码</Label>
              <Input placeholder="请输入护照号码" />
            </div>

            {/* 护照出生地 — Group A (tone7), TW only */}
            {isTw && (
              <div className="mb-5 max-w-[48%]">
                <Label className={tone7}>护照出生地</Label>
                <Input placeholder="请输入护照出生地" />
              </div>
            )}

            {/* 护照签发日期 — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>护照签发日期</Label>
              <YMDSelect />
            </div>

            {/* 护照有效期 — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>护照有效期</Label>
              <YMDSelect />
            </div>

            {/* 参赛组别 — Group B (tone8) */}
            <div className="mb-5">
              <Label className={tone8}>参赛组别</Label>
              <RadioGroup value={raceGroup} onValueChange={setRaceGroup} className="flex flex-col gap-3">
                <RadioButton value="full" label="全程马拉松 ( Full Marathon / フルマラソン )" />
                <RadioButton value="half" label="半程马拉松 ( Half Marathon / ハーフマラソン )" />
              </RadioGroup>
            </div>

            {/* 参赛者联系电话 — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>参赛者联系电话（在海外能联络到您的号码）</Label>
              <p className="mb-4 text-sm text-neutral-7">若无参赛者请填&ldquo;无&rdquo;</p>
              <Input placeholder="请输入" />
            </div>

            {/* 参赛者电子邮箱 — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>参赛者电子邮箱</Label>
              <p className="mb-4 text-sm text-neutral-7">我们会将大会消息寄送到此信箱，请确保资料输入正确。</p>
              <Input placeholder="请输入" />
            </div>

            {/* 紧急联系人姓名 — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>紧急联系人姓名</Label>
              <p className="mb-4 text-sm text-neutral-7">
                紧急联系人请勿填写参加人员，以免活动中延误紧急联络处置<br />无参赛请填&ldquo;无&rdquo;
              </p>
              <Input placeholder="请输入" />
            </div>

            {/* 紧急联系人电话 — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>紧急联系人电话</Label>
              <p className="mb-4 text-sm text-neutral-7">
                紧急联系人请勿填写参加人员，以免活动中延误紧急联络处置<br />无参赛请填&ldquo;无&rdquo;
              </p>
              <Input placeholder="请输入" />
            </div>

            {/* 紧急联系人关系 — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>紧急联系人关系</Label>
              <p className="mb-4 text-sm text-neutral-7">
                紧急联系人请勿填写参加人员，以免活动中延误紧急联络处置<br />无参赛请填&ldquo;无&rdquo;
              </p>
              <Input placeholder="请输入" />
            </div>

            {/* 衣服尺寸 — Group B (tone8) */}
            <div className="mb-5">
              <Label className={tone8}>衣服尺寸</Label>
              <p className="mb-4 text-sm text-neutral-7">※ 请参考各赛事官网尺寸表。</p>
              <RadioGroup value={shirtSize} onValueChange={setShirtSize} className="flex flex-col gap-3">
                <RadioButton value="none" label="不需要" />
                <RadioButton value="xs" label="XS" />
                <RadioButton value="s" label="S" />
                <RadioButton value="m" label="M" />
                <RadioButton value="l" label="L" />
                <RadioButton value="xl" label="XL" />
                <RadioButton value="xxl" label="XXL" />
              </RadioGroup>
            </div>

            {/* 饮食习惯 — Group B (tone8) */}
            <div className="mb-5">
              <Label className={tone8}>饮食习惯</Label>
              <RadioGroup value={dietHabit} onValueChange={setDietHabit} className="flex flex-col gap-3">
                <RadioButton value="none" label="无参赛" />
                <RadioButton value="meat" label="荤" />
                <RadioButton value="veg" label="素" />
              </RadioGroup>
            </div>

            {/* 本次赛事预计完成时间 — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>本次赛事预计完成时间（小时：分钟：秒数）</Label>
              <p className="mb-4 text-sm leading-[1.6] text-neutral-7">
                填写格式：04:30:00<br />
                需提交给赛事方，请如实填写。<br />
                如仅为同住人不参赛，请填&ldquo;无&rdquo;。
              </p>
              <Input placeholder="04:30:00" />
            </div>

            {/* 新增常用旅客 */}
            <div className="mt-4">
              <Button variant="primary" appearance="flat" size="sm">
                <Icon name="plus" type="line" size={14} />
                新增常用旅客
              </Button>
            </div>
          </div>

          {/* ── Lead Traveler Card ──────────────────────────────────────── */}
          <div className="mb-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <h3 className="mb-4 text-xl font-bold text-neutral-9">旅客代表人</h3>

            <div className="mb-5 max-w-[48%]">
              <Label>旅客代表人身份</Label>
              <Select className="w-full">
                <option>旅客 1</option>
              </Select>
            </div>

            {/* 手机号码 */}
            <div className="mb-5 max-w-[48%]">
              <Label>手机号码</Label>
              <PhoneInput />
            </div>

            {/* 邮政编码 */}
            <div className="mb-5 max-w-[48%]">
              <Label>邮政编码</Label>
              <Input placeholder="请输入邮政编码" />
            </div>

            {/* 地址 */}
            <div className="mb-5 max-w-[48%]">
              <Label>地址</Label>
              <Input placeholder="请输入地址" />
            </div>
          </div>

          {/* ── Notice Card ────────────────────────────────────────────── */}
          <div className="mb-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <h3 className="mb-4 text-xl font-bold text-neutral-9">注意事项</h3>
            <Checkbox label="我确认上述填写个人信息/报名资料皆正确，AsiaYo可使用您填写内容进行赛事报名。" />
          </div>

          {/* ── Action Bar (无白底) ────────────────────────────────────── */}
          <div className="mb-10 flex justify-end gap-3 py-4">
            <Button variant="neutral" appearance="outline" size="md">返回上一页</Button>
            <Button variant="primary" appearance="solid" size="md">预览</Button>
          </div>
        </div>
      </main>

      {/* ── Site Footer ─────────────────────────────────────────────── */}
      <footer className="bg-[#002138] text-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-4 gap-8 px-6 py-12">
          <div>
            <h4 className="mb-4 text-base font-bold">关于我们</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><a href="#" className="hover:opacity-80">发布房源</a></li>
              <li><a href="#" className="hover:opacity-80">工作机会</a></li>
              <li><a href="#" className="hover:opacity-80">合作提案</a></li>
              <li><a href="#" className="hover:opacity-80">认识 AsiaYo</a></li>
              <li><a href="#" className="hover:opacity-80">常见问题</a></li>
              <li><a href="#" className="hover:opacity-80">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-bold">客户服务</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>周一～周五 09:00～22:00 (UTC+8)</li>
              <li>周六/日及连续假日 12:00～18:00 (UTC+8)</li>
              <li>电话：+886-2-7755-0575</li>
              <li>传真：+886-2-2784-5272</li>
              <li>邮箱：customer_tw@asiayo.com</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-bold">AsiaYo</h4>
            <p className="text-sm leading-relaxed text-white/80">
              AsiaYo 严选邮轮旅游、跟团行程、一日游和交通票券，提供最优质独特的高铁、露营、包栋等饭店住宿选择，还有马拉松、登山、高尔夫等特色运动赛事，集结日韩、台湾、东南亚、欧美、纽澳等全球旅游攻略！真实的用户评价与体验，让你线上一站快速预订，轻松找到最理想的旅游选择！
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-base font-bold">下载 App</h4>
            <div className="mb-6 flex gap-2">
              <a href="#" className="inline-flex h-10 items-center gap-2 rounded border border-white/20 px-3 text-xs hover:opacity-80">
                App Store
              </a>
              <a href="#" className="inline-flex h-10 items-center gap-2 rounded border border-white/20 px-3 text-xs hover:opacity-80">
                Google Play
              </a>
            </div>
            <h4 className="mb-4 text-base font-bold">社交媒体</h4>
            <div className="flex gap-3">
              <a href="#" className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:opacity-80" aria-label="Blog">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
              </a>
              <a href="#" className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:opacity-80" aria-label="Facebook">
                <Icon name="facebook" type="solid" size={16} />
              </a>
              <a href="#" className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:opacity-80" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              </a>
              <a href="#" className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:opacity-80" aria-label="Line">
                <span className="text-xs font-bold">LINE</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs text-white/60">
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="hover:opacity-80">服务条款</a>
              <a href="#" className="hover:opacity-80">隐私声明</a>
              <span>© 2014-2026 AsiaYo Co., Ltd. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
