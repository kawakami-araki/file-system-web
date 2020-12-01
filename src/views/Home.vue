<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row style="margin:0">
          <el-col :span="4">
            <div
              class="grid-content bg-purple"
              style="background: #FFFFFF; height: 50px;margin:0;margin-left:-130px"
            >
              <img
                src="../../public/timg.png"
                alt="logo示例"
              />
            </div>
          </el-col>
          <el-col :span="4"
            ><div class="grid-content bg-purple-light"
              style="background: #FFFFFF"></div
          ></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"
              style="background: #FFFFFF"></div></el-col>
          <el-col :span="4"
            ><div class="grid-content bg-purple-light"
              style="background: #FFFFFF"></div
          ></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"
              style="background: #FFFFFF"></div></el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light" style="margin-right: 20px;background: #FFFFFF;line-height:0;text-align:right;padding-top:20px">
              <span><a href="">登录</a> / <a href="">注册</a></span>
            </div>
          </el-col>
        </el-row>
      <hr style="margin-top:-20px;margin-left:180px">
      </el-header>
      <el-container height='80vh'>
        <el-aside width="initial">
            <div id="btn">
              <span @click="isCollapseBtn" v-if="!isCollapse">
                ——<br />
                ——<br />
                ——<br />
              </span>
              <span @click="isCollapseBtn" v-if="isCollapse">
                |  |  |<br />
                |  |  |<br />
              </span>
            </div>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#FFFFFF"
              text-color="black"
              active-text-color="#409eff"
              :unique-opened="true"
              :collapse-transition="true"
              :router="true"
              :collapse='isCollapse'
            >
              <!-- 一级菜单 -->
              <el-submenu
                :index="'/' + item.path"
                v-for="(item, index) in menulist"
                :key="index"
              >
                <!-- 一级菜单模版区域 -->
                <template slot="title">
                  <!-- 图标 -->
                  <i :class="iconsObj[item.id]"></i>
                  <!-- 文本 -->
                  <span>{{ item.name }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item
                  :index="'/' + item2.path"
                  v-for="(item2, index) in item.children"
                  :key="index"
                >
                  <template slot="title">
                    <!-- 图标 -->
                    <!-- <i class="el-icon-menu"></i> -->
                    <!-- 文本 -->
                    <span>{{ item2.name }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-main style="margin-top:80px;margin-left: 50px">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 菜单列表
      menulist: [
        {
          id: 1,
          name: "总览",
          path: "base",
          children: [{ id: 11, name: "总览", path: "base"}]
        },
        {
          id: 2,
          name: "文件",
          path: "search",
          children: [
            { id: 21, name: "全部文件", path: "show"},
            { id: 22, name: "文件搜索", path: "search"}
          ]
        },
        {
          id: 3,
          name: "图片",
          path: "3",
          children: [
            { id: 31, name: "全部图片", path: "photo_show"},
            { id: 32, name: "图片搜索", path: "photo_search"}
          ]
        },
        {
          id: 4,
          name: "MF4",
          path: "4",
          children: [
            { id: 41, name: "全部文件", path: "mf4_show"},
            { id: 42, name: "MF4文件搜索", path: "mf4_search"},
            { id: 44, name: "数据提取", path: "data_analysis"},
          ]
        },
        {
          id: 5,
          name: "开发者",
          path: "5",
          children: [{ id: 51, name: "功能拓展建议", path: "root"}]
        },
        {
          id: 6,
          name: "关于",
          path: "6",
          children: [
            { id: 61, name: "系统功能介绍", path: "" },
            { id: 62, name: "关于", path: "" }
          ]
        }
      ],
      iconsObj: {
        1: "el-icon-pie-chart",
        2: "el-icon-s-order",
        3: "el-icon-picture",
        4: "el-icon-s-cooperation",
        5: "el-icon-s-custom",
        6: "el-icon-s-help"
        // '7': 'el-icon-message-solid',
      },
      isCollapse: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    isCollapseBtn() {
      this.isCollapse = !this.isCollapse;
      
    }
  }
};
</script>

<style lang="stylus">
#btn {
  width 100%
  height 15px
  line-height 5px
  text-align center
  color gray
  // margin-top 1px
  padding-top 50px
  // border-top 1px solid black
  }
.el-header {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-container {
  height: 95vh;
}

.el-aside {
  background-color: #FFFFFF;
  color: #333;
  text-align: left;
  line-height: 200px;
  .el-menu {
        border-right: none;
    }
}

.el-main {
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: center;
  line-height: 160px;
  height 80vh
}

.el-menu-vertical-demo {
  background-color: #D3DCE6;
  
  &:not(.el-menu--collapse) {
    width: 200px;
    height 80vh
  }
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  min-height: 50px;
  margin-top: 5px;
  margin-right: 15px;
}
</style>
