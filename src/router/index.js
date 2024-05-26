import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

import MainLayout from '@/views/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Basic from '@/views/basic.vue'
import Container from '@/views/container.vue'
import Form from '@/views/form.vue'
import Form2 from '@/views/form2.vue'

const asyncRoutes = [
  { path: '', component: Dashboard },
  { path: 'basic', component: Basic },
  { path: 'form', component: Form },
  { path: 'form2', component: Form2 },
  { path: 'container', component: Container }
]

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
      path: '/dashboard',
      component: MainLayout,
      children: asyncRoutes
      // [
      // // path 为空 才是默认页；填写其他均有问题
      // { path: '', component: Dashboard },
      // { path: 'basic', component: Basic },
      // { path: 'form', component: Form },
      // { path: 'form2', component: Form2 },
      // { path: 'container', component: Container }
      // 其他路由配置
      // ]
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

// 动态添加路由的方法
export function addRouters(menus) {
  // 是否有新的路由
  let hasNewRouter = false
  const findAndAddRoutesByMenus = (Array) => {
    Array.forEach((e) => {
      let item = asyncRoutes.find((o) => o.path == e.path)
      if (item && !router.hasRoute(e.path)) {
        hasNewRouter = true
        console.log('添加路由', item)
        router.addRoute('首页', item)
      }
      if (e.children && e.children.length > 0) {
        findAndAddRoutesByMenus(e.children)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  return hasNewRouter
}

// addRouters()
export { router }
export default router
