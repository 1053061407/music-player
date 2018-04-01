<template>
  <div id="controlBtn-root">
    <div id='playbutton'>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yduishangyiqu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-if="this.musicStatus=='pause'" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true"  v-else @click="pause">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yduixiayiqu"></use>
      </svg>
    </div>
    <div id='song'>
      <div style="padding-left: 100px">
        <span>{{songName}}</span>&nbsp;&nbsp;<span>{{singer}}</span>
      </div>
      <el-slider v-model="currentTime1" v-bind:max="duration1" @change="replay"></el-slider>
      <!--<canvas id="mycanvas" width="450" height="50">-->
      <!--</canvas>-->
    </div>
    <div id='time'>
      <span>{{currentTime}}</span>/<span>{{duration}}</span>
    </div>
    <div>
      <audio :src="url" autoplay></audio>
    </div>
  </div>
</template>
<script>
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
        currentTime1: 0,  //  是当前播放到的时间在滑块上的映射值，是Number
        duration1: 10  //  是歌曲总时长在滑块上的映射值，是Number
      }
    },
    computed: {

    },
    watch: {
      musicUrl(val) {
        this.url = val;
        this.musicStatus = this.status;
        if(this.musicStatus == 'play') {
          this.sliderMove();
//          this.move()
        }
      }
    },
    methods: {
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
        }
        setTimeout(this.sliderMove,10);

      },
      replay(time) {
        var audio =  document.getElementsByTagName('audio')[0];
        audio.currentTime = time
        this.musicStatus = 'play'
        audio.play()
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

<style>
  .controlBtn-root {
    /*margin-top: 50px;*/
    height: 100px;
    /*background: #000010;*/
  }
  #playbutton, #mycanvas, #time, #song  {
    float: left;
  }
  #playbutton {
    margin-top: 40px;
  }
  #time {
    margin-top: 50px;
    margin-left: 30px;
  }
  #song {
    width: 450px;
    margin-top: 20px;
  }
  .el-slider {
    margin-left: 30px;
  }
  .el-slider__bar {
    background-color: #707070;
  }
  .el-slider__button {
    border: 2px solid #2c2c2c;
  }
</style>