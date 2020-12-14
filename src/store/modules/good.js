<<<<<<< HEAD
import type from "../actionTypes"
let initstate={
    list:{},
    arr:[],
    arrvalue:{}

}

export default (state=initstate,action)=>{
    let newstate=JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case  type.Good_list:
            newstate.list= action.payload  
            break;
            case  type.Good_cate:
            newstate.arr= action.payload  
            break;
            case  type.Good_value:
            newstate.arrvalue= action.payload  
            break;
            case  type.Good_clear:
            newstate.arrvalue= action.payload  
            break;
    }
    return newstate
}
=======
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
>>>>>>> aayoupann
