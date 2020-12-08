import { Table, Tag, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
export default props => {
  const dispatch = useDispatch()
  const goodData = useSelector(store => store.good.goodData)
  let [page, setPage] = useState(1)
  let [size, setSize] = useState(2)
  useEffect(() => {
    let params = {
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  }, [page, size])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: text => <div>{text + '00'}</div>
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
  ]

  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div>
        查询条件
      </div>
      <div style={{ margin: '20px 0' }}>
        <Table columns={columns} dataSource={data}
          rowKey='_id'
          columns={columns}
          dataSource={goodData.list}
          pagination={{
            total: goodData.total,
            defaultPageSize: size,
            onChange: page => setPage(page),
            onShowSizeChange: (page, size) => setSize(size),
            pageSizeOptions: [2, 5, 10, 15, 20]
          }}
        />
      </div>
    </div>
  )
}
