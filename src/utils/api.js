import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

//获取商品列表
export function fetchGoodList(params){
  return axios({
    url:'/api/v1/good/list',
    method:'GET',
    params
  })
}

//添加商品
export function AddGoods(data){
  return axios({
    url: '/api/v1/good/addOrEdit',
    method:'POST',
    data
  })
}

//获取品类
export function fetchCates(params){
  return axios({
    url: '/api/v1/good/cates',
    method:'GET',
    params
  })
}

export function fetchGoodDel(params) {
  return axios({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}

export default {
  fetchQqMusic,
  fetchGoodList,
  AddGoods,
  fetchCates,
  fetchGoodDel
}
