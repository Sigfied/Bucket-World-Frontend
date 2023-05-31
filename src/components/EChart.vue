<template>
  <div class="left-padding">
    <el-row>
      <div id="mycharts" ref="myRef" class="chart-box"/>
    </el-row>
    <el-row class="info-card" :gutter="10">
      <el-col :span="8">
        <div class="card">
          <img src="../images/图片.png" alt="">
        </div>
      </el-col>
      <el-col class="card-info" :span="16">
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
    <el-row class="info-card" :gutter="10">
      <el-col :span="8">
        <div class="card">
          <img src="../images/文档.png" alt="">
        </div>
      </el-col>
      <el-col class="card-info" :span="16">
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
    <el-row class="info-card" :gutter="10">
      <el-col :span="8">
        <div class="card">
          <img src="../images/视频.png" alt="">
        </div>
      </el-col>
      <el-col class="card-info" :span="16">
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
    <el-row class="info-card" :gutter="10">
      <el-col :span="8">
        <div class="card">
          <img src="../images/其他.png" alt="">
        </div>
      </el-col>
      <el-col class="card-info" :span="16">
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

<script setup>
import {ref, onMounted} from "vue";
import * as echarts from "echarts";
import {get} from "../api.js";
import DownloadAndUpload from "./DownloadAndUpload.vue";

// 四种类型文件的相关数据
let doc = ref({
  num: 0,
  size: 0,
})
let img = ref({
  num: 0,
  size: 0,
})
let video = ref({
  num: 0,
  size: 0,
})
let other = ref({
  num: 0,
  size: 0,
})

get("/bucket/all")
    .then((response) => {
      // 处理成功响应数据
      doc.value.num = response.docNum;
      doc.value.size = response.docSize;
      img.value.num = response.imagesNum;
      img.value.size = response.imagesSize;
      video.value.num = response.videosNum;
      video.value.size = response.videosSize;
      other.value.num = response.othNum;
      other.value.size = response.othSize;

      console.log(video.value)
      console.log("请求成功:", response);
    })
    .catch((error) => {
      // 处理错误
      console.error("请求失败:", error);
    });

const bucketNow = ref({
  fileNow: "",
  bucketNow: null,
});

const myRef = ref(null);

const initT = () => {
  if (myRef.value) {
    const myChart = echarts.init(myRef.value);
    myChart.setOption({
      title: {
        text: "存储空间",
        left: "center",
        top: "85%",
        textStyle: {
          fontSize: 20,
          color: "rgb(163,197,247)",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "60%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            formatter: "{b} ({d}%)",
          },
          data: [
            {
              name: "文档",
              value: 10,
              itemStyle: {
                color: "rgb(110,171,255)",
              },
            },
            {
              name: "图片",
              value: 10,
              itemStyle: {
                color: "rgb(255,209,60)",
              },
            },
            {
              name: "视频",
              value: 11,
              itemStyle: {
                color: "rgb(255,103,97)",
              },
            },
            {
              name: "其他",
              value: 11,
              itemStyle: {
                color: "rgb(0,154,97)",
              },
            },
          ],
          startAngle: 180,
        },
      ],
    });
  }
};
onMounted(() => {
  initT();
});

</script>


<style scoped>
.chart-box {
  width: 270px;
  height: 270px;
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
//padding: 2px; font-weight: 600;
  font-size: 14px;
  color: #181818;
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
  padding: 5px;
  padding-top: 10px;
  background-color: #F9F8FF;
}

</style>