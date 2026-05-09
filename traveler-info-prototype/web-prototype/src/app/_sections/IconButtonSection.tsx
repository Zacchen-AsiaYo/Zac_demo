"use client"
import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"

export function IconButtonSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Icon Button</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Style — Rounded</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <IconButton variant="primary" appearance="solid" aria-label="search">
            <Icon name="search" />
          </IconButton>
          <IconButton variant="primary" appearance="outline" aria-label="add">
            <Icon name="plus" />
          </IconButton>
          <IconButton variant="neutral" appearance="outline" aria-label="heart">
            <Icon name="heart" />
          </IconButton>
          <IconButton variant="danger" appearance="solid" aria-label="delete">
            <Icon name="trash" />
          </IconButton>
          <IconButton variant="danger" appearance="outline" aria-label="close">
            <Icon name="times" />
          </IconButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Style — Circular</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <IconButton variant="neutral" appearance="outline" shape="circular" aria-label="prev">
            <Icon name="chevron-left" />
          </IconButton>
          <IconButton variant="primary" appearance="solid" shape="circular" aria-label="next">
            <Icon name="chevron-right" />
          </IconButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Style — Flat</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <IconButton variant="primary" appearance="flat" aria-label="share">
            <Icon name="share" />
          </IconButton>
          <IconButton variant="success" appearance="flat" aria-label="confirm">
            <Icon name="check" />
          </IconButton>
          <IconButton variant="warning" appearance="flat" aria-label="warning">
            <Icon name="exclamation-circle" />
          </IconButton>
          <IconButton variant="danger" appearance="flat" aria-label="delete">
            <Icon name="trash" />
          </IconButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Size</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <IconButton size="lg" variant="primary" appearance="solid" aria-label="large">
            <Icon name="search" />
          </IconButton>
          <IconButton size="md" variant="primary" appearance="solid" aria-label="medium">
            <Icon name="search" />
          </IconButton>
          <span className="p2-tw text-[#8c8c8c]">lg=48px / md=40px</span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <IconButton variant="primary" appearance="solid" aria-label="enable">
            <Icon name="search" />
          </IconButton>
          <IconButton variant="primary" appearance="solid" loading aria-label="loading solid" />
          <IconButton variant="primary" appearance="solid" disabled aria-label="disabled solid">
            <Icon name="search" />
          </IconButton>
          <IconButton variant="primary" appearance="outline" loading aria-label="loading outline" />
          <IconButton variant="neutral" appearance="outline" loading aria-label="loading neutral outline" />
          <IconButton variant="neutral" appearance="outline" aria-label="enable neutral">
            <Icon name="heart" />
          </IconButton>
          <IconButton variant="neutral" appearance="outline" disabled aria-label="disabled neutral">
            <Icon name="heart" />
          </IconButton>
        </div>
      </section>
    </>
  )
}
