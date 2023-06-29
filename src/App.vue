<template>
  <el-row class="app-container" v-if="user == null">
    <el-col :span="24" class="right-contain">
      <LoginView></LoginView>
    </el-col>
  </el-row>

  <el-row class="app-container" v-if="user != null">
    <el-col :span="3" class="left-bar">
      <Menu></Menu>
    </el-col>
    <el-col :span="21" class="right-contain">
      <router-view></router-view>
    </el-col>
  </el-row>
  <!-- 将上传组件全局注册 -->
  <GlobalUploader/>
</template>
<script lang="ts" setup>
import Menu from "./components/Menu.vue";
import GlobalUploader from "./components/GlobalUploader/GlobalUploader.vue";
import LoginView from "./views/LoginView.vue";
import {useStore} from "vuex";
import {watch} from "vue";
import {ref} from "vue";

const store = useStore();
let user = ref(store.getters.getUserData);

watch(
    () => store.getters.getUserData,
    (newTaskList) => {
      user.value = newTaskList;
      console.log(user.value);
    }
);
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

.hello {
  margin-top: -18px;
  color: gray;
  font-weight: 600;
  font-size: 14px;
}

.show-main {
  padding-left: 55px;
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

