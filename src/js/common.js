// 公共方法

class Linzowo {
  constructor() {}
  /**
   * 判断对象是否为一个dom元素
   * @param {DOM} obj 要判断的对象
   * @return {Boolean}
   */
  isElement(obj) {
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrome)
      return obj instanceof HTMLElement;
    } catch (e) {
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have (works on IE7)
      return (
        typeof obj === "object" &&
        obj.nodeType === 1 &&
        typeof obj.style === "object" &&
        typeof obj.ownerDocument === "object"
      );
    }
  }

  /**
   * 获取元素的css样式值
   * @param {DOM} element 要获取样式的元素
   * @param {String} attr 要获取的样式值
   * @return {String} 返回值始终是一个数字加单位不会出现百分比
   */
  getStyle(element, attr) {
    return window.getComputedStyle
      ? window.getComputedStyle(element, null)[attr]
      : element.currentStyle[attr];
  }

  /**
   * 判断用户传入的值是百分比还是px
   * @param {String} cssValue 样式值
   * @return {Object} res["value"] 当前css样式的数字值
   * res["type"] 当前css样式的单位 % || px ...
   */
  getType(cssValue) {
    let res = {};
    res["value"] = cssValue.match(/\d+\.?\d*/)[0];
    res["type"] = cssValue.match(/\D+$/)[0];
    return res;
  }

  // js动画效果
  /**
   * js缓动动画
   * @param {DOM} element 动画效果元素
   * @param {Object} json css属性和参数 key为String value为Number
   * @param {function} callback 回调函数。动画执行完毕后调用
   */
  animate(element, json, callback) {
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
          current = parseFloat(this.getStyle(element, attr));
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
  }

  /**
   * 获取任意一个父级元素的第一个子元素
   * @param {DOM} element
   */
  getFirstElementChild(element) {
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
  }

  /**
   * 获取任意一个父级元素的最后一个子元素
   * @param {DOM} element
   */
  getLastElementChild(element) {
    if (element.lastElementChild) {
      return element.lastElementChild;
    } else {
      var node = element.lastChild;
      while (node && node.nodeType != 1) {
        node = node.previousSibling;
      } // end while
      return node;
    }
  }

  /**
   * 获取任意元素上一个兄弟元素
   * @param {DOM} element 要获取兄弟元素的元素
   */
  getPreviousElement(element) {
    if (element.previousElementSibling) {
      return element.previousElementSibling;
    } else {
      var node = element.previousSibling;
      while (node && node.nodeType != 1) {
        node = node.previousSibling;
      } // end while
      return node;
    }
  }

  /**
   * 获取任意元素下一个兄弟元素
   * @param {DOM} element 要获取兄弟元素的元素
   */
  getNextElement(element) {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    } else {
      var node = element.nextSibling;
      while (node && node.nodeType != 1) {
        node = node.nextSibling;
      } // end while
      return node;
    }
  }

  /**
   * 获取当前元素的所有兄弟元素
   * @param {DOM} element
   */
  getBrotherElementAll(element) {
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
  }

  /**
   * 获取向左向上的卷曲距离
   */
  getScrollTopAndLeft() {
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
  /**
   * 创建分页按钮
   * @param {*} rootEle
   * @param {*} total
   * @param {*} callback
   */
  page(rootEle, total, callback) {
    let current = 1; // 当前显示的第几页
    //   用户点击需要的元素 然后根据用户的点击行为改变current数据 根据current数据生成对应的分页按钮
    // 获取父级元素方便进行事件委托

    rootEle = this.isElement(rootEle)
      ? rootEle
      : document.querySelector(rootEle);
    // 如果传入的不是dom元素就直接返回
    if (!this.isElement(rootEle)) return false;

    pageBtnCreated(rootEle, current, total);

    rootEle.addEventListener("click", function(evt) {
      if (
        evt.target.classList.contains("js_pageindex") ||
        evt.target.parentElement.classList.contains("js_pageindex")
      ) {
        pageClickHandle(evt, rootEle, total);
        if (callback) {
          callback();
        }
      }
    });

    function pageClickHandle(evt, rootEle, max) {
      current = parseInt(
        evt.target.dataset.index || evt.target.parentElement.dataset.index
      );
      pageBtnCreated(rootEle, current, max);
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
      let pageBtnDS = "";

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
  }

  proxy(url, params, callback) {
    // 使用window.name+iframe方案实现跨域请求数据
    if (!url) return false;
    // 确保传入数据为Object对象
    if (Object.prototype.toString.call(params) !== "[object Object]") {
      // 如果不是就进行json格式转换
      if (!JSON.parse(params)) return false;
      params = JSON.parse(params);
    }

    // 处理参数
    let pairs = [];
    for (let key in params) {
      pairs.push(key + "=" + params[key]);
    }
    url = url + "?" + pairs.join("&");

    // 生成跨域元素
    let iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.display = "none";

    // 开始跨域请求
    // 标记是第几次onload
    let state = 0;
    iframe.onload = function(){
      if(state === 1){
        // 现在是第二次onload，已经读取成功了，并将域切换为同域
        // 获取返回的信息
        callback(iframe.contentWindow.name);
        // 删除iframe
        removeFrame();
      }

      if(state === 0){
        // 第一次onload请求的是跨域站点，成功后将域切换为同域
        // iframe.contentWindow.name = iframe.contentWindow.document.body.innerText;
        console.log(iframe.contentWindow.document.body.innerText);
        
        iframe.contentWindow.location = window.location;
        console.log(window.location);
        
        // 标记状态为完成第一次请求
        state = 1;
      }
    }

    // 将元素插入body中
    document.body.appendChild(iframe);

    // 删除iframe的方法
    function removeFrame(){
      iframe.contentWindow.document.write = "";
      iframe.contentWindow.close();
      document.body.removeChild(iframe);
    }
  }
}
export default (function() {
  window.$ = window.Linzowo = new Linzowo();
})();
