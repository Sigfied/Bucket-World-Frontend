//字符串拼接，用以预览文件
import {Objects} from "./objects.ts";
import {IconTypeMap} from "./api.ts";

export const joinStrings = (strArr: string[]) => {
    let result = '';
    for (let i = 0; i < strArr.length; i++) {
        const str = strArr[i];
        if (i === 0) {
            result += str;
        } else {
            result += '/' + str;
        }
    }
    return result + '/';
}

//字符串拼接，用以打开并预览文件
export const joinStrings1 = (strArr: string[]) => {
    let result = '';
    for (let i = 0; i < strArr.length; i++) {
        const str = strArr[i];
        if (i === 0) {
            result += str;
        } else {
            result += '/' + str;
        }
    }
    return result;
}


//将axios内容转化为展示需要形式
export const getObjectProperties = (arr: Objects[]) => {

    return arr.map(item => {
        const nameArr = item.name.split('/');
        let name = nameArr.pop();
        if (name === '') {
            name = nameArr.pop();
        }
        return {
            etag: item.etag,
            size: formatFileSize(item.size),
            lastModified: item.lastModified,
            // @ts-ignore
            type: getExtensionFromFileName(name),
            // @ts-ignore
            icon: IconTypeMap.get((getExtensionFromFileName(name))),
            name: name,
        };
    });
}

//转化文件大小使可读
export const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return '';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

//匹配出文件类型
export const getExtensionFromFileName = (fileName: string) => {
    console.log(typeof fileName)
    const index = fileName.lastIndexOf('.');
    if (index !== -1) {
        return fileName.substring(index);
    } else {
        return '文件';
    }
}


/**计算时间*/
export const getTimeDifference = (timestamp: string) => {
    // 解析时间戳
    const date1 = new Date(timestamp);
    const date2 = new Date();

    // 计算时间差（以毫秒为单位）
    const difference = date2.getTime() - date1.getTime();

    // 定义时间差的上限（以毫秒为单位）
    const oneHour = 60 * 60 * 1000; // 1小时
    const oneDay = 24 * oneHour; // 1天
    const sevenDays = 7 * oneDay; // 7天
    const thirtyDays = 30 * oneDay; // 30天
    const oneYear = 365 * oneDay; // 1年

    // 判断时间差的范围并返回相应的结果
    if (difference < oneHour) {
        // 小于1小时，返回具体的分钟数
        const minutes = Math.floor(difference / (60 * 1000));
        return minutes + "分钟前";
    } else if (difference < oneDay) {
        // 小于1天，返回具体的小时数
        const hours = Math.floor(difference / oneHour);
        return hours + "小时前";
    } else if (difference < sevenDays) {
        // 小于7天，返回具体的天数和周几
        const days = Math.floor(difference / oneDay);
        const dayOfWeek = date1.toLocaleDateString("zh-CN", {weekday: "long"});
        return days + "天前，" + dayOfWeek;
    } else if (difference < thirtyDays) {
        // 小于30天，返回具体的天数
        const days = Math.floor(difference / oneDay);
        return days + "天前";
    } else if (difference < oneYear) {
        // 小于1年，返回具体的月份数
        const months = Math.floor(difference / (30 * oneDay));
        return months + "个月前";
    } else {
        // 大于1年，返回具体的年数
        const years = Math.floor(difference / oneYear);
        return years + "年前";
    }
}