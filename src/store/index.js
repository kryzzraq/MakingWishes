import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id_user: '',
      kind: '',
      name: '',
      last_name_1: '',
      last_name_2: '',
      image: '',
      email: '',
      passwd: ''
   }
  },
  mutations: {
    async mutLogin(state,arr){
      let response = await axios.post("https://localhost/API_making_wishes/public/index.php/login",
      {
        "email": arr[0],
        "passwd": arr[1]
      })
      console.log(response)
    }

  },
  actions: {
    actLogin({commit},arr){
      commit('mutLogin',arr)
      
    }
  },
  modules: {
  }
})
