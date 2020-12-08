import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import action from '@/store/actions'
import img from "@/utils/img"
import "@/assets/xxl/xxlgood.scss"
import moment from 'moment'
import { Image } from 'antd';
import api from '@/utils/api'
import { Modal,Row, Col,Input,Table, Radio, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CateSelect from './components/cateSelect'
const { confirm } = Modal;
import { Select } from 'antd';
const { Option } = Select;


export default props=>{
    let shopDate =  useSelector(store=>(store.xxlgetshop.shopDate))
    const cates =  useSelector(store=>(store.xxlgetshop.cates))
    const dispatch = useDispatch()
    let [text,setText] = useState("")
    let [keys,setKeys] = useState([])
    let [filter,setFilter] = useState({
        size:2,
        page:1,
        text:"",
        hot:''
    })
    const mulDelete = ()=>{
        let id =''
        keys.map(ele=>id+=(";"+ele))
        api.fetchXxlDelShop({id}).then(()=>{
            setFilter(JSON.parse(JSON.stringify(filter)))
        })
    }
    const textChange = val=>{
        setText(val)
        if(!val){
            filter.text =""
            setFilter(JSON.parse(JSON.stringify(filter)))
        }
    }
    const filterChange = (key,val)=>{
        filter[key] = val
        setFilter(JSON.parse(JSON.stringify(filter)))
    }
    const shopChange = (e,val,record)=>{
        e.preventDefault();
        if(val==="editing"){
            //跳转编辑
            props.history.push("/xxladd/"+record._id)
        }if(val==="del"){
            const ele = <span>{record.name}</span>
            confirm({
                title: '警告',
                icon: <ExclamationCircleOutlined />,
                content: <div>你确定要删除{ele}吗?</div>,
                okText:"确定",
                cancelText:"取消",
                onOk() {
                    api.fetchXxlDelShop({id:record._id}).then(()=>{
                        setFilter(JSON.parse(JSON.stringify(filter)))
                    })
                },
            });
            
        }   
    }
    useEffect(()=>{
        dispatch(action.xxlGetShop(filter))
        return undefined
    },[filter])
    // console.log("后端返回数据",shopDate)
    const columns = [
        {
          title: '商品',
          dataIndex: 'name',
          key:"name",
          align:"center",
          render:(text,record,index)=>{
              //text当前行值
              //record当前行数据
              //index当前行索引
              return (
                  <div className="xxl-good">
                       <Image
                        width={80}
                        src={img.imgBase+record.img}
                        />
                      {/* <img src={img.imgBase+record.img} alt="0"/> */}
                      <a href="#">{text}</a>
                  </div>
              )
          }
        },{
            title: '品类',
            dataIndex: 'cate',
            key:"cate",
            align:"center",
            render:cate=>{
                const idx =cates.findIndex(ele=>ele.cate===cate)
                return <span>{idx>0?cates[idx].cate_zh:""}</span>
            }
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key:"desc",
          align:"center",
        },
        {
          title: '价格',
          dataIndex: 'price',
          key:"price",
          align:"center",
          sorter: (a, b) => a.price - b.price,
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key:"hot",
            align:"center",
            sorter: (a, b) => a.hot - b.hot,
            render:(text,record,index)=>{
                //text当前行值
                //record当前行数据
                //index当前行索引
                return (
                    <div>
                        {record.hot ? <span>是</span>:<span>否</span>}
                    </div>

                )
            }

        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key:"create_time",
            align:"center",
            sorter: (a, b) => a.create_time - b.create_time,
            render:(text,record,index)=>{
                //text当前行值
                //record当前行数据
                //index当前行索引
                return (
                    <>
                        <div>{moment(text).format("YYMM-DD:HH")}</div>
                    </>

                )
            }
        },{
            title: '操作',
            dataIndex: 'tags',
            key:"tags",
            align:"center",
            render:(text,record,index)=>(
                <>
                    <a href="" onClick={(e)=>shopChange(e,"del",record)} >删除</a>
                    <a href="" onClick={(e)=>shopChange(e,"editing",record)}>编辑</a>
                </>
            )
        },
    ];
    const [selectionType, setSelectionType] = useState('checkbox');
    return (
        <div className="xxl-shop-list">
            <h1>商品列表</h1>
            {/* 第一行 */}
            <div className="xxl-Query">
                <Row align="middle" >
                    <Col span={2}>
                        <span className='query'>搜索：</span>
                    </Col>
                    <Col span={4}>
                        <Input 
                            placeholder="输入查询内容" 
                            value={text} 
                            onChange={(e)=>textChange(e.target.value)}
                            allowClear
                            onPressEnter={(e=>filterChange("text",e.target.value))}
                        />
                    </Col>
                    <Col span={2}>
                        <span className='query_cate'>品类筛选：</span>
                    </Col>
                    <Col span={4}>
                        <CateSelect 
                            hasAll
                            onChange={cate=>filterChange('cate', cate)}
                            allowClear
                        />
                    </Col>
                    <Col span={2}>
                        <span className='query'>状态：</span>
                    </Col>
                    <Col span={4}>
                    <Select
                        style={{ width: 200 }}
                        allowClear
                        defaultValue=""
                        onChange={val=>filterChange("hot",val)}
                    >
                        <Option key="1" value="">全部</Option>
                        <Option key="3" value={true}>热销</Option>
                        <Option key="3" value={false}>非热销</Option>
                    </Select>
                    </Col>
                    <Col span={2} push="4">
                        <button onClick={()=>(props.history.push("/xxladd/0"))}>新增商品</button>
                    </Col>
                </Row>
            </div>
            <div>
                <Table 
                    rowKey="_id"
                    columns={columns} 
                    dataSource={shopDate.list} 
                    size="middle" 
                    pagination={{
                        total:shopDate.total,
                        defaultPageSize:filter.size,
                        pageSizeOptions:[2,5,10,15,20],
                        onChange:page =>filterChange("page",page),
                        onShowSizeChange:(page,size) =>filterChange("size",size)
                    }}
                    locale={
                        {
                            triggerDesc: '上升排序',
                            triggerAsc: '默认',
                            cancelSort: '下降排序',
                        }
                    }
                    rowSelection={{
                        type: 'checkbox',
                        onChange: keys=>setKeys(keys)
                    }}
                    footer={()=><button onClick={()=>mulDelete()} type='danger'>批量删除</button>}
                />
            </div> 
        </div>
    )
}