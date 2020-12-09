import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

// 添加商品
export function fetchGoodAdd(data) {
  return axios({
    url: '/api/v1/good/addOrEdit', // 这里url是是后端接口
    method: 'POST',
    data
  })
}

// 获取商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}

// 获取品类列表
export function fetchCates(params){
  return axios({
    url:'./api/v1/good/cates',
    method:'GET',
    params
  })
}

// 删除商品
export function fetchGoodDel(params){
  return axios({
    url:'/api/v1/good/delete',
    method:'GRT',
    params
  })
}

export default {
  fetchQqMusic,
  fetchGoodAdd,
  fetchGoodList,
  fetchCates,
  fetchGoodDel
  
}
