<template>
  <div class="uploadApp-wrapper">
    <div class="uploadContent">
      <img src="../../assets/loadding.gif">
      <div style="font-size: 20px;margin-top: 30px;color: #6477F2" v-html="`正在上传中...${progress}%`"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Message } from 'element-ui'
  const axios = require('axios')

  export default {
    props: {
      appFile: {
        type: FileList
      }
    },
    data() {
      return {
        progress: 0,
        source: null // 取消上传
      }
    },
    created() {
      this.$nextTick(() => {
        this.beginLoad()
      })
    },
    methods: {
      cancelUpload() {
        if (this.source) {
          this.source.cancel('取消上传')
        }
        this.$emit('closeUpload')
      },
      beginLoad() {
        const _this = this
        // 取消上传使用
        let cancelToken = axios.CancelToken
        _this.source = cancelToken.source()

        var data = new FormData()
        data.append('file', this.appFile[0])
        var config = {
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              _this.$nextTick(() => {
              _this.progress = percentCompleted
            })
          },
          cancelToken: _this.source.token
        }

        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'

        axios.post(`admin/user/pulishArticle`, data, config)
          .then((res) => {
          console.log(res)
            Message({
              message: res.data.success ? '上传成功' : res.data.message,
              type: res.data.success ? 'success' : 'error'
            })
            let imgUrl = this.axios.defaults.baseURL + res.data.data.imageUrl

            this.$emit('uploadSuccess', imgUrl)
          })
          .catch(function(err) {
            if (axios.isCancel(err)) {
              console.log('Request canceled', err.message)
              return
            }
            Message.error('上传失败')
          })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .uploadApp-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1000;
    text-align: center;
  }
  .uploadApp-wrapper .uploadContent {
    position: absolute;
    width: 240px;
    height: 240px;
    background-color: white;
    box-shadow: 0px 0px 6px 0px rgba(224,231,239,1);
    border-radius: 20px;
    top: calc(50% - 120px);
    left: 50%;
    margin-left: -120px;
  }
  .uploadApp-wrapper .uploadContent img {
    margin-top: 95px;
  }
</style>
