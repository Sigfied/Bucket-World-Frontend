<template>
  <div class="left-padding">
    <el-row>
      <div class="title">
        <h2>信息概览</h2>
      </div>
    </el-row>
    <el-row class="file-wrapper">
      <div class="iconfont icon-wenjianjia icon-file-logo"></div>
      <div class="file-info-wrapper">
        <div class="file-name">桶世界小组</div>
        <div class="file-detail">4 文件 - 16.56MB</div>
      </div>
    </el-row>

    <el-row>
      <div class="split-line"></div>
    </el-row>

    <el-row>
      <div class="upload-message">
        <el-timeline>
          <el-timeline-item
              v-for="(data, index) in uploadData"
              :key="index"
              :color="data.color"
          >
            <div class="activity-info">
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{ data.name }}
                上传 {{ data.files.length }} 个文件
              </div>
              <div class="upload-time"
                   style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{ data.time }}
              </div>
            </div>
            <div class="upload-files">
              <div v-for="file in data.files" class="file-item">
                <span :class="file.icon" class="iconfont file-icon"></span>
              </div>

            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-row>

  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {get} from "../api/user.js";

const tableData = ref();
const getOrganizationInfo = async () => {
  const response = await get('/organizationDocument/page', {page: 1, pageSize: 10, id: '1673644295582056449'});
  tableData.value = response.data.records;
  console.log(response)
}
onMounted(() => {
  getOrganizationInfo()
})

const uploadData = [
  {
    name: '邓威远',
    time: '2分钟 前',
    color: '#ffa760',
    files: [
      {
        icon: 'icon-MP4'
      },
      {
        icon: 'icon-ZIP'
      },
      {
        icon: 'icon-MP3'
      },
      {
        icon: 'icon-png-1'
      },
    ],
  },

]
</script>

<style lang="scss" scoped>
@import url(../assets/font_4094392_70o7k4r745u/iconfont.css);
@import url(../assets/themecss/theme.scss);


.title {
  padding-left: 10px;
}

.el-row.file-wrapper {
  height: 170px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
}

.file-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

.icon-file-logo {
  margin-top: 30px;
  font-size: 60px;
  height: 100px;
  margin-bottom: 30px;
}


.file-name {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 22px;
}

.file-detail {
  margin-bottom: 20px;
}

.split-line {
  border-bottom: 2px solid rgb(246, 246, 246);
  width: 95%;
  margin-top: 20px;
}

.upload-message {
  margin-top: 20px;
  height: 420px;
  width: 100%;
  overflow-y: auto;
}

.upload-message::-webkit-scrollbar {
  width: 6px; /* 设置滚动条宽度 */
  opacity: 0; /* 初始状态下隐藏滚动条 */
  transition: opacity 0.3s;
}

.el-timeline {
  padding: 8px;
}

.el-timeline-item__content {
  display: flex;
  flex-direction: column;
}

.activity-info {
  display: flex;
  justify-content: space-between;
}

li.el-timeline-item {
  height: 80px;
}

.upload-time {
  margin-left: 30px;
}

.upload-files {
  margin-top: 20px;
  display: flex;
}

.file-item {
  width: 40px;
  height: 40px;
  border: 2px solid rgb(246, 246, 246);
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  margin-right: 12px;
}

.file-icon {
  font-size: 30px !important;
}
</style>
