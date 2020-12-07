import type from '../actionTypes'

const initState = {
    list: [],
    keyword: '周杰伦'
}

export default (state=initState,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.AJAX_MUSIC_LIST:
            newState.list = action.payload
            break
        case type.UP_LIST:
            newState.keyword = action.payload
            break
        default:
            return state 
    }
    return newState
}
