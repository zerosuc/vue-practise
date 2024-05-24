<template>
  <div class="not-found">
    <!-- 公用 layout 内部的 404 页面内容 -->
    <h1>404</h1>
    <p>页面未找到</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}
</style>
