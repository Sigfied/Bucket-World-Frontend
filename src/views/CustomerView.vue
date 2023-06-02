<template>
    <el-row>
        <el-col :span="23">
            <div class="show-main">
                <el-row class="top-padding"><h2>分享群组</h2></el-row>
                <el-row><span class="hello">👋你好，程序猿，欢迎你的使用</span></el-row>
                <el-row>
                    <el-col :span="8">
                        <h3>Quick Access</h3>
                    </el-col>
                    <el-col :span="15">
                        <div class="input-area">
                            <el-input
                                    v-model="searchInput"
                                    placeholder="搜索"
                                    class="input-with-select"
                                    @input="fuzzySearch"
                            >
                                <template #append>
                                    <span class="iconfont icon-sousuo"></span>
                                </template>
                            </el-input>
                        </div>

                    </el-col>

                </el-row>
                <el-row class="top-padding">
                    <el-table :data="tableData" style="width: 100%;height: 520px" :row-style="{height:'80px'}">
                        <el-table-column prop="name" label="文件名" width="360">
                            <template #default="scope">
                                <span class="icon iconfont" :class="scope.row.icon"></span>
                                <span class="table-title">{{ extractDataFromPath(scope.row.name) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :sortable="true" :sort-method="function (obj1:TableData,obj2 :TableData){
                            let date1 = new Date(obj1.lastModifiedDate)
                            let date2 = new Date(obj2.lastModifiedDate)
                            return date1.getTime() - date2.getTime();
                        }" label="上次修改时间">
                            <template #default="scope">
                                <span class="table-title">{{
                                    getTimeDifference(scope.row.lastModifiedDate)
                                    }}</span><br/>
                                <span>By {{ scope.row.owner }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="size" :sortable="true" :sort-method="function(obj1:TableData,obj2 :TableData ) {
                          return obj1.sizeNum - obj2.sizeNum
                        }" label="文件大小">
                            <template #default="scope">
                                <span class="table-title">{{ scope.row.size }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="owner" label="拥有者">
                            <template #default="scope">
                                <span class="table-title">{{ scope.row.owner }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="member" label="成员">
                            <template #default="scope">
                                <el-avatar v-for="(data,index) in scope.row.members"
                                           :key="index"
                                           class="avatars" :size="30"
                                           :src="data.avatar"
                                ></el-avatar>
                                <el-avatar v-if="scope.row.members.length>2" class="avatars" :size="30">
                                    <img>+{{ scope.row.members.length - 2 }}
                                </el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column width="80">
                            <template #default>
                                <el-dropdown trigger="click">
                  <span class="iconfont icon-sangedian-copy">
                  </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>查看</el-dropdown-item>
                                            <el-dropdown-item>编辑</el-dropdown-item>
                                            <el-dropdown-item>删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </div>
        </el-col>
    </el-row>
</template>


<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {BucketStore} from "../store/bucket.ts";
import {Objects} from "../api/objects.ts";
import {IconTypeMap} from "../api/api.ts";

const bucketStore = BucketStore()
const searchInput = ref('')

type Member = {
    avatar: string
    link: string
}

type TableData = {
    object: Objects | null
    type: string
    members: Array<Member>
    size: string
    name: string
    icon: string
    sizeNum: number
    lastModifiedDate: string
}

let tableData = ref<TableData[]>([])
const name = ["John", "Jack", "Ali", "Hong"]
const membersData = <Member[]>[{
    avatar: "src/images/团队头像/头像1.jpg",
    link: ""
}, {
    avatar: "src/images/团队头像/头像2.jpg",
    link: ""
}, {
    avatar: "src/images/团队头像/头像3.jpg",
    link: ""
}]
onMounted(() => {

    bucketStore.allResult.videos.forEach(vid => {
        tableData.value.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })
    bucketStore.allResult.documents.forEach(vid => {
        tableData.value.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })
    bucketStore.allResult.images.forEach(vid => {
        tableData.value.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })
    bucketStore.allResult.others.forEach(vid => {
        tableData.value.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })


})


const fuzzySearch = () => {
    let key = searchInput.value
    let data: Array<TableData> = []

    bucketStore.allResult.videos.forEach(vid => {
        data.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })
    bucketStore.allResult.documents.forEach(vid => {
        data.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })
    bucketStore.allResult.images.forEach(vid => {
        data.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })
    bucketStore.allResult.others.forEach(vid => {
        data.push(
            <TableData>{
                icon: IconTypeMap.get(getFileType(vid.name)),
                members: membersData.slice(vid.size % (name.length - 1)),
                name: vid.name,
                object: vid,
                sizeNum: vid.size,
                owner: name[vid.size % name.length],
                size: getFileSize(vid.size),
                type: getFileType(vid.name),
                lastModifiedDate: vid.lastModified,
            }
        )
    })

    data = fuzzyQuery(data, key)
    console.log(data)
    tableData.value = data
}
/**
 * 使用test方法实现模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
const fuzzyQuery = (list: Array<TableData>, keyWord: string) => {
    let reg = new RegExp(keyWord);
    let arr = [];
    for (let i = 0; i < list.length; i++) {
        if (reg.test(list[i].name)) {
            arr.push(list[i]);
        }
    }
    return arr;
}


const getFileSize = (size: number) => {//把字节转换成正常文件大小
    if (!size) return "";
    let num = 1024.00; //byte
    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "KB"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

const getFileType = (filename: string): string => {
//获取最后一个.的位置
    let index = filename.lastIndexOf(".");
//获取后缀
    return filename.substring(index);
}


/**计算时间*/
const getTimeDifference = (timestamp) => {
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

const extractDataFromPath = (path) => {
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex !== -1) {
        return path.substring(lastIndex + 1);
    }
    return path;
}
</script>

<style scoped lang="scss">
@import url(../assets/font_4094392_70o7k4r745u/iconfont.css);
@import url(../assets/themecss/theme.scss);

.icon {
  padding-right: 5px;
}

.table-title {
  font-weight: bold;
  color: #000000
}

.avatars {
  box-shadow: 0 0 0 3px #ffffff;
}

.avatars + .avatars {
  margin-left: -2px; /* 调整重叠的距离，根据需要进行调整 */
}

:deep(.el-col.el-col-15) {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

//.left-padding {
//  padding-left: 80px;
//}

.hello {
  margin-top: -18px;
  color: gray;
  font-weight: 600;
  font-size: 14px;
}

:deep(.el-input__wrapper) {
  border-radius: 18px 0 0 18px;
}

:deep(.el-input-group__append) {
  border-radius: 0 18px 18px 0;
}

</style>