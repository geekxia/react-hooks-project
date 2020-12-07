import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}
//添加商品,post参数是data
 export function fetchGoodOrEdit(data) {
     return axios({
         url:'/api/v1/good/addOrEdit',
         method:'POST',
         data
     })
 }
 //获取商品列表，GET参数是params
 export function fetchGoodList(params) {
    return axios({
        url:'/api/v1/good/list',
        method:'GET',
        params
    })
 }
export default {
  fetchQqMusic,
  fetchGoodOrEdit,
  fetchGoodList
}
