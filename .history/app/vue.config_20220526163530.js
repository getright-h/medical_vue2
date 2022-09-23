const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
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
