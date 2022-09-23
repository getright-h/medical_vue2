//对axios进行二次封装--用到请求和响应拦截器
import axios from 'axios'

//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'
//在当前模块引入仓库
// import store from '@/store'
//1.利用axios对象的create属性创建一个axios实例
//2.requests其实就是axios
const requests = axios.create({
    //配置对象
    //baseURL就是基础路径，在发送请求的时候，路径中会出现api
    baseURL: "http://s.sm.bi:23311",
    // baseURL: "http://192.168.218.237:8080",
    //请求在5s内未成功，则失败
    timeout: 5000,
});

//请求拦截器:在发送请求之前，请求拦截器可以检测到，可以进行一些业务操作
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里有一个headers属性很重要
    //判断仓库有没有uuid——token
    // if(store.state.detail.uuid_token){
        //给请求头加一个字段userTempId 这个是后端规定好的用于标识游客身份
    config.headers.Authorization = 'askdjhkadjad'
    // }
    // if(store.state.user.token){
        //给请求头加一个字段token 这个是登录用户的身份标识
    //     config.headers.token = store.state.user.token
    // }
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use(
    (res) => {
        //成功的回调，服务器相应数据回来之后，响应服务器可以检测到，可以进行一些业务
        nprogress.done();
        // if(res.data.Authorization){
        //     localStorage.setItem('UUIDTOKEN',res.data.token)
        // }
        return res.data;
    }, (error) => {
        //响应失败的回调
        // nprogress.done();
        return Promise.reject(new Error('faile'));
    })
export default requests;





