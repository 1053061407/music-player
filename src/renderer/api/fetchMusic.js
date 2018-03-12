import request from './index'
export function fetchMusicList(song) {
  return request.get('/search',{
    params: {
      'keywords': song
    }
  })
}
export function fetchMusicUrl(id) {
  return request.get('/music/url',{
    params: {
      'id': id
    }
  })
}