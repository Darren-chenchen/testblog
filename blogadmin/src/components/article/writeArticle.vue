<template>
    <div class="writeArticle-wrapper">
      <div class="articleTitle-wrapper">
        <div style="width: 50%;background-color: white;height: 100%;border-right: solid 1px #eee;display: inline-block;vertical-align: top;box-sizing: border-box">
          <textarea name="content" id="content" class="articleTitle" onpropertychange="this.style.height = this.scrollHeight + 'px';" oninput="this.style.height = this.scrollHeight + 'px';" placeholder="文章标题" v-model="articleTitle"></textarea>
        </div>
        <div style="width: 50%;display: inline-block;max-width: 50%">
          <p style="font-size: 30px;font-weight: 700;line-height: 35px;margin-left: 8px;margin-top: 15px">{{this.articleTitle}}</p>
        </div>
      </div>
      <markdown
        ref="markdown"
        :mdValuesP="this.mdValue"
        :fullPageStatusP="false"
        :editStatusP="false"
        :previewStatusP="false"
        :navStatusP="true"
        :icoStatusP="false"
        @childevent="childEventHandler"
        @pulishArticle="pulishArticle"
        @draft="draft"
      >
      </markdown>
      <!--<md></md>-->

      <el-dialog title="选择标签" :visible="dialogFormVisible" :showClose="false">
        <el-form>
          <el-form-item label="常用标签">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="ios"></el-checkbox>
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
    </div>
</template>

<script type="text/ecmascript-6">
  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import markdown from '../md/markdown.vue'
  import {pulishArticle, getArticleDetail} from '../api/userApi'
  import Md from '../md/md.vue'

  export default {
    components: {
      markdownEditor, markdown, Md
    },
    data() {
      return {
        mdValue: '',
        articleTitle: '',
        articleHtmlContent: '',
        dialogFormVisible: false,
        checkList: [],
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    created() {
      this.$nextTick(() => {
        if (this.$route.query.articleId.length > 0) {
          getArticleDetail(this.$route.query.articleId).then((res) => {
            this.mdValue = res.data.content
            this.articleHtmlContent = res.data.htmlContent
            this.articleTitle = res.data.title
            this.$refs.markdown.passMdValue(this.mdValue)
          }, reject => {
          })
        }
      })
    },
    methods: {
      childEventHandler(res) {
        // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
        this.mdValue = res.mdValue
        this.articleHtmlContent = res.htmlValue
      },
      pulishArticle() {
        if (this.articleTitle.length === 0) {
          this.$message.error('请输入文章标题')
          return
        }
        this.dialogFormVisible = true
      },
      sure(isDraft = false) {
        if (this.checkList.length === 0 && this.dynamicTags.length === 0) {
          this.$message.error('至少选择一种标签')
          return
        }
        this.dialogFormVisible = false

        let body = {
          'title': this.articleTitle,
          'content': this.mdValue,
          'tags': this.checkList.concat(this.dynamicTags),
          'isDraft': isDraft,
          'htmlContent': this.articleHtmlContent,
          'articleId': this.$route.query.articleId
        }
        console.log(this.mdValue)
        pulishArticle(body).then((res) => {
          this.$message.success(res.message)
        }, reject => {

        })
      },
      draft() {
        this.sure(true)
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
      changeContent() {
        var $textarea = document.getElementsByClassName('articleTitle')
        var $pre = document.getElementsByClassName('tempP')
        $pre[0].innerHTML = $textarea[0].value
      }
    },
    computed: {
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";
  @import "../../../node_modules/simplemde/dist/simplemde.min.css";
  /*@import "../../../node_modules/github-markdown-css/github-markdown.css";*/

  .writeArticle-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: #fcfaf2;
  }
  .writeArticle-wrapper .articleTitle-wrapper {
    width: 100%;
    background-color: #fcfaf2;
    font-size: 0px;
  }
  .writeArticle-wrapper .articleTitle {
    width: 100%;
    font-size: 30px;
    font-weight: 500;
    line-height: 35px;
    height: 48px;
    padding: 8px 20px 8px 20px;
    outline: 0px;
    box-sizing: border-box;
  }
  .markdown-wrapper {
  }
  .draftBtn {
    margin-top: 40px;
    margin-left: 20px;
  }
  .pulishBtn {
    margin-top: 40px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .button-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
