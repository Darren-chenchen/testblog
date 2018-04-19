<template>
  <div class="nav-wrapper">
    <div class="left-navwrapper">
      <ul>
        <li :style="getNavActiveStyle(item)" v-for="(item, index) in titleArr" :key="item" class="navItem" @click="clickNavItem(index)">
          <p>{{item}}</p>
          <div ref="indicate" :style="getIndicateStyle(index)" class="indicateLine"></div>
        </li>
      </ul>
    </div>
    <div class="right-navwrapper">
      <div v-if="!this.userInfo">
        <p class="login" @click="login">登录</p>
        <p class="regist" @click="regiest">立即注册</p>
      </div>
      <div v-if="this.userInfo && this.userInfo.userId">
        <p class="login">{{this.userInfo.userName}}</p>
        <p class="regist" @click="loginout">退出登录</p>
      </div>

    </div>

    <login :showlogin="showlogin" @loginSuccess="loginSuccess" @dismiss="dismiss"></login>
    <regiest :showregiest="showregiest" @regiestSuccess="regiestSuccess" @dismiss="dismiss"></regiest>
  </div>
</template>

<script type="text/ecmascript-6">
  import Login from '../login/login.vue'
  import Regiest from '../login/regiest.vue'
  import {getUserInfo, removeUserInfo} from '../../mgr/userMgr'
  import TokenMgr from '../../mgr/tokenMgr'

  export default {
    components: {
      Login, Regiest
    },
    data() {
      return {
        showlogin: false,
        showregiest: false,
        titleArr: ['我的笔记', '我的作品'],
        currentItem: '我的笔记',
        key: '',
        userInfo: {}
      }
    },
    watch: {
      '$route': (to) => {
      }
    },
    methods: {
      clickNavItem(index) {
        this.currentItem = this.titleArr[index]
        if (index === 0) {
          this.$router.push('/mynote')
        }
        if (index === 1) {
          this.$router.push('/mywork')
        }
      },
      getNavActiveStyle(item) {
        if (item === this.currentItem) {
          return `color: #6477F2`
        }
      },
      getIndicateStyle(index) {
        var w = 0
        if (index === 3) {
            w = 40
        } else {
          w = 60
        }
        if (this.titleArr[index] === this.currentItem) {
          return `width: ${w}px;opacity: 1`
        } else {
          return `width: ${w}px;opacity: 0`
        }
      },
      beginSearch() {
        if (this.key.length === 0) {
          this.$message.error('请输入搜索关键字')
          return
        }
        this.bus.$emit('beginSearch', this.key)
      },
      login() {
        this.showlogin = true
      },
      regiest() {
        this.showregiest = true
      },
      dismiss() {
        this.showlogin = false
        this.showregiest = false
      },
      loginSuccess() {
        this.showlogin = false
        this.userInfo = getUserInfo()
      },
      loginout() {
        removeUserInfo()
        TokenMgr.clearTokens()
        this.userInfo = getUserInfo()
      },
      regiestSuccess() {
        this.showregiest = false
        this.showlogin = true
      }
    },
    created() {
      this.userInfo = getUserInfo()
      if (this.$route.fullPath.indexOf('/mywork') !== -1) {
        this.currentItem = '我的作品'
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .nav-wrapper {
    width: 100%;
    height: 40px;
    font-size: 0px;
    background-color: #2e2f33;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 100;
  }
  .left-navwrapper {
    width: 40%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    min-width: 320px;
  }
  .navItem {
    width: 25%;
    position: relative;
    display: inline-block;
    height: 40px;
    font-size: 14px;
    text-align: center;
    color: white;
    line-height: 36px;
    box-sizing: border-box;
  }
  .indicateLine {
    background-color: $mainColor;
    height: 4px;
    margin: 0 auto;
  }
  .right-navwrapper {
    float: right;
    right: 0px;
    top: 0px;
  }
  .right-navwrapper p {
    color: white;
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .right-navwrapper p:hover {
    color: $mainColor;
  }
  .right-navwrapper .login {

  }
  .right-navwrapper .regist {
    margin-right: 20px;
    margin-left: 15px;
  }

  @media only screen and (max-width: 617px) {
    .left-navwrapper {
      width: 100%;
    }
  }
</style>
