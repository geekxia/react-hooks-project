import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'antd';

export default props=>{
    const customer = useSelector(store=>(store.xxlReducer.customerMsg))
    const columns = [
        {
          title: '标题',
          dataIndex: 'title',
          width: 150,
        },
        {
          title: '起止时间',
          dataIndex: 'time',
          width: 150,
        },
        {
          title: '目标描述',
          dataIndex: 'description',
        },
        {
            title: '衡量标准',
            dataIndex: 'standard',
        },
        {
            title: '客户',
            dataIndex: 'customer',
        },
        {
            title: '邀评人',
            dataIndex: 'inviter',
        },
        {
            title: '权重',
            dataIndex: 'weight',
        },
        {
            title: '是否公开',
            dataIndex: 'public',
        },
        
      ];
      console.log(customer)
      const data = [];
      for (let i = 0; i < customer.length; i++) {
        //   console.log(customer[i])
        data.push({
            key:customer[i].id,
            title:customer[i].title,
            time:customer[i].time,
            description:customer[i].description,
            standard:customer[i].standard,
            customer:customer[i].customer,
            inviter:customer[i].inviter,
            weight:customer[i].weight,
            public:customer[i].public
        });
      }
    return (
        <div>
             <Table 
                columns={columns} 
                dataSource={data} 
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240 }} 
             />
        </div>
    )
}