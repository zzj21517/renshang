<template>
  <div class="header">
    <div class="left">
      <router-link to="/system">
        <img class="logoImg" :src="logoImg" width="40px" />
      </router-link>
      <h3 v-if="device!=='mobile'">安孚客户系统</h3>
    </div>
    <div class="middle" v-if="device!=='mobile'">
      <el-input v-model="input" placeholder="搜索你想知道的..." style="width:200px !important"></el-input>
    </div>
    <div class="right">
      <template v-if="device!=='mobile'">
      <h3>安孚医疗救援苏州总公司</h3>
      <div class="personInfo">
        <div class="top">{{this.$store.getters.roles.userName}}</div>
        <div class="button">{{this.$store.getters.roles.roleName}}</div>
      </div>
      </template>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-setting" style="font-size:25px;color:#fff;height: 60px;
      line-height: 60px;cursor: pointer;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item><span style="display:block;" @click="logout">退出登录</span></el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        logoImg: require("@/assets/login/logo_03.png"),
        input: '',
      }
    },
    computed: {
    ...mapGetters([
      'device'
    ])
  },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>

<style scoped>
  .header {
    position: fixed;
    top:0px;
    left:0px;
    right: 0px;
    z-index: 1000;
    width: 100%;
    height: 60px;
    color: white;
    background-color: #409EFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    overflow: hidden;
  }

  .left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .left img {
    margin-right: 20px;
  }

  .right {
    display: flex;
    margin-right: 30px;
  }

  .right .personInfo {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    margin-left: 30px;
    width: 100px;
    text-align: center;
    font-size: 14px;
    font-weight:bold;
  }

  .right .personInfo .top {
    height: 32px;
    line-height: 32px;
    border-bottom: 2px solid #fff;
  }

  .right .personInfo .button {
    height: 26px;
    line-height: 26px;
  }
</style>