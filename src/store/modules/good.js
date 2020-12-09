import {GOOD_LIST,CATES_LIST} from '../actions'

let initState={
    goodData:{},
    cates:[]
}
export default function reducer(state=initState, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case GOOD_LIST:
        newState.goodData = action.payload
        break
        case CATES_LIST:
        newState.cates=action.payload
        break
        default:
    }
    return newState
    }