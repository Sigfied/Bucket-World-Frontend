import {defineStore} from "pinia";

//使用pinia 缓存
export const BucketStore = defineStore("buckets",()=>{

},{
    persist:{
        key : "buckets",
        storage: localStorage
    },

})