import { 
  Table, 
  Input,
  Row,
  Col,
  Select,
  Button,
  Modal
} from 'antd'
const { Option } = Select
const { confirm } = Modal
import CateSelect from '../components/CateSelect'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import api from '@/utils/api'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default props => {

  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  const cates = useSelector(store=>store.good.cates)

  let [text, setText] = useState('')
  let [keys, setKeys] = useState([])
  let [filter, setFilter] = useState({
    size: 3,
    page: 1,
    text: '',
    hot: ''
  })

  //搜索
  const textChange = val =>{
    console.log('value text', val)
    setText(val)
    if(!val){
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }
  const filterChange = (key,val)=>{
    filter[key] = val
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter',filter)
  }

  //删除商品
  const handleDel = row =>{
    const ele = <span style={{color:'blue'}}>{row.name}</span>
    confirm({
      title:'警告',
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

  //跳转到新增页编辑页
  const goodEdit = row =>{
    // 先清空状态管理中的goodInfo
    dispatch(action.clearGoodDetail())
    // 再跳转到详情页
    props.history.push('/zhappy/song/'+(row?row._id:0))
  }

  //批量删除商品
  const mulDelete = () =>{
    let id = ''
    keys.map(ele=>id+=(';'+ele))
    api.fetchGoodDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }

  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  }, [filter])

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
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render: text=> <div>{'￥'+text}</div>
    },
    {
      title: '商品类型',
      dataIndex: 'cate',
      key: 'cate',
      align: 'center',
      render: cate=>{
        const idx = cates.findIndex(ele=>ele.cate===cate)
        return <span>{idx>=0?cates[idx].cate_zh:''}</span>
      }
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
        <div className='table-btn'>
          <Button onClick={()=>handleDel(row)} type='danger' size='small'>删除</Button>
          <Button onClick={()=>goodEdit(row)} size='small' style={{margin:'10px'}}>编辑</Button>
        </div>
      )
    }
  ]

  return (
    <div className='qf-good-list'>
      <h1><b>商品列表</b></h1>
      <hr/>
      <div className='z-select'>
        <Row align='middle'>
          <Col span={2}justify='center' className='justify-ri'>
            查询：
          </Col>
          <Col span={5}>
            <Input
              placeholder="搜索"
              allowClear
              value={text}
              onChange={e=>textChange(e.target.value)}
              onPressEnter={e=>filterChange('text',e.target.value)}
            />
          </Col>
          <Col span={2} className='justify-ri'>
            品类：
          </Col>
          <Col span={4}>
            <CateSelect
              hasAll
              onChange={cate=>filterChange('cate', cate)}
              allowClear
            />
          </Col>
          <Col span={2} className='justify-ri'>
            状态：
          </Col>
          <Col span={5}>
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
          <Col span={3} >
            <Button
              size='middle'
              type="primary"
              onClick={()=>goodEdit()}
              style={{backgroundColor:"blue",borderColor:'blue'}}
            >
              新增
            </Button>
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
            defaultPageSize: filter.size,
            onChange: page=>filterChange('page',page),
            onShowSizeChange: (page, size)=>filterChange('size',size),
            pageSizeOptions: [2,5,10,15,20]
          }}
          rowSelection={{
            type:'checkbox',
            onChange: keys=>setKeys(keys)
          }}
          footer={() => <Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
          size='small'
        />
      </div>
    </div>
  )
}
