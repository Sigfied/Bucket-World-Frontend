<template>
    <el-row>
        <el-col :span="17">
            <div class="show-main">
                <el-row class="top-padding"><h2>文件分享</h2></el-row>
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
                        <el-table-column prop="name" sortable label="文件名称" width="300">
                            <template #default="scope">
                                <span class="icon iconfont" :class="scope.row.icon"></span>
                                <span class="table-title">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="member" label="成员">
                            <template #default="scope">
                                <span>{{ scope.row.members }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="上次修改时间">
                            <template #default="scope">
                                <span>{{ scope.row.lastModifiedDate }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column width="80">
                            <template #default>
                                <el-dropdown trigger="click">
                  <span class="iconfont icon-sangedian-copy">
                  </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>
                                                <span class="icon iconfont icon-a-fenxiang2"></span>
                                                <span>Share to...</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <span class="icon iconfont icon-xiazai"></span>
                                                <span>Download File</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <span class="icon iconfont icon-icon-"></span>
                                                <span>Move to</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <span class="icon iconfont icon-fuzhi-01"></span>
                                                <span>Copy</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <span class="icon iconfont icon-shanchu"></span>
                                                <span>Delete File</span>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </div>
        </el-col>
        <el-col :span="6" class="file-detail-contain">
            <FileInfo></FileInfo>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import FileInfo from "../components/FileInfo.vue";

const searchInput = ref('')
// const handleClick = (tab, event) => {
//   console.log(tab, event)
// }

// let members = ref([
//   {id: 1, src: '../images/分享.png'},
//   {id: 2, src: '../images/分享.png'},
//   {id: 3, src: '../images/分享.png'}
// ]);

interface TableData {
    icon: string
    name: string
    lastModifiedDate: string
    members: string
}

const tableData = <TableData[]>[
    {
        icon: 'icon-DOCX',
        name: 'G Docs July',
        lastModifiedDate: 'May, 20 2023',
        members: 'Only you',
    },
    {
        icon: 'icon-XLS',
        name: 'Work SheetA',
        lastModifiedDate: 'May, 20 2023',
        members: '5 members'
    },
    {
        icon: 'icon-PDF',
        name: 'Form news projetc',
        lastModifiedDate: 'May, 20 2023',
        members: '10 members'
    },
    {
        icon: 'icon-MP4',
        name: 'Project slide mp4',
        lastModifiedDate: 'May, 20 2023',
        members: '10 members'
    },
    {
        icon: 'icon-XLS',
        name: 'Work Sheet A',
        lastModifiedDate: 'May, 20 2023',
        members: '6 members'
    },
    {
        icon: 'icon-ZIP',
        name: 'Wireless Project',
        lastModifiedDate: 'May, 20 2023',
        members: '8 members'
    },
    {
        icon: 'icon-ZIP',
        name: 'Wireless Project',
        lastModifiedDate: 'May, 20 2023',
        members: '8 members'
    },
    {
        icon: 'icon-ZIP',
        name: 'Wireless Project',
        lastModifiedDate: 'May, 20 2023',
        members: '8 members'
    }, {
        icon: 'icon-ZIP',
        name: 'Wireless Project',
        lastModifiedDate: 'May, 20 2023',
        members: '8 members'
    }, {
        icon: 'icon-ZIP',
        name: 'Wireless Project',
        lastModifiedDate: 'May, 20 2023',
        members: '8 members'
    },
    {
        icon: 'icon-ZIP',
        name: 'Wireless Project',
        lastModifiedDate: 'May, 20 2023',
        members: '8 members'
    },


]

</script>

<style scoped lang="scss">
@import url(../assets/font_4094392_70o7k4r745u/iconfont.css);
@import url(../assets/themecss/theme.scss);

.icon {
  padding-right: 10px;
}

.table-title {
  font-weight: bold;
  color: #000000
}

.icon-sangedian-copy {
  transform: rotate(90deg);
}

:deep(.el-col.el-col-15) {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.hello {
  margin-top: -18px;
  color: gray;
  font-weight: 600;
  font-size: 14px;
}

.file-detail-contain {
  height: 100%;
}


.title {
  font-size: 16px;
  font-weight: 600;
}

:deep(.el-input__wrapper) {
  border-radius: 18px 0 0 18px;
}

:deep(.el-input-group__append) {
  border-radius: 0 18px 18px 0;
}
</style>