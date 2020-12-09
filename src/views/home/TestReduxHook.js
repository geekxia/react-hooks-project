import React,{useEffect} from 'react'

import {
  useSelector,
  useDispatch
} from 'react-redux'

import action from '@/store/actions'

export default props => {
  const dispatch = useDispatch()
  useEffect(()=>{
    const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=64268164115915577&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    const params = {}
    str.split('&').map(ele=>{
      let arr = ele.split('=')
      params[arr[0]] = arr[1]
    })
    params.w = decodeURI(params.w)
    dispatch(action.musicListAction(params))
    return undefined
  },[])
  return (
    <div>
      <h1>首页</h1>
      <hr/>
    </div>
  )
}
