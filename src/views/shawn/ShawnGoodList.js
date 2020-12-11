
import React,{useState,useEffect} from 'react'
import { 
  Table,
  Row, 
  Col,
  Input,
  Button,
  Select,
  Modal
} from 'antd';
import '@/assets/css/common.scss'
import {useSelector,useDispatch} from 'react-redux'
import action from '@/store/actions'
import img from '@/utils/img'
import moment from 'moment'
import ShawnCateSelect from './components/ShawnCateSelect'
import api from '@/utils/api'
import {
  ExclamationCircleOutlined
} from '@ant-design/icons'

const { Option } = Select;
const { confirm } = Modal

export default props => {
  let [all, setAll] = useState(true)
  let [text, setText] = useState('')
  let [page, setPage] = useState(1)
  let [size, setSize] = useState(2)
  let [keys, setKeys] = useState([])
  let [filter, setFilter] = useState({
    page,
    size,
    text:'',
    hot:'',
    all:true
  })
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.list.goodData)


  const textChange = val => {
    setText(val)
    if(!val) {
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }
  const filterChange = (key, val) => {
    filter[key] = val
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
  }

  const ShawngoodlistDel=(row)=>{
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: <div>你确定要删除 {row.name} 吗？</div>,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        api.fetchGoodDel({id:row._id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    })
  }

  const mulDelete = () => {
    let id = ''
    keys.map(ele=>id+=(';'+ele))
    api.fetchGoodDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }

  const skipToEdit=row=>{
    console.log(row)
    props.history.push('/shawngoodlist/detail/'+(row?row._id:0))
  }

  useEffect(()=>{
    dispatch(action.goodListAction(filter))
    return undefined
  },[filter])

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text,row,idx) => {
      return(<div className='shawngood_img'>
        <img src={img.imgBase+row.img} alt='图片加载失败'/>
        <a>{text}</a>
      </div>)},
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align:'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '品类',
      dataIndex: 'cate',
      key: 'cate',
      align:'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      sorter:(a,b)=>a.price-b.price,
      align:'center',
      render: text => <div>{'￥'+text}</div>,
  
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align:'center',
      render: text => <div>{text?'是':'否'}</div>,
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align:'center',
      render: text => <div>{moment(text).format('YYYY-MM-DD HH:mm')}</div>,
    },
    {
      title: '操作',
      key: 'tags',
      dataIndex: 'tags',
      align:'center',
      render: (text,row)  => (
        <>
            <Button type="primary" onClick={()=>ShawngoodlistDel(row)}>删除</Button>&nbsp;
            <Button 
              type="primary" 
              onClick={()=>skipToEdit(row)}
            >编辑</Button>
        </>
      ),
    },
  ];
  


  return (
    <div className='shawngood_list'>
      <h1>商品列表</h1>
      <div className='shawngood_search'>
        <Row justify='space-between'>
          <Col span={2}>
            <p className='shawngood_searchtxt'>搜索:</p>
          </Col>
          <Col span={6}>
            <Input
              value={text}
              onChange={e=>textChange(e.target.value)}
              placeholder="搜索"
              allowClear
              onPressEnter={e=>filterChange('text', e.target.value)}
            />
          </Col>
          <Col span={2}>
            <p className='shawngood_searchtxt'>品类:</p>
          </Col>
          <Col span={4}>
            <ShawnCateSelect  
              hasAll={filter.all}
              allowClear
              onChange={cate=>filterChange('cate', cate)}
            />
          </Col>
          <Col span={2}>
            <p className='shawngood_searchtxt'>状态:</p>
          </Col>
          <Col span={3}>
          <Select 
            placeholder="全部" 
            style={{ width: 120 }} 
            allowClear
            onChange={val=>filterChange('hot', val)}
          >
            <Option value="全部">全部</Option>
            <Option value={true}>是</Option>
            <Option value={false}>否</Option>
          </Select>
          </Col>
          <Col span={2} offse={3} className='shawngood_add'>
            <Button 
              type="primary"
              danger
              onClick={(row)=>props.history.push('/shawngoodlist/detail/'+(row?row._id:0))}
            >新增</Button>
          </Col>
        </Row>
      </div>
      <div className='shawngood_table'>
       <Table 
        rowKey='_id'
        columns={columns} 
        dataSource={goodData.list} 
        pagination ={{
          current: filter.page,
          total: goodData.total,
          defaultPageSize:filter.size,
          pageSizeOptions:[2,5,10,20],
          onChange:page=>filterChange('page',page),
          onShowSizeChange: (page, size)=>filterChange('size',size)
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: keys=>setKeys(keys)
        }}
        footer={() => <Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
        size='small'
       />
      </div>
    </div>
  )
} 
