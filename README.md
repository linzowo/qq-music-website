# qq音乐仿站及相关API



##  说明：

本项目已由静态页面转为js渲染。

数据源为官方的API。

文件中已包含搭建nginx反向代理服务器所需的配置文件及相关配置，如需全部拷贝运行请自行下载nginx安装，并将本文件中的nginx/nginx.conf文件内容拷贝至你的配置文件中（或直接替换）。



## 相关API地址

| API描述                             | 地址                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| 主页-模块数据（除mv和顶部导航栏外） | [详见仓库文件](https://github.com/linzowo/qq-music-website/blob/master/src/js/config.js) |
| 主页-mv模块数据                     | [详见仓库文件](https://github.com/linzowo/qq-music-website/blob/master/src/js/config.js) |
| 主页-顶部搜索栏下拉菜单             | https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=7437998&loginUin=1045049511&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0 |
| 其他API                             | https://blog.csdn.net/qq_41979349/article/details/102458551  |



## 项目结构

```
.
|-- README.md
|-- babel.config.json
|-- dist
|-- nginx									===>反向代理配置文件
|   `-- nginx.conf
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- src
|   |-- common								===>一些公共组件
|   |   |-- footer							===>主页底部
|   |   `-- header							===>主页顶部
|   |-- css									===>项目大部分css文件
|   |   |-- common.scss
|   |   |-- fixed-flag.css
|   |   |-- gotop.css
|   |   |-- index-singer-box.scss
|   |   |-- index.css
|   |   |-- index.scss
|   |   |-- mod-index-common.scss
|   |   `-- page.scss
|   |-- html								===>项目大部分html文件
|   |   |-- index
|   |   |-- index-singer
|   |   |-- page.html
|   |   `-- test.html
|   |-- images								===>项目图片
|   |   |-- icon_sprite.png
|   |   `-- icon_sprite@2x.png
|   |-- index.html							===>主页html
|   |-- index.js							===>入口文件
|   |-- js									===>项目大部分js文件
|   |   |-- common.js						===>公共方法
|   |   |-- config.js						===>项目相关配置
|   |   |-- page.js							===>分页组件js
|   |   `-- util							===>工具
|   |-- library								===>自己封装的组件和模块
|   |   |-- ajax
|   |   |-- fixed-flag
|   |   `-- gotop
|   `-- pages								===>项目页面结构
|       |-- artists
|       |-- download
|       |-- portal
|       `-- vip
`-- webpack.config.js
            

```



