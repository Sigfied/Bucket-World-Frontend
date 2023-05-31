import axios from 'axios';
import {
    ElMessage
} from "element-plus";

const api = axios.create({
    baseURL: "http://192.168.9.235:8848", // 根据您的实际情况设置baseURL
});

export function post(url, data) {
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

export function get(url, data) {
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