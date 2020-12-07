import type from '../actionTypes';

const initState = {
  children:[]
}

export default (state=initState,action)=>{
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type){
    case type.SELECT_FRIEND:
      newState.children = action.payload
      break;
    default:
      return state
  }
  return newState
}