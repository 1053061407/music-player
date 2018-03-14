<template>
  <div id="root">
    <div id="wrapper">
      <el-input placeholder="请输入歌曲名称" v-model="song" @keyup.enter.native="search"></el-input>
      <div class="doc">
        <el-button class="alt" @click="search" type="text">网易</el-button>
        <el-button class="alt" @click="search" type="text">虾米</el-button>
        <el-button class="alt" @click="search" type="text">QQ音乐</el-button>
      </div>
      <el-table
        :data="musicList"
        stripe
        style="width: 100%">
        <el-table-column
          label="歌曲名"
          width="180">
          <template slot-scope="scope">
            <el-button  size="small" type="text" style='color: #42b983' @click="playMusic(scope.row.id,scope.row.name,scope.row.artists[0].name)">{{scope.row.name}}
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
    <controlBtn :musicUrl="musicUrl" :status="status" :songName="songName" :singer="singer"></controlBtn>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import { fetchMusicList, fetchMusicUrl } from '../api/fetchMusic'
  import controlBtn from './controlBtn.vue'
  export default {
    name: 'landing-page',
    data () {
      return {
        song: '',
        menu: '网易',
        alias: 'netease',  //与网易，虾米，qq音乐进行中英文映射
        musicList: [],
        musicId: '',
        musicUrl: '',
        status: 'pause',
        songName: '',
        singer: ''
      }
    },
    watch: {
      menu(val) {
        var button = document.getElementsByClassName('alt')
        switch (val) {
          case '网易': {button[1].style.cssText='';button[2].style.cssText='';break}
          case '虾米': {button[0].style.cssText='';button[2].style.cssText='';break}
          case 'QQ音乐': {button[0].style.cssText='';button[1].style.cssText='';break}
        }
        this.setBgc()
      }
    },
    mounted() {
      this.setBgc()
    },
    components: { SystemInformation,controlBtn },
    methods: {
      setBgc() {
        var cssText = 'background:#000;border: 1px solid #4fc08d;'
        var button = document.getElementsByClassName('alt')
        if(this.menu == '网易') {
          var button = button[0];
          button.style.cssText = cssText;
        }
        else if (this.menu == '虾米') {
          var button = button[1]
          button.style.cssText = cssText;
        }
        else {
          var button = button[2]
          button.style.cssText = cssText;
        }
      },
      open (link) {
        this.$electron.shell.openExternal(link);
      },
      search(e) {
        if(e.target.innerHTML) {
          this.menu = e.target.innerHTML;
        }
        if(this.song !== '') {
          if(this.menu == '网易') {
            this.alias = 'netease';
          }
          else if(this.menu == '虾米') {
            this.alias = 'xiami';
          }
          else {
            this.alias = 'qq';
          }
          fetchMusicList(this.song,this.alias).then(response => {
            console.log(response)
            this.musicList = response.data.songList;
          })
        }
      },
      playMusic(id,songName,singer) {
        fetchMusicUrl(id, this.alias).then(response => {
          console.log(response.data);
          if(this.menu == '网易') {
            this.musicUrl = response.data.url;
          }
          else if(this.menu == '虾米') {
            var song
            for(song of this.musicList) {
              console.log(song)
              if(song.id == id) {
                this.musicUrl = song.file
              }
            }
          }
        })
        this.status = 'play';
        this.songName = songName;
        this.singer = singer;
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
    /*border: 1px solid #4fc08d;*/
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
    margin: 0;
  }
</style>
