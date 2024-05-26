import axios from 'axios'
import { getToken } from '@/utils/auth.js'
import { ERRORNotification, message } from '@/utils/tips.js'
import { ElMessageBox } from 'element-plus'
import { useUserCenter } from '@/stores/user.js'

const service = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  validateStatus(status) {
    return status >= 200 && status < 504
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = getToken('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    message(error, 'error')
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const user = useUserCenter()
    if (response.headers['new-token']) {
      user.setToken(response.headers['new-token'])
    }
    if (response.data.code !== 200) {
      if (response.data.code === 10103) {
        message('登录已过期，请重新登录', 'warning')
        user.logoutWithoutApi()
        return Promise.reject(Error('登录已过期，请重新登录'))
      }
      ERRORNotification(response.data.msg, response.data.real_err)
      return Promise.reject(response.data.msg)
    }
    return response.data.data
  },
  (error) => {
    if (!error.response) {
      ElMessageBox.confirm(
        `
        <p>检测到请求错误</p>
        <p>${error}</p>
        `,
        '请求报错',
        {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '稍后重试',
          cancelButtonText: '取消'
        }
      )
      return
    }
    ERRORNotification('请求失败', error.response.statusText)
    return Promise.reject(error)
  }
)

export default service
