import type from '../actionTypes'

let initState = {
  goodData: {},
  cates:[]
}

export default function reducer(state=initState, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.GET_GOOD_LIST:
      newState.goodData = action.payload
      break
    case type.GET_CATE_LIST:
      newState.cates=action.payload
    default:

  }
  return newState
}
