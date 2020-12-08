import React,{useEffect,useState} from "react"

import { HomeOutlined, UserOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';

import moment from "moment"

import { 
    Row, 
    Col,
    Table,
    Breadcrumb,
    Button,
    Input,
    Select,
    Modal
} from 'antd';

import {fetchDelete} from "@/utils/api"

import routes from '@/views'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import Selector from "./components/common/selector"

import action from "@/store/actions"
import img from "@/utils/img"

const {Option} = Select

export default props=>{
    const { confirm } = Modal;
    const goodList = useSelector(store=>store.good.goodList)
    const cates = useSelector(store=>store.good.cates)
    const dispatch = useDispatch()
    let hash = document.location.hash.slice(1)
    const FirstMenu = routes.filter(ele=>{
        return ele.children.some(ele=>{
            return ele.path===hash
        })
    })
    // 单选删除
    const deleteHandel = props=>{

        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    你确定要删除
                    <span className='del-confirm'>{props.name}</span>
                    吗？
                </div>
            ),
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                fetchDelete({id:props._id}).then(res=>{
                    filterChange(filter)
                })
            },
            onCancel() {
                console.log('Cancel');
            }
          });
        
    }

    // 多选删除
    const mulDelete = keys=>{
        let str=''
        keys.map(ele=>{
            str+=(';'+ele)
        })
        fetchDelete({id:str}).then(res=>{
            filterChange(filter)
        })
    }
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
                        <span>{text}</span>
                    </div>
                )
            },
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            width:"200px",
            align:'center',
            key: 'desc',
        },
        {
            title: '商品品类',
            dataIndex: 'cate',
            align:'center',
            key: 'cate',
            render:(text, row, index)=>{
                let idx = cates.findIndex(ele=>ele.cate===row.cate)
                return (
                    <span>{idx>=0 && cates[idx].cate_zh}</span>
                )
            }
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
                        <Button 
                            size='small' 
                            type="primary" 
                            danger 
                            style={{margin:"0 5px 0 0 "}}
                            onClick={()=>deleteHandel(row)}
                        >删除</Button>
                        <Button size='small' type="primary">编辑</Button>
                    </div>
                )
            }
        },
    ];

    let [text,setText] = useState('')
    let [hot,setHot] = useState('')
    let [keys,setKeys] = useState([])
    let [filter,setFilter] = useState({
        size:2,
        page:1,
        text:'',
        hot:'',
        cate:""
    })

    const filterChange = (key,val)=>{
        filter[key]=val
        console.log('filter======',filter);
        if(key!=='page'){
            filter.page=1
        }
        setFilter(JSON.parse(JSON.stringify(filter)))
    }
    // 输入框onChange
    const searchTextChange = (e)=>{
        let text = e.target.value
        setText(text)
        if(!text){
            filterChange('text',text)
        }
    }
    // 是否热销
    const isHot = (e)=>{
        console.log(e);
        setHot(e)
        filterChange('hot',e?(e==='yes'?true:false):'')
    }
    useEffect(()=>{
        dispatch(action.goodListAction(filter))
        console.log('filter',filter);
        return undefined
    },[filter])
      
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
                    <Input 
                        placeholder="请输入搜索名称" 
                        value={text}
                        onChange={(e)=>searchTextChange(e)}
                        onPressEnter={()=>filterChange('text',text)}
                    />
                </Col>

                <Col span={2}>
                    <span className='search-text'>品类:</span>
                </Col>
                <Col span={4}>
                    <Selector 
                        hasAll
                        onChange={(e)=>filterChange('cate',e)}
                    />
                </Col>

                <Col span={2}>
                    <span className='search-text'>是否热销:</span>
                </Col>
                <Col span={4}>
                    <Select
                        placeholder="是否热销"
                        value={hot}
                        onChange={(e)=>isHot(e)}
                    >
                        <Option value="">全部</Option>
                        <Option value='yes'>是</Option>
                        <Option value='no'>否</Option>
                    </Select>
                </Col>

                <Col span={6}>
                    <div className='submit-btn'>
                        <Button size='small' type="primary" onClick={()=>props.history.push('/panxi/good/list/addoredit/0')} >商品新增</Button>
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
                        filterChange('page',page)
                    },
                    onShowSizeChange:(current, size)=>{
                        filterChange('size',size)
                    },
                    pageSizeOptions:[
                        2,5,10,20
                    ],
                    showSizeChanger:true
                }}
                rowSelection={{
                    type:"checkbox",
                    onChange:(selectedRowKeys)=>setKeys(selectedRowKeys)
                }}
                footer={
                    ()=>(
                        <Button type="primary" danger onClick={()=>mulDelete(keys)} >批量删除</Button>
                    )
                }
            />
        </div>
    )
}