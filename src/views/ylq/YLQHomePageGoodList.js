import {
    Table, 
    Tag, 
    Space ,
    Button,
    Row,
    Col 
} from 'antd'


export default props =>{

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
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
            {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                color = 'volcano';
                }
                return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
                );
            })}
            </>
        ),
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
        },
    ];
    
    const data = [
        {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
        },
        {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
        },
        {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
        },
    ];
    const GoToAddPage = (e)=>{
        console.log('点击按钮',props)
        props.history.push('/ylq/homepage/goodlist/newaddpage')

    }

    return(
        <div>
            <h1>ylq 商品列表页面</h1>
            <div>
            {/* 新增按钮 */}
            <div>
                <Row>
                    <Col  offset={22}>
                        <Button 
                            type="primary"
                            size="small"
                            onClick={(e)=>GoToAddPage(e)}
                        >新增</Button>
                    </Col>
                </Row>
            </div>
            {/* 表格 */}
           <div style={{margin:'20px 0'}}>
           <Table columns={columns} dataSource={data} />
           </div>
            </div>

        </div>
    )
}