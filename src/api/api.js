import axios from 'axios';
import {
    ElMessage
} from "element-plus";

const api = axios.create({
    // 根据您的实际情况设置baseURL
    //baseURL: "http://192.168.9.235:8848",
    // 根据您的实际情况设置baseURL
    baseURL: "http://192.168.181.235:8848",
});


//在axios中的then中返回一个数据，类型为promise<any>类型
//在别的函数中接收不到该值
//所以需要在别的函数中使用 async await接收
export async function post(url, data) {
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

export async function get(url, data) {
    return api.get(url, data)
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