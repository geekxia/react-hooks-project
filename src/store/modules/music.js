import type from '../actionTypes'

const initState = {
  list: [],
  keyword:'aimer'
}

export default (state=initState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.AJAX_MUSIC_LIST:
      newState.list = action.payload
      newState.list=JSON.parse(JSON.stringify(newState.list))
      break
    case type.CHANGE_MUSIC_LIST:
      newState.keyword=action.payload?action.payload:'aimer'
    default:
  }
  return newState
}
