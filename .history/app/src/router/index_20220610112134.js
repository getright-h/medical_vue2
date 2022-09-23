//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";

//引入store
// import store from '../store'
//使用插件
Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push和replace方法
//第一个参数是跳转的位置 第二个参数是成功的回调 第三个参数是失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply
        //call和apply都可以调用函数，都可以篡改函数的上下文一次
        //区别:call传递参数是用逗号隔开，apply传递参数是只能是数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            (resolve) => {},
            (reject) => {}
        );
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.replace(this, location, resolve, reject);
    } else {
        originReplace.replace(
            this,
            location,
            (resolve) => {},
            (reject) => {}
        );
    }
};

let router = new VueRouter({
    //配置路由
    routes,
    linkExactActiveClass: "routeActive",
    //滚动行为，控制路由跳转后滚动条在什么位置
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});
//路由跳转之前 全局路由守卫
router.beforeEach((to, from, next) => {
    //全部放行
    if(to.path == '/'){ 
        next('/login')
    }
    if (sessionStorage.getItem('token')) {
        //如果登录了 就不能去 login
        if (to.path == '/login') {
            next('/home')
        }
        next()
    } else {
        if (to.path.indexOf('/login') == -1) {
            alert("登录信息过期，请重新登录")
            next('/login')
        } else {
            next()
        }
    }
    // next()
});
export default router;
