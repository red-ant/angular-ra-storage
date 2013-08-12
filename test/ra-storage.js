describe('Service: raStorage', function() {
  var storage_basic,
      storage_with_default;

  beforeEach(function() {
    module('raStorage');

    inject(function(raStorage) {
      storage_basic        = raStorage('basic');
      storage_with_default = raStorage('with_default', 'default_value');
    });
  });

  afterEach(function() {
    storage_basic.destroy();
    storage_with_default.destroy();
  });

  describe('basic', function() {

    it('should return null for an unset key', function() {
      expect(storage_basic.get()).toBeNull();
    });

    it('should set a basic integer', function() {
      storage_basic.set(1);
      expect(storage_basic.get()).toBe(1);
    });

    it('should set and get a basic string', function() {
      storage_basic.set('Nailed it.');
      expect(storage_basic.get()).toBe('Nailed it.');
    });

    it('should set and get a basic object', function() {
      storage_basic.set({ key: 'value' });
      expect(storage_basic.get()).toEqual({ key: 'value' });
    });

    it('should set and get a basic array', function() {
      storage_basic.set([1, 2, 3]);
      expect(storage_basic.get()).toEqual([1, 2, 3]);
    });

    it('should return a default value if there is no value set', function() {
      expect(storageWithDefault.get()).toBe('foo');
    });

    it('should set the key of an object in storage', function() {
      storage_basic.set({});
      storage_basic.set('key', 'value');
      expect(storage_basic.get()).toEqual({ key: 'value' });
      storage_basic.setByKey('foo', 'bar');
      expect(storage_basic.get()).toEqual({ key: 'value', foo: 'bar' });
    });

    it('should get a specific key from an object in storage', function() {
      storage_basic.set({ key: 'value', foo: 'bar' });
      expect(storage_basic.get('key')).toBe('value');
      expect(storage_basic.getByKey('foo')).toBe('bar');
    });

    it('should remove an object from storage', function() {
      storage_basic.set({ key: 'value' });
      expect(storage_basic.get()).toEqual({ key: 'value' });
      storage_basic.destroy();
      expect(storage_basic.get()).toBeNull();
    });

    it('should remove the key of an object in storage', function() {
      storage_basic.set({ key: 'value', foo: 'bar' });
      expect(storage_basic.get()).toEqual({ key: 'value', foo: 'bar' });
      storage_basic.destroy('key');
      expect(storage_basic.get()).toEqual({ foo: 'bar' });
      storage_basic.destroyByKey('foo');
      expect(storage_basic.get()).toEqual({});
    });

    it('should return false when destroying an undefined property of an object in storage', function() {
      storage_basic.set({ key: 'value' });
      expect(storage_basic.destroy('foo')).toBeFalsy();
    });

    it('should return the default value when a storage entry has been removed', function() {
      storageWithDefault.set({ key: 'value' });
      storageWithDefault.destroy();
      expect(storageWithDefault.get()).toBe('foo');
    });

    it('should create a new object when setting by key on a non-existent entry', function() {
      storage_basic.set('key', 'value');
      expect(storage_basic.get()).toEqual({ key: 'value' });
    });

    it('should return undefined for a non-existent key of stored object', function() {
      expect(storage_basic.get('foo')).toBeUndefined();
      storage_basic.set({ key: 'value' });
      expect(storage_basic.get('foo')).toBeUndefined();
    });

    it('should handle type mismatches when setting by key', function() {
      var store = 'foo';
      storage_basic.set(store);
      expect(function() {
        storage_basic.setByKey('key', 'value');
      }).toThrow('Type mismatch: trying to get/set a key for the stored value of type ' + typeof store);
    });

    it('should handle type mismatches when getting by key', function() {
      var store = 'foo';
      storage_basic.set(store);
      expect(function() {
        storage_basic.getByKey('key');
      }).toThrow('Type mismatch: trying to get/set a key for the stored value of type ' + typeof store);
    });

    it('should handle type mismatches when deleting by key', function() {
      var store = 'foo';
      storage_basic.set(store);
      expect(function() {
        storage_basic.destroyByKey('key');
      }).toThrow('Type mismatch: trying to get/set a key for the stored value of type ' + typeof store);
    });
  });
});
