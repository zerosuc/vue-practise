import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// import './assets/index.css'
import './icon/icon.css'
import './icon/iconfont.js'
import '@/router/permission.js'

import App from './App.vue'
import router from './router'
import * as Icons from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //导入 ElementPlus 组件库的中文语言包
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

const pinia = createPinia() //创建一个Pinia实例, 用于在应用中集中管理状态(store)
pinia.use(piniaPluginPersistedstate) //将持久化存储插件添加到 pinia 实例上

// app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn // 设置 ElementPlus 组件库的区域语言为中文简体
})
app.use(pinia)
app.use(router)

app.mount('#app')
