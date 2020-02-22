// 入口文件

// 引入兼容ie8文件
// import '@babel/polyfill';
import "core-js/stable";
import "regenerator-runtime/runtime";

// 引入公共方法
import "./js/common.js";
// 引入公共配置文件
import { API } from "./js/config.js";
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
import "./common/header/header.js";
// 公共footer样式
import "./common/footer/footer.scss";

// index-singer页面样式
import "./css/index-singer-box.scss";

// 分页相关样式
import "./common/page/page.scss";
// import "./common/page/page.js";

// 创建一个侧边固定按钮，并设置相关属性及样式
(function() {
  let gotop = new GoTop("#side-btn", null, {
    href: {
      "javascript:;": null,
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

  let sideGoTopEle = document.querySelector(".side-gotop");
  sideGoTopEle.addEventListener("click", function() {
    scrollTo(0, 0);
  });

  window.onscroll = function() {
    if (
      $.getScrollTopAndLeft().top > 140 &&
      sideGoTopEle.style.display !== "block"
    ) {
      sideGoTopEle.style.display = "block";
    }
    if (
      $.getScrollTopAndLeft().top < 140 &&
      sideGoTopEle.style.display !== "none"
    ) {
      sideGoTopEle.style.display = "none";
    }
  };
})();

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
      let next_slide_switch_item = $.getNextElement(slide_switch_item_current);
      let prev_slide_switch_item = $.getPreviousElement(
        slide_switch_item_current
      );
      let first_slide_switch_item = $.getFirstElementChild(
        slide_switch_item_current.parentElement
      );
      let last_slide_switch_item = $.getLastElementChild(
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
          $.animate(
            targetEle,
            {
              left: parseInt($.getStyle(targetEle, "left")) + parentWidth
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
          $.animate(
            targetEle,
            {
              left: parseInt($.getStyle(targetEle, "left")) - parentWidth
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
      $.animate(targetEle, {
        left: parseInt(this.dataset.p) * -parentWidth
      });
    }

    // 判断当前按钮的类别

    // 执行指定操作
  }
  // 为跳转按钮注册点击事件
  for (const ele of mod_index_list) {
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
  }
})();

// 创建分页按钮
(function() {
  $.page(".js_pager", 229);
})();
// mod-index相关效果

// 通过ajax及nginx跳板实现跨域请求数据
(function() {
  // 生成模板
  /**
   * 生成HTML结构
   * @param {Number} num 生成结构的数量
   * @param {Function} callback 用以传入基本HTML结构的函数
   */
  function createHTML(num, callback) {
    let res = "";
    for (let i = 0; i < num; i++) {
      res += callback(i);
    }
    return res;
  }

  /**
   * 生成轮播标记元素
   * @param {Number} num 生成的轮播标记数量
   * @param {*} mod 所属的模块
   */
  function createModSlideSwitch(num, mod) {
    // 生成轮播标记
    return createHTML(num, i => {
      return `<a
    href="javascript:;"
    class="js-jump slide-switch-item ${
      i == 0 ? "slide-switch-item-current" : ""
    }"
    data-p="${i}"
    tabindex="-1"
    data-stat="y_new.index.${mod}.pager"
  >
    <i class="slide-switch-bg"></i>
    <i class="icon-text">${i + 1}</i>
  </a>`;
    });
  }

  // 发起ajax请求
  // 主页加载成功后允许该方法
  let jsIndexContentBoxEle = document.querySelector("#js_index_content_box");
  // 获取主页除mv以外的数据
  ajax("get", API.index.url, API.index.params, function(res) {
    // console.log(res);

    // ===歌单推荐===
    (function(res) {
      // 生成<ul class="mod-index-tab">下的li标签
      let category_tem = [].concat(res.category.data.category[0].items);
      let modIndexTabItem = createHTML(5, i => {
        let categoryItem = category_tem.splice(
          Math.floor(Math.random() * category_tem.length),
          1
        )[0];
        return `<li>
        <a href="javascript:;" class="mod-index-tab-link" data-type="playlist" data-index="${i +
          1}" data-id="${categoryItem.item_id}">${categoryItem.item_name} </a>
      </li>`;
      });

      // 生成<ul class="playlist-list slide-list">下li标签
      let playlistItem = createHTML(
        Math.ceil(res.recomPlaylist.data.v_hot.length / 5) * 5,
        i => {
          let ele = res.recomPlaylist.data.v_hot[i];
          if (i >= Math.floor(res.recomPlaylist.data.v_hot.length / 5) * 5) {
            ele =
              res.recomPlaylist.data.v_hot[
                i - Math.floor(res.recomPlaylist.data.v_hot.length / 5) * 5
              ];
          }
          return `<li class="playlist-item slide-item">
        <div class="playlist-item-box">
          <div class="playlist-cover">
            <a href="javascript:;" class="mod-cover-link">
              <img
                src="${ele.cover}"
                alt="${ele.title}"
              />
              <i class="mod-cover-mask"></i>
              <i class="mod-cover-icon-play"></i>
            </a>
          </div>
          <h4 class="playlist-title">
            <a href="#">${ele.title}</a>
          </h4>
          <div class="playlist-other">播放量：${(
            ele.listen_num / 10000
          ).toFixed(1)}万</div>
        </div>
      </li>`;
        }
      );

      // 生成轮播标记
      let slideSwitchItem = createModSlideSwitch(
        Math.floor(res.recomPlaylist.data.v_hot.length / 5),
        "playlist"
      );

      // 最终模板字符串
      let taogelistTemp = `
      <div class="section-inner">
      <!-- 标题 -->
      <div class="mod-index-hd">
        <h2 class="mod-index-tit"></h2>
      </div>
      <!-- 切换 -->
      <!-- 类别切换 -->
      <ul class="mod-index-tab">
        <li>
          <a href="javascript:;" class="mod-index-tab-link current" data-index="0" data-type="recomPlaylist" data-id="1">为你推荐</a>
        </li>
  
        ${modIndexTabItem}
  
      </ul>
      <!-- 内容展示 -->
      <div class="mod-playlist mod-slide">
        <ul class="playlist-list slide-list">
  
          ${playlistItem}
  
        </ul>
      </div>
      <!-- 轮播标记 -->
      <div class="mod-slide-switch">
        ${slideSwitchItem}
      </div>
    </div>
    <div class="mod-slide-action">
      <div class="slide-action mod-slide-action-left">
        <a
          href="javascript:;"
          class="slide-action-btn slide-action-btn-left js-jump"
          data-p="prev"
          tabindex="-1"
          data-stat="y_new.index.playlist.pager"
        >
          <i class="icon-text">上一页</i>
          <i class="slide-action-arrow slide-action-arrow-left sprite"></i>
        </a>
      </div>
      <div class="slide-action mod-slide-action-right">
        <a
          href="javascript:;"
          class="slide-action-btn slide-action-btn-right js-jump"
          data-p="next"
          tabindex="-1"
          data-stat="y_new.index.playlist.pager"
        >
          <i class="icon-text">下一页</i>
          <i class="slide-action-arrow slide-action-arrow-right sprite"></i>
        </a>
      </div>
    </div>
    `;
      // console.dir(document.createDocumentFragment().innerHTML=taogelistTemp);
      jsIndexContentBoxEle.querySelector(
        "#taogelist_box"
      ).innerHTML = taogelistTemp;
    })(res);

    // ===新歌首发===
    (function(res) {
      let newSongData = res.new_song.data,
        newSongLan = newSongData.lanlist,
        newSongList = newSongData.songlist,
        newSongTemp,
        modIndexTabItem,
        songListItem;

      // <ul class="mod-index-tab"></ul>下的类别标签
      modIndexTabItem = createHTML(newSongLan.length, i => {
        return `
          <li>
            <a href="javascript:;" class="mod-index-tab-link js_tag${
              i == 0 ? " current" : ""
            }" data-index="${i}" data-type="new_song" data-id="${
          newSongLan[i].type
        }">${newSongLan[i].lan}</a>
          </li>`;
      });

      // <ul class="slide-list songlist-list">下的组件

      songListItem = createHTML(Math.ceil(newSongList.length / 9), i => {
        i == Math.ceil(newSongList.length / 9) - 1 ? (i = 0) : (i *= 9);
        let songlistItemListItem = createHTML(9, j => {
          let songTime =
            parseInt(newSongList[i + j].interval / 60) +
            ":" +
            (Array(2).join(0) + (newSongList[i + j].interval % 60)).slice(-2);
          return `
            <li>
            <div class="songlist-item-box">
                              
              <a href="javascript:;" class="mod-cover-link">
                <img
                  src="https://y.gtimg.cn/music/photo_new/T002R90x90M000${
                    newSongList[i + j].album.pmid
                  }.jpg?max_age=2592000"
                  alt="${newSongList[i + j].name}"
                />
                <i class="mod-cover-mask"></i>
                <i class="mod-cover-icon-play"></i>
              </a>
              <div class="songlist-cont">
                <h3 class="songlist-song">
                  <a
                    href="javascript:;"
                    class="js-song"
                    data-stat="y_new.index.new_song.songname"
                    title="${newSongList[i + j].name}"
                    >${newSongList[i + j].name}</a
                  >
                </h3>
                <p class="songlist-author">
                  ${createHTML(newSongList[i + j].singer.length, k => {
                    return `${k > 0 ? " / " : ""}<a
                      href="javascript:;"
                      class="c-tx-thin singer-name"
                      title="${newSongList[i + j].singer[k].title}"
                      >${newSongList[i + j].singer[k].title}</a
                    >`;
                  })}
                </p>
              </div>
              <div class="songlist-time c-tx-thin">${songTime}</div>
            </div>
          </li>`;
        });

        return `<li class="songlist-item slide-item">
          <ul class="songlist-item-list">
            ${songlistItemListItem}
          </ul>
        </li>`;
      });

      // newsong下的轮播标记
      let newSongSlideSwitchItem = createModSlideSwitch(
        Math.floor(newSongList.length / 9),
        "songlist"
      );

      newSongTemp = `<div class="section-inner">
        <!-- 标题 -->
        <div class="mod-index-hd mod-songlist-hd">
          <h2 class="mod-index-tit"></h2>
        </div>
        <!-- 播放全部 -->
        <a href="javascript:;" class="mod-btn js-all-play">
          <i class="mod-btn-icon-play js-all-play"></i>
          播放全部
        </a>
        <!-- 切换 -->
        <!-- 类别切换 -->
        <ul class="mod-index-tab">
          ${modIndexTabItem}
        </ul>
        <!-- 内容展示 -->
        <div class="mod-songlist mod-slide">
          <ul class="slide-list songlist-list">

            ${songListItem}

          </ul>
        </div>
        <!-- 轮播标记 -->
        <div class="mod-slide-switch">

          ${newSongSlideSwitchItem}

        </div>
      </div>
      <div class="mod-slide-action">
        <div class="slide-action mod-slide-action-left">
          <a
            href="javascript:;"
            class="slide-action-btn slide-action-btn-left js-jump"
            data-p="prev"
            tabindex="-1"
            data-stat="y_new.index.songlist.pager"
          >
            <i class="icon-text">上一页</i>
            <i class="slide-action-arrow slide-action-arrow-left sprite"></i>
          </a>
        </div>
        <div class="slide-action mod-slide-action-right">
          <a
            href="javascript:;"
            class="slide-action-btn slide-action-btn-right js-jump"
            data-p="next"
            tabindex="-1"
            data-stat="y_new.index.songlist.pager"
          >
            <i class="icon-text">下一页</i>
            <i class="slide-action-arrow slide-action-arrow-right sprite"></i>
          </a>
        </div>
      </div>`;

      // 将生成的结构加入页面中
      jsIndexContentBoxEle.querySelector(
        "#new_song_box"
      ).innerHTML = newSongTemp;
    })(res);

    // ===精彩推荐===
    (function(res) {
      let dataArr = res.focus.data.content;
      // 生成<ul class="slide-list event-list js-list">下html结构
      let eventListItem = createHTML(dataArr.length + 2, i => {
        i = i >= dataArr.length ? i - dataArr.length : i;
        return `
          <li class="event-list-item slide-item">
            <a
              href="javascript:;"
              class="event-list-link js-focus-jump"
              data-type="${dataArr[i].type}" 
              data-id="${dataArr[i].jump_info.url}"
              data-focusid="${dataArr[i].id}"
              data-stat="y_new.index.focus.click"
            >
              <img
                src="${dataArr[i].pic_info.url}"
                alt=""
                class="event-list-pic"
              />
            </a>
          </li>`;
      });

      // 生成轮播标记
      let slideSwitchItem = createModSlideSwitch(
        Math.floor(dataArr.length / 2),
        "event"
      );

      let focusBoxTem = `<div class="section-inner">
        <!-- 标题 -->
        <div class="mod-index-hd">
          <h2 class="mod-index-tit"></h2>
        </div>
        <!-- 内容展示 -->
        <div class="mod-songlist mod-slide">
          <ul class="slide-list event-list js-list">
            ${eventListItem}
          </ul>
        </div>
        <!-- 轮播标记 -->
        <div class="mod-slide-switch">
          ${slideSwitchItem}
        </div>
      </div>
      <div class="mod-slide-action">
        <div class="slide-action mod-slide-action-left">
          <a
            href="javascript:;"
            class="slide-action-btn slide-action-btn-left js-jump"
            data-p="prev"
            tabindex="-1"
            data-stat="y_new.index.event.pager"
          >
            <i class="icon-text">上一页</i>
            <i class="slide-action-arrow slide-action-arrow-left sprite"></i>
          </a>
        </div>
        <div class="slide-action mod-slide-action-right">
          <a
            href="javascript:;"
            class="slide-action-btn slide-action-btn-right js-jump"
            data-p="next"
            tabindex="-1"
            data-stat="y_new.index.event.pager"
          >
            <i class="icon-text">下一页</i>
            <i class="slide-action-arrow slide-action-arrow-right sprite"></i>
          </a>
        </div>
      </div>
      `;

      jsIndexContentBoxEle.querySelector("#focus_box").innerHTML = focusBoxTem;
    })(res);

    // ===新碟首发===
    (function(res) {
      let newAlbumTag = res.new_album_tag.data.area,
        newAlbumData = res.new_album.data.albums;

      // 生成<ul class="mod-index-tab">下的类别标签
      let modIndexTabItem = createHTML(newAlbumTag.length, i => {
        return `
          <li>
            <a href="javascript:;" class="mod-index-tab-link ${
              i == 0 ? "current" : ""
            }">${newAlbumTag[i].name}</a>
          </li>`;
      });

      // 生成album-list下的结构
      let albumListItem = createHTML(newAlbumData.length, i => {
        let singerName = "",
          singerLinkHtml = "";

        // 生成歌手相关html
        for (let j in newAlbumData[i].singers) {
          let ele = newAlbumData[i].singers[j];

          singerName += j == 0 ? ele.name : " / " + ele.name;
          singerLinkHtml +=
            j == 0
              ? `<a
            href="javascript:;"
            class="js-singer"
            data-stat="y_new.index.album.singername"
            >${ele.name}</a
          >`
              : `
          /
          <a
          href="javascript:;"
          class="js-singer"
          data-stat="y_new.index.album.singername"
          >${ele.name}</a
        >`;
        }

        return `
          <li class="album-list-item slide-item">
            <div class="album-list-cover">
              <a href="javascript:;" class="mod-cover-link">
                <img
                  src="https://y.gtimg.cn/music/photo_new/T002R300x300M000${newAlbumData[i].photo.pic_mid}.jpg?max_age=2592000"
                  alt="${newAlbumData[i].name}"
                />
                <i class="mod-cover-mask"></i>
                <i class="mod-cover-icon-play"></i>
              </a>
            </div>
            <h4 class="album-list-title">
              <a href="#">${newAlbumData[i].name}</a>
            </h4>
            <div class="playlist-author" title="${singerName}">
              ${singerLinkHtml}
            </div>
          </li>`;
      });

      let newAlbumTemp = `<div class="section-inner">
        <!-- 标题 -->
        <div class="mod-index-hd">
          <h2 class="mod-index-tit"></h2>
        </div>
        <!-- 更多 -->
        <a href="javascript:;" class="index-more js-more">
          更多
          <i class="icon-index-arrow sprite"></i>
        </a>
        <!-- 切换 -->
        <!-- 类别切换 -->
        <ul class="mod-index-tab">

          ${modIndexTabItem}

        </ul>
        <!-- 内容展示 -->
        <div class="mod-songlist mod-slide">
          <ul class="slide-list album-list js-list">

            ${albumListItem}

          </ul>
        </div>
      </div>`;

      jsIndexContentBoxEle.querySelector(
        "#new_album_box"
      ).innerHTML = newAlbumTemp;
    })(res);

    // ===排行榜===
    (function(res) {
      let topListDataArr = res.toplist.data.group[0].toplist;

      // 生成toplist-list-item结构
      let toplistListItem = createHTML(topListDataArr.length - 1, i => {
        i++;
        return `
          <li class="toplist-list-item slide-item">
            <div class="toplist-box">
              <div class="toplist-bg"></div>
              <i class="mod-cover-icon-play js-play-toplist"></i>
              <i class="toplist-line"></i>
              <h3 class="toplist-hd">
                <a href="javascript:;" class="toplist-tit">${topListDataArr[
                  i
                ].title.substring(0, topListDataArr[i].title.length - 1)}</a>
              </h3>
              <ul class="toplist-songlist">

                ${createHTML(3, j => {
                  return `
                  <li class="toplist-song">
                    <div class="toplist-song-number">${j + 1}</div>
                    <div class="toplist-songname">
                      <a href="javascript:;" class="js-song">${
                        topListDataArr[i].song[j].title
                      }</a>
                    </div>
                    <div class="toplist-artist">
                      <a href="javascript:;">${
                        topListDataArr[i].song[j].singerName
                      }</a>
                    </div>
                  </li>`;
                })}

              </ul>
            </div>
          </li>`;
      });

      jsIndexContentBoxEle.querySelector(
        "#toplist_box"
      ).innerHTML = `<div class="section-inner">
        <!-- 标题 -->
        <div class="mod-index-hd">
          <h2 class="mod-index-tit"></h2>
        </div>
        <!-- 更多 -->
        <a href="javascript:;" class="index-more js-more">
          更多
          <i class="icon-index-arrow sprite"></i>
        </a>
        <!-- 切换 -->
        <!-- 内容展示 -->
        <div class="mod-songlist mod-slide">
          <ul class="slide-list toplist-list js-list">

            ${toplistListItem}

          </ul>
        </div>
      </div>`;
    })(res);

    // 获取主页mv数据
    ajax("get", API.mv.url, API.mv.params, res => {
      // ===mv===
      (function(res) {
        let mvlist = res.data.mvlist,
          mvListItem = createHTML(Math.ceil(mvlist.length / 10), i => {
            i = i == Math.ceil(mvlist.length / 10) - 1 ? 0 : i;
            return `<li class="mv-list-item">
          <ul class="playlist-list slide-list">

            ${createHTML(10, j => {
              let listennum =
                mvlist[j].listennum > 10000
                  ? (mvlist[j].listennum / 1000).toFixed(1) + "万"
                  : mvlist[j].listennum;

              j = i * 10 + j;
              return `<li class="playlist-item slide-item">
              <div class="playlist-item-box">
                <div class="playlist-cover">
                  <a href="javascript:;" class="mod-cover-link">
                    <img
                      src="${mvlist[j].picurl}"
                      alt="${mvlist[j].mvtitle}"
                    />
                    <i class="mod-cover-mask"></i>
                    <i class="mod-cover-icon-play"></i>
                  </a>
                </div>
                <h4 class="mv-list-item-title">
                  <a href="#">${mvlist[j].mvtitle}</a>
                </h4>
                <div class="mv-list-singer">
                  <a href="javascript:;" class="js-singer">${mvlist[j].singername}</a>
                </div>
                <div class="mv-list-listen">
                  <i class="mv-list-listen-icon sprite"></i>${listennum}
                </div>
              </div>
            </li>`;
            })}

          </ul>
        </li>`;
          });

        jsIndexContentBoxEle.querySelector(
          "#mv_box"
        ).innerHTML = `<div class="section-inner">
        <!-- 标题 -->
        <div class="mod-index-hd">
          <h2 class="mod-index-tit"></h2>
        </div>
        <!-- 切换 -->
        <!-- 类别切换 -->
        <ul class="mod-index-tab">
          <li>
            <a href="javascript:;" class="mod-index-tab-link current">精选</a>
            <a href="javascript:;" class="mod-index-tab-link">内地</a>
          </li>
          <li><a href="javascript:;" class="mod-index-tab-link">港台</a></li>
          <li><a href="javascript:;" class="mod-index-tab-link">欧美</a></li>
          <li><a href="javascript:;" class="mod-index-tab-link">韩国</a></li>
          <li><a href="javascript:;" class="mod-index-tab-link">日本</a></li>
        </ul>
        <!-- 内容展示 -->
        <div class="mod-playlist mod-slide">
          <ul class="mv-list slide-list">

            ${mvListItem}
            
          </ul>
        </div>
        <!-- 轮播标记 -->
        <div class="mod-slide-switch">

          ${createModSlideSwitch(Math.ceil(mvlist.length / 10) - 1, "mv")};
          

        </div>
      </div>
      <div class="mod-slide-action">
        <div class="slide-action mod-slide-action-left">
          <a
            href="javascript:;"
            class="slide-action-btn slide-action-btn-left js-jump"
            data-p="prev"
            tabindex="-1"
            data-stat="y_new.index.mv.pager"
          >
            <i class="icon-text">上一页</i>
            <i class="slide-action-arrow slide-action-arrow-left sprite"></i>
          </a>
        </div>
        <div class="slide-action mod-slide-action-right">
          <a
            href="javascript:;"
            class="slide-action-btn slide-action-btn-right js-jump"
            data-p="next"
            tabindex="-1"
            data-stat="y_new.index.mv.pager"
          >
            <i class="icon-text">下一页</i>
            <i class="slide-action-arrow slide-action-arrow-right sprite"></i>
          </a>
        </div>
      </div>
      `;
      })(res);
    });
  });

  // 根据location变化发起对应的ajax请求
})();
