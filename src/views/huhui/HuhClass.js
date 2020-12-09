import React,{
    useState,
    useEffect
} from "react"
import {
    useDispatch,
    useSelector
} from "react-redux"
import { 
    Table,
    Space,
    Select,
    Row,
    Col,
    Button,
    Image,
    Input,
    Modal,
    message
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import action from "@/store/actions"
import img from "@/utils/img"
import moment from "moment"
//引入select通过组件
import WshSelect from "./components/WhsSelect"
//引入删除接口
import Api from "@/utils/api"
const { Option } = Select
const { confirm } = Modal

const HuhClass =(props)=>{
    //渲染table
    let [category,setCategory]=useState("全部品类")
    let [text,setText] = useState("")
    let [key,setKey] = useState([])
    let [filters,setFilters]=useState({
        size:2,
        page:1,
        text:"",
        hot:""
    })
    const goodData = useSelector(store=>store.good.goodData)
    const cates = useSelector(store=>store.good.cates)
    const dispatch = useDispatch();
    
    //名称搜索
    const textChange = (value)=>{
        setText(value)
        if(!value){
            filters.text = ''
            setFilters(JSON.parse(JSON.stringify(filters)))
        }
    }
    //变量集合
    const filtersChange =(type,value)=>{
        filters[type] = value
        if(type!="page") filters.page = 1
        setFilters(JSON.parse(JSON.stringify(filters)))
    }

    //跳转商品新增页面
    const GoodAddOrEdit=(id)=>{
        props.history.push("/hucontact/gooduptate/"+id)
        action.clearGoodDetail()
    }
    
    //点击删除按钮
    const handle = (type,record)=>{
        switch (type) {
            case "del":
                const name = <span style={{color:"red"}}>{record.name}</span>
                confirm({
                    centered:true,
                    title: '提示',
                    icon: <ExclamationCircleOutlined />,
                    content: <div>你确定要删除 {name} 吗？</div>,
                    okText:"确定",
                    cancelText:"取消",
                    onOk() {
                        Api.fetchGoodDel({id:record._id}).then(()=>{
                            setFilters(JSON.parse(JSON.stringify(filters)))
                        })
                    },
                    onCancel() {
                        message.success('取消删除成功')
                    },
                  })
                break;
            case "red":
                GoodAddOrEdit(record._id)
                break;
            default:
                break;
        }
    }
    //批量删除
    const batchDel =()=>{
        let id=''
        key.map(ele=>id+=(";"+ele))
        Api.fetchGoodDel({id}).then(()=>{
            setFilters(JSON.parse(JSON.stringify(filters)))
        })
    }

    useEffect(()=>{
        dispatch(action.getGoodList(filters))
        return undefined
    },[filters])

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            key: 'name',
            render: (text,record,idx) => {
                return(
                    <div className="table-img">
                        <Image
                            width={100}
                            src={img.imgBase + record.img}
                            fallback={img.errorImg}
                            alt={record.name}
                            width="80px"
                            height="80px"
                        />
                        <a>{text}</a>
                    </div>
                )
            },
            align:"center"
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
            align:"center",
            render:text=> <div className="table-desc">{text}</div>
        },
        {
            title: '商品品类',
            dataIndex: 'cate',
            key: 'cate',
            align:"center",
            render:cate=>{
                const idx = cates.findIndex(ele=>ele.cate===cate)
                return <span>{idx>=0?cates[idx].cate_zh:''}</span>
            }
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align:"center",
            render: text => <div>{text?"是":"否"}</div>
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            key: 'price',
            align:"center",
            sorter: (a, b) => a.price - b.price,
            render: text=> <div>{ "￥"+text }</div>
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align:"center",
            render: text =>{
                return(
                    <>
                        <div>{moment(text).format("YYYY/MM/DD")}</div>
                        <div>{moment(text).format("HH:mm:ss")}</div>
                    </>
                )
            }
        },
        {
            title: '操作',
            key: 'hot',
            dataIndex: 'hot',
            render: (text, record) => (
                <Space size="middle">
                    <Button 
                        type="primary" 
                        style={{backgroundColor:"#1890ff",borderColor:"#1890ff"}}
                        onClick={()=>handle("red",record)}
                    >编辑</Button>
                    <Button 
                        danger
                        onClick={()=>handle("del",record)}
                    >删除</Button>
                </Space>
            ),
            align:"center"
        }
    ]

    return(
        <div className="HH-list">
            <h1>商品列表</h1>
            <hr/>
            <div className="List-query">
                <Row align="middle">
                    <Col span="2">
                        <label>名称搜索：</label>
                    </Col>
                    <Col span="3">
                        <Input 
                            placeholder="请输入名称" 
                            allowClear
                            value={text}
                            onChange={e=>textChange(e.target.value)}
                            onPressEnter={e=>filtersChange("text",e.target.value)}
                        />
                    </Col>
                    <Col span="2">
                        <label>品类搜索：</label>
                    </Col>
                    <Col span="3">
                        <WshSelect 
                            cate 
                            allowClear
                            category={category}
                            onChange={(cate)=>filtersChange("cate",cate)} 
                        />
                    </Col>
                    <Col span="2">
                        <label>热销搜索：</label>
                    </Col>
                    <Col span="3">
                        <Select
                            style={{ width: 80 }}
                            defaultValue="全部"
                            onChange={value=>filtersChange("hot",value)}
                        >
                            <Option value="">全部</Option>
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                        </Select>
                    </Col>
                    <Col offset="5" span="4" style={{textAlign:"right"}}>
                        <Button 
                            type="primary" 
                            onClick={()=>GoodAddOrEdit("0")}
                            style={{backgroundColor:"#1890ff",borderColor:"#1890ff"}}
                        >新增商品</Button>
                    </Col>
                </Row>
            </div>
            <hr/>
            <div className="List-table">
                <Table
                    rowKey="_id"
                    columns={columns} 
                    dataSource={goodData.list}
                    pagination={{
                        defaultCurrent:1,
                        total:goodData.total,
                        defaultPageSize: filters.size,
                        onChange:page=>filtersChange("page",page),
                        onShowSizeChange:(page,size)=>filtersChange("size",size),
                        pageSizeOptions:[2,5,10,15,20],
                        showSizeChanger:true
                    }}
                    locale={{
                        triggerDesc: '点击升序',
                        triggerAsc: '点击降序',
                        cancelSort: '点击取消排序',
                    }}
                    rowSelection={{
                        type:"checkbox",
                        onChange: key=>setKey(key)
                    }}
                    footer={()=><Button 
                        type="primary"
                        onClick={()=>batchDel()}
                    >批量删除</Button>}
                />
            </div>
        </div>
    )
}

export default HuhClass