import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// import './assets/index.css'
import './icon/icon.css'
import './icon/iconfont.js'
// import '@/router/permission.js'

import App from './App.vue'
import router from './router'
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
