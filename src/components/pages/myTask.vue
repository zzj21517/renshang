<template>
  <div>
    <el-table :data="taskData" v-loading="loading" border fit highlight-current-row>
      <el-table-column label="案件编号"  align="center">
        <template slot-scope="scope">
          {{ scope.row.baseId }}
        </template>
      </el-table-column>
      <el-table-column label="案件名称" align="center" >
        <template slot-scope="scope">
          {{ scope.row.caseName }}
        </template>
      </el-table-column>
      <el-table-column  label="客户姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.customName }}
        </template>
      </el-table-column>

      <el-table-column  label="下一节点" align="center">
        <template slot-scope="scope">
          {{ scope.row.nextNode }}
        </template>
      </el-table-column>
      <el-table-column  label="当前节点" align="center">
        <template slot-scope="scope">
          {{ scope.row.nowNode }}
        </template>
      </el-table-column>
      <el-table-column  label="当前接收人" align="center">
        <template slot-scope="scope">
          {{ scope.row.nowPerson }}
        </template>
      </el-table-column>
      <el-table-column  label="签约人" align="center">
        <template slot-scope="scope">
          {{ scope.row.signPerson }}
        </template>
      </el-table-column>
      <el-table-column  label="案件序列" v-if="show" align="center">
        <template slot-scope="scope">
          {{ scope.row.caseIndex }}
        </template>
      </el-table-column>
      <el-table-column  label="添加时间" align="center" >
        <template slot-scope="scope">
          {{ scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleNext(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {checktask,continueCase} from '@/api/caseOperations'
  export default {
    created(){
      this.showTask()
    },
    methods: {
      showTask() {
        this.loading = true
        checktask(this.$store.getters.roles.userIndex).then(res=>{
          console.log(res)
          setTimeout(() => {
            this.loading = false;
          }, 500);
          if(res.data.success){
            this.taskData=res.data.caseList
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      //继续操作
      handleNext(index,row) {
        continueCase(row.baseIndex).then(res=>{
          console.log(res)
          // if(row.nowNode==='客户基础信息'){
          //   this.$store.commit('SET_ACTIVENAME','垫付信息')
          // }else{
          //    this.$store.commit('SET_ACTIVENAME',row.caseFlowNodeName)
          // }
          //进入的是详细信息界面
          this.$store.commit('SET_COLLAPSESTATUS',['2'])
          //是否显示详细信息
          this.$store.commit('SET_ISOK', true)
          //拉取该行信息
          this.$store.commit('SET_CASEINFO',res.data)
          //设置保存提交是否显示
          this.$store.commit('SET_CASEPERMISSION',res.data.casePermission)
            this.$router.push({name:'Basic',params:{tableinfo:row}})
            console.log(this.$store.getters.caseInfo)
        }).catch(err=>{
          console.log(err)
        })
      },
    },
    data() {
      return {
        taskData: [],
        show: false,
        loading: false,
      }
    },
  }
</script>

<style scoped>

</style>