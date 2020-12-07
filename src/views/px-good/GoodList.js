import React,{useEffect,useState} from "react"

import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { 
    Row, 
    Col,
    Table,
    Breadcrumb,
    Button,
    Pagination
} from 'antd';

import {fetchGoodList} from "@/utils/api"

import routes from '@/views'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import action from "@/store/actions"
import img from "@/utils/img"
import store from "../../store";

export default props=>{
    
    // const list = useSelector(store=>store.number.list)
    const goodList = useSelector(store=>store.good.goodList)
    const dispatch = useDispatch()
    let hash = document.location.hash.slice(1)
    const FirstMenu = routes.filter(ele=>{
        return ele.children.some(ele=>{
            return ele.path===hash
        })
    })
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            align:'center',
            key: 'name',
            render: (text, row, index)=>{
                return (
                    <div>
                        <img src={img.imgBase+row.img} alt=""/>
                        <a href="">{text}</a>
                    </div>
                )
            },
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            align:'center',
            key: 'desc',
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            align:'center',
            key: 'price',
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            align:'center',
            key: 'hot',
            render:(text, row, index)=>{
                return (
                    <span>{row.hot?'是':'否'}</span>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            align:'center',
            key: 'create_time',
        },
        {
            title: '商品操作',
            align:'center',
            render:(text, row, index)=>{
                return (
                    <div>
                        <a href="">删除</a>
                        <span> </span>
                        <a href="">操作</a>
                    </div>
                )
            }
        },
    ];
    // let [goodList,setGoodList] = useState({})
    let [page,setPage] = useState(1)
    let [size,setSize] = useState(2)
    useEffect(()=>{
        dispatch(action.goodListAction({
            page,
            size
        }))
        return undefined
    },[page,size])
      
    return (
        <div className='px-good'>
            <Breadcrumb>
                <Breadcrumb.Item href='/'>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {FirstMenu[0].text}
                </Breadcrumb.Item>
                <Breadcrumb.Item href={hash}>
                    {FirstMenu[0].children[0].text}
                </Breadcrumb.Item>
            </Breadcrumb>
            <br/>
            <h1>潘曦-商品列表</h1>
            <Row justify='end'>
                <Col>
                    <Button type="primary" onClick={()=>props.history.push('/panxi/good/list/addoredit')} >商品新增</Button>
                </Col>
            </Row>
            
            <hr/>
            <Table 
                rowKey="_id" 
                columns={columns} 
                dataSource={goodList.list}
                pagination={{
                    defaultCurrent:1,
                    total:goodList.total,
                    defaultPageSize:2,
                    onChange:(page)=>{
                        setPage(page)
                    },
                    onShowSizeChange:(current, size)=>{
                        setSize(size)
                    },
                    pageSizeOptions:[
                        2,5,10,20
                    ]
                }}
            />
        </div>
    )
}