import {defineStore} from "pinia";
import {AllResult} from "../api/bucket.ts";
import {ref} from "vue";


export const BucketStore
    = defineStore("buckets", () => {
    let allResult: AllResult = ref<AllResult>({
        all: 0,
        buckets: [],
        docNum: 0,
        docSize: "",
        docSizeNum: 0,
        documents: [],
        images: [],
        imagesNum: 0,
        imagesSize: "",
        imagesSizeNum: 0,
        othNum: 0,
        othSize: "",
        othSizeNum: 0,
        others: [],
        videos: [],
        videosNum: 0,
        videosSize: "",
        videosSizeNum: 0
    })


    return {
        allResult
    }
}, {
    persist: true,

})