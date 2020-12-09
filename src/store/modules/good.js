import type from "../actionTypes"

//相当于初始值
let initState={
    goodArr:{},
}

//这相当于是在定义reducer会进行一些操作
export default function reducer(state=initState,action){
    //进行一次深复制，赋予新值
    let newState = JSON.parse(JSON.stringify(state))
    //来判断类型，进行什么样的操作
    switch (action.type){
        case type.GET_GOODLIST:
            newState.goodArr=action.payload
            break
    }
    // console.log("这有吗？",newState)
    return newState
}
