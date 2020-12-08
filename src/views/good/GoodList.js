import React,{useEffect,useState} from 'react'
import { Table, Tag, Space,Button,Row, Col, Divider } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import action from '@/store/actions'
import img from '@/utils/img'
import moment from 'moment'

const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      render: (text,row) => {
        return (
          <div>
            <img src={img.imgBase+row.url} alt={row.name}/>
            <a>{text}</a>,
      </div>
        )
    }},
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      sorter:(a,b)=>(a.price-b.price),
      render:text=>(<div>
        {"￥"+text}
      </div>)
    },
    {
      title: '是否热销',
      key: 'hot',
      dataIndex: 'hot'
    },
    {
      title: '上架时间',
      key: 'time',
    },
    {
      title: '操作',
      key: 'op',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    }
  ];

  const data = [];

export default (props)=>{
  const disPath=useDispatch()
  const goodData=useSelector(store=>store.good.goodData)
  let [page,setPage]=useState(1)
  let [size,setsize]=useState(3)
  console.log('props属性',props)
  useEffect(()=>{
    let params={
      size,
      page
    }
    disPath(action.goodListAction(params))
    return undefined
  },[page,size])
    return (
        <div>
            <Row>
            <Col  span={19} offset={1} align="center">
            <h2  >商品列表</h2>
            </Col>
            <Col  span={4} align="center">
            <Button type="primary" shape="round">新增</Button>
            </Col>
            </Row>
            <Row>
            <Col  span={19} offset={1} align="center">
            <h4>商品筛选</h4>
            </Col>
            </Row>
            <Table columns={columns} dataSource={goodData} />
        </div>
    )
}
