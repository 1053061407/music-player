import request from './index'
export function fetchMusicList(song,menu) {

  var api = '/api/search/song/' + menu;
  return request.get(api,{
    params: {
      'key': song
    }
  })
}
export function fetchMusicUrl(id,menu) {
  var api = '/api/get/song/' + menu;
  return request.get(api,{
    params: {
      'id': id
    }
  })
}