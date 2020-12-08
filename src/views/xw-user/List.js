
import { 
  Table, 
  Tag, 
  Space,
  Input,
  Row,
  Col,
  Select ,
  Button
 } from 'antd';
import img from '@/utils/img'
import moment from 'moment'
import {useSelector,useDispatch}from 'react-redux'
import {useEffect,useState} from 'react'
import action from '@/store/actions'
import '@/assets/css/goodlist.scss'
import CateSelect from './components/CateSelect.js'

const { Search } = Input;
const { Option } = Select;



export default props=>{
  const dispatch=useDispatch()
  const goodData=useSelector(store=>store.good.goodData)
  let[page,setPage]=useState(1)
  let[size,setSize]=useState(2)

  useEffect(()=>{
    let params={
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[page,size])

  let[text,setText]=useState('')

  let[filter,setFilter]=useState({
    size:2,
    page:1,
    text:'',
    hot:''
  })

  const textChange=val=>{
    setText(val)
    if(!val){
      filter.text=""
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }

  const filterChange=(key,val)=>{
    filter[key]=val
    if(key!=='page') filter.page=1
    setFilter(JSON.parse(JSON.stringify(filter)))
  }


  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      render: (text,row,idx)=>{
        return(
          <div className="gl-good">
            <img src={img.imgBase+row.img} alt={row.name}/>
            <a>{text}</a>
          </div>
        )
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      sorter:(a,b)=>a.price-b.price,
      render:text=><div>{text+'元'}</div>
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key:'desc',
    },
    {
      title: '是否热销',
      key: 'hot',
      dataIndex: 'hot',
      render: text=><div>{text?'是':'否'}</div>
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: text=>{
        return(
          <>
            <div>{moment(text).format('YYYY-MM-DD')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'tags',
      key: 'tags',
      render:()=>(
        <>
          <button>删除</button>
          <button>编辑</button>
        </>
      )
    }
  ];
  

  return(
    <div className="qf-good-list">
      <Row align="middle">
        <Col span={2}>
          <span>商品搜索</span>
        </Col>
        <Col span={6}>
          <Search
            value={text}
            placeholder="搜索"
            allowClear
            enterButton="Search"
            onChange={e=>textChange(e.target.value)}
            onPressEnter={e=>filterChange('text',e.target.value)}
          />
        </Col>
        <Col span={2} offset={1}>
          <span>品类选择</span>
        </Col>
        <Col span={3}>
          <CateSelect
          hasAll
          />
        </Col>
        <Col span={2}>
          <span>
            状态
          </span>
        </Col>
        <Col span={3}>
          <Select defaultValue="lucy" style={{ width: 120 }} >
            <Option key="3" value="jack">Jack</Option>
            <Option key="4" value="lucy">Lucy</Option>
          </Select>
        </Col>
        <Col style={{textAlign: 'right'}} offset={3}>
          <Button >新增</Button>
        </Col>
      </Row>
      <Table 
      rowKey="_id"
      columns={columns} 
      dataSource={goodData.list} 
      pagination={{
        total:goodData.total,
        defaultPageSize:size,
        onChange:page=>setPage(page),
        onShowSizeChange:(page,size)=>setSize(size),
        pageSizeOptions:[2,5,10,20]
      }}
      />
      
    </div>
  )
}