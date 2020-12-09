import fetch from './axios'

export function fetchQqMusic(params) {
  return fetch({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}
export function fetchGoodList(params) {
  return fetch({
    url: '/api/v1/good/list',
    method: 'GET',
    params
  })
}
export function addGood (params) {
  return fetch({
    url: baseUrl + '/addGood',
    method: 'GET',
    params
  })
}
export function GoodAddOrEdit (data) {
  return fetch({
    url: '/api/v1/good/addOrEdit',
    method: 'POST',
    data
  })
}
const baseUrl = '/api/v1'
export function getGoodList (params) {
  return fetch({
    url: baseUrl + '/good/list',
    params,
    method: 'GET'
  })
}
// 获取品类
export function getCartList (params) {
  return fetch({
    url: baseUrl + '/good/cates',
    params,
    method: 'GET'
  })
}
// 商品详情
export function getGoodDetail (params) {
  return fetch({
    url: baseUrl + '/jd/good/detail',
    params,
    method: 'GET'
  })
}
// 商品购物车列表
export function getGoodCart (params) {
  return fetch({
    url: baseUrl + '/jd/cart/list',
    params,
    method: 'GET'
  })
}
// 登录
export function login (data) {
  return fetch({
    url: baseUrl + '/user/login',
    data,
    method: 'POST'
  })
}
// 注册
export function regist (data) {
  return fetch({
    url: baseUrl + '/user/regist',
    data,
    method: 'POST'
  })
}
// 增加商品到购物车
export function AddCart (data) {
  return fetch({
    url: baseUrl + '/jd/cart/add',
    data,
    method: 'POST'
  })
}
// 删除购物车商品
// { id: 购物车集合中文档的 _id }
export function fetchDelCart (params) {
  return fetch({
    url: '/api/v1/jd/cart/del',
    method: 'GET',
    params
  })
}
export function fetchDelGOOD (params) {
  return fetch({
    url: '/api/v1/good/delete',
    method: 'GET',
    params
  })
}
// 修改购物车商品数量
// { id: 同上, num: 修改后的数量 }
export function UpdCart (data) {
  return fetch({
    url: '/api/v1/jd/cart/update',
    method: 'POST',
    data
  })
}
// 提交购物车
// { goods: String 用户已勾选的订单_id 连接而成的字符串 }
export function SubmitCart (data) {
  return fetch({
    url: '/api/v1/jd/cart/submit',
    method: 'POST',
    data
  })
}
export default {
  fetchQqMusic,
  getGoodList,
  getCartList,
  login,
  UpdCart,
  getGoodDetail,
  regist,
  AddCart,
  getGoodCart,
  SubmitCart,
  fetchDelCart,
  GoodAddOrEdit
}