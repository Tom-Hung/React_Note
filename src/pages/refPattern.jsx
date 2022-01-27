// 「The Latest Ref Pattern in React」 By Kent
//  核心概念: useRef 與 useLayoutEffect 的組合應用，確保每次 render 前先新好 useRef 的值
// * 需搭配 hooks / useDebounce 理解

// [ 理解 Pattern 的前置知識 ]
// 1. 清楚 memorized React Hooks 的應用: useMemo 與 useCallback
// 2. 清楚 React Hooks: useRef 不會觸發 re-render / render 也不會影響 useRef
// 3. 清楚 React Hooks: useEffect 與 useLayoutEffect 在元件生命週期中的差異 (下方說明)
// 4. 清楚 function component 每次 render 都是獨立的

// [ 參考資料 ]
// https://epicreact.dev/how-react-uses-closures-to-avoid-bugs/
// https://epicreact.dev/the-latest-ref-pattern-in-react/

import { useCallback, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

// [ 範例說明 ]
// 點擊 <div> 元件會觸發 render，且延遲 1 秒後會印出 'final value'
// 若密集頻繁點擊時會不斷的 re-render，範例最終目標為使用 custom hooks useDebounce 讓 'final value' 只有在最後一次點擊後 1 秒印出

// ----------------- [without Pattern] -----------------
// const Test = () => {
//   // 只是為了觸發密集的 re-render
//   const [toggle, setToggle] = useState(false);

//   // 每次 re-render 都會建立獨立的 print，就像是 print01 , print02 ...，
//   // 這讓 useMemo dependencies 的 [callback] 不斷更新 useMemo 自然失去效用
//   const print = () => {
//     console.log('final value');
//   };

//   // 把 print 的行為用 useCallback 保存，讓 useMemo dependencies 的 callback 不被視為更新
//   // 問題解決了 debounce 如預期地在密集事件結束後才被觸發一次。
//   // const print = useCallback(() => console.log('final value'), []);

//   // * 但是每次使用 useDebounce 都要額外將 func 自行 useCallback 保存，這 Hooks 顯然做得不完整
//   // 因此可以使用 「The Latest Ref Pattern in React」改寫 Hooks 。

//   const debouncedMyFn = useDebounce(print, 1000);

//   const handleOnClick = () => {
//     debouncedMyFn();
//     setToggle(!toggle);
//   };

//   return <div onClick={handleOnClick}>112</div>;
// };

// ----------------- [with ref Pattern] -----------------

const Test = () => {
  const [toggle, setToggle] = useState(false);

  const print = () => {
    console.log('final value');
  };

  const debouncedMyFn = useDebounce(print, 1000);

  const handleOnClick = () => {
    debouncedMyFn();
    setToggle(!toggle);
  };

  return <div onClick={handleOnClick}>click me !</div>;
};

export default Test;
