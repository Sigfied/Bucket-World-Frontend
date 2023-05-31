<template>
  <el-row>
    <el-col :span="23">
      <div class="left-padding">
        <el-row class="top-padding"><h2>分享组群</h2></el-row>
        <el-row>
          <span class="hello">👋你好，dwy，欢迎你的使用</span>
        </el-row>
        <el-row>
          <el-col :span="8">
            <h2>Quick Access</h2>
          </el-col>
          <el-col :span="15">
            <div class="input-area">
              <el-input
                  v-model="searchInput"
                  placeholder="请输入"
                  class="input-with-select">
                <template #append>
                  <span class="iconfont icon-sousuo"></span>
                </template>
              </el-input>
            </div>

          </el-col>

        </el-row>
        <el-row class="top-padding" gutter="50">
          <el-table :data="tableData" style="width: 93%" :row-style="{height:'80px'}">
            <el-table-column prop="name" label="组名" width="180">
              <template #default="scope">
                <span class="icon iconfont" :class="scope.row.icon"></span>
                <span class="table-title">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="上次修改时间">
              <template #default="scope">
                <span class="table-title">{{ scope.row.lastModifiedDate }}</span><br/>
                <span>By {{ scope.row.owner }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="size" sortable label="文件大小">
              <template #default="scope">
                <span class="table-title">{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="owner" label="拥有者">
              <template #default="scope">
                <span class="table-title">{{ scope.row.owner }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="member" label="成员">
              <template #default="scope">
                <el-avatar v-for="(data,index) in scope.row.members"
                           :key="index"
                           class="avatars" :size="30"
                           :src="data.avatar"
                ></el-avatar>
                <el-avatar v-if="scope.row.members.length>2" class="avatars" :size="30">
                  <img>+{{ scope.row.members.length - 2 }}
                </el-avatar>
              </template>
            </el-table-column>
            <el-table-column width="80">
              <template #default>
                <el-dropdown trigger="click">
                  <span class="iconfont icon-sangedian-copy">
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>查看</el-dropdown-item>
                      <el-dropdown-item>编辑</el-dropdown-item>
                      <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-col>
    <!--   右侧   -->
  </el-row>
</template>


<script setup>
import {ref} from 'vue'
import EChart from "../components/EChart.vue";

const searchInput = ref('')
const tableData = [
  {
    icon: 'icon-DOCX',
    name: 'G docs',
    lastModifiedDate: '2 min ago',
    size: '0.98KB',
    owner: 'John',
    members: [
      {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        link: '',
      },
      {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        link: '',
      },
      {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        link: '',
      }
    ]
  },
  {
    icon: 'icon-XLS',
    name: 'Work Sheet',
    lastModifiedDate: '3 hours',
    size: '0.98KB',
    owner: 'Vintch',
    members:
        [
          {
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            link: '',
          },
          {
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            link: '',
          },
        ]
  },
  {
    icon: 'icon-PDF',
    name: 'Form news',
    lastModifiedDate: 'Yesterday 8.18 PM',
    size: '1.2MB',
    owner: 'Markis',
    members: [
      {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        link: '',
      },

    ]
  },
  {
    icon: 'icon-MP4',
    name: 'Project slide',
    lastModifiedDate: 'Yesterday 5.18 PM',
    size: '0.98KB',
    owner: 'Oliga',
    members: [
      {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        link: '',
      },
      {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        link: '',
      },
      {
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        link: '',
      }
    ]
  },
  {
    icon: 'icon-XLS',
    name: 'Work Sheet',
    lastModifiedDate: '3 hours',
    size: '0.98KB',
    owner: 'Vintch',
    members:
        [
          {
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            link: '',
          },
          {
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            link: '',
          },
          {
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            link: '',
          }
        ]
  },
  {
    icon: 'icon-XLS',
    name: 'Work Sheet',
    lastModifiedDate: '3 hours',
    size: '0.98KB',
    owner: 'Vintch',
    members:
        [
          {
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            link: '',
          }
        ]
  },
]

</script>

<style scoped lang="scss">
@import url(../assets/font_4094392_70o7k4r745u/iconfont.css);
@import url(../assets/themecss/theme.scss);

.icon {
  padding-right: 5px;
}

.table-title {
  font-weight: bold;
  color: #000000
}

.avatars {
  box-shadow: 0 0 0 3px #ffffff;
}

.avatars + .avatars {
  margin-left: -2px; /* 调整重叠的距离，根据需要进行调整 */
}

:deep(.el-col.el-col-15) {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.left-padding {
  padding-left: 80px;
}

.hello {
  margin-top: -18px;
  color: gray;
  font-weight: 600;
  font-size: 14px;
}

.top-padding {
  padding-top: 18px;
}

</style>