<template>
    <div class="articleList-wrapper">
      <ul>
        <li @click="clickItem(item)" v-for="(item, index) in articleArr" :key="index" class="articleItemwrapper">
          <p class="title">{{item.title}}</p>
          <div class="dataWrapper" v-html="getTimer(item)"></div>
          <i class="el-icon-edit" @click.stop="editorArticle(item)"></i>
          <i class="el-icon-delete" @click.stop="deleteArticle(item)"></i>
          <i v-show="!item.isDraft" class="el-icon-sold-out" @click.stop="settingArticle(item)"></i>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getArticleList, deleteArticle, draftArticle} from '../api/userApi'
  export default {
    props: {
      articleType: {
        type: String,
        default: 'all'
      }
    },
    data() {
      return {
        articleArr: []
      }
    },
    mounted() {
      this.getArticle()
    },
    created() {
    },
    methods: {
      getArticle() {
        let body = {
          'type': this.articleType
        }
        getArticleList(body).then((res) => {
          this.articleArr = res.data
          console.log(res.data)
        }, reject => {
        })
      },
      getTimer(item) {
        let myDate = new Date(item.pulishDate)
        var mytime = myDate.toLocaleDateString() // 获取当前时间
        let hour = myDate.getHours()
        let min = myDate.getMinutes()
        return `${mytime} ${hour}:${min}`
      },
      clickItem(item) {
        this.$router.push({
          name: 'ArticleDetail',
          params: {id: item._id}
        })
      },
      editorArticle(item) {
        const {href} = this.$router.resolve({
          name: 'WriteArticle',
          query: {articleId: item._id}
        })
        window.open(href, '_blank')
      },
      deleteArticle(item) {
        this.$confirm('删除后将不可恢复，确认删除？')
          .then(_ => {
            deleteArticle(item._id).then((res) => {
              this.$message.success(res.message)
              let index = this.articleArr.indexOf(item)
              this.articleArr.splice(index, 1)
            }, reject => {

            })
          })
          .catch(_ => {})

      },
      settingArticle(item) {
        this.$confirm('确定要下架改文章吗？下架的文章在草稿中可以找到哦')
          .then(_ => {
            draftArticle(item._id).then((res) => {
              this.$message.success(res.message)
              this.getArticle()
            }, reject => {

            })
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .articleList-wrapper {
    overflow: scroll;
  }
  .articleItemwrapper {
    display: flex;
    border-bottom: solid 1px #eee;
    width: 100%;
    height: 44px;
  }
  .articleItemwrapper .title {
    line-height: 44px;
    font-size: 15px;
    width: calc(100% - 200px);
    text-align: left;
  }
  .articleItemwrapper i {
    margin-top: 15px;
    margin-left: 12px;
  }
  .articleItemwrapper i:before {
    color: $softBlue;
  }
  .articleItemwrapper .dataWrapper {
    width: 120px;
    height: 44px;
    font-size: 12px;
    line-height: 44px;
    text-align: left;
  }
  .articleItemwrapper button {
    width: 60px;
    height: 44px;
    line-height: 44px;
    font-size: 12px;
    color: $softBlue;
  }
</style>
