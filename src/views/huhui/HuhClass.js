import React,{
    useState,
    useEffect
} from "react"
import { 
    Table,
    Space,
    Row,
    Col,
    Button,
    Image,
    Input
} from 'antd'
import {
    useDispatch,
    useSelector
} from "react-redux"
import action from "@/store/actions"
import img from "@/utils/img"
import moment from "moment"

const HuhClass =(props)=>{
    const goodData = useSelector(store=>store.good.goodData)
    const dispatch = useDispatch();
    

    //跳转商品新增页面
    const GoodAddOrEdit=()=>{
        props.history.push("/hucontact/gooduptate")
    }
    //渲染table
    let [page,setPage]=useState(1)
    let [size,setSize]=useState(2)
    useEffect(()=>{
        let params = {
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
            align:"center"
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
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align:"center",
            render: text => <div>{text?"是":"否"}</div>
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align:"center",
            render: text =>{
                return(
                    <>
                        <div>{moment(text).format("YYYY年MM月DD日")}</div>
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
                    <a>编辑</a>
                    <a>删除</a>
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
                    <Col span="4">
                        <Input placeholder="请输入名称" allowClear />
                    </Col>
                    <Col span="2">
                        <label>品类搜索：</label>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={()=>GoodAddOrEdit()}>新增商品</Button>
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
                        total:goodData.total,
                        defaultPageSize: size,
                        onChange:page=>setPage(page),
                        onShowSizeChange:(page,size)=>setSize(size),
                        pageSizeOptions:[2,5,10,15,20]
                    }}
                    locale={{
                        triggerDesc: '点击升序',
                        triggerAsc: '点击降序',
                        cancelSort: '点击取消排序',
                    }}
                />
            </div>
        </div>
    )
}

export default HuhClass