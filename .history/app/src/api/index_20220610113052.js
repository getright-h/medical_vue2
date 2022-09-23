//引入axios
import requests from "./request";
//qs
//用于axios发请求数据格式转换成 application/x-www-form-urlencoded
import qs from "qs";

//示例
// /api/product/getBaseCategoryList  get 无参数
// export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//曾之柳
//requests
//1.消费记录渲染接口
export const initRender = (url) =>
    requests({ url, method: "get" }).catch((err) => {
        console.log("@", err);
    });
//2.门诊消费记录操作接口
export const operatRender = (url, data) =>
    requests({
        url,
        method: "post",
        data,
        // data,
    }).catch((err) => {
        console.log(err);
    });

//3.备注提交接口
export const updateRemark = (url, data) =>
    requests({
        url,
        method: "post",
        data,
    }).catch((err) => {
        console.log(err);
    });
//4.搜索接口
export const subSelect = (url, data) =>
    requests({ url, method: "post", data }).catch((err) => {
        console.log(err);
    });

//李志华接口
//医院导航
//医院导航查询接口  /ssm_03_war_exploded/doc/QueryNavigat  post
export const reqGetHospitalNav = () => requests({ url: "/doc/QueryNavigat", method: "post" });

//根据院区名字查询接口
// /doc/QueryNavigation
export const reqSelectHospitalNav = (data) =>
    requests({ url: `/doc/QueryNavigation/`, method: "post", data });
//医院导航添加新院区
// /doc/addNavigation
export const reqAddHospitalNav = (data) =>
    requests({ url: `/doc/addNavigation`, method: "post", data });
//医院导航修改前接口
// /doc/PreEditNavigation
export const reqBeforeUpdateHospitalNav = (data) =>
    requests({ url: `/doc/PreEditNavigation`, method: "post", data });

//医院导航修改院区信息接口
// /doc/EditNavigationVo
export const reqUpdateHospitalNav = (data) =>
    requests({ url: `/doc/EditNavigationVo`, method: "put", data });

//医院导航删除院区接口
// /doc/DelNavigation
export const reqDeleteHospitalNav = (data) =>
    requests({ url: `/doc/DelNavigation`, method: "delete", data });
//首页查询预约人数接口
// /homepage/queryNum
export const reqGetBookNumber = () => requests({ url: `/homepage/queryNum`, method: "get" });

//首页查询门诊消费
// /homepage/queryNumex
export const reqPayTotal = () => requests({ url: `/homepage/queryNumex`, method: "get" });
//首页查询门诊充值消费总额
// /homepage/queryNumre
export const reqTopUpTotal = () => requests({ url: `/homepage/queryNumre`, method: "get" });
//近七日预约数据查询接口
// homepage/queryNumlist
export const reqSevenDayBookRec = () => requests({ url: `/homepage/queryNumlist`, method: "get" });

//门诊近7日门诊充值详情
// /homepage/queryNumrelist
export const reqSevenDayTopUpRec = () => requests({ url: `/homepage/queryNumrelist`, method: "get" });
//首页实时预约接口
 //homepage/queryHomeSub
export const reqNowBook = () => requests({ url: `/homepage/queryHomeSub`, method: "get" });


//李示红接口
//这是本地的接口地址
// export const reqRegisterAllInfo=()=>requests({url:'/book/bookAllInformation',method:'get'}) //所有预约挂号信息
// export const reqRegisterAllInfo=()=>requests({url:'/phy/reportExam',method:'get'}) //所有预约挂号信息
// export const searchRegisterInfo=(data)=>requests({url:'/book/selectFormat',method:'post',data}) //搜索预约挂号信息

//云端的接口地址
export const getselection=()=>requests({url:'/book/byDepartment',method:'get'}) //获取下拉框字段
export const reqRegisterAllInfo=()=>requests({url:'/book/bookAllInformation',method:'get'}) //所有预约挂号信息
export const searchRegisterInfo=(data)=>requests({url:'/book/selectFormat',method:'post',data}) //搜索预约挂号信息
export const reqRegisterSingleInfo=(data)=>requests({url:'/reg/regOneInformation',method:'post',data}) //查看单条预约挂号详情
export const addRegisterRemark=(data)=>requests({url:'/reg/insertRemake',method:'post',data}) //添加挂号备注


export const reqhsAllInfo=()=>requests({url:'/hs/hsAllInformation',method:'get'}) //所有预约核酸信息
export const addNatRemark=(data)=>requests({url:'/hs/insertRemake',method:'post',data}) //添加核酸备注
export const searchNatInfo=(data)=>requests({url:'/hs/selectFormat',method:'post',data}) //搜索预约核酸信息
export const reqNatSingleInfo=(data)=>requests({url:'/hs/hsOneInformation',method:'post',data}) //查看单条预约核酸详情

export const reqphyAllInfo=()=>requests({url:'/phy/phyAllInfomation',method:'get'}) //所有预约体检信息
export const addMedicalRemark=(data)=>requests({url:'/phy/phyRemake',method:'post',data}) //添加体检备注
export const searchMedicalInfo=(data)=>requests({url:'/phy/selectFormat',method:'post',data}) //搜索预约体检信息


export const reqAllNotice=()=>requests({url:'/notice/qureyAllNotice',method:'get'}) //所有消息公告信息
export const searchNotice=(data)=>requests({url:'/notice/qureyNotices',method:'post',data}) //查询消息公告信息
export const addNotice=(data)=>requests({url:'/notice/addNotice',method:'post',data}) //添加消息公告信息
export const goupdateNotice=(data)=>requests({url:'/notice/preEditNotice',method:'post',data}) //进入修改消息公告信息页面
export const updateNotice=(data)=>requests({url:'/notice/editNotice',method:'put',data}) //修改消息公告信息
export const delNotice=(data)=>requests({url:'/notice/delNotice',method:'delete',data}) //删除消息公告信息


//赵飞接口
// export const reqGetAdim=()=>requests({url:'admin/qureyAdmins',method:'get'})//管理员查询接口
export const reqGetAdim=()=>requests({url:'admin/queryAllAdmin',method:'get'})//管理员角色请求接口
export const reqAddAdim=(data)=>requests({url:'admin/addAdmin',method:'post',data})//管理员增加接口
export const reqserchAdim=(data)=>requests({url:'admin/qureyAdmins',method:'post',data})//查询接口
export const requpdataAdim=(data)=>requests({url:'admin/preEditAdmin',method:'post',data})//修改接口
export const reqDelAdim=(data)=>requests({url:'admin/delAdmin',method:'delete',data})//删除管理员接口
export const reGoAddAdim=()=>requests({url:'admin/preAddAdmin',method:'get'})//进入增加页面
export const reGoupdata=(data)=>requests({url:'admin/editAdmin',method:'post',data})//进入修改接口
export const reupdateAdimStatus=(data)=>requests({url:'admin/editAdminStatus',method:'PUT',data})//修改状态接口

//角色查询接口
export const reGetRole=()=>requests({url:'role/qureyAllRole',method:'get'})//角色列表查询
export const reQueryRole=(data)=>requests({url:'role/qureyRoles',method:'post',data})//角色查询
export const reDelRole=(data)=>requests({url:'role/delRole',method:'DELETE',data})//删除角色
export const reAddRole=()=>requests({url:'role/preAddRole',method:'get'})//进入增加接口

export const regupdateRole=(data)=>requests({url:'role/preEditRole',method:'post',data})//进入修改接口
export const reupdateRoleStatus=(data)=>requests({url:'role/editRoleStatus',method:'PUT',data})//修改角色状态接口


//职称查询接口
export const reGetTitle=()=>requests({url:'prof/qureyAllProfessional',method:'get'})//职称列表
export const reQueryTitle=(data)=>requests({url:'prof/qureyProfessionals',method:'post',data})//职称查询
export const reAddTitle=(data)=>requests({url:'prof/addProfessional',method:'post',data})//职称增加
export const reupdateRole=(data)=>requests({url:'prof/addProfessional',method:'PUT',data})//职称修改
export const reDelTitle=(data)=>requests({url:'prof/delProfessional',method:'delete',data})//职称修改
export const reUpstatus=(data)=>requests({url:'prof/editProfessionalStatus',method:'PUT',data})//职称修改状态

//李剑雄接口
// 医生管理接口
// 无参查询
export const doctorManagement =(data) => requests ({url: '/doc/QueryDoctorsAll',method:'post',data})
// 添加
export const doctorManagementAdd =(data) => requests ({url: '/doc/addDoctors',method:'post',data})
//修改 
export const doctorManagementModify =(data) => requests ({url: '/doc/EditDoctors',method:'put',data})
// 删除
export const doctorManagementDel =(data) => requests ({url: '/doc/DelDoctors',method:'delete',data})
// 搜索
export const doctorManagementSearch =(data) => requests ({url: '/doc/QueryEncyclopedia',method:'post',data})

// 科室管理
// 无参查询
export const departmentManagement =(data) => requests ({url: '/doc/PreAddDepartmentsAll',method:'post',data})
// 添加
export const departmentManagementAdd =(data) => requests ({url: '/doc/addDepartments',method:'post',data})
//修改 
export const departmentManagementModify =(data) => requests ({url: '/doc/EditDepartments',method:'put',data})
// 删除
export const departmentManagementDell =(data) => requests ({url: '/doc/DelDepartments',method:'delete',data})
// 搜索
export const departmentManagementSearch =(data) => requests ({url: '/doc/QueryDepartments',method:'post',data})

// 体检套餐
// 体检套餐
// 无参查询
export const physicalExamination =(data) => requests ({url: '/doc/QueryCombosAll',method:'post',data})
// 添加
export const physicalExaminationAdd =(data) => requests ({url: '/doc/addCombos',method:'post',data})
//修改 
export const physicalExaminationModify =(data) => requests ({url: '/doc/EditCombos',method:'put',data})
// 删除
export const physicalExaminationDell =(data) => requests ({url: '/doc/DelCombos',method:'delete',data})
// 搜索
export const physicalExaminationSearch =(data) => requests ({url: '/doc/QueryCombos',method:'post',data})

// 体检项目
// 无参查询
export const examinationProject =(data) => requests ({url: '/doc/QueryItemsALL',method:'post',data})
// 添加
export const examinationProjectAdd =(data) => requests ({url: '/doc/addCombos',method:'post',data})
//修改 
export const examinationProjectModify =(data) => requests ({url: '/doc/EditItems',method:'put',data})
// 删除
export const examinationProjectDell =(data) => requests ({url: '/doc/DelItems',method:'delete',data})
// 搜索
export const examinationProjectSearch =(data) => requests ({url: '/doc/QueryItems',method:'post',data})

// 套餐类型
// 无参查询
export const examinationType =(data) => requests ({url: '/doc/QueryTypes',method:'get',data})




//李钏奇接口

//登录接口
export const registerl = (data) => requests({url: '/login',method:'post',data})
//注册接口
export const registered = (data) => requests({url: '/regist',method:'post',data})
//新增预约接口
//export const NewBooking = (data) => requests({url: '/book/bookAllInformation',method:'get',data})
//取消预约接口
export const deselecting = (data) => requests({url: '/update/updateStatus',method:'put',data})
//预约详情接口
export const Booking = (data) => requests({url: '/patientBook/patientInfo',method:'post',data})
//用户充值接口
//export const voucher = (data) => requests({url: '/rerecord/rechargeBalance',method:'post',data})
//用户查询余额接口
//export const voucher = (data) => requests({url: '/rerecord/selectBalance',method:'post',data})

//医院百科接口
export const yybkencyclopedia = (data) => requests({url: '/doc/QueryEncyclopedia1',method:'post',data})
//医院百科模糊查询接口
export const cxencyclopedia = (data) => requests({url: '/doc/QueryEncyclopedia',method:'post',data})
//医院百科新增接口
export const addencyclopedia = (data) => requests({url: '/doc/addEncyclopedia',method:'post',data})
//医院百科删除接口
export const deleteencyclopedia = (data) => requests({url: '/doc/DelEncyclopedia',method:'delete',data})
//医院百科修改接口
export const amendencyclopedia = (data) => requests({url: '/doc/EditEncyclopedia',method:'put',data})
