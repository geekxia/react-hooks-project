import type from '../actionTypes'

let initState = {
    pathName: []    
}

export default (state=initState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.PATH_TITLE:
            newState.pathName = action.payload
            break
        default: 
    }
    return newState
}