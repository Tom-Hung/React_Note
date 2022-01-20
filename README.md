----Sinyi 範本----

# 啟動專案指令

---

## 開發環境

- npm run dev

## 測試機環境

- npm run build:pre-prod
- npm run start:pre-prod

## 正式機環境

- npm run build:prod
- npm run start:prod

# 環境變數設定檔

---

- .env.development 開發環境
- .env.pre_production 測試機環境
- .env.production 正式機環境

# 如何語法檢查

---

- 自動檢查: 使用 git commit 時，會針對該次提交檔案進行檢查 (備: 有些 Vscode 內建的 commit 會有異常，建議用 CMD 指令)
- 手動檢查: 若提交前想進行全部原始碼檢查可以用 npm run build:pre-prod ，Nextjs 預設會進行檢查

# 語法規範 : Eslint + husky + lint-staged( pre-commit )

---

- .eslintrc.json 定義 Eslint 規則
- .prettierrc.json 定義 Prettier 規則
- lint-staged.config.js 定義要執行的檢查指令與檔案，在 commit 時會自動觸發
- .husky/pre-commit 定義 git commit 時，的指令

# 速度優化建議: 圖片 + 字型載入 + CSS 載入 + Js

---

## 1. 圖片採用 Nextjs Image 元件

- 載入時機 - lazyLoading ( 初始畫面外 )、preLoading ( 初始畫面內 )
- 格式 - jpg ( 備用 )、webp ( 優先 )
- 圖片區塊 - 頁面上要先預留圖片空間 => 明確定義圖片寬高

## 2. google font or Typekit 字型載入遵循官方方式

- https://nextjs.org/docs/basic-features/font-optimization

## 3. CSS 載入用 module 或其他

- 區分共用樣式 global 與獨立的元件 module 樣式，禁止將所有 CSS 集成一包載入

## Js

- 區分共用的可抽成 hook or function

# 資料載入建議

---

## server 端取得資料

使用者載入後就不再更新

- getStaticProps (build-time 渲染)

使用者載入後，每幾分鐘更新

- getStaticProps + revalidate = (ISR) (build-time 渲染 + run-time 更新)

使用者載入的都是最新資料，且不想快取 (預設)

- getServerSideProps (run-time 渲染)

## client 端取得資料

使用者載入後或透過事件觸發才更新資料

- useEffect + axios
- useSwr + axios ( 含快取機制，不會每次 pages render 都重複打 api )
