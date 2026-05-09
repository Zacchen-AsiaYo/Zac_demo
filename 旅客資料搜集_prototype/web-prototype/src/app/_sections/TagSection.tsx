"use client"

import { useState } from "react"
import { Tag, SaleTag, FilterPill } from "@/components/ui/tag"

export function TagSection() {
  const [filterActive, setFilterActive] = useState("all")

  return (
    <>
      <h1 className="h1-tw">Tag</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Outline variants</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Tag variant="warm" size="small" label="會員專屬" />
            <Tag variant="success" size="small" label="已成團" />
            <Tag variant="warning" size="small" label="即將成團" />
            <Tag variant="danger" size="small" label="限時特賣" />
            <Tag variant="gray" size="small" label="精選" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag variant="warm" size="medium" label="會員專屬" />
            <Tag variant="success" size="medium" label="已成團" />
            <Tag variant="warning" size="medium" label="即將成團" />
            <Tag variant="danger" size="medium" label="限時特賣" />
            <Tag variant="gray" size="medium" label="精選" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag variant="warm" size="large" label="會員專屬" />
            <Tag variant="success" size="large" label="已成團" />
            <Tag variant="warning" size="large" label="即將成團" />
            <Tag variant="danger" size="large" label="限時特賣" />
            <Tag variant="gray" size="large" label="精選" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Solid variants</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <Tag variant="navy" size="medium" label="酒店式公寓" />
          <Tag variant="black" size="medium" label="New" />
          <Tag variant="dark-overlay" size="medium" label="＋8 張照片" />
          <Tag variant="navy" size="large" label="超讚房東" />
          <Tag variant="black" size="large" label="New" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">With icon</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <Tag
            variant="success"
            size="medium"
            label="已成團"
            icon={<svg viewBox="0 0 16 16" fill="none" className="size-4"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          />
          <Tag
            variant="danger"
            size="medium"
            label="限時特賣"
            icon={<svg viewBox="0 0 16 16" fill="none" className="size-4"><path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7.134 2.5L1.072 13a1 1 0 00.866 1.5h12.124a1 1 0 00.866-1.5L8.866 2.5a1 1 0 00-1.732 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>}
          />
          <Tag
            variant="gray"
            size="large"
            label="超讚房東"
            icon={<svg viewBox="0 0 20 20" fill="none" className="size-5"><path d="M10 2l2.4 5.3H18l-4.4 3.6 1.7 5.7L10 13.4l-5.3 3.2 1.7-5.7L2 7.3h5.6L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Sale Tag</h2>
        <div className="flex flex-wrap gap-3 items-start">
          <SaleTag variant="solid" badge="64折" />
          <SaleTag variant="solid" badge="10% off" />
          <SaleTag variant="outline" badge="早鳥" description="早鳥優惠限時 3 天" />
          <SaleTag variant="outline" badge="限時" description="再省 NT$500" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Filter Pill</h2>
        <div className="flex flex-wrap gap-2">
          {["全部", "跟團遊", "自由行", "郵輪", "主題行程"].map(label => (
            <FilterPill
              key={label}
              label={label}
              active={filterActive === label}
              onClick={() => setFilterActive(label)}
            />
          ))}
        </div>
      </section>
    </>
  )
}
