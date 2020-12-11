import type from './actionTypes'
import { 
  fetchQqMusic,
  fetchGoodList,
  fetchCates
} from '@/utils/api'

// action 生成器
function changeMsgAction(payload) {
  return {
    type: type.CHANGE_MSG,
    payload
  }
}

function addFooCountAction(payload) {
  return {
    type: type.ADD_FOO_COUNT,
    payload
  }
}

// redux不支持异步数据
function musicListAction(params) {
  return function(dispatch) {
    fetchQqMusic(params).then(res=>{
      // console.log('-----', res)
      // 这才是真正地把后端数据，发送到store中
      dispatch({
        type: type.AJAX_MUSIC_LIST,
        payload: res.song.list
      })
    })
  }
}

// 商品列表
function getGoodList(params){
  return dispatch=>{
    fetchGoodList(params).then(res=>{
      // console.log('商品列表',res)
      dispatch({type:type.GET_GOOD_LIST,payload:res})
    })
  }
}

// 种类列表
const  getCatesAction=params=>{
  return dispatch=>{
    fetchCates(params || {}).then(res=>{
      // console.log('商品种类',res)
      dispatch({type:type.GET_GOOD_CATES,payload:res.list})
    })
  }
}

export default {
  changeMsgAction,
  addFooCountAction,
  musicListAction,
  getGoodList,
  getCatesAction
}
