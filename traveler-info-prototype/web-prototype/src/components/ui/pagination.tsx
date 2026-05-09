"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Pagination ───────────────────────────────────────────────────────────────
// Figma node 217-36014
//
// Item:  32×32px, 4px radius, 14px/400
//   enable:  transparent bg, #595959 text
//   current: #1e9fd2 bg, #fff text
//   hover:   rgba(89,89,89,0.16) bg
//   active:  rgba(89,89,89,0.32) bg
//   focus:   2px solid #595959 outline
//
// Arrow: 32×32px, 8px padding, 16×16 chevron
//   disabled: #bfbfbf icon
//
// Ellipsis: ··· non-interactive, same base style
// Gap: 8px between items
// Responsive: ≥375px → 7 page slots | <375px → 5 page slots
// Optional results text below (gap 4px)

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M10 12 6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PaginationItem({
  page,
  current,
  onClick,
}: {
  page: number
  current: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      aria-label={`第 ${page} 頁`}
      className={cn(
        "w-8 h-8 rounded-[4px] flex items-center justify-center text-sm font-normal",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#595959]",
        current
          ? "bg-[#1e9fd2] text-white"
          : "text-[#595959] hover:bg-[#595959]/[0.16] active:bg-[#595959]/[0.32] cursor-pointer"
      )}
    >
      {page}
    </button>
  )
}

function PaginationEllipsis() {
  return (
    <span
      aria-hidden
      className="w-8 h-8 rounded-[4px] flex items-center justify-center text-sm text-[#595959] select-none"
    >
      ···
    </span>
  )
}

function PaginationArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next"
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "上一頁" : "下一頁"}
      className={cn(
        "w-8 h-8 rounded-[4px] flex items-center justify-center p-2",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#595959]",
        disabled
          ? "text-[#bfbfbf] cursor-not-allowed"
          : "text-[#595959] hover:bg-[#595959]/[0.16] active:bg-[#595959]/[0.32] cursor-pointer"
      )}
    >
      {direction === "prev"
        ? <ChevronLeft className="w-4 h-4" />
        : <ChevronRight className="w-4 h-4" />}
    </button>
  )
}

// ─── Page slot computation ─────────────────────────────────────────────────────

function getPages(page: number, total: number, slots: number): (number | "ellipsis")[] {
  if (total <= slots) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (slots === 5) {
    if (page <= 3)        return [1, 2, 3, "ellipsis", total]
    if (page >= total - 2) return [1, "ellipsis", total - 2, total - 1, total]
    return [1, "ellipsis", page, "ellipsis", total]
  }

  // slots === 7
  if (page <= 4)        return [1, 2, 3, 4, 5, "ellipsis", total]
  if (page >= total - 3) return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total]
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", total]
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  /** Optional results summary line, e.g. "第 1-21 筆，共 275 筆住宿" */
  resultsText?: string
  className?: string
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  resultsText,
  className,
}: PaginationProps) {
  const pages5 = getPages(page, totalPages, 5)
  const pages7 = getPages(page, totalPages, 7)

  const renderRow = (pages: (number | "ellipsis")[]) => (
    <div className="flex flex-row gap-2">
      <PaginationArrow
        direction="prev"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      />
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <PaginationEllipsis key={`ell-${i}`} />
        ) : (
          <PaginationItem
            key={p}
            page={p}
            current={p === page}
            onClick={() => onPageChange(p)}
          />
        )
      )}
      <PaginationArrow
        direction="next"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </div>
  )

  return (
    <nav aria-label="分頁" className={cn("inline-flex flex-col gap-1", className)}>
      {/* < 375px: 5 page slots */}
      <div className="flex min-[375px]:hidden">
        {renderRow(pages5)}
      </div>
      {/* ≥ 375px: 7 page slots */}
      <div className="hidden min-[375px]:flex">
        {renderRow(pages7)}
      </div>
      {resultsText && (
        <p className="text-sm font-normal text-[#595959]">{resultsText}</p>
      )}
    </nav>
  )
}
