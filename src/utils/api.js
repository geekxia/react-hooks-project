import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}

export function fetchGoodAddOrEdit(data) {
  return axios({
    url: '/api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}

export function fetchCates(params) {
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}

export function fetchDelete(params) {
  return axios({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}

export function fetchGoodDetail(params){
  return axios({
    url: '/api/v1/good/detail',
    method: 'GET',
    params
  })
}

export function fetchLogin(data){
  return axios({
    url: '/api/v1/user/login',
    method: 'POST',
    data
  })
}

export default {
  fetchQqMusic,
  fetchGoodList,
  fetchGoodAddOrEdit,
  fetchCates,
  fetchDelete,
  fetchGoodDetail,
  fetchLogin
}
