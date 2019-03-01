<template>
    <div>
         <el-form :disabled='disabled' :inline="true" :model="checkInfo" :rules="rules" ref="checkInfo" label-width="180px" size="small" label-position="right" >
             <el-form-item label="是否开具鉴定委托书：" prop="isHasBook">
              <el-select v-model="checkInfo.isHasBook" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="精神鉴定时间：" prop="spiritCheckTime">
              <el-date-picker value-format="yyyy-MM-dd" v-model="checkInfo.spiritCheckTime" type="date" placeholder="选择日期" ></el-date-picker>
            </el-form-item>
             <el-form-item label="一级伤残：" prop="firstDisability">
              <el-input type="text" v-model="checkInfo.firstDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="二级伤残：" prop="secondDisability">
              <el-input type="text" v-model="checkInfo.secondDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="三级伤残：" prop="thirdDisability">
              <el-input type="text" v-model="checkInfo.thirdDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="四级伤残：" prop="fouthDisability">
              <el-input type="text" v-model="checkInfo.fouthDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="五级伤残：" prop="fifthDisability">
              <el-input type="text" v-model="checkInfo.fifthDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="六级伤残：" prop="sixthDisability">
              <el-input type="text" v-model="checkInfo.sixthDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="七级伤残：" prop="seventhDisability">
              <el-input type="text" v-model="checkInfo.seventhDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="八级伤残：" prop="eighthDisability">
              <el-input type="text" v-model="checkInfo.eighthDisability" auto-complete="off"  ></el-input>
            </el-form-item>
            <el-form-item label="九级伤残：" prop="ninthDisability">
              <el-input type="text" v-model="checkInfo.ninthDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="十级伤残：" prop="tenthDisability">
              <el-input type="text" v-model="checkInfo.tenthDisability" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="是否临床鉴定：" prop="isBedCheck">
              <el-select v-model="checkInfo.isBedCheck" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="是"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="鉴定进程：" prop="checkProgress">
              <el-select v-model="checkInfo.checkProgress" clearable placeholder="" >
                <el-option label="已鉴定" value="已鉴定"></el-option>
                <el-option label="暂未鉴定" value="暂未鉴定"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="临床鉴定所：" prop="bedCheckAddress">
              <el-input type="text" v-model="checkInfo.bedCheckAddress" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="误工时间：" prop="delayDate">
              <el-input type="text" v-model="checkInfo.delayDate" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="是否精神会诊：" prop="isSpiritCheck">
              <el-select v-model="checkInfo.isSpiritCheck" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营养期：" prop="foodDate">
              <el-input type="text" v-model="checkInfo.foodDate" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="精神会诊鉴定所：" prop="spiritCheckAddress">
              <el-input type="text" v-model="checkInfo.spiritCheckAddress" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="护理期：" prop="helperDate">
              <el-input type="text" v-model="checkInfo.helperDate" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="tips">
              <el-input type="text" v-model="checkInfo.tips" auto-complete="off" ></el-input>
            </el-form-item>
             <el-form-item label="下一功能节点：" prop="nextFunction">
              <el-select v-model="checkInfo.nextFunction" clearable placeholder="" >
                <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下一接收人：" prop="nextPerson">
              <el-select v-model="checkInfo.nextPerson" clearable placeholder="" >
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
            loadingsubmit:false,
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
        props:['checkInfo','allFunctionNode','nextPerson','spiritConfirm','clinicConfirm'],
        created(){
      if(this.checkInfo.caseStatus===2||this.checkInfo.caseStatus===4){
        this.disabled=true
      }
      if(this.checkInfo.label===0){
        this.disabled=true
      }
    },
         methods:{
           submitForm(val) {
        (val==2)?this.loadingsubmit=true:this.loadingsave=true
        console.log(val)
        console.log(this.checkInfo)
        this.$refs.checkInfo.validate(valid => {
          if (valid) {
             this.checkInfo.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.checkInfo,'checkInfo').then(response => {
              if (response.data.code === 4||response.data.code===5) {
                if(this.checkInfo.nowStatus==='已结案'){
                  this.$emit('listenActiveName',this.checkInfo.nextFunction)
                }
                if(val===2){
                  this.disabled=true
                }
                setTimeout(() => {
                 (val==2)?this.loadingsubmit=false:this.loadingsave=false
                }, 500);
                console.log(response)
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