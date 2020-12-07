import React,{useState,useEffect} from 'react'
import action from '@/store/actions'
import moment from 'moment'
import img from '@/utils/img'
import './style.scss'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { 
    Row, 
    Col,
    Input,
    Select,
    DatePicker,
    TimePicker,
    Table ,
    Space ,
    Popconfirm,
    Form,
    Button,
    Breadcrumb 
} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
 const { Option } = Select
export default props=>{
    let [size,setSize]=useState(2)
    let [page,setPage]=useState(1)
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    let data = useSelector(store=>store.study.data)
    const onFinish = (values) => {
        console.log(values);
    };
    useEffect(()=>{
        let params = {
            size,
            page
        }
        dispatch(action.YuGetGoodList(params))
        
        return undefined
    },[page,size]) 

    const columns=[
        {
            title: '商品',
            dataIndex: 'name',
            key: 'name',
            render: (text,row) => {
                return (
                    <div className='gl-good'>
                        <img src={img.imgBase+row.img} alt={row.name} />
                        <a>{text}</a>
                    </div>
                )
            }
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'desc',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'create_time',
            dataIndex: 'create_time',
            key: 'create_time',
            render:text=>{
                return (
                    <>
                        <div>{moment(text).format('YYYY-MM-DD')}</div>
                    </>
                )
            } 
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => 
                data.list.length >= 1 ? (
                    <Space>
                        <a>编辑</a>
                        <Popconfirm title="Sure to delete?" onConfirm={() =>dispatch(action.handleDelete(record.key))}>
                            <a>删除</a>
                        </Popconfirm>
                    </Space>
                    
                ) : null,
            
        }
    ]
    const option={
        name:[
            {name:'周晓晓',id:1},
            {name:'付猫猫',id:2}
        ],
        warehouse:[
            {name:'私密',id:1},
            {name:'公开',id:2}
        ],
    }
    function PickerWithType({ type, onChange }) {
        return <TimePicker onChange={onChange} />;
      }
    return (
        <div style={{'background':'transparent'}}>
            <div style={{'background':'white','padding':10+'px','marginBottom':20+'px'}}>

            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>
                <a href="">表单</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>高级表单</Breadcrumb.Item>
            </Breadcrumb>
            <h1>高级表单</h1>
            <h3>高级表单常见于一次性输入和提交大批量数据的场景。</h3>
            </div>
            <Form  form={form} name="control-hooks" onFinish={onFinish}>
            <div style={{'paddingBottom':100+'px','background':'white','padding':10+'px'}}>
                <Row>
                    <Col span={8}>仓库管理</Col>
                </Row><br/>
                <Row>
                    <Col span={8}>仓库名</Col>
                    <Col span={8}>仓库域名</Col>
                    <Col span={8}>仓库管理员</Col>
                </Row>
                <Row>
                    <Col span={5} >
                        <Form.Item label="Note" rules={[{required: true,message:'1111'}]}>
                        <Input placeholder="请输入仓库名称" />
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={3}>
                        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
                    </Col>
                    <Col span={8} offset={2}>
                        <Select placeholder="请选择管理员">
                            {
                                option.name.map(ele=>(
                                    <Option value={ele.name} key={ele.id}>{ele.name}</Option>
                                ))
                            }
                            
                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>审批人</Col>
                    <Col span={8}>生效日期</Col>
                    <Col span={8}>仓库类型</Col>
                </Row>
                <Row>
                    <Col span={5} >
                        <Select placeholder="请选择审批员">
                            {
                                option.name.map(ele=>(
                                    <Option value={ele.name} key={ele.id}>{ele.name}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={6} offset={3}>
                        <Input.Group compact>
                            <DatePicker.RangePicker style={{ width: '100%' }} locale={locale}/>
                        </Input.Group>
                    </Col>
                    <Col span={8} offset={2}>
                        <Select placeholder="请选择仓库类型">
                            {
                                option.warehouse.map(ele=>(
                                    <Option value={ele.name} key={ele.id}>{ele.name}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
            </div>
            
            

            <div style={{'paddingBottom':100+'px','background':'white','padding':10+'px'}}>
                <Row>
                    <Col span={8}>任务管理</Col>
                </Row><br/>
                <Row>
                    <Col span={8}>任务名</Col>
                    <Col span={8}>任务描述</Col>
                    <Col span={8}>执行人</Col>
                </Row>
                <Row>
                    <Col span={5} >
                        <Input placeholder="请输入" />
                    </Col>
                    <Col span={6} offset={3}>
                        <Input placeholder="请输入" />
                    </Col>
                    <Col span={8} offset={2}>
                        <Select placeholder="请选择管理员">
                            {
                                option.name.map(ele=>(
                                    <Option value={ele.name} key={ele.id}>{ele.name}</Option>
                                ))
                            }
                            
                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>责任人</Col>
                    <Col span={8}>生效日期</Col>
                    <Col span={8}>任务类型</Col>
                </Row>
                <Row>
                    <Col span={5} >
                        <Select placeholder="请选择审批员">
                            {
                                option.name.map(ele=>(
                                    <Option value={ele.name} key={ele.id}>{ele.name}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={6} offset={3}>
                        <PickerWithType onChange={value => console.log(value)} locale={locale}/>
                    </Col>
                    <Col span={8} offset={2}>
                        <Select placeholder="请选择仓库类型">
                            {
                                option.warehouse.map(ele=>(
                                    <Option value={ele.name} key={ele.id}>{ele.name}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row><br/>
            </div>
            
            <div style={{'paddingBottom':100+'px','background':'white','padding':10+'px'}}>
                <Row style={{'borderBottom':1+'px'}}>成员管理</Row>
                <Table 
                    columns={columns} 
                    dataSource={data.list} 
                    rowKey='_id'
                    pagination={{
                        pageSizeOptions:[2,5,10,15,20] ,
                        defaultPageSize:size,
                        hideOnSinglePage:true,
                        total:data.total,
                        onShowSizeChange:(page,size)=>setSize(size),
                        onChange:page=>setPage(page)
                    }}
                />
                <Row>
                    <Col span={24} className='col' onClick={()=>dispatch(action.handleAdd(0))}>
                        新增成员
                    </Col>
                </Row>
                
            </div>
            
            <div className='Form_buttom'>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </div>
            
            </Form>
        </div>
    )
}