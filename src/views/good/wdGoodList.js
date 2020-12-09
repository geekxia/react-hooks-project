import { Table, 
    Tag, 
    Space,
    Button, 
    Switch, 
    Row, 
    Col,
    Input,
    Select,
    Radio, 
    Divider,
    Modal

} from 'antd';
import img from '@/utils/img'
import moment from 'moment'
import {useEffect,useState} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import {goodlistAction} from '@/store/actions'
import './style.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CatesSelect from './components/CatesSelect'
import {fetchDelGood} from '@/utils/api'
export default props=>{
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.good.goodData)
    const cates=useSelector(store=>store.good.cates)
    const { Option } = Select;
    const [selectionType, setSelectionType] = useState('checkbox');
    const { confirm } = Modal;
    const rowSelection = {
        onChange: keys=>setKeys(keys)
        };
    let [text,setText]=useState('')
    let [keys,setKeys]=useState([])
    let [filter,setFilter]=useState({
        size:2,
        page:1,
        text:'',
        hot:''
    })

    const filterChange =(key,val)=>{
        filter[key]=val
        if(key!='page')filter.page=1
        setFilter(JSON.parse(JSON.stringify(filter)))
        console.log('filter',filter)
    }
    const textChange=val=>{
        setText(val)
        if(!val){
            filter.text=''
            setFilter(JSON.parse(JSON.stringify(filter)))
        }
    }

    const handleDel=row=>{
        console.log('row',row,row.name)
        const name=<span style={{color:'red'}}>{row.name}</span>
        confirm({
            title:'删除警告',
            icon: <ExclamationCircleOutlined />,
            content: <div>
            你确认要删除{name}吗?
            </div>,
            okText:'确定',
            cancelText:'取消',
            onOk() {
                fetchDelGood({id:row._id}).then(()=>{
                    setFilter(JSON.parse(JSON.stringify(filter)))
                })
                },
                onCancel() {
                console.log('Cancel');
                },
            });

    }
    const allDel=()=>{
        console.log('keys',keys)
        let id = ''
    keys.map(ele=>id+=(';'+ele))
    // 向后端传递由 id 组成的字符串，不能传数组
    fetchDelGood({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
    }
    
    
    
    // let [page, setPage] = useState(1)
    // let [size, setSize] = useState(2)
    
    
    useEffect(()=>{
        dispatch(goodlistAction(filter))
        return undefined
        }, [filter])
    
    const columns = [
        {
        title: '商品',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (text,row,idx)=>{
            return (
                <div className="imgbox">
                    <img src={img.imgBase+row.img} alt={row.name} />
                    <a>{text}</a>
                </div>
            )
        },
        },
        {
            title: '品类',
            dataIndex: 'cate',
            key: 'cate',
            align: 'center',
            render: cate=>{
                const idx = cates.findIndex(ele=>ele.cate===cate)
                console.log('idx',idx)
                console.log('cate',cate)
                return <span>{idx>=0?cates[idx].cate_zh:''}</span>
            }
        },
        {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        align: 'center',
        },
        {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        sorter: (a, b) => a.price - b.price,
        render:text=><div>{'$'+text}</div>
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
        dataIndex:'create_time',
        key: 'create_time',
        align: 'center',
        render: text=>{
            return(
                <>
                    <div>
                        {moment(text).format('YYYY年MM月DD日')}
                        {moment(text).format('hh:mm:ss')}
                    </div>
                </>
            )
        }
        },
        {
            title:'操作',
            key:'tags',
            align: 'center',
            dataIndex:'tags',
            render:(text,row)=>(
                <>
                    <Button type="primary"
                    size='small'
                    shape='round'>编辑</Button>
                    <Button type="danger"
                    size='small'
                    shape='round'
                    onClick={()=>handleDel(row)}>删除</Button>
                </>
            )
        }
    ];

    return(
        <div className='wd-good-list'>
            <h1>商品管理>商品列表</h1>
            <div style={{margin:'25px 0'}}>
                <Row align='middle'>
                    <Col span={2}>
                        <span className='filter-span'>商品查询:</span>
                    </Col>
                    <Col span={6}>
                        <Input placeholder="商品搜索" 
                        value={text}
                        onChange={e=>textChange(e.target.value)
                        }
                        onPressEnter={e=>filterChange('text',e.target.value)}
                        allowClear
                        />
                    </Col>
                    <Col span={2}>
                        <span className='filter-span'>品类:</span>
                    </Col>
                    <Col span={5}>
                        <CatesSelect hasAll 
                        onChange={cate=>filterChange('cate', cate)}
                        allowClear />
                    </Col>
                    <Col span={2}>
                        <span className='filter-span'
                        >是否热销:</span>
                    </Col>
                    <Col span={5}>
                    <Select defaultValue=""
                    style={{ width: 160 }}
                    onChange={val=>filterChange('hot',val)}
                    defaultValue=''
                    >
                        <Option value="">全部</Option>
                        <Option value="true">是</Option>
                        <Option value="false">否</Option>
                        </Select>
                    </Col>
                    <Col span={2} style={{textAlign:'right'}}>
                        <Button type="primary"  size='small'
                        onClick={()=>props.history.push('/good/update')}>
                        新增
                        </Button>
                    </Col>
                </Row>
            </div>
            <div style={{margin:'20px 0'}}>
            <Radio.Group
                onChange={({ target: { value } }) => {
                setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group>

            <Divider />
            <Table
            rowKey='_id'
            columns={columns}
            dataSource={goodData.list}
            pagination={{
                current: filter.page,
                total: goodData.total,
                defaultPageSize: filter.size,
                onChange: page=>filterChange('page', page),
                onShowSizeChange: (page, size)=>filterChange('size', size),
                pageSizeOptions: [2,5,10,15,20]
            }}
            footer={() =><Button type="danger"
            size='small'
            shape='round'
            onClick={()=>allDel()}
            >批量删除</Button> }
            rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
        />
            </div>
            
        </div>
    )
} 