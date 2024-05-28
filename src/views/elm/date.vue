<template>
  <div>
    <!-- 日期选择器示例 -->
    <h3>日期</h3>
    <el-date-picker v-model="date" type="date" placeholder="请选择" />

    <h3>日期时间 有时分秒的</h3>
    <el-date-picker v-model="date" type="datetime" placeholder="请选择" />

    <h3>事件绑定</h3>
    <el-date-picker
      v-model="date"
      type="datetime"
      value-format="YYYY-MM-DD HH:mm:ss"
      @change="dateChange"
    />
  </div>

  <el-divider></el-divider>

  <el-form :model="data" ref="refForm" label-width="80px" style="width: 400px">
    <el-form-item label="文本框" prop="name">
      <el-input v-model="data.name" placeholder="请填写名称" />
    </el-form-item>

    <el-form-item label="单选框" prop="radio">
      <el-radio-group v-model="data.radio">
        <el-radio value="1">前端</el-radio>
        <el-radio value="2">后端</el-radio>
        <el-radio value="3">服务端</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="复选框" prop="checkbox">
      <el-checkbox-group v-model="data.checkbox">
        <el-checkbox value="a">前端</el-checkbox>
        <el-checkbox value="b">后端</el-checkbox>
        <el-checkbox value="c">服务端</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="日期时间" prop="date">
      <el-date-picker v-model="data.date" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
    </el-form-item>

    <el-form-item label="下拉框" prop="select">
      <el-select v-model="data.select" placeholder="请选择">
        <el-option value="A" label="前端" />
        <el-option value="B" label="后端" />
        <el-option value="C" label="服务端" />
      </el-select>
    </el-form-item>

    <el-form-item label="多选框" prop="multipleSelect">
      <el-select v-model="data.multipleSelect" multiple placeholder="请选择">
        <el-option value="AA" label="前端" />
        <el-option value="BB" label="后端" />
        <el-option value="CC" label="服务端" />
      </el-select>
    </el-form-item>

    <el-form-item label="文本域" prop="textarea">
      <el-input type="textarea" v-model="data.textarea" rows="2" placeholder="请填写内容" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="add">添加</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const date = ref('')

const dateChange = (val) => {
  console.log('dateChange:', val)
}

const refForm = ref(null)

const data = ref({
  name: '',
  radio: '',
  checkbox: [],
  date: '',
  select: '',
  multipleSelect: [],
  textarea: ''
})

const add = () => {
  console.log(data.value)
}

const resetForm = () => {
  if (refForm.value) {
    refForm.value.resetFields()
  }
}
</script>
