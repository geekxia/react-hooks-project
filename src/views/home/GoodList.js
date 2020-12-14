import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { 
   Table, 
   Button,
   Row, 
   Col,
   Input,
   Select,
   Modal
  } from 'antd';
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from '@/components/CateSelect';
import {ExclamationCircleOutlined} from '@ant-design/icons'
import api from '@/utils/api'
const { Option } = Select
const { confirm } = Modal

export default props =>{
   const dispatch = useDispatch()
   const goodData = useSelector(store=>store.good.goodData)
   const cates = useSelector(store=>store.good.cates)
  
   
   let [text, setText] = useState('')

   let [filter, setFilter] = useState({
    size: 3,
    page: 1,
    text: '',
    hot: ''
  })
  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  },[filter])

  const handleDel=row=>{
    const ele=<span style={{color: 'red'}}>{row.name}</span>
    confirm({
      title:'警告',
      icon: <ExclamationCircleOutlined />,
      content:<div>你确定要删除 {ele} 吗?</div>,
      okText:'确定',
      cancelText:'取消',
      onOk() {
        api.fetchGoodDel({id:row._id}).then(()=>{
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
          align:'center',
          render: (text,row,idx)=>{
            return(
              <div className='gl-good'>
                <img src={img.imgBase+row.img}/>
                <a>{text}</a>
              </div>
            )
          }
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key: 'desc',
          align:'center',
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
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align:'center',
          sorter:(a,b)=>a.price-b.price,
          render:text=> <div>{'¥'+text}</div>
        },
        {
          title: '是否热销',
          key: 'hot',
          dataIndex: 'hot',
          align:'center',
          render:text=><div>{text?'热销':'不热销'}</div>
        },
        {
          title: '上架时间',
          key: 'create_time',
          dataIndex: 'create_time',
          align:'center',  
          render:text=>{
            return(
              <div>
                 <div>{moment(text).format('YYYY年MM月DD日')}</div>
                <div>{moment(text).format('HH:mm:ss')}</div>
              </div>
            )
          }       
        },
        {
          title: '操作',
          key: 'tags',
          dataIndex: 'tags',
          align:'center',    
          render:(text,row)=>(
            <div className='table-btn'>
              <a onClick={()=>handleDel(row)}>删除 </a>
              <a >编辑</a>
            </div>
          )     
        },
      ];
      const textChange =val=>{
        setText(val)
        if(!val){
          filter.text = ''
          setFilter(JSON.parse(JSON.stringify(filter)))
        }
      }
      const filterChange=(key,val)=>{
        filter[key] = val
        if(key!=='page') filter.page = 1
        setFilter(JSON.parse(JSON.stringify(filter)))
        console.log('filter', filter)
      }
      
      const skipToAdd=() =>{
        props.history.replace('/good/updata')
      }
    return(
        
        <div className='qf-good-list'>
            <h1>商品列表</h1>
            <hr/>
            <div  style={{margin: '25px 0'}}>
              <Row align='middle'>

                <Col span={2}>
                  <span className='filter-label'>查询:</span>
                </Col>
                <Col span={6}>
                  <Input 
                   value={text}
                   onChange={e=>textChange(e.target.value)}
                   allowClear
                   placeholder="输入你要查询的商品" 
                   onPressEnter={e=>filterChange('text', e.target.value)}
                  />
                </Col>
                <Col span={2}>
                  <span className='filter-label'>品类:</span>
                </Col>
                <Col>
                  <CateSelect
                    allowClear
                    onChange={cate=>filterChange('cate', cate)}
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
                <Col offset={2} span={2} style={{textAlign: 'right'}}>
                  <Button
                    size='small'
                    type="primary"
                    onClick={()=>props.history.push('/good/updata/0')}
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
                  total:goodData.total,
                  defaultPageSize:filter.size,
                  onChange:page=>filterChange('page', page),
                  onShowSizeChange: (page, size)=>filterChange('size', size),
                  pageSizeOptions: [2,5,10,15,20]
                }}
              />
            </div>
        </div>
    )
}


  

   

   