const music = {
    state: {
      song: '',
      musicList: [],
      menu: '网易'
    },
  
    mutations: {
      setMusicList(state, musicList ) {
        console.log(musicList)
        state.musicList = musicList || []
      },
      setSong(state, song) {
        state.song = song
      },
      setMenu(state, menu) {
        state.menu = menu
      }
    }
  }
  export default music