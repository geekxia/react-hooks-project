

import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import action from '@/store/actions'
    


export default props => {
  const dispatch = useDispatch()
  const list = useSelector(store=>store.music.list)
  let [page, setPage] = useState(1)
  useEffect(()=>{
      const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61453023483879617&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%BC%A0%E6%9D%B0&g_tk_new_20200303=921856724&g_tk=921856724&loginUin=448914712&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
      const params = {}
      str.split('&').map(ele=>{
        let arr = ele.split('=')
        params[arr[0]] = arr[1]
      })
      params.w = decodeURI(params.w)
      params.p = page
      dispatch(action.musicListAction(params))
      return undefined
  },[page])
  const changePage = flag => {
    if(flag==='prev' && page<=1) return alert('已经是第一页了')
    setPage(flag==='next' ? ++page : --page)
  }

  return (
    <div>
      <h1>testRedux</h1>
      <hr/>
      {
        list.map(ele=>(
          <div key={ele.id}>
            <span>{ele.id}</span>
            <span>---</span>
            <span>{ele.name}</span>
          </div>
        ))
      }
      <div>
        <button onClick={()=>changePage('prev')}>上一页</button>
        <button onClick={()=>changePage('next')}>下一页</button>
      </div>
    </div>
  )
} 
