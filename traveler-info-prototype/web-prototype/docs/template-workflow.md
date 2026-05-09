# Template Workflow — Design → Code 流程

> web-prototype 作為 AsiaYo 設計系統的 prototype 中樞，  
> 記錄從 Claude Design 到實際開發的完整流程與轉換規則。

---

## 角色與工具

| 角色 | 工具 | 職責 |
|------|------|------|
| 設計師 | Claude Design | 產出頁面 HTML wireframe |
| Claude Code | web-prototype | HTML 轉 React page.tsx |
| RD | 真實專案 + AI coding | 拿 template code 做實際開發 |

---

## 完整流程

```
1. 設計師用 Claude Design 規劃頁面 UI/UX
         ↓ 產出完整 HTML（含 design system token）

2. Claude Code 將 HTML 轉成 wp 的 page.tsx
   - inline style → Tailwind design token
   - 自訂 button/icon → components/ui 元件
   - 放在 src/app/template/{路由對應路徑}/page.tsx
         ↓

3. 設計師 copy template page 出去
         ↓ 在 Claude Design 進行 feature 改版

4. 改版後的 HTML 再透過步驟 2 導回 wp
   - 放在 src/app/feature/{ticket-number}/{路由路徑}/page.tsx
         ↓

5. RD 與設計師確認後
   - RD 拿 /feature/ 的 page.tsx 做 AI coding 開發
   - 開發完成後將 feature page 歸檔回 /template/ 更新基準
```

---

## 資料夾結構

```
src/app/
├── template/                        ← 現有頁面基準（穩定版）
│   ├── package/page.tsx
│   ├── cruise/
│   │   ├── list/page.tsx
│   │   └── item/[id]/page.tsx       ← dynamic route
│   └── ...
│
└── feature/                         ← 本次開發的 prototype
    ├── 2609-seb-revamp/
    │   └── package/page.tsx
    └── 2611-cruise-revamp/
        └── list/page.tsx
```

### 路由對應規則

| 真實路由 | template 路徑 |
|----------|--------------|
| `/package` | `template/package/page.tsx` |
| `/cruise/list?...` | `template/cruise/list/page.tsx` |
| `/cruise/item/{id}` | `template/cruise/item/[id]/page.tsx` |

Query string 不影響路由，篩選狀態用 hardcode 或 `useSearchParams()`。

---

## HTML → page.tsx 轉換規則

### 色值對照（inline style → Tailwind token）

| HTML 色值 | Tailwind class |
|-----------|---------------|
| `#ffffff` | `bg-white` / `text-white` |
| `#fafafa` | `bg-neutral-2` |
| `#f5f5f5` | `bg-neutral-3` |
| `#e8e8e8` | `border-neutral-4` |
| `#d9d9d9` | `bg-neutral-5` |
| `#bfbfbf` | `text-neutral-6` / `border-neutral-6` |
| `#8c8c8c` | `text-neutral-7` |
| `#595959` | `text-neutral-8` |
| `#262626` | `text-neutral-9` |
| `#1e9fd2` | `primary-6` |
| `#0f7aab` | `primary-7` |
| `#055885` | `primary-8` |
| `#f0fdff` | `primary-1` |
| `#c7f7ff` | `primary-2` |
| `#f4511e` | `danger-6` |
| `#04ad00` | `success-6` |

### Icon 策略

AsiaYo iconfont（`Ay-Web-Icons-Line`）只有 96 個 icon，不足的用 Material Symbols 補。

```tsx
// 1. 先查 src/lib/icons/Ay-Web-Icons-Line.json 有沒有對應名稱
//    有 → 用 <Icon> 元件
<Icon name="chevron-left" type="line" size={20} />

// 2. 沒有 → 用 <MatIcon>（Material Symbols，頁面動態載入）
<MatIcon name="local_fire_department" size={20} />

// MatIcon helper（每個 template page 自行定義或從 _components/ 引入）
function MatIcon({ name, size = 24, className }) {
  return (
    <span className={cn("material-symbols-outlined leading-none", className)}
          style={{ fontSize: size }}>
      {name}
    </span>
  )
}
```

**常見 icon 對照：**

| HTML（Material Symbols） | 替換方案 |
|--------------------------|---------|
| `chevron_left/right/up/down` | `<Icon name="chevron-*" type="line">` ✅ |
| `check_circle` | `<Icon name="check-circle" type="line">` ✅ |
| `phone` | `<Icon name="phone" type="solid">` ✅ |
| `mobile` | `<Icon name="mobile" type="line">` ✅（注意：不是 mobile-phone）|
| `local_fire_department` | `<MatIcon name="local_fire_department">` |
| `straighten`（ruler） | `<MatIcon name="straighten">` |
| `verified_user` | `<MatIcon name="verified_user">` |
| `support_agent` | `<MatIcon name="support_agent">` |

### 元件替換優先順序

1. 先確認 `src/components/ui/index.ts` 有沒有對應元件
2. 有 → 換用，無 → 保留原生 HTML 元素

| 使用情境 | components/ui 元件 |
|---------|-------------------|
| 一般文字/動作按鈕 | `<Button variant appearance size>` |
| Icon-only 圓形按鈕 | `<IconButton shape="rounded">` |
| Chip 篩選器（有 active 狀態） | `<FilterPill label active onClick>` |
| 導覽分類 tab | 原生 `<button>`（客製樣式） |
| Accordion toggle | 原生 `<button>` |

---

## 架構決策

### Header / Footer 共用

- **目前（頁面少）**：各頁自行 include，不抽共用
- **未來（第二頁確認內容一致後）**：抽到 `template/_components/SiteHeader.tsx`
- **不用 `layout.tsx`**：Next.js layout 是「magic」，AI coding 時讀 page.tsx 會看不到完整結構

### 每頁原則

每個 `page.tsx` 應該是**自包含**的——看這一個檔案就能理解整個頁面的組成，方便 RD 拿去做 AI coding。

---

## 歸檔規則

| 階段 | 放哪裡 | 說明 |
|------|--------|------|
| 初次建立基準頁 | `template/` | 從 Claude Design HTML 轉換 |
| 新 feature 改版 | `feature/{ticket}/` | 設計師 copy 後改版再導入 |
| RD 開發完成上線 | 更新回 `template/` | 保持 template 是最新基準 |
