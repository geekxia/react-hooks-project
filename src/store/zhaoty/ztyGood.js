import type from '../actionTypes'
 let initState = {
    goodData: {}
  }
  
export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state));
    console.log('action ',action)
    switch(action.type){
        case type.ZTY_GOOD_LIST:
            newState = action.payload
        break
    }
    return newState
}