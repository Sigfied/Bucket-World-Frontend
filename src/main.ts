import {createApp, toRaw} from 'vue'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createPinia, PiniaPluginContext} from 'pinia'
// @ts-ignore
import  uploader  from 'vue-simple-uploader';
import 'vue-simple-uploader/dist/style.css'

import {Icon} from '@iconify/vue'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 数据存储本地
const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
// 获取本地数据
const getStorage = (key: string) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : {};
}
const piniaPlugin = (context: PiniaPluginContext) => {
    const {store} = context;
    // $subscribe state值发生变化时会执行传入的回调
    store.$subscribe(() => {
        // 每次修改值的时候更新localStorage数据
        setStorage(`${store.$id}`, toRaw(store.$state))
    })
    // 每次构建项目的时候从本地存储取值
    const data = getStorage(`${store.$id}`)
    //并将取的值赋给state
    return {
        ...data
    }
}
pinia.use(piniaPlugin)

createApp(App)
    .use(router)
    .use(uploader)
    .use(pinia)
    .use(ElementPlus).component('Icon', Icon).mount('#app')
