import axios from 'axios';
// @ts-ignore
import {ElMessage} from "element-plus";

const api = axios.create({
    // 根据您的实际情况设置baseURL
    baseURL: "http://localhost:9000/"
});

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
    return api.get(url, {
        params: data
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

export async function getDownloadFile(url, data) {
    return axios.create({
        // 根据您的实际情况设置baseURL
        baseURL: "http://localhost:9000/",
        responseType: "blob",
    }).get(url, {
        params: data
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
