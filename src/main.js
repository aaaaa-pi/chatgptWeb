import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import '@/assets/base.css'
import '@/access'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
