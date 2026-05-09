"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { FormLabel, FormFeedback, type FeedbackType, type InputState } from "./input"

// ─── FormTextarea ─────────────────────────────────────────────────────────────
// ZeroHeight: https://zeroheight.com/8ei12wwuw/p/04bfc5-form-/b/271a1c
//
// Spec（對照 ul Textarea + Figma node 1-32904）：
//   Min height: 76px | Padding: 10px vertical, 12px horizontal
//   Border: 1px neutral-6 | Focus: 2px primary-6
//   Error: 1px danger-6 | Warning: 1px warning-6
//   Disabled: bg neutral-4, text neutral-7, cursor-not-allowed
//   Character count: 12px / neutral-7；error 時改 danger-6
//   Scrollbar: 6px, track neutral-3, thumb neutral-5（hover neutral-6）
//   Resize: vertical（`autoHeight` 時關閉）
//
// ⚠️ ul 差異：
//   - ul `onChange` 必填；wp 選填（TextareaHTMLAttributes 繼承）
//   - ul 有 `min/max`（數字限制）；wp 用 `maxLength`
//   - ul 有 `rows` / wp 也有（透過 HTMLTextarea 繼承）
//   - ul 不支援 `state` prop（只有 error object）；wp 統一用 InputState

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, ""> {
  label?: string
  state?: InputState
  feedback?: string
  helper?: string
  maxLength?: number
  showCount?: boolean
  /** 高度隨內容自動增長（關閉 resize，overflow-y: hidden）。對應 ul 的 autoHeight */
  autoHeight?: boolean
  containerClassName?: string
}

export function Textarea({
  label,
  state = "default",
  feedback,
  helper,
  maxLength,
  showCount,
  autoHeight = false,
  containerClassName,
  className,
  id,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps & { defaultValue?: string }) {
  const textareaId = id ?? React.useId()
  const isDisabled = disabled || state === "disabled"

  // Controlled / uncontrolled 統一
  const [internalValue, setInternalValue] = React.useState<string>(
    value !== undefined ? String(value) : defaultValue ?? ""
  )
  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue
  const charCount = String(currentValue).length

  // autoHeight：textarea ref 用於動態調整高度
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => {
    if (!autoHeight || !textareaRef.current) return
    const el = textareaRef.current
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }, [currentValue, autoHeight])

  // ring 代替 border：box-shadow 不影響 box model，不會有 focus 時的 layout shift
  // ring-1（1px）→ focus-within:ring-2（2px）不改變元素外框大小
  const borderClass: Record<InputState, string> = {
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

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!controlled) setInternalValue(e.target.value)
    onChange?.(e)
  }

  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      {label && <FormLabel htmlFor={textareaId}>{label}</FormLabel>}

      <div
        className={cn(
          "rounded-[4px] bg-white",
          borderClass[state],
          isDisabled && "bg-neutral-4 cursor-not-allowed"
        )}
      >
        <textarea
          {...props}
          ref={textareaRef}
          id={textareaId}
          value={controlled ? value : internalValue}
          disabled={isDisabled}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            "block w-full min-h-[76px] bg-transparent outline-none",
            // Resize：autoHeight 時 none（高度由 JS 控制）
            autoHeight ? "resize-none overflow-y-hidden" : "resize-y",
            "text-sm font-normal leading-5",
            "text-neutral-8 placeholder:text-neutral-6",
            "px-3 py-[10px]",
            // Scrollbar（對齊 ul：6px, track neutral-3, thumb neutral-5 → hover neutral-6）
            "[&::-webkit-scrollbar]:w-1.5",
            "[&::-webkit-scrollbar-track]:bg-neutral-3 [&::-webkit-scrollbar-track]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-neutral-5 [&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb:hover]:bg-neutral-6",
            // Firefox scrollbar（對齊 ul）
            "[scrollbar-width:thin] [scrollbar-color:theme(colors.neutral.5)_theme(colors.neutral.3)]",
            isDisabled && "text-neutral-7 cursor-not-allowed",
            className
          )}
        />

        {/* 字數計 — error 時顯示 danger-6（對齊 ul MinMaxBlock） */}
        {(showCount || maxLength) && (
          <div className="flex justify-end px-3 pb-[6px]">
            <span
              className={cn(
                "text-xs font-normal leading-4",
                state === "error" ? "text-danger-6" : "text-neutral-7"
              )}
            >
              {maxLength ? `${charCount} / ${maxLength}` : charCount}
            </span>
          </div>
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
