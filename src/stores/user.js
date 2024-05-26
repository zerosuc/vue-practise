import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getINfo, login, logout, updatePwd } from '@/api/user.js'
import { removeToken, setToken } from '@/utils/auth.js'
import { message } from '@/utils/tips.js'

export const useUserCenter = defineStore('userCenter', () => {
  const user = ref({})
  const menus = ref([])
  const roleNames = ref([])

  const loginAction = async (username, password) => {
    try {
      const form = { username, password }
      const res = await login(form)
      setToken(res.token)
      return res
    } catch (err) {
      console.error('Login error:', err)
      throw err
    }
  }

  const logoutAction = async () => {
    try {
      const res = await logout()
      if (res) {
        removeToken()
        message('退出登录成功')
        return res
      }
    } catch (err) {
      console.error('Logout error:', err)
      throw err
    }
  }

  const logoutWithoutApi = async () => {
    removeToken()
    return Promise.resolve()
  }

  const setUserInfo = async () => {
    try {
      const res = await getINfo()
      user.value = res.user
      setMenus(res.menus)
      setRoleNames(res.roleNames)
      return res
    } catch (err) {
      console.error('Set user info error:', err)
      throw err
    }
  }

  const updatePwdAction = async (data) => {
    try {
      const res = await updatePwd(data)
      if (res) {
        return res
      }
    } catch (err) {
      console.error('Update password error:', err)
      throw err
    }
  }

  const setMenus = (newMenus) => {
    menus.value = newMenus
  }

  const setRoleNames = (newRoleNames) => {
    roleNames.value = newRoleNames
  }

  return {
    user,
    menus,
    roleNames,
    loginAction,
    logoutAction,
    logoutWithoutApi,
    setUserInfo,
    updatePwdAction,
    setMenus,
    setRoleNames
  }
})
