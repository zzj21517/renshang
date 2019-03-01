<template>
  <div>
    <el-form :disabled='disabled' :inline="true" :model="closure" :rules="rules" ref="closure" label-width="140px" size="small" label-position="right">
      <el-form-item label="诉讼结案方式：" prop="closeType">
        <el-select v-model="closure.closeType" clearable placeholder="" >
          <el-option label="判决" value="判决"></el-option>
          <el-option label="调解" value="调解"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="诉后结案状态：" prop="closeStatus">
        <el-select v-model="closure.closeStatus" clearable placeholder="" >
          <el-option label="收费" value="收费"></el-option>
          <el-option label="退款" value="退款"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="履行期限：" prop="performDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="closure.performDate" type="date" placeholder="选择日期" ></el-date-picker>
      </el-form-item>
      <el-form-item label="跟款跟踪：" prop="moneyWay">
        <el-input type="text" v-model="closure.moneyWay" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="结案收款日期：" prop="endMoneyDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="closure.endMoneyDate" type="date" placeholder="选择日期" ></el-date-picker>
      </el-form-item>
      <el-form-item label="结案收款金额：" prop="endSumMoney">
        <el-input type="number" step="0.01" v-model="closure.endSumMoney" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="tips">
        <el-input type="text" v-model="closure.tips" auto-complete="off" style="width:517px"></el-input>
      </el-form-item>

      <el-form-item style="float:right">
               <el-button :loading="loadingsave" @click="submitForm(1)">保存</el-button>
          <el-button :loading="loadingsubmit" type="primary" @click="submitForm(2)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {postOtherInfo} from '@/api/login'
  export default {
    data() {
      const checkCloseStatus = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('诉后结案状态不能为空'))
        } else {
          callback()
        }
      }
      return {
        loadingsave: false,
        loadingsubmit: false,
        disabled:false,
            rules: {
              closeStatus:[{
            required:true,
            validator:checkCloseStatus,
            trigger:'blur'
          }],
            }
      }
    },
    created(){
      
    },
    props: ["closure",'allFunctionNode','nextPerson'],
    created(){
      if(this.closure.caseStatus===2||this.closure.caseStatus===4){
        this.disabled=true
      }
      if(this.closure.label===0){
        this.disabled=true
      }
    },
    methods: {
         submitForm(val) {
        (val==2)?this.loadingsubmit=true:this.loadingsave=true
        this.$refs.closure.validate(valid => {
          if (valid) {
             this.closure.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.closure,'closure').then(response => {
              console.log(response)
              if (response.data.code === 4||response.data.code===5) {
                if(this.closure.nowStatus==='已结案'){
                  this.$emit('listenActiveName',this.closure.nextFunction)
                }
                if(val===2){
                  this.disabled=true
                }
                setTimeout(() => {
                 (val==2)?this.loadingsubmit=false:this.loadingsave=false
                }, 500);
                this.$message.success(response.data.msg)
              } else {
                setTimeout(() => {
                  (val==2)?this.loadingsubmit=false:this.loadingsave=false
                }, 500);
                this.$message.error(response.data.msg)
              }
            }).catch(error => {
              setTimeout(() => {
               (val==2)?this.loadingsubmit=false:this.loadingsave=false
              }, 500);
              console.log(error)
            })
          } else {
            setTimeout(() => {
              (val==2)?this.loadingsubmit=false:this.loadingsave=false
            }, 500);
            this.$message.error('必填项不能为空')
          }
        })
      }
      }
    }
</script>

<style scoped>

</style>