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
                  class="input-with-select"
                  placeholder="搜索"
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
          <el-table :data="tableData" :row-style="{height:'80px'}" style="width: 100%;height: 520px">
            <el-table-column label="文件名" prop="name" width="360">
              <template #default="scope">
                <span :class="scope.row.icon" class="icon iconfont"></span>
                <span class="table-title">{{ extractDataFromPath(scope.row.name) }}</span>
              </template>
            </el-table-column>
            <el-table-column :sort-method="function (obj1:TableData,obj2 :TableData){
                            let date1 = new Date(obj1.lastModifiedDate)
                            let date2 = new Date(obj2.lastModifiedDate)
                            return date1.getTime() - date2.getTime();
                        }" :sortable="true" label="上次修改时间">
              <template #default="scope">
                                <span class="table-title">{{
                                    getTimeDifference(scope.row.lastModifiedDate)
                                  }}</span><br/>
                <span>By {{ scope.row.owner }}</span>
              </template>
            </el-table-column>
            <el-table-column :sort-method="function(obj1:TableData,obj2 :TableData ) {
                          return obj1.sizeNum - obj2.sizeNum
                        }" :sortable="true" label="文件大小" prop="size">
              <template #default="scope">
                <span class="table-title">{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column label="拥有者" prop="owner">
              <template #default="scope">
                <span class="table-title">{{ scope.row.owner }}</span>
              </template>
            </el-table-column>
            <el-table-column label="成员" prop="member">
              <template #default="scope">
                <el-avatar v-for="(data,index) in scope.row.members"
                           :key="index"
                           :size="30" :src="data.avatar"
                           class="avatars"
                ></el-avatar>
                <el-avatar v-if="scope.row.members.length>2" :size="30" class="avatars">
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


<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {BucketStore, Member, TableData} from "../store/bucket.ts";
import {IconTypeMap} from "../api/api.ts";
import {formatFileSize, getTimeDifference} from "../api/utils.ts";

const bucketStore = BucketStore()
const searchInput = ref('')


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
          size: formatFileSize(vid.size),
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
          size: formatFileSize(vid.size),
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
          size: formatFileSize(vid.size),
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
          size: formatFileSize(vid.size),
          type: getFileType(vid.name),
          lastModifiedDate: vid.lastModified,
        }
    )
  })
  bucketStore.res = tableData.value

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
          size: formatFileSize(vid.size),
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
          size: formatFileSize(vid.size),
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
          size: formatFileSize(vid.size),
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
          size: formatFileSize(vid.size),
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
  return list.filter(e => {
    return reg.test(e.name)
  });
}


const getFileType = (filename: string): string => {
//获取最后一个.的位置
  let index = filename.lastIndexOf(".");
//获取后缀
  return filename.substring(index);
}

const extractDataFromPath = (path) => {
  const lastIndex = path.lastIndexOf('/');
  if (lastIndex !== -1) {
    return path.substring(lastIndex + 1);
  }
  return path;
}
</script>

<style lang="scss" scoped>
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