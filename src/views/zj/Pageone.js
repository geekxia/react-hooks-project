import React, { useEffect,useState } from 'react'
import { Table, Tag, Space } from 'antd';
import {
  connect,
  useSelector,
  useDispatch
} from 'react-redux'

import action from '@/store/actions'
import './style.scss'
export default props=>{
    
    const list = useSelector(store=>store.music.list)
    const keyword=useSelector(store=>store.music.keyword)
    const dispatch = useDispatch() // 派发，派发的是actions
    let [a,setA]=useState("")
    let [page, setPage] = useState(1)
    const changemusic=(e)=>{
        if(e.keyCode===13){
        dispatch(action.changeMusicList(e.target.value))
        console.log(list)
        console.log(list[0].album.name)
        }
    }
    const columns = [
        {
            title: '歌曲',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '相关信息',
            dataIndex: 'lyric'?'lyric':keyword,
            key:'lyric'?'lyric':keyword,
            align: 'center',
        },
        {
            title: '上架时间',
            dataIndex: 'time_public',
            key: 'time_public',
            align: 'center',

        },
        {
            title: '专辑',
            dataIndex: 'time_public',
            key: 'time_public',
            align: 'center',

        },
        
    ];
    const changevalue=(e)=>{
        setA(e.target.value)
        console.log(list);
    }
    const search=()=>{
        console.log(a);

        dispatch(action.changeMusicList(a))
    }
    const changePage=flag=>{
        if(flag==='prev'&&page<=1)return false
        setPage(flag==='next'?++page:--page)
    }
    useEffect(()=>{
        const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61453023483879617&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%BC%A0%E6%9D%B0&g_tk_new_20200303=921856724&g_tk=921856724&loginUin=448914712&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
        const params = {}
        str.split('&').map(ele=>{
        let arr = ele.split('=')
        params[arr[0]] = arr[1]
        })
        params.w = decodeURI(keyword)
        params.p=page

        dispatch(action.musicListAction(params))
        return undefined
    }, [keyword,page])
    return(
        <div className='Pageone'>
            <input 
                type="text"
                placeholder={keyword}
                onKeyUp={(e)=>changemusic(e)}
                onBlur={(e)=>changevalue(e)}
            />
        <button className='search' onClick={()=>search()}>搜索</button>
        <Table 
            columns={columns} 
            dataSource={list} 
            rowKey='id'
        />
        <button className='changePage' onClick={()=>changePage('prev')}>上一页</button>
        <button className='changePage' onClick={()=>changePage('next')}>下一页</button>
        </div>
    )
}