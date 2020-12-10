import type from '../actionTypes'

let initState = {
    userList: []
}

export default function reducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.GET_USER_LIST:
            newState.userList = action.payload
            break
        default:
    }
    console.log('user模块', newState)
    return newState
}