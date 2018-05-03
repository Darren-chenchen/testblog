<template>
    <div class="chooseImagewrapper">
      <div class="chooseImagewrapper-content">
        <i class="el-icon-close" @click="clickCancel"></i>
        <p class="title">插入图片</p>
        <div class="upload" v-show="isLocalImg">点击上传</div>
        <input multiple v-show="isLocalImg" class="uploadFlag" type="file" @change="uploadLocal">
        <el-input class="upload netImage" accept="image/png,image/gif,image/jpeg" v-show="!isLocalImg" placeholder="请输入图片url地址" v-model="imageUrl">
        </el-input>
        <p class="subtitle" @click="clickNetImage" v-html="this.isLocalImg ? '或选择网络图片':'或选择本地图片'"></p>
        <div class="bottom">
          <button class="cancelBtn" @click="clickCancel">取消</button>
          <button @click="clickSureBtn" v-show="!this.isLocalImg" class="sureBtn">确定</button>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        imageUrl: '',
        isLocalImg: true
      }
    },
    created() {},
    methods: {
      clickNetImage() {
        this.isLocalImg = !this.isLocalImg
      },
      clickCancel() {
        this.$emit('cancel')
      },
      uploadLocal(evt) {
        let param = new FormData() // 创建form对象

        for (var i = 0; i < evt.target.files.length; i++) {
          let file = evt.target.files[i]
          param.append('file', file, file.name) // 通过append向form对象添加数据
        }

        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.axios.post('admin/user/mutiablePic', param, config)
          .then(response => {
            this.$message.success('上传成功')
            let arr = []
            response.data.data.forEach((item) => {
              let imgUrl = this.axios.defaults.baseURL + item.imageUrl
              arr.push(imgUrl)
            })
            this.$emit('uploadSuccess', arr)
          }).catch((err) => {
          this.$message.success(err.message)
        })
      },
      clickSureBtn() {
        if (this.imageUrl.length === 0) {
          this.$message.error('请输入图片地址')
          return
        }
        this.$emit('uploadSuccess', [this.imageUrl])
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";
  .chooseImagewrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.6);
  }
  .chooseImagewrapper-content {
    width: 412px;
    height: 300px;
    margin: 0 auto;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(99, 99, 99, 0.5);
    margin-top: 300px;
    text-align: center;
    position: relative;
  }
  .chooseImagewrapper-content .el-icon-close {
    position: absolute;
    width: 48px;
    height: 48px;
    right: 0px;
    top: 0;
    line-height: 48px;
  }
  .chooseImagewrapper-content .title {
    display: inline-block;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    margin-top: 48px;
  }
  .chooseImagewrapper-content .upload {
    background-color: #555;
    height: 42px;
    line-height: 42px;
    color: white;
    margin-left: 42px;
    margin-right: 42px;
    margin-top: 30px;
  }
  .chooseImagewrapper-content .uploadFlag {
    position: absolute;
    top: 108px;
    left: 42px;
    height: 42px;
    width: 412px - 42px - 42px;
    opacity: 0;
  }
  .chooseImagewrapper-content .netImage {
    background-color: transparent;
    box-sizing: border-box;
    width: 412px - 42px - 42px;
    height: 44px;
  }
  .chooseImagewrapper-content .netImage input {
    height: 44px;
  }
  .chooseImagewrapper-content .subtitle {
    margin-top: 25px;
  }
  .chooseImagewrapper-content .bottom {
    width: 100%;
    height: 40px;
    margin-top: 35px;
    text-align: right;
    padding-right: 42px;
  }
  .chooseImagewrapper-content .cancelBtn {
    height: 30px;
    width: 80px;
    background-color: transparent;
    border-width: 0;
    font-size: 14px;
    outline: 0;
  }
  .chooseImagewrapper-content .sureBtn {
    color: #42c02e;
    border: solid 1px #42c02e;
    height: 30px;
    width: 60px;
    font-size: 14px;
    background-color: white;
    border-radius: 15px;
    outline: 0;
  }
</style>
