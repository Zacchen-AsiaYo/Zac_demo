"use client"

import { useState } from "react"
import { NumberPicker, NumberPickerRow } from "@/components/ui/number-picker"

export function NumberPickerSection() {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  return (
    <>
      <h1 className="h1-tw">Number Picker</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">States</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center gap-1">
            <NumberPicker value={2} min={0} max={10} onChange={() => {}} />
            <span className="text-xs text-neutral-7">enable</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NumberPicker value={0} min={0} max={10} onChange={() => {}} />
            <span className="text-xs text-neutral-7">minimum</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NumberPicker value={10} min={0} max={10} onChange={() => {}} />
            <span className="text-xs text-neutral-7">maximum</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NumberPicker value={2} min={0} max={10} onChange={() => {}} disabled />
            <span className="text-xs text-neutral-7">disabled</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Guest selector — interactive</h2>
        <div className="flex flex-col gap-0 max-w-xs border border-neutral-4 rounded-[4px] px-4 py-4 bg-white gap-4">
          <p className="text-base font-medium text-neutral-10">旅客人數</p>
          <div className="flex flex-col gap-4">
            <NumberPickerRow label="大人" annotation="年齡 20+" value={adults} min={1} max={10} onChange={setAdults} />
            <NumberPickerRow label="小孩" annotation="年齡 2–20" value={children} min={0} max={10} onChange={setChildren} />
          </div>
        </div>
      </section>
    </>
  )
}
