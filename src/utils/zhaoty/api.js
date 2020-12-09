import axios from '../axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}
export function fetchGoodList(params) {
  return axios({
    url: 'api/v1/good/list',
    method: 'GET',
    params
  })
}
export function goodUpdate(data) {
  return axios({
    url: 'api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}
export function goodCates(params){
  return axios({
    url:'api/v1/good/cates',
    method:'GET',
    params
  })
}
export function goodDetail(params){
  return axios({
    url:'api/v1/good/detail',
    method:'GET',
    params
  })
}
export function delGood(params){
  return axios({
    url:'api/v1/good/delete',
    method:'GET',
    params
  })
}
export default {
  fetchQqMusic,
  fetchGoodList,
  goodUpdate,
  goodCates,
  delGood
}
