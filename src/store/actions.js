
import { fetchQqMusic,fetchGoodList,fetchCatesList,fetchGoodDetail} from '@/utils/api'
const CHANGE_MSG='CHANGE_MSG'
const ADD_FUNC='ADD_FUNC'
const SUB_FUNC='SUB_FUNC'
const MUSIC_LIST='MUSIC_LIST'
const GOOD_LIST='GOOD_LIST'
const CATES_LIST='CATES_LIST'
const GOOD_DETAIL='GOOD_DETAIL'
const DEL_DETAIL='DEL_DETAIL'

function changeMsgAction(payload){
    return{
        type:CHANGE_MSG,
        payload
    }
}
function addFooCountAction(payload){
    return{
        type:ADD_FUNC,
        payload
    }
}
function subFooCountAction(payload){
    return{
        type:SUB_FUNC,
        payload
    }
}
function musicListAction(params){
return function(dispatch) {
    fetchQqMusic(params).then(res=>{
        console.log('-----', res)
        // 这才是真正地把后端数据，发送到store中
        dispatch({
        type: MUSIC_LIST,
        payload: res.song.list
        })
    })
    }
}


// 商品列表
function goodlistAction(params) {
    return dispatch=>{
        fetchGoodList(params).then(res=>{
            console.log('商品列表', res)
            dispatch({type: GOOD_LIST, payload: res})
        })
    }
}

//品类列表
function cateslistAction(params) {
    return dispatch=>{
        fetchCatesList(params).then(res=>{
            console.log('品类列表', res)
            dispatch({type: CATES_LIST, payload: res.list})
        })
    }
}
//商品详细信息
function gooddetailAction(params) {
    return dispatch=>{
        fetchGoodDetail(params).then(res=>{
            console.log('商品详情', res)
            dispatch({type: GOOD_DETAIL, payload: res})
        })
    }
}

//清空商品信息
function cleardetailAction() {
    return {
        type:DEL_DETAIL,
        payload:{}
    }
}
export {
    CHANGE_MSG,
    ADD_FUNC,
    SUB_FUNC,
    MUSIC_LIST,
    GOOD_LIST,
    CATES_LIST,
    GOOD_DETAIL,
    DEL_DETAIL,


    changeMsgAction,
    addFooCountAction,
    subFooCountAction,
    musicListAction,
    goodlistAction,
    cateslistAction,
    gooddetailAction,
    cleardetailAction
}
