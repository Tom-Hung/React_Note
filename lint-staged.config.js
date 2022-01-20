module.exports = {
  'src/pages/**/\*.tsx': [
    'tsc-files --noEmit',
    'eslint  --fix',
    'prettier --write',
  ],
  'src/components/**/\*.tsx': [
    'tsc-files --noEmit',
    'eslint  --fix',
    'prettier --write',
  ],
};

// # 檔案過濾 - 範例
// 1. *ts              會找到所有 ts 檔案，例如: /test.ts 或 /foo/bar/test.ts
// 2. !(*test).js      選取所有但不包含 test 結尾的 js，例如:  test.js 或 foo.test.js 不會被選取
// 3. ./*.js           根目錄下的所有 js 檔案
// 4. pages/**/*.js    根目錄 pages 資料夾， 下兩層的所有 js 檔案

// # 重點指令
// 1. eslint --fix        自動修復錯誤
// 2. eslint --cache      只檢查修改的檔案
// 3. prettier --write    自動覆寫檔案排版
// 4. tsc-files --noEmit  不要轉譯，不會生成 js 檔案只做類型檢查

// # tsc-files 套件
// 會指定 tsc 讀取 tsconfig.json 設定檔

// 其他
// 1. /**/\*.tsx 跳脫符號在 vscode 存檔時，預設會被取消
// 2. .eslintcache 與 .tsbuildinfo 會記錄每次檢查的紀錄，再下次檢查只會針對修改部分檢查，可以加速檢查過程 ( 記得清除這些檢查的紀錄檔案 )
// 3. Eslint --warning 不會秀出來，只會顯示 --error
