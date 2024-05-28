<template>
  <div style="width: 400px">
    <!-- -->
    <!-- clearable 可一键清空 -->
    <h3>输入框</h3>
    <el-input v-model="name" clearable placeholder="请输入用户名" />
  </div>

  <!-- show-password 可切换显示隐藏密码 -->
  <h3>密码框</h3>
  <el-input v-model="password" show-password placeholder="请输入密码" />

  <h3>文本域</h3>
  <el-input type="textarea" v-model="content" rows="2" />

  <h3>输入内容长度限制 - 输入框</h3>
  <el-input v-model="name" maxlength="10" show-word-limit />
  <h3>输入内容长度限制 - 文本域</h3>
  <el-input type="textarea" v-model="content" maxlength="20" rows="3" show-word-limit />

  <h3>尺寸</h3>
  大 <el-input size="large" /> 默认 <el-input /> 小 <el-input size="small" />

  <h3>前置</h3>
  <el-input v-model="url">
    <template #prepend>https://</template>
  </el-input>

  <h3>后置</h3>
  <el-input v-model="email">
    <template #append>@qq.com</template>
  </el-input>
  <h3>前置后置</h3>
  <el-input v-model="url2">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </el-input>

  <h3>前置后置扩展 - 搜索</h3>
  <el-input placeholder="请输入课程名称">
    <template #prepend>
      <el-select v-model="selected" placeholder="请选择" style="width: 100px">
        <el-option label="前端" value="1" />
        <el-option label="后端" value="2" />
        <el-option label="服务端" value="3" />
      </el-select>
    </template>
    <template #append>
      <el-button>
        <el-icon><Search /></el-icon>
      </el-button>
    </template>
  </el-input>

  <el-divider></el-divider>
  <h3>单选框</h3>
  <el-radio v-model="radio" value="1">前端</el-radio>
  <el-radio v-model="radio" value="2">后端</el-radio>
  <el-radio v-model="radio" value="3">服务端</el-radio>

  <h3>单选框 - 事件绑定</h3>
  <el-radio v-model="radio2" value="a" @change="radioChange">前端</el-radio>
  <el-radio v-model="radio2" value="b" @change="radioChange">后端</el-radio>
  <el-radio v-model="radio2" value="c" @change="radioChange">服务端</el-radio>

  <h3>单选框组</h3>
  <el-radio-group v-model="radio3" @change="radioGroupChange">
    <el-radio value="A">前端</el-radio>
    <el-radio value="B">后端</el-radio>
    <el-radio value="C">服务端</el-radio>
  </el-radio-group>

  <h3>复选框</h3>
  <el-checkbox-group v-model="checked">
    <el-checkbox value="1">前端</el-checkbox>
    <el-checkbox value="2">后端</el-checkbox>
    <el-checkbox value="3">服务端</el-checkbox>
  </el-checkbox-group>

  <h3>事件绑定</h3>
  <el-checkbox-group v-model="checked2" @change="checkboxGroupChange">
    <el-checkbox value="1">前端</el-checkbox>
    <el-checkbox value="2">后端</el-checkbox>
    <el-checkbox value="3">服务端</el-checkbox>
  </el-checkbox-group>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const password = ref('')
const content = ref('')
const url = ref('ccc.com')
const url2 = ref('aaa')
const email = ref('123456')

//const selected = ref('')
const selected = ref('2') //选中的下拉框

//单选框
const radio = ref('3')
const radio2 = ref('b')
const radio3 = ref('C')

const radioChange = (val) => {
  console.log('radioChange:', val)
}
const radioGroupChange = (val) => {
  console.log('radioGroupChange:', val)
}
//复选框
const checked = ref(['1', '2'])
const checked2 = ref([])

const checkboxGroupChange = (val) => {
  console.log('checkboxGroupChange', val)
}
</script>
