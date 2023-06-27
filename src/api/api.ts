import axios from 'axios';
// @ts-ignore
import {ElMessage} from "element-plus";

const api = axios.create({
    // 根据您的实际情况设置baseURL
    //baseURL: "http://192.168.9.235:8848",
    // 根据您的实际情况设置baseURL
    // baseURL: "http://192.168.181.235:8848",

    baseURL: "http://localhost:8080/"
});


//在axios中的then中返回一个数据，类型为promise<any>类型
//在别的函数中接收不到该值
//所以需要在别的函数中使用 async await接收
export async function post(url: string, data: any) {
    return api.post(url, data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            // 在实际应用中，您可以根据需要处理错误，例如显示错误消息等
            ElMessage({
                showClose: true,
                message: '数据异常',
                type: 'error',
            });
            throw error;
        });
}

export async function get(url: string) {
    return api.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            // 在实际应用中，您可以根据需要处理错误，例如显示错误消息等
            ElMessage({
                showClose: true,
                message: '数据异常',
                type: 'error',
            });
            throw error;
        });
}


export function getFile(url: string, data: any) {
    let fileApi = axios.create({
        // 根据您的实际情况设置baseURL
        baseURL: "http://localhost:8848",

        responseType: "blob",
    });

    return fileApi.get(url, data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            // 在实际应用中，您可以根据需要处理错误，例如显示错误消息等
            ElMessage({
                showClose: true,
                message: '数据异常',
                type: 'error',
            });
            throw error;
        });
}


export const IconTypeMap = new Map<string, string>
{
    IconTypeMap.set(".docx", "icon-DOCX")
    IconTypeMap.set(".doc", "icon-DOCX")
    IconTypeMap.set(".xls", "icon-XLS")
    IconTypeMap.set(".xlsx", "icon-XLS")
    IconTypeMap.set(".pdf", "icon-PDF")
    IconTypeMap.set(".mp4", "icon-MP4")
    IconTypeMap.set(".mp3", "icon-MP3")
    IconTypeMap.set(".ppt", "icon-PPT")
    IconTypeMap.set(".pptx", "icon-PPT")
    IconTypeMap.set(".zip", "icon-zip-1")
    IconTypeMap.set(".7z", "icon-zip-1")
    IconTypeMap.set(".png", "icon-png-1")
    IconTypeMap.set(".jpg", "icon-jpg-1")
    IconTypeMap.set(".txt", "icon-txt-1");
    IconTypeMap.set("文件", "icon-wenjianjia")
}