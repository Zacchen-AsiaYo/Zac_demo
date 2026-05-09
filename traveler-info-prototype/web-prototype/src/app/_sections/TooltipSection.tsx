"use client"
import { Tooltip, TooltipStatic } from "@/components/ui/tooltip"

export function TooltipSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Tooltip</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Side × Beak — Static</h2>
        <div className="flex flex-wrap gap-8 items-end">
          <TooltipStatic content="Top · Center" side="top" beak="center" />
          <TooltipStatic content="Top · Start" side="top" beak="start" />
          <TooltipStatic content="Top · End" side="top" beak="end" />
          <TooltipStatic content="Bottom · Center" side="bottom" beak="center" />
          <TooltipStatic content="Bottom · Start" side="bottom" beak="start" />
          <TooltipStatic content="Bottom · End" side="bottom" beak="end" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Multi-line content — Static</h2>
        <div className="flex flex-wrap gap-8 items-end">
          <TooltipStatic content={"第一行說明文字\n第二行補充資訊"} side="top" beak="center" />
          <TooltipStatic content="這是一段比較長的說明文字，用來展示最大寬度與自動換行的效果。" side="bottom" beak="start" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Live (hover / focus)</h2>
        <div className="flex flex-wrap gap-8 items-center">
          <Tooltip content="Top · Center">
            <button type="button" className="h-9 px-4 rounded-[4px] bg-[#1e9fd2] text-white text-sm font-medium">
              Hover me (top)
            </button>
          </Tooltip>
          <Tooltip content="Bottom · Center" side="bottom">
            <button type="button" className="h-9 px-4 rounded-[4px] bg-[#1e9fd2] text-white text-sm font-medium">
              Hover me (bottom)
            </button>
          </Tooltip>
          <Tooltip content="Beak start" side="top" beak="start">
            <button type="button" className="h-9 px-4 rounded-[4px] border border-[#1e9fd2] text-[#1e9fd2] text-sm font-medium">
              Beak start
            </button>
          </Tooltip>
          <Tooltip content="Beak end" side="top" beak="end">
            <button type="button" className="h-9 px-4 rounded-[4px] border border-[#1e9fd2] text-[#1e9fd2] text-sm font-medium">
              Beak end
            </button>
          </Tooltip>
          <Tooltip content={"第一行\n第二行"} side="bottom" beak="start">
            <button type="button" className="h-9 px-4 rounded-[4px] border border-[#595959] text-[#595959] text-sm font-medium">
              Multi-line
            </button>
          </Tooltip>
        </div>
      </section>
    </>
  )
}
