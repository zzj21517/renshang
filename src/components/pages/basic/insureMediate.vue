<template>
    <div>
<el-form :inline="true" :disabled='disabled' :model="insureMediate" :rules="rules" ref="insureMediate" label-width="140px" size="small" label-position="right" >
     <el-form-item label="调解时间：" prop="mediateDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="insureMediate.mediateDate" type="date" placeholder="选择日期" ></el-date-picker>
            </el-form-item>
            <el-form-item label="调解情况：" prop="mediateCondition">
              <el-input type="text" v-model="insureMediate.mediateCondition" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="调解地点：" prop="mediatePosition">
              <el-input type="text" v-model="insureMediate.mediatePosition" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="调解人：" prop="mediatePerson">
              <el-input type="text" v-model="insureMediate.mediatePerson" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="调解金额：" prop="mediateMoney">
              <el-input type="number" step="0.01" v-model="insureMediate.mediateMoney" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="调解状态：" prop="mediateStatus">
              <el-select v-model="insureMediate.mediateStatus" clearable placeholder="" >
                <el-option label="完成" value="完成"></el-option>
                <el-option label="未完成" value="未完成"></el-option>
                <el-option label="转诉讼" value="转诉讼"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="tips">
              <el-input type="text" v-model="insureMediate.tips" auto-complete="off" style="width:517px"></el-input>
            </el-form-item>
            <el-form-item label="下一功能节点：" prop="nextFunction">
               <el-select v-model="insureMediate.nextFunction" clearable filterable placeholder="" >
                <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下一接收人：" prop="nextPerson">
               <el-select v-model="insureMediate.nextPerson" clearable placeholder="" >
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
        props:['insureMediate','allFunctionNode','nextPerson'],
        created(){
      if(this.insureMediate.caseStatus===2||this.insureMediate.caseStatus===4){
        this.disabled=true
      }
      if(this.insureMediate.label===0){
        this.disabled=true
      }
    },
         methods:{
           submitForm(val) {
        (val==2)?this.loadingsubmit=true:this.loadingsave=true
        console.log(val)
        console.log(this.insureMediate)
        this.$refs.insureMediate.validate(valid => {
          if (valid) {
             this.insureMediate.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.insureMediate,'insureMediate').then(response => {
              if (response.data.code === 4||response.data.code===5) {
                if(this.insureMediate.nowStatus==='已结案'){
                  this.$emit('listenActiveName',this.insureMediate.nextFunction)
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
        }
    }
</script>

<style scoped>

</style>