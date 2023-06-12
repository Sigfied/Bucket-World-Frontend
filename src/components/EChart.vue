<template>
    <div class="left-padding">
        <el-badge :value="12" class="item">
            <el-dropdown trigger="click">
                <img src="../images/通知.png" class="notification-icon" alt="Notification" slot="dropdown-trigger"/>
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

<script setup lang="ts">
import {ref, onMounted} from "vue";
import * as echarts from "echarts";
import DownloadAndUpload from "./DownloadAndUpload.vue";
import {All} from "../api/bucket.ts";
import {BucketStore} from "../store/bucket.ts";

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
    {id: 1, message: "通知1"},
    {id: 2, message: "通知2"},
    {id: 3, message: "通知3"},
]);

const initT = (imagesSizeNum, imagesSize, videosSizeNum, videosSize, docSizeNum, docSize, othSizeNum, othSize) => {
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
onMounted(async () => {

    let res = await All();
    console.log(res);
    doc.value.num = res.docNum;
    doc.value.size = res.docSize;
    img.value.num = res.imagesNum;
    img.value.size = res.imagesSize;
    video.value.num = res.videosNum;
    video.value.size = res.videosSize;
    other.value.num = res.othNum;
    other.value.size = res.othSize;
    bucketStore.allResult = res
    
    initT(res.imagesSizeNum, res.imagesSize, res.videosSizeNum, res.videosSize, res.docSizeNum, res.docSize, res.othSizeNum, res.othSize);
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