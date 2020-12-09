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

//获取商品品类
export function fetchXxxGetCates(params){
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}


//删除一个商品
export function fetchXxlDelShop(params){
  return axios({
    url:"/api/v1/good/delete",
    method:"GET",
    params
  })
}

//获取商品goodinfo
export function fetchXxlGetGoodinfo(params){
  return axios({
    url:'/api/v1/good/detail',
    method:"GET",
    params
  })
}

//登录
export function fetchXxlLogin(data){
  return axios({
    url:'/api/v1/user/login',
    method:"POST",
    data
  })
}




export default {
  fetchQqMusic,
  pushshop,
  fetchXxlGetShop,
  fetchXxxGetCates,
  fetchXxlDelShop,
  fetchXxlGetGoodinfo,
  fetchXxlLogin
}
