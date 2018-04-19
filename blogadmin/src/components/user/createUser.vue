<template>
    <div class="createUser-wrapper">
      <el-form :model="data" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="data.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="text" v-model="data.passWord" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassWord">
          <el-input v-model="data.repassWord" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="outline: 0" type="primary" @click="submitForm('data')">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
  import * as LoginApi from '../api/loginApi'
  export default {
    data() {
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      var validatePassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validateRepassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认密码'))
        } else if (value !== this.data.passWord) {
          console.log(this.data.passWord)
          console.log(value)
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        data: {
          userName: '',
          passWord: '',
          repassWord: ''
        },
        rules2: {
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          passWord: [
            { validator: validatePassWord, trigger: 'blur' }
          ],
          repassWord: [
            { validator: validateRepassWord, trigger: 'blur' }
          ]
        }
      }
    },
    created() {},
    methods: {
      submitForm(data) {
        let body = {
          'userName': this.data.userName,
          'passWord': this.data.passWord,
          'rePassWord': this.data.repassWord
        }
        LoginApi.register(body)
          .then(response => {
            console.log(response)
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          }, reject => {
            this.$message.error(reject)
          })
      },
      cancel() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .createUser-wrapper {
  }
  .createUser-wrapper .demo-ruleForm {
    width: 400px;
    margin-top: 40px;
  }
</style>
