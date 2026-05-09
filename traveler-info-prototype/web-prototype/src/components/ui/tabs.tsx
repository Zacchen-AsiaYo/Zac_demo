"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Tabs ─────────────────────────────────────────────────────────────────────
// Figma node 61-29372 (authoritative Tabs canvas)
//
// Height: 56px | bg: white | no gap between tabs
// Tab padding: 16px left/right, 16px top, 0 bottom
// Content area height: 40px
//
// States:
//   Selected:   text + underline (2px) #1e9fd2
//   Hover:      text + underline (2px) #0f7aab
//   Active:     text + underline (2px) #055885
//   Unselected: text #595959, underline (1px) #e8e8e8
//   Disabled:   text #bfbfbf, underline (1px) #e8e8e8, cursor-not-allowed
//   Focus:      2px outline #1e9fd2 (outside)
//
// Font: Noto Sans TC, 16px/24px, weight 500 (all states)
// Badge dot: 8×8px, bg #f4511e, ring-1 ring-white
//   - Selected:   stacked above label (flex-col)
//   - Unselected: inline right of label (flex-row)
//
// type="adaptive": tab widths = content-width + 32px (default)
// type="fixed":    tabs share equal width (flex-1 each)

export interface TabItem {
  id: string
  label: string
  badge?: boolean
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeId?: string
  onSelect?: (id: string) => void
  /** adaptive = content-width, fixed = equal-width (flex-1) */
  type?: "adaptive" | "fixed"
  className?: string
}

export function Tabs({ items, activeId, onSelect, type = "adaptive", className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex bg-white overflow-x-auto",
        className
      )}
      style={{ scrollbarWidth: "none" }}
    >
      {items.map(item => {
        const selected = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            onClick={() => !item.disabled && onSelect?.(item.id)}
            className={cn(
              "group relative flex flex-col h-14",
              type === "fixed" ? "flex-1" : "shrink-0",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1e9fd2] focus-visible:outline-offset-0",
              item.disabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {/* Content area: 40px tall, pt-4 px-4 */}
            <div
              className={cn(
                "flex items-center justify-center px-4 pt-4 pb-0 h-10",
                // Badge position: flex-col (above) when selected, flex-row (inline) otherwise
                selected ? "flex-col gap-2" : "flex-row gap-1"
              )}
            >
              {item.badge && (
                <span
                  aria-label="通知"
                  className="shrink-0 size-2 rounded-full bg-[#f4511e] ring-1 ring-white ring-inset"
                />
              )}
              <span
                className={cn(
                  "text-base font-medium leading-6 whitespace-nowrap",
                  selected
                    ? "text-[#1e9fd2]"
                    : item.disabled
                    ? "text-[#bfbfbf]"
                    : "text-[#595959] group-hover:text-[#0f7aab] group-active:text-[#055885]"
                )}
              >
                {item.label}
              </span>
            </div>

            {/* Underline indicator */}
            <div
              className={cn(
                "w-full mt-auto",
                selected
                  ? "h-0.5 bg-[#1e9fd2]"
                  : item.disabled
                  ? "h-px bg-[#e8e8e8]"
                  : "h-px bg-[#e8e8e8] group-hover:h-0.5 group-hover:bg-[#0f7aab] group-active:bg-[#055885]"
              )}
            />
          </button>
        )
      })}
      {/* Trailing filler line to fill remaining width */}
      <div className="flex-1 self-end h-px bg-[#e8e8e8] min-w-0" />
    </div>
  )
}
