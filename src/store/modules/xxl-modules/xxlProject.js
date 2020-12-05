import type from '../../actionTypes'

//{id:1,myTitle:"111",myTarget:"222",myStandard:"333"}
let initState = {
    proArr:[]
}

export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.ADD_PRO:
            newState.proArr.push(action.payload)
            break;
    
        default:
            return state
    }
    return newState
}