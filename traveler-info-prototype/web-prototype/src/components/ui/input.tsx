"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Icons ────────────────────────────────────────────────────────────────────

function TimesCircleSmIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      {/* fill currentColor, stroke matches input bg（white）→ 切出效果 */}
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path d="M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function ExclamationCircleIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── FormLabel ────────────────────────────────────────────────────────────────

export interface FormLabelProps {
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

export function FormLabel({ htmlFor, children, className }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-normal leading-5 text-neutral-7", className)}
    >
      {children}
    </label>
  )
}

// ─── FormFeedback ─────────────────────────────────────────────────────────────

export type FeedbackType = "error" | "warning" | "success"

export interface FormFeedbackProps {
  type: FeedbackType
  message: string
  className?: string
}

export function FormFeedback({ type, message, className }: FormFeedbackProps) {
  const colorMap: Record<FeedbackType, string> = {
    error:   "text-danger-6",
    warning: "text-warning-6",
    success: "text-success-6",
  }
  const IconMap: Record<FeedbackType, React.FC<{ className?: string }>> = {
    error:   ExclamationCircleIcon,
    warning: ExclamationCircleIcon,
    success: CheckCircleIcon,
  }
  const Icon = IconMap[type]

  return (
    <div className={cn("flex items-center gap-1 h-4", colorMap[type], className)}>
      <Icon className="shrink-0" />
      <span className="text-xs leading-4 font-normal">{message}</span>
    </div>
  )
}

// ─── FormInput ────────────────────────────────────────────────────────────────
// Figma node 1-32904 — forms / input
//   Height: 40px | border-radius: 4px
//   Padding: 10px vertical, 8px horizontal
//   Border（用 ring 實作，避免 focus 切換時的 layout shift）：
//     Default: ring-1 neutral-6 | Focus: ring-2 primary-6
//     Error: ring-1 danger-6 | Warning: ring-1 warning-6
//   Disabled: bg neutral-4, text neutral-7, cursor-not-allowed

export type InputState = "default" | "error" | "warning" | "success" | "disabled"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string
  state?: InputState
  feedback?: string
  helper?: string
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  containerClassName?: string
}

export function Input({
  label,
  state = "default",
  feedback,
  helper,
  prefixIcon,
  suffixIcon,
  clearable,
  onClear,
  containerClassName,
  className,
  id,
  disabled,
  value,
  ...props
}: InputProps) {
  const inputId = id ?? React.useId()
  const isDisabled = disabled || state === "disabled"

  // ring 代替 border：box-shadow 不影響 box model，ring-1→ring-2 切換不會有 layout shift
  const ringClass: Record<InputState, string> = {
    default:  "ring-1 ring-neutral-6 focus-within:ring-2 focus-within:ring-primary-6",
    error:    "ring-1 ring-danger-6",
    warning:  "ring-1 ring-warning-6",
    success:  "ring-1 ring-neutral-6",
    disabled: "ring-1 ring-neutral-6",
  }

  const feedbackType: FeedbackType | undefined =
    state === "error"   ? "error"   :
    state === "warning" ? "warning" :
    state === "success" ? "success" : undefined

  const showClear = clearable && value !== undefined && value !== "" && !isDisabled

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}

      <div
        className={cn(
          "flex items-center h-10 rounded-[4px] bg-white px-2 gap-2",
          ringClass[state],
          isDisabled && "bg-neutral-4 cursor-not-allowed"
        )}
      >
        {prefixIcon && (
          <span className="shrink-0 size-6 flex items-center justify-center text-neutral-7">
            {prefixIcon}
          </span>
        )}

        <input
          {...props}
          id={inputId}
          value={value}
          disabled={isDisabled}
          className={cn(
            "flex-1 min-w-0 h-full bg-transparent outline-none",
            "text-sm font-normal leading-5",
            "text-neutral-8 placeholder:text-neutral-6",
            isDisabled && "text-neutral-7 cursor-not-allowed",
            className
          )}
        />

        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="-my-2 py-2 shrink-0 text-neutral-8 cursor-pointer focus-visible:outline-none"
            aria-label="清除"
          >
            <TimesCircleSmIcon />
          </button>
        )}

        {suffixIcon && !showClear && (
          <span className="shrink-0 size-6 flex items-center justify-center text-neutral-7">
            {suffixIcon}
          </span>
        )}
      </div>

      {feedbackType && feedback && (
        <FormFeedback type={feedbackType} message={feedback} />
      )}

      {helper && (
        <span className="text-xs font-normal leading-4 text-neutral-7">{helper}</span>
      )}
    </div>
  )
}
