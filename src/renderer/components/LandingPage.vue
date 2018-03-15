<template>
  <div id="root">
    <div class="menu">
      <router-link to="/">
        <el-button  class='button' type="text" size="medium">快速搜索</el-button>
      </router-link>
      <router-link to="/mySongList">
        <el-button  class='button' type="text" size="medium" >我的歌单</el-button>
      </router-link>
    </div>
    <router-view v-model="obj"></router-view>
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
          status: 'pause'
        }
      }
    },
    watch: {
      obj(val) {
        console.log(this.obj)
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

  body { font-family: 'Source Sans Pro', sans-serif; }

  #root {
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
  .menu {
    margin-bottom: 1rem;
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
</style>
