// cookies
// import { useCookies } from '@vueuse/integrations/useCookies'
// import { useCookies } from '@vueuse/core'

import Cookies from 'universal-cookie'

const useCookies = () => {
  const cookies = new Cookies()

  const get = (name) => {
    return cookies.get(name)
  }

  const set = (name, value, options) => {
    cookies.set(name, value, options)
  }

  const remove = (name, options) => {
    cookies.remove(name, options)
  }

  return {
    get,
    set,
    remove
  }
}

export default useCookies

const TokenKey = 'token'

const cookies = useCookies()

// 获取token
export function getToken() {
  return cookies.get(TokenKey)
}

// 设置token

export function setToken(token) {
  return cookies.set(TokenKey, token)
}

// 清除token
export function removeToken() {
  return cookies.remove(TokenKey)
}
