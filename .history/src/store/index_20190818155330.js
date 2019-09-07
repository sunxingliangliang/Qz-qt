import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    val: '',
    val1: '',
    id: '',
    ids: '',
    obj:{},
    apitoken:'',
    userinfo:{}
  },
  plugins: [createPersistedState()],
  mutations: {
    mArry(state, res) {
      state.val1 = res
    },
    myval1(state, res) {
      state.val = res
    },
    myid(state, res) {
      state.id = res
    },
    myobj(state,res){
      state.obj=res
    },
    api_token(state,res){
      state.apitoken= res
    },
    updateUserInfo(state,res){
      state.userinfo = res
    }
  },
  actions: {
    
  },
  getters: {

  }
})

export default store
