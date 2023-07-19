<template>
    <div>
      <header>
        <el-button type="primary" round @click="dialogVisible = true;titleFrom = '添加用户'">+新增</el-button>
<!--          用户的信息表单-->
        <el-dialog
            :title="titleFrom"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">

          <el-form ref="form" :label-position="labelPosition" :rules="rules" label-width="80px" :model="formLabelAlign">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age" >
              <el-input v-model.number="formLabelAlign.age"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio v-model="formLabelAlign.sex" label="男">男</el-radio>
              <el-radio v-model="formLabelAlign.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="formLabelAlign.address"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submit">确 定</el-button>
          </span>
        </el-dialog>
        <div>
          <input type="text" v-model="input" name="query" ref="query" placeholder="请输入关键字"><el-button type="primary" round @click="queryUser">搜索</el-button>
        </div>
      </header>


      <!--      用户信息表格-->
      <el-table
          v-show="IsSearched"
          :data="newTableData"
          stripe
          style="width: 100%">

        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="date"
            label="出生日期">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column label="操作" width="500" prop="id"   >
          <template slot-scope="scope">
            <el-button type="warning" round @click="upUser(scope.row)">编辑</el-button>
            <el-button type="danger" round @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!IsSearched" style="display: flex;margin-left: 28rem;margin-top: 5rem;">没有搜索到哦~O~</div>
<!--      //分页-->
      <div class="block">
<!--        total:总数量，pageSize：每页显示数量，current-page：当前页码-->
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            hide-on-single-page
            :current-page="currentPage"
            @current-change="currentChange"
            >
        </el-pagination>
      </div>
    </div>

</template>

<script>
import axios from "axios";
import {getUserData} from "@/api/index";
import {addUser} from "@/api/index";
import {User} from "@/api/index";

export default {
  name: "User",
  data(){
    return {
      //输入的值
      input: null,
      //是否搜索到内容
      IsSearched: true,
      //对话框是否显示
      dialogVisible:false,
      //对话框标题
      titleFrom:'添加用户',
      //当前页码
      currentPage:1,
      //每页显示数据的数量
      pageSize:6,
      //数据总数量
      total:0,
      //每页显示的数据
      newTableData:[],
      //表格数据
      tableData:[
        {
          name:'张三',
          age:18,
          sex:'男',
          date:'2013-1-2',
          address:'广东佛山'
        }
      ],
      //表单对齐方式
      labelPosition: 'left',
      //表单数据
      formLabelAlign: {
        id:'',
        name: '',
        age: '',
        sex: '男',
        date:'2001-1-1',
        address:''
      },
      //表单规则
      rules:{
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { min: 0, max: 200, message: '年龄应在0~200之间', type:'number'}
        ],
        sex: [
          { required: true, trigger: 'blur' },
        ],
        date: [
          { required: true, trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18个字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    //获取用户列表数据
   getUserData().then(data =>{
      this.tableData = data.data
      this.total = data.data.length
     //分页显示
     let end = this.pageSize;
     for (let i=this.pageSize;i>0;i--){
       if (this.tableData[end-i])
          this.newTableData.push(this.tableData[end-i])
     }
   })
  },
  methods:{
    //关闭对话框时
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.resetFields()
            this.dialogVisible = false;
            done();
          })
          .catch(_ => {});
    },

    //提交添加/修改用户表单
    submit(){
      this.$refs.form.validate((valid)=>{
        //检查表单验证是否通过
        if (valid){
          //将表单数据存入user变量
          let user = this.formLabelAlign;
          //发”添加用户“请求
          if(this.titleFrom === '添加用户'){
            addUser(user).then( data =>{
              // console.log(data)
              //添加用户成功后 更新tableData数据，从而刷新表格
              getUserData().then(data =>{
                this.tableData = data.data
                // console.log(this.tableData)
              })
            })
          }
          if (this.titleFrom === '修改用户信息'){
            // console.log('user',user)
            User.upUser(user).then(data =>{
              getUserData().then(data =>{
                this.tableData = data.data
              })
            })
          }

          //关闭弹窗
          this.dialogVisible = false
          this.formLabelAlign = {
            name: '',
            age: '',
            sex: '男',
            date:'2001-1-1',
            address:''
          }
        }
      })
    },
    //修改用户信息
    upUser(data){
      this.titleFrom = '修改用户信息'
      this.dialogVisible = true;
      this.formLabelAlign = data;
    },
    //删除用户信息
    deleteUser(id){
      this.$confirm('此操作将删除该用户, 是否继续?', '删除用户', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除用户信息
        User.deleteUser(id).then(data =>{
          getUserData().then(data =>{
            this.tableData = data.data
            this.pageData(this.currentPage)
          })
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //查找用户信息
    queryUser(){
      let Uname = this.input;
      //如果输入的字符串为空，则返回全部数据
      if (!Uname){
        return getUserData().then(data =>{
          this.tableData = data.data
        })
      }
      //查找数据
      User.queryUser(Uname).then(data =>{
        this.IsSearched = !(data.data === null);
        // console.log("查询到的数据",data.data)
        this.tableData = []
        this.tableData.push(data.data)
      })
    },
    //页码变化时调用
    currentChange(page){
      this.currentPage = page;
      //每页显示 条数据
      this.pageData(page)
    },
    //每页显示的数据
    pageData(page){
      this.newTableData = []
      let end = page * this.pageSize;
      for (let i=this.pageSize;i>0;i--){
        if (this.tableData[end - i])
          this.newTableData.push(this.tableData[end - i])
      }
    }
  }
}
</script>

<style scoped lang="less">
header{
  display: flex;
  div{
    margin-left: 30%;
    input{
      height: 36px;
      margin-right: 10px;
      border: 1px solid #c7c4c4;
    }
  }
  .el-form-item,.el-input{
    margin-left: 10px;
  }
}
</style>