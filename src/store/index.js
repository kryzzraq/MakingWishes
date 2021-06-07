import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {

    },
    wishes: {

    },
    groups: {

    },
    contacts: {
      
    }
  },
  mutations: {
    mutLogin(state,obj){
      this.state.user = obj
    },
    mutLoadWishes(state, obj) {
      this.state.wishes = obj
    }
  },
  actions: {
    actLogin({commit},obj){
      commit('mutLogin',obj)
    },
    actLoadWishes({commit}, obj){
      commit('mutLoadWishes', obj)
    }
  },
  modules: {
  }
})
