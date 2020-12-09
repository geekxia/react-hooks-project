// 这个action.type常量，相当于字典索引，避免在团队协作时产生命名冲突
// action 是 视图和Store之间的纽带，actions和reducer是间接关系
// action 是怎么从视图中抵达Store？是使用 dispatch(action)

const CHANGE_MSG = 'CHANGE_MSG'
const ADD_FOO_COUNT = 'ADD_FOO_COUNT'

const AJAX_MUSIC_LIST = 'AJAX_MUSIC_LIST'
const ZTY_GOOD_LIST =  'ZTY_GOOD_LIST'
const ZTY_GOOD_CATES = 'ZTY_GOOD_CATES'
const ZTY_GOOD_DETAIL = 'ZTY_GOOD_DETAIL'
const ZTY_GOOD_DETAIL_CLEAR ='ZTY_GOOD_DETAIL_CLEAR'
export default {
  CHANGE_MSG,
  ADD_FOO_COUNT,
  AJAX_MUSIC_LIST,
  ZTY_GOOD_LIST,
  ZTY_GOOD_CATES,
  ZTY_GOOD_DETAIL,
  ZTY_GOOD_DETAIL_CLEAR
}
