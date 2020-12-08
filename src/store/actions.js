import type from './actionTypes'
import { fetchQqMusic,fetchGoodList,fetchCates } from '@/utils/api'

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

// 页面中要使用 QQ 音乐列表？数据从后端来，要状态管理工具里来
// 状态管理工具有这个QQ音乐列表？没有，我定义，怎么定义？
// 在子reducer中定义完成，在根store中合并
// 现在我要在页面中使用 音乐列表，怎么使用？useSelector()

// 已经知道QQ音乐数据来自后端，它必须经过store才能进入组件。
// 那QQ音乐数据，该怎么进入到store？
// 使用 redux-thunk 来实现，把异步的action转化成多个同步的action

// redux不支持异步数据
function musicListAction(params) {
  return function(dispatch) {
    fetchQqMusic(params).then(res=>{
      console.log('-----', res)
      // 这才是真正地把后端数据，发送到store中
      dispatch({
        type: type.AJAX_MUSIC_LIST,
        payload: res.song.list
      })
    })
  }
}

function detailList(params){
  return function(dispatch){
   fetchGoodList(params).then(res=>{
    dispatch({
      type:type.DETAILLIST,
      payload:res
    })
   })
  }
}
function cateList(params){
  return function(dispatch){
    fetchCates(params||{}).then(res=>{
     dispatch({
       type:type.CATE_LIST,
       payload:res.list
     })
    })
   }
}

export default {
  changeMsgAction,
  addFooCountAction,
  musicListAction,
  detailList,
  cateList
}
