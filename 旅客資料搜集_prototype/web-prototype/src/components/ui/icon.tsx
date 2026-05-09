import { cn } from "@/lib/utils"
import iconsMap  from "@/lib/icons/Ay-Icons.json"
import lineMap   from "@/lib/icons/Ay-Web-Icons-Line.json"
import solidMap  from "@/lib/icons/Ay-Web-Icons-Solid.json"

// ─── Types ────────────────────────────────────────────────────────────────────

/** 對應 ul 的 IconType — 保持相同 */
export type IconType = "icons" | "line" | "solid"

export interface IconProps {
  /** Icon 名稱（同 ul，可帶或不帶 "ay-icon-" prefix） */
  name: string
  /** 字型種類。預設 "line"（ul 預設 "icons"，wp 改預設 "line"，見 docs） */
  type?: IconType
  /** font-size（px）。不傳則繼承父元素字型大小 */
  size?: number
  className?: string
  onClick?: () => void
  "aria-label"?: string
  "aria-hidden"?: boolean | "true" | "false"
}

// ─── Internal maps ────────────────────────────────────────────────────────────

const maps: Record<IconType, Record<string, { code: string }>> = {
  icons: iconsMap  as Record<string, { code: string }>,
  line:  lineMap   as Record<string, { code: string }>,
  solid: solidMap  as Record<string, { code: string }>,
}

const fontFamily: Record<IconType, string> = {
  icons: "font-['Ay-Icons']",
  line:  "font-['Ay-Web-Icons-Line']",
  solid: "font-['Ay-Web-Icons-Solid']",
}

// ─── Helper ───────────────────────────────────────────────────────────────────

/** "\e95f" → U+E95F → the private-use character the font renders as the icon */
function codeToChar(code: string): string {
  const hex = code.replace(/^\\/, "")
  return String.fromCodePoint(parseInt(hex, 16))
}

// ─── Icon ─────────────────────────────────────────────────────────────────────

export function Icon({
  name,
  type = "line",
  size,
  className,
  onClick,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  ...props
}: IconProps) {
  // strip "ay-icon-" prefix if caller passes it (backward compat with ul)
  const key = name.replace(/^ay-icon-/, "")
  const entry = maps[type]?.[key]

  if (!entry) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Icon] "${name}" not found in type="${type}"`)
    }
    return null
  }

  // default aria-hidden when no label provided (decorative icon)
  const hidden = ariaHidden ?? (ariaLabel ? undefined : true)

  return (
    <i
      data-slot="icon"
      aria-label={ariaLabel}
      aria-hidden={hidden}
      role={ariaLabel ? "img" : undefined}
      className={cn(
        "not-italic leading-none select-none",
        fontFamily[type],
        className
      )}
      style={size !== undefined ? { fontSize: size } : undefined}
      onClick={onClick}
      {...props}
    >
      {codeToChar(entry.code)}
    </i>
  )
}
