import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Page Header ──────────────────────────────────────────────────────────────
// Figma node 1367-21879 — Navigation Bar / header / mobile & desktop
//
// Mobile:  48px, white BG, logo (107×24px) left + hamburger button (48×48) right
// Desktop: 48px, white BG, logo left + 「諮詢客服」text + phone/LINE icons right
//
// Logo: AsiaYo brand mark — yellow (#F9BE00) + light blue (#57C2E9)
// Hamburger: web-new/line/bars 24×24px, #1e9fd2
// Phone icon: #595959
// LINE icon: #00B900 circle

// ─── AsiaYo Logo ──────────────────────────────────────────────────────────────

function AsiaYoLogo({ className }: { className?: string }) {
  return (
    <svg
      width="107"
      height="24"
      viewBox="0 0 107 24"
      fill="none"
      aria-label="AsiaYo"
      className={className}
    >
      {/* A mark (stylised 'A' shape) */}
      <path d="M4 18L9 6l5 12H4z" fill="#F9BE00" />
      <path d="M6.5 13h5" stroke="#F9BE00" strokeWidth="1.5" strokeLinecap="round" />
      {/* Dot accent */}
      <circle cx="9" cy="4.5" r="2" fill="#57C2E9" />
      {/* AsiaYo wordmark */}
      <text
        x="18"
        y="17"
        fontFamily="'Noto Sans TC', sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#57C2E9"
        letterSpacing="-0.2"
      >
        AsiaYo
      </text>
    </svg>
  )
}

// ─── Hamburger (bars) icon ─────────────────────────────────────────────────────

function BarsIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ─── Phone icon ───────────────────────────────────────────────────────────────

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── LINE icon ────────────────────────────────────────────────────────────────

function LineIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10" fill="#00B900" />
      <path
        d="M19 11.4C19 8.42 16.09 6 12.5 6S6 8.42 6 11.4c0 2.67 2.37 4.9 5.57 5.33.22.05.51.14.59.32.07.17.04.43.02.6l-.1.58c-.03.17-.13.68.6.37.72-.31 3.9-2.3 5.32-3.93A4.76 4.76 0 0019 11.4z"
        fill="white"
      />
      <path d="M10.5 10h-1v3h1v-3zM14.5 10h-1v3h1v-3z" fill="#00B900" />
      <path d="M11.5 10h1v1.5l1.5-1.5h1.3l-1.8 1.8L15.5 13h-1.3l-1.2-1.2V13h-1v-3z" fill="#00B900" />
    </svg>
  )
}

// ─── PageHeaderMobile ─────────────────────────────────────────────────────────

export interface PageHeaderMobileProps {
  onMenuClick?: () => void
  className?: string
}

export function PageHeaderMobile({ onMenuClick, className }: PageHeaderMobileProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between h-12 w-full bg-white",
        className
      )}
    >
      <div className="pl-4">
        <AsiaYoLogo />
      </div>
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="開啟選單"
        className="flex items-center justify-center size-12 text-[#1e9fd2] shrink-0"
      >
        <BarsIcon />
      </button>
    </header>
  )
}

// ─── PageHeaderDesktop ────────────────────────────────────────────────────────

export interface PageHeaderDesktopProps {
  onPhoneClick?: () => void
  onLineClick?: () => void
  className?: string
}

export function PageHeaderDesktop({ onPhoneClick, onLineClick, className }: PageHeaderDesktopProps) {
  return (
    <header
      className={cn(
        "flex items-center h-12 w-full bg-white px-4 gap-4",
        className
      )}
    >
      <AsiaYoLogo />

      <div className="flex items-center gap-4 ml-auto">
        <span className="text-base font-medium leading-6 text-black whitespace-nowrap">
          諮詢客服
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onPhoneClick}
            aria-label="電話聯絡"
            className="text-[#595959]"
          >
            <PhoneIcon />
          </button>
          <button
            type="button"
            onClick={onLineClick}
            aria-label="LINE 聯絡"
          >
            <LineIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
