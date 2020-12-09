import type from '../actionTypes'

const initState = {
  goodlist: {},
  cate: [],
  goodDetail: {}
}

export default (state=initState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.AJAX_GOOD_LIST:
      newState.goodlist = action.payload
      break;
    case type.AJAX_GOOD_CATE_LIST:
      newState.cate = action.payload
    case type.AJAX_GOOD_DETAIL:
      newState.goodDetail = action.payload
    default:
  }
  return newState
}
