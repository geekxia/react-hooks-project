import type from '../actionTypes'

let initState = {
  shopData: {},
  cates:[],
  shopInfo:{}
}

export default function reducer(state=initState, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.GET_SHOP_LIST:
      newState.shopData = action.payload
      break
    case type.GET_CATE_LIST:
      newState.cates = action.payload
      break
    case type.GET_SHOP_DETAIL:
      newState.shopInfo = action.payload
      break
    case type.CLEAR_SHOP_DETAIL:
      newState.shopInfo = {}
    default:

  }
  console.log('我的数据',newState)
  return newState
}
