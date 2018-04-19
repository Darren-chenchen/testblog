<template>
    <div>
      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
    </div>
</template>

<script type="text/ecmascript-6">
  import markdownEditor from 'vue-simplemde/src/markdown-editor'

  export default {
    components: {
      markdownEditor
    },
    data() {
      return {
        content: ''
      }
    },
    created() {},
    methods: {}
  }
</script>

<style lang="scss">
    @import "../../common/scss/base";
    @import "../../../node_modules/simplemde/dist/simplemde.min.css";

</style>
