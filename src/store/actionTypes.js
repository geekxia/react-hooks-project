// 这个action.type常量，相当于字典索引，避免在团队协作时产生命名冲突
// action 是 视图和Store之间的纽带，actions和reducer是间接关系
// action 是怎么从视图中抵达Store？是使用 dispatch(action)

const CHANGE_MSG = 'CHANGE_MSG'
const ADD_FOO_COUNT = 'ADD_FOO_COUNT'
const DETAILLIST='DETAIL_LIST'
const AJAX_MUSIC_LIST = 'AJAX_MUSIC_LIST'
const Obj= {
  CHANGE_MSG,
  ADD_FOO_COUNT,
  AJAX_MUSIC_LIST,
  DETAILLIST
}
export default Obj
