<template>
  <div class="login-container">
    <div class="login-title">
      <h2>ASOS</h2>
      <p>安孚医疗救援--管理系统</p>
    </div>
    <div class="login-body">
      <p>USER LOGIN</p>
      <h2><span>用户</span>登录</h2>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="100px" label-position="right">
        <el-form-item label="用户名：" prop="userId">
          <el-input autofocus type="text" v-model="loginForm.userId" placeholder="请输入手机号" style="width:300px !important" @keyup.enter.native="handleLogin()" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" style="width:300px !important"
            @keyup.enter.native="handleLogin()" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:300px;margin-bottom:30px;margin-left:100px" @click="handleLogin()">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {
      loginByUsername
    } from '@/api/login'
  import {
    getToken,
    setToken
  } from '@/utils/auth'
  import {
    asyncRouterMap
  } from '@/router'
  import Layout from '@/components/pages/layout/Layout' //Layout 是架构组件，不在后台返回，在文件里单独引入
  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        let reg = /^0?(13|14|15|18|17)[0-9]{9}$/
        if (!value) {
          callback(new Error('请输入手机号'));
        } else {
          if (!reg.test(value)) {
            callback(new Error('请输入正确手机号'))
          }
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length < 6) {
            callback(new Error("密码不能少于六位"))
          }
          callback();
        }
      }
      return {
        loginForm: {
          userId: "",
          password: "",
          checked: false,
        },
        roles: {
          userName: '',
          roleName: '',
          userId: '',
          roleId: '',
          userIndex:'',
        },
        loginRules: {
          userId: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        loading: false,
      }
    },
    created() {
      if (localStorage.getItem('loginForm')) {
        this.loginForm = JSON.parse(localStorage.getItem('loginForm'))
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            loginByUsername(this.loginForm).then(res => {
              console.log(res)
              if (res.data.myCode.code === 2) {
                if (this.loginForm.checked) {
                  localStorage.setItem('loginForm', JSON.stringify(this.loginForm))
                } else {
                  localStorage.removeItem('loginForm')
                }
                this.loading = false
                this.roles.userName = res.data.user.userName
                this.roles.roleName = res.data.roleList.roleName
                this.roles.userId = res.data.user.userId
                this.roles.roleId = res.data.roleList.roleId
                this.roles.userIndex=res.data.user.userIndex
                console.log(this.roles)
                this.$store.commit('SET_ROLES', this.roles)
                this.$message.success(res.data.myCode.msg)
                this.$router.push('./system')
              } else {
                this.loading = false
                this.$message.error(res.data.myCode.msg)
              }
            }).catch(err => {
              this.loading = false
              this.$message.error('服务器错误')
            })
          } else {
            console.log('校验失败')
          }
        })
      }

    }
  }
</script>

<style scoped>
  .login-container {
    background: -webkit-linear-gradient(left, #5f82ff, #59b7ff);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #5f82ff, #59b7ff);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #5f82ff, #59b7ff);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #5f82ff, #59b7ff);
    /* 标准的语法 */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
  }

  .login-title {
    margin-top: 5%;
  }

  .login-body {
    width: 500px;
    height: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
    margin: 0 auto;
    margin-top: 2%;
    color: black;
    text-align: left;
  }
</style>