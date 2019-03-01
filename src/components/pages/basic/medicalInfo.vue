<template>
  <div>
    <div v-for="(item,index) in medicalInfo" :key="index">
      <medical :medical="item" :allFunctionNode="allFunctionNode" :hospital='hospital' :index="index" :nextPerson='nextPerson'
        @listenActiveName='changeActiveName'></medical>
    </div>
    <el-button @click="addMedicalInfo()">添加一次医疗信息</el-button>
  </div>
</template>

<script>
  import medical from './medical'
  export default {
    components: {
      medical
    },
    data() {
      return {
        activeName:''
      }
    },
    props: ["medicalInfo", 'allFunctionNode', 'hospital', 'nextPerson'],
    methods: {
      changeActiveName(data) {
        this.$emit('listenActiveName',data)
      },
      addMedicalInfo() {
        this.medicalInfo.push({
          submitName: "firstmedicalinfo",
          caseIndex: this.medicalInfo[0].caseIndex,
          numberMedical: '',
          firstHospital: '',
          operationContent: '',
          firstHospitalTime: '',
          operationCheck: '',
          operationCheckTips: '',
          medicalType: '',
          firstOutTime: '',
          isHospital: '',
          hospitalMoney: '',
          isOperation: '',
          hospitalDays: '',
          offices: '',
          bedFees: '',
          custodyFees: '',
          operationMetarialFees: '',
          foodFees: '',
          tips: '',
          checkFees: '',
          westFees: '',
          middleFees: '',
          bloodFees: '',
          isOver: '',
          operationFees: '',
          toDosFees: '',
          XFees: '',
          midMedicalFees: '',
          nextPerson: '',
          metarialFees: '',
          labFees: '',
          OFees: '',
          medicalFees: '',
          injectionFees: '',
          helperFees: '',
          otherFees: '',
          caseStatus: '',
        })
      },
    }
  }
</script>

<style scoped>

</style>