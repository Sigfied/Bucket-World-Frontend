<template>
  <el-row class="download-card">
    <el-col :span="12" class="part">
      <span class="title">正在下载</span>
    </el-col>
    <el-col :span="12">
      <div class="actions">
        <img alt="" class="op" src="../images/暂停.png" @click="pauseDownload">
        <img alt="" class="op" src="../images/错误.png" @click="deleteDownload">
      </div>
    </el-col>
    <el-col :span="24">
      <div class="info-row">
        <span class="file-name">{{ fileName }}</span>
        <span class="download-speed">{{ speed }}M/s</span>
      </div>
      <el-row class="progress-row">
        <el-col :span="24">
          <el-progress :color="customColorMethod" :percentage="percentage" :stroke-width="14" text-inside/>
        </el-col>
      </el-row>

    </el-col>
    <el-col :span="12" class="part">
      <span class="title">正在下载</span>
    </el-col>
    <el-col :span="12">
      <div class="actions">
        <img alt="" class="op" src="../images/暂停.png" @click="pauseDownload">
        <img alt="" class="op" src="../images/错误.png" @click="deleteDownload">
      </div>
    </el-col>
    <el-col :span="24">
      <div class="info-row">
        <span class="file-name">{{ fileName1 }}</span>
        <span class="download-speed">{{ speed1 }}M/s</span>
      </div>
      <el-row class="progress-row">
        <el-col :span="24">
          <el-progress :color="customColorMethod" :percentage="percentage1" :stroke-width="14" text-inside/>
        </el-col>
      </el-row>

    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const fileName = ref("旅游vlog.mp4");
const percentage = ref(50);
const speed = ref(3.4);

const fileName1 = ref("项目演示视频.mp4");
const percentage1 = ref(80);
const speed1 = ref(7.3);

const pauseDownload = () => {
  // TODO: 暂停下载的逻辑

};

const deleteDownload = () => {
  // TODO: 删除下载的逻辑

};
const customColorMethod = (percentage) => {
  if (percentage < 30) {
    return '#909399'
  }
  if (percentage < 70) {
    return '#e6a23c'
  }
  return '#2EB645'
}

</script>

<style scoped>
.download-card {
  border: 2px solid rgb(246, 246, 246);
  border-radius: 4px;
  padding: 12px;
  margin-top: 20px;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
//margin-top: 2px;
}

.file-name {
  font-size: 12px;
}

.download-speed {
  font-size: 10px;
  color: gray;
}

.progress-row {
  margin-bottom: 10px;
}

.progress-bar {
  width: 100%;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  margin-top: 10px;
}

.op {
  height: 14px;
  width: auto;
  margin-left: 5px;
}

.part {
  margin-top: 10px;
}
</style>
