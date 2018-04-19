<template>
    <div class="login-wrapper" v-show="this.showlogin" @click="clickwrapper">
      <div class="contentwrapper" @click.stop="clickcontent">
        <el-input v-model="userName" class="userName" placeholder="请输入用户名"></el-input>
        <el-input v-model="passWord" class="pwd" placeholder="请输入密码" type="password"></el-input>
        <el-button @click.stop="onSubmit"
                   :loading="showLoading"
        >立即登录</el-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {login} from '../../api/loginApi'
  import {saveUserInfo} from '../../mgr/userMgr'
  import TokenMgr from '../../mgr/tokenMgr'

  export default {
    props: {
      showlogin: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showLoading: false,
        userName: '',
        passWord: ''
      }
    },
    created() {},
    methods: {
      handleClose() {

      },
      clicklogin() {

      },
      onSubmit() {
        let body = {
          'userName': this.userName,
          'passWord': this.passWord
        }
        this.showLoading = true
        login(body).then((res) => {
          this.showLoading = false
          // 存储用户信息
          saveUserInfo(res.data)
          // 存token
          TokenMgr.add(this.axios.baseURL, res.data.token)
          this.$emit('loginSuccess')
        }, reject => {
          this.showLoading = false
        })
      },
      clickwrapper() {
        this.$emit('dismiss')
      },
      clickcontent() {}
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .login-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  .login-wrapper .contentwrapper {
    width: 40%;
    height: 300px;
    margin-top: 80px;
    margin-left: 30%;
    border-radius: 8px;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  .login-wrapper .contentwrapper .el-input {
    width: 300px;
    margin: 0 auto;
  }
  .login-wrapper .contentwrapper .userName {
    margin-top: 50px;
  }
  .login-wrapper .contentwrapper .pwd {
    margin-top: 10px;
  }
  .login-wrapper .contentwrapper .el-button {
    width: 300px;
    background-color: $mainColor;
    color: white;
    margin: 0 auto;
    margin-top: 30px;
  }
</style>
