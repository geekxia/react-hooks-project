import type from '../actionTypes'

const initState = {
  goodList: {},
  cates:[],
  goodInfo:{}
}

export default (state=initState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.AJAX_GOOD_LIST:
      newState.goodList = action.payload
      break
    case type.AJAX_GOOD_CATE:
      newState.cates = action.payload
      // console.log(action.payload)
      break
    case type.AJAX_GOOD_DATAIL:
      newState.goodInfo = action.payload
      break
    case type.CLEAR_GOOD_DETAIL:
      newState.goodInfo = action.payload
      break
    default:
  }
  return newState
}
