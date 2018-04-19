import StorageMgr from './storageMgr'

const USERINFO_KEY = '__userInfo__'


// 存储用户信息
export function saveUserInfo(user) {
  StorageMgr.setItem(USERINFO_KEY, user)
}

// 获取用户信息
export function getUserInfo() {
  let user = StorageMgr.getItem(USERINFO_KEY)
  return user
}

// 删除用户信息
export function removeUserInfo() {
  StorageMgr.setItem(USERINFO_KEY, '')
}

// 获取用户id
export function getUserId() {
  let user = StorageMgr.getItem(USERINFO_KEY)
  return user.userId
}
