"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── TimesCircleIcon ──────────────────────────────────────────────────────────
// 圓形 × 按鈕 icon（16×16，對齊 Figma：× icon 直徑 ≈ 17px）
// - 外圈：fill="currentColor" → 顏色由父元素 text-* 控制
// - × 線條：stroke="#e8e8e8"（= neutral-4，chip bg色）→ 呈現切出效果
// Figma SVG：fill-rule="evenodd"，× 線透明讓背景色穿透

function TimesCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      {/* 外圈：fill = currentColor，由父 button 的 text-neutral-* 控制 */}
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      {/* × 線條：stroke 與 chip bg 同色（neutral-4 = #e8e8e8）→ 視覺上切穿圓圈 */}
      <path
        d="M5 5l6 6M11 5l-6 6"
        stroke="#e8e8e8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
// Pill-shaped removable filter tag.
//
// Figma specs (SVG 5 states):
//   bg: neutral-4（#e8e8e8）| border-radius: 100px | height: 28px
//   padding: 8px left, gap: 4px between label and ×
//   text: 14px / 20px / neutral-8
//   max-width: 300px（label truncates with ellipsis）
//
// × (close) button states:
//   Default:  text-neutral-6
//   Hover:    text-neutral-7
//   Active:   text-neutral-8
//   Focus:    ring-2 ring-primary-6/48 on chip container（via focus-within）
//
// ⚠️ ul 無此元件（wp 獨有，純對照 Figma）

export interface ChipProps {
  label: string
  onRemove?: () => void
  disabled?: boolean
  className?: string
}

export function Chip({ label, onRemove, disabled = false, className }: ChipProps) {
  return (
    <div
      data-slot="chip"
      className={cn(
        // Shape / size / bg
        "inline-flex items-center gap-1 h-7 max-w-[300px] rounded-full bg-neutral-4",
        // Left padding 8px；有 × 時右側 4px gap，無 × 時對稱 8px
        "pl-2",
        onRemove ? "pr-1" : "pr-2",
        // Focus ring on chip container when close button is focused
        "focus-within:ring-2 focus-within:ring-primary-6/48",
        // Disabled
        disabled && "opacity-[0.48] cursor-not-allowed",
        className
      )}
    >
      {/* Label */}
      <span className="text-sm leading-5 text-neutral-8 truncate min-w-0">
        {label}
      </span>

      {/* Remove button — 使用 AsiaYo iconfont times-circle（solid） */}
      {onRemove && (
        <button
          type="button"
          onClick={disabled ? undefined : onRemove}
          disabled={disabled}
          // 擴大點擊區域：負 margin + padding 使觸控目標 ≥ 44px tall
          className={cn(
            // 垂直擴大觸控區到 chip 全高（28px - 16px icon = 6px 上下各）
            "shrink-0 -my-[6px] py-[6px]",
            // × 色值依 Figma：default neutral-6 → hover neutral-7 → active neutral-8
            "text-neutral-6 not-disabled:hover:text-neutral-7 not-disabled:active:text-neutral-8",
            "transition-colors focus-visible:outline-none",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
          aria-label={`移除 ${label}`}
        >
          <TimesCircleIcon />
        </button>
      )}
    </div>
  )
}
