/**
 * Created by darren on 2018/4/16.
 */
import {postHttp} from './basehttp'

// 发布作品pulishWorks
export function pulishWorks(body) {
  let url = `works/pulishWorks`
  return postHttp(url, body)
}

export function getPulishWorks() {
  let body = {
    'category': ''
  }
  let url = `works/list`
  return postHttp(url, body)
}
