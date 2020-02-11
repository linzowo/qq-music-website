// 公共方法

/**
 * 获取元素的css样式值
 * @param {DOM} element 要获取样式的元素
 * @param {String} attr 要获取的样式值
 * @return {String} 返回值始终是一个数字加单位不会出现百分比
 */
let getStyle = function(element, attr) {
  return window.getComputedStyle
    ? window.getComputedStyle(element, null)[attr]
    : element.currentStyle[attr];
};

/**
 * 判断用户传入的值是百分比还是px
 * @param {String} cssValue 样式值
 * @return {Object} res["value"] 当前css样式的数字值
 * res["type"] 当前css样式的单位 % || px ...
 */
let getType = function(cssValue) {
  let res = {};
  res["value"] = cssValue.match(/\d+\.?\d*/)[0];
  res["type"] = cssValue.match(/\D+$/)[0];
  return res;
};

// js动画效果
/**
 * js缓动动画
 * @param {DOM} element 动画效果元素
 * @param {Object} json css属性和参数 key为String value为Number
 * @param {function} callback 回调函数。动画执行完毕后调用
 */
let animate = function(element, json, callback) {
  // 如果当前元素正在执行动画效果那么就不在继续添加动画效果
  if (element.time_id) return;

  // 为元素添加动画效果
  element.time_id = setInterval(() => {
    //   判断是否所有动画都完成的标志
    let flag = true;
    let target, current, step;
    for (let attr in json) {
      if (attr === "opacity") {
        // opacity的取值范围为 0-1
        target = parseFloat(json[attr]) * 100;
        current = parseFloat(getStyle(element, attr)) * 100;
        step = (target - current) / 10;
        step = step < 0 ? Math.floor(step) : Math.ceil(step);
        current = Math.abs(step) < 0.3 ? target : current + step;
        element.style[attr] = current / 100;
      } else if (attr === "zIndex") {
        element.style[attr] = parseInt(json[attr]) ? parseInt(json[attr]) : 0;
      } else {
        // 目标值 将其转换为数字，确保用户传入的内容能够被识别
        target = parseFloat(json[attr]);
        // 获取当前位置信息
        current = parseFloat(getStyle(element, attr));
        // 计算步数 同时确定移动的方向（正负）
        step = (target - current) / 10;
        // 因为浮点数存在计算精度的问题，所以先取整再计算，根据正负取整
        step = step < 0 ? Math.floor(step) : Math.ceil(step);
        // 获取移动后的位置
        current = Math.abs(step) < 0.1 ? target : current + step;
        // 将值应用到元素上
        element.style[attr] = current + "px";
      }

      if (target != current) {
        flag = false;
      }
    }

    // 结束动画
    if (flag) {
      clearInterval(element.time_id);
      element.time_id = null;
      if (callback) {
        callback();
      }
    }
  }, 20);
};

/**
 * 获取任意一个父级元素的第一个子元素
 * @param {DOM} element
 */
let getFirstElementChild = function(element) {
  if (element.firstElementChild) {
    return element.firstElementChild;
  } else {
    // 如果其他浏览器使用firstChild获取到的不是元素，仍然是节点的情况下，我们就需要判断其获取到的是标签还是其他类型的节点
    var node = element.firstChild; // 将获取到的第一个内容存储起来
    while (node && node.nodeType != 1) {
      // 如果获取到的内容不是标签就检查下一个内容
      node = node.nextSibling;
    } // end while
    return node;
  }
};

/**
 * 获取任意一个父级元素的最后一个子元素
 * @param {DOM} element
 */
let getLastElementChild = function(element) {
  if (element.lastElementChild) {
    return element.lastElementChild;
  } else {
    var node = element.lastChild;
    while (node && node.nodeType != 1) {
      node = node.previousSibling;
    } // end while
    return node;
  }
};

/**
 * 获取任意元素上一个兄弟元素
 * @param {DOM} element 要获取兄弟元素的元素
 */
let getPreviousElement = function(element) {
  if (element.previousElementSibling) {
    return element.previousElementSibling;
  } else {
    var node = element.previousSibling;
    while (node && node.nodeType != 1) {
      node = node.previousSibling;
    } // end while
    return node;
  }
};

/**
 * 获取任意元素下一个兄弟元素
 * @param {DOM} element 要获取兄弟元素的元素
 */
let getNextElement = function(element) {
  if (element.nextElementSibling) {
    return element.nextElementSibling;
  } else {
    var node = element.nextSibling;
    while (node && node.nodeType != 1) {
      node = node.nextSibling;
    } // end while
    return node;
  }
};

/**
 * 获取当前元素的所有兄弟元素
 * @param {DOM} element
 */
let getBrotherElementAll = function(element) {
  var broElementList = [];
  var preEle = getPreviousElement(element);
  var nextEle = getNextElement(element);
  while (preEle || nextEle) {
    if (preEle) {
      broElementList.push(preEle);
      preEle = getPreviousElement(preEle);
    } else if (nextEle) {
      broElementList.push(nextEle);
      nextEle = getNextElement(nextEle);
    } // end if
  } // end while
  return broElementList;
};

/**
 * 获取向左向上的卷曲距离
 */
let getScrollTopAndLeft = function () {
  return {
    top:
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0,
    left:
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft ||
      0
  };
}

// 导出必要函数
export {
  animate,
  getStyle,
  getType,
  getFirstElementChild,
  getLastElementChild,
  getPreviousElement,
  getNextElement,
  getBrotherElementAll,
  getScrollTopAndLeft
};

