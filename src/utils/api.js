import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

export function fetchGoodList(params){
  return axios({
    url: '/api/v1/good/list',
    method:'get',
    params
  })
}

export function fetchCatesList(params){
  return axios({
    url: '/api/v1/cart/list',
    method:'get',
    params
  })
}

export function fetchGoodAddOrEdit(data){
  return axios({
    url: '/api/v1/good/addOrEdit',
    method:'post',
    data
  })
}

export function fetchGoodDel(params){
  return axios({
    url: '/api/v1/good/delete',
    method:'get',
    params
  })
}

export default {
  fetchQqMusic,
  fetchGoodList,
  fetchGoodAddOrEdit,
  fetchCatesList,
  fetchGoodDel
}
