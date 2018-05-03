<template>
  <div class="contentwrapper">
    <leftContent class="leftwrapper"></leftContent>
    <rightContent class="rightwrapper"></rightContent>
  </div>
</template>

<script type="text/ecmascript-6">
  import LeftContent from './leftContent.vue'
  import RightContent from './rightContent.vue'

  export default {
    name: 'BlogContent',
    components: {
      LeftContent, RightContent
    },
    created() {
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .contentwrapper{
    margin-top: 50px;
    background-color: white;
  }
  .leftwrapper {
    width: 20%;
    margin-left: 12%;
    float: left;
    background-color: white;
  }
  .rightwrapper {
    float: right;
    width: 54%;
    margin-right: 12%;
    min-width: 320px;
    padding-top: 30px;
    padding-right: 20px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  @media only screen and (max-width: 830px)
  {
    .leftwrapper {
      width: 0px;
      height: 0px;
    }
    .rightwrapper {
      width: 100%;
      margin-right: 0px;
    }
  }

</style>
