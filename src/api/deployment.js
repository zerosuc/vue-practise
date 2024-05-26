import service from '@/utils/request'

// @Tags api
// @Summary 分页获取deploy列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取deploy列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/getApiList [post]
// {
//  page     int
//	pageSize int
// }
export function getdeploymentlist(data) {
  return service({
    url: '/proxy/deployment/list',
    method: 'get',
    data
  })
}

export function getDeploymentByNs(data) {
  return service({
    url: '/proxy/deployment/numnp',
    method: 'get',
    params: data
  })
}

export function getdeploymentdetail(data) {
  return service({
    url: '/proxy/deployment/detail',
    method: 'get',
    params: data
  })
}

export function updatedeployment(data) {
  return service({
    url: '/proxy/deployment/update',
    method: 'put',
    params: data
  })
}

export function scaledeployment(data) {
  return service({
    url: '/proxy/deployment/scale',
    method: 'get',
    params: data
  })
}

export function restartdeployment(data) {
  return service({
    url: '/proxy/deployment/restart',
    method: 'put',
    params: data
  })
}

export function createDeployment(data) {
  return service({
    url: '/proxy/deployment/create',
    method: 'post',
    data
  })
}

export function deleteDeployment(data) {
  return service({
    url: '/proxy/deployment/del',
    method: 'delete',
    params: data
  })
}
