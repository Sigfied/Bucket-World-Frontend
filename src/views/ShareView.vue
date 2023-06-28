<template>
  <el-row>
    <el-col :span="17">
      <div class="show-main">
        <el-row class="top-padding"><h2>文件分享</h2></el-row>
        <el-row><span class="hello"> </span></el-row>
        <el-row>
          <el-col :span="8">
            <!--            <h3>Quick Access</h3>-->
          </el-col>
          <el-col :span="15">
            <div class="input-area">
              <el-input
                  v-model="searchInput"
                  class="input-with-select"
                  placeholder="搜索"

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
            <el-table-column label="文件名称" prop="document.name" sortable width="300">
              <template #default="scope">
                <span :class="scope.row.icon" class="icon iconfont"></span>
                <span class="table-title">{{ scope.row.document.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="成员" prop="account.name">
              <template #default="scope">
                <span>{{ scope.row.account.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="上次修改时间">
              <template #default="scope">
                <span>{{ scope.row.updateTime }}</span>
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
                        <span>分享</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="icon iconfont icon-xiazai"></span>
                        <span>下载</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="icon iconfont icon-icon-"></span>
                        <span>移动</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span class="icon iconfont icon-shanchu"></span>
                        <span>删除</span>
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

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import FileInfo from "../components/FileInfo.vue";
import {get} from "../api/user.js";
import router from "../router";

const searchInput = ref('');

const tableData = ref();
const getFileList = async () => {
  const response = await get('/organizationDocument/page', {page: 1, pageSize: 10, id: '1673644295582056449'});
  tableData.value = response.data.records;
  console.log(response)
}
onMounted(() => {
  getFileList()
})

</script>

<style lang="scss" scoped>
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