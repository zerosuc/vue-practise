<template>
  <el-container style="height: 100vh">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-content">
        <el-affix :offset="10">
          <div class="icon-with-text">
            <!-- <el-icon size="30"><Menu /></el-icon> -->
            <svg class="icon" aria-hidden="true" width="20" height="20">
              <use xlink:href="#icon-k8s"></use>
            </svg>
            <span class="icon-text">Kubernetes</span>
          </div>
        </el-affix>

        <span class="title">中星微云管平台</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 侧边栏和内容区域 -->
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="defaultOpeneds" class="el-menu-vertical-demo" router>
          <el-sub-menu index="1">
            <template #title>
              <div class="menu-item">
                <el-icon><Setting /></el-icon>
                <span>管理</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/main">仪表盘</el-menu-item>
              <el-menu-item index="/dashboard/basic">basic</el-menu-item>
              <el-menu-item index="/dashboard/container">容器管理</el-menu-item>
              <el-menu-item index="/login">登录</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <div class="menu-item">
                <el-icon><Document /></el-icon>
                <span>日志</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/form">表单</el-menu-item>
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
              <el-menu-item index="/container">非子container</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <div class="menu-item">
                <el-icon><Document /></el-icon>
                <span>日志</span>
              </div>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/form">表单</el-menu-item>
              <el-menu-item index="/dashboard/form2">访问日志</el-menu-item>
              <el-menu-item index="/container">非子container</el-menu-item>
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
              <el-menu-item index="/dashboard/form">表单</el-menu-item>
              <el-menu-item index="/dashboard/form2">访问日志</el-menu-item>
              <el-menu-item index="/container">非子container</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 这里是 布局路由的子路由 一般只有子路由和app.vue这样的地方才有 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, Setting, Document } from '@element-plus/icons-vue'

const defaultOpeneds = ref(['1', '2'])
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
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

.el-dropdown-menu {
  min-width: 160px;
}

.el-dropdown-item {
  white-space: nowrap;
}

.el-menu {
  height: 100%;
  border-right: 1px solid #ebeef5;
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

/** header menu */
.icon-with-text {
  display: flex;
  align-items: center;
}

.icon-text {
  margin-left: 5px; /* 根据需要调整 */
  font-size: 20px; /* 根据需要调整 */
}
.icon {
  width: 30px;
  height: 40px;
}
</style>
