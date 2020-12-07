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
    url:'/api/v1/good/list',
    method:'GET',
    params
  })
}
export default {
  fetchQqMusic,
  fetchGoodOrEdit

}
