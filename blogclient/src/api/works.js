/**
 * Created by darren on 2018/4/17.
 */
import {postHttp} from './basehttp'

// 获取作品
export function getWorks(category) {
  let body = {
    'category': category
  }
  let url = `works/list`
  return postHttp(url, body)
}

export function getWorksById(workId) {
  let body = {
    'workId': workId
  }
  let url = `works/detail`
  return postHttp(url, body)
}
