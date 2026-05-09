"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

// ─── Popover ──────────────────────────────────────────────────────────────────
// Figma node 1234-14786
//
// Panel: bg #fafafa, 1px #bfbfbf border, 4px radius, shadow 0 2px 4px rgba(0,0,0,0.16)
//   padding 12px, gap 8px, flex-col
//   no-image: 224px mobile / 320px desktop
//   with-image: 320px mobile / 380px desktop
//
// Content: Noto Sans TC 400 14px/20px #595959
// Link:    Noto Sans TC 500 14px/20px #1e9fd2, underline
// Image:   full-width, 167px mobile / 200px desktop, object-cover
//
// Trigger: white bg, 1px #1e9fd2 border — open: 2px border
// Placement: bottom-right | bottom-center | bottom-left |
//            top-right    | top-center    | top-left
// Gap to trigger: 4px
// Dismiss: click outside

// ─── Static panel (for showcase) ─────────────────────────────────────────────

export interface PopoverPanelProps {
  content: React.ReactNode
  link?: { label: string; href?: string; onClick?: () => void }
  imageSrc?: string
  className?: string
}

export function PopoverPanel({ content, link, imageSrc, className }: PopoverPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-3 rounded-[4px]",
        "bg-[#fafafa] border border-[#bfbfbf]",
        "shadow-[0_2px_4px_rgba(0,0,0,0.16)]",
        "overflow-hidden",
        // Width: 224px mobile / 320px desktop (no image)
        // Width: 320px mobile / 380px desktop (with image)
        imageSrc ? "w-[320px] sm:w-[380px]" : "w-[224px] sm:w-[320px]",
        className
      )}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="w-full h-[167px] sm:h-[200px] object-cover rounded-[2px]"
        />
      )}
      <p className="text-sm font-normal leading-5 text-[#595959] break-words">
        {content}
      </p>
      {link && (
        <a
          href={link.href ?? "#"}
          onClick={link.onClick}
          className="text-sm font-medium leading-5 text-[#1e9fd2] underline w-fit"
        >
          {link.label}
        </a>
      )}
    </div>
  )
}

// ─── Popover with trigger ─────────────────────────────────────────────────────

export type Placement =
  | "bottom-right" | "bottom-center" | "bottom-left"
  | "top-right"    | "top-center"    | "top-left"

export interface PopoverProps {
  content: React.ReactNode
  link?: { label: string; href?: string; onClick?: () => void }
  imageSrc?: string
  placement?: Placement
  children: React.ReactNode
  className?: string
}

const GAP = 4

export function Popover({
  content,
  link,
  imageSrc,
  placement = "bottom-right",
  children,
  className,
}: PopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [style, setStyle] = React.useState<React.CSSProperties>({})
  const triggerRef = React.useRef<HTMLSpanElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const compute = React.useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const css: React.CSSProperties = { position: "fixed", zIndex: 200 }

    // Vertical
    const [vert] = placement.split("-") as ["top" | "bottom", string]
    if (vert === "bottom") {
      css.top = r.bottom + GAP
    } else {
      css.bottom = window.innerHeight - r.top + GAP
    }

    // Horizontal
    const horiz = placement.split("-")[1] as "left" | "center" | "right"
    if (horiz === "right") {
      css.left = r.left
    } else if (horiz === "center") {
      css.left = r.left + r.width / 2
      css.transform = "translateX(-50%)"
    } else {
      css.right = window.innerWidth - r.right
    }

    setStyle(css)
  }, [placement])

  // Click outside to close
  React.useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !panelRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  // Reposition on scroll/resize
  React.useEffect(() => {
    if (!open) return
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)
    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [open, compute])

  function toggle() {
    if (!open) compute()
    setOpen(v => !v)
  }

  return (
    <>
      <span ref={triggerRef} className={cn("inline-flex", className)}>
        {/* Clone child to inject open state styling */}
        <span onClick={toggle} className="inline-flex cursor-pointer">
          {children}
        </span>
      </span>

      {mounted && open && createPortal(
        <div
          ref={panelRef}
          style={{ ...style, pointerEvents: "auto" }}
          className="animate-[tooltip-in_0.15s_ease-out]"
        >
          <PopoverPanel content={content} link={link} imageSrc={imageSrc} />
        </div>,
        document.body
      )}
    </>
  )
}

// ─── Default trigger button ───────────────────────────────────────────────────

export interface PopoverTriggerProps {
  label: string
  open?: boolean
  className?: string
}

export function PopoverTrigger({ label, open = false, className }: PopoverTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-8 px-3 rounded-[4px] bg-white text-sm font-medium text-[#1e9fd2]",
        "transition-all",
        "focus:outline-none",
        open
          ? "ring-2 ring-[#1e9fd2] border border-[#1e9fd2]"
          : "border border-[#1e9fd2] hover:bg-[#1e9fd2]/[0.08]"
      )}
    >
      {label}
    </button>
  )
}
