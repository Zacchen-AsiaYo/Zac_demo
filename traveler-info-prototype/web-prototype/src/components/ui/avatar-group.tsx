import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// ─── Type 1: Compact ─────────────────────────────────────────────────────────
// 32px avatar + name (14px medium) in a horizontal row

export interface AvatarGroupCompactProps {
  name: string
  avatarSrc?: string
  className?: string
}

export function AvatarGroupCompact({ name, avatarSrc, className }: AvatarGroupCompactProps) {
  return (
    <div
      data-slot="avatar-group-compact"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <Avatar name={avatarSrc ? undefined : name} src={avatarSrc} size={32} />
      <span className="text-sm font-medium leading-5 text-neutral-8">{name}</span>
    </div>
  )
}

// ─── Type 2–4: Full ───────────────────────────────────────────────────────────
// 44px avatar + stacked name & location
//   type=full       → real name + location
//   type=anonymous  → masked name (** 姓) + location
//   type=deleted    → "匿名" + "居住地未提供"

export type AvatarGroupVariant = "full" | "anonymous" | "deleted"

export interface AvatarGroupProps {
  name?: string
  location?: string
  variant?: AvatarGroupVariant
  avatarSrc?: string
  className?: string
}

/** ZeroHeight spec: anonymous format = "******* LastName" (7 asterisks) */
function maskName(name?: string): string {
  if (!name) return "******* 使用者"
  const parts = name.trim().split(/\s+/)
  // Multi-word: mask all but last (family name)
  if (parts.length > 1) return `******* ${parts[parts.length - 1]}`
  // Single word: mask entire name, keep first char visible
  const first = [...name][0]
  return `******* ${first}`
}

export function AvatarGroup({
  name,
  location,
  variant = "full",
  avatarSrc,
  className,
}: AvatarGroupProps) {
  const isDeleted = variant === "deleted"
  const isAnonymous = variant === "anonymous"

  const displayName = isDeleted ? "匿名" : isAnonymous ? maskName(name) : (name ?? "")
  const displayLocation = isDeleted ? "居住地未提供" : (location ?? "")

  const avatarName = isDeleted || isAnonymous ? undefined : name
  const avatarSrcFinal = isDeleted || isAnonymous ? undefined : avatarSrc

  return (
    <div
      data-slot="avatar-group"
      data-variant={variant}
      className={cn("inline-flex items-center gap-2", className)}
    >
      <Avatar
        name={avatarSrcFinal ? undefined : avatarName}
        src={avatarSrcFinal}
        size={44}
      />
      <div className="flex flex-col justify-center">
        <span className="text-base font-medium leading-6 text-neutral-8">
          {displayName}
        </span>
        {displayLocation && (
          <span className="text-sm font-normal leading-5 text-neutral-7">
            {displayLocation}
          </span>
        )}
      </div>
    </div>
  )
}
