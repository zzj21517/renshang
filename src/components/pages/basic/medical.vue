<template>
  <div>
    <el-form :inline="true" :disabled='disabled' :model="medical" :rules="rules" ref="medical" label-width="140px" size="small" label-position="right"
      style="margin-bottom:20px;border-bottom:1px solid #e1e1e1">
      <el-form-item label="第几次治疗：" prop="medicalTime">
        <el-input type="number" v-model="medical.medicalTime" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="医院：" prop="firstHospital">
        <el-input type="text" v-model="medical.firstHospital" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手术内容：" prop="operationContent">
        <el-input type="text" v-model="medical.operationContent" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="住院时间：" prop="firstHospitalTime">
        <el-date-picker value-format="yyyy-MM-dd" v-model="medical.firstHospitalTime" type="date" placeholder="选择日期"
          ></el-date-picker>
      </el-form-item>
      <el-form-item label="伤情诊断：" prop="operationCheck">
        <el-input type="text" v-model="medical.operationCheck" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="伤情诊断备注：" prop="operationCheckTips">
        <el-input type="text" v-model="medical.operationCheckTips" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="床位费：" prop="bedFees">
        <el-input type="number" step="0.01" v-model="medical.bedFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="监护费：" prop="custodyFees">
        <el-input type="number" step="0.01" v-model="medical.custodyFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手术材料费：" prop="operationMetarialFees">
        <el-input type="number" step="0.01" v-model="medical.operationMetarialFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="伙食费：" prop="foodFees">
        <el-input type="number" step="0.01" v-model="medical.foodFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="tips">
        <el-input type="text" v-model="medical.tips" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="治疗方式：" prop="medicalType">
        <el-select v-model="medical.medicalType" clearable placeholder="" >
          <el-option label="保守" value="保守"></el-option>
          <el-option label="手术" value="手术"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出院时间：" prop="firstOutTime">
        <el-date-picker value-format="yyyy-MM-dd" v-model="medical.firstOutTime" type="date" placeholder="选择日期" ></el-date-picker>
      </el-form-item>
      <el-form-item label="检查费：" prop="checkFees">
        <el-input type="number" step="0.01" v-model="medical.checkFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="西药费：" prop="westFees">
        <el-input type="number" step="0.01" v-model="medical.westFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="中成药费：" prop="middleFees">
        <el-input type="number" step="0.01" v-model="medical.middleFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="输血费：" prop="bloodFees">
        <el-input type="number" step="0.01" v-model="medical.bloodFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否住院：" prop="isHospital">
        <el-select v-model="medical.isHospital" clearable placeholder="" >
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="住院总费用：" prop="hospitalMoney">
        <el-input type="text" v-model="medical.hospitalMoney" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否手术：" prop="isOperation">
        <el-select v-model="medical.isOperation" clearable placeholder="" >
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="住院天数：" prop="hospitalDays">
        <el-input type="text" v-model="medical.hospitalDays" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="科室：" prop="offices">
        <el-select v-model="medical.offices" clearable placeholder="" >
          <el-option label="骨科" value="骨科"></el-option>
          <el-option label="脑外科" value="脑外科"></el-option>
          <el-option label="普科" value="普科"></el-option>
          <el-option label="其它" value="其它"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手术费：" prop="operationFees">
        <el-input type="number" step="0.01" v-model="medical.operationFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="治疗费：" prop="todosFees">
        <el-input type="number" step="0.01" v-model="medical.todosFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="放射费：" prop="xFees">
        <el-input type="number" step="0.01" v-model="medical.xFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="中药费：" prop="midMedicalFees">
        <el-input type="number" step="0.01" v-model="medical.midMedicalFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="材料费：" prop="metarialFees">
        <el-input type="number" step="0.01" v-model="medical.metarialFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="化验费：" prop="labFees">
        <el-input type="number" step="0.01" v-model="medical.labFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="输氧费：" prop="oFees">
        <el-input type="number" step="0.01" v-model="medical.oFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="其他费用：" prop="otherFees">
        <el-input type="number" step="0.01" v-model="medical.otherFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="治疗费：" prop="medicalFees">
        <el-input type="number" step="0.01" v-model="medical.medicalFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="注射费：" prop="injectionFees">
        <el-input type="number" step="0.01" v-model="medical.injectionFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="护理费：" prop="helperFees">
        <el-input type="number" step="0.01" v-model="medical.helperFees" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="下一功能节点：" prop="nextFunction">
        <el-select v-model="medical.nextFunction" clearable placeholder="" >
          <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下一接收人：" prop="nextPerson">
        <el-select v-model="medical.nextPerson" clearable placeholder="" >
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
        disabled:false,
            rules: {
              nextFunction:[{
            required:true,
            validator:checkNextFunction,
            trigger:'blur'
          }],
          nextPerson:[{
            required:true,
            validator:checkNextPerson,
            trigger:'blur'
          }]
            }
      }
    },
    created(){
      this.medical.medicalTime = this.index + 1
      if(this.medical.caseStatus===2||this.medical.caseStatus===4){
        this.disabled=true
      }
      if(this.medical.label===0){
        this.disabled=true
      }
    },
    props: ["medical", "index",'allFunctionNode','nextPerson','hospital'],
    methods: {
       submitForm(val) {
        (val==2)?this.loadingsubmit=true:this.loadingsave=true
        console.log(val)
        console.log(this.medical)
        this.$refs.medical.validate(valid => {
          if (valid) {
             this.medical.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.medical,'firstMedicalInfo').then(response => {
              if (response.data.code === 4||response.data.code===5) {
                if(this.medical.nowStatus==='已结案'){
                  this.$emit('listenActiveName',this.medical.nextFunction)
                }
                if(val===2){
                  this.disabled=true
                }
                setTimeout(() => {
                 (val==2)?this.loadingsubmit=false:this.loadingsave=false
                }, 500);
                console.log(response)
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
    },
  }
</script>

<style scoped>

</style>