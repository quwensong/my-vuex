import { Vue } from './install'

import { forEach } from './utils.js'

class Store {
  constructor(options){
    const { state,getters,mutations,actions,module,strict } = options;
    // ======= getters ===========
    this.getters = {}
    const computed = {}
    forEach(getters,(val,key)=>{
      computed[key] = ()=>{
        return val(this.state)
      }
      // $store.getters.myName => this._vm.computed.myName
      // 当我们去getters上面取值的时候，需要去对应的computed取值
      Object.defineProperty(this.getters,key,{
        get:()=> this._vm[key]
      })
    })
    // ======= state ===========
    // Vuex核心就是靠 Vue实例 
    this._vm =  new Vue({
      data:{//$开头的数据不会挂载到实例上面
        $$state:state
      },
      computed
    })
    // ======= mutations ===========
    this.mutations = {}
    forEach(mutations,(fn,key)=>{
      // commit('changeAge',10)
      this.mutations[key] = (payload)=>fn.call(this,this.state,payload);
    })
    // ======= actions ===========
    this.actions = {}
    forEach(actions,(fn,key)=>{
      // dispatch('changeAge',10)
      this.actions[key] = (payload)=>fn.call(this,this,payload);
    })
    console.log(this.actions)
  }
  get state(){//类的属性访问器
    // 依赖于Vue的响应式原理
    return this._vm._data.$$state
  }
  commit = (fnName,payload)=>{
    this.mutations[fnName](payload)
  }
  dispatch = (fnName,payload) => {
    this.actions[fnName](payload)
  }


}

export default Store