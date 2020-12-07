import { Table } from 'antd'

const YjbGood = (props)=>{
    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            key:'name',
            align: 'center',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key:"desc",
            align: 'center',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key:"price",
            align: 'center',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: price=> <div>{'￥'+price}</div>
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align: 'center',
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
        },
        {
            title: '操作',
            key: 'tags',
            align: 'center',
            dataIndex: 'tags',
        }
      ];
      
      const data = [
        {
          key: '1',
          name: '洗衣机',
          desc:"11111",
          price:"10000",
        },
        {
            key: '2',
            name: '空调',
            desc:"22222",
            price:"100",
          }
      ];
      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    return (
        <div className="YJB-GoodList">
            <h1>商品列表</h1>
            <Table
             columns={columns}
             dataSource={data}
             onChange={onChange} 
            />
        </div>
    )
}

export default YjbGood