"use client"

import { useState } from "react"
import { Chip } from "@/components/ui/chip"

export function ChipSection() {
  const [chips, setChips] = useState(["三月", "四月", "五月", "六月", "日月潭舞飛揚環湖路跑賽", "太魯閣馬拉松"])

  return (
    <>
      <h1 className="h1-tw mt-6">Chip</h1>

      {/* ── States ──────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">States</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <Chip label="Enable（hover / click × 看狀態）" onRemove={() => {}} />
          <Chip label="No remove button" />
          <Chip label="Disabled" onRemove={() => {}} disabled />
          <Chip label="Long label truncates at 300px — Pneumonoultramicroscopicsilicovolcanoconiosis" onRemove={() => {}} />
        </div>
      </section>

      {/* ── Interactive ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Interactive — 可移除</h2>
        <p className="p2-tw text-neutral-7">已篩選條件</p>
        <div className="flex flex-wrap gap-2">
          {chips.map(chip => (
            <Chip
              key={chip}
              label={chip}
              onRemove={() => setChips(c => c.filter(x => x !== chip))}
            />
          ))}
          {chips.length === 0 && (
            <span className="p2-tw text-neutral-6">（已清除）</span>
          )}
        </div>
      </section>

      {/* ── Without remove button ───────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Without remove button</h2>
        <div className="flex flex-wrap gap-2">
          <Chip label="台灣" />
          <Chip label="日本" />
          <Chip label="泰國" />
        </div>
      </section>
    </>
  )
}
