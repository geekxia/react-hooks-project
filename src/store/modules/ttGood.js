import type from '../actionTypes'

const initState = {
    goodList: {},
    cateList: [],
    goodInfo: {}
}

export default (state=initState, action) =>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.TT_GOOD_LIST:
            newState.goodList = action.payload
            break;
        case type.TT_CATE_LIST:
            newState.cateList = action.payload
            break
        case type.TT_GOOD_DETAIL:
            newState.goodInfo = action.payload
            break
        case type.CLEAR_GOOD_DETAIL:
            newState.goodInfo = action.payload
        default:
            break;
    }
    return newState
}