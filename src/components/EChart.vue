<template>
  <div class="left-padding">
    <el-badge :value="3" class="item">
      <el-dropdown trigger="click">
        <img slot="dropdown-trigger" alt="Notification" class="notification-icon" src="../images/通知.png"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="notification in notifications" :key="notification.id">
              <el-card shadow="hover">{{ notification.message }}</el-card>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-badge>
    <div class="father">
      <div id="mycharts" ref="myRef" class="chart-box"/>
    </div>
    <el-row :gutter="10" class="info-card">
      <el-col :span="8">
        <div class="card">
          <img alt="" src="../images/图片.png">
        </div>
      </el-col>
      <el-col :span="16" class="card-info">
        <el-row class="smallTitle">图片</el-row>
        <el-row>
          <el-col :span="10" class="smallText">
            文件数：{{ img.num }}
          </el-col>
          <el-col :span="14" class="smallSize">
            {{ img.size }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="info-card">
      <el-col :span="8">
        <div class="card">
          <img alt="" src="../images/文档.png">
        </div>
      </el-col>
      <el-col :span="16" class="card-info">
        <el-row class="smallTitle">文档</el-row>
        <el-row>
          <el-col :span="10" class="smallText">
            文件数：{{ doc.num }}
          </el-col>
          <el-col :span="14" class="smallSize">
            {{ doc.size }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="info-card">
      <el-col :span="8">
        <div class="card">
          <img alt="" src="../images/视频.png">
        </div>
      </el-col>
      <el-col :span="16" class="card-info">
        <el-row class="smallTitle">视频</el-row>
        <el-row>
          <el-col :span="10" class="smallText">
            文件数：{{ video.num }}
          </el-col>
          <el-col :span="14" class="smallSize">
            {{ video.size }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="info-card">
      <el-col :span="8">
        <div class="card">
          <img alt="" src="../images/其他.png">
        </div>
      </el-col>
      <el-col :span="16" class="card-info">
        <el-row class="smallTitle">其他</el-row>
        <el-row>
          <el-col :span="10" class="smallText">
            文件数：{{ other.num }}
          </el-col>
          <el-col :span="14" class="smallSize">
            {{ other.size }}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <DownloadAndUpload></DownloadAndUpload>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
import DownloadAndUpload from "./DownloadAndUpload.vue";
import {BucketStore} from "../store/bucket.ts";
import {get} from "../api/user.js";
import { convertFileSize } from '../util/fileUtils.js';

const bucketStore = BucketStore()

// 四种类型文件的相关数据
let doc = ref({
  num: 0,
  size: "",
})
let img = ref({
  num: 0,
  size: "",
})
let video = ref({
  num: 0,
  size: "",
})
let other = ref({
  num: 0,
  size: "",
})

const myRef = ref(null);

const notifications = ref([
  { id: 1, message: "【桶世界通知】欢迎使用桶世界分布式对象存储平台！请注意，我们已经更新了平台的安全性和性能。" },
  { id: 2, message: "【桶世界通知】重要通知：即将进行系统维护，预计将于下周二的凌晨2点开始，为确保服务的稳定性，请提前做好相应的准备和调整。" },
  { id: 3, message: "【桶世界通知】我们很高兴宣布，桶世界平台现在支持新的高级功能，包括自定义存储策略和数据复制选项。请查看文档以了解更多详情。" },

]);

const initT = ( imagesSize, imagesSizeNum,  videosSize, videosSizeNum,  docSize, docSizeNum,  othSize, othSizeNum) => {
  if (myRef.value) {
    //@ts-ignore
    const myChart = echarts.init(myRef.value);
    myChart.setOption({
      title: {
        left: 'center',
        top: 'middle',
        text: "存储空间",
        textStyle: {
          fontSize: 20,
          color: "rgb(163,197,247)",
        },
      },

      tooltip: {
        show: true,
        trigger: 'item',
        showContent: true,
        formatter: function (params) {
          return params.name + ":" + params.data.nvalue;
        }
      },
      series: [
        {
          type: "pie",
          radius: ["45%", "60%"],
          avoidLabelOverlap: false,
          data: [
            {
              name: "图片",
              value: imagesSizeNum,
              nvalue: imagesSize,
              itemStyle: {
                color: "rgb(110,171,255)",
              },

              label: {
                show: false,
              },
            },
            {
              name: "视频",
              value: videosSizeNum,
              nvalue: videosSize,
              itemStyle: {
                color: "rgb(255,209,60)",
              },
              label: {
                show: false,
              },
            },
            {
              name: "文档",
              value: docSizeNum,
              nvalue: docSize,
              itemStyle: {
                color: "rgb(255,103,97)",
              },
              label: {
                show: false,
              },
            },
            {
              name: "其他",
              value: othSizeNum,
              nvalue: othSize,
              itemStyle: {
                color: "rgb(240,245,254)",
              },
              label: {
                show: false,
              },
            },
            {
              // name: "其他",
              value: imagesSizeNum + videosSizeNum + docSizeNum + othSizeNum,
              itemStyle: {
                color: "rgb(255,255,255)",
              },
              label: {
                show: false,
              },
              tooltip: {
                show: false,
              },
            },
          ],
          startAngle: 180,
        },

      ],
    });
  }
};
// const getAllInfo = async () => {
//   const response = await get('/organization/page', {id:'1673579293235965953', page: 1, pageSize: 3});
//   console.log(response.data.records);
//   tableData.value = response.data.records;
//   console.log(tableData);
// }
onMounted(async () => {
  const res = await get('/bucket/all/' + '1673579293235965953', {});
  console.log(res);
  console.log("??");
  initT(res.data.IMAGE.num, res.data.IMAGE.totalSize, res.data.VIDEO.num, res.data.VIDEO.totalSize, res.data.DOCUMENT.num, res.data.DOCUMENT.totalSize, res.data.OTHER.num, res.data.OTHER.totalSize);
  res.data.DOCUMENT.totalSize = convertFileSize(res.data.DOCUMENT.totalSize);
  res.data.VIDEO.totalSize = convertFileSize(res.data.VIDEO.totalSize);
  res.data.IMAGE.totalSize = convertFileSize(res.data.IMAGE.totalSize);
  res.data.OTHER.totalSize = convertFileSize(res.data.OTHER.totalSize);
  doc.value.num = res.data.DOCUMENT.num;
  doc.value.size = res.data.DOCUMENT.totalSize;
  img.value.num = res.data.IMAGE.num;
  img.value.size = res.data.IMAGE.totalSize;
  video.value.num = res.data.VIDEO.num;
  video.value.size = res.data.VIDEO.totalSize;
  other.value.num = res.data.OTHER.num;
  other.value.size = res.data.OTHER.totalSize;


});

</script>


<style scoped>
.item {
  margin-top: 30px;
  padding-top: 0;
}

.item img {
  height: 24px;
}

.el-card {
  width: 120%;
  padding: 0;
}

.father {
  height: 190px;
}

.chart-box {
  width: 100%;
  height: 280px;
  margin-top: -10px;
//overflow: hidden;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  box-sizing: border-box;
}

.card img {
  margin: 5px;
  width: 30px;
  height: 30px;
  max-width: 100%;
  max-height: 100%;
}

.smallTitle {
//padding: 2px; font-weight: 600; font-size: 14px; color: #181818;
}

.smallText {
  font-weight: 600;
  font-size: 10px;
  color: gray;
}

.smallSize {
  font-weight: 600;
  font-size: 10px;
  color: #92BAF5;
}


.card-info {
//margin: 5px;

}

.info-card {
  margin-bottom: 7px;
  padding: 10px 5px 5px;
  background-color: #F9F8FF;
}

</style>