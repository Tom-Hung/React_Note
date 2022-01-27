// The Latest Ref Pattern in React
// 核心概念: useRef 與 useLayoutEffect 的組合應用，確保每次 render 前先新好 useRef 的值
// * 需搭配 Pattern / ref 元件範例理解

// 理解 Pattern 的前置知識
// 1. 清楚 memorized React Hooks 的應用: useMemo 與 useCallback
// 2. 清楚 React Hooks: useRef 不會觸發 re-render / render 也不會影響 useRef
// 3. 清楚 React Hooks: useEffect 與 useLayoutEffect 在元件生命週期中的差異 (下方說明)
// 4. 清楚 function component 每次 render 都是獨立的

// 參考資料
// https://epicreact.dev/how-react-uses-closures-to-avoid-bugs/
// https://epicreact.dev/the-latest-ref-pattern-in-react/

import { useLayoutEffect, useMemo, useRef } from 'react';

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// ----------------- [without Pattern] -----------------

// function useDebounce(callback, delay) {
//   // 不會 debounce，因為每次 re-render 都會回傳一個新的、獨立的 debounce(callback, delay) function
//   // return debounce(callback, delay);

//   // 需使用 useMemo 將 function 保存，唯有 callback, delay 更新時才重新計算
//   return useMemo(() => debounce(callback, delay), [callback, delay]);
// }

// ----------------- [with ref Pattern] -----------------

function useDebounce(callback, delay) {
  // 將 callback 設置在 useRef
  const callbackRef = useRef(callback);

  // 每次 render 前將 callback 更新為當次 render 要用的，不用在 dependencies 管理 [callback] 是否改變
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // The Latest Ref Pattern in React 優化後
  return useMemo(
    () => debounce((...arg) => callbackRef.current(...arg), delay),
    [delay]
  );
}

export default useDebounce;

//  ----------------- [前置知識補充] -----------------
// 1. 元件生命週期 useEffect vs. useLayoutEffect

// [useEffect = render 後執行，屬於非同步事件]
// -------------------------
// 建立與呼叫 component
// 建立初始 DOM
// render
// useEffect (async)

// change state or props
// 比對 vrDOM
// 更新 DOM
// render
// useEffect (async)

// [useLayoutEffect = render 前執行，屬於同步事件，太多行為會推遲 render 影響 UX 體驗]
// -------------------------
// 建立與呼叫 component
// 建立初始 DOM
// useLayoutEffect (sync)
// render

// change state or props
// 比對 vrDOM
// 更新 DOM
// useLayoutEffect (sync)
// render
