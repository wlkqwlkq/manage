const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })
module.exports = {
  // dev: {
  //   // Paths
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   proxyTable: { // 配置跨域
  //   '/api':{
  //       target:`http://cjwp.cc/api/zhuce.php`, //请求后台接口
  //       changeOrigin:true, // 允许跨域
  //       pathRewrite:{
  //           '^/api' : '' // 重写请求
  //       }
  //     }
  //   },
  // }
  devServer:{
    proxy:{
      '/api':{
        target:"http://localhost:63342/untitled/request",
        chageOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}
