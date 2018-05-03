<template>
  <div class="rightwrapper">
    <!--:key="$route.path"解决统一路由不刷新问题-->
    <keep-alive>
      <router-view :key="$route.path"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    components: {
    },
    data() {
      return {
      }
    },
    created() {
    }
  }

</script>

<style lang="scss">
  @import "../../common/scss/base";
  .rightwrapper {
    padding-bottom: 60px;
    position: relative;
    overflow: hidden;
    background-color: white;
  }
</style>
