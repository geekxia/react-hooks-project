import type from '../actionTypes'

const initState = {
    goodList: {}
}

export default (state=initState, action) =>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.TT_GOOD_LIST:
            newState.goodList = action.payload
            break;
    
        default:
            break;
    }
    return newState
}