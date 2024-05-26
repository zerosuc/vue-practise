import service from '@/utils/request'

export function login(params) {
  return service.post('/user/login', params)
}

export function getINfo() {
  return service.get('/user/getinfo')
}

export function logout() {
  return service.get('/user/loginout')
}

export function updatePwd(data) {
  return service.post('/admin/updatepassword', data)
}

// 获取部门用户
export const getDeptPageUsers = (did, data) => {
  return service({
    url: `/user/${did}/getPage`,
    method: 'post',
    data
  })
}

// 禁用或启用用户
export const lockUser = (uid, action) => {
  return service({
    url: `/user/${uid}/${action}/lockUser`,
    method: 'put'
  })
}

// 注册用户
export const registerUser = (data) => {
  return service({
    url: `/user/register`,
    method: 'post',
    data
  })
}

// 删除用户
export const deleteUser = (uid) => {
  return service({
    url: `/user/${uid}/delete_user`,
    method: 'delete'
  })
}

// 批量删除用户
export const deleteUsers = (data) => {
  return service({
    url: `/user/delete_users`,
    method: 'post',
    data
  })
}

// 重置密码
export const resetPassword = (uid) => {
  return service({
    url: `/user/${uid}/reset_pwd`,
    method: 'put'
  })
}

// 注册用户
export const GetDeptByPage = (data) => {
  return service({
    url: `/user/getDeptByPage`,
    method: 'post',
    data
  })
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return service({
    url: `/user/update`,
    method: 'post',
    data
  })
}

// 设置用户角色
export const setUserAuthorities = (uid, data) => {
  return service({
    url: `/user/${uid}/set_auth`,
    method: 'post',
    data
  })
}
