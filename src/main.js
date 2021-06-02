import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate"
import axios from "axios";

Vue.use(Vuelidate);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.request.use(function(config) {
  const auth_token = localStorage.getItem('token');
  console.log(auth_token)
  if(auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`;
  }
  return config;
}, function(err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  console.log(error)
  if (error.response.status === 401) {
    if (window.localStorage.token) {
      localStorage.clear;
    }
    // TODO: cambiar /login por /unauthoriced (hacer vista) :D
    // se puede poner un mensaje de que será enviado en login en x segundos (?)
    $router.push('/');
  } else {
    return Promise.reject(error);
  }
});