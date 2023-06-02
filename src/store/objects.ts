import {defineStore} from "pinia";

// 对象缓存store,后期可用来展示最近浏览
// @ts-ignore
const ObjectStore = defineStore("objects", () => {

}, {
    persist: true,
})