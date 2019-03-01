<template>
  <div>
    <div class="showTask">
      <vue-event-calendar :title="title" :events="demoEvents">
        <template slot-scope="props">
          <div v-for="(event, index) in props.showEvents" :key="index" class="event-item" @click="handleNext(event)">
            <div class="top">
              <div class="title">{{index+1}}. {{event.caseFlowNodeName}}</div>
              <div class="dateTime">{{event.date}}</div>
              <div class="status">
                <el-tag v-if="event.status==='未完成'" type="success">{{event.status}}</el-tag>
                <el-tag v-else-if="event.status==='审核中'" type="Info">{{event.status}}</el-tag>
                <el-tag v-else type="danger">{{event.status}}</el-tag>
              </div>
            </div>
            <div class="button">{{event.desc}}</div>
          </div>
        </template>
      </vue-event-calendar>
    </div>
  </div>
</template>

<script>
  import {
    calendarTask
  } from '@/api/event'
  import {
    continueCase
  } from '@/api/caseOperations'
  let today = new Date()
  export default {
    name: 'app',
    data() {
      return {
        title: '我的任务列表',
        demoEvents: []
      }
    },
    created() {
      this.addTask()
    },
    methods: {
      //添加任务事件
      addTask() {
        calendarTask().then(res => {
          console.log(res)
          if(res.data.success){
            res.data.caseList.forEach(item => {
              this.demoEvents.push(item)
            })
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //继续操作
      handleNext(event) {
        continueCase(event.caseIndex).then(res => {
          console.log(res)
          this.$store.commit('SET_ACTIVENAME', event.caseFlowNodeName)
          this.$store.commit('SET_COLLAPSESTATUS', ['2'])
          this.$store.commit('SET_ISOK', true)
          this.$store.commit('SET_CASEINFO', res.data)
          this.$store.commit('SET_CASEPERMISSION',res.data.casePermission)
          this.$router.push('/custom/basic')
          console.log(this.$store.getters.caseInfo)
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>
<style scoped>


  .event-item {
    cursor: pointer;
  }

  .event-item:hover {
    background-color: #f2f2f2;
  }

  .event-item .top {
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
  }

  .event-item .top .title {
    color: #323232;
    font-size: 16px;
  }

  .event-item .top .dateTime {
    color: #9b9b9b;
    font-size: 14px;
  }

  .event-item .button {
    height: 30px;
    line-height: 30px;
    color: #9b9b9b;
    font-size: 14px;
  }
</style>