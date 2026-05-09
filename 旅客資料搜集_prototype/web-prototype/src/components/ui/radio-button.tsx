"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"

// ─── RadioGroup ───────────────────────────────────────────────────────────────
// Primitive: @base-ui/react/radio-group
//
// Provides shared state + keyboard navigation (arrow keys) for Radio items.
// Must wrap all RadioButton components that belong to the same group.

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      disabled={disabled}
      className={className}
    >
      {children}
    </RadioGroupPrimitive>
  )
}

// ─── RadioButton ──────────────────────────────────────────────────────────────
// Primitive: @base-ui/react/radio (Radio.Root + Radio.Indicator)
//
// Radio.Root renders:
//   - <span tabIndex={0}> with id → the interactive focusable element
//   - hidden <input type="radio" tabIndex={-1} aria-hidden> → form submission
//
// Must be used inside <RadioGroup>.
//
// Accessibility handled by primitive:
//   - role="radio", aria-checked, aria-disabled
//   - Arrow key navigation managed by RadioGroup
//   - Space/Click to select
//
// Figma states (Figma SVG):
//   Unchecked default:   white bg, neutral-6 border (1px)
//   Unchecked hover:     primary-1 bg
//   Unchecked disabled:  neutral-5 bg, neutral-6 border
//   Unchecked focus:     primary-6 border + outer ring-2 ring-primary-6/48
//   Checked:             white bg, primary-6 border + primary-6 inner dot
//   Checked disabled:    opacity-[0.48]
//   Checked focus:       checked + outer ring
//
// ⚠️ ul 差異：
//   - ul RadioButton 是獨立的（有 checked + onChange + name prop）
//   - wp RadioButton 必須在 RadioGroup 內，value 由 RadioGroup 管理
//   - ul onChange 回傳 ChangeEvent；wp 由 RadioGroup.onValueChange 處理

export interface RadioButtonProps {
  /** The unique value of this radio in the group. */
  value: string
  disabled?: boolean
  label?: string
  subLabel?: string
  className?: string
  id?: string
}

export function RadioButton({
  value,
  disabled = false,
  label,
  subLabel,
  className,
  id,
}: RadioButtonProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId

  return (
    <label
      htmlFor={inputId}
      className={cn(
        // group/label → group-hover/label: for hover bg on the circle
        "group/label inline-flex items-start gap-2 cursor-pointer select-none",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      {/*
        Radio.Root:
        - id → goes to the <span> (focusable element); htmlFor on label links to it
        - Handles: ARIA, keyboard (Space/Click to select; arrow keys via RadioGroup)
        - group/rb → enables group-focus-within/rb: on children for focus border
      */}
      <RadioPrimitive.Root
        id={inputId}
        value={value}
        disabled={disabled}
        className={cn(
          "group/rb relative shrink-0 size-5 flex items-center justify-center mt-[1px]",
          // focus-visible:outline-none 移除預設 outline；
          // ring 由 inner 16×16 span 承接（緊貼 circle，對齊 Figma）
          "focus:outline-none"
        )}
      >
        {/*
          Base 16×16 circle — always visible.
          When radio is SELECTED, the Indicator (absolute positioned) overlays it.
        */}
        <span
          className={cn(
            "size-4 rounded-full border",
            disabled
              ? "bg-neutral-5 border-neutral-6"
              : [
                  "bg-white border-neutral-6",
                  "group-hover/label:bg-primary-1",
                  // Focus：border → primary-6 + ring-2 緊貼 circle（對齊 Figma）
                  "group-focus-within/rb:border-primary-6 group-focus-within/rb:bg-white",
                  "group-focus-within/rb:ring-2 group-focus-within/rb:ring-primary-6/48",
                ]
          )}
        />

        {/*
          Radio.Indicator — renders only when this Radio is selected.
          Absolutely positioned to overlay the base circle completely.
        */}
        <RadioPrimitive.Indicator
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={cn(
              "size-4 rounded-full border border-primary-6 bg-white",
              "flex items-center justify-center",
              disabled && "opacity-[0.48]",
              // Focus ring on checked state（Indicator overlays base circle）
              !disabled && "group-focus-within/rb:ring-2 group-focus-within/rb:ring-primary-6/48"
            )}
          >
            <span className="size-2 rounded-full bg-primary-6" />
          </span>
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>

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
