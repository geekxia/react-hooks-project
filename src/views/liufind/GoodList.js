import React,{useEffect} from 'react'
import { Table, 
         Space,
         Row, 
         Col,
         Input,
         Button
       } from 'antd';
import action from '@/store/actions.js'
import img from '@/utils/img.js'
import moment from 'moment'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'

const { Search } = Input;


// 自带样式
const style = { background: '#0092ff', padding: '0px 0' };

const GoodList=(props)=>{
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  useEffect(()=>{
    let params = {
      size:10,
      page:1
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[])

  // 跳转详情页面
  function skipToAdd(){
    props.history.push('/find/'+0)
  }

  // 跳转到编辑页面
  function skipToEdit(row){
    console.log("==========e",row)
    props.history.push("/find/"+row._id)
  }
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text,row,idx) => {
        // console.log("text",text,row)
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
        <div className="qf-goodtime">
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
          <span onClick={()=>skipToEdit(row)}>编辑</span>
        </div>
      )
    },
  ]
  
  return (
    <div>
      <h1>商品列表页面</h1>
      <div className="qf-first" style={{marginBottom:"20px"}} >
        <Row gutter={16} align="middle">
          <Col className="gutter-row" span={2} >
            <div style={{textAlign:"right"}}>搜索:</div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div >
            <Search
              placeholder="input search text"
              allowClear
              // onSearch={onSearch}
              style={{ width: 200, margin: '0 10px' }}
            />
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div >
              <Button onClick={()=>skipToAdd()}>新增</Button>
            </div>
          </Col>
        </Row>
      </div>
      <Table 
       columns={columns} 
       dataSource={goodData.list}
       rowKey="_id" 
       pagination={{
         total:goodData.total,
         defaultPageSize:10,
         pageSizeOptions: [2,5,10,15,20]
       }}
      />
    </div>
  )
}

export default GoodList