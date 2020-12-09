import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

//添加商品
export function fetchGoodOrEdit(data) {
  return axios({
    url: '/api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}
//商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}
//获取品类列表
export function fetchCatesList(params) {
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}

//删除商品
export function fetchDelGood(params) {
  return axios({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}
//获取商品详情

export default {
  fetchQqMusic,
  fetchGoodOrEdit,
  fetchGoodList,
  fetchCatesList,
  fetchDelGood
}
