import {defineStore} from "pinia";
import {AllResult} from "../api/bucket.ts";
import {Objects} from "../api/objects.ts";

export type TableData = {
    object: Objects | null
    type: string
    members: Array<Member>
    size: string
    name: string
    icon: string
    sizeNum: number
    lastModifiedDate: string
}

export type Member = {
    avatar: string
    link: string
}


export const BucketStore
    = defineStore("buckets", () => {
    let allResult = <AllResult>({
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

    let res: TableData[]


    return {
        allResult,
        // @ts-ignore
        res
    }
}, {
    persist: true,

})