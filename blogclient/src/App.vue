<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from './components/nav/navigation.vue'

  export default {
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
    },
    created() {
    },
    destroyed() {
    },
    components: {
      Navigation
    }
  }
</script>

<style>
  #app {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }
</style>
