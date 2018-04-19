import Vue from 'vue'
import { Message } from 'element-ui'
import TokenMgr from '../../mgr/tokenMgr'
import {removeUserInfo} from '../../mgr/userMgr'

let vue = new Vue()

export function getHttp (url, params) {
  return new Promise((resolve, reject) => {
    vue.axios.get(url, {params: params})
      .then(response => {
        if (response.data.success === false) {
          Message.error(response.data.message)
          reject(response.data.message)
        }
        setTimeout(() => {
          resolve(response.data)
        }, 300)
      })
      .catch(error => {
        reject(error.message)
      })
  })
}

export function deleteHttp (url, params) {
  return new Promise((resolve, reject) => {
    vue.axios.delete(url, {params: params})
      .then(response => {
        if (response.data.success === false) {
          Message.error(response.data.message)
          reject(response.data.message)
        }
        setTimeout(() => {
          resolve(response.data)
        }, 300)
      })
      .catch(error => {
        reject(error.message)
      })
  })
}
export function postHttp (url, body, params) {
  return new Promise((resolve, reject) => {
    vue.axios({
      method: 'post',
      url: url,
      params: params,
      data: body
    }).then(response => {
      if (response.data.success === false) {
        Message.error(response.data.message)
        reject(response.data.message)
      }
      setTimeout(() => {
        resolve(response.data)
      }, 300)
    }).catch(error => {
      reject(error.message)
    })
  })
}

export function configAxios() {
  vue.axios.defaults.baseURL = 'http://localhost:4000/'
  vue.axios.defaults.headers.common['Content-Type'] = 'application/json'
  vue.axios.default.timeout = 60000
  vue.axios.interceptors.request.use(
    config => {
      let token = TokenMgr.get(vue.axios.defaults.baseURL)
      if (token) {
        console.log(token)
        config.headers.Authorization = 'Bearer' + ' ' + token
      }
      return config
    }, err => {
      return Promise.reject(err)
    })
  vue.axios.interceptors.response.use({}, error => {
    if (!error.response) {
      error.message = '请检查网络设置'
      return Promise.reject(error)
    }
    switch (error.response.status) {
      case 101:
        break
      case 401:
        error.message = '登录已过期,请重新登录!'
        // 清除用户信息
        TokenMgr.clearTokens()
        removeUserInfo()
        setTimeout(() => {
          vue.router.push('/')
        }, 500)
        break
      case 403:
        error.message = '禁止访问!'
        break
      case 408:
        error.message = '请求超时!'
        break
      case 500:
        error.message = '服务内部异常!'
        break
      case 503:
        error.message = '服务器升级中!'
        break
      case 504:
        error.message = '网关超时!'
        break
      default:
        error.message = '未知错误'
        break
    }
    return Promise.reject(error)
  })
}