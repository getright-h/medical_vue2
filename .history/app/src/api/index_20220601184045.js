//引入axios
import requests from './request'

//示例
// /api/product/getBaseCategoryList  get 无参数
// export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//李志华接口
//医院导航
//医院导航查询接口  /ssm_03_war_exploded/doc/QueryNavigat  post
export const reqGetHospitalNav = () => requests({url:'/doc/QueryNavigat',method:'post'})

//曾之柳接口
// xxx接口
// /ssm_03_war_exploded/phy/phyOneInformation post
// export const reqXXXX = (data) => requests({url: '/phy/phyOneInformation',method:'post',data})


//李示红接口


//赵飞接口



//李剑雄接口


//李钏奇接口