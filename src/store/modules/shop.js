import type from '../actionTypes'

let initState = {
  shopData: {},
  cates:[]
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
    default:

  }
  console.log('我的数据',newState)
  return newState
}
