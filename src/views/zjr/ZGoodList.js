import { Table, Tag, Space } from 'antd';
const { Column, ColumnGroup } = Table;
const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default props => {
    return (
        <div>
            <h1>商品列表测试</h1>
            {/* 查询条件 */}
            {/* 商品表格 */}
            <div className="zjr-table">
                <Table dataSource={data}>
                    <ColumnGroup title="商品">
                        <Column title="图片" dataIndex="firstName" key="firstName" />
                        <Column title="商品名" dataIndex="lastName" key="lastName" />
                    </ColumnGroup>
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <>
                                {tags.map(tag => (
                                    <Tag color="blue" key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <a>Invite {record.lastName}</a>
                                <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>,
            </div>
        </div>
    )
}