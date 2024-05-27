<template>
  <div class="deploy">
    <el-row>
      <!-- 头部1 -->
      <el-col :span="24">
        <div>
          <!-- 包一层卡片 -->
          <el-card class="deploy-head-card" shadow="never" :body-style="{ padding: '10px' }">
            <el-row>
              <!-- 命名空间的下拉框 -->
              <el-col :span="6">
                <div>
                  <span>命名空间: </span>
                  <!-- 下拉框 -->
                  <!-- filterable：带搜索功能 -->
                  <!-- placeholder 默认提示 -->
                  <!-- label 显示内容 -->
                  <!-- value 绑定到v-model的值中 -->
                  <el-select v-model="namespaceValue" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in namespaceList"
                      :key="index"
                      :label="item.metadata.name"
                      :value="item.metadata.name"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <!-- 刷新按钮 -->
              <el-col :span="2" :offset="16">
                <div>
                  <!-- 每次刷新，都重新调一次list接口，刷新表格中的数据 -->
                  <el-button style="border-radius: 2px" icon="Refresh" plain @click="getDeployments"
                    >刷新</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <!-- 头部2 -->
      <el-col :span="24">
        <div>
          <!-- 包一层卡片 -->
          <el-card class="deploy-head-card" shadow="never" :body-style="{ padding: '10px' }">
            <el-row>
              <!-- 创建按钮 -->
              <el-col :span="2">
                <div>
                  <!-- 点击后打开抽屉，填入创建deployment需要的数据 -->
                  <el-button
                    style="border-radius: 2px"
                    icon="Edit"
                    type="primary"
                    @click="createDeploymentDrawer.value = true"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    >创建</el-button
                  >
                </div>
              </el-col>
              <!-- 搜索框和搜索按钮 -->
              <el-col :span="6">
                <div>
                  <el-input
                    class="deploy-head-search"
                    clearable
                    placeholder="请输入"
                    v-model="searchInput"
                  ></el-input>
                  <el-button
                    style="border-radius: 2px"
                    icon="Search"
                    type="primary"
                    plain
                    @click="getDeployments"
                    >搜索</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <!-- 数据表格 -->
      <el-col :span="24">
        <div>
          <!-- 包一层卡片 -->
          <el-card class="deploy-body-card" shadow="never" :body-style="{ padding: '5px' }">
            <!-- 数据表格 -->
            <!-- v-loading用于加载时的loading动画 -->
            <el-table
              style="width: 100%; font-size: 12px; margin-bottom: 10px"
              :data="deploymentList"
              v-loading="appLoading"
            >
              <!-- 最左侧留出20px的宽度，更加没关 -->
              <el-table-column width="20"></el-table-column>
              <!-- deployment名字 -->
              <el-table-column align="left" label="Deployment名">
                <!-- 插槽，scope.row获取当前行的数据 -->
                <template v-slot="scope">
                  <a class="deploy-body-deployname">{{ scope.row.metadata.name }}</a>
                </template>
              </el-table-column>
              <!-- 标签 -->
              <el-table-column align="center" label="标签">
                <template v-slot="scope">
                  <!-- for循环，每个label只显示固定长度，鼠标悬停后气泡弹出框显示完整长度 -->
                  <div v-for="(val, key) in scope.row.metadata.labels" :key="key">
                    <!-- 气泡弹出框 -->
                    <!-- placement 弹出位置 -->
                    <!-- trigger 触发条件 -->
                    <!-- content 弹出框内容 -->
                    <el-popover
                      placement="right"
                      :width="200"
                      trigger="hover"
                      :content="key + ':' + val"
                    >
                      <template #reference>
                        <!-- ellipsis方法用于剪裁字符串 -->
                        <el-tag style="margin-bottom: 5px" type="warning">{{
                          ellipsis(key + ':' + val)
                        }}</el-tag>
                      </template>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <!-- 容器组 -->
              <el-table-column align="center" label="容器组">
                <!-- 可用数量/总数量,三元运算，若值大于0则显示值，否则显示0 -->
                <template v-slot="scope">
                  <span
                    >{{
                      scope.row.status.availableReplicas > 0
                        ? scope.row.status.availableReplicas
                        : 0
                    }}
                    / {{ scope.row.spec.replicas > 0 ? scope.row.spec.replicas : 0 }}
                  </span>
                </template>
              </el-table-column>
              <!-- 创建时间 -->
              <el-table-column align="center" min-width="100" label="创建时间">
                <!-- timeTrans函数用于将格林威治时间转成北京时间 -->
                <template v-slot="scope">
                  <el-tag type="info"
                    >{{ timeTrans(scope.row.metadata.creationTimestamp) }}
                  </el-tag>
                </template>
              </el-table-column>
              <!-- 容器镜像 -->
              <el-table-column align="center" label="镜像">
                <!-- 与label的显示逻辑一致 -->
                <template v-slot="scope">
                  <div v-for="(val, key) in scope.row.spec.template.spec.containers" :key="key">
                    <el-popover placement="right" :width="200" trigger="hover" :content="val.image">
                      <template #reference>
                        <el-tag style="margin-bottom: 5px">{{
                          ellipsis(
                            val.image.split('/')[2] === undefined
                              ? val.image
                              : val.image.split('/')[2]
                          )
                        }}</el-tag>
                      </template>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <!-- 操作列，放按钮 -->
              <el-table-column align="center" label="操作" width="400">
                <template v-slot="scope">
                  <el-button
                    size="small"
                    style="border-radius: 2px"
                    icon="Edit"
                    type="primary"
                    plain
                    @click="getDeploymentDetail(scope)"
                    >YAML</el-button
                  >
                  <el-button
                    size="small"
                    style="border-radius: 2px"
                    icon="Plus"
                    type="primary"
                    @click="handleScale(scope)"
                    >扩缩</el-button
                  >
                  <el-button
                    size="small"
                    style="border-radius: 2px"
                    icon="RefreshLeft"
                    type="primary"
                    @click="handleConfirm(scope, '重启', restartDeployment)"
                    >重启</el-button
                  >
                  <el-button
                    size="small"
                    style="border-radius: 2px"
                    icon="Delete"
                    type="danger"
                    @click="handleConfirm(scope, '删除', delDeployment)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页配置 -->
            <!-- background 背景色灰 -->
            <!-- size-change 单页大小改变后触发 -->
            <!-- current-change 页数改变后触发 -->
            <!-- current-page 当前页 -->
            <!-- page-size 单页大小 -->
            <!-- layout 分页器支持的功能 -->
            <!-- total 数据总条数 -->
            <el-pagination
              class="deploy-body-pagination"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pagesizeList"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="deploymentTotal"
            >
            </el-pagination>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 抽屉：创建Deployment的表单 -->
    <!-- v-model 值是bool，用于显示与隐藏 -->
    <!-- direction 显示的位置 -->
    <!-- before-close 关闭时触发，点击关闭或者点击空白都会触发 -->
    <el-drawer v-model="createDeploymentDrawer" :direction="direction" :before-close="handleClose">
      <!-- 插槽，抽屉标题 -->
      <template #title>
        <h4>创建Deployment</h4>
      </template>
      <!-- 插槽，抽屉body -->
      <template #default>
        <!-- flex布局,居中 -->
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <!-- ref绑定控件后，js中才能用this.$ref获取该控件 -->
            <!-- rules 定义form表单校验规则 -->
            <el-form
              ref="createDeploymentForm"
              :rules="createDeploymentRules"
              :model="createDeployment"
              label-width="80px"
            >
              <!-- prop用于rules中的校验规则的key -->
              <el-form-item class="deploy-create-form" label="名称" prop="name">
                <el-input v-model="createDeployment.name"></el-input>
              </el-form-item>
              <el-form-item class="deploy-create-form" label="命名空间" prop="namespace">
                <el-select v-model="createDeployment.namespace" filterable placeholder="请选择">
                  <el-option
                    v-for="(item, index) in namespaceList"
                    :key="index"
                    :label="item.metadata.name"
                    :value="item.metadata.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 数字输入框，最小为1，最大为10 -->
              <el-form-item class="deploy-create-form" label="副本数" prop="replicas">
                <el-input-number
                  v-model="createDeployment.replicas"
                  :min="1"
                  :max="10"
                ></el-input-number>
                <!-- 气泡弹出框用于提醒上限 -->
                <el-popover
                  placement="top"
                  :width="100"
                  trigger="hover"
                  content="申请副本数上限为10个"
                >
                  <template #reference>
                    <el-icon style="width: 2em; font-size: 18px; color: #4795ee"
                      ><WarningFilled
                    /></el-icon>
                  </template>
                </el-popover>
              </el-form-item>
              <el-form-item class="deploy-create-form" label="镜像" prop="image">
                <el-input v-model="createDeployment.image"></el-input>
              </el-form-item>
              <el-form-item class="deploy-create-form" label="标签" prop="label_str">
                <el-input
                  v-model="createDeployment.label_str"
                  placeholder="示例: project=ms,app=gateway"
                ></el-input>
              </el-form-item>
              <!-- 下拉框，用于规格的选择，之后用/分割，得到cpu和内存 -->
              <el-form-item class="deploy-create-form" label="资源配额" prop="resource">
                <el-select v-model="createDeployment.resource" placeholder="请选择">
                  <el-option value="0.5/1" label="0.5C1G"></el-option>
                  <el-option value="1/2" label="1C2G"></el-option>
                  <el-option value="2/4" label="2C4G"></el-option>
                  <el-option value="4/8" label="4C8G"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="deploy-create-form" label="容器端口" prop="container_port">
                <el-input
                  v-model="createDeployment.container_port"
                  placeholder="示例: 80"
                ></el-input>
              </el-form-item>
              <el-form-item class="deploy-create-form" label="健康检查" prop="health">
                <el-switch v-model="createDeployment.health_check" />
              </el-form-item>
              <el-form-item class="deploy-create-form" label="检查路径" prop="healthPath">
                <el-input
                  v-model="createDeployment.health_path"
                  placeholder="示例: /health"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <!-- 插槽，抽屉footer -->
      <template #footer>
        <!-- 点击后赋值false，隐藏抽屉 -->
        <el-button @click="createDeploymentDrawer = false">取消</el-button>
        <el-button type="primary" @click="submitForm('createDeployment')">立即创建</el-button>
      </template>
    </el-drawer>
    <!-- 展示YAML信息的弹框 -->
    <el-dialog title="YAML信息" v-model="yamlDialog" width="45%" top="2%">
      <!-- codemirror编辑器 -->
      <!-- border 带边框 -->
      <!-- options  编辑器配置 -->
      <!-- change 编辑器中的内容变化时触发 -->
      <codemirror
        v-model:value="contentYaml"
        border
        :options="cmOptions"
        :style="{ height: '500px' }"
        :autofocus="true"
        :tab-size="2"
        @change="onChange"
      ></codemirror>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="yamlDialog = false">取消</el-button>
          <el-button type="primary" @click="updateDeployment">更新</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 调整副本数的弹框 -->
    <el-dialog title="副本数调整" v-model="scaleDialog" width="25%">
      <div style="text-align: center">
        <span>实例数: </span>
        <el-input-number
          :step="1"
          v-model="scaleNum"
          :min="0"
          :max="30"
          label="描述文字"
        ></el-input-number>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="scaleDialog = false">取消</el-button>
          <el-button type="primary" @click="scaleDeployment">更新</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
// import common from '../common/Config'
import yaml2obj from 'js-yaml'
import json2yaml from 'json2yaml'
// import {ElMessage} from "element-plus"
import {
  createDeployment as createDeploymentApi,
  deleteDeployment,
  getdeploymentdetail,
  getdeploymentlist,
  restartdeployment,
  scaledeployment,
  updatedeployment
} from '@/api/deployment.js'
// import { getNamespecelist } from '@/api/namespace'

// 编辑器配置
const cmOptions = {
  mode: 'text/yaml',
  theme: 'darcula',
  lineNumbers: true,
  smartIndent: true,
  indentUnit: 4,
  styleActiveLine: true,
  matchBrackets: true,
  readOnly: false,
  lineWrapping: true
}

const contentYaml = ref('')

// 分页
const currentPage = ref(1)
const pagesize = ref(10)
const pagesizeList = [10, 20, 30]

// 搜索框内容
const searchInput = ref('')

// 命名空间
const namespaceValue = ref('default')
const namespaceList = ref([])

// 列表
const appLoading = ref(false)
const deploymentList = ref([])
const deploymentTotal = ref(0)

// 创建
const fullscreenLoading = ref(false)
const direction = 'rtl'
const createDeploymentDrawer = ref(false)

const createDeployment = reactive({
  name: '',
  namespace: '',
  replicas: 1,
  image: '',
  resource: '',
  health_check: false,
  health_path: '',
  label_str: '',
  label: {},
  container_port: ''
})

// 创建请求的参数
const createDeploymentData = reactive({
  // url: common.k8sDeploymentCreate,
  params: {}
})

// 创建deployment的表单校验规则
const createDeploymentRules = {
  name: [{ required: true, message: '请填写名称', trigger: 'change' }],
  image: [{ required: true, message: '请填写镜像', trigger: 'change' }],
  namespace: [{ required: true, message: '请选择命名空间', trigger: 'change' }],
  resource: [{ required: true, message: '请选择配额', trigger: 'change' }],
  label_str: [{ required: true, message: '请填写标签', trigger: 'change' }],
  container_port: [{ required: true, message: '请填写容器端口', trigger: 'change' }]
}

// 详情
const deploymentDetail = reactive({})

// yaml更新
const yamlDialog = ref(false)

// 扩缩容
const scaleNum = ref(0)
const scaleDialog = ref(false)

// 获取Namespace列表
const getNamespaces = async () => {
  try {
    const res = await getNamespecelist()
    namespaceList.value = res.data.items
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
}

// 获取Deployment列表
const getDeployments = async () => {
  appLoading.value = true
  const getDeploymentsData = {
    // url: common.k8sDeploymentList,
    params: {
      filter_name: searchInput.value,
      namespace: namespaceValue.value,
      page: currentPage.value,
      limit: pagesize.value
    }
  }
  try {
    const res = await getdeploymentlist(getDeploymentsData.params)
    deploymentList.value = res.data.items
    deploymentTotal.value = res.data.total
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
  appLoading.value = false
}

// 获取deployment详情
const getDeploymentDetail = async (e) => {
  const getDeploymentDetailData = {
    params: {
      deployment_name: e.row.metadata.name,
      namespace: namespaceValue.value
    }
  }
  try {
    const res = await getdeploymentdetail(getDeploymentDetailData.params)
    Object.assign(deploymentDetail, res.data)
    contentYaml.value = json2yaml.stringify(deploymentDetail)
    yamlDialog.value = true
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
}

// 更新deployment
const updateDeployment = async () => {
  const content = JSON.stringify(yaml2obj.load(contentYaml.value))
  const updateDeploymentData = {
    params: {
      namespace: namespaceValue.value,
      content: content
    }
  }
  try {
    const res = await updatedeployment(updateDeploymentData.params)
    ElMessage.success({ message: res.msg })
    getDeployments()
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
  yamlDialog.value = false
}

// 扩缩容的中间方法，用于赋值及打开弹出框
const handleScale = (e) => {
  scaleDialog.value = true
  Object.assign(deploymentDetail, e.row)
  scaleNum.value = e.row.spec.replicas
}

// 扩缩容deployment
const scaleDeployment = async () => {
  const scaleDeploymentData = {
    params: {
      deployment_name: deploymentDetail.metadata.name,
      namespace: namespaceValue.value,
      scale_num: scaleNum.value
    }
  }
  try {
    const res = await scaledeployment(scaleDeploymentData.params)
    ElMessage.success({ message: res.msg })
    getDeployments()
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
  scaleDialog.value = false
}

// 重启deployment
const restartDeployment = async (e) => {
  const restartDeploymentData = {
    params: {
      deployment_name: e.row.metadata.name,
      namespace: namespaceValue.value
    }
  }
  try {
    const res = await restartdeployment(restartDeploymentData.params)
    ElMessage.success({ message: res.msg })
    getDeployments()
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
}

// 删除deployment
const delDeployment = async (e) => {
  const delDeploymentData = {
    params: {
      deployment_name: e.row.metadata.name,
      namespace: namespaceValue.value
    }
  }
  try {
    const res = await deleteDeployment(delDeploymentData.params)
    ElMessage.success({ message: res.msg })
    getDeployments()
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
}

// 弹出确认框，用于危险操作的double check
const handleConfirm = (obj, operateName, fn) => {
  ElMessageBox.confirm(`确认继续 ${operateName} 操作吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      fn(obj)
    })
    .catch(() => {
      ElMessage.info({ message: '已取消操作' })
    })
}

// 创建deployment
const createDeployFunc = async () => {
  const reg = new RegExp('(^[A-Za-z]+=[A-Za-z0-9]+).*')
  if (!reg.test(createDeployment.label_str)) {
    ElMessage.warning({ message: '标签填写异常，请确认后重新填写' })
    return
  }
  fullscreenLoading.value = true
  const label = {}
  let [cpu, memory] = createDeployment.resource.split('/')
  memory = memory + 'Gi'
  createDeployment.label_str.split(',').forEach((item) => {
    const [key, value] = item.split('=')
    label[key] = value
  })
  createDeploymentData.params = {
    ...createDeployment,
    container_port: parseInt(createDeployment.container_port),
    label,
    cpu,
    memory
  }
  try {
    const res = await createDeploymentApi(createDeploymentData.params)
    ElMessage.success({ message: res.msg })
    getDeployments()
  } catch (error) {
    ElMessage.error({ message: error.msg })
  }
  resetForm('createDeployment')
  fullscreenLoading.value = false
  createDeploymentDrawer.value = false
}

// 重置表单方法
const resetForm = (formName) => {
  const form = createDeploymentForm.value
  if (form) {
    form.resetFields()
  }
}

// 提交表单，校验参数合法性
const submitForm = (formName) => {
  const form = createDeploymentForm.value
  if (form) {
    form.validate((valid) => {
      if (valid) {
        createDeployFunc()
      } else {
        return false
      }
    })
  }
}

// 字符串截取、拼接并返回
const ellipsis = (value) => {
  return value.length > 15 ? value.substring(0, 15) + '...' : value
}

// 格林威治时间转为北京时间
const timeTrans = (timestamp) => {
  const date = new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000)
  return date.toJSON().substring(0, 19).replace('T', ' ')
}

// 编辑器内容变化时触发的方法，用于将更新的内容复制到变量中
const onChange = (val) => {
  contentYaml.value = val
}

// 处理抽屉的关闭，增加体验感
const handleClose = (done) => {
  ElMessageBox.confirm('确认关闭？')
    .then(() => {
      done()
    })
    .catch(() => {})
}

// 页面大小发生变化时触发，赋值并重新获取列表
const handleSizeChange = (size) => {
  pagesize.value = size
  getDeployments()
}

// 页数发生变化时触发，赋值并重新获取列表
const handleCurrentChange = (page) => {
  currentPage.value = page
  getDeployments()
}

watch(namespaceValue, () => {
  localStorage.setItem('namespace', namespaceValue.value)
  currentPage.value = 1
  getDeployments()
})

onMounted(() => {
  if (localStorage.getItem('namespace')) {
    namespaceValue.value = localStorage.getItem('namespace')
  }
  getNamespaces()
  getDeployments()
})
</script>

<style scoped>
/* 卡片属性 */
.deploy-head-card,
.deploy-body-card {
  border-radius: 1px;
  margin-bottom: 5px;
}
/* 搜索框 */
.deploy-head-search {
  width: 160px;
  margin-right: 10px;
}
/* 数据表格deployment名颜色 */
.deploy-body-deployname {
  color: #4795ee;
}
/* deployment名鼠标悬停 */
.deploy-body-deployname:hover {
  color: rgb(84, 138, 238);
  cursor: pointer;
  font-weight: bold;
}
</style>
