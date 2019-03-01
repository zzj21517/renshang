<template>
  <div>
    <el-form :inline="true" :disabled="disabled" v-if="(this.$store.getters.roles.userIndex===10||this.$store.getters.roles.userIndex===15)&&showCheck">
      <el-form-item>
        <el-button type="success" size='small' @click="checkForm(4)">通过</el-button>
        <el-button type="danger" size="small" @click="checkForm(5)">驳回</el-button>
      </el-form-item>
    </el-form>
    <el-collapse v-model="active">
      <el-collapse-item name="1">
        <template slot="title">
          填写客户基础信息<i class="el-icon-sort" style="margin-left:5px"></i>
        </template>
        <el-tabs type="border-card" v-model="caseBasic">
          <el-tab-pane label="客户基础信息" name="one">
            <basic-info :basicForm="caseInfo.basicForm" :allFunctionNode="allFunctionNode" :signedPeople='signedPeople'
              :nextPerson='nextPerson' @listenActiveName='changeActiveName'></basic-info>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          填写更多信息<i class="el-icon-sort" style="margin-left:5px"></i>
        </template>
        <el-tabs type="border-card" v-model="activeName" v-show="isOk" @tab-click="handleClick">
          <el-tab-pane label="垫付信息" name="垫付信息">
            <advances-info :advancesInfo="caseInfo.advancesInfo" :allFunctionNode="allFunctionNode" :nextPerson='nextPerson'
              @listenActiveName='changeActiveName'></advances-info>
          </el-tab-pane>
          <el-tab-pane label="工伤信息" name="工伤信息">
            <work-harm-info :workHarmInfo="caseInfo.workHarmInfo" :allFunctionNode="allFunctionNode" :nextPerson='nextPerson'
              @listenActiveName='changeActiveName'></work-harm-info>
          </el-tab-pane>
          <el-tab-pane label="工伤理算信息" name="工伤理算信息">
            <harm-settle-info :harmSettleInfo="caseInfo.harmSettleInfo" :allFunctionNode="allFunctionNode" :nextPerson='nextPerson'
              @listenActiveName='changeActiveName'></harm-settle-info>
          </el-tab-pane>
          <el-tab-pane label="事故信息" name="事故信息">
            <incident-info :incidentInfo="caseInfo.incidentInfo" :allFunctionNode="allFunctionNode" :tracfficPolice="tracfficPolice"
              :policeStation='policeStation' :nextPerson='nextPerson' @listenActiveName='changeActiveName'></incident-info>
          </el-tab-pane>
          <el-tab-pane label="车辆信息" name="车辆信息">
            <car-info :carInfo="caseInfo.carInfo" :allFunctionNode="allFunctionNode" :insuranceCompany='insuranceCompany'
              :nextPerson='nextPerson' @listenActiveName='changeActiveName'></car-info>
          </el-tab-pane>
          <el-tab-pane label="医疗信息" name="医疗信息">
            <medical-info :medicalInfo="caseInfo.medicalInfo" :allFunctionNode="allFunctionNode" :hospital='hospital'
              :nextPerson='nextPerson' @listenActiveName='changeActiveName'></medical-info>
          </el-tab-pane>
          <el-tab-pane label="鉴定信息" name="鉴定信息">
            <check-info :checkInfo="caseInfo.checkInfo" :allFunctionNode="allFunctionNode" :spiritConfirm='spiritConfirm'
              :clinicConfirm='clinicConfirm' :nextPerson='nextPerson' @listenActiveName='changeActiveName'></check-info>
          </el-tab-pane>
          <el-tab-pane label="保险调解" name="保险调解">
            <insure-mediate :insureMediate="caseInfo.insureMediate" :allFunctionNode="allFunctionNode" :nextPerson='nextPerson'
              @listenActiveName='changeActiveName'></insure-mediate>
          </el-tab-pane>
          <el-tab-pane label="医疗费诉讼" name="医疗费诉讼">
            <medical-lawSuit :medicalLawSuit="caseInfo.medicalLawSuit" :allFunctionNode="allFunctionNode" :court='court'
              :lawyer='lawyer' :judge='judge' :nextPerson='nextPerson' @listenActiveName='changeActiveName'></medical-lawSuit>
          </el-tab-pane>
          <el-tab-pane label="整体诉讼" name="整体诉讼">
            <entirety-lawsuit :entiretyLawsuit="caseInfo.entiretyLawsuit" :allFunctionNode="allFunctionNode" :court='court'
              :lawyer='lawyer' :judge='judge' :nextPerson='nextPerson' @listenActiveName='changeActiveName'></entirety-lawsuit>
          </el-tab-pane>
          <el-tab-pane label="诉后结案" name="诉后结案">
            <closure :closure="caseInfo.closure" :allFunctionNode="allFunctionNode" :nextPerson='nextPerson'
              @listenActiveName='changeActiveName'></closure>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import advancesInfo from './basic/advancesInfo'
  import workHarmInfo from './basic/workHarmInfo'
  import harmSettleInfo from './basic/harmSettleInfo'
  import incidentInfo from './basic/incidentInfo'
  import carInfo from './basic/carInfo'
  import medicalInfo from './basic/medicalInfo'
  import checkInfo from './basic/checkInfo'
  import insureMediate from './basic/insureMediate'
  import medicalLawSuit from './basic/medicalLawSuit'
  import entiretyLawsuit from './basic/entiretyLawsuit'
  import closure from './basic/closure'
  import basicInfo from './basic/basicInfo'
  import {
    getString
  } from '@/api/login'
  import {
    checkfunction
  } from '@/api/caseOperations'
  export default {
    data() {
      return {
        // 是否显示审核按钮
        showCheck:false,
        disabled: false,
        choice: true,
        //tabs选中的标签
        caseBasic: 'one',
        caseInfo: {},
        roles: {},
        active: this.$store.getters.collapseStatus, //折叠面板显示的页面
        activeName: this.$store.getters.activeName,
        loading: false,
        //后端返回的下拉框字段
        dropBoxField: [],
        //所有的功能节点
        allFunctionNode: [{
            value: '垫付信息'
          },
          {
            value: '工伤信息'
          },
          {
            value: '工伤理算信息'
          },
          {
            value: '事故信息'
          },
          {
            value: '车辆信息'
          },
          {
            value: '医疗信息'
          },
          {
            value: '鉴定信息'
          },
          {
            value: '保险调解'
          },
          {
            value: '医疗费诉讼'
          },
          {
            value: '整体诉讼'
          },
          {
            value: '诉后结案'
          },
        ],
        clinicConfirm: [],
        court: [],
        hospital: [],
        insuranceCompany: [],
        judge: [],
        lawyer: [],
        nextPerson: [],
        policeStation: [],
        signedPeople: [],
        spiritConfirm: [],
        tracfficPolice: [],
      }
    },
    methods: {
      handleClick(event) {
        console.log(event);
      },
      changeActiveName(data) {
        this.activeName = data
      },
      checkForm(num) {
        this.$route.params.tableinfo.caseStatus = num
        console.log(this.$route.params.tableinfo)
        checkfunction(this.$route.params.tableinfo).then(res => {
          console.log(res)
          if (res.data.code === 18) {
            this.$message.success(res.data.msg)
            this.disabled = true
          } else {
             this.$route.params.tableinfo.caseStatus =2
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    computed: {
      isOk() {
        return this.$store.getters.isOk
      }
    },
    created() {
      console.log('label')
      console.log(this.$route)
      // 如果存在tableinfo
      if (this.$route.params.tableinfo) {
        console.log('审核')
        this.showCheck=true
        if (this.$route.params.tableinfo.caseStatus === 4) {
          this.disabled = true
        }
        console.log(this.$route.params.tableinfo.nowNode)
        if (this.$route.params.tableinfo.nowNode === '基本信息') {
          this.active = '1'
        }
      }
      this.caseInfo = this.$store.getters.caseInfo
      for(let item in this.caseInfo){
        this.caseInfo[item].nowStatus=this.caseInfo.basicForm.nowStatus
        this.caseInfo[item].baseIndex=this.caseInfo.basicForm.caseIndex
        this.caseInfo[item].label=this.$route.query.label
      }
      console.log(this.caseInfo)
      this.roles = this.$store.getters.roles
      getString(this.roles.userId, this.caseInfo.basicForm.caseIndex).then(response => {
        console.log(response.data.nextPerson)
        console.log(this.nextPerson)
        this.clinicConfirm = response.data.clinicConfirm
        this.court = response.data.court
        this.hospital = response.data.hospital
        this.insuranceCompany = response.data.insuranceCompany
        this.judge = response.data.judge
        this.lawyer = response.data.lawyer
        this.nextPerson = response.data.nextPerson
        this.policeStation = response.data.policeStation
        this.signedPeople = response.data.signedPeople
        this.spiritConfirm = response.data.spiritConfirm
        this.tracfficPolice = response.data.tracfficPolice
        // this.caseInfo.checkInfo.caseIndex = response.data.caseIndex
        // this.caseInfo.insureMediate.caseIndex = response.data.caseIndex
        // this.caseInfo.medicalLawSuit.caseIndex = response.data.caseIndex
        // this.caseInfo.medicalInfo[0].caseIndex = response.data.caseIndex
        // this.caseInfo.basicForm.caseIndex = response.data.caseIndex
        // this.caseInfo.advancesInfo.caseIndex = response.data.caseIndex
        // this.caseInfo.workHarmInfo.caseIndex = response.data.caseIndex
        // this.caseInfo.harmSettleInfo.caseIndex = response.data.caseIndex
        // this.caseInfo.incidentInfo.caseIndex = response.data.caseIndex
        // this.caseInfo.carInfo.caseIndex = response.data.caseIndex
        // this.caseInfo.closure.caseIndex = response.data.caseIndex
        // this.caseInfo.entiretyLawsuit.caseIndex = response.data.caseIndex
      }).catch(error => {
        console.log(error)
      })
    },
    components: {
      basicInfo,
      advancesInfo,
      workHarmInfo,
      harmSettleInfo,
      incidentInfo,
      carInfo,
      medicalInfo,
      checkInfo,
      insureMediate,
      closure,
      medicalLawSuit,
      entiretyLawsuit
    }
  }
</script>

<style scoped>

</style>