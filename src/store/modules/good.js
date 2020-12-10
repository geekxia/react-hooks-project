import {GOOD_LIST,CATES_LIST,GOOD_DETAIL,DEL_DETAIL} from '../actions'

let initState={
    goodData:{},
    cates:[],
    goodInfo:{}
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
        case GOOD_DETAIL:
        newState.goodInfo=action.payload
        break
        case DEL_DETAIL:
        newState.goodInfo={}
        break
        default:
    }
    return newState
    }