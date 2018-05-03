<template>
  <div class="articletagwrapper">
    <ul>
      <li class="itemWrapper" v-for="item in this.dataArr" :key="item._id" @click="clickItem(item)">
        <div class="item-top">
          <h2 class="nowrap">{{item.title}}</h2>
        </div>
        <div class="item-content">
          <p v-html="item.htmlContent"></p>
        </div>
        <div class="item-bottom">
          <ul class="bottomWrapper">
            <li class="item">
              阅读：{{item.lookNum}}
            </li>
            <li class="item">
              评论：{{item.commentNum}}
            </li>
            <li class="item">
              标签：{{item.tags.join(',')}}
            </li>
          </ul>
        </div>
        <div style="width: 100%;height: 1px;background-color: #eee"></div>
      </li>
    </ul>

    <el-pagination
      v-show="this.total>0"
      class="pageWrapper"
      background layout="prev, pager, next"
      @current-change="currentPageChange"
      :page-size="10"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getArticleByTags} from '../../api/article'

  export default {
    props: {
    },
    data() {
      return {
        dataArr: [],
        total: 0,
        currentPage: 0
      }
    },
    created() {
    },
    methods: {
      getData(type) {
        getArticleByTags(this.currentPage, 10, [type]).then((res) => {
          this.dataArr = res.data
          this.total = res.total
        }, reject => {

        })
      },
      clickItem(item) {
        this.$router.push({
          name: 'ArticleDetail',
          params: {articleId: item._id}
        })
      },
      currentPageChange(currentPage) {
        this.currentPage = currentPage - 1
        this.getData()
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";
  .articletagwrapper .itemWrapper {
    background-color: white;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .articletagwrapper .item-top {
    width: 100%;
    height: 60px;
  }
  .articletagwrapper .item-top h2 {
    font-size: 25px;
    line-height: 60px;
    height: 60px;
    color: #333;
  }
  .articletagwrapper .item-content {
    width: 100%;
    overflow: hidden;
    line-height: 18px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    max-height: 108px;
  }
  .articletagwrapper .item-content p {
    font-size: 15px;
    line-height: 18px;
    color: $subTitleColor;
  }
  .articletagwrapper .item-bottom {
    width: 100%;
    height: 60px;
  }
  .bottomWrapper {
  }
  .articletagwrapper .item {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    font-size: 12px;
    color: lightgrey;
    margin-right: 35px;
  }
  .articletagwrapper .pageWrapper {
    margin-top: 30px;
    margin-bottom: 80px;
    text-align: center;
  }
</style>
