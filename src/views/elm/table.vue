<template>
  <div style="width: 100px">
    <h3>下拉框</h3>

    <el-select v-model="selected" placeholder="请选择">
      <el-option value="1" label="前端" />
      <el-option value="2" label="后端" />
      <el-option value="3" label="服务端" />
    </el-select>

    <h3>下拉框 - 事件绑定</h3>
    <el-select v-model="selected2" @change="selectChange" placeholder="请选择">
      <el-option value="a" label="前端" />
      <el-option value="b" label="后端" />
      <el-option value="c" label="服务端" />
    </el-select>
  </div>

  <h3>动态下拉框</h3>
  <el-select v-model="selected3" placeholder="请选择">
    <el-option
      v-for="item in data.options"
      :value="item.value"
      :label="item.label"
      :key="item.value"
    />
  </el-select>
  <h3>多选 - multiple</h3>
  <el-select v-model="selected4" multiple @change="selectChange" placeholder="请选择">
    <el-option value="1" label="前端" />
    <el-option value="2" label="后端" />
    <el-option value="3" label="服务端" />
  </el-select>
</template>

<script setup>
import { ref, reactive } from 'vue'

const selected = ref('2')
const selected2 = ref('')
//回调
const selectChange = (val) => {
  console.log('selectChange111:', val)
}
const selected3 = ref('C')
const selected4 = ref(['1', '3'])

const data = reactive({
  options: [
    { value: 'A', label: '前端' },
    { value: 'B', label: '后端' },
    { value: 'C', label: '服务端' }
  ]
})
</script>
