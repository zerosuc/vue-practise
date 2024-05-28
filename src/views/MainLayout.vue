<template>
  <el-container style="height: 100vh">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-content">
        <el-affix :offset="10">
          <div class="icon-with-text">
            <svg class="icon" aria-hidden="true" width="20" height="20">
              <use xlink:href="#icon-k8s"></use>
            </svg>
            <span class="icon-text">Kubernetes</span>
          </div>
        </el-affix>
        <span class="title">中星微云管平台</span>
        <el-dropdown @command="handelCommand">
          <span class="el-dropdown-link">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 侧边栏和内容区域 -->
    <el-container>
      <el-aside width="200px" class="aside" style="background-color: #303133">
        <el-menu :default-openeds="defaultOpeneds" class="el-menu-vertical-demo" router>
          <el-menu-item index="/dashboard">仪表盘</el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <div class="menu-item">
                <el-icon><Setting /></el-icon>
                <span>管理</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/basic">basic</el-menu-item>
              <el-menu-item index="/dashboard/container">容器管理</el-menu-item>
              <el-menu-item index="/login">登录</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <div class="menu-item">
                <el-icon><Document /></el-icon>
                <span>日志</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/deploy">deploy</el-menu-item>
              <el-menu-item index="/dashboard/form2">访问日志</el-menu-item>
              <el-menu-item index="/container">非子container</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <div class="menu-item">
                <el-icon><Document /></el-icon>
                <span>日志</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/form">表单</el-menu-item>
              <el-menu-item index="/dashboard/form2">访问日志</el-menu-item>
              <el-menu-item index="/dashboard/date">日期时间</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <div class="menu-item">
                <el-icon><Document /></el-icon>
                <span>elemPlus组件</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/basic1">基本组件</el-menu-item>
              <el-menu-item index="/dashboard/nav">导航相关</el-menu-item>
              <el-menu-item index="/dashboard/tab">tab</el-menu-item>
              <el-menu-item index="/dashboard/form-vip">表单</el-menu-item>
              <el-menu-item index="/dashboard/table">表格</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 其他子菜单 -->
        </el-menu>
      </el-aside>

      <el-container>
        <el-main class="main">
          <router-view />
        </el-main>
        <el-footer class="footer">
          <el-icon style="width: 2em; top: 3px; font-size: 18px"><Place /></el-icon>
          <a class="footer el-icon-place">devops platform</a>
        </el-footer>
        <!-- <el-backtop target=".el-main" :right="100" :bottom="100" /> -->
        <el-backtop :right="100" :bottom="100" />
        <el-backtop :bottom="100">
          <div
            style="
              height: 100%;
              width: 100%;
              background-color: var(--el-bg-color-overlay);
              box-shadow: var(--el-box-shadow-lighter);
              text-align: center;
              line-height: 40px;
              color: #1989fa;
            "
          >
            UP
          </div>
        </el-backtop>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Setting, Document, Place } from '@element-plus/icons-vue'
import router from '@/router'

const defaultOpeneds = ref(['1', '2', '3', '4', '5'])

// 处理命令回调
const handelCommand = (command) => {
  switch (command) {
    case 'info':
      console.log(command)
      // info();
      break
    case 'logout':
      HandleLogout()
      break
  }
}

const HandleLogout = () => {
  console.log('exit')
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #303133;
  color: #ffffff;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-content .title {
  font-size: 20px;
  font-weight: bold;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.el-icon {
  font-size: 24px;
  margin-right: 10px;
}

.el-menu {
  height: 100%;
  /* border-right: 1px solid #ebeef5; */
}

.menu-item {
  display: flex;
  align-items: center;
}

.menu-item .el-icon {
  margin-right: 8px;
}

.el-menu-item,
.el-submenu__title {
  padding-left: 15px !important;
}

.el-submenu {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

.el-menu-item,
.el-submenu__title {
  line-height: 36px !important;
  height: 36px !important;
}

.icon-with-text {
  display: flex;
  align-items: center;
}

.icon-text {
  margin-left: 5px;
  font-size: 20px;
}

.icon {
  width: 50px;
  height: 50px;
}

.aside {
  transition: all;
  /* background-color: #131b27; */
  background-color: #303133;
  overflow-y: auto;
}

.aside::-webkit-scrollbar {
  display: none;
}

.aside {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.main {
  padding: 10px;
  overflow-y: auto;
  /* height: calc(100vh - 120px); */
}

.footer {
  z-index: 1200;
  color: rgb(187, 184, 184);
  font-size: 14px;
  text-align: center;
  line-height: 60px;
}
</style>
