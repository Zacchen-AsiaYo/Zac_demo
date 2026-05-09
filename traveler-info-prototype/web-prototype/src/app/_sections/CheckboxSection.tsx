"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxSection() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      <h1 className="h1-tw mt-6">Checkbox</h1>

      {/* ── Unchecked states ─────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Unchecked</h2>
        <div className="flex flex-col gap-3">
          <Checkbox label="Default（hover 看 bg 變化）" />
          <Checkbox label="Disabled" disabled />
        </div>
      </section>

      {/* ── Checked states ───────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Checked</h2>
        <div className="flex flex-col gap-3">
          <Checkbox label="Checked" checked />
          <Checkbox label="Checked + Disabled" checked disabled />
        </div>
      </section>

      {/* ── Indeterminate states ─────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Indeterminate</h2>
        <div className="flex flex-col gap-3">
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Indeterminate + Disabled" indeterminate disabled />
        </div>
      </section>

      {/* ── Interactive（共用 state，點任一個都會同步）──────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Interactive — 共用狀態（點任一個觀察變化）</h2>
        <div className="flex flex-col gap-3">
          <Checkbox
            label="沒有 subLabel"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <Checkbox
            label="有 subLabel"
            subLabel="這兩個共用同一個 checked 狀態"
            checked={isChecked}
            onChange={setIsChecked}
          />
        </div>
        <p className="text-xs text-neutral-7">目前狀態：{isChecked ? "✅ checked" : "☐ unchecked"}</p>
      </section>
    </>
  )
}
