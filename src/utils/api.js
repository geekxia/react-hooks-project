import axios from './axios'


//获取音乐列表
export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}


//获取天气
export function fetchWeather(params) {
  return axios({
    url: '/jisuapi/weather',
    method: 'GET',
    params
  })
}


//获取商品列表
export function fetQiangGoodList(params) {
  return axios({
    url: "/api/v1/good/list",
    method: "GET",
    params
  })
}

//提交商品
export function fetchGoodOrEdit(data) {
  return axios({
    url: '/api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}

// 获取品类列表
export function fetchCates(params) {
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}

//删除商品
export function fetchGoodDel(params) {
  return axios({
    url: '/api/v1/good/delete',
    method: "GET",
    params
  })
}

//获取商品详情
export function fetchGoodDetail(params) {
  return axios({
    url: '/api/v1/good/detail',
    method: "GET",
    params
  })
}

export default {
  fetchQqMusic,
  fetchWeather,
  fetQiangGoodList,
  fetchGoodOrEdit,
  fetchCates,
  fetchGoodDel,
  fetchGoodDetail
}
