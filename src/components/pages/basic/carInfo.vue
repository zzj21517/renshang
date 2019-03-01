<template>
    <div>
 <el-form :inline="true" :disabled='disabled' :model="carInfo" :rules="rules" ref="carInfo" label-width="180px" size="small" label-position="right" >
     <el-form-item label="对方车联系方式：" prop="hisCarPhone">
              <el-input type="number" v-model="carInfo.hisCarPhone" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="对方车车牌号：" prop="hisCarNumber">
              <el-input type="text" v-model="carInfo.hisCarNumber" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="对方车商业险额度：" prop="hisCarBusinessAmount">
              <el-input type="text" v-model="carInfo.hisCarBusinessAmount" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="本车联系方式：" prop="myCarPhone">
              <el-input type="text" v-model="carInfo.myCarPhone" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="垫付类型：" prop="payType">
              <el-select v-model="carInfo.payType" clearable placeholder="" >
                <el-option label="安泰" value="安泰"></el-option>
                <el-option label="道路救援基金" value="道路救援基金"></el-option>
                <el-option label="交强险" value="交强险"></el-option>
                <el-option label="其它" value="其它"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对方车车辆所有人：" prop="hisCarPop">
              <el-input type="text" v-model="carInfo.hisCarPop" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="对方车是否有商业保险：" prop="isHisCarBusiness">
              <el-select v-model="carInfo.isHisCarBusiness" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="本车是否有车牌号：" prop="isMyCarNumber">
              <el-select v-model="carInfo.isMyCarNumber" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="本车是否有商业保险：" prop="isMyCarBusiness">
              <el-select v-model="carInfo.isMyCarBusiness" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="垫付金额：" prop="payMoney">
              <el-input type="number" step="0.01" v-model="carInfo.payMoney" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="对方车驾驶员姓名：" prop="hisCarName">
              <el-input type="text" v-model="carInfo.hisCarName" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="对方车商业保险公司：" prop="hisCarBusinessName">
              <el-input type="text" v-model="carInfo.hisCarBusinessName" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="本车车牌号：" prop="myCarNumber">
              <el-input type="text" v-model="carInfo.myCarNumber" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="本车商业保险公司：" prop="myCarComponey">
              <el-input type="text" v-model="carInfo.myCarComponey" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="对方车驾驶员与车主关系：" prop="hisCarRelationship">
              <el-input type="text" v-model="carInfo.hisCarRelationship" ></el-input>
            </el-form-item>
            <el-form-item label="对方车是否有交强险：" prop="isHisCarHasTraffic">
              <el-select v-model="carInfo.isHisCarHasTraffic" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="本车车辆所有人：" prop="myCarAll">
              <el-input type="text" v-model="carInfo.myCarAll" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="本车是否有交强险：" prop="isMyCarHasTraffic">
              <el-select v-model="carInfo.isMyCarHasTraffic" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对方车是否有车牌号：" prop="isHisCarHasNumber">
              <el-select v-model="carInfo.isHisCarHasNumber" clearable placeholder="" >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对方车交强险公司：" prop="hisCarTraficComponey">
              <el-input type="text" v-model="carInfo.hisCarTraficComponey" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="本车驾驶员姓名：" prop="myCarName">
              <el-input type="text" v-model="carInfo.myCarName" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="本车交强险公司：" prop="myCarTraficComponey">
              <el-input type="text" v-model="carInfo.myCarTraficComponey" auto-complete="off" ></el-input>
            </el-form-item>
             <el-form-item label="备注：" prop="tips">
              <el-input type="text" v-model="carInfo.tips" auto-complete="off" style="width:477px"></el-input>
            </el-form-item>
            <el-form-item label="下一功能节点：" prop="nextFunction">
              <el-select v-model="carInfo.nextFunction" clearable filterable placeholder="" >
                <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下一接收人：" prop="nextPerson">
              <el-select v-model="carInfo.nextPerson" clearable placeholder="" >
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
        props:["carInfo",'allFunctionNode','nextPerson','insuranceCompany'],
        created(){
      if(this.carInfo.caseStatus===2||this.carInfo.caseStatus===4){
        this.disabled=true
      }
      if(this.carInfo.label===0){
        this.disabled=true
      }
    },
         methods:{
           submitForm(val) {
        (val==2)?this.loadingsubmit=true:this.loadingsave=true
        console.log(val)
        console.log(this.carInfo)
        this.$refs.carInfo.validate(valid => {
          if (valid) {
             this.carInfo.caseStatus = val//将表单的案件状态改为save或者submit
            postOtherInfo(this.carInfo,'carInfo').then(response => {
              if (response.data.code === 4||response.data.code===5) {
                if(this.carInfo.nowStatus==='已结案'){
                  this.$emit('listenActiveName',this.carInfo.nextFunction)
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