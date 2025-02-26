// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



// import React from 'react';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// const ResponsiveGridLayout = WidthProvider(Responsive);

// function App() {
//   const layouts = {
//       lg: [
//         { i: 'a', x: 0, y: 0, w: 1, h: 2 },
//         { i: 'b', x: 1, y: 0, w: 3, h: 2 },
//         { i: 'c', x: 4, y: 0, w: 1, h: 2 }
//       ]
//     };

//   return (
//     <ResponsiveGridLayout
//       className="layout"
//       layouts={layouts}
//       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//     >
//       <div key="1">1</div>
//       <div key="2">2</div>
//       <div key="3">3</div>
//     </ResponsiveGridLayout>
//   );
// }

// export default App;





// import React from "react";
// import RGL, { WidthProvider } from "react-grid-layout";

// const ReactGridLayout = WidthProvider(RGL);

// /**
//  * This layout demonstrates how to use static grid elements.
//  * Static elements are not draggable or resizable, and cannot be moved.
//  */
// const App = ({ onLayoutChange = () => {} }) => {
//   const handleLayoutChange = (layout) => {
//     onLayoutChange(layout);
//   };

//   return (
//     <ReactGridLayout
//       className="layout"
//       onLayoutChange={handleLayoutChange}
//       rowHeight={30}
//       draggableHandle=".react-grid-dragHandleExample"
//     >
//       <div key="1" data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
//         <span className="text">1</span>
//       </div>
//       <div key="3" data-grid={{ x: 6, y: 0, w: 2, h: 3 }}>
//         <span className="text">3</span>
//       </div>
//       <div
//         key="4"
//         data-grid={{
//           x: 8,
//           y: 0,
//           w: 4,
//           h: 3
//         }}
//       >
//         <span className="text">
//           4 - Draggable with Handle
//           <hr />
//           <hr />
//           <span className="react-grid-dragHandleExample">[DRAG HERE]</span>
//           <hr />
//           <hr />
//         </span>
//       </div>
//     </ReactGridLayout>
//   );
// };

// export default App;

// // if (process.env.STATIC_EXAMPLES === true) {
// import("./test-hook.jsx").then(fn => fn.default(App));
// // }

import "./App.css"; // 确保导入了 CSS 文件
import React, { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import Vditor from "vditor";
import "./styles/vditor.css"; // 导入 Vditor 的 CSS 文件

const ReactGridLayout = WidthProvider(RGL);

/**
 * 自定义布局，包含五个横向排列的块
 * 1、3、5块可拖动交换位置，2、4块不可直接拖动
 * 所有块都不能调整大小，只能在横向交换位置
 */
const App = ({ onLayoutChange = () => {} }) => {
  // 预定义布局
  const layout = [
    { i: "1", x: 0, y: 0, w: 2, h: 4, isDraggable: true},
    { i: "3", x: 4, y: 0, w: 4, h: 4, isDraggable: true},
    { i: "5", x: 8, y: 0, w: 2, h: 4, isDraggable: true}
  ];
  
  const handleLayoutChange = (layout) => {
    onLayoutChange(layout);
  };
  
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      height: 710,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        id: "vditor",
      },
      after: () => {
        vditor.setValue("Hello, Vditor!");
      },
    });
  }, []);

  return (
    <ReactGridLayout
      compactType={'horizontal'}
      isBounded={true}
      className="layout"
      layout={layout}
      cols={8}
      rowHeight={180}
      width={900}
      onLayoutChange={handleLayoutChange}
      isResizable={false}
      // isDraggable={false} // 禁止直接拖动
      draggableHandle=".drag-handle" // 只能通过drag-handle拖动
      // preventCollision={true}
    >
      <div key="1" className="content">
        <div className="drag-handle">———drag here———</div>
        <div className="block-content">内容 1</div>
      </div>
      <div key="3" className="content">
        <div className="drag-handle">———drag here———</div>
        <div id="vditor" className="block-content"></div>
      </div>
      <div key="5" className="content">
        <div className="drag-handle">———drag here———</div>
        <div className="block-content">内容 5</div>
      </div>
    </ReactGridLayout>
  );
};

export default App;

import("./test-hook.jsx").then(fn => fn.default(App));