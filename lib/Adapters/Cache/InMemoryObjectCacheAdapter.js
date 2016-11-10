'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InMemoryObjectCacheAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InMemoryCache = require('./InMemoryCache');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InMemoryObjectCacheAdapter = exports.InMemoryObjectCacheAdapter = function () {
  function InMemoryObjectCacheAdapter(ctx) {
    _classCallCheck(this, InMemoryObjectCacheAdapter);

    this.cache = new _InMemoryCache.InMemoryCache(ctx);
  }

  _createClass(InMemoryObjectCacheAdapter, [{
    key: 'get',
    value: function get(key) {
      return Promise.resolve(this.cache.get(key));
    }
  }, {
    key: 'put',
    value: function put(key, value, ttl) {
      this.cache.put(key, value, ttl);
      return Promise.resolve();
    }
  }, {
    key: 'del',
    value: function del(key) {
      this.cache.del(key);
      return Promise.resolve();
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.cache.clear();
      return Promise.resolve();
    }
  }]);

  return InMemoryObjectCacheAdapter;
}();

exports.default = InMemoryObjectCacheAdapter;