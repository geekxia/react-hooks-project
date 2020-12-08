import React, { useState, useEffect } from 'react'
import { Table, Form, Select, Spin, Modal, Button } from 'antd';
import { fetchGoodList  } from '@/utils/api.js';
import { LoadingOutlined } from '@ant-design/icons';
const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    sorter: true,
    render: name  => <span>{name}</span>,
    width: '20%'
  },
  {
    title: '图片',
    dataIndex: 'img',
    render: img =>
      (<img style={{display:"block",width: "60px",height:"50px"}} src={'http://10.20.158.29:9999' + img} />)
    
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
  {
    title: '操作',
    dataIndex: 'do',
    render: ()  => <><span style={{color:"blue",cursor:'pointer'}}>编辑</span ><span style={{color:"red",cursor:'pointer'}}>删除</span></>
  }
]
// const pagination = {
//   current: 1,
//   pagesize: 10,
//   pageSizeOptions: [2, 5, 10, 20],
//   total: total
// }

export default props => {
  let count = 0
  // { size, page, cate, hot, text }
  const [data, setDate] = useState([])
  const [total, setTotal] = useState(0)
  const [spins, setSpins] =useState(false)
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    text: ''
  })
  let [pagination, setPagination ]  = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [2, 5, 10, 20]
  })
  const [loading, setLoadinge] = useState(false)
  useEffect(()=> {
    fetchGoodList(params).then((res) =>{
      setDate(res.list)
      setTotal(res.total)
      setSpins(false)
      // pagination.total = res.total
    })
    return undefined
  },[params])
  var timer = null
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }}  />
  function handleTableChange (v) {
    setParams({
      page: v.current,
      size: v.pageSize,
      text: ''
    })
    setPagination({
      current: v.current,
      pageSize: v.pageSize,
      pageSizeOptions: [2, 5, 10, 20]
    })
  }
  function reset () {
    setSpins(true);
    setParams({
      page: 1,
      size: 10,
      text: ''
    })
    setPagination({
      current: 1,
      pagesize: 10,
      pageSizeOptions: [2, 5, 10, 20]
    })
  }
  // model
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const showModal = () => {
    setVisible(true)
  }
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  };
  const handleCancel = () => {
    setTimeout(() => setVisible(false) )
  }
  return (
    <>
      <div className='header'>
        <h1>查询表格</h1>
        <div>
          <span  onClick={showModal}>
            + &nbsp; 新建
            <Modal
              title="Title"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
            </Modal>
          </span>
          <span onClick={reset}>刷新</span>
          <Spin indicator={antIcon} spinning={spins} />
        </div>
      </div>
      <Table
        columns={columns}
        // rowKey={record => record.login.uuid}
        rowKey = '_id'
        dataSource={data}
        pagination={{ total, ...pagination }}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  )
}