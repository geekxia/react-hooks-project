import React,{useEffect} from 'react'
import { Table, 
         Space,
         Row, 
         Col,
         
       } from 'antd';
import action from '@/store/actions.js'
import img from '@/utils/img.js'
import moment from 'moment'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'

const columns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    align:'center',
    render: (text,row,idx) => {
      console.log("text",text,row)
      return (
        <div className='gl-good'>
          <img src={img.imgBase+row.img} alt={row.name} />
          <a>{text}</a>
        </div>
      )
    },
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    key: 'price',
    align:'center'
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
    key: 'desc',
    align:"center"
  },
  {
    title: '是否热销',
    key: 'hot',
    dataIndex: 'hot',
    align:"center",
    render: (text,row,idx)=>{
      return(
        <span>{row.hot===true?"热销":'不热销'}</span>
      )
    }
  },
  {
    title: '商品品类',
    key: 'cate',
    dataIndex:'cate',
    align:'center',
    render: (text,row) => (
      <span>{row.cate}</span>
    ),
  },
  {
    title:'上架时间',
    key:'create_time',
    dataIndex:'create_time',
    align:"center",
    render:(text,row)=>(
      <div>
        <span>{moment(row.create_time).format("YYYY-MM-DD")}</span>
        <br/>
        <span>{moment(row.create_time).format("HH:mm:ss")}</span>
      </div>
    )

  },
  {
    title: '操作',
    dataIndex: 'tag',
    key: 'tag',
    align:'center',
    render:(text,row)=>(
      <div className="handelButton">
        <span>删除</span>
        <span>编辑</span>
      </div>
    )
  },
]


// 自带样式
const style = { padding: '8px 0' };

const GoodList=()=>{
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  useEffect(()=>{
    let params = {
      size:1,
      page:1
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[])
  return (
    <div>
      <h1>商品列表页面</h1>
      <div className="qf-first" style={{marginBottom:"20px"}} >
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div style={style}>搜索</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>
      <Table 
       columns={columns} 
       dataSource={goodData.list}
       rowKey="_id" 
       pagination={{
         total:goodData.total,
         defaultPageSize: 1,
         onShowSizeChange: (page, size)=>setSize(size),
         pageSizeOptions: [2,5,10,15,20]
       }}
      />
    </div>
  )
}

export default GoodList