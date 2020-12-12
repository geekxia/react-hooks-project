import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

// 商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}

// 添加商品
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

// 删除商品
export function fetchGoodDel(params){
  return axios({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}

// 编辑商品
export function fetchGoodDetail(params){
  return axios({
    url: '/api/v1/good/detail',
    method: 'GET',
    params
  })
}

// 登录
export function fetchLogin(data) {
  return axios({
    url: 'api/v1/user/login',
    method: 'POST',
    data
  })
}

export default {
  fetchQqMusic,
  fetchGoodList,
  fetchGoodOrEdit,
  fetchCates,
  fetchGoodDel,
  fetchGoodDetail,
  fetchLogin
}
