import { Table, Tag, Space } from 'antd'
import moment from 'moment';

export default props => {

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '价钱',
      dataIndex: 'price',
      key: 'price',
      render: text=> <div>{'￥'+'00'}</div>
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      render: text=> <div>{}</div>
    },
    {
      title: '创建时间',
      dataIndex: 'ceateTime',
      key: 'ceateTime',
      render: text=> <div>{}</div>
    },
    
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
         <button>删除</button>
         <a href='/#/hml/add'><button >编辑</button></a>
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      name: '毛衣',
      price: 320,
      num:2,
      ceateTime:'',
      action:'action'
    },
    {
      key: '2',
      name: '奶粉',
      price: 300,
      num:1,
      ceateTime:'',
      action:'action'
    },
    {
      key: '3',
      name: '鸭脖',
      price: 5,
      num:1,
      ceateTime:'',
      action:'action'
    },
    
  ]

 
  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div>
        查询条件
      </div>
      <div style={{float:'right'}} className='add'>
        <a href='/#/hml/add'><button >增加</button></a>
      </div>
      <div style={{margin: '20px 0'}}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}
