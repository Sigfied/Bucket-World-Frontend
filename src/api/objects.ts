// @ts-ignore
// @ts-ignore
import {get, post} from "./api.ts";

const objects = "/object"

export type Place = {
    Space: string;
    Local: string;
};

export type Owner = {
    owner: Place;
    name: string;
    id: string;
};

export type Objects = {
    etag: string;
    name: string;
    lastModified: string;
    size: number;
    contentType: string;
    expires: string;
    metadata: null | {};
    UserTagCount: number;
    Owner: Owner;
    Grant: null;
    storageClass: string;
    IsLatest: boolean;
    IsDeleteMarker: boolean;
    VersionID: string;
    ReplicationStatus: string;
    ReplicationReady: boolean;
    Expiration: string;
    ExpirationRuleID: string;
    Restore: null;
    ChecksumCRC32: string;
    ChecksumCRC32C: string;
    ChecksumSHA1: string;
    ChecksumSHA256: string;
};

type ObjectList = {
    error: string | null
    objects: Array<Objects>
}

type InsertObject = {
    object: Objects
    error: string | null
}


interface GetDataRequest {
    bucketName: string
    prefix: string
}

// @ts-ignore
export const One = async (bucketName: string, objectName: string): Objects => {
    let url = objects + "/one"
    return await get(url + "?bucketName=" + bucketName + "&objectName=" + objectName)
        // @ts-ignore
        .then(res => {
            return res
        })
}

/**
 * 获取一共桶内的对象，根据前缀进行匹配
 * */
// @ts-ignore
export const List = async (bucketName: string, prefix: string): ObjectList => {
    let url = objects + "/list"
    return await get(url + "?bucketName=" + bucketName + "&prefix=" + prefix)
        // @ts-ignore
        .then(res => {
            return res
        })
}

/**
 * 模糊查询，可以根据 Key 的输入同时触发该事件
 */
// @ts-ignore
export const Fuzzy = async (bucketName: string, prefix: string): ObjectList => {
    let url = objects + "/fuzzy"
    return await get(url + "?bucketName=" + bucketName + "&prefix=" + prefix)
        // @ts-ignore
        .then(res => {
            return res
        })
}
// @ts-ignore
export const InsertOne = async (bucketName: string, objectName: string, file: any): InsertObject => {
    let url = objects + "/one"
    return await post(url, {
        bucketName: bucketName,
        objectName: objectName,
        file: file
    })
        // @ts-ignore
        .then(res => {
            return res
        })
}


// @ts-ignore
export const getFiles = async (data: GetDataRequest): ObjectList => {
    let url = objects + "/list"
    return await get(url + "?bucketName=" + data.bucketName + "&prefix=" + data.prefix)
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

export const getString = async (data: GetDataRequest) => {
    let u = objects + "/one"
    return await get(u + "?bucketName=" + data.bucketName + "&prefix=" + data.prefix)
        .then((response) => {
            // 处理成功响应数据
            return response
            // console.log("success" ,response.objects)
        })
}