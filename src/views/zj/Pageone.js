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
    let [title,setTitle]=useState([])
    const changemusic=(e)=>{
        if(e.keyCode===13){
        dispatch(action.changeMusicList(e.target.value))
        setPage(1)
        // console.log(list)
        setTitle(list.map(ele=>ele.album.title))
        // console.log(list[0].album.name)
        }
    }
    const hotGoods= [
        { id: 1, name: "没有相关数据哦~" },
        { id: 2, name: "暂时没有信息哦~" },
        { id: 3, name: "这栏暂时没有相关信息哦~" },
        { id: 4, name: "正在更新词条中..." },
        { id: 5, name: "已加急更新信息了~" },
        { id: 6, name: "没得信息哦~" },
      ]
      const random=()=>{
        return hotGoods[Math.floor(Math.random()*hotGoods.length)].name
      }
    const columns = [
        {
            title: '歌曲',
            dataIndex: 'name',
            key: 'name',
            className:'songlist',
            render: text => <a >{text}</a>,
        },
        {
            title: '相关信息',
            dataIndex: 'lyric',
            ellipsis:true,
            key:'lyric',
            align: 'left',
            render: (
                text => <a style={{color:'black'}}>{text?text:random()}</a>
            ),
        },
        {
            title: '专辑',
            dataIndex:['album','title'],
            key: ['album','title'],
            ellipsis:true,
            align: 'left',
        },
        {
            title: '上架时间',
            dataIndex: 'time_public',
            key: 'time_public',
            align: 'center',
            sorter: (a, b) => a.time_public - b.time_public,

        },
        
    ];
    const changevalue=(e)=>{
        setA(e.target.value)
        // console.log(list);
    }
    const search=()=>{
        // console.log(a);
        dispatch(action.changeMusicList(a))
        setPage(1)
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
        <div className='singerBox'>
            <div className='imgbox'>
                <img src="//y.gtimg.cn/music/photo_new/T001R150x150M0000039EKtl4ec7wv.jpg?max_age=2592000" alt=""/>
            </div>
            <div className='singerDetail'>
                <span>歌手:  {keyword}</span>
                <span>单曲 <i>247</i></span>
                <span>专辑 <i>41</i></span>
                <span>MV <i>107</i></span>
            </div>
        </div>
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