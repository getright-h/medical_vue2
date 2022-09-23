//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

//引入store
// import store from '../store'
//使用插件
Vue.use(VueRouter)


let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push和replace方法
//第一个参数是跳转的位置 第二个参数是成功的回调 第三个参数是失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply
        //call和apply都可以调用函数，都可以篡改函数的上下文一次
        //区别:call传递参数是用逗号隔开，apply传递参数是只能是数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, resolve => { }, reject => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.replace(this, location, resolve, reject)
    } else {
        originReplace.replace(this, location, resolve => { }, reject => { })
    }
}

let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为，控制路由跳转后滚动条在什么位置
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
router.beforeEach(async (to, from, next) => {
    if (to.path == '/') {
        next('/home')
    }
    //如果仓库有token 代表登录了
    if (store.state.user.token) {
        //如果登录了 就不能去 login
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            //判断是否有用户信息
            if (store.state.user.userInfo.name) {
                next()
            } else {
                //没有用户信息就发actions 获取用户信息
                try {
                    await store.dispatch('userInfo')
                    next()
                } catch (error) {
                    // token失效了 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登录不能去交易相关  也不能去支付相关 不能去个人中心
        //如果没有登录去以上页面 跳转到登录页面 
        if(to.path.indexOf('/trade') != -1 || to.path.indexOf('/center') != -1 || to.path.indexOf('/shopcart') != -1){
            next('/login?redirect='+to.path)
        }else {
           next() 
        }
    }
})
export default router