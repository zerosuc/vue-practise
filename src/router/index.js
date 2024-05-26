import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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

// 进度条配置
NProgress.inc(0.2)
//全局进度条的配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body' //指定进度条的父容器
})

// const getToken = () => {
//   return sessionStorage.getItem('token')
// }
// const setToken = (value) => {
//   sessionStorage.setItem('token', value)
// }

router.beforeEach((to, from, next) => {
  // 启动进度条
  NProgress.start()
  // 设置头部
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Kubernetes'
  }
  // 放行
  next()
})

router.afterEach(() => {
  NProgress.done()
})

// const whiteList = ['/login', '/authredirect']
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   console.log(to, from)
//   if (!whiteList.includes(to.path)) {
//     console.log(getToken())
//     if (getToken()) {
//       if (to.path === '/login') {
//         next({ path: '/home' })
//       } else {
//         next()
//       }
//     } else {
//       console.log('没有token')
//       if (whiteList.indexOf(to.path) !== -1) {
//         next()
//       } else {
//         next('/login')
//       }
//     }
//   }
// })

export default router
