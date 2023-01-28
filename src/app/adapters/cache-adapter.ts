import { CacheOptions } from '../../core/model/cache'
import { CacheFactory } from '../factories/cache-factory'

export class CacheAdapter {
  static createCacheAdapter(originalFunction: Function): Function {
    return function (...params: Array<any>) {
      const bindOriginalFunction = originalFunction.bind(this)
      const cacheService = CacheFactory.createCache({ expire: 30_000 }) // 30 seconds to be expire
      return cacheService.cache(params, bindOriginalFunction)
    }
  }

  static createCacheParamAdapter(cacheOptions: CacheOptions, originalFunction: Function) {
    return function (...params: Array<any>) {
      const bindOriginalFunction = originalFunction.bind(this)
      const cacheService = CacheFactory.createCache(cacheOptions)
      return cacheService.cache(params, bindOriginalFunction)
    }
  }
}