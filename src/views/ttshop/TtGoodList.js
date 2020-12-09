import { 
  Table,
  Tag,
  Space,
  Image,
  Button,
  Row,
  Col,
  Input,
  Select,
  Modal
} from 'antd'

import  action  from '@/store/actions'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react'

import img from '@/utils/img'

import GoodCates from './ttcomponents/GoodCates'

import './style.scss'

import { ExclamationCircleOutlined } from '@ant-design/icons';

import { fetchGoodDel } from '@/utils/api'

import moment from 'moment'

const { Option } = Select
const { confirm } = Modal;

export default props => {

  const dispatch = useDispatch()
  const goodList = useSelector(store=>store.ttGood.goodList)
  const cateList = useSelector(store=>store.ttGood.cateList)

  let [text, setText] = useState('')
  let [keys, setKeys] = useState([])

  let [filter, setFilter] = useState({
    page: 1,
    size: 5,
    text: ''
  })

  const textChange = val =>{
    console.log('value text', val);
    setText(val)
    if(!val) {
      filter.text =''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }

  // 删除操作
  const handleDel = row => {
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除吗',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        fetchGoodDel({id:row._id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    });
  }

  // 批量删除
  const mulDelete = () => {
    let id = ''
    keys.map(ele=>id+=(';'+ele))
    // 向后端传递由 id 组成的字符串，不能传数组
    fetchGoodDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }

  const skipToEdit = row => {
    props.history.push('/ttgood/update/'+ (row?row._id:0))
  }

  const filterChange = (key,value)=>{
    filter[key]=value
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter',filter);
  }

  useEffect(()=>{
    dispatch(action.goodListAction(filter))
    return undefined
  },[filter])

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
                height={100}
                src={img.imgBase + record.img}
              />
              <p>{text}</p>
            </div>
          )
        }
      },
      {
        title: '商品类别',
        dataIndex: 'cate',
        align: 'center',
        key: 'cate',
        render: text=>{
          const idx = cateList.findIndex(ele=>ele.cate===text)
          return <span>{ idx>=0? cateList[idx].cate_zh: '' }</span>
        }
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        align: 'center',
        key: 'desc',
        width: '200px',
        render: text=><div className="table-desc">{text}</div>
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
        sorter: (a, b) => a.price - b.price,
        showSorterTooltip: 'true',
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
        render: (text,row) => (
          <Space size="middle">
            <Button type='primary'onClick={()=>skipToEdit(row)}>编辑</Button>
            <Button type='danger' onClick={()=>handleDel(row)}>删除</Button>
          </Space>
        ),
      },
  ];
  return (
    <div className="tt-good-list">
      <h1>商品列表</h1>
      <div style={{margin: '20px 0'}}>
        <Row align='middle'>
          <Col span={2} >
            <span className='filter-lable'>名称搜索:</span>
          </Col>
          <Col span={4}>
            <Input 
              placeholder='搜索' 
              onChange={e=>textChange(e.target.value)} 
              onPressEnter={e=>filterChange('text',e.target.value)}
              allowClear
            />
          </Col>
          <Col span={2}>
            <span className='filter-lable'>品类筛选:</span>
          </Col>
          <Col span={4}>
            <GoodCates 
              hasAll
              onChange={cate=>filterChange('cate',cate)}
              allowClear 
            />
          </Col>
          <Col span={2}>
            <span className='filter-lable'>状态筛选:</span>
          </Col>
          <Col span={4}>
            <Select
              style={{width: '100px'}}
              defaultValue=''
              onChange={val=>filterChange('hot',val)}
            >
              <Option key='1' value=''>全部</Option>
              <Option key='2' value={true}>是</Option>
              <Option key='3' value={false}>否</Option>
            </Select>
          </Col>
          <Col span={2} offset={4}>
            <Button onClick={()=>skipToEdit()} type="primary">新增商品</Button>
          </Col>
        </Row>
      </div>
      
      <div>
        <Table 
          rowKey="_id" 
          columns={columns} 
          dataSource={goodList.list} 
          local={{
            triggerDesc: '点击降序',
            triggerAsc: '点击升序',
            cancelSort: '取消排序'
          }}
          pagination={{
            total: goodList.total,
            current: filter.page,
            defaultPageSize: filter.size,
            onChange: page=>filterChange('page',page), 
            onShowSizeChange: (page,size)=>filterChange('size',size),
            pageSizeOptions: [2,4,5,10,20],
            showSizeChanger: true
          }}
          rowSelection={{
            type: 'checkbox',
            onChange: keys=>setKeys(keys)
          }}
          footer={()=><Button type="danger" onClick={()=>mulDelete()}  >批量删除</Button>}
        />
      </div>
    </div>
  )
}