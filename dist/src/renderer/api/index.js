'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = _axios2.default.create({
  withCredentials: true,

  baseURL: 'http://localhost:3000',
  timeout: 15000 });

service.interceptors.request.use(function (config) {
  if (_store2.default.getters.token) {}
  return config;
}, function (error) {
  console.log(error);
  _promise2.default.reject(error);
});

service.interceptors.response.use();

exports.default = service;
//# sourceMappingURL=index.js.map