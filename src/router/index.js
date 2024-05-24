import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

import MainLayout from '@/views/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/dashboard',
      component: MainLayout,
      children: [
        { path: '', component: Dashboard }
        // 其他路由配置
      ]
    },
    {
      path: '/:catchAll(.*)',
      meta: {
        closeTab: true
      },
      component: () => import('@/views/error/index.vue') // 404
    }
  ]
})

export default router
