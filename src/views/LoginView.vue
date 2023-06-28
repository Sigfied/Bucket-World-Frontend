<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" :key="isLogin ? 'bigContainLogin' : 'bigContainRegister'" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="账号" v-model="form.useremail" />
            <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form.userpwd" />
            <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="tryLogin">登录</button>
        </div>
        <div class="big-contain" :key="isLogin ? 'bigContainRegister' : 'bigContainLogin'" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username" />
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="email" placeholder="账号" v-model="form.useremail" />
            <input type="password" placeholder="密码" v-model="form.userpwd" />
          </div>
          <button class="bbutton">注册</button>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" :key="isLogin ? 'smallContainRegister' : 'smallContainLogin'" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，一起加入桶世界</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" :key="isLogin ? 'smallContainLogin' : 'smallContainRegister'" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useStore } from "vuex";
import router from "../router";
import {post} from "../api/user.js";

const store = useStore();
const tryLogin = async () => {
  const response = await post('/account/login',{
    "avatar": "",
    "createTime": "",
    "id": 0,
    "motto": "",
    "name": "",
    "password": "123456",
    "updateTime": "",
    "username": "dwy" });
  console.log(response);
  store.commit('setUserData', response.data);
  ElMessage({
    showClose: true,
    message: "登录成功",
    type: "success",
  });
  router.push({
    name: "home",
  });
};

const isLogin = ref(true);
const emailError = ref(false);
const passwordError = ref(false);
const existed = ref(false);
const form = ref({
  username: "",
  useremail: "",
  userpwd: "",
});

const changeType = () => {
  isLogin.value = !isLogin.value;
  form.value.username = "";
  form.value.useremail = "";
  form.value.userpwd = "";
};
</script>

<style scoped>
.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url("../images/login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}

.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(101, 151, 255);
}

.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}

.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}

.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(101, 151, 255);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(236, 245, 255), rgb(101, 151, 255));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}

.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}

.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}

.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>
