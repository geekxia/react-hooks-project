import React,{useEffect} from 'react'
import {
    // connect,
    useSelector,
    useDispatch,
    // useStore
} from 'react-redux'

import {
    addFooCountAction,
    subFooCountAction,
    changeMsgAction,
    musicListAction
} from '@/store/actions'
// import React from 'react'

// function mapStateToProps(store) {
//     return {
//         msg: store.msg
//         }
//     }
// function mapDispatchToProps(store) {
//     return {}
// }
// export default connect(mapStateToProps,mapDispatchToProps)(props=>{
//     console.log('home props',props)
//     return(
//         <div>
//             <h1>首页</h1>
//             <h1>{props.msg}</h1>
//         </div>
//     )
// })

// class Home extends React.Component{
//     render(){
//         return (
            // <div>
            // <h1>首页</h1>
            //     <h1>{this.props.msg}</h1>
            // </div>
//         )
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Home)


export default props=>{
    const msg=useSelector(store=>store.study.msg)
    const dispatch=useDispatch()
    const change=()=>{
        dispatch(changeMsgAction('hello dz'))
    }
    const count=useSelector(store=>store.study.foo.count)
    const list =useSelector(store=>store.music.list)
    const changecount=(type)=>{
        switch(type){
            case 'add':
                dispatch(addFooCountAction(5))
                break
            case 'sub':
                dispatch(subFooCountAction(10))
                break
        }
    }
    useEffect(()=>{
        const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61453023483879617&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%BC%A0%E6%9D%B0&g_tk_new_20200303=921856724&g_tk=921856724&loginUin=448914712&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
        const params = {}
        str.split('&').map(ele=>{
        let arr = ele.split('=')
        params[arr[0]] = arr[1]
        })
    params.w = decodeURI(params.w)
    dispatch(musicListAction(params))
        return undefined
    },[])
    return(
        <div>
            <h1>首页</h1>
            <h1>{msg}</h1>
            <button onClick={()=>{change()}}>点击</button>
            <h1>{count}</h1>
            <button onClick={()=>changecount('add')}>点击增加</button>
            <button onClick={()=>changecount('sub')}>点击减少</button>
            <hr />
            {
                list.map(ele=>(
                    <div>
                        <span>{ele.id}</span>
                        <span>--------</span>
                        <span>{ele.name}</span>
                    </div>
                ))
            }
        </div>
        
    )
}