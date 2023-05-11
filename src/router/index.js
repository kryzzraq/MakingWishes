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
      ,
      {
        path: '/home/notifications',
        name: 'Notifications',
        component: () => import(/* webpackChunkName: "Notifications" */ '../views/Notifications.vue')
      },
      {
        path: '/home/config',
        name: 'Config',
        component: () => import(/* webpackChunkName: "Groups" */ '../views/Config.vue')
      },
      {
        path: '/home/ownGroup/:id',
        name: 'ownGroup',
        component: () => import(/* webpackChunkName: "ownGroup" */ '../views/ownGroup.vue')
      },
      {
        path: '/home/group/:id',
        name: 'Group',
        component: () => import(/* webpackChunkName: "group" */ '../views/Group.vue')
      },
      {
        path: '/home/contact/:id',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "Contact" */ '../views/Contact.vue')
      },
      {
        path: '/home/searchcontacts',
        name: 'SearchContact',
        component: () => import(/* webpackChunkName: "SearchContact" */ '../views/SearchContacts.vue')
      },
      {
        path: '/home/unauthorized',
        name: 'Unauthorized',
        component: () => import(/* webpackChunkName: "Unauthorized" */ '../views/Unauthorized.vue')
      },
      {
        path: '/home/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
      },
      {
        path: '/home/admin/groups',
        name: 'AdminGroups',
        component: () => import(/* webpackChunkName: "AdminGroups" */ '../views/AdminGroups.vue')
      },
      {
        path: '/home/admin/users',
        name: 'AdminUsers',
        component: () => import(/* webpackChunkName: "AdminUsers" */ '../views/AdminUsers.vue')
      },
      {
        path: '/home/admin/user/:id',
        name: 'AdminUser',
        component: () => import(/* webpackChunkName: "AdminUser" */ '../views/AdminUser.vue')
      },
      {
        path: '/home/admin/group/:id',
        name: 'AdminGroup',
        component: () => import(/* webpackChunkName: "AdminGroup" */ '../views/AdminGroup.vue')
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
