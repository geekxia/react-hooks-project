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





export default {
  fetchQqMusic,
  fetchGoodList
}
