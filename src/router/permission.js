// import { message } from '@/utils/tips.js'
import { showFullLoading, hideFullLoading } from '@/utils/nprogress.js'
import router from '@/router/index.js'
// import { useUserCenter } from '@/stores/user.js'
// import { getToken } from '@/utils/auth.js'
import { useAdminStore } from '@/stores/admin.js'
import { ElMessage } from 'element-plus'

// let hasGetInfo = false

router.beforeEach(async (to, from, next) => {
  // 显示进度条
  showFullLoading()
  const adminStore = useAdminStore()
  const stroeData = adminStore.get()

  const token = stroeData.token
  console.log(token)
  console.log(to, from)

  // 没有登陆强制跳转回登陆页，但要确保不是从登录页重定向到登录页
  if (!token && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

// 全局后置守卫
router.afterEach(() => {
  hideFullLoading()
})
