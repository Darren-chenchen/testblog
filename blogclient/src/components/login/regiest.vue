<template>
  <div class="regiest-wrapper" v-show="this.showregiest" @click="clickwrapper">
    <div class="contentwrapper" @click.stop="clickContent">
      <el-input v-model="userName" class="userName" placeholder="请输入用户名"></el-input>
      <el-input v-model="passWord" class="pwd" placeholder="请输入密码" type="password"></el-input>
      <el-input v-model="repassWord" class="pwd" placeholder="请再次输入密码" type="password"></el-input>

      <el-button @click.stop="onSubmit"
                 :loading="showLoading"
      >立即注册</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {register} from '../../api/loginApi'
  export default {
    props: {
      showregiest: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showLoading: false,
        userName: '',
        passWord: '',
        repassWord: ''
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
          'passWord': this.passWord,
          'rePassWord': this.repassWord
        }
        this.showLoading = true
        register(body).then((res) => {
          this.showLoading = false
          this.$message.success(res.message)
          this.$emit('regiestSuccess')
        }, reject => {
          this.showLoading = false
        })
      },
      clickwrapper() {
        this.$emit('dismiss')
      },
      clickContent() {}
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .regiest-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
  }
  .regiest-wrapper .contentwrapper {
    width: 40%;
    height: 300px;
    margin-top: 80px;
    margin-left: 30%;
    border-radius: 8px;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  .regiest-wrapper .contentwrapper .el-input {
    width: 300px;
    margin: 0 auto;
  }
  .regiest-wrapper .contentwrapper .userName {
    margin-top: 50px;
  }
  .regiest-wrapper .contentwrapper .pwd {
    margin-top: 10px;
  }
  .regiest-wrapper .contentwrapper .el-button {
    width: 300px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: $mainColor;
    color: white;
  }
</style>
