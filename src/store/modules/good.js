

import type from '../actionTypes'

let initState = {
  goodData: {}
}

export default function reducer(state=initState, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.YLQ_GET_GOODLIST:
      newState.goodData = action.payload
      break
    default:
  }
  
  return newState
}
