'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMusicList = fetchMusicList;
exports.fetchMusicUrl = fetchMusicUrl;

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchMusicList(song, menu) {

  var api = '/api/search/song/' + menu;
  return _index2.default.get(api, {
    params: {
      'key': song
    }
  });
}
function fetchMusicUrl(id, menu) {
  var api = '/api/get/song/' + menu;
  return _index2.default.get(api, {
    params: {
      'id': id
    }
  });
}
//# sourceMappingURL=fetchMusic.js.map