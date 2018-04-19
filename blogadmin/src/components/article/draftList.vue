<template>
    <div>
      <articleList articleType="draft"></articleList>
    </div>
</template>

<script type="text/ecmascript-6">
  import ArticleList from './articleList.vue'

  export default {
    components: {
      ArticleList
    },
    data() {
      return {}
    },
    created() {},
    methods: {}
  }
</script>

<style lang="scss">
    @import "../../common/scss/base";
</style>
