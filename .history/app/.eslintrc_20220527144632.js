module.exports={
    root:true,
    parserOptions:{
        sourceType:'module'
    },
    plugins:[
        'html'
    ],
    'rules':{
        "no-unused-vars":"off",
        'no-debugger':process.env.NODE_ENV ==='production' ? 2 :0
    }
}