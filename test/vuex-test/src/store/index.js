import Vue from 'vue'
import Vuex from '@/qwe-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:999,
    name:'小红',
    age:18
  },
  getters: {
    myName(state){
      return state.name + ' ' + state.count
    }
  },
  mutations: { //commit提交
    changeAge(state,payload){
      state.age += payload
    }
  },
  actions: {
    changeAge({commit},payload){
      setTimeout(()=>{
        commit('changeAge',payload);
      },2000)
    }
  },
  strict:true,
  modules: {
    a:{
      state:{
        name:'小明',
        age:11
      },
      modules:{
        c:{
          state:{
            name:'小明',
            age:11
          }
        }
      }
    },
    b:{
      state:{
        name:'小胡',
        age:44
      }
    }
  }
})
