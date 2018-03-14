<template>
  <div class="root">
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
      <canvas id="mycanvas" width="450" height="50">
      </canvas>
    </div>
    <div id='time'>
      <span>{{currentTime}}</span>/<span>{{duration}}</span>
    </div>
    <div>
      <audio :src="musicUrl" autoplay></audio>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'controlBtn',
    mounted() {
      this.drawLine()
    },
    props: {
      musicUrl: '',
      status: '',
      singer: '',
      songName: ''
    },
    data() {
      return {
        musicStatus: this.status,
        canvas: '',
        currentTime: '00:00',
        duration: '00:00'
      }
    },
    watch: {
      status(val) {
        this.musicStatus = val;//新增对prop的status的watch，监听变更并同步到musicStatus上
        if(this.musicStatus == 'play') {
          this.move()
        }
      }
    },
    methods: {
      drawCircle(ctx,x,y) {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 360);
        ctx.closePath();
        //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
        ctx.fillStyle = 'gray'
        ctx.fill();
      },
      drawLine() {
        var audio =  document.getElementsByTagName('audio')[0]
        var canvas = document.getElementsByTagName('canvas')[0]
        var ctx = canvas.getContext('2d');
        ctx.beginPath()
        ctx.strokeStyle='#000000';
        ctx.lineWidth=8;
        ctx.moveTo(50,20);
        ctx.lineTo(450,20);
        ctx.lineCap='round';
        ctx.stroke();
        var x = 50, y =20;
        this.drawCircle(ctx,x,y)
      },
      pause() {
        var audio =  document.getElementsByTagName('audio')[0]
        audio.pause()
        this.musicStatus = 'pause'
        var currentTime = audio.currentTime
        var duration = audio.duration

      },
      play() {
        var audio =  document.getElementsByTagName('audio')[0]
        this.musicStatus = 'play'
        audio.play()
      },
      move() {
        var audio =  document.getElementsByTagName('audio')[0]
        var canvas = document.getElementsByTagName('canvas')[0]
        var ctx = canvas.getContext('2d')
        var currentTime = audio.currentTime
        var duration  = audio.duration
        var width = canvas.width
        var moveLengthX = currentTime*(width-50)/duration
        var x = moveLengthX + 50
        var currentSecond = Math.floor(currentTime%60)
        var currentMinute = Math.floor(currentTime/60)
        this.currentTime = currentMinute + ':' + currentSecond
        var durationSecond = Math.floor(duration%60)
        var durationMinute = Math.floor(duration/60)
        this.duration = durationMinute + ':' + durationSecond
        this.drawCircle(ctx,x,20)
        setTimeout(this.move,10)
      }
    }
  }
</script>

<style>
  .root {
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
    margin-left: 40px;
  }
  #song {
    width: 450px;
    margin-top: 20px;
  }
</style>