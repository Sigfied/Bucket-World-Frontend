<template>
  <el-row>
    <el-col :span="17">
      <div class="show-main">
        <el-row class="top-padding"><h2>个人中心</h2></el-row>
        <el-row><span class="hello">👋你好，dwy，欢迎你的使用</span></el-row>
        <el-row class="top-padding">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="常用" name="first">
              <el-row :gutter="52">
                <el-col :span="8">
                  <div class="card card-1">
                    <img src="../images/图片.png" alt="">
                  </div>
                  <div class="text">
                    <h3>所有图片</h3>
                    <p>2023-4-20</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="card card-2">
                    <img src="../images/视频.png" alt="">
                  </div>
                  <div class="text">
                    <h3>所有视频</h3>
                    <p>2023-4-20</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="card card-3">
                    <img src="../images/文档.png" alt="">
                  </div>
                  <div class="text">
                    <h3>所有文档</h3>
                    <p>2023-4-20</p>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="最爱" name="second">123</el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row class="top-padding ">
          <el-col :span="19"><span class="title">分享小组</span></el-col>
          <el-col :span="5"><span class="smallText">查看所有</span></el-col>
        </el-row>
        <el-row :gutter="20" class="top-padding">
          <el-col :span="7">
            <el-card shadow="hover">
              <el-row>
                <el-col :span="12">
                  <img src="../images/文件夹.png" alt="Image" class="folder">

                </el-col>
                <el-col :span="12">
                  <div>
                    <el-avatar :src="member.src" :key="member.id" v-for="member in members" :size="20"
                               shape="circle"></el-avatar>
                    <div class="smallTitle">桶世界小组</div>
                    <div class="number">文件数：12</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="7">
            <el-card shadow="hover">
              <el-row>
                <el-col :span="12">
                  <img src="../images/文件夹.png" alt="Image" class="folder">

                </el-col>
                <el-col :span="12">
                  <div>
                    <el-avatar :src="member.src" :key="member.id" v-for="member in members" :size="20"
                               shape="circle"></el-avatar>
                    <div class="smallTitle">桶世界小组</div>
                    <div class="number">12 Files</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="7">
            <el-card shadow="hover">
              <el-row>
                <el-col :span="12">
                  <img src="../images/文件夹.png" alt="Image" class="folder">

                </el-col>
                <el-col :span="12">
                  <div>
                    <el-avatar :src="member.src" :key="member.id" v-for="member in members" :size="20"
                               shape="circle"></el-avatar>
                    <div class="smallTitle">桶世界小组</div>
                    <div class="number">12 Files</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>

        <el-row class="top-padding title">最近文件</el-row>
        <el-row class="top-padding">
          <el-col class="info-card" :span="5">
            <el-row :gutter="5">
              <el-col :span="6">
                <div class="small-card">
                  <img src="../images/图片.png" alt="">
                </div>
              </el-col>
              <el-col class="card-info" :span="18">
                <el-row class="smallTitle">视频</el-row>
                <el-row class="smallText">
                  2023-05-20
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="info-card" :span="5">
            <el-row :gutter="5">
              <el-col :span="6">
                <div class="small-card">
                  <img src="../images/图片.png" alt="">
                </div>
              </el-col>
              <el-col class="card-info" :span="18">
                <el-row class="smallTitle">视频</el-row>
                <el-row class="smallText">
                  2023-05-20
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="info-card" :span="5">
            <el-row :gutter="5">
              <el-col :span="6">
                <div class="small-card">
                  <img src="../images/图片.png" alt="">
                </div>
              </el-col>
              <el-col class="card-info" :span="18">
                <el-row class="smallTitle">视频</el-row>
                <el-row class="smallText">
                  2023-05-20
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="info-card" :span="5">
            <el-row :gutter="5">
              <el-col :span="6">
                <div class="small-card">
                  <img src="../images/图片.png" alt="">
                </div>
              </el-col>
              <el-col class="card-info" :span="18">
                <el-row class="smallTitle">视频</el-row>
                <el-row class="smallText">
                  2023-05-20
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="info-card smallText" :span="2">……</el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="6">
      <EChart></EChart>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from 'vue'
import EChart from "../components/EChart.vue";

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

let members = ref([
  {id: 1, src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
  {id: 2, src: '../images/开始.png'},
  {id: 3, src: '../images/分享.png'}
]);

console.log(members)
</script>

<style scoped lang="scss">
.demo-tabs {
  :deep(.el-tabs__item) {
    color: gray;
    font-size: 16px;
    font-weight: 600;
  }

  :deep(.is-active) {
    color: #181818 !important;
    font-size: 16px;
    font-weight: 600;
  }
}


.hello {
  margin-top: -18px;
  color: gray;
  font-weight: 600;
  font-size: 14px;
}

.top-padding {
  padding-top: 12px;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-sizing: border-box;
}

.card img {
  width: 100px;
  height: 100px;
  max-width: 130%;
  max-height: 130%;
}

.text {
  text-align: center;
  padding: 10px;
  margin: 0;
}

.text h3 {
  color: #181818;
  font-weight: 600;
  font-size: 13px;
  margin: 0;
}

.text p {
  color: gray;
  font-weight: 600;
  font-size: 8px;
  margin: 0;
}

.card-1 {
  background-color: #FEF1E9;
}

.card-2 {
  background-color: #E8F0F2;
}

.card-3 {
  background-color: #EAEFFF;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.folder {
  width: 60%;
  height: auto;
}

.number {
  font-size: 10px;
  font-weight: 600;
  color: gray;
  margin-top: 2px;
  //padding-left: 5px;
}

.el-avatar {
  box-shadow: 0 0 0 3px #ffffff;
}

.el-avatar + .el-avatars {
  margin-left: -2px; /* 调整重叠的距离，根据需要进行调整 */
}

.small-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 7px;
  box-sizing: border-box;
}

.small-card img {
  margin: 5px;
  width: 30px;
  height: 30px;
  max-width: 100%;
  max-height: 100%;
}

.smallTitle {
  font-weight: 600;
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

.see-all {
  float: right;
}

</style>