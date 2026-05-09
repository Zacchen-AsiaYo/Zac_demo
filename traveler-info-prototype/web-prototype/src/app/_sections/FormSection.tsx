"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioButton, RadioGroup } from "@/components/ui/radio-button"

export function FormSection() {
  const [inputValue, setInputValue] = useState("")
  const [clearableValue, setClearableValue] = useState("可清除的文字")
  const [checkboxes, setCheckboxes] = useState({ a: false, b: true, c: false, d: false })
  const [radio, setRadio] = useState("b")

  return (
    <>
      <h1 className="h1-tw mt-6">Forms</h1>

      {/* Input */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Input — States</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input label="預設（有值）" placeholder="請輸入文字" value={inputValue} onChange={e => setInputValue(e.target.value)} />
          <Input label="Placeholder" placeholder="請輸入文字" />
          <Input label="Focus（點擊輸入框）" placeholder="點此聚焦" defaultValue="" />
          <Input label="Error" state="error" value="錯誤的輸入" feedback="此欄位格式不正確" readOnly />
          <Input label="Warning" state="warning" value="需要注意" feedback="請確認填寫是否正確" readOnly />
          <Input label="Success" state="success" value="正確的輸入" feedback="驗證成功" readOnly />
          <Input label="Disabled" state="disabled" value="不可編輯的內容" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Input — With icons & clear</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input
            label="Prefix icon"
            placeholder="搜尋目的地"
            prefixIcon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#8c8c8c" strokeWidth="1.5"/><path d="M20 20l-3-3" stroke="#8c8c8c" strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
          />
          <Input
            label="Suffix icon"
            placeholder="選擇日期"
            suffixIcon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#8c8c8c" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#8c8c8c" strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
          />
          <Input
            label="Clearable"
            placeholder="輸入可清除"
            value={clearableValue}
            onChange={e => setClearableValue(e.target.value)}
            clearable
            onClear={() => setClearableValue("")}
          />
          <Input
            label="Helper text"
            placeholder="請輸入文字"
            helper="這是說明文字，提供額外的輸入提示。"
          />
        </div>
      </section>

      {/* Checkbox */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Checkbox — States</h2>
        <div className="flex flex-col gap-3">
          <Checkbox
            label="未選取"
            checked={checkboxes.a}
            onChange={v => setCheckboxes(s => ({ ...s, a: v }))}
          />
          <Checkbox
            label="已選取"
            checked={checkboxes.b}
            onChange={v => setCheckboxes(s => ({ ...s, b: v }))}
          />
          <Checkbox
            label="Indeterminate（部分選取）"
            checked={false}
            indeterminate
            onChange={v => setCheckboxes(s => ({ ...s, c: v }))}
          />
          <Checkbox
            label="Disabled 未選取"
            checked={false}
            disabled
          />
          <Checkbox
            label="Disabled 已選取"
            checked
            disabled
          />
          <Checkbox
            label="Disabled Indeterminate"
            checked={false}
            indeterminate
            disabled
          />
          <Checkbox
            label="含說明文字"
            subLabel="這是額外的說明文字，幫助使用者理解選項。"
            checked={checkboxes.d}
            onChange={v => setCheckboxes(s => ({ ...s, d: v }))}
          />
        </div>
      </section>

      {/* Radio */}
      <section className="flex flex-col gap-4">
        <h2 className="h3-tw">Radio Button — States</h2>
        <RadioGroup
          value={radio}
          onValueChange={setRadio}
          name="radio-demo"
          className="flex flex-col gap-3"
        >
          <RadioButton value="a" label="選項 A" />
          <RadioButton value="b" label="選項 B（預設選中）" />
          <RadioButton value="c" label="選項 C" />
          <RadioButton value="x" label="Disabled 未選取" disabled />
          <RadioButton value="y" label="Disabled 已選取" disabled />
          <RadioButton value="d" label="含說明文字" subLabel="這是額外的說明文字。" />
        </RadioGroup>
      </section>

    </>
  )
}
