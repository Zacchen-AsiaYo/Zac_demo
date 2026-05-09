"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export function TextareaSection() {
  const [value, setValue] = useState("")

  return (
    <>
      <h1 className="h1-tw mt-6">Textarea</h1>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">States</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Textarea
            label="預設（含字數計）"
            placeholder="請輸入內容..."
            value={value}
            onChange={e => setValue(e.target.value)}
            showCount
            maxLength={200}
          />
          <Textarea label="Error" state="error" defaultValue="錯誤的內容" feedback="請修正此欄位" showCount maxLength={200} />
          <Textarea label="Warning" state="warning" defaultValue="需確認內容" feedback="請確認填寫是否正確" />
          <Textarea label="Success" state="success" defaultValue="正確的內容" feedback="驗證成功" />
          <Textarea label="Disabled" state="disabled" value="不可編輯的內容" />
          <Textarea label="Helper text" placeholder="請輸入內容..." helper="最多可輸入 200 字。" showCount maxLength={200} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">autoHeight</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Textarea label="高度隨內容自動增長" placeholder="輸入多行文字試試..." autoHeight />
        </div>
      </section>
    </>
  )
}
