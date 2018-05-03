<template>
    <div class="workDetail-wrapper" v-if="this.detailData._id">
      <h1 class="title" v-html="this.detailData.title"></h1>
      <img v-if="this.detailData.cover && this.detailData.cover.length>0" class="cover" :src="this.detailData.cover" alt="">
      <h1 class="title">项目介绍</h1>
      <p class="desc" v-html="this.detailData.desc"></p>
      <h1 class="title">效果图展示</h1>

      <div class="animawrapper1">
        <div class="animawrapper1-image">
          <ul :style="getContentStyle()">
            <li v-for="(item, index) in this.detailData.picArr" :key="index">
              <img v-lazy="item.url" alt="">
            </li>
          </ul>
        </div>
      </div>

      <div v-show="this.detailData.demoUrl && this.detailData.demoUrl.length>0">
        <a :href="this.detailData.demoUrl" class="download" download>下载demo</a>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import {getWorksById} from '../../api/works'
  export default {
    data() {
      return {
        detailData: {}
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        getWorksById(this.$route.query.Id).then((res) => {
          this.detailData = res.data
          console.log(this.detailData)
        }, reject => {

        })
      },
      getContentStyle() {
        return `width: ${this.detailData.picArr.length * 240}px`
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";
  .workDetail-wrapper {
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 60px;
    padding-bottom: 60px;
  }
  .workDetail-wrapper .title {
    font-size: 25px;
    font-weight: bold;
  }
  .workDetail-wrapper .cover {
    max-width: 40%;
    height: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .workDetail-wrapper .desc {
    line-height: 25px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .workDetail-wrapper .download {
    display: block;
    margin-top: 30px;
    color: $mainColor;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }


  /*动画样式1*/
  .workDetail-wrapper .animawrapper1 .animawrapper1-image{
    width: 100%;
    height: 450px;
    background-color: #dfdfdf;
    overflow: hidden;  //设置超出部分
  }
  .workDetail-wrapper .animawrapper1 .animawrapper1-image ul{
    margin-left: 300px;
    animation: move 20s linear 0s infinite normal;
    font-size: 0px;
  }
  .workDetail-wrapper .animawrapper1 .animawrapper1-image ul li{
    display: inline-block;
  }
  .workDetail-wrapper .animawrapper1 .animawrapper1-image ul li img{
    margin-top: 50px;
    margin-right: 20px;
    width: 200px;
  }
  .workDetail-wrapper .animawrapper1 .animawrapper1-image ul:hover{
    /*动画添加给谁, 就让谁停止*/
    animation-play-state: paused;
  }
  .workDetail-wrapper .animawrapper1 .animawrapper1-image ul:hover li{
    opacity: 0.3;
  }

  .workDetail-wrapper .animawrapper1 .animawrapper1-image ul li:hover{
    opacity: 1;
  }
  .workDetail-wrapper .animawrapper1 .animawrapper1-image ul li:hover img{
    animation-duration: 2s;
    /*1.告诉系统需要执行哪个动画*/
    animation-name: imageTransform;
    animation-fill-mode: forwards;
  }
  @keyframes imageTransform {
    from{
      transform:scale(1,1);
    }
    to{
      transform:scale(1.3,1.3);
    }
  }
  @keyframes move {
    from{
      margin-left: 300px;
    }
    to{
      margin-left: -1500px;
    }
  }

</style>
