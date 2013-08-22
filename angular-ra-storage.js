(function() {
  'use strict';

  function isSupported() {
    try {
      return ('localStorage' in window && window.localStorage !== null);
    } catch (e) {
      return false;
    }
  }


  function isPrivateBrowsing() {
    try {
      localStorage.setItem('storage_test', 1);
      localStorage.removeItem('storage_test');

      return false;
    } catch (e) {
      if (e.code === 22 && e.name === 'QUOTA_EXCEEDED_ERR') {
        return true;
      }

      return false;
    }
  }


  angular.module('ra.storage', []).

    provider('raStorage', function() {
      var config = {
        prefix: false,
        cookie: { path: '/' }
      };

      return {
        config: function(_config) {
          _.merge(config, _config);
        },

        $get: function($log) {
          return function(storage_key, default_value) {
            var storage,
                supported = !!(isSupported() && !isPrivateBrowsing());


            // Prefix the key if necessary
            if (config.prefix) {
              storage_key = config.prefix + '.' + storage_key;
            }

            if (supported) {
              storage = window.localStorage;
            } else {
              storage = {
                setItem: function(key, value) {
                  $.cookie(key, value, { path: '/' });
                },

                getItem: function(key) {
                  return $.cookie(key);
                },

                removeItem: function(key) {
                  $.removeCookie(key);
                }
              };
            }

            var set = function(obj) {
              obj = angular.toJson(obj);

              return storage.setItem(storage_key, obj);
            };

            var get = function() {
              var value = storage.getItem(storage_key);

              if (value) {
                try {
                  value = angular.fromJson(value);
                } catch (e) {
                  $log.error(e);
                }
              }

              if (value === null && default_value) {
                value = default_value;
              }

              return value;
            };

            var destroy = function() {
              return storage.removeItem(storage_key);
            };

            var checkObject = function(obj) {
              if (angular.isObject(obj) === false) {
                throw new Error('Type mismatch: trying to get/set a key for the stored value of type ' + typeof obj);
              }
            };

            return {
              set: function(key_or_value, value) {
                if (arguments.length === 1) {
                  return set(key_or_value);
                } else {
                  return this.setKey(key_or_value, value);
                }
              },

              get: function(key) {
                if (angular.isUndefined(key)) {
                  return get();
                } else {
                  return this.getKey(key);
                }
              },

              destroy: function(key) {
                if (angular.isUndefined(key)) {
                  return destroy();
                } else {
                  return this.destroyKey(key);
                }
              },

              setKey: function(key, value) {
                var obj = get() || {};

                checkObject(obj);

                obj[key] = value;
                return set(obj);
              },

              getKey: function(key) {
                var obj = get() || {};

                checkObject(obj);

                return obj[key];
              },

              destroyKey: function(key) {
                var obj = get() || {};

                checkObject(obj);

                if (angular.isDefined(obj[key])) {
                  delete obj[key];
                  set(obj);

                  return true;
                }

                return false;
              },

              isSupported:       isSupported,
              isPrivateBrowsing: isPrivateBrowsing
            };
          };
        }
      };
    });

})();
