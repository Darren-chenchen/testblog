<template>
  <div class="search-wrapper">
    <div class="top">
      <p @click="goHome()" style="cursor: pointer">返回首页</p>
      <p>共找到{{this.total}}个结果</p>
    </div>
    <div class="titlewrapper">
      <p>darren's blog</p>
      <el-input v-model="searchKey"></el-input>
      <el-button @click="beginSearch">搜索</el-button>
    </div>
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

    <div class="nomessage" v-show="this.dataArr.length === 0">
      <img src="../../assets/box.png" alt="">
      <p></p>
    </div>

    <el-pagination
      v-show="this.total > 0"
      class="pageWrapper"
      background layout="prev, pager, next"
      @current-change="currentPageChange"
      :page-size="10"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getArticleListByKeyword} from '../../api/article'

  export default {
    data() {
      return {
        dataArr: [],
        total: 0,
        currentPage: 0,
        searchKey: ''
      }
    },
    created() {
      this.searchKey = this.$route.query.searchkey
      this.getData()
    },
    methods: {
      getData() {
        getArticleListByKeyword(this.currentPage, 10, this.searchKey).then((res) => {
          this.dataArr = res.data
          this.total = res.total
          console.log(this.dataArr)
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
      },
      goHome() {
        this.$router.push('/mynote')
      },
      beginSearch() {
        this.getData()
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";
  .search-wrapper {
    position: fixed;
    left: 0;
    width: 100%;
    top:0;
    z-index: 1000;
    height: 100%;
    background-color: white;
    overflow: scroll;
    overflow-x: hidden;
  }
  .search-wrapper .top {
    width: 100%;
    height: 30px;
    background-color: lightgrey;
    display: flex;
    flex-direction: row;
  }
  .search-wrapper .top p {
    line-height: 30px;
    margin-left: 15%;
  }
  .search-wrapper .titlewrapper {
    display: flex;
    height: 60px;
    flex-direction: row;
    background-color:white;
  }
  .search-wrapper .titlewrapper p {
    font-size: 20px;
    font-weight: 800;
    line-height: 60px;
    margin-left: 15%;
  }
  .search-wrapper .titlewrapper .el-input {
    width: 220px;
    margin-left: 20px;
    margin-top: 10px;
  }
  .search-wrapper .titlewrapper .el-button {
    height: 40px;
    margin-top: 10px;
    margin-left: 20px;
  }
  .search-wrapper .itemWrapper {
    background-color: white;
    margin-bottom: 10px;
    padding-left: 15%;
    padding-right: 15%;
  }
  .search-wrapper .item-top {
    width: 100%;
    height: 60px;
  }
  .search-wrapper .item-top h2 {
    font-size: 25px;
    line-height: 60px;
    height: 60px;
    color: #333;
  }
  .search-wrapper .item-content {
    width: 100%;
    overflow: hidden;
    line-height: 18px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    max-height: 108px;
  }
  .search-wrapper .item-content p {
    font-size: 15px;
    line-height: 18px;
    color: $subTitleColor;
  }
  .search-wrapper .item-bottom {
    width: 100%;
    height: 60px;
  }
  .bottomWrapper {
  }
  .item {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    font-size: 12px;
    color: lightgrey;
    margin-right: 35px;
  }
  .pageWrapper {
    margin-top: 30px;
    margin-bottom: 80px;
    text-align: center;
  }
  .search-wrapper .nomessage {
    position: absolute;
    top: 200px;
    width: 100%;
    background-color: white;
    text-align: center;
  }
  .search-wrapper .nomessage img {
    width: 100px;
    height: 100px;
  }
  .search-wrapper .nomessage p {
    margin-top: 20px;
  }
</style>
