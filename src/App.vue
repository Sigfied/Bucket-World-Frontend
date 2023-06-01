<template>
    <el-row class="app-container">
        <el-col :span="3" class="left-bar">
            <!--            <NavBar></NavBar>-->
            <Menu></Menu>
        </el-col>
        <el-col :span="21" class="right-contain">
            <router-view/>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import Menu from "./components/Menu.vue";
</script>

<style>
@import "assets/font/font.css";
@import "style.css";

.app-container {
    height: 100vh;
}

.left-bar {
    height: 100%;
}

.right-contain {
    height: 100%;
    overflow: hidden;
}

.show-main {
    padding-left: 105px;
    padding-right: 20px;
    padding-bottom: 16px;
    margin-left: 38px;
//background-color: #F6F8FF; //border-radius: 40px; height: 98%; border-left: 2px solid rgb(246, 246, 246);
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

