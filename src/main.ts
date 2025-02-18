import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' //路由
import { createPinia } from 'pinia' //全局状态管理

const pinia = createPinia()
const app = createApp(App)

app.use(router) //挂载路由
app.use(pinia) //全局状态管理

app.mount('#app')
