import {loginByUsername,getUserInfo} from '@/api/login'
import {getToken,setToken,removeToken} from '@/utils/auth'
import { setPermissionList, getPermissionList } from '../../utils/auth';


const user={
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        caseInfo:'',
        isOk:true,
        activeName:'垫付信息',
        disabled:'',
        permissionList:getPermissionList(),
        name: '',
        roles:{},//角色
        check:'',//主管审核
        setting: {
          articlePlatform: []
        },
        collapseStatus:'',
        casePermission:'',
        checkData:[],
        activateData:[],
      },

      mutations: {
        SET_CHECKDATA:(state,checkData)=>{
          state.checkData=checkData
        },
        SET_ACTIVATEDATA:(state,activateData)=>{
          state.activateData=activateData
        },
        SET_CHECK:(state,check)=>{
          state.check=check
        },
        SET_CASEPERMISSION:(state,casePermission)=>{
          state.casePermission=casePermission
        },
        SET_COLLAPSESTATUS:(state,collapseStatus)=>{
          state.collapseStatus=collapseStatus
        },
        SET_ISOK:(state,isOk)=>{
          state.isOk=isOk
        },
        SET_ACTIVENAME:(state,activeName)=>{
          state.activeName=activeName
        },
        SET_DISABLED:(state,disabled)=>{
          state.disabled=disabled
        },
        SET_CODE: (state, code) => {
          state.code = code
        },
        SET_TOKEN: (state, token) => {
          state.token = token
        },
        SET_CASEINFO:(state,caseInfo)=>{
          state.caseInfo=caseInfo
        },
        SET_PERMISSIONLIST:(state,permissionList)=>{
          state.permissionList=permissionList
        },
        SET_INTRODUCTION: (state, introduction) => {
          state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
          state.setting = setting
        },
        SET_STATUS: (state, status) => {
          state.status = status
        },
        SET_NAME: (state, name) => {
          state.name = name
        },
        SET_AVATAR: (state, avatar) => {
          state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
          state.roles = roles
        }
      },
      actions: {

        //获取用户信息
        GetUserInfo({commit,state}){
          return new Promise((resolve,reject)=>{
            getUserInfo(state.token).then(response=>{
              if(!response.data){
                reject('error')
              }
              const data =response.data

              if(data.roleList&&data.roleList.length>0){
                commit('SET_ROLES',data.roleList)
              }else{
                reject('getInfo:roles must be a non-null array!')
              }

              commit('SET_NAME',data.name)
              commit('SET_AVATAR',data.avatar)
              commit('SET_INTRODUCTION',data.introduction)
              resolve(response)
            }).catch(error=>{
              reject(error)
            })
          })
        },

        //登出

        LogOut({commit,state}){
          commit('SET_TOKEN','')
          commit('SET_ROUTERS','')
          removeToken()
          window.sessionStorage.removeItem('router')
          // return new Promise((resolve,reject)=>{
          //   logout(state.token).then(()=>{
          //     commit('SET_TOKEN','')
          //     commit('SET_ROLES',[])
          //     removeToken()
          //     resolve()
          //   }).catch(error=>{
          //     reject(error)
          //   })
          // })
        },

        //前端登出
        FedLogOut({commit}){
          return new Promise(resolve=>{
            commit('SET_TOKEN','')
            removeToken()
            resolve()
          })
        }
    }

}

export default user