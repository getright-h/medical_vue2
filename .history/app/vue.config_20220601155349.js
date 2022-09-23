 const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    lintOnSave: false,
      //代理跨域
      devServer:{
          proxy:{
              '/ssm_03_war_exploded':{
                  target:'http://192.168.218.237:8080',
              },
          },
      },
});


// module.exports = {
//     lintOnSave: false, // eslint-loader 是否在保存的时候检查
// };
