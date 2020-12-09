import axios from 'axios'
import { message } from 'antd';

// 浏览器同源策略，只是限制ajax跨域
const baseURL = 'http://localhost:9000'

const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: {}
})

instance.interceptors.request.use(function (config) {
  // 加token
  config.headers.Authorization = localStorage.getItem('token')
  return config;
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // 数据过滤
  let res = null
  if(response.status === 200) {
    if(response.data && response.data.code===0) {
      res = response.data.data
    } else if(response.data && response.data.code==='10000') {
      res= response.data.result.result
    } else if(response.data && response.data.err===0) {
      res = response.data.data
    } else if(response.data && response.data.err===-1) {
      // 如果后端验证token失败，会返回 -1，跳转到登录页
      window.location.href = '/#/login'
    }else{
      message.error('用户名或密码错误！');
    }
  } 
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
