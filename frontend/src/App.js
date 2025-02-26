import "./App.css"; // 确保导入了 CSS 文件
import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import VditorComponent from "./VditorComponent";

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
        <div className="drag-handle">
          <div className="circle"></div>
          <div className="circle middle"></div>
          <div className="circle"></div>
        </div>
        <div className="block-content">内容 1</div>
      </div>
      <div key="3" className="content">
        <div className="drag-handle">
          <div className="circle"></div>
          <div className="circle middle"></div>
          <div className="circle"></div>
        </div>
        <VditorComponent /> {/* 使用 Vditor 组件 */}
      </div>
      <div key="5" className="content">
        <div className="drag-handle">
          <div className="circle"></div>
          <div className="circle middle"></div>
          <div className="circle"></div>
        </div>
        <div className="block-content">内容 5</div>
      </div>
    </ReactGridLayout>
  );
};

export default App;

import("./test-hook.jsx").then(fn => fn.default(App));