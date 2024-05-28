<template>
  <div>
    <!-- -->
    <el-button @click="dialog = true">打开</el-button>
    <!-- draggable 允许拖拽 -->
    <el-dialog v-model="dialog" width="500" title="标题" draggable @close="dialogClose">
      <el-form label-width="80">
        <el-form-item label="文本框">
          <el-input v-model="data.name" placeholder="请填写名称" />
        </el-form-item>

        <el-form-item label="单选框">
          <el-radio-group v-model="data.radio">
            <el-radio value="1">前端</el-radio>
            <el-radio value="2">后端</el-radio>
            <el-radio value="3">服务端</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="复选框">
          <el-checkbox-group v-model="data.checkbox">
            <el-checkbox value="a">前端</el-checkbox>
            <el-checkbox value="b">后端</el-checkbox>
            <el-checkbox value="c">服务端</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="日期时间">
          <el-date-picker v-model="data.date" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>

        <el-form-item label="下拉框">
          <el-select v-model="data.select" placeholder="请选择">
            <el-option value="A" label="前端" />
            <el-option value="B" label="后端" />
            <el-option value="C" label="服务端" />
          </el-select>
        </el-form-item>

        <el-form-item label="多选框">
          <el-select v-model="data.multipleSelect" multiple placeholder="请选择">
            <el-option value="AA" label="前端" />
            <el-option value="BB" label="后端" />
            <el-option value="CC" label="服务端" />
          </el-select>
        </el-form-item>

        <el-form-item label="文本域">
          <el-input type="textarea" v-model="data.textarea" rows="2" placeholder="请填写内容" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

  <el-divider></el-divider>
  <el-divider></el-divider>
  <el-divider></el-divider>

  <h3>表格</h3>
  <el-table :data="data1.arr" style="width: 800px">
    <el-table-column prop="id" label="编号" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="web" label="网站" width="300" />
    <el-table-column prop="date" label="日期" />
  </el-table>

  <h3>表格--带边框</h3>
  <el-table :data="data1.arr" border style="width: 800px">
    <el-table-column prop="id" label="编号" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="web" label="网站" width="300" />
    <el-table-column prop="date" label="日期" />
  </el-table>

  <h3>表格--带边框---设置固定高度</h3>
  <el-table :data="data1.arr" border height="150" style="width: 800px">
    <el-table-column prop="id" label="编号" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="web" label="网站" width="300" />
    <el-table-column prop="date" label="日期" />
  </el-table>

  <h3>type="selection" 多选</h3>
  <el-table :data="data1.arr" border style="width: 800px">
    <!-- //添加了这一行 -->
    <el-table-column type="selection" width="55" />

    <el-table-column prop="id" label="编号" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="web" label="网站" width="300" />
    <el-table-column prop="date" label="日期" />
  </el-table>

  <h3>-------------------- 可以编辑按钮</h3>
  <el-button type="primary" @click="del">删除</el-button>

  <el-table
    :data="data1.arr"
    @selection-change="selected"
    border
    style="width: 900px; margin: 3px 0"
  >
    <el-table-column type="selection" width="55"></el-table-column>

    <el-table-column prop="id" label="编号" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="web" label="网站" width="300" />
    <el-table-column prop="date" label="日期" />

    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button size="small" type="primary" @click="edit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button size="small" @click="del1(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 提交分页 -->
  <!-- <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="4"
    :page-sizes="[1, 2, 3, 4]"
    :background="true"
    @current-change="handleCurrentPage"
    @size-change="handleSizeChange"
  /> -->
</template>

<script setup>
//对话框
import { ref } from 'vue'
const dialog = ref(false)

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
const dialogClose = () => {
  console.log('关闭')
}
const reset = () => {
  data.value = {
    name: '',
    radio: '',
    checkbox: [],
    date: '',
    select: '',
    multipleSelect: [],
    textarea: ''
  }
}

const data1 = ref({
  arr: [
    { id: '1', name: 'go', web: 'aaa.com', date: '2023-06-20' },
    { id: '2', name: 'vue', web: 'www.bbb.com', date: '2023-06-21' },
    { id: '3', name: 'orm', web: 'ccc.com', date: '2023-06-22' },
    { id: '4', name: 'kafka', web: 'www.ccc.com', date: '2023-06-22' }
  ]
})

// const totalConut = data1.value.arr.len

//选中的复选框
let idArr = []
const selected = (data) => {
  console.log('selected', data)

  idArr = [] //重置

  data.forEach((value) => {
    idArr.push(value.id)
  })

  console.log('idArr:', idArr)
}

// 选中后的删除  包括全部删除！！！
const del = () => {
  console.log('del:', idArr)
}
//或者这样的删除？？！！！
const del1 = (index, row) => {
  // console.log('del:', idArr)
  console.log('index:', index, 'row:', row)
}

//编辑
const edit = (index, row) => {
  console.log('index:', index, 'row:', row)
}
// //  分页组件---------
// const handleCurrentPage = (val) => {
//   console.log('currentPage:', val)
// }

// const handleSizeChange = (val) => {
//   console.log(`${val} items per page`)
// }

// const pageSize = ref(1)
// const currentPage = ref(1)
// const handleSizeChange = (val) => {
//   console.log(`Page size: ${val}`)
//   pageSize.value = val // 更新 pageSize
// }
</script>
