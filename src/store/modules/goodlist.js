import type from '../actionTypes'

const initState = {
  goodData: {}
}

export default function reducer(state=initState, action) {
  console.log('来自于视图组件的action====', action)
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.GET_GOOD_LIST:
      newState.goodData = action.payload
      break
    default:
  }
  return newState
}
