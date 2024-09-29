import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import config from '@/config.js';
const WebName = config.Website.name;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Admin',
      name: 'AdminIndex',
      component: () => import('../views/Admin/Index/dashbard.vue'),
      children: [
        {
          path: 'Info',
          name: 'AdminInfo',
          component: () => import('../views/Admin/info.vue')
        },
        {
          path: 'Index',
          name: 'SB',
          component: () => import('../views/Admin/info.vue')
        },
        {
          path: 'Link/List',
          name: 'Linklist',
          component: () => import('../views/Link/LinkList.vue')
        },
        {
          path: 'Link/Add',
          name: 'LinkAdd',
          component: () => import('../views/Link/LinkAdd.vue')
        }
      ]
    },
    {
      path: '/Login',
      name: 'AdminLogin',
      component: () => import('../views/Admin/login.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue')
    }
  ]
})

export default router
