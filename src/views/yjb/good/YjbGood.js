import { 
    Table,
    Row,
    Col,
    Input,
    Select, 
    Button
} from 'antd'
import {useDispatch,useSelector}from 'react-redux'
import {useEffect,useState}from 'react'
import img from '@/utils/img'
import moment from 'moment'
import action from '@/store/actions'
import CateSelect from './component/CateSelect'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './style.scss'
import confirm from 'antd/lib/modal/confirm'
import api from '@/utils/api'

const { Option } = Select;

const YjbGood = (props)=>{
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.good.goodData)
    const cates = useSelector(store=>store.good.cates)
    // console.log('商品data',goodData)
    // let [page, setPage] = useState(1)
    // let [size, setSize] = useState(2)
    let [text, setText] = useState('')

    let [filter,setFilter] = useState({
        size:2,
        page:1,
        text:''
    })

    const textChange=(val)=>{
        console.log('value text',val)
        setText(val)
        if(!val){
            filter.text=''
            setFilter(JSON.parse(JSON.stringify(filter)))
        }
    }

    const filterChange = (key, val) => {
        filter[key] = val
        if(key!=='page') filter.page = 1
        setFilter(JSON.parse(JSON.stringify(filter)))
        console.log('filter', filter)
    }

    //单条删除
    const handleDel =(text, row )=>{
        // console.log('row-------',row)
        confirm({
            title:'警告',
            icon:<ExclamationCircleOutlined/>,
            content:<div>你确定要删除吗?</div>,
            okText:'确定',
            cancelText:'取消',
            onOk(){
                api.fetchGoodDel({id:row._id}).then(()=>{
                    setFilter(JSON.parse(JSON.stringify(filter)))
                })
            }
        })
    }

    const textChanges = (text)=>{
        console.log('text---------',text)
    }

    useEffect(()=>{  
      dispatch(action.getGoodList(filter))
      return undefined
    }, [filter])
  

    

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            key:'name',
            align: 'center',
            render:(text,row,idx)=>{
                return(
                    <div className="jb-good">
                        <img onClick={()=>textChanges(text)} src={img.imgBase+row.img} alt={row.name}/>
                        <a>{text}</a>
                    </div>
                )
            }
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key:"desc",
            align: 'center',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key:"price",
            align: 'center',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: price=> <div>{'￥'+price}</div>
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align: 'center',
            render:text=><div>{text?'是':'否'}</div>
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
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
            align: 'center',
            dataIndex: 'tags',
            render:(text,row)=>(
                <div>
                    <a onClick={()=>handleDel(text,row)}>删除</a>
                    <a href="">编辑</a>
                </div>
            )
        }
      ];
      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    return (
        <div className="YJB-GoodList">
            <h1>商品列表</h1>
            <div style={{margin:'30px 0'}}>
                {/* 第一行 */}
                <Row>
                    <Col span={1}>
                        <span>搜索</span>
                    </Col>
                    <Col span={4}>
                        <Input 
                        value={text}
                        allowClear
                        onChange={e=>textChange(e.target.value)}
                        placeholder="搜索" 
                        onPressEnter={e=>filterChange('text',e.target.value)}
                        />
                    </Col>
                    <Col span={1}>
                        <span>品类</span>
                    </Col>
                    <Col span={4}>
                        <CateSelect
                        allowClear
                        hasAll
                        onChange={(cate)=>filterChange('cate',cate)}
                        />
                    </Col>
                    <Col span={2}>
                        <Button
                        type='primary'
                        >
                            新增
                        </Button>
                    </Col>
                </Row>
            </div>
            <Table
             rowKey='_id'
             columns={columns}
             dataSource={goodData.list}
             onChange={onChange} 
             pagination={{
                current: filter.page,
                total: goodData.total,
                defaultPageSize: filter.size,
                onChange: page=>filterChange('page',page),
                onShowSizeChange: (page, size)=>filterChange('size',size),
                pageSizeOptions: [2,5,10,15,20]
              }}
            />
        </div>
    )
}

export default YjbGood