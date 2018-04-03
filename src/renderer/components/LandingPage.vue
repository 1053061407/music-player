<template>
  <div id="root">
    <div class="menu">
      <el-tabs  value='search' @tab-click="handleClick">
        <el-tab-pane label="快速搜索" name="search"></el-tab-pane>
        <el-tab-pane label="我的歌单" name="mySongList"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view v-model="obj" style="height: 80%;"></router-view>
    <controlBtn :musicUrl='obj.musicUrl' :singer='obj.singer' :songName="obj.songName" :status="obj.status"></controlBtn>
  </div>
</template>

<script>
  import { fetchMusicList, fetchMusicUrl } from '../api/fetchMusic'
  import controlBtn from './controlBtn.vue'
  export default {
    components: { controlBtn },
    data () {
      return {
        // obj用来存储从musicList传来的值，然后通过父组件来传递给兄弟组件，也就是controlBtn组件
        obj: {
          musicUrl: '',
          singer: '',
          songName: '',
          status: 'pause',
          activeName: 'search'
        }
      }
    },
    watch: {
      obj(val) {
        console.log(this.obj)
      }
    },
    methods: {
      handleClick(tab, event) {
        var index = tab.index;
        if(index == 0) {
          console.log('haha')
          this.$router.push('/');
        }
        else if(index == 1) {
          this.$router.push('/mySongList');
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: #2c2c2c ;
  }
  .el-message {
    background-color: initial;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #root {
    height: 100vh;
    padding: 30px 80px;
    width: 100vw;
  }
  .el-button {
    color: #fff;
  }
  .button {
    width: 5rem;
  }
  .el-table tr {
    background-color: #2c2c2c;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #2c2c2c;
  }
  .el-tabs__item { 
    color: #fff;
  }
  .el-tabs__nav-wrap::after {
    background-color: #2c2c2c;
  }
  .controlBtn-root {
    margin-top: 30px;
  }
  
</style>
