<template>
  <div id="root">
    <div id="wrapper">
      <el-input placeholder="请输入内容" v-model="song" @keyup.enter.native="search"></el-input>
      <div class="doc">
        <button class="alt" @click="search">网易</button>
        <button class="alt" @click="search">虾米</button>
        <button class="alt" @click="search">QQ音乐</button>
      </div>
      <el-table
        :data="musicList"
        stripe
        style="width: 100%">
        <el-table-column
          label="歌曲名"
          width="180">
          <template slot-scope="scope">
            <el-button  size="small" type="text" style='color: #42b983' @click="playMusic(scope.row.id)">{{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="歌手"
          width="180">
          <template slot-scope="scope">
            <el-button  size="small" type="text" style='color: #42b983' @click="handleCancelTop(scope.row.id,scope.row)">{{scope.row.artists[0].name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="专辑">
          <template slot-scope="scope">
            <el-button  size="small" type="text" style='color: #42b983' @click="handleCancelTop(scope.row.id,scope.row)">{{scope.row.album.name}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <audio :src="musicUrl" autoplay></audio>
    </div>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import { fetchMusicList, fetchMusicUrl } from '../api/fetchMusic'
  export default {
    name: 'landing-page',
    data () {
      return {
        song: '',
        menu: '163',
        musicList: [],
        musicId: '',
        musicUrl: ''
      }
    },
    mounted() {
    },
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      search(e) {
        if(e.target.innerHTML) {
          this.menu = e.target.innerHTML
          console.log(this.menu)
        }
        if(this.menu === '163') {
          fetchMusicList(this.song).then(response => {
            console.log(response.data.result.songs)
            this.musicList = response.data.result.songs
          })
        }
        else if (this.menu === '虾米') {

        }
        else {

        }
      },
      playMusic(id) {
        fetchMusicUrl(id).then(response => {
          console.log(response.data.data[0].url)
          this.musicUrl = response.data.data[0].url
        })
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
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
