import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/moke'
import Cookie from 'js-cookie'

Vue.use(ElementUI)
Vue.config.productionTip = false

//全局前置路由守卫
router.beforeEach((to, from,next) => {
  const user = Cookie.get('user')
  if (!user && to.name === 'home'){
    next({name : 'login'})
  }else if ((user && to.name === 'login')) {
    next({name : 'home'})
  }else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
