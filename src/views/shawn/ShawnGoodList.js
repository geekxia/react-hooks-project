
import React,{useState,useEffect} from 'react'
import { Table, Tag, Space,Button } from 'antd';
import '@/assets/css/common.scss'
import {useSelector,useDispatch} from 'react-redux'
import action from '@/store/actions'
import img from '@/utils/img'
import moment from 'moment'



export default props => {
  
  let [page, setPage] = useState(1)
  let [size, setSize] = useState(2)
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.list.goodData)

  useEffect(()=>{
    let params={
      page,
      size
    }
    dispatch(action.goodListAction(params))
    return undefined
  },[page,size])

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text,row,idx) => {
      return(<div className='shawngood_img'>
        <img src={img.imgBase+row.img} alt='图片加载失败'/>
        <a>{text}</a>
      </div>)},
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align:'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      sorter:(a,b)=>a.price-b.price,
      align:'center',
      render: text => <div>{'￥'+text}</div>,
  
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align:'center',
      render: text => <div>{text?'是':'否'}</div>,
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align:'center',
      render: text => <div>{moment(text).format('YYYY-MM-DD HH:mm')}</div>,
    },
    {
      title: '操作',
      key: 'tags',
      dataIndex: 'tags',
      align:'center',
      render: tags => (
        <>
            <Button type="primary">删除</Button>&nbsp;
            <Button type="primary" onClick={()=>props.history.replace('/shawngoodlist/detail')}>编辑</Button>
        </>
      ),
    },
  ];
  


  return (
    <div className='shawngood_list'>
      <h1>商品列表</h1>
      <p>查询条件</p>
      <div className='shawngood_table'>
       <Table 
        rowKey='_id'
        columns={columns} 
        dataSource={goodData.list} 
        pagination ={{
          total: goodData.total,
          defaultPageSize:size,
          pageSizeOptions:[2,5,10,20],
          onChange:page=>setPage(page),
          onShowSizeChange: (page, size)=>setSize(size)
        }}
       />
      </div>
    </div>
  )
} 
