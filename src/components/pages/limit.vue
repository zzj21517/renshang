<template>
  <div class="limit">
    <div class='role'>
      <el-radio-group v-model="roleChecked" @change="handleRadioChange" v-for="(item,index) in roleList" :key="index" style="margin-bottom:20px;margin-left:20px">
      <el-radio border size="medium" :label="item.roleId">{{item.roleName}}</el-radio>
  </el-radio-group>
    </div>
  <div class='permission'>
     <el-tree :data="data" show-checkbox node-key="permissionId" default-expand-all  :default-checked-keys="permissionChecked" ref="tree"  :props="defaultProps"
      @check-change="handleCheckChange">
    </el-tree>
     <el-button type="primary" :loading="loadingsubmit" class="limit-btn" @click="submitForm()">修改</el-button>
    </div>
  </div>
</template>

<script>
  import {
    setPermission,getLimit,watchPermission
  } from '@/api/event.js'
  export default {
    methods: {
      submitForm() {
        this.loadingsubmit = true
        this.permission.roleList = this.roleChecked,
          this.permission.permissionList = this.permissionList,
          console.log(this.permission)
          setPermission(this.permission).then(res => {
            if(res.data.code===5){
              console.log(res)
              this.$message.success(res.data.msg)
            }else{
              this.$message.error(res.data.msg)
            }
            setTimeout(() => {
                  this.loadingsubmit = false
                }, 500);
          }).catch(err => {
            console.log(err)
            setTimeout(() => {
                  this.loadingsubmit = false
                }, 500);
          })
      },
      handleRadioChange(data){
        watchPermission(data).then(res=>{
          console.log(res)
           this.$refs.tree.setCheckedKeys(res.data.permissionChecked);
          console.log(this.permissionChecked)
        }).catch(err=>{
          console.log(err)
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(checked)
        if (checked) {
          if (this.permissionList.indexOf(data.permissionId) === -1) {
            this.permissionList.push(data.permissionId)
          }
        } else {
          this.permissionList.forEach((item, index) => {
            if (item === data.permissionId) {
              this.permissionList.splice(index, 1)
            }
          })
        }
        // console.log(this.permissionList)
      },
    },
    created(){
      getLimit().then(res=>{
        console.log(res)
        this.roleList=res.data.roleList
        this.data=res.data.permissionList
        this.roleChecked=res.data.roleChecked
        this.permissionChecked=res.data.permissionChecked
      }).catch(err=>{
        console.log(err)
      })
    },
    data() {
      return {
        loadingsubmit: false,
        roleChecked:'',
        permissionChecked:[],
        permissionList:[],
        permission: {
          roleList: '',
          permissionList: [],
        },
              roleList:[
                // {roleId:1,roleName:'超级管理员'},
                // {roleId:2,roleName:'Java工程师'},
                // {roleId:3,roleName:'前端工程师'}
              ],
             data: [
            //    {
            //   id: 1,
            //   label: '客户管理',
            //   children: [{
            //     id: 6,
            //     label: '案件列表',
            //   }, {
            //     id: 7,
            //     label: '案件查询'
            //   }, {
            //     id: 8,
            //     label: '案件录入'
            //   }, {
            //     id: 9,
            //     label: '日历'
            //   }, {
            //     id: 5,
            //     label: '我的任务'
            //   }, {
            //     id: 11,
            //     label: '权限管理'
            //   }]
            // }, {
            //   id: 2,
            //   label: 'OA系统',
            // }, {
            //   id: 3,
            //   label: '律所系统',
            // }
            ],
            defaultProps: {
              id:'permissionId',
              children: 'children',
              label: 'title'
            }
          }
        }
      }
</script>

<style scoped>
.limit{
  margin-left: 20px;
  margin-top: 20px;
  /* border: 1px solid #e1e1e1; */
  padding: 10px;
}
.limit-btn{
  margin-top: 10px;
  margin-left: 300px;
}
.permission{
  border:1px solid #e1e1e1;
  padding: 10px;
}
</style>