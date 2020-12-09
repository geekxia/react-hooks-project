import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

export function fetchGoodOrEdit(data){
  return axios({
    url:'/api/v1/good/addOrEdit',
    method:'POST',
    data
  })
}

export function fetchGoodList(params){
  return axios({
    url:'/api/v1/good/list',
    method:'GET',
    params
  })
}

export function fetchGoodCates(params){
  return axios({
    url:'/api/v1/good/cates',
    method:'GET',
    params
  })
}

export function fetchLogin(data){
  return axios({
    url:'/api/v1/user/login',
    method:'POST',
    data
  })
}

export default {
  fetchQqMusic,
  fetchGoodOrEdit,
  fetchGoodList,
  fetchGoodCates,
  fetchLogin
}
