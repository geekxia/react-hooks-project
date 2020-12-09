import { 
  Table, 
  Tag, 
  Space,
  Row, 
  Col, 
  Divider,
  Input,
  Button,
  Select,
  Modal
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect,useReducer,useState} from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from './components/CateSelect'
import api from '@/utils/api';

const {Option} = Select
const {confirm} = Modal

const style = {padding: '8px 0',marginLeft:'5px'};

export default props =>{
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  const cates = useSelector(store=>store.good.cates)

  let [text,setText] = useState('')
  let [keys,setKeys] = useState([])
  let [filter,setFilter] = useState({
    page:1,
    size:2,
    text:'',
    hot:''
  })

  const textChange = val =>{
    console.log('text',val)
    setText(val)
    if(!val){
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }

  const filterChange = (key,val) =>{
    filter[key] = val
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter',filter)
  }

  // 单条删除操作
  const handleDel = row =>{
    const ele = <span style={{color:'red'}}>{row.name}</span>
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: <div>你确定删除 {ele} 吗</div>,
      okText: '确认',
      cancelText: '取消',
      onOk(){
        api.fetchGoodDel({id:row._id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      }
    })
  }

  // 批量删除
  const mulDelete = ()=>{
    let id=''
    keys.map(ele=>id+=(';'+ele))
    // 向后端传递id组成的字符串，不能串数组
    api.fetchGoodDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }

  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  },[filter])

  const columns = [
      {
        title: '商品',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
        align:'center',
        render:(text,row,idx) =>{
          return (
            <div className="al-good">
              <img src={img.imgBase+row.img} alt={row.name}/>
              <a>{text}</a>
            </div>
          )
        }
      },
      {
        title: '品类',
        dataIndex: 'cate',
        key: 'cate',
        align:'center',
        render:cate=>{
          const idx = cates.findIndex(ele=>ele.cate === cate)
          return <span>{idx>=0?cates[idx].cate_zh:''}</span>
        }
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        align:'center'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        sorter:(a,b)=>a.price-b.price,
        render:text=><div>{'￥'+text}</div>
      },
      {
          title: '是否热销',
          dataIndex: 'hot',
          key: 'hot',
          align:'center',
          render:text=><div>{text?'是':'否'}</div>
      },
      {
          title: '上架时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align:'center',
          render:text=>{
            return (
              <>
              <div>
                {moment(text).format('YYYY-MM-DD')}
              </div>
              <div>
                {moment(text).format('HH:mm:ss')}
              </div>
              </>
            )
          }
      },
      {
          title: '操作',
          dataIndex: 'tags',
          key: 'tags',
          align:'center',
          render:(text,row)=>(
              <div>
              <span className='edit'>编辑</span>
              <span className='remove' onClick={()=>handleDel(row)}>删除</span>
              </div>
          )
      },
    ];

  return (
      <div className='qf-good-list'>
          <h1>商品列表</h1>
          <div style={{margin:'25px 0'}}>
            <Row align='middle'>
              <Col className="gutter-row" span={1}>
                <div style={style}>搜索：</div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div style={style}>
                  <Input 
                    value={text}
                    onChange={e=>textChange(e.target.value)}
                    placeholder="输入名称" 
                    allowClear
                    onPressEnter={e=>filterChange('text', e.target.value)}
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={2} offset={1}>
                <div style={style}>品类筛选：</div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div style={style}>
                  <CateSelect 
                    hasAll
                    onChange={cate=>filterChange('cate',cate)}
                    allowClear
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={1}>
                <div style={style}>状态：</div>
              </Col>
              <Col className="gutter-row" span={3} >
                <div style={style}>
                <Select
                  style={{ width: 100 }}
                  placeholder="是否热销"
                  onChange={val=>filterChange('hot',val)}
                >
                  <Option value="" key='1'>全部</Option>
                  <Option value={true} key='2'>是</Option>
                  <Option value={false} key='3'>否</Option>
                </Select>
                </div>
              </Col>
              <Col className="gutter-row" span={2} offset={3}>
                <div style={style}>
                  <Button type="primary" onClick={()=>props.history.push('/wyk/addGood/0')}>新增商品</Button>
                </div>
              </Col>
              <Col className="gutter-row" span={2}>
                <div style={style}>
                  <Button type='danger' onClick={()=>mulDelete()}>批量删除</Button>
                </div>
              </Col>
            </Row>
          </div>
          
          <Table 
            rowKey='_id'
            columns={columns} 
            dataSource={goodData.list} 
            pagination={{
              current:filter.page,
              total:goodData.total,
              defaultPageSize:filter.size,
              onChange:page=>filterChange('page',page),
              onShowSizeChange:(page,size)=>filterChange('size',size),
              pageSizeOptions:[2,5,10,15,20]
            }}
            rowSelection={{
              type:'checkbox',
              onChange: keys=>setKeys(keys)
            }} 
            size='small'
          />
      </div>
  )
}