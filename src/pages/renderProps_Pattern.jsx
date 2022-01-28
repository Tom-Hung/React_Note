// render props +  prop getters Pattern
// 核心概念: 讓父元件的 children 得以使用 state ( render props )，且具備修改的彈性 ( prop getters )

// [ 範例說明 ]
// 1. 如何讓 Panel 內的 children 或子元件，使用 Panel 的 toggle, setToggle 狀態 ( 理解 render props )
// 2. 如果讓傳遞的狀態或參數，具有一定的修改彈性 ? ( 理解 prop getters )

// [ 參考資料 ]
// https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns
// https://www.youtube.com/watch?v=ubXtOROjILU&list=PLV5CVI1eNcJgBniABPfk_tMliLrSJNC-T&index=4

import { useState } from 'react';

// 父元件
const Panel = ({ children }) => {
  // 子元件需要用到這邊的 state
  const [toggle, setToggle] = useState(false);

  // 將子元件需要的內容用物件傳遞
  const passToChild = () => {
    return {
      toggle: toggle,
      // onClick: () => setToggle(!toggle),
      propGetters: propGetters,
    };
  };

  // 若需要更大的彈性可以傳遞 prop getters 給子元件應用
  const propGetters = ({ onClick, ...props }) => {
    return {
      onClick: () => {
        onClick && onClick();
        // 只有 setToggle 重複應用，其餘行為希望保持彈性則用 onClick 來接收
        setToggle(!toggle);
      },
      ...props,
    };
  };

  return <div>{children(passToChild())}</div>;
};

// 子元件: 接收 toggle 狀態來顯示文字
const Display = ({ toggle }) => {
  return <div>{toggle ? 'on' : 'off'}</div>;
};

// 主要元件
const RenderPropsPattern = () => {
  const handleOnClick = (value) => console.log(value);

  return (
    <div>
      <Panel>
        {/* render props  */}
        {({ toggle, onClick, propGetters }) => {
          return (
            <>
              {/* 單純的傳遞父元件的狀態 */}
              <Display toggle={toggle} />

              {/* 情境:　父元件傳遞進來的 onClick 邏輯可以復用，但若擴充行為成每次點擊後印出文字，該怎麼做 ? */}
              {/* 解法 1:　技術上單純得將此處的 onClick event handler 擴充就解決了，但 onClick() 本該是復用的邏輯現在卻得在每次擴充時都要再打一次 */}
              {/* 解法 2:　prop getters 將 onClick() 邏輯保存於父元件中，並接納擴充行為與其餘參數 */}
              <button
                // [ without prop getters ]
                // onClick={() => {
                //   // 加入我要的行為即可
                //   console.log('clicked');
                //   // 每次擴充都要重新加入，算不上是真正的重複應用
                //   onClick();
                // }}
                // className="button"
                // style={{ color: 'white', backgroundColor: 'black' }}
                // ------------------------------------------------------------------------------
                // [ without prop getters ]
                {...propGetters({
                  onClick: () => handleOnClick('clicked'),
                  className: 'button',
                  style: { color: 'white', backgroundColor: 'black' },
                })}
              >
                click me
              </button>
            </>
          );
        }}
      </Panel>
    </div>
  );
};

export default RenderPropsPattern;
