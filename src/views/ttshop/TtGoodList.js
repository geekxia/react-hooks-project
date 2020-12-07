import { 
    Table,
    Tag,
    Space,
    Image,
    Button,
    Row,
    Col
} from 'antd'

import  action  from '@/store/actions'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react'

import img from '@/utils/img'

import moment from 'moment'

export default props => {

  const dispatch = useDispatch()
  const goodList = useSelector(store=>store.ttGood.goodList)

  let [page, setPage] = useState(1)
  let [size, setSize] = useState(5)

  useEffect(()=>{
    let params = {
      size,
      page
    }
    dispatch(action.goodListAction(params))
    return undefined
  },[page,size])

  const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        align: 'center',
        key: 'name',
        render: (text,record,index) => {
          return (
            <div>
              <Image
                width={100}
                src={img.imgBase + record.img}
              />
              <p>{text}</p>
            </div>
          )
        }
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        align: 'center',
        key: 'desc',
      },
      {
        title: '上架时间',
        dataIndex: 'create_time',
        align: 'center',
        key: 'create_time',
        render: text=>{
          return(
            <>
              <div>{moment(text).format('YYYY年MM月DD日')}</div>
              <div>{moment(text).format('hh:mm:ss')}</div>
            </>
          )
        }
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        align: 'center',
        key: 'price',
        sorter: (a, b) => a.age - b.age,
        render: text=> <div>{'￥'+ text}</div>
      },
      {
        title: '是否热销',
        key: 'hot',
        align: 'center',
        dataIndex: 'hot',
        render: text=><div>{ text ? '是': '否'} </div>
      },
      {
        title: '操作',
        align: 'center',
        key: 'tags',
        render: () => (
          <Space size="middle">
            <a>编辑</a>
            <a>删除</a>
          </Space>
        ),
      },
  ];
  return (
    <div className="tt-good-list">
      <h1>商品列表</h1>
      <Row justify="end">
        <Col>
          <Button style={{margin: '20px 0'}} onClick={()=>props.history.replace('/ttgood/add')} type="primary">新增商品</Button>
        </Col>
      </Row>
      
      <div>
        <Table 
          rowKey="_id" 
          columns={columns} 
          dataSource={goodList.list} 
          pagination={{
            total: goodList.total,
            defaultPageSize: size,
            onchange: page=>setPage(page), 
            onShowSizeChange: (page,size)=>setSize(size),
            pageSizeOptions: [5,10,20]
          }}
        />
      </div>
    </div>
  )
}