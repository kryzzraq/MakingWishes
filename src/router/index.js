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
    component: () => import(/* webpackChunkName: "SignIn" */ '../views/Making-wishes.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
      },
      {
        path: '/home/legal-warning',
        name: 'Legal-Warning',
        component: () => import(/* webpackChunkName: "legal-warning" */ '../views/Legal-Warning.vue')
      },
      {
        path: '/home/wishes',
        name: 'Wishes',
        component: () => import(/* webpackChunkName: "Wishes" */ '../views/Wishes.vue')
      },
      {
        path: '/home/groups',
        name: 'Groups',
        component: () => import(/* webpackChunkName: "Groups" */ '../views/Groups.vue')
      },
      {
        path: '/home/contacts',
        name: 'Contacts',
        component: () => import(/* webpackChunkName: "Contacts" */ '../views/Contacts.vue')
      },
      {
        path: '/home/creategroup',
        name: 'CreateGroup',
        component: () => import(/* webpackChunkName: "createGroup" */ '../views/CreateGroup.vue')
      },
      {
        path: '/home/config',
        name: 'Config',
        component: () => import(/* webpackChunkName: "Groups" */ '../views/Config.vue')
      },
      {
        path: '/home/notifications',
        name: 'Notif',
        component: () => import(/* webpackChunkName: "Notif" */ '../views/Notif.vue')
      }
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
