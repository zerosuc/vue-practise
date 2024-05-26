import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

import MainLayout from '@/views/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Basic from '@/views/basic.vue'
import Container from '@/views/container.vue'
import Form from '@/views/form.vue'
import Form2 from '@/views/form2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/container',
      component: Container
    },
    {
      path: '/dashboard',
      component: MainLayout,
      children: [
        // path 为空 才是默认页；填写其他均有问题
        { path: '', component: Dashboard },
        { path: 'basic', component: Basic },
        { path: 'form', component: Form },
        { path: 'form2', component: Form2 },
        { path: 'container', component: Container }
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
