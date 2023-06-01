<template>
    <div class="left-padding">
        <el-row>
            <div class="title">
                <h2>File Info</h2>
            </div>
        </el-row>
        <el-row class="file-wrapper">
            <div class="iconfont icon-wenjianjia icon-file-logo"></div>
            <div class="file-info-wrapper">
                <div class="file-name">Wireframes Project A</div>
                <div class="file-detail">234 Files Inside - 1.56GB</div>
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
                                upload {{ data.files.length }} files
                            </div>
                            <div class="upload-time"
                                 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{ data.time }}
                            </div>
                        </div>
                        <div class="upload-files">
                            <div v-for="file in data.files" class="file-item">
                                <span class="iconfont file-icon" :class="file.icon"></span>
                            </div>

                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-row>

    </div>
</template>

<script setup lang="ts">
const uploadData = [
    {
        name: 'John',
        time: '2 min ago',
        color: '#ffa760',
        files: [
            {
                icon: 'icon-MP4'
            },
            {
                icon: 'icon-jpg-1'
            },
            {
                icon: 'icon-DOCX'
            },
            {
                icon: 'icon-ZIP'
            },
        ],
    },
    {
        name: 'Marry',
        time: '2 min ago',
        files: [
            {
                icon: 'icon-DOCX'
            },
            {
                icon: 'icon-XLS'
            },
            {
                icon: 'icon-PDF'
            },
        ],
    },
    {
        name: 'May',
        time: '2 min ago',
        files: [
            {
                icon: 'icon-PDF'
            },
            {
                icon: 'icon-PPT'
            },
            {
                icon: 'icon-MP4'
            },
            {
                icon: 'icon-PDF'
            },
        ],
    },
    {
        name: 'Marque',
        time: '2 min ago',
        files: [
            {
                icon: 'icon-ZIP'
            },
            {
                icon: 'icon-xiazai-1'
            },
            {
                icon: 'icon-MP4'
            },
            {
                icon: 'icon-pdf-1'
            },
        ],
    },
    {
        name: 'Hardik',
        time: '2 min ago',
        files: [
            {
                icon: 'icon-XLS'
            },
            {
                icon: 'icon-PDF'
            },
            {
                icon: 'icon-PPT'
            },
        ],
    },
    {
        name: 'Richard',
        time: '2 min ago',
        files: [
            {
                icon: 'icon-JAVA'
            },
            {
                icon: 'icon-MP4'
            },
            {
                icon: 'icon-MP3'
            },
        ],
    },
]
</script>

<style scoped lang="scss">
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