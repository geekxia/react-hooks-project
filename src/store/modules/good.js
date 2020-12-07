import type from '../actionTypes'

let initState = {
    good:{}
}

export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.GOOD_LIST: newState.good = action.payload
        break
        default:return state
    }
    return newState
}