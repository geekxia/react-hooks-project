import type from '../actionTypes'
let initState={
    username:''
}
export default(state=initState,action)=>{
    let newState=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.GET_USER_NAME:
            newState.username=action.payload
            break
        default:
            return state
    }
    return newState
}