import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {

    },
    baseService: "http://localhost/API_making_wishes/public/index.php"
  },
  mutations: {
    mutLogin(state,obj){
      this.state.user = obj
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
