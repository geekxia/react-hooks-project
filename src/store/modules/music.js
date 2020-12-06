import {MUSIC_LIST} from '../actions'
let initState={
    list:[]
}

export default function reducer(state=initState,action){
    let newState=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case MUSIC_LIST:
            newState.list=action.payload
            break
        default:
    }
    return newState
}