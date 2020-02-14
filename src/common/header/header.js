// 公共导航栏js
export default (function() {
  // 实现登陆后hover头像区域出现个人页
  let loginedEle = document.querySelector(".logined");
  let popup_user = document.querySelector("#popup_user");

  function addDrop(ele) {
    return function() {
      ele.classList.add("drop");
    };
  }

  function removeDrop(ele) {
    return function() {
      ele.classList.remove("drop");
    };
  }

  if (loginedEle) {
    loginedEle.addEventListener("mouseover", addDrop(popup_user));
    loginedEle.addEventListener("mouseout", removeDrop(popup_user));
    popup_user.addEventListener("mouseover", addDrop(popup_user));
    popup_user.addEventListener("mouseout", removeDrop(popup_user));
  }

  //   实现搜索框获取焦点后弹出搜索结果
  let topSearchEle = document.querySelector("#top_search");
  let modSearchOtherEle = document.querySelector("#mod_search_other");
  topSearchEle.addEventListener("focus", addDrop(modSearchOtherEle));
  topSearchEle.addEventListener("blur", removeDrop(modSearchOtherEle));
  // 解决在最小屏幕尺寸下的搜索框交互效果
  topSearchEle.addEventListener("transitionend", function() {
    if (topSearchEle.offsetWidth === 0) {
      topSearchEle.blur();
    }
  });
})();
