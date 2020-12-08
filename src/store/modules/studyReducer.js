import {
    CHANGE_MSG,
    ADD_FUNC,
    SUB_FUNC
} from '../actions'

let initState={
    msg:'hello wd',
    foo:{
        count:0
    }
}

export default function reducer(state=initState,action){
    console.log('state.msg',state.msg)
    console.log('来自视图的action',action)
    let newState=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case CHANGE_MSG:
            // state.msg=action.payload
            newState.msg=action.payload
            break
        case ADD_FUNC:
            newState.foo.count+=action.payload
            break
        case SUB_FUNC:
        newState.foo.count-=action.payload
        break
        default:
            return state
    }
    return newState
}