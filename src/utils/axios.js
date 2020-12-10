import axios from 'axios'

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
    // QQ服务器
    if(response.data && response.data.code===0) {
      res = response.data.data
    }
    // 我们自己的node服务器
    if(response.data && response.data.err===0){
      res = response.data.data
    }else if(response.data.err === -1){
      window.location.href='/'
    }
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
