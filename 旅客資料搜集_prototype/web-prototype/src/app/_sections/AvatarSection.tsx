"use client"
import { Avatar } from "@/components/ui/avatar"
import { AvatarGroup, AvatarGroupCompact } from "@/components/ui/avatar-group"

export function AvatarSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Avatar</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Style</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Avatar name="亞洲" />
          <Avatar name="亚洲" />
          <Avatar name="Alice" />
          <Avatar name="あかり" />
          <Avatar name="여행" />
          <Avatar name="alex" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Type</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Avatar name="Alice" />
          <Avatar src="https://i.pravatar.cc/150?img=5" alt="User photo" />
          <Avatar />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Size</h2>
        <div className="flex flex-wrap gap-4 items-end">
          {([32, 36, 40, 44, 48, 52, 56] as const).map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Avatar name="A" size={s} />
              <span className="p3-tw text-[#8c8c8c]">{s}</span>
            </div>
          ))}
        </div>
      </section>

      <h1 className="h1-tw mt-6">Avatar Group</h1>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Type 1 — Compact</h2>
        <div className="flex flex-wrap gap-6">
          <AvatarGroupCompact name="Sara" />
          <AvatarGroupCompact name="雅卉" />
          <AvatarGroupCompact name="anna" />
          <AvatarGroupCompact name="凛" />
          <AvatarGroupCompact name="구슬" />
          <AvatarGroupCompact name="以真" avatarSrc="https://i.pravatar.cc/150?img=9" />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Type 2 — Full name</h2>
        <div className="flex flex-wrap gap-6">
          <AvatarGroup name="Anita Yang" location="台灣" />
          <AvatarGroup name="雅卉 王" location="台灣" />
          <AvatarGroup name="以真" avatarSrc="https://i.pravatar.cc/150?img=9" location="日本" />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Type 3 — Anonymous</h2>
        <div className="flex flex-wrap gap-6">
          <AvatarGroup name="雅卉 王" location="台灣" variant="anonymous" />
          <AvatarGroup name="Anita Yang" location="美國" variant="anonymous" />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="h3-tw">Type 4 — Deleted account</h2>
        <div className="flex flex-wrap gap-6">
          <AvatarGroup variant="deleted" />
        </div>
      </section>
    </>
  )
}
