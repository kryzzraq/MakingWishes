import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate"
import axios from "axios";

axios.interceptors.request.use(function(config) {
  if (localStorage.token) {
    const auth_token = localStorage.getItem('token');
    config.headers.Authorization = auth_token;
  }
  return config;
}, function(err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
  // rango 200
  return response;
},function (error) {
  
  return Promise.reject(error); 
});


Vue.use(Vuelidate);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
