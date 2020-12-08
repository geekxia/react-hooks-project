import { 
  Table,
  Button,
  Row,
  Col,
  Input,
  Select,
  Modal
} from 'antd'
import {
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import moment from 'moment'
import './style.scss'
import CateSelect from './components/CateSelect'
import api from '@/utils/api'

export default props => {

  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  const cates = useSelector(store=>store.good.cates)
  const { Option } = Select
  const { confirm } = Modal

  let [text,setText] = useState('')
  let [keys,setKeys] = useState('')
  let [filter,setFilter] = useState({
    page: 1,
    size: 3,
    text: ''
  })
  useEffect(()=>{
    dispatch(action.goodListAction(filter))
    return undefined
  }, [filter])

  const textChange = val => {
    console.log('value text', val)
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
    console.log('filter', filter)
  }

  // 删除操作
  const handleDel = row => {
    const ele = <span style={{color: 'red'}}>{row.name}</span>
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: <div>你确定要删除 {ele} 吗？</div>,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        api.fetchGoodDel({id:row._id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    })
  }
  // 批量操作
  const mulDelete = ()=>{
    console.log('keys',keys)
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: <div>你确定要删除吗？</div>,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        let id = ''
        keys.map(ele=>id+=(';'+ele))
        // 向后端传递由 id 组成的字符串，不能传数组
        api.fetchGoodDel({id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    })    
  }

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text,row,idx) => {
        return (
          <div className='gl-good'>
            <img src={img.imgBase+row.img} alt={row.name} />
            <a>{text}</a>
          </div>
        )
      },
    },
    {
      title: '品类',
      dataIndex: 'cate',
      key: 'cate',
      align: 'center',
      render: cate=>{
        const idx = cates.findIndex(ele=>ele.cate===cate)
        return <span>{idx>=0?cates[idx].cate_zh:''}</span>
      }
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render: text=> <div>{'￥'+text}</div>
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align: 'center',
      render: text=> <div>{text?'是':'否'}</div>
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render: text=> {
        return(
          <>
            <div>{moment(text).format('YYYY年MM月DD日')}</div>
            <div>{moment(text).format('hh:mm:ss')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      key: 'tags',
      align: 'center',
      dataIndex: 'tags',
      render: (text,row) => (
        <>
          <div className="operation">
            <a onClick={()=>handleDel(row)} className="del">删除</a>
            <a>编辑</a>
          </div>
        </>
      ),
    }
  ]

  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div>
        <Row>
          <Col span={2}>
            <span className='filter-label'>名称搜索:</span>
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
            <span className='filter-label'>商品品类:</span>
          </Col>
          <Col span={4}>
            <CateSelect 
              hasAll 
              onChange={cate=>filterChange('cate', cate)}
              allowClear
            />
          </Col>
          <Col span={2}>
            <span className='filter-label'>状态:</span>
          </Col>
          <Col span={4}>
            <Select
              onChange={val=>filterChange('hot', val)}
              style={{width: '100px'}}
              allowClear
              defaultValue=''
            >
              <Option key='1' value=''>全部</Option>
              <Option key='2' value={true}>是</Option>
              <Option key='3' value={false}>否</Option>
            </Select>
          </Col>

          <Col span={2} offset={2} style={{textAlign:"right"}}>
            <Button value="default" shape="round" onClick={()=>{props.history.push('/good/update')}}>新增</Button>
          </Col> 
        </Row>               
      </div>
      <div style={{margin: '20px 0'}}>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={goodData.list}
          pagination={{
            current: filter.page,
            total: goodData.total,
            showSizeChanger: true,
            defaultPageSize: filter.size,
            onChange: page=>filterChange('page', page),
            onShowSizeChange: (page, size)=>filterChange('size', size),
            pageSizeOptions: [3,6,10,15,20]
          }}
          rowSelection={{
            type: 'checkbox',
            onChange: keys=>setKeys(keys),
          }}
          footer={() => <Button size='middle' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
          size='small'
        />
      </div>
    </div>
  )
}
