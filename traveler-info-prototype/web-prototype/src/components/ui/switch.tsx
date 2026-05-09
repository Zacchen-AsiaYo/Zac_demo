"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Switch ───────────────────────────────────────────────────────────────────
// Figma node 513-1326
//
// Track: 52×32px, fully-rounded pill
//   ON  default: #1e9fd2 | hover: #0f7aab | active: #1e9fd2 + knob ring #85c3dc
//   OFF default: #bfbfbf | hover: #8c8c8c | active: #bfbfbf + knob ring white
//   focus: 2px outline matching track color
//   loading / disabled: component opacity 0.48, pointer-events none
//
// Knob: 24×24px circle, white, 4px inset from track edges
//   OFF → translateX(4px)  |  ON → translateX(24px)
//   transition: translate + track color 200ms ease-in-out
//
// Loading: 20×20px spinner (CSS spin) centered on knob

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  loading?: boolean
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  loading = false,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SwitchProps) {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const on = isControlled ? checked! : internalChecked
  const [isActive, setIsActive] = React.useState(false)

  const inactive = disabled || loading

  function toggle() {
    if (inactive) return
    const next = !on
    if (!isControlled) setInternalChecked(next)
    onChange?.(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      disabled={disabled || loading}
      onClick={toggle}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      className={cn(
        // Track
        "relative inline-flex shrink-0 w-[52px] h-8 rounded-full",
        "transition-colors duration-200 ease-in-out",
        // Track colors
        on
          ? inactive ? "bg-[#1e9fd2]" : "bg-[#1e9fd2] hover:bg-[#0f7aab]"
          : inactive ? "bg-[#bfbfbf]" : "bg-[#bfbfbf] hover:bg-[#8c8c8c]",
        // Focus
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
        on ? "focus-visible:ring-[#1e9fd2]" : "focus-visible:ring-[#bfbfbf]",
        // Disabled / loading
        inactive ? "opacity-[0.48] cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      {/* Knob */}
      <span
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full bg-white",
          "transition-all duration-200 ease-in-out",
          on ? "translate-x-6" : "translate-x-1",
          // Active ring
          isActive && !inactive && (
            on ? "ring-2 ring-[#85c3dc]" : "ring-2 ring-white"
          ),
          // Loading: knob dims on OFF
          loading && !on ? "bg-[#d9d9d9]" : ""
        )}
      />

      {/* Loading spinner — centered on knob position */}
      {loading && (
        <span
          className={cn(
            "absolute top-[6px] w-5 h-5 rounded-full",
            "border-2 border-transparent animate-spin",
            "transition-transform duration-200 ease-in-out",
            on
              ? "translate-x-[26px] border-t-[#1e9fd2] border-r-[#1e9fd2]"
              : "translate-x-[6px]  border-t-white border-r-white"
          )}
        />
      )}
    </button>
  )
}
