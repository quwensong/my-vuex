import { Vue } from './install'
import ModuleCollection from './module/module-collect'

/**
 * module:'xxx',
 * state:'xxx',
 * children:{}
 */

function installModule(store,rootState,path,module){

  // 循环当前模块
  // 子模块
  if(path.length > 0){
    // 找到对应的父模块，将状态声明上去
    const parent = path.slice(0,-1).reduce((pre,cur)=>{
      return pre[cur]
    },rootState)
    // 对象新增属性不能导致更新视图，不是响应式,所以用 $set方法
    console.log("🚀 ~ file: store.js ~ line 2 ~ Vue", Object.keys(Vue))

    Vue.set(parent,path.at(-1),module.state)
    console.log("🚀 ~ file: store.js ~ line 11 ~ installModule ~ rootState", rootState)

  }

  module.forEachGetters((fn,key) => {
    store.getters[key] = function(){
      return fn.call(store,module.state)
    }  	
  })
  module.forEachMutations((fn,key)=>{
    store.mutations[key] = store.mutations[key] || []
    store.mutations[key].push((payload) => fn.call(store,module.state,payload))
  })
  module.forEachActions((fn,key)=>{
    store.actions[key] = store.actions[key] || []
    store.actions[key].push((payload) => fn.call(store,store,payload))
  })
  module.forEachChildren((child,key)=>{
    installModule(store,rootState,path.concat(key),child)
  })

}
class Store {
  constructor(options){
    // 对用户的模块进行整合
    this._modules = new ModuleCollection(options);

    // NOTE: 将模块中所有的 mutations,actions,getters进行收集，没有namespaced的时候把getters都放在根上面
    // NOTE: actions,mutations会被合并为一个数组
    this.mutations = {};
    this.actions = {};
    this.getters = {}

    this._vm = new Vue({
      data:{
        $$state: options.state
      }
    })

    installModule(this,this.state,[],this._modules.root)





    console.log(this.getters,this.mutations,this.actions)
  }

  get state(){
    return this._vm._data.$$state
  }


} 

export default Store