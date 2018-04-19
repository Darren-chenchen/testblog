<template>
    <div class="worksWrapper">
      <div>作品管理</div>
      <ul>
        <li @click="clickItem(item)" class="item" v-for="(item, index) in this.dataArr" :key="index">
          <p style="margin-right: 20px;color: gray">{{index + 1}}</p>
          <p>{{item.title}}</p>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getPulishWorks} from '../api/works'
  export default {
    data() {
      return {
        dataArr: []
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        getPulishWorks().then((res) => {
          this.dataArr = res.data
        }, reject => {

        })
      },
      clickItem(item) {
        this.$router.push({
          name: 'PulishWork',
          params: {'title': item.title, 'desc': item.desc, 'picArr': item.picArr, '_id': item._id, 'cover': item.cover, 'demoUrl': item.demoUrl}
        })
      }
    }
  }
</script>

<style lang="scss">
    @import "../../common/scss/base";

  .worksWrapper .item {
    display: flex;
    flex-direction: row;
    height: 60px;
    line-height: 60px;
    border-bottom: solid 1px #eee;
  }
</style>
