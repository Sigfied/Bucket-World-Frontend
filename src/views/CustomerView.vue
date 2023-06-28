<template>
  <el-row>
    <el-col :span="23">
      <div class="show-main">
        <el-row class="top-padding"><h2>分享群组</h2></el-row>
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
            <el-table-column label="文件名" prop="name" width="360">
              <template #default="scope">
                <!--                <span :class="scope.row.icon" class="icon iconfont"></span>-->
                <span class="table-title" @click="getRowNumber(scope.$index)">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="上次修改时间">
              <template #default="scope">
                <span class="table-title">{{ scope.row.updateTime }}</span><br/>
                <span>By {{ scope.row.createdAccount.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="小组人数">
              <template #default="scope">
                <span class="table-title">{{ scope.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column label="拥有者">
              <template #default="scope">
                <span class="table-title">{{ scope.row.createdAccount.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="成员">
              <template #default="scope">
                <el-avatar v-for="(data,index) in scope.row.memberAccounts.slice(0, 2)"
                           :key="index"
                           :size="30" :src="data.avatar"
                           class="avatars"
                ></el-avatar>
                <el-avatar v-if="scope.row.memberAccounts.length > 2" :size="30" class="avatars">
                  <img>+{{ scope.row.memberAccounts.length - 2 }}
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
import {get} from "../api/user.js";
import router from "../router";

let tableData = ref();
const getOrganizationList = async () => {
  const response = await get('/organization/page', {id: '1673579293235965953', page: 1, pageSize: 10});
  console.log(response.data.records);
  tableData.value = response.data.records;
  console.log(tableData);
}
const getRowNumber = (index) => {
  console.log("当前行号：", index);
  router.push({
    path: `/share/${index}`
  })

};
onMounted(() => {
  getOrganizationList()
})
// const name = ["John", "Jack", "Ali", "Hong"]
// const membersData = <Member[]>[{
//   avatar: "src/images/团队头像/头像1.jpg",
//   link: ""
// }, {
//   avatar: "src/images/团队头像/头像2.jpg",
//   link: ""
// }, {
//   avatar: "src/images/团队头像/头像3.jpg",
//   link: ""
// }]
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


:deep(.el-input__wrapper) {
  border-radius: 18px 0 0 18px;
}

:deep(.el-input-group__append) {
  border-radius: 0 18px 18px 0;
}

</style>