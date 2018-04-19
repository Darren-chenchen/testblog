/**
 * Created by darren on 2018/3/14.
 */
import {postHttp} from './basehttp'

// 注册
export function register(body) {
  let url = 'user/regiest'
  return postHttp(url, body)
}

// 登录
export function login(body) {
  let url = 'user/login'
  return postHttp(url, body)
}
