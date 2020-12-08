 import type from '../actionTypes'

 let initState={
	goodData:{}
 }

 export default (state=initState, action) => {
	let newState = JSON.parse(JSON.stringify(state))
	switch (action.type) {
	  case type.AJAX_GOOD_LIST:
		newState.list = action.payload
		break
	  default:
	}
	return newState
  }