"use client"

import { FlashNotice, useFlashNotice } from "@/components/ui/flash-notice"
import { Button } from "@/components/ui/button"

function FlashNoticeDemo() {
  const { show } = useFlashNotice()
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        appearance="solid"
        size="md"
        onClick={() => show({ title: "複製成功", duration: 3000 })}
      >
        Title only
      </Button>
      <Button
        variant="primary"
        appearance="solid"
        size="md"
        onClick={() => show({ title: "成功收藏", body: "已將旅宿加入收藏清單。", duration: 3000 })}
      >
        Title + body
      </Button>
      <Button
        variant="primary"
        appearance="solid"
        size="md"
        onClick={() => show({
          title: "成功收藏",
          body: "已將旅宿加入",
          link: { label: "收藏清單", onClick: () => {} },
          suffix: "。",
          duration: 4000,
        })}
      >
        Title + body + link
      </Button>
      <Button
        variant="neutral"
        appearance="outline"
        size="md"
        onClick={() => show({
          title: "還差一步",
          body: "請先前往",
          link: { label: "註冊 / 登入", onClick: () => {} },
          suffix: "來完成收藏。",
          duration: 4000,
        })}
      >
        Title + body + link（替換舊的）
      </Button>
    </div>
  )
}

export function FlashNoticeSection() {
  return (
    <>
      <h1 className="h1-tw mt-6">Flash Notice</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Static variants</h2>
        <div className="flex flex-col gap-3">
          <FlashNotice title="複製成功" />
          <FlashNotice title="成功收藏" body="已將旅宿加入收藏清單。" />
          <FlashNotice
            title="成功收藏"
            body="已將旅宿加入"
            link={{ label: "收藏清單", onClick: () => {} }}
            suffix="。"
          />
          <FlashNotice
            title="還差一步"
            body="請先前往"
            link={{ label: "註冊 / 登入", onClick: () => {} }}
            suffix="來完成收藏。"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Toast（live — 新的取代舊的）</h2>
        <FlashNoticeDemo />
      </section>
    </>
  )
}
