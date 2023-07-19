<template>
  <div>
    <el-form class="loginForm" :rules="rules" label-position="left"  label-width="65px" :inline="true" :model="loginForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginForm.userName" placeholder="用户名"  ></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="ID">
        <el-input v-model="loginForm.ID" placeholder="账号"  ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" placeholder="密码" type="password"> </el-input>
      </el-form-item>
      <el-form-item label="确认密码"  prop="pw">
        <el-input v-model="loginForm.pw" placeholder="确认密码" type="password"> </el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/index'
import Cookie from "js-cookie";
export default {
  name: "Login",
  data(){
    return{
      isLogin : false,
      loginForm:{
        userName:'',
        ID:'',
        password:'',
        pw:'',
      },
      //表单规则
      rules:{
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        ID: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        pw: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
  },
  methods:{
    login(){
      let user = {
        userName : this.loginForm.userName,
        password : this.loginForm.password
      }
      login(user).then((data)=>{
        if (data.data){
          Cookie.set('user',user.userName)
          this.$router.push('/home')
          if (user.userName === 'admin') {
            this.$store.commit('setMenu', 'senior')
            Cookie.set('grade','senior')
          }
          else {
            this.$store.commit('setMenu', 'lower')
            Cookie.set('grade','lower')
          }
        }else {
          this.$message({
            showClose: true,
            message: '用户名或者密码错误',
            type: 'error',
          });
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.loginForm{
  width: 460px;
  border:1px solid #a4c0d0;
  box-shadow:10px 10px  10px #d8e4ef;
  border-radius: 10px;
  padding: 1% 2%;
  box-sizing: border-box;
  text-align: center;
  margin: 5% auto;
  .el-form-item{
    width: 80%;
    margin: 10px auto;
  }
  
  .el-button{
    width: 20%;
    display: block;
    margin: 10px auto;
  }
  .el-form--inline .el-form-item__label {
    float: none;
    display: inline-block;
    width: 80px !important;
}
}

</style>