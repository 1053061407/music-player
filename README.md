# music-player

> A music-player build with electron-vue

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```
#### 项目介绍
这个项目是我独自开发的一款音乐桌面端软件，主要拿一些现在已有的音乐软件练手。由于一些音乐软件的版权问题，导致平时听歌得切换不同的音乐软件。后来在接触了Listen1这款软件，它的集网易云，虾米，qq音乐三大平台歌曲的特点让我可以在一个软件上可以听到任意的歌曲，不用再切换软件。出于个人兴趣，于是也想做一款这样的软件做练手项目。

#### 歌曲搜索页面
![](http://upload-images.jianshu.io/upload_images/3185709-8028c44ac5f06462.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 收藏歌单页面
![](https://upload-images.jianshu.io/upload_images/3185709-2cdda68040d2057c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为这个项目没有做登录，所以我实现添加歌单的功能是利用localStorage，保存的是歌曲的id，歌曲名，歌手名。当点击歌单的时候，还是利用API将歌曲id发送给后台，从而获得歌曲的播放链接。
#### 目前已实现的功能
1. 搜索音乐

2. 播放，暂停

3. 显示歌曲播放进度，并可以点击进度条改变歌曲的播放进度

4. 添加音乐到我的歌单

