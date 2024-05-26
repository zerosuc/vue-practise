import { message } from '@/utils/tips.js'
import { showFullLoading, hideFullLoading } from '@/utils/nprogress.js'
import router, { addRouters } from '@/router/index.js'
import { useUserCenter } from '@/stores/user.js'
import { getToken } from '@/utils/auth.js'

let hasGetInfo = false

router.beforeEach(async (to, from, next) => {
  // 显示进度条
  showFullLoading()
  const token = getToken()
  // 没有登陆强制跳转回登陆页
  if (!token && to.path !== '/login') {
    return next({ path: '/login' })
  }
  // 防止重复登陆
  if (token && to.path === '/login') {
    message('请勿重复登陆', 'warning ')
    return next({ path: from.path })
  }

  // 如果用户登陆了，自动获取用户信息，并存储在vuex中
  let hasNewRouter = false
  if (token && !hasGetInfo) {
    const user = useUserCenter()
    let { menus } = await user.setUserInfo()
    hasGetInfo = true
    // 动态添加路由
    hasNewRouter = addRouters(menus)
  }
  // 设置页面标题
  document.title = (to.meta.title ? to.meta.title : 'Kubernetes') + '- 云管平台'
  hasNewRouter ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach(() => {
  hideFullLoading()
})
