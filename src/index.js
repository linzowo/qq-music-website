// 入口文件

import GoTop from "./js/util/gotop.js";

// 引入css文件
import "./css/index.css";
import "./css/gotop.css";

// 创建一个侧边固定按钮，并设置相关属性及样式
let gotop = new GoTop("#side-btn", "/css/gotop.css", {
  href: {
    "#1": null,
    "#2": "反馈",
    "#3": null
  }
});
// console.log(gotop);
let btn_gotop = gotop.LinkEleList[0];
let btn_player = gotop.LinkEleList[2];
// 为回到顶部按钮添加样式
btn_gotop.classList.add("side-gotop");
// 为网页播放器添加样式
btn_player.classList.add("side-player");

