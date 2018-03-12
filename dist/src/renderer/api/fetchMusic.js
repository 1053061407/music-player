'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMusicList = fetchMusicList;
exports.fetchMusicUrl = fetchMusicUrl;

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchMusicList(song) {
  return _index2.default.get('/search', {
    params: {
      'keywords': song
    }
  });
}
function fetchMusicUrl(id) {
  return _index2.default.get('/music/url', {
    params: {
      'id': id
    }
  });
}
//# sourceMappingURL=fetchMusic.js.map