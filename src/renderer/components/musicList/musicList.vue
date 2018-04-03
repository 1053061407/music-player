<template>
  <div id="wrapper">
    <el-input placeholder="请输入歌曲名或歌手名" v-model="song" @keyup.enter.native="search"></el-input>
    <div class="doc">
      <el-button class="alt" @click="search" type="text">网易</el-button>
      <el-button class="alt" @click="search" type="text">虾米</el-button>
      <el-button class="alt" @click="search" type="text">QQ音乐</el-button>
    </div>
    <el-table
      :data="musicList"
      highlight-current-row: false
      style="width: 100%;background: #2c2c2c" v-show="musicList.length!==0">
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
        width="120">
        <template slot-scope="scope">
          <el-button  size="small" type="text">{{scope.row.artists[0].name}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="专辑"
        width="130">
        <template slot-scope="scope">
          <el-button  size="small" type="text" >{{scope.row.album.name}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="">
        <template slot-scope="scope">
          <a href=# title="添加到歌单">
            <el-button  size="small" type="text" id="add-button" @click="addToMyMusicList(scope.row.id,scope.row.name,scope.row.artists[0].name,scope.row.file)"> +
            </el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { fetchMusicList, fetchMusicUrl } from '../../api/fetchMusic'
  import { mapGetters } from 'vuex'
  export default {
    name: 'landing-page',
    props: {

    },
    data () {
      return {
        song: '',
        menu: '网易',
        alias: 'netease',  //与网易，虾米，qq音乐进行中英文映射
        musicId: '',
        musicUrl: '',
        status: 'pause',
        songName: '',
        singer: ''
      }
    },
    computed: {
      ...mapGetters([
        'musicList',
      ]),
      // song: {
      // // getter
      //   get: function () {
      //     return this.$store.state.song
      //   },
      // // setter
      //   set: function (newValue) {
      //    this.$store.commit('setSong', this.song)
      //   }
      // }
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
      search(e) {
        var menu ;
        if(e.target.tagName!=='INPUT') {
          menu = e.target.innerHTML;
          if(menu=='网易' || menu=='虾米' || menu=='QQ音乐') {
          console.log('haha')
          this.menu = e.target.innerHTML;
          }
          else {
            console.log('xixi')
            this.menu = e.target.children[0].innerHTML;
          }
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
            // this.musicList = response.data.songList;
            this.$store.commit('setMusicList', response.data.songList)
            console.log(this.musicList)
          })
        }
      },
      playMusic(id,songName,singer) {
        fetchMusicUrl(id, this.alias).then(response => {
          if(this.menu == '网易') {
            this.musicUrl = response.data.url;
          }
          else if(this.menu == '虾米') {
            var song;
            for(song of this.musicList) {
              if(song.id == id) {
                this.musicUrl = song.file;
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
      },
      addToMyMusicList(id,name,singer,url) {
        var i= localStorage.length;
        var obj = {
          id: id,
          name: name,
          singer: singer
        }
        if(this.menu == '虾米') { // 如果是虾米的歌曲
          obj.url = url
        }
        console.log(localStorage.length)
        obj = JSON.stringify(obj)
        localStorage.setItem(id, obj);
        this.$message({
          showClose: true,
          message: '添加歌单成功',
          type: 'success'
        });

      }
    }
  }
</script>
<style lang="scss">
  #wrapper {
    height: 80%;
    overflow-y: scroll;
    clear: both;
    padding-right: 50px;
    &::-webkit-scrollbar {
      background: transparent;
      width: 0.4rem;
    }
    &:hover::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }

    &:hover::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px #6f7180;
      border-radius: 0.2rem;
    }
  }

  .el-table th, .el-table tr {
    background-color: #2c2c2c;
  }

  .doc {
    margin-top: 10px;
  }
  .alt {
    width: 80px;
  }
  #add-button {
    display: none;
    font-size: 20px;
    padding: 0;
  }
  .el-table__row:hover #add-button {
    display: inline-block;
  }
</style>