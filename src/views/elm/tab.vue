<template>
  <div>
    <!-- -->
    <h3>标签页</h3>
    <el-tabs v-model="selectedName" @tab-click="tabClick">
      <el-tab-pane label="go" name="1">内容1</el-tab-pane>
      <el-tab-pane label="golag" name="2">内容2</el-tab-pane>
      <el-tab-pane label="vue3" name="3">内容3</el-tab-pane>
    </el-tabs>
  </div>
  <el-divider></el-divider>
  <div>
    <h3>卡片风格</h3>
    <el-tabs v-model="selectedName" @tab-click="tabClick" type="card">
      <el-tab-pane label="vite" name="a">内容1</el-tab-pane>
      <el-tab-pane label="pinia" name="b">内容2</el-tab-pane>
      <el-tab-pane label="gorm" name="c">内容3</el-tab-pane>
    </el-tabs>
  </div>
  <el-divider></el-divider>
  <div>
    <h3>带有边框的卡片风格</h3>
    <el-tabs v-model="selectedName" @tab-click="tabClick" type="border-card">
      <el-tab-pane label="golang" name="A">内容1</el-tab-pane>
      <el-tab-pane label="vue3" name="B">内容2</el-tab-pane>
      <el-tab-pane label="mysql" name="C">内容3</el-tab-pane>
    </el-tabs>
  </div>
  <el-divider></el-divider>
  <div>
    <h3>动态添加</h3>
    <el-button @click="tabAdd">添加</el-button>

    <el-tabs v-model="selectedName" @tab-remove="tabRemove" closable type="card">
      <el-tab-pane
        v-for="value in tab.arr"
        :key="value.name"
        :label="value.title"
        :name="value.name"
      >
        {{ value.content }}
      </el-tab-pane>
    </el-tabs>
  </div>

  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[10, 20, 30, 40]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="40"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref } from 'vue'

let selectedName = ref('1')
// const tabClick = () => {}
//选中标签触发的回调
const tabClick = (tab, event) => {
  console.log('tab', tab.props, 'event', event)
}

const tab = ref({
  arr: [
    { name: '1', title: 'go', content: '内容1' },
    { name: '2', title: 'mysql', content: '内容2' },
    { name: '3', title: 'vue', content: '内容3' }
  ]
})
//添加
const tabAdd = () => {
  let index = tab.value.arr.length
  index++

  tab.value.arr.push({
    name: index,
    title: '新选项卡' + index,
    content: '内容' + index
  })
}

//移除
const tabRemove = (name) => {
  console.log('name:', name)

  const index = tab.value.arr.findIndex((value) => {
    return value.name === name
  })

  tab.value.arr.splice(index, 1) //移除元素
}

//分页
const currentPage4 = ref(4)
const pageSize4 = ref(10)
const background = ref(true)
const small = ref(false)
const disabled = ref(false)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>
