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

// ─── Country code data ──────────────────────────────────────────────────────
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

// ─── PhoneInput (with country code dropdown) ────────────────────────────────
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

// ─── SavedTravelerSelect (clicking the disabled-looking trigger enables it) ─
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

// ─── Year/Month/Day select group ────────────────────────────────────────────
function YMDSelect() {
  const years = Array.from({ length: 97 }, (_, i) => 1950 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  return (
    <div className="grid grid-cols-3 gap-3">
      <Select defaultValue="">
        <option value="" disabled>Year</option>
        {years.map((y) => <option key={y} value={y}>{y}</option>)}
      </Select>
      <Select defaultValue="">
        <option value="" disabled>Month</option>
        {months.map((m) => <option key={m} value={m}>{m}</option>)}
      </Select>
      <Select defaultValue="">
        <option value="" disabled>Day</option>
        {days.map((d) => <option key={d} value={d}>{d}</option>)}
      </Select>
    </div>
  )
}

// ─── PrototypeButton (?) — switch nationality ──────────────────────────────
type Nationality = "tw" | "cn" | "sg"
const NATIONALITY_LABELS: Record<Nationality, string> = {
  tw: "Taiwan",
  cn: "China",
  sg: "Singapore",
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
        aria-label="Prototype settings"
      >
        ?
        <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-neutral-10/90 px-2 py-1 text-xs text-white group-hover:block">
          This is a prototype
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
export default function PassengerInfoEnUsPage() {
  const [raceGroup, setRaceGroup] = useState("")
  const [shirtSize, setShirtSize] = useState("none")
  const [dietHabit, setDietHabit] = useState("none")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [nationality, setNationality] = useState<Nationality>("sg")
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
            {/* Language switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 hover:text-primary-6"
              >
                <img src="https://flagcdn.com/us.svg" alt="English" width={28} height={20} className="h-5 w-7 shrink-0 object-cover" />
                <Icon name={langOpen ? "chevron-up" : "chevron-down"} type="line" size={12} />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} aria-hidden />
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-56 overflow-hidden rounded-lg border border-neutral-4 bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                    <a href="/template/passenger-info" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><img src="https://flagcdn.com/tw.svg" alt="" width={28} height={20} className="h-5 w-7 shrink-0 object-cover" />繁體中文(台灣)</a>
                    <a href="#" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><img src="https://flagcdn.com/hk.svg" alt="" width={28} height={20} className="h-5 w-7 shrink-0 object-cover" />繁體中文(香港)</a>
                    <a href="/template/passenger-info-zh-cn" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><img src="https://flagcdn.com/cn.svg" alt="" width={28} height={20} className="h-5 w-7 shrink-0 object-cover" />简体中文</a>
                    <a href="/template/passenger-info-en-us" className="flex items-center gap-2.5 px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3"><img src="https://flagcdn.com/us.svg" alt="" width={28} height={20} className="h-5 w-7 shrink-0 object-cover" />English</a>
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
                  aria-label="User menu"
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
                      <a href="/template/passenger-info-en-us" className="block whitespace-nowrap px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3">前往 旅客資料搜集 prototype</a>
                      <a href="/en-us/SEB_v4_pp1_en_us.html" className="block whitespace-nowrap px-4 py-2.5 text-base text-neutral-9 hover:bg-neutral-3">前往 SEB v4 PP1.0 prototype</a>
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
                >Sign In</a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleLogin() }}
                  className="hover:text-primary-6"
                >Sign Up</a>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* ── Main Container (線上 max-width: 900px, padding: 16px) ──── */}
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-4 py-10">
          <h1 className="h2-tw mb-6 text-neutral-10">Traveler Details & Booking Information</h1>

          {/* ── Order Summary Card ──────────────────────────────────────── */}
          <div className="mb-4 flex items-center gap-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <img
              src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              alt="Morioka Marathon"
              className="size-20 shrink-0 rounded object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs text-neutral-6"># T202605040003</div>
              <div className="mt-1 text-base font-normal text-neutral-9">
                [2026 Iwate Morioka City Marathon] Race Entry + 2-Night Stay Package
              </div>
              <div className="mt-1 text-xs text-neutral-7">
                Hotel Metropolitan Morioka NEW WING｜Single Occupancy
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary-8">May 5</div>
                <div className="text-xs text-neutral-6">Tue, 2026</div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-neutral-6">→</span>
                <span className="text-xs text-neutral-6">3 days</span>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-8">May 7</div>
                <div className="text-xs text-neutral-6">Thu, 2026</div>
              </div>
            </div>
          </div>

          {/* ── Passenger Form Card ────────────────────────────────────── */}
          <div className="mb-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <h3 className="mb-2 text-xl font-bold text-neutral-9">Traveler Information</h3>
            <p className="mb-6 text-sm text-neutral-7">
              This information will be used for hotel booking and race registration. Incorrect details may result in additional amendment fees. Please ensure all information is accurate.
            </p>

            <div className="mb-3 text-sm font-normal text-neutral-8">Traveler 1</div>

            {/* Select Saved Traveler */}
            <div className="mb-5 max-w-[48%]">
              <Label>Select Saved Traveler</Label>
              <SavedTravelerSelect
                emptyText="No saved travelers for this account"
                placeholder="Please select a saved traveler"
                options={["Zac Chen"]}
              />
            </div>

            {/* Chinese Last/First Name — Group A (tone7), TW only */}
            {isTw && (
              <div className="mb-5 flex max-w-[48%] gap-4">
                <div className="flex-1">
                  <Label className={tone7}>Chinese Last Name</Label>
                  <Input placeholder="Enter last name" />
                </div>
                <div className="flex-1">
                  <Label className={tone7}>Chinese First Name</Label>
                  <Input placeholder="Enter first name" />
                </div>
              </div>
            )}

            {/* Passport Last/First Name — Group A (tone7) */}
            <div className="mb-5 flex max-w-[48%] gap-4">
              <div className="flex-1">
                <Label className={tone7}>Last Name (as in Passport)</Label>
                <span className="block text-base text-neutral-7">Chen</span>
              </div>
              <div className="flex-1">
                <Label className={tone7}>First Name (as in Passport)</Label>
                <span className="block text-base text-neutral-7">Zac</span>
              </div>
            </div>

            {/* Date of Birth — 用戶未列入清單，保持原狀 */}
            <div className="mb-5 max-w-[48%]">
              <Label>Date of Birth</Label>
              <span className="block text-base text-neutral-8">1985/07/17</span>
            </div>

            {/* Nationality — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>Nationality</Label>
              <span className="block text-base text-neutral-7">{NATIONALITY_LABELS[nationality]}</span>
            </div>

            {/* Gender — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>Gender</Label>
              <span className="block text-base text-neutral-7">Male</span>
            </div>

            {/* National ID Number — TW only */}
            {isTw && (
              <div className="mb-5 max-w-[48%]">
                <Label>National ID Number</Label>
                <Input placeholder="Enter ID number" />
              </div>
            )}

            {/* Passport Number — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>Passport Number</Label>
              <Input placeholder="Enter passport number" />
            </div>

            {/* Place of Birth — Group A (tone7), TW only */}
            {isTw && (
              <div className="mb-5 max-w-[48%]">
                <Label className={tone7}>Place of Birth (as shown on passport)</Label>
                <Input placeholder="Enter place of birth" />
              </div>
            )}

            {/* Passport Issue Date — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>Passport Issue Date</Label>
              <YMDSelect />
            </div>

            {/* Passport Expiry Date — Group A (tone7) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone7}>Passport Expiry Date</Label>
              <YMDSelect />
            </div>

            {/* Race Category — Group B (tone8) */}
            <div className="mb-5">
              <Label className={tone8}>Race Category</Label>
              <RadioGroup value={raceGroup} onValueChange={setRaceGroup} className="flex flex-col gap-3">
                <RadioButton value="full" label="Full Marathon" />
                <RadioButton value="half" label="Half Marathon" />
              </RadioGroup>
            </div>

            {/* Runner Contact Number — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>Runner Contact Number (reachable internationally)</Label>
              <p className="mb-4 text-sm text-neutral-7">If not participating in the race, please enter &quot;NO&quot;.</p>
              <Input placeholder="Enter phone number" />
            </div>

            {/* Runner Email Address — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>Runner Email Address</Label>
              <p className="mb-4 text-sm text-neutral-7">Official race updates will be sent to this email. Please ensure it is correct.</p>
              <Input placeholder="Enter email address" />
            </div>

            {/* Emergency Contact Name — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>Emergency Contact Name</Label>
              <p className="mb-4 text-sm text-neutral-7">
                Do not list a participant as the emergency contact. If not participating, enter &quot;NO&quot;.
              </p>
              <Input placeholder="Enter name" />
            </div>

            {/* Emergency Contact Phone — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>Emergency Contact Phone Number</Label>
              <p className="mb-4 text-sm text-neutral-7">
                Do not list a participant as the emergency contact. If not participating, enter &quot;NO&quot;.
              </p>
              <Input placeholder="Enter phone number" />
            </div>

            {/* Emergency Contact Relationship — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>Relationship to Emergency Contact</Label>
              <p className="mb-4 text-sm text-neutral-7">
                Do not list a participant as the emergency contact. If not participating, enter &quot;NO&quot;.
              </p>
              <Input placeholder="Enter relationship" />
            </div>

            {/* T-shirt Size — Group B (tone8) */}
            <div className="mb-5">
              <Label className={tone8}>T-shirt Size</Label>
              <p className="mb-4 text-sm text-neutral-7">Please refer to the official race size chart.</p>
              <RadioGroup value={shirtSize} onValueChange={setShirtSize} className="flex flex-col gap-3">
                <RadioButton value="none" label="Not required" />
                <RadioButton value="xs" label="XS" />
                <RadioButton value="s" label="S" />
                <RadioButton value="m" label="M" />
                <RadioButton value="l" label="L" />
                <RadioButton value="xl" label="XL" />
                <RadioButton value="xxl" label="XXL" />
              </RadioGroup>
            </div>

            {/* Dietary Preference — Group B (tone8) */}
            <div className="mb-5">
              <Label className={tone8}>Dietary Preference</Label>
              <RadioGroup value={dietHabit} onValueChange={setDietHabit} className="flex flex-col gap-3">
                <RadioButton value="none" label="Not participating" />
                <RadioButton value="meat" label="Non-vegetarian" />
                <RadioButton value="veg" label="Vegetarian" />
              </RadioGroup>
            </div>

            {/* Expected Race Finish Time — Group B (tone8) */}
            <div className="mb-5 max-w-[48%]">
              <Label className={tone8}>Expected Race Finish Time (hh:mm:ss)</Label>
              <p className="mb-4 text-sm leading-[1.6] text-neutral-7">
                Format: 04:30:00<br />
                Required for the event organizer. Please fill in accurately.<br />
                If you are a non-participating co-traveler, please enter &quot;NO&quot;.
              </p>
              <Input placeholder="04:30:00" />
            </div>

            {/* Add Saved Traveler */}
            <div className="mt-4">
              <Button variant="primary" appearance="flat" size="sm">
                <Icon name="plus" type="line" size={14} />
                Add Saved Traveler
              </Button>
            </div>
          </div>

          {/* ── Lead Traveler Card ──────────────────────────────────────── */}
          <div className="mb-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <h3 className="mb-4 text-xl font-bold text-neutral-9">Primary Contact</h3>

            <div className="mb-5 max-w-[48%]">
              <Label>Select Primary Traveler</Label>
              <Select className="w-full">
                <option>Traveler 1</option>
              </Select>
            </div>

            {/* Mobile */}
            <div className="mb-5 max-w-[48%]">
              <Label>Mobile</Label>
              <PhoneInput />
            </div>

            {/* Postal Code */}
            <div className="mb-5 max-w-[48%]">
              <Label>Postal Code</Label>
              <Input placeholder="Enter postal code" />
            </div>

            {/* Address */}
            <div className="mb-5 max-w-[48%]">
              <Label>Address</Label>
              <Input placeholder="Enter address" />
            </div>
          </div>

          {/* ── Notice Card ────────────────────────────────────────────── */}
          <div className="mb-4 rounded-lg border border-neutral-4 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <h3 className="mb-4 text-xl font-bold text-neutral-9">Important Notes</h3>
            <Checkbox label="I confirm that all the above personal and registration information is accurate, and authorize AsiaYo to use it for race registration." />
          </div>

          {/* ── Action Bar (no card bg) ────────────────────────────────── */}
          <div className="mb-10 flex justify-end gap-3 py-4">
            <Button variant="neutral" appearance="outline" size="md">Back</Button>
            <Button variant="primary" appearance="solid" size="md">Preview</Button>
          </div>
        </div>
      </main>

      {/* ── Site Footer ─────────────────────────────────────────────── */}
      <footer className="bg-[#002138] text-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-4 gap-8 px-6 py-12">
          <div>
            <h4 className="mb-4 text-base font-bold">About</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><a href="#" className="hover:opacity-80">List your property</a></li>
              <li><a href="#" className="hover:opacity-80">Careers</a></li>
              <li><a href="#" className="hover:opacity-80">About AsiaYo</a></li>
              <li><a href="#" className="hover:opacity-80">FAQ</a></li>
              <li><a href="#" className="hover:opacity-80">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-bold">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>Mon – Fri 09:00 – 22:00 (UTC+8)</li>
              <li>Sat / Sun &amp; Holidays 12:00 – 18:00 (UTC+8)</li>
              <li>Phone: +886-2-7755-0575</li>
              <li>Fax: +886-2-2784-5272</li>
              <li>Email: customer@asiayo.com</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-base font-bold">AsiaYo</h4>
            <p className="text-sm leading-relaxed text-white/80">
              AsiaYo curates global cruises, group tours, transport passes, unique stays (HSR packages, glamping, whole-house rentals), and signature sports events like marathons, hiking, and golf—all in one platform.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-base font-bold">Download App</h4>
            <div className="mb-6 flex gap-2">
              <a href="#" className="hover:opacity-80">
                <img src="https://img.asiayo.com/static/images/appStore_footer_banner@2x.webp" alt="App Store" className="h-10" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="https://img.asiayo.com/static/images/googlePlay_footer_banner@2x.webp" alt="Google Play" className="h-10" />
              </a>
            </div>
            <h4 className="mb-4 text-base font-bold">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:opacity-80" aria-label="WordPress">
                <img src="https://img.asiayo.com/static/images/footer/logo/wordpress.png" alt="WordPress" className="size-4" />
              </a>
              <a href="#" className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:opacity-80" aria-label="Facebook">
                <img src="https://img.asiayo.com/static/images/footer/logo/facebook.png" alt="Facebook" className="size-4" />
              </a>
              <a href="#" className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:opacity-80" aria-label="Instagram">
                <img src="https://img.asiayo.com/static/images/footer/logo/instagram.png" alt="Instagram" className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs text-white/60">
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="hover:opacity-80">Terms of Service</a>
              <a href="#" className="hover:opacity-80">Privacy Policy</a>
              <span>© 2014-2026 AsiaYo Co., Ltd. All Rights Reserved. Version 3.97.0</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img src="https://img.asiayo.com/static/images/footer/logo/applepay.svg" alt="Apple Pay" className="h-5" />
                <img src="https://img.asiayo.com/static/images/footer/logo/visa.svg" alt="Visa" className="h-5" />
                <img src="https://img.asiayo.com/static/images/footer/logo/master.svg" alt="Mastercard" className="h-5" />
                <img src="https://img.asiayo.com/static/images/footer/logo/jcb.svg" alt="JCB" className="h-5" />
                <img src="https://img.asiayo.com/static/images/footer/logo/linepay.svg" alt="LINE Pay" className="h-5" />
                <img src="https://img.asiayo.com/static/images/footer/logo/jkopay.svg" alt="JKOPay" className="h-5" />
              </div>
              <div className="mx-2 h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <img src="https://img.asiayo.com/static/images/footer/logo/motc.svg" alt="MOTC" className="h-5" />
                <img src="https://img.asiayo.com/static/images/footer/logo/tata.svg" alt="TATA" className="h-5" />
                <img src="https://img.asiayo.com/static/images/footer/logo/tqaa.svg" alt="TQAA" className="h-5" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
