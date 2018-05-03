/**
 * Created by darren on 2018/4/18.
 */

import {postHttp} from './basehttp'

// 发布评论
export function commentCommit(body) {
  let url = `comment/commit`
  return postHttp(url, body)
}

export function reply(body) {
  let url = `comment/reply`
  return postHttp(url, body)
}
