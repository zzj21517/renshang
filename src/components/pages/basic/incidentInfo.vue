<template>
    <div>
 <el-form :inline="true" :disabled='disabled' :model="incidentInfo" :rules="rules" ref="incidentInfo" label-width="140px" size="small" label-position="right" >
     <el-form-item label="处理交警队：" prop="trafficPolice">
       <el-input type="text" v-model="incidentInfo.trafficPolice" auto-complete="off"></el-input>
            </el-form-item>
    <el-form-item label="事故位置：" prop="incidentPosition">
              <el-input type="text" v-model="incidentInfo.incidentPosition" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="事故详情：" prop="detail">
              <el-input type="text" v-model="incidentInfo.detail" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="处理派出所：" prop="police">
              <el-input type="text" v-model="incidentInfo.police" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="事故时间：" prop="incidentDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="incidentInfo.incidentDate" type="date" placeholder="选择日期"  ></el-date-picker>
            </el-form-item>
            <el-form-item label="事故性质：" prop="incidentType">
              <el-select v-model="incidentInfo.incidentType" clearable placeholder="" >
                <el-option label="单车事故" value="单车事故"></el-option>
                <el-option label="非机动车与非机动车" value="非机动车与非机动车"></el-option>
                <el-option label="非机动车与行人" value="非机动车与行人"></el-option>
                <el-option label="机动车与非机动车" value="机动车与非机动车"></el-option>
                <el-option label="机动车与行人" value="机动车与行人"></el-option>
                <el-option label="机动车与机动车" value="机动车与机动车"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="事故地点：" prop="incidentAddress">
              <el-input type="text" v-model="incidentInfo.incidentAddress" auto-complete="off" style="width:517px"></el-input>
            </el-form-item>
            <el-form-item label="伤者身份：" prop="injuredId">
              <el-input type="text" v-model="incidentInfo.injuredId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="事故人数：" prop="accidentPop">
              <el-input type="text" v-model="incidentInfo.accidentPop" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="tips">
              <el-input type="text" v-model="incidentInfo.tips" auto-complete="off" style="width:517px"></el-input>
            </el-form-item>
            <el-form-item label="伤者责任：" prop="injuredRes">
              <el-select v-model="incidentInfo.injuredRes" clearable placeholder="" >
                <el-option label="次责" value="次责"></el-option>
                <el-option label="全责" value="全责"></el-option>
                <el-option label="同责" value="同责"></el-option>
                <el-option label="无责" value="无责"></el-option>
                <el-option label="主责" value="主责"></el-option>
                <el-option label="无法认定" value="无法认定"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="事故中受伤人数：" prop="accidentPeople">
              <el-input type="text" v-model="incidentInfo.accidentPeople" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="下一功能节点：" prop="nextFunction">
              <el-select v-model="incidentInfo.nextFunction" clearable placeholder="" >
                <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下一接收人：" prop="nextPerson">
              <el-select v-model="incidentInfo.nextPerson" clearable placeholder="" >
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
        props:["incidentInfo",'allFunctionNode','nextPerson','tracfficPolice','policeStation'],
        created(){
      if(this.incidentInfo.caseStatus===2||this.incidentInfo.caseStatus===4){
        this.disabled=true
      }
      if(this.incidentInfo.label===0){
        this.disabled=true
      }
    },
         methods:{
            submitForm(val) {
        (val==2)?this.loadingsubmit=true:this.loadingsave=true
        console.log(val)
        console.log(this.incidentInfo)
        this.$refs.incidentInfo.validate(valid => {
          if (valid) {
             this.incidentInfo.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.incidentInfo,'incidentInfo').then(response => {
               if(this.incidentInfo.nowStatus==='已结案'){
                 this.$emit('listenActiveName',this.incidentInfo.nextFunction)
               }
              if (response.data.code === 4||response.data.code===5) {
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