//引入路由组件
import Home from '@/views/Home'
export default [
    {
        path: "/paySuccess",
        component: () => import('@/views/PaySuccess'),
        meta: { show: true },
        name: "paySuccess"
    },
    {
        path: "/center",
        component: () => import('@/views/Center'),
        meta: { show: true },
        name: "center",
        redirect: '/center/myOrder',
        children: [
            {
                path: "/center/myOrder",
                meta: { show: true },
                name: "myOrder",
                component: () => import('@/views/Center/myOrder')
            },
            {
                path: "/center/groupOrder",
                meta: { show: true },
                name: "groupOrder",
                component: () => import('@/views/Center/groupOrder')
            }
        ]
    },
    {
        path: "/pay",
        component: () => import('@/views/Pay'),
        meta: { show: true },
        name: "pay",
        //如果路又不是从trade来 就进不了支付页
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else {
                next(false)
            }
         }
    },
    {
        path: "/trade",
        component: () => import('@/views/Trade'),
        meta: { show: true },
        name: "trade",
        //如果路由不是从购物车来 就进不去订单页面
        beforeEnter: (to, from, next) => {
           if(from.path == '/shopCart'){
               next()
           }else {
               next(false)
           }
        }
    },
    {
        path: "/addCartSuccess",
        component: () => import('@/views/AddCartSuccess'),
        meta: { show: true },
        name: "addCartSuccess"
    },
    {
        path: "/shopCart",
        component: () => import('@/views/ShopCart'),
        meta: { show: true },
        name: "shopCart"
    },
    {
        path: "/detail/:skuid",
        component: () => import('@/views/Detail'),
        meta: { show: true },
        name: "detail"
    },
    {
        path: "/home",
        component: Home,
        meta: { show: true },
        name: "home"
    },
    {
        path: "/search/:keyword?",
        component: () => import('@/views/Search'),
        meta: { show: true },
        name: "search"
    },
    {
        path: "/login",
        component: () => import('@/views/Login'),
        meta: { show: false },
        name: "login"
    },

    {
        path: "/register",
        component: () => import('@/views/Register'),
        meta: { show: false },
        name: "register"
    },
]
