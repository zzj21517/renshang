<template>
  <div>
    <top-header></top-header>
    <div class="backstageInfo">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <template v-if="[1,2,3,5,6,7,8].indexOf(this.$store.getters.roles.userIndex)>=0">
          <el-tab-pane label="体验卡激活" name="second">
            <add-activate-card :activateData='activateData'></add-activate-card>
        </el-tab-pane>
        <el-tab-pane label="会员卡审核" name="first" >
            <card></card>
        </el-tab-pane>
        </template>
        <template v-if="[1,2,4,5,6,7,8].indexOf(this.$store.getters.roles.userIndex)>=0">
            <el-tab-pane label="体检卡激活" :name="this.$store.getters.roles.userIndex===4?'first':'third'">
            <add-check-card :checkData='checkData' :resultDataNumber='resultDataNumber'></add-check-card>
        </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
    getMembershipCard,
    showCheckCard,showActivateCard
  } from '@/api/caseOperations'
  import topHeader from './layout/components/Header.vue'
  import addCheckCard from './addCheckCard'
  import addActivateCard from './addActivateCard'
  import card from './card'
  export default {
    components: {
      topHeader,
      addCheckCard,
      addActivateCard,
      card,
    },
    data() {
        return {
            resultDataNumber:0,
            activeName:'first',
            disabled1:this.$store.getters.roles.userId==='13812628467'?true:false,
            disabled2:this.$store.getters.roles.userId==='13915596071'?true:false,
            tab:'体验卡激活',
            checkData:[],
            activateData:[],
        }
    },
    created(){
       
    },
    methods:{
        handleClick(tab, event) {
        console.log(tab.label);
        if(tab.label==='会员卡审核'){
            
        }else if(tab.label==='体检卡激活'){
            this.showAll1()
        }else{
            this.showAll2()
        }
      },
      showAll1() {
        this.loading = true
        showCheckCard(1).then(res => {
          console.log(res)
          this.checkData=res.data.msg
          this.resultDataNumber=res.data.sum
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }).catch(err => {
          console.log(err)
        })
      },

      //显示全部卡号
      showAll2() {
        this.loading = true
        showActivateCard().then(res => {
          console.log(res)
          this.activateData=res.data
          this.$store.commit('SET_ACTIVATEDATA',res.data)
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>
.backstageInfo{
    margin:80px 20px;
}
</style>