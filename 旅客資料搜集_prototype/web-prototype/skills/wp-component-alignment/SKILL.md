---
name: wp-component-alignment
description: >
  AsiaYo 前端元件對齊流程。當使用者說「幫我對齊 [元件名稱]」、「把 [元件] 從 ul 移植到 wp」、
  「更新 [元件] 的 props」、「比對 [元件] 跟設計稿」，或提到要對齊 ui-library 與 web-prototype 的任何元件時，
  使用此 skill。流程涵蓋：props 差異比對、ZeroHeight / Figma 設計稿驗證、bug 修正、
  design token 替換、缺漏 variant 補齊、demo page 更新、barrel export 更新、遷移文件更新。
---

# wp 元件對齊流程

此 skill 紀錄將 ui-library（ul）元件對齊至 web-prototype（wp）標準的完整步驟。
適用對象：wp 內任何尚未對齊 ul 的 UI 元件。

**架構背景**
- wp：shadcn + Tailwind + `@base-ui/react`
- ul：styled-components
- 命名標準以 wp 為準（`variant` / `appearance` / `sm|md|lg`）

---

## 設計稿參考資料（選填，有的話更準確）

開始前，先確認使用者是否提供以下資料：

### Figma SVG
如果使用者貼上 SVG 原始碼，從中提取各 state 的**精確色值**：
- 找每個 `<rect>` 或 `<path>` 的 `fill`、`stroke` 屬性
- 找 `opacity` 屬性（disabled 通常是 `opacity="0.48"`）
- 對照不同 x 座標推算 state 順序：通常 default → hover → active → loading → focus → disabled

SVG 是最終仲裁依據，可以抓到 ul 實作與設計稿不一致的地方（例如 flat hover bg 色值）。

### ZeroHeight URL
如果使用者提供 URL，用 `WebFetch` 爬取頁面內容，重點找：
- 哪些 variant 組合標示「—」（intentionally absent，不應實作）
- 各 state 的說明文字
- 尺寸規格（px）

**沒有以上資料時**：以 ul source code 為準，後續如遇不確定處，請使用者提供設計稿確認。

---

## Phase 0：確認 Primitive 來源

在開始盤點差異前，先確認這個元件應該用哪個底層 primitive。

### 0-1 查 shadcn 有沒有對應元件

shadcn 有的元件會提供「接好 @base-ui primitive + 基本結構」的骨架，省去自己組合的功夫。

```bash
# 在 web-prototype 目錄執行
npx shadcn@latest add [component-name] --overwrite
```

常見可用的 shadcn 元件：`button`、`alert-dialog`、`dialog`、`select`、`dropdown-menu`、`popover`、`tooltip`、`checkbox`、`radio-group`、`switch`、`slider`、`tabs` 等。

生成後的檔案會放在 `src/components/ui/[component-name].tsx`，底層已接好 `@base-ui/react/[component]`，接著只需要替換樣式。

### 0-2 shadcn 沒有時，直接用 @base-ui/react

先確認 @base-ui/react 有哪些 primitive 可用：

```bash
node -e "
const p = require('./node_modules/@base-ui/react/package.json');
console.log(Object.keys(p.exports||{}).join('\n'));
"
```

找到對應的 primitive 後，直接 import 使用：

```tsx
import { NumberField } from "@base-ui/react/number-field"
// 查看可用的 sub-components
const { Root, Input, Increment, Decrement, Group } = NumberField
```

**決策表：**

| 情況 | 做法 |
|------|------|
| shadcn 有此元件 | `npx shadcn add [component] --overwrite`，取得骨架後替換樣式 |
| shadcn 沒有，@base-ui 有 | 直接用 `@base-ui/react/[primitive]` 從頭寫 |
| 兩者都沒有 | 手刻，注意 a11y（role、aria、keyboard 支援）|
| 純展示型（無互動）| 不需要 primitive，直接用語意化 HTML |

---

## Phase 1：盤點差異

### 1-1 讀 ul 元件原始碼

依序讀取以下檔案（路徑：`ui-library/src/components/[ComponentName]/`）：

- `types.ts` — props 定義、type、Level/Size/StyleType 等
- `constants.ts` — 枚舉值（BUTTON_SIZE、BUTTON_SHAPE 等）
- `Solid.ts` / `Outline.ts` / `Flat.ts`（若存在）— 各 appearance 的樣式邏輯
- `index.tsx` — 元件實作，注意 loading、disabled、icon 的處理方式
- `CommonConfig.ts`（若存在）— 共用樣式（disabled opacity、cursor、shadow 等）

重點記錄：
- 有哪些 variant（`level`）值？
- `styleType` 有哪些值？
- 尺寸值是什麼？
- icon 如何傳入？
- disabled / loading 如何處理？
- shadow、focus ring 如何處理？

### 1-2 讀 wp 元件現況

讀取 `web-prototype/src/components/ui/[component-name].tsx`，記錄：
- 目前的 props 定義
- 使用的底層 primitive（原生 `<button>`？`@base-ui/react`？）
- 是否有 hardcode hex 色值（找 `#` 開頭的顏色）
- disabled / loading / hover 的處理方式

### 1-3 對照設計稿（ZeroHeight / Figma SVG）

如果使用者提供 SVG 或截圖，從中提取：
- 各 state（default / hover / active / disabled / loading）的色值
- 元件尺寸（px）
- 確認哪邊實作是正確的

**色值對照方式**：
- ul 使用 0-indexed token（`colors.primary[5]`）
- wp 使用 1-indexed token class（`primary-6`）
- 規則：ul index + 1 = wp token 數字

### 1-4 建立差異表

整理三欄比較表：

| 項目 | wp 現況 | ul | ZeroHeight / Figma |
|------|--------|----|--------------------|
| 色系 prop | ... | ... | ... |
| 外觀 prop | ... | ... | ... |
| ...  | ... | ... | ... |

---

## Phase 2：修正

依以下順序逐一修正 wp 元件：

### 2-1 替換 hardcode hex → design token

搜尋所有 `#xxxxxx` 格式的色值，對照下表替換：

| 常見 hex | 應換成 |
|---------|--------|
| `#1e9fd2` | `primary-6` |
| `#0f7aab` | `primary-7` |
| `#055885` | `primary-8` |
| `#f0fdff` | `primary-1` |
| `#c7f7ff` | `primary-2` |
| `#f4511e` | `danger-6` |
| `#fff3eb` | `danger-1` |
| `#ffd8c2` | `danger-2` |
| `#bfbfbf` | `neutral-6` |
| `#595959` | `neutral-8` |
| `#f5f5f5` | `neutral-3` |
| `#e8e8e8` | `neutral-4` |

其他色系（success、warning）依相同 +1 規則類推。

### 2-2 修正 disabled 處理

確認 disabled 狀態是否正確：

```tsx
// ✅ 正確
"disabled:cursor-not-allowed disabled:opacity-[0.48]"

// ❌ 錯誤（pointer-events-none 會讓 cursor 失效）
"disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-[0.48]"
```

### 2-3 修正 loading 處理

loading 時 opacity 應保持 100%，且阻擋點擊：

```tsx
// 基礎 class 加上
"aria-busy:pointer-events-none aria-busy:opacity-100"

// JSX 傳入
disabled={disabled || loading}
aria-busy={loading || undefined}
```

### 2-4 修正 hover / active 在 disabled 時仍觸發的問題

所有 `hover:` 和 `active:` 樣式前面加 `not-disabled:` 前綴：

```tsx
// ❌ 錯誤
"hover:bg-primary-7 active:bg-primary-8"

// ✅ 正確
"not-disabled:hover:bg-primary-7 not-disabled:active:bg-primary-8"
```

### 2-5 補齊缺漏的 variant

對照 ul 和設計稿，補上 wp 缺少的 variant（常見：`success`、`warning`）。

各色系的 compound variant 結構：

```tsx
// Solid
{ variant: "success", appearance: "solid",
  className: "bg-success-6 text-white not-disabled:hover:bg-success-7 not-disabled:active:bg-success-8 focus-visible:ring-2 focus-visible:ring-success-6/50 [&[aria-busy=true]]:bg-success-8" }

// Outline
{ variant: "success", appearance: "outline",
  className: "bg-white border-success-6 text-success-6 not-disabled:hover:bg-success-1 not-disabled:active:bg-success-2 focus-visible:ring-2 focus-visible:ring-success-6/50 [&[aria-busy=true]]:bg-success-2" }

// Flat（Button）
{ variant: "success", appearance: "flat",
  className: "text-success-6 not-disabled:hover:text-success-7 not-disabled:active:text-success-8" }

// Flat（IconButton）— hover bg 與 outline 相同（設計稿確認）
{ variant: "success", appearance: "flat",
  className: "text-success-6 not-disabled:hover:bg-success-1 not-disabled:active:bg-success-2" }
```

### 2-6 補齊缺漏的 props

對照 ul 的 `types.ts`，補上 wp 缺少的 props：

常見缺漏項目：
- `shadow?: boolean`（加 box-shadow，對 pill/circular 有視覺效果）
- `loading?: boolean`（IconButton 常見）
- `icon?: ReactNode`（Button）
- `sm` size（IconButton 的 32px icon-only group）

shadow 的實作：

```tsx
// Props
shadow?: boolean

// className
shadow && "[box-shadow:0_4px_8px_color-mix(in_srgb,var(--color-neutral-10)_16%,transparent)]"
```

### 2-7 換用 @base-ui/react primitive

如果元件目前用原生 `<button>`，改為 `@base-ui/react/button`：

```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button"

// 使用
<ButtonPrimitive
  data-slot="button"
  className={cn(variants(...))}
  disabled={disabled || loading}
  aria-busy={loading || undefined}
  {...props}
>
```

### 2-8 補 focus-visible ring

每個 variant 的 compound variant 裡加上：

```tsx
"focus-visible:ring-2 focus-visible:ring-[variant]-6/50"
```

### 2-9 補 export

確認元件有 export variants：

```tsx
export { buttonVariants }
export { iconButtonVariants }
```

---

## Phase 3：整合

### 3-1 更新 demo page

找到 `src/app/_sections/[ComponentName]Section.tsx`，補上新增的 variant 示範：

```tsx
// 每個新 variant 補一個 section
<section className="flex flex-col gap-4">
  <h2 className="h3-tw">Success</h2>
  <div className="flex flex-wrap gap-4 items-center">
    <Button variant="success" appearance="solid">Solid</Button>
    <Button variant="success" appearance="outline">Outline</Button>
    <Button variant="success" appearance="flat">Flat</Button>
  </div>
</section>
```

States section 補上 loading 示範（如果元件有 loading prop）。

### 3-2 確認 barrel export（index.ts）

開啟 `src/components/ui/index.ts`，確認新增的 export 都有被加入：

```ts
export type { ComponentProps } from "./component"
export { Component, componentVariants } from "./component"
```

### 3-3 確認其他元件是否有用到此元件

搜尋 project 內是否有其他元件 import 此元件：

```bash
grep -r "from.*components/ui/[component-name]" src --include="*.tsx" -l
```

如果有，評估是否需要：
- 更新 import 路徑
- 替換為新的 props 寫法

### 3-4 更新遷移文件

更新 `docs/元件API比較與統整計畫.md`：

1. 在第二節更新比較表，標記已完成項目（✅）
2. 在第四節更新統整建議狀態
3. 在第七節（遷移指南）補上此元件的完整說明，包含三個部分：

**① props 對照表（每個 prop 一行）**
```markdown
| 項目 | ul 寫法 | wp 寫法 |
|------|--------|--------|
| 色系 | `level="primary"` | `variant="primary"` |
| 外觀 | `styleType="solid"` | `appearance="solid"` |
...
```

**② ul 有但 wp 不支援 / 刻意不對齊的項目（⚠️ 標注）**

這些必須明確寫出來，讓使用者遷移時知道需要自己處理：
```markdown
**⚠️ ul 有但 wp 不支援的行為：**
- `autoFormat` — wp 用 @base-ui 自動處理，不需要此 prop
- 長按連續觸發 — ul 有，wp 無，有需要請自行在 caller 實作
- `onChange` 簽名不同 — ul 回傳 event，wp 直接回傳 value
```

**③ 程式碼範例（遷移前後對照）**
```tsx
// ul
<Component level="primary" styleType="solid" size="medium" />

// wp
<Component variant="primary" appearance="solid" size="md" />
```

---

## Phase 4：驗證

### 4-1 型別檢查

```bash
cd web-prototype && npx tsc --noEmit
```

確認沒有型別錯誤。

### 4-2 視覺確認

啟動 dev server 後到 demo page 確認：
- 新增的 variant 視覺正確
- hover / active 有效果
- disabled 狀態不觸發 hover，且顯示 not-allowed cursor
- loading 狀態 opacity 維持 100%
- focus ring 在鍵盤 Tab 時出現

---

## ✅ 完成前 Self-Check

在結束這次對齊前，逐項確認：

- [ ] `src/components/ui/index.ts` 有更新（新增的 export 都補上）
- [ ] `docs/元件API比較與統整計畫.md` 已補：
  - [ ] ul vs wp 比較表（每個 prop 一行）
  - [ ] ⚠️ ul 有但 wp 不支援的項目
  - [ ] 遷移程式碼範例（before / after）
  - [ ] 進度表狀態已更新（❌ → ✅，數字已調整）
- [ ] `npx tsc --noEmit` 通過，無 badge 相關錯誤
- [ ] demo section（`_sections/[Component]Section.tsx`）涵蓋所有新增 variant / 狀態

**以上任何一項未完成，不算對齊完成。**

---

## 常見 Token 對照速查

| 概念 | ul 寫法 | wp class |
|------|---------|----------|
| 色系 prop | `level` | `variant` |
| 外觀 prop | `styleType` | `appearance` |
| 尺寸 sm | `size="small"` | `size="sm"` |
| 尺寸 md | `size="medium"` | `size="md"` |
| 尺寸 lg | `size="large"` | `size="lg"` |
| Icon | `iconName / iconType` | `icon={<Icon />}` 或 `children` |
| primary base | `theme.colors.primary[5]` | `primary-6` |
| primary hover | `theme.colors.primary[6]` | `primary-7` |
| primary active | `theme.colors.primary[7]` | `primary-8` |
| outline hover bg | `primary[0]` | `primary-1` |
| outline active bg | `primary[1]` | `primary-2` |
