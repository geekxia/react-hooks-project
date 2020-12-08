import { 
  Table, 
  Tag, 
  Space,
  Row, 
  Col, 
  Divider,
  Input,
  Button,
  Select
} from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from './components/CateSelect'

const {Option} = Select

const style = {padding: '8px 0'};

export default props =>{
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  const cates = useSelector(store=>store.good.cates)

  let [page,setPage] = useState(1)
  let [size,setSize] = useState(2)

  useEffect(()=>{
    let params ={
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[page,size])

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
          render:()=>(
              <div>
              <span className='edit'>编辑</span>
              <span className='edit'>删除</span>
              </div>
          )
      },
    ];

  // const filterChange =(key,val)=>{
  //   filter[key]=val
  // }

  return (
      <div className='qf-good-list'>
          <h1>商品列表</h1>
          <div style={{margin:'25px 0'}}>
            <Row align='middle'>
              <Col className="gutter-row" span={2}>
                <div style={style}>名称搜索：</div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div style={style}>
                  <Input placeholder="输入名称" allowClear/>
                </div>
              </Col>
              <Col className="gutter-row" span={2}>
                <div style={style}>品类筛选：</div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div style={style}>
                  <CateSelect 
                    hasAll
                    // onChange={cate=>filterChange('cate',cate)}
                    allowClear
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={2}>
                <div style={style}>z状态：</div>
              </Col>
              <Col className="gutter-row" span={2} >
                <div style={style}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                >
                  <Option value="">全部</Option>
                  <Option value="true">热销</Option>
                  <Option value="undefind">不热销</Option>
                </Select>
                </div>
              </Col>
              <Col className="gutter-row" span={2} offset={3}>
                <div style={style}>
                <Button type="primary">新增商品</Button>
                </div>
              </Col>
              <Col className="gutter-row" span={2}>
                <div style={style}>
                <Button type="primary">删除商品</Button>
                </div>
              </Col>
            </Row>
          </div>
          




          <Table 
            rowKey='_id'
            style={{margin:'25px 0'}}
            columns={columns} 
            dataSource={goodData.list} 
            pagination={{
              total:goodData.total,
              defaultPageSize:size,
              onChange:page=>setPage(page),
              onShowSizeChange:(page,size)=>setSize(size),
              pageSizeOptions:[2,5,10,15,20]
            }}
          />
      </div>
  )
}