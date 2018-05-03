/**
 * Created by darren on 2018/4/12.
 */
import {postHttp} from './basehttp'

// 获取文章列表
export function getArticleList(page, pageSize, body) {
  let params = {
    'page': page,
    'pageSize': pageSize
  }
  let url = `tourist/list`
  return postHttp(url, body, params)
}
// 获取文章详情
export function getArticleDetail(id) {
  let body = {
    'articleId': id
  }
  let url = `tourist/detail`
  return postHttp(url, body)
}

// 根据tag获取文章
export function getArticleByTags(page, pageSize, tags) {
  let params = {
    'page': page,
    'pageSize': pageSize
  }
  let body = {
    'tags': tags
  }
  let url = `tourist/articleTag`
  return postHttp(url, body, params)
}

// 搜索
export function getArticleListByKeyword(page, pageSize, key) {
  let params = {
    'page': page,
    'pageSize': pageSize
  }
  let body = {
    'searchKey': key
  }
  let url = `tourist/search`
  return postHttp(url, body, params)
}
