"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── NavBar ───────────────────────────────────────────────────────────────────
// Figma node 1367-21879 — Navigation Bar
//
// Full-width, 48px tall, dark navy (#003A5E) horizontal scrollable nav.
// Spec:
//   Height: 48px | BG: #003A5E
//   Padding-left: 16px (before first item)
//   Item padding: 12px top/bottom, 24px left/right | min-width: 87px
//   Item states:
//     Unselected: bg #003A5E | Hover: #055885 | Active: #0F7AAB | Selected: #1E9FD2
//   All text: white, 16px/24px, Noto Sans TC, font-weight 500
//   Badge dot: 8×8px, fill #F4511E, ring white 1px
//   Chevron button: 48×48px, right-pinned

// ─── ChevronRight icon ────────────────────────────────────────────────────────

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

export interface NavItemProps {
  label: string
  selected?: boolean
  badge?: boolean | number
  onClick?: () => void
  className?: string
}

export function NavItem({ label, selected, badge, onClick, className }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={selected}
      className={cn(
        "relative shrink-0 flex items-center justify-center gap-1",
        "h-12 px-6 py-3 min-w-[87px]",
        "text-white text-base font-medium leading-6 whitespace-nowrap",
        "transition-colors",
        selected
          ? "bg-[#1e9fd2]"
          : "bg-[#003a5e] hover:bg-[#055885] active:bg-[#0f7aab]",
        className
      )}
    >
      {label}

      {/* Badge dot */}
      {badge !== undefined && badge !== false && badge !== 0 && (
        <span
          aria-label="通知"
          className="absolute top-2 right-2 size-2 rounded-full bg-[#f4511e] ring-1 ring-white"
        />
      )}
    </button>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

export interface NavBarItem {
  id: string
  label: string
  badge?: boolean | number
}

export interface NavBarProps {
  items: NavBarItem[]
  activeId?: string
  onSelect?: (id: string) => void
  showChevron?: boolean
  onChevronClick?: () => void
  className?: string
}

export function NavBar({
  items,
  activeId,
  onSelect,
  showChevron = true,
  onChevronClick,
  className,
}: NavBarProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  function handleChevron() {
    if (onChevronClick) {
      onChevronClick()
    } else if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 160, behavior: "smooth" })
    }
  }

  return (
    <nav
      role="tablist"
      aria-label="navigation"
      className={cn("relative flex items-stretch h-12 w-full bg-[#003a5e]", className)}
    >
      {/* Scrollable item list */}
      <div
        ref={scrollRef}
        className="flex items-stretch overflow-x-auto pl-4 scrollbar-none flex-1 min-w-0"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map(item => (
          <NavItem
            key={item.id}
            label={item.label}
            selected={item.id === activeId}
            badge={item.badge}
            onClick={() => onSelect?.(item.id)}
          />
        ))}
        {/* Spacer to push chevron to the right */}
        <div className="flex-1 min-w-0 bg-[#003a5e]" />
      </div>

      {/* Pinned chevron button */}
      {showChevron && (
        <button
          type="button"
          onClick={handleChevron}
          aria-label="顯示更多"
          className="shrink-0 flex items-center justify-center size-12 bg-[#003a5e] text-white hover:bg-[#055885] active:bg-[#0f7aab] transition-colors"
        >
          <ChevronRightIcon />
        </button>
      )}
    </nav>
  )
}
