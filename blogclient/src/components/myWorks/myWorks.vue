<template>
  <div class="myworkwrapper">
    <div class="top">
      <i class="el-icon-tickets"></i>
      <span>语言分类</span>
      <p :style="getCateStyle('')" @click="clickAll">全部</p>
      <p :style="getCateStyle('oc')" @click="clickOc">oc</p>
      <p :style="getCateStyle('swift')" @click="clickSwift">swift</p>
      <p :style="getCateStyle('js')" @click="clickJs">js</p>
    </div>
    <div class="content">
      <ul class="content-wrapper">
        <li class="itemWrapper" v-for="(item, index) in this.dataArr" :key="index">
          <div>
            <img @click="clickItem(item)" v-lazy="item.cover" class="itemWrapper-cover">
          </div>
          <div>
            <p @click="clickItem(item)" class="nowrap itemWrapper-title" v-html="item.title"></p>
          </div>
          <div style="display: flex;flex-direction: row;font-size: 14px;height: 20px;line-height: 20px;margin-top: 8px">
            <p class="pulishDate" v-html="getTimer(item)"></p>
            <i style="margin-left: 10px" class="el-icon-view"></i><span style="color: #9B9B9B">{{item.lookNum}}</span>
          </div>
          <div style="width: 100%;">
            <p class="itemWrapper-desc" v-html="item.desc"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getWorks} from '../../api/works'
  export default {
    components: {
    },
    data() {
      return {
        dataArr: [],
        currentPage: 0,
        category: ''
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        getWorks(this.category).then((res) => {
          this.dataArr = res.data
          this.total = res.total
          console.log(this.dataArr)
        }, reject => {

        })
      },
      getTimer(item) {
        let date = new Date(item.pulishDate)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}更新`
      },
      clickAll() {
        this.category = ''
        this.getData()
      },
      clickOc() {
        this.category = 'oc'
        this.getData()
      },
      clickSwift() {
        this.category = 'swift'
        this.getData()
      },
      clickJs() {
        this.category = 'js'
        this.getData()
      },
      getCateStyle(item) {
        if (item === this.category) {
          return `color: #6477F2`
        } else {
          return `color: gray`
        }
      },
      clickItem(item) {
        this.$router.push({
          name: 'WorksDetail',
          query: {'Id': item._id}
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .myworkwrapper {
    width: 100%;
    min-height: 100%;
    padding-left: 12%;
    padding-right: 12%;
    padding-top: 60px;
    padding-bottom: 50px;
  }
  .myworkwrapper .top {
    height: 60px;
    display: flex;
    flex-direction: row;
    background-color: white;
    line-height: 60px;
    font-size: 15px;
  }
  .myworkwrapper .top i {
    height: 6px;
    line-height: 60px;
    margin-left: 15px;
    margin-right: 8px;
  }
  .myworkwrapper .top p {
    margin-left: 20px;
    font-size: 13px;
    color: $subTitleColor;
    cursor: pointer;
  }
  /*内容*/
  .myworkwrapper .content .content-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .myworkwrapper .content-wrapper .itemWrapper {
    background-color: white;
    margin-top: 20px;
    width: 23%;
    transition: 0.5s;
    text-align: center;
    padding-bottom: 15px;
    &:nth-child(2n-1) {
      margin-right: 2.6%;
    }
    &:nth-child(4n-2) {
      margin-right: 2.6%;
    }
  }
  .myworkwrapper .content .content-wrapper .itemWrapper:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0,0,0,.1);
  }

  .itemWrapper-cover {
    width: auto;
    height: 300px;
  }
  .itemWrapper-title {
    text-align: left;
    margin-top: 15px;
    font-size: 25px;
    margin-left: 10px;
    font-weight: bolder;
    color: $mainColor;
  }
  .myworkwrapper .content .content-wrapper .itemWrapper .pulishDate {
    margin-left: 10px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color: $subTitleColor;
    text-align: left;
  }
  .myworkwrapper .content .content-wrapper .itemWrapper .el-icon-view {
    height: 20px;
    line-height: 20px;
  }
  .myworkwrapper .content .content-wrapper .itemWrapper .el-icon-view:before {
    color: $subTitleColor;
  }
  .itemWrapper-desc {
    margin-top: 10px;
    margin-left: 10px;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    max-width: 90%;
    height: 40px;
    color: $subTitleColor;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
