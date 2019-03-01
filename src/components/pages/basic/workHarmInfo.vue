<template>
    <div>
        <el-form :inline="true" :disabled='disabled' :model="workHarmInfo" :rules="rules" ref="workHarmInfo" label-width="180px" size="small" label-position="right" >
            <el-form-item label="劳动能力鉴定等级：" prop="workAbilityLevel">
              <el-select clearable filterable v-model="workHarmInfo.workAbilityLevel" placeholder="" >
               <el-option v-for="item in abilityLevel" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否进行工伤登记：" prop="ifHarmLevel">
              <el-select clearable v-model="workHarmInfo.ifHarmLevel" placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="劳动能力申请日：" prop="workApplicationDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.workApplicationDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
             <el-form-item label="劳动仲裁开庭日：" prop="workJudgeDate">
               <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.workJudgeDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
             <el-form-item label="工伤案件状态：" prop="workCaseStatus">
               <el-input type="text" v-model="workHarmInfo.workCaseStatus" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="劳动能力鉴定日：" prop="workModifyDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.workModifyDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="劳动仲裁文书送达日：" prop="fileReciveDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.fileReciveDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
             <el-form-item label="工伤登记日期：" prop="harmRegisterDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.harmRegisterDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="劳动能力鉴定结论通知日：" prop="fileEndDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.fileEndDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="工伤待遇享受申请日：" prop="harmPayDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.harmPayDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="工伤认定申请日：" prop="harmDonfirmDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.harmDonfirmDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="劳动仲裁申请日：" prop="workApplDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.workApplDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="工伤待遇赔偿：" prop="harmPayMoney">
              <el-input type="number" v-model="workHarmInfo.harmPayMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="工伤认定结论出具日：" prop="confirmEndDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.confirmEndDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="传票送达日：" prop="receiveDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.receiveDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="工伤待遇到款日：" prop="moneyDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="workHarmInfo.moneyDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注：" prop="tips">
              <el-input type="text" v-model="workHarmInfo.tips" auto-complete="off" style="width:477px"></el-input>
            </el-form-item>
            <el-form-item label="下一功能节点：" prop="nextFunction">
              <el-select clearable filterable v-model="workHarmInfo.nextFunction" placeholder="" >
                <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="下一接收人：" prop="nextPerson">
              <el-select clearable filterable v-model="workHarmInfo.nextPerson" placeholder="" >
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
import {postOtherInfo} from '@/api/login'
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
        abilityLevel:[
          {value:'1级'},
          {value:'2级'},
          {value:'3级'},
          {value:'4级'},
          {value:'5级'},
          {value:'6级'},
          {value:'7级'},
          {value:'8级'},
          {value:'9级'},
          {value:'10级'},
          {value:'死亡'},
        ],
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
       props:['workHarmInfo','allFunctionNode','nextPerson'] ,
       created(){
      if(this.workHarmInfo.caseStatus===2||this.workHarmInfo.caseStatus===4){
        this.disabled=true
      }
      if(this.workHarmInfo.label===0){
        this.disabled=true
      }
    },
        methods:{
           submitForm(val) {
        (val==2)?this.loadingsubmit=true:this.loadingsave=true
        console.log(val)
        console.log(this.workHarmInfo)
        this.$refs.workHarmInfo.validate(valid => {
          if (valid) {
             this.workHarmInfo.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.workHarmInfo,'inductInjuryInfo').then(response => {
              console.log(response)
              if (response.data.code === 4||response.data.code===5) {
                if(this.workHarmInfo.nowStatus==='已结案'){
                  this.$emit('listenActiveName',this.workHarmInfo.nextFunction)
                }
                if(val===2){
                  this.disabled=true
                }
                setTimeout(() => {
                 (val==2)?this.loadingsubmit=false:this.loadingsave=false
                }, 500);
                this.$message.success(response.data.msg)
              }else {
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