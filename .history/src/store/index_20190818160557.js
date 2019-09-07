import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'
import { Message } from 'element-ui';
import { resolve } from 'url';
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
    getSearch({},id=1){
      return new Promise((resolve,reject) =>{
        axios.get('modules/area/areaByPid',{params:{id}}).then(res=>{
          var {code,data}=res.data
          if(code===1000){
            resolve(data)
          }else{
            Message.error(res.data.message)
          }
        }).catch((err)=>{
          console.log('错误信息'+err)
        })
      })
    }
  },
  getters: {

  }
})

export default store
