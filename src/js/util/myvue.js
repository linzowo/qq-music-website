// 封装一个类vue框架

// 创建主对象
module.exports = class MyVue {
  constructor(data) {
    this.el = data.el;
    this.data = data.data;

    this.init();
    // 为data每个属性添加监听
    this.observe(this.data);

    this.init();
  }

  init() {
    console.log("这个对象初始化成功了");
  }

  data() {
    return this.data;
  }

  // TODO: 如何监听数据变化

  // 创建一个监听数据变化的方法

  /**
   * 将data对象上的所有方法添加上监听功能==》如果data的数据变化就会触发相应的处理函数
   * @param {Object} data
   */
  observe(data) {
    // 如果参数不为对象就结束功能
    if (!data || typeof data !== "object") {
      return;
    }

    // 遍历对象所有属性，并为每个属性添加监听器
    Object.keys(data).map(key => {
      this.defineReactive(data, key, data[key]);
    });
  }

  /**
   * 为子属性添加监听
   * 为当前属性添加监听
   * @param {Object} data 要修改属性的对象
   * @param {String} key 对象中键
   * @param {*} val 对象中传入的那个键的值
   */
  defineReactive(data, key, val) {
    this.observe(val); // 监听子属性

    // 重新定义属性
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function() {
        return val;
      },
      set: function(newVal) {
        console.log("哈哈哈，监听到值变化了 ", val, " --> ", newVal);
        val = newVal;
      }
    });
  }
};

// 向外暴露对象
// export default MyVue;
// module.exports = MyVue;
