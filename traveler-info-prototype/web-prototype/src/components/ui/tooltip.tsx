"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

// ─── Tooltip ──────────────────────────────────────────────────────────────────
// Figma node 1-14221
//
// Bubble:
//   bg: rgba(0,0,0,0.8) | padding: 4px all | border-radius: 4px
//   text: white, 12px/400/lh-16px, centered
//   min-w: 24px | max-w: 320px desktop / 224px mobile
//
// Beak (CSS triangle, 8×4px, same bg color):
//   side=top    → beak below bubble (points down toward trigger)
//   side=bottom → beak above bubble (points up toward trigger)
//   beak=center → horizontally centered
//   beak=start  → 8px from near edge (left for top/bottom)
//   beak=end    → 8px from far edge (right for top/bottom)
//
// Trigger: show on hover + focus, hide on leave + blur
// Animation: fade in 150ms

// ─── Beak triangles ───────────────────────────────────────────────────────────

function BeakDown() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 0,
        height: 0,
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: "4px solid rgba(0,0,0,0.8)",
      }}
    />
  )
}

function BeakUp() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 0,
        height: 0,
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderBottom: "4px solid rgba(0,0,0,0.8)",
      }}
    />
  )
}

// ─── Bubble + beak assembly ───────────────────────────────────────────────────

interface BubbleProps {
  content: React.ReactNode
  side: "top" | "bottom"
  beak: "center" | "start" | "end"
  textAlign?: "center" | "left" | "right"
}

function TooltipBubble({ content, side, beak, textAlign }: BubbleProps) {
  const resolvedAlign = textAlign ?? (beak === "start" ? "left" : beak === "end" ? "right" : "center")

  const beakContainer = (
    <div
      style={{
        display: "flex",
        justifyContent:
          beak === "center" ? "center" : beak === "start" ? "flex-start" : "flex-end",
        paddingLeft: beak === "start" ? 8 : 0,
        paddingRight: beak === "end" ? 8 : 0,
      }}
    >
      {side === "top" ? <BeakDown /> : <BeakUp />}
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {side === "bottom" && beakContainer}
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          borderRadius: 4,
          padding: 4,
          minWidth: 24,
          maxWidth: "min(320px, 90vw)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: "16px",
          textAlign: resolvedAlign,
          whiteSpace: "pre-line",
          wordBreak: "break-word",
        }}
      >
        {content}
      </div>
      {side === "top" && beakContainer}
    </div>
  )
}

// ─── Tooltip wrapper ──────────────────────────────────────────────────────────

export interface TooltipProps {
  content: React.ReactNode
  side?: "top" | "bottom"
  beak?: "center" | "start" | "end"
  textAlign?: "center" | "left" | "right"
  children: React.ReactNode
  className?: string
}

export function Tooltip({
  content,
  side = "top",
  beak = "center",
  textAlign,
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false)
  const [style, setStyle] = React.useState<React.CSSProperties>({})
  const triggerRef = React.useRef<HTMLSpanElement>(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const GAP = 4

  const compute = React.useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()

    // Horizontal: compute left of tooltip based on beak position
    // beak=center → center of trigger = left anchor for -translate-x-1/2
    // beak=start  → beak is 8px+4px=12px from left of bubble → left = trigger-center - 12
    // beak=end    → beak is 8px+4px=12px from right of bubble → we use right-anchor
    let cssStyle: React.CSSProperties = { position: "fixed", zIndex: 200 }

    if (side === "top") {
      cssStyle.bottom = window.innerHeight - r.top + GAP
    } else {
      cssStyle.top = r.bottom + GAP
    }

    if (beak === "center") {
      cssStyle.left = r.left + r.width / 2
      cssStyle.transform = "translateX(-50%)"
    } else if (beak === "start") {
      // Align so beak (at 8px from left) sits under trigger center
      cssStyle.left = r.left + r.width / 2 - 12
    } else {
      // beak=end: align so beak (at 8px from right) sits under trigger center
      cssStyle.right = window.innerWidth - r.right - r.width / 2 - 12
    }

    setStyle(cssStyle)
  }, [side, beak])

  const show = () => { compute(); setVisible(true) }
  const hide = () => setVisible(false)

  React.useEffect(() => {
    if (!visible) return
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [visible, compute])

  const id = React.useId()

  return (
    <>
      <span
        ref={triggerRef}
        className={cn("inline-flex", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={visible ? id : undefined}
      >
        {children}
      </span>

      {mounted && visible && createPortal(
        <div
          id={id}
          role="tooltip"
          style={{ ...style, pointerEvents: "none" }}
          className="animate-[tooltip-in_0.15s_ease-out]"
        >
          <TooltipBubble content={content} side={side} beak={beak} textAlign={textAlign} />
        </div>,
        document.body
      )}
    </>
  )
}

// ─── Static variant for showcase ─────────────────────────────────────────────

export interface TooltipStaticProps {
  content: React.ReactNode
  side?: "top" | "bottom"
  beak?: "center" | "start" | "end"
  textAlign?: "center" | "left" | "right"
  className?: string
}

export function TooltipStatic({ content, side = "top", beak = "center", textAlign, className }: TooltipStaticProps) {
  return (
    <div className={cn("inline-flex flex-col", className)}>
      <TooltipBubble content={content} side={side} beak={beak} textAlign={textAlign} />
    </div>
  )
}
