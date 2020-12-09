import type from "../actionTypes"
let initstate={
    list:{},
    arr:[],
    arrvalue:{}

}

export default (state=initstate,action)=>{
    let newstate=JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case  type.Good_list:
            newstate.list= action.payload  
            break;
            case  type.Good_cate:
            newstate.arr= action.payload  
            break;
            case  type.Good_value:
            newstate.arrvalue= action.payload  
            break;
            case  type.Good_clear:
            newstate.arrvalue= action.payload  
            break;
    }
    return newstate
}