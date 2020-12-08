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

export function fetchGoodAddOrEdit(data){
  return axios({
    url: '/api/v1/good/addOrEdit',
    method:'post',
    data
  })
}


export default {
  fetchQqMusic,
  fetchGoodList,
  fetchGoodAddOrEdit
}
