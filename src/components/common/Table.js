import React, { useState, useEffect } from 'react'
import { Table } from 'antd';
import { fetchGoodList  } from '@/utils/api.js';

const columns = [
  {
    title: '规则名称',
    dataIndex: 'name',
    sorter: true,
    render: name  => <span>{name}</span>,
    width: '20%'
  },
  {
    title: '图片',
    dataIndex: 'img',
    render: (img) =>{
      (<img src={'http://10.20.158.29:9999' + img} />)
    }
  },
  {
    title: '描述',
    dataIndex: 'desc',
    render: desc  => <span>{desc}</span>,
    width: '20%'
  },
  {
    title: '价格',
    render: price  => <span>{price}</span>,
    dataIndex: 'price'
  },
  {
    title: '品类',
    dataIndex: 'cate',
    render: cate  => <span>{cate}</span>
  },
]
export default props => {
  // { size, page, cate, hot, text }
  const [pagination,setPagination ] = useState({
    page: 1,
    size: 10
  })
  const [data, setDate] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoadinge] = useState(false)
  useEffect(()=> {
    fetchGoodList(pagination).then((res) =>{
        setDate(res.list)
        setTotal(res.total)
      }
    )
    return undefined
  },[])
  function handleTableChange () {

  }
  return (
    <Table
      columns={columns}
      // rowKey={record => record.login.uuid}
      rowKey = {"sadasd"}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  )
}