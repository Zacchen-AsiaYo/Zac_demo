"use client"
import { Button } from "@/components/ui/button"

export function ButtonSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Button</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Primary</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" appearance="solid">Solid</Button>
          <Button variant="primary" appearance="outline">Outline</Button>
          <Button variant="primary" appearance="flat">Flat</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" appearance="solid" shape="pill">Solid Pill</Button>
          <Button variant="primary" appearance="outline" shape="pill">Outline Pill</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Success</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="success" appearance="solid">Solid</Button>
          <Button variant="success" appearance="outline">Outline</Button>
          <Button variant="success" appearance="flat">Flat</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="success" appearance="solid" shape="pill">Solid Pill</Button>
          <Button variant="success" appearance="outline" shape="pill">Outline Pill</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Warning</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="warning" appearance="solid">Solid</Button>
          <Button variant="warning" appearance="outline">Outline</Button>
          <Button variant="warning" appearance="flat">Flat</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="warning" appearance="solid" shape="pill">Solid Pill</Button>
          <Button variant="warning" appearance="outline" shape="pill">Outline Pill</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Neutral</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="neutral" appearance="outline">Outline</Button>
          <Button variant="neutral" appearance="flat">Flat</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="neutral" appearance="outline" shape="pill">Outline Pill</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Danger</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="danger" appearance="solid">Solid</Button>
          <Button variant="danger" appearance="outline">Outline</Button>
          <Button variant="danger" appearance="flat">Flat</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="danger" appearance="solid" shape="pill">Solid Pill</Button>
          <Button variant="danger" appearance="outline" shape="pill">Outline Pill</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Size</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="lg">Large</Button>
          <Button size="md">Medium</Button>
          <Button size="sm">Small</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" appearance="solid">Enable</Button>
          <Button variant="primary" appearance="solid" loading>Loading</Button>
          <Button variant="primary" appearance="solid" disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" appearance="outline" loading>Primary Outline Loading</Button>
          <Button variant="neutral" appearance="outline" loading>Neutral Outline Loading</Button>
          <Button variant="danger" appearance="outline" loading>Danger Outline Loading</Button>
        </div>
      </section>
    </>
  )
}
