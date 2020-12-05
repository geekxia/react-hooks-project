import React, { useEffect } from 'react'
import { Spin, Space } from 'antd';
import {
  connect,
  useSelector,
  useDispatch
} from 'react-redux'

import action from '@/store/actions'

// connect(fn1, fn2)()

function mapStateToProps(store) {
  return {
    msg: store.msg
  }
}
function mapDispatchToProps(store) {
  return {}
}


// 第1种写法：使用 connect() + 函数式组件
// export default connect(mapStateToProps, mapDispatchToProps)(props => {
//   console.log('home props', props)
//   return(
//     <div>
//       <h1>首页</h1>
//       <hr/>
//       <h1>{props.msg}</h1>
//     </div>
//   )
// })

// 第2种写法：使用 connect() + 类组件
// class Home extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>首页</h1>
//         <hr/>
//         <h1>{this.props.msg}</h1>
//       </div>
//     )
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Home)


// 第3种写法，使用 hooks + 函数式组件
export default props => {
  const msg = useSelector(store=>store.study.msg)
  const count = useSelector(store=>store.study.foo.count)
  const list = useSelector(store=>store.music.list)
  let loading=useSelector(store=>store.study.loading)
  const dispatch = useDispatch() // 派发，派发的是actions
  const changeMsg = ()=>{
    // 我现在Home组件中，我想改变store中的msg
    // 触发一个actions，让它到store，再交给reducer
    // reducer是真正修改msg的地方，修改成功后返回store
    // 我Home自动更新
    dispatch(action.changeMsgAction('hello 2011'))
  }


  useEffect(()=>{
    const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61453023483879617&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%BC%A0%E6%9D%B0&g_tk_new_20200303=921856724&g_tk=921856724&loginUin=448914712&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    const params = {}
    str.split('&').map(ele=>{
      let arr = ele.split('=')
      params[arr[0]] = arr[1]
    })
    params.w = decodeURI(params.w)
    dispatch(action.musicListAction(params))
    return undefined
  }, [])
  return (
    <div>
      <Spin spinning={loading}>
        <h1>首页</h1>
        <hr/>
        <h1>{msg}</h1>
        <button onClick={()=>changeMsg()}>我要改变msg</button>
        <hr/>
        <h1>{count}</h1>
        <button onClick={()=>dispatch(action.addFooCountAction(500))}>我要改变count</button>
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
      </Spin>
    </div>
  )
}
