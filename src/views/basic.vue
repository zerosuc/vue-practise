<template>
  <div>
    <el-button type="primary" :icon="Edit" />
    <el-button type="primary" :icon="Share" />
    <el-button type="primary" :icon="Delete" />
    <el-button type="primary" :icon="Search">Search</el-button>
    <el-button type="primary">
      Upload<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
  </div>
  <el-divider></el-divider>

  <el-card style="max-width: 480px" shadow="hover" :body-style="{ padding: '0px' }">
    <template #header>Yummy hamburger</template>
    <img
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      style="width: 100%"
    />
  </el-card>
  <el-divider></el-divider>

  <div class="flex gap-2">
    <el-tag type="primary">Tag 1</el-tag>
    <el-tag type="success">Tag 2</el-tag>
    <el-tag type="info">Tag 3</el-tag>
    <el-tag type="warning">Tag 4</el-tag>
    <el-tag type="danger">Tag 5</el-tag>
  </div>

  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content ep-bg-purple">11</div></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple">22</div></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple">33</div></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple">44</div></el-col>
  </el-row>

  <el-divider></el-divider>

  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple {
  color: white;
  height: 100px;
  background-color: aqua;
  text-align: center;
}
.el-header {
  background-color: aquamarine;
}
.el-aside {
  background-color: blueviolet;
}

.el-main {
  background-color: bisque;
}
</style>
