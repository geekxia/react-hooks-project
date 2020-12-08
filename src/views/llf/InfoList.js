import { 
     Table,
     Tag, 
     Space,
     Button,
     Tooltip,
     Pagination ,
     Row, 
     Col,
     Input,
     Select,
     
    } from 'antd';
import { PlusOutlined} from '@ant-design/icons'
import{ useSelector,useDispatch}from 'react-redux'
import{ useEffect,useState}from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from './component/CateSelect'

const { Option } = Select;

const InfoList =(props)=>{

  let [page,setPage]=useState(1)
  let [size,setSize]=useState(3)
  let [text,setText]=useState('')
  let [cate,setCate]=useState('')
  const dispatch =useDispatch()
  const goodData =useSelector(store=>store.good.goodData)
  //  console.log('goodDate---',goodData)
  useEffect(()=>{
    let params={
      size,
      page,
      text
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[page,size,text])
  
  const textChange=(val)=>{
    // console.log('搜索关键字',val)
    setText(val)

  }
  //表格标题与表格内容
  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text,row,index)=>{
        return(
          <div className="gl-good">
            <img src={img.imgBase+row.img} alt={row.name}/>
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
      title: '商品类别',
      dataIndex: 'cate',
      key: 'cate',
      align:'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align:'center',
    },
    {
      title: '是否热销',
      key: 'hot',
      dataIndex: 'hot',
      align:'center',
      render:text=>{
        return(
        <div>{text?"是":"否"}</div>
        )
      }
    },
    {
      title: '上架时间',
      key: 'create_time',
      dataIndex: 'create_time',
      align:'center',
      render :text=>{
        return (
          <>
             <div>{moment(text).format('YYYY年MM月DD日')}</div>
             <div>{moment(text).format('hh:mm:ss')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'tags',
      key: 'tags',
      align:'center',
      render:()=>(
        <>
         <span>删除</span>
         <span>编辑</span>
       </>
      )
    },
  ];

    return(
        <div className='llf-good-list'>
            <h1>李兰菲的商品列表</h1>
            <div style={{margin: '20px 0'}}>
              <Row align='middle'>
                <Col span={2}><span className="list-lable">搜索</span></Col>
                <Col span={4}>
                <Input 
                  placeholder="请输入关键字" 
                  value={text}
                  onChange={e=>textChange(e.target.value)}
                  onPressEnter={e=>setText(e.target.value)}
                  allowClear
                  />
                </Col>
                <Col span={2}><span className="list-lable">品类</span></Col>
                <Col span={6}>
                  <CateSelect
                    hasAll
                    allowClear
                  />
                </Col>
                <Col span={4}><span className="list-lable">状态</span></Col>
                <Col span={4}>
                  <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="状态"
                    allowClear={true}
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </Col>
                <Col span={2}>
                  <Tooltip title="商品新增">
                  <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<PlusOutlined />} 
                  href="http://localhost:9000/#/llfAddOrEdit" 
                  style={{paddingTop:'8px'}}
                  />
                </Tooltip>
                </Col>
              </Row>
            </div>
            <div style={{margin:'25px 0'}}>
              <Table 
                rowKey='_id'
                size="small"
                columns={columns}
                dataSource={goodData.list}
                pagination={{
                  current:page,
                  showSizeChanger:true,
                  total:goodData.total,
                  pageSizeOptions:[2,5,10,15,20],
                  defaultPageSize:size,
                  onChange:page=>setPage(page),
                  onShowSizeChange: (page, size)=>setSize(size),
                  showQuickJumper:true
                }}
               />
            </div>
           
        </div>
    )
}
export default InfoList