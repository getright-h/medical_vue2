import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import lzh from './lzh'
import lsh from './lsh'
import zzl from './zzl'
import lcq from './lcq'
import ljx from './ljx'
import zf from './zf'



//暴露一个store实例
export default new Vuex.Store({
    //实现vuex仓库模块化开发存储数据
    modules:{
        lzh,
        lsh,
        zzl,
        lcq,
        ljx,
        zf
    }
})