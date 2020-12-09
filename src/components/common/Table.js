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
import { useDispatch, useSelector } from 'react-redux'
import { cateListAction,fetchDelCartAction,fetchDelGOODAction, goodListAction, goodDtailAction } from '@/store/actions'
import { fetchGoodList, getCartList,GoodAddOrEdit  } from '@/utils/api.js'
import { LoadingOutlined } from '@ant-design/icons'
import UploadS  from '@/components/common/upload'

export default props => {
  // 表头
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
      render: (a,b,c)  => <><span style={{color:"blue",cursor:'pointer'}} onClick={()=>editRow(a,b,c)}>编辑</span ><span style={{color:"red",cursor:'pointer'}} onClick={() => delRow(a,b,c)}>删除</span></>
    }
  ]
  var timer = null
  const dispatch = useDispatch()
  const good = useSelector(state => state.good)
  const [spins, setSpins] =useState(false)
  const [params, setParams] = useState({
    page: 1,
    size: 10,
     ...props.fillters
  })
  var [code,setCode ]  =  useState(-1)
  const [loading, setLoadinge] = useState(false)
  useEffect(()=> {
      if (Object.keys(props.fillters).length == 0 || code == 0) {
        setSpins(false)
        dispatch(goodListAction(params))
        setCode(-1)
      }
    return undefined
  }, [params])
  useEffect(()=> {
    dispatch(goodListAction(props.fillters))
    return undefined
  },[props.fillters])
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }}  />
  function handleTableChange (v) {
    setParams({
      page: v.current,
      size: v.pageSize
    })
    setCode(0)
  }
  function reset () {
    setSpins(true)
    setParams({
      page: 1,
      size: 10
    })
    setCode(0)
  }
  // model
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const showModal = () => {
    setVisible(true)
  }
  const handleOk = () => {
    setCode1(1)
    clearTimeout(timer)
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    timer = setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  };
  const handleCancel = () => {
    setCode1(1)
    clearTimeout(timer)
    timer = setTimeout(() => setVisible(false) )
  }
  //form 
  const [componentSize, setComponentSize] = useState('default')
  const [form] = Form.useForm()
  const [code1, setCode1] = useState(1)
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size)
  }
  useEffect(() => {
    // if (code1 == 0 && good.goodDetail._id && good.goodDetail.img.indexOf('http') ==-1) {
    if (code1 == 0 && good.goodDetail._id) {
      form.setFieldsValue({ user: good.goodDetail, id: good.goodDetail._id })
      setVisible(true)
    }
    return undefined
  })
  const onFinish = (v) => {
    if (!v.user.hot) {
      v.user.hot = false
    }
    v.user.id = v.id
    GoodAddOrEdit(v.user)
  }
  // eitd
  const editRow = (_,b,) => {
    setCode1(0)
    dispatch(goodDtailAction({id: b._id}))
    // console.log(b)
  }
  // rowdel
  const delRow = (_,b) => {
    // console.log(b)
    dispatch(fetchDelGOODAction({ id: b._id }))
  }

  // tab checked
  const [selectID, setSelectID ] = useState('')
  const [checkStrictly, setCheckStrictly] = React.useState(false)
  const rowSelection = {
    onChange: (selectedRowKeys, _selectedRows) => {
      if (selectedRowKeys.length > 0)
      setSelectID({id : selectedRowKeys.join(';')})
      // 
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows,changeRows) => {
      // 所有被选择的行的 id
    },
  }
  // someRowdel 
  const delSome = () => {
    if (selectID.length > 0) {}
    dispatch(fetchDelGOODAction({ id: selectID }))
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
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                // initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={onFinish}
              >
                <Form.Item name="id" style={{height:0}}>
                  <span></span>
                </Form.Item>
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
                    { good.cate.map(ele => {
                        return(<Select.Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Select.Option>)
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="你的帅照" name={['user', 'img']}>
                  <UploadS img={'http://10.20.158.29:9999'} ></UploadS>
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
        dataSource={good.goodlist.list}
        pagination={{ 
          total: good.goodlist.total,
          pageSizeOptions: [2, 5, 10, 20],
          current :params.page,
          pageSize: params.size
          }}
        loading={loading}
        rowSelection={{ ...rowSelection, checkStrictly }}
        onChange={handleTableChange}
        footer={()=> <Button onClick={()=> delSome() }>部分删除</Button>} 
      />
    </>
  )
}