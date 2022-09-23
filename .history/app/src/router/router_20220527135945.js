//引入路由组件
import Home from '@/views/Home'
export default [
    {
        path: "/home",
        component:Home,
        meta: { show: true },
        name: "home"
    },
]
