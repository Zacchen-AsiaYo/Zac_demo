"use client"

// ─── Number Picker ─────────────────────────────────────────────────────────────
// Primitive : @base-ui/react/number-field
// ZeroHeight: https://zeroheight.com/8ei12wwuw/p/8534fb-number-picker
//
// Spec (confirmed from ZeroHeight + Figma SVG):
//   Structure : Icon button (−) | Text Input | Icon button (+)
//   Gap       : 8px between elements
//   Desktop   : all elements 40×40px
//   Mobile    : all elements 48×48px
//   Input     : `inputmode="numeric"` — triggers numeric keyboard on mobile
//   Buttons   : primary outline IconButton
//   Disabled  : buttons → opacity 0.48 / input → neutral-4 bg, neutral-7 text
//
// Note: "plain" (room-picker) variant removed — deprecated per Figma spec.
// ─────────────────────────────────────────────────────────────────────────────

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { cn } from "@/lib/utils"
import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"

// ─── Icons ────────────────────────────────────────────────────────────────────

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── NumberPicker ─────────────────────────────────────────────────────────────

export interface NumberPickerProps {
  value: number
  min?: number
  max?: number
  /** Step size per increment/decrement. Defaults to 1. */
  step?: number
  onChange?: (value: number) => void
  disabled?: boolean
  /** HTML name attribute — useful when inside a <form> */
  name?: string
  className?: string
  "aria-label"?: string
}

export function NumberPicker({
  value,
  min = 0,
  max = 99,
  step = 1,
  onChange,
  disabled = false,
  name,
  className,
  "aria-label": ariaLabel,
}: NumberPickerProps) {
  return (
    <NumberFieldPrimitive.Root
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={(v) => onChange?.(v ?? value)}
      aria-label={ariaLabel}
    >
      <NumberFieldPrimitive.Group
        className={cn(
          "inline-flex items-center gap-2",
          className
        )}
      >
        {/* Decrement button */}
        <NumberFieldPrimitive.Decrement
          render={
            <IconButton
              variant="primary"
              appearance="outline"
              size="lg"
              className="sm:size-10"
              aria-label="減少"
            >
              <MinusIcon />
            </IconButton>
          }
        />

        {/* Number input — actual <input>, not <div> */}
        <NumberFieldPrimitive.Input
          name={name}
          inputMode="numeric"
          className={cn(
            // Mobile: 48px, Desktop: 40px — matches buttons
            "h-12 sm:h-10 w-12 sm:w-10 shrink-0 border",
            "text-center font-normal rounded-[4px]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-6/50",
            disabled
              ? "bg-neutral-4 border-neutral-6 text-neutral-7 cursor-not-allowed"
              : "bg-white border-neutral-6 text-neutral-8"
          )}
        />

        {/* Increment button */}
        <NumberFieldPrimitive.Increment
          render={
            <IconButton
              variant="primary"
              appearance="outline"
              size="lg"
              className="sm:size-10"
              aria-label="增加"
            >
              <PlusIcon />
            </IconButton>
          }
        />
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  )
}

// ─── NumberPickerRow (label + stepper) ────────────────────────────────────────

export interface NumberPickerRowProps {
  label: string
  annotation?: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  disabled?: boolean
  name?: string
  className?: string
}

export function NumberPickerRow({
  label,
  annotation,
  value,
  min,
  max,
  step,
  onChange,
  disabled,
  name,
  className,
}: NumberPickerRowProps) {
  return (
    <div className={cn("flex flex-row items-center gap-4", className)}>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-normal leading-5 text-neutral-10">{label}</span>
        {annotation && (
          <span className="text-sm font-normal leading-5 text-neutral-7">{annotation}</span>
        )}
      </div>
      <NumberPicker
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
    </div>
  )
}
