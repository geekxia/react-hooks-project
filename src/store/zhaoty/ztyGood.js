import type from '../actionTypes'
 let initState = {
    goodData: {},
    cateArr:[],
    goodDetail:{}
  }
  
export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.ZTY_GOOD_LIST:
            newState.goodData = action.payload
        break
        case type.ZTY_GOOD_CATES:
            newState.cateArr=action.payload
        break
        case type.ZTY_GOOD_DETAIL:
            newState.goodDetail = action.payload
        break
    }
    return newState
}