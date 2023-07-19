<template>
  <div>
    <div class="login">
      <el-form class="loginForm" :rules="rules" label-position="right"  label-width="80px" :inline="true" :model="loginForm" size="medium">
        <el-form-item label="账号" prop="ID">
          <el-input v-model="loginForm.ID" placeholder="账号"  ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" type="password"> </el-input>
        </el-form-item>
          <el-button type="primary"  @click="login">登录</el-button><a href="#" @click="qiehuan()">注册</a>
      </el-form>
    </div>
    <div class="zhuce">
      <el-form class="loginForm" :rules="rules" label-position="right"  label-width="80px" :inline="true" :model="loginForm" size="medium">
        <el-form-item label="用户名" prop="userName" class="user">
          <el-input v-model="loginForm.userName" placeholder="用户名"  ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="ID">
          <el-input v-model="loginForm.ID" placeholder="账号"  ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" type="password"> </el-input>
        </el-form-item>
        <el-form-item label="确认密码"  prop="pw" class="qrpw">
          <el-input v-model="loginForm.pw" placeholder="确认密码" type="password" > </el-input>
        </el-form-item>
        <el-button type="primary"  @click="zhuce">立即注册</el-button><a href="#" @click="qiehuan()">去登录</a>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/index'
import axios from 'axios';
import Cookie from "js-cookie";
export default {
  name: "Login",
  data(){
    return{
      isLogin : false,
      flag:true,
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
  mounted() {
    // console.log(this.$route.fullPath)
    let type = this.$route.fullPath;
    type = type.split('?')[1]
    console.log(type)
    if (this.flag) {
      document.getElementsByClassName("zhuce")[0].style.display = "none";
      document.getElementsByClassName("login")[0].style.display = "display";
    }else{
      document.getElementsByClassName("login")[0].style.display = "none";
      document.getElementsByClassName("zhuce")[0].style.display = "display";
    }
  },
  methods:{
    login(){
      let user = {
        id : this.loginForm.ID,
        pw: this.loginForm.password
      }
      if(user.id.length<1 || user.pw.length<1){
        return this.$message({
          showClose:true,
          message:'请填写完整信息',
          type:'error'
        })
      }
      axios({
        method:'post',
        url:'http://localhost:63342/untitled/request/login.php?_ijt=74864eolkllfgjo79iihfp359q',
        data:user
      }).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          Cookie.set('user',user.userName);
          this.$router.push("/home")
          if(res.data.lv == 1){
            Cookie.set('grade','senior')
          }else{
            Cookie.set('grade','')
          }
          this.$router.push('/home')
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    zhuce(){
      if (this.loginForm.pw != this.loginForm.password) {
        return this.$message({
          showClose:true,
          message:'两次密码不相同',
          type:'error'
        })
      }
      let user = {
        uname:this.loginForm.userName,
        id : this.loginForm.ID,
        pw: this.loginForm.password
      }
      axios({
        method:'post',
        url:'http://localhost:63342/untitled/request/zhuce.php?_ijt=qpgl8i2mcdqnn4uvkh37sftkhg',
        data:user
      }).then((res)=>{
        if(res.data.code == 200){
          //直接登录
        }
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    qiehuan(){
      console.log(this.flag)
      this.flag = !this.flag;
      let zhuce = document.getElementsByClassName("zhuce");
      let login = document.getElementsByClassName("login");
      if(!this.flag){
        for(let i=0;i<zhuce.length;i++){
          zhuce[i].style.display = "block";
        }
        for(let i=0;i<login.length;i++){
          login[i].style.display = "none";
        }
      }else{
        for(let i=0;i<zhuce.length;i++){
          zhuce[i].style.display = "none";
        }
        for(let i=0;i<login.length;i++){
          login[i].style.display = "block";
        }
      }
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
    margin: 10px auto !;
  }
  
  
  .login{
    width: 20%;
    display: block;
    margin: 10px auto;
  }
  .zhuce{
    width: 30%;
    display: none;
    margin: 10px auto;
  }
  a{
    width: 60PX;
    display: inline-block;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 0.7em;
  }
}

</style>