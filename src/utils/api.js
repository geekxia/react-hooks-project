import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}


//增加商品
 export function fetchGoodOrEdit(data){
   return axios({
     url:"/api/v1/good/addOrEdit",
     method:'POST',
     data
   })
 }

//获取商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
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

//获取商品详情
export function fetchGoodDetail(params) {
  return axios({
    url: '/api/v1/good/detail',
    method: 'GET',
    params
  })
}




export default {
  fetchQqMusic,
  fetchGoodList,
  fetchGoodOrEdit,
  fetchCates
}
