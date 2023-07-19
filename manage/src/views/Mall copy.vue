<template>
  <div>
    <header>
      <el-button type="primary" round @click="dialogVisible = true;titleFrom = '添加商品'">+新增</el-button>
      <!--          商品的信息表单--><!--          商品的信息表单-->
      <el-dialog
          :title="titleFrom"
          :visible.sync="dialogVisible"
          width="40%"
          :before-close="handleClose">

        <el-form ref="form"  :rules="rules" label-width="80px" :model="formLabelAlign">
          <el-form-item label="商品名" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price" >
            <el-input v-model.number="formLabelAlign.price"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="genre">
            <el-radio v-model="formLabelAlign.genre" label="女装">女装</el-radio>
            <el-radio v-model="formLabelAlign.genre" label="男装">男装</el-radio>
            <el-radio v-model="formLabelAlign.genre" label="鞋包">鞋包</el-radio>
            <el-radio v-model="formLabelAlign.genre" label="食品">食品</el-radio>
            <el-radio v-model="formLabelAlign.genre" label="生活用品">生活用品</el-radio>
            <el-radio v-model="formLabelAlign.genre" label="电子产品">电子产品</el-radio>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model.number="formLabelAlign.stock"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submit">确 定</el-button>
          </span>
      </el-dialog>
      <div>
        <input type="text" v-model="input" name="query" ref="query" placeholder="请输入关键字"><el-button type="primary" round @click="queryMall">搜索</el-button>
      </div>
    </header>


    <!--     商品信息表格-->
    <el-table
        v-show="IsSearched"
        :data="newTableData"
        stripe
        style="width: 100%">

      <el-table-column
          prop="name"
          label="商品名">
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格">
      </el-table-column>
      <el-table-column
          prop="genre"
          label="类别">
      </el-table-column>
      <el-table-column
          prop="stock"
          label="库存">
      </el-table-column>
      <el-table-column
          prop="sales"
          label="销量">
      </el-table-column>
      <el-table-column label="操作" width="500" prop="id"   >
        <template slot-scope="scope">
          <el-button type="warning" round @click="upMall(scope.row)">编辑</el-button>
          <el-button type="danger" round @click="deleteMall(scope.row.id)">删除</el-button>
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
import { Mall } from "@/api/index";

export default {
  name: "Mall",
  data(){
    return {
      //输入的值
      input: null,
      //是否搜索到内容
      IsSearched: true,
      //对话框是否显示
      dialogVisible:false,
      //对话框标题
      titleFrom:'添加商品',
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
          name:'',//商品名字
          price:0,//价格
          genre:'',//类别
          stock:0,//库存
          sales:0//销量
        }
      ],
      //表单对齐方式
      labelPosition: 'left',
      //表单数据
      formLabelAlign: {
        id:'',//商品编号
        name:'',//商品名字
        price:0,//价格
        genre:'',//类别
        stock:0,//库存
        sales:0//销量
      },
      //表单规则
      rules:{
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 15个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { min: 0, max: 9999999, message: '价格应在0~9999999之间', type:'number'}
        ],
        genre: [
          { required: true,message:'请选择类别'},
        ],
        stock: [
          { required: true, message: '请输入库存量', trigger: 'blur' },
          { min: 0, max: 9999, message: '库存量应在0~9999之间', type:'number'}
        ]
      }
    }
  },
  created() {
    //获取商品列表数据
    Mall.getMallData().then(data =>{
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
            done();
          })
          .catch(_ => {});
    },

    //提交添加/修改商品表单
    submit(){
      this.$refs.form.validate((valid)=>{
        //检查表单验证是否通过
        if (valid){
          //将表单数据存入mall变量
          let mall = this.formLabelAlign;
          //发”添加商品“请求
          if(this.titleFrom === '添加商品'){
            Mall.addMall(mall).then( data =>{
              // console.log(data)
              //添加商品成功后 更新tableData数据，从而刷新表格
              Mall.getMallData().then(data =>{
                this.tableData = data.data
                this.total = data.data.length
                //分页显示
                let end = this.currentPage*this.pageSize;
                this.newTableData = []
                for (let i=this.pageSize;i>0;i--){
                  if (this.tableData[end-i])
                    this.newTableData.push(this.tableData[end-i])
                }
              })
            })
          }
          if (this.titleFrom === '修改商品信息'){
            Mall.upMall(Mall).then(data =>{
              Mall.getMallData().then(data =>{
                this.tableData = data.data
              })
            })
          }

          //关闭弹窗
          this.dialogVisible = false
          this.formLabelAlign = {
            id:'',//商品编号
            name:'',//商品名字
            price:0,//价格
            genre:'',//类别
            stock:0,//库存
            sales:0//销量
          }
        }
      })
    },
    //修改商品信息
    upMall(data){
      console.log(data)
      this.titleFrom = '修改商品信息'
      this.dialogVisible = true;
      this.formLabelAlign = data;
    },
    //删除商品信息
    deleteMall(id){
      this.$confirm('此操作将删除该商品, 是否继续?', '删除商品', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除商品信息
        Mall.deleteMall(id).then(data =>{
          Mall.getMallData().then(data =>{
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
    //查找商品信息
    queryMall(){
      let name = this.input;
      //如果输入的字符串为空，则返回全部数据
      if (!name){
        this.IsSearched = true;
        return Mall.getMallData().then(data =>{
          this.tableData = data.data
          this.total = data.data.length
          //分页显示
          let end = this.pageSize;
          this.newTableData = []
          for (let i=this.pageSize;i>0;i--){
            if (this.tableData[end-i])
              this.newTableData.push(this.tableData[end-i])
          }
        })
      }
      //查找数据
      Mall.queryMall(name).then(data =>{
        this.IsSearched = !(data.data===null);
        console.log("查询到的数据",data.data)
        let list = data.data;
        this.total = list.length
        let end = this.pageSize;
        this.newTableData = []
        for (let i=this.pageSize;i>0;i--){
          if (list[end-i])
            this.newTableData.push(list[end-i])
        }
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