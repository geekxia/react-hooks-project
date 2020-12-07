
import React,{useState,useEffect} from 'react'
import { Table, Tag, Space } from 'antd';
import '@/assets/css/common.scss'
import {useSelector,useDispatch} from 'react-redux'
import action from '@/store/actions'



const columns = [
  {
    title: '商品',
    dataIndex: 'name',
    key: 'name',
    algin:'center',
    render: text => <div>
      
      <a>{text}</a>
    </div>,
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
    key: 'desc',
    algin:'center',
    render: text => <a>{text}</a>,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    algin:'center',
  },
  {
    title: '是否热销',
    dataIndex: 'hot',
    key: 'hot',
    algin:'center',
    render: text => <div>{text?'是':'否'}</div>,
  },
  {
    title: '上架时间',
    dataIndex: 'create_time',
    key: 'create_time',
    algin:'center',
  },
  {
    title: '操作',
    key: 'tags',
    dataIndex: 'tags',
    algin:'center',
    render: tags => (
      <>
          <a href=''>删除</a>&nbsp;
          <a href=''>编辑</a>
      </>
    ),
  },
];






export default props => {
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.list.goodData)

  useEffect(()=>{
    dispatch(action.goodListAction())
    return undefined
  },[])

  console.log('store',goodData)
  return (
    <div className='shawngood_list'>
      <h1>商品列表</h1>
      <p>查询条件</p>
      <div className='shawngood_table'>
       <Table columns={columns} dataSource={goodData.list} />
      </div>
    </div>
  )
} 
