const music = {
    state: {
      song: '',
      musicList: []
    },
  
    mutations: {
      setMusicList(state, musicList) {
        state.musicList = musicList
      },
      setSong(state, song) {
        state.song = song
      }
    }
  }
  export default music