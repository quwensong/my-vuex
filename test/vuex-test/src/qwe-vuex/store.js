import { Vue } from './install'
import { forEach } from './utils.js'
import ModuleCollection from './module/module-collect'

/**
 * module:'xxx',
 * state:'xxx',
 * children:{}
 */


class Store {
  constructor(options){
    // 对用户的模块进行整合
    this._modules = new ModuleCollection(options);
    console.log("🚀 ~ file: store.js ~ line 16 ~ Store ~ constructor ~ this._modules", this._modules)

  }

} 

export default Store