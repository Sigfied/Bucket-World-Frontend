<template>
  <el-menu
      class="el-menu-vertical-demo"
      default-active="2"
  >
    <el-container><img alt="" class="logo" src="../images/logo.png"></el-container>
    <el-menu-item index="2">
      <img alt="" class="icon" src="../images/工作台-select.png"/>
      <span>个人中心</span>
    </el-menu-item>
    <el-menu-item index="3">
      <img alt="" class="icon" src="../images/分享-select.png"/>
      <span>我的分享</span>
    </el-menu-item>
    <el-menu-item index="4">
      <img alt="" class="icon" src="../images/文件桶-select.png"/>
      <span>我的桶</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
// import EChart from "../components/EChart.vue";


</script>

<style scoped>
.logo {
  max-width: 90%;
  height: auto;
  margin-top: 25px;
  margin-bottom: 25px;
}

.el-menu-item {
  font-weight: bold;
  color: gray;
}

.el-menu {
  max-height: 100%;
  height: 20px;
}

.el-menu-vertical-demo .el-menu-item.is-active {
  background-color: #f5f5f5; /* 设置选中项的背景颜色 */
  color: #181818;
}

.el-menu-item {
  border-bottom: 1px solid #ebebeb; /* 添加菜单项之间的边框 */
}

.icon {
  margin-right: 15px;
  height: 20px;
  width: 20px;
}
</style>