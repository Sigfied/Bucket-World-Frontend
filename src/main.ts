import {createApp} from 'vue'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


createApp(App)
    .use(router)
    .use(pinia)
    .use(ElementPlus).mount('#app')
