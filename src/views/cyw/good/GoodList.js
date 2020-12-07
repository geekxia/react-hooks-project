import React from 'react'

import { Table,  Space } from 'antd'


export default () => {
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc'
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot'
        },
        {
            title: '上架时间',
            key: 'time',
            dataIndex: 'time'
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a>编辑</a>
                    <a>删除</a>
                </Space>
            )
        }
    ]
      
    const data = [
        {
          key: '1',
          name: 'John Brown',
          price: 32,
          desc: 'New York No. 1 Lake Park',
          hot: true
        },
        {
          key: '2',
          name: 'Jim Green',
          price: 42,
          desc: 'London No. 1 Lake Park',
          hot: true
        },
        {
          key: '3',
          name: 'Joe Black',
          price: 32,
          desc: 'Sidney No. 1 Lake Park',
          hot: true
        }
    ]
      

    return (
        <div>
            <h1>商品列表</h1>
            <hr />
            <div>
                查询条件
            </div>
            <div style={{margin: '20px 0'}}>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}