# music-player

> A music-player build with electron-vue

### 技术栈
**electron-vue + vue-router + vuex + axios + element-ui + lowdb**

### 下载
* [macOS下载](https://download-1256401492.cos.ap-beijing.myqcloud.com/ListenU1.0.dmg)
* [Windows下载]()

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```
### 项目介绍
这个项目是我独自开发的一款音乐桌面端软件，主要拿一些现在已有的音乐软件练手。由于一些音乐软件的版权问题，导致平时听歌得切换不同的音乐软件。后来在接触了Listen1这款软件，它的集网易云，虾米，qq音乐三大平台歌曲的特点让我可以在一个软件上可以听到任意的歌曲，不用再切换软件。出于个人兴趣，于是也想做一款这样的软件做练手项目。

#### 1. 歌曲搜索页面
![](https://upload-images.jianshu.io/upload_images/3185709-b17a08edc39f48ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
歌曲搜索目前已经支持三大平台，当输入要搜索的歌曲或歌手名之后，默认显示的是网易云的结果。用户可以点击不同的平台获取不同的数据。
#### 2. 收藏歌单页面
![](https://upload-images.jianshu.io/upload_images/3185709-25c119e8d3dbfbca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为这个项目没有做登录，所以我实现添加歌单的功能是利用localStorage，保存的是歌曲的id，歌曲名，歌手名，以及添加的歌曲来自于那个平台，歌曲的url(如果有的话)。
#### 3. 播放记录页面
![image.png](https://upload-images.jianshu.io/upload_images/3185709-109abdad1b91f502.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为考虑到localStorage保存的数据有限，只有几M。另外把播放列表和我的歌单都放到localStorage里面难以区分，所以想到了用前端的本地数据库lowdb。lowdb的方法也比较简单，容易上手，只不过使用之前得配置一下。
首先先安装lowdb
```
npm install lowdb
```
然后配置和使用我是参考掘金上的[这篇文章](https://juejin.im/post/5a81912d51882507414abcfc)。
之后播放记录的读写就基于lowdb就可以了。



### 目前已实现的功能
*  搜索音乐

* 播放，暂停

*  显示歌曲播放进度，并可以点击进度条改变歌曲的播放进度

*  添加音乐到我的歌单

*  切换上一首，下一首。

* 循环播放，单曲播放

*  记录用户的播放记录