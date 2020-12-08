
import { fetchQqMusic,fetchGoodList} from '@/utils/api'
const CHANGE_MSG='CHANGE_MSG'
const ADD_FUNC='ADD_FUNC'
const SUB_FUNC='SUB_FUNC'
const MUSIC_LIST='MUSIC_LIST'
const GOOD_LIST='GOOD_LIST'

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
export {
    CHANGE_MSG,
    ADD_FUNC,
    SUB_FUNC,
    MUSIC_LIST,
    GOOD_LIST,


    changeMsgAction,
    addFooCountAction,
    subFooCountAction,
    musicListAction,
    goodlistAction
}
