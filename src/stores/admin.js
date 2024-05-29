import { reactive } from 'vue'
import { defineStore } from 'pinia'

const useAdminStore = defineStore(
  'admin',
  () => {
    const data = reactive({
      name: '',
      token: '',
      expireDate: '' // 过期日期
    })

    const save = (name, token, expireDate) => {
      data.name = name
      data.token = token
      data.expireDate = expireDate
    }

    const get = () => {
      return {
        name: data.name,
        token: data.token,
        expireDate: data.expireDate
      }
    }

    const remove = () => {
      data.name = ''
      data.token = ''
      data.expireDate = ''
    }

    return {
      data,
      save,
      get,
      remove
    }
  },
  {
    persist: true // 持久化存储到 localStorage 中
  }
)

export { useAdminStore }
