// ajax模块
/**
 * ajax模块用于发起网络请求
 * @param {String} method 请求方法 get or post
 * @param {String} url 请求地址 例如：www.abc.com
 * @param {Object} params 请求参数
 * @param {Function} callback 请求完成后要执行的操作
 */
let ajax = function(method, url, params={}, callback) {
  // 将method转换为大写，并验证用户输入
  method = method.toUpperCase();
  if (method !== "GET" && method !== "POST") return false;

  //   将用户参数转换为指定格式
  let pairs = [];
  for (let key in params) {
    pairs.push(key + "=" + params[key]);
  }
  let querystring = pairs.join("&");

  //   创建ajax对象
  const xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");

  //   监听对象状态变化
  xhr.addEventListener("readystatechange", function() {
    // 如果不是请求完成状态 不响应
    if (this.readyState !== 4) return;

    // 如果请求失败就直接返回
    if(!this.responseText){
      console.log("请求失败，或该站点未返回有效信息。");
      return null;
    }
    // 尝试解析json格式数据
    try {
      callback(JSON.parse(this.responseText));
    } catch (e) {
      // 解析json格式失败，直接处理返回数据
      callback(this.responseText);
    }
  });

  // 发起请求
  // 检查发起的请求类型
  if (method === "GET") {
    url += "?" + querystring;
  }
  xhr.open(method, url);
  let data = null;
  if (method === "POST") {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    data = querystring;
  }

  xhr.send(data);
};
export default ajax;
