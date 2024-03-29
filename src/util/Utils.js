//单位转换
export function convertFileSize(size) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }
    return size.toFixed(2) + ' ' + units[index];
}

export function formatDateTime(datetime) {
    const now = new Date();
    const date = new Date(datetime);

    const diff = Math.floor((now - date) / 1000); // 计算时间差，单位为秒

    if (diff < 60) {
        return diff + "秒前";
    } else if (diff < 3600) {
        return Math.floor(diff / 60) + "分钟前";
    } else if (diff < 86400) {
        return Math.floor(diff / 3600) + "小时前";
    } else if (diff < 2592000) {
        return Math.floor(diff / 86400) + "天前";
    } else {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
    }
}


export function matchIcon(fileType) {
    const icons = {
        jpg: 'icon-JPG',
        docx: 'icon-DOCX',
        java: 'icon-JAVA',
        mp4: 'icon-MP4',
        mp3: 'icon-MP3',
        ppt: 'icon-PPT',
        pdf: 'icon-PDF',
        xls: 'icon-XLS',
        zip: 'icon-ZIP',
        excel: 'icon-excel-1',
        txt: 'icon-text-1',
        png: 'icon-png-1',
    };

    for (const key in icons) {
        if (fileType.includes(key)) {
            return icons[key];
        }
    }
    // 如果没有找到匹配的图标字符串，可以返回一个默认值或者null
    return null;
}
