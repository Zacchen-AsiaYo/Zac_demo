"use client"

import { DateRangePicker, MonthPanel } from "@/components/ui/date-range-picker"

export function DateRangePickerSection() {
  return (
    <>
      <h1 className="h1-tw">Date Range Picker</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Calendar panel — static</h2>
        <MonthPanel
          year={2025} month={4}
          today={new Date(2025, 4, 28)}
          start={new Date(2025, 4, 10)}
          end={new Date(2025, 4, 15)}
          hover={null}
          onDateClick={() => {}}
          onDateHover={() => {}}
          showPrev prevDisabled
          showNext onNext={() => {}}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Interactive — click to open</h2>
        <DateRangePicker />
      </section>
    </>
  )
}
