<template>
  <div class="leftInfo">
    <!--个人信息-->
    <div class="userInfo">
      <div class="content">
        <p class="title">个人信息</p>
        <img class="myicon" src="../../assets/logo.png" alt="">
        <div>
          <p class="name">陈亮</p><a class="leftInfo-a" href="https://github.com/Darren-chenchen" style="display: inline-block;margin-left: 8px" target="_blank">GitHub</a>
        </div>
        <div class="location">
          <i class="el-icon-location"></i> 上海
        </div>
      </div>
    </div>
    <!--热门文章-->
    <div class="hotwrapper" v-show="this.hotArr.length>0">
      <div class="content">
        <p class="title">热门文章</p>
        <ul class="hotContent">
          <li @click="clickItem(item)" v-for="item in this.hotArr" :key="item._id">
            <p class="canwrap" v-html="item.title"></p>
          </li>
        </ul>
      </div>
    </div>
    <!--最新文章-->
    <div class="hotwrapper" v-show="this.newsArr.length>0">
      <div class="content">
        <p class="title">最新文章</p>
        <ul class="hotContent">
          <li @click="clickItem(item)" v-for="item in this.newsArr" :key="item._id">
            <p class="canwrap" v-html="item.title"></p>
          </li>
        </ul>
      </div>
    </div>
    <!--友情连接-->
    <div class="hotwrapper">
      <div class="content">
        <p class="title">友情连接</p>
        <ul class="hotContent">
          <li>
            <a class="leftInfo-a" target="_blank" href="https://github.com/Darren-chenchen/CLImagePickerTool">CLImagePickerTool</a>
          </li>
          <li>
            <a class="leftInfo-a" target="_blank" href="https://github.com/Darren-chenchen/PopAlert">PopAlert</a>
          </li>
          <li>
            <a class="leftInfo-a" target="_blank" href="https://github.com/Darren-chenchen/yiyiTuYa">涂鸦demo，性能改善，无卡顿</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getArticleList} from '../../api/article'

  export default {
    components: {
    },
    data() {
      return {
        hotArr: [],
        newsArr: []
      }
    },
    created() {
      this.getData()
      this.getNewData()
    },
    methods: {
      getData() {
        let body = {
          'type': 'hot'
        }
        getArticleList(this.currentPage, 6, body).then((res) => {
          this.hotArr = res.data
        }, reject => {

        })
      },
      getNewData() {
        let body = {
          'type': 'news'
        }
        getArticleList(this.currentPage, 6, body).then((res) => {
          this.newsArr = res.data
        }, reject => {

        })
      },
      clickItem(item) {
        this.$router.push({
          name: 'ArticleDetail',
          params: {articleId: item._id}
        })
      }
    }
  }

</script>

<style lang="scss">
  @import "../../common/scss/base";
  .leftInfo {
    padding-top: 30px;
  }
  .leftInfo .userInfo {
    padding: 20px;
    margin-top: -10px;
  }
  .leftInfo .hotwrapper {
    padding: 2em;
  }
  .leftInfo .content {
    width: 100%;
    border: 1px solid #eee;
    text-align: center;
    min-width: 80px;
  }
  .leftInfo .content .title {
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    margin: -10px auto;
    background-color: white;
    max-width: 80px;
  }
  .leftInfo .userInfo .content .myicon {
    max-width: 60%;
    width: auto;
    margin-top: 2em;
  }
  .leftInfo .userInfo .content .name {
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 16px;
    display: inline-block;
  }
  .leftInfo .userInfo .content .el-icon-location:before {
    color: $mainColor;
  }
  .leftInfo .userInfo .content .location {
    color: $subTitleColor;
    font-size: 13px;
    margin-bottom: 1em;
  }
  .hotwrapper .hotContent {
    margin: 1em;
    margin-top: 2em;
    font-size: 14px;
  }
  .hotwrapper .hotContent li {
    line-height: 1.3em;
    margin-bottom: 1.5em;
    color: $subTitleColor;
    cursor: pointer;
    text-align: left;
  }
  .hotwrapper .hotContent li:hover {
    color: $warmRed;
  }
  .leftInfo-a {
    text-decoration: underline;
  }
  .leftInfo-a:hover {
    color: $warmRed;
  }
</style>
