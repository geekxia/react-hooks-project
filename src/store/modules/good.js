
import type from '../actionTypes'


let initState = {
    goodData:{}
}

export default function goodReducer(state=initState,action){

    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.GET_GOOD_LIST:
        
        newState.goodData = action.payload
        return newState
        ;break;
        default:return state
    }
}

