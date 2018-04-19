<template>
    <div>
      <div class="articleMain-header">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有文章" name="所有文章">
            <articleList articleType="all" v-if="this.activeName === '所有文章'"></articleList>
          </el-tab-pane>
          <el-tab-pane label="热门" name="热门">
            <articleList articleType="hot" v-if="this.activeName === '热门'"></articleList>
          </el-tab-pane>
          <el-tab-pane label="最新" name="最新">
            <articleList articleType="news" v-if="this.activeName === '最新'"></articleList>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import ArticleList from './articleList.vue'
  export default {
    components: {
      ArticleList
    },
    data() {
      return {
        activeName: '所有文章'
      }
    },
    created() {},
    methods: {
      handleClick(tab, event) {
        this.activeName = tab.label
      }
    }
  }
</script>

<style lang="scss">
    @import "../../common/scss/base";
</style>
