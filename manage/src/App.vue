<template>
  <div id="app">
    <el-container class="el-row" >
<!--      //侧边栏菜单-->
      <el-aside width="auto" v-show="isShow">
        <common-aside/>
      </el-aside>
      <el-container width="auto">
<!--        //头部-->
        <el-header v-show="isShow"><CommonHeader/> </el-header>
<!--        //主要内容区域-->
        <el-main>
<!--          //面包屑-->
          <el-button v-show="isShow" :ref="item.name" @click="clickMenu(item)" :path="item.path" type="primary" plain v-for="item in list" :class="['Breadcrumb','active',item.path]" >
            {{item.label}}
            <i v-if="item.label!=='首页'" @click="clear(item.path)" class="el-icon-close"></i><!--            删除按钮-->
          </el-button>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import Cookie from "js-cookie";
export default {
  name: "App",
  components: {
    CommonAside,
    CommonHeader
  },
  data(){
    return {
      isShow : true
    }
  },
  created() {
    if (Cookie.get('user') === 'admin'){
      this.$store.commit('trendsRouter',this.$router)
    }
  },
  methods:{
    clear(url){
      //获取要删除的页面在tabList中的位置
      let list =this.$store.state.tab.tabList;
      let index = list.findIndex(item => item.path === url)
      console.log(list[index].path)
      //删除按钮
      list.splice(index,1)
      //判断删除的是否是当前页面，若不是直接删除，若是当前页面，则进行跳转
      if(url === this.$route.path){
        //若当前不是最后一个，则跳转到后一个页面，否则跳转到前一个页面
        if (index!==list.length){
          this.$router.push(list[index].path)
          // console.log(list[index].path)
        }else {
          this.$router.push(list[index-1].path)
          // console.log(list[index-1].path)
        }
      }

    },
    clickMenu(item) {
      //修改高亮的按钮背景颜色
      let bre = []
      bre = document.querySelectorAll('.Breadcrumb')
      for (let i=0;i<bre.length;i++){
        bre[i].className = bre[i].className.replace('active','')
        if (bre[i].name === item.name){
          bre[i].className += 'active'
        }
      }
      //路由跳转
      // console.log(this.$route.path)
      if(item.path !== this.$route.path){
          this.$router.replace(item.path)
        //左侧菜单联动高亮显示
        this.$store.commit('setActive',item.name)
        // console.log(this.$store.state.tab.isActive)
      }
    }
  },
  computed:{
    list(){
      return this.$store.state.tab.tabList
    },
    active(){
      return this.$store.state.tab.isActive
    },
    path(){
      return this.$route.path
    }
  },
  watch:{
    path:function (newVal,oldVal){
      // console.log(newVal,oldVal)
      let btn = document.querySelectorAll('.Breadcrumb');
      btn.forEach((key)=>{
        key.className = key.className.replace('active','')
        if (key.className.indexOf(newVal)!==-1){
          key.className+= ' active';
        }
      })
      //如果没有登录，显示登录页
      if (this.path === '/login'){
        this.isShow = false
      }else
        this.isShow = true
    }
  },
  mounted() {
    //设置首页为当前活动窗口
    let bre = document.querySelectorAll('.Breadcrumb')
    bre[0].className += ' active'

    //为所有面包屑按钮添加active属性，以解决 ”添加新的按钮时无活动窗口” 的问题
    bre.forEach(key =>{
      key.className = key.className.replace('active','')
    })
    if (this.path === '/login'){
      this.isShow = false
    }else
      this.isShow = true
  }
}
</script>

<style  lang="less">
*{
  padding: 0;
  margin: 0;
}
body{
  margin: 0;
}
.el-menu{
  border: 0;
}
.el-header{
  background-color: #292930;
}
.Breadcrumb{
  padding: 5px 5px 5px 10px;
  margin-bottom: 30px;
  //background-color: aquamarine;
  i{
    margin-left: 3px;
    border: 1px solid;
  }
}
.Breadcrumb:nth-of-type(1){
  padding: 5px  10px;
}
.el-button--primary.is-plain.active{
  background-color: #409EFF;
  color: #ecf5ff;
  border-color: #b3d8ff;
}
</style>