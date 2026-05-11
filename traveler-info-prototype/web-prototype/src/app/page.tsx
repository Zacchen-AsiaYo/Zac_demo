"use client"

import { useEffect } from "react"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const m = document.cookie.match(new RegExp("(^|;)\\s*" + name + "=([^;]+)"))
  return m ? decodeURIComponent(m[2]) : null
}

function detectTarget(): "zh-tw" | "zh-cn" | "en-us" {
  // P2 Cookie (P1 URL path is N/A — we are at /)
  const cookie = (getCookie("asiayo_locale") || "").toLowerCase()
  if (cookie === "zh-tw" || cookie === "zh-cn" || cookie === "en-us") return cookie
  if (cookie === "zh-hk" || cookie === "zh-mo") return "zh-tw"
  if (cookie === "zh-my" || cookie === "zh-sg") return "zh-cn"

  // P3 navigator.language (exact, then prefix)
  const lang = (typeof navigator !== "undefined" ? navigator.language : "en-us").toLowerCase()
  if (lang === "zh-tw" || lang === "zh-hant" || lang === "zh-hk" || lang === "zh-mo") return "zh-tw"
  if (lang === "zh-cn" || lang === "zh-hans" || lang === "zh-my" || lang === "zh-sg") return "zh-cn"
  const prefix = lang.split("-")[0]
  if (prefix === "zh") return "zh-tw"
  if (prefix === "en") return "en-us"

  // P6 fallback
  return "en-us"
}

export default function Page() {
  useEffect(() => {
    const target = detectTarget()
    window.location.replace(`/${target}/`)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "#8c8c8c",
        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        fontSize: 14,
      }}
    >
      Redirecting…
    </div>
  )
}
