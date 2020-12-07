import type from "../actionTypes"

let initState = {
    result: {},
    city: "深圳",
}

export default (state = initState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    console.log("=====weather", action);
    switch (action.type) {
        case type.GET_WEATHER:
            newState.result = action.payload.result
            break

        case type.GET_CITY:
            newState.city = action.payload
            break
        default:
            return state
    }
    return newState
}