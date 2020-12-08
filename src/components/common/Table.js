import React, { useState, useEffect } from 'react'
import { 
  Table,
  Form,
  Spin,
  Modal, 
  Button,
  Input,
  Radio,
  Select,
  InputNumber,
  Switch, } from 'antd';
const { TextArea } = Input
import { fetchGoodList, getCartList,GoodAddOrEdit  } from '@/utils/api.js';
import { LoadingOutlined } from '@ant-design/icons';
import UploadS  from '@/components/common/upload'
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
  // { size, page, cate, hot, text }
  const [cates, setCates] = useState([])
  const [data, setDate] = useState([])
  const [total, setTotal] = useState(0)
  const [spins, setSpins] =useState(false)
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    text: '',
    
  })
  // let [filters, setFilters] = useState({})
  var filters = null
  // if (props.fillters.cate === '') {
  //   filters = props.fillters
  // }
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
  useEffect(() => {
    setParams({
      page: 1,
      size: 10,
      ...props.fillters
    })
    return undefined
  }, [filters])
  useEffect(()=> {
    getCartList({}).then((res) =>{
      if(res.list) {
        setCates(res.list)
      }
    })
    return undefined
  },[])
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
  const onFinish = (v) => {
    if (!v.user.hot) {
      v.user.hot = false
    }
    console.log(v.user)
    GoodAddOrEdit(v.user).then(res => console.log(res))
  }
  //form 
  const [componentSize, setComponentSize] = useState('default')
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size)
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
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={onFinish}
              >
                <Form.Item label="Form Size" name="size">
                  <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="商品名称" name={['user', 'name']}>
                  <Input />
                </Form.Item>
                <Form.Item label='产品描述' name={['user', 'desc']}>
                  <TextArea></TextArea>
                </Form.Item>
                 <Form.Item label="Select" name={['user', 'cate']}>
                  <Select>
                    { cates.map(ele => {
                      return (
                      <Select.Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="你的帅照" name={['user', 'img']}>
                  <UploadS ></UploadS>
                </Form.Item>
                <Form.Item label="InputNumber"  name={['user', 'price']}>
                  <InputNumber min={1} max={99999} placeholder='3' />
                </Form.Item>
                <Form.Item valuePropName='checked' label="Switch" name={['user', 'hot']} >
                  <Switch  />
                </Form.Item>
                <Form.Item label="添加商品" >
                  <Button type="primary" htmlType="submit">Button</Button>
                </Form.Item>
              </Form>
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