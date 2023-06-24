// @ts-ignore
import {get} from "./api.ts";
import {Objects} from "./objects.ts";

const bucket = "/bucket"

export type Bucket = {
    name: string
    creationDate: string
    size: string | number
    sizeStr: string
}

interface Buckets {
    buckets: Bucket[]
}

interface Create {
    error: null | {}
    flag: boolean
}


export type AllResult = {
    all: number;
    buckets: Array<Bucket>;
    docNum: number;
    docSize: string;
    documents: Array<Objects>;
    images: Array<Objects>;
    imagesNum: number;
    imagesSize: string;
    othNum: number;
    othSize: string;
    others: Array<Objects>;
    videos: Array<Objects>;
    videosNum: number;
    videosSize: string;
    imagesSizeNum: number;
    othSizeNum: number;
    docSizeNum: number;
    videosSizeNum: number
};


// @ts-ignore
export const All = async (): AllResult => {
    let url = bucket + "/all"

    // @ts-ignore
    return await get(url).then(res => {
        return res
    });
}

// @ts-ignore
export const List = async (): Buckets => {
    let url = bucket + "/list"
    // @ts-ignore
    return await get(url).then(res => {
        return res
    })
}

// @ts-ignore
export const Create = async (bucketName: string): Create => {
    let url = bucket + "/create"
    // @ts-ignore
    return await get(url, {
        "bucketName": bucketName
        // @ts-ignore
    }).then(res => {
        return res
    })
}


//获取桶名列表且请求参数
// @ts-ignore
export const getBucketList = async (data1: any, data2: any): Buckets => {
    // console.log(data.bucketName, data.prefix)
    return await get("/bucket/list?bucketName=" + data1 + "&prefix=" + data2)
        .then((response) => {
            // 处理成功响应数据
            console.log(response)
            return response
        })
        .catch((error) => {
            // 处理错误
            console.error("请求失败:", error);
        });
}