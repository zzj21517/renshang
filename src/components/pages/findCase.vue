<template>
  <div>
    <el-button type="text" round icon="el-icon-search" style="margin-bottom:20px">案件查询</el-button>
    <el-form :inline="true" :model="findCaseInfo" ref="findCaseInfo" label-width="140px" size="small" label-position="right">
      <el-form-item label="案件名称：" prop="caseName">
        <el-input type="text" v-model="findCaseInfo.caseName" auto-complete="off" autofocus></el-input>
      </el-form-item>
      <el-form-item label="客户姓名：" prop="customName">
        <el-input type="text" v-model="findCaseInfo.customName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="案件类型：" prop="caseType">
        <el-select v-model="findCaseInfo.caseType" placeholder="" style="width:181px">
          <el-option label="工伤" value="工伤"></el-option>
          <el-option label="交通事故" value="交通事故"></el-option>
          <el-option label="其它" value="其它"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号：" prop="identityCard">
        <el-input type="number" v-model="findCaseInfo.identityCard" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input type="number" v-model="findCaseInfo.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item style="float:right;margin-right:54px">
        <el-button icon="el-icon-search" :loading="loading" type="primary" @keyup.enter="findForm()" @click="findForm()">查找</el-button>
        <el-button @click="resetForm('findCaseInfo')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="text" round icon="el-icon-document" style="margin-bottom:20px">查询结果</el-button>

    <el-table :data="resultData" v-loading="loading" border fit highlight-current-row>
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
          {{ scope.row.caseFlowNodeName }}
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
          {{ scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleNext(scope.$index, scope.row)">继续操作</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="pagination" style="text-align:center;margin-top:20px">
      <el-pagination class="pull-right clearfix" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-sizes="pageSizesList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="resultDataNumber">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {
    findCase,
    showCaseList,
    continueCase
  } from '@/api/caseOperations'
  export default {
    data() {
      return {
        show: false,
        loading: false,
        //查找案件表单
        findCaseInfo: {
          caseIndex: null,
          caseName: null,
          cutomName: null,
          caseType: null,
          identityCard: null,
          phone: null
        },
        //分页器数据
        pageSizesList: [10, 15, 20, 30, 50],
        resultData: [], //返回的结果集合
        resultDataNumber: 0, //数据的总数,
        pageSize: 10,
        currentPage: 1, //默认开始页面
      }
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
        this.getAllCase(currentPage, this.pageSize)
      },
      //获取全部案件
      getAllCase(page,num) {
        this.loading = true
        showCaseList(page,num).then(res => {
          console.log(res.data.caseList)
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
            this.$message.error('没有找到您要的信息')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //继续操作
      handleNext(index, row) {
        continueCase(row.caseIndex).then(res => {
          console.log(res)
          if (row.caseFlowNodeName === '客户基础信息') {
            this.$store.commit('SET_ACTIVENAME', '垫付信息')
          } else {
            this.$store.commit('SET_ACTIVENAME', row.caseFlowNodeName)
          }
          this.$store.commit('SET_ISOK', true)
          this.$store.commit('SET_CASEINFO', res.data)
          this.$store.commit('SET_CASEPERMISSION',res.data.casePermission)
          this.$router.push('/custom/basic')
          console.log(this.$store.getters.caseInfo)
        }).catch(err => {
          console.log(err)
        })
      },
      //查询数据
      findForm() {
        this.loading = true,
          findCase(this.findCaseInfo).then(res => {
            console.log(res)
            console.log(this.findCaseInfo)
            if (res.data.caseList.length > 0) {
              this.resultData = res.data.caseList
              this.resultDataNumber = res.data.number
              this.$message.success('查找成功')
              this.loading = false
            } else {
              this.resultData = []
              this.resultDataNumber = 0;
              this.$message.error('没有找到您要的信息')
              this.loading = false
            }
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
      },
      //重置表单
      resetForm() {
        this.$refs.findCaseInfo.resetFields();
        this.resultData=[]
      },

    }
  }
</script>

<style scoped>
</style>