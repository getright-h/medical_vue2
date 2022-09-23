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
    state: {
        registerifo: {},//单条挂号详情
        natifo:{},//单条核酸信息
        medicalifo:{},//单条体检信息
        noticeifo:{},//要修改的公告信息
    },
    mutations: {
        getregisterifo(state,a){
            state.registerifo=a
            console.log('a',a);
        },
        getnatifo(state,b){
            state.natifo=b
            console.log('b',b);
        },
        getmedicalifo(state,c){
            state.medicalifo=c
            console.log('c',c);
        },
        getnoticeifo(state,d){
            state.noticeifo=d
            console.log('d',d);
        }
    },
    
    modules:{
        lzh,
        lsh,
        zzl,
        lcq,
        ljx,
        zf
    }
})