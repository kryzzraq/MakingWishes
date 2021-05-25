import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import(/* webpackChunkName: "Landing" */ '../views/Landing.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "SignIn" */ '../views/SignIn.vue')
  },
  {
    path: '/making-wishes',
    name: 'making-wishes',
    component: () => import(/* webpackChunkName: "SignIn" */ '../views/Making-wishes.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
