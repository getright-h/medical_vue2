import Vue from "vue";
import App from "./App.vue";
//引入iconfont
import icon from "../src/assets/icon/iconfont.css";
//引入echarts
import * as echarts from "echarts";

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
import "@/assets/css/common.css";

//引入插件
//zzl插件
import plugins from "@/plugin/zzl/index";

//引入混入
//zzl混入
import { mixin } from "@/mixin/zzl/index";

//使用插件
Vue.use(plugins);

//使用混入
Vue.mixin(mixin);

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
//全局挂载富文本
// Vue.component(VueEditor.name, VueEditor);

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
        //挂在echarts
        Vue.prototype.$echarts = echarts;
    },
    router,
    store,
}).$mount("#app");
