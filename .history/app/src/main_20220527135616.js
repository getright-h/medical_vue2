import Vue from 'vue'
import App from './App.vue'

// 引入全局组件
import Nav from '@/components/Nav';
//引入路由
import router from '@/router'
//引入store
import store from '@/store'

//使用全局组件 第一个参数组件名字，第二个参数那个组件
Vue.component(Nav.name,Nav)
//关闭vue生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
