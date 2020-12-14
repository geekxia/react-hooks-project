import {
    Form,
    Button,
    Input,
    Row,
    Col,
    Select,
    Table, 
    Tag, 
    Space,
    Pagination,
    Modal
  } from 'antd'
  
  import { useDispatch,useSelector } from 'react-redux'

  import { useEffect,useState } from 'react'


  import action from '@/store/actions'

  import './style.scss'

  import img from '@/utils/img'

  import moment from 'moment'

  import CateSelect from './components/CateSelect'

  import { ExclamationCircleOutlined } from '@ant-design/icons'

  import api from '@/utils/api'
  const { Option } = Select
  const { confirm } = Modal

export default props =>{


  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.qtp.goodData)

  const cates = useSelector(store=>store.qtp.cates)


  let [text,setText] = useState('')
  let [keys, setKeys] = useState([])

  let [filter,setFilter] = useState({
    size: 2,
    page: 1,
    text: ''
  })


  const textChange = val=>{
    setText(val)
    if(!val){
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }

  const filterChange = (key,val)=>{
    filter[key] = val
    if(key!=='page')filter.page=1
    setFilter(JSON.parse(JSON.stringify(filter)))
  }

  // 单条删除
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

  // 批量删除
  const mulDelete = () => {
    let id = ''
    keys.map(ele=>id+=(';'+ele))
    // 向后端传递由 id 组成的字符串，不能传数组
    api.fetchGoodDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }

  // 跳转到新增、编辑页
  const skipToEdit = row => {
    // 先清空状态管理中的goodInfo
    // dispatch(action.clearGoodDetail())
    // 再跳转到详情页
    props.history.push('/qtp/update/'+(row?row._id:0))
  }

  useEffect(()=>{
    dispatch(action.getQtpList(filter))
    return undefined
  },[filter])



  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align: 'centr',
      render: (text, record, index)=> {
        return (
          <div className='qtp-listimg'>
            <img src={img.imgBase+record.img} alt={record.name} />
            <a>{text}</a>
          </div>
        )
      }
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
      render: text=><div>{text}</div>
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a,b)=>a.price - b.price,
      render: text=><div>{text}</div>
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
      render: text=>{
        return (
          <>
            <div>{moment(text).format('MM月DD日')}</div>
          <div>{moment(text).format('hh:mm:ss')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'tags',
      key: 'tags',
      align: 'center',
      render: (text,row)=>(
        <>
        <a onClick={()=>handleDel(row)}>删除</a>
        <a onClick={()=>skipToEdit(row)}>编辑</a>
      </>
      )      
    }
  ];




  
    return (
        <div className="qtp-list">
            <h1>鹏鹏商品列表</h1>
               
                 <div>
                 <Row align='middle'>
                  <Col span={2}>
                    <span className='filter-label'>名称搜索:</span>
                  </Col>

                  <Col span={6}>
                    <Input placeholder="搜索" 
                    value={text}
                    onChange={e=>textChange(e.target.value)}
                    allowClear   
                    onPressEnter={e=>filterChange('text',e.target.value)}          
                    />
                  </Col>


                  <Col span={2}>
                    <span className='filter-label'>品类:</span>
                  </Col>

                  <Col span={6}>
                  <CateSelect hasAll 
                  allowClear
                  onChange={cate=>filterChange('cate',cate)}
                  />
                  </Col>

                  <Col span={2}>
                    <span className='filter-label'>是否热销:</span>
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

                  <Col offset={5} span={2} style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit"
                    onClick={()=>skipToEdit()}
                    >
                      新增商品
                    </Button>
                  </Col>


                  </Row>
                 </div>
                
                
  
                  <Table 
                  rowKey='_id'
                  columns={columns} 
                  dataSource={goodData.list}
                  pagination={{
                  current:filter.list,
                  total: goodData.total,
                  defaultPageSize: filter.size,
                  
                  onChange: page=>filterChange('page',page),
                  onShowSizeChange: (page, size)=>filterChange('size',size),
                  pageSizeOptions:[2,5,10,20]
                  }}  
                  rowSelection={{
                    type: 'checkbox',
                    onChange: keys=>setKeys(keys)
                  }}
                  footer={() => <Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
                  size='small'  
                   />


          

        </div>
    )
}
