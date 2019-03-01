<template>
  <div>
    <el-table :data="membershipCard" v-loading="loading" border fit highlight-current-row>
      <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="80">
        </el-table-column>
      <el-table-column label="产品" align="center">
        <template slot-scope="scope">
          {{ scope.row.production }}
        </template>
      </el-table-column>
      <el-table-column label="卡号" align="center">
        <template slot-scope="scope">
          {{ scope.row.card }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.tel}}
        </template>
      </el-table-column>

      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          {{ scope.row.idCard }}
        </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.company }}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="纳税识别号" align="center">
        <template slot-scope="scope">
          {{ scope.row.tariff }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.tips }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="openDialog(scope.row)" v-if="scope.row.status==false">审核</el-button>
          <el-tag type="success" v-else>审核成功</el-tag>
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
    <!-- dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>会员卡信息确认无误？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,handleCheck()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMembershipCard,
    checkCard
  } from '@/api/caseOperations'
  export default {
    data() {
      return {
        loading: false,
        pageSizesList: [100],
        membershipCard: [], //返回的结果集合
        resultDataNumber: 0, //数据的总数,
        pageSize: 10,
        currentPage: 1, //默认开始页面
        dialogVisible: false,
        cardInfo: '',
      }
    },
    created(){
     this.getAllCase(1, 10)
    },
    methods: {
      indexMethod(index) {
        return index + 1;
      },
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
      //获取全部信息
      getAllCase(page, num) {
        this.loading = true
        getMembershipCard(page, num).then(res => {
          console.log(res)
          setTimeout(() => {
            this.loading = false;
          }, 500);
          if (res.data.list.length > 0) {
            this.membershipCard = res.data.list
            this.resultDataNumber = res.data.count
          } else {
            this.loading = false
            this.membershipCard = []
            this.resultDataNumber = 0;
            this.$message.error('没有找到您要的信息')
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //打开dialog
      openDialog(row) {
        this.cardInfo = row
        console.log(this.cardInfo)
        this.dialogVisible = true
      },
      //审核
      handleCheck() {
        checkCard(this.cardInfo.card).then(res => {
          console.log(res)
          if (res.data.code == 18) {
            this.$message.success(res.data.msg)
            this.cardInfo.status = true
          }

        }).catch(err => {
          console.log(err)
        })
      },

    }
  }
</script>

<style scoped>

</style>