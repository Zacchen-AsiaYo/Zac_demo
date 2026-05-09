"use client"

import { useState } from "react"
import { RadioButton, RadioGroup } from "@/components/ui/radio-button"

export function RadioButtonSection() {
  const [selected, setSelected] = useState("a")

  return (
    <>
      <h1 className="h1-tw mt-6">Radio Button</h1>

      {/* ── Unchecked states ────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Unchecked</h2>
        <RadioGroup value="" className="flex flex-col gap-3">
          <RadioButton value="x" label="Default（hover 試試）" />
          <RadioButton value="y" label="Disabled" disabled />
        </RadioGroup>
      </section>

      {/* ── Checked states ──────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Checked</h2>
        <RadioGroup value="checked" className="flex flex-col gap-3">
          <RadioButton value="checked" label="Checked" />
          <RadioButton value="checked-disabled" label="Checked + Disabled" disabled />
        </RadioGroup>
      </section>

      {/* ── Interactive ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Interactive — RadioGroup（arrow key 切換）</h2>
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          name="demo"
          className="flex flex-col gap-3"
        >
          <RadioButton value="a" label="選項 A" />
          <RadioButton
            value="b"
            label="選項 B"
            subLabel="有 subLabel 的選項"
          />
          <RadioButton value="c" label="選項 C（Disabled）" disabled />
        </RadioGroup>
        <p className="text-xs text-neutral-7">目前選取：{selected}</p>
      </section>
    </>
  )
}
