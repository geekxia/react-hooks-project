// 这个action.type常量，相当于字典索引，避免在团队协作时产生命名冲突
// action 是 视图和Store之间的纽带，actions和reducer是间接关系
// action 是怎么从视图中抵达Store？是使用 dispatch(action)

const CHANGE_MSG = 'CHANGE_MSG'
const ADD_FOO_COUNT = 'ADD_FOO_COUNT'

const AJAX_MUSIC_LIST = 'AJAX_MUSIC_LIST'

const ADD_PRO = "ADD_PRO"

const XXL_GET_SHOP = "XXL_GET_SHOP"
const XXL_GET_CATES = "XXL_GET_CATES"
const XXL_GET_GOOD_INFO = "XXL_GET_GOOD_INFO"
const XXL_CLEAR_GOODINFO = "XXL_CLEAR_GOODINFO"

export default {
  CHANGE_MSG,
  ADD_FOO_COUNT,
  AJAX_MUSIC_LIST,
  ADD_PRO,
  XXL_GET_SHOP,
  XXL_GET_CATES,
  XXL_GET_GOOD_INFO,
  XXL_CLEAR_GOODINFO
}
