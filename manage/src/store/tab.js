import PageOne from "@/views/PageOne.vue";
import pageTwo from "@/views/PageTwo.vue";
import User from "@/views/User.vue";
import {lower} from "mockjs/src/mock/random/helper";

export default {
    state:{
        isCollapse:false, //控制菜单收起与展开
        tabList:[
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            }
        ],
        Active:'',//要高亮显示的path
        routerList:[
            {
                path:'/user',
                name:'user',
                component: User
            },
            {
                path:'/page1',
                name:'pageOne',
                component: PageOne
            },
            {
                path:'/page2',
                name:'pageTwo',
                component: pageTwo
            }
        ],
        menu:[
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
        ],
        lowerMenu:[
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
        ],
        seniorMenu:[
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
        grade:'lower'
    },
    mutations:{
        //修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            if(val.name !== 'home'){
                const index = state.tabList.findIndex(item =>item.name === val.name)
                if (index===-1){
                    state.tabList.push(val)
                }
            }
            // console.log(state.tabList)
        },
        setActive(state,val){
            state.Active = val //item.path
        },
        //动态设置路由
        trendsRouter(state,Trouter){
            // Trouter
            state.routerList.forEach((keys)=>{
                Trouter.addRoute(keys)
            })
        },
        setMenu(state,grade){
            if (grade === 'senior') {
                state.menu = state.seniorMenu
            }
            else {
                state.menu = state.lowerMenu
            }
        }
    }
}