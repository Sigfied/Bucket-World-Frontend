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