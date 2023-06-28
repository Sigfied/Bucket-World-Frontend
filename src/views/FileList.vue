<template>
  <el-row>
    <el-col :span="23">
      <div class="show-main">
        <el-row class="top-padding"><h2>存储空间</h2></el-row>
        <el-row><span class="hello"> </span></el-row>
        <el-row>
          <el-col :span="8">
            <!--            <h3>Quick Access</h3>-->
          </el-col>
          <el-col :span="15">
            <div class="input-area">
              <el-input
                  v-model="searchInput"
                  class="input-with-select"
                  placeholder="搜索"
              >
                <template #append>
                  <span class="iconfont icon-sousuo"></span>
                </template>
              </el-input>
            </div>

          </el-col>

        </el-row>
        <el-row style="height: 100%; padding-top: 20px">
          <!--   这是左边-->
          <el-col :span="5" style=" padding: 5px">
            <el-menu
                class="el-menu-vertical-demo"
                @close="handleClose"
                @open="handleOpen"
            >
              <el-menu-item
                  v-for="(item, index) in bucketList"
                  :key="index"
                  :index=index
                  style="border-radius: 20px ; margin-bottom: 10px"
                  @click="checkBucket(index)"
              >
                <img alt="" class="icon" src="../images/logo.png"/>
                <span>  {{ item.name }} </span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <!--    这是右边-->
          <el-col :span="19" style="padding-left: 1% ; ">
            <PerViewPage></PerViewPage>
            <el-row>
              <el-button :icon="ArrowLeft" size="small" @click="back"/>
              <el-breadcrumb :separator-icon="ArrowRight" style="margin-top: 5px ; margin-left: 10px">
                <el-breadcrumb-item>开始</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(file,index) in  fileNavList">{{ file }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-row>
            <el-row class="top-padding">
              <el-table
                  v-if="ifShowFile.table"
                  :data="fileShowList"
                  :row-style="{height:'80px'}" style="width: 93%"
              >
                <el-table-column label="文件名称" prop="name" width="400">
                  <template #default="scope">
                    <span :class="scope.row.icon" class="icon iconfont"></span>
                    <span class="table-title" @click="handleTableRow(scope.row,' ')">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="类型" prop="type">
                  <template #default="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="大小">
                  <template #default="scope">
                    <span>{{ scope.row.size }}</span>
                  </template>
                </el-table-column>

                <el-table-column width="80">
                  <template #default>
                    <el-dropdown trigger="click">
                  <span class="iconfont icon-sangedian-copy">
                  </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>
                            <span class="icon iconfont icon-a-fenxiang2"></span>
                            <span>分享</span>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <span class="icon iconfont icon-xiazai"></span>
                            <span>下载</span>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <span class="icon iconfont icon-icon-"></span>
                            <span>移动</span>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <span class="icon iconfont icon-fuzhi-01"></span>
                            <span>复制</span>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <span class="icon iconfont icon-shanchu"></span>
                            <span>删除</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row class="show-file">
              <video v-if="ifShowFile.video" :src="fileUrl" controls style="width: 100%"></video>
              <iframe v-if="ifShowFile.pdf" :src="fileUrl" height="500px" width="100%"></iframe>
              <img v-if="ifShowFile.img" :src="fileUrl" alt="图片">
              <audio v-if="ifShowFile.music" :src="fileUrl" controls></audio>
              <p v-if="ifShowFile.txt"> {{ txt }}</p>
            </el-row>

          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>


</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import {getFile} from "../api/api.ts";
import {getFiles, getString} from "../api/objects.ts";
import {Bucket, getBucketList} from "../api/bucket.ts";
import {getExtensionFromFileName, getObjectProperties, joinStrings, joinStrings1} from "../api/utils.ts";
import {get} from "../api/user.js";
import PerViewPage from "../components/PerViewPage.vue";

//
//右边
//
const props = defineProps({});

//二进制流url预览文件
let fileUrl = ref<string>("");

//预览文本直接打印
let txt = ref<string>("");


interface FileShow {
  etag: string
  lastModified: string
  name: string
  size: string | number
  type: string
  icon: string
}

//导航
const fileNavList = ref<string[]>(new Array<string>())

//文件信息列表
const fileShowList = ref<FileShow[]>(new Array<FileShow>())

interface IfShowFile {
  video: boolean
  pdf: boolean
  music: boolean
  txt: boolean
  img: boolean
  table: boolean
}

//控制文件展示
const ifShowFile = ref<IfShowFile>({
  video: false,
  pdf: false,
  music: false,
  txt: false,
  img: false,
  table: true,
})


interface GetDataRequest {
  bucketName: string
  prefix: string
}

//编写查看文件树axios参数
let data = <GetDataRequest>{
  bucketName: "test-15-41",
  prefix: ""
}

//编写预览文件axios参数
let showData = {
  params: {
    'bucketName': 'test-15-41',
    'objectName': ""
  }
}

//
//左边
//
//生成桶的数组
const bucketList = ref({});
const activeIndex = ref(-1); // 默认选中项的索引

const buckList = async () => {
  const response = await get('/bucket/list/1673579293235965953', {});
  console.log(response.data);
  bucketList.value = response.data;
}

function handleOpen() {
}

function handleClose() {
}

onMounted(() => {
  buckList()
})


// 处理按钮点击事件
const checkBucket = async (index: number) => {
  if (activeIndex.value === index) {
    activeIndex.value = -1;
  } else {
    activeIndex.value = index;
    console.log( bucketList.value[index].id)
    const response = await get('/document/list/'+bucketList.value[index].id ,{} );
    console.log(response);
    fileShowList.value = response.data;

  }

// };


// 监听 items 数组数据变化，并重新设置 activeIndex 的值
watch(
    () => bucketList,
    () => {
      activeIndex.value = -1;
    }
);


//获取桶内文件列表且请求参数


//返回
function back() {
  fileNavList.value.pop();
  data.prefix = joinStrings(fileNavList.value)
  getFiles(data)
  initIfShowFile();

}

//初始化展示组件（全部置为不可展示
function initIfShowFile() {
  ifShowFile.value.video = false
  ifShowFile.value.pdf = false
  ifShowFile.value.music = false
  ifShowFile.value.txt = false
  ifShowFile.value.img = false
  ifShowFile.value.table = true
}

//点击行 a.进入文件夹 b.打开图片or文件
function handleTableRow(row, type: string) {
  fileNavList.value.push(row.name);
  console.log("files", row)
  if (row.etag == "") {
    data.prefix = joinStrings(fileNavList.value)
    getFiles(data)
  } else {
    showData.params.objectName = joinStrings1(fileNavList.value)
    showFile(showData, getExtensionFromFileName(fileNavList.value[fileNavList.value.length - 1]))
    toggleFile(getExtensionFromFileName(fileNavList.value[fileNavList.value.length - 1]))
    console.log(getExtensionFromFileName(fileNavList.value[fileNavList.value.length - 1]))
  }

}

//输入字符串，让对应类型展示
function toggleFile(fileType: string): void {
  let temp = ""
  switch (fileType) {
    case (".mp4") : {
      temp = "video"
      break;
    }
    case (".pdf") : {
      temp = "pdf"
      break;
    }
    case (".mp3") : {
      temp = ".music"
      break;
    }
    case (".txt") : {
      temp = fileType
      break;
    }
    case (".png") : {
      temp = "img"
      break;
    }
    case (".jpg") : {
      temp = "img"
      break;
    }
  }

  ifShowFile.value[temp] = true;
  ifShowFile.value["table"] = false;
  console.log("ifshowFile", ifShowFile.value)
}

const fileTypes: Map<string, string> = new Map();
{
  fileTypes.set(".png", "image/png");
  fileTypes.set(".jpg", "image/jpg");
  fileTypes.set(".pdf", "application/pdf");
  fileTypes.set(".mp4", "video/mp4");
  fileTypes.set(".mp3", "audio/mp3");
}

//获取展示文件流对象
function showFile(data, type: string) {
  if (type == "txt") {
    getString(data)
        .then((response) => {
          // 处理成功响应数据
          txt.value = <string>response
          console.log("txt", txt.value)
        })
        .catch((error) => {
          // 处理错误
          console.error("请求失败:", error);
        });
  } else {
    getFile("/object/one", data)
        .then((response) => {
          // 处理成功响应数据
          // console.log(response)
          console.log(type)
          // 假设type变量的值存储在fileType中
          if (fileTypes.has(type)) {
            const mimeType = fileTypes.get(type);
            //@ts-ignore
            fileUrl.value = URL.createObjectURL(new Blob([response], {type: mimeType}));
          }
        })
        .catch((error) => {
          // 处理错误
          console.error("请求失败:", error);
        });
  }
}


}


</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: center;
}

.el-button {
  margin-right: 10px;
  background-color: #dddddd;
  color: #333333;
  border-radius: 4px;
  border: none;
  outline: none;
}

.el-button .active {
  background-color: #409eff;
  color: #ffffff;
}


.logo {
  max-width: 90%;
  height: auto;
  margin-top: 25px;
  margin-bottom: 25px;
}

.el-menu-item {
  font-weight: bold;
  color: gray;
}

.el-menu {
  max-height: 100%;
  height: 100vh;
}

.el-menu-vertical-demo .el-menu-item.is-active {
//background-color: #f5f5f5; /* 设置选中项的背景颜色 */ background-color: rgb(240, 244, 254); //color:#181818; color: rgb(111, 152, 247);
}

.el-menu-item {
  border-bottom: 1px solid #ebebeb; /* 添加菜单项之间的边框 */
}

.icon {
  margin-right: 15px;
  height: 20px;
  width: 20px;
}

</style>

<style lang="scss" scoped>
@import url(../assets/font_4094392_70o7k4r745u/iconfont.css);
@import url(../assets/themecss/theme.scss);

.icon {
  padding-right: 10px;
}

.table-title {
  font-weight: bold;
  color: #000000
}

.icon-sangedian-copy {
  transform: rotate(90deg);
}

:deep(.el-col.el-col-15) {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.left-padding {
  padding-left: 80px;
}

</style>
