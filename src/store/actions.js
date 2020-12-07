import type from './actionTypes'
import { 
  fetchQqMusic,
  fetchFoodList,
  fetchGoodList 
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

function foodListAction(params) {
  return function(dispatch) {
    fetchFoodList(params).then(res=>{
      console.log('fetchFoodList',res);
      dispatch({
        type: type.AJAX_FOOD_LIST,
        payload: res.list
      })
    })
  }
}

function foodNameAction(payload) {
  return {
    type: type.AJAX_FOOD_NAME,
    payload
  }
}

function goodListAction(params) {
  return function(dispatch) {
    fetchGoodList(params).then(res=>{
      console.log('fetchGoodList',res);
      dispatch({
        type: type.TT_GOOD_LIST,
        payload: res
      })
    })
  }
}

export default {
  changeMsgAction,
  addFooCountAction,
  musicListAction,
  foodListAction,
  foodNameAction,
  goodListAction
}
