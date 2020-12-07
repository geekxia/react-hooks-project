import type from "../actionTypes"
let initstate={
    list:{}
}

export default (state=initstate,action)=>{
    let newstate=JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case  type.Good_list:
            newstate.list= action.payload  
            break;
    }
    return newstate
}