<template>
    <div class="pulishwork-wrapper">
      <el-form label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="desc"></el-input>
        </el-form-item>
        <el-form-item label="上传封面">
          <input
            title="上传封面"
            ref="referenceUpload"
            accept=".jpg, .png, .gif"
            @change="referenceUpload"
            type="file" style="top: 36px;left: 0;width: 144px;height: 48px;opacity: 1;cursor:pointer;">
          <img style="max-width: 40%; height: auto" :src="this.cover" alt="">
        </el-form-item>
        <el-form-item label="上传代码">
          <input
            title="上传代码"
            ref="referenceUploadZip"
            accept=".zip"
            @change="referenceUploadZip"
            type="file" style="top: 36px;left: 0;width: 144px;height: 48px;opacity: 1;cursor:pointer;">
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture">
            <el-button style="margin-top: 40px" size="small" type="primary" @click.stop="clickupload">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,一次最多上传5张</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 80px" type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="选择标签" :visible="dialogFormVisible" :showClose="false">
        <el-form>
          <el-form-item label="常用标签">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="oc"></el-checkbox>
              <el-checkbox label="swift"></el-checkbox>
              <el-checkbox label="android"></el-checkbox>
              <el-checkbox label="vue"></el-checkbox>
              <el-checkbox label="js"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="自定义标签">
            <el-tag
              :key="index"
              v-for="(tag, index) in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-input style="opacity: 0;height: 0px"></el-input>
            <el-button v-if="!inputVisible" class="button-new-tag" size="small" @click="showInput">新增</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消发布</el-button>
          <el-button type="primary" @click="sure()">确定发布</el-button>
        </div>
      </el-dialog>

      <chooseImage
        v-show="this.showChooseImage"
        @cancel="cancel"
        @uploadSuccess="uploadSuccess"
      ></chooseImage>

      <uploadApp v-if="this.showUploadView"
                 :appFile="this.file"
                 @closeUpload="closeUploadMethod"
                 @uploadSuccess="uploadSuccessMethod"></uploadApp>

      <uploadDemo
        v-if="this.showUploadZipView"
        :appFile="this.fileZip"
        @closeUpload="closeUploadMethodZip"
        @uploadSuccess="uploadSuccessMethodZip"
      >
      </uploadDemo>
    </div>
</template>

<script type="text/ecmascript-6">
  import ChooseImage from '../article/chooseImage.vue'
  import {pulishWorks} from '../api/works'
  import UploadApp from './uploadApp.vue'
  import UploadDemo from './uploadDemo.vue'

  export default {
    data() {
      return {
        title: '',
        desc: '',
        showChooseImage: false,
        fileList2: [],
        dialogFormVisible: false,
        checkList: [],
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        showUploadView: false,
        file: FileList,
        cover: '',
        showUploadZipView: false,
        fileZip: FileList,
        demoUrl: ''
      }
    },
    components: {
      ChooseImage, UploadApp, UploadDemo
    },
    created() {
      if (this.$route.params) {
        this.title = this.$route.params.title
        this.desc = this.$route.params.desc
        this.fileList2 = this.$route.params.picArr || []
        this.cover = this.$route.params.cover || ''
        this.demoUrl = this.$route.params.demoUrl || ''
      }
    },
    methods: {
      handleRemove(file, fileList) {
        let index = this.fileList2.indexOf({'url': file.url})
        this.fileList2.splice(index, 1)
      },
      handlePreview(file) {
      },
      cancel() {
        this.showChooseImage = false
      },
      uploadSuccess(urlArr) {
        this.showChooseImage = false
        let arr = []
        urlArr.forEach((item) => {
          arr.push({'url': item})
        })
        this.fileList2 = arr
      },
      onSubmit() {
        if (!this.title || this.title.length === 0) {
          this.$message.error('请输入标题')
          return
        }
        this.dialogFormVisible = true
      },
      sure() {
        this.dialogFormVisible = false
        let body = {
          'title': this.title,
          'desc': this.desc,
          'picArr': this.fileList2,
          'tags': this.checkList.concat(this.dynamicTags),
          'workId': this.$route.params._id ? this.$route.params._id : '',
          'cover': this.cover,
          'demoUrl': this.demoUrl
        }
        pulishWorks(body).then((res) => {
          this.$message.success(res.message)
        }, reject => {

        })
      },
      clickupload() {
        this.showChooseImage = true
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      clickuploadCover() {

      },
      referenceUpload(e) {
        this.file = e.target.files
        if (e.target.files.length > 0) {
          this.showUploadView = true
        }
      },
      referenceUploadZip(e) {
        this.fileZip = e.target.files
        if (e.target.files.length > 0) {
          this.showUploadZipView = true
        }
      },
      closeUploadMethod() {
        this.showUploadView = false
      },
      closeUploadMethodZip() {
        this.showUploadZipView = false
      },
      uploadSuccessMethodZip(item) {
        this.showUploadZipView = false
        this.demoUrl = item
      },
      uploadSuccessMethod(item) {
        this.showUploadView = false
        this.cover = item
      }
    }
  }
</script>

<style lang="scss">
    @import "../../common/scss/base";

  .pulishwork-wrapper {
    padding: 60px 15%;
  }
</style>
