<template>
  <div id="wrapper">
    <el-input placeholder="请输入歌曲名称" v-model="song" @keyup.enter.native="search"></el-input>
    <div class="doc">
      <el-button class="alt" @click="search" type="text">网易</el-button>
      <el-button class="alt" @click="search" type="text">虾米</el-button>
      <el-button class="alt" @click="search" type="text">QQ音乐</el-button>
    </div>
    <el-table
      :data="musicList"
      highlight-current-row: false
      style="width: 100%;background: #2c2c2c" v-show="musicList.length!==0" >
      <el-table-column
        label="歌曲名"
        width="180">
        <template slot-scope="scope">
          <el-button  size="small" type="text"  @click="playMusic(scope.row.id,scope.row.name,scope.row.artists[0].name)">{{scope.row.name}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="歌手"
        width="180">
        <template slot-scope="scope">
          <el-button  size="small" type="text"  @click="handleCancelTop(scope.row.id,scope.row)">{{scope.row.artists[0].name}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="专辑">
        <template slot-scope="scope">
          <el-button  size="small" type="text"  @click="handleCancelTop(scope.row.id,scope.row)">{{scope.row.album.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { fetchMusicList, fetchMusicUrl } from '../../api/fetchMusic'
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
    methods: {
      setBgc() {
        var cssText = 'border: 1px solid #fff;'
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
            this.musicList = response.data.songList;
          })
        }
      },
      playMusic(id,songName,singer) {
        fetchMusicUrl(id, this.alias).then(response => {
          if(this.menu == '网易') {
            this.musicUrl = response.data.url;
          }
          else if(this.menu == '虾米') {
            var song
            for(song of this.musicList) {
              if(song.id == id) {
                this.musicUrl = song.file
              }
            }
          }
          obj.musicUrl = this.musicUrl
          this.$emit('input', obj)
          console.log(obj)
        })
        this.status = 'play';
        this.songName = songName;
        this.singer = singer;
        var obj = {
          status: this.status,
          songName: this.songName,
          singer: this.singer
        }
      }
    }
  }
</script>
<style>
  #wrapper {
    height: 80%;
    overflow-y: scroll;
    clear: both;
    padding-right: 50px;
  }
  #wrapper::-webkit-scrollbar {
    background: transparent;
    width: 0.4rem;
  }
  #wrapper:hover::-webkit-scrollbar-track {
     -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
   }

  #wrapper:hover::-webkit-scrollbar-thumb {
     -webkit-box-shadow: inset 0 0 6px #6f7180;
     border-radius: 0.2rem;
   }
  .el-table th, .el-table tr{
    background-color: #2c2c2c;
  }
  .doc {
    margin-top: 10px;
  }
  .alt {
    width: 80px;
  }
</style>