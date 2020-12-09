import type from '../actionTypes'

let initState = {
    goodData: {}
}


export default function reducer(state=initState,action) {
    // 深复制
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.GET_GOOD_LIST:
            newState.goodData = action.payload
            break
        default:
    }
    return newState
}