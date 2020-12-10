import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

// 添加商品
export function fetchGoodOrEdit(data) {
  return axios({
    url: '/api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}

<<<<<<< HEAD


=======
>>>>>>> b6f326ddad322d4e09f3af0280dac43624f21ddb
// 获取商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}

<<<<<<< HEAD


=======
>>>>>>> b6f326ddad322d4e09f3af0280dac43624f21ddb
// 获取品类列表
export function fetchCates(params) {
  return axios({
    url: '/api/v1/good/cates',
    method: 'GET',
    params
  })
}

// 删除商品
export function fetchGoodDel(params) {
  return axios({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}

<<<<<<< HEAD
=======
// 获取商品详情
export function fetchGoodDetail(params) {
  return axios({
    url: '/api/v1/good/detail',
    method: 'GET',
    params
  })
}

export function fetchLogin(data) {
  return axios({
    url: '/api/v1/user/login',
    method: 'POST',
    data
  })
}

>>>>>>> b6f326ddad322d4e09f3af0280dac43624f21ddb
export default {
  fetchQqMusic,
  fetchGoodOrEdit,
  fetchGoodList,
  fetchCates,
<<<<<<< HEAD
  fetchGoodDel
=======
  fetchGoodDel,
  fetchGoodDetail,
  fetchLogin
>>>>>>> b6f326ddad322d4e09f3af0280dac43624f21ddb
}
