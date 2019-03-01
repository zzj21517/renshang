<template>
  <div class="basicInfo" style="overflow:hidden">
    <el-form :inline="true" :disabled="disabled" :model="basicForm" :rules="rules" ref="basicForm" label-width="140px"
      size="small" label-position="right">
      <el-form-item label="身份证号：" prop="identityCard">
        <el-input v-model="basicForm.identityCard" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="案件名称：" prop="caseName">
        <el-input type="text" v-model="basicForm.caseName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名：" prop="customName">
        <el-input type="text" v-model="basicForm.customName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="phone">
        <el-input type="number" v-model="basicForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户性别：" prop="sex">
        <el-select v-model="basicForm.sex" clearable placeholder="">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期：" prop="bornDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="basicForm.bornDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否有居住证：" prop="residencePermit">
        <el-select v-model="basicForm.residencePermit" clearable placeholder="">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="居住证签发日期：" prop="residenceRermitDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="basicForm.residenceRermitDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="户籍地址：" prop="hoseholdAddress">
        <el-input type="text" v-model="basicForm.hoseholdAddress" auto-complete="off" style="width:415px !important"></el-input>
      </el-form-item>
      <el-form-item label="现居地址：" prop="nowAddress">
        <el-input type="text" v-model="basicForm.nowAddress" auto-complete="off" style="width:415px !important"></el-input>
      </el-form-item>
      <el-form-item label="签约时间：" prop="signingDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="basicForm.signingDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="QQ/微信：" prop="qqOrChat">
        <el-input type="text" v-model="basicForm.qqOrChat" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="案件签约人：" prop="caseSubscriber">
        <el-select v-model="basicForm.caseSubscriber" clearable placeholder="">
          <el-option v-for="item in signedPeople" :key="item.userName" :label="item.userName" :value="item.userName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户年龄：" prop="age">
        <el-input type="number" v-model="basicForm.age" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="E-mail：" prop="email">
        <el-input type="email" v-model="basicForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="案件类型：" prop="caseType">
        <el-select v-model="basicForm.caseType" clearable placeholder="">
          <el-option label="工伤" value="工伤"></el-option>
          <el-option label="交通事故" value="交通事故"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="案件属性：" prop="caseProperty">
        <el-select v-model="basicForm.caseProperty" clearable placeholder="">
          <el-option label="垫付案件" value="垫付案件"></el-option>
          <el-option label="非垫付案件" value="非垫付案件"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户性质：" prop="customType">
        <el-input type="text" v-model="basicForm.customType" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户来源：" prop="customFrom">
        <el-input type="text" v-model="basicForm.customFrom" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否特殊案件：" prop="isspecialCase">
        <el-select v-model="basicForm.isspecialCase" clearable placeholder="">
          <el-option label="普通案件" value="普通案件"></el-option>
          <el-option label="特殊案件" value="特殊案件"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司分支：" prop="companyBranch">
        <el-select v-model="basicForm.companyBranch" clearable placeholder="">
          <el-option label="苏州" value="苏州"></el-option>
          <el-option label="常熟" value="常熟"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他信息：" prop="otherInfo1">
        <el-input type="text" v-model="basicForm.otherInfo1" auto-complete="off" style="width:415px !important"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="tips">
        <el-input type="text" v-model="basicForm.tips" auto-complete="off" style="width:415px !important"></el-input>
      </el-form-item>
      <el-form-item label="下一功能节点：" prop="nextFunction">
        <el-select filterable v-model="basicForm.nextFunction" clearable placeholder="选择或搜索">
          <el-option v-for="item in allFunctionNode" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下一接收人：" prop="nextPerson">
        <el-select v-model="basicForm.nextPerson" clearable placeholder="">
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
    postBasicInfo
  } from '@/api/login'
  import {
    checkCase
  } from '@/api/caseOperations'
  export default {
    data() {
      const checkCaseName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('案件名称不能为空'))
        } else {
          callback()
        }
      }
      const checkCustomName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('客户姓名不能为空'))
        } else {
          callback()
        }
      }
      const checkIdentityCard = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        } else {
          callback()
        }
      }
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
        ok: true,
        loadingsubmit: false,
        loadingsave: false,
        disabled: false,
        rules: {
          caseName: [{
            required: true,
            validator: checkCaseName,
            trigger: 'blur'
          }],
          customName: [{
            required: true,
            validator: checkCustomName,
            trigger: 'blur'
          }],
          identityCard: [{
            required: true,
            validator: checkIdentityCard,
            trigger: 'blur'
          }],
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
    props: ["basicForm", "allFunctionNode", 'signedPeople', 'nextPerson'],
    created() {
      if (this.basicForm.caseStatus===2||this.basicForm.caseStatus===5) {
          this.disabled = true
      }
      if(this.basicForm.label===0){
        this.disabled=true
      }
    },
    methods: {
      submitForm(val) {
        (val == 2) ? this.loadingsubmit = true: this.loadingsave = true
        this.$refs.basicForm.validate(valid => {
          if (valid) {
            console.log(this.$store.getters.active)
            this.basicForm.caseStatus = val //将表单的案件状态改为save或者submit
            console.log(this.basicForm)
            postBasicInfo(this.basicForm).then(response => {
              console.log(response.data)
              this.$store.commit('SET_ISOK', false)
              if (response.data.code === 4 || response.data.code === 5) {
                if (val === 2) {
                    this.disabled = true
                  //子传下一功能节点给父
                  this.$emit('listenActiveName', this.basicForm.nextFunction)
                }
                setTimeout(() => {
                  (val == 2) ? this.loadingsubmit = false: this.loadingsave = false
                }, 500);

                this.$message.success(response.data.msg)
                // this.$router.push('/custom/list')
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
  el-col {
    text-align: right;
  }
</style>