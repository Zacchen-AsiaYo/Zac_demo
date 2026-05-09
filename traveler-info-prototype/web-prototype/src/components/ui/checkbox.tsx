"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"

// ─── Icons ────────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DashIcon() {
  return (
    <svg width="8" height="2" viewBox="0 0 8 2" fill="none" aria-hidden>
      <path d="M0 1h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
// Primitive: @base-ui/react/checkbox (Checkbox.Root + Checkbox.Indicator)
//
// Checkbox.Root renders:
//   - <span tabIndex={0}> with id → the interactive focusable element
//   - hidden <input type="checkbox" tabIndex={-1} aria-hidden> → form submission
//
// Accessibility handled by primitive:
//   - role="checkbox", aria-checked (true/false/"mixed"), aria-disabled
//   - Space key to toggle, indeterminate via inputRef internally
//   - Arrow key navigation (if inside CheckboxGroup)
//
// Figma states (Figma SVG):
//   Unchecked default:       white bg, neutral-6 border
//   Unchecked hover:         primary-1 bg (group-hover/label: on label)
//   Unchecked disabled:      neutral-5 bg, neutral-6 border
//   Unchecked focus:         primary-6 border + outer ring-2 ring-primary-6/48
//   Checked:                 primary-6 bg + white checkmark
//   Checked disabled:        opacity-[0.48]
//   Indeterminate:           primary-6 bg + white dash
//   Indeterminate disabled:  opacity-[0.48]
//
// ⚠️ ul 差異：
//   - onCheckedChange 回傳 boolean（ul 回傳 ChangeEvent）
//   - label 為 string；ul 為 ReactNode
//   - ul 有 status/message/labelSize；wp 不支援

export interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  subLabel?: string
  /** 回傳 boolean（@base-ui onCheckedChange signature） */
  onChange?: (checked: boolean) => void
  className?: string
  id?: string
  name?: string
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  subLabel,
  onChange,
  className,
  id,
  name,
}: CheckboxProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId

  return (
    <label
      htmlFor={inputId}
      className={cn(
        // group/label → group-hover/label: applies to children on label hover
        "group/label inline-flex items-start gap-2 cursor-pointer select-none",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      {/*
        Checkbox.Root:
        - id → goes to the <span> (the focusable element); htmlFor on label links to it
        - Handles: Space key toggle, ARIA, indeterminate via internal inputRef
        - group/cb → enables group-focus-within/cb: on children for focus border color
      */}
      <CheckboxPrimitive.Root
        id={inputId}
        name={name}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onCheckedChange={(val) => onChange?.(val)}
        className={cn(
          "group/cb relative shrink-0 size-5 flex items-center justify-center mt-[1px]",
          // focus-visible:outline-none 只移除預設 outline；
          // ring 改由 inner 16×16 span 承接（緊貼 box，對齊 Figma）
          "focus:outline-none"
        )}
      >
        {/*
          16×16 visual box — handles all state styling via React props:
          - checked/indeterminate: primary-6 bg fill
          - unchecked: white bg + neutral-6 border
          - hover (via group-hover/label): primary-1 bg
          - focus border (via group-focus-visible/cb): primary-6 border
          - disabled: conditional classes (peer-* doesn't reach nested elements)
        */}
        <span
          className={cn(
            "size-4 rounded-[2px] flex items-center justify-center",
            checked || indeterminate
              ? cn(
                  "bg-primary-6",
                  disabled && "opacity-[0.48]",
                  // Focus ring on checked/indeterminate box（ring 緊貼 16×16，對齊 Figma）
                  !disabled && "group-focus-within/cb:ring-2 group-focus-within/cb:ring-primary-6/48"
                )
              : cn(
                  "border border-neutral-6",
                  disabled
                    ? "bg-neutral-5"
                    : [
                        "bg-white",
                        "group-hover/label:bg-primary-1",
                        // Focus：border 色 → primary-6 + ring-2 緊貼 box
                        "group-focus-within/cb:border-primary-6 group-focus-within/cb:bg-white",
                        "group-focus-within/cb:ring-2 group-focus-within/cb:ring-primary-6/48",
                      ]
                )
          )}
        >
          {/*
            Checkbox.Indicator renders only when checked or indeterminate.
            Without keepMounted (default), it unmounts when unchecked → nothing shown.
          */}
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            {indeterminate ? <DashIcon /> : <CheckIcon />}
          </CheckboxPrimitive.Indicator>
        </span>
      </CheckboxPrimitive.Root>

      {/* Label text */}
      {(label || subLabel) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className={cn(
              "text-sm font-normal leading-5",
              disabled ? "text-neutral-6" : "text-neutral-8"
            )}>
              {label}
            </span>
          )}
          {subLabel && (
            <span className={cn(
              "text-xs font-normal leading-4",
              disabled ? "text-neutral-6" : "text-neutral-7"
            )}>
              {subLabel}
            </span>
          )}
        </span>
      )}
    </label>
  )
}
