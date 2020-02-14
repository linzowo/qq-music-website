// 一个简易元素属性变化监听器

// 实现一个观察者
(function() {
  let MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  let observer = new MutationObserver(callback);
  observer.observe(element, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true
  });
})();
