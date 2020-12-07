import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

//添加商品
function fetchAddGood(data){
  return axios({
      method:'POST',
      data,
      url:'/api/v1/good/addOrEdit'
  })
}

//获取商品列表
export function fetchGoodList(params){
  return axios({
    method:'GET',
    url:'/api/v1/good/list',
    params,
})
}

//删除商品
export function fetchDelGood(params){
  return axios({
    method:'GET',
    url:'/api/v1/good/delete',
    params
})
}

export default {
  fetchQqMusic,
  fetchAddGood,
  fetchGoodList,
  fetchDelGood
}
