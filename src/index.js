// 入口文件

// 引入公共方法
import {
  animate,
  getStyle,
  getType,
  getFirstElementChild,
  getLastElementChild,
  getPreviousElement,
  getNextElement,
  getBrotherElementAll
} from "./js/common.js";
// 引入ajax模块
import ajax from "./common/ajax/ajax.js";
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
import "./common/header/header.css";
// 公共footer样式
import "./common/footer/footer.scss";

// 创建一个侧边固定按钮，并设置相关属性及样式
let gotop = new GoTop("#side-btn", null, {
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

// mod-index相关效果
(function() {
  // 轮播左右按钮
  let mod_index_list = document.querySelectorAll(".mod-index");

  // jump_btn点击事件处理函数
  function jumpBtnClickHandle() {
    // 判断当前点击的按钮是哪个区域的按钮
    // 获取要操作的目标区域
    let stat_arr = this.dataset.stat.split(".");
    let targetEle = document.querySelector("." + stat_arr[2] + "-list");
    // 父元素宽度--一次动画的移动距离
    let parentWidth = targetEle.parentElement.offsetWidth;

    // 当前轮播标记所在的元素
    let slide_switch_item_current = targetEle.parentElement.parentElement.querySelector(
      ".slide-switch-item-current"
    );
    // 移除当前标记
    slide_switch_item_current.classList.remove("slide-switch-item-current");

    // 判断当前数据是文本还是数字
    if (isNaN(parseInt(this.dataset.p))) {
      // 不是数字
      let next_slide_switch_item = getNextElement(slide_switch_item_current);
      let prev_slide_switch_item = getPreviousElement(
        slide_switch_item_current
      );
      let first_slide_switch_item = getFirstElementChild(
        slide_switch_item_current.parentElement
      );
      let last_slide_switch_item = getLastElementChild(
        slide_switch_item_current.parentElement
      );

      switch (this.dataset.p) {
        case "prev":
          // 切换轮播标记
          prev_slide_switch_item
            ? prev_slide_switch_item.classList.add("slide-switch-item-current")
            : last_slide_switch_item.classList.add("slide-switch-item-current");

          // 执行动画
          if (!prev_slide_switch_item) {
            targetEle.style.left =
              -1 *
                slide_switch_item_current.parentElement.childElementCount *
                parentWidth +
              "px";
          }
          animate(
            targetEle,
            {
              left: parseInt(getStyle(targetEle, "left")) + parentWidth
            },
            function() {
              targetEle.style.left =
                (parseInt(targetEle.style.left) / parentWidth) * 100 + "%";
            }
          );
          break;
        case "next":
          next_slide_switch_item
            ? next_slide_switch_item.classList.add("slide-switch-item-current")
            : first_slide_switch_item.classList.add(
                "slide-switch-item-current"
              );

          // if (next_slide_switch_item == last_slide_switch_item) {
          animate(
            targetEle,
            {
              left: parseInt(getStyle(targetEle, "left")) - parentWidth
            },
            function() {
              if (!next_slide_switch_item) {
                targetEle.style.left = "0px";
              }
              targetEle.style.left =
                (parseInt(targetEle.style.left) / parentWidth) * 100 + "%";
            }
          );

          break;

        default:
          break;
      }
    } else {
      // 是数字

      this.classList.add("slide-switch-item-current");
      animate(targetEle, {
        left: parseInt(this.dataset.p) * -parentWidth
      });
    }

    // 判断当前按钮的类别

    // 执行指定操作
  }
  // 为跳转按钮注册点击事件
  mod_index_list.forEach(ele => {
    ele.addEventListener("click", function(evt) {
      // 轮播相关动画关联效果实现
      if (evt.target.classList.contains("js-jump")) {
        jumpBtnClickHandle.call(evt.target);
      }

      if (
        evt.target.classList.contains("slide-action-arrow") ||
        evt.target.classList.contains("slide-switch-bg")
      ) {
        jumpBtnClickHandle.call(evt.target.parentElement);
      }
      // 轮播相关动画关联效果实现

      // tab nav切换相关
      // 判断点击的目标是否为tab标签
      if (evt.target.classList.contains("mod-index-tab-link")) {
        // console.dir(evt.target);
        // 获取元素上绑定的数据信息
        // 生成ajax请求
        // 根据响应信息刷新页面数据
        // 切换tab栏显示的current
        let current_tab = evt.target.parentElement.parentElement.querySelector(
          ".mod-index-tab-link.current"
        );
        current_tab.classList.remove("current");
        evt.target.classList.add("current");
      }

      // tab nav切换相关
    });
  });
})();

// mod-index相关效果

// 测试ajax
// ajax("get", "https://c.y.qq.com/soso/fcgi-bin/client_search_cp", {
//   p: 1,
//   n: 2,
//   w: "泡沫",
//   format: "json"
// },function(res){
//   console.log(res);
  
// });
