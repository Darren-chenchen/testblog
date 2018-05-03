<template>
  <div class="detailwrapper">
    <h1 class="title" v-html="this.data.title"></h1>
    <div class="markdown-body" v-html="this.compiledMarkdown">
    </div>

    <div class="commmentWrapper">
      <p class="title">文章评论</p>
      <el-input class="commemt-textarea" type="textarea" v-model="comment" placeholder="评论"></el-input>
      <div style="width: 100%">
        <el-button style="float: right;margin-top: 12px" @click="clickComment">发表评论</el-button>
      </div>
    </div>

    <div class="commmentListWrapper" v-if="this.data.commentList && this.data.commentList.length>0">
      <div style="width: 100%;background-color: lightgrey;height: 30px">
        <p style="line-height: 30px;margin-left: 10px" v-if="this.data.commentList">共{{this.data.commentList.length}}条评论</p>
      </div>
      <ul>
        <li class="comment-item" v-for="(item, index) in this.data.commentList" :key="index">
          <img class="usericon" src="../../assets/logo.png" alt="">
          <div style="margin-left: 70px">
            <p class="name" style="color: #6477F2;font-size: 14px">{{item.userName}}</p>
            <p class="content" style="margin-top: 10px;line-height: 16px">
              {{item.content}}</p>
            <div style="display: flex;margin-top: 10px;color: gray;margin-bottom: 12px">
              <p class="timer">{{`${(new Date(item.commentTimer)).getFullYear()}-${(new Date(item.commentTimer)).getMonth() + 1}-${(new Date(item.commentTimer)).getDate()}`}}</p>
              <p @click="clickreplay(item, index)" class="detailwrapper-commemt-replay" style="margin-left: 10px">回复</p>
            </div>
            <div v-if="item.showReplay">
              <el-input class="commemt-textarea" type="textarea" v-model="replayContent" placeholder="评论"></el-input>
              <el-button @click="sendReplay(item)" style="margin-top: 12px">发送</el-button>
            </div>
          </div>

          <ul v-show="item.replyArr && item.replyArr.length>0" style="background-color: #eee;padding: 20px;box-sizing: border-box">
            <li v-for="(itemSub, indexSub) in item.replyArr" :key="indexSub">
              <p style="margin-top: 12px;font-size: 15px;margin-bottom: 10px"><span style="color: red">{{itemSub.replyUser}}</span>回复<span
                style="color: #4078c0">{{itemSub.acceptUser}}</span>：</p>
              <div style="margin-left: 60px">
                <p style="line-height: 16px;">{{itemSub.content}}</p>
                <div style="display: flex;margin-top: 10px;color: gray;margin-bottom: 12px;">
                  <p class="timer">{{`${(new Date(itemSub.replyTimer)).getFullYear()}-${(new Date(itemSub.replyTimer)).getMonth() + 1}-${(new Date(itemSub.replyTimer)).getDate()}`}}</p>
                  <p @click="clickreplay2(itemSub, index, indexSub)" class="detailwrapper-commemt-replay" style="margin-left: 10px">回复</p>
                </div>
                <div v-if="itemSub.showReplay">
                  <el-input class="commemt-textarea" type="textarea" v-model="replayContent"
                            placeholder="回复"></el-input>
                  <el-button style="margin-top: 12px;" @click="sendReplay2(item, itemSub)">发送</el-button>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getArticleDetail } from '../../api/article'
  import marked from 'marked'
  import hljs from '../../../static/js/highlight.min.js'
  import {commentCommit, reply} from '../../api/comment'
  import {getUserInfo} from '../../mgr/userMgr'

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  export default {
    data() {
      return {
        data: {},
        comment: '',
        replayContent: ''
      }
    },
    created() {
      window.scroll(0, 0)
      this.getDetail()
    },
    updated() {
    },
    mounted() {
    },
    computed: {
      compiledMarkdown() {
        return marked(this.data.content || '', {
          sanitize: true
        })
      }
    },
    methods: {
      getDetail() {
        getArticleDetail(this.$route.params.articleId).then((res) => {
          this.data = res.data
          console.log(this.data)
        }, reject => {
        })
      },
      sendReplay(item) {
        if (!getUserInfo() || !getUserInfo().userId) {
          this.$message.error('请登录')
          return
        }
        let body = {
          'articleId': this.data._id,
          'commentId': item._id,
          'replyUser': getUserInfo().userName,
          'acceptUser': item.userName,
          'content': this.replayContent
        }
        reply(body).then((res) => {
          this.$message.success(res.message)
          this.replayContent = ''
          this.getDetail()
        }, reject => {

        })
      },
      sendReplay2(item, subItem) {
        if (!getUserInfo() || !getUserInfo().userId) {
          this.$message.error('请登录')
          return
        }
        let body = {
          'articleId': this.data._id,
          'commentId': item._id,
          'replyUser': getUserInfo().userName,
          'acceptUser': subItem.replyUser,
          'content': this.replayContent
        }
        reply(body).then((res) => {
          this.$message.success(res.message)
          this.replayContent = ''
          this.getDetail()
        }, reject => {

        })
      },
      clickreplay(item, index) {
        item.showReplay = true
        // 数组更新dom更改https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95
        this.$set(this.data.commentList, index, item)
      },
      clickreplay2(item, index, indexSub) {
        item.showReplay = true
        this.$set(this.data.commentList[index].replyArr, indexSub, item)
      },
      clickComment() {
        if (!getUserInfo() || !getUserInfo().userId) {
          this.$message.error('请登录')
          return
        }
        let body = {
          'articleId': this.data._id,
          'userName': getUserInfo().userName,
          'content': this.comment
        }
        commentCommit(body).then((res) => {
          this.$message.success(res.message)
          this.getDetail()
        }, reject => {

        })
      }
    },
    watch: {
      '$route': (to, from) => {
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../static/css/github-markdown.css";
  @import "../../common/scss/base";

  .detailwrapper {
    min-height: 100%;
    text-align: left;
  }

  .detailwrapper .title {
    font-weight: bold;
    text-align: center;
    font-size: 26px;
    line-height: 40px;
    margin-bottom: 20px;
    margin-top: 30px;
  }

  .commmentWrapper {
    margin-top: 60px;
    border: solid 1px #eee;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 80px;
  }

  .commmentWrapper .title {
    width: 80px;
    font-size: 14px;
    padding: 2px;
    background-color: $mainColor;
    color: white;
  }

  .commmentWrapper .commemt-textarea .el-textarea__inner {
    height: 100px;
  }

  .commmentListWrapper {
    margin-top: 60px;
    border: solid 1px #eee;
    padding-bottom: 60px;
  }

  .commmentListWrapper .comment-item {
    width: 100%;
    padding: 10px;
    border-bottom: solid 1px #eee;
    position: relative;
    box-sizing: border-box;
  }

  .comment-item .usericon {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    background-size: cover;
  }

  .commmentListWrapper .comment-item .rightwrapper {
    margin-left: 60px;
    width: calc(100% - 80px);
  }

  .detailwrapper-commemt-replay:hover {
    color: $mainColor;
  }
</style>
