import type from '../actionTypes'

let initState = {
    good:{},
    cates:[],
    goodDetail:{}
}

export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.GOOD_LIST: newState.good = action.payload
        break
        case type.GOOD_CATES:newState.cates = action.payload
        break
        case type.GOOD_DETAIL:newState.goodDetail = action.payload
        break
        default:return state
    }
    // console.log(newState)
    return newState
}