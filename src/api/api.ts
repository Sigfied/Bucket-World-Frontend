import axios from 'axios';
// @ts-ignore
import {ElMessage} from "element-plus";

const api = axios.create({
    // 根据您的实际情况设置baseURL
    //baseURL: "http://192.168.9.235:8848",
    // 根据您的实际情况设置baseURL
    // baseURL: "http://192.168.181.235:8848",

    baseURL: "http://localhost:8848"
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

export async function get(url: string, data: any) {
    return api.get(url, {
        params: {
            data: data
        }
    })
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


export const FileTypeMap = new Map<string, string>
{
    FileTypeMap.set(".docx", "icon-DOCX")
    FileTypeMap.set(".doc", "icon-DOCX")
    FileTypeMap.set(".xls", "icon-XLS")
    FileTypeMap.set(".xlsx", "icon-XLS")
    FileTypeMap.set(".pdf", "icon-PDF")
    FileTypeMap.set(".mp4", "icon-MP4")
    FileTypeMap.set(".mp3", "icon-MP3")
    FileTypeMap.set(".ppt", "icon-PPT")
    FileTypeMap.set(".pptx", "icon-PPT")
    FileTypeMap.set(".zip", "icon-zip-1")
    FileTypeMap.set(".7z", "icon-zip-1")
    FileTypeMap.set(".png", "icon-png-1")
    FileTypeMap.set(".jpg", "icon-jpg-1")
}