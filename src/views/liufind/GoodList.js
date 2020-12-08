import React,{useEffect} from 'react'
import { Table, 
         Tag, 
         Space,
         Row, 
         Col,
       } from 'antd';
import action from '@/store/actions.js'

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
// 自带样式
const style = { background: '#0092ff', padding: '8px 0' };

const GoodList=()=>{
  // const dispatch = useDispatch()

  useEffect(()=>{
  //   let params = {
  //     size:2
      
  //   }
  //   dispatch(action.getGoodList(params))
    return undefined
  },[])
  return (
    <div>
      <h1>商品列表页面</h1>
      <div>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div style={style}>搜索</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default GoodList