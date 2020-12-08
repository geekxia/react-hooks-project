import { Table, Space } from 'antd';
const { Column, ColumnGroup } = Table;
const data = [
    {
        key: 'name',
        dataIndex: "name"
    },
    {
        key: 'src',
        dataIndex: "src"
    },
    {
        key: 'price',
        dataIndex: "price"
    },
    {
        key: 'cate',
        dataIndex: "cate"
    },
    {
        key: 'create_time',
        dataIndex: "create_time"
    },
    {
        key: 'hot',
        dataIndex: "hot"
    },
    {
        key: 'action',
        dataIndex: "action",
        render: () => (
            <Space size="middle">
                <a>编辑</a>
                <a>删除</a>
            </Space>
        )
    }
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
                        <Column title="图片" />
                        <Column title="商品名" />
                    </ColumnGroup>
                    <Column title="价格" />
                    <Column title="商品品类" />
                    <Column title="上架时间" />
                    <Column title="是否热销" />
                    <Column
                        title="操作"
                        key="action"
                    />
                </Table>,
            </div>
        </div>
    )
}