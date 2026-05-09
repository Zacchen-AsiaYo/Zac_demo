"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

// ─── Flash Notice ─────────────────────────────────────────────────────────────
// Black toast-style notification.
//
// Figma / ZeroHeight specs:
//   bg: #000000 | border-radius: 4px | padding: 16px all sides
//   Desktop: w-280px, title 16px/500, body 14px/400
//   Mobile:  w-220px, title 14px/400, body 12px/400
//   Gap between title and body: 8px
//   Body may contain an optional inline link (color: primary-6, fw-500)
//
// Positioning: fixed bottom-left, 16px from bottom and left edge.
//
// ZeroHeight spec:
//   - 畫面只會存在一個 Flash Notice（新的取代舊的，不推疊）
//   - link 不可單獨使用（必須搭配 body）
//   - 定位：左下角，distance 16px from bottom and left

// ─── Visual component ─────────────────────────────────────────────────────────

export interface FlashNoticeLink {
  label: string
  href?: string
  onClick?: () => void
}

export interface FlashNoticeProps {
  title: string
  /** Plain text that appears before the link (optional) */
  body?: string
  /**
   * Inline link rendered after body text (optional).
   * ⚠️ ZeroHeight Dos & Don'ts: link 不可單獨使用，必須搭配 body。
   */
  link?: FlashNoticeLink
  /** Plain text appended after the link, e.g. "。" */
  suffix?: string
  className?: string
}

export function FlashNotice({
  title,
  body,
  link,
  suffix,
  className,
}: FlashNoticeProps) {
  const hasBody = body || link

  return (
    <div
      data-slot="flash-notice"
      className={cn(
        "rounded-[4px] bg-black",
        // Desktop: px-4 py-4 | Mobile: px-4 py-2
        // Padding: 16px all sides (ZeroHeight spec)
        "p-4",
        // Width: fixed 220px mobile | 280px desktop (ZeroHeight + ul spec)
        "w-[220px] sm:w-[280px]",
        className
      )}
    >
      {/* Title: Mobile 14px/400 | Desktop 16px/500 */}
      <p
        className={cn(
          "text-white leading-5 sm:leading-6",
          "text-sm font-normal sm:text-base sm:font-medium"
        )}
      >
        {title}
      </p>

      {/* Body + optional link */}
      {hasBody && (
        <p className="mt-2 text-xs leading-4 sm:text-sm sm:leading-5">
          {body && (
            <span className="text-white font-normal">{body}</span>
          )}
          {link && (
            link.href ? (
              <a
                href={link.href}
                className="text-primary-6 font-medium hover:underline"
              >
                {link.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={link.onClick}
                className="text-primary-6 font-medium hover:underline focus-visible:outline-none"
              >
                {link.label}
              </button>
            )
          )}
          {suffix && (
            <span className="text-white font-normal">{suffix}</span>
          )}
        </p>
      )}
    </div>
  )
}

// ─── Toast system ─────────────────────────────────────────────────────────────
// ZeroHeight: 畫面只會存在一個 Flash Notice，新的取代舊的，不推疊。

export interface ToastOptions extends FlashNoticeProps {
  id?: string
  duration?: number
}

interface ToastItem extends Required<Pick<ToastOptions, "id">> {
  props: FlashNoticeProps
  duration: number
}

interface FlashNoticeContextValue {
  show: (options: ToastOptions) => string
  dismiss: (id?: string) => void
}

const FlashNoticeContext = React.createContext<FlashNoticeContextValue | null>(null)

let _idCounter = 0
function nextId() { return `fn-${++_idCounter}` }

export function FlashNoticeProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<ToastItem | null>(null)
  const [mounted, setMounted] = React.useState(false)
  // Single timer ref — cancels the previous dismiss when a new notice arrives
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => { setMounted(true) }, [])

  const dismiss = React.useCallback((_id?: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setToast(null)
  }, [])

  const show = React.useCallback((options: ToastOptions): string => {
    const id = options.id ?? nextId()
    const duration = options.duration ?? 3000
    const { id: _id, duration: _dur, ...props } = options

    // Cancel any in-flight auto-dismiss
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // Single-instance: replace the current notice
    setToast({ id, props, duration })

    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        setToast(null)
        timerRef.current = null
      }, duration)
    }

    return id
  }, [])

  return (
    <FlashNoticeContext.Provider value={{ show, dismiss }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          aria-atomic="true"
          className="fixed bottom-4 left-4 z-[100] flex flex-col items-start pointer-events-none"
        >
          {toast && (
            <div
              key={toast.id}
              className="pointer-events-auto animate-[flash-notice-in_0.25s_ease-out]"
            >
              <FlashNotice {...toast.props} />
            </div>
          )}
        </div>,
        document.body
      )}
    </FlashNoticeContext.Provider>
  )
}

export function useFlashNotice() {
  const ctx = React.useContext(FlashNoticeContext)
  if (!ctx) throw new Error("useFlashNotice must be used within FlashNoticeProvider")
  return ctx
}
