import type from '../actionTypes'

const initState = {
  goodData: {},
  cates: []
}

export default (state=initState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.GET_GOOD_LIST:
      newState.goodData = action.payload
      break
    case type.GET_CATE_LIST:
      newState.cates = action.payload
      break
    default:
  }
  console.log('========',newState)
  return newState
}
