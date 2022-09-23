//引入路由组件

//引入费用管理的路由
import OutpatientConsumption from "@/views/PayMentManagement/OutpatientConsumption";


//李传奇
//引入路由组件
import Login from '@/views/Login'
import User from '@/views/User'
import Register from '@/views/Login/register .vue'
import Booking from '@/views/User/Booking.vue'

//李健雄
import DoctorManagement from '@/views/HospitalInformation/DoctorManagement'
import DepartmentManagement from '@/views/HospitalInformation/DepartmentManagement'
import PhysicalExamination from '@/views/HospitalInformation/ExaminationPackage/PhysicalExamination'
import ExaminationProject from '@/views/HospitalInformation/ExaminationPackage/ExaminationProject'
import ExaminationType from '@/views/HospitalInformation/ExaminationPackage/ExaminationType'
// import HealthEncyclopedia from '@/views/HospitalInformation/HealthEncyclopedia/index.vue'
import HospitalNavigation from '@/views/HospitalInformation/HospitalNavigation' 
import HospitalProfile from '@/views/HospitalInformation/HospitalProfile/index.vue'
import AppointmentNotice from '@/views/HospitalInformation/AppointmentNotice'


//赵飞
import sys from '../views/SystemSettings/index.vue'
import Role from '../views/SystemSettings/roleAdim.vue'
import Title from '../views/SystemSettings/titleAdim.vue'
import Updatepw from '../views/SystemSettings/updatePw.vue'
import News from '../views/SystemSettings/NewsNotice.vue'


//李示红
import BookreRister from '@/views/BookManagement/BookingRegister.vue'  //预约挂号
import BookNat from '@/views/BookManagement/BookingNat.vue'           //预约核酸检测
import BookMedical from '@/views/BookManagement/BookingMedical.vue'//预约体检
import DoctorSchedule from '@/views/BookManagement/DoctorSchedule.vue'//医生排班
import BookRegisterInfo from '@/views/BookManagement/BookManageInfo/BookRegisterInfo.vue'  //预约挂号详情
import BookNatInfo from '@/views/BookManagement/BookManageInfo/BookNatInfo.vue'   //预约核酸检测详情
import BookMedicalInfo from '@/views/BookManagement/BookManageInfo/BookMedicalInfo.vue'   //预约核酸检测详情
import NewsNotice from '@/views/BookManagement/NewsNotice.vue'  //消息公告
import AddNews from '@/views/BookManagement/BookManageInfo/AddNews.vue'   //新增消息
import UpdateNews from '@/views/BookManagement/BookManageInfo/UpdateNews.vue'  //修改消息
export default [

    //费用管理的路由配置
    {
        //默认显示这个路由
        path: "/",
        component: OutpatientConsumption,
        meta: {
            //operat组件中显示几个控件
            options: 3,
            //operat组件中的title,也可以用来改变页面title
            title: "门诊消费订单详情",
        },
        name: "OutpatientConsumption",
    },
    {
        path: "/OutpatientRecharge",
        name: "OutpatientRecharge",
        meta: {
            //operat组件中显示几个控件
            options: 2,
            //operat组件中的title,也可以用来改变页面title
            title: "门诊充值订单详情",
        },
        component: () => {
            return import("@/views/PayMentManagement/OutpatientRecharge");
        },
    },
    {
        path: "/HospitaLization",
        name: "HospitaLization",
        meta: {
            //operat组件中显示几个控件
            options: 2,
            //operat组件中的title,也可以用来改变页面title
            title: "住院消费订单详情",
        },
        component: () => {
            return import("@/views/PayMentManagement/HospitaLization");
        },
    },
    {
        path: "/HospitalizationRecharge",
        name: "HospitalizationRecharge",
        meta: {
            //operat组件中显示几个控件
            options: 2,
            //operat组件中的title,也可以用来改变页面title
            title: "住院充值订单详情",
        },
        component: () => {
            return import("@/views/PayMentManagement/HospitalizationRecharge");
        },
    },
    {
        path: "/RefundHistory",
        name: "RefundHistory",
        meta: {
            //operat组件中显示几个控件
            options: 2,
            //operat组件中的title,也可以用来改变页面title
            title: "退款记录",
        },
        component: () => {
            return import("@/views/PayMentManagement/RefundHistory");
        },
    },
    {
        path: "/BMOperat/:info",
        name: "BMOperat",
        meta: "2",
        component: () => {
            return import("@/views/OperatRoute/BMOperat");
        },
        props: true,
    },
    {
        path: "/home",
        name: "Home",
        component: () => {
            return import("@/views/Home");
        },
    },

    //李健雄
    {
        path: "/DoctorManagement",  //医生管理
        component:DoctorManagement,
        meta: { show: true },
        name: "DoctorManagement"
    },
    {
        path: "/DepartmentManagement",  //科室管理
        component:DepartmentManagement,
        meta: { show: true },
        name: "DepartmentManagement"
    },
    {
        path: "/ExaminationPackage/PhysicalExamination",    //体检套餐里的体检套餐
        component:PhysicalExamination,
        meta: { show: true },
        name: "PhysicalExamination"
    },
    {
        path: "/ExaminationPackage/ExaminationProject", //体检套餐里的体检项目
        component:ExaminationProject,
        meta: { show: true },
        name: "ExaminationProject"
    },
    {
        path: "/ExaminationPackage/ExaminationType", //体检套餐里的体检项目
        component:ExaminationType,
        meta: { show: true },
        name: "ExaminationType"
    },
    // {
    //     path: "/HealthEncyclopedia", //健康百科
    //     component:HealthEncyclopedia,
    //     meta: { show: true },
    //     name: "HealthEncyclopedia"
    // },
    {
        path: "/HospitalNavigation", //医院导航
        component:HospitalNavigation,
        meta: { show: true },
        name: "HospitalNavigation"
    },
    {
        path: "/HospitalProfile", //医院简介
        component:HospitalProfile,
        meta: { show: true },
        name: "HospitalProfile"
    },
    {
        path: "/AppointmentNotice", //预约须知
        component:AppointmentNotice,
        meta: { show: true },
        name: "AppointmentNotice"
    },

    //赵飞
    {
        path:'/index',
        component:sys,
        name:'index'
    },
    {
        path:'/role',
        component:Role,
        name:'role'
    },
    {
        path:'/title',
        component:Title,
        name:'title'
    },
    {
        path:'/updatepw',
        component:Updatepw,
        name:'updatepw'
    },
    {
        path:'/news',
        component:News,
        name:'news'
    },


    //李传奇
    {
        path: "/login",
        component:Login,
        meta: { show: true },
        name: "login"
    },
    {
        path: "/user",
        component:User,
        meta: { show: true },
        name: "user"
    },
    {
        path: "/register",
        component:Register,
        meta: { show: true },
        name: "register"
    },
    {
        path: "/booking",
        component:Booking,
        meta: { show: true },
        name: "booking"
    },
]


