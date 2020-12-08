
import type from '../../../actionTypes'

let initState = {
    shopDate:{},
    cates:[]
}

export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.XXL_GET_SHOP:
            newState.shopDate = action.payload
            break;
        case type.XXL_GET_CATES:
            newState.cates = action.payload
        break;
        default:
            return state
    }
    return newState
}