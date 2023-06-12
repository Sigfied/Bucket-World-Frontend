<template>
  <div class="upload-container" v-show="showProgress">
    <div class="upload-animation">
      <div class="upload-info">{{ currentFile.name }} ({{ formatFileSize(currentFile.size) }})</div>
      <el-progress :percentage="currentProgress" text-inside stroke-width="20"></el-progress>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElProgress } from 'element-plus';

const showProgress = ref(false);
const currentFile = ref({
  name: '家庭vlog.mp4',
  size: 10244444,
});
const currentProgress = ref(0);

onMounted(() => {
  // 模拟上传进度更新
  startUploadAnimation();
});

function startUploadAnimation() {
  showProgress.value = true;

  const interval = setInterval(() => {
    if (currentProgress.value < 100) {
      currentProgress.value += 10;
    } else {
      clearInterval(interval);
      showProgress.value = false;
    }
  }, 500);
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
</script>

<style scoped>
.upload-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload-animation {
  width: 250px;
  text-align: center;
  color: white;
}

.upload-info {
  margin-bottom: 10px;
  color: black;
  font-size: 12px;
  //font-weight: bold;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9998;
}
</style>
