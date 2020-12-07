import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}


//添加商品
export function pushshop(data){
  return axios ({
    url:"/api/v1/good/addOrEdit",
    method:"POST",
    data
  })
}
//获取商品
export function fetchXxlGetShop(params){
  return axios ({
    url:'/api/v1/good/list',
    method:"GET",
    params
  })
}




export default {
  fetchQqMusic,
  pushshop,
  fetchXxlGetShop
}
