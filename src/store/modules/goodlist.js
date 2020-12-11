import type from '../actionTypes'

const initState = {
  goodData: {},
  goodInfo:{}
}

export default function reducer(state=initState, action) {
  // console.log('来自于视图组件的action====', action)
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.GET_GOOD_LIST:
      newState.goodData = action.payload
      break
      case type.GET_GOOD_DETAIL:
      newState.goodInfo = action.payload
      break
      case type.CLEAR_GOOD_DETAIL:
      newState.goodInfo = {}
      break
    default:
  }
  return newState
}
