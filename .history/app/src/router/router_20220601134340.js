//引入路由组件

//曾之柳
import OutpatientConsumption from "@/views/PayMentManagement/OutpatientConsumption";

//李传奇
//引入路由组件
import Login from "@/views/Login";
import User from "@/views/User";
import Register from "@/views/Login/register .vue";
import Booking from "@/views/User/Booking.vue";

//李剑雄
import doctorManagement from "@/views/HospitalInformation/DoctorManagement";
import departmentManagement from "@/views/HospitalInformation/DepartmentManagement";
import physicalExamination from "@/views/HospitalInformation/ExaminationPackage/PhysicalExamination";
import examinationProject from "@/views/HospitalInformation/ExaminationPackage/ExaminationProject";
import examinationType from "@/views/HospitalInformation/ExaminationPackage/ExaminationType";
import healthEncyclopedia from '@/views/HospitalInformation/HealthEncyclopedia/index.vue'
import hospitalNavigation from "@/views/HospitalInformation/HospitalNavigation";
import hospitalProfile from "@/views/HospitalInformation/HospitalProfile/index.vue";
import appointmentNotice from "@/views/HospitalInformation/AppointmentNotice";

//赵飞
import sys from "../views/SystemSettings/index.vue";
import Role from "../views/SystemSettings/roleAdim.vue";
import Title from "../views/SystemSettings/titleAdim.vue";
import Updatepw from "../views/SystemSettings/updatePw.vue";
import News from "../views/SystemSettings/NewsNotice.vue";

//李示红
import BookreRister from "@/views/BookManagement/BookingRegister.vue"; //预约挂号
import BookNat from "@/views/BookManagement/BookingNat.vue"; //预约核酸检测
import BookMedical from "@/views/BookManagement/BookingMedical.vue"; //预约体检
import DoctorSchedule from "@/views/BookManagement/DoctorSchedule.vue"; //医生排班
import BookRegisterInfo from "@/views/BookManagement/BookManageInfo/BookRegisterInfo.vue"; //预约挂号详情
import BookNatInfo from "@/views/BookManagement/BookManageInfo/BookNatInfo.vue"; //预约核酸检测详情
import BookMedicalInfo from "@/views/BookManagement/BookManageInfo/BookMedicalInfo.vue"; //预约核酸检测详情
export default [
    //费用管理的路由配置
    {
        //默认显示这个路由
        path: "/outpatientConsumption",
        component: OutpatientConsumption,
        meta: {
            //operat组件中显示几个控件
            options: 3,
            //operat组件中的title,也可以用来改变页面title
            title: "门诊消费订单详情",
        },
        name: "outpatientConsumption",
    },
    {
        path: "/outpatientRecharge",
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
        path: "/hospitaLization",
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
        path: "/hospitalizationRecharge",
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
        path: "/refundHistory",
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
        path: "/bMOperat/:info",
        name: "BMOperat",
        meta: "2",
        component: () => {
            return import("@/views/OperatRoute/BMOperat");
        },
        props: true,
    },
    {
        path: "/home",
        name: "home",
        component: () => {
            return import("@/views/Home");
        },
    },

    //李剑雄
    {
        path: "/doctorManagement", //医生管理
        component: doctorManagement,
        meta: { show: true },
        name: "DoctorManagement",
    },
    {
        path: "/departmentManagement", //科室管理
        component: departmentManagement,
        meta: { show: true },
        name: "departmentManagement",
    },
    {
        path: "/examinationPackage/physicalExamination", //体检套餐里的体检套餐
        component: physicalExamination,
        meta: { show: true },
        name: "PhysicalExamination",
    },
    {
        path: "/examinationPackage/examinationProject", //体检套餐里的体检项目
        component: examinationProject,
        meta: { show: true },
        name: "ExaminationProject",
    },
    {
        path: "/examinationPackage/examinationType", //体检套餐里的体检项目
        component: examinationType,
        meta: { show: true },
        name: "ExaminationType",
    },
    {
        path: "/healthEncyclopedia", //健康百科
        component:healthEncyclopedia,
        meta: { show: true },
        name: "HealthEncyclopedia"
    },
    {
        path: "/hospitalNavigation", //医院导航
        component: hospitalNavigation,
        meta: { show: true },
        name: "HospitalNavigation",
    },
    {
        path: "/hospitalProfile", //医院简介
        component: hospitalProfile,
        meta: { show: true },
        name: "HospitalProfile",
    },
    {
        path: "/appointmentNotice", //预约须知
        component: appointmentNotice,
        meta: { show: true },
        name: "AppointmentNotice",
    },

    //赵飞
    {
        path: "/index",
        component: sys,
        name: "index",
    },
    {
        path: "/role",
        component: Role,
        name: "role",
    },
    {
        path: "/title",
        component: Title,
        name: "title",
    },
    {
        path: "/updatepw",
        component: Updatepw,
        name: "updatepw",
    },
    {
        path: "/news",
        component: News,
        name: "news",
    },

    //李传奇
    {
        path: "/login",
        component: Login,
        meta: { show: true },
        name: "login",
    },
    {
        path: "/user",
        component: User,
        meta: { show: true },
        name: "user",
    },
    {
        path: "/register",
        component: Register,
        meta: { show: true },
        name: "register",
    },
    {
        path: "/booking",
        component: Booking,
        meta: { show: true },
        name: "booking",
    },

    //李示红
    {
        path: "/bookregister",
        component: BookreRister, //与import 后面的名字一样
        meta: { show: true },
        name: "bookregister",
    },
    {
        path: "/booknat",
        component: BookNat,
        meta: { show: true },
        name: "booknat",
    },
    {
        path: "/bookmedical",
        component: BookMedical,
        meta: { show: true },
        name: "bookmedical",
    },

    {
        path: "/doctorschedule",
        component: DoctorSchedule,
        meta: { show: true },
        name: "doctorschedule",
    },
    {
        path: "/bookregisterinfo",
        component: BookRegisterInfo,
        meta: { show: true },
        name: "bookregisterinfo",
    },
    {
        path: "/booknatinfo",
        component: BookNatInfo,
        meta: { show: true },
        name: "booknatinfo",
    },
    {
        path: "/bookmedicalinfo",
        component: BookMedicalInfo,
        meta: { show: true },
        name: "bookmedicalinfo",
    },
    // {
    //     path: "/newsnotice",
    //     component: NewsNotice,
    //     meta: { show: true },
    //     name: "newsnotice"
    // },
    // {
    //     path: "/addnews",
    //     component: AddNews,
    //     meta: { show: true },
    //     name: "addnews"
    // },
    // {
    //     path: "/updatenews",
    //     component: UpdateNews,
    //     meta: { show: true },
    //     name: "updatenews"
    // },

    {
        path: "/bookregister",
        component: BookreRister, //与import 后面的名字一样
        meta: { show: true },
        name: "bookregister",
    },
    {
        path: "/booknat",
        component: BookNat,
        meta: { show: true },
        name: "booknat",
    },
    {
        path: "/bookmedical",
        component: BookMedical,
        meta: { show: true },
        name: "bookmedical",
    },

    {
        path: "/doctorschedule",
        component: DoctorSchedule,
        meta: { show: true },
        name: "doctorschedule",
    },
    {
        path: "/bookregisterinfo",
        component: BookRegisterInfo,
        meta: { show: true },
        name: "bookregisterinfo",
    },
];
