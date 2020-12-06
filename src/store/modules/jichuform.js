import type from "@/store/actionTypes"

const initState = {
    list: [{id:1,name:2}]
  }

export default (state=initState,action) =>{
    let newstate=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case "Add_JiChuBiaoDan":
        newstate=action.payload
        break
    }
    return newstate
}
