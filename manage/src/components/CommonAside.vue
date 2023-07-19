<template>
  <div id="aside">
    <el-menu  :default-active="isActiveBtn" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <h3>后台管理系统</h3>
      <el-menu-item @click="clickMenu(item)" :class="item.path"  v-for="item in noChildren" :key="item.name" :name="item.path" :index="item.name" >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title" >{{ item.label }}</span>
      </el-menu-item>
      <el-submenu  v-for="item in hasChildren" :key="item.label"  :index="item.label" >
        <template slot="title">
          <i class="el-icon-more"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.name" :name="subItem.path">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.name" :class="subItem.path">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
    </el-menu>
  </div>
</template>


<style scoped>

.el-menu{
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /*min-height: 400px;*/
}
h3{
  text-align: center;
  margin: 10px auto;
  color: white;
}

/*使用了 !important  来修改活跃的菜单选项的样式*/

.is-active{
  color: #E8C04C !important;
}
</style>

<script>
import {nextTick} from "vue";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      active:this.isActiveBtn
    };
  },
  created() {
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //点击菜单
    clickMenu(item){
      //点击的菜单与当前页面不同时 页面跳转
      if (item.path!==this.$route.path)
      console.log("item.path"+item.path+"route.path:"+this.$route.path)
      this.$router.push(item.path)
      // console.log(item)
      this.$store.commit('setActive',item.path)
      this.$store.commit('selectMenu',item)
      // console.log(this.$store.state.tab.isActive)
    }
  },
  computed:{
    //没有子菜单
    noChildren(){
      return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren(){
      return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    isActiveBtn(){
      let active = this.$route.path;
      if (!active)
        return '/home'
      return active;
    },
    menuData(){
     return this.$store.state.tab.menu
    }
  },
  watch:{
    isActiveBtn:function (newVal,oldVal){
      // console.log('新的值：',newVal,'原先的值：',oldVal)
      if (newVal !== oldVal){
        let li = document.querySelectorAll('.el-menu-item')
        for (let i=0;i<li.length;i++){
          // console.log("查找className中 isActiveBtn所在的位置",li[i].className.indexOf(newVal))
          li[i].className = li[i].className.replace('is-active','')
          if(li[i].className.indexOf(newVal) !== -1){
            li[i].className+= ' is-active'
            // console.log("当前li的class",li[i].className)
          }
        }
      }
    }
  },
}
</script>