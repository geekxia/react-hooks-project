import type from '../actionTypes'

const initState = {
    foodList: [],
    foodName: ''
}

export default (state=initState, action) =>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.AJAX_FOOD_LIST:
            newState.foodList = action.payload
            break;
        case type.AJAX_FOOD_NAME:
            newState.foodName = action.payload
            break
        default:
            break
    }
    return newState
}