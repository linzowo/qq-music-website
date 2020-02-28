// 分页按钮相关js

// 需要的参数
/**
 * 总页数
 * 回调函数
 */
// if (!window.$) {
//   import "../../js/common.js";
// }
import "./common.js";

export default (function(total, callback) {
  let current = 1; // 当前显示的第几页
  // 动态生成分页元素
  // for (let index = 0; index < array.length; index++) {
  //     const element = array[index];

  // }
  //   用户点击需要的元素 然后根据用户的点击行为改变current数据 根据current数据生成对应的分页按钮
  // 获取父级元素方便进行事件委托
  let pagerEle = document.querySelector(".js_pager");
  pagerEle.addEventListener("click", function(evt) {
    switch (evt.target.classList[0]) {
      // case "prev":
      //   //   console.log("上一页");
      //   pageClickHandle(evt,pagerEle,total)
      //   break;
      // case "next":
      //   //   console.log("下一页");
      //   pageClickHandle(evt,pagerEle,total)
      //   break;
      case "js_pageindex":
        pageClickHandle(evt, pagerEle, total);
        if (callback) {
          callback();
        }
        // console.log(evt.target.dataset.index);
        break;
      default:
        break;
    }
    // 上一页
    // 下一页
  });

  function pageClickHandle(evt, root, max) {
    current = evt.target.dataset.index;
    pageBtnCreated(root, current, max);
  }

  /**
   * 生成分页按钮的html结构字符串
   * @param {DOM} rootEle 分页按钮的父元素，可以传入dom对象或者选择器
   * @param {Number | String} current 当前页码
   * @param {Number | String} max 最大页码
   * @param {Number | String} min 最小页码默认为1
   * @param {Number} halfSize 页码半径
   */
  function pageBtnCreated(rootEle, current, max, min = 1, halfSize = 2) {
    // 当前呈现的页面编号
    let current = current,
      // 最大页码
      max = max,
      // 最小页码
      min = min,
      // 分页按钮HTML结构字符串
      pageBtnDS = "",
      rootEle = $.isElement(rootEle)
        ? rootEle
        : document.querySelector(rootEle);

    // 如果传入的不是dom元素就直接返回
    if (!$.isElement(rootEle)) return false;
    // 几个关键页码 min min+2 min+4 max max-2 max-4

    // 循环生成HTML结构
    for (let i = 0; i <= halfSize; i++) {
      if (i === 0) {
        pageBtnDS = `<strong class="current">${current}</strong>`;
        continue;
      }
      let prevNnm = current - i,
        nextNum = current + i;
      if (prevNnm >= min) {
        pageBtnDS =
          `<a href="javascript:;" class="js_pageindex" data-index="${prevNnm}">${prevNnm}</a>` +
          pageBtnDS;
      }
      if (nextNum <= max) {
        pageBtnDS += `<a href="javascript:;" class="js_pageindex" data-index="${nextNum}">${nextNum}</a>`;
      }

      if (i === halfSize) {
        if (prevNnm > min + 1) {
          pageBtnDS =
            `<a href="javascript:;" class="js_pageindex" data-index="1">1</a>
          <strong class="more">...</strong>` + pageBtnDS;
        }
        if (prevNnm == min + 1) {
          pageBtnDS =
            `<a href="javascript:;" class="js_pageindex" data-index="1">1</a>` +
            pageBtnDS;
        }

        if (nextNum < max - 1) {
          pageBtnDS += `<strong class="more">...</strong
          ><a href="javascript:;" class="js_pageindex" data-index="${max}" hidefocus=""
            >${max}</a
          >`;
        }
        if (nextNum == max - 1) {
          pageBtnDS += `<a href="javascript:;" class="js_pageindex" data-index="${max}" hidefocus=""
          >${max}</a
        >`;
        }

        if (current > min) {
          pageBtnDS =
            `
          <a href="javascript:;" class="prev js_pageindex" data-index="${current -
            1}" title="上一页"
            ><span>&lt;</span></a
          >` + pageBtnDS;
        }
        if (current < max) {
          pageBtnDS += `<a
          href="javascript:;"
          class="next js_pageindex"
          data-index="${current + 1}"
          title="下一页"
          hidefocus=""
          ><span>&gt;</span></a
        >`;
        }
      }
    }

    // 将根元素内的内容替换为生成的HTML结构
    rootEle.innerHTML = pageBtnDS;
  }
})(299);
