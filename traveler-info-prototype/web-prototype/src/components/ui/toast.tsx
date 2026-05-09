"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Toast ────────────────────────────────────────────────────────────────────
// Figma node 590-40170
//
// Structured notification with icon, title, optional body, optional actions,
// and a close button. Stacks vertically with 8px gap.
//
// States (border + bg + icon color):
//   primary: bg #f0fdff, border #1e9fd2, icon #1e9fd2
//   warning: bg #fffce6, border #ffb300, icon #ffb300
//   error:   bg #fff3eb, border #f4511e, icon #f4511e
//
// Layout: horizontal flex, no border-radius
//   Icon zone:    40px desktop / 36px mobile, pt-4 pl-4
//   Content zone: flex-1, py-4, gap-4 (text 8px gap, buttons 8px gap)
//   Close zone:   52px, p-1 (except left=0)
//
// Typography:
//   Title:  16px/500/24px desktop | 14px/500/20px mobile | #595959
//   Body:   14px/400/20px | #8c8c8c
//   Button: 14px/500/20px
//
// Shadow: 0 4px 8px rgba(0,0,0,0.16)
// Auto-dismiss: 5000ms default, paused on hover
// Animation: slide-in 500ms

// ─── Icons ────────────────────────────────────────────────────────────────────

function InfoCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ExclamationCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TimesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── State config ─────────────────────────────────────────────────────────────

export type ToastState = "primary" | "warning" | "error"

const stateConfig: Record<ToastState, {
  bg: string
  border: string
  iconColor: string
  Icon: React.FC<{ className?: string }>
  closeHover: string
}> = {
  primary: {
    bg:        "bg-primary-1",
    border:    "border-primary-6",
    iconColor: "text-primary-6",
    Icon:      InfoCircleIcon,
    closeHover:"hover:bg-primary-6/10",
  },
  warning: {
    bg:        "bg-warning-1",
    border:    "border-warning-6",
    iconColor: "text-warning-6",
    Icon:      ExclamationCircleIcon,
    closeHover:"hover:bg-warning-6/10",
  },
  error: {
    bg:        "bg-danger-1",
    border:    "border-danger-6",
    iconColor: "text-danger-6",
    Icon:      ExclamationCircleIcon,
    closeHover:"hover:bg-danger-6/10",
  },
}

// ─── Toast action button ───────────────────────────────────────────────────────

export interface ToastAction {
  label: string
  variant?: "primary" | "neutral"
  onClick: () => void
}

// ─── Toast visual component ────────────────────────────────────────────────────

export interface ToastProps {
  state?: ToastState
  title: string
  body?: string
  actions?: ToastAction[]
  onClose?: () => void
  autoDismiss?: boolean
  dismissDuration?: number
  className?: string
}

export function Toast({
  state = "primary",
  title,
  body,
  actions,
  onClose,
  autoDismiss = true,
  dismissDuration = 5000,
  className,
}: ToastProps) {
  const cfg = stateConfig[state]
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const startTimer = React.useCallback(() => {
    if (!autoDismiss || !onClose) return
    timerRef.current = setTimeout(onClose, dismissDuration)
  }, [autoDismiss, dismissDuration, onClose])

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  React.useEffect(() => {
    startTimer()
    return clearTimer
  }, [startTimer, clearTimer])

  return (
    <div
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      className={cn(
        // Root: horizontal flex, gap 8px, no border-radius, 1px inside border
        "flex flex-row gap-2",
        // Width: 343px mobile / 375px desktop
        "w-[343px] sm:w-[375px]",
        // State colours
        cfg.bg, "border", cfg.border,
        // Shadow
        "shadow-[0_4px_8px_rgba(0,0,0,0.16)]",
        // Animation
        "animate-[toast-in_0.5s_ease-out]",
        className
      )}
    >
      {/* Icon zone — 36px mobile / 40px desktop, pt-4 pl-4 */}
      <div className="shrink-0 flex flex-col pt-4 pl-4 w-9 sm:w-10">
        <cfg.Icon className={cn("shrink-0 size-5 sm:size-6", cfg.iconColor)} />
      </div>

      {/* Content zone — flex-1, py-4, gap-4 */}
      <div className="flex-1 min-w-0 flex flex-col py-4 gap-4">
        {/* Text block: title + optional body, gap-2 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm sm:text-base font-medium leading-5 sm:leading-6 text-[#595959]">
            {title}
          </p>
          {body && (
            <p className="text-sm font-normal leading-5 text-[#8c8c8c]">
              {body}
            </p>
          )}
        </div>

        {/* Action buttons: h-8, px-4 py-1.5, border, gap-2 */}
        {actions && actions.length > 0 && (
          <div className="flex flex-row gap-2">
            {actions.map((action, i) => (
              <Button
                key={i}
                variant={action.variant === "primary" ? "primary" : "neutral"}
                appearance="outline"
                size="sm"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Close button zone — 52px wide, p-1 (no left) */}
      <div className="shrink-0 flex flex-col pt-1 pr-1 pb-1 w-[52px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className={cn(
            "size-12 p-3 rounded-[4px] text-[#595959] transition-colors",
            cfg.closeHover
          )}
        >
          <TimesIcon className="size-6" />
        </button>
      </div>
    </div>
  )
}

// ─── Toast provider ────────────────────────────────────────────────────────────

export interface ToastOptions extends Omit<ToastProps, "onClose"> {
  id?: string
}

interface ToastItem extends Required<Pick<ToastOptions, "id">> {
  props: Omit<ToastProps, "onClose">
}

interface ToastContextValue {
  show: (options: ToastOptions) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

let _counter = 0
function nextId() { return `toast-${++_counter}` }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const dismiss = React.useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  const show = React.useCallback((options: ToastOptions): string => {
    const id = options.id ?? nextId()
    const { id: _id, ...props } = options
    setToasts(t => {
      const filtered = t.filter(x => x.id !== id)
      return [...filtered, { id, props }]
    })
    return id
  }, [])

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="assertive"
          aria-atomic="false"
          // Desktop: bottom-left | Mobile: bottom-center
          className="fixed z-50 bottom-4 inset-x-4 sm:inset-x-auto sm:left-4 flex flex-col gap-2 items-center sm:items-start pointer-events-none"
        >
          {toasts.map(toast => (
            <div key={toast.id} className="pointer-events-auto">
              <Toast
                {...toast.props}
                onClose={() => dismiss(toast.id)}
              />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}
