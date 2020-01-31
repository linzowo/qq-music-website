// 入口文件

// 引入侧边固定按钮组件
import GoTop from "./js/util/gotop.js";

// 引入css文件
// 公共样式
import "./css/common.scss";
// 小组件样式文件
import "./css/mod-index-common.scss";
// 主页样式文件
import "./css/index.scss";
// 右下角固定按钮样式文件
import "./css/gotop.css";
// 右上角下载引导样式
import "./css/fixed-flag.css";
// 顶部公共导航栏样式
import "./pages/common/common-index-nav/common-index-nav.css";

// 创建一个侧边固定按钮，并设置相关属性及样式
let gotop = new GoTop("#side-btn",null, {
  href: {
    "#1": null,
    "#2": "反馈",
    "#3": null
  }
});
let btn_gotop = gotop.LinkEleList[0];
let btn_player = gotop.LinkEleList[2];
// 为回到顶部按钮添加样式
btn_gotop.classList.add("side-gotop");
// 为网页播放器添加样式
btn_player.classList.add("side-player");

