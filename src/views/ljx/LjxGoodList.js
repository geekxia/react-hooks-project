




import { 
  Table,
  Tag,
  Space,
  Row,
  Col,
  Input,
  Button
} from 'antd'
import { useDispatch , useSelector} from 'react-redux'
import { useEffect , useState} from 'react'
import moment from 'moment'
import img from '@/utils/img'
import './style.scss'
import action from '@/store/actions'
import CateSelect from './components/CateSelect'



export default props => {

  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)

  let [page, setPage] = useState(1)
  let [size, setSize] = useState(2)

  useEffect(()=>{
    let params = {
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[])

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
      render: text=> <div>{text}</div>
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
      align:'center',
      dataIndex: 'tags',
      render: () => (
        <>
          <a href="">删除</a>
          <a href="">编辑</a>
        </>
      ),
    }
  ]


  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div style={{margin: '25px 0'}}>
        <Row align='middle'>
          <Col span={2}>
            <span className='filter-label'>名称搜索:</span>
          </Col>
          <Col span={6}>
            <Input placeholder="搜索" />
          </Col>
          <Col span={2}>
            <span className='filter-label'>品类:</span>
          </Col>
          {/* <Col span={6}>
            <CateSelect hasAll />
          </Col> */}
          <Col offset={6} span={2} style={{textAlign: 'right'}}>
            <Button
              size='small'
              type="primary"
              onClick={()=>props.history.push('/ljxgood/update')}
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
        />
      </div>
    </div>
  )
}
