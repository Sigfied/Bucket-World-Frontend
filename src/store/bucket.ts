import {defineStore} from "pinia";

export const BucketStore = defineStore("buckets",()=>{

},{
    persist:{
        key : "buckets",
        storage: localStorage
    },

})