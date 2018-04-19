<template>
    <div class="userList-Wrapper">
      <div class="userListHeader">
        <p>用户列表 ({{this.listType}})</p>
        <button @click="clickCreatUser">创建用户</button>
        <div class="line"></div>
      </div>
      <div class="userListwrapper">
        <div class="searchwrapper">
          <input v-model="searchKey" type="text" placeholder="请输入搜索关键字">
          <div class="queryBtn btn" @click="beginQuery">查询</div>
          <div class="resetBtn btn" @click="clickReset">重置</div>
        </div>
      </div>
      <div class="userListTable">
        <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 100%;">
        <el-table-column
        prop="creatDate"
        label="日期"
        width="180">
        </el-table-column>
        <el-table-column
        prop="userName"
        label="用户名"
        width="180">
        </el-table-column>
        <el-table-column
        prop="_id"
        label="待定">
        </el-table-column>
        </el-table>
      </div>

      <div class="userListFooter-wrapper" v-if="this.tableData.length>0">
        <el-pagination
          background
          style="padding-top: 15px"
          layout="prev, pager, next"
          :total="this.result.total"
          :page-size="this.pageSize"
          @current-change="currentPageChange"
        >
        </el-pagination>
        <p class="totalCount">共{{this.result.total}}行</p>
        <el-dropdown class="pageCount" @command="changePageSize">
          <span class="el-dropdown-link">
            每页{{this.pageSize}}行数据<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="20">每页20行</el-dropdown-item>
            <el-dropdown-item command="30">每页30行</el-dropdown-item>
            <el-dropdown-item command="40">每页40行</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import * as UserApi from '../api/userApi'

  export default {
    props: {
    },
    components: {
    },
    data() {
      return {
        currentPage: 0,
        pageSize: 20,
        searchKey: '',
        tableData: [],
        result: {},
        listType: ''
      }
    },
    created() {
      this.bus.$on('refreshUserList', (prop) => {
        this.searchKey = ''
        this.currentPage = 0
        this.pageSize = 20
        this.listType = prop
        this.loadData()
      })
      this.$nextTick(() => {
        this.listType = this.$route.params.type
        this.loadData()
      })
    },
    methods: {
      loadData() {
        UserApi.userList(this.listType, this.currentPage, this.pageSize, false, 'creatDate', this.searchKey).then((res) => {
          this.result = res
          this.tableData = res.data
        }, reject => {
          this.$message.error(reject)
        })
      },
      currentPageChange(currentPage) {
        this.currentPage = currentPage - 1
        this.loadData()
      },
      changePageSize(command) {
        this.pageSize = parseInt(command)
        this.loadData()
      },
      beginQuery() {
        this.loadData()
      },
      clickReset() {
        this.searchKey = ''
        this.loadData()
      },
      clickCreatUser() {
        this.$router.push('/creatUser')
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";
  .userList-Wrapper {
    width: 100%;
    height: 100%;
  }
  .userListHeader {
    position: relative;
    width: 100%;
    height: 60px;
  }
  .userListHeader p {
    float: left;
    margin-top: 26px;
    margin-left: 20px;
    font-size: 14px;
    color: #666;
  }
  .userListHeader button {
    border-radius: 3px;
    border: solid 1px #ccc;
    font-size: 14px;
    color: #666;
    width: 80px;
    height: 30px;
    float: right;
    margin-right: 20px;
    margin-top: 15px;
    background-color: white;
    outline: 0;
  }
  .userListHeader .line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #eee;
    top: 60px;
  }
  .userListwrapper .searchwrapper {
    width: 100%;
    height: 60px;
    display: flex;
  }
  .searchwrapper input {
    width: 150px;
    height: 30px;
    border: solid 1px #ccc;
    padding: 0 8px;
    font-size: 12px;
    margin-top: 15px;
    border-radius: 4px;
  }
  .searchwrapper .btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-width: 0px;
    border-radius: 4px;
    font-size: 14px;
    color: white;
    margin-left: 10px;
    margin-top: 15px;
    outline: 0 !important;
  }
  .searchwrapper .queryBtn {
    background-color: rgb(80, 96, 114);
  }
  .searchwrapper .resetBtn {
    background-color: $softBlue;
  }
  .userList-Wrapper .userListwrapper {
    padding: 0px 20px 0px 20px;
  }
  .userListTable {
    width: 100%;
    height: calc(100% - 180px);
  }
  .userListFooter-wrapper {
    width: 100%;
    height: 60px;
    position: relative;
  }
  .userListFooter-wrapper .totalCount {
    position: absolute;
    top: 21px;
    right: 150px;
    font-size: 15px;
  }
  .userListFooter-wrapper .pageCount {
    position: absolute;
    top: 20px;
    right: 30px;
  }
</style>
