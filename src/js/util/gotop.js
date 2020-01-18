// 侧边回到顶部组件

/**
 * 返回一个a标签字符串
 * @param {String} content  a标签中的展示文字
 * @param {String} href a标签的链接地址url
 */
function getLink(content, href) {
  content = content ? content : "";
  href = href ? href : "#"; // 存在链接就安排链接，没有就让该标签返回顶部
  return `<a href='${href}'>${content}</a>`;
}

/**
 * @param {DOM | querySelector} root 组件根节点元素或者元素选择器
 * @param {String} cssPath 样式文件相对路径
 * @param {Object} obj 设置参数包含下列对象
 * {
 *    href:{"linkURL":textContent}
 * }
 */
export default class GoTop {
  constructor(root, cssPath, obj) {
    // 根节点
    this.root = root.nodeType === 1 ? root : document.querySelector(root);
    // 为根节点添加样式名称
    this.root.classList.add("gotop-container");
    // css文件路径
    this.cssPath = cssPath;

    // 其他参数
    this.hrefObj = obj.href;
    console.log(obj);
    

    // 存储a标签元素的数组
    this.LinkEleList = null;

    // 初始化对象
    this.init();
  }

  init() {
    // 添加css引用链接
    this.setCssLink();

    this.setHtml();

    //
  }

  /**
   * 向页面中插入link标签，引入样式表
   */
  setCssLink() {
    let cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = this.cssPath;
    document.head.appendChild(cssLink);
  }

  setHtml() {
    let res = "";
    console.log(this.hrefObj);
    
    for (const key in this.hrefObj) {
      res += getLink(this.hrefObj[key], key);
    }
    this.root.innerHTML = res;

    // 返回生成的a标签让用户可以单独操作
    this.LinkEleList = this.root.querySelectorAll("a");
  }
}
