import {InMemoryCache} from './InMemoryCache';

export class InMemoryObjectCacheAdapter {

  constructor(ctx) {
    this.cache = new InMemoryCache(ctx)
  }

  get(key) {
    return Promise.resolve(this.cache.get(key));
  }

  put(key, value, ttl) {
    this.cache.put(key, value, ttl);
    return Promise.resolve();
  }

  del(key) {
    this.cache.del(key);
    return Promise.resolve();
  }

  clear() {
    this.cache.clear();
    return Promise.resolve();
  }
}

export default InMemoryObjectCacheAdapter;
