"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

// ─── DateRangePicker ──────────────────────────────────────────────────────────
// Figma canvas node 1-23743 (Date Picker 元件規範)
//
// Date cell: 40×40px, border-radius 16px, Noto Sans 500 14px
//   default:   #fff, #262626 text
//   hover:     #fff, 1px #0f7aab border
//   selected:  #0f7aab bg, #fff text
//   today:     #fff, 1px #d9d9d9 border
//   in-range:  #e6f5fb bg tint
//   disabled:  #fff, #bfbfbf text
//
// Day header: Noto Sans TC 400 14px #595959
// Month title: Noto Sans 700 16px #262626
// Calendar panel: 344px wide
// Desktop modal: two months side-by-side, 32px gap
// Mobile modal: single column, scrollable

// ─── Utilities ───────────────────────────────────────────────────────────────

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function isBetween(date: Date, start: Date, end: Date): boolean {
  const d = stripTime(date).getTime()
  return d > stripTime(start).getTime() && d < stripTime(end).getTime()
}

function buildGrid(year: number, month: number): Array<Date | null> {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const grid: Array<Date | null> = []
  for (let i = 0; i < first.getDay(); i++) grid.push(null)
  for (let d = 1; d <= last.getDate(); d++) grid.push(new Date(year, month, d))
  while (grid.length % 7 !== 0) grid.push(null)
  return grid
}

function monthLabel(year: number, month: number): string {
  return `${year} 年 ${String(month + 1).padStart(2, "0")} 月`
}

function dateLabel(d: Date): string {
  const dow = ["日", "一", "二", "三", "四", "五", "六"]
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const dt = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}/${m}/${dt} (${dow[d.getDay()]})`
}

function addMonths(year: number, month: number, delta: number): [number, number] {
  const d = new Date(year, month + delta, 1)
  return [d.getFullYear(), d.getMonth()]
}

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

function TimesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <rect x="2.5" y="3.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8.5h15M6.5 1.5v4M13.5 1.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Date Cell ────────────────────────────────────────────────────────────────

const DOW = ["日", "一", "二", "三", "四", "五", "六"]

interface CellProps {
  date: Date | null
  today: Date
  start: Date | null
  end: Date | null
  hover: Date | null
  onClick: (d: Date) => void
  onHover: (d: Date | null) => void
}

function DateCell({ date, today, start, end, hover, onClick, onHover }: CellProps) {
  if (!date) return <div className="w-10 h-10 shrink-0" />

  const isToday = isSameDay(date, today)
  const isStart = !!start && isSameDay(date, start)
  const isEnd = !!end && isSameDay(date, end)
  const isSelected = isStart || isEnd

  const rangeEnd = end ?? hover
  const inRange =
    !!start && !!rangeEnd &&
    stripTime(rangeEnd).getTime() > stripTime(start).getTime() &&
    isBetween(date, start, rangeEnd)

  return (
    <button
      type="button"
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "w-10 h-10 shrink-0 rounded-[16px]",
        "flex items-center justify-center",
        "text-sm font-medium leading-5 select-none",
        "transition-colors duration-100",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7aab]",
        inRange && !isSelected && "bg-[#e6f5fb]",
        isSelected
          ? "bg-[#0f7aab] text-white"
          : isToday
          ? "border border-[#d9d9d9] text-[#262626] hover:border-[#0f7aab]"
          : "text-[#262626] hover:border hover:border-[#0f7aab]"
      )}
    >
      {date.getDate()}
    </button>
  )
}

// ─── Month Panel ──────────────────────────────────────────────────────────────

interface MonthPanelProps {
  year: number
  month: number
  today: Date
  start: Date | null
  end: Date | null
  hover: Date | null
  onDateClick: (d: Date) => void
  onDateHover: (d: Date | null) => void
  showPrev?: boolean
  showNext?: boolean
  prevDisabled?: boolean
  nextDisabled?: boolean
  onPrev?: () => void
  onNext?: () => void
}

export function MonthPanel({
  year, month, today, start, end, hover,
  onDateClick, onDateHover,
  showPrev = true, showNext = true,
  prevDisabled, nextDisabled,
  onPrev, onNext,
}: MonthPanelProps) {
  const grid = buildGrid(year, month)
  const weeks: Array<Array<Date | null>> = []
  for (let i = 0; i < grid.length; i += 7) weeks.push(grid.slice(i, i + 7))

  return (
    <div className="flex flex-col w-[344px] shrink-0">
      {/* Nav row */}
      <div className="flex items-center h-10 mb-2">
        {showPrev ? (
          <button
            type="button"
            onClick={onPrev}
            disabled={prevDisabled}
            aria-label="上個月"
            className={cn(
              "w-10 h-10 shrink-0 rounded-[4px] flex items-center justify-center p-2 transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7aab]",
              prevDisabled
                ? "text-[#bfbfbf] cursor-not-allowed"
                : "text-[#595959] hover:bg-[#595959]/[0.16] active:bg-[#595959]/[0.32]"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-10 h-10 shrink-0" />
        )}
        <span className="flex-1 text-center text-base font-bold text-[#262626]">
          {monthLabel(year, month)}
        </span>
        {showNext ? (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            aria-label="下個月"
            className={cn(
              "w-10 h-10 shrink-0 rounded-[4px] flex items-center justify-center p-2 transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7aab]",
              nextDisabled
                ? "text-[#bfbfbf] cursor-not-allowed"
                : "text-[#595959] hover:bg-[#595959]/[0.16] active:bg-[#595959]/[0.32]"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-10 h-10 shrink-0" />
        )}
      </div>

      {/* Day-of-week header */}
      <div className="flex justify-between mb-1">
        {DOW.map(d => (
          <div key={d} className="w-10 h-10 shrink-0 flex items-center justify-center text-sm font-normal text-[#595959]">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="flex flex-col gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex justify-between">
            {week.map((date, di) => (
              <DateCell
                key={di}
                date={date}
                today={today}
                start={start}
                end={end}
                hover={hover}
                onClick={onDateClick}
                onHover={onDateHover}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

export interface DateRangePickerProps {
  startDate?: Date | null
  endDate?: Date | null
  onRangeChange?: (start: Date | null, end: Date | null) => void
  placeholder?: [string, string]
  className?: string
}

export function DateRangePicker({
  startDate: initialStart,
  endDate: initialEnd,
  onRangeChange,
  placeholder = ["入住日期", "退房日期"],
  className,
}: DateRangePickerProps) {
  const today = React.useMemo(() => stripTime(new Date()), [])
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const [start, setStart] = React.useState<Date | null>(initialStart ?? null)
  const [end, setEnd] = React.useState<Date | null>(initialEnd ?? null)
  const [hover, setHover] = React.useState<Date | null>(null)
  const [phase, setPhase] = React.useState<"start" | "end">("start")

  const [viewYear, setViewYear] = React.useState(today.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(today.getMonth())
  const [nextYear, nextMonth] = addMonths(viewYear, viewMonth, 1)

  function handleDateClick(date: Date) {
    if (phase === "start" || !start) {
      setStart(date); setEnd(null); setPhase("end")
      onRangeChange?.(date, null)
    } else {
      if (stripTime(date).getTime() <= stripTime(start).getTime()) {
        setStart(date); setEnd(null); setPhase("end")
        onRangeChange?.(date, null)
      } else {
        setEnd(date); setPhase("start")
        onRangeChange?.(start, date)
      }
    }
  }

  function handlePrev() {
    const [y, m] = addMonths(viewYear, viewMonth, -1)
    setViewYear(y); setViewMonth(m)
  }

  function handleNext() {
    const [y, m] = addMonths(viewYear, viewMonth, 1)
    setViewYear(y); setViewMonth(m)
  }

  const prevAtLimit =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth())

  const nights = start && end
    ? Math.round((stripTime(end).getTime() - stripTime(start).getTime()) / 86400000)
    : 0

  const descText = start && end
    ? `${dateLabel(start)} - ${dateLabel(end)}，${nights} 晚`
    : start
    ? `${dateLabel(start)} — 請選擇退房日`
    : "請選擇入住與退房日期"

  const triggerStart = start
    ? `${start.getMonth() + 1}/${start.getDate()}`
    : null
  const triggerEnd = end
    ? `${end.getMonth() + 1}/${end.getDate()}`
    : null

  const sharedCellProps = {
    today, start, end, hover,
    onDateClick: handleDateClick,
    onDateHover: setHover,
  }

  const modal = open && (
    <div className="fixed inset-0 z-50 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className="relative bg-white w-full sm:w-auto sm:rounded-lg flex flex-col shadow-2xl max-h-[90vh] sm:max-h-none overflow-hidden">
        {/* Header */}
        <div className="flex items-center h-[60px] px-4 border-b border-[#e8e8e8] shrink-0">
          <h2 className="flex-1 text-xl font-bold text-[#262626] pl-4 sm:pl-[68px]">請選擇日期</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="關閉"
            className="w-12 h-12 flex items-center justify-center text-[#1e9fd2] rounded-[4px] hover:bg-[#1e9fd2]/10 transition-colors"
          >
            <TimesIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col sm:flex-row gap-8 px-4 sm:px-[16px] py-4 overflow-y-auto">
          {/* Mobile: both months stacked; desktop: side-by-side */}
          <MonthPanel
            {...sharedCellProps}
            year={viewYear} month={viewMonth}
            showPrev showNext={false}
            prevDisabled={prevAtLimit}
            onPrev={handlePrev}
          />
          <div className="hidden sm:block w-px bg-[#e8e8e8] self-stretch" />
          <MonthPanel
            {...sharedCellProps}
            year={nextYear} month={nextMonth}
            showPrev={false} showNext
            onNext={handleNext}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-4 py-4 border-t border-[#e8e8e8] shrink-0">
          <p className="text-sm font-medium text-[#002138] min-h-5">{descText}</p>
          <div className="flex flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-10 px-5 rounded-[4px] border border-[#bfbfbf] text-[#595959] text-base font-medium bg-white hover:bg-[#f5f5f5] transition-colors"
            >
              略過
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-10 px-5 rounded-[4px] bg-[#1e9fd2] text-white text-base font-medium hover:bg-[#0f7aab] transition-colors"
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-3 h-12 px-4 rounded-[4px] border border-[#bfbfbf] bg-white",
          "w-full max-w-sm text-sm text-left",
          "hover:border-[#0f7aab] transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7aab]",
          className
        )}
      >
        <CalendarIcon className="w-5 h-5 shrink-0 text-[#595959]" />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs text-[#8c8c8c] leading-4">{placeholder[0]}</span>
          <span className={cn("leading-5 truncate", triggerStart ? "text-[#262626]" : "text-[#bfbfbf]")}>
            {triggerStart ?? "選擇日期"}
          </span>
        </div>
        <div className="w-px h-8 bg-[#e8e8e8] shrink-0" />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs text-[#8c8c8c] leading-4">{placeholder[1]}</span>
          <span className={cn("leading-5 truncate", triggerEnd ? "text-[#262626]" : "text-[#bfbfbf]")}>
            {triggerEnd ?? "選擇日期"}
          </span>
        </div>
      </button>

      {mounted && modal && createPortal(modal, document.body)}
    </>
  )
}
