import type from "../actionTypes";

let initState={
    goodData:{}
}

export default function reduce(state=initState,action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.GET_GOOD_LIST:
             newState.goodData=action.payload
            break;
        default:
            break;
    }
    return newState
}