<template>
  <div id="root">
    <div>
      <el-button  class='button' type="text" size="medium">快速搜索</el-button>
      <el-button  class='button' type="text" size="medium" >我的歌单</el-button>
    </div>
    <router-view v-model="obj"></router-view>
    <controlBtn v-bind="obj"></controlBtn>
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
          status: 'pause',
          songName: '',
          singer: ''
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
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #root {
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #wrapper {
    height: 90%;
    overflow-y: scroll;
    clear: both;
    padding-right: 50px;
  }

  input {
    width:100%;
    height: 40px;
    padding: 0 15px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: inherit;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    /*border: 1px solid #4fc08d;*/
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
    margin: 0;
  }
  .button {
    color: #42b983;
  }
</style>
