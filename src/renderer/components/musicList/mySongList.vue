<template>
  <div id="mySongList-root">
    <el-table
      :data="musicList"
      highlight-current-row: false
      style="width: 100%;background: #2c2c2c" v-show="musicList.length!==0" >
      <el-table-column
        label="歌曲名"
        width="180">
        <template slot-scope="scope">
          <el-button  size="small" type="text"  @click="playMusic(scope.row.id,scope.row.name,scope.row.singer,scope.row.url,scope.row.alias)">{{scope.row.name}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="歌手"
        width="180">
        <template slot-scope="scope">
          <el-button  size="small" type="text">{{scope.row.singer}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="移除" placement="bottom">
            <el-button  size="small" type="text"  @click="delFromMyMusicList(scope.$index)"><i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
  import { fetchMusicUrl } from '../../api/fetchMusic'
  export default {
    name: 'controlBtn',
    data() {
      return {
        musicList: [],
        status: '',
        songName: '',
        singer: ''
      }
    },
    mounted() {
      this.getMusicList()
    },
    methods: {
      getMusicList() {
//        for(var i=localStorage.length - 1 ; i >=0; i--){
//          localStorage.removeItem(localStorage.key(i));
//        }
        // for(var i=localStorage.length - 1 ; i >=0; i--) {
        //   console.log('第'+ (i+1) +'条数据的键值为：' + localStorage.key(i) +'，数据为：' + localStorage.getItem(localStorage.key(i)));
        // }


        for(var i=0 ; i <=localStorage.length - 1; i++) {
          var song = JSON.parse(localStorage.getItem(localStorage.key(i)))
          this.musicList.push(song)
        }
        console.log(this.musicList)
      },
      playMusic(id,songName,singer,url,alias) {
        this.status = 'play';
        this.songName = songName;
        this.singer = singer;
        var obj = {
          status: this.status,
          songName: this.songName,
          singer: this.singer
        }
        if(url) {  //  如果歌曲来自于虾米音乐
          this.musicUrl = url;
          obj.musicUrl = this.musicUrl
          this.$emit('input', obj)
        }
        else {  // 如果歌曲来自于网易云音乐或者QQ音乐
          fetchMusicUrl(id, alias).then(response => {
            this.musicUrl = response.data.url;
            obj.musicUrl = this.musicUrl
            if(!response.data.url) {
              this.$message({
                showClose: true,
                message: '版权原因暂时无法播放，请搜索其他平台',
              });
            }
            else {
              this.$emit('input', obj);
            }
          })
        }
      },
      delFromMyMusicList(index) {
        console.log(index)
        this.musicList.splice(index,1)
        localStorage.removeItem(localStorage.key(index))
        console.log(localStorage.getItem(localStorage.key(index)))
        for(var i=localStorage.length - 1 ; i >=0; i--) {
          console.log('第'+ (i+1) +'条数据的键值为：' + localStorage.key(i) +'，数据为：' + localStorage.getItem(localStorage.key(i)));
        }

      }
    }
  }
</script>
<style lang="scss">
  .el-table th, .el-table tr {
    background-color: #2c2c2c;
  }
  #mySongList-root {
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
</style>