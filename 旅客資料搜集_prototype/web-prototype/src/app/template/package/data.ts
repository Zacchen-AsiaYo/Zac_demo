// Auto-extracted from SEB_wireframe_v1.html

export interface Event {
  id: string
  title: string
  location?: string
  headline?: string
  distance?: string
  includes?: string
  price?: number | null
  priceText?: string
  img: string
  url?: string
  chips: string[]
  soldOut?: boolean
  badge?: string
}

export interface Section {
  id: string
  title: string
  chips: string[]
  events: Event[]
  viewAllUrl?: string
}

export interface TabConfig {
  secondTabs: string[]
  sections: Section[]
}

export const TAB_CONFIG: Record<string, TabConfig> = {
  "hot": {
    secondTabs: ["追求PB", "新手友善", "挑戰極限", "包車/一日遊"],
    sections: [
      {
        id: "s-PRrunner",
        title: "追求PB",
        chips: ["all", "hot", "beginner", "challenge", "summer", "autumn", "winter"],
        viewAllUrl: "#",
        events: [
          {"id": "e2", "title": "札幌馬拉松 2026/10/04", "location": "北海道", "headline": "★安排薄野站3分超人氣飯店，遊札幌最便利！ · ★最適合跑步的十月涼秋，感受北海道最大規模賽事之一的活力，體驗札幌獨有的城市魅力 · ★賽道前半段將跑過「薄野 (すすきの)」和「大通公園」等札幌主要觀光地標，是一場難得的城市觀光路跑。", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿自由行", "price": 8560, "priceText": "每人最低 NT$8,560 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1762160066691_すすきの交差点.jpg", "url": "https://asiayo.com/zh-tw/journey/sapporo-marathon/", "chips": ["hot", "pb", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e3", "title": "水戶黃門漫遊馬拉松 2026/10/25", "location": "茨城縣 水戶市", "headline": "★日本百選賽事 · ★完賽即可獲得重厚感十足的「水戶黃門印籠獎牌」，設計融合水戶德川家葵紋與在地名產「梅花」，極具紀念價值與日本文化特色。 · ★賽道行經日本三名園之一的「偕樂園」及千波湖畔，在紅葉季節中穿梭歷史古蹟與自然景觀，享受如「漫遊", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 11380, "priceText": "每人最低 NT$11,380 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777014530358_image.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133517/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e4", "title": "岩手盛岡城市馬拉松 2026/10/04", "location": "岩手縣 盛岡市", "headline": "★日本百選賽事 · ★您將奔馳於盛岡城下町，遠眺雄偉的岩手山，在深秋涼爽的氣候中，伴隨沿途市民熱情的應援，體驗歷史與自然的交織。 · ★全馬完賽獎是特別的南方鐵器獎牌及完賽毛巾！ · ★入住盛岡站4分鐘舒適飯店，觀光比賽皆便利。", "distance": "全馬｜歡樂跑(12.1K)", "includes": "參賽權＋精選住宿2晚", "price": 8230, "priceText": "每人最低 NT$8,230 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1776136391085_feature2-1.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133024/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e5", "title": "山形馬拉松 2026/10/04", "location": "山形縣", "headline": "★日本百選賽事，賽後更能享用「日本第一芋煮會」大鍋製作的熱騰騰芋煮，溫暖每位跑者的身心。 · ★途經國寶級西洋建築「文翔館」與江戶時代的「霞城公園」，在每一步呼吸中感受深厚的文化底蘊 · ★先苦後甜的PB挑戰坡度，撐過後便是長達數公里的暢快", "distance": "半馬", "includes": "參賽權＋精選住宿2晚", "price": 9300, "priceText": "每人最低 NT$9,300 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777276996120_mainvisual-202503.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133541/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e6", "title": "新潟馬拉松 2026/10/11", "location": "新潟", "headline": "★日本百選賽事 · ★賽道筆直且起伏較小，容易創造紀錄的超高速賽道，與AsiaYo訂購，全馬完賽將提供特別完賽獎牌！ · ★沿途有當地居民很高熱情為跑者加油，沿途品嚐新潟特色美食與飲品", "distance": "全馬｜歡樂跑(10.6K)", "includes": "參賽權＋精選住宿2晚", "price": 8685, "priceText": "每人最低 NT$8,685 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773387216536_1-1photobigswan.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/131251/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e7", "title": "東京新年半程馬拉松2027/01/10", "location": "東京都", "headline": "★本賽事獲得日本陸連(JAAF)公認及世界陸連(WA)認證，成績可列入世界排名及國際賽參賽標準，是追求正式紀錄選手的首選 · ★賽事於1月上旬舉行，充滿新年氣息；會場鄰近赤羽岩淵站，從東京市中心出發交通極為便利，非常適合參賽兼觀光。 · ★", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 10760, "priceText": "每人最低 NT$10,760 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777530486308_609413893_18340632439233969_7627305703104965762_n.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133702/", "chips": ["hot", "pb", "beginner", "winter"], "soldOut": false, "badge": ""},
          {"id": "e8", "title": "JTBC首爾馬拉松 2026/11/01", "location": "韓國 首爾", "headline": "★為紀念奧運舉辦的賽事，起點為首爾世界盃競技場，終點則在首爾綜合運動場 · ★首爾經典地標盡收眼底，全馬賽道橫跨漢江的楊花大橋進入汝矣島，再經過麻浦大橋，沿路欣賞麻浦區和高樓林立的城市風光。 · ★結合韓流文化、音樂和城市探索，讓每位參賽者", "distance": "全馬｜10K", "includes": "參賽權＋精選住宿4晚", "price": 13155, "priceText": "每人最低 NT$13,155 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772764153054_JTBC2.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130687/", "chips": ["hot", "pb", "beginner"], "soldOut": false, "badge": ""},
          {"id": "e9", "title": "北海道馬拉松 2026/08/30", "location": "北海道", "headline": "★日本百選賽事 · ★全馬路線可體驗東京奧運賽道、跑進北海道大學 · ★利用札幌涼爽的氣候，成為日本唯一在夏季舉行的全程馬拉松比賽", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 9950, "priceText": "每人最低 NT$9,950 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1770370069276_23-102-238_C-1-1200x800.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/129948/", "chips": ["hot", "pb", "summer"], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-newrunner",
        title: "新手友善",
        chips: ["all", "hot", "pb", "challenge", "autumn", "winter"],
        viewAllUrl: "#",
        events: [
          {"id": "e1", "title": "富士山馬拉松 2026/12/13", "location": "山梨縣", "headline": "★日本百選賽事，一生必去的賽事！ · ★精選超人氣飯店讓您輕鬆選擇 · ★富士山造型的可愛獎牌GET!", "distance": "全馬｜環湖｜歡樂跑", "includes": "參賽權＋精選住宿2晚", "price": null, "priceText": "", "img": "https://gsimg.asiayo.com/ay-image-upload/1777861684475_Snipaste_2026-05-04_10-27-36.jpg", "url": "https://forms.gle/6VxwsYGnFBrSJURM6", "chips": ["hot", "beginner", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e3", "title": "水戶黃門漫遊馬拉松 2026/10/25", "location": "茨城縣 水戶市", "headline": "★日本百選賽事 · ★完賽即可獲得重厚感十足的「水戶黃門印籠獎牌」，設計融合水戶德川家葵紋與在地名產「梅花」，極具紀念價值與日本文化特色。 · ★賽道行經日本三名園之一的「偕樂園」及千波湖畔，在紅葉季節中穿梭歷史古蹟與自然景觀，享受如「漫遊", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 11380, "priceText": "每人最低 NT$11,380 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777014530358_image.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133517/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e4", "title": "岩手盛岡城市馬拉松 2026/10/04", "location": "岩手縣 盛岡市", "headline": "★日本百選賽事 · ★您將奔馳於盛岡城下町，遠眺雄偉的岩手山，在深秋涼爽的氣候中，伴隨沿途市民熱情的應援，體驗歷史與自然的交織。 · ★全馬完賽獎是特別的南方鐵器獎牌及完賽毛巾！ · ★入住盛岡站4分鐘舒適飯店，觀光比賽皆便利。", "distance": "全馬｜歡樂跑(12.1K)", "includes": "參賽權＋精選住宿2晚", "price": 8230, "priceText": "每人最低 NT$8,230 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1776136391085_feature2-1.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133024/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e5", "title": "山形馬拉松 2026/10/04", "location": "山形縣", "headline": "★日本百選賽事，賽後更能享用「日本第一芋煮會」大鍋製作的熱騰騰芋煮，溫暖每位跑者的身心。 · ★途經國寶級西洋建築「文翔館」與江戶時代的「霞城公園」，在每一步呼吸中感受深厚的文化底蘊 · ★先苦後甜的PB挑戰坡度，撐過後便是長達數公里的暢快", "distance": "半馬", "includes": "參賽權＋精選住宿2晚", "price": 9300, "priceText": "每人最低 NT$9,300 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777276996120_mainvisual-202503.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133541/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e6", "title": "新潟馬拉松 2026/10/11", "location": "新潟", "headline": "★日本百選賽事 · ★賽道筆直且起伏較小，容易創造紀錄的超高速賽道，與AsiaYo訂購，全馬完賽將提供特別完賽獎牌！ · ★沿途有當地居民很高熱情為跑者加油，沿途品嚐新潟特色美食與飲品", "distance": "全馬｜歡樂跑(10.6K)", "includes": "參賽權＋精選住宿2晚", "price": 8685, "priceText": "每人最低 NT$8,685 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773387216536_1-1photobigswan.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/131251/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e7", "title": "東京新年半程馬拉松2027/01/10", "location": "東京都", "headline": "★本賽事獲得日本陸連(JAAF)公認及世界陸連(WA)認證，成績可列入世界排名及國際賽參賽標準，是追求正式紀錄選手的首選 · ★賽事於1月上旬舉行，充滿新年氣息；會場鄰近赤羽岩淵站，從東京市中心出發交通極為便利，非常適合參賽兼觀光。 · ★", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 10760, "priceText": "每人最低 NT$10,760 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777530486308_609413893_18340632439233969_7627305703104965762_n.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133702/", "chips": ["hot", "pb", "beginner", "winter"], "soldOut": false, "badge": ""},
          {"id": "e8", "title": "JTBC首爾馬拉松 2026/11/01", "location": "韓國 首爾", "headline": "★為紀念奧運舉辦的賽事，起點為首爾世界盃競技場，終點則在首爾綜合運動場 · ★首爾經典地標盡收眼底，全馬賽道橫跨漢江的楊花大橋進入汝矣島，再經過麻浦大橋，沿路欣賞麻浦區和高樓林立的城市風光。 · ★結合韓流文化、音樂和城市探索，讓每位參賽者", "distance": "全馬｜10K", "includes": "參賽權＋精選住宿4晚", "price": 13155, "priceText": "每人最低 NT$13,155 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772764153054_JTBC2.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130687/", "chips": ["hot", "pb", "beginner"], "soldOut": false, "badge": ""},
          {"id": "e10", "title": "神戶馬拉松 2026/11/15", "location": "兵庫縣 神戶市", "headline": "★日本百選賽事，日本最早的馬拉松賽事 · ★時間限制7小時且賽道設計大多平坦，適合各種程度的跑者。 · ★歷史名城－神戶，體驗美妙城市的同時享受日本文化和風景。", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 10290, "priceText": "每人最低 NT$10,290 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773120338779_image.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130811/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-Seniorrunner",
        title: "挑戰極限",
        chips: ["all", "hot", "pb", "beginner", "autumn"],
        viewAllUrl: "#",
        events: [
          {"id": "e1", "title": "富士山馬拉松 2026/12/13", "location": "山梨縣", "headline": "★日本百選賽事，一生必去的賽事！ · ★精選超人氣飯店讓您輕鬆選擇 · ★富士山造型的可愛獎牌GET!", "distance": "全馬｜環湖｜歡樂跑", "includes": "參賽權＋精選住宿2晚", "price": null, "priceText": "", "img": "https://gsimg.asiayo.com/ay-image-upload/1777861684475_Snipaste_2026-05-04_10-27-36.jpg", "url": "https://forms.gle/6VxwsYGnFBrSJURM6", "chips": ["hot", "beginner", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e2", "title": "札幌馬拉松 2026/10/04", "location": "北海道", "headline": "★安排薄野站3分超人氣飯店，遊札幌最便利！ · ★最適合跑步的十月涼秋，感受北海道最大規模賽事之一的活力，體驗札幌獨有的城市魅力 · ★賽道前半段將跑過「薄野 (すすきの)」和「大通公園」等札幌主要觀光地標，是一場難得的城市觀光路跑。", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿自由行", "price": 8560, "priceText": "每人最低 NT$8,560 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1762160066691_すすきの交差点.jpg", "url": "https://asiayo.com/zh-tw/journey/sapporo-marathon/", "chips": ["hot", "pb", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e11", "title": "橫濱馬拉松 2026/10/25", "location": "神奈川縣 橫濱市", "headline": "★獨特的橫濱賽道，盡情奔跑在許多旅遊名勝地。 · ★穿越平時無法奔跑的灣岸高速公路，享受港口城市橫濱的美景！ · ★沿路設有補給站，不僅提供獨特的表演及當地橫濱和神奈川的食品作為“幸運伙食”。", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 13180, "priceText": "每人最低 NT$13,180 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772609212028_69960ea59a8c6c5ff4b4c824d4f27846.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130587/", "chips": ["hot", "beginner", "challenge", "autumn"], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-Hotsaleproject",
        title: "包車/一日遊",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e13", "title": "AsiaYo FB社團 運動玩家俱樂部", "location": "", "headline": "即日期～6/30 加入運動社團 · 可獲得好禮 eSIM 1GB 乙張 ＆ 賽事100元折扣券", "distance": "", "includes": "", "price": null, "priceText": "期間限定贈好禮", "img": "https://gsimg.asiayo.com/ay-image-upload/1747994709137_%E8%87%89%E6%9B%B8%E7%A4%BE%E5%9C%98%20(560%20x%20300%20%E5%83%8F%E7%B4%A0)%20(1960%20x%20600%20%E5%83%8F%E7%B4%A0)%20(1336%20x%20804%20%E5%83%8F%E7%B4%A0).png", "url": "https://www.facebook.com/groups/708417271570269?locale=zh_TW", "chips": ["tour"], "soldOut": false, "badge": ""},
          {"id": "e14", "title": "函館山包車夜景遊｜60/90分鐘路線", "location": "函館馬拉松", "headline": "★馬拉松跑者推薦！ · ★超人氣函館夜景獨佔包車行程！專屬車輛飯店接送，不需排隊、不怕冷風 · ★1-9人座車可依人數選擇", "distance": "函館市內飯店接送", "includes": "精選觀光包車", "price": 1628, "priceText": "每人最低 NT$1,628 起", "img": "https://asiayo.com/_next/image/?url=https%3A%2F%2Fimage-store.asiayo.com%2Fbnb%2F119640%2F960xauto%2Fdesc_ArO3cMzoJEv2IE.webp&w=1080&q=75", "url": "https://asiayo.com/zh-tw/activity/119640/?aff_id=490", "chips": ["tour"], "soldOut": false, "badge": ""},
          {"id": "e15", "title": "函館觀光包車一日遊｜3小時", "location": "函館馬拉松", "headline": "★ 馬拉松跑者推薦！ · ★經驗豐富的資深司機導覽，安全舒適地度過愉快的北海道之旅！ · ★1-9人座車可依人數選擇", "distance": "函館市內飯店/車站/機場接送", "includes": "精選觀光包車", "price": 3618, "priceText": "每人最低 NT$3,618 起", "img": "https://image-store.asiayo.com/bnb/119645/750xauto/desc_hk2XV3Y5ygV3nO.webp", "url": "https://asiayo.com/zh-tw/activity/119645/?aff_id=490", "chips": ["tour"], "soldOut": false, "badge": ""},
          {"id": "e16", "title": "【首爾出發】首爾10大打卡熱點精華一日遊", "location": "JTBC首爾馬拉松", "headline": "★高效率蒐羅首爾最熱門景點美照 · ★COEX星空圖書館&東大門設計廣場 · ★美食聖地廣藏市場&潮流前線聖水洞", "distance": "請提前2天預訂", "includes": "1人成行．贈樂天免稅店優惠券", "price": 2248, "priceText": "每人最低 NT$2,248 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1718784345281_Gwanghwamun8.jpg", "url": "https://asiayo.com/zh-tw/activity/54111/", "chips": ["tour"], "soldOut": false, "badge": ""},
          {"id": "e17", "title": "【首爾出發】首爾秘境夜景+廣藏市場半日遊 (1~8人小團)", "location": "JTBC首爾馬拉松", "headline": "★北岳Skyway八角亭 觀賞首爾壯麗日落與夜景 · ★探索廣藏市場 品嚐地道韓國美食 · ★鷹峰山八角亭眺望首爾靜謐夜景", "distance": "請提前2天預訂", "includes": "1人成行．贈樂天免稅店優惠券", "price": 2091, "priceText": "每人最低 NT$2,091 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1723804310997_Eungbongsan-03.jpg", "url": "https://asiayo.com/zh-tw/activity/65517/", "chips": ["tour"], "soldOut": false, "badge": ""},
          {"id": "e18", "title": "【首爾出發】廣藏市場特色美食之旅★美食集章大挑戰★", "location": "JTBC首爾馬拉松", "headline": "★探索廣藏市場 品嚐傳統韓國街頭美食 · ★參與美食集章挑戰 收集印章贏取紀念品 · ★感受市場熱鬧氛圍 享受美食與文化的雙重饗宴", "distance": "請提前2天預訂", "includes": "1人成行．贈樂天免稅店優惠券", "price": 2115, "priceText": "每人最低 NT$2,115 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1721227591970_광장시장_24.jpg", "url": "https://asiayo.com/zh-tw/activity/54926/", "chips": ["tour"], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "jp_mar": {
    secondTabs: ["4-6月", "7-9月", "10-12月", "1-3月", "超級馬拉松", "所有"],
    sections: [
      {
        id: "s-spring-jpmarathon",
        title: "4-6月",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e19", "title": "函館馬拉松 2026/06/28", "location": "北海道", "headline": "★國際認證賽道，日本百選賽事 · ★路線可眺望函館山及津輕海峽等景點 · ★一路吃到飽的美食大道", "distance": "全馬｜半馬", "includes": "參賽權＋精選住宿自由行", "price": 8310, "priceText": "每人最低 NT$8,310 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773288011862_函館完售.jpg", "url": "https://asiayo.com/zh-tw/journey/hakodate-marathon/", "chips": ["spring"], "soldOut": false, "badge": ""},
          {"id": "e20", "title": "仙台半程馬拉松 2026/05/10", "location": "仙台", "headline": "★日本國內屈指可數的人氣國際馬拉松大會，森林之都的一級賽事. 仙台市因為森林覆蓋率高，自然環境優美，因此又被日本人稱為「森林之都』，每年有約一萬人共襄盛舉 · ★2006年起和台南結為姊妹城市，一起來到日本仙台參加半程馬拉松體驗人文及在地風", "distance": "半馬", "includes": "參賽權＋精選住宿2晚", "price": 8925, "priceText": "每人最低 NT$ 8,925起", "img": "https://gsimg.asiayo.com/ay-image-upload/1767601173899_Snipaste_2026-01-05_16-19-22.jpg", "url": "https://asiayo.com/zh-tw/activity/96184/", "chips": ["spring"], "soldOut": false, "badge": ""},
          {"id": "e21", "title": "洞爺湖馬拉松 2026/05/17", "location": "北海道", "headline": "★ 日本百選賽事 · ★ 欣賞洞爺湖的絕美湖景與周邊山景，迎著涼風跑出好成績 · ★賽後免費溫泉慰勞：大會提供參賽者「免費溫泉入浴券」，完賽後即可至合作的溫泉飯店泡湯，舒緩肌肉疲勞並洗去汗水", "distance": "全馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 16850, "priceText": "每人最低 NT$16,850 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772764106907_洞爺湖.jpg", "url": "https://asiayo.com/zh-tw/activity/115527/", "chips": ["spring"], "soldOut": false, "badge": ""},
          {"id": "e22", "title": "日立櫻花馬拉松 2026/04/05", "location": "茨城線", "headline": "★ 與日立櫻花季同時舉行，奔跑在櫻花盛開的美麗賽道 · ★ 使用國道6號日立海濱道路，欣賞美麗海景 · ★ 沿路補給站，給您滿滿的支持", "distance": "半馬｜10K｜5K", "includes": "參賽權＋精選住宿2晚", "price": 5880, "priceText": "每人最低 NT$5,880 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1770370114207_日立櫻花馬.jpg", "url": "https://asiayo.com/zh-tw/activity/109750/", "chips": ["spring"], "soldOut": false, "badge": ""},
          {"id": "e23", "title": "山寺藏王超級馬拉松 2026/04/19", "location": "山形縣", "headline": "★賽道為52K、101K、110K · ★以「山寺紅花」為主題的歷史文化被認定為「日本遺產」。 · ★精選飯店位於車站旁，比賽觀光超便利，入住還可直接領取物資！", "distance": "52K｜101K｜110K", "includes": "參賽權＋精選住宿2晚", "price": 8725, "priceText": "每人最低 NT$ 8,725起", "img": "https://gsimg.asiayo.com/ay-image-upload/1770014262055_Snipaste_2026-02-02_14-37-28.jpg", "url": "https://asiayo.com/zh-tw/activity/94706/", "chips": ["spring"], "soldOut": false, "badge": ""},
          {"id": "e24", "title": "山中湖公路賽 2026/05/31", "location": "山梨縣", "headline": "★日本百選賽事。 · ★套裝行程含天鵝湖導覽船乘船券 · ★盡情享受沿著湖畔的賽道，周圍環繞著嫩葉和日本茉莉花的香氣。 · ★環湖賽道地勢平緩，沿著湖畔延伸，沐浴在宜人的初夏陽光下，深受年輕女性和資深跑者的喜愛。", "distance": "半馬｜環湖", "includes": "參賽權＋精選住宿2晚", "price": 12155, "priceText": "每人最低 NT$12,155 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772503781257_Snipaste_2026-03-03_10-09-29.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/129956/", "chips": ["spring"], "soldOut": false, "badge": ""},
          {"id": "e25", "title": "北海道北國優駿馬拉松 2026/05/17", "location": "北海道", "headline": "★越野與馬拉松的雙重挑戰，賽程設計結合了半馬21公里＋越野賽7公里的賽程(共28公里)。 · ★日本唯一的競賽馬育成設施賽道，您將跑在只有在賽事期間才會對外開放的馬場地上，這條路線並非一般柏油路，而是馬匹平常行走的獨特路徑，景色極佳。 · ", "distance": "半馬(21K)+越野賽(7K)，共28K｜半馬｜越野賽7K", "includes": "參賽權＋精選住宿2晚", "price": 12450, "priceText": "每人最低 NT$12,450 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773819101617_Snipaste_2026-03-18_15-31-32.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130381/", "chips": ["spring"], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-summer-jpmarathon",
        title: "7-9月",
        chips: ["all", "hot", "pb"],
        viewAllUrl: "#",
        events: [
          {"id": "e9", "title": "北海道馬拉松 2026/08/30", "location": "北海道", "headline": "★日本百選賽事 · ★全馬路線可體驗東京奧運賽道、跑進北海道大學 · ★利用札幌涼爽的氣候，成為日本唯一在夏季舉行的全程馬拉松比賽", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 9950, "priceText": "每人最低 NT$9,950 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1770370069276_23-102-238_C-1-1200x800.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/129948/", "chips": ["hot", "pb", "summer"], "soldOut": false, "badge": ""},
          {"id": "e75", "title": "【越野三鐵】 XTERRA JAPAN 日本丸沼 越野三項自由行4日", "location": "日本 群馬", "headline": "★主辦單位指定專辦旅行社，保證參賽名額 · ★提供機場往返住宿之間的單車箱運送服務，解決海外參賽的痛點 · ★中文服務人員，語言問題免擔心", "distance": "方案日期：2025/08/21", "includes": "20人成行", "price": 32000, "priceText": "每人最低 NT$32,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1755226718431_Snipaste_2025-08-15_10-58-31.jpg", "url": "https://asiayo.com/zh-tw/activity/120770/", "chips": ["summer"], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-autumn-jpmarathon",
        title: "10-12月",
        chips: ["all", "hot", "pb", "beginner", "challenge"],
        viewAllUrl: "#",
        events: [
          {"id": "e1", "title": "富士山馬拉松 2026/12/13", "location": "山梨縣", "headline": "★日本百選賽事，一生必去的賽事！ · ★精選超人氣飯店讓您輕鬆選擇 · ★富士山造型的可愛獎牌GET!", "distance": "全馬｜環湖｜歡樂跑", "includes": "參賽權＋精選住宿2晚", "price": null, "priceText": "", "img": "https://gsimg.asiayo.com/ay-image-upload/1777861684475_Snipaste_2026-05-04_10-27-36.jpg", "url": "https://forms.gle/6VxwsYGnFBrSJURM6", "chips": ["hot", "beginner", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e2", "title": "札幌馬拉松 2026/10/04", "location": "北海道", "headline": "★安排薄野站3分超人氣飯店，遊札幌最便利！ · ★最適合跑步的十月涼秋，感受北海道最大規模賽事之一的活力，體驗札幌獨有的城市魅力 · ★賽道前半段將跑過「薄野 (すすきの)」和「大通公園」等札幌主要觀光地標，是一場難得的城市觀光路跑。", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿自由行", "price": 8560, "priceText": "每人最低 NT$8,560 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1762160066691_すすきの交差点.jpg", "url": "https://asiayo.com/zh-tw/journey/sapporo-marathon/", "chips": ["hot", "pb", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e3", "title": "水戶黃門漫遊馬拉松 2026/10/25", "location": "茨城縣 水戶市", "headline": "★日本百選賽事 · ★完賽即可獲得重厚感十足的「水戶黃門印籠獎牌」，設計融合水戶德川家葵紋與在地名產「梅花」，極具紀念價值與日本文化特色。 · ★賽道行經日本三名園之一的「偕樂園」及千波湖畔，在紅葉季節中穿梭歷史古蹟與自然景觀，享受如「漫遊", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 11380, "priceText": "每人最低 NT$11,380 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777014530358_image.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133517/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e4", "title": "岩手盛岡城市馬拉松 2026/10/04", "location": "岩手縣 盛岡市", "headline": "★日本百選賽事 · ★您將奔馳於盛岡城下町，遠眺雄偉的岩手山，在深秋涼爽的氣候中，伴隨沿途市民熱情的應援，體驗歷史與自然的交織。 · ★全馬完賽獎是特別的南方鐵器獎牌及完賽毛巾！ · ★入住盛岡站4分鐘舒適飯店，觀光比賽皆便利。", "distance": "全馬｜歡樂跑(12.1K)", "includes": "參賽權＋精選住宿2晚", "price": 8230, "priceText": "每人最低 NT$8,230 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1776136391085_feature2-1.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133024/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e5", "title": "山形馬拉松 2026/10/04", "location": "山形縣", "headline": "★日本百選賽事，賽後更能享用「日本第一芋煮會」大鍋製作的熱騰騰芋煮，溫暖每位跑者的身心。 · ★途經國寶級西洋建築「文翔館」與江戶時代的「霞城公園」，在每一步呼吸中感受深厚的文化底蘊 · ★先苦後甜的PB挑戰坡度，撐過後便是長達數公里的暢快", "distance": "半馬", "includes": "參賽權＋精選住宿2晚", "price": 9300, "priceText": "每人最低 NT$9,300 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777276996120_mainvisual-202503.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133541/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e6", "title": "新潟馬拉松 2026/10/11", "location": "新潟", "headline": "★日本百選賽事 · ★賽道筆直且起伏較小，容易創造紀錄的超高速賽道，與AsiaYo訂購，全馬完賽將提供特別完賽獎牌！ · ★沿途有當地居民很高熱情為跑者加油，沿途品嚐新潟特色美食與飲品", "distance": "全馬｜歡樂跑(10.6K)", "includes": "參賽權＋精選住宿2晚", "price": 8685, "priceText": "每人最低 NT$8,685 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773387216536_1-1photobigswan.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/131251/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e10", "title": "神戶馬拉松 2026/11/15", "location": "兵庫縣 神戶市", "headline": "★日本百選賽事，日本最早的馬拉松賽事 · ★時間限制7小時且賽道設計大多平坦，適合各種程度的跑者。 · ★歷史名城－神戶，體驗美妙城市的同時享受日本文化和風景。", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 10290, "priceText": "每人最低 NT$10,290 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773120338779_image.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130811/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e11", "title": "橫濱馬拉松 2026/10/25", "location": "神奈川縣 橫濱市", "headline": "★獨特的橫濱賽道，盡情奔跑在許多旅遊名勝地。 · ★穿越平時無法奔跑的灣岸高速公路，享受港口城市橫濱的美景！ · ★沿路設有補給站，不僅提供獨特的表演及當地橫濱和神奈川的食品作為“幸運伙食”。", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 13180, "priceText": "每人最低 NT$13,180 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772609212028_69960ea59a8c6c5ff4b4c824d4f27846.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130587/", "chips": ["hot", "beginner", "challenge", "autumn"], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-winter-jpmarathon",
        title: "1-3月",
        chips: ["all", "hot", "pb", "beginner"],
        viewAllUrl: "#",
        events: [
          {"id": "e7", "title": "東京新年半程馬拉松2027/01/10", "location": "東京都", "headline": "★本賽事獲得日本陸連(JAAF)公認及世界陸連(WA)認證，成績可列入世界排名及國際賽參賽標準，是追求正式紀錄選手的首選 · ★賽事於1月上旬舉行，充滿新年氣息；會場鄰近赤羽岩淵站，從東京市中心出發交通極為便利，非常適合參賽兼觀光。 · ★", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 10760, "priceText": "每人最低 NT$10,760 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777530486308_609413893_18340632439233969_7627305703104965762_n.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133702/", "chips": ["hot", "pb", "beginner", "winter"], "soldOut": false, "badge": ""},
          {"id": "e33", "title": "石垣島馬拉松 2026/01/18", "location": "沖繩縣 石垣島", "headline": "★日本最西、最南馬拉松 · ★補給站除了飲料、水果外，也提供石垣島當地的黑糖和鹽等補給品 · ★可加購夕陽遊艇巡航 × 石垣牛極上BBQ饗宴！", "distance": "全馬｜半馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 9225, "priceText": "每人最低 NT$9,225 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1761821920235_Snipaste_2025-10-30_18-58-21.jpg", "url": "https://asiayo.com/zh-tw/activity/122175/", "chips": ["winter"], "soldOut": false, "badge": ""},
          {"id": "e34", "title": "京都馬拉松 2026/02/15", "location": "京都", "headline": "★日本百選賽事，全馬為日本田徑總會、國際田徑總會以及AIMS（國際馬拉松路跑協會）公認路線！ · ★行經7處世界文化遺產附近，能夠眺望以「送火」聞名的五山，可以充分享受山明水秀之都—京都的魅力 · ★2間精選飯店皆為市中心，方便比賽與觀光京", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 11275, "priceText": "每人最低  NT$11,275 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1758255218496_京都馬完售圖.png", "url": "https://asiayo.com/zh-tw/activity/54876/", "chips": ["winter"], "soldOut": false, "badge": ""},
          {"id": "e35", "title": "大阪馬拉松 2026/02/22", "location": "大阪", "headline": "★西日本規模最大馬拉松盛事 · ★賽道經日本田徑聯合會（JAAF）、世界田徑聯合會（WA）、國際馬拉松及長跑協會（AIMS）認證。 · ★賽道整體高低差小，路線寬敞筆直，是許多跑者刷新個人最佳成績(PB)的目標賽事之一。", "distance": "全馬", "includes": "參賽權＋精選住宿自由行", "price": 15175, "priceText": "每人最低 NT$15,175 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1757581969087_Snipaste_2025-09-11_17-11-44.jpg", "url": "https://asiayo.com/zh-tw/journey/Osaka-marathon/", "chips": ["winter"], "soldOut": false, "badge": ""},
          {"id": "e36", "title": "姬路城馬拉松 2026/02/22", "location": "兵庫縣", "headline": "★路線始於世界遺產姬路城，並在此宏偉古蹟前光榮完賽，盡享城堡迷人景色與歷史氛圍。 · ★ 賽道設計極為平坦且鮮少起伏，被譽為高速賽事，選手們在此締造個人最佳成績機會高。 · ★搭配住宿最便利，步行至會場僅需要10分鐘！", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 12660, "priceText": "每人最低 NT$12,660起", "img": "https://gsimg.asiayo.com/ay-image-upload/1761821756565_Snipaste_2025-10-30_18-55-39.jpg", "url": "https://asiayo.com/zh-tw/activity/45828/", "chips": ["winter"], "soldOut": false, "badge": ""},
          {"id": "e37", "title": "熊本玉名韋駄天馬拉松/橫島草莓馬拉松 2026/02/22", "location": "熊本縣", "headline": "★貼心安排：飯店入住領取物資及報到，可以免於交通奔波好好休息。 · ★報名保證：2026 熊本玉名韋駄天馬拉松 / 橫島草莓馬拉松自由行3日參賽名額。", "distance": "全馬｜半馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 11050, "priceText": "每人最低 NT$ 11,050起", "img": "https://gsimg.asiayo.com/ay-image-upload/1766392093086_玉名.jpeg", "url": "https://asiayo.com/zh-tw/activity/126764/", "chips": ["winter"], "soldOut": false, "badge": ""},
          {"id": "e38", "title": "鹿兒島馬拉松 2026/03/01", "location": "鹿兒島縣", "headline": "★日本百選賽事，獨家服務：辦理入住即可報到領物資。 · ★賽道沿著錦江灣前進，全程都能望見仍在活動的櫻島火山，景色壯麗無比，是跑者公認日本風景最獨特的賽道之一。 · ★鹿兒島民的加油聲浪與地方特色補給品，為賽道注入滿滿的活力與溫暖。", "distance": "全馬｜歡樂跑", "includes": "參賽權＋精選住宿2晚", "price": 8300, "priceText": "每人最低 NT$8,300 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1763112430275_Snipaste_2025-11-14_17-25-53.jpg", "url": "https://asiayo.com/zh-tw/activity/45897/", "chips": ["winter"], "soldOut": false, "badge": ""},
          {"id": "e39", "title": "名古屋女子馬拉松 2026/03/08", "location": "愛知縣", "headline": "★國際知名賽事，榮獲世界田徑白金標籤 · ★限時7小時，最適合初馬的比賽 · ★受矚目的完賽禮！全球最多女子參加的馬拉松", "distance": "全馬", "includes": "參賽權＋精選住宿3晚", "price": 16410, "priceText": "每人最低 NT$16,410 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1766113982750_Snipaste_2025-12-19_11-12-47.jpeg", "url": "https://asiayo.com/zh-tw/activity/57101/", "chips": ["winter"], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-super-marathon",
        title: "超級馬拉松",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
        ],
      },
      {
        id: "s-all-JPmarathon",
        title: "所有",
        chips: ["all", "hot", "pb", "beginner", "challenge", "spring", "summer", "autumn", "winter"],
        viewAllUrl: "#",
        events: [
          {"id": "e1", "title": "富士山馬拉松 2026/12/13", "location": "山梨縣", "headline": "★日本百選賽事，一生必去的賽事！ · ★精選超人氣飯店讓您輕鬆選擇 · ★富士山造型的可愛獎牌GET!", "distance": "全馬｜環湖｜歡樂跑", "includes": "參賽權＋精選住宿2晚", "price": null, "priceText": "", "img": "https://gsimg.asiayo.com/ay-image-upload/1777861684475_Snipaste_2026-05-04_10-27-36.jpg", "url": "https://forms.gle/6VxwsYGnFBrSJURM6", "chips": ["hot", "beginner", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e2", "title": "札幌馬拉松 2026/10/04", "location": "北海道", "headline": "★安排薄野站3分超人氣飯店，遊札幌最便利！ · ★最適合跑步的十月涼秋，感受北海道最大規模賽事之一的活力，體驗札幌獨有的城市魅力 · ★賽道前半段將跑過「薄野 (すすきの)」和「大通公園」等札幌主要觀光地標，是一場難得的城市觀光路跑。", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿自由行", "price": 8560, "priceText": "每人最低 NT$8,560 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1762160066691_すすきの交差点.jpg", "url": "https://asiayo.com/zh-tw/journey/sapporo-marathon/", "chips": ["hot", "pb", "challenge", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e3", "title": "水戶黃門漫遊馬拉松 2026/10/25", "location": "茨城縣 水戶市", "headline": "★日本百選賽事 · ★完賽即可獲得重厚感十足的「水戶黃門印籠獎牌」，設計融合水戶德川家葵紋與在地名產「梅花」，極具紀念價值與日本文化特色。 · ★賽道行經日本三名園之一的「偕樂園」及千波湖畔，在紅葉季節中穿梭歷史古蹟與自然景觀，享受如「漫遊", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 11380, "priceText": "每人最低 NT$11,380 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777014530358_image.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133517/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e4", "title": "岩手盛岡城市馬拉松 2026/10/04", "location": "岩手縣 盛岡市", "headline": "★日本百選賽事 · ★您將奔馳於盛岡城下町，遠眺雄偉的岩手山，在深秋涼爽的氣候中，伴隨沿途市民熱情的應援，體驗歷史與自然的交織。 · ★全馬完賽獎是特別的南方鐵器獎牌及完賽毛巾！ · ★入住盛岡站4分鐘舒適飯店，觀光比賽皆便利。", "distance": "全馬｜歡樂跑(12.1K)", "includes": "參賽權＋精選住宿2晚", "price": 8230, "priceText": "每人最低 NT$8,230 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1776136391085_feature2-1.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133024/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e5", "title": "山形馬拉松 2026/10/04", "location": "山形縣", "headline": "★日本百選賽事，賽後更能享用「日本第一芋煮會」大鍋製作的熱騰騰芋煮，溫暖每位跑者的身心。 · ★途經國寶級西洋建築「文翔館」與江戶時代的「霞城公園」，在每一步呼吸中感受深厚的文化底蘊 · ★先苦後甜的PB挑戰坡度，撐過後便是長達數公里的暢快", "distance": "半馬", "includes": "參賽權＋精選住宿2晚", "price": 9300, "priceText": "每人最低 NT$9,300 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777276996120_mainvisual-202503.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133541/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e6", "title": "新潟馬拉松 2026/10/11", "location": "新潟", "headline": "★日本百選賽事 · ★賽道筆直且起伏較小，容易創造紀錄的超高速賽道，與AsiaYo訂購，全馬完賽將提供特別完賽獎牌！ · ★沿途有當地居民很高熱情為跑者加油，沿途品嚐新潟特色美食與飲品", "distance": "全馬｜歡樂跑(10.6K)", "includes": "參賽權＋精選住宿2晚", "price": 8685, "priceText": "每人最低 NT$8,685 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773387216536_1-1photobigswan.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/131251/", "chips": ["hot", "pb", "beginner", "autumn"], "soldOut": false, "badge": ""},
          {"id": "e7", "title": "東京新年半程馬拉松2027/01/10", "location": "東京都", "headline": "★本賽事獲得日本陸連(JAAF)公認及世界陸連(WA)認證，成績可列入世界排名及國際賽參賽標準，是追求正式紀錄選手的首選 · ★賽事於1月上旬舉行，充滿新年氣息；會場鄰近赤羽岩淵站，從東京市中心出發交通極為便利，非常適合參賽兼觀光。 · ★", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 10760, "priceText": "每人最低 NT$10,760 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777530486308_609413893_18340632439233969_7627305703104965762_n.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133702/", "chips": ["hot", "pb", "beginner", "winter"], "soldOut": false, "badge": ""},
          {"id": "e9", "title": "北海道馬拉松 2026/08/30", "location": "北海道", "headline": "★日本百選賽事 · ★全馬路線可體驗東京奧運賽道、跑進北海道大學 · ★利用札幌涼爽的氣候，成為日本唯一在夏季舉行的全程馬拉松比賽", "distance": "全馬", "includes": "參賽權＋精選住宿2晚", "price": 9950, "priceText": "每人最低 NT$9,950 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1770370069276_23-102-238_C-1-1200x800.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/129948/", "chips": ["hot", "pb", "summer"], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "intl_mar": {
    secondTabs: ["韓國", "香港", "越南", "澳洲", "南非"],
    sections: [
      {
        id: "s-kr-marathon",
        title: "韓國",
        chips: ["all", "hot", "pb", "beginner"],
        viewAllUrl: "#",
        events: [
          {"id": "e8", "title": "JTBC首爾馬拉松 2026/11/01", "location": "韓國 首爾", "headline": "★為紀念奧運舉辦的賽事，起點為首爾世界盃競技場，終點則在首爾綜合運動場 · ★首爾經典地標盡收眼底，全馬賽道橫跨漢江的楊花大橋進入汝矣島，再經過麻浦大橋，沿路欣賞麻浦區和高樓林立的城市風光。 · ★結合韓流文化、音樂和城市探索，讓每位參賽者", "distance": "全馬｜10K", "includes": "參賽權＋精選住宿4晚", "price": 13155, "priceText": "每人最低 NT$13,155 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772764153054_JTBC2.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130687/", "chips": ["hot", "pb", "beginner"], "soldOut": false, "badge": ""},
          {"id": "e46", "title": "濟州國際旅遊馬拉松 2026/06/07", "location": "韓國 濟州島", "headline": "★飯店位於商圈中心，周圍有許多美食，讓您心比賽之餘，還享有便利的旅遊體驗 · ★韓國最南端的島嶼，氣候宜人，四周環海的特性吸引不少人前往探訪 · ★多元賽事距離，適合各類跑者參加", "distance": "全馬｜半馬｜10K", "includes": "參賽權＋精選住宿4晚", "price": 6050, "priceText": "每人最低 NT$6,050 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1776317738673_Snipaste_2026-04-16_13-35-30.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130391/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e47", "title": "首爾國際馬拉松 2026/03/15｜韓國國籍選手不可預訂", "location": "首爾", "headline": "★獲全球十大認證之最高水準馬拉松大賽，每年都有約3萬人參加，與波士頓、雅典一同被選為世界田徑文化遺產！ · ★特色是全程無坡賽道平緩，高度差少，濕度合宜的三月，配上平易近人的賽道路線，堪稱是亞洲最適合出成績的賽道 · ★市區精選飯店便利比賽", "distance": "全馬｜10K", "includes": "敬請期待", "price": null, "priceText": "", "img": "https://gsimg.asiayo.com/ay-image-upload/1770017100530_首爾馬.jpg", "url": "https://asiayo.com/zh-tw/activity/122591/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e48", "title": "大邱國際馬拉松 2026/02/22", "location": "韓國 大邱", "headline": "★世界田徑總會 (WA) 金標籤認證賽事，跑者能與世界級選手在同樣的賽道上奔馳，享受國際一流的賽事品質與服務。 · ★市中心高速賽道，挑戰PB首選，路線平坦、坡道起伏極小，加上韓國春季涼爽的氣溫，天時地利都非常有利於跑者創造個人最佳成績 。", "distance": "全馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 4950, "priceText": "每人最低 NT$4,950 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1767763981383_大邱馬拉松.jpg", "url": "https://asiayo.com/zh-tw/activity/125541/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e49", "title": "韓國慶州櫻花馬拉松 2026/04/04", "location": "慶尚北道", "headline": "★賽道路線以普門湖周邊為止，沿途有機會欣賞到櫻花盛開的美景。 · ★入住飯店鄰近賽事起點，省去交通煩惱 · ★運動旅行，運動之餘享受韓國的美", "distance": "半馬｜10K", "includes": "參賽權＋精選住宿4晚", "price": 11550, "priceText": "每人最低 NT$11,550起", "img": "https://gsimg.asiayo.com/ay-image-upload/1771825722264_Snipaste_2026-02-23_13-48-38.jpg", "url": "https://asiayo.com/zh-tw/activity/114790/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e50", "title": "【越野跑】錦繡山越野賽 2025/08/24", "location": "韓國 忠清北道", "headline": "★AsiaYo獨家專屬名額！ · ★全程中文領隊陪同，讓您安心挑戰新路線！ · ★路線包含岩稜地形與繩索攀爬區段，技術型賽道等你來挑戰", "distance": "22K", "includes": "參賽權＋精選住宿2晚", "price": 11000, "priceText": "每人最低 NT$11,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1749527101243_Snipaste_2025-06-10_11-44-54.jpg", "url": "https://asiayo.com/zh-tw/activity/121254/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e51", "title": "【越野跑】Trans 濟州越野賽2025/10/18", "location": "韓國 濟州島", "headline": "★穿越加西里村小徑與石牆路，體驗山岳、草地與柏樹林的多樣地貌。 · ★挑戰濟州漢拏山國家公園，探索世界遺產與四季變幻的壯麗風景。 · ★參加UTMB濟州20K賽事，完賽可獲跑石，爭取法國霞慕尼參賽資格。", "distance": "20K", "includes": "參賽權＋精選住宿2晚", "price": 3300, "priceText": "每人最低 NT$3,300 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1749527104445_Snipaste_2025-06-10_11-44-22.jpg", "url": "https://asiayo.com/zh-tw/activity/121718/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-hk-marathon",
        title: "香港",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e52", "title": "渣打香港馬拉松 2026/01/18｜僅限台灣國籍選手參加", "location": "香港", "headline": "★穿越港三橋三隧超震撼 — 賽道途經青馬橋、長青及西區海底隧道，挑戰自我兼賞城市美景 · ★沿途多處設補水、能量補給站，跑者安心完賽無後顧之憂 · ★每年吸引逾七萬跑者，海外選手踴躍參與，氣氛超燃", "distance": "全馬｜半馬", "includes": "參賽權＋精選住宿2晚", "price": 6350, "priceText": "每人最低 NT$6,350 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1758255226680_渣打香港馬完售圖.png", "url": "https://asiayo.com/zh-tw/activity/122372/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-vn-marathon",
        title: "越南",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e54", "title": "亞洲馬拉松聯盟系列賽 AMML series　　下龍灣文化遺產馬拉松 2025/11/23", "location": "越南 下龍灣", "headline": "★賽道獲得 AIMS (國際馬拉松暨長跑協會)與 VAF (越南田徑協會) 雙認證。 · ★零海拔落差，平坦快速，追求PR聖地。 · ★下龍灣為聯合國教科文組織認證世界自然遺產，世界自然奇觀跑起來。", "distance": "全馬｜半馬｜10K｜5K", "includes": "參賽權＋精選住宿2晚", "price": 9500, "priceText": "每人最低 NT$9,500起", "img": "https://gsimg.asiayo.com/ay-image-upload/1758255226680_渣打香港馬完售圖.png", "url": "https://asiayo.com/zh-tw/activity/122468/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-Australia-marathon",
        title: "澳洲",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e53", "title": "黃金海岸馬拉松 2026/07/04~07/05", "location": "黃金海岸", "headline": "★國際級金牌認證賽事，以其絕美海景、平坦快速的賽道和澳洲冬季宜人的氣候聞名。 · ★完美氣候： 舉辦時間在澳洲冬季(7月)，氣溫適中、濕度低、風力小，是路跑的絕佳條件。 · ★沿途可欣賞太平洋與沙灘景色。幾乎零爬升的平坦地勢，是世界知名的「", "distance": "全馬｜半馬｜10K", "includes": "參賽權＋精選住宿2晚", "price": 13675, "priceText": "每人最低 NT$13,675起\\n限時優惠！購買即送3日吃到飽 eSIM✨", "img": "https://gsimg.asiayo.com/ay-image-upload/1772609129320_黃金海岸1.jpg", "url": "https://asiayo.com/zh-tw/activity/128010/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-Afri-marathon",
        title: "南非",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e55", "title": "開普敦馬拉松 2026/05/24", "location": "開普敦", "headline": "★大滿貫分齡世錦賽舉辦地：2026年將主辦「AbbottWMM 分齡世界錦標賽」，全球頂尖市民跑者齊聚，競技氛圍與國際化程度將創歷史新高。 · ★改制秋季賽事：從10月春季改至5月秋季舉辦，避開春季強風，氣候預期更為穩定涼爽，有利於選手穩定", "distance": "全馬", "includes": "參賽權＋精選住宿5晚", "price": 43750, "priceText": "每人最低 NT$ 43,750起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772772785259_Snipaste_2026-03-06_12-52-56.jpg", "url": "https://asiayo.com/zh-tw/activity/127878/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "hiking": {
    secondTabs: ["日本", "東南亞"],
    sections: [
      {
        id: "s-jp-mountain",
        title: "日本",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e79", "title": "富士山登頂之旅｜保證成團！吉田口經典路線・山屋過夜・新宿來回接駁", "location": "山梨縣", "headline": "★行程兩天一夜，東京新宿來回接駁，保證出團。 · ★提供裝備租借免煩惱。 · ★登頂富士山欣賞御來光✨ · ★富士山最經典的吉田路線，適合初心者與登山小白", "distance": "方案日期：2026/07/03(五)、08/14(五)", "includes": "難度：★★☆☆☆", "price": 16100, "priceText": "每人最低 NT$16,100 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773829666546_Screenshot_2026-03-15-18-08-27-183_com.xingin.xhs-edit.jpg", "url": "https://asiayo.com/zh-tw/activity/131403/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e80", "title": "富士山登頂之旅｜吉田口經典路線・山屋過夜・新宿來回接駁", "location": "山梨縣", "headline": "★行程兩天一夜，東京新宿來回接駁。 · ★登頂富士山欣賞御來光，最經典路線，適合初心者與登山小白 · ★提供裝備租借免煩惱。", "distance": "方案日期：2026年 7/1、7/2、7/6、7/8、7/20、8/10、8/11、9/1、9/2、9/7、9/8、9/9", "includes": "難度：★★☆☆☆", "price": 16800, "priceText": "每人最低 NT$16,800 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773910919832_Screenshot_2026-03-15-19-02-05-884_com.xingin.xhs-edit (1).jpg", "url": "https://asiayo.com/zh-tw/activity/119907/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e81", "title": "富士山登頂之旅｜吉田口經典路線・山屋過夜 · 溫泉泡湯 · 季節水果放題", "location": "山梨縣", "headline": "★行程三天兩夜，東京新宿來回接駁。 · ★新手首選「吉田線」，大幅降低初次挑戰難度，登頂更安心。 · ★入住「八合目」山屋，縮短凌晨登頂的距離，把體力留給最美日出。 · ★下山後享受日式溫泉徹底釋放肌肉疲勞，搭配產地直送的「水果放題（吃到飽", "distance": "方案日期：2026年 8/12、8/24", "includes": "難度：★★☆☆☆", "price": 26900, "priceText": "每人最低 NT$26,900 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777349511187_image.jpg", "url": "https://asiayo.com/zh-tw/activity/120511/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e82", "title": "富士山登頂之旅｜富士宮經典路線・山屋過夜・新宿來回接駁", "location": "山梨縣", "headline": "★行程兩天一夜，東京新宿來回接駁。 · ★提供裝備租借免煩惱。 · ★富士宮路線為第二熱門的路線，唯一能從西日本輕鬆攻頂的登山口 · ★登山距離較短，擁有較具挑戰性的坡度，以及多處的岩石路段。", "distance": "方案日期：2025/07/10、07/16、07/21、07/28、07/29、08/04、08/11、08/13、08/18、08/25、08/27、09/01、09/08", "includes": "行程難度：★★★☆☆\n", "price": 16800, "priceText": "每人最低 NT$16,800 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773913117129_8a11c4_b6bba2bf114d451c90065f0e5347750a~mv2_d_3264_2448_s_4_2_2026-03-19T07-01-45-053Z.jpg", "url": "https://asiayo.com/zh-tw/activity/120530/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e83", "title": "《世界遺產》日本熊野古道～百大名湯～美食健行5日(含小費)", "location": "和歌山縣", "headline": "★聯營出團，世界遺產熊野古道朝聖之路（本行程安排初心者合適路線） · ★全日本最大鳥居、世界遺產熊野鬼之城等名勝探訪 · ★保住入住兩晚溫泉旅館！", "distance": "出發日 6月~11月", "includes": "來回機票＋世界遺產熊野古道團體旅遊＋含小費", "price": 56900, "priceText": "每人最低 NT$56,900 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1718262166961_desc_4xsmLevV85a8sO.jpg", "url": "https://asiayo.com/zh-tw/group/54414/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e84", "title": "富士登山競賽 2025/07/25", "location": "山梨縣", "headline": "★超人氣的富士登山競賽 · ★賽程路線適合新手的五合目路線 · ★五合目路線起點與終點海拔高低落差1,480公尺。", "distance": "15K", "includes": "敬請期待", "price": null, "priceText": "", "img": "https://gsimg.asiayo.com/ay-image-upload/1770017623152_富士登山競走.jpg", "url": "https://asiayo.com/zh-tw/activity/115551/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e85", "title": "2026富士山朝聖之旅 ｜御來光兩天一夜．吉田路線", "location": "山梨縣", "headline": "★行程兩天一夜，河口湖車站集合。 · ★富士山最經典的吉田路線，適合初學者 · ★登頂富士山欣賞御來光", "distance": "方案日期：2026年 07/13、07/18、07/21、07/23、07/26、07/28、08/09、08/12、08/22", "includes": "難度：★★☆☆☆", "price": 16900, "priceText": "每人最低 NT$16,900 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1774261761331_Snipaste_2026-03-23_18-29-08.jpg", "url": "https://asiayo.com/zh-tw/activity/128277/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e86", "title": "富士山朝聖之旅｜河口湖湖上祭・御來光三天兩夜｜可加購日本第一長岡煙火", "location": "山梨縣", "headline": "★河口湖祭花火：富士五湖最大慶典！萬發煙火與山景輝映，在登山前夕感受極致浪漫 · ★保證住！Mystays 景觀房，優質住宿讓登山更有體力。 · ★獨家收錄！神山祭典組合: 集齊河口湖祭＋富士登山，還可加購長岡煙火，打造最強夏日圓夢之旅", "distance": "方案日期：2026/08/05(三)", "includes": "難度：★★☆☆☆", "price": 19200, "priceText": "每人最低 NT$19,200 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777358723917_Snipaste_2026-04-28_14-45-10.jpg", "url": "https://asiayo.com/zh-tw/activity/119370/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-SoutheastAsia-mountain",
        title: "東南亞",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e77", "title": "【登山】東南亞第一高峰．馬來西亞沙巴神山5日", "location": "馬來西亞 沙巴", "headline": "★登上東南亞第一高峰～京那巴魯山(Mt. Kinabalu) · ★專業領隊：經驗豐富的外語領隊及登山嚮導帶領團隊，健行安全更有保障 · ★精選在地特色活動：馬慕迪離島逍遙遊、浮潛+海陸火烤B.B.Q · ★精緻登頂證書：登頂成功頒發沙巴州", "distance": "方案日期：2025/08/27", "includes": "15人成行", "price": 68000, "priceText": "每人最低 NT$68,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1756453086694_Snipaste_2025-08-29_15-37-30.jpg", "url": "https://asiayo.com/zh-tw/activity/120348/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e78", "title": "【主題旅遊】東南亞第一高峰~沙巴神山健行.馬慕迪島浮潛之旅6日遊", "location": "馬來西亞 沙巴", "headline": "★聯營出團，神山攻頂5日遊！ · ★行程安排浮淺活動，豐富的行程體驗", "distance": "出發日 10月6日", "includes": "來回機票＋沙巴登山團體旅遊＋含小費", "price": 58000, "priceText": "每人最低 NT$58,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1756804821226_Snipaste_2025-09-02_17-20-07.jpg", "url": "https://asiayo.com/zh-tw/group/54415/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "intl_cyc": {
    secondTabs: [],
    sections: [
      {
        id: "s-intl_cyc-all",
        title: "國際單車",
        chips: ["all", "hot", "summer"],
        viewAllUrl: "#",
        events: [
          {"id": "e63", "title": "2026瀨戶內島波海道國際自行車大會｜三天兩夜｜A路線（尾道-今治）", "location": "日本 廣島縣/愛媛縣", "headline": "★珍稀封閉賽道： 兩年一度全日唯一封閉高速公路，與七千名車友共赴海上破風盛宴。 · ★時間成本極低，適合「請假困難型」客群，無需額外請假 。 · ★往返接送機、尾道三星飯店住宿、自行車組裝點檢、全程雙語導遊 。", "distance": "行程日期：2026/10/23", "includes": "三天兩夜", "price": 43065, "priceText": "每人最低 NT$43,065 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1776317320720_ScreenShot_2026-01-13_120607_878.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/132778/", "chips": ["hot"], "soldOut": false, "badge": ""},
          {"id": "e64", "title": "2026瀨戶內島波海道國際自行車大會｜五天四夜｜A路線（尾道-今治）", "location": "日本 廣島縣/愛媛縣", "headline": "★珍稀封閉賽道： 兩年一度全日唯一封閉高速公路，與七千名車友共赴海上破風盛宴。 · ★渡輪跳島藝術： 專屬渡輪串聯直島、豐島與最美單車道，在藝術島嶼間展開絕美跳島騎行。 · ★深度人文慢旅： 深入夢島海道與百年自行車神社，體驗人文、美食與藝", "distance": "行程日期：2026/10/23", "includes": "五天四夜", "price": 77413, "priceText": "每人最低 NT$77,413 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1776317337436_shimanami2-0321.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/132870/", "chips": ["hot"], "soldOut": false, "badge": ""},
          {"id": "e65", "title": "【Simple Gravity】春．MTB玩家必騎！富士見×富士天雙聖地5日", "location": "日本 東京/長野/白馬", "headline": "★特別安排前往日本最大的「富士見全景登山越野車樂園」以及位於富士山麓、由知名選手高橋大喜設計的「富士天登山車公園」。在騎乘的同時，享受順暢的下坡快感與富士山麓的自然美景。 · ★特別邀請由資深登山車騎士組成的加拿大公司共同帶領，並有專業登山", "distance": "方案日期：2026/06/18", "includes": "14人成行", "price": 25500, "priceText": "每人最低 NT$25,500 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1774428361224_677240ed79f67_photo_37468.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/132238/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e66", "title": "【鐵人三項】日本北海道 鐵人三項 洞爺湖5日自由行", "location": "日本 北海道", "headline": "★極限賽道挑戰：橫跨北海道多個市町村，單車爬升高達2,400公尺，考驗硬核耐力。 · ★免除報名煩惱：提供參賽名額與中文翻譯服務，解決海外報名溝通門檻。 · ★結合極限賽事與北海道壯麗自然觀光：賽事以雄偉的羊蹄山麓與風景秀麗的洞爺湖周邊為舞", "distance": "方案日期：2026/08/21", "includes": "15人成行", "price": 31000, "priceText": "每人最低 NT$31,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1774427718542_69ae6dfbecfb9_photo_12169.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/132275/", "chips": ["hot"], "soldOut": false, "badge": ""},
          {"id": "e67", "title": "【確認成行】2026島波海道單車節 跳島騎旅 5日_加碼小豆島", "location": "日本 廣島/愛媛/香川", "headline": "★日本最大規模的國際自行車大道，在連接愛媛和廣島的「瀨戶內島波海道」這個舞台，舉辦日本最大規模的國際自行車大賽。 · ★島波海道不僅是日本瀨戶內海三條跨海大橋唯一可通行單車的一條，更是全亞洲唯一可供自行車通行專用之跨海大橋。 · ★特別加碼", "distance": "方案日期：2026/10/23", "includes": "已確認成行", "price": 62800, "priceText": "每人最低 NT$62,800 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1772441439772_61f28e68893f3_photo_61825.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/130583/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e68", "title": "【單車旅行】2026復活節單車環島9日 (台北出發)", "location": "台灣", "headline": "★專業褓姆車與工作人員隨行服務，讓您專注享受騎行的樂趣，無後顧之憂。 · ★安排入住優質旅店，白天享受挑戰之餘，每晚也能獲得充分休息。 · ★搭配行經路線，安排在地風味佳餚，讓味覺也留下旅途回憶。 · ★團提供影像紀錄，紀錄您的騎行風采與沿", "distance": "方案日期：2026/04/03", "includes": "12人成行", "price": 38500, "priceText": "每人最低 NT$38,500 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1774423483302_Snipaste_2026-03-25_15-24-05.jpg", "url": "https://asiayo.com/zh-tw/activity/126772/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e69", "title": "【單車】日本最高公路賽．乘鞍高原．自行車登山賽5日", "location": "日本 長野/白馬", "headline": "★入住溫泉飯店，讓您白天運動之餘返回飯店也能享受溫泉放鬆身心。 · ★騎旅日安排當地領騎及保母車隨行，讓您海外單車體驗深度騎旅。 · ★行前舉辦說明會，即使首次出國也能安心無負擔。", "distance": "方案日期：2025/08/29", "includes": "20人成行", "price": 58800, "priceText": "每人最低 NT$58,800 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1758693794706_image (1).jpg", "url": "https://asiayo.com/zh-tw/activity/120205/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e70", "title": "【單車】日本單車環四國一周1000公里認證12日．加碼騎乘島波海道", "location": "日本 愛媛/四國/德島/香川/高知", "headline": "★四國是由愛媛縣、香川縣、德島縣、高知縣所組成，也就是舊稱的「伊予」、「讚岐」、「阿波」、「土佐」四國，透過單車可以親臨體驗不一樣的文化。 · ★加碼騎乘島波海道，體驗騎乘CNN最美單車路線之一的跨海大橋，出國一次騎好騎滿！ · ★專屬環騎", "distance": "方案日期：2025/10/03", "includes": "16人成行", "price": 110000, "priceText": "每人最低 NT$110,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1758693697697_image.jpg", "url": "https://asiayo.com/zh-tw/activity/120278/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "tw_mar": {
    secondTabs: ["精選賽事", "一日遊"],
    sections: [
      {
        id: "s-tw-marathon",
        title: "精選賽事",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e94", "title": "【保證名額】2026臺北馬拉松2026/12/20｜僅限外國籍選手 (非台灣籍參賽者)", "location": "台北", "headline": "★北台灣熱門景點暢遊＋參賽權(保證名額)＋精選住宿 · ★住宿地點：步行10分鐘左右。 · ★精彩賽事，千萬不能錯過！", "distance": "全馬｜半馬", "includes": "賽賽權、三晚住宿、贈送賽事衣物保管袋｜可加購桃園機場接送", "price": 25225, "priceText": "每人最低 NT$25,225 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777022809274_55.jpg", "url": "https://asiayo.com/zh-tw/sport-activity/item/133166/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e95", "title": "合歡山越野馬拉松 2026/09/04｜不限國籍", "location": "南投", "headline": "★挑戰全台最高海拔！征服武嶺絕美雲海。 · ★方案含賽事參賽權、鄰近起跑點住宿。 · ★優惠加購接駁車、高鐵票75折起。", "distance": "超全馬｜超半馬｜10K", "includes": "參賽權＋清境精選住宿1晚", "price": 3738, "priceText": "每人最低 NT$3,738起", "img": "https://gsimg.asiayo.com/ay-image-upload/1775745313988_截圖 2026-04-09 下午10.28.46.png", "url": "https://asiayo.com/zh-tw/sport-activity/item/132816/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e96", "title": "台灣米倉彰化田中馬拉松 2026/11/08｜僅限外國籍選手 (非台灣籍參賽者)", "location": "彰化", "headline": "★最有人情味的補給，在金黃稻浪中吃到飽！ · ★精選住宿搭配大會接駁直達會場 · ★優惠加購，高鐵 75 折起", "distance": "全馬｜半馬｜10K", "includes": "參賽權＋台中精選住宿2或3晚＋大會接駁車", "price": 4969, "priceText": "每人最低 NT$4,969 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773983225344_Gemini_Generated_Image_y31loly31loly31l.png", "url": "https://asiayo.com/zh-tw/journey/tianzhong-marathon/?subTab=half-marathon", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e97", "title": "日月潭環湖馬拉松2026/11/01｜僅限外國籍選手 (非台灣籍參賽者)", "location": "南投", "headline": "★CNN 評選全球最美單車道，全程 360 度環繞絕美湖景，跑者將在煙波繚繞的湖光山色中前進 · ★精選住宿搭配大會接駁直達會場 · ★優惠加購，高鐵 75 折起", "distance": "全馬｜超半馬｜健走", "includes": "參賽權＋台中精選住宿2晚＋大會接駁車", "price": 5600, "priceText": "每人最低 NT$5,600 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1769921279075_20261101.png", "url": "https://asiayo.com/zh-tw/sport-activity/item/129713/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e98", "title": "2026嘉義第二屆東石仲夏星光路跑 × 海鮮星光盛典2026/6/27 ", "location": "嘉義", "headline": "★仲夏夜浪漫開跑，大口享用東石肥美海鮮 · ★方案含參賽權、嘉義租車與高鐵，便利出遊 · ★吹著微風慢跑海岸線，享受夏日星光盛典", "distance": "10K/5K", "includes": "參賽權＋嘉義格上租車＋高鐵來回2日自由行", "price": 2689, "priceText": "每人最低 NT$2,689 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1773646176064_16 (1).png", "url": "https://asiayo.com/zh-tw/sport-activity/item/130624/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e99", "title": "2026台北星光馬拉松2026/5/16", "location": "台北", "headline": "★夏夜浪漫開跑，避開日曬享受河濱微風 · ★路跑套裝含住宿、高鐵與參賽權，超便利 · ★專屬跑者行程，完賽後入住精選星級飯店", "distance": "42K/21K/10K/5K", "includes": "參賽權＋台北精選住宿＋高鐵來回2日自由行", "price": 5689, "priceText": "每人最低 NT$5,689 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1775704186625_2026 台北星光馬拉松.png", "url": "https://asiayo.com/zh-tw/sport-activity/item/130590/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e100", "title": "2026 CTAU 超馬系列賽－宜蘭棲蘭林道越野 2026/06/06", "location": "宜蘭", "headline": "★限定入山！穿越世界遺產神木群與原始林 · ★多種方案任選！包辦報名、住宿與接駁，輕鬆參賽免煩惱 · ★立即預訂這場洗滌心靈之旅", "distance": "75K｜50K｜25K", "includes": "參賽權＋台北或宜蘭精選住宿＋大會接駁車", "price": 4689, "priceText": "每人最低 NT$4,689 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1777522888623_55.png", "url": "https://asiayo.com/zh-tw/sport-activity/item/131291/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e101", "title": "雲林半程馬拉松 2026/06/07", "location": "雲林", "headline": "★含參賽權及高鐵75折來回票面額 · ★解決報名與交通問題 · ★多樣化的參賽與完賽物資！", "distance": "21K｜10K｜5K｜2.5K", "includes": "參賽權＋高鐵來回票75折面額", "price": null, "priceText": "", "img": "https://gsimg.asiayo.com/ay-image-upload/1774595365637_完售圖.png", "url": "https://asiayo.com/zh-tw/sport-activity/item/128914/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-oneday-tour",
        title: "一日遊",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e103", "title": "【台中出發】台中/日月潭/清境農場包車一日遊 ｜10小時", "location": "台灣", "headline": "★中台灣熱門景點暢遊 · ★自訂彈性漫遊路線 · ★專屬1-7人包車服務人數自由選", "distance": "請提前5日前預訂", "includes": "台中南投300公里內包車接送", "price": 1875, "priceText": "每人最低 NT$1,875 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1768052057219_1.png", "url": "https://asiayo.com/zh-tw/activity/128885/", "chips": ["oneday"], "soldOut": false, "badge": ""},
          {"id": "e104", "title": "【台中出發】台中/鹿港包車一日遊 ｜10小時", "location": "台灣", "headline": "★中台灣熱門景點暢遊 · ★自訂彈性漫遊路線 · ★專屬1-7人包車服務人數自由選", "distance": "請提前5日前預訂", "includes": "台中彰化300公里內包車接送", "price": 1700, "priceText": "每人最低 NT$1,700 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1768052041196_2.png", "url": "https://asiayo.com/zh-tw/activity/128884", "chips": ["oneday"], "soldOut": false, "badge": ""},
          {"id": "e105", "title": "【台中出發】台中市區包車一日遊 ｜10小時", "location": "台灣", "headline": "★中台灣熱門景點暢遊 · ★自訂彈性漫遊路線 · ★專屬1-7人包車服務人數自由選", "distance": "請提前5日前預訂", "includes": "台中市區300公里內包車接送", "price": 1650, "priceText": "每人最低 NT$1,650 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1768052010237_3.png", "url": "https://asiayo.com/zh-tw/activity/128881", "chips": ["oneday"], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "golf": {
    secondTabs: ["泰國", "日本", "韓國"],
    sections: [
      {
        id: "s-th-golf",
        title: "泰國",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e57", "title": "泰國高爾夫特輯", "location": "高爾夫特輯", "headline": "★ 多樣化的高爾夫球場 · ★超高CP值享受 · ★獨特的文化體驗", "distance": "4天2場｜5天3場", "includes": "世界級高爾夫球場＋星級飯店＋交通接駁", "price": 12400, "priceText": "每人最低 NT$12,400 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1700407954943_thgolf.png", "url": "https://asiayo.com/zh-tw/journey/golf-thailand-a/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e58", "title": "曼谷高爾夫", "location": "曼谷", "headline": "★ 4星級飯店舒適住宿＋專屬司機接送 · ★ 世界級高爾夫球場巡禮 · ★不含機票，可彈性安排出發日", "distance": "4天2場｜5天3場", "includes": "世界級高爾夫球場＋星級飯店＋交通接駁", "price": 15000, "priceText": "每人最低 NT$15,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1696950158095_Body1Left.jpeg", "url": "https://asiayo.com/zh-tw/journey/golf-bangkok-a/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e59", "title": "清邁高爾夫", "location": "清邁", "headline": "★4星級飯店舒適住宿＋專屬司機接送 · ★ 世界級高爾夫球場巡禮 · ★不含機票，可彈性安排出發日", "distance": "4天2場｜5天3場", "includes": "世界級高爾夫球場＋星級飯店＋交通接駁", "price": 12400, "priceText": "每人最低 NT$12,400 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1697616792099_CMBody1.jpeg", "url": "https://asiayo.com/zh-tw/journey/golf-chiangmai-a/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e60", "title": "芭達雅高爾夫", "location": "芭達雅", "headline": "★ 4星級飯店舒適住宿＋專屬司機接送 · ★ 世界級高爾夫球場巡禮 · ★不含機票，可彈性安排出發日", "distance": "4天2場｜5天3場", "includes": "世界級高爾夫球場＋星級飯店＋交通接駁", "price": 20200, "priceText": "每人最低 NT$20,200 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1698380333198_PYBody1.jpeg", "url": "https://asiayo.com/zh-tw/journey/golf-pattaya-a/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e61", "title": "華欣高爾夫", "location": "華欣", "headline": "★ 4星級飯店舒適住宿＋專屬司機接送 · ★ 世界級高爾夫球場巡禮 · ★不含機票，可彈性安排出發日", "distance": "4天2場｜5天3場", "includes": "世界級高爾夫球場＋星級飯店＋交通接駁", "price": 14800, "priceText": "每人最低 NT$14,800 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1698664217506_HHBody1.jpeg", "url": "https://asiayo.com/zh-tw/journey/golf-huahin-a/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-jp-golf",
        title: "日本",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e56", "title": "長崎高爾夫", "location": "長崎", "headline": "★ 福岡市區專屬接送 · ★被譽為最佳海景第一名的PASSAGE琴海度假飯店及18洞高爾夫球場，含早晚餐 · ★不含機票，4人擊球成行", "distance": "4月2號｜5月21號 出發", "includes": "日本知名高爾夫球場＋度假飯店＋交通接駁", "price": 27805, "priceText": "每人最低  NT$27,805 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1710298947204_長崎高爾夫圖片.png", "url": "https://asiayo.com/zh-tw/activity/50234?activityStartDate=2024-04-02", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
      {
        id: "s-kr-golf",
        title: "韓國",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e62", "title": "江原道高爾夫", "location": "韓國", "headline": "★四人成行 · ★不含機票，可彈性安排出發日", "distance": "4天2場｜5天3場", "includes": "High1高原球道&龍平雙球場 兩區球場供您選擇", "price": 30471, "priceText": "每人最低 NT$ 30,471起", "img": "https://gsimg.asiayo.com/ay-image-upload/1749112178491_%E9%BE%8D%E5%B9%B32.jpg", "url": "https://asiayo.com/zh-tw/journey/Kangwondo-golf/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "baseball": {
    secondTabs: [],
    sections: [
      {
        id: "s-baseball-all",
        title: "棒球賽事",
        chips: ["all"],
        viewAllUrl: "#",
        events: [
          {"id": "e90", "title": "2026前進東京，為台灣加油！海外棒球賽 觀賽＋住宿5晚自由行方案", "location": "東京都", "headline": "★安排VIP觀戰票(保證席位)＋門票專屬特典＋精選住宿 · ★住宿地點：東京巨蛋飯店，與東京巨蛋僅一步之遙。 · ★五場精彩賽事，千萬不能錯過！", "distance": "入住日期：2026/03/04(三)~03/09(一)", "includes": "觀賽日期：2026/03/05(四)~03/08(日)", "price": 171000, "priceText": "限量販售！每人最低 NT$171,000 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1766736958396_%E6%88%AA%E5%9C%96%202025-12-26%20%E4%B8%8B%E5%8D%884.11.35.png", "url": "https://asiayo.com/zh-tw/activity/126592/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e91", "title": "2026前進東京，為台灣加油！海外棒球賽 4場觀賽＋東京庭之飯店5晚自由行", "location": "東京都", "headline": "★安排一般席位(保證席位)＋精選住宿 · ★住宿地點：東京庭之飯店。 · ★五場精彩賽事，千萬不能錯過！", "distance": "入住日期：2026/03/04(三)~03/09(一)", "includes": "觀賽日期：2026/03/05(四)~03/08(日)", "price": 76665, "priceText": "限量販售！每人最低 NT$76,665 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1768472535921_Snipaste_2026-01-15_18-22-06.jpg", "url": "https://asiayo.com/zh-tw/activity/127280/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e92", "title": "2026前進東京，為台灣加油！海外棒球賽 4場觀賽＋住宿5晚自由行方案", "location": "東京都", "headline": "★安排一般席位(保證席位)＋精選住宿 · ★住宿地點：品川王子大飯店、東京灣拉維斯塔飯店、京王廣場飯店、東京庭之飯店。(依您選擇而定) · ★五場精彩賽事，千萬不能錯過！", "distance": "入住日期：2026/03/04(三)~03/09(一)", "includes": "觀賽日期：2026/03/05(四)~03/08(日)", "price": 50415, "priceText": "限量販售！每人最低 NT$50,415 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1768529301342_Snipaste_2026-01-16_10-08-08.jpg", "url": "https://asiayo.com/zh-tw/activity/128063/", "chips": [], "soldOut": false, "badge": ""},
          {"id": "e93", "title": "2026WBC世界棒球經典賽 台日大賽＋超值精選2晚住宿", "location": "東京都", "headline": "★安排外野席＋精選住宿 · ★住宿地點：Villa Fontaine飯店 東京茅場町。 · ★精彩台日大賽，千萬不能錯過！", "distance": "入住日期：2026/03/06(五)~03/08(日)", "includes": "觀賽日期：2026/03/06(五)", "price": 25500, "priceText": "限量販售！每人最低 NT$25,500 起", "img": "https://gsimg.asiayo.com/ay-image-upload/1768900510605_Snipaste_2026-01-20_17-14-58.jpg", "url": "https://asiayo.com/zh-tw/activity/129548/", "chips": [], "soldOut": false, "badge": ""},
        ],
      },
    ],
  },
  "coming": {
    secondTabs: [],
    sections: [
    ],
  },
};