# Cruise MLP — View page 靜態原型

AsiaYo 郵輪商品頁的多語系（MLP）盤點原型。復刻兩種商品型態的 view page，用來檢視 DNT／translate 標籤標記與四種語系呈現版本。

> 本 repo 只發布 `prototype/` 靜態頁面；標籤規範、書寫規範與工具鏈留在內部專案，不隨此 repo 發布。

## 頁面

| 商品 | 對應線上頁面 |
| :--- | :--- |
| Fly cruise — 挪威永恆號 NCL Encore・阿拉斯加 8 日 | [asiayo.com/zh-tw/cruise/item/137321](https://asiayo.com/zh-tw/cruise/item/137321/) |
| Home port — MSC 神女號 MSC Euribia・地中海 7 晚 | [asiayo.com/zh-tw/cruise/item/133872](https://asiayo.com/zh-tw/cruise/item/133872/) |

每個商品有四個版本：

| 版本 | 檔名 | 用途 |
| :--- | :--- | :--- |
| **標籤版** | `fly-cruise.html`／`home-port.html` | 顯示 XML／translate 標籤（被保護的文字為紅字）；藍綠＝DNT、棕金＝可翻譯、紫＝translate 詞庫 |
| **plain 版** | `*_plain.html` | 同內容、無任何標籤標記，看實際上架文案 |
| **英文版** | `*_en.html` | 全頁英文；被保護值不翻譯、直接取括號內英文 |
| **讀者語系版** | `*_zh.html` | 只留讀者語系（繁中），移除英文對照 |

入口頁：[`prototype/index.html`](prototype/index.html)

## 本機預覽

```bash
cd prototype && python3 -m http.server 8777
```

開啟 http://localhost:8777 。頁面圖片沿用 AsiaYo CDN，需連網才會顯示。

## 說明

- 文案逐字沿用線上頁面，未刪節；標籤與排版依內部郵輪書寫規範標記。
- 未標記的原始復刻版備份於 `prototype/_original/`。
- 不含真實庫存、價格計算與訂購流程，僅保留三個純視覺互動（出發日切換、艙等展開、房型切換）。
- 各版本的標記規則與更新紀錄見 [`prototype/README.md`](prototype/README.md)。
