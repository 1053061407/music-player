<template>
  <div id="controlBtn-root">
    <div id='playbutton'>
      <svg class="icon" aria-hidden="true" @click='playbefore'>
        <use xlink:href="#icon-yduishangyiqu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-if="this.musicStatus=='pause'" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true"  v-else @click="pause">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click='playafter'>
        <use xlink:href="#icon-yduixiayiqu"></use>
      </svg>
    </div>
    <div id='song'>
      <div style="padding-left: 100px">
        <span>{{songName1}}</span>&nbsp;&nbsp;<span>{{singer1}}</span>
      </div>
      <el-slider v-model="currentTime1" v-bind:max="duration1" @change="replay"></el-slider>
      <!--<canvas id="mycanvas" width="450" height="50">-->
      <!--</canvas>-->
    </div>
    <div id='time'>
      <div>
        <el-popover
        ref="popover4"
        placement="top-start"
        width="600"
        trigger="click"
        >
        <el-table
      :data="playList"
      highlight-current-row: false
      style="width: 100%;background: #2c2c2c" v-show="playList.length!==0" >
      <el-table-column
        label="歌曲名"
        width="180">
        <template slot-scope="scope">
          <el-button  size="small" type="text"  @click="playMusic(scope.row.url,scope.row.songName,scope.row.singer)">{{scope.row.songName}}
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
            <el-button  size="small" type="text"  @click="delFromPlayList(scope.$index,scope.row.songName,scope.row.singer)"><i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
        </el-popover>
        <svg class="icon" aria-hidden="true" v-popover:popover4 >
          <use xlink:href="#icon-liebiao" style="font-color:#cdcdcd"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="circulation" @click='singlePlay'>
          <use xlink:href="#icon-xunhuan" style="font-color:#cdcdcd"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else @click='circlePlay'>
          <use xlink:href="#icon-danquxunhuan1" style="font-color:#cdcdcd"></use>
        </svg>
      </div>
      <span>{{currentTime}}</span>/<span>{{duration}}</span>
    </div>
    <div>
      <audio :src="url" autoplay></audio>
    </div>
  </div>
</template>
<script>
  import db from '../db/datastore'
  export default {
    name: 'controlBtn',
//    mounted() {
//      this.drawLine()
//    },
    props: {
      musicUrl: '',
      singer: '',
      songName: '',
      status: ''
    },
    data() {
      return {
        musicStatus: this.status,
        canvas: '',
        currentTime: '00:00',  // 是用来在界面上显示当前播放到的时间，是字符串。
        duration: '00:00',    // 是用来在界面上显示歌曲总时长的，也是字符串。
        url: '',
        singer1: '',
        songName1: '',
        currentTime1: 0,  //  是当前播放到的时间在滑块上的映射值，是Number
        duration1: 10,  //  是歌曲总时长在滑块上的映射值，是Number
        circulation: true  // 列表循环
      }
    },
    computed: {
      // playList() {
      //   return db.get('playList').value();
      // }
      playList: {
        get: function () {
          return db.get('playList').value();
        }
      }
    },
    watch: {
      musicUrl(val) {
        console.log(val)
        this.url = val;
        this.songName1 = this.songName;
        this.singer1 = this.singer;
        this.musicStatus = this.status;
        if(this.musicStatus == 'play') {
          this.sliderMove();
          this.addToPlayList();
//          this.move()
        }
      }
    },
    methods: {
      singlePlay() {
        this.circulation = false;
      },
      circlePlay() {
        this.circulation = true;
      },
      playbefore() {
        var index = this.playList.findIndex(item => item.url === this.url);
        console.log(index)
        if(index>0) {
          this.musicStatus = 'play'
          this.url = this.playList[index-1].url;
          this.songName1 = this.playList[index-1].songName;
          this.singer1 = this.playList[index-1].singer;
        }
        if(index === 0) {
          this.musicStatus = 'play'
          index = this.playList.length-1;
          this.url = this.playList[index].url;
          this.songName1 = this.playList[index].songName;
          this.singer1 = this.playList[index].singer;
        }
        
      },
      playafter() {
        var index = this.playList.findIndex(item => item.url === this.url);
        console.log(index)
        
        if(index!==-1 && index<this.playList.length-1) {
          this.musicStatus = 'play'
          this.url = this.playList[index+1].url;
          this.songName1 = this.playList[index+1].songName;
          this.singer1 = this.playList[index+1].singer;
        }
        if(index === this.playList.length-1) {
          this.musicStatus = 'play';
          this.url = this.playList[0].url;
          this.songName1 = this.playList[0].songName;
          this.singer1 = this.playList[0].singer;
        }
      },
      playMusic(musicUrl,songName,singer) {
        this.musicStatus = 'play';
        this.url = musicUrl;
        this.songName1 = songName;
        this.singer1 = singer;
        this.sliderMove();
      },
      addToPlayList() {
        var obj = {};
        obj.url = this.url;
        obj.singer = this.singer;
        obj.songName = this.songName;
        var music = db.get('playList')
        .find({ singer: this.singer,songName: this.songName })
        .value()
        if(!music) {
          db.get('playList')
          .push(obj)
          .write()
          this.playList.push()
        }
      },
      pause() {
        var audio =  document.getElementsByTagName('audio')[0]
        audio.pause()
        this.musicStatus = 'pause'
        var currentTime = audio.currentTime
        var duration = audio.duration

      },
      play() {
        var audio =  document.getElementsByTagName('audio')[0];
        this.musicStatus = 'play';
        audio.play();

      },
      sliderMove() {
        var audio =  document.getElementsByTagName('audio')[0];
        var currentTime = audio.currentTime;
        var duration  = audio.duration;
        this.duration1 = duration;
        this.currentTime1 = currentTime;
        var currentSecond = Math.floor(currentTime%60)
        var currentMinute = Math.floor(currentTime/60)
        this.currentTime = currentMinute + ':' + currentSecond
        var durationSecond = Math.floor(duration%60)
        var durationMinute = Math.floor(duration/60)
        this.duration = durationMinute + ':' + durationSecond
//        console.log(this.currentTime1);
        if(currentTime === duration) {
          this.musicStatus = 'pause';
          if(this.circulation=== true) {
            this.playafter();
          }
          else {
            this.musicStatus = 'play';
            audio.src = this.url;
          }
        }
        setTimeout(this.sliderMove,10);

      },
      replay(time) {
        var audio =  document.getElementsByTagName('audio')[0];
        audio.currentTime = time
        this.musicStatus = 'play'
        audio.play()
      },
      delFromPlayList(index,singer,songName) {
        console.log(index);
        this.playList.splice(index,1);
        db.get('playList')
        .remove({singer: singer,songName: songName})
        .write()
        // db.unset('playList')
        // .write()
      }
      // canvas绘制的进度条动画
//      move() {
//        var audio =  document.getElementsByTagName('audio')[0]
//        var canvas = document.getElementsByTagName('canvas')[0]
//        var ctx = canvas.getContext('2d')
//        var currentTime = audio.currentTime
//        var duration  = audio.duration
//        var width = canvas.width
//        var moveLengthX = currentTime*(width-50)/duration
//        var x = moveLengthX + 50
//        var currentSecond = Math.floor(currentTime%60)
//        var currentMinute = Math.floor(currentTime/60)
//        this.currentTime = currentMinute + ':' + currentSecond
//        var durationSecond = Math.floor(duration%60)
//        var durationMinute = Math.floor(duration/60)
//        this.duration = durationMinute + ':' + durationSecond
//        this.drawCircle(ctx,x,20)
//        setTimeout(this.move,10)
//      }
//      drawCircle(ctx,x,y) {
//        ctx.beginPath();
//        ctx.arc(x, y, 6, 0, 360);
//        ctx.closePath();
//        //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
//        ctx.fillStyle = 'gray'
//        ctx.fill();
//      },
//      drawLine() {
//        var audio =  document.getElementsByTagName('audio')[0]
//        var canvas = document.getElementsByTagName('canvas')[0]
//        var ctx = canvas.getContext('2d');
//        ctx.beginPath()
//        ctx.strokeStyle='#000000';
//        ctx.lineWidth=8;
//        ctx.moveTo(50,20);
//        ctx.lineTo(450,20);
//        ctx.lineCap='round';
//        ctx.stroke();
//        var x = 50, y =20;
//        this.drawCircle(ctx,x,y)
//      },
    }
  }
</script>

<style lang='scss'>
  .controlBtn-root {
    /*margin-top: 50px;*/
    height: 100px;
    /*background: #000010;*/
  }
  .el-popover {
    height: 300px;
    background-color: #2c2c2c;
    overflow-y: scroll;
    
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
  #playbutton, #mycanvas, #time, #song  {
    float: left;
  }
  #playbutton {
    margin-top: 40px;
  }
  #time {
    margin-top: 6px;
    margin-left: 30px;
  }
  #song {
    width: 450px;
    margin-top: 20px;
  }
  .el-slider {
    margin-left: 30px;
    .el-slider__bar {
    background-color: #707070;
    }
    .el-slider__button {
      border: 2px solid #2c2c2c;
    }
  }
</style>