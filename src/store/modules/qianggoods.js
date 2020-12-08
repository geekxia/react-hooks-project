import type from "../actionTypes"


const initState = {
    QGoodData: {},
    cates: []
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
        default:
            return state
    }
    return newState
}