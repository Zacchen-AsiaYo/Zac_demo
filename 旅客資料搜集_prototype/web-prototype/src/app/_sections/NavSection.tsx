"use client"

import { useState } from "react"
import { NavBar } from "@/components/ui/nav-bar"
import { Tabs } from "@/components/ui/tabs"
import { PageHeaderMobile, PageHeaderDesktop } from "@/components/ui/page-header"

export function NavSection() {
  const [navActive, setNavActive] = useState("tour")
  const [tabActive, setTabActive] = useState("all")

  const navItems = [
    { id: "tour", label: "跟團旅遊" },
    { id: "hotel", label: "旅宿", badge: true as const },
    { id: "activity", label: "活動體驗" },
    { id: "transport", label: "交通接送" },
    { id: "rental", label: "租車自駕" },
  ]

  const tabItems = [
    { id: "all", label: "全部" },
    { id: "domestic", label: "國內" },
    { id: "overseas", label: "海外", badge: true as const },
    { id: "cruise", label: "郵輪" },
    { id: "theme", label: "主題行程" },
  ]

  return (
    <>
      <h1 className="h1-tw">Navigation Bar</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Page Header — Mobile</h2>
        <div className="rounded overflow-hidden shadow-sm">
          <PageHeaderMobile />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Page Header — Desktop</h2>
        <div className="rounded overflow-hidden shadow-sm">
          <PageHeaderDesktop />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Nav Bar — scrollable</h2>
        <div className="rounded overflow-hidden">
          <NavBar items={navItems} activeId={navActive} onSelect={setNavActive} />
        </div>
        <p className="p2-tw text-[#8c8c8c]">Active: {navActive}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Nav Bar — without chevron</h2>
        <div className="rounded overflow-hidden">
          <NavBar
            items={[
              { id: "a", label: "首頁" },
              { id: "b", label: "探索" },
              { id: "c", label: "收藏" },
              { id: "d", label: "會員" },
            ]}
            activeId="a"
            showChevron={false}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Tabs — adaptive width</h2>
        <div className="bg-white shadow-sm">
          <Tabs items={tabItems} activeId={tabActive} onSelect={setTabActive} />
        </div>
        <p className="p2-tw text-[#8c8c8c]">Active: {tabActive}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Tabs — fixed (equal) width</h2>
        <div className="bg-white shadow-sm">
          <Tabs
            type="fixed"
            items={[
              { id: "overview", label: "概述" },
              { id: "reviews", label: "評價", badge: true },
              { id: "rooms", label: "房型" },
              { id: "checkin", label: "入住資訊" },
            ]}
            activeId="checkin"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Tabs — with disabled</h2>
        <div className="bg-white shadow-sm">
          <Tabs
            items={[
              { id: "a", label: "全部" },
              { id: "b", label: "國內" },
              { id: "c", label: "海外", disabled: true },
              { id: "d", label: "郵輪" },
            ]}
            activeId="a"
          />
        </div>
      </section>
    </>
  )
}
