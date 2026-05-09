"use client"
import { Popover, PopoverPanel, PopoverTrigger } from "@/components/ui/popover"

export function PopoverSection() {
  return (
    <>
      <h1 className="h1-tw">Popover</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Panel variants — Static</h2>
        <div className="flex flex-wrap gap-6 items-start">
          <PopoverPanel content="這是一段說明文字，用來提供補充資訊給使用者。" />
          <PopoverPanel
            content="這是一段說明文字，用來提供補充資訊給使用者。"
            link={{ label: "了解更多" }}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Placements — Live</h2>
        <div className="flex flex-wrap gap-4 items-center">
          {(["bottom-right", "bottom-center", "bottom-left", "top-right", "top-center", "top-left"] as const).map(p => (
            <Popover
              key={p}
              content="這是 Popover 的說明文字，提供補充資訊。"
              link={{ label: "了解更多" }}
              placement={p}
            >
              <PopoverTrigger label={p} />
            </Popover>
          ))}
        </div>
      </section>
    </>
  )
}
