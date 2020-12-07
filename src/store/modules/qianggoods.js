import type from "../actionTypes"


const initState = {
    QGoodData: {
        a: 1,
        b: 2
    }
}

export default function reducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.QGOOD_DATA:
            newState.QGoodData = action.payload
            break
        default:
            return state
    }
    return newState
}