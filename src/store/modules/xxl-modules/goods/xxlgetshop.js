
import type from '../../../actionTypes'

let initState = {
    shopDate:{}
}

export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.XXL_GET_SHOP:
            newState.shopDate = action.payload
            break;
        default:
            return state
    }
    return newState
}