<template>
  <div class="home-wrapper">

    <div class="home-top-wrapper">
      <el-input class="inputWrapper" @keyup.enter="beginSearch()" placeholder="请输入关键字" v-model="keyWord"></el-input>
      <el-button class="searchBtn" @click="beginSearch()">搜索</el-button>
    </div>

    <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 80px;line-height: 80px">
      <el-breadcrumb-item :to="{ path: '/myNote',replace: true }">我的笔记</el-breadcrumb-item>
      <el-breadcrumb-item class="nowrap">{{subbread}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="全部笔记">
        <articleList type="all"></articleList>
      </el-tab-pane>
      <el-tab-pane label="ios">
        <articleListTag ref="iosList"></articleListTag>
      </el-tab-pane>
      <el-tab-pane label="vue.js">
        <articleListTag ref="vueList"></articleListTag>
      </el-tab-pane>
      <el-tab-pane label="node.js">
        <articleListTag ref="nodeList"></articleListTag>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import ArticleList from './articleList.vue'
  import ArticleListTag from './articleListTag.vue'
  export default {
    components: {
      ArticleList, ArticleListTag
    },
    data() {
      return {
        index: 0,
        subbread: '全部笔记',
        keyWord: ''
      }
    },
    destroyed() {
      this.bus.$off('breadcrumbChange')
    },
    created() {
      this.bus.$on('breadcrumbChange', data => {
        this.subbread = data
      })
    },
    methods: {
      handleClick(tab, event) {
        this.index = tab.index
        this.subbread = tab.label
        if (parseInt(tab.index) === 1) {
          this.$refs.iosList.getData('ios')
        }
        if (parseInt(tab.index) === 2) {
          this.$refs.vueList.getData('vue')
        }
        if (parseInt(tab.index) === 3) {
          this.$refs.nodeList.getData('node')
        }

        this.bus.$emit('breadcrumbChange', tab.label)
      },
      beginSearch() {
        if (this.keyWord === '') {
          this.$message.error('关键字不能为空')
          return
        }
        const {href} = this.$router.resolve({
          name: 'Search',
          query: {searchkey: this.keyWord}
        })
        window.open(href, '_blank')
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .home-top-wrapper {
    width: 100%;
    height: 60px;
    text-align: left;
  }
  .inputWrapper {
    width: 50%;
    max-width: 50%;
    height: 30px;
    margin-top: 0px;
    outline: 0;
    font-size: 12px;
  }
  .home-top-wrapper .el-input__inner {
  }
  .inputWrapper ::placeholder {
    color: #999;
  }
  .searchBtn {
    vertical-align: top;
    margin-left: 20px;
  }
</style>
