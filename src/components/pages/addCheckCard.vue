<template>
  <div>
    <div>
      <div class="tab">
        <div>
          <el-button type="success" @click="dialogFormVisible = true">添加卡号</el-button>

          <el-dialog title="添加卡号" :visible.sync="dialogFormVisible">
            <el-form :model="checkCard" ref="checkCard" :rules="rules" size="small" label-width="140px" label-position="right">
              <div class="cardNumber">
                <el-form-item label="卡号：" prop="cardNumber">
                <el-input v-model="checkCard.cardNumber" auto-complete="off"></el-input>
              </el-form-item>
              </div>
              <el-form-item label="套餐：" prop="cardName">
                <el-select clearable v-model="cardName" placeholder="">
                  <el-option label="白领健康体检项目" value="白领健康体检项目"></el-option>
                  <el-option label="精英筛查体检项目" value="精英筛查体检项目"></el-option>
                  <el-option label="早癌筛查体检项目" value="早癌筛查体检项目"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="金额：" prop="money">
                <el-input v-model="checkCard.money" auto-complete="off" :disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="resetForm">重置</el-button>
                <el-button type="success" @click="handleAdd">添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div>
          <el-button @click="goBack">返回首页</el-button>
        </div>
      </div>
      <el-table :data="checkData" v-loading="loading" border fit style="width: 100%" highlight-current-row>
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="80">
        </el-table-column>
        <el-table-column label="卡号" align="center" width="200px">
          <template slot-scope="scope">
            {{ scope.row.cardNumber }}
          </template>
        </el-table-column>
        <el-table-column label="套餐" align="center" width="200px">
          <template slot-scope="scope">
            {{ scope.row.cardName }}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100px">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isUse">已预约</el-tag>
            <el-tag v-else>未预约</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="url" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.userUrl" v-if="scope.row.isUse">{{scope.row.userUrl}}</a>
            <span v-else>请先预约</span>
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
    </div>
  </div>
</template>

<script>
  import {
    showCheckCard
  } from '@/api/caseOperations'
  import {
    addCheckCard
  } from '@/api/caseOperations'
  export default {
    data() {
      return {
        pageSizesList: [100],
        pageSize: 100,
        currentPage: 1, //默认开始页面
        loading: false,
        dialogFormVisible: false,
        checkCard: {
          cardNumber: '',
          cardName:'',
          money:'',
        },
        cardName:'',
        money:'',
        disabled:true,
        rules: {
          cardNumber: [{
            required: true,
            message: '卡号不能为空',
            trigger: 'blur'
          },{ min: 16, max: 18, message: '卡号在16-18位之间', trigger: 'blur' } ],
          cardName: [{
            required: true,
            message: '请选择套餐',
            trigger: 'blur'
          }, ],
        }
      }
    },
    props:['checkData','resultDataNumber'],
    watch:{
      cardName:function(val){
        if(val==='白领健康体检项目'){
         this.checkCard.money=360
        }else if(val==='精英筛查体检项目'){
          this.checkCard.money=550
        }else if(val==='早癌筛查体检项目'){
          this.checkCard.money=880
        }else{
          this.checkCard.money=''
        }
      }

    },
    created(){
      if(this.$store.getters.roles.userIndex===4){
        this.showAll(1)
      }
    },
    methods: {
      indexMethod(index) {
        return index + 1+(this.currentPage-1)*100;
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
        this.showAll(currentPage)
      },
      //显示全部卡号
      showAll(page) {
        this.loading = true
        showCheckCard(page).then(res => {
          console.log(res)
          this.checkData=res.data.msg
          this.resultDataNumber=res.data.sum
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }).catch(err => {
          console.log(err)
        })
      },
      //添加卡号
      handleAdd() {
        this.checkCard.cardName=this.cardName
        console.log(this.checkCard)
        this.$refs.checkCard.validate(valid => {
          if (valid) {
            addCheckCard(this.checkCard).then(res => {
              console.log(res)
              if (res.data.code === 4) {
                this.$message.success(res.data.msg)
                this.dialogFormVisible = false
                this.resetForm()
                this.showAll()
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message.error('请校验表单')
          }
        })
      },
      //重置
      resetForm() {
        this.$refs.checkCard.resetFields();
      },
      //返回首页
      goBack() {
        this.$router.push('/system')
      }
    }
  }
</script>

<style scoped>
  .tab {
    height: 60px;
    border: 1px solid #e1e1e1;
    line-height: 60px;
    padding: 0 20px;
    background: #f1f2f7;
    display: flex;
    justify-content: space-between;
  }

  .cardNumber .el-input {
    /* width: 200px !important; */
    min-width: 200px !important;
  }
</style>