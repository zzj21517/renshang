<template>
  <section>
    <!--工具条-->
    <el-row class="toolbar">
      <el-col :span="20">
        <el-tooltip class="item" effect="light" content="只能填写客户基础信息!" placement="bottom-start">
          <el-button type="primary" @click="addNotFinishedCase" round>添加未结案件</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="所有信息都可以填写!" placement="bottom-start">
          <el-button type="danger" @click="addFinishedCase" round>添加已结案件</el-button>
        </el-tooltip>
        <el-button type="warning" @click="getAllCase(1,10)" round>个人案件</el-button>
        <el-button type="success" @click="getPublicCase(1,10)" round>所有案件</el-button>
      </el-col>
      <!-- <el-col :span="3">
        <el-button type='success' class="el-icon-refresh" @click="refresh" round><span style="margin-left:2px">刷新</span></el-button>
      </el-col> -->
      <template v-if="device!=='mobile'">
        <el-col :span="4">
          <el-input v-model="input" placeholder="搜索你想知道的..." suffix-icon="el-icon-search" style="width:200px !important"></el-input>
        </el-col>
      </template>
    </el-row>
    <!--列表-->
    <el-table :data="tableData" v-loading="loading" border fit style="width: 100%" highlight-current-row>
      <el-table-column label="案件编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.caseId }}
        </template>
      </el-table-column>
      <el-table-column label="案件名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.caseName }}
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.customName }}
        </template>
      </el-table-column>
      <el-table-column label="案件状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.nowStatus}}
        </template>
      </el-table-column>

      <el-table-column label="当前节点" align="center">
        <template slot-scope="scope">
          {{ scope.row.nextFunction }}
        </template>
      </el-table-column>
      <el-table-column label="当前接收人" align="center">
        <template slot-scope="scope">
          {{ scope.row.nextPerson }}
        </template>
      </el-table-column>
      <el-table-column label="签约人" align="center">
        <template slot-scope="scope">
          {{ scope.row.caseSubscriber }}
        </template>
      </el-table-column>
      <el-table-column label="案件序列" v-if="show" align="center">
        <template slot-scope="scope">
          {{ scope.row.caseIndex }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          {{ new Date(scope.row.createTime).getFullYear()}}-{{new Date(scope.row.createTime).getMonth()+1}}-{{new
          Date(scope.row.createTime).getDate()}}
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.nowStatus==='已结案'">无需审核</el-tag>
          <template v-else>
            <el-tag v-if="scope.row.caseStatus===2||scope.row.caseStatus===6" type="warning">审核中</el-tag>
            <el-tag v-else type="success">已审核</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleNext(scope.$index, scope.row)">{{scope.row.label===0?'查看详情':'继续操作'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-col :span="24" class="toolbar" style="text-align:center">
      <el-pagination class="pull-right clearfix" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-sizes="pageSizesList" :page-size="pageSize" layout="total,sizes, prev, pager, next, jumper"
        :total="resultDataNumber">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    showCaseList,
    showAllCaseList,
    continueCase
  } from '@/api/caseOperations'
  export default {
    data() {
      return {
        toggle: true,
        filters: {
          name: ''
        },
        input: "",
        show: false,
        loading: false,

        //分页器的内容
        // pageSizesList: [10, 15, 20, 30, 50],
        pageSizesList: [30],
        tableData: [], //返回的结果集合
        resultDataNumber: 0, //数据的总数,
        pageSize: 10,
        currentPage: 1, //默认开始页面
      }
    },
    computed: {
      ...mapGetters([
        'device'
      ])
    },
    created() {
      this.getAllCase(1, 10)
    },
    methods: {
      //改变页显示条数
      handleSizeChange: function (num) {
        this.pageSize = num
        this.getAllCase(this.currentPage, this.pageSize)
      },
      //改变当前页
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(currentPage)
        if (this.toggle) {
          this.getAllCase(currentPage, this.pageSize)
        } else {
          this.getPublicCase(currentPage, this.pageSize)
        }
      },
      //获取全部案件
      getAllCase(page, num) {
        this.toggle = true
        this.loading = true
        showCaseList(page, num).then(res => {
          console.log(res)
          setTimeout(() => {
            this.loading = false;
          }, 500);
          if (res.data.caseList.length > 0) {
            this.tableData = res.data.caseList
            this.resultDataNumber = res.data.number
          } else {
            this.loading = false
            this.tableData = []
            this.resultDataNumber = 0;
            this.$message.error('暂无数据')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      // 显示公司所有案件
      getPublicCase(page, num) {
        this.toggle = false
        this.loading = true
        showAllCaseList(page, num).then(res => {
          console.log(res)
          setTimeout(() => {
            this.loading = false;
          }, 500);
          if (res.data.caseList.length > 0) {
            this.tableData = res.data.caseList
            this.resultDataNumber = res.data.number
          } else {
            this.loading = false
            this.tableData = []
            this.resultDataNumber = 0;
            this.$message.error('暂无数据')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //继续操作
      handleNext(index, row) {
        continueCase(row.caseIndex).then(res => {
          console.log(res)
          console.log(row)
          this.$store.commit('SET_ACTIVENAME', row.nextFunction)
          //进入的是详细信息界面
          this.$store.commit('SET_COLLAPSESTATUS', ['2'])
          //是否显示详细信息
          this.$store.commit('SET_ISOK', true)
          //拉取该行信息
          this.$store.commit('SET_CASEINFO', res.data)
          //设置保存提交是否显示
          this.$store.commit('SET_CASEPERMISSION', res.data.casePermission)
          if (row.label === 0) {
            this.$router.push({
              path: '/custom/basic',
              query: {
                label: row.label
              }
            })
          } else {
            this.$router.push('/custom/basic')
          }
          console.log(this.$store.getters.caseInfo)
        }).catch(err => {
          console.log(err)
        })
      },
      //添加一个未结案件方法
      addNotFinishedCase() {
        continueCase(0).then(res => {
          console.log('未结案')
          console.log(res)
          this.$store.commit('SET_COLLAPSESTATUS', ['1'])
          this.$store.commit('SET_CASEINFO', res.data)
          this.$store.getters.caseInfo.basicForm.nowStatus = '未结案'
          this.$store.commit('SET_ISOK', false)
          this.$store.commit('SET_CASEPERMISSION', true)
          this.$router.push('/custom/basic')
        }).catch(err => {
          console.log(err)
        })
      },
      //添加一个已结案件方法
      addFinishedCase() {
        continueCase(0).then(res => {
          console.log(res.data)
          this.$store.commit('SET_COLLAPSESTATUS', ['1', '2'])
          this.$store.commit('SET_CASEINFO', res.data)
          this.$store.commit('SET_ACTIVENAME', '垫付信息')
          this.$store.getters.caseInfo.basicForm.nowStatus = '已结案'
          this.$store.commit('SET_ISOK', true)
          this.$store.commit('SET_CASEPERMISSION', true)
          this.$router.push('/custom/basic')
        }).catch(err => {
          console.log(err)
        })
      },
      //刷新
      refresh() {
        this.getAllCase(this.currentPage, this.pageSize)
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    background: #f1f2f7;
    padding: 10px;
  }
</style>