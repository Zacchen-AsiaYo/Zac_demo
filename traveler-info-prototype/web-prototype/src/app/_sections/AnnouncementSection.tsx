"use client"

import { useState } from "react"
import { Announcement } from "@/components/ui/announcement"

export function AnnouncementSection() {
  const [dismissed, setDismissed] = useState({ primary: false, warning: false, success: false })

  return (
    <>
      <h1 className="h1-tw">Announcement</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Primary</h2>
        <Announcement variant="primary" title="Primary title" />
        <Announcement variant="primary" title="Primary title" content="Supplementary content goes here." />
        {!dismissed.primary && (
          <Announcement variant="primary" title="Primary title" content="This one can be dismissed." onClose={() => setDismissed(d => ({ ...d, primary: true }))} />
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Warning</h2>
        <Announcement variant="warning" title="Warning title" />
        <Announcement variant="warning" title="Warning title" content="Supplementary content goes here." />
        {!dismissed.warning && (
          <Announcement variant="warning" title="Warning title" content="This one can be dismissed." onClose={() => setDismissed(d => ({ ...d, warning: true }))} />
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Success</h2>
        <Announcement variant="success" title="Success title" />
        <Announcement variant="success" title="Success title" content="Supplementary content goes here." />
        {!dismissed.success && (
          <Announcement variant="success" title="Success title" content="This one can be dismissed." onClose={() => setDismissed(d => ({ ...d, success: true }))} />
        )}
      </section>
    </>
  )
}
