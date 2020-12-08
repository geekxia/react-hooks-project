import type from '../actionTypes'

let initState = {
    goodData: {},
    cates: []
}

export default function qtp(state=initState,action){
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.GET_QTP_LIST:
            newState.goodData = action.payload
            break
        case type.GET_CATE_LIST:
            newState.cates = action.payload
            break
        default:

    }
    return newState
}