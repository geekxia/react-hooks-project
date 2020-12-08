import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table,  Space } from 'antd'
import moment from 'moment'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'

export default props => {
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.good.goodData)
    console.log('goodData', goodData)
    let [size, setSize] = useState(5)
    let [page, setPage] = useState(2)
    
    useEffect(() => {
        let params = {
            size,
            page
        }
        dispatch(action.getGoodList(params))
        return undefined
    },[page, size])

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
            key: 'time',
            dataIndex: 'time',
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