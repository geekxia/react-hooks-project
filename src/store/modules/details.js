// 进入详情页需要展示掉接口传过来的数据,将页面渲染到图表中
import type from '../actionTypes'
let initState={
    goodData:{

    },
    cates:[
        {
            _id:1,
            cate:"china",
            cate_zh:"中国"
        }
    ]
}
const Detail=(state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case type.DETAILLIST:
            newState.goodData=action.payload
            break
        case type.CATE_LIST:
            newState.cates=action.payload
            console.log("chuande",action.payload)
            break
        default:
           return state
    }
    return newState

}
export default Detail
