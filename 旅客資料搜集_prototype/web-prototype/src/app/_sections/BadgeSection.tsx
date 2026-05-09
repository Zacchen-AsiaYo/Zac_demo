"use client"
import { Badge, BadgeAnchor } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"

export function BadgeSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Badge</h1>

      {/* ── Numeric ───────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Numeric — Danger 06</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Badge value={5} />
          <Badge value={99} />
          <Badge value={100} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Numeric — Primary 08</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Badge value={5}   color="primary" />
          <Badge value={99}  color="primary" />
          <Badge value={100} color="primary" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Numeric — Neutral 01（深色背景用）</h2>
        <div className="flex flex-wrap gap-6 items-center p-4 bg-neutral-8 rounded-[4px]">
          <Badge value={5}  color="neutral" />
          <Badge value={99} color="neutral" />
        </div>
      </section>

      {/* ── Text (New Feature) ────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Text — New Feature</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center gap-1">
            <Badge value="新" />
            <span className="text-xs text-neutral-7">TW / JP</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Badge value="N" />
            <span className="text-xs text-neutral-7">EN / KR</span>
          </div>
        </div>
      </section>

      {/* ── Dot ──────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Dot</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Badge color="danger" />
          <Badge color="primary" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Dot — with ripple</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Badge color="danger"  ripple />
          <Badge color="primary" ripple />
        </div>
      </section>

      {/* ── BadgeAnchor ───────────────────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Anchor — at-edge（超出 8px）</h2>
        <div className="flex flex-wrap gap-8 items-center">
          <BadgeAnchor value={99}>
            <IconButton variant="primary" appearance="solid" aria-label="bell">
              <Icon name="bell" type="line" />
            </IconButton>
          </BadgeAnchor>
          <BadgeAnchor value={5} color="primary">
            <IconButton variant="neutral" appearance="outline" aria-label="search">
              <Icon name="search" type="line" />
            </IconButton>
          </BadgeAnchor>
          <BadgeAnchor>
            <IconButton variant="neutral" appearance="outline" aria-label="notification">
              <Icon name="bell" type="line" />
            </IconButton>
          </BadgeAnchor>
          <BadgeAnchor ripple>
            <IconButton variant="neutral" appearance="flat" aria-label="settings">
              <Icon name="search" type="line" />
            </IconButton>
          </BadgeAnchor>
          <BadgeAnchor value="新">
            <Button variant="primary" appearance="outline" size="md">個人設定</Button>
          </BadgeAnchor>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Anchor — close-edge（在邊界 4px）</h2>
        <div className="flex flex-wrap gap-8 items-center">
          <BadgeAnchor value={5} color="primary" placement="close-edge">
            <Button variant="primary" appearance="solid" size="md">篩選</Button>
          </BadgeAnchor>
          <BadgeAnchor value={100} placement="close-edge">
            <Button variant="neutral" appearance="outline" size="md">通知</Button>
          </BadgeAnchor>
        </div>
      </section>
    </>
  )
}
