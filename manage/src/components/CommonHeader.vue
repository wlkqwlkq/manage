<template>
  <div>
    <div class="left" >
      <el-button plain @click="upIsCollapse"><i class=" el-icon-menu"></i></el-button>
      <span class="title" ><el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tags"  ><span class="textWhite" @click="clickMenu(item)">{{item.label}}</span></el-breadcrumb-item>
          </el-breadcrumb></span>
    </div>
    <div class="right">
      <el-dropdown @command="headerClike">
        <el-button circle class="pic"><img class="picture" src="../assets/images.jpg"></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Cookie from "js-cookie";
export default {
  data(){
    return {
    }
  },
  name: "CommonHeader",
  methods:{
    upIsCollapse(){
      this.$store.commit('collapseMenu')
    },
    clickMenu(item){
      if(item.path === this.$route.path)
        return 0;
      this.$router.push(item.path)
      this.$store.commit('setActive',item.name)
    },
    headerClike(com){
      if (com === 'logout'){
        Cookie.remove('user')
        this.$router.push('login')
      }
    }
  },
  computed:{
    ...mapState({
        tags : state=>state.tab.tabList
    }),
    // tags:function (){
    //   return this.$store.state.tab.state
    // }
  },
  mounted() {
    // console.log("mounted",this.tags)
  }
}
</script>

<style scoped lang="less">

.left{
  float: left;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}
.right{
  float: right;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  margin-left: 20px;
  color: white;

}
.textWhite{
  color: white;
  cursor: pointer;
}
.pic{
  padding: 3px;
}
.picture{
  width:40px;
  height:40px;
  border-radius: 50%;
}
</style>