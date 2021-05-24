import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
   }
  },
  mutations: {
    mutLogin(state,obj){
      this.state.user = obj
      console.log(this.state.user);
    }
  },
  actions: {
    actLogin({commit},obj){
      commit('mutLogin',obj)
    }
  },
  modules: {
  }
})
