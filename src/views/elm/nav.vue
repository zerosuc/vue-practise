<template>
  <div>
    <!-- -->
    <h3>=======> 水平导航</h3>
    <el-menu mode="horizontal" :default-active="selectedIndex" @select="selected">
      <el-menu-item index="1">谷歌</el-menu-item>
      <el-sub-menu index="2">
        <template #title>我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>

    <h3>========》 水平导航-自定义样式</h3>
    <el-menu
      mode="horizontal"
      :default-active="selectedIndex"
      @select="selected"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 40px; width: 600px"
    >
      <el-menu-item index="1">国家电网</el-menu-item>
      <el-sub-menu index="2">
        <template #title>我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>

    <el-divider></el-divider>

    <h3>=========》 垂直导航</h3>
    <br />
    <el-menu :default-active="selectedIndex" @select="selected" style="width: 200px">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Search /></el-icon>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><Edit /></el-icon>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><Delete /></el-icon>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>

    <el-divider></el-divider>

    <h3>========================= >垂直导航-默认展开和自定义样式</h3>
    <el-menu
      :default-active="selectedIndex"
      @select="selected"
      :default-openeds="defaultOpeneds"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width: 200px"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Search /></el-icon>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><Edit /></el-icon>
        <template #title>导航二</template>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Search /></el-icon>
          <span>导航三</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
  </div>

  <el-divider></el-divider>
  <h3>==================> 面包屑</h3>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item><a href="#">首页</a></el-breadcrumb-item>
    <el-breadcrumb-item>负载</el-breadcrumb-item>
    <el-breadcrumb-item>deploy</el-breadcrumb-item>
  </el-breadcrumb>
  <el-divider></el-divider>

  <h3>==================> 导航栏 下拉菜单</h3>
  <br />
  <el-dropdown @command="userCommand">
    <span>
      个人中心 <el-icon><User /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="order">订单</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'

//默认选中的菜单索引
//const selectedIndex = ref("2-2")
const selectedIndex = ref('3')

//选中菜单触发的回调
const selected = (index, indexPath) => {
  console.log('index', index, 'indexPath', indexPath)
}

//默认展开的菜单索引
const defaultOpeneds = ref(['1', '3'])
//用户执行的命令
const userCommand = (command) => {
  //点击菜单触发的回调
  console.log('command:', command)
}
</script>
