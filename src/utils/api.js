import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}
export function fetchShawnGood(data) {
  return axios({
    url: '/api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}
export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}
export function fetchGoodDetail(params) {
  return axios({
    url: '/api/v1/good/detail',
    method: 'GET',
    params
  })
}
export function fetchGoodCate(params) {
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}
export function fetchGoodDel(params) {
  return axios({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}

export default {
  fetchQqMusic,
  fetchShawnGood,
  fetchGoodList,
  fetchGoodCate,
  fetchGoodDel,
  fetchGoodDetail
}
