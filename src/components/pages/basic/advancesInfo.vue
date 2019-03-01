<template>
  <div>
    <el-form :inline="true" :disabled='disabled' :model="advancesInfo" :rules="rules" ref="advancesInfo" label-width="140px"
      size="small" label-position="right">
      <el-form-item label="垫付方式：" prop="advancesType">
        <el-select clearable v-model="advancesInfo.advancesType" placeholder="">
          <el-option label="基金" value="基金"></el-option>
          <el-option label="交强险" value="交强险"></el-option>
          <el-option label="路救" value="路救"></el-option>
          <el-option label="银行" value="银行"></el-option>
          <el-option label="其它" value="其它"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票是否分割：" prop="invoiceSegment">
        <el-select clearable v-model="advancesInfo.invoiceSegment" placeholder="">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="垫付金额：" prop="advancesSum">
        <el-input type="number" step="0.01" v-model="advancesInfo.advancesSum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="分割发票金额：" prop="segmentSumm">
        <el-input type="number" step="0.01" v-model="advancesInfo.segmentSum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户银行卡号：" prop="customBankCard">
        <el-input type="number" v-model="advancesInfo.customBankCard" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户信用：" prop="customCredit">
        <el-select clearable v-model="advancesInfo.customCredit" placeholder="">
          <el-option label="黑名单" value="黑名单"></el-option>
          <el-option label="良好" value="良好"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到账日期：" prop="payDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="advancesInfo.payDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="银行上门办理日期：" prop="bankDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="advancesInfo.bankDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注：" prop="tips">
        <el-input type="text" v-model="advancesInfo.tips" auto-complete="off" style="width:415px !important"></el-input>
      </el-form-item>
      <el-form-item label="垫付申请日：" prop="applicationDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="advancesInfo.applicationDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="垫付办审批日：" prop="advancesPayDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="advancesInfo.advancesPayDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="资料上传：" prop="fileUpdate">
        <el-input type="text" v-model="advancesInfo.fileUpdate" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="下一功能节点：" prop="nextFunction">
        <el-select clearable filterable v-model="advancesInfo.nextFunction" placeholder="">
          <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下一接收人：" prop="nextPerson">
        <el-select clearable v-model="advancesInfo.nextPerson" placeholder="">
          <el-option v-for="item in nextPerson" :key="item.userName" :label="item.userName" :value="item.userIndex">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="float:right">
        <el-button :loading="loadingsave" @click="submitForm(1)">保存</el-button>
        <el-button :loading="loadingsubmit" type="primary" @click="submitForm(2)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    postOtherInfo
  } from '@/api/login'
  import {
    checkCase
  } from '@/api/caseOperations'
  export default {
    data() {
      const checkNextFunction = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('下一功能节点不能为空'))
        } else {
          callback()
        }
      }
      const checkNextPerson = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('下一接收人不能为空'))
        } else {
          callback()
        }
      }
      return {
        loadingsave: false,
        loadingsubmit: false,
        disabled: false,
        rules: {
          nextFunction: [{
            required: true,
            validator: checkNextFunction,
            trigger: 'blur'
          }],
          nextPerson: [{
            required: true,
            validator: checkNextPerson,
            trigger: 'blur'
          }]
        }
      }
    },
    props: ['advancesInfo', 'allFunctionNode', 'nextPerson'],
    created() {
      if (this.advancesInfo.caseStatus===2||this.advancesInfo.caseStatus===4) {
          this.disabled = true
      }
      if(this.advancesInfo.label===0){
        this.disabled=true
      }
    },
    methods: {
      submitForm(val) {
        (val == 2) ? this.loadingsubmit = true: this.loadingsave = true
        console.log(val)
        console.log(this.advancesInfo)
        this.$refs.advancesInfo.validate(valid => {
          if (valid) {
            this.advancesInfo.caseStatus = val //将表单的案件状态改为save或者submit
            postOtherInfo(this.advancesInfo, 'advancesInfo').then(response => {
              console.log(response)
              if (response.data.code === 4 || response.data.code === 5) {
                if(this.advancesInfo.nowStatus==='已结案'){
                  this.$emit('listenActiveName', this.advancesInfo.nextFunction)
                }
                if (val === 2) {
                    this.disabled = true
                }
                setTimeout(() => {
                  (val == 2) ? this.loadingsubmit = false: this.loadingsave = false
                }, 500);
                this.$message.success(response.data.msg)
              } else {
                setTimeout(() => {
                  (val == 2) ? this.loadingsubmit = false: this.loadingsave = false
                }, 500);
                this.$message.error(response.data.msg)
              }
            }).catch(error => {
              setTimeout(() => {
                (val == 2) ? this.loadingsubmit = false: this.loadingsave = false
              }, 500);
              console.log(error)
            })
          } else {
            setTimeout(() => {
              (val == 2) ? this.loadingsubmit = false: this.loadingsave = false
            }, 500);
            this.$message.error('必填项不能为空')
          }
        })
      },
    }
  }
</script>

<style scoped>
</style>