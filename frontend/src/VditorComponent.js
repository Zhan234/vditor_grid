// filepath: /d:/S_E/project2/frontend/src/VditorComponent.js
import React, { useEffect } from "react";
import Vditor from "vditor";
import "./styles/vditor.css"; // 导入 Vditor 的 CSS 文件

const VditorComponent = () => {
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

  return <div id="vditor" className="block-content"></div>;
};

export default VditorComponent;