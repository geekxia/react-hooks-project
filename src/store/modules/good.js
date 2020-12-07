import type from '../actionTypes'

let initState = {
    goodDate:{}
}

export default function reducer(state=initState,action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.Get_GOOD_LIST:
            newState.goodDate = action.payload
            break
            default:
    }
    return newState
}