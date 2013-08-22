describe('Service: raStorage >', function() {
  var storage,
      raStorage;

  beforeEach(function() {
    module('ra.storage');

    inject(function($injector) {
      raStorage = $injector.get('raStorage');
    });
  });

  // TODO: test configuration options
  // TODO: test cookie fallback

  describe('basic >', function() {
    beforeEach(function() {
      storage = raStorage('basic');
    });

    afterEach(function() {
      storage.destroy();
    });

    it('should return null for an unset key', function() {
      expect(storage.get()).toBeNull();
    });

    it('should set a basic integer', function() {
      storage.set(1);
      expect(storage.get()).toBe(1);
    });

    it('should set and get a basic string', function() {
      storage.set('Nailed it.');
      expect(storage.get()).toBe('Nailed it.');
    });

    it('should set and get a basic object', function() {
      storage.set({ key: 'value' });
      expect(storage.get()).toEqual({ key: 'value' });
    });

    it('should set and get a basic array', function() {
      storage.set([1, 2, 3]);
      expect(storage.get()).toEqual([1, 2, 3]);
    });

    it('should set the key of an object in storage', function() {
      storage.set({});
      storage.set('key', 'value');
      expect(storage.get()).toEqual({ key: 'value' });

      storage.setKey('foo', 'bar');
      expect(storage.get()).toEqual({ key: 'value', foo: 'bar' });
    });

    it('should get a specific key from an object in storage', function() {
      storage.set({ key: 'value', foo: 'bar' });
      expect(storage.get('key')).toBe('value');
      expect(storage.getKey('foo')).toBe('bar');
    });

    it('should remove an object from storage', function() {
      storage.set({ key: 'value' });
      expect(storage.get()).toEqual({ key: 'value' });
      storage.destroy();
      expect(storage.get()).toBeNull();
    });

    it('should remove the key of an object in storage', function() {
      storage.set({ key: 'value', foo: 'bar' });
      expect(storage.get()).toEqual({ key: 'value', foo: 'bar' });

      storage.destroy('key');
      expect(storage.get()).toEqual({ foo: 'bar' });

      storage.destroyKey('foo');
      expect(storage.get()).toEqual({});
    });

    it('should return false when destroying an undefined property of an object in storage', function() {
      storage.set({ key: 'value' });
      expect(storage.destroy('foo')).toBeFalsy();
    });

    it('should create a new object when setting by key on a non-existent entry', function() {
      storage.set('key', 'value');
      expect(storage.get()).toEqual({ key: 'value' });
    });

    it('should return undefined for a non-existent key of stored object', function() {
      expect(storage.get('foo')).toBeUndefined();
      storage.set({ key: 'value' });
      expect(storage.get('foo')).toBeUndefined();
    });

    it('should handle type mismatches when setting by key', function() {
      var store = 'foo';
      storage.set(store);
      expect(function() {
        storage.setKey('key', 'value');
      }).toThrow('Type mismatch: trying to get/set a key for the stored value of type ' + typeof store);
    });

    it('should handle type mismatches when getting by key', function() {
      var store = 'foo';
      storage.set(store);
      expect(function() {
        storage.getKey('key');
      }).toThrow('Type mismatch: trying to get/set a key for the stored value of type ' + typeof store);
    });

    it('should handle type mismatches when deleting by key', function() {
      var store = 'foo';
      storage.set(store);
      expect(function() {
        storage.destroyKey('key');
      }).toThrow('Type mismatch: trying to get/set a key for the stored value of type ' + typeof store);
    });
  });

  describe('with default >', function() {
    beforeEach(function() {
      storage = raStorage('with_default', 'default_value');
    });

    afterEach(function() {
      storage.destroy();
    });

    it('should return a default value if there is no value set', function() {
      expect(storage.get()).toBe('default_value');
    });

    it('should return the default value when a storage entry has been removed', function() {
      storage.set({ key: 'value' });
      storage.destroy();

      expect(storage.get()).toBe('default_value');
    });
  });
});
