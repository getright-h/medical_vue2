//引入axios
import requests from './request'

//示例
// /api/product/getBaseCategoryList  get 无参数
// export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//李志华接口
//医院导航
//医院导航查询接口  /ssm_03_war_exploded/doc/QueryNavigation  post
export const reqGetHospitalNav = () => requests({ url: '/doc/QueryNavigation', method: 'post' })



//曾之柳接口



//李示红接口


//赵飞接口



//李剑雄接口


//李钏奇接口