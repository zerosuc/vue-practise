import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

import MainLayout from '@/views/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Basic from '@/views/basic.vue'
import Container from '@/views/container.vue'
import Form from '@/views/form.vue'
import Form2 from '@/views/form2.vue'
import Deploy from '@/views/deploy/deploy.vue'
import basic1 from '@/views/elm/basic.vue'
import Nav from '@/views/elm/nav.vue'
import Tab1 from '@/views/elm/tab.vue'
import Form3 from '@/views/elm/form.vue'
import Table from '@/views/elm/table.vue'
import Time from '@/views/elm/date.vue'
import Dialog from '@/views/elm/dialog.vue'

const asyncRoutes = [
  { path: '', component: Dashboard },
  { path: 'basic', component: Basic },
  { path: 'form', component: Form },
  { path: 'form2', component: Form2 },
  { path: 'container', component: Container },
  { path: 'deploy', component: Deploy },
  { path: 'basic1', component: basic1 },
  { path: 'nav', component: Nav },
  { path: 'tab', component: Tab1 },
  { path: 'form-vip', component: Form3 },
  { path: 'table', component: Table },
  { path: 'date', component: Time },
  { path: 'dialog', component: Dialog }
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
      // { path: 'form', component: Form }
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
// export { router }
export default router
