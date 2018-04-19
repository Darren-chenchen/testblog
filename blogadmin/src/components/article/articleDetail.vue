<template>
    <div class="detailwrapper" >
      <h1 class="title nowrap" v-html="this.data.title"></h1>
      <div class="markdown-body" v-html="this.compiledMarkdown">
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getArticleDetail} from '../api/userApi'
  import marked from 'marked'
  import hljs from '../../../static/js/highlight.min.js'

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  export default {
    data() {
      return {
        data: {}
      }
    },
    created() {
      this.getDetail()
    },
    computed: {
      compiledMarkdown() {
        return marked(this.data.content || '', {
          sanitize: true
        })
      }
    },
    methods: {
      getDetail() {
        getArticleDetail(this.$route.params.id).then((res) => {
          this.data = res.data
        }, reject => {

        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss">
    @import "../../common/scss/base";
    /*引入reset文件*/
    @import "../../../static/css/reset";
    /*引入github的markdown样式文件*/
    @import "../../../static/css/github-markdown.css";
    /*引入atom的代码高亮样式文件*/
    @import "../../../static/css/atom-one-dark.min.css";

  .detailwrapper {
    min-height: 100%;
    text-align: left;
  }
  .detailwrapper .title {
    font-weight: bold;
    text-align: center;
  }
</style>
