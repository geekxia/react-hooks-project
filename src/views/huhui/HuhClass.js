import React from "react"
import { 
    Table,
    Space,
    Row,
    Col,
    Button
} from 'antd'
import GoodAddOrEdit from "../good/GoodAddOrEdit"

const HuhClass =(props)=>{

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
            ),
        }
    ]
    
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ]

    //跳转商品新增页面
    const GoodAddOrEdit=()=>{
        props.history.push("/hucontact/gooduptate")
    }

    return(
        <div className="HH-list">
            <h1>商品列表</h1>
            <hr/>
            <div className="List-query">
                <Row justify="end">
                    <Col>
                        <Button type="primary" onClick={()=>GoodAddOrEdit()}>新增商品</Button>
                    </Col>
                </Row>
            </div>
            <hr/>
            <div className="List-table">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default HuhClass