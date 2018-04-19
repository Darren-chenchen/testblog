/**
 * Created by darren on 2018/3/22.
 */
import {postHttp, deleteHttp} from './basehttp'

// 用户列表根据orderkey字段排序，sequence=true是顺序，false倒序
export function userList(type, page, pageSize, sequence, orderkey, searchKey) {
  let params = {
    'page': page,
    'pageSize': pageSize,
    'sequence': sequence,
    'orderkey': orderkey,
    'searchKey': searchKey
  }
  let body = {
    'type': type
  }
  let url = `admin/user/userList`
  return postHttp(url, body, params)
}

// 发布文章
export function pulishArticle(body) {
  let url = `article/pulish`
  return postHttp(url, body)
}

// 获取文章列表
export function getArticleList(body) {
  let url = `article/list`
  return postHttp(url, body)
}
// 获取文章详情
export function getArticleDetail(id) {
  let body = {
    'articleId': id
  }
  let url = `article/detail`
  return postHttp(url, body)
}
// 删除文章
export function deleteArticle(Id) {
  let params = {
    'articleId': Id
  }
  let url = `article/delete`
  return deleteHttp(url, params)
}

// 下架文章
export function draftArticle(Id) {
  let params = {
    'articleId': Id
  }
  let url = `article/draftArticle`
  return postHttp(url, '', params)
}

