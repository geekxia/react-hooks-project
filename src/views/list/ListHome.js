import React,{useState} from "react"

import {
    Table
} from "antd"

const ListHome = (props)=>{

    let [columns,setColumns] = useState([
        {
          title: 'Name',
          dataIndex: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ])
    
    let [data,setData] = useState([
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Disabled User',
          age: 99,
          address: 'Sidney No. 1 Lake Park',
        },
      ])
    
    return (
        <div className="HH-list">
            <h1>胡辉测试页</h1>
            <hr/>
            <div className="HH-list-table">
            <Table
                columns={columns}
                dataSource={data}
            />
            </div>
        </div>
    )
}

export default ListHome