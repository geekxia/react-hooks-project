import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table,  Space, Row, Col, Input, Button, Select } from 'antd'
import moment from 'moment'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import CateSelect from '../components/CateSelect'

const { Option } = Select

export default props => {
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.good.goodData)
    console.log('goodData', goodData)
    let [size, setSize] = useState(5)
    let [page, setPage] = useState(2)

    let [text, setText] = useState('')
    
    let [filter, setFilter] = useState({
        size: 5,
        page: 1,
        text: '',
        hot: ''
    })

    const textChange = val => {
        console.log('value text', val)
        setText(val)
        if (!val) {
            filter.text = ''
            setFilter(JSON.parse(JSON.stringify(filter)))
        }
    }
    
    useEffect(() => {
        dispatch(action.getGoodList(filter))
        return undefined
    },[filter])

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (text, row, idx) => {
                return (
                    <div className='goodList-img'>
                        <img src={img.baseUrl + row.img} alt={row.name} />
                        <a>{text}</a>
                    </div>
                )
            }
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            sorter: (a, b) => a.price - b.price,
            render: text => <div>{ '￥'+ text}</div>
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
            align: 'center'
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align: 'center',
            render: text=><div>{text?'是':'否'}</div>
        },
        {
            title: '上架时间',
            key: 'create_time',
            dataIndex: 'create_time',
            align: 'center',
            render: text => {
                return (
                    <>
                        <div>{moment(text).format('YYYY年MM月DD日') }</div>
                        <div>{moment(text).format('hh:mm:ss') }</div>
                    </>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            dataIndex: 'action',
            render: () => (
                <Space size="middle">
                    <a>编辑</a>
                    <a>删除</a>
                </Space>
            )
        }
    ]

    return (
        <div className='qf-good-list'>
            <h1>商品列表</h1>
            <hr />
            <div style={{ margin: '25px 0' }}>
                {/* 第一行  */}
                <Row align='middle'>
                    <Col span={2}>
                        <span className='filter-label'>搜索:</span>
                    </Col>
                    <Col span={4}>
                        <Input
                            value={text}
                            onChange={e => textChange(e.target.value)}
                            placeholder='搜索'
                            allowClear
                            onPressEnter={e=>filterChange('text',e.target.value)}
                        />
                    </Col>
                    <Col span={2}>
                        <span className='filter-label'>品类：</span>
                    </Col>
                    <Col span={6}>
                        <CateSelect
                            hasAll
                            onChange={cate=>filterChange('cate',cate) }
                            allowClear
                        />
                    </Col>
                    <Col span={2}>
                        <span  className='filter-label'>状态：</span>
                    </Col>
                    <Col span={4}>
                        <Select
                            onChange={val => filterChange('hot', val)}
                            style={{ width: '100px' }}
                            allowClear
                            defaultValue=''
                        >
                            <Select.Option key='1' value=''>全部</Select.Option>
                            <Select.Option key='2' value={true}>是</Select.Option>
                            <Select.Option key='3' value={false}>否</Select.Option>
                        </Select>
                    </Col>
                    <Col offset={2} span={2}>
                        <Button
                            size='small'
                            type='primary'
                            onClick={()=>props.history.push('/good/update/0')}
                        >
                            新增
                        </Button>
                    </Col>
                </Row>
            </div>
            <div>
                查询条件
            </div>
            <div style={{margin: '20px 0'}}>
                <Table
                    size='small'
                    rowKey='_id'
                    columns={columns}
                    dataSource={goodData.list}
                    pagination={{
                        total: goodData.total,
                        defaultPageSize: size,
                        onChange: page => setPage(page),
                        onShowSizeChange: (page, size) => setSize(size),
                        pageSizeOptions: [5,10,15,20]
                    }}
                />
            </div>
        </div>
    )
}