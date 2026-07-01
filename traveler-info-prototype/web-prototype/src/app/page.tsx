import type { Metadata } from "next"
import SitemapPage from "./sitemap/page"

// 首頁 = Prototype Sitemap 導覽頁。
// 原本的語言自動偵測跳轉（/ → /zh-tw/ 等）已移除；各語系首頁改由下方 sitemap 的連結進入。
// sitemap 內容本體維持在 ./sitemap/page.tsx，/sitemap 路由仍保留
//（各 demo page 左下角的「導覽頁」按鈕指向 /sitemap）。
export const metadata: Metadata = {
  title: "Prototype Sitemap · AsiaYo",
  description: "所有 prototype 頁面的導覽入口",
}

export default function Home() {
  return <SitemapPage />
}
