 import type from '../actionTypes'

 let initState={
	goodData:{},
	cates:[],
	goodInfo:{}
 }

 export default function reducer(state=initState, action) {
	let newState = JSON.parse(JSON.stringify(state))
	switch (action.type) {
	  case type.AJAX_GOOD_LIST:
		newState.goodData = action.payload
		break
	  case type.AJAX_CATE_LIST:
		newState.cates = action.payload
		break
	  case type.AJAX_GOOD_INFO:
		newState.goodInfo=action.payload
		break
	case type.CLEAR_GOOD_CACHE:
		newState.goodInfo={}
		break
	  default:
		  return state
	}
	return newState
  }