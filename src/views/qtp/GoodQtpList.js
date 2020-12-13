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
    Pagination
  } from 'antd'
  
  import { useDispatch,useSelector } from 'react-redux'

  import { useEffect,useState } from 'react'


  import action from '@/store/actions'

  import './style.scss'

  import img from '@/utils/img'

  import moment from 'moment'

  import CateSelect from './components/CateSelect'

export default props =>{


  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.qtp.goodData)



  let [text,setText] = useState('')

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
      render: ()=>(
        <>
        <a href="">删除</a>
        <a href="">编辑</a>
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

                  <Col offset={5} span={2} style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit"
                    onClick={()=>props.history.push('/qtp/update')}
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
                        
                   />


          

        </div>
    )
}
