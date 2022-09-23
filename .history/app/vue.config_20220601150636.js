module.exports = {
    lintOnSave:false,
    //代理跨域
    devServer:{
        proxy:{
            '/ssm_03_war_exploded':{
                target:'192.168.218.237:8080',         
            },
        },
    },
}