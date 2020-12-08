import React,{useEffect,useState} from "react"

import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import moment from "moment"

import { 
    Row, 
    Col,
    Table,
    Breadcrumb,
    Button,
    Input,
    Select 
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

const {Option} = Select

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
            title: '商品品类',
            dataIndex: 'cate',
            align:'center',
            key: 'cate',
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            align:'center',
            key: 'price',
            sorter:(a,b)=>a.price-b.price
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
            render:(text, row, index)=>{
                return (
                    <div>
                        <div>{moment(row.create_time).format('YYYY年MM月DD日')}</div>
                        <span>{moment(row.create_time).format('HH:mm:ss')}</span>
                    </div>
                    
                )
            }
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
            <Row align='middle'>
                <Col span={2}>
                    <span className='search-text'>搜索:</span>
                </Col>
                <Col span={4}>
                    <Input placeholder="Basic usage" />
                </Col>

                <Col span={2}>
                    <span className='search-text'>品类:</span>
                </Col>
                <Col span={4}>
                    <Select
                        placeholder="Select a person"
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>,
                </Col>

                <Col span={2}>
                    <span className='search-text'>是否热销:</span>
                </Col>
                <Col span={4}>
                    <Select
                        placeholder="Select a person"
                    >
                        <Option value="jack">全部</Option>
                        <Option value="lucy">是</Option>
                        <Option value="tom">否</Option>
                    </Select>,
                </Col>

                <Col span={6}>
                    <div className='submit-btn'>
                        <Button type="primary" onClick={()=>props.history.push('/panxi/good/list/addoredit')} >商品新增</Button>
                    </div>
                </Col>
            </Row>
            
            <hr/>
            <Table 
                locale={{
                    triggerDesc: '点击降序',
                    triggerAsc: '点击升序',
                    cancelSort: '点击取消排序'
                }}
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