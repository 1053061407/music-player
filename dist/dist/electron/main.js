'use strict';

var _maxSafeInteger = require('babel-runtime/core-js/number/max-safe-integer');

var _maxSafeInteger2 = _interopRequireDefault2(_maxSafeInteger);

var _iterator5 = require('babel-runtime/core-js/symbol/iterator');

var _iterator6 = _interopRequireDefault2(_iterator5);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault2(_symbol);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault2(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault2(_getIterator2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault2(_weakMap);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault2(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault2(_promise);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault2(_create);

var _typeof3 = require('babel-runtime/helpers/typeof');

var _typeof4 = _interopRequireDefault2(_typeof3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault2(_keys);

var _defineProperty2 = require('babel-runtime/core-js/object/define-property');

var _defineProperty3 = _interopRequireDefault2(_defineProperty2);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = { i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      (0, _defineProperty3.default)(exports, name, { configurable: false,
        enumerable: true,
        get: getter
      });
    }
  };
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module['default'];
    } : function getModuleExports() {
      return module;
    };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  __webpack_require__.p = "";
  return __webpack_require__(__webpack_require__.s = 16);
}([function (module, exports) {

  module.exports = require("path");
}, function (module, exports) {

  module.exports = require("fs");
}, function (module, exports) {

  module.exports = require("electron");
}, function (module, exports) {

  module.exports = require("util");
}, function (module, exports) {

  module.exports = require("assert");
}, function (module, exports, __webpack_require__) {

  module.exports = minimatch;
  minimatch.Minimatch = Minimatch;

  var path = { sep: '/' };
  try {
    path = __webpack_require__(0);
  } catch (er) {}

  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = __webpack_require__(35);

  var plTypes = {
    '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
    '?': { open: '(?:', close: ')?' },
    '+': { open: '(?:', close: ')+' },
    '*': { open: '(?:', close: ')*' },
    '@': { open: '(?:', close: ')' }
  };

  var qmark = '[^/]';

  var star = qmark + '*?';

  var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

  var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

  var reSpecials = charSet('().*{}+?[]^$\\!');

  function charSet(s) {
    return s.split('').reduce(function (set, c) {
      set[c] = true;
      return set;
    }, {});
  }

  var slashSplit = /\/+/;

  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function (p, i, list) {
      return minimatch(p, pattern, options);
    };
  }

  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    (0, _keys2.default)(b).forEach(function (k) {
      t[k] = b[k];
    });
    (0, _keys2.default)(a).forEach(function (k) {
      t[k] = a[k];
    });
    return t;
  }

  minimatch.defaults = function (def) {
    if (!def || !(0, _keys2.default)(def).length) return minimatch;

    var orig = minimatch;

    var m = function minimatch(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };

    m.Minimatch = function Minimatch(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };

    return m;
  };

  Minimatch.defaults = function (def) {
    if (!def || !(0, _keys2.default)(def).length) return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };

  function minimatch(p, pattern, options) {
    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};

    if (!options.nocomment && pattern.charAt(0) === '#') {
      return false;
    }

    if (pattern.trim() === '') return p === '';

    return new Minimatch(pattern, options).match(p);
  }

  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }

    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};
    pattern = pattern.trim();

    if (path.sep !== '/') {
      pattern = pattern.split(path.sep).join('/');
    }

    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;

    this.make();
  }

  Minimatch.prototype.debug = function () {};

  Minimatch.prototype.make = make;
  function make() {
    if (this._made) return;

    var pattern = this.pattern;
    var options = this.options;

    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }

    this.parseNegate();

    var set = this.globSet = this.braceExpand();

    if (options.debug) this.debug = console.error;

    this.debug(this.pattern, set);

    set = this.globParts = set.map(function (s) {
      return s.split(slashSplit);
    });

    this.debug(this.pattern, set);

    set = set.map(function (s, si, set) {
      return s.map(this.parse, this);
    }, this);

    this.debug(this.pattern, set);

    set = set.filter(function (s) {
      return s.indexOf(false) === -1;
    });

    this.debug(this.pattern, set);

    this.set = set;
  }

  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;

    if (options.nonegate) return;

    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
      negate = !negate;
      negateOffset++;
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }

  minimatch.braceExpand = function (pattern, options) {
    return braceExpand(pattern, options);
  };

  Minimatch.prototype.braceExpand = braceExpand;

  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }

    pattern = typeof pattern === 'undefined' ? this.pattern : pattern;

    if (typeof pattern === 'undefined') {
      throw new TypeError('undefined pattern');
    }

    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      return [pattern];
    }

    return expand(pattern);
  }

  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    if (pattern.length > 1024 * 64) {
      throw new TypeError('pattern is too long');
    }

    var options = this.options;

    if (!options.noglobstar && pattern === '**') return GLOBSTAR;
    if (pattern === '') return '';

    var re = '';
    var hasMagic = !!options.nocase;
    var escaping = false;

    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;

    var patternStart = pattern.charAt(0) === '.' ? '' : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
    var self = this;

    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
            break;
          case '?':
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += '\\' + stateChar;
            break;
        }
        self.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    }

    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c);

      if (escaping && reSpecials[c]) {
        re += '\\' + c;
        escaping = false;
        continue;
      }

      switch (c) {
        case '/':
          return false;

        case '\\':
          clearStateChar();
          escaping = true;
          continue;

        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1) c = '^';
            re += c;
            continue;
          }

          self.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c;

          if (options.noext) clearStateChar();
          continue;

        case '(':
          if (inClass) {
            re += '(';
            continue;
          }

          if (!stateChar) {
            re += '\\(';
            continue;
          }

          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });

          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
          continue;

        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue;
          }

          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();

          re += pl.close;
          if (pl.type === '!') {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
          continue;

        case '|':
          if (inClass || !patternListStack.length || escaping) {
            re += '\\|';
            escaping = false;
            continue;
          }

          clearStateChar();
          re += '|';
          continue;

        case '[':
          clearStateChar();

          if (inClass) {
            re += '\\' + c;
            continue;
          }

          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;

        case ']':
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            escaping = false;
            continue;
          }

          if (inClass) {
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp('[' + cs + ']');
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }

          hasMagic = true;
          inClass = false;
          re += c;
          continue;

        default:
          clearStateChar();

          if (escaping) {
            escaping = false;
          } else if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }

          re += c;

      }
    }
    if (inClass) {
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    }

    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug('setting tail', re, pl);

      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
        if (!$2) {
          $2 = '\\';
        }

        return $1 + $1 + $2 + '|';
      });

      this.debug('tail=%j\n   %s', tail, tail, pl, re);
      var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;

      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    }

    clearStateChar();
    if (escaping) {
      re += '\\\\';
    }

    var addPatternStart = false;
    switch (re.charAt(0)) {
      case '.':
      case '[':
      case '(':
        addPatternStart = true;
    }

    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];

      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);

      nlLast += nlAfter;

      var openParensBefore = nlBefore.split('(').length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
      }
      nlAfter = cleanAfter;

      var dollar = '';
      if (nlAfter === '' && isSub !== SUBPARSE) {
        dollar = '$';
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }

    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }

    if (addPatternStart) {
      re = patternStart + re;
    }

    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }

    if (!hasMagic) {
      return globUnescape(pattern);
    }

    var flags = options.nocase ? 'i' : '';
    try {
      var regExp = new RegExp('^' + re + '$', flags);
    } catch (er) {
      return new RegExp('$.');
    }

    regExp._glob = pattern;
    regExp._src = re;

    return regExp;
  }

  minimatch.makeRe = function (pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };

  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;

    var set = this.set;

    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;

    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';

    var re = set.map(function (pattern) {
      return pattern.map(function (p) {
        return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
      }).join('\\\/');
    }).join('|');

    re = '^(?:' + re + ')$';

    if (this.negate) re = '^(?!' + re + ').*$';

    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }

  minimatch.match = function (list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function (f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };

  Minimatch.prototype.match = match;
  function match(f, partial) {
    this.debug('match', f, this.pattern);

    if (this.comment) return false;
    if (this.empty) return f === '';

    if (f === '/' && partial) return true;

    var options = this.options;

    if (path.sep !== '/') {
      f = f.split(path.sep).join('/');
    }

    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f);

    var set = this.set;
    this.debug(this.pattern, 'set', set);

    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break;
    }

    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) return true;
        return !this.negate;
      }
    }

    if (options.flipNegate) return false;
    return this.negate;
  }

  Minimatch.prototype.matchOne = function (file, pattern, partial) {
    var options = this.options;

    this.debug('matchOne', { 'this': this, file: file, pattern: pattern });

    this.debug('matchOne', file.length, pattern.length);

    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];

      this.debug(pattern, p, f);

      if (p === false) return false;

      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]);

        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug('** at the end');

          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' || !options.dot && file[fi].charAt(0) === '.') return false;
          }
          return true;
        }

        while (fr < fl) {
          var swallowee = file[fr];

          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee);

            return true;
          } else {
            if (swallowee === '.' || swallowee === '..' || !options.dot && swallowee.charAt(0) === '.') {
              this.debug('dot detected!', file, fr, pattern, pr);
              break;
            }

            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        }

        if (partial) {
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl) return true;
        }
        return false;
      }

      var hit;
      if (typeof p === 'string') {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }

      if (!hit) return false;
    }

    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      var emptyFileEnd = fi === fl - 1 && file[fi] === '';
      return emptyFileEnd;
    }

    throw new Error('wtf?');
  };

  function globUnescape(s) {
    return s.replace(/\\(.)/g, '$1');
  }

  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}, function (module, exports, __webpack_require__) {

  "use strict";

  function posix(path) {
    return path.charAt(0) === '/';
  }

  function win32(path) {
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || '';
    var isUnc = Boolean(device && device.charAt(1) !== ':');

    return Boolean(result[2] || isUnc);
  }

  module.exports = process.platform === 'win32' ? win32 : posix;
  module.exports.posix = posix;
  module.exports.win32 = win32;
}, function (module, exports, __webpack_require__) {

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = __webpack_require__(25);

  exports.names = [];
  exports.skips = [];

  exports.formatters = {};

  var prevTime;

  function selectColor(namespace) {
    var hash = 0,
        i;

    for (i in namespace) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0;
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  function createDebug(namespace) {

    function debug() {
      if (!debug.enabled) return;

      var self = debug;

      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        args.unshift('%O');
      }

      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          args.splice(index, 1);
          index--;
        }
        return match;
      });

      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);

    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    return debug;
  }

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue;
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  function disable() {
    exports.enable('');
  }

  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
}, function (module, exports) {

  function webpackEmptyContext(req) {
    throw new Error("Cannot find module '" + req + "'.");
  }
  webpackEmptyContext.keys = function () {
    return [];
  };
  webpackEmptyContext.resolve = webpackEmptyContext;
  module.exports = webpackEmptyContext;
  webpackEmptyContext.id = 8;
}, function (module, exports, __webpack_require__) {

  module.exports = glob;

  var fs = __webpack_require__(1);
  var rp = __webpack_require__(10);
  var minimatch = __webpack_require__(5);
  var Minimatch = minimatch.Minimatch;
  var inherits = __webpack_require__(38);
  var EE = __webpack_require__(40).EventEmitter;
  var path = __webpack_require__(0);
  var assert = __webpack_require__(4);
  var isAbsolute = __webpack_require__(6);
  var globSync = __webpack_require__(41);
  var common = __webpack_require__(11);
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var inflight = __webpack_require__(42);
  var util = __webpack_require__(3);
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;

  var once = __webpack_require__(13);

  function glob(pattern, options, cb) {
    if (typeof options === 'function') cb = options, options = {};
    if (!options) options = {};

    if (options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return globSync(pattern, options);
    }

    return new Glob(pattern, options, cb);
  }

  glob.sync = globSync;
  var GlobSync = glob.GlobSync = globSync.GlobSync;

  glob.glob = glob;

  function extend(origin, add) {
    if (add === null || (typeof add === 'undefined' ? 'undefined' : (0, _typeof4.default)(add)) !== 'object') {
      return origin;
    }

    var keys = (0, _keys2.default)(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }

  glob.hasMagic = function (pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;

    var g = new Glob(pattern, options);
    var set = g.minimatch.set;

    if (!pattern) return false;

    if (set.length > 1) return true;

    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== 'string') return true;
    }

    return false;
  };

  glob.Glob = Glob;
  inherits(Glob, EE);
  function Glob(pattern, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = null;
    }

    if (options && options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return new GlobSync(pattern, options);
    }

    if (!(this instanceof Glob)) return new Glob(pattern, options, cb);

    setopts(this, pattern, options);
    this._didRealPath = false;

    var n = this.minimatch.set.length;

    this.matches = new Array(n);

    if (typeof cb === 'function') {
      cb = once(cb);
      this.on('error', cb);
      this.on('end', function (matches) {
        cb(null, matches);
      });
    }

    var self = this;
    this._processing = 0;

    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;

    if (this.noprocess) return this;

    if (n === 0) return done();

    var sync = true;
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }
    sync = false;

    function done() {
      --self._processing;
      if (self._processing <= 0) {
        if (sync) {
          process.nextTick(function () {
            self._finish();
          });
        } else {
          self._finish();
        }
      }
    }
  }

  Glob.prototype._finish = function () {
    assert(this instanceof Glob);
    if (this.aborted) return;

    if (this.realpath && !this._didRealpath) return this._realpath();

    common.finish(this);
    this.emit('end', this.found);
  };

  Glob.prototype._realpath = function () {
    if (this._didRealpath) return;

    this._didRealpath = true;

    var n = this.matches.length;
    if (n === 0) return this._finish();

    var self = this;
    for (var i = 0; i < this.matches.length; i++) {
      this._realpathSet(i, next);
    }function next() {
      if (--n === 0) self._finish();
    }
  };

  Glob.prototype._realpathSet = function (index, cb) {
    var matchset = this.matches[index];
    if (!matchset) return cb();

    var found = (0, _keys2.default)(matchset);
    var self = this;
    var n = found.length;

    if (n === 0) return cb();

    var set = this.matches[index] = (0, _create2.default)(null);
    found.forEach(function (p, i) {
      p = self._makeAbs(p);
      rp.realpath(p, self.realpathCache, function (er, real) {
        if (!er) set[real] = true;else if (er.syscall === 'stat') set[p] = true;else self.emit('error', er);

        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };

  Glob.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  Glob.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };

  Glob.prototype.abort = function () {
    this.aborted = true;
    this.emit('abort');
  };

  Glob.prototype.pause = function () {
    if (!this.paused) {
      this.paused = true;
      this.emit('pause');
    }
  };

  Glob.prototype.resume = function () {
    if (this.paused) {
      this.emit('resume');
      this.paused = false;
      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];
          this._emitMatch(e[0], e[1]);
        }
      }
      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;
          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };

  Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
    assert(this instanceof Glob);
    assert(typeof cb === 'function');

    if (this.aborted) return;

    this._processing++;
    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);
      return;
    }

    var n = 0;
    while (typeof pattern[n] === 'string') {
      n++;
    }

    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join('/'), index, cb);
        return;

      case 0:
        prefix = null;
        break;

      default:
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n);

    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read);

    if (childrenIgnored(this, read)) return cb();

    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };

  Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function (er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries) return cb();

    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';

    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== '.' || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m) matchedEntries.push(e);
      }
    }

    var len = matchedEntries.length;

    if (len === 0) return cb();

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = (0, _create2.default)(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path.join(this.root, e);
        }
        this._emitMatch(index, e);
      }

      return cb();
    }

    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) {
        if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
      }
      this._process([e].concat(remain), index, inGlobStar, cb);
    }
    cb();
  };

  Glob.prototype._emitMatch = function (index, e) {
    if (this.aborted) return;

    if (isIgnored(this, e)) return;

    if (this.paused) {
      this._emitQueue.push([index, e]);
      return;
    }

    var abs = isAbsolute(e) ? e : this._makeAbs(e);

    if (this.mark) e = this._mark(e);

    if (this.absolute) e = abs;

    if (this.matches[index][e]) return;

    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    this.matches[index][e] = true;

    var st = this.statCache[abs];
    if (st) this.emit('stat', e, st);

    this.emit('match', e);
  };

  Glob.prototype._readdirInGlobStar = function (abs, cb) {
    if (this.aborted) return;

    if (this.follow) return this._readdir(abs, false, cb);

    var lstatkey = 'lstat\0' + abs;
    var self = this;
    var lstatcb = inflight(lstatkey, lstatcb_);

    if (lstatcb) fs.lstat(abs, lstatcb);

    function lstatcb_(er, lstat) {
      if (er && er.code === 'ENOENT') return cb();

      var isSym = lstat && lstat.isSymbolicLink();
      self.symlinks[abs] = isSym;

      if (!isSym && lstat && !lstat.isDirectory()) {
        self.cache[abs] = 'FILE';
        cb();
      } else self._readdir(abs, false, cb);
    }
  };

  Glob.prototype._readdir = function (abs, inGlobStar, cb) {
    if (this.aborted) return;

    cb = inflight('readdir\0' + abs + '\0' + inGlobStar, cb);
    if (!cb) return;

    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);

    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return cb();

      if (Array.isArray(c)) return cb(null, c);
    }

    var self = this;
    fs.readdir(abs, readdirCb(this, abs, cb));
  };

  function readdirCb(self, abs, cb) {
    return function (er, entries) {
      if (er) self._readdirError(abs, er, cb);else self._readdirEntries(abs, entries, cb);
    };
  }

  Glob.prototype._readdirEntries = function (abs, entries, cb) {
    if (this.aborted) return;

    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries;
    return cb(null, entries);
  };

  Glob.prototype._readdirError = function (f, er, cb) {
    if (this.aborted) return;

    switch (er.code) {
      case 'ENOTSUP':
      case 'ENOTDIR':
        var abs = this._makeAbs(f);
        this.cache[abs] = 'FILE';
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          this.emit('error', error);
          this.abort();
        }
        break;

      case 'ENOENT':
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) {
          this.emit('error', er);

          this.abort();
        }
        if (!this.silent) console.error('glob error', er);
        break;
    }

    return cb();
  };

  Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function (er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries) return cb();

    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    this._process(noGlobStar, index, false, cb);

    var isSym = this.symlinks[abs];
    var len = entries.length;

    if (isSym && inGlobStar) return cb();

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;

      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true, cb);

      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true, cb);
    }

    cb();
  };

  Glob.prototype._processSimple = function (prefix, index, cb) {
    var self = this;
    this._stat(prefix, function (er, exists) {
      self._processSimple2(prefix, index, er, exists, cb);
    });
  };
  Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

    if (!this.matches[index]) this.matches[index] = (0, _create2.default)(null);

    if (!exists) return cb();

    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === '/') {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    this._emitMatch(index, prefix);
    cb();
  };

  Glob.prototype._stat = function (f, cb) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === '/';

    if (f.length > this.maxLength) return cb();

    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];

      if (Array.isArray(c)) c = 'DIR';

      if (!needDir || c === 'DIR') return cb(null, c);

      if (needDir && c === 'FILE') return cb();
    }

    var exists;
    var stat = this.statCache[abs];
    if (stat !== undefined) {
      if (stat === false) return cb(null, stat);else {
        var type = stat.isDirectory() ? 'DIR' : 'FILE';
        if (needDir && type === 'FILE') return cb();else return cb(null, type, stat);
      }
    }

    var self = this;
    var statcb = inflight('stat\0' + abs, lstatcb_);
    if (statcb) fs.lstat(abs, statcb);

    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        return fs.stat(abs, function (er, stat) {
          if (er) self._stat2(f, abs, null, lstat, cb);else self._stat2(f, abs, er, stat, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };

  Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
    if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
      this.statCache[abs] = false;
      return cb();
    }

    var needDir = f.slice(-1) === '/';
    this.statCache[abs] = stat;

    if (abs.slice(-1) === '/' && stat && !stat.isDirectory()) return cb(null, false, stat);

    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;

    if (needDir && c === 'FILE') return cb();

    return cb(null, c, stat);
  };
}, function (module, exports, __webpack_require__) {

  module.exports = realpath;
  realpath.realpath = realpath;
  realpath.sync = realpathSync;
  realpath.realpathSync = realpathSync;
  realpath.monkeypatch = monkeypatch;
  realpath.unmonkeypatch = unmonkeypatch;

  var fs = __webpack_require__(1);
  var origRealpath = fs.realpath;
  var origRealpathSync = fs.realpathSync;

  var version = process.version;
  var ok = /^v[0-5]\./.test(version);
  var old = __webpack_require__(34);

  function newError(er) {
    return er && er.syscall === 'realpath' && (er.code === 'ELOOP' || er.code === 'ENOMEM' || er.code === 'ENAMETOOLONG');
  }

  function realpath(p, cache, cb) {
    if (ok) {
      return origRealpath(p, cache, cb);
    }

    if (typeof cache === 'function') {
      cb = cache;
      cache = null;
    }
    origRealpath(p, cache, function (er, result) {
      if (newError(er)) {
        old.realpath(p, cache, cb);
      } else {
        cb(er, result);
      }
    });
  }

  function realpathSync(p, cache) {
    if (ok) {
      return origRealpathSync(p, cache);
    }

    try {
      return origRealpathSync(p, cache);
    } catch (er) {
      if (newError(er)) {
        return old.realpathSync(p, cache);
      } else {
        throw er;
      }
    }
  }

  function monkeypatch() {
    fs.realpath = realpath;
    fs.realpathSync = realpathSync;
  }

  function unmonkeypatch() {
    fs.realpath = origRealpath;
    fs.realpathSync = origRealpathSync;
  }
}, function (module, exports, __webpack_require__) {

  exports.alphasort = alphasort;
  exports.alphasorti = alphasorti;
  exports.setopts = setopts;
  exports.ownProp = ownProp;
  exports.makeAbs = makeAbs;
  exports.finish = finish;
  exports.mark = mark;
  exports.isIgnored = isIgnored;
  exports.childrenIgnored = childrenIgnored;

  function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }

  var path = __webpack_require__(0);
  var minimatch = __webpack_require__(5);
  var isAbsolute = __webpack_require__(6);
  var Minimatch = minimatch.Minimatch;

  function alphasorti(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }

  function alphasort(a, b) {
    return a.localeCompare(b);
  }

  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];

    if (!Array.isArray(self.ignore)) self.ignore = [self.ignore];

    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  }

  function ignoreMap(pattern) {
    var gmatcher = null;
    if (pattern.slice(-3) === '/**') {
      var gpattern = pattern.replace(/(\/\*\*)+$/, '');
      gmatcher = new Minimatch(gpattern, { dot: true });
    }

    return {
      matcher: new Minimatch(pattern, { dot: true }),
      gmatcher: gmatcher
    };
  }

  function setopts(self, pattern, options) {
    if (!options) options = {};

    if (options.matchBase && -1 === pattern.indexOf("/")) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }
      pattern = "**/" + pattern;
    }

    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || (0, _create2.default)(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir) self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;
    self.absolute = !!options.absolute;

    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || (0, _create2.default)(null);
    self.statCache = options.statCache || (0, _create2.default)(null);
    self.symlinks = options.symlinks || (0, _create2.default)(null);

    setupIgnores(self, options);

    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp(options, "cwd")) self.cwd = cwd;else {
      self.cwd = path.resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }

    self.root = options.root || path.resolve(self.cwd, "/");
    self.root = path.resolve(self.root);
    if (process.platform === "win32") self.root = self.root.replace(/\\/g, "/");

    self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32") self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    self.nomount = !!options.nomount;

    options.nonegate = true;
    options.nocomment = true;

    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }

  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : (0, _create2.default)(null);

    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];
      if (!matches || (0, _keys2.default)(matches).length === 0) {
        if (self.nonull) {
          var literal = self.minimatch.globSet[i];
          if (nou) all.push(literal);else all[literal] = true;
        }
      } else {
        var m = (0, _keys2.default)(matches);
        if (nou) all.push.apply(all, m);else m.forEach(function (m) {
          all[m] = true;
        });
      }
    }

    if (!nou) all = (0, _keys2.default)(all);

    if (!self.nosort) all = all.sort(self.nocase ? alphasorti : alphasort);

    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }
      if (self.nodir) {
        all = all.filter(function (e) {
          var notDir = !/\/$/.test(e);
          var c = self.cache[e] || self.cache[makeAbs(self, e)];
          if (notDir && c) notDir = c !== 'DIR' && !Array.isArray(c);
          return notDir;
        });
      }
    }

    if (self.ignore.length) all = all.filter(function (m) {
      return !isIgnored(self, m);
    });

    self.found = all;
  }

  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;
    if (c) {
      var isDir = c === 'DIR' || Array.isArray(c);
      var slash = p.slice(-1) === '/';

      if (isDir && !slash) m += '/';else if (!isDir && slash) m = m.slice(0, -1);

      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }

    return m;
  }

  function makeAbs(self, f) {
    var abs = f;
    if (f.charAt(0) === '/') {
      abs = path.join(self.root, f);
    } else if (isAbsolute(f) || f === '') {
      abs = f;
    } else if (self.changedCwd) {
      abs = path.resolve(self.cwd, f);
    } else {
      abs = path.resolve(f);
    }

    if (process.platform === 'win32') abs = abs.replace(/\\/g, '/');

    return abs;
  }

  function isIgnored(self, path) {
    if (!self.ignore.length) return false;

    return self.ignore.some(function (item) {
      return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
    });
  }

  function childrenIgnored(self, path) {
    if (!self.ignore.length) return false;

    return self.ignore.some(function (item) {
      return !!(item.gmatcher && item.gmatcher.match(path));
    });
  }
}, function (module, exports) {
  module.exports = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);

    if (typeof fn !== 'function') throw new TypeError('need wrapper function');

    (0, _keys2.default)(fn).forEach(function (k) {
      wrapper[k] = fn[k];
    });

    return wrapper;

    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb = args[args.length - 1];
      if (typeof ret === 'function' && ret !== cb) {
        (0, _keys2.default)(cb).forEach(function (k) {
          ret[k] = cb[k];
        });
      }
      return ret;
    }
  }
}, function (module, exports, __webpack_require__) {

  var wrappy = __webpack_require__(12);
  module.exports = wrappy(once);
  module.exports.strict = wrappy(onceStrict);

  once.proto = once(function () {
    Object.defineProperty(Function.prototype, 'once', {
      value: function value() {
        return once(this);
      },
      configurable: true
    });

    Object.defineProperty(Function.prototype, 'onceStrict', {
      value: function value() {
        return onceStrict(this);
      },
      configurable: true
    });
  });

  function once(fn) {
    var f = function f() {
      if (f.called) return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }

  function onceStrict(fn) {
    var f = function f() {
      if (f.called) throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || 'Function wrapped with `once`';
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
}, function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.changePermissions = exports.downloadFile = exports.getPath = undefined;

  var _electron = __webpack_require__(2);

  var _electron2 = _interopRequireDefault(_electron);

  var _fs = __webpack_require__(1);

  var _fs2 = _interopRequireDefault(_fs);

  var _path = __webpack_require__(0);

  var _path2 = _interopRequireDefault(_path);

  var _https = __webpack_require__(47);

  var _https2 = _interopRequireDefault(_https);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var getPath = exports.getPath = function getPath() {
    var savePath = (_electron.remote || _electron2.default).app.getPath('userData');
    return _path2.default.resolve(savePath + '/extensions');
  };

  var _ref = _electron.remote || _electron2.default,
      net = _ref.net;

  var request = net ? net.request : _https2.default.get;

  var downloadFile = exports.downloadFile = function downloadFile(from, to) {
    return new _promise2.default(function (resolve, reject) {
      var req = request(from);
      req.on('response', function (res) {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadFile(res.headers.location, to).then(resolve).catch(reject);
        }
        res.pipe(_fs2.default.createWriteStream(to)).on('close', resolve);
      });
      req.on('error', reject);
      req.end();
    });
  };

  var changePermissions = exports.changePermissions = function changePermissions(dir, mode) {
    var files = _fs2.default.readdirSync(dir);
    files.forEach(function (file) {
      var filePath = _path2.default.join(dir, file);
      _fs2.default.chmodSync(filePath, parseInt(mode, 8));
      if (_fs2.default.statSync(filePath).isDirectory()) {
        changePermissions(filePath, mode);
      }
    });
  };
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  (function (__dirname) {
    var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(2);
    var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);

    if (process.env.NODE_ENV !== 'development') {
      global.__static = __webpack_require__(0).join(__dirname, '/static').replace(/\\/g, '\\\\');
    }

    var mainWindow = void 0;
    var winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9080' : 'file://' + __dirname + '/index.html';

    function createWindow() {
      mainWindow = new __WEBPACK_IMPORTED_MODULE_0_electron__["BrowserWindow"]({
        height: 700,
        useContentSize: true,
        width: 1000
      });

      mainWindow.loadURL(winURL);

      mainWindow.on('closed', function () {
        mainWindow = null;
      });
    }

    __WEBPACK_IMPORTED_MODULE_0_electron__["app"].on('ready', createWindow);

    __WEBPACK_IMPORTED_MODULE_0_electron__["app"].on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        __WEBPACK_IMPORTED_MODULE_0_electron__["app"].quit();
      }
    });

    __WEBPACK_IMPORTED_MODULE_0_electron__["app"].on('activate', function () {
      if (mainWindow === null) {
        createWindow();
      }
    });
  }).call(__webpack_exports__, "src/main");
}, function (module, exports, __webpack_require__) {

  __webpack_require__(17);
  module.exports = __webpack_require__(15);
}, function (module, exports, __webpack_require__) {

  process.env.NODE_ENV = 'development';

  __webpack_require__(18)({ showDevTools: true });

  __webpack_require__(2).app.on('ready', function () {
    var installExtension = __webpack_require__(30);
    installExtension.default(installExtension.VUEJS_DEVTOOLS).then(function () {}).catch(function (err) {
      console.log('Unable to install `vue-devtools`: \n', err);
    });
  });

  __webpack_require__(15);
}, function (module, exports, __webpack_require__) {

  "use strict";

  var electron = __webpack_require__(2);
  var localShortcut = __webpack_require__(19);
  var isDev = __webpack_require__(29);

  var app = electron.app;
  var BrowserWindow = electron.BrowserWindow;
  var isMacOS = process.platform === 'darwin';

  function devTools(win) {
    win = win || BrowserWindow.getFocusedWindow();

    if (win) {
      win.toggleDevTools();
    }
  }

  function openDevTools(win, showDevTools) {
    win = win || BrowserWindow.getFocusedWindow();

    if (win) {
      var mode = showDevTools === true ? undefined : showDevTools;
      win.webContents.openDevTools({ mode: mode });
    }
  }

  function refresh(win) {
    win = win || BrowserWindow.getFocusedWindow();

    if (win) {
      win.webContents.reloadIgnoringCache();
    }
  }

  function inspectElements() {
    var win = BrowserWindow.getFocusedWindow();
    var inspect = function inspect() {
      win.devToolsWebContents.executeJavaScript('DevToolsAPI.enterInspectElementMode()');
    };

    if (win) {
      if (win.webContents.isDevToolsOpened()) {
        inspect();
      } else {
        win.webContents.on('devtools-opened', inspect);
        win.openDevTools();
      }
    }
  }

  var addExtensionIfInstalled = function addExtensionIfInstalled(name, getPath) {
    var isExtensionInstalled = function isExtensionInstalled(name) {
      return BrowserWindow.getDevToolsExtensions && {}.hasOwnProperty.call(BrowserWindow.getDevToolsExtensions(), name);
    };

    try {
      if (!isExtensionInstalled(name)) {
        BrowserWindow.addDevToolsExtension(getPath(name));
      }
    } catch (err) {}
  };

  module.exports = function (opts) {
    opts = (0, _assign2.default)({
      enabled: null,
      showDevTools: false
    }, opts);

    if (opts.enabled === false || opts.enabled === null && !isDev) {
      return;
    }

    app.on('browser-window-created', function (e, win) {
      if (opts.showDevTools) {
        openDevTools(win, opts.showDevTools);
      }
    });

    app.on('ready', function () {
      addExtensionIfInstalled('devtron', function (name) {
        return !function webpackMissingModule() {
          var e = new Error("Cannot find module \".\"");e.code = 'MODULE_NOT_FOUND';throw e;
        }().path;
      });

      addExtensionIfInstalled('electron-react-devtools', function (name) {
        return __webpack_require__(0).dirname(!function webpackMissingModule() {
          var e = new Error("Cannot find module \".\"");e.code = 'MODULE_NOT_FOUND';throw e;
        }());
      });

      localShortcut.register('CmdOrCtrl+Shift+C', inspectElements);
      localShortcut.register(isMacOS ? 'Cmd+Alt+I' : 'Ctrl+Shift+I', devTools);
      localShortcut.register('F12', devTools);

      localShortcut.register('CmdOrCtrl+R', refresh);
      localShortcut.register('F5', refresh);
    });
  };

  module.exports.refresh = refresh;
  module.exports.devTools = devTools;
  module.exports.openDevTools = openDevTools;
}, function (module, exports, __webpack_require__) {

  "use strict";

  var _webpack_require__ = __webpack_require__(2),
      app = _webpack_require__.app,
      BrowserWindow = _webpack_require__.BrowserWindow;

  var isAccelerator = __webpack_require__(20);
  var equals = __webpack_require__(21);

  var _webpack_require__2 = __webpack_require__(22),
      toKeyEvent = _webpack_require__2.toKeyEvent;

  var _debug = __webpack_require__(23);

  var debug = _debug('electron-localshortcut');

  var ANY_WINDOW = {};

  var windowsWithShortcuts = new _weakMap2.default();

  var title = function title(win) {
    if (win) {
      try {
        return win.getTitle();
      } catch (err) {
        return 'A destroyed window';
      }
    }

    return 'An falsy value';
  };

  function _checkAccelerator(accelerator) {
    if (!isAccelerator(accelerator)) {
      var w = {};
      Error.captureStackTrace(w);
      var msg = '\nWARNING: ' + accelerator + ' is not a valid accelerator.\n\n' + w.stack.split('\n').slice(4).join('\n') + '\n';
      console.error(msg);
    }
  }

  function disableAll(win) {
    debug('Disabling all shortcuts on window ' + title(win));
    var wc = win.webContents;
    var shortcutsOfWindow = windowsWithShortcuts.get(wc);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(shortcutsOfWindow), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var shortcut = _step.value;

        shortcut.enabled = false;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  function enableAll(win) {
    debug('Enabling all shortcuts on window ' + title(win));
    var wc = win.webContents;
    var shortcutsOfWindow = windowsWithShortcuts.get(wc);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(shortcutsOfWindow), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var shortcut = _step2.value;

        shortcut.enabled = true;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  function unregisterAll(win) {
    debug('Unregistering all shortcuts on window ' + title(win));
    var wc = win.webContents;
    var shortcutsOfWindow = windowsWithShortcuts.get(wc);

    shortcutsOfWindow.removeListener();

    windowsWithShortcuts.delete(wc);
  }

  function _normalizeEvent(input) {
    var normalizedEvent = {
      code: input.code,
      key: input.key
    };

    ['alt', 'shift', 'meta'].forEach(function (prop) {
      if (typeof input[prop] !== 'undefined') {
        normalizedEvent[prop + 'Key'] = input[prop];
      }
    });

    if (typeof input.control !== 'undefined') {
      normalizedEvent.ctrlKey = input.control;
    }

    return normalizedEvent;
  }

  function _findShortcut(event, shortcutsOfWindow) {
    var i = 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = (0, _getIterator3.default)(shortcutsOfWindow), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var shortcut = _step3.value;

        if (equals(shortcut.eventStamp, event)) {
          return i;
        }
        i++;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return -1;
  }

  var _onBeforeInput = function _onBeforeInput(shortcutsOfWindow) {
    return function (e, input) {
      if (input.type === 'keyUp') {
        return;
      }

      var event = _normalizeEvent(input);

      debug('before-input-event: ' + input + ' is translated to: ' + event);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(shortcutsOfWindow), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _ref2 = _step4.value;
          var eventStamp = _ref2.eventStamp;
          var callback = _ref2.callback;

          if (equals(eventStamp, event)) {
            debug('eventStamp: ' + eventStamp + ' match');
            callback();
            return;
          }
          debug('eventStamp: ' + eventStamp + ' no match');
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    };
  };

  function register(win, accelerator, callback) {
    var wc = void 0;
    if (typeof callback === 'undefined') {
      wc = ANY_WINDOW;
      callback = accelerator;
      accelerator = win;
    } else {
      wc = win.webContents;
    }

    debug('Registering callback for ' + accelerator + ' on window ' + title(win));
    _checkAccelerator(accelerator);

    debug(accelerator + ' seems a valid shortcut sequence.');

    var shortcutsOfWindow = void 0;
    if (windowsWithShortcuts.has(wc)) {
      debug('Window has others shortcuts registered.');
      shortcutsOfWindow = windowsWithShortcuts.get(wc);
    } else {
      debug('This is the first shortcut of the window.');
      shortcutsOfWindow = [];
      windowsWithShortcuts.set(wc, shortcutsOfWindow);

      if (wc === ANY_WINDOW) {
        var keyHandler = _onBeforeInput(shortcutsOfWindow);
        var enableAppShortcuts = function enableAppShortcuts(e, win) {
          var wc = win.webContents;
          wc.on('before-input-event', keyHandler);
          wc.once('closed', function () {
            return wc.removeListener('before-input-event', keyHandler);
          });
        };

        var windows = BrowserWindow.getAllWindows();

        windows.forEach(function (win) {
          return enableAppShortcuts(null, win);
        });

        app.on('browser-window-created', enableAppShortcuts);

        shortcutsOfWindow.removeListener = function () {
          var windows = BrowserWindow.getAllWindows();
          windows.forEach(function (win) {
            return win.webContents.removeListener('before-input-event', keyHandler);
          });
          app.removeListener('browser-window-created', enableAppShortcuts);
        };
      } else {
        var _keyHandler = _onBeforeInput(shortcutsOfWindow);
        wc.on('before-input-event', _keyHandler);

        shortcutsOfWindow.removeListener = function () {
          return wc.removeListener('before-input-event', _keyHandler);
        };
        wc.once('closed', shortcutsOfWindow.removeListener);
      }
    }

    debug('Adding shortcut to window set.');

    var eventStamp = toKeyEvent(accelerator);

    shortcutsOfWindow.push({
      eventStamp: eventStamp,
      callback: callback,
      enabled: true
    });

    debug('Shortcut registered.');
  }

  function unregister(win, accelerator) {
    var wc = void 0;
    if (typeof accelerator === 'undefined') {
      wc = ANY_WINDOW;
      accelerator = win;
    } else {
      if (win.isDestroyed()) {
        debug('Early return because window is destroyed.');
        return;
      }
      wc = win.webContents;
    }

    debug('Unregistering callback for ' + accelerator + ' on window ' + title(win));

    _checkAccelerator(accelerator);

    debug(accelerator + ' seems a valid shortcut sequence.');

    if (!windowsWithShortcuts.has(wc)) {
      debug('Early return because window has never had shortcuts registered.');
      return;
    }

    var shortcutsOfWindow = windowsWithShortcuts.get(wc);

    var eventStamp = toKeyEvent(accelerator);
    var shortcutIdx = _findShortcut(eventStamp, shortcutsOfWindow);
    if (shortcutIdx === -1) {
      return;
    }

    shortcutsOfWindow.splice(shortcutIdx, 1);

    if (shortcutsOfWindow.length === 0) {
      shortcutsOfWindow.removeListener();

      windowsWithShortcuts.delete(wc);
    }
  }

  function isRegistered(win, accelerator) {
    _checkAccelerator(accelerator);
  }

  module.exports = {
    register: register,
    unregister: unregister,
    isRegistered: isRegistered,
    unregisterAll: unregisterAll,
    enableAll: enableAll,
    disableAll: disableAll
  };
}, function (module, exports, __webpack_require__) {

  "use strict";

  var modifiers = /^(Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super)$/;
  var keyCodes = /^([0-9A-Z)!@#$%^&*(:+<_>?~{|}";=,\-./`[\\\]']|F1*[1-9]|F10|F2[0-4]|Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen)$/;

  module.exports = function (str) {
    var parts = str.split("+");
    var keyFound = false;
    return parts.every(function (val, index) {
      var isKey = keyCodes.test(val);
      var isModifier = modifiers.test(val);
      if (isKey) {
        if (keyFound) return false;
        keyFound = true;
      }

      if (index === parts.length - 1 && !keyFound) return false;
      return isKey || isModifier;
    });
  };
}, function (module, exports, __webpack_require__) {

  "use strict";

  function _lower(key) {
    if (typeof key !== 'string') {
      return key;
    }
    return key.toLowerCase();
  }

  function areEqual(ev1, ev2) {
    if (ev1 === ev2) {
      return true;
    }

    var _arr = ['altKey', 'ctrlKey', 'shiftKey', 'metaKey'];
    for (var _i = 0; _i < _arr.length; _i++) {
      var prop = _arr[_i];var _ref3 = [ev1[prop], ev2[prop]],
          value1 = _ref3[0],
          value2 = _ref3[1];


      if (Boolean(value1) !== Boolean(value2)) {
        return false;
      }
    }

    if (_lower(ev1.key) === _lower(ev2.key) && ev1.key !== undefined || ev1.code === ev2.code && ev1.code !== undefined) {
      return true;
    }

    return false;
  }

  module.exports = areEqual;
}, function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, '__esModule', { value: true });

  var modifiers = /^(CommandOrControl|CmdOrCtrl|Command|Cmd|Control|Ctrl|Alt|Option|AltGr|Shift|Super)/i;
  var keyCodes = /^(Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen|F24|F23|F22|F21|F20|F19|F18|F17|F16|F15|F14|F13|F12|F11|F10|F9|F8|F7|F6|F5|F4|F3|F2|F1|[0-9A-Z)!@#$%^&*(:+<_>?~{|}";=,\-./`[\\\]'])/i;
  var UNSUPPORTED = {};

  function reduceModifier(_ref4, modifier) {
    var accelerator = _ref4.accelerator,
        event = _ref4.event;

    switch (modifier) {
      case 'command':
      case 'cmd':
        {
          if (process.platform !== 'darwin') {
            return UNSUPPORTED;
          }

          if (event.metaKey) {
            throw new Error('Double `Command` modifier specified.');
          }

          return {
            event: (0, _assign2.default)({}, event, { metaKey: true }),
            accelerator: accelerator.slice(modifier.length)
          };
        }
      case 'super':
        {
          if (event.metaKey) {
            throw new Error('Double `Super` modifier specified.');
          }

          return {
            event: (0, _assign2.default)({}, event, { metaKey: true }),
            accelerator: accelerator.slice(modifier.length)
          };
        }
      case 'control':
      case 'ctrl':
        {
          if (event.ctrlKey) {
            throw new Error('Double `Control` modifier specified.');
          }

          return {
            event: (0, _assign2.default)({}, event, { ctrlKey: true }),
            accelerator: accelerator.slice(modifier.length)
          };
        }
      case 'commandorcontrol':
      case 'cmdorctrl':
        {
          if (process.platform === 'darwin') {
            if (event.metaKey) {
              throw new Error('Double `Command` modifier specified.');
            }

            return {
              event: (0, _assign2.default)({}, event, { metaKey: true }),
              accelerator: accelerator.slice(modifier.length)
            };
          }

          if (event.ctrlKey) {
            throw new Error('Double `Control` modifier specified.');
          }

          return {
            event: (0, _assign2.default)({}, event, { ctrlKey: true }),
            accelerator: accelerator.slice(modifier.length)
          };
        }
      case 'option':
      case 'altgr':
      case 'alt':
        {
          if (modifier === 'option' && process.platform !== 'darwin') {
            return UNSUPPORTED;
          }

          if (event.altKey) {
            throw new Error('Double `Alt` modifier specified.');
          }

          return {
            event: (0, _assign2.default)({}, event, { altKey: true }),
            accelerator: accelerator.slice(modifier.length)
          };
        }
      case 'shift':
        {
          if (event.shiftKey) {
            throw new Error('Double `Shift` modifier specified.');
          }

          return {
            event: (0, _assign2.default)({}, event, { shiftKey: true }),
            accelerator: accelerator.slice(modifier.length)
          };
        }

      default:
        console.error(modifier);
    }
  }

  function reducePlus(_ref5) {
    var accelerator = _ref5.accelerator,
        event = _ref5.event;

    return {
      event: event,
      accelerator: accelerator.trim().slice(1)
    };
  }

  var virtualKeyCodes = {
    0: 'Digit0',
    1: 'Digit1',
    2: 'Digit2',
    3: 'Digit3',
    4: 'Digit4',
    5: 'Digit5',
    6: 'Digit6',
    7: 'Digit7',
    8: 'Digit8',
    9: 'Digit9',
    '-': 'Minus',
    '=': 'Equal',
    Q: 'KeyQ',
    W: 'KeyW',
    E: 'KeyE',
    R: 'KeyR',
    T: 'KeyT',
    Y: 'KeyY',
    U: 'KeyU',
    I: 'KeyI',
    O: 'KeyO',
    P: 'KeyP',
    '[': 'BracketLeft',
    ']': 'BracketRight',
    A: 'KeyA',
    S: 'KeyS',
    D: 'KeyD',
    F: 'KeyF',
    G: 'KeyG',
    H: 'KeyH',
    J: 'KeyJ',
    K: 'KeyK',
    L: 'KeyL',
    ';': 'Semicolon',
    '\'': 'Quote',
    '`': 'Backquote',
    '/': 'Backslash',
    Z: 'KeyZ',
    X: 'KeyX',
    C: 'KeyC',
    V: 'KeyV',
    B: 'KeyB',
    N: 'KeyN',
    M: 'KeyM',
    ',': 'Comma',
    '.': 'Period',
    '\\': 'Slash',
    ' ': 'Space'
  };

  function reduceKey(_ref6, key) {
    var accelerator = _ref6.accelerator,
        event = _ref6.event;

    if (key.length > 1 || event.key) {
      throw new Error('Unvalid keycode `' + key + '`.');
    }

    var code = key.toUpperCase() in virtualKeyCodes ? virtualKeyCodes[key.toUpperCase()] : null;

    return {
      event: (0, _assign2.default)({}, event, { key: key }, code ? { code: code } : null),
      accelerator: accelerator.trim().slice(key.length)
    };
  }

  var domKeys = (0, _assign2.default)((0, _create2.default)(null), {
    plus: 'Add',
    space: ' ',
    tab: 'Tab',
    backspace: 'Backspace',
    delete: 'Delete',
    insert: 'Insert',
    return: 'Return',
    enter: 'Return',
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    home: 'Home',
    end: 'End',
    pageup: 'PageUp',
    pagedown: 'PageDown',
    escape: 'Escape',
    esc: 'Escape',
    volumeup: 'AudioVolumeUp',
    volumedown: 'AudioVolumeDown',
    volumemute: 'AudioVolumeMute',
    medianexttrack: 'MediaTrackNext',
    mediaprevioustrack: 'MediaTrackPrevious',
    mediastop: 'MediaStop',
    mediaplaypause: 'MediaPlayPause',
    printscreen: 'PrintScreen'
  });

  for (var i = 1; i <= 24; i++) {
    domKeys['f' + i] = 'F' + i;
  }

  function reduceCode(_ref7, _ref8) {
    var accelerator = _ref7.accelerator,
        event = _ref7.event;
    var code = _ref8.code,
        key = _ref8.key;

    if (event.code) {
      throw new Error('Duplicated keycode `' + key + '`.');
    }

    return {
      event: (0, _assign2.default)({}, event, { key: key }, code ? { code: code } : null),
      accelerator: accelerator.trim().slice(key && key.length || 0)
    };
  }

  function toKeyEvent(accelerator) {
    var state = { accelerator: accelerator, event: {} };
    while (state.accelerator !== '') {
      var modifierMatch = state.accelerator.match(modifiers);
      if (modifierMatch) {
        var modifier = modifierMatch[0].toLowerCase();
        state = reduceModifier(state, modifier);
        if (state === UNSUPPORTED) {
          return { unsupportedKeyForPlatform: true };
        }
      } else if (state.accelerator.trim()[0] === '+') {
        state = reducePlus(state);
      } else {
        var codeMatch = state.accelerator.match(keyCodes);
        if (codeMatch) {
          var code = codeMatch[0].toLowerCase();
          if (code in domKeys) {
            state = reduceCode(state, {
              code: domKeys[code],
              key: code
            });
          } else {
            state = reduceKey(state, code);
          }
        } else {
          throw new Error('Unvalid accelerator: "' + state.accelerator + '"');
        }
      }
    }
    return state.event;
  }

  exports.UNSUPPORTED = UNSUPPORTED;
  exports.reduceModifier = reduceModifier;
  exports.reducePlus = reducePlus;
  exports.reduceKey = reduceKey;
  exports.reduceCode = reduceCode;
  exports.toKeyEvent = toKeyEvent;
}, function (module, exports, __webpack_require__) {

  if (typeof process !== 'undefined' && process.type === 'renderer') {
    module.exports = __webpack_require__(24);
  } else {
    module.exports = __webpack_require__(26);
  }
}, function (module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(7);
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

  exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

  function useColors() {
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }

  exports.formatters.j = function (v) {
    try {
      return (0, _stringify2.default)(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function (match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  function log() {
    return 'object' === (typeof console === 'undefined' ? 'undefined' : (0, _typeof4.default)(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {}
  }

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch (e) {}

    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  exports.enable(load());

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
}, function (module, exports) {

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;

  module.exports = function (val, options) {
    options = options || {};
    var type = typeof val === 'undefined' ? 'undefined' : (0, _typeof4.default)(val);
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + (0, _stringify2.default)(val));
  };

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (ms >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (ms >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (ms >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  function fmtLong(ms) {
    return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
  }

  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }
}, function (module, exports, __webpack_require__) {

  var tty = __webpack_require__(27);
  var util = __webpack_require__(3);

  exports = module.exports = __webpack_require__(7);
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  exports.colors = [6, 2, 3, 4, 5, 1];

  exports.inspectOpts = (0, _keys2.default)(process.env).filter(function (key) {
    return (/^debug_/i.test(key)
    );
  }).reduce(function (obj, key) {
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
      return k.toUpperCase();
    });

    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

  if (1 !== fd && 2 !== fd) {
    util.deprecate(function () {}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
  }

  var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);

  function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
  }

  exports.formatters.o = function (v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
      return str.trim();
    }).join(' ');
  };

  exports.formatters.O = function (v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var prefix = '  \x1B[3' + c + ';1m' + name + ' ' + '\x1B[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push('\x1B[3' + c + 'm+' + exports.humanize(this.diff) + '\x1B[0m');
    } else {
      args[0] = new Date().toUTCString() + ' ' + name + ' ' + args[0];
    }
  }

  function log() {
    return stream.write(util.format.apply(util, arguments) + '\n');
  }

  function save(namespaces) {
    if (null == namespaces) {
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  function load() {
    return process.env.DEBUG;
  }

  function createWritableStdioStream(fd) {
    var stream;
    var tty_wrap = process.binding('tty_wrap');

    switch (tty_wrap.guessHandleType(fd)) {
      case 'TTY':
        stream = new tty.WriteStream(fd);
        stream._type = 'tty';

        if (stream._handle && stream._handle.unref) {
          stream._handle.unref();
        }
        break;

      case 'FILE':
        var fs = __webpack_require__(1);
        stream = new fs.SyncWriteStream(fd, { autoClose: false });
        stream._type = 'fs';
        break;

      case 'PIPE':
      case 'TCP':
        var net = __webpack_require__(28);
        stream = new net.Socket({
          fd: fd,
          readable: false,
          writable: true
        });

        stream.readable = false;
        stream.read = null;
        stream._type = 'pipe';

        if (stream._handle && stream._handle.unref) {
          stream._handle.unref();
        }
        break;

      default:
        throw new Error('Implement me. Unknown stream file type!');
    }

    stream.fd = fd;

    stream._isStdio = true;

    return stream;
  }

  function init(debug) {
    debug.inspectOpts = {};

    var keys = (0, _keys2.default)(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  exports.enable(load());
}, function (module, exports) {

  module.exports = require("tty");
}, function (module, exports) {

  module.exports = require("net");
}, function (module, exports, __webpack_require__) {

  "use strict";

  var getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
  var isEnvSet = 'ELECTRON_IS_DEV' in process.env;

  module.exports = isEnvSet ? getFromEnv : process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath);
}, function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MOBX_DEVTOOLS = exports.APOLLO_DEVELOPER_TOOLS = exports.CYCLEJS_DEVTOOL = exports.REACT_PERF = exports.REDUX_DEVTOOLS = exports.VUEJS_DEVTOOLS = exports.ANGULARJS_BATARANG = exports.JQUERY_DEBUGGER = exports.BACKBONE_DEBUGGER = exports.REACT_DEVELOPER_TOOLS = exports.EMBER_INSPECTOR = undefined;

  var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator6.default) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : (0, _typeof4.default)(obj);
  } : function (obj) {
    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : (0, _typeof4.default)(obj);
  };

  var _electron = __webpack_require__(2);

  var _electron2 = _interopRequireDefault(_electron);

  var _fs = __webpack_require__(1);

  var _fs2 = _interopRequireDefault(_fs);

  var _path = __webpack_require__(0);

  var _path2 = _interopRequireDefault(_path);

  var _semver = __webpack_require__(31);

  var _semver2 = _interopRequireDefault(_semver);

  var _downloadChromeExtension = __webpack_require__(32);

  var _downloadChromeExtension2 = _interopRequireDefault(_downloadChromeExtension);

  var _utils = __webpack_require__(14);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var _ref = _electron.remote || _electron2.default,
      BrowserWindow = _ref.BrowserWindow;

  var IDMap = {};
  var IDMapPath = _path2.default.resolve((0, _utils.getPath)(), 'IDMap.json');
  if (_fs2.default.existsSync(IDMapPath)) {
    try {
      IDMap = JSON.parse(_fs2.default.readFileSync(IDMapPath, 'utf8'));
    } catch (err) {
      console.error('electron-devtools-installer: Invalid JSON present in the IDMap file');
    }
  }

  var install = function install(extensionReference) {
    var forceDownload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (Array.isArray(extensionReference)) {
      return _promise2.default.all(extensionReference.map(function (extension) {
        return install(extension, forceDownload);
      }));
    }
    var chromeStoreID = void 0;
    if ((typeof extensionReference === 'undefined' ? 'undefined' : _typeof(extensionReference)) === 'object' && extensionReference.id) {
      chromeStoreID = extensionReference.id;
      var electronVersion = process.versions.electron.split('-')[0];
      if (!_semver2.default.satisfies(electronVersion, extensionReference.electron)) {
        return _promise2.default.reject(new Error('Version of Electron: ' + electronVersion + ' does not match required range ' + extensionReference.electron + ' for extension ' + chromeStoreID));
      }
    } else if (typeof extensionReference === 'string') {
      chromeStoreID = extensionReference;
    } else {
      return _promise2.default.reject(new Error('Invalid extensionReference passed in: "' + extensionReference + '"'));
    }
    var extensionName = IDMap[chromeStoreID];
    var extensionInstalled = extensionName && BrowserWindow.getDevToolsExtensions && BrowserWindow.getDevToolsExtensions()[extensionName];
    if (!forceDownload && extensionInstalled) {
      return _promise2.default.resolve(IDMap[chromeStoreID]);
    }
    return (0, _downloadChromeExtension2.default)(chromeStoreID, forceDownload).then(function (extensionFolder) {
      if (extensionInstalled) {
        BrowserWindow.removeDevToolsExtension(extensionName);
      }
      var name = BrowserWindow.addDevToolsExtension(extensionFolder);
      _fs2.default.writeFileSync(IDMapPath, (0, _stringify2.default)((0, _assign2.default)(IDMap, _defineProperty({}, chromeStoreID, name))));
      return _promise2.default.resolve(name);
    });
  };

  exports.default = install;
  var EMBER_INSPECTOR = exports.EMBER_INSPECTOR = {
    id: 'bmdblncegkenkacieihfhpjfppoconhi',
    electron: '^1.2.1'
  };
  var REACT_DEVELOPER_TOOLS = exports.REACT_DEVELOPER_TOOLS = {
    id: 'fmkadmapgofadopljbjfkapdkoienihi',
    electron: '^1.2.1'
  };
  var BACKBONE_DEBUGGER = exports.BACKBONE_DEBUGGER = {
    id: 'bhljhndlimiafopmmhjlgfpnnchjjbhd',
    electron: '^1.2.1'
  };
  var JQUERY_DEBUGGER = exports.JQUERY_DEBUGGER = {
    id: 'dbhhnnnpaeobfddmlalhnehgclcmjimi',
    electron: '^1.2.1'
  };
  var ANGULARJS_BATARANG = exports.ANGULARJS_BATARANG = {
    id: 'ighdmehidhipcmcojjgiloacoafjmpfk',
    electron: '^1.2.1'
  };
  var VUEJS_DEVTOOLS = exports.VUEJS_DEVTOOLS = {
    id: 'nhdogjmejiglipccpnnnanhbledajbpd',
    electron: '^1.2.1'
  };
  var REDUX_DEVTOOLS = exports.REDUX_DEVTOOLS = {
    id: 'lmhkpmbekcpmknklioeibfkpmmfibljd',
    electron: '^1.2.1'
  };
  var REACT_PERF = exports.REACT_PERF = {
    id: 'hacmcodfllhbnekmghgdlplbdnahmhmm',
    electron: '^1.2.6'
  };
  var CYCLEJS_DEVTOOL = exports.CYCLEJS_DEVTOOL = {
    id: 'dfgplfmhhmdekalbpejekgfegkonjpfp',
    electron: '^1.2.1'
  };
  var APOLLO_DEVELOPER_TOOLS = exports.APOLLO_DEVELOPER_TOOLS = {
    id: 'jdkknkkbebbapilgoeccciglkfbmbnfm',
    electron: '^1.2.1'
  };
  var MOBX_DEVTOOLS = exports.MOBX_DEVTOOLS = {
    id: 'pfgnfdagidkfgccljigdamigbcnndkod',
    electron: '^1.2.1'
  };
}, function (module, exports) {

  exports = module.exports = SemVer;

  var debug;
  if ((typeof process === 'undefined' ? 'undefined' : (0, _typeof4.default)(process)) === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) debug = function debug() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift('SEMVER');
      console.log.apply(console, args);
    };else debug = function debug() {};

  exports.SEMVER_SPEC_VERSION = '2.0.0';

  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = _maxSafeInteger2.default || 9007199254740991;

  var MAX_SAFE_COMPONENT_LENGTH = 16;

  var re = exports.re = [];
  var src = exports.src = [];
  var R = 0;

  var NUMERICIDENTIFIER = R++;
  src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
  var NUMERICIDENTIFIERLOOSE = R++;
  src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';

  var NONNUMERICIDENTIFIER = R++;
  src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

  var MAINVERSION = R++;
  src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';

  var MAINVERSIONLOOSE = R++;
  src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

  var PRERELEASEIDENTIFIER = R++;
  src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';

  var PRERELEASEIDENTIFIERLOOSE = R++;
  src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';

  var PRERELEASE = R++;
  src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

  var PRERELEASELOOSE = R++;
  src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

  var BUILDIDENTIFIER = R++;
  src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

  var BUILD = R++;
  src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';

  var FULL = R++;
  var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';

  src[FULL] = '^' + FULLPLAIN + '$';

  var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';

  var LOOSE = R++;
  src[LOOSE] = '^' + LOOSEPLAIN + '$';

  var GTLT = R++;
  src[GTLT] = '((?:<|>)?=?)';

  var XRANGEIDENTIFIERLOOSE = R++;
  src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
  var XRANGEIDENTIFIER = R++;
  src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

  var XRANGEPLAIN = R++;
  src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';

  var XRANGEPLAINLOOSE = R++;
  src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';

  var XRANGE = R++;
  src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
  var XRANGELOOSE = R++;
  src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

  var COERCE = R++;
  src[COERCE] = '(?:^|[^\\d])' + '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:$|[^\\d])';

  var LONETILDE = R++;
  src[LONETILDE] = '(?:~>?)';

  var TILDETRIM = R++;
  src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
  re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
  var tildeTrimReplace = '$1~';

  var TILDE = R++;
  src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
  var TILDELOOSE = R++;
  src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

  var LONECARET = R++;
  src[LONECARET] = '(?:\\^)';

  var CARETTRIM = R++;
  src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
  re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
  var caretTrimReplace = '$1^';

  var CARET = R++;
  src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
  var CARETLOOSE = R++;
  src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

  var COMPARATORLOOSE = R++;
  src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
  var COMPARATOR = R++;
  src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';

  var COMPARATORTRIM = R++;
  src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

  re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
  var comparatorTrimReplace = '$1$2$3';

  var HYPHENRANGE = R++;
  src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';

  var HYPHENRANGELOOSE = R++;
  src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';

  var STAR = R++;
  src[STAR] = '(<|>)?=?\\s*\\*';

  for (var i = 0; i < R; i++) {
    debug(i, src[i]);
    if (!re[i]) re[i] = new RegExp(src[i]);
  }

  exports.parse = parse;
  function parse(version, loose) {
    if (version instanceof SemVer) return version;

    if (typeof version !== 'string') return null;

    if (version.length > MAX_LENGTH) return null;

    var r = loose ? re[LOOSE] : re[FULL];
    if (!r.test(version)) return null;

    try {
      return new SemVer(version, loose);
    } catch (er) {
      return null;
    }
  }

  exports.valid = valid;
  function valid(version, loose) {
    var v = parse(version, loose);
    return v ? v.version : null;
  }

  exports.clean = clean;
  function clean(version, loose) {
    var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
    return s ? s.version : null;
  }

  exports.SemVer = SemVer;

  function SemVer(version, loose) {
    if (version instanceof SemVer) {
      if (version.loose === loose) return version;else version = version.version;
    } else if (typeof version !== 'string') {
      throw new TypeError('Invalid Version: ' + version);
    }

    if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');

    if (!(this instanceof SemVer)) return new SemVer(version, loose);

    debug('SemVer', version, loose);
    this.loose = loose;
    var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

    if (!m) throw new TypeError('Invalid Version: ' + version);

    this.raw = version;

    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError('Invalid major version');

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version');

    if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
      }
      return id;
    });

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  SemVer.prototype.format = function () {
    this.version = this.major + '.' + this.minor + '.' + this.patch;
    if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
    return this.version;
  };

  SemVer.prototype.toString = function () {
    return this.version;
  };

  SemVer.prototype.compare = function (other) {
    debug('SemVer.compare', this.version, this.loose, other);
    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

    return this.compareMain(other) || this.comparePre(other);
  };

  SemVer.prototype.compareMain = function (other) {
    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  };

  SemVer.prototype.comparePre = function (other) {
    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

    if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;

    var i = 0;
    do {
      var a = this.prerelease[i];
      var b = other.prerelease[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) return 0;else if (b === undefined) return 1;else if (a === undefined) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
    } while (++i);
  };

  SemVer.prototype.inc = function (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break;
      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break;
      case 'prepatch':
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;

      case 'prerelease':
        if (this.prerelease.length === 0) this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;

      case 'major':
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'minor':
        if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'patch':
        if (this.prerelease.length === 0) this.patch++;
        this.prerelease = [];
        break;

      case 'pre':
        if (this.prerelease.length === 0) this.prerelease = [0];else {
          var i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) this.prerelease.push(0);
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
          } else this.prerelease = [identifier, 0];
        }
        break;

      default:
        throw new Error('invalid increment argument: ' + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  };

  exports.inc = inc;
  function inc(version, release, loose, identifier) {
    if (typeof loose === 'string') {
      identifier = loose;
      loose = undefined;
    }

    try {
      return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }

  exports.diff = diff;
  function diff(version1, version2) {
    if (eq(version1, version2)) {
      return null;
    } else {
      var v1 = parse(version1);
      var v2 = parse(version2);
      if (v1.prerelease.length || v2.prerelease.length) {
        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return 'pre' + key;
            }
          }
        }
        return 'prerelease';
      }
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return key;
          }
        }
      }
    }
  }

  exports.compareIdentifiers = compareIdentifiers;

  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);

    if (anum && bnum) {
      a = +a;
      b = +b;
    }

    return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
  }

  exports.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
  }

  exports.major = major;
  function major(a, loose) {
    return new SemVer(a, loose).major;
  }

  exports.minor = minor;
  function minor(a, loose) {
    return new SemVer(a, loose).minor;
  }

  exports.patch = patch;
  function patch(a, loose) {
    return new SemVer(a, loose).patch;
  }

  exports.compare = compare;
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
  }

  exports.compareLoose = compareLoose;
  function compareLoose(a, b) {
    return compare(a, b, true);
  }

  exports.rcompare = rcompare;
  function rcompare(a, b, loose) {
    return compare(b, a, loose);
  }

  exports.sort = sort;
  function sort(list, loose) {
    return list.sort(function (a, b) {
      return exports.compare(a, b, loose);
    });
  }

  exports.rsort = rsort;
  function rsort(list, loose) {
    return list.sort(function (a, b) {
      return exports.rcompare(a, b, loose);
    });
  }

  exports.gt = gt;
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }

  exports.lt = lt;
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }

  exports.eq = eq;
  function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
  }

  exports.neq = neq;
  function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
  }

  exports.gte = gte;
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }

  exports.lte = lte;
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }

  exports.cmp = cmp;
  function cmp(a, op, b, loose) {
    var ret;
    switch (op) {
      case '===':
        if ((typeof a === 'undefined' ? 'undefined' : (0, _typeof4.default)(a)) === 'object') a = a.version;
        if ((typeof b === 'undefined' ? 'undefined' : (0, _typeof4.default)(b)) === 'object') b = b.version;
        ret = a === b;
        break;
      case '!==':
        if ((typeof a === 'undefined' ? 'undefined' : (0, _typeof4.default)(a)) === 'object') a = a.version;
        if ((typeof b === 'undefined' ? 'undefined' : (0, _typeof4.default)(b)) === 'object') b = b.version;
        ret = a !== b;
        break;
      case '':case '=':case '==':
        ret = eq(a, b, loose);break;
      case '!=':
        ret = neq(a, b, loose);break;
      case '>':
        ret = gt(a, b, loose);break;
      case '>=':
        ret = gte(a, b, loose);break;
      case '<':
        ret = lt(a, b, loose);break;
      case '<=':
        ret = lte(a, b, loose);break;
      default:
        throw new TypeError('Invalid operator: ' + op);
    }
    return ret;
  }

  exports.Comparator = Comparator;
  function Comparator(comp, loose) {
    if (comp instanceof Comparator) {
      if (comp.loose === loose) return comp;else comp = comp.value;
    }

    if (!(this instanceof Comparator)) return new Comparator(comp, loose);

    debug('comparator', comp, loose);
    this.loose = loose;
    this.parse(comp);

    if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;

    debug('comp', this);
  }

  var ANY = {};
  Comparator.prototype.parse = function (comp) {
    var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var m = comp.match(r);

    if (!m) throw new TypeError('Invalid comparator: ' + comp);

    this.operator = m[1];
    if (this.operator === '=') this.operator = '';

    if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.loose);
  };

  Comparator.prototype.toString = function () {
    return this.value;
  };

  Comparator.prototype.test = function (version) {
    debug('Comparator.test', version, this.loose);

    if (this.semver === ANY) return true;

    if (typeof version === 'string') version = new SemVer(version, this.loose);

    return cmp(version, this.operator, this.semver, this.loose);
  };

  Comparator.prototype.intersects = function (comp, loose) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required');
    }

    var rangeTmp;

    if (this.operator === '') {
      rangeTmp = new Range(comp.value, loose);
      return satisfies(this.value, rangeTmp, loose);
    } else if (comp.operator === '') {
      rangeTmp = new Range(this.value, loose);
      return satisfies(comp.semver, rangeTmp, loose);
    }

    var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
    var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
    var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, loose) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
    var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, loose) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');

    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  };

  exports.Range = Range;
  function Range(range, loose) {
    if (range instanceof Range) {
      if (range.loose === loose) {
        return range;
      } else {
        return new Range(range.raw, loose);
      }
    }

    if (range instanceof Comparator) {
      return new Range(range.value, loose);
    }

    if (!(this instanceof Range)) return new Range(range, loose);

    this.loose = loose;

    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function (range) {
      return this.parseRange(range.trim());
    }, this).filter(function (c) {
      return c.length;
    });

    if (!this.set.length) {
      throw new TypeError('Invalid SemVer Range: ' + range);
    }

    this.format();
  }

  Range.prototype.format = function () {
    this.range = this.set.map(function (comps) {
      return comps.join(' ').trim();
    }).join('||').trim();
    return this.range;
  };

  Range.prototype.toString = function () {
    return this.range;
  };

  Range.prototype.parseRange = function (range) {
    var loose = this.loose;
    range = range.trim();
    debug('range', range, loose);

    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug('hyphen replace', range);

    range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
    debug('comparator trim', range, re[COMPARATORTRIM]);

    range = range.replace(re[TILDETRIM], tildeTrimReplace);

    range = range.replace(re[CARETTRIM], caretTrimReplace);

    range = range.split(/\s+/).join(' ');

    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var set = range.split(' ').map(function (comp) {
      return parseComparator(comp, loose);
    }).join(' ').split(/\s+/);
    if (this.loose) {
      set = set.filter(function (comp) {
        return !!comp.match(compRe);
      });
    }
    set = set.map(function (comp) {
      return new Comparator(comp, loose);
    });

    return set;
  };

  Range.prototype.intersects = function (range, loose) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required');
    }

    return this.set.some(function (thisComparators) {
      return thisComparators.every(function (thisComparator) {
        return range.set.some(function (rangeComparators) {
          return rangeComparators.every(function (rangeComparator) {
            return thisComparator.intersects(rangeComparator, loose);
          });
        });
      });
    });
  };

  exports.toComparators = toComparators;
  function toComparators(range, loose) {
    return new Range(range, loose).set.map(function (comp) {
      return comp.map(function (c) {
        return c.value;
      }).join(' ').trim().split(' ');
    });
  }

  function parseComparator(comp, loose) {
    debug('comp', comp);
    comp = replaceCarets(comp, loose);
    debug('caret', comp);
    comp = replaceTildes(comp, loose);
    debug('tildes', comp);
    comp = replaceXRanges(comp, loose);
    debug('xrange', comp);
    comp = replaceStars(comp, loose);
    debug('stars', comp);
    return comp;
  }

  function isX(id) {
    return !id || id.toLowerCase() === 'x' || id === '*';
  }

  function replaceTildes(comp, loose) {
    return comp.trim().split(/\s+/).map(function (comp) {
      return replaceTilde(comp, loose);
    }).join(' ');
  }

  function replaceTilde(comp, loose) {
    var r = loose ? re[TILDELOOSE] : re[TILDE];
    return comp.replace(r, function (_, M, m, p, pr) {
      debug('tilde', comp, _, M, m, p, pr);
      var ret;

      if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
        debug('replaceTilde pr', pr);
        if (pr.charAt(0) !== '-') pr = '-' + pr;
        ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
      } else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';

      debug('tilde return', ret);
      return ret;
    });
  }

  function replaceCarets(comp, loose) {
    return comp.trim().split(/\s+/).map(function (comp) {
      return replaceCaret(comp, loose);
    }).join(' ');
  }

  function replaceCaret(comp, loose) {
    debug('caret', comp, loose);
    var r = loose ? re[CARETLOOSE] : re[CARET];
    return comp.replace(r, function (_, M, m, p, pr) {
      debug('caret', comp, _, M, m, p, pr);
      var ret;

      if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
        if (M === '0') ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
      } else if (pr) {
        debug('replaceCaret pr', pr);
        if (pr.charAt(0) !== '-') pr = '-' + pr;
        if (M === '0') {
          if (m === '0') ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
        } else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
      } else {
        debug('no pr');
        if (M === '0') {
          if (m === '0') ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
        } else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
      }

      debug('caret return', ret);
      return ret;
    });
  }

  function replaceXRanges(comp, loose) {
    debug('replaceXRanges', comp, loose);
    return comp.split(/\s+/).map(function (comp) {
      return replaceXRange(comp, loose);
    }).join(' ');
  }

  function replaceXRange(comp, loose) {
    comp = comp.trim();
    var r = loose ? re[XRANGELOOSE] : re[XRANGE];
    return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
      debug('xRange', comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;

      if (gtlt === '=' && anyX) gtlt = '';

      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          ret = '<0.0.0';
        } else {
          ret = '*';
        }
      } else if (gtlt && anyX) {
        if (xm) m = 0;
        if (xp) p = 0;

        if (gtlt === '>') {
          gtlt = '>=';
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else if (xp) {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === '<=') {
          gtlt = '<';
          if (xm) M = +M + 1;else m = +m + 1;
        }

        ret = gtlt + M + '.' + m + '.' + p;
      } else if (xm) {
        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
      } else if (xp) {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      }

      debug('xRange return', ret);

      return ret;
    });
  }

  function replaceStars(comp, loose) {
    debug('replaceStars', comp, loose);

    return comp.trim().replace(re[STAR], '');
  }

  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {

    if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;

    if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;

    return (from + ' ' + to).trim();
  }

  Range.prototype.test = function (version) {
    if (!version) return false;

    if (typeof version === 'string') version = new SemVer(version, this.loose);

    for (var i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version)) return true;
    }
    return false;
  };

  function testSet(set, version) {
    for (var i = 0; i < set.length; i++) {
      if (!set[i].test(version)) return false;
    }

    if (version.prerelease.length) {
      for (var i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === ANY) continue;

        if (set[i].semver.prerelease.length > 0) {
          var allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
        }
      }

      return false;
    }

    return true;
  }

  exports.satisfies = satisfies;
  function satisfies(version, range, loose) {
    try {
      range = new Range(range, loose);
    } catch (er) {
      return false;
    }
    return range.test(version);
  }

  exports.maxSatisfying = maxSatisfying;
  function maxSatisfying(versions, range, loose) {
    var max = null;
    var maxSV = null;
    try {
      var rangeObj = new Range(range, loose);
    } catch (er) {
      return null;
    }
    versions.forEach(function (v) {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer(max, loose);
        }
      }
    });
    return max;
  }

  exports.minSatisfying = minSatisfying;
  function minSatisfying(versions, range, loose) {
    var min = null;
    var minSV = null;
    try {
      var rangeObj = new Range(range, loose);
    } catch (er) {
      return null;
    }
    versions.forEach(function (v) {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer(min, loose);
        }
      }
    });
    return min;
  }

  exports.validRange = validRange;
  function validRange(range, loose) {
    try {
      return new Range(range, loose).range || '*';
    } catch (er) {
      return null;
    }
  }

  exports.ltr = ltr;
  function ltr(version, range, loose) {
    return outside(version, range, '<', loose);
  }

  exports.gtr = gtr;
  function gtr(version, range, loose) {
    return outside(version, range, '>', loose);
  }

  exports.outside = outside;
  function outside(version, range, hilo, loose) {
    version = new SemVer(version, loose);
    range = new Range(range, loose);

    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case '>':
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = '>';
        ecomp = '>=';
        break;
      case '<':
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = '<';
        ecomp = '<=';
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }

    if (satisfies(version, range, loose)) {
      return false;
    }

    for (var i = 0; i < range.set.length; ++i) {
      var comparators = range.set[i];

      var high = null;
      var low = null;

      comparators.forEach(function (comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator('>=0.0.0');
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, loose)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, loose)) {
          low = comparator;
        }
      });

      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }

      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  }

  exports.prerelease = prerelease;
  function prerelease(version, loose) {
    var parsed = parse(version, loose);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  }

  exports.intersects = intersects;
  function intersects(r1, r2, loose) {
    r1 = new Range(r1, loose);
    r2 = new Range(r2, loose);
    return r1.intersects(r2);
  }

  exports.coerce = coerce;
  function coerce(version) {
    if (version instanceof SemVer) return version;

    if (typeof version !== 'string') return null;

    var match = version.match(re[COERCE]);

    if (match == null) return null;

    return parse((match[1] || '0') + '.' + (match[2] || '0') + '.' + (match[3] || '0'));
  }
}, function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _fs = __webpack_require__(1);

  var _fs2 = _interopRequireDefault(_fs);

  var _path = __webpack_require__(0);

  var _path2 = _interopRequireDefault(_path);

  var _rimraf = __webpack_require__(33);

  var _rimraf2 = _interopRequireDefault(_rimraf);

  var _crossUnzip = __webpack_require__(43);

  var _crossUnzip2 = _interopRequireDefault(_crossUnzip);

  var _utils = __webpack_require__(14);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var downloadChromeExtension = function downloadChromeExtension(chromeStoreID, forceDownload) {
    var attempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    var extensionsStore = (0, _utils.getPath)();
    if (!_fs2.default.existsSync(extensionsStore)) {
      _fs2.default.mkdirSync(extensionsStore);
    }
    var extensionFolder = _path2.default.resolve(extensionsStore + '/' + chromeStoreID);
    return new _promise2.default(function (resolve, reject) {
      if (!_fs2.default.existsSync(extensionFolder) || forceDownload) {
        if (_fs2.default.existsSync(extensionFolder)) {
          _rimraf2.default.sync(extensionFolder);
        }
        var fileURL = 'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D' + chromeStoreID + '%26uc&prodversion=32';
        var filePath = _path2.default.resolve(extensionFolder + '.crx');
        (0, _utils.downloadFile)(fileURL, filePath).then(function () {
          (0, _crossUnzip2.default)(filePath, extensionFolder, function (err) {
            if (err && !_fs2.default.existsSync(_path2.default.resolve(extensionFolder, 'manifest.json'))) {
              return reject(err);
            }
            (0, _utils.changePermissions)(extensionFolder, 755);
            resolve(extensionFolder);
          });
        }).catch(function (err) {
          console.log('Failed to fetch extension, trying ' + (attempts - 1) + ' more times');
          if (attempts <= 1) {
            return reject(err);
          }
          setTimeout(function () {
            downloadChromeExtension(chromeStoreID, forceDownload, attempts - 1).then(resolve).catch(reject);
          }, 200);
        });
      } else {
        resolve(extensionFolder);
      }
    });
  };

  exports.default = downloadChromeExtension;
}, function (module, exports, __webpack_require__) {

  module.exports = rimraf;
  rimraf.sync = rimrafSync;

  var assert = __webpack_require__(4);
  var path = __webpack_require__(0);
  var fs = __webpack_require__(1);
  var glob = __webpack_require__(9);
  var _0666 = parseInt('666', 8);

  var defaultGlobOpts = {
    nosort: true,
    silent: true
  };

  var timeout = 0;

  var isWindows = process.platform === "win32";

  function defaults(options) {
    var methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
    methods.forEach(function (m) {
      options[m] = options[m] || fs[m];
      m = m + 'Sync';
      options[m] = options[m] || fs[m];
    });

    options.maxBusyTries = options.maxBusyTries || 3;
    options.emfileWait = options.emfileWait || 1000;
    if (options.glob === false) {
      options.disableGlob = true;
    }
    options.disableGlob = options.disableGlob || false;
    options.glob = options.glob || defaultGlobOpts;
  }

  function rimraf(p, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    assert(p, 'rimraf: missing path');
    assert.equal(typeof p === 'undefined' ? 'undefined' : (0, _typeof4.default)(p), 'string', 'rimraf: path should be a string');
    assert.equal(typeof cb === 'undefined' ? 'undefined' : (0, _typeof4.default)(cb), 'function', 'rimraf: callback function required');
    assert(options, 'rimraf: invalid options argument provided');
    assert.equal(typeof options === 'undefined' ? 'undefined' : (0, _typeof4.default)(options), 'object', 'rimraf: options should be object');

    defaults(options);

    var busyTries = 0;
    var errState = null;
    var n = 0;

    if (options.disableGlob || !glob.hasMagic(p)) return afterGlob(null, [p]);

    options.lstat(p, function (er, stat) {
      if (!er) return afterGlob(null, [p]);

      glob(p, options.glob, afterGlob);
    });

    function next(er) {
      errState = errState || er;
      if (--n === 0) cb(errState);
    }

    function afterGlob(er, results) {
      if (er) return cb(er);

      n = results.length;
      if (n === 0) return cb();

      results.forEach(function (p) {
        rimraf_(p, options, function CB(er) {
          if (er) {
            if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++;
              var time = busyTries * 100;

              return setTimeout(function () {
                rimraf_(p, options, CB);
              }, time);
            }

            if (er.code === "EMFILE" && timeout < options.emfileWait) {
              return setTimeout(function () {
                rimraf_(p, options, CB);
              }, timeout++);
            }

            if (er.code === "ENOENT") er = null;
          }

          timeout = 0;
          next(er);
        });
      });
    }
  }

  function rimraf_(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');

    options.lstat(p, function (er, st) {
      if (er && er.code === "ENOENT") return cb(null);

      if (er && er.code === "EPERM" && isWindows) fixWinEPERM(p, options, er, cb);

      if (st && st.isDirectory()) return rmdir(p, options, er, cb);

      options.unlink(p, function (er) {
        if (er) {
          if (er.code === "ENOENT") return cb(null);
          if (er.code === "EPERM") return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
          if (er.code === "EISDIR") return rmdir(p, options, er, cb);
        }
        return cb(er);
      });
    });
  }

  function fixWinEPERM(p, options, er, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');
    if (er) assert(er instanceof Error);

    options.chmod(p, _0666, function (er2) {
      if (er2) cb(er2.code === "ENOENT" ? null : er);else options.stat(p, function (er3, stats) {
        if (er3) cb(er3.code === "ENOENT" ? null : er);else if (stats.isDirectory()) rmdir(p, options, er, cb);else options.unlink(p, cb);
      });
    });
  }

  function fixWinEPERMSync(p, options, er) {
    assert(p);
    assert(options);
    if (er) assert(er instanceof Error);

    try {
      options.chmodSync(p, _0666);
    } catch (er2) {
      if (er2.code === "ENOENT") return;else throw er;
    }

    try {
      var stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT") return;else throw er;
    }

    if (stats.isDirectory()) rmdirSync(p, options, er);else options.unlinkSync(p);
  }

  function rmdir(p, options, originalEr, cb) {
    assert(p);
    assert(options);
    if (originalEr) assert(originalEr instanceof Error);
    assert(typeof cb === 'function');

    options.rmdir(p, function (er) {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options, cb);else if (er && er.code === "ENOTDIR") cb(originalEr);else cb(er);
    });
  }

  function rmkids(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === 'function');

    options.readdir(p, function (er, files) {
      if (er) return cb(er);
      var n = files.length;
      if (n === 0) return options.rmdir(p, cb);
      var errState;
      files.forEach(function (f) {
        rimraf(path.join(p, f), options, function (er) {
          if (errState) return;
          if (er) return cb(errState = er);
          if (--n === 0) options.rmdir(p, cb);
        });
      });
    });
  }

  function rimrafSync(p, options) {
    options = options || {};
    defaults(options);

    assert(p, 'rimraf: missing path');
    assert.equal(typeof p === 'undefined' ? 'undefined' : (0, _typeof4.default)(p), 'string', 'rimraf: path should be a string');
    assert(options, 'rimraf: missing options');
    assert.equal(typeof options === 'undefined' ? 'undefined' : (0, _typeof4.default)(options), 'object', 'rimraf: options should be object');

    var results;

    if (options.disableGlob || !glob.hasMagic(p)) {
      results = [p];
    } else {
      try {
        options.lstatSync(p);
        results = [p];
      } catch (er) {
        results = glob.sync(p, options.glob);
      }
    }

    if (!results.length) return;

    for (var i = 0; i < results.length; i++) {
      var p = results[i];

      try {
        var st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") return;

        if (er.code === "EPERM" && isWindows) fixWinEPERMSync(p, options, er);
      }

      try {
        if (st && st.isDirectory()) rmdirSync(p, options, null);else options.unlinkSync(p);
      } catch (er) {
        if (er.code === "ENOENT") return;
        if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        if (er.code !== "EISDIR") throw er;

        rmdirSync(p, options, er);
      }
    }
  }

  function rmdirSync(p, options, originalEr) {
    assert(p);
    assert(options);
    if (originalEr) assert(originalEr instanceof Error);

    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOENT") return;
      if (er.code === "ENOTDIR") throw originalEr;
      if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options);
    }
  }

  function rmkidsSync(p, options) {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach(function (f) {
      rimrafSync(path.join(p, f), options);
    });

    var retries = isWindows ? 100 : 1;
    var i = 0;
    do {
      var threw = true;
      try {
        var ret = options.rmdirSync(p, options);
        threw = false;
        return ret;
      } finally {
        if (++i < retries && threw) continue;
      }
    } while (true);
  }
}, function (module, exports, __webpack_require__) {

  var pathModule = __webpack_require__(0);
  var isWindows = process.platform === 'win32';
  var fs = __webpack_require__(1);

  var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

  function rethrow() {
    var callback;
    if (DEBUG) {
      var backtrace = new Error();
      callback = debugCallback;
    } else callback = missingCallback;

    return callback;

    function debugCallback(err) {
      if (err) {
        backtrace.message = err.message;
        err = backtrace;
        missingCallback(err);
      }
    }

    function missingCallback(err) {
      if (err) {
        if (process.throwDeprecation) throw err;else if (!process.noDeprecation) {
            var msg = 'fs: missing callback ' + (err.stack || err.message);
            if (process.traceDeprecation) console.trace(msg);else console.error(msg);
          }
      }
    }
  }

  function maybeCallback(cb) {
    return typeof cb === 'function' ? cb : rethrow();
  }

  var normalize = pathModule.normalize;

  if (isWindows) {
    var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
  } else {
    var nextPartRe = /(.*?)(?:[\/]+|$)/g;
  }

  if (isWindows) {
    var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
    var splitRootRe = /^[\/]*/;
  }

  exports.realpathSync = function realpathSync(p, cache) {
    p = pathModule.resolve(p);

    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return cache[p];
    }

    var original = p,
        seenLinks = {},
        knownHard = {};

    var pos;

    var current;

    var base;

    var previous;

    start();

    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = '';

      if (isWindows && !knownHard[base]) {
        fs.lstatSync(base);
        knownHard[base] = true;
      }
    }

    while (pos < p.length) {
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;

      if (knownHard[base] || cache && cache[base] === base) {
        continue;
      }

      var resolvedLink;
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        resolvedLink = cache[base];
      } else {
        var stat = fs.lstatSync(base);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache) cache[base] = base;
          continue;
        }

        var linkTarget = null;
        if (!isWindows) {
          var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            linkTarget = seenLinks[id];
          }
        }
        if (linkTarget === null) {
          fs.statSync(base);
          linkTarget = fs.readlinkSync(base);
        }
        resolvedLink = pathModule.resolve(previous, linkTarget);

        if (cache) cache[base] = resolvedLink;
        if (!isWindows) seenLinks[id] = linkTarget;
      }

      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }

    if (cache) cache[original] = p;

    return p;
  };

  exports.realpath = function realpath(p, cache, cb) {
    if (typeof cb !== 'function') {
      cb = maybeCallback(cache);
      cache = null;
    }

    p = pathModule.resolve(p);

    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return process.nextTick(cb.bind(null, null, cache[p]));
    }

    var original = p,
        seenLinks = {},
        knownHard = {};

    var pos;

    var current;

    var base;

    var previous;

    start();

    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = '';

      if (isWindows && !knownHard[base]) {
        fs.lstat(base, function (err) {
          if (err) return cb(err);
          knownHard[base] = true;
          LOOP();
        });
      } else {
        process.nextTick(LOOP);
      }
    }

    function LOOP() {
      if (pos >= p.length) {
        if (cache) cache[original] = p;
        return cb(null, p);
      }

      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;

      if (knownHard[base] || cache && cache[base] === base) {
        return process.nextTick(LOOP);
      }

      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        return gotResolvedLink(cache[base]);
      }

      return fs.lstat(base, gotStat);
    }

    function gotStat(err, stat) {
      if (err) return cb(err);

      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        return process.nextTick(LOOP);
      }

      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          return gotTarget(null, seenLinks[id], base);
        }
      }
      fs.stat(base, function (err) {
        if (err) return cb(err);

        fs.readlink(base, function (err, target) {
          if (!isWindows) seenLinks[id] = target;
          gotTarget(err, target);
        });
      });
    }

    function gotTarget(err, target, base) {
      if (err) return cb(err);

      var resolvedLink = pathModule.resolve(previous, target);
      if (cache) cache[base] = resolvedLink;
      gotResolvedLink(resolvedLink);
    }

    function gotResolvedLink(resolvedLink) {
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
  };
}, function (module, exports, __webpack_require__) {

  var concatMap = __webpack_require__(36);
  var balanced = __webpack_require__(37);

  module.exports = expandTop;

  var escSlash = '\0SLASH' + Math.random() + '\0';
  var escOpen = '\0OPEN' + Math.random() + '\0';
  var escClose = '\0CLOSE' + Math.random() + '\0';
  var escComma = '\0COMMA' + Math.random() + '\0';
  var escPeriod = '\0PERIOD' + Math.random() + '\0';

  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }

  function escapeBraces(str) {
    return str.split('\\\\').join(escSlash).split('\\{').join(escOpen).split('\\}').join(escClose).split('\\,').join(escComma).split('\\.').join(escPeriod);
  }

  function unescapeBraces(str) {
    return str.split(escSlash).join('\\').split(escOpen).join('{').split(escClose).join('}').split(escComma).join(',').split(escPeriod).join('.');
  }

  function parseCommaParts(str) {
    if (!str) return [''];

    var parts = [];
    var m = balanced('{', '}', str);

    if (!m) return str.split(',');

    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(',');

    p[p.length - 1] += '{' + body + '}';
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }

    parts.push.apply(parts, p);

    return parts;
  }

  function expandTop(str) {
    if (!str) return [];

    if (str.substr(0, 2) === '{}') {
      str = '\\{\\}' + str.substr(2);
    }

    return expand(escapeBraces(str), true).map(unescapeBraces);
  }

  function identity(e) {
    return e;
  }

  function embrace(str) {
    return '{' + str + '}';
  }
  function isPadded(el) {
    return (/^-?0\d/.test(el)
    );
  }

  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }

  function expand(str, isTop) {
    var expansions = [];

    var m = balanced('{', '}', str);
    if (!m || /\$$/.test(m.pre)) return [str];

    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(',') >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }

    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [''];
          return post.map(function (p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [''];

    var N;

    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);

      N = [];

      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\') c = '';
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0) c = '-' + z + c.slice(1);else c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function (el) {
        return expand(el, false);
      });
    }

    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) expansions.push(expansion);
      }
    }

    return expansions;
  }
}, function (module, exports) {

  module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x)) res.push.apply(res, x);else res.push(x);
    }
    return res;
  };

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
}, function (module, exports, __webpack_require__) {

  "use strict";

  module.exports = balanced;
  function balanced(a, b, str) {
    if (a instanceof RegExp) a = maybeMatch(a, str);
    if (b instanceof RegExp) b = maybeMatch(b, str);

    var r = range(a, b, str);

    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }

  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }

  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;

    if (ai >= 0 && bi > 0) {
      begs = [];
      left = str.length;

      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }

          bi = str.indexOf(b, i + 1);
        }

        i = ai < bi && ai >= 0 ? ai : bi;
      }

      if (begs.length) {
        result = [left, right];
      }
    }

    return result;
  }
}, function (module, exports, __webpack_require__) {

  try {
    var util = __webpack_require__(3);
    if (typeof util.inherits !== 'function') throw '';
    module.exports = util.inherits;
  } catch (e) {
    module.exports = __webpack_require__(39);
  }
}, function (module, exports) {

  if (typeof _create2.default === 'function') {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = (0, _create2.default)(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function TempCtor() {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
}, function (module, exports) {

  module.exports = require("events");
}, function (module, exports, __webpack_require__) {

  module.exports = globSync;
  globSync.GlobSync = GlobSync;

  var fs = __webpack_require__(1);
  var rp = __webpack_require__(10);
  var minimatch = __webpack_require__(5);
  var Minimatch = minimatch.Minimatch;
  var Glob = __webpack_require__(9).Glob;
  var util = __webpack_require__(3);
  var path = __webpack_require__(0);
  var assert = __webpack_require__(4);
  var isAbsolute = __webpack_require__(6);
  var common = __webpack_require__(11);
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;

  function globSync(pattern, options) {
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');

    return new GlobSync(pattern, options).found;
  }

  function GlobSync(pattern, options) {
    if (!pattern) throw new Error('must provide pattern');

    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');

    if (!(this instanceof GlobSync)) return new GlobSync(pattern, options);

    setopts(this, pattern, options);

    if (this.noprocess) return this;

    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }
    this._finish();
  }

  GlobSync.prototype._finish = function () {
    assert(this instanceof GlobSync);
    if (this.realpath) {
      var self = this;
      this.matches.forEach(function (matchset, index) {
        var set = self.matches[index] = (0, _create2.default)(null);
        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = rp.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === 'stat') set[self._makeAbs(p)] = true;else throw er;
          }
        }
      });
    }
    common.finish(this);
  };

  GlobSync.prototype._process = function (pattern, index, inGlobStar) {
    assert(this instanceof GlobSync);

    var n = 0;
    while (typeof pattern[n] === 'string') {
      n++;
    }

    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join('/'), index);
        return;

      case 0:
        prefix = null;
        break;

      default:
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n);

    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read);

    if (childrenIgnored(this, read)) return;

    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };

  GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);

    if (!entries) return;

    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';

    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== '.' || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m) matchedEntries.push(e);
      }
    }

    var len = matchedEntries.length;

    if (len === 0) return;

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = (0, _create2.default)(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix.slice(-1) !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path.join(this.root, e);
        }
        this._emitMatch(index, e);
      }

      return;
    }

    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) newPattern = [prefix, e];else newPattern = [e];
      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };

  GlobSync.prototype._emitMatch = function (index, e) {
    if (isIgnored(this, e)) return;

    var abs = this._makeAbs(e);

    if (this.mark) e = this._mark(e);

    if (this.absolute) {
      e = abs;
    }

    if (this.matches[index][e]) return;

    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    this.matches[index][e] = true;

    if (this.stat) this._stat(e);
  };

  GlobSync.prototype._readdirInGlobStar = function (abs) {
    if (this.follow) return this._readdir(abs, false);

    var entries;
    var lstat;
    var stat;
    try {
      lstat = fs.lstatSync(abs);
    } catch (er) {
      if (er.code === 'ENOENT') {
        return null;
      }
    }

    var isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[abs] = isSym;

    if (!isSym && lstat && !lstat.isDirectory()) this.cache[abs] = 'FILE';else entries = this._readdir(abs, false);

    return entries;
  };

  GlobSync.prototype._readdir = function (abs, inGlobStar) {
    var entries;

    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs);

    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return null;

      if (Array.isArray(c)) return c;
    }

    try {
      return this._readdirEntries(abs, fs.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);
      return null;
    }
  };

  GlobSync.prototype._readdirEntries = function (abs, entries) {
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries;

    return entries;
  };

  GlobSync.prototype._readdirError = function (f, er) {
    switch (er.code) {
      case 'ENOTSUP':
      case 'ENOTDIR':
        var abs = this._makeAbs(f);
        this.cache[abs] = 'FILE';
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error;
        }
        break;

      case 'ENOENT':
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) throw er;
        if (!this.silent) console.error('glob error', er);
        break;
    }
  };

  GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

    var entries = this._readdir(abs, inGlobStar);

    if (!entries) return;

    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    this._process(noGlobStar, index, false);

    var len = entries.length;
    var isSym = this.symlinks[abs];

    if (isSym && inGlobStar) return;

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;

      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true);

      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true);
    }
  };

  GlobSync.prototype._processSimple = function (prefix, index) {
    var exists = this._stat(prefix);

    if (!this.matches[index]) this.matches[index] = (0, _create2.default)(null);

    if (!exists) return;

    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === '/') {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    this._emitMatch(index, prefix);
  };

  GlobSync.prototype._stat = function (f) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === '/';

    if (f.length > this.maxLength) return false;

    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];

      if (Array.isArray(c)) c = 'DIR';

      if (!needDir || c === 'DIR') return c;

      if (needDir && c === 'FILE') return false;
    }

    var exists;
    var stat = this.statCache[abs];
    if (!stat) {
      var lstat;
      try {
        lstat = fs.lstatSync(abs);
      } catch (er) {
        if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
          this.statCache[abs] = false;
          return false;
        }
      }

      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = fs.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }

    this.statCache[abs] = stat;

    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';

    this.cache[abs] = this.cache[abs] || c;

    if (needDir && c === 'FILE') return false;

    return c;
  };

  GlobSync.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  GlobSync.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };
}, function (module, exports, __webpack_require__) {

  var wrappy = __webpack_require__(12);
  var reqs = (0, _create2.default)(null);
  var once = __webpack_require__(13);

  module.exports = wrappy(inflight);

  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }

  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);

      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          cbs.splice(0, len);
          process.nextTick(function () {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }

  function slice(args) {
    var length = args.length;
    var array = [];

    for (var i = 0; i < length; i++) {
      array[i] = args[i];
    }return array;
  }
}, function (module, exports, __webpack_require__) {

  "use strict";

  var spawn = __webpack_require__(44).spawn;
  var slice = Array.prototype.slice;

  var unzip = process.platform === 'win32' ? forWin32 : forUnix;
  unzip.unzip = unzip;
  module.exports = unzip;

  function forWin32(inPath, outPath, callback) {
    var _7z = __webpack_require__(45)['7z'];

    run(_7z, ['x', inPath, '-y', '-o' + outPath], callback);
  }

  function forUnix(inPath, outPath, callback) {
    run('unzip', ['-o', inPath, '-d', outPath], callback);
  }

  function run(bin, args, callback) {
    callback = onceify(callback);

    var prc = spawn(bin, args, {
      stdio: 'ignore'
    });
    prc.on('error', function (err) {
      callback(err);
    });
    prc.on('exit', function (code) {
      callback(code ? new Error('Exited with code ' + code) : null);
    });
  }

  function onceify(fn) {
    var called = false;
    return function () {
      if (called) return;
      called = true;
      fn.apply(this, slice.call(arguments));
    };
  }
}, function (module, exports) {

  module.exports = require("child_process");
}, function (module, exports, __webpack_require__) {
  (function (__dirname) {
    var resolve = __webpack_require__(0).resolve;
    var bin = __webpack_require__(46).bin;

    module.exports = map_obj(bin, function (v) {
      return resolve(__dirname, v);
    });

    function map_obj(obj, fn) {
      return (0, _keys2.default)(obj).reduce(function (m, k) {
        m[k] = fn(obj[k]);
        return m;
      }, {});
    }
  }).call(exports, "node_modules/7zip");
}, function (module, exports) {

  module.exports = { "_from": "7zip@0.0.6", "_id": "7zip@0.0.6", "_inBundle": false, "_integrity": "sha1-nK+xca+CMpSQNTtIFvAzR6oVCjA=", "_location": "/7zip", "_phantomChildren": {}, "_requested": { "type": "version", "registry": true, "raw": "7zip@0.0.6", "name": "7zip", "escapedName": "7zip", "rawSpec": "0.0.6", "saveSpec": null, "fetchSpec": "0.0.6" }, "_requiredBy": ["/electron-devtools-installer"], "_resolved": "http://registry.npm.taobao.org/7zip/download/7zip-0.0.6.tgz", "_shasum": "9cafb171af82329490353b4816f03347aa150a30", "_spec": "7zip@0.0.6", "_where": "/Users/xuyunfang/Downloads/github项目/my-project/node_modules/electron-devtools-installer", "bin": { "7z": "7zip-lite/7z.exe" }, "bugs": { "url": "https://github.com/fritx/win-7zip/issues" }, "bundleDependencies": false, "deprecated": false, "description": "7zip Windows Package via Node.js", "homepage": "https://github.com/fritx/win-7zip#readme", "keywords": ["7z", "7zip", "7-zip", "windows", "install"], "license": "GNU LGPL", "main": "index.js", "name": "7zip", "repository": { "type": "git", "url": "git+ssh://git@github.com/fritx/win-7zip.git" }, "scripts": { "test": "mocha" }, "version": "0.0.6" };
}, function (module, exports) {

  module.exports = require("https");
}]);
//# sourceMappingURL=main.js.map