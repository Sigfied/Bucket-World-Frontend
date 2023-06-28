<template>
  <!--  <el-button style="margin-left: 10%" @click="preview()">点我预览</el-button>-->
  <el-row class="show-file" style="margin-left: 3%; margin-right: 3% ;width: 94%;height: 100%">

    <video v-if="ifShowFile.video" :src="fileUrl" controls style="width: 100%"></video>
    <iframe v-if="ifShowFile.pdf" :src="fileUrl" class="perview1"></iframe>
    <img v-if="ifShowFile.img" :src="fileUrl" alt="正在打开" class="perview1">
    <audio v-if="ifShowFile.music" :src="fileUrl" class="perview1" controls width="100%"></audio>
    <p v-if="ifShowFile.txt" class="perview1"> {{ txt }}</p>
    <div v-if="ifShowFile.excel" id="excelData">
      <table class="custom-table">
        <thead>
        <tr>
          <th v-for="header in jsonData[0]">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in jsonData.slice(1)">
          <td v-for="cell in row">{{ cell }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="ifShowFile.docx" id="container" class="container"></div>
    <div>
      <div id="wordView" class="scroll-container"/>
    </div>
    <div slot="footer"></div>
  </el-row>

</template>
<script lang="ts" setup>
//控制文件展示
import {onBeforeMount, Ref, ref, watch} from "vue";
import axios, {AxiosResponse} from "axios";
import {ElMessage} from "element-plus";
import {defaultOptions, renderAsync} from "docx-preview";
import * as XLSX from 'xlsx';
import mammoth from "mammoth";
import {saveAs} from 'file-saver'


const props = defineProps({
  documentId: {
    required: true
  },
  documentName: {
    required: true
  }
});

onBeforeMount(() => {
  console.log(props.documentId, props.documentName)
  // 当 documentId 值改变时执行的逻辑
  preview({
    params: {
      documentId: props.documentId
    }
  })
});

interface IfShowFile {
  video: boolean
  pdf: boolean
  music: boolean
  txt: boolean
  img: boolean
  table: boolean
  excel: boolean
  docx: boolean
}

const ifShowFile = ref<IfShowFile>({
  video: false,
  pdf: false,
  music: false,
  txt: false,
  img: false,
  table: false,
  excel: false,
  docx: false,
})


function preview(data) {
  let temp = getFile2("/api/download", data)
  // ifShowFile.value.img = true;
}

let fileBlob;
let fileUrl = ref<string>();
let jsonData: Ref<any[]> = ref([]);
let txt = ref<string>();

function getFileFormat(filename: string): string {
  const parts = filename.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1];
  } else {
    return '';
  }
}

function initIfShowFile() {
  ifShowFile.value.video = false
  ifShowFile.value.pdf = false
  ifShowFile.value.music = false
  ifShowFile.value.txt = false
  ifShowFile.value.img = false
  ifShowFile.value.table = false
  ifShowFile.value.excel = false
  ifShowFile.value.docx = false
}

function showPage(type: string): void {
  initIfShowFile();
  switch (type) {
    case ("mp4") : {
      ifShowFile.value.video = true;
      break;
    }
    case ("pdf") : {
      ifShowFile.value.pdf = true;
      break;
    }
    case ("mp3") : {
      ifShowFile.value.music = true;
      break;
    }
    case ("txt") : {
      ifShowFile.value.txt = true;
      break;
    }
    case ("png") : {
      ifShowFile.value.img = true;
      break;
    }
    case ("jpg") : {
      ifShowFile.value.img = true;
      break;
    }
    case ("jpeg") : {
      ifShowFile.value.img = true;
      break;
    }
    case ("xlsx") : {
      ifShowFile.value.excel = true;
    }
    case ("docx") : {
      ifShowFile.value.docx = true;
    }
  }
}

function chooseBlob(response: AxiosResponse<any>, type: string): Blob {
  const fileTypes: Map<string, string> = new Map();
  {
    fileTypes.set("png", "image/png");
    fileTypes.set("jpg", "image/jpg");
    fileTypes.set("pdf", "application/pdf");
    fileTypes.set("mp4", "video/mp4");
    fileTypes.set("mp3", "audio/mp3");
    fileTypes.set("jpeg", "image/jpeg");
    fileTypes.set("doc", "application/octet-stream");
    fileTypes.set("docx", "application/pdf");
    fileTypes.set("xls", "application/vnd.ms-excel");
    fileTypes.set("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }
  return new Blob([response.data], {type: fileTypes.get(type)});
}

function perViewDocx(blob) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  reader.onload = function (e) {
    var arrayBuffer = e.target.result; //arrayBuffer
    mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(displayResult).done();
  };

  function displayResult(result) {
    document.getElementById("wordView").innerHTML = result.value;
  }

}


function getFile2(url: string, data: any) {
  let fileApi = axios.create({
    baseURL: "http://localhost:9000",
    responseType: "blob",

  });
  return fileApi.get(url, data)
      .then(response => {
        const contentDisposition = props.documentName;
        let type = getFileFormat(contentDisposition);
        showPage(type);
        console.log(type)

        if (type == "docx") {
          perViewDocx(chooseBlob(response, type))
        } else if (type == "xsl" || type == "xlsx") {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const jsonData1 = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            jsonData.value = jsonData1;
            console.log(jsonData.value[0]);
          };
          reader.readAsArrayBuffer(response.data);
        } else if (type == "txt") {
          const reader = new FileReader();
          reader.onload = function () {
            const text = reader.result; // 获取读取的文本数据
            txt.value = text as any;
          };
          reader.readAsText(response.data); // 将 Blob 数据转换为文本
        } else {
          console.log(response)
          fileUrl.value = URL.createObjectURL(chooseBlob(response, type));
          console.log(fileUrl.value)
          console.log(ifShowFile.value)
        }
        return chooseBlob(response, type)
      })
      .catch(error => {
        // 在实际应用中，您可以根据需要处理错误，例如显示错误消息等
        ElMessage({
          showClose: true,
          message: '数据异常',
          type: 'error',
        });
        throw error;
      });
}


</script>

<style scoped>

.scroll-container {
  height: 600px; /* 设置容器的高度 */
  overflow-y: auto; /* 在垂直方向上显示滚动条，当内容超过容器高度时显示滚动条 */
}

.perview1 {
  width: 100%;
  height: 600px;
}

.pdfview {
  width: 100%;
  height: 100%;
}

.custom-table {
  border: 1px solid #ddd;
}

/* 为表格添加样式 */
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

/* 表头样式 */
thead {
  background-color: #f2f2f2;
  text-align: center;
}

th {
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

/* 表体样式 */
tbody {
  background-color: #fff;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 鼠标悬停在表格行上时的样式 */
tr:hover {
  background-color: #f9f9f9;
}

.word > > img {
  width: 100%;
}

.word {
  font-size: 16px;
}

</style>
