import axios from 'axios'
import { message } from 'antd'

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
  if (response.status === 200) {
    if (response.data && response.data.code === 0) {
      res = response.data.data
    }
    if (response.data && response.data.code === "10000") {
      res = response.request.response
    }
    if (response.data && response.data.err === 0) {
      res = response.data.data
    }
    if (response.data && response.data.err === 1) {
      message.error(response.data.msg)

      // 当发生业务错误时，把后端的提示文字弹出
    }
    if (response.date && response.data.err === -1) {
      //后端验证token错误的时候,会返回-1,跳转到登录页面
      window.location.href = '/#/login'
    }
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
