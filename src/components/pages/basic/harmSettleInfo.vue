<<template>
  <div>
    <el-form :inline="true" :disabled='disabled' :model="harmSettleInfo" :rules="rules" ref="harmSettleInfo" label-width="180px" size="small"
      label-position="right">
      <el-form-item label="医疗费：" prop="medicalMoney">
        <el-input type="number" step="0.01" v-model="harmSettleInfo.medicalMoney" auto-complete="off" 
        ></el-input>
      </el-form-item>
      <el-form-item label="伤残津贴：" prop="harmMoney">
        <el-input type="number" step="0.01" v-model="harmSettleInfo.harmMoney" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="住院伙食补助费：" prop="feedMoney">
        <el-input type="number" step="0.01" v-model="harmSettleInfo.feedMoney" auto-complete="off" ></el-input>
      </el-form-item>
       <el-form-item label="亲属抚恤费：" prop="relationsMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.relationsMoney" auto-complete="off" ></el-input>
            </el-form-item>
         <el-form-item label="护理费：" prop="careMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.careMoney" auto-complete="off" ></el-input>
            </el-form-item>
             <el-form-item label="劳动能力鉴定费用：" prop="workLevelMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.workLevelMoney" auto-complete="off" ></el-input>
            </el-form-item>
             <el-form-item label="交通食宿费：" prop="transMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.transMoney" auto-complete="off" ></el-input>
            </el-form-item>
             <el-form-item label="一次性工亡补助金：" prop="deadMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.deadMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="辅助器具费：" prop="machineMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.machineMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="社保基金支付小计：" prop="socialMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.socialMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="单位支付小计：" prop="companyMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.companyMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="工亡待遇总计：" prop="deadSum">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.deadSum" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="工资标准：" prop="salary">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.salary" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="停工溜薪：" prop="stopSalary">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.stopSalary" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="工伤待遇总计：" prop="harmSum">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.harmSum" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="一次性伤残补助金：" prop="disabilityMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.disabilityMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="丧葬补助金：" prop="gravelMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.gravelMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="一次性伤残就业补助金：" prop="employMoney">
              <el-input type="number" step="0.01" v-model="harmSettleInfo.employMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="tips">
              <el-input type="text" v-model="harmSettleInfo.tips" auto-complete="off" style="width:477px"></el-input>
            </el-form-item>
            <el-form-item label="下一功能节点：" prop="nextFunction">
              <el-select v-model="harmSettleInfo.nextFunction" clearable placeholder="" >
                <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下一接收人：" prop="nextPerson">
              <el-select v-model="harmSettleInfo.nextPerson" clearable placeholder="" >
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
      props: ["harmSettleInfo",'allFunctionNode','nextPerson'],
      created(){
      if(this.harmSettleInfo.caseStatus===2||this.harmSettleInfo.caseStatus===4){
        this.disabled=true
      }
      if(this.harmSettleInfo.label===0){
        this.disabled=true
      }
    },
       methods:{
            submitForm(val) {
        (val=='submit')?this.loadingsubmit=true:this.loadingsave=true
        console.log(val)
        console.log(this.harmSettleInfo)
        this.$refs.harmSettleInfo.validate(valid => {
          if (valid) {
             this.harmSettleInfo.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.harmSettleInfo,'inductInjuryFeeInfo').then(response => {
              if (response.data.code === 4||response.data.code===5) {
                if(this.harmSettleInfo.nowStatus==='已结案'){
                  this.$emit('listenActiveName',this.harmSettleInfo.nextFunction)
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