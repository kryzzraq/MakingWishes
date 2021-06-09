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
    ownGroups: {

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
    },
    mutLoadOwnGroups(state, obj) {
      this.state.ownGroups = obj
    },
    mutLoadGroups(state, obj) {
      this.state.groups = obj
    },
    mutLoadContacts(state, obj) {
      this.state.contacts = obj
    }
  },
  actions: {
    actLogin({commit},obj){
      commit('mutLogin',obj)
    },
    actLoadWishes({commit}, obj){
      commit('mutLoadWishes', obj)
    },
    actLoadOwnGroups({commit}, obj) {
      commit('mutLoadOwnGroups', obj)
    },
    actLoadGroups({commit}, obj) {
      commit('mutLoadGroups', obj)
    },
    actLoadContacts({commit}, obj) {
      commit('mutLoadContacts', obj)
    }
  },
  modules: {
  }
})
