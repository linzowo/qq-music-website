//

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

// 1 将css文件和js放入文件夹中
// 2 在页面中创建一个容器
// 3 引入js文件
// 4 实例化对象 gotop 并传入指定参数
// 5 自动引入css文件 并向页面中插入结构

/**
 * 参数：
 *
 * css文件地址 ==》 必须
 * 根节点 ==》 必须 可以是dom元素也可以是选择器
 * 数量
 * 文本内容 | 背景图片位置 ===》 数组
 *
 * css
 * 位置
 * 边距
 * margin
 * 大小
 *
 */

class GoTop {
  constructor(root, cssPath, obj) {
    // 根节点
    this.root = root.nodeType === 1 ? root : document.querySelector(root);
    // css文件路径
    this.cssPath = cssPath;

    // 其他参数
    // 内容参数或者图片地址 ==》 数组或字符串
    // 导航链接的地址 ==》 数组或者字符串
    this.hrefObj = obj.href;


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
    cssLink.href = this.cssPath;
    document.head.appendChild(cssLink);
  }

  setHtml() {
    let res = "";
    console.log(this.hrefObj);
    
    for (const key in this.hrefObj) {
      res += getLink(key, this.hrefObj[key]);
    }
    this.root.innerHTML = res;
  }
}
