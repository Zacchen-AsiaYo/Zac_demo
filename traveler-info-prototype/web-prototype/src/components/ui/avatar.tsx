"use client"

// ─── Avatar ───────────────────────────────────────────────────────────────────
// ZeroHeight: https://zeroheight.com/8ei12wwuw/p/01820d-avatar
//
// Spec (confirmed from ZeroHeight + ul source):
//   Styles    : Placeholder / Image / Acronym
//   Sizes     : 32 | 36 | 40 | 44 | 48 | 52 | 56 (px)
//   Font-size : ≤36 → 16px, 40/44 → 20px, ≥48 → 24px
//   BG colors : 5 colors — matched to ul cp-theme tokens
//               primary[3]=#6ccfeb / warning[3]=#ffd752 /
//               success[3]=#a0e09e / primary[7]=#055885 / danger[3]=#ff9b70
//   Hash      : full `name` string (not just first char)
//   Case      : preserve original case — ZeroHeight: lowercase stays lowercase
//   Photo err : onerror → fallback to initials / placeholder
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── 5 background colors — matched to ul cp-theme (ZeroHeight: 五種背景) ─────
// primary[3]=#6ccfeb, warning[3]=#ffd752, success[3]=#a0e09e,
// primary[7]=#055885, danger[3]=#ff9b70
const AVATAR_COLORS = [
  "#6ccfeb",
  "#ffd752",
  "#a0e09e",
  "#055885",
  "#ff9b70",
]

/** Hash uses full name string — consistent with ul's getColorFromString */
function getColorFromName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

/** First character of name — preserves original case per ZeroHeight spec */
function getInitial(name: string): string {
  if (!name) return ""
  return [...name][0] // spread handles CJK / emoji correctly; no toUpperCase
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const avatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden select-none font-bold text-white",
  {
    variants: {
      size: {
        32: "size-8  text-base",       // 16px
        36: "size-9  text-base",       // 16px
        40: "size-10 text-xl",         // 20px
        44: "size-11 text-xl",         // 20px
        48: "size-12 text-2xl",        // 24px
        52: "w-[52px] h-[52px] text-2xl", // 24px
        56: "w-14 h-14 text-2xl",      // 24px
      },
    },
    defaultVariants: { size: 44 },
  }
)

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Display name — used for initials and background color hash */
  name?: string
  /** Photo URL (wp uses `src`; ul uses `avatar` — see migration guide) */
  src?: string
  alt?: string
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Avatar({ name, src, alt, size = 44, className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  const initial  = name ? getInitial(name) : ""
  const bgColor  = initial ? getColorFromName(name!) : undefined
  const showImg  = src && !imgError

  return (
    <div
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      style={bgColor && !showImg ? { backgroundColor: bgColor } : undefined}
      aria-label={alt ?? name}
    >
      {showImg ? (
        <img
          src={src}
          alt={alt ?? name ?? "avatar"}
          className="size-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : initial ? (
        <span aria-hidden="true">{initial}</span>
      ) : (
        <PlaceholderIcon />
      )}
    </div>
  )
}

// ─── Placeholder ──────────────────────────────────────────────────────────────

function PlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="22" fill="#bfbfbf" />
      <circle cx="22" cy="17" r="7" fill="white" />
      <path d="M6 44c0-8.837 7.163-16 16-16s16 7.163 16 16H6z" fill="white" />
    </svg>
  )
}
