import axios from 'axios'
import { message} from 'antd';

// 浏览器同源策略，只是限制ajax跨域
const baseURL = 'http://localhost:9000'

const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: {}
})

instance.interceptors.request.use(function (config) {
  // 加token
  return config;
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // 数据过滤
  // console.log(response)
  let res = null
  if(response.status === 200) {
    if(response.data.err===-1){
      window.location.href='/#/login'
    }else if(
      response.data.err===0&&response.data){
      res=response.data.data
      // console.log('商品列表',res)
    }else if(
      response.data && response.data.code===0) {
      res = response.data.data
    }else{
      message.warning(response.data.msg);
    }
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
