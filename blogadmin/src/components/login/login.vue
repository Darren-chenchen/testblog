<template>
  <div class="login-wrapper">
    <div class="bgview"></div>
    <input v-model="username" style="margin-top: 20%" class="cl-input" type="text" placeholder="请输入用户名">
    <input v-model="password" class="cl-input" type="password" placeholder="请输入密码">
    <button class="cl-button" @click="clickLoginBtn">登  录</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as LoginApi from '../api/loginApi'
  import {saveUserInfo} from '../../mgr/userMgr'
  import TokenMgr from '../../mgr/tokenMgr'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    created() {
    },
    methods: {
      clickLoginBtn() {
        let body = {
          'userName': this.username,
          'passWord': this.password
        }
        LoginApi.login(body).then((res) => {
          // 存储用户信息
          console.log(res)
          TokenMgr.add(this.axios.baseURL, res.data.token)
          saveUserInfo(res.data)
          this.$router.push('/adminHome')
        }, reject => {
          this.$message.error(reject)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .login-wrapper {
    display: flex;
    flex-direction: column;
  }
  .bgview {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    bottom: 0px;
    background-size: cover;
    z-index: -1;
    -webkit-animation: STAR-MOVE 200s linear infinite;
    -moz-animation: STAR-MOVE 200s linear infinite;
    -ms-animation: STAR-MOVE 200s linear infinite;
    animation: STAR-MOVE 200s linear infinite;
  }
  @-webkit-keyframes STAR-MOVE {
    from {
      background-position:0% 0%
    }
    to {
      background-position: 600% 0%
    }
  }
  @keyframes STAR-MOVE {
    from {
      background-position: 0% 0%
    }
    to {
      background-position: 600% 0%
    }
  }
  .login-wrapper .cl-input {
    width: 400px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .login-wrapper .cl-button {
    width: 400px;
    margin: 0 auto;
    margin-top: 40px;
    outline: 0;
  }
</style>
