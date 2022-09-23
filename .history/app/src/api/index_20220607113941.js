//引入axios
import requests from './request'

//示例
// /api/product/getBaseCategoryList  get 无参数
// export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//李志华接口
//医院导航
//医院导航查询接口  /ssm_03_war_exploded/doc/QueryNavigat  post
export const reqGetHospitalNav = () => requests({url:'/doc/QueryNavigat',method:'post'})

//根据院区名字查询接口
// /doc/QueryNavigation
export const reqSelectHospitalNav = (data) => requests({url:`/doc/QueryNavigation/`,method:'post',data})
//医院导航添加新院区
// /doc/addNavigation
export const reqAddHospitalNav = (data) => requests({url:`/doc/addNavigation`,method:'post',data})
//医院导航修改前接口
// /doc/PreEditNavigation
export const reqBeforeUpdateHospitalNav = (data) => requests({url:`/doc/PreEditNavigation`,method:'post',data})

//医院导航修改院区信息接口
// /doc/EditNavigationVo
export const reqUpdateHospitalNav = (data) => requests({url:`/doc/EditNavigationVo`,method:'post',data})



//曾之柳接口
// xxx接口
// /ssm_03_war_exploded/phy/phyOneInformation post
// export const reqXXXX = (data) => requests({url: '/phy/phyOneInformation',method:'post',data})


//李示红接口
//这是本地的接口地址
// export const reqRegisterAllInfo=()=>requests({url:'/book/bookAllInformation',method:'get'}) //所有预约挂号信息
// export const reqRegisterAllInfo=()=>requests({url:'/phy/reportExam',method:'get'}) //所有预约挂号信息
// export const searchRegisterInfo=(data)=>requests({url:'/book/selectFormat',method:'post',data}) //搜索预约挂号信息

//云端的接口地址
export const reqRegisterAllInfo=()=>requests({url:'/book/bookAllInformation',method:'get'}) //所有预约挂号信息
export const searchRegisterInfo=(data)=>requests({url:'/book/selectFormat',method:'post',data}) //搜索预约挂号信息
// export const reqRegisterSingleInfo=(data)=>requests({url:'/reg/regOneInformation',method:'post',data}) //查看单条预约挂号详情
export const addRegisterRemark=(data)=>requests({url:'/reg/insertRemake',method:'post',data}) //添加挂号备注


export const reqhsAllInfo=()=>requests({url:'/hs/hsAllInformation',method:'get'}) //所有预约核酸信息
export const addNatRemark=(data)=>requests({url:'/hs/insertRemake',method:'post',data}) //添加核酸备注
export const searchNatInfo=(data)=>requests({url:'/hs/selectFormat',method:'post',data}) //搜索预约核酸信息

export const reqphyAllInfo=()=>requests({url:'/phy/phyAllInfomation',method:'get'}) //所有预约体检信息
export const addMedicalRemark=(data)=>requests({url:'/phy/phyRemake',method:'post',data}) //添加体检备注
export const searchMedicalInfo=(data)=>requests({url:'/phy/selectFormat',method:'post',data}) //搜索预约体检信息


export const reqAllNotice=()=>requests({url:'/notice/qureyAllNotice',method:'get'}) //所有消息公告信息

//赵飞接口
export const reqGetAdim=()=>requests({url:'/admin/qureyAllAdmin',method:'get'})
export const reqGetAdim=()=>requests({url:'admin/queryAllAdmin',method:'get'})//管理员查询接口
//角色查询接口
export const reGetRole=()=>requests({url:'/role/qureyAllRole',method:'get'})

//李剑雄接口
// 医生管理接口
// export const doctorManagement =(data) => requests ({url: '/doc/PreAddDoctors',method:'post',data})


//李钏奇接口