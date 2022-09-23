import Vue from "vue";
import App from "./App.vue";
//引入iconfont
import icon from '../src/assets/icon/iconfont.css'
// 引入全局组件
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
// 引入全局组件 zzl
import RecordingSlot from "@/components/SlotsPayMentManagement/RecordingSlot";
import DatePicker from "@/components/TinyPayMentManagement/DatePicker.vue";
import CasCader from "@/components/TinyPayMentManagement/CasCader.vue";
import InPut from "@/components/TinyPayMentManagement/InPut.vue";
import ButtoN from "@/components/TinyPayMentManagement/ButtoN.vue";
import Title from "@/components/TinyPayMentManagement/Title.vue";

// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入路由
import router from "@/router";
//统一接收api下所有接口方法
import * as API from "@/api";
//引入store
import store from "@/store";
//css
import "@/assets/css/PayMentManagement.css";

//使用全局组件 第一个参数组件名字，第二个参数那个组件
Vue.component(Nav.name, Nav);
Vue.component(Header.name, Header);
Vue.component(Pagination.name, Pagination);
//使用全局组件 zzl
Vue.component(RecordingSlot.name, RecordingSlot);
Vue.component(DatePicker.name, DatePicker);
Vue.component(CasCader.name, CasCader);
Vue.component(InPut.name, InPut);
Vue.component(ButtoN.name, ButtoN);
Vue.component(Title.name, Title);

// element-ui按需引入 注册全局组件
Vue.use(ElementUI);
//关闭vue生产提示
Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    //全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        //挂载所有接口api再vue的原型上
        Vue.prototype.$API = API;
    },
    router,
    store,
}).$mount("#app");
