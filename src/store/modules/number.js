import type from "../actionTypes"

const initState = {
    list:[
        {id:1,number:1300000000,adress:'1111'},
        {id:2,number:1300001000,adress:'1111'},
        {id:3,number:1300002000,adress:'1111'},
        {id:4,number:1300003000,adress:'1111'}
    ]
}
// https://way.jd.com/jisuapi/query4?shouji=13456755448&
// d2d26bf58977c397eab325678fc0e0da

export default (state=initState,action) =>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.AJAX_PhoneState_LEST:
            newState.list = action.payload
            break
        default:
            return state
    }
    return newState
}