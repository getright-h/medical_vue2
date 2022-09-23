import Vue from 'vue'
import App from './App.vue'

// 引入全局组件
import Nav from '@/components/Nav';
import Header from '@/components/Header';

//引入路由
import router from '@/router'
//统一接收api下所有接口方法
import * as API from '@/api'
//引入store
import store from '@/store'

//使用全局组件 第一个参数组件名字，第二个参数那个组件
Vue.component(Nav.name,Nav)
Vue.component(Header.name,Header)

//关闭vue生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    //挂载所有接口api再vue的原型上
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
