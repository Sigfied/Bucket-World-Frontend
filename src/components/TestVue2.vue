<template>
  <div class="flex flex-wrap items-center test">
    <el-dropdown>
      <el-button type="primary">下载列表<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu">
          <DownloadAndUpload></DownloadAndUpload>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import DownloadAndUpload from "./DownloadAndUpload.vue";
const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click')
}
</script>

<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.dropdown-menu {
  width: 300px; /* 自定义下拉菜单的宽度 */
}
</style>
