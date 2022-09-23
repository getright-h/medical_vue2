const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  //   //代理跨域
  //   devServer:{
  //       proxy:{
  //           '/api':{
  //               target:'http://gmall-h5-api.atguigu.cn',         
  //           },
  //       },
  //   },
})


// module.exports = {
//   lintOnSave: false,
//   //代理跨域
//   devServer: {
//     proxy: {
//       '/api': {
//         target: '',
//         pathRewrite: {
//           '^/api': ''
//         }   //路径重写       
//       },
//     },
//   },
// }
