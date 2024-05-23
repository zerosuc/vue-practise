<template>
  <el-container style="height: 100vh">
    <!-- 顶部导航栏 -->
    <el-header>
      <div class="header-content">
        <el-icon><Menu /></el-icon>
        <span class="title">中星微云管平台</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 侧边栏和内容区域 -->
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="defaultOpeneds.value">
          <el-submenu index="1">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">仪表盘</el-menu-item>
              <el-menu-item index="1-2">节点管理</el-menu-item>
              <el-menu-item index="1-3">容器管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>日志</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">系统日志</el-menu-item>
              <el-menu-item index="2-2">访问日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
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
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
}

.header-content .title {
  font-size: 20px;
  font-weight: bold;
}
</style>
