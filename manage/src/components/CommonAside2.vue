<template>
  <div id="aside">
    <el-menu  :default-active="isActiveBtn" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <h3>后台管理系统</h3>
      <el-menu-item @click="clickMenu(item)" :class="item.name" v-for="item in noChildren" :key="item.name" :name="item.name" :index="item.name" >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title" >{{ item.label }}</span>
      </el-menu-item>
      <el-submenu  v-for="item in hasChildren" :key="item.label"  :index="item.label" >
        <template slot="title">
          <i class="el-icon-more"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.name" :name="item.name">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
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
.is-active{
  color: #E8C04C;
}
element.style{
  color: #409EFF;
}
</style>

<script>
import {nextTick} from "vue";

export default {
  data() {
    return {
      menuData:[
        {
          path:'/home',
          name:'home',
          label:'首页',
          icon:'s-home'
        },
        {
          path:'/mall',
          name:'mall',
          label:'商品管理',
          icon:'video-play'
        },
        {
          path:'/user',
          name:'user',
          label:'用户管理',
          icon:'user'
        },
        {
          label:'其他',
          icon:'location',
          children:[
            {
              path:'/page1',
              name:'page1',
              label:'页面1',
              icon:'setting'
            },
            {
              path:'/page2',
              name:'page2',
              label:'页面2',
              icon:'setting'
            }
          ]
        }
      ],
      active:this.isActiveBtn
    };
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
      this.$router.push(item.path)
      // console.log(item)
      this.$store.commit('seActive',item.name)
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
      let active = this.$store.state.tab.isActive;
      if (!active)
        return 'home'
      return active;
    },
    path(){
      return this.$route.path
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
  mounted() {
  }
}
</script>