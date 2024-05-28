<template>
  <div>
    <!-- -->
    <h3>============================》按钮</h3>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>

    <hr />
    <h3>按钮属性</h3>
    <el-button plain>朴素按钮</el-button>
    <el-button round>圆角按钮</el-button>
    <el-button circle>圆</el-button>
    <el-button disabled>禁用按钮</el-button>
    <el-button loading>加载中</el-button>

    <hr />
    <h3>尺寸</h3>
    <el-button size="large">大型按钮</el-button>
    <el-button>默认按钮</el-button>
    <el-button size="small">小型按钮</el-button>
  </div>

  <el-divider></el-divider>
  <h3>============================>图标</h3>
  <el-icon><Plus /></el-icon>
  <el-icon><Edit /></el-icon>
  <el-icon><Delete /></el-icon>
  <el-icon class="is-loading"><Loading /></el-icon>

  <hr />
  <h3>属性</h3>
  <el-icon size="30" color="red"><Search /></el-icon>

  <hr />
  <h3>按钮</h3>
  <el-button type="primary">
    <el-icon><Search /></el-icon>
    <span> 搜索 </span>
  </el-button>

  <el-button type="primary">
    <el-icon><Search /></el-icon>
  </el-button>

  <el-button type="primary" circle>
    <el-icon><Search /></el-icon>
  </el-button>
  <hr />
  <h3>按钮组</h3>
  <el-button-group>
    <el-button type="primary">
      <el-icon><Plus /></el-icon>
    </el-button>

    <el-button type="primary">
      <el-icon><Edit /></el-icon>
    </el-button>

    <el-button type="primary">
      <el-icon><Delete /></el-icon>
    </el-button>
  </el-button-group>

  <h2>===================== 提示框可以封装在专门的utils==================</h2>
  <div>
    <el-button @click="openMsg">消息</el-button>
    <el-button @click="openConfirm">确认框</el-button>
    <el-button @click="openNotifiy">通知</el-button>
    <el-button @click="openNotifiy2">通知2</el-button>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

// 消息
const openMsg = () => {
  ElMessage({
    type: 'success', // success | warning | info | error
    message: 'aabc消息',
    showClose: true
  })
}

// 确认框
const openConfirm = () => {
  ElMessageBox.confirm('确认删除?', '标题', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(() => {
      console.log('回调确认')
    })
    .catch(() => {
      console.log('回调取消')
    })
}

// 通知
const openNotifiy = () => {
  ElNotification({
    type: 'error',
    title: '标题',
    message: 'zxwwwwww消息',
    duration: 1500 // 展示时间 [单位:毫秒]
  })
}

// 通知2
const openNotifiy2 = () => {
  ElNotification({
    type: 'success', // success | warning | info | error
    title: '标题',
    message: 'abcccccc消息',
    duration: 1500,
    position: 'bottom-right'
  })
}
</script>
