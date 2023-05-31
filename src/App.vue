<template>
  <el-row>
    <el-col :span="3">
      <!--            <NavBar></NavBar>-->
      <Menu></Menu>
    </el-col>
    <el-col :span="21">
      <router-view/>
    </el-col>
  </el-row>
</template>

<style>
@import "assets/font/font.css";

body {
  font-family: 'Tong', 'Times New Roman', serif; /* 英文字体设置 */
}

h1, h2, h3, h4, h5, h6,
p, span, div, label, button {
  font-family: 'Tong', sans-serif; /* 中文字体设置 */
}

.show-main {
  padding-left: 105px;
  padding-right: 20px;
  padding-bottom: 16px;
  margin-left: 38px;
//background-color: #F6F8FF;
//border-radius: 40px; height: 98%;
  border-left: 2px solid rgb(246, 246, 246);
}
.top-padding {
  padding-top: 12px;
}

.left-padding {
  padding-left: 10%;
  border-left: 2px solid rgb(246, 246, 246);
  height: 100%;
}
</style>

<script setup>
import NavBar from "./components/NavBar.vue";
import Menu from "./components/Menu.vue";
</script>