"use client"
import { Switch } from "@/components/ui/switch"

export function SwitchSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Switch</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">States — ON</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center gap-1">
            <Switch checked onChange={() => {}} />
            <span className="text-xs text-[#8c8c8c]">default</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch checked loading />
            <span className="text-xs text-[#8c8c8c]">loading</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch checked disabled />
            <span className="text-xs text-[#8c8c8c]">disabled</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">States — OFF</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center gap-1">
            <Switch checked={false} onChange={() => {}} />
            <span className="text-xs text-[#8c8c8c]">default</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch checked={false} loading />
            <span className="text-xs text-[#8c8c8c]">loading</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Switch checked={false} disabled />
            <span className="text-xs text-[#8c8c8c]">disabled</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Interactive — with label row</h2>
        <div className="flex flex-col gap-0 w-full max-w-sm border-t border-[#e8e8e8]">
          {(["訂閱電子報", "推播通知", "位置資訊"] as const).map((label, i) => (
            <div key={i} className="flex flex-row gap-4 items-center px-4 py-4 border-b border-[#e8e8e8]">
              <span className="flex-1 text-sm font-medium text-[#262626]">{label}</span>
              <Switch defaultChecked={i === 0} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
