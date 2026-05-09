import { cn } from "@/lib/utils"

// ─── Badge ─────────────────────────────────────────────────────────────────────
// ZeroHeight: https://zeroheight.com/8ei12wwuw/p/49aa5a-badge
//
// Single component, three behaviours — same as ul's content-driven logic:
//   value = number  → Numeric badge ("5", "99+")
//   value = string  → Text badge ("新", "N")
//   value = absent  → Dot (with optional ripple)
//
// Colors: danger (Danger 06) / primary (Primary 08) / neutral (Neutral 01)
// ─────────────────────────────────────────────────────────────────────────────

export type BadgeColor    = "danger" | "primary" | "neutral"
export type BadgePlacement = "at-edge" | "close-edge"

const colorStyles: Record<BadgeColor, string> = {
  danger:  "bg-danger-6  text-white",
  primary: "bg-primary-8 text-white",
  neutral: "bg-white     text-primary-10",
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export interface BadgeProps {
  /**
   * number  → numeric badge ("5", "99+")
   * string  → text badge ("新", "N")
   * absent  → dot (small circle, with optional ripple)
   */
  value?: number | string
  /** Cap for numeric values. Default 99 → shows "99+" when exceeded */
  max?: number
  color?: BadgeColor
  /** Ripple animation — only applies in dot mode (no value) */
  ripple?: boolean
  className?: string
}

export function Badge({
  value,
  max = 99,
  color = "danger",
  ripple = false,
  className,
}: BadgeProps) {
  // ── Numeric mode ──────────────────────────────────────────────
  if (typeof value === "number") {
    if (value <= 0) return null
    const label = value > max ? `${max}+` : String(value)
    return (
      <span
        data-slot="badge"
        data-mode="numeric"
        data-color={color}
        className={cn(
          "inline-flex items-center justify-center",
          "h-4 min-w-4 px-1 rounded-[10px]",
          "text-[12px] font-normal leading-none",
          colorStyles[color],
          className
        )}
      >
        {label}
      </span>
    )
  }

  // ── Text mode ("新" / "N") ────────────────────────────────────
  if (typeof value === "string") {
    return (
      <span
        data-slot="badge"
        data-mode="text"
        data-color={color}
        className={cn(
          "inline-flex items-center justify-center",
          "h-4 min-w-4 px-1 rounded-[10px]",
          "text-[12px] font-normal leading-none",
          colorStyles[color],
          className
        )}
      >
        {value}
      </span>
    )
  }

  // ── Dot mode (no value) ───────────────────────────────────────
  return (
    <span
      data-slot="badge"
      data-mode="dot"
      data-color={color}
      className={cn(
        "relative inline-block size-2 rounded-full ring-1 ring-white",
        colorStyles[color],
        className
      )}
    >
      {ripple && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-inherit animate-[badge-ripple_2s_ease-out_infinite]"
        />
      )}
    </span>
  )
}

// ─── BadgeAnchor ──────────────────────────────────────────────────────────────
// Wraps any element and positions a Badge at top-right.

export interface BadgeAnchorProps {
  /** Same as Badge.value — drives numeric / text / dot mode */
  value?: number | string
  max?: number
  color?: BadgeColor
  ripple?: boolean
  placement?: BadgePlacement
  hidden?: boolean
  children: React.ReactNode
  className?: string
}

const placementStyles: Record<BadgePlacement, string> = {
  "at-edge":    "-top-2 -right-2",
  "close-edge": "-top-1 -right-1",
}

export function BadgeAnchor({
  value,
  max = 99,
  color = "danger",
  ripple = false,
  placement = "at-edge",
  hidden = false,
  children,
  className,
}: BadgeAnchorProps) {
  const showBadge = !hidden && (
    value !== undefined || ripple
    // dot mode always shows when no value; numeric hides at 0 (handled inside Badge)
  )

  return (
    <div data-slot="badge-anchor" className={cn("relative inline-flex", className)}>
      {children}
      {showBadge && (
        <span className={cn("absolute z-10", placementStyles[placement])}>
          <Badge value={value} max={max} color={color} ripple={ripple} />
        </span>
      )}
    </div>
  )
}

// ─── Legacy named exports (backward compat) ───────────────────────────────────
// Keep so existing code using BadgeDot / BadgeNew still compiles.

/** @deprecated Use <Badge /> (dot mode) */
export function BadgeDot(props: Omit<BadgeProps, "value" | "max">) {
  return <Badge {...props} />
}

/** @deprecated Use <Badge value="新" /> or <Badge value="N" /> */
export function BadgeNew({ text = "新", className }: { text?: string; className?: string }) {
  return <Badge value={text} color="danger" className={className} />
}
