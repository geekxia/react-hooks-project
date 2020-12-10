import type from "../actionTypes"


const initState = {
    QGoodData: {},
    cates: [],
    goodInfo: {}
}

export default function reducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.QGOOD_DATA:
            newState.QGoodData = action.payload
            break
        case type.GET_CATE_LIST:
            newState.cates = action.payload
            break
        case type.GET_GOOD_DETAIL:
            newState.goodInfo = action.payload
            break
        case type.CLEAR_GOOD_DETAIL:
            newState.goodInfo = action.payload
            break
        default:
            return state
    }
    return newState
}