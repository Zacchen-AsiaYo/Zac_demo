import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Tag ──────────────────────────────────────────────────────────────────────
// Figma node 891-5911 — Tag canvas
//
// Sizes:
//   small:  h-6 (24px), px-1 py-1, icon 16px, text 12px
//   medium: h-7 (28px), px-1 py-1, icon 16px, text 14px
//   large:  h-8 (32px), px-2 py-1, icon 20px, text 16px
//
// All sizes: border-radius 4px, gap 4px between icon and text, font-weight 500
//
// Variants (color):
//   warm        — bg #fffce6, border rgba(255,179,0,0.16), text #595959
//   success     — bg #efffef, border rgba(4,173,0,0.16),   text #04ad00
//   warning     — bg #fffce6, no visible border,            text #d99100
//   danger      — bg #fff3eb, border rgba(244,81,30,0.16),  text #f4511e
//   gray        — bg #f5f5f5, border rgba(0,0,0,0.08),      text #595959
//   navy        — bg #055885, no border,                    text #ffffff (solid)
//   black       — bg #000000, no border,                    text #ffffff (solid)
//   dark-overlay— bg rgba(0,0,0,0.80), no border,           text #ffffff (solid)

const tagVariants = cva(
  // Base: inline-flex, center-aligned, no text wrap, font-medium, rounded-[4px], gap-1
  "inline-flex items-center gap-1 rounded-[4px] font-medium whitespace-nowrap leading-none",
  {
    variants: {
      variant: {
        warm:         "bg-[#fffce6] border border-[rgba(255,179,0,0.16)] text-[#595959]",
        success:      "bg-[#efffef] border border-[rgba(4,173,0,0.16)] text-[#04ad00]",
        warning:      "bg-[#fffce6] border border-[#fffce6] text-[#d99100]",
        danger:       "bg-[#fff3eb] border border-[rgba(244,81,30,0.16)] text-[#f4511e]",
        gray:         "bg-[#f5f5f5] border border-[rgba(0,0,0,0.08)] text-[#595959]",
        navy:         "bg-[#055885] text-white",
        black:        "bg-black text-white",
        "dark-overlay": "bg-[rgba(0,0,0,0.80)] text-white",
      },
      size: {
        small:  "h-6 px-1 py-1 text-xs",
        medium: "h-7 px-1 py-1 text-sm",
        large:  "h-8 px-2 py-1 text-base",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "medium",
    },
  }
)

export interface TagProps extends VariantProps<typeof tagVariants> {
  label: string
  icon?: React.ReactNode
  className?: string
}

export function Tag({ label, icon, variant, size, className }: TagProps) {
  const iconSize = size === "large" ? "size-5" : "size-4"

  return (
    <span className={cn(tagVariants({ variant, size }), className)}>
      {icon && (
        <span className={cn("shrink-0 flex items-center justify-center", iconSize)} aria-hidden>
          {icon}
        </span>
      )}
      <span>{label}</span>
    </span>
  )
}

// ─── SaleTag ──────────────────────────────────────────────────────────────────
// Two variants:
//   solid:    #f4511e bg, white text, single-part, h-6, px-1 py-1, radius 4px
//   two-part: badge (#fff3eb bg, #ffbb99 border) + description text (#f4511e)

export interface SaleTagProps {
  /** Main badge label (e.g. "64折", "10%off") */
  badge: string
  /** Optional trailing description text */
  description?: string
  /** Solid = filled orange bg; outline = badge with description */
  variant?: "solid" | "outline"
  className?: string
}

export function SaleTag({ badge, description, variant = "solid", className }: SaleTagProps) {
  if (variant === "solid") {
    return (
      <span
        className={cn(
          "inline-flex items-center h-6 px-1 py-1 rounded-[4px]",
          "bg-[#f4511e] text-white text-xs font-medium whitespace-nowrap",
          className
        )}
      >
        {badge}
      </span>
    )
  }

  // Two-part outline layout
  return (
    <span className={cn("inline-flex items-start gap-1", className)}>
      {/* Badge part */}
      <span className="inline-flex items-center h-6 px-1 py-1 rounded-[4px] bg-[#fff3eb] border border-[#ffbb99] text-[#f4511e] text-xs font-medium whitespace-nowrap shrink-0">
        {badge}
      </span>
      {/* Description text */}
      {description && (
        <span className="text-[#f4511e] text-xs font-medium leading-4 pt-[4px] whitespace-nowrap">
          {description}
        </span>
      )}
    </span>
  )
}

// ─── FilterPill ───────────────────────────────────────────────────────────────
// Figma node 891-5911 — tagging-item / pill
//
// Height: 32px | border-radius: 16px (full pill)
// Padding: 6px top/bottom, 8px left/right
// Default: bg #f5f5f5, border 1px #bfbfbf, text #595959, 14px font-medium
// Active:  bg #1e9fd2, no border, text #ffffff

export interface FilterPillProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function FilterPill({ label, active, onClick, className }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center h-8 px-2 py-1.5 rounded-full",
        "text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "bg-[#1e9fd2] text-white"
          : "bg-[#f5f5f5] border border-[#bfbfbf] text-[#595959]",
        className
      )}
    >
      {label}
    </button>
  )
}
