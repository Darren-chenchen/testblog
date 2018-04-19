<template>
  <div>
    <el-container class="homeContainer">
      <el-header class="homeHeader">
        <p>博客后台管理系统({{this.userInfo.userName}})</p>
        <el-breadcrumb separator="/" class="homeHeader-middleWrapper">
          <el-breadcrumb-item v-for="item in breadArr" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <button class="loginout" @click="loginout">退出登录</button>
        <button class="writeArticle" @click="writeArticle">写文章</button>
        <!--<button class="worksBtn" @click="pulishWorks">发布作品</button>-->

      </el-header>
      <el-container>
        <el-aside width="210px" class="homeAsideWrapper">
          <el-col class="homeAsideSubWrapper">
            <el-menu
              default-active="全部用户"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="rgb(61, 155, 251)"
              @open="handleOpen"
              @close="handleClose"
            >

              <el-submenu index="用户统计">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户统计</span>
                </template>
                <el-menu-item index="全部用户" @click="clickSubItem">全部用户</el-menu-item>
                <el-menu-item index="近一周" @click="clickSubItem">近一周</el-menu-item>
              </el-submenu>

              <el-submenu index="文章管理">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">文章管理</span>
                </template>
                <el-menu-item index="所有文章" @click="clickSubItem">所有文章</el-menu-item>
                <el-menu-item index="草稿" @click="clickSubItem">草稿</el-menu-item>
              </el-submenu>

              <el-menu-item index="作品管理" @click="clickSubItem">作品管理</el-menu-item>

              <!--<el-submenu index="评论管理">-->
                <!--<template slot="title">-->
                  <!--<i class="el-icon-setting"></i>-->
                  <!--<span slot="title">评论管理</span>-->
                <!--</template>-->
                <!--<el-menu-item index="待审核" @click="clickSubItem">待审核</el-menu-item>-->
              <!--</el-submenu>-->
            </el-menu>
          </el-col>
        </el-aside>

        <el-main style="border-radius: 12px;overflow: scroll;background-color: white;margin: 20px;overflow-x: hidden">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserInfo} from '../../mgr/userMgr'
  import TokenMgr from '../../mgr/tokenMgr'

  export default {
    data() {
      return {
        breadArr: ['用户统计', '全部用户'],
        userInfo: {}
      }
    },
    components: {
    },
    created() {
      this.userInfo = getUserInfo()
      this.$router.push({
        name: 'UserList',
        params: {
          type: 'all'
        }
      })
    },
    methods: {
      loginout() {
        this.$router.push('/')
        TokenMgr.clearTokens()
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      clickSubItem(data) {
        this.breadArr = data.indexPath
        if (data.index === '全部用户') {
          this.bus.$emit('refreshUserList', 'all')
          this.$router.push({
            name: 'UserList',
            params: {
              type: 'all'
            }
          })
        }
        if (data.index === '近一周') {
          this.bus.$emit('refreshUserList', 'week')
          this.$router.push({
            name: 'UserList',
            params: {
              type: 'week'
            }
          })
        }
        if (data.index === '所有文章') {
          this.$router.push('/article')
        }
        if (data.index === '草稿') {
          this.$router.push('/draftList')
        }
        if (data.index === '作品管理') {
          this.$router.push('/workMgr')
        }
      },
      writeArticle() {
        const {href} = this.$router.resolve({
          name: 'WriteArticle'
        })
        window.open(href, '_blank')
      },
      pulishWorks() {
        const {href} = this.$router.resolve({
          name: 'PulishWork'
        })
        window.open(href, '_blank')
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";
  .homeContainer{
    position: fixed !important;
    top: 0px !important;
    left: 0px !important;
    width: 100% !important;
    height: 100% !important;
  }
  .homeHeader {
    width: 100%;
    height: 60px !important;
    background-color: white;
    text-align: left;
    position: relative;
  }
  .homeHeader p {
    font-size: 16px;
    line-height: 60px;
    text-align: left;
  }
  .homeHeader button {
    position: absolute;
    top: 10px;
    width: 80px;
    height: 40px;
    color: $coral;
    border-color: $coral;
    background-color: white;
    outline: 0;
  }
  .homeHeader .loginout {
    right: 20px;
  }
  .homeHeader .writeArticle {
    right: 120px;
  }
  .homeHeader .worksBtn {
    right: 220px;
  }
  .homeHeader-middleWrapper {
    position: absolute;
    top: 0px;
    left: 250px;
    right: 100px;
    height: 60px;
    line-height: 60px;
  }
  .homeAsideWrapper {
    background-color: #545c64;
  }
  .homeAsideSubWrapper {
    width: 220px !important;
  }
</style>
